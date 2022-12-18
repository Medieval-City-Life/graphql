const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId;

const itemDefSchema = new Schema(
  {
    name: { type: String },
    category: { type: String },
  }
);

module.exports = mongoose.model('ItemDef', itemDefSchema);
