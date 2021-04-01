from .cell import Cell

'''
Rule class

To handle the rules in the cellular system.
Here you can set start_state, end_state and min+max alive neighbours.
'''


class Rule(object):

    def __init__(self, start_state, end_state, min_alive_neighbours, max_alive_neighbours=None):
        self.start_state = start_state
        self.end_state = end_state
        self.min_alive_neighbours = min_alive_neighbours
        self.max_alive_neighbours = max_alive_neighbours

    # execute this rule on a specific cell with their neighbours
    # this method will set the mark flag in the cell if needed
    def execute_rule_on(self, cell: Cell, neighbours: [Cell]):
        # check if we have the needed start_state
        if cell.alive != self.start_state:
            return

        # calculate alive neighbours
        alive_neighbours = 0
        for neighbour in neighbours:
            if neighbour.alive:
                alive_neighbours += 1

        # check the rules
        if alive_neighbours < self.min_alive_neighbours:
            return
        if self.max_alive_neighbours and alive_neighbours > self.max_alive_neighbours:
            return

        # mark the cell if it needed a changement
        if cell.alive != self.end_state:
            cell.mark()
