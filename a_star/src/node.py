#!/usr/bin/env python3

class Node(object):
    def __init__(self, x, y, blocked=False):
        self.x = x
        self.y = y
        self.blocked = blocked

    def calc_distance_to(self, other, normal_cost, diagonal_cost):
        diff_x = abs(self.x - other.x)
        diff_y = abs(self.y - other.y)
        diff_of_diff = abs(diff_x-diff_y)

        if self.x == other.x:
            return diff_y*normal_cost
        if self.y == other.y:
            return diff_x*normal_cost

        if diff_x <= diff_y:
            return diff_x*diagonal_cost + diff_of_diff*normal_cost

        return diff_y*diagonal_cost + diff_of_diff*normal_cost