const  mysql = require('mysql2');
//const jwt = require('jsonwebtoken');
//const bcrypt = require('bcryptjs');
//const app = require('express');
var nodemailer=require('nodemailer');
//const session = require('express-session')
//var upload=require("express-fileupload");
const  db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE
  });
  /*
 
exports.register = (req,res)=>{
    const {name, email, password , imag, cpassword} = req.body;
    db.query("SELECT * FROM users WHERE email = ?",[email] ,async (error,result)=>{
        if(error) throw error;
        if(result.length > 0){
            return res.render('register.hbs' ,{
                message:'That email is alreay in use'
            });
        }else if(password !== cpassword){
            return res.render('register.hbs' , {
                message:'Password does not match!'
            });
        }

        let hashedPassword = await bcrypt.hash(password , 8);
        console.log(hashedPassword);
        console.log(req.files.uploaded_image.name);
        if (!req.files) {
            return res.render('register.hbs', {
                message: 'File not found'
            })
        }
          
        var file = req.files.uploaded_image;
        var img_name = file.name;

        if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {
            file.mv('public/images/uploaded_images/' + file.name, function (err) {
                if (err) 
                {
                    return res.status(500).send(err);
                }
        db.query("INSERT INTO users SET ? " , {name:name , email:email , password : hashedPassword,image:req.files.uploaded_image.name } , (errr,result)=>{
            if(errr){
                console.log(errr);
            }else{
                console.log(result);
                return res.render('register.hbs' , {
                    message:'User Registered'

                })
            }
        })
    })
}
else {
    message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
    res.render('register.hbs', { message: message });
}
   
var transport=nodemailer.createTransport( {
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    requireTLS:true,
    auth :{
        user: process.env.USER,//'manasikhankari757@gmail.com',
        pass:process.env.PASS,//'8777566754'
    }

} );
var mailoption={
    from:'manasikhankari757@gmail.com',
    to:email,
    subject:'register  successful',
   // body:"Thank you for visiting out website your registration is successful :)"
  html:`
  <html>

  <body>
  <img src="img/logo.png"><br><h1> welcome to our website<br> <p> your registration is successful.</p></h1>
  </body>
  </html>`
}
transport.sendMail(mailoption,function(err,info){
    if(err)
    {
        console.log(error);
    }
    else{
        console.warn("Email has been send",info.response);
    }
})

    
*/


exports.register = (req, res) => {
    const { name, email, uploaded_image, password, cpassword } = req.body;

    async function main() {
        let transporter = nodemailer.createTransport({
            pool: true,
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // use TLS
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            }
        });

        await transporter.sendMail({
            from: process.env.user, // sender address
            to: email, // list of receivers
            subject: "TeamNoob from Rusume Creator", // Subject line
            html:

                `
          <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
    <title></title>
</head>
<body>
    <div class="container">
        <div class="card" style="1px solid #dddddd;padding:5px">
            <div class="card-header p5 bg-seconday">
                <h3 class="text-center">ResumeGenerator</h3>
            </div>
            <div class="card-body">
                <p>Hi,</p>
                <p>You have successfully registered with us.Thanks for the registration and Welcome to ResumeGenerator.</p>
                <p>You can create here professional Resume.Quick go and create...</p>
                <i>Note:Create a Professional Resume to kick start the career</i>
            </div>
        </div>
    </div>
</body>
</html>
          `
        });
    }


    db.query("SELECT * FROM users WHERE email = ?", [email], async (error, result) => {
        console.log(result);
        if (error) throw error;
        if (result.length > 0) {
            return res.render('register.hbs', {
                message: 'That email is alreay in use'
            });
        } else if (password !== cpassword) {
            return res.render('register.hbs', {
                message: 'Password does not match!'
            });
        }
        if (!req.files) {
            return res.render('register.hbs', {
                message: 'File not found'
            })
        }
         
        var file = req.files.uploaded_image;
        var img_name = file.name;

        if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {
            file.mv('public/images/uploaded_images/' + file.name, function (err) {
                if (err) 
                {
                    return res.status(500).send(err);
                }
                db.query("INSERT INTO users SET ? ", { name: name, email: email, password: password, image: req.files.uploaded_image.name }, (errr, result) => {
                    if (errr) {
                        console.log('mysql error ' + errr);
                    } else {
                        console.log(result);
                        // req.session.userId = req.body.email
                        // const name = req.body.name;
                        // const image = req.files.uploaded_image.name;
                        // console.log(name);
                        req.session.userId = req.body.email;
                        console.log(req.session.userId);
                        // main().catch(console.error);
                        if (req.session.userId) {
                            main().catch(console.error);
                            return res.redirect('/home');
                        } else {
                            res.render('register.hbs');
                        }
                    }
                });
            })
        } else {
            message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
            res.render('register.hbs', { message: message });
        }
    })
}

exports.login = async (req,res) =>{
    try{
        const {email , password} = req.body;
        if(!email || !password){
            return res.status(400).render('login.hbs' , {
                message:'Please provide an email and password!'
            })
        }
            db.query("SELECT * FROM users WHERE email = ?" , [email],async (err,result)=>{

                if(result.length === 0){
                    return res.render('login.hbs' , {message:"User Not Found!"});
                }
                else if(password !== result[0].password){
                    return res.status(401).render('login.hbs' , {
                        message:'Email or Password incorrect'
                    });
                }
                else{
                    const id = result[0].email ;
                    // console.log(id);
                    req.session.userId = id;
                    console.log(req.session.userId);
                    // user.session.user = id;
                    // console.log(user.session.user);
                    // const token = jwt.sign({id} , process.env.JWT_SECRET , {
                    //     expiresIn:process.env.JWT_EXPIRES_IN
                    // })

                    // const cookieOptions = {
                    //     expires:new Date(
                    //         Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    //     ),
                    //     httpOnly:true
                    // }

                    // res.cookie('jwt' , token , cookieOptions);

                    if(req.session.userId){
                        res.status(200).redirect('/home')
                    }else{
                        res.redirect('/login')
                    }
                }
            })
        
    }catch(err){
        console.log(err);
    }
  
}