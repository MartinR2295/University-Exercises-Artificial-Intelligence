import sys
from src.grid import Grid
from src.cs_gui import CSGUI
from src.rule import Rule

def main():
    if len(sys.argv) < 4:
        print("usage: python3 cellular_systems.py {height} {width} {block_size}")
        exit()

    height = int(sys.argv[1])
    width = int(sys.argv[2])
    block_size = int(sys.argv[3])

    # init the grid and the gui stuff
    grid = Grid(width, height)
    cs_gui = CSGUI(grid, block_size, block_size)
    cs_gui.draw()

    # set the rules
    rules = []
    rules.append(Rule(True, False, 0, max_alive_neighbours=1))
    rules.append(Rule(True, False, 3))
    rules.append(Rule(False, True, 3, max_alive_neighbours=3))

    # make the rounds
    while (True):
        input("next round?")
        grid.execute_rules(rules)
        grid.switch_marked_cells()
        cs_gui.update()


if __name__ == '__main__':
    main()
