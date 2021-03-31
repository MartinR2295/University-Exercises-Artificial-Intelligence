from .node import Node
from .path import Path

'''
Gird Class

It's like the 'playfield' for the algorithm.
Here you can set the blocked nodes (walls), the start and the endpoint.
Also the calculations and the a-star algorithm itself you can find here.
'''


class Grid(object):

    def __init__(self, width, height):
        self.width = width
        self.height = height
        self.grid = []
        for x in range(width):
            for y in range(height):
                self.grid.append([])
                self.grid[x].append(Node(x, y))

    # block a node to make it to a wall
    def block_node(self, x, y):
        self.grid[x][y].blocked = True

    # unblock a node to make it passable
    def unblock_node(self, x, y):
        self.grid[x][y].blocked = False

    # get the neighbour with the given offset of the node
    # if the offset is invalid, or the neighbour is blocked, the function
    # will return None
    def get_valid_neighbour(self, node, x_offset, y_offset):
        new_x = node.x + x_offset
        new_y = node.y + y_offset

        if new_x >= self.width or new_y >= self.height or new_x < 0 or new_y < 0:
            return None

        neighbour = self.grid[new_x][new_y]
        if neighbour.blocked:
            return None
        return neighbour

    # get a node from the grid
    def get_node(self, x, y):
        return self.grid[x][y]

    # get the neighbours around one node
    # it doesn't give back blocked nodes.
    def get_neighbours(self, node):
        neighbours = []

        for x_offset in range(-1, 2):
            for y_offset in range(-1, 2):
                neighbour = self.get_valid_neighbour(node, x_offset, y_offset)
                if neighbour:
                    neighbours.append(neighbour)

        return neighbours

    # get the best paths with the a-star algorithm
    def a_star(self, start_node, end_node, normal_cost, diagonal_cost):
        # set the rootPath, and add it to the best and normal paths
        root_path = Path()
        root_path.add(start_node, 0, start_node.calc_distance_to(end_node, normal_cost, diagonal_cost))
        paths = [root_path]
        best_paths = [root_path]

        # quit when we've no open paths to go
        while len(paths) > 0:
            # check each path of the best_paths, because we have to follow each best path (all with the same costs)
            for best_path in best_paths:
                # in this case the path already reached the end node, so we skip it
                if best_path.last_h() == 0:
                    continue

                # set variables and calculate neighbours
                current_path = best_path
                current_node = current_path.last_node()
                neighbours = self.get_neighbours(current_node)
                neighbours = current_path.remove_visited_points(neighbours)

                # create sub_path for each neighbour, calculate costs and add it to the paths array
                for neighbour in neighbours:
                    distance_to_current_node = neighbour.calc_distance_to(current_node, normal_cost, diagonal_cost)
                    distance_to_end_node = neighbour.calc_distance_to(end_node, normal_cost, diagonal_cost)
                    new_path = current_path.get_sub_path(neighbour, current_path.last_g() + distance_to_current_node,
                                                         distance_to_end_node)
                    paths.append(new_path)

                # remove the current path, because we created sub paths of it.
                # if there is not sub path, the path wasn't able to reach the end node
                paths.remove(current_path)
                best_paths.remove(current_path)

            # determine new best_paths
            best_paths = []
            for path in paths:
                if len(best_paths) == 0 or path.total_costs() < best_paths[0].total_costs():
                    best_paths = [path]
                elif path.total_costs() == best_paths[0].total_costs():
                    best_paths.append(path)

            # check if we are on the end
            finished = True
            for path in best_paths:
                if path.last_h() != 0:
                    finished = False
            if finished:
                paths = []

        return best_paths
