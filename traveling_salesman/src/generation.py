from .chromosome import Chromosome
import random

'''
Generation class

Handles one generation with the creation of childs, mutations and randoms
'''
class Generation(object):

    def __init__(self, chromosomes: [Chromosome]):
        self.chromosomes = chromosomes

    # create a specific amount of childrens
    def create_childrens(self, amount):
        unused = []
        used = []
        childs = []

        for chrom in self.chromosomes:
            unused.append(chrom)

        for _ in range(amount):
            childs.append(unused[0].create_child_with(unused[1]))
            used.append(unused[0])
            used.append(unused[1])
            unused.remove(unused[0])
            unused.remove(unused[0]) #because of the other remove command, this has also the index 0

            # if we have to less unused, we randomly add used to it
            while(len(unused) < 2):
                rand_int = random.randint(0, len(used)-1)
                unused.append(used[rand_int])
                used.remove(used[rand_int])

        for child in childs:
            self.chromosomes.append(child)

    # create mutations with a mutation_rate
    # the mutation will picked randomly
    def create_mutations(self, amount, mutation_rate):
        for _ in range(amount):
            mutation = Chromosome(random.choice(self.chromosomes).nodes.copy())
            mutation.mutate_me(mutation_rate)
            self.chromosomes.append(mutation)

    # create random chromosomes
    def create_randoms(self, amount):
        for _ in range(amount):
            random_chrom = Chromosome(self.chromosomes[0].nodes.copy())
            random_chrom.mix_me_randomly()
            self.chromosomes.append(random_chrom)

    # select the best of them
    def new_generation(self, amount, fitness_function):
        chromosomes_with_fitness = []

        # calculate the fitness
        for chromosome in self.chromosomes:
            chromosomes_with_fitness.append((chromosome.get_fitness(fitness_function), chromosome))

        #sort by fitness
        chromosomes_with_fitness.sort(key=lambda x: x[0])

        return Generation([x[1] for x in chromosomes_with_fitness[:amount]])
