const { TM1637 } = require("./index");

const CLK = 0;
const DIO = 1;
const tm1637 = new TM1637(CLK, DIO);

var i;

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
tm1637.setDigit(
  0,
  TM1637.SEG_B | TM1637.SEG_C | TM1637.SEG_D | TM1637.SEG_E | TM1637.SEG_G
); // d
tm1637.setDigit(1, TM1637.SEG_C | TM1637.SEG_D | TM1637.SEG_E | TM1637.SEG_G); // o
tm1637.setDigit(2, TM1637.SEG_C | TM1637.SEG_E | TM1637.SEG_G); // n
tm1637.setDigit(
  3,
  TM1637.SEG_A |
    TM1637.SEG_B |
    TM1637.SEG_D |
    TM1637.SEG_E |
    TM1637.SEG_F |
    TM1637.SEG_G
); // e
