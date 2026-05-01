const pool = require('../db');

const getAllProducts = async (req, res) => {
    try {
        const products = await pool.query('SELECT * FROM public.products');

        const mappedProducts = products.rows.map(product => ({
            id: product.id,
            product_name: product.product_name,
            description: product.description,
            price: product.price,
            category: product.category,
            img_url: product.image_url,
            created_at: product.created_at
        }));

        res.json(mappedProducts);
    }
    catch(error) {
        console.error('Get all products error:', error);
        res.status(500).json({error: "Internal server error"});
    }
}

const getProductById = async (req, res) => {
    try {
        const productId = await pool.query('SELECT * FROM public.products WHERE id = $1', [req.params.id]);
        if (productId.rows.length === 0) {
            return res.status(404).json({error: "Product not found."});
        }

        const product = productId.rows[0];
        res.json({
            id: product.id,
            product_name: product.product_name,
            description: product.description,
            price: product.price,
            category: product.category,
            img_url: product.image_url,
            created_at: product.created_at
        });
    }
    catch (error) {
        console.error('Get product by ID error:', error);
        res.status(500).json({error: "Internal server error"});
    }
}

const getProductByCategory = async (req, res) => {
    try {
        const productCategory = await pool.query('SELECT * FROM public.products WHERE category = $1', [req.params.category]);
        if (productCategory.rows.length === 0) {
            return res.status(404).json({error: "Product category not found."});
        }

        const mappedProducts = productCategory.rows.map(product => ({
            id: product.id,
            product_name: product.product_name,
            description: product.description,
            price: product.price,
            category: product.category,
            img_url: product.image_url,
            created_at: product.created_at
        }));

        res.json(mappedProducts);
    }
    catch(error) {
        console.error('Get product by category error:', error);
        res.status(500).json({error: "Internal server error"});
    }
}

const addProduct = async (req, res) => {
    try {
        const { product_name, description, price, category, image_url } = req.body;

        const productsAdded = await pool.query(
            'INSERT INTO products(product_name, description, price, category, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [product_name, description, price, category, image_url]
        );

        const product = productsAdded.rows[0];
        res.status(201).json({
            id: product.id,
            product_name: product.product_name,
            description: product.description,
            price: product.price,
            category: product.category,
            img_url: product.image_url,
            created_at: product.created_at
        });
    }
    catch(error) {
        console.error('Add product error:', error);
        res.status(500).json({error: "Internal server error"});
    }
}

const updateProducts = async (req, res) => {
    try {
        const { id } = req.params;
        const { product_name, description, price, category, image_url } = req.body;

        const updatedProducts = await pool.query(
            'UPDATE products SET product_name=$1, description=$2, price=$3, category=$4, image_url=$5 WHERE id=$6 RETURNING *',
            [product_name, description, price, category, image_url, id]
        );

        if (updatedProducts.rows.length === 0) {
            return res.status(404).json({error: "Product not found."});
        }

        const product = updatedProducts.rows[0];
        res.status(200).json({
            id: product.id,
            product_name: product.product_name,
            description: product.description,
            price: product.price,
            category: product.category,
            img_url: product.image_url,
            created_at: product.created_at
        });
    }
    catch(error) {
        console.error('Update product error:', error);
        res.status(500).json({error: "Internal server error"});
    }
}

const deleteProducts = async (req, res) => {
    try {
        const deletedProduct = await pool.query(
            'DELETE FROM public.products WHERE id = $1 RETURNING *',
            [req.params.id]
        );
        if (deletedProduct.rows.length === 0) {
            return res.status(404).json({error: "Product not found."});
        }

        const product = deletedProduct.rows[0];
        res.status(200).json({
            id: product.id,
            product_name: product.product_name,
            description: product.description,
            price: product.price,
            category: product.category,
            img_url: product.image_url,
            created_at: product.created_at
        });
    }
    catch(error) {
        console.error('Delete product error:', error);
        res.status(500).json({error: "Internal server error"});
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    getProductByCategory,
    addProduct,
    updateProducts,
    deleteProducts
};