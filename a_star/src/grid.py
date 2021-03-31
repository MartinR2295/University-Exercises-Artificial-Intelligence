from .node import Node
from .path import Path

class Grid(object):

    def __init__(self, width, height):
        self.width = width
        self.height = height
        self.grid = []
        for x in range(width):
            for y in range(height):
                self.grid.append([])
                self.grid[x].append(Node(x,y))

    def block_node(self, x, y):
        self.grid[x][y].blocked = True

    def unblock_node(self, x, y):
        self.grid[x][y].blocked = False

    def get_valid_neighbour(self, node, x_offset, y_offset):
        new_x = node.x + x_offset
        new_y = node.y + y_offset

        if new_x >= self.width or new_y >= self.height or new_x < 0 or new_y < 0:
            return None

        neighbour = self.grid[new_x][new_y]
        if neighbour.blocked:
            return False
        return neighbour

    def get_node(self, x, y):
        return self.grid[x][y]

    def get_neighbours(self, node):
        neighbours = []

        for x_offset in range(-1,2):
            for y_offset in range(-1,2):
                neighbour = self.get_valid_neighbour(node, x_offset, y_offset)
                if neighbour:
                    neighbours.append(neighbour)

        return neighbours

    def a_star(self, start_node, end_node, normal_cost, diagonal_cost):
        root_path = Path()
        root_path.add(start_node, 0, start_node.calc_distance_to(end_node, normal_cost, diagonal_cost))
        paths = [root_path]
        best_paths = [root_path]

        while len(paths) > 0:
            for best_path in best_paths:
                if best_path.last_h() == 0:
                    continue
                current_path = best_path
                current_node = current_path.last_node()
                neighbours = self.get_neighbours(current_node)
                neighbours = current_path.remove_visited_points(neighbours)

                for neighbour in neighbours:
                    distance_to_current_node = neighbour.calc_distance_to(current_node, normal_cost, diagonal_cost)
                    distance_to_end_node = neighbour.calc_distance_to(end_node, normal_cost, diagonal_cost)
                    new_path = current_path.get_sub_path(neighbour, current_path.last_g()+distance_to_current_node, distance_to_end_node)
                    paths.append(new_path)

                paths.remove(current_path)
                best_paths.remove(current_path)

            best_paths = []
            #determine new best_paths
            for path in paths:
                if len(best_paths) == 0 or path.total_costs() < best_paths[0].total_costs():
                    best_paths = [path]
                elif path.total_costs() == best_paths[0].total_costs():
                    best_paths.append(path)

            #check if we are on the end
            finished = True
            for path in best_paths:
                if path.last_h() != 0:
                    finished = False
            if finished:
                paths = []

        return best_paths
