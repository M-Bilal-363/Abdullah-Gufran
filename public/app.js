const state = {
  token: localStorage.getItem('token') || '',
  user: null,
  products: [],
};

const userBadge = document.getElementById('userBadge');
const logoutBtn = document.getElementById('logoutBtn');
const adminSection = document.getElementById('adminSection');
const checkoutBtn = document.getElementById('checkoutBtn');
const authSection = document.getElementById('authSection');

function toast(message) {
  const el = document.getElementById('toast');
  el.textContent = message;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 1800);
}

async function api(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (state.token) headers.Authorization = `Bearer ${state.token}`;

  const res = await fetch(path, { ...options, headers });
  const isJson = res.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await res.json() : {};

  if (!res.ok) {
    throw new Error(data.error || 'Request failed');
  }

  return data;
}

function formatPrice(value) {
  return `$${Number(value).toFixed(2)}`;
}

async function loadProducts() {
  const search = document.getElementById('searchInput').value.trim();
  const query = search ? `?search=${encodeURIComponent(search)}` : '';
  state.products = await api(`/api/products${query}`);

  const container = document.getElementById('products');
  if (!state.products.length) {
    container.innerHTML = '<p>No products found.</p>';
    return;
  }

  container.innerHTML = state.products
    .map(
      (p) => `
      <article class="product">
        <div class="row"><strong>${p.image || '🛒'} ${p.name}</strong><span>${p.category}</span></div>
        <div class="row"><span class="price">${formatPrice(p.price)}</span><span>Stock: ${p.stock}</span></div>
        <button onclick="addToCart('${p.id}')">Add to cart</button>
        ${state.user?.role === 'admin' ? `
          <button class="secondary" onclick="deleteProduct('${p.id}')">Delete</button>
        ` : ''}
      </article>
    `
    )
    .join('');
}

async function loadCart() {
  const container = document.getElementById('cart');
  if (!state.token) {
    container.textContent = 'Login to manage your cart.';
    checkoutBtn.classList.add('hidden');
    return;
  }

  const cart = await api('/api/cart');
  if (!cart.items.length) {
    container.innerHTML = '<p>Your cart is empty.</p>';
    checkoutBtn.classList.add('hidden');
    return;
  }

  container.innerHTML = `
    ${cart.items
      .map(
        (i) => `
      <div class="row">
        <span>${i.image} ${i.name} x ${i.qty}</span>
        <span>${formatPrice(i.subtotal)}</span>
        <button class="secondary" onclick="removeFromCart('${i.productId}')">Remove</button>
      </div>`
      )
      .join('')}
    <hr />
    <div class="row"><strong>Total</strong><strong>${formatPrice(cart.total)}</strong></div>
  `;

  checkoutBtn.classList.remove('hidden');
}

async function loadOrders() {
  const container = document.getElementById('orders');
  if (!state.token) {
    container.textContent = 'Login to see your orders.';
    return;
  }

  const orders = await api('/api/orders');
  if (!orders.length) {
    container.innerHTML = '<p>No orders yet.</p>';
    return;
  }

  container.innerHTML = orders
    .slice()
    .reverse()
    .map(
      (o) => `
      <article class="product">
        <div class="row"><strong>Order ${o.id.slice(0, 10)}</strong><span>${new Date(o.createdAt).toLocaleString()}</span></div>
        <div>${o.items.map((i) => `${i.name} x ${i.qty}`).join(', ')}</div>
        <div class="row"><span>Status: ${o.status}</span><strong>${formatPrice(o.total)}</strong></div>
      </article>
    `
    )
    .join('');
}

async function loadUser() {
  if (!state.token) {
    state.user = null;
    renderUser();
    return;
  }

  try {
    state.user = await api('/api/me');
  } catch {
    localStorage.removeItem('token');
    state.token = '';
    state.user = null;
  }

  renderUser();
}

function renderUser() {
  if (state.user) {
    userBadge.textContent = `${state.user.name} (${state.user.role})`;
    logoutBtn.classList.remove('hidden');
    authSection.classList.add('hidden');
    if (state.user.role === 'admin') {
      adminSection.classList.remove('hidden');
    } else {
      adminSection.classList.add('hidden');
    }
  } else {
    userBadge.textContent = 'Guest';
    logoutBtn.classList.add('hidden');
    authSection.classList.remove('hidden');
    adminSection.classList.add('hidden');
  }
}

async function refreshAll() {
  await loadUser();
  await loadProducts();
  await loadCart();
  await loadOrders();
}

window.addToCart = async (productId) => {
  if (!state.token) {
    toast('Please login first');
    return;
  }

  try {
    await api('/api/cart/items', {
      method: 'POST',
      body: JSON.stringify({ productId, qty: 1 }),
    });
    toast('Added to cart');
    await loadCart();
  } catch (err) {
    toast(err.message);
  }
};

window.removeFromCart = async (productId) => {
  try {
    await api(`/api/cart/items/${productId}`, { method: 'DELETE' });
    toast('Removed from cart');
    await loadCart();
  } catch (err) {
    toast(err.message);
  }
};

window.deleteProduct = async (productId) => {
  if (!confirm('Delete this product?')) return;

  try {
    await api(`/api/admin/products/${productId}`, { method: 'DELETE' });
    toast('Product deleted');
    await refreshAll();
  } catch (err) {
    toast(err.message);
  }
};

document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = new FormData(e.currentTarget);

  try {
    await api('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: form.get('name'),
        email: form.get('email'),
        password: form.get('password'),
      }),
    });
    toast('Registration successful. Please login.');
    e.currentTarget.reset();
  } catch (err) {
    toast(err.message);
  }
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = new FormData(e.currentTarget);

  try {
    const result = await api('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: form.get('email'),
        password: form.get('password'),
      }),
    });

    state.token = result.token;
    localStorage.setItem('token', result.token);
    toast('Logged in');
    e.currentTarget.reset();
    await refreshAll();
  } catch (err) {
    toast(err.message);
  }
});

logoutBtn.addEventListener('click', async () => {
  try {
    await api('/api/auth/logout', { method: 'POST' });
  } catch {
    // ignore
  }

  localStorage.removeItem('token');
  state.token = '';
  state.user = null;
  toast('Logged out');
  await refreshAll();
});

checkoutBtn.addEventListener('click', async () => {
  try {
    await api('/api/orders/checkout', { method: 'POST' });
    toast('Order placed');
    await refreshAll();
  } catch (err) {
    toast(err.message);
  }
});

document.getElementById('refreshProductsBtn').addEventListener('click', loadProducts);
document.getElementById('searchInput').addEventListener('input', () => {
  clearTimeout(window.__searchTimer);
  window.__searchTimer = setTimeout(loadProducts, 250);
});

document.getElementById('addProductForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = new FormData(e.currentTarget);

  try {
    await api('/api/admin/products', {
      method: 'POST',
      body: JSON.stringify({
        name: form.get('name'),
        price: Number(form.get('price')),
        category: form.get('category'),
        stock: Number(form.get('stock')),
        image: form.get('image'),
      }),
    });
    toast('Product added');
    e.currentTarget.reset();
    await loadProducts();
  } catch (err) {
    toast(err.message);
  }
});

refreshAll().catch((err) => toast(err.message));
