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
  // ═══════════════ Inputs/Outputs ═══════════════
  si_bouton_appuye: {
    titre: 'if button … is pressed then',
    sert: 'Runs the blocks inside it **if the chosen button is held down** when the program reaches this block.',
    util: [
      'Choose the button: **A**, **B**, or **A+B** (both at the same time).',
      'Put this block in the ‘forever’ block to watch the button all the time.',
    ],
    savoir: [
      'The button is only checked **when the program reaches it**: during a ‘wait’ block, a very short press can be missed.',
      'To react to every press, even a short one, use the ‘when button … is pressed’ block instead.',
      'In the simulator, press buttons A and B of the drawn board.',
    ],
    legende: 'Button A shows a happy face, button B clears the screen.',
  },
  si_logo_touche: {
    titre: 'if LOGO is touched then',
    sert: 'Runs the blocks inside it **if the board\'s touch logo** is touched when the program reaches this block.',
    util: [
      'Put this block in the ‘forever’ block to watch the logo all the time.',
    ],
    savoir: [
      'The touch logo is the small gold drawing above the LED matrix: it only exists on the **micro:bit V2** board.',
      'A simple touch of the finger is enough, without pressing.',
      'In the simulator, click the logo of the drawn board.',
    ],
    legende: 'A heart shows when the logo is touched.',
  },
  si_secoue_alors: {
    titre: 'if shaken then',
    sert: 'Runs the blocks inside it **if the board has been shaken** since the program last reached this block.',
    util: [
      'Put this block in the ‘forever’ block.',
    ],
    savoir: [
      'Each shake is counted **only once**: the next time, the block waits for a new shake.',
      'To know whether the board is being shaken **right now**, use the ‘gesture … is active’ block.',
      'In the simulator, click the ‘Shake the board’ button, below the drawn board.',
    ],
    legende: 'At each shake, a ghost shows for one second.',
  },
  bouton_est_appuye: {
    titre: 'button … is pressed',
    sert: 'Returns **true** while the chosen button is held down, **false** otherwise.',
    util: [
      'Choose the button: **A**, **B**, or **A+B** (both at the same time).',
      'Put this block in an ‘if’ or ‘wait until’ block.',
    ],
    savoir: [
      'It returns the state of the button **at the moment** the program reads it: a very short press, during a ‘wait’ block, can be missed.',
      'In the simulator, press buttons A and B of the drawn board.',
    ],
    legende: 'Button A shows a heart, button B clears the screen.',
  },
  logo_est_touche: {
    titre: 'the logo is pressed',
    sert: 'Returns **true** while the board\'s touch logo is touched, **false** otherwise.',
    util: [
      'Put this block in an ‘if’ or ‘wait until’ block.',
    ],
    savoir: [
      'The touch logo only exists on the **micro:bit V2** board.',
      'In the simulator, click the logo of the drawn board.',
    ],
    legende: 'A heart shows while the logo is touched.',
  },
  nombre_clics_bouton: {
    titre: 'number of clicks of button …',
    sert: 'Returns the **total number of clicks** on the chosen button since the board started.',
    util: [
      'Choose the button: **A** or **B**.',
      'Compare the result with a number in an ‘if’ block, or show it.',
    ],
    savoir: [
      'The counter **never goes back to 0** by itself: it counts all the clicks since the start, even spaced out.',
      'A click is counted even if the program was busy elsewhere at that moment.',
    ],
    legende: 'A heart shows when button B has been pressed 10 times in all.',
  },
  reinitialiser_microbit: {
    titre: '[Micro:bit] reset the board',
    sert: '**Restarts the board**: the program starts again from the beginning, as after pressing the reset button, on the back of the board.',
    util: [
      'Put it where the program must start again from scratch, for example when a button is pressed.',
    ],
    savoir: [
      'Nothing can be attached below this block: the board restarts at once.',
      'The variables go back to their starting value and the stopwatch starts again from 0.',
    ],
    legende: 'A heart shows at each start; button A restarts the board.',
  },
  // ═══════════════ Sensors ═══════════════
  lorsque_bouton: {
    titre: 'when button … is pressed',
    sert: 'Runs the blocks inside it **at each press** on the chosen button.',
    util: [
      'Choose the button: **A**, **B**, or **A+B** (both at the same time).',
      'Put this block on its own in the workspace: it does not attach to any other block.',
    ],
    savoir: [
      'A press runs the block **only once**, even if the button stays held down.',
      'A press on **A+B** does not also run the ‘when button A’ and ‘when button B’ blocks.',
      'The button is watched at each turn of the program\'s main loop (added automatically if there is none).',
      'In the simulator, press buttons A and B of the drawn board.',
    ],
    legende: 'Button A shows a happy face, button B clears the screen.',
  },
  lorsque_geste: {
    titre: 'when …',
    sert: 'Runs the blocks inside it when the board makes the chosen **gesture**: shaken, logo up or logo down.',
    util: [
      'Choose the gesture in the block\'s list.',
      'Put this block on its own in the workspace: it does not attach to any other block.',
    ],
    savoir: [
      'Each gesture runs the block **only once** per movement.',
      'In the simulator, only the ‘shake’ gesture exists: click the ‘Shake the board’ button, below the drawn board.',
    ],
    legende: 'When you shake the board, a ghost shows for one second.',
  },
  lorsque_broche: {
    titre: 'when pin … is …',
    sert: 'Runs the blocks inside it when pin **P0, P1 or P2** is touched with a finger (‘on’), or when you let go of it (‘released’).',
    util: [
      'Choose the pin, then ‘on’ or ‘released’.',
      'Put this block on its own in the workspace: it does not attach to any other block.',
    ],
    savoir: [
      '**One finger** on the pin is enough: the touch mode of the V2 board is switched on automatically.',
      'A pin used as a touch key must not be used at the same time by a plugged-in module.',
      'In the simulator, click pin 0, 1 or 2 of the drawn board.',
    ],
    legende: 'A finger on P0 shows a happy face for one second.',
  },
  lorsque_son_detecte: {
    titre: 'when the sound … is detected',
    sert: 'Runs the blocks inside it when the board\'s **microphone** hears a **loud** sound, or when it becomes **quiet** again.',
    util: [
      'Choose ‘loud’ or ‘quiet’.',
      'Put this block on its own in the workspace: it does not attach to any other block.',
    ],
    savoir: [
      'The microphone only exists on the **micro:bit V2** board.',
      'The level between ‘loud’ and ‘quiet’ is set with the ‘set the sound threshold’ block.',
      'The simulator hears no sound: this block only runs on the real board.',
    ],
    legende: 'A loud noise shows a sad face for one second.',
  },
  lorsque_logo: {
    titre: 'on the logo …',
    sert: 'Runs the blocks inside it when the board\'s **touch logo** is touched (‘pressed’), or when you let go of it (‘released’).',
    util: [
      'Choose ‘pressed’ or ‘released’.',
      'Put this block on its own in the workspace: it does not attach to any other block.',
    ],
    savoir: [
      'The touch logo only exists on the **micro:bit V2** board.',
      'In the simulator, click the logo of the drawn board.',
    ],
    legende: 'A heart shows when you touch the logo.',
  },
  capteur_acceleration: {
    titre: 'acceleration (mg) …',
    sert: 'Returns the **acceleration** measured by the board along the **x**, **y** or **z** axis, or the total **strength**.',
    util: [
      'Choose the axis: **x** (left-right), **y** (front-back), **z** (up-down), or **strength** (the three together).',
    ],
    savoir: [
      'The unit is the **milli-g (mg)**: 1000 mg is the Earth\'s gravity. With the board lying flat, the vertical axis therefore measures about 1000 mg.',
      'The measuring range is set with the ‘set the accelerometer range’ block.',
      'In the simulator, the board is always still and flat: try the program on the real board.',
    ],
    legende: 'The acceleration along the x axis shows every second on the LED matrix.',
  },
  broche_est_pressee: {
    titre: 'pin … is pressed',
    sert: 'Returns **true** while pin **P0, P1 or P2** is touched with a finger, **false** otherwise.',
    util: [
      'Choose the pin.',
      'Put this block in an ‘if’ or ‘wait until’ block.',
    ],
    savoir: [
      '**One finger** on the pin is enough: the touch mode of the V2 board is switched on automatically.',
      'In the simulator, click pin 0, 1 or 2 of the drawn board.',
    ],
    legende: 'A happy face shows while pin P0 is touched.',
  },
  capteur_luminosite: {
    titre: 'light level',
    sert: 'Returns the **light level** around the board, from **0** (dark) to **255** (very bright).',
    util: [
      'Show the value, or compare it with a number in an ‘if’ block (for example to turn on an LED when it is dark).',
    ],
    savoir: [
      'The light is measured by the **LED matrix** itself: there is no separate sensor.',
      'In the simulator, this measurement does not change (it is always 128): try the program on the real board.',
    ],
    legende: 'The light level shows every second on the LED matrix.',
  },
  capteur_boussole_direction: {
    titre: 'compass heading (°)',
    sert: 'Returns the **direction** the top of the board points to, in degrees: **0** for north, 90 for east, 180 for south, 270 for west.',
    util: [
      'Hold the board flat for a correct measurement.',
      'Put the ‘calibrate the compass’ block in the ‘on start’ block.',
    ],
    savoir: [
      'If the compass has not been calibrated yet, the board first starts the calibration.',
      'A magnet, a motor or an iron object near the board distorts the direction.',
      'In the simulator, this measurement does not change (it is always 0): try the program on the real board.',
    ],
    legende: 'The compass is calibrated once at start, then the direction shows every second.',
  },
  capteur_temperature: {
    titre: 'temperature (° C)',
    sert: 'Returns the **temperature** measured by the board, in **degrees Celsius**.',
    util: [
      'Show the value, or compare it with a number in an ‘if’ block.',
    ],
    savoir: [
      'It is the temperature of the board\'s **chip**: it is a little higher than the temperature of the air around.',
      'In the simulator, this measurement does not change (it is always 21 °C): try the program on the real board.',
    ],
    legende: 'The board\'s temperature shows every second on the LED matrix.',
  },
  geste_est_actif: {
    titre: 'gesture … is active',
    sert: 'Returns **true** while the board makes the chosen gesture (shaken, logo up, logo down), **false** otherwise.',
    util: [
      'Choose the gesture in the block\'s list.',
      'Put this block in an ‘if’ or ‘wait until’ block.',
    ],
    savoir: [
      'It stays **true during the whole gesture**, unlike the ‘if shaken then’ block, which counts each shake only once.',
      'In the simulator, only the ‘shake’ gesture exists: click the ‘Shake the board’ button, below the drawn board.',
    ],
    legende: 'A sad face shows while the board is being shaken.',
  },
  micro_intensite_son: {
    titre: 'sound level',
    sert: 'Returns the **level of the sound** heard by the board\'s microphone, from **0** (silence) to **255** (very loud).',
    util: [
      'Show the value, or compare it with a number in an ‘if’ block.',
    ],
    savoir: [
      'The microphone only exists on the **micro:bit V2** board.',
      'In the simulator, this measurement does not change (it is always 0): try the program on the real board.',
    ],
    legende: 'The sound level shows every second on the LED matrix.',
  },
  capteur_boussole_calibrer: {
    titre: 'calibrate the compass',
    sert: 'Starts the **setting of the compass**: the board asks you to tilt it in every direction.',
    util: [
      'Put it in the ‘on start’ block.',
      'During the setting, follow the instructions that scroll on the LED matrix: tilt the board in every direction until the setting ends.',
    ],
    savoir: [
      'The program **waits for the end of the setting** before moving on to the next block.',
      'Without this block, the board starts the setting by itself the first time the compass is read.',
    ],
    legende: 'The compass is calibrated once at start, then the direction shows every second.',
  },
  capteur_boussole_force: {
    titre: 'magnetic force (µT) …',
    sert: 'Returns the **magnetic field** measured by the board along the **x**, **y** or **z** axis, or its total **strength**, in **microteslas (µT)**.',
    util: [
      'Choose the axis, or **strength** for the three together.',
      'Bring a magnet near the board: the value changes.',
    ],
    savoir: [
      'In the simulator, this measurement does not change (it is always 0): try the program on the real board.',
    ],
    legende: 'The magnetic field along the x axis shows every second on the LED matrix.',
  },
  capteur_rotation: {
    titre: 'rotation (°) …',
    sert: 'Returns the **tilt** of the board in degrees: **pitch** when you tilt it forwards or backwards, **roll** when you tilt it left or right.',
    util: [
      'Choose **pitch** or **roll**.',
    ],
    savoir: [
      'The tilt is calculated from the accelerometer: it is only correct if the board does not move too fast.',
      'In the simulator, the board is always still and flat: try the program on the real board.',
    ],
    legende: 'The forwards-backwards tilt (pitch) shows every second on the LED matrix.',
  },
  temps_execution: {
    titre: 'running time …',
    sert: 'Returns the **time elapsed since the board started**.',
    util: [
      'Choose the unit: **(ms)** for milliseconds, **(micros)** for microseconds.',
    ],
    savoir: [
      '1 second = 1000 milliseconds = 1,000,000 microseconds.',
      'To measure a duration from a chosen moment, use the stopwatch blocks (‘Time’ category) instead.',
    ],
    legende: 'The time elapsed since start, in milliseconds, shows every second.',
  },
  gamme_accelerometre: {
    titre: 'set the accelerometer range …',
    sert: 'Sets the **measuring range** of the accelerometer: **1g, 2g, 4g or 8g**.',
    util: [
      'Put it in the ‘on start’ block.',
      'Choose a small range to measure small movements, a large range to measure strong shocks.',
    ],
    savoir: [
      'A larger range measures stronger shocks, but with **less precision**.',
    ],
    legende: 'The accelerometer is set to 8g, then the measured strength shows every second.',
  },
  micro_definir_seuil: {
    titre: 'set the sound threshold … to …',
    sert: 'Sets the **sound level** above which a sound is ‘loud’ (or below which it is ‘quiet’) for the ‘when the sound … is detected’ block.',
    util: [
      'Choose ‘loud’ or ‘quiet’, then type the threshold, from **0 to 255** (like the ‘sound level’ block).',
      'Put it in the ‘on start’ block.',
    ],
    savoir: [
      'The higher the ‘loud’ threshold, the more noise is needed to run the block.',
      'The microphone only exists on the **micro:bit V2** board. The simulator hears no sound.',
    ],
    legende: 'With a threshold of 200, only loud enough noises show the sad face.',
  },
};
window.EXEMPLES_EN = {
  'Prêt': 'Ready',
  'Bonjour !': 'Hello!',
  'Démarrage': 'Start',
  'dé': 'die',
  'i': 'i',
};
