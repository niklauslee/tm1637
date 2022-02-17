const DATA_CMD = 0x40;
const DISP_CMD = 0x80;
const ADDR_CMD = 0xc0;
const FIXED_ADDR = 0x04;
const PWM_MASK = 0x07;
const DISP_ON = 0x08;
const DISP_OFF = 0x00;

class TM1637 {
  constructor(clkPin, dioPin, length = 4, brightness = 0x07) {
    this.clk = clkPin;
    this.dio = dioPin;
    this.length = length;
    this.brightness = brightness;
    pinMode(this.clk, OUTPUT);
    pinMode(this.dio, OUTPUT);
    this.sendCmd(DISP_CMD | DISP_ON | (this.brightness & PWM_MASK));
  }

  delay() {
    // noop
  }

  start() {
    digitalWrite(this.clk, HIGH);
    digitalWrite(this.dio, HIGH);
    this.delay();
    digitalWrite(this.dio, LOW);
    this.delay();
  }

  stop() {
    digitalWrite(this.clk, LOW);
    this.delay();
    digitalWrite(this.clk, HIGH);
    this.delay();
    digitalWrite(this.dio, HIGH);
  }

  send(b) {
    var bits = b;
    for (var i = 0; i < 8; i++) {
      digitalWrite(this.clk, LOW);
      if (bits & 1) {
        digitalWrite(this.dio, HIGH);
      } else {
        digitalWrite(this.dio, LOW);
      }
      this.delay();
      digitalWrite(this.clk, HIGH);
      this.delay();
      bits = bits >> 1;
    }
    digitalWrite(this.clk, LOW);
    digitalWrite(this.dio, LOW);
    this.delay();
    digitalWrite(this.clk, HIGH);
    this.delay();
  }

  sendCmd(cmd) {
    this.start();
    this.send(cmd);
    this.stop();
  }

  sendData(addr, data) {
    this.sendCmd(DATA_CMD | FIXED_ADDR);
    this.start();
    this.send(ADDR_CMD | addr);
    this.send(data);
    this.stop();
    this.delay();
  }

  clear() {
    for (var i = 0; i < this.length; i++) this.sendData(i, 0x0);
  }

  setDigit(pos, data) {
    this.sendData(pos, data);
  }

  display(value) {
    var digits = new Array(this.length);
    var i;
    for (i = 0; i < this.length; i++) digits[i] = 0;
    if (typeof value === "number") {
      var len = Math.min(value.toString().length, this.length);
      for (i = 0; i < len; i++) {
        var d = Math.floor(value / Math.pow(10, i)) % 10;
        digits[i] = TM1637.DIGIT[d];
      }
    }
    for (i = 0; i < this.length; i++) {
      this.setDigit(i, digits[this.length - i - 1]);
    }
  }

  setBrightness(brightness) {
    this.brightness = brightness;
    this.sendCmd(DISP_CMD | DISP_ON | (this.brightness & PWM_MASK));
  }

  on() {
    this.sendCmd(DISP_CMD | DISP_ON | (this.brightness & PWM_MASK));
  }

  off() {
    this.sendCmd(DISP_CMD | DISP_OFF);
  }
}

//      A
//     ---
//  F |   | B
//     -G-
//  E |   | C
//     ---  . X
//      D
TM1637.SEG_A = 0x01;
TM1637.SEG_B = 0x02;
TM1637.SEG_C = 0x04;
TM1637.SEG_D = 0x08;
TM1637.SEG_E = 0x10;
TM1637.SEG_F = 0x20;
TM1637.SEG_G = 0x40;
TM1637.SEG_X = 0x80; // dot or colon

TM1637.DIGIT = [
  0x3f, // 0
  0x06, // 1
  0x5b, // 2
  0x4f, // 3
  0x66, // 4
  0x6d, // 5
  0x7d, // 6
  0x07, // 7
  0x7f, // 8
  0x6f, // 9
];

exports.TM1637 = TM1637;
