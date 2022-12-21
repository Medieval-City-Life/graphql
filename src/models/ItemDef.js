const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId;

const itemDefSchema = new Schema(
  {
    name: String,
    category: String,
    img: String
  }
);

module.exports = mongoose.model('ItemDef', itemDefSchema);
