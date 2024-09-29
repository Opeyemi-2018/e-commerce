import { User } from "../models/userModels.js";
import { errorHandler } from "../utils/error.js";

export let getUsers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "only admin can see users"));
  }
  try {
    let users = await User.find();
    let userWithoutPassword = users.map((user) => {
      let { password, ...rest } = user._doc;
      return rest;
    });

    res.status(200).json({ users: userWithoutPassword });
  } catch (error) {
    console.log(error);
  }
};

export let deleteUser = async (req, res, next) => {
  if (!req.user.isAdmin && req.user.id !== req.params.id) {
    return next(errorHandler(401, "you can only delete your account"));
  }
  let { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.clearCookie("access_token");
    res.status(200).json("user deleted successfully");
  } catch (error) {
    next(error);
  }
};
