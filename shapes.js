var shapes =
    { "rects": [
        { "class": "line", "id": "line1", "name": "#line1", "top": "90px", 
           "left": "100px", "height": "1px", "width": "220px", "background": "black" },
        { "class": "line", "id": "line2", "name": "#line2", "top": "125px", 
            "left": "355px", "height": "175px", "width": "1px", "background": "black" },
        { "class": "line", "id": "line3", "name": "#line3", "top": "335px", 
           "left": "100px", "height": "1px", "width": "220px", "background": "black" },
        { "class": "line", "id": "line4", "name": "#line4", "top": "125px", 
          "left": "60px", "height": "175px", "width": "1px", "background": "black" },
        { "class": "square", "text": "Server 1", "id": "server1", "name": "#server1", "top": "50px", 
           "left": "25px", "height": "75px", "width": "75px", "background": "blue" },
        { "class": "square", "text": "Server 2", "id": "server2", "name": "#server2", "top": "50px", 
            "left": "320px", "height": "75px", "width": "75px", "background": "green" },
        { "class": "square", "text": "Server 3", "id": "server3", "name": "#server3", "top": "300px",
            "left": "320px", "height": "75px", "width": "75px", "background": "orange" },
        { "class": "square", "text": "Server 4", "id": "server4", "name": "#server4", "top": "300px",
            "left": "25px", "height": "75px", "width": "75px", "background": "grey" },
        { "class": "square", "text": "", "id": "count", "name": "#count", "top": "170px",
            "left": "175px", "height": "50px", "width": "50px", "background": "black"}],
     "circles": [
        { "class": "circle", "id": "circle1", "name": "#circle1", "top": "75px", 
            "left": "100px","height": "40px", "width": "40px", "background": "red" },
        { "class": "circle", "id": "circle2", "name": "#circle2", "top": "125px", 
            "left": "40px", "height": "40px", "width": "40px", "background": "pink" }]
    };
var path = { "path1":  [{ "shape": "#circle1", "direction": "left", "distance": "340px", "isend": false, "highlight" : "#c1p1" },
                        { "shape": "#circle1", "direction": "top", "distance": "320px", "isend": false, "highlight" : "#c1p2"},
                        { "shape": "#circle1", "direction": "left", "distance": "45px", "isend": false , "highlight" : "#c1p3"},
                        { "shape": "#circle1", "direction": "top", "distance": "65px", "isend": true, "highlight" : "#c1p4"}],
            "path2":   [{ "shape": "#circle2", "direction": "top", "distance": "320px", "isend": false, "highlight" : "#c2p1" },
                        { "shape": "#circle2", "direction": "left", "distance": "340px", "isend": false, "highlight" : "#c2p2" },
                        { "shape": "#circle2", "direction": "top", "distance": "65px", "isend": false, "highlight" : "#c2p3" },
                        { "shape": "#circle2", "direction": "left", "distance": "45px", "isend": true, "highlight" : "#c2p4"}]};

var paths = '<h2>Path 1</h2><ol><li id="c1p1">Server 1 to Server 2</li><li id="c1p2">Server 2 to Server 3</li>' +
            '<li id="c1p3">Server 3 to Server 4</li><li id="c1p4">Server 4 to Server 1</li></ol>' +
            '<h2>Path 2</h2><ol><li id="c2p1">Server 1 to Server 4</li><li id="c2p2">Server 4 to Server 3</li>' +
            '<li id="c2p3">Server 3 to Server 2</li><li id="c2p4">Server 2 to Server 1</li></ol>';

$(document).ready(function ()
{
    createShapes(shapes.rects, "#content");
    createShapes(shapes.circles, "#content");

    $('#paths').html(paths);

    $("#start").click(function ()
    {
        $('#c1p1').css({ "font-weight": "bold" });
        animate(shapes);
    });

    $("#stop").click(function ()
    {
        hideCircles(shapes.circles);
    });
});

function animate(shapes)
{
   showCircles(shapes.circles);
   var c = 0;
   
   
   $("#count").html('<b><p>' + c + '</b></p>');

    $('#c1p1,#c2p1' ).css({ "font-weight": "bold" }); 
   for (var i = 0; i < 4; i++)
   {
        c++;
        getPath(c, path.path1);
        getPath(c, path.path2); 
   } 
}

function showCircles(json)
{
   $.each(json, function (i, json){
        $(json.name).show();
    }); 

}

function hideCircles(json)
{
   $.each(json, function (i, json){
        $(json.name).finish();
        $(json.name).hide();
        $("#count").html('<b><p>' + 0 + '</b></p>');
    }); 
}

function createShapes(json, div)
{
    $.each(json, function (i, json)
    {
        $(div).append(getShape(json));
         
        $(json.name).css({ "top": json.top, "left": json.left,
            "height": json.height, "width": json.width, 
            "background": json.background }); 
    });
}

function getShape(json)
{
    var txt = '<div class="' + json.class + '" id="' + json.id + '">'
    if (json.class == 'square')
    {
        txt += '<p><b>' + json.text + '</b></p>';
    } 
    return txt + '</div>';
}

function getPath(c, json)
{

    $.each(json, function (i, json)
    {   
        moveShape(json.shape, json.direction, json.distance, "slow", c, json.isend, json.highlight);   
    });

}

function moveShape(shape, direction, distance, speed, c, isend, highlight)
{
    
    if(direction=="left"){
         
        $(shape).animate({ "left": distance }, speed, function ()
        {  
          $(highlight).css({ "font-weight": "bold" });   
          if (isend)
          { 
              $("#count").html('<b><p>' + c + '</b></p>');            
          }           
        });
     }
     else{
        $(shape).animate({ "top": distance }, speed, function()
        {           
             
           $('#paths').html(paths);
           $(highlight).css({ "font-weight": "bold" });   
           if(highlight=="#c2p1")
           {
            $('#c1p1' ).css({ "font-weight": "bold" });       
           }
           else if(highlight=="#c2p3")
           {
            $('#c1p3' ).css({ "font-weight": "bold" });       
           }
          

           
           
        });
        
      }

     
      
        
}

