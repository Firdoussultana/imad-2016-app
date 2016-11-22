var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var config = {
    user:'firdoussultana',
    database :'firdoussultana',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var pool = new Pool(config);
app.get('/test-db',function(req,res){
  pool.query('SELECT * FROM test',function(err,result){
     if(err){
         res.status(500).send(err.toString());
     }
     else
     {
         res.send(JSON.stringify(result.rows));
     } 
  });  
    
});

function createTemplate(data){
    var title=data.title;
    var heading=data.heading;
    var content=data.content;
    var htmlTemplate=`
<html>  
    <head>
        <title>
        ${title}
        </title>
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
        <div class="design">
        <div>
            <nav>
                <ol id="menu">
                    <li><a href="/">home</a></li>
                    <li><a href="http://firdoussultana.imad.hasura-app.io/articles/aboutme">About</a></li>
                    <li><a href="http://firdoussultana.imad.hasura-app.io/articles/edu">Education</a></li>
                    <li><a href="http://firdoussultana.imad.hasura-app.io/articles/interests">Interests</a></li>	
                </ol>
             </nav>
        </div>
            <hr>
        <div>
            <h2 class="abt">
                 ${heading}
            </h2>
        </div>
            <hr>
        <div class="con">
             ${content}
        </div>
        </div>
    </body>
</html>
`;
return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter = 0;
app.get('/counter',function(req,res){
    counter = counter + 1;
    res.send(counter.toString());
});

app.get('/articles/:articleName', function (req, res) {
    var articleName=req.params.articleName;
    pool.query("SELECT * FROM article WHERE title=$1",[req.params.articleName],function(err,result){
       if(err)
       {
           res.status(500).send(err.toString());
        }else{
            if(result.rows.length===0){
                res.status(404).send('article not found');
            }else{
                var articleData=result.rows[0];
            res.send(createTemplate(articleData));
            }
        }
    });
  
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

var names =  [];
app.get('/submit-names/:name',function(req,res){
   var name = req.params.name; 
    names.push(name);
    res.send(JSON.stringify(names));
    
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
