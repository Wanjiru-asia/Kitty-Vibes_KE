const pool = require('../db');


const getAllOrders = async (req, res) => {
    try {
        const orders = await pool.query('SELECT * FROM public.orders');
        res.json(orders.rows);

    }
    catch (error) {

        res.status(500).json({error: "Internal Server Error"});
    }
}
const getAllOrdersById = async (req, res) => {
    try {
        const ordersId = await pool.query('SELECT * FROM public.orders WHERE id = $1', [req.params.id]);
        if (ordersId.rows.length === 0) {
           return  res.status(404).json({error: "Order not Found"});
        }
        res.json(ordersId.rows[0]);
    }
    catch (error) {
        res.status(500).json({error: "Internal Server Error"});
    }
}
const addOrder = async (req, res) => {
    try {
        const { user_id, payment_method, delivery_address, total_price } = req.body;
        const addToOrder = await pool.query(
            'INSERT INTO orders(user_id, payment_method, delivery_address, total_price) VALUES ($1, $2, $3, $4) RETURNING *',
            [user_id, payment_method, delivery_address, total_price]
        );
        res.status(201).json(addToOrder.rows[0]);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const updateOrder = async (req, res) => {
    try {
        const { user_id, status, payment_status, payment_method, delivery_address, total_price } = req.body;
        const updateOrders = await pool.query(
            'UPDATE orders SET user_id=$1, status=$2, payment_status=$3, payment_method=$4, delivery_address=$5, total_price=$6 WHERE id=$7 RETURNING *',
            [user_id, status, payment_status, payment_method, delivery_address, total_price, req.params.id]
        );

        res.status(200).json(updateOrders.rows[0]);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}
const deleteOrder = async (req, res) => {
    try{
        const deleteOrder = await pool.query('DELETE FROM orders WHERE id = $1 RETURNING *',
            [req.params.id]);
        if (deleteOrder.rows.length === 0) {
           return  res.status(404).json({error: "Order not Found"});
        }
        res.status(200).json(deleteOrder.rows[0]);
    }
    catch (error) {
        res.status(500).json({error: "Internal Server Error"});
    }
}
module.exports = {getAllOrders,getAllOrdersById, addOrder, updateOrder, deleteOrder}