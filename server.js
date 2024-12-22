// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// เชื่อมต่อ MongoDB
mongoose.connect('mongodb://localhost:27017/computerStore', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// สร้าง Schema สำหรับสินค้าคอมพิวเตอร์
const productSchema = new mongoose.Schema({
  name: String,
  brand: String,
  price: Number,
  description: String
});

const Product = mongoose.model('Product', productSchema);

// API สำหรับดึงสินค้าทั้งหมด
app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// API สำหรับเพิ่มสินค้า
app.post('/api/products', async (req, res) => {
  const { name, brand, price, description } = req.body;
  const newProduct = new Product({ name, brand, price, description });
  await newProduct.save();
  res.json(newProduct);
});

// API สำหรับลบสินค้า
app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.json({ message: 'Product deleted' });
});

// เริ่มต้นเซิร์ฟเวอร์
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
