#!/usr/bin/env python3
from src.node import Node
from src.generation import Generation
from src.chromosome import Chromosome
from src.ts_gui import TSGUI
import sys


def main():
    # show usage for wrong input size
    if len(sys.argv) < 12:
        print(
            "usage: python3 a_star.py width length x,y(start) x,y(end) normal_cost diagonal_cost x,y(blocked node) x,"
            "y(blocked node) ...")
        exit()

    # parse the params
    initial_gens = int(sys.argv[1])
    fitness_function = int(sys.argv[2])
    selection_amount = int(sys.argv[3])
    crossover_amount = int(sys.argv[4])
    mutation_amount = int(sys.argv[5])
    mutation_rate = float(sys.argv[6])
    random_amount = int(sys.argv[7])
    max_generations = int(sys.argv[8])
    fitness_goal = int(sys.argv[9])

    nodes = []

    for i in range(10,len(sys.argv)):
        current_data = sys.argv[i].split(",")
        nodes.append(Node(int(current_data[0]),int(current_data[1]),current_data[2],current_data[3]))

    initial_chromosomes = []
    for _ in range(initial_gens):
        chromosome = Chromosome(nodes.copy())
        chromosome.mix_me_randomly()
        initial_chromosomes.append(chromosome)

    first_generation = Generation(initial_chromosomes)
    generations = [first_generation]

    while(max_generations > len(generations)):
        #do the selection and get the new generation
        new_generation = generations[-1].new_generation(selection_amount, fitness_function)
        top = new_generation.chromosomes[0]
        show_gui(nodes, new_generation.chromosomes[0])
        print("costs: {}".format(new_generation.chromosomes[0].get_fitness(fitness_function)))

        #if the first chromosome in the new_generation reach the goal, we can quit.
        # The generation is ordered, so we have the best at the first chromosome.
        if new_generation.chromosomes[0].get_fitness(fitness_function) <= fitness_goal:
            break

        #make childrens, mutationns and randoms
        new_generation.create_childrens(crossover_amount)
        new_generation.create_mutations(mutation_amount, mutation_rate)
        new_generation.create_randoms(random_amount)

        #append it to out generations
        generations.append(new_generation)

    best_chromosome = generations[-1].chromosomes[0]

    for node in best_chromosome.nodes:
        print(node.name)

    show_gui(nodes, best_chromosome, main_loop=True)

def show_gui(nodes, chromosome, main_loop = False):
    ts_gui = TSGUI(nodes)
    ts_gui.chromosome = chromosome
    ts_gui.draw(main_loop)


if __name__ == '__main__':
    main()
