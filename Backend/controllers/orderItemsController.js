const pool = require("../db");

const getAllOrderItems = async (req, res) => {
    try {
       const orderItems = await pool.query('SELECT * FROM public.order_items');
       res.json(orderItems.rows);
    }
    catch (error) {
        res.status(500).json({error:"Internal Server Error"});
    }
}
const addOrderItems = async (req, res) => {
    try {
        const {order_id, product_id, variants_id, quantity, price} = req.body;
        const orderItemsAdded = await pool.query('INSERT INTO order_items(order_id, product_id, variants_id, quantity, price) VALUES ($1,$2, $3 , $4, $5) RETURNING *',
            [order_id, product_id, variants_id, quantity, price]);
        res.status(200).json(orderItemsAdded.rows[0]);
    }
    catch (error) {
        res.status(500).json({error:"Internal Server Error"});
    }
}
const deleteOrderItems = async (req, res) => {
    try {
        const deletedOrderItem = await pool.query('DELETE FROM order_items WHERE order_id = $1', [req.params.id]);
        if (deletedOrderItem.rows.length === 0) {
            return res.status(404).json({error:"Order item not found."});
        }
        res.status(200).json({message: 'Order item deleted successfully.'});
    }
    catch (error) {
        res.status(500).json({error:"Internal Server Error"});
    }
}
module.exports = {getAllOrderItems, addOrderItems, deleteOrderItems};