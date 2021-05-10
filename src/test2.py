from rm_options.rmoptions import RMOptionHandler
from rm_options.rmoptions.mapper import IntMapper, FloatMapper

rm_options = RMOptionHandler()
option_all = rm_options.create_option("all", "any text")
option_rhosts = rm_options.create_option("rhosts", "target hosts",
                                                       multiple_values=True,
                                                       required=True,
                                                       default_value=[])
option_author = rm_options.create_option("author", "author bug bro", multiple_word_string=True)
option_rports = rm_options.create_option("rports", "f",
                                         multiple_values=True,
                                         required=True,
                                         default_value=["20","23","23","23"],
                                         mapper=IntMapper)

if not rm_options.check():
    rm_options.print_error()
    rm_options.print_usage()

print("author: {}".format(option_author.value))
print("ports: {}".format(option_rports.value))

if rm_options.activated_main_option:
    print("main mode :)")
    for a in rm_options.activated_main_option.value:
        print(a)
    exit()
