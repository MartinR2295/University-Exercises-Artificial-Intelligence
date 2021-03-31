from .node import Node


class Path(object):

    def __init__(self):
        self.path = []

    def add(self, node: Node, g: int, h: int):
        self.path.append(PathPoint(node, g, h))

    def get_sub_path(self, node: Node, g: int, h: int):
        sub_path = Path()
        for point in self.path:
            sub_path.path.append(point)
        sub_path.add(node, g, h)
        return sub_path

    def last_node(self):
        return self.path[len(self.path)-1].node

    def total_costs(self):
        return self.path[len(self.path)-1].s

    def last_g(self):
        return self.path[len(self.path)-1].g

    def last_h(self):
        return self.path[len(self.path)-1].h

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

    def __init__(self, node: Node, g:int, h:int):
        self.node = node
        self.g = g
        self.h = h
        self.s = g+h
