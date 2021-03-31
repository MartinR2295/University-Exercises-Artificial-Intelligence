import tkinter
from .node import Node
from .chromosome import Chromosome
'''
GridGUI class

class to draw the result of a grid
'''


class TSGUI(object):

    def __init__(self, nodes:[Node]):
        self.width = 0
        self.height = 0
        self.nodes = nodes
        self.chromosome: Chromosome = None
        self.lines = []
        self.clickCallback = lambda: None

        #calculate needed with and height
        for node in nodes:
            if self.width < node.x+node.size:
                self.width = node.x+node.size

            if self.height < node.y+node.size:
                self.height = node.y+node.size

        self.root = tkinter.Tk()

    # draw the graph
    def draw(self, with_loop = False):
        self.root.title("TS Result")
        canvas = tkinter.Canvas(self.root, bg="white", height=self.height,
                                width=self.width)

        for node in self.nodes:
            self.create_circle(canvas, node.x, node.y, node.size/2.0, node.color)

        if self.chromosome:
            for i in range(len(self.chromosome.nodes)-1):
                from_node = self.chromosome.nodes[i]
                to_node = self.chromosome.nodes[i+1]
                canvas.create_line(from_node.x,from_node.y,to_node.x,to_node.y, fill="red")

        def callback(event):
            print("next")
            self.root.destroy()

        # add to the window and show it
        canvas.pack()
        canvas.bind("<Button-1>", callback)

        self.root.mainloop()

    def quit(self):
        self.root.destroy()

    # create circle
    def create_circle(self, canvas, x, y, r, color):
        canvas.create_oval(x - r, y - r, x + r, y + r, fill=color)