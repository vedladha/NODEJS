const CRUDservices = require("../services/crudServices.js");
const jwt = require('jsonwebtoken');


module.exports = {
  insertData: async (req, res) => {
    const user = await CRUDservices.insertData(req.body);
    if (user == 500) res.status(500).end();
    else res.status(200).json(user);
  },
  deleteData: async (req, res) => {
    const result = await CRUDservices.deleteData(req.body);
    if (result == 500) res.status(500).end();
    else if (result == null) res.status(400).end();
    else res.status(200).json(result);
  },
  updateData: async (req, res) => {
    const updated = await CRUDservices.updateData(req.body);
    if (updated == 500) res.status(500).end();
    else if (updated == null) res.status(400).end();
    else res.status(200).json(updated);
  },
  findData: async (req, res) => {
    const found = await CRUDservices.findData(req.body);
    if (found == 500) res.status(500).end();
    else if (found == null) res.status(400).end();
    else res.status(200).json(found);
  },
};
