// Zero is main canvas, rest are 1-6, respectively
var canvas = [document.getElementById("main"), document.getElementById("Train1"), document.getElementById("Train2"), document.getElementById("Train3")];//, document.getElementById("Train4")];//, document.getElementById("Train5"), document.getElementById("Train6")];
ctx = [canvas[0].getContext("2d"), canvas[1].getContext("2d"), canvas[2].getContext("2d"), canvas[3].getContext("2d")];// canvas[4].getContext("2d")];//, canvas[5].getContext("2d"), canvas[6].getContext("2d")];
var sets = [];
var ranPatterns = false;

/*************************************************/
/*******************Info Session******************/
/*************************************************/
/*********/var canvasSize = [100, 100];/**********/
/***********/var numberOfPixels = 5;/*************/
/*************/var strokeSize = 1;/***************/
/*************************************************/
/*************************************************/
/*************************************************/

var pixelSize = canvasSize[0]/numberOfPixels;
for (var i = 0; i < canvas.length; i++) {
	canvas[i].width = canvasSize[0];
	canvas[i].height = canvasSize[1];
}
var canvasPixelSize = [canvas[0].width/pixelSize, canvas[0].height/pixelSize];1
setNum = -1;
function Set() {
	//assigns properties
	setNum++;
	this.setNum = setNum;
	this.position = [0, 0];
	this.recording = [false, false];
	this.binarySequence = [];

	//fill with 0
	for (var i = 0; i < canvasPixelSize[0]*canvasPixelSize[1]; i++) {
		this.binarySequence[i] = 0;
	}

	this.listener = function(set) {
        //listen for input from the user: mouse is pressed
        canvas[set.setNum].addEventListener("mousedown", function(event) {
        	//var rect = canvas[set.setNum].getBoundingClientRect();
            set.recording[0] = true;
            //set.position = [Math.round((event.clientX - rect.left)/(rect.right - rect.left) * canvas[set.setNum].width), Math.round((event.clientY - rect.top)/(rect.bottom - rect.top) * canvas[set,setNum].height)];
        });
        //mouse is NOT pressed
        canvas[set.setNum].addEventListener("mouseup", function(event) {
            set.recording[0] = false;
        });
        //mouse is moved
        canvas[set.setNum].addEventListener("mousemove", function(event) {
        	var rect = canvas[set.setNum].getBoundingClientRect();
            set.recording[1] = true;
            set.position = [Math.round((event.clientX - rect.left)/(rect.right - rect.left) * canvas[set.setNum].width), Math.round((event.clientY - rect.top)/(rect.bottom - rect.top) * canvas[set,setNum].height)];
        });

        //mouse is out of canvas
        canvas[set.setNum].addEventListener("mouseout", function(event) {
            set.recording[0] = false;
            set.recording[1] = false;
        });
    };

	this.reset = function(){
		for (var i = 0; i < this.binarySequence.length; i++) {
			this.binarySequence[i] = 0;
		}
		console.log("Clear " + this.setNum);
	}

	this.randomSet = function(){
		for (var i = 0; i < this.binarySequence.length; i++) {
			this.binarySequence[i] = Math.round(Math.random());
		}
	}

	this.draw = function(){
		var xPos = Math.floor(this.position[0]/(canvas[this.setNum].width/canvasPixelSize[0])),
			yPos = Math.floor(this.position[1]/(canvas[this.setNum].width/canvasPixelSize[0]));
		//console.log("Draw #" + this.setNum);
		//console.log(xPos + " | " + yPos);
		
		for (var y = -(strokeSize-1)/2; y <= (strokeSize-1)/2; y++) {
			for (var x = -(strokeSize-1)/2; x <=(strokeSize-1)/2; x++) {
				this.binarySequence[((yPos+y)*canvasPixelSize[0] + (xPos+x))] = 1;
			}
		}
	}

	this.render = function(){
		for (var i = 0, a = -1; i < this.binarySequence.length; i++) {
			if (i%canvasPixelSize[0] == 0) {
				a++;
			}

			if (this.binarySequence[i] == 1){
				ctx[this.setNum].rect((canvas[this.setNum].width/canvasPixelSize[0])*(i%canvasPixelSize[0]),(canvas[this.setNum].height/canvasPixelSize[1])*(a),(canvas[this.setNum].width/canvasPixelSize[0]),(canvas[this.setNum].height/canvasPixelSize[1]));
				ctx[this.setNum].fill();
			}
			
		}
	}

	this.update = function(){
		this.listener(this);

		if (this.recording[0] && this.recording[1]) {
			this.draw();
		}

		this.render();
	}

	this.updateDrawing = function(){
		ctx[this.setNum].clearRect(0, 0, canvas[this.setNum].width, canvas[this.setNum].height);
		for (var a = 0; a <= canvasPixelSize[0]; a++) {
			ctx[this.setNum].beginPath();
			ctx[this.setNum].strokeStyle = "gray";
			ctx[this.setNum].moveTo((canvas[this.setNum].width/canvasPixelSize[0])*(a), 0);
			ctx[this.setNum].lineTo((canvas[this.setNum].width/canvasPixelSize[0])*(a), canvas[this.setNum].height);
			ctx[this.setNum].stroke();
			ctx[this.setNum].closePath();
		}
		//grid: horizontal lines
		for (var a = 0; a <= canvasPixelSize[1]; a++) {
			ctx[this.setNum].beginPath();
			ctx[this.setNum].strokeStyle = "gray";
			ctx[this.setNum].moveTo(0, (canvas[this.setNum].height/canvasPixelSize[1])*(a));
			ctx[this.setNum].lineTo(canvas[this.setNum].width, (canvas[this.setNum].height/canvasPixelSize[1])*(a));
			ctx[this.setNum].stroke();
			ctx[this.setNum].closePath();
		}

		ctx[this.setNum].strokeStyle = "black";
		this.render();
	}

}

for (var i = 0; i < canvas.length; i++) {
	//create sets
	sets[i] = new Set();

	//grid: vertical lines
	for (var a = 0; a <= canvasPixelSize[0]; a++) {
		ctx[i].beginPath();
		ctx[i].strokeStyle = "gray";
		ctx[i].moveTo((canvas[i].width/canvasPixelSize[0])*(a), 0);
		ctx[i].lineTo((canvas[i].width/canvasPixelSize[0])*(a), canvas[i].height);
		ctx[i].stroke();
		ctx[i].closePath();
	}
	//grid: horizontal lines
	for (var a = 0; a <= canvasPixelSize[1]; a++) {
		ctx[i].beginPath();
		ctx[i].strokeStyle = "gray";
		ctx[i].moveTo(0, (canvas[i].height/canvasPixelSize[1])*(a));
		ctx[i].lineTo(canvas[i].width, (canvas[i].height/canvasPixelSize[1])*(a));
		ctx[i].stroke();
		ctx[i].closePath();
	}

	ctx[i].strokeStyle = "black";
}

function learnPatterns(){
	ranPatterns = true;
	Hopfield.learn();

}

function runHopfield(){
	if (ranPatterns) {
		clearInterval(animation);
		Hopfield.lookForSet(sets[0].binarySequence);
		ranPatterns = false;
	}else{
		console.log("Click \"Learn Patterns\" first");
	}

}

function learnAndRun(){
	learnPatterns();
	runHopfield();
}

function clearAll(){
	for (var i = 0; i < sets.length; i++) {
		sets[i].reset();
	}
}

function randomAll(){
	for (var i = 0; i < sets.length; i++) {
		sets[i].randomSet();
	}
}

function clearSet(index){
	sets[index].reset();
}

function resetAll(){
	clearSet(0);
	animation = setInterval(animate, 100);
	Hopfield = new Network();
}

function printBinarySequence(index){
	console.log(sets[index].binarySequence);
}

/*ctx[1].beginPath();
ctx[1].moveTo(0,0);
ctx[1].lineTo(300,150);
ctx[1].stroke();*/

function animate(){

	for (var i = 0; i < canvas.length; i++) {
		ctx[i].clearRect(0, 0, canvas[i].width, canvas[i].height);

		//grid: vertical lines
		for (var a = 0; a <= canvasPixelSize[0]; a++) {
			ctx[i].beginPath();
			ctx[i].strokeStyle = "gray";
			ctx[i].moveTo((canvas[i].width/canvasPixelSize[0])*(a), 0);
			ctx[i].lineTo((canvas[i].width/canvasPixelSize[0])*(a), canvas[i].height);
			ctx[i].stroke();
			ctx[i].closePath();
		}
		//grid: horizontal lines
		for (var a = 0; a <= canvasPixelSize[1]; a++) {
			ctx[i].beginPath();
			ctx[i].strokeStyle = "gray";
			ctx[i].moveTo(0, (canvas[i].height/canvasPixelSize[1])*(a));
			ctx[i].lineTo(canvas[i].width, (canvas[i].height/canvasPixelSize[1])*(a));
			ctx[i].stroke();
			ctx[i].closePath();
		}

		ctx[i].strokeStyle = "black";
	}

	for (var i = 0; i < sets.length; i++) {
		sets[i].update();
	}
}

var animation = setInterval(animate, 100);
Hopfield = new Network();
