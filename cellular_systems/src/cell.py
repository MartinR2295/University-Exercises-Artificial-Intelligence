class Cell(object):

    def __init__(self, y, x, alive):
        self.y = y
        self.x = x
        self.alive = alive

    def revive(self):
        self.alive = True

    def kill(self):
        self.alive = True