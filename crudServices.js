const userData = require("../models/models.js");

const findData = async (data) => {
  try {
    const { username, email} = data;
    if (username && email) {
      const found = await userData
        .findOne({
          email: email,
          username: username,
        })
        .exec()
        .select("-age");
    } else if (username) {
      const found = await userData
        .findOne({
          username: username,
        })
        .exec();
    } else if (email) {
      const found = await userData
        .findOne({
          email: email,
        })
        .exec()
        .select("-age");
    } else found = null;
    return found;
  } catch (err) {
    console.error(err);
    return 500;
  }
};

const insertData = async (data) => {
  try {
    const { username, email, age } = data;
    const user = new userData({
      username,
      email,
      age,
    });
    await user.save();
    return user;
  } catch (err) {
    console.log(err);
    return 500;
  }
};

const deleteData = async (data) => {
  try {
    const { username, email, age } = data;
    const user = { username, email, age };
    const result = await findOneAndDelete(user).exec();
    return result;
  } catch (err) {
    console.error(err);
    return 500;
  }
};

const updateData = async (data) => {
  try {
    const { username, email, age, newUsername, newAge } = data;
    var nName = (newAge = false);
    if (newUsername) nName = true;
    if (newUsername) newAge = true;
    const filter = {
      username,
      email,
      age,
    };
    // constructor for newdata
    var newData = {};
    if (nName && newAge) {
      newData = {
        username: newUsername,
        age: newAge,
      };
    } else if (nName) {
      newData = {
        username: newUsername,
      };
    } else if (newAge) {
      newData = {
        age: newAge,
      };
    }
    const updated = await userData
      .findOneAndUpdate(filter, newData, { new: true })
      .select("-age");
    return updated;
  } catch (err) {
    console.error(err);
    return 500;
  }
};

module.exports = {
  findData,
  insertData,
  deleteData,
  updateData,
};
