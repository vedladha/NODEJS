const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

mongoose.connect('mongodb+srv://adminuser:mIa5vkQxa7gmMK8a@cluster0.rkjbmjt.mongodb.net/').then(() => {
  console.log(`successfully connected`);
}).catch((e) => {
  console.log(`not connected`);
}); 

module.exports = mongoose.connect;
