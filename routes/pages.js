const express = require('express');
const mysql = require('mysql2');
const router = express.Router();
const fs=require('fs');
const  db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE
  });
  
  

router.get('/' , (req,res)=>{
    res.render('index.hbs')
})
router.get('/about', (req,res)=>{
    res.render('about.hbs');
})
router.get('/register' , (req,res)=>{
    res.render('register.hbs')
})
router.get('/login',(req,res)=>{
    res.render('login.hbs')
})
router.get('/home' ,(req,res)=>
{
    if(req.session.userId){
        // var name , image;
        db.query("select * from users where email = ?",[req.session.userId] , (err,result)=>{
                if(err){console.log(err);}
            //    const name = result[0].name;
                // const image = result[0].image;
                // console.log('name and image '+name);
                // console.log('name and image '+image);
                return res.render('home.hbs', {name:result[0].name ,image:result[0].image});
        })
    }else{
       res.redirect('/');
    }
})


router.get('/resume',(req,res)=>{

if(req.session.userId){
    var name , image;
    db.query("select * from users where email = ?",[req.session.userId] , (err,result)=>{
            name = result[0].name;
            image = result[0].image;
            console.log('name and image '+name);
            console.log('name and image '+image);
            return res.render('resume.hbs', {name ,image});
    })
}else{
   res.redirect('/');
}
})
router.get('/readfile',(req,res)=>
{
    if(req.session.userId)
    {
     var name , image;
    db.query("select * from users where email = ?",[req.session.userId] , (err,result)=>{
            name = result[0].name;
            image = result[0].image;
            console.log('name and image '+name);
            console.log('name and image '+image);
            fs.readFile('C:/Users/Manasi/Desktop/4th week/resume maker2/text.txt','utf8',(err,data)=>{
                if(err)
                {
                    console.log(err);
                }
                console.log(data);
                return res.render('readfile.hbs', { data, name, image });
            })
           // return res.render('resume.hbs', {name ,image});

    })
}else{
   res.redirect('/');
}
    }
)
//router.get('*',(req,res)=>{
  //  res.render('index.hbs')
//})
router.get('/logout' , (req,res)=>{
    // res.clearCookie('jwt');
    req.session.destroy();
    res.redirect('/');
})

module.exports = router;

