from mapper import BaseMapper

class NodeMapper(BaseMapper):

    def __init__(self):
        BaseMapper.__init__(self)

    def get_target_type_name(self):
        return "NodePoint"

    def map(self, value):
        return_val = []
        try:
            for val in value.split(","):
                return_val.append(int(val))
            return return_val
        except ValueError:
            return None
