const Product = require('../models/productModel');
const slugify = require('slugify');
const sharp = require('sharp');

exports.addProduct = async (req, res) => {
  try {
    const buffer = await sharp(req.file?.buffer).png().toBuffer();
    const product = await Product.create({
      ...req.body,
      slug: slugify(req.body.name),
      image: buffer,
    });

    res.status(201).json({
      status: 'success',
      message: 'Product added successfully.',
      product,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Unable to add product.',
      error: err.message,
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    if (!products) {
      return res.status(400).json({
        status: 'fail',
        message: 'Unable to get products. Bad request.',
      });
    }

    const formattedProducts = products.map((product) => {
      return {
        _id: product._id,
        name: product.name,
        price: product.price,
        category: product.category,
        brand: product.brand,
        rating: product.rating,
        reviews: product.reviews,
        description: product.description,
        quantity: product.quantity,
        offer: product.offer,
        currency: product.currency,
        slug: product.slug,
        imageUrl: `http://localhost:5000/api/v1/products/getProductImage/${product._id}`,
      };
    });

    res.json({
      status: 'success',
      results: formattedProducts.length,
      products: formattedProducts,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: 'Unable to get products',
      error: err.message,
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        status: 'fail',
        message: 'Product does not exists.',
      });
    }

    const formattedProduct = {
      _id: product._id,
      name: product.name,
      price: product.price,
      category: product.category,
      brand: product.brand,
      rating: product.rating,
      reviews: product.reviews,
      description: product.description,
      quantity: product.quantity,
      offer: product.offer,
      currency: product.currency,
      slug: product.slug,
      imageUrl: `http://localhost:5000/api/v1/products/getProductImage/${product._id}`,
    };

    res.send({
      status: 'success',
      product: formattedProduct,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Unable to get the product.',
      error: err,
    });
  }
};

exports.updateProduct = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    'name',
    'category',
    'price',
    'description',
    'price',
    'quantity',
    'image',
    'rating',
    'reviews',
    'offer',
  ];

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).json({
      status: 'fail',
      message: 'Please update correct field.',
    });
  }

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        status: 'fail',
        message: 'Product does not exists.',
      });
    }
    updates.forEach((update) => (product[update] = req.body[update]));
    await product.save();

    res.json({
      status: 'success',
      message: 'Product updated successfully.',
      product,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Unable to update product.',
      error: err,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.deleteOne({ _id: req.params.id });
    if (!product) {
      return res.status(404).json({
        status: 'fail',
        message: 'Product does not exists.',
      });
    }
    res.send();
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Unable to delete product.',
      error: err,
    });
  }
};

exports.getProductImage = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product || !product.image) {
      return res.status(404).json({
        status: 'fail',
        message: 'Product image does not exist.',
      });
    }

    res.set('Content-Type', 'image/png');
    res.send(product.image);
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Unable to get the product iamge.',
      error: err.message,
    });
  }
};
