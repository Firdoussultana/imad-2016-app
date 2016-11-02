var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles={
    'aboutme':{
    title:'aboutme',
    heading:'About Me',
    content: `
      <p>
         I hold a bachelor degree in computer science and Engineering.I'm passionate about web developement and intend to become a successful developer in near future.I have completed  "web Application Development" course from ACCORD INFOMATRIX .I live in the incredibly diverse and beautiful India.
      </p>
      <p>
         As per the additional qualification I am pursuing a "web Application Development" course in ACCORD INFOMATRIX .
      </p>
      <p>
         My strength lies in my positive behavior.I am very detail oriented person,I pay attention to every aspect of the task assigned.I   am very dedicated towards my work and I am
              looking forward to an opportunity to develop my skills more.
      </p>
      <p>
         About my hobbies,I am fond of visiting new places.I like gardening,spending time with my family members.
      </p>
      <p>
         My short term goal are getting a job to build my career and my long term goal are being the reason for the growth of the organization.
      </p> `
},
    'edu':{
     title:'edu',
    heading:'Education Details',
    content: `
        <p>
            1) Bachelor of Engineering (2011-2015)<br>
                Thangavelu Engineering College,	
                chennai.
        </p>
        <p>
         
            2) Anderson day Girls Higher Secondary School (2011)<br>
                chennai
        </p>
        <p>
         
            3) Anderson day Girls Higher Secondary School (2009)<br>
                chennai
        </p>
        `
},
    'interests':{
     title:'interests',
    heading:'My Interests',
    content:
        `<p>
            <ul>
             <li>Books : 1)The Story of My Life 2)Wings of Fire 3)shakespeare's plays</li>
             <li>Food : 1)Indian 2)Turkish and middle Eastern 3)North-Indian desserts</li>
             <li>Movie : 1)Enchanted 2)Clique 3)Mahek</li>
             <li>Personality : 1)Dr. APJ Abdul kalam 2)Kalpana Chawla  3)MS Dhoni </li>
             <li>Place : 1)Chennai, 2)Agra 3)Jaipur</li>
             <li>Music Artist : 1)AR Rahman 2)Maher Zain 3)Taylor Swift</li>
            </ul>`
}
};

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
                    <li><a href="http://firdoussultana.imad.hasura-app.io/aboutme">About</a></li>
                    <li><a href="http://firdoussultana.imad.hasura-app.io/edu">Education</a></li>
                    <li><a href="http://firdoussultana.imad.hasura-app.io/interests">Interests</a></li>	
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

app.get('/:articleName', function (req, res) {
    var articleName=req.params.articleName;
  res.send(createTemplate(articles[articleName]));
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


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
