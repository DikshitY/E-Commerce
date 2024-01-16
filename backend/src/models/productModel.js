const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    //   unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: Number((Math.random() * 4 + 1).toFixed(1)),
    },
    reviews: {
      type: Number,
      default: Math.floor(Math.random() * 901 + 100),
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    offer: {
      type: Boolean,
      default: false,
    },
    currency: {
      type: String,
      default: 'Indian rupee',
    },
    imageUrl: {
        type: String,
        required: true
    }
  },
  { timestamps: true }
);

productSchema.methods.toJSON = function () {
    const product = this;
    const productObject = product.toObject();
  
    delete productObject.image;
    
    return productObject;
  };

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
