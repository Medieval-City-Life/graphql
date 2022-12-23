const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId;

const ProductSchema = new Schema({
  itemDef: { type: ObjectId, ref: 'ItemDef' },
  rate: Number,
  last_collected: Date
})

const BuildingSchema = new Schema(
  {
    community: { type: ObjectId, required: true, ref: 'Community' },
    name: String,
    type: String,
    level: { type: Number, default: 0 },
    products: [ProductSchema],
    owner: { type: ObjectId, ref: 'User'}
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);

//Export function to create "Token" model class
module.exports = mongoose.model('Building', BuildingSchema); 