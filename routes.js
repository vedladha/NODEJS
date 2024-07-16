const authenticateToken = require('../middlewares/authMiddleware.js');
const express = require('express');
const User = require('../models/models.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const controller = require('../controllers/controller.js');
const path = require("path");

router.post('/addDoc',authenticateToken,controller.insertData);
router.put('/updDoc',authenticateToken,controller.updateData);
router.get('/getEntry',authenticateToken,controller.findData);
router.delete('/delEntry',authenticateToken,controller.deleteData);

// User registeration
router.get('/api/register.js', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "/views/register.js"));
});


router.post('/api/register' , async(req,res) => {

    try{
        const {username , password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ username , password : hashedPassword});
        await user.save(200);
        res.status(201).json({message : 'User registered succesfully'});
    }catch(error){
        console.log(error)
        res.status(500).json({error: 'Registeration failed'});
    }
});

router.get('/api/register', (req,res) => {
    res.render('register');
});


router.post('/api/login' , async(req,res) =>{
    try{
        const {username  , password} = req.body;
        const user = await User.findOne({username});
        if(!user){
            return res.status(401).json({error : 'Authentication failed'});
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            return res.status(401).json({error : 'Authentication failed'});
        }
        const token = jwt.sign({userId: "667994ba1964a81456d1d141"} , 'kkre#hrtstr32#1', {
            expiresIn: '1hr'
        });
        res.cookie('jwt', token, { httpOnly: true });
        return res.json({username});
    }catch(error){
        console.log(error);
        res.status(500).json({error : 'Login Failed'});
        
    }
    
});

router.get('/api/login', (req,res) => {
    res.render("login");
})


router.get('/api/dashboard', authenticateToken, async (req, res) => {
    try {
        const { userId } = req;
        const user = await User.findOne({ _id: userId }); 

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        console.log({ username: user.username });
        res.render('dashboard', { username: user.username } );

    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Server error' });
    }
    
});


router.get('/api/login.js', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "/views/login.js"));
});

//To update the data
router.put("/update",authenticateToken, async(req, res)=>{
    try {
        const{ username, password} = req.body;
        const hashedPassword = await bcrypt.hash(password,12);
        const result = await NewUserSchema.updateOne(
            { password : password},
            { $set: {username: username}},
        );
     res.json({message: result});
     } catch (error){
     console.log({message: error});
    }
});

// To find the data
router.get("/find", authenticateToken, async (req, res) => {
    try {
       console.log(req.query.un);
       const result = await NewUserSchema.findOne({ username: req.query.un});
       res.json({message: result});
   } catch (error){
       console.log({message: error});
   }
});


// To delete the data
router.delete("/delete",authenticateToken, async(req,res)=>{
   try{
       const {username} = req.body ;
       const result = await NewUserSchema.deleteOne(
           {username: username},
   );
   res.json({message: result});
   } catch (error){
   console.log({message: error});
  
   }
});

module.exports = router;