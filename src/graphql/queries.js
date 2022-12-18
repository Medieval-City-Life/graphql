const UserService = require('../services/user');
const InventoryService = require('../services/inventory');
const ErrorHandling = require('../utils/errorHandling');

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
};

module.exports = queries;
