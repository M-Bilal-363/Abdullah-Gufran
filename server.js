const express = require('express');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'store.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function createPasswordRecord(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return { salt, hash };
}

function verifyPassword(password, passwordRecord) {
  const hash = crypto.pbkdf2Sync(password, passwordRecord.salt, 100000, 64, 'sha512').toString('hex');
  return hash === passwordRecord.hash;
}

function createDefaultData() {
  return {
    users: [
      {
        id: 'u_admin',
        name: 'Admin',
        email: 'admin@grocery.local',
        role: 'admin',
        password: createPasswordRecord('admin123'),
      },
    ],
    products: [
      { id: 'p1', name: 'Bananas', price: 1.49, category: 'Fruits', stock: 120, image: '🍌' },
      { id: 'p2', name: 'Tomatoes', price: 2.19, category: 'Vegetables', stock: 90, image: '🍅' },
      { id: 'p3', name: 'Whole Milk', price: 3.49, category: 'Dairy', stock: 70, image: '🥛' },
      { id: 'p4', name: 'Brown Bread', price: 2.99, category: 'Bakery', stock: 60, image: '🍞' },
      { id: 'p5', name: 'Eggs (12 pack)', price: 4.29, category: 'Dairy', stock: 80, image: '🥚' },
      { id: 'p6', name: 'Chicken Breast', price: 8.99, category: 'Meat', stock: 50, image: '🍗' },
    ],
    carts: {},
    orders: [],
    sessions: {},
  };
}

function loadData() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DATA_FILE)) {
    const data = createDefaultData();
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return data;
  }

  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
}

let data = loadData();

function saveData() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

function createToken() {
  return crypto.randomBytes(24).toString('hex');
}

function sanitizeUser(user) {
  return { id: user.id, name: user.name, email: user.email, role: user.role };
}

function authRequired(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token || !data.sessions[token]) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const user = data.users.find((u) => u.id === data.sessions[token]);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  req.user = user;
  req.token = token;
  next();
}

function adminRequired(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
}

function getCartWithTotals(userId) {
  const cartItems = data.carts[userId] || [];
  const expandedItems = cartItems
    .map((item) => {
      const product = data.products.find((p) => p.id === item.productId);
      if (!product) return null;
      return {
        productId: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        qty: item.qty,
        subtotal: Number((product.price * item.qty).toFixed(2)),
      };
    })
    .filter(Boolean);

  const total = Number(expandedItems.reduce((sum, i) => sum + i.subtotal, 0).toFixed(2));

  return { items: expandedItems, total };
}

app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  const normalizedEmail = String(email).trim().toLowerCase();
  if (data.users.some((u) => u.email === normalizedEmail)) {
    return res.status(409).json({ error: 'Email already registered' });
  }

  const newUser = {
    id: `u_${crypto.randomUUID()}`,
    name: String(name).trim(),
    email: normalizedEmail,
    role: 'customer',
    password: createPasswordRecord(password),
  };

  data.users.push(newUser);
  data.carts[newUser.id] = [];
  saveData();

  res.status(201).json({ message: 'Registered successfully' });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const user = data.users.find((u) => u.email === String(email).trim().toLowerCase());
  if (!user || !verifyPassword(password, user.password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = createToken();
  data.sessions[token] = user.id;
  saveData();

  res.json({ token, user: sanitizeUser(user) });
});

app.post('/api/auth/logout', authRequired, (req, res) => {
  delete data.sessions[req.token];
  saveData();
  res.json({ message: 'Logged out' });
});

app.get('/api/products', (req, res) => {
  const category = (req.query.category || '').toString().trim().toLowerCase();
  const search = (req.query.search || '').toString().trim().toLowerCase();

  let products = [...data.products];
  if (category) {
    products = products.filter((p) => p.category.toLowerCase() === category);
  }
  if (search) {
    products = products.filter((p) => p.name.toLowerCase().includes(search));
  }

  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = data.products.find((p) => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

app.get('/api/cart', authRequired, (req, res) => {
  res.json(getCartWithTotals(req.user.id));
});

app.post('/api/cart/items', authRequired, (req, res) => {
  const { productId, qty } = req.body;
  const product = data.products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const quantity = Number(qty);
  if (!Number.isInteger(quantity) || quantity < 1) {
    return res.status(400).json({ error: 'Quantity must be a positive integer' });
  }

  const cart = data.carts[req.user.id] || [];
  const existing = cart.find((item) => item.productId === productId);
  const currentQty = existing ? existing.qty : 0;

  if (currentQty + quantity > product.stock) {
    return res.status(400).json({ error: 'Requested quantity exceeds stock' });
  }

  if (existing) {
    existing.qty += quantity;
  } else {
    cart.push({ productId, qty: quantity });
  }

  data.carts[req.user.id] = cart;
  saveData();
  res.status(201).json(getCartWithTotals(req.user.id));
});

app.patch('/api/cart/items/:productId', authRequired, (req, res) => {
  const quantity = Number(req.body.qty);
  if (!Number.isInteger(quantity) || quantity < 1) {
    return res.status(400).json({ error: 'Quantity must be a positive integer' });
  }

  const product = data.products.find((p) => p.id === req.params.productId);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  if (quantity > product.stock) {
    return res.status(400).json({ error: 'Requested quantity exceeds stock' });
  }

  const cart = data.carts[req.user.id] || [];
  const item = cart.find((i) => i.productId === req.params.productId);

  if (!item) {
    return res.status(404).json({ error: 'Item not found in cart' });
  }

  item.qty = quantity;
  data.carts[req.user.id] = cart;
  saveData();
  res.json(getCartWithTotals(req.user.id));
});

app.delete('/api/cart/items/:productId', authRequired, (req, res) => {
  const cart = data.carts[req.user.id] || [];
  data.carts[req.user.id] = cart.filter((i) => i.productId !== req.params.productId);
  saveData();
  res.json(getCartWithTotals(req.user.id));
});

app.post('/api/orders/checkout', authRequired, (req, res) => {
  const cart = data.carts[req.user.id] || [];
  if (!cart.length) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  for (const item of cart) {
    const product = data.products.find((p) => p.id === item.productId);
    if (!product || product.stock < item.qty) {
      return res.status(400).json({ error: `Insufficient stock for ${product ? product.name : item.productId}` });
    }
  }

  const orderItems = cart.map((item) => {
    const product = data.products.find((p) => p.id === item.productId);
    product.stock -= item.qty;
    return {
      productId: product.id,
      name: product.name,
      qty: item.qty,
      unitPrice: product.price,
      subtotal: Number((product.price * item.qty).toFixed(2)),
    };
  });

  const total = Number(orderItems.reduce((sum, item) => sum + item.subtotal, 0).toFixed(2));

  const order = {
    id: `o_${crypto.randomUUID()}`,
    userId: req.user.id,
    createdAt: new Date().toISOString(),
    status: 'placed',
    items: orderItems,
    total,
  };

  data.orders.push(order);
  data.carts[req.user.id] = [];
  saveData();

  res.status(201).json(order);
});

app.get('/api/orders', authRequired, (req, res) => {
  const orders = data.orders.filter((o) => o.userId === req.user.id);
  res.json(orders);
});

app.post('/api/admin/products', authRequired, adminRequired, (req, res) => {
  const { name, price, category, stock, image } = req.body;
  if (!name || !category || price == null || stock == null) {
    return res.status(400).json({ error: 'name, price, category and stock are required' });
  }

  const newProduct = {
    id: `p_${crypto.randomUUID()}`,
    name: String(name).trim(),
    price: Number(price),
    category: String(category).trim(),
    stock: Number(stock),
    image: image ? String(image).trim() : '🛒',
  };

  if (!newProduct.name || !newProduct.category || !Number.isFinite(newProduct.price) || newProduct.price <= 0 || !Number.isInteger(newProduct.stock) || newProduct.stock < 0) {
    return res.status(400).json({ error: 'Invalid product data' });
  }

  data.products.push(newProduct);
  saveData();
  res.status(201).json(newProduct);
});

app.put('/api/admin/products/:id', authRequired, adminRequired, (req, res) => {
  const product = data.products.find((p) => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const { name, price, category, stock, image } = req.body;

  if (name !== undefined) product.name = String(name).trim();
  if (price !== undefined) product.price = Number(price);
  if (category !== undefined) product.category = String(category).trim();
  if (stock !== undefined) product.stock = Number(stock);
  if (image !== undefined) product.image = String(image).trim();

  if (!product.name || !product.category || !Number.isFinite(product.price) || product.price <= 0 || !Number.isInteger(product.stock) || product.stock < 0) {
    return res.status(400).json({ error: 'Invalid product data' });
  }

  saveData();
  res.json(product);
});

app.delete('/api/admin/products/:id', authRequired, adminRequired, (req, res) => {
  const before = data.products.length;
  data.products = data.products.filter((p) => p.id !== req.params.id);

  if (data.products.length === before) {
    return res.status(404).json({ error: 'Product not found' });
  }

  for (const userId of Object.keys(data.carts)) {
    data.carts[userId] = (data.carts[userId] || []).filter((i) => i.productId !== req.params.id);
  }

  saveData();
  res.json({ message: 'Product deleted' });
});

app.get('/api/me', authRequired, (req, res) => {
  res.json(sanitizeUser(req.user));
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Grocery store running on http://localhost:${PORT}`);
});
