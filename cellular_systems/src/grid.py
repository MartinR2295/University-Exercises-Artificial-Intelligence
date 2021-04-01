from .cell import Cell

class Grid(object):

    def __init__(self, width, height):
        self.width = width
        self.height = height

        self.grid = []
        for y in height:
            self.grid.append([])
            for x in width:
                self.grid[-1].append(Cell(y, x, False))

    def revive(self, y, x):
        self.grid[y][x].revive()

    def kill(self, y, x):
        self.grid[y][x].kill()