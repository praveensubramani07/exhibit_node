const mongoose = require('mongoose');
const url = 'mongodb+srv://praveen01:praveen001@cluster0.5ulr1mm.mongodb.net/';
(async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
})();

module.exports=mongoose;