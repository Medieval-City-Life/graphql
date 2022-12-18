const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId;

const itemSchema = new Schema(
  {
    user: { type: ObjectId, required: true, ref: 'User' },
    itemDef: { type: ObjectId, ref: 'ItemDef' },
    amount: Number
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);

itemSchema.statics.findOneOrCreate = function findOneOrCreate(
  condition,
  doc,
) {
  const self = this;
  const newDocument = doc;
  return new Promise((resolve, reject) => {
    return self
      .findOne(condition)
      .then((result) => {
        if (result) {
          return resolve(result);
        }
        return self
          .create(newDocument)
          .then((result) => {
            return resolve(result);
          })
          .catch((error) => {
            return reject(error);
          });
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

//Export function to create "Token" model class
module.exports = mongoose.model('Item', itemSchema);
