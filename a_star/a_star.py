#!/usr/bin/env python3
from src.grid import Grid
import sys
from src.grid_gui import GridGUI


def main():
    # show usage for wrong input size
    if len(sys.argv) < 7:
        print(
            "usage: python3 a_star.py width length x,y(start) x,y(end) normal_cost diagonal_cost x,y(blocked node) x,"
            "y(blocked node) ...")
        exit()

    # parse the params
    width = int(sys.argv[1])
    height = int(sys.argv[2])
    start_node = sys.argv[3].split(",")
    end_node = sys.argv[4].split(",")
    normal_cost = int(sys.argv[5])
    diagonal_cost = int(sys.argv[6])

    # create grid, start and end node
    grid = Grid(width, height)
    start_node = grid.get_node(int(start_node[0]), int(start_node[1]))
    end_node = grid.get_node(int(end_node[0]), int(end_node[1]))

    # parse the blocked nodes, and mark it in the grid
    for i in range(7, len(sys.argv)):
        block_node = sys.argv[i].split(",")
        grid.block_node(int(block_node[0]), int(block_node[1]))

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
