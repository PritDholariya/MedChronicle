const express = require('express');
const connectDB = require('./config/db');
const User = require("./models/user");
const bodyParser = require('body-parser');
const cors = require('cors');
const QRCode = require('qrcode');

const cookieParser = require('cookie-parser');
const authRoutes = require("./Route/authRoutes");
const profileRoutes = require("./Route/profileRoute");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
connectDB();
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}

app.use(cors(corsOptions));
app.get('/', async (req, res) =>{ 
    
//    console.log(qrCodeImage)
    res.send('Hello world!')});
// app.get('/add_user', async (req, res) => {
//     const { username, type, email } = req.body;
//     const user = new User({ username, type, email });
//     await user.save();
//     res.json({ "user": user });
// });
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port}`));