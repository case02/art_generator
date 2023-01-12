// +-+-+-+-+-+-+-+-+-+-+-+-+
// |D|E|P|E|N|D|E|N|C|I|E|S|
// +-+-+-+-+-+-+-+-+-+-+-+-+
require('dotenv').config();
// access node packages
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const userCtrl = require('./controllers/users');
// +-+-+-+-+-+-+-+-+-+-+
// |M|I|D|D|L|E|W|A|R|E|
// +-+-+-+-+-+-+-+-+-+-+
// cors allows our frontend to communicate with the backend
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// +-+-+-+-+-+-+
// |R|O|U|T|E|S|
// +-+-+-+-+-+-+
app.get('/', function (req, res) {
	return res.json({
		message: 'Hello world!',
		success: true,
	});
});

app.post('/test', function (req, res) {
	return res.json({
		message: 'Welcome :>',
		success: true,
	});
});

// app.use('/user', userCtrl);

// Firedbase ADMIN SDK
var admin = require('firebase-admin');

var serviceAccount = require('./fern-stack-1a914-firebase-adminsdk-hnrxy-800f8c5f60.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://fern-stack-1a914-default-rtdb.firebaseio.com',
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
	console.log(`listening on *${PORT}`);
});
