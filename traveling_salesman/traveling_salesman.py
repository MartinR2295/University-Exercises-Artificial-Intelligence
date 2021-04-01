#!/usr/bin/env python3
from src.generation import Generation
from src.chromosome import Chromosome
from src.ts_gui import TSGUI
from rmoptions import RMOptionHandler
from rmoptions.mapper import IntMapper, FloatMapper
from src.node_mapper import NodeMapper

def main():
    #parse the options
    option_handler = RMOptionHandler()
    initial_gens_option = option_handler.create_option("initial-gens", "amount of initial gens", short_name="i",
                                                       needs_value=True, required=True, default_value=10, mapper=IntMapper)
    fitness_function_option = option_handler.create_option("fitness-function", "1 - manhattan distance, 2 - pythagorean distance",
                                                        short_name="f", needs_value=True, required=True, default_value=1, mapper=IntMapper)
    selection_amount_option = option_handler.create_option("selection-amount", "amount of the selection", short_name="s",
                                                           needs_value=True, required=True, default_value=4, mapper=IntMapper)
    crossover_amount_option = option_handler.create_option("crossover-amount", "amount of crossovers", short_name="c",
                                                           needs_value=True, required=True, default_value=5, mapper=IntMapper)
    mutation_amount_option = option_handler.create_option("mutation-amount", "amount of mutations", short_name="m",
                                                           needs_value=True, required=True, default_value=3, mapper=IntMapper)
    mutation_rate_option = option_handler.create_option("mutation-rate", "mutation rate", short_name="mr",
                                                          needs_value=True, required=True, default_value=0.3, mapper=FloatMapper)
    random_amount_option = option_handler.create_option("random-amount", "amount of randoms in each generation", short_name="r",
                                                        needs_value=True, required=True, default_value=2, mapper=IntMapper)
    max_generations_option = option_handler.create_option("max-generations", "after that number the program ends", short_name="mg",
                                                        needs_value=True, required=True, default_value=50, mapper=IntMapper)
    fitness_goal_option = option_handler.create_option("fitness-goal", "after that number the program ends", short_name="fg",
                                                          needs_value=True, required=True, default_value=500, mapper=IntMapper)
    nodes_option = option_handler.create_option("nodes", "the nodes {y,x,name,color} ...", short_name="n",
                                                needs_value=True, required=True, multiple_values=True, mapper=NodeMapper)

    if not option_handler.check():
        option_handler.print_error()
        option_handler.print_usage()
        exit()

    initial_chromosomes = []
    for _ in range(initial_gens_option.value):
        chromosome = Chromosome(nodes_option.value.copy())
        chromosome.mix_me_randomly()
        initial_chromosomes.append(chromosome)

    first_generation = Generation(initial_chromosomes)
    generations = [first_generation]

    ts_gui = TSGUI(nodes_option.value)
    ts_gui.chromosome = initial_chromosomes[0]

    def clickOnNext():
        #do the selection and get the new generation
        new_generation = generations[-1].new_generation(selection_amount_option.value, fitness_function_option.value)
        top = new_generation.chromosomes[0]
        print("costs: {}".format(new_generation.chromosomes[0].get_fitness(fitness_function_option.value)))
        ts_gui.chromosome = top
        ts_gui.update_lines()
        #if the first chromosome in the new_generation reach the goal, we can quit.
        # The generation is ordered, so we have the best at the first chromosome.
        finished = False
        if new_generation.chromosomes[0].get_fitness(fitness_function_option.value) <= fitness_goal_option.value:
            finished = True

        if not finished:
            #make childrens, mutationns and randoms
            new_generation.create_childrens(crossover_amount_option.value)
            new_generation.create_mutations(mutation_amount_option.value, mutation_rate_option.value)
            new_generation.create_randoms(random_amount_option.value)

            #append it to out generations
            generations.append(new_generation)

            if len(generations) < max_generations_option.value:
                return

        best_chromosome = generations[-1].chromosomes[0]

        for node in best_chromosome.nodes:
            print(node.name)

        ts_gui.quit()

    ts_gui.clickCallback = clickOnNext
    ts_gui.draw()



if __name__ == '__main__':
    main()
