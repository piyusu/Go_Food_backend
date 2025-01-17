const mongoose = require('mongoose');

// Your MongoDB connection URI
const mongoURI = 'mongodb+srv://piyush2003:Piyush%40123@piyush.8nw9d.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Piyush';

// Function to connect to MongoDB and fetch data
const mongoDB = async () => {
  try {
    // Connecting to MongoDB
    await mongoose.connect(mongoURI, {
    });
    console.log('Connected to MongoDB');

    // Fetching the "food_items" collection
    const fetched_data = mongoose.connection.db.collection('food_items');
    const foodItemsData = await fetched_data.find({}).toArray();

    // Fetching the "food_category" collection
    const fetched_category = mongoose.connection.db.collection('food_category');
    const foodCategoryData = await fetched_category.find({}).toArray();

    // Assigning fetched data to global variables
    global.food_items = foodItemsData;
    global.foodCategory = foodCategoryData;
    // console.log(foodItemsData);
    // console.log(foodCategoryData);

    console.log('Data fetched');
  } catch (err) {
    console.error('Connection Error or Data Fetch Error:', err);
  }
};

// Exporting the mongoDB function
module.exports = mongoDB;

