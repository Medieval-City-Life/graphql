const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId;

const communitySchema = new Schema(
  {
    owner: { type: ObjectId, required: true, ref: 'User' },
    name: String,
    crest: String,
    level: { type: Number, default: 1 }
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);

//Export function to create "Token" model class
module.exports = mongoose.model('Community', communitySchema);