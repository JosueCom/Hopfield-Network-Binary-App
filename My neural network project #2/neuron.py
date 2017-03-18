import random
import math
# this is the class that represent the neurons

class Neuron(object):
        ##### Code that runs #####
        def __init__(self):
                self.weights = []
                self.value = 0
                self.sum = 0
                self.changed = False
                self.ran = False

        def thresholdFunc(self):
            self.ran = True
            previousValue = self.value

            if self.sum >= 0:
                self.value = 1
            else:
                self.value = 0

            if not(previousValue == self.value):
                self.changed = True