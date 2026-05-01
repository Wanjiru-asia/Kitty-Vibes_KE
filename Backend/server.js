require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const productRoutes = require('./routes/productRoutes');
const variantRoutes = require('./routes/variantRoutes');
const orderRoutes = require('./routes/orderRoutes');
const orderItemsRoutes = require('./routes/orderItemsRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const paymentRoutes = require('./routes/paymentRoutes');


const app = express();
const PORT = process.env.PORT;


app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api', productRoutes);
app.use('/api', variantRoutes);
app.use('/api', orderRoutes);
app.use('/api', orderItemsRoutes);
app.use('/api', wishlistRoutes);
app.use('/api', paymentRoutes);




app.get('/api/healthz', (req, res) => res.json( {status:'OK'}));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));