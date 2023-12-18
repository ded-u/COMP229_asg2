// Import modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection configuration
const mongoURI = 'mongodb://localhost:27017/Marketplace';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Product model
const Product = mongoose.model('Product', {
    name: String,
    description: String,
    price: Number,
    quantity: Number,
    category: String
});

// Controller - Handling GET request for products
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// routes for CRUD operations
const productRoutes = require('./routes/productRoutes');
app.use('/products', productRoutes);

// Basic Route Test
// app.get('/', (req, res) => {
//     res.send('MongoDB Works!!');
//   });



// Start Express server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});