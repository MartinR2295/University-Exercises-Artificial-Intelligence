from .cell import Cell
from .rule import Rule

'''
Grid class

To handle the cells in the grid.
Here you can also execute rules and change the cells.
'''


class Grid(object):

    def __init__(self, width, height):
        self.width = width
        self.height = height

        self.grid = []
        for y in range(height):
            self.grid.append([])
            for x in range(width):
                self.grid[-1].append(Cell(y, x, False))

    # revive a cell in the grid
    def revive(self, y, x):
        self.grid[y][x].revive()

    # kill a cell in the grid
    def kill(self, y, x):
        self.grid[y][x].kill()

    # execute rules on all cells, and mark the cells
    # no cells will change with this method.
    # for the changement you have to call switch_marked_cells after it
    def execute_rules(self, rules: [Rule]):

        for row in self.grid:
            for cell in row:
                for rule in rules:
                    rule.execute_rule_on(cell, self.get_neighbours(cell))

    # switch all marked cells and unmark it
    def switch_marked_cells(self):
        for row in self.grid:
            for cell in row:
                if cell.mark_for_next_round:
                    cell.switch()
                    cell.unmark()

    # get all direct neighbours of a cell
    def get_neighbours(self, cell: Cell):
        neighbours = []
        for offset_y in range(-1, 2):
            for offset_x in range(-1, 2):
                # skip at the current cell
                if offset_y == 0 and offset_x == 0:
                    continue

                neighbour_x = cell.x + offset_x
                neighbour_y = cell.y + offset_y

                # skip if the neighbour is outside of the grid
                if neighbour_x < 0 or neighbour_x >= len(self.grid[0]) \
                        or neighbour_y < 0 or neighbour_y >= len(self.grid):
                    continue
                neighbours.append(self.grid[neighbour_y][neighbour_x])

        return neighbours
