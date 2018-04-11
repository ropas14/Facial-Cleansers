//Import the mongoose module
var mongoose = require('mongoose');
//Set up default mongoose connection
var mongoDB = 'mongodb://localhost:27017/Sites';
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//Define a schema
var Schema = mongoose.Schema;
var CleanserSchema = new Schema({
   url: String,
   brand: String,
   category: String,
   ingredients: Array,
   Corcerns: Array,
});

// Compile model from schema
var Facials = module.exports = mongoose.model('FacialCleansers', CleanserSchema);
module.exports.saveData = function(item) {
   var data = new Facials(item);
   var promise = data.save();
   return promise;
}
module.exports.closeConnection = function() {
   db.close();
}
// get Facial Cleansers
module.exports.getAllCleansers = (callback, limit) => {
   Facials.find(callback).limit(limit);
}
// get Facial Cleanser by Id
module.exports.getCleansersById = function(id, callback) {
   Facials.findById(id, callback);
}
// Add Facial Cleanser
module.exports.addCleanser = function(cleanser, callback) {
   Facials.create(cleanser, callback);
}
// Update Facial Cleanser
module.exports.updateCleanser = function(id, cleanser, options, callback) {
   var query = {
      _id: id
   }
   var update = {
      url: cleanser.url,
      brand: cleanser.brand,
      category: cleanser.category,
      ingredients: cleanser.ingredients,
      Corcerns: cleanser.Corcerns,
   }
   Facials.findOneAndUpdate(query, update, options, callback);
}
// Delete Facial Cleanser
module.exports.removeCleanser = function(id, callback) {
   var query = {
      _id: id
   }
   Facials.remove(query, callback);
}