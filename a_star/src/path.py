from .node import Node

"""
Path Class

It holds an list of nodes which are visited and the costs of it, with the 
help of PathPoint objects. 
"""


class Path(object):

    def __init__(self):
        self.path = []

    # add a node with costs to the path
    def add(self, node: Node, g: int, h: int):
        self.path.append(PathPoint(node, g, h))

    # create a new path of the current one, with a new node at the top
    def get_sub_path(self, node: Node, g: int, h: int):
        sub_path = Path()
        for point in self.path:
            sub_path.path.append(point)
        sub_path.add(node, g, h)
        return sub_path

    # gives the last node of the path
    def last_node(self):
        return self.path[len(self.path) - 1].node

    # gives the current total costs from start to end
    def total_costs(self):
        return self.path[len(self.path) - 1].s

    # gives back the costs between start and current point
    def last_g(self):
        return self.path[len(self.path) - 1].g

    # gives back the costs between current  and end point
    def last_h(self):
        return self.path[len(self.path) - 1].h

    # remove nodes from an array, which are already in the current path
    def remove_visited_points(self, nodes):
        checked_nodes = []
        for node in nodes:
            exists = False
            for point in self.path:
                if point.node == node:
                    exists = True
                    break
            if not exists:
                checked_nodes.append(node)

        return checked_nodes

    def __str__(self):
        return "last: {},{} - s: {}".format(self.last_node().x, self.last_node().y, self.total_costs())


class PathPoint(object):

    def __init__(self, node: Node, g: int, h: int):
        self.node = node
        self.g = g
        self.h = h
        self.s = g + h
