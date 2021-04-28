from rm_options.rmoptions import RMOptionHandler
from rm_options.rmoptions.mapper import IntMapper, FloatMapper

rm_options = RMOptionHandler()
option_all = rm_options.create_option("all", "any text")
option_more = rm_options.create_option("more", "more text")
option_delete = rm_options.create_option("delete", "delete something", needs_value=True)
option_name = rm_options.create_option("name", "your name", needs_value=True, required=True, short_name="n")
option_values = rm_options.create_option("values", "some values", needs_value=True, required=True, multiple_values=True)
option_force = rm_options.create_option("force", "force in int", needs_value=True, short_name="f",
                                        mapper=IntMapper)
option_measures = rm_options.create_option("measures", "force in int", needs_value=True,
                                        short_name="m", mapper=FloatMapper, multiple_values=True)
option_test = rm_options.create_option("test", "test", needs_value=True, required=True, default_value="t", short_name="t")
option_quit_after_it = rm_options.create_option("special", "quit after it", quit_after_this_option=True,
                                                multiple_values=True)

if not rm_options.check():
    rm_options.print_error()
    rm_options.print_usage()

if rm_options.activated_main_option:
    print("main mode :)")
    for a in rm_options.activated_main_option.value:
        print(a)
    exit()

if option_values.has_value():
    for v in option_values.value:
        print(v)