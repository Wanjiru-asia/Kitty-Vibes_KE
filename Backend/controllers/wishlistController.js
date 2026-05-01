const pool = require('../db');

const getWishlist = async (req, res) => {
    try{
        const wishlist = await pool.query('SELECT * FROM public.wishlist');
        res.json(wishlist.rows);
    }
    catch(err){
        res.status(500).json({error:"Internal Server Error"});
    }
}
const addToWishlist = async (req, res) => {
    try {
        const { user_id, product_id } = req.body;
        const addedWishlist = await pool.query(
            'INSERT INTO wishlist(user_id, product_id) VALUES ($1, $2) RETURNING *',
            [user_id, product_id]
        );
        res.status(201).json(addedWishlist.rows[0]);
    }
    catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const deleteWishlist = async (req, res) => {
    try {
        const deletedWishlist = await pool.query(
            'DELETE FROM wishlist WHERE id = $1 RETURNING *',
            [req.params.id]
        );
        if (deletedWishlist.rows.length === 0) {
            return res.status(404).json({ error: "No wishlist found" });
        }
        res.status(200).json({ message: "Removed from wishlist successfully" });
    }
    catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}
module.exports = {getWishlist, addToWishlist, deleteWishlist};