This simple app, really does simulate the evolution of a small problem and how things like design patterns start making sense. Started with a complete cli based simple game, evolved it into a frontend based game, and now, in the process of evolving it into a game where with undo redo functionality, using different computer algos and while implementing this, suddenly, I have started to get a new found respect for design patterns !! I am also, later on thinking, to create a multiplayer version, which will be a good exercise for websockets backend implementation and bonus, show which people are online and request them for a game!

# Design Tic Tac Toe
- basic game, with same rules
- little twist, n*n board.


## Progression

### Level 1
- build in java
- CLI Interface
- Repo link: [github.com/ticTacToe](https://github.com/abhideepd/ticTacToe)
- n*n board
- 2 modes: 
  - Manual
  - Manual vs Computer 
- Computer follows the random selector algorithm
- <u>learnt :</u>
  - Dividing user interface and actual gameplay engine
  - Flexible engine to incorporate two gameplay modes

### Level 2
- built a frontend, scrapped backend completely
- built in Angular, bulma
- Repo link : [github.com/Tic-Tac-Toe](https://github.com/abhideepd/Tic-Tac-Toe)
- Site Link : [github.io/Tic-Tac-Toe](https://abhideepd.github.io/Tic-Tac-Toe/game_screen)
- n*n board
- 3 modes:
  - Manual
  - Manual vs Computer
  - Computer vs Computer
- Computer's follows random selector algorithm
- <u>Learnt :</u>
  - Object Orieanted Design, in order to manage states
  - Designing single page sites and manipulating views using routes
  - frontend component based programming, how using framework solves this problem

### Level 3
- *work in progress*
- n*n board
- undo redo functionality
- implementing different computer solving strategies like:
  - min max strategy
  - defensive strategy
  - random selector strategy
- while playing a game, mid-game, user can change the game mode from manual to computer
- <u>Learnt:</u>
  - while, working on the level 2 codebase, quickly understood, the requirement for design patterns, the importance of emphasising software architecture
  - importance and ease, it brings, once, diagramatically defining the thought process before starting to code
  - Can easily see, if I begin to encorporate the above funtionality to existing code base, it will mess up the code base baaaad. Don't want that to happen
  - Starting to understanding, if not prioritising code design and architecture, evolution of an existing software can be very painful.

### Level 4
- *imagination phase*
- implement web sockets 
- multi player, play with people online 
- show, which users are online, send a game request to them, they accept game and then the game starts