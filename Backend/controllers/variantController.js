const pool = require('../db');

const getAllVariants = async (req, res) => {
    try{
        const variants = await pool.query('SELECT * FROM public.product_variants');
        res.json(variants.rows);
    }
    catch(err){
        res.status(500).json({error: 'Internal Server Error'});
    }
}
const addVariant = async (req, res) => {
    try {
        const{product_id, variant_type, variant_value, stock_quantity, img_url, extra_price} = req.body;

        const variantsAdded = await pool.query('INSERT INTO product_variants(product_id, variant_type, variant_value, stock_quantity, img_url, extra_price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [product_id, variant_type, variant_value, stock_quantity, img_url, extra_price]
        );
        res.status(200).json(variantsAdded.rows[0]);
    }
    catch(err){
        res.status(500).json({error: 'Internal Server Error'});
    }
}
const updateVariant = async (req, res) => {
    try {
        const {product_id, variant_type, variant_value, stock_quantity, img_url, extra_price} = req.body;
        const updatedVariants = await pool.query('UPDATE product_variants SET product_id=$1, variant_type=$2, variant_value=$3, stock_quantity=$4, img_url=$5, extra_price=$6 WHERE id=$7 RETURNING * ',
            [product_id, variant_type, variant_value, stock_quantity, img_url, extra_price, req.params.id]
        );
        res.status(200).json(updatedVariants.rows[0]);
    }
    catch(err){
        res.status(500).json({error: 'Internal Server Error'});
    }
}
const deleteVariant = async (req, res) => {
    try{
        const deletedVariant = await pool.query('DELETE FROM product_variants WHERE id = $1 RETURNING *',
            [req.params.id]
        );
        if (deletedVariant.rows.length === 0) {
            return res.status(404).json({error: 'Product not found'});
        }
        res.status(200).json({message: 'Product deleted successfully'});
    }
    catch(err){
        res.status(500).json({error: 'Internal Server Error'});
    }
}
module.exports = {getAllVariants, addVariant, updateVariant, deleteVariant};