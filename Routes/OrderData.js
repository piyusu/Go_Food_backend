const express = require('express');
const router = express.Router();
const Order = require('../models/Orders'); // Make sure this is the correct import

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data;
    await data.splice(0, 0, { Order_date: req.body.order_date });

    // Check if email exists in DB
    let eId = await Order.findOne({ email: req.body.email }); // Make sure 'Order' is used here
    console.log(eId);

    if (eId === null) {
        try {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            });
            return res.json({ success: true }); // Use return to prevent falling through
        } catch (error) {
            console.log(error.message);
            return res.status(500).send("Server error: " + error.message); // Proper error handling
        }
    } else {
        try {
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );
            return res.json({ success: true }); // Use return to prevent falling through
        } catch (error) {
            return res.status(500).send("Server error: " + error.message); // Proper error handling
        }
    }
});

router.post('/myorderData', async (req, res) => {
try {
    let myData = await Order.findOne({email: req.body.email})
    res.json({orderData: myData})
} catch (error) {
    return res.status(500).send("Server error: " + error.message); // Proper error handling
}
})

module.exports = router;







