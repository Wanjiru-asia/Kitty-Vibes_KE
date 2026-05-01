# 🐱 Kitty Vibes KE

A stylish e‑commerce store for Hello Kitty enthusiasts — featuring handbags, pajamas, blankets, house shoes, phone accessories, and more. Built with React, TypeScript, Node.js, Express, PostgreSQL, and Cloudinary.

![KittyVibes Screenshot](https://res.cloudinary.com/dqtjyfdb5/image/upload/v1/kittyvibes/bag_ekjt7c.jpg)

## ✨ Key Features

- **Landing page** – Hero banner, New Arrivals carousel, and an *Explore Our Products* call‑to‑action
- **Dashboard** – Full product catalogue with category filters (Bags, Pajamas, Slides, Blankets, Accessories)
- **Cart & Checkout** – Add/remove items, quantity controls, checkout form that sends the order directly to the seller’s WhatsApp
- **Wishlist** – Heart toggle on every product, plus a slide‑out sidebar to view and manage saved items
- **Toast notifications** – Instant visual feedback for cart, wishlist, and order actions
- **Dark theme** – Sleek black backgrounds with vibrant pink accents, glowing neon effects, and playful typography
- **Admin‑ready** – Products are stored in PostgreSQL and images are served via Cloudinary; adding new products is a simple SQL insert

## 🛠️ Tech Stack

| Layer       | Technology                              |
|-------------|-----------------------------------------|
| Frontend    | React (TypeScript), React Router, Tailwind CSS v4, Lucide Icons |
| Backend     | Node.js, Express, Multer, Cloudinary SDK |
| Database    | PostgreSQL                              |
| Services    | Cloudinary (image hosting), WhatsApp API (order delivery) |

## 📁 Project Structure
kittyvibes/
├── frontend/ # React application (Vite)
│ └── src/
│ ├── components/ # Navbar, Hero, ProductCard, ProductGrid, NewArrivalsSection, CartSidebar, WishlistSidebar
│ ├── pages/ # Dashboard
│ ├── context/ # CartContext, WishlistContext, ToastContext
│ ├── hooks/ # useProducts, useWishlist
│ ├── api/ # API functions (fetchAllProducts, etc.)
│ └── types/ # TypeScript interfaces (Products, CartItem)
├── backend/ # Express API
│ ├── controllers/ # productController.js
│ ├── routes/ # productRoutes.js
│ ├── config/ # Cloudinary & Multer configuration
│ ├── db.js # PostgreSQL connection pool
│ └── server.js # Entry point
└── README.md

text

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or later)
- **PostgreSQL** database
- **Cloudinary** account (free tier is fine)

### 1. Clone the repository

```bash
git clone https://github.com/Wanjiru-asia/Kitty-Vibes_KE.git
cd Kitty-Vibes_KE
2. Backend setup
bash
cd backend
npm install
Create a .env file inside the backend folder with the following variables:

env
PORT=5000
DATABASE_URL=postgresql://your_user:your_password@localhost:5432/kittyvibes
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
Then start the API server:

bash
node server.js
3. Frontend setup
bash
cd frontend
npm install
npm run dev
The store will be available at http://localhost:5173.

If the frontend can't reach the API, check the BASE_URL constant in frontend/src/api/api.ts – by default it points to http://localhost:5000/api.

🗄️ Database Setup
Run the following SQL to create the products table:

sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    max_price DECIMAL(10,2),
    category VARCHAR(100),
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
Seed data (if included) can be found in backend/seeds/. Alternatively, insert products directly via SQL, or use the future admin page to upload images to Cloudinary and add entries to the database.

📦 Adding Products
Products are inserted directly into PostgreSQL. Each product must have a valid Cloudinary URL in the image_url column. The category field determines where the product appears in the dashboard filters.
Use SQL statements like:

sql
INSERT INTO products (product_name, description, price, category, image_url) 
VALUES ('Cow-Print Shoulder Bag', 'Black and white cow print...', 1300, 'bags', 'https://res.cloudinary.com/...');
After inserting, the product will instantly appear on the dashboard and (if it belongs to a selected set of IDs) in the New Arrivals section.

🤝 Contributing
This is a private commercial project. For collaboration inquiries, please contact the repository owner.

Made with 💖 for hello kitty lovers everywhere
