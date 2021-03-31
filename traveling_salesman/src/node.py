#!/usr/bin/env python3

"""
Node Class

This is one single node in the graph
"""

class Node(object):
    def __init__(self, x, y, name, color, size=50):
        self.x = x
        self.y = y
        self.name = name
        self.color = color
        self.size = size

    # calculate the distance to another node with the manhatten distance
    def manhattan_distance_to(self, other):
        return abs(self.x-other.x)+abs(self.y-other.y)

    # calculate the distance to another node with the pythagorean distance
    def pythagorean_distance_to(self, other):
        return ((self.y-other.y)**2+(self.x-other.x)**2)**0.5

