This simple app, really does simulate the evolution of a small problem and how things like design patterns start making sense. Started with a complete cli based simple game, evolved it into a frontend based game, and now, in the process of evolving it into a game where with undo redo functionality, using different computer algos and while implementing this, suddenly, I have started to get a new found respect for design patterns !! I am also, later on thinking, to create a multiplayer version, which will be a good exercise for websockets backend implementation and bonus, show which people are online and request them for a game!

# Design Tic Tac Toe

what the game is all about and all the rules, are all known, nothing complicated in that. Now let's design the system and see what lies under the hood!

.....

### Basic Structure
- Pieces represents 'X' and 'O'
- these are : Enum Symbols

- Board is 3*3, its a "class" of its own
- There is also a class, called, "Player", represents
  - It represents the player in the game as well as stores player's symbol and strategy for making moves.
- Position Class - Represents the row and column coordinates on the board. This class encaptulates, the position on the board.

### Design Challenge
- what are the design challenges
