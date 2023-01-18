narizX = 0;
narizY = 0;

pulsoEsq = 0;
pulsoDir = 0;

diferenca = 0;

function setup(){
    canvas = createCanvas(550, 500);
    canvas.position(560, 160);

    webcam = createCapture(VIDEO);
    webcam.size(550, 500);

    poseNet = ml5.poseNet(webcam, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function draw(){
    square(narizX, narizY, diferenca);
    stroke("#7800af");
    fill("#7800af");

    document.getElementById("pixels").innerHTML = "O tamanho do quadrado é de " + diferenca + "px";
}

function modelLoaded(){
    console.log("O modelo foi carregado");
}

function gotPoses(results){
    if(results.lenght > 0){
        console.log(results);

        narizX = results[0].pose.nose.X;
        narizY = results[0].pose.nose.Y;

        console.log(narizX, narizY);

        pulsoEsq = results[0].pose.leftWrist.X;
        pulsoDir = results[0].pose.rightWrist.X;

        diferenca = floor(pulsoEsq - pulsoDir);
    }
}
