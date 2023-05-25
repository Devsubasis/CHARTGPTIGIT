var express = require('express')
var router = express.Router()
//var db = require("../Databases/Database")
let user = [{
  username: "subasismallick123@gmail.com",
  password: "123456"
},
{
  username: "subratmohanty909@gmail.com",
  password: "123456"
},
{
  username: "subasismallick2@gmail.com",
  password: "123456"
}
]

router.get('/', (req, res) => {
  res.redirect("/user/login")
});
router.get('/login', (req, res) => {
  if(req.session.loggedin){
    res.redirect("/chatgpt")
  }else{
    res.render("login")
  }
  
});

router.post('/login', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  if(username && password){
    let users = user.filter(o=> o.username === username);
    if(users.length != 0){
      if(password === users[0].password){
        req.session.loggedin = true;
        req.session.userId = users[0].username;
        res.redirect("/chatgpt/newchat")
      }else{
        req.flash('error', 'Incorrect Password')
        res.redirect("/user/login")
      }
      
    }else{
      req.flash("error", "Incorrect Email ID")
      res.redirect("/user/login")
    }
    
  }else{
    req.flash("error", "Please enter email id and password")
      res.redirect("/user/login")
  }
});


router.get('/register', (req, res) => {
  res.render("register")
});

router.post('/register/new', (req, res) => {
  let email = req.body.email.trim();
  let password = req.body.password.trim();
  if(email && password){
     user.push({
      username: email,
      password: password
     })
      req.flash("success", "User registered successfully")
      res.redirect("/user/register")
  }else{
    req.flash("error", "Please enter email id and password")
      res.redirect("/user/register")
  }
}); 

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect('/user/login');
})
module.exports = router;