import tkinter
from .grid import Grid
from .path import Path

'''
GridGUI class

class to draw the result of a grid
'''


class GridGUI(object):

    def __init__(self, grid: Grid, block_width=50, block_height=50):
        self.block_height = block_height
        self.block_width = block_width
        self.grid = grid
        self.grid_array = []

        for _ in range(len(grid.grid[0])):
            self.grid_array.append([])

        # transform the grid in x,y form to a the needed y,x grid
        for x, column in enumerate(grid.grid):
            for y, node in enumerate(column):
                node_type = 0
                if node.blocked:
                    node_type = 1
                self.grid_array[len(self.grid_array) - (y + 1)].append(node_type)

    # change the type of a node, which change the color
    def change_node_type(self, node, node_type):
        self.grid_array[len(self.grid_array) - (node.y + 1)][node.x] = node_type

    # draw the paths
    def add_paths(self, paths: [Path]):
        for i, path in enumerate(paths):
            # calculate the right color and set it with the type
            color_multiplier = (i + 1) / len(paths)
            for point in path.path:
                r = self.getHexColorValue(int(255 * color_multiplier))
                g = self.getHexColorValue(int(255 - (255 * color_multiplier)))
                b = self.getHexColorValue(int(255 * color_multiplier))
                self.change_node_type(point.node, "#{}{}{}".format(r, g, b))

    # get the hex value of an value and force it to a value between 0x00 and 0xff
    def getHexColorValue(self, val):
        val = max(0, min(255, val))
        val = hex(val)[2:]
        if len(val) < 2:
            return "0{}".format(val)
        return val

    # draw the grid
    def draw(self):
        root = tkinter.Tk()
        root.title("A-Star Result")
        canvas = tkinter.Canvas(root, bg="white", height=len(self.grid_array) * self.block_height - 2,
                                width=len(self.grid_array[0]) * self.block_width - 2)

        for y, row in enumerate(self.grid_array):
            for x, val in enumerate(row):
                # determine the color
                color = "#fff"
                if val == 1:
                    color = "#000"
                elif val == 2:
                    color = "#f00"
                elif val == 3:
                    color = "#0ff"
                elif val != 0:
                    color = val

                # draw the rectangle
                canvas.create_rectangle(x * self.block_width, y * self.block_height,
                                        x * self.block_width + self.block_width,
                                        y * self.block_height + self.block_height,
                                        outline="#000", fill=color, tags="{},{}".format(x, y))

        # add to the window and show it
        canvas.pack()
        root.mainloop()
