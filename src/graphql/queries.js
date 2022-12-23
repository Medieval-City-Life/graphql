const ErrorHandling = require('../utils/errorHandling');

const UserService = require('../services/user');
const InventoryService = require('../services/inventory');
const CommunityService = require('../services/community');
const BuildingService = require('../services/building');

const queries = {
  users: (_, { sorting, pagination, filter }) => {
    return UserService.getUsers(pagination, sorting, filter);
  },
  myUser: (_, args, context) => {
    if (!context.user)
      ErrorHandling.handleError('No user context', {
        method: 'myUser',
        context,
      });

    return context.user;
  },
  getInventory: (_, args, context) => {
    if (!context.user)
      ErrorHandling.handleError('No user context', {
        method: 'getInventory',
        context,
      });

    return InventoryService.getInventory(context.user);
  },
  getMyCommunity: (_, args, context) => {
    if (!context.user)
      ErrorHandling.handleError('No user context', {
        method: 'getMyCommunity',
        context,
      });

    return CommunityService.getMyCommunity(context.user);
  },
  getBuildings: (_, args, context) => {
    if (!context.user)
      ErrorHandling.handleError('No user context', {
        method: 'getBuildings',
        context,
      });

    return BuildingService.getBuildings(context.user);
  },
};

module.exports = queries;
