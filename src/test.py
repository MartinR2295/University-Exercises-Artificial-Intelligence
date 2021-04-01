from rm_options import RMOptions
from rm_options import IntMapper, FloatMapper

rm_options = RMOptions()
option_all = rm_options.create_option("all", "any text")
option_more = rm_options.create_option("more", "more text")
option_delete = rm_options.create_option("delete", "delete something", needs_value=True)
option_name = rm_options.create_option("name", "your name", needs_value=True, required=True, short_name="n")
option_values = rm_options.create_option("values", "some values", needs_value=True, multiple_values=True)
option_force = rm_options.create_option("force", "force in int", needs_value=True, short_name="f",
                                        mapper=IntMapper)
option_measures = rm_options.create_option("measures", "force in int", needs_value=True,
                                        short_name="m", mapper=FloatMapper, multiple_values=True)

if not rm_options.check():
    rm_options.print_error()
    rm_options.print_usage()

if option_values.has_value():
    for v in option_values.value:
        print(v)

# TODO: add parser class to creationmodel, and provide baseparser, intparser, and float parser