from rmoptions import RMOptionHandler
from rmoptions.mapper import IntMapper

def main():
    option_handler = RMOptionHandler()
    name_option = option_handler.create_option("name", "your name", required=True)
    height_option = option_handler.create_option("height", "height of the grid in blocks",
                                                 needs_value=True, required=True, mapper=IntMapper)
    width_option = option_handler.create_option("width", "width of the grid in blocks", short_name="w",
                                                needs_value=True, required=True, mapper=IntMapper)

    if not option_handler.check():
        option_handler.print_error()
        option_handler.print_usage()
        exit()

    #do anything with the options
    area = height_option.value*width_option.value
    print("Hello {}, the calculated area is: {}".format(name_option.value, area))

if __name__ == '__main__':
    main()