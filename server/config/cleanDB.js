const mongoose = require('mongoose');
const models = require('../models');
const db = require('./connection.js');

module.exports = async (modelName, collectionName) => {
    try {
      let modelExists = await models[modelName].db.db.listCollections({
        name: collectionName
      }).toArray()
  
      if (modelExists.length) {
        await db.dropCollection(collectionName);
      }
    } catch (err) {
      throw err;
    }
  }