const Community = require('../models/Community');
const User = require('../models/User');

const createCommunity = async (name, crest, user) => {
  const community = await Community.findOne({ name });

  if (community) return { success: false, code: 1, msg: 'Community name already taken.' };
  
  const comm = await Community.create({
    name,
    crest,
    owner: user,
  });

  await user.updateOne({
    community: comm
  });

  return { success: true }
};

const getMyCommunity = async (user) => {
  const com = await Community.findById(user.community).populate('owner').lean();
  const memberCount = await User.countDocuments({ community: com });
  
  return {
    ...com,
    memberCount
  }
}

module.exports = {
  createCommunity,
  getMyCommunity
};
