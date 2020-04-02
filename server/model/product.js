const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productSchema = new Schema({
  // author: ObjectId,
  coverImage: String,
  icon: String,
  name: { type: String, required: true, max: [60, '最大60文字まで'] },
  price: { type: Number, required: true },
  description: String,
  heading1: String,
  heading2: String,
  heading3: String,
  heading1text: String,
  heading2text: String,
  heading3text: String
});

module.exports = mongoose.model('product', productSchema);