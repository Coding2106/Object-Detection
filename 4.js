img = "";
status = "";
objects = [];

function preload() {
    img = loadImage('4.jpg');
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    
}

function draw() {
    

    if (status != "") {
        r = random(255);
        g = random(225);
        b = random(255);
        objectDetector.detect(img, gotResults);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Staut : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects detected are :" + objects.length;
            fill(r, g, b);;
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        }
    }
    fill("#FF0000");
    text("Puppy", 45, 75);
    noFill();
    stroke("#FF0000");
    rect(30, 60, 450, 350);

    fill("#FF0000");
    text("Puppy", 320, 120);
    noFill();
    stroke("#FF0000");
    rect(300, 90, 270, 320);
}

function modelLoaded() {
    console.log("Model Loaded!")
    status = true;
    objectDetector.detect(video, gotResult);

}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object";
}