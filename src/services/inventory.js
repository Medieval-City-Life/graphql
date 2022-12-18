const Item = require('../models/Item');
const ItemDef = require('../models/ItemDef');

const getInventory = async (user) => {
  return await Item.find({
    user,
  }).populate('itemDef');
};

module.exports = {
  getInventory,
};
