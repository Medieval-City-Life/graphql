const Community = require('../models/Community');
const User = require('../models/User');
const Building = require('../models/Building');

const getBuildings = async (user) => {
  return await Building.find({
    community: user.community
  }).populate('products.itemDef owner')
}

module.exports = {
  getBuildings
};
