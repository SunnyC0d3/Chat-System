// Import validation
import validate from '../modules/components/validate.js';
// Import User Model
import UserModel, { USER_TYPES } from '../models/user.js';

export default {
  onGetAllUsers: async (req, res) => {
    try {
      const users = await UserModel.getUsers();
      return res.status(200).json({ success: true, users });
    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
  },
  onGetUserById: async (req, res) => {
    try {
      const user = await UserModel.getUserById(req.params.id);
      return res.status(200).json({ success: true, user });
    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
  },
  onCreateUser: async (req, res) => {
    try {
      const validation = validate((types) => ({
        payload: req.body,
        checks: {
          firstName: { type: types.string },
          lastName: { type: types.string },
          type: { type: types.enum, options: { enum: USER_TYPES } },
        },
      }));
      if (!validation.success) return res.status(400).json(validation);

      const { firstName, lastName, type } = req.body;
      const user = await UserModel.create({ firstName, lastName, type });

      return res.status(200).json({ success: true, user });
    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
  },
  onDeleteUserById: async (req, res) => {
    try {
      const user = await UserModel.deleteByUserById(req.params.id);
      return res.status(200).json({
        success: true,
        message: `Deleted a count of ${user.deletedCount} user.`,
      });
    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
  },
};
