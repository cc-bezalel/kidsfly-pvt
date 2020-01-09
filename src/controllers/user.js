import {
  findUser,
  findUsers,
  createUser,
  updateUser,
  deleteUser,
  findUserByLogin,
  findUserByEmail,
  allUsers
} from "../models/user";
import { createToken } from "../middleware/verifyToken";
import jwt, { Secret } from "jsonwebtoken";
import bcrypt from "bcryptjs";


export const getAllUsers = async (req, res, next) => {
  const paramsId = req.params.id;
  if (!paramsId) {
    try {
      const { id } = req.token;
      const user = await allUsers();
      if (user === undefined) {
        return res.status(404).json({ msg: "404: User cannot be found." });
      }

      res.status(200).json(user);
    } catch (e) {
      e.statusCode = 400;
      next(e);
    }
  } else {
    try {
      const { id } = req.params;
      const user = await findUser(id);
      if (!user) {
        return res.status(404).json({ msg: "404: User cannot be found." });
      }
      res.status(200).json(user);
    } catch (e) {
      e.statusCode = 400;
      next(e);
    }
  }
};

export const get = async (req, res, next) => {
  const paramsId = req.params.id;
  if (!paramsId) {
    try {
      const { id } = req.token;
      const user = await findUser(id);
      if (user === undefined) {
        return res.status(404).json({ msg: "404: User cannot be found." });
      }

      res.status(200).json(user);
    } catch (e) {
      e.statusCode = 400;
      next(e);
    }
  } else {
    try {
      const { id } = req.params;
      const user = await findUser(id);
      if (!user) {
        return res.status(404).json({ msg: "404: User cannot be found." });
      }
      res.status(200).json(user);
    } catch (e) {
      e.statusCode = 400;
      next(e);
    }
  }
};

export const post = async (req, res, next) => {
  try {
    const {
      email,
      first_name,
      last_name,
      phone,
      password,
      airport,
      is_admin
    } = req.body;
    if (email && password) {
      const newUser = await createUser(req.body);
      console.log(newUser, 'contr');
      res.status(200).json({   messsage: "registered successfully"  });
    }
  } catch (error) {
    console.log(error)
    if (Object.values(error).includes('user_email_unique') || Object.values(error).includes('duplicate key')) {
      return res.status(409).json({
        status: 409,
        error: 'email cannot be registered twice',
      });
    }
    next(error);
  }
};

export const put = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.body;
    const updatedUser = await updateUser(id, user);
    res.status(201).json({ token: `${createToken(updatedUser[0])}`,  message: 'user updated successfully'  });
  } catch (e) {
    e.statusCode = 400;
    next(e);
  }
};

export const deleteU = async (req, res, next) => {
  try {
    const { id } = req.params;
    const delUser = await deleteUser(id);
    if(delUser == 1) {
    res.status(201).json({ message: ` The user with  has been removed`});
    } else {
      res.status(401).json({ message: ` User not found`});
    }
  } catch (e) {
    e.statusCode = 400;
    next(e);
  }
};
