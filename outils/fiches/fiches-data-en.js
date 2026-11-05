/* ══════════════════════════════════════════════════════════════════════════
   EasyBloc micro:bit — English texts of the help sheets (step 10, Nov. 2026).
   Same keys as fiches-data.js (titre, sert, util, savoir, legende) ; the example programs and the value type come
   from the French sheet. British English and the model's vocabulary (students, analogue, Maths…).
   EXEMPLES_EN: free texts typed in the example programs (text boxes, variable names), French → English.
   ══════════════════════════════════════════════════════════════════════════ */
window.FICHES_EN = {
  afficher_icone: {
    titre: 'show icon …',
    sert: 'Lights up a ready-made little picture on the board\'s **LED matrix**: a heart, a happy face, a sad face or a ghost.',
    util: [
      'Choose the icon in the block\'s list.',
      'Put the block in the ‘on start’ block to show it once, or in the ‘forever’ block with the ‘wait’ block to make an animation.',
    ],
    savoir: [
      'The icon **stays on** until the next thing is shown, or until the ‘clear the screen’ block.',
      'To draw your own picture, LED by LED, use the ‘show image’ block.',
    ],
    legende: 'The heart shows for one second, then clears for one second, forever.',
  },
  grove_led_etat: {
    titre: '[LED] set the LED to … on pin …',
    sert: 'Turns the **Grove LED module** plugged into a pin of the board on or off.',
    util: [
      'Choose **HIGH (1)** to turn the LED on, **LOW (0)** to turn it off.',
      'Choose the pin where the module\'s cable is plugged in (P0, P1, P2…).',
    ],
    savoir: [
      'It is **all or nothing**: to set the brightness, use the ‘[LED] set the brightness to …’ block.',
      'On the Grove Shield, the **P0/P14** port is pin P0, the **P1/P15** port is P1, the **P2/P16** port is P2.',
      'The LED stays in its state until the next block that controls it.',
    ],
    legende: 'The LED plugged into P0 turns on for one second, then off for one second, forever.',
  },
  grove_potentiometre: {
    titre: 'potentiometer on … as …',
    sert: 'Returns the position of the knob of the **Grove potentiometer** (a knob you turn).',
    util: [
      'Choose the module\'s pin: **P0, P1 or P2** (the analogue inputs).',
      'Choose the unit: the **raw value** from 0 to 1023, the **angle** from 0 to 300° (the travel of the knob) or the **percentage** from 0 to 100 %.',
    ],
    savoir: [
      'Only pins **P0, P1 and P2** can read a value between 0 and 1023.',
      'In the simulator, turn the knob drawn in the wiring, or the ‘Potentiometer’ slider in the ‘Peripherals’ table.',
    ],
    legende: 'The angle of the potentiometer plugged into P0 is shown on the LED matrix, then the measurement starts again.',
  },
  grove_pir: {
    titre: 'motion detected on …',
    sert: 'Returns **true** when the **Grove motion detector** (PIR sensor) sees a person or an animal moving in front of it, **false** otherwise.',
    util: [
      'Choose the pin where the detector is plugged in.',
      'Put this block straight into an ‘if’ block.',
    ],
    savoir: [
      'It senses the **heat of a moving body**: a cold object that moves does not trigger it.',
      'After a movement, it stays **true** for a few seconds.',
      'In the simulator, click the white lens of the detector in the wiring, or tick ‘motion detected’ in the ‘Peripherals’ table.',
    ],
    legende: 'The buzzer plugged into P1 beeps when the motion detector plugged into P0 sees something move.',
  },
  // ═══════════════ Loops ═══════════════
  au_demarrage: {
    titre: 'on start',
    sert: 'Runs the blocks inside it **only once**, when the board starts.',
    util: [
      'Put inside what must happen only once: a welcome message, the setting of a module, the starting value of a variable.',
      'Attach the ‘forever’ block just below it for the rest of the program.',
    ],
    savoir: [
      'There is **only one** ‘on start’ block in a program.',
      'Nothing attaches above it: it is always the first block of the program.',
    ],
    legende: 'The word ‘Ready’ scrolls once at start, then a happy face stays on.',
  },
  boucle_infinie: {
    titre: 'forever',
    sert: 'Repeats the blocks inside it **endlessly**. It is the main loop of the program.',
    util: [
      'Attach it below the ‘on start’ block.',
      'Put inside what the board must do all the time: read a sensor, show a value, test a button.',
    ],
    savoir: [
      'The board never leaves this loop: the blocks attached **below** it never run.',
      'Add a ‘wait’ block to slow the loop down, for example to leave time to read a value.',
    ],
    legende: 'The heart shows for one second, then clears for one second, forever.',
  },
  controls_repeat_ext: {
    titre: 'repeat … times',
    sert: 'Repeats the blocks in ‘do’ the chosen **number of times**, then moves on to the rest of the program.',
    util: [
      'Type the number of turns in the box, or put in a block that returns a number (a variable, for example).',
      'Put the blocks to repeat in ‘do’.',
    ],
    savoir: [
      'With **0** in the box, the blocks in ‘do’ do not run.',
      'To know the number of the current turn, use the ‘count with … from … to … by …’ block instead.',
    ],
    legende: 'At start, the heart blinks 3 times, then a happy face stays on.',
  },
  controls_whileUntil: {
    titre: 'repeat while … / repeat until …',
    sert: 'Repeats the blocks in ‘do’ **while a condition is true** (‘while’), or **until it becomes true** (‘until’).',
    util: [
      'Choose ‘while’ or ‘until’ in the block\'s list.',
      'Attach a condition in the box: a block that returns true or false (button pressed, comparison…).',
      'Put the blocks to repeat in ‘do’.',
    ],
    savoir: [
      'The condition is tested **at the start of each turn**: if it is already false (‘while’) or already true (‘until’) at the beginning, the blocks in ‘do’ do not run.',
      'If the condition never changes, the loop never stops and the rest of the program does not run.',
      'In the simulator, a condition that depends on a button or a sensor cannot change while the loop is running: such a loop only works on the real board. In the simulator, test the button with an ‘if’ block placed in the ‘forever’ block instead.',
    ],
    legende: 'At start, the board picks a random number from 1 to 6 and shows it, until it gets a 6; then a happy face stays on.',
  },
  controls_for: {
    titre: 'count with … from … to … by …',
    sert: 'Repeats the blocks in ‘do’ while **counting with a variable**: it takes the start value, then goes up by the chosen step at each turn, up to the end value.',
    util: [
      'Choose the variable in the block\'s list (**i** at first).',
      'Type the start value, the end value and the step (how much the variable changes at each turn).',
      'In ‘do’, use the variable\'s block (‘Variables’ category) to know the number of the turn.',
    ],
    savoir: [
      'The end value **is included**: ‘from 1 to 5 by 1’ makes 5 turns (1, 2, 3, 4, 5).',
      'If the start value is bigger than the end value, the variable goes down: ‘from 5 to 1 by 1’ counts 5, 4, 3, 2, 1.',
    ],
    legende: 'At start, the numbers 1, 2, 3, 4 and 5 show one after the other, then a happy face stays on.',
  },

  // ═══════════════ Time ═══════════════
  attendre_temps: {
    titre: 'wait … second(s)',
    sert: '**Pauses** the program for the chosen time, then moves on to the next block.',
    util: [
      'Type the time in the box, or put in a block that returns a number.',
      'Choose the unit: **seconds** or **milliseconds** (1 second = 1000 milliseconds).',
    ],
    savoir: [
      'During the pause, **nothing else** runs.',
      'In seconds, a decimal number is written with a point: **0.5** waits half a second.',
    ],
    legende: 'The heart shows for one second, then clears for one second, forever.',
  },
  attendre_jusqua: {
    titre: 'wait until …',
    sert: 'Pauses the program **until a condition becomes true**, then moves on to the next block.',
    util: [
      'Attach a condition in the box: a block that returns true or false (button pressed, motion detected, comparison…).',
    ],
    savoir: [
      'The condition is checked every **10 milliseconds**.',
      'In the ‘on start’ block, the program really waits, simulator included. In the ‘forever’ block, the simulator skips the turn while the condition is false and tries again at the next turn.',
    ],
    legende: 'A sad face stays on until you press button A; then a heart shows.',
  },
  repeter_toutes_les: {
    titre: 'repeat every … h … min … s … ms',
    sert: 'Repeats the blocks inside it **endlessly**, with a pause of the chosen time after each pass.',
    util: [
      'Type the time in hours, minutes, seconds and milliseconds: the boxes add up (0 h 1 min 30 s 0 ms = a minute and a half).',
      'Put inside the blocks to repeat, for example a measurement to show.',
    ],
    savoir: [
      'The pause comes **after** the blocks: a turn lasts the time of the blocks, plus the pause.',
      'It is an endless loop: the blocks attached **below** it never run.',
    ],
    legende: 'The board\'s temperature shows, then the measurement starts again 5 seconds later.',
  },
  reset_chrono: {
    titre: 'reset the stopwatch to 0',
    sert: '**Restarts** the program\'s stopwatch **from 0**.',
    util: [
      'Put it where the measurement must start: in the ‘on start’ block, or when a button is pressed.',
      'Then read the elapsed time with the ‘stopwatch value in …’ block.',
    ],
    savoir: [
      'There is **only one** stopwatch in the program: each ‘reset the stopwatch to 0’ block restarts it from 0.',
    ],
    legende: 'The stopwatch starts from 0 at start, then the elapsed time, in seconds, shows every second.',
  },
  valeur_chrono: {
    titre: 'stopwatch value in …',
    sert: 'Returns the **elapsed time** since the last ‘reset the stopwatch to 0’ block.',
    util: [
      'Choose the unit: **(s)** for seconds, **(ms)** for milliseconds.',
      'Put this block in a block that expects a number: show, compare, store in a variable.',
    ],
    savoir: [
      'Without a ‘reset the stopwatch to 0’ block, the time is counted from the start of the board.',
      'In seconds, the result can be a decimal number (for example 2.5).',
    ],
    legende: 'The stopwatch starts from 0 at start, then the elapsed time, in seconds, shows every second.',
  },
  // ═══════════════ LED matrix ═══════════════
  afficher_valeur: {
    titre: 'show …',
    sert: 'Shows a **number** or a **text** on the board\'s **LED matrix**.',
    util: [
      'Attach in the box a number, a text, or a block that returns a value (a measurement, a variable…).',
    ],
    savoir: [
      'A text of several characters shows **one character after the other**, without scrolling; the last one stays on.',
      'To slide a text from right to left, use the ‘scroll’ block.',
      'The value stays on until the next thing is shown, or until the ‘clear the screen’ block.',
    ],
    legende: 'A random number from 1 to 6 shows, then another one 2 seconds later, forever.',
  },
  faire_defiler: {
    titre: 'scroll …',
    sert: '**Slides** a text or a number from right to left on the **LED matrix**.',
    util: [
      'Attach in the box a text, a number, or a block that returns a value.',
    ],
    savoir: [
      'The program **waits for the end of the scrolling** before moving on to the next block: a long text takes several seconds.',
      'At the end of the scrolling, the matrix is off.',
    ],
    legende: 'The text ‘Hello!’ scrolls once at start.',
  },
  afficher_image_matrice: {
    titre: 'show image …',
    sert: 'Lights up on the **LED matrix** a picture that you draw yourself, LED by LED.',
    util: [
      'Each box of the block matches one LED of the matrix: tick the boxes of the LEDs to light up.',
    ],
    savoir: [
      'The grid of the block has the same layout as the matrix: **5 rows of 5 LEDs**.',
      'The ticked LEDs light up at **full brightness**.',
      'The picture stays on until the next thing is shown, or until the ‘clear the screen’ block.',
    ],
    legende: 'A smile drawn box by box shows at start.',
  },
  effacer_ecran: {
    titre: 'clear the screen',
    sert: '**Turns off all the LEDs** of the board\'s matrix.',
    util: [
      'Put it after something shown to make it disappear, for example with the ‘wait’ block to make a picture blink.',
    ],
    savoir: [
      'It only turns off the LED matrix: the modules plugged into the board (LEDs, displays…) do not change.',
    ],
    legende: 'The heart shows for one second, then clears for one second, forever.',
  },
  afficher_console: {
    titre: 'show in the console …',
    sert: 'Writes a number or a text in the **console**, on a new line each time. Handy to follow measurements without using the LED matrix.',
    util: [
      'Attach in the box a text, a number, or a block that returns a value.',
      'Open the console with the ‘Show the console’ button of the toolbar, at the top: it opens at the bottom of the screen.',
    ],
    savoir: [
      'On the real board, the text goes through the **USB cable**: it shows in the console after ‘Connect’ (Chrome or Edge browser).',
      'Nothing shows on the LED matrix.',
    ],
    legende: 'The word ‘Start’ is written once, then the board\'s temperature is written every second in the console.',
  },
};
window.EXEMPLES_EN = {
  'Prêt': 'Ready',
  'Bonjour !': 'Hello!',
  'Démarrage': 'Start',
  'dé': 'die',
  'i': 'i',
};
