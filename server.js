var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var aboutme={
    title:'aboutme',
    heading:'aboutme',
    content: `
      <p>
         I hold a bachelor degree in computer science Graduated from THANGAVELU ENGINEERING COLLEGE in the year of 2015.I have done
         my schooling in ANDERSON DAY GIRLS SCHOOL,CHENNAI.
      </p>
      <p>
         As per the additional qualification I am pursuing a "web Application Development" course in ACCORD INFOMATRIX .
      </p>
      <p>
         My strength lies in my positive behavior.I am very detail oriented person,I pay attention to every aspect of the task assigned.I   am very dedicated towards my work and I am
              looking forward to an opportunity to develop my skills more.
      </p>
      <p>
         About my hobbies,I am fond of visiting new places.I like gardening,spending time with my family.
      </p>
      <p>
         My short term goal are getting a job to build my career and my long term goal are being the reason for the growth of the organization.
      </p> `
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
                <a href="/">home</a>
            </div>
            <hr>
            <div>
                <h2 class="abt">
                 ${heading}
                </h2>
            </div>
            <hr>
            <div>
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

app.get('/aboutme', function (req, res) {
  res.send(createTemplate(aboutme));
});

app.get('/edu', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'edu.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
