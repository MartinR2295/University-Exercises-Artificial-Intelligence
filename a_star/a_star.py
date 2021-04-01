#!/usr/bin/env python3
from src.grid import Grid
from src.grid_gui import GridGUI
from rmoptions import RMOptionHandler
from rmoptions.mapper import IntMapper
from src.node_mapper import NodeMapper


def main():
    # parse the options with rm_option_handler
    option_handler = RMOptionHandler()
    width_option = option_handler.create_option("width", "width of the grid in blocks", short_name="w",
                                                needs_value=True, required=True, mapper=IntMapper)
    height_option = option_handler.create_option("height", "height of the grid in blocks",
                                                 needs_value=True, required=True, mapper=IntMapper)
    start_node_option = option_handler.create_option("start", "coordinates of the startnode {x,y}",
                                                     short_name="s", needs_value=True, required=True, mapper=NodeMapper)
    end_node_option = option_handler.create_option("end", "coordinated of the enndnode {x,y}",
                                                   short_name="e", needs_value=True, required=True, mapper=NodeMapper)
    normal_costs_option = option_handler.create_option("normal-costs", "normal costs",
                                                       short_name="n", needs_value=True, required=True,
                                                       mapper=IntMapper)
    diagonal_costs_option = option_handler.create_option("diagonal-costs", "diagonal costs",
                                                         short_name="d", needs_value=True, required=True,
                                                         mapper=IntMapper)
    blocked_nodes_option = option_handler.create_option("blocked-nodes",
                                                        "list of blocked nodes (walls) {x,y} {x,y} ...",
                                                        short_name="b", needs_value=True, multiple_values=True,
                                                        mapper=NodeMapper)

    if not option_handler.check():
        option_handler.print_error()
        option_handler.print_usage()
        exit()

    width = width_option.value
    height = height_option.value
    start_node = start_node_option.value
    end_node = end_node_option.value
    normal_cost = normal_costs_option.value
    diagonal_cost = diagonal_costs_option.value

    # create grid, start and end node
    grid = Grid(width, height)
    start_node = grid.get_node(int(start_node[0]), int(start_node[1]))
    end_node = grid.get_node(int(end_node[0]), int(end_node[1]))

    # parse the blocked nodes, and mark it in the grid
    for node in blocked_nodes_option.value:
        block_node = node
        grid.block_node(node[0], node[1])

    # do the a-star algorithm
    paths = grid.a_star(start_node, end_node, normal_cost, diagonal_cost)

    # output the best paths
    print("Paths found: {}".format(len(paths)))
    for index, path in enumerate(paths):
        print("\n{} - PATH\n--------------------------------".format(index))
        for point in path.path:
            node = point.node
            print("x,y: {},{} - s:{}, g:{}, h:{}".format(node.x, node.y, point.s, point.g, point.h))

    # draw the result
    gridGui = GridGUI(grid, 50, 50)
    gridGui.add_paths(paths)
    gridGui.change_node_type(start_node, 2)
    gridGui.change_node_type(end_node, 3)
    gridGui.draw()


if __name__ == '__main__':
    main()
