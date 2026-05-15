# FreshCart Grocery Store (Full Stack)

A complete grocery e-commerce web app with:
- Frontend UI (HTML/CSS/Vanilla JS)
- Backend API (Node.js + Express)
- Persistent JSON storage for users, products, carts, and orders
- Authentication (register/login/logout)
- Customer flows (browse products, add/remove cart items, checkout, view orders)
- Admin flows (create/delete products)

## Quick Start

### 1) Install dependencies
```bash
npm install
```

### 2) Run the app
```bash
npm start
```

The app runs at: `http://localhost:3000`

## Demo Admin Account
- Email: `admin@grocery.local`
- Password: `admin123`

## Available Scripts
- `npm start` - run production server
- `npm run dev` - run server in watch mode
- `npm test` - run Node test runner

## API Overview
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/me`
- `GET /api/products`
- `GET /api/products/:id`
- `GET /api/cart`
- `POST /api/cart/items`
- `PATCH /api/cart/items/:productId`
- `DELETE /api/cart/items/:productId`
- `POST /api/orders/checkout`
- `GET /api/orders`
- `POST /api/admin/products` (admin)
- `PUT /api/admin/products/:id` (admin)
- `DELETE /api/admin/products/:id` (admin)

## Data Persistence
App data is stored in:
- `data/store.json`

This file is auto-generated on first run with seed products and the admin user.
