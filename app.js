const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const jwt = require('jsonwebtoken');
const multer = require("multer");
const fs = require("fs");
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    
});

const adminSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    
});

const menuItemSchema = new mongoose.Schema({
    name: String,
    photo: String,
    description: String,
    price: Number,
    rating: Number,
    reviews: [String]
});

const orderSchema = new mongoose.Schema({
    studentId: String,
    items: [{
        itemId: mongoose.Schema.Types.ObjectId,
        quantity: Number
    }],
    schedule: Date,
    status: { type: String, default: 'Pending' },
    paymentStatus: { type: String, default: 'Pending' }
});

const adminModel = mongoose.model('Admin', adminSchema);
const MenuItem = mongoose.model('MenuItem', menuItemSchema);
const Order = mongoose.model('Order', orderSchema);
const userModel = mongoose.model('User', userSchema);
const bcrypt = require('bcrypt');

app.get('/', (req, res) => {
    res.send('Welcome to Canteen Management System');
});


//---------------------LOGIN AUTH SECTION-------------------------//
app.get('/register', async (req, res) => {
    res.send('Register');
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ email: user.email, userid: user._id }, "shhhh", { expiresIn: "1h" });
    res.json({ message: 'Login successful', token, user });
});

app.post('/admin/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await adminModel.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ email: user.email, userid: user._id }, "shhhh", { expiresIn: "1h" });
    res.json({ message: 'Login successful', token, user });
});

const cookieParser = require('cookie-parser');
app.use(cookieParser());


app.post("/register" , async (req,res) =>{
    let {name,email, password} = req.body;

    let user = await userModel.findOne({email});
    if(user) return res.status(500).send("user already registered");

    bcrypt.genSalt(10,(err, salt) =>{
        bcrypt.hash(password, salt, async  (err, hash) =>{
            let user = await userModel.create({
                name,
                email,
                password:hash,
            });
            let token = jwt.sign({email: email, userid: user._id},"shhhh");
            res.cookie("token",token);
            res.send("index");
            console.log(name); 
        })
   })
});

//---------------------------------CANTEEN----------------------------------------//

//CANTEEN ADMIN - ADD ITEM TO MENU//
app.post('/menu/add', async (req, res) => {
    const { name, description, price, rating, photo } = req.body;

    // Ensure required fields are provided
    if (!name || !description || !price || !rating || !photo) {
        return res.status(400).json({ message: "Please provide all required fields (name, description, price, rating, photo)" });
    }

    try {
        // Create a new menu item
        const newMenuItem = new MenuItem({
            name,
            description,
            price,
            rating,
            photo
        });

        // Save the menu item to the database
        await newMenuItem.save();

        // Return success response
        res.json({ message: "Menu item added successfully", menuItem: newMenuItem });

    } catch (error) {
        console.error("Error adding menu item:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Fetch Menu
app.get('/menu', async (req, res) => {
    const menu = await MenuItem.find();
    res.json(menu);
});

// Add Order
app.post('/order', async (req, res) => {
    const order = new Order(req.body);
    await order.save();
    
    // Automatically reject if not accepted in 10 mins
    setTimeout(async () => {
        const updatedOrder = await Order.findById(order._id);
        if (updatedOrder.status === 'Pending') {
            await Order.findByIdAndUpdate(order._id, { status: 'Cancelled' });
        }
    }, 10 * 60 * 1000);
    
    res.json({ message: 'Order placed successfully', order });
});

//--------------------------Admin Accept/Reject Order---------------------------------//
app.put('/order/:id/status', async (req, res) => {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    
    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }

    // Validating the status
    if (status !== 'Accepted' && status !== 'Rejected') {
        return res.status(400).json({ message: 'Invalid status. It should be either "Accepted" or "Rejected".' });
    }

    order.status = status;
    
    // If the order is accepted, you may want to perform any actions related to payment status, etc.
    if (status === 'Accepted') {
        order.paymentStatus = 'Pending';  // Or any status you prefer for accepted orders
    }

    await order.save();
    
    res.json({ message: `Order ${status}`, order });
});


// Payment Simulation (to be integrated with actual payment gateway)
app.post('/payment/:orderId', async (req, res) => {
    const order = await Order.findById(req.params.orderId);
    if (order.status === 'Accepted') {
        order.paymentStatus = 'Completed';
        await order.save();
        res.json({ message: 'Payment Successful' });
    } else {
        res.status(400).json({ message: 'Order not accepted yet' });
    }
});

// Order Cancellation
app.post('/order/:id/cancel', async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    
    const refundAmount = order.paymentStatus === 'Completed' ? order.totalPrice * 0.9 : 0;
    order.status = 'Cancelled';
    order.paymentStatus = 'Refunded';
    await order.save();
    
    res.json({ message: `Order cancelled. Refund Amount: ${refundAmount}` });
});


// ----------------------PRINTING SECTION-------------------------//

const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Order Schema
const OrderSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, required: true },
    document: { type: String, required: true },
    status: { type: String, default: "Pending" },
    color: { type: String, required: true },
    copies: { type: Number, required: true },
    paymentStatus: { type: String, default: "Pending" },
});

const PrintOrder = mongoose.model("PrintOrder", OrderSchema);
  
// File Upload Setup (Using 'uploads' folder)
const path = require("path");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = "uploads/";
        
        // Ensure the uploads folder exists
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        // Ensure file.originalname exists before using path.extname
        if (!file.originalname) {
            return cb(new Error("Invalid file"), null);
        }
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });


// Upload Document API
app.post("/upload", upload.single("document"), async (req, res) => {
    try {
        const { userID, color, copies } = req.body;

        // Validate if file was uploaded
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(userID)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        // Convert color to Boolean
        const isColor = color.toLowerCase() === "true" ? "true" : "false";
        



        // Convert copies to Number and validate
        const numCopies = parseInt(copies, 10);
        if (isNaN(numCopies) || numCopies <= 0) {
            return res.status(400).json({ message: "Invalid number of copies" });
        }

        // Create order
        const newOrder = new PrintOrder({
            userID,
            document: req.file.filename,
            color: isColor,
            copies: numCopies,
        });

        await newOrder.save();
        res.json({ message: "Document uploaded successfully", order: newOrder });
        console.log('Received color:', color);


    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Fetch Orders (For Shop Owner) for ADMIN
app.get("/Printorders", async (req, res) => {
    const orders = await PrintOrder.find();
    res.json(orders);
  });
  
  // Accept Order (Shop Owner)
  app.put("/accept/:id", async (req, res) => {
    await PrintOrder.findByIdAndUpdate(req.params.id, { status: "Accepted" });
    res.json({ message: "Order Accepted" });
  });
  
  // Reject Order
  app.put("/reject/:id", async (req, res) => {
    await PrintOrder.findByIdAndUpdate(req.params.id, { status: "Rejected" });
    res.json({ message: "Order Rejected" });
  });
  
          
  

app.listen(5000, () => console.log('Server running on port 5000'));


