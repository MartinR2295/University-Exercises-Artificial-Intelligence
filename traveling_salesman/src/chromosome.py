from .node import Node
import random

'''
Chromosome class

Consists of nodes in a specific order. 
This class offer methods to work with a chromosome in a genetic algorithm (mutate, random mix, crossover, ...)
'''
class Chromosome(object):

    def __init__(self, nodes: [Node]):
        self.nodes = nodes

    # change to random chromosome
    def mix_me_randomly(self):
        random.shuffle(self.nodes)

    # mutates this chromosome. A mutation rate of 1 means, that we
    # that amount of mutations as we have nodes in this chromosome.
    # One mutation is a switch of two randomly picked nodes in this chromosome.
    def mutate_me(self, mutation_rate):
        for _ in range(round(mutation_rate*len(self.nodes))):
            first = random.randint(0, len(self.nodes)-1)
            second = random.randint(0, len(self.nodes)-1)
            tmp = self.nodes[second]
            self.nodes[second] = self.nodes[first]
            self.nodes[first] = tmp

    # create a child with another node
    def create_child_with(self, other):
        child_nodes = []

        # create the chromosome list
        for i in range(len(self.nodes)):
            # when randint = 1, then the node of this chromosome will used, otherwise from the other one
            # if the node is already in it, then it will try it from the partner,
            # and if this also don't work, it uses a not used node from this chromosome.
            my_node = random.randint(0,1)
            if my_node and self.nodes[i] not in child_nodes:
                child_nodes.append(self.nodes[i])
            else:
                if other.nodes[i] not in child_nodes:
                    child_nodes.append(other.nodes[i])
                else:
                    for node in self.nodes:
                        if node not in child_nodes:
                            child_nodes.append(node)
                            break

        return Chromosome(child_nodes)

    # get the fitness of the chromosome with the fitness function
    def get_fitness(self, fitness_function):
        fitness = 0
        for i in range(0, len(self.nodes)-1):
            node = self.nodes[i]
            if fitness_function == 1:
                fitness += node.manhattan_distance_to(self.nodes[i+1])
            else:
                fitness += node.pythagorean_distance_to(self.nodes[i+1])
        return fitness

    def __str__(self):
        return "{}".format(self.get_fitness(1))