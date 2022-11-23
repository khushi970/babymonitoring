song="";
status="";
objects=[];

function preload(){
   song=loadSound("alert_alert.mp3");
}
function setup()
{
    canvas=createCanvas(480,380);
    video=createCapture(VIDEO);
    video.size(480,380);
    canvas.center();
    video.hide();
    objectDetector= ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting objects";
}
function gotResults(error,results)
{
if(error)
{
    console.log(error);
}
console.log(results);
objects=results;
}
function draw()
{
   image(video, 0, 0, 480, 380);
if( status !=" ")
{
objectDetector.detect(video,gotResults);
for(i=0;i<objects.length;i++)
{
    document.getElementById("status").innerHTML="status : object detected";
    document.getElementById("objects_found").innerHTML="Number of objects detected are "+ objects.length;
    fill("blue");
    percent=floor(objects[i].confidence *100);
    Text(objects[i].label+" "+percent+"%",objects[i].x+15, objects[i].y+15);
    noFill();
    stroke("blue");
    rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    if(objects[i].label=="person")
    {
        document.getElementById("objects_found").innerHTML = "Baby Found";
         console.log("stop");
          song.stop();
    }
    else{
        document.getElementById("objects_found").innerHTML = "Baby Not Found";
        console.log("play");
         song.play();  
    }
    
}
}
}


function modelLoaded()
{
    console.log('modelloaded');
status=true;
}
