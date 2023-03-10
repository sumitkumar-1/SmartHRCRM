const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const { v4: uuidv4 } = require('uuid');

const createUser = async (request, response) => {
    const { email, password, role, firstname, lastname, dob, sex, city, country } = request.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    User.query("email").eq(email).exec((error, results) => {
      if(error) {
        return response.status(400).json({ message: error });
      } else {
        if(results.count == 0) {
          const user = new User({ id: uuidv4(), email, password: hashedPassword, role, firstname, lastname, dob, sex, city, country });
          try {
              user.save();
              response.status(201).json(user);
          } catch (err) {
              response.status(400).json({ message: err.message });
          }
        } else {
          return response.status(409).json({ message: "User already exist" });
        }
      }
    });
};

const getUsers = async (request, response) => {
  User.scan().exec((error, results) => {
    if(error) {
      response.status(500).json({ message: "Failed: " + error });
    } else {
      response.json(results);
    }
  });
};

const getUserById = async (request, response) => {
    const { id } = request.params;

    try {
        const user = await User.get(id);
        if (!user) {
            return response.status(404).json({ message: 'User not found' });
        }
        response.json(user);
    } catch (err) {
        response.status(500).json({ message: err.message });
    }
};

const deleteUser = async (request, response) => {
  const { id } = request.params;

  try {
    const user = await User.get(id);
    user.delete();
    return response.status(200).json({ message: "User deleted - " + id });
  } catch (err) {
    response.status(500).json({ message: "Failed to delete user - " + id });
  }
};

const updateUser = async (request, response) => {
  const { id } = request.params;
  const hashedPassword = await bcrypt.hash(request.body.password, 10);
  const updates = {
    firstname: request.body.firstname,
    lastname: request.body.lastname,
    email: request.body.email,
    password: hashedPassword,
    role: request.body.role,
    dob: request.body.dob,
    sex: request.body.sex,
    city: request.body.city,
    country: request.body.country
  };

  User.query("id").eq(id).exec((error, results) => {
    if(error) {
      return response.status(400).json({ message: error });
    } else {
      if(results.count == 0) {
        return response.status(404).json({ message: "User not found" });
      } else {
        User.update(id, updates, (error, user) => {
          if(error) {
            return response.status(400).json({ message: error });
          }else {
            return response.json(user);
          }
        });
      }
    }
  });
};

module.exports = {
    createUser,
    getUsers,
    getUserById,
    deleteUser,
    updateUser
};