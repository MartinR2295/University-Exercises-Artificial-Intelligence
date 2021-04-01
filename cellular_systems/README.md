# A-Star Algorithm

This is a python script to try cellular systems.

## Install
```shell
pip3 install -r requirements.txt
```

## Usage
```shell
python3 cellular_systems.py

--help -h: show usage
--height: height of the grid in blocks
--width -w: width of the grid in blocks
--block-size -b: block-size in pixel
```

After the command you can click on any free block, to make it alive.
If you press enter in the console, it executes one round.
You can set the alive states of blocks in each round.

### Example


```shell
python3 cellular_systems.py --height 15 -w 15 -b 20
```

Output\
![example image](example.png)