
const express = require('express');
const authRoutes = require('./routes/routes.js');
const protectedRoute = require('./routes/protectedRoute');
const connectDB = require('./dbconnections');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());
app.set('view engine' , 'ejs');
app.set('views', "./views/")
app.use(express.static('public'));

app.get("/logout",(req,res)=>{
    res.clearCookie("jwt");
    res.render("login");
});

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/protected', protectedRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});