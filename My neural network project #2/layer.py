import random
import math
from neuron import Neuron
# this is the class for the layers

class Layer(object):
        ##### Code that runs #####
        def __init__(self, numNeu):
            self.neurons = []
            for i in range(numNeu): #attach neurons to layer
                self.neurons.append(Neuron())

        def resetRunAndChange(self):
            for i in range(len(self.neurons)):
                self.neurons[i].ran = False
                self.neurons[i].changed = False

        def hasANeuChanged(self):
            result = False;
            #check all neurons to see if they have fired
            for i in range(len(self.neurons)):
                if(self.neurons[i].changed == True):
                    result = True

            return result

        def haveAllNeuRun(self):
            result = True
            for i in range(len(self.neurons)):
                if (self.neurons[i].ran == False):
                    result = False

            return result