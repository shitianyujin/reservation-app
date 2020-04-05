const express = require('express');
const router = express.Router();
const Product = require('../model/product');

router.get('', function (request, response) {
  Product.find({}, function (error, foundProduct) {
    return response.json(foundProduct);
  });
});

router.get('/:productId', function (request, response) {
  const productId = request.params.productId;

  Product.findById(productId, function (error, foundProduct) {
    if (error) {
      return response.status(422).send({
        errors: [
          {
            title: 'Product error',
            detail: 'Product not found'
          }
        ]
      })
    }

    return response.json(foundProduct);
  });
});

module.exports = router;