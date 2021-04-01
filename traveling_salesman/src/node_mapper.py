from mapper import BaseMapper
from .node import Node

class NodeMapper(BaseMapper):

    def __init__(self):
        BaseMapper.__init__(self)

    def get_target_type_name(self):
        return "NodePoint"

    def map(self, value):
        try:
            value = value.split(",")
            return Node(int(value[0]),int(value[1]),value[2],value[3])
        except ValueError:
            return None
