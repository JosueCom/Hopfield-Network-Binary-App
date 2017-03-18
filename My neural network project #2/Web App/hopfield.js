
// Neu = neurons
// Pat = patterns
// Num = numbers
// Lay = layer
// Dataset = data set
// Der = partial derivative / derivative
// Sqrt = square/squared
// Funct = function
// WRT = with respect to

//var inputOutputDataset = [];

/*function setupTraininng(){
	for (var i = 1; i < sets.length; i++) {
		inputOutputDataset[i] = sets[i].binarySequence;
	}
}*/

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

//setupTraininng();

function Network(){
    this.numPat = sets.length - 1;
    this.numNeu = sets[1].binarySequence.length;
    this.numCycles = 0;
    this.cycles_rate = 500;

    // set layers; there is not one for input because input doesn't have
    // a bias or previous layer to have connection with
    this.hopLayer = new Layer(this.numNeu);

    this.learn = function(){
    	for (var i = 1; i < this.numPat+1; i++){
    	    this.train(sets[i].binarySequence);
    	}
	}

    //create matrix of weights
    this.setupWeights = function(){
        for (var i = 0; i < this.numNeu; i++){
            for (var x = 0; x < this.numNeu; x++){
                this.hopLayer.neurons[i].weights.push(0);
            }
        }
    }

    this.setupWeights();

    // first, set weights and second, train the network by adding the weights; this stores the net
    this.train = function(dataset){
        // set values for neurons
        for (var i = 0; i < this.numNeu; i++){
            this.hopLayer.neurons[i].value = dataset[i];
        }

        // creates matrix for this set and add to previous matrix
        for (var i = 0; i < this.numNeu; i++){
            for (var x = 0; x < this.numNeu; x++){
                if (i == x){
                    this.hopLayer.neurons[i].weights[x] += 0;
                }
                else{
                    this.hopLayer.neurons[i].weights[x] += ((2 * this.hopLayer.neurons[i].value - 1) * (2 * this.hopLayer.neurons[x].value - 1));
                }
            }
        }
    }

    // turn setData into the inputOutputDataset
    this.lookForSet = function(setData){

        // set values for neurons
        for (var i = 0; i < this.numNeu; i++){
            this.hopLayer.neurons[i].value = setData[i];
        }

        while(!(this.hopLayer.haveAllNeuRun())){ // keep running while all neurons have not updated at least once
            // neuron being updated
            this.numCycles += 1;

            for (var i = 0; i < this.numNeu; i++) {
            	sets[0].binarySequence[i] = this.hopLayer.neurons[i].value;
            }

            if (this.numCycles % this.cycles_rate == 0){
            	console.log("Cycle " + this.numCycles);
            	sets[0].updateDrawing();
            	sleep(1000);
            }

            i = getRandomInt(0, this.numNeu);
            // i = (i + (2*(random.randint(0, 2)) - 1)) % this.numNeu
            // i = (i + 2) % this.numNeu
            // Sum of weights of this neuron
            this.hopLayer.neurons[i].sum = 0;
            for (var x = 0; x < this.numNeu; x++){
                if (this.hopLayer.neurons[x].value == 1) {
                    this.hopLayer.neurons[i].sum += this.hopLayer.neurons[i].weights[x]; //* (2 * this.hopLayer.neurons[x].value - 1) //test
                }
            }

            // check to see if it fires or not
            this.hopLayer.neurons[i].thresholdFunc();

            if (this.hopLayer.hasANeuChanged()){
                this.hopLayer.resetRunAndChange();
            }
        }
        sets[0].updateDrawing();
    }

    this.getOutput = function(index){
        return this.hopLayer.neurons[index].value;
    }
}

//input = inputOutputDataset[0] = sets[0].binarySequence;

//Hopfield.lookForSet(input)