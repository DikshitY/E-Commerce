const Product = require('../models/productModel');
const slugify = require('slugify');
const cloudinary = require('../utils/cloudinary');

exports.addProduct = async (req, res) => {
  try {
    const file = req.files.image;

    cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
      if (err) {
        return res.status(500).json({
          error: err.message,
        });
      }

      const product = await Product.create({
        ...req.body,
        slug: slugify(req.body.name),
        imageUrl: result.url,
      });
      res.status(201).json({
        status: 'success',
        message: 'Product added successfully.',
        product,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: 'Unable to add product.',
      error: err.message,
    });
  }
};

exports.getProducts = async (req, res) => {
  const match = {};

  if (req.query.category) {
    match.category = req.query.category;
  }

  // const limit = parseInt(req.query.limit);
  // const skip = parseInt(req.query.skip);
  const sort = { createdAt: -1 };

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':');
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  }

  try {
    const products = await Product.find(match)
      // .limit(limit)
      // .skip(skip)
      .sort(sort)
      .lean();

    res.json({
      status: 'success',
      results: products.length,
      products,
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
        message: 'Product does not exist.',
      });
    }

    res.send({
      status: 'success',
      product,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Unable to get the product.',
      error: err.message,
    });
  }
};

// exports.updateProduct = async (req, res) => {
//   const updates = Object.keys(req.body);
//   const allowedUpdates = [
//     'name',
//     'category',
//     'price',
//     'description',
//     'price',
//     'quantity',
//     'image',
//     'currency',
//     'offer',
//     'imageUrl'
//   ];

//   const isValidOperation = updates.every((update) =>
//     allowedUpdates.includes(update)
//   );
//   if (!isValidOperation) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Please update correct field.',
//     });
//   }

//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({
//         status: 'fail',
//         message: 'Product does not exists.',
//       });
//     }
//     updates.forEach((update) => (product[update] = req.body[update]));
//     await product.save();

//     res.json({
//       status: 'success',
//       message: 'Product updated successfully.',
//       product,
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: 'fail',
//       message: 'Unable to update product.',
//       error: err,
//     });
//   }
// };

exports.updateProduct = async (req, res) => {
  try {
    if (req.files?.image) {
      const file = req.files.image;

      cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            error: err.message,
          });
        }
        const product = await Product.findByIdAndUpdate(req.params.id, {
          ...req.body,
          slug: slugify(req.body.name),
          imageUrl: result.url,
        });
        if (!product) {
          return res.status(404).json({
            status: 'fail',
            message: 'Product does not exists.',
          });
        }

        res.json({
          status: 'success',
          message: 'Product updated successfully.',
          product,
        });
      });
    } else {
      const product = await Product.findByIdAndUpdate(req.params.id, {
        ...req.body,
        slug: slugify(req.body.name),
      });

      if (!product) {
        return res.status(404).json({
          status: 'fail',
          message: 'Product does not exists.',
        });
      }

      res.json({
        status: 'success',
        message: 'Product updated successfully.',
        product,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: 'Unable to update product.',
      error: err.message,
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
    res.json({
      status: 'success',
      message: 'Product deleted successfully.',
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Unable to delete product.',
      error: err,
    });
  }
};
