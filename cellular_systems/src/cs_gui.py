import tkinter
from .grid import Grid

'''
GridGUI class

class to draw the result of a grid
'''


class CSGUI(object):

    def __init__(self, grid: Grid, block_width=50, block_height=50):
        self.grid = grid
        self.block_height = block_height
        self.block_width = block_width
        self.gui_cells = []

        # calculate the size
        self.height = len(self.grid.grid) * self.block_height - 2
        self.width = len(self.grid.grid[0]) * self.block_width - 2

        # init tkinter stuff and the canvas to draw
        self.root = tkinter.Tk()
        self.root.resizable(False, False)
        self.root.title("CS Result")
        self.canvas = tkinter.Canvas(self.root, bg="white", height=self.height,
                                     width=self.width)

    def click_on_gui_element(self, event):
        element_id = event.widget.find_withtag("current")
        if len(element_id) > 0:
            element_id = element_id[0]
            for y, row in enumerate(self.gui_cells):
                for x, gui_id in enumerate(row):
                    if gui_id == element_id:
                        if self.grid.grid[y][x].alive:
                            self.grid.kill(y, x)
                            self.canvas.itemconfig(gui_id, fill='white')
                            print("kill {}".format(gui_id))
                        else:
                            self.grid.revive(y, x)
                            self.canvas.itemconfig(gui_id, fill='black')
                            print("revive {}".format(gui_id))
                        return

    # draw the graph
    def draw(self):

        for y, row in enumerate(self.grid.grid):
            self.gui_cells.append([])
            for x, cell in enumerate(row):
                tag = "{},{}".format(y, x)
                rect = self.canvas.create_rectangle(x * self.block_width, y * self.block_height,
                                                    x * self.block_width + self.block_width,
                                                    y * self.block_height + self.block_height,
                                                    fill="white", outline="black", tag=tag)
                self.gui_cells[-1].append(rect)

                self.canvas.tag_bind(tag, "<Button-1>", lambda event: self.click_on_gui_element(event))

        self.canvas.pack()
        self.root.update()

    def update(self):
        for y, row in enumerate(self.grid.grid):
            for x, cell in enumerate(row):
                color = "white"
                if cell.alive:
                    color = "black"
                self.canvas.itemconfig(self.gui_cells[y][x], fill=color)
        self.root.update()

    def quit(self):
        self.root.destroy()
