var button = document.getElementById('counter') ;

button.onclick = function(){
    var request = new.XmlHttpRequest();
    
    request.onreadystatechange = function(){
        if(request.readystate === XmlHttpRequest.Done){
            if(request.status === 200){
             var counter = request.responseText;
             var span = document.getElementById('count');
             span.innerHtml = counter.toString();
            }
        }
    };
    request.open('GET','http://firdoussultana.imad.hasura-app.io/counter',true);
    request.send(null);
};

var nameInput = document.getElementById('name');
var name = nameInput.value;
var submit = document.getElementById('submit_btn');
submit.onclick = function(){
    var names = ['farhana','dhamina','afrose'];
    var list = '';
    for(var i=0;i<names.length;i++){
        list += '<li>'+names[i]+'<li>';
    }
    var ul= document.getElementById('namelist');
    ul.innerHtml = list;
};
        
            
    
