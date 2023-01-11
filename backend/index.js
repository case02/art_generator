// +-+-+-+-+-+-+-+-+-+-+-+-+
// |D|E|P|E|N|D|E|N|C|I|E|S|
// +-+-+-+-+-+-+-+-+-+-+-+-+
// access node packages
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
// Firedbase ADMIN SDK
var admin = require('firebase-admin');

var serviceAccount = require('./fern-stack-1a914-firebase-adminsdk-hnrxy-800f8c5f60.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://fern-stack-1a914-default-rtdb.firebaseio.com',
});
// +-+-+-+-+-+-+-+-+-+-+
// |M|I|D|D|L|E|W|A|R|E|
// +-+-+-+-+-+-+-+-+-+-+
// cors allows our frontend to communicate with the backend
app.use(cors());
// body parser: used for POST/PUT/PATCH routes: this will take incoming strings from the request body that are url encoded and parse them into an object that can be accessed in the request parameter as a property called body (req.body).
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// method-override allows us to interpret POST requests from the browser as another request type: DELETE, PUT, etc.
// app.use(methodOverride("_method"));

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

app.listen(3000, () => console.log('Example app listening on port 3000'));
