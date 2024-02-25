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



// video call
// const express = require('express');
const http = require('http');
const WebSocket = require('ws');

// const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log('Received message:', message);

    // Handle signaling messages (ICE candidates, SDP offers/answers)
    // Forward the messages to the appropriate peer
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});


//end
app.listen(port, () => console.log(`Server running on port ${port}`));