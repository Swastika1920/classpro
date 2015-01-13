//dependent variable 
var express = require('express');
var hbs =require('hbs');
var path=require('path');
var bodyParser = require('body-parser');
//User Model
var usersContorller = require('./controllers/users');
var app = express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','html');
app.engine('html',hbs.__express);
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
                             {
                                    extended:false
                            }
                             ));

app.use(express.static('public'));

//Routes

app.get('/',function(request,response)
        {
            response.render('index',{
                    title:"Home - ClassPro",
                    users: usersContorller.getUsers()
    });
        });

app.get('/users/:id',function(request,response){
    var user = usersContorller.getUser(request.params.id);
    response.render('profile',{
                    title:"User Profile - ClassPro",
                    user:user
          });
});

app.get('/home',function(request,response){

    response.render('home',{
    title:"Home"});
});

app.get('/login',function(request,response){

    response.render('login',{
        title:"Login"});
});

app.get('/signup',function(request,response){

    response.render('signup',{
        title:"Signup"});
});

app.get('/about',function(request,response){

    response.render('about',{
    title:"About me"});
});

app.post('/login',usersContorller.postLogin);

app.listen(3000);