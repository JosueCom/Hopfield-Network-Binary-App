
// this is the class that represent the neurons

function Neuron() {

    this.weights = [];
    this.value = 0;
    this.sum = 0;
    this.changed = false;
    this.ran = false;

    this.thresholdFunc = function() {
        this.ran = true;
        var previousValue = this.value;

        if (this.sum >= 0){
            this.value = 1;
        }
        else{
            this.value = 0;
        }

        if (previousValue != this.value){
            this.changed = true;
        }

    }
}