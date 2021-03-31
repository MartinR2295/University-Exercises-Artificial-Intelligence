import unittest
from node import Node


class TestNode(unittest.TestCase):
    def test_init(self):
        n1 = Node(1, 4)
        self.assertEqual(1, n1.x)
        self.assertEqual(4, n1.y)

    def test_calc_distance_to(self):
        n1 = Node(0, 0)
        n2 = Node(3, 1)
        self.assertEqual(n1.calc_distance_to(n2, 10, 14), 34)

        n1 = Node(0, 0)
        n2 = Node(0, 5)
        self.assertEqual(n1.calc_distance_to(n2, 10, 14), 50)

        n1 = Node(5, 0)
        n2 = Node(0, 5)
        self.assertEqual(n1.calc_distance_to(n2, 10, 14), 14*5)

        n1 = Node(5, 0)
        n2 = Node(0, 0)
        self.assertEqual(n1.calc_distance_to(n2, 10, 14), 50)


if __name__ == '__main__':
    unittest.main()
