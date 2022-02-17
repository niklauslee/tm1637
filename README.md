# TM1637 (7-segment display)

Kaluma library for 7-segment LED Display

# Wiring

Here is a wiring example.

| Raspberry Pi Pico | TM1637 | 
| ----------------- | ------ |
| 3V3               | VCC    |
| GND               | GND    |
| GP0               | CLK    |
| GP1               | DIO    |

![wiring](https://github.com/niklauslee/tm1637/blob/main/images/wiring.jpg?raw=true)

# Install

```sh
npm install https://github.com/niklauslee/tm1637
```

# Usage

```javascript
const {TM1637} = require('tm1637');
const tm1637 = new TM1637(0, 1); // CLK=0, DIO=1

// Show "03:15"
tm1637.setDigit(0, TM1637.DIGIT[0]); // 0
tm1637.setDigit(1, TM1637.DIGIT[3] | TM1637.SEG_X); // 3:
tm1637.setDigit(2, TM1637.DIGIT[1]); // 1
tm1637.setDigit(3, TM1637.DIGIT[5]); // 5
delay(1000);

// Change brightness (0 ~ 7)
for (i = 0; i <= 7; i++) {
  tm1637.setBrightness(i);
  delay(500);
}
delay(1000);

// Display on and off (blinking)
for (i = 0; i < 10; i++) {
  tm1637.off();
  delay(100);
  tm1637.on();
  delay(100);
}
delay(1000);

// Show number from 0 to 500
for (i = 0; i <= 500; i++) {
  tm1637.display(i);
}
delay(1000);

// Show "done"
tm1637.setDigit(0, TM1637.SEG_B | TM1637.SEG_C | TM1637.SEG_D | TM1637.SEG_E | TM1637.SEG_G); // d
tm1637.setDigit(1, TM1637.SEG_C | TM1637.SEG_D | TM1637.SEG_E | TM1637.SEG_G); // o
tm1637.setDigit(2, TM1637.SEG_C | TM1637.SEG_E | TM1637.SEG_G); // n
tm1637.setDigit(3, TM1637.SEG_A | TM1637.SEG_B | TM1637.SEG_D | TM1637.SEG_E | TM1637.SEG_F | TM1637.SEG_G); // e
```

# API
 
## Class: TM1637
 
A class encapulating TM1637 driver.
 
### new TM1637(clkPin, dioPin[, length[, brightness]])
 
Create an instance of TM1637 class.

- **`clkPin`** `<number>` Pin number for CLK.
- **`dioPin`** `<number>` Pin number for DIO.
- **`length`** `<number>` Number of digits. Default: `4`.
- **`brightness`** `<number>` Level of brightness (0~7). Default: `7`.

### tm1637.clear()

Clear all digits.

### tm1637.on()

Turn on the display.

### tm1637.off()

Turn off the display.

### tm1637.setBrightness(brightness)

Set the brightness of the display.

- **`brightness`** `<number>` Level of brightness (0~7).

### tm1637.setDigit(pos, data)

Set a digit with the data.

- **`pos`** `<number>` Position to set digit data.
- **`data`** `<number>` 7-segment data for the digit.

```
  7-SEGMENT

      A
     ---
  F |   | B
     -G-
  E |   | C
     ---  . X
      D
```

### tm1637.display(value)

Show the number value on the display.

- **`value`** `<number>` A number to display.

### TM1637.SEG_A

Bit for the segment A. (`0x01`)

- `<number>`

### TM1637.SEG_B

Bit for the segment B. (`0x02`)

- `<number>`

### TM1637.SEG_C

Bit for the segment C. (`0x04`)

- `<number>`

### TM1637.SEG_D

Bit for the segment D. (`0x08`)

- `<number>`


### TM1637.SEG_E

Bit for the segment E. (`0x10`)

- `<number>`

### TM1637.SEG_F

Bit for the segment F. (`0x20`)

- `<number>`

### TM1637.SEG_G

Bit for the segment G. (`0x40`)

- `<number>`

### TM1637.SEG_X

Bit for the segment X (Dot or Colon). (`0x80`)

- `<number>`

### TM1637.DIGIT

An array of 7-segment data for number digits from 0 to 9.

- `Array<number>`
