var express = require('express')
var router = express.Router()
//var db = require("../Databases/Database")
const { spawn } = require('child_process');
const axios = require('axios');
let data = []
let history = []
router.get('/newchat', (req, res) => {
  if(req.session.loggedin){
    data.splice(0,data.length)
    res.redirect("/chatgpt")
  }else{
    req.flash('error', 'Please login to access this page')
    res.redirect("/user/login")
  }
  
});

router.get('/', (req, res) => {
  if(req.session.loggedin){
    let email = req.session.userId;
    res.render("chat", {data: data, history: history, email: email})
  }else{
    req.flash('error', 'Please login to access this page')
    res.redirect("/user/login")
  }
  
});

router.post('/new', async (req, res) => {
  let question = req.body.message
  if(req.session.loggedin){
  if(question != ""){
    const pythonProcess = spawn('python', ['api/app.py']);
    const dataToSend = question;
    pythonProcess.stdin.write(dataToSend);
    pythonProcess.stdin.end();
    let result = '';
    pythonProcess.stdout.on('data', (data) => {
    result = data.toString();
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        data.push({"question": question, "answer": result})
        history.push({"question": question, "answer": result})
        //console.log(result);
        res.redirect('/chatgpt');
      } else {
        res.status(500).send('Error processing data');
      }
    });
    
  }
  }else{
    req.flash('error', 'Please login to access this page')
    res.redirect("/user/login")
  }
});
module.exports = router;