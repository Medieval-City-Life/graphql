const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId;

const skillSchema = new Schema(
  {
    user: { type: ObjectId, required: true, ref: 'User' },
    logging: { type: Number, default: 0 },
    farming: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);

//Export function to create "Token" model class
module.exports = mongoose.model('Skill', skillSchema);