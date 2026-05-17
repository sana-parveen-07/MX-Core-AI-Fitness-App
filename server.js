const express = require('express');
const path = require('path')
const userRoute = require('./routes/userRoute')
const mongoose = require('mongoose');
const app = express();
app.use(express.urlencoded({ extended: true }));
const port = 3000;

//db
mongoose.connect('mongodb://127.0.0.1:27017/bmiApp', {
}).then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));


app.use('/',userRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});







