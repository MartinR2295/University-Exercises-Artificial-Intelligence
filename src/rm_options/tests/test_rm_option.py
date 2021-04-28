import unittest
from rmoptions import RMOption


class TestRMOption(unittest.TestCase):

    def test_has_value(self):
        opt = RMOption("test", "test description")
        self.assertFalse(opt.has_value())
        opt.value = "test"
        self.assertTrue(opt.has_value())
        # multiple test
        opt.value = []
        self.assertFalse(opt.has_value())
        opt.value = [1]
        self.assertTrue(opt.has_value())

    def test_complete(self):
        opt = RMOption("test", "test description", needs_value=True)
        # not used, and not required
        self.assertTrue(opt.complete())
        # not used but required
        opt.required = True
        self.assertFalse(opt.complete())
        # not used, required but default value
        opt.default_value = 1
        self.assertTrue(opt.complete())
        opt.value = None
        # used, no value, but default
        opt.in_use = True
        self.assertTrue(opt.complete())
        opt.value = None
        # used, no value, no default
        opt.default_value = None
        self.assertFalse(opt.complete())
        opt.value = None
        # used, no value, no value needed
        opt.needs_value = False
        self.assertTrue(opt.complete())
        opt.value = None


if __name__ == '__main__':
    unittest.main()
