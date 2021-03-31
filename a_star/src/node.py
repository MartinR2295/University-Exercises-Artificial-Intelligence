#!/usr/bin/env python3

"""
Node Class

This are the single blocks in the grid, which can be blocked or passable.
"""


class Node(object):
    def __init__(self, x, y, blocked=False):
        self.x = x
        self.y = y
        self.blocked = blocked

    # calculate the distance to another node with the normal and diagonal costs
    def calc_distance_to(self, other, normal_cost, diagonal_cost):
        diff_x = abs(self.x - other.x)
        diff_y = abs(self.y - other.y)
        diff_of_diff = abs(diff_x - diff_y)

        # only vertical way
        if self.x == other.x:
            return diff_y * normal_cost
        # only horizontal way
        if self.y == other.y:
            return diff_x * normal_cost

        # if we have diagonal ways, we do first the diagonal, and after that we calculate the straight ways
        if diff_x <= diff_y:
            return diff_x * diagonal_cost + diff_of_diff * normal_cost

        return diff_y * diagonal_cost + diff_of_diff * normal_cost
