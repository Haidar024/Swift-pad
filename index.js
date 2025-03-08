const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true})); 
//to handle our files 
app.use(express.static(path.join(__dirname , "public")));  
//this line use for to joint our frntend css,vanilla javascript (ye line css aur js ko frontend pe dikhane ke liye use hota hai) 
app.set('view engine', 'ejs')  
//to set our ejs file engine to show in frontend

// to get the main notepad
app.get('/', (req,res)=> {
    fs.readdir(`files/`, (err,files)=> {
        res.render("index" , {files : files});
    })
})

//to read a file like readmore
app.get('/file/:filename', function(req,res){
    fs.readFile(`./files/${req.params.filename.trim()}`,"utf-8", (err,filedata) => {
        res.render('readfile', {filename: req.params.filename, filedata: filedata});
    })
})

//to created a new note 
app.post('/created', (req,res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details , (err) => {
        res.redirect('/');
    })
})

//to rename the file name
app.post('/editfile', (req,res)=>{
    fs.rename(`./files/${req.body.old}`, `./files/${req.body.new}`, (err) => {
        res.redirect('/');
    })
})

//to read the file name page
app.get('/editfile/:filename',function(req,res){
    fs.readFile(`./files/${req.params.filename.trim()}`,"utf-8", (err) => {
        res.render('edit',{filename: req.params.filename});
    })
})

app.listen(9000, ()=>{
    console.log("port is runnig")
}) 