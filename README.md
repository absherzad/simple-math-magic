# Simple Math Magic

Discover quick, clever math techniques that feel like magic — simple methods with powerful results.

**Simple Math Magic** is a fun web game that shows off a cool math trick! Pick a number, play a few rounds, and watch the sum match a predicted "magic guess." Built with HTML, CSS, and JavaScript, this game has a user-friendly interface, fun visual styles, and extra features like sounds and confetti to make learning exciting.

## Features
- **Math Trick**: Choose 4, 6, or 8-digit numbers and 2, 3, 4, or 5 rounds.
- **Easy Controls**: Pick options from dropdown menus.
- **Fun Styles**: Switch between Normal, Neon, Handwritten, Rounded, and Space looks for numbers.
- **Works Everywhere**: Play on phones, tablets, or computers.
- **Helpful Guide**: Built-in "How to Play" tutorial.
- **Sounds**: Toggle click and win sounds.
- **Confetti**: Celebrate when you finish the game!
- **Error Checks**: Get clear messages if you enter invalid numbers.


## Demo
Play the game live at:
  <a href="https://absherzad.github.io/simple-math-magic/" target="_blank">https://absherzad.github.io/simple-math-magic/</a>

## How to Play
1. Choose a number length (4, 6, or 8 digits) and number of rounds (2, 3, 4, or 5) from dropdowns.
2. Enter an initial number (e.g., 1234 for 4 digits, no leading zero).
3. See the magic guess (e.g., 21232 for 1234).
4. In each round, enter a number. The computer replies with the maximum number (e.g., 9999 for 4 digits) minus your number.
5. After all rounds, the sum of all numbers matches the magic guess!

**Example (4 digits, 2 rounds)**:
- Initial number: 1234
- Magic guess: 21232
- Round 1: You pick 5678, computer replies 4321 (9999 - 5678)
- Round 2: You pick 1111, computer replies 8888 (9999 - 1111)
- Sum: 1234 + 5678 + 4321 + 1111 + 8888 = 21232 (matches magic guess!)

## Installation
1. **Get the Code**:
   ```bash
   git clone https://github.com/absherzad/simple-math-magic.git
   cd simple-math-magic

2. **Run the Game**:
- Open index.html in a web browser (e.g., Chrome, Firefox).
- Or use a local server (e.g., VS Code Live Server or npx http-server).
