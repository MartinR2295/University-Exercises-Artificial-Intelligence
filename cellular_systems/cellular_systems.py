from src.grid import Grid
from src.cs_gui import CSGUI
from src.rule import Rule
from rmoptions import RMOptionHandler
from rmoptions.mapper import IntMapper


def main():
    option_handler = RMOptionHandler()
    height_option = option_handler.create_option("height", "height of the grid in blocks",
                                                 needs_value=True, required=True, mapper=IntMapper)
    width_option = option_handler.create_option("width", "width of the grid in blocks", short_name="w",
                                                needs_value=True, required=True, mapper=IntMapper)
    block_size_option = option_handler.create_option("block-size", "block-size in pixel", short_name="b",
                                                     needs_value=True, required=True, default_value=50,
                                                     mapper=IntMapper)

    if not option_handler.check():
        option_handler.print_error()
        option_handler.print_usage()
        exit()

    # init the grid and the gui stuff
    grid = Grid(width_option.value, height_option.value)
    cs_gui = CSGUI(grid, block_size_option.value, block_size_option.value)
    cs_gui.draw()

    # set the rules
    rules = [Rule(True, False, 0, max_alive_neighbours=1),
             Rule(True, False, 3),
             Rule(False, True, 3, max_alive_neighbours=3)]

    # make the rounds
    while (True):
        input("next round?")
        grid.execute_rules(rules)
        grid.switch_marked_cells()
        cs_gui.update()


if __name__ == '__main__':
    main()
