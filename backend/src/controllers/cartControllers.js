const Cart = require('../models/cartModel');

exports.addItemToCart = async (req, res) => {
  try {
    const existingItem = await Cart.findOne({
      userID: req.user._id,
      itemID: req.params.p_id,
    });
    if (existingItem) {
      existingItem.quantity += 1;
      const updatedItem = await existingItem.save();
      res.status(200).json({
        status: 'success',
        message: 'Item added to cart.',
        updatedItem,
      });
    } else {
      const item = new Cart({
        userID: req.user._id,
        itemID: req.params.p_id,
        quantity: 1,
      });

      await item.save();

      res.status(200).json({
        status: 'success',
        message: 'Item added to cart.',
        item,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: 'Unable to add item to the cart.',
      error: err.message,
    });
  }
};

exports.getCartItems = async (req, res) => {
  const match = { userID: req.user._id };
  try {
    const items = await Cart.find(match).sort({ createdAt: -1 }).populate('itemID').lean();

    res.status(200).json({
      status: 'success',
      items, 
    }); 
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: 'Unable to get cart items.',
      error: err.message,
    });
  }
};

exports.removeCartSingleItem = async (req,res) => {
    const itemID = req.params.p_id;

    try {
        const item = await Cart.findOne({itemID, userID: req.user._id})
        if(item){
            item.quantity -= 1;
            const updatedItem = await item.save()
            res.status(200).json({
                status: 'success',
                message: 'Item removed from cart.',
                updatedItem,
              });
        }else{
            res.status(404).json({
                status: 'fail',
                message: 'Item does not exist.'
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'error',
            message: 'Unable to remove item from the cart.',
            error: err.message,
          });
    }
}

exports.deleteCartItem = async (req, res) => {
  const itemID = req.params.p_id;

  try {
    const item = await Cart.findOneAndDelete({ itemID, userID: req.user._id });

    if (!item) {
      return res.status(404).json({
        status: 'fail',
        message: 'Item does exist in the cart.',
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'Item removed from the cart.',
      item,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: 'Unable to remove item from the cart.',
      error: err.message,
    });
  }
};

exports.removeItems = async (req,res) => {

  try {
    const items = await Cart.deleteMany({userID : req.user._id});

    res.status(200).json({
      status: 'success',
      items
    })

  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: 'unable to empty users cart',
      error: err.message
    })
  }
}