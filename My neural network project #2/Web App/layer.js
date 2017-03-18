
//this is the class for the layers

function Layer(numNeu){

        this.neurons = [];
        for (var i = 0; i < numNeu; i++){ //attach neurons to layer
            this.neurons.push(new Neuron());
        }

        this.resetRunAndChange = function(){
            for (var i = 0; i < this.neurons.length; i++){
                this.neurons[i].ran = false;
                this.neurons[i].changed = false;
            }
        }

        this.hasANeuChanged = function(){
            var result = false;
            //check all neurons to see if they have fired
            for (var i = 0; i < this.neurons.length; i++){
                if(this.neurons[i].changed == true){
                    result = true;
                }
            }

            return result;
        }

        this.haveAllNeuRun = function(){
            var result = true;
            for (var i = 0; i < this.neurons.length; i++){
                if (this.neurons[i].ran == false){
                    result = false;
                }
            }

            return result;
        }
}