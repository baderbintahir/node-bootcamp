exports.getAllUsers = (req, res) => {
  res.status(200).json({ status: "success", message: "All users" });
};

exports.getUser = (req, res) => {
  res.status(200).json({ status: "success", message: "User" });
};

exports.createUser = (req, res) => {
  res.status(200).json({ status: "success", message: "Create user" });
};

exports.updateUser = (req, res) => {
  res.status(200).json({ status: "success", message: "Update user" });
};

exports.deleteUser = (req, res) => {
  res.status(200).json({ status: "success", message: "Delete user" });
};
