class Cell(object):

    def __init__(self, y, x, alive):
        self.y = y
        self.x = x
        self.alive = alive
        self.mark_for_next_round = False

    def revive(self):
        self.alive = True

    def kill(self):
        self.alive = False

    # mark for next round to change
    def mark(self):
        self.mark_for_next_round = True

    def unmark(self):
        self.mark_for_next_round = False

    # switch the alive state
    def switch(self):
        self.alive = not self.alive
