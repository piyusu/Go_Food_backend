const express = require('express');
const router = express.Router();

router.post('/foodData', (req, res) => {
  try{
    res.send([global.food_items, global.foodCategory])
  }catch(error) {
    console.error(error.message);
    res.send("server error")
  }

//   try {
//     if (!global.food_items || !global.foodCategory) {
//       return res.status(500).json({ message: 'Data not available yet' });
//     }

//     res.status(200).json({
//       food_items: global.food_items,
//       foodCategory: global.foodCategory
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching data', error });
//   }
});

module.exports = router;