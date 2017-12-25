# regex-digit-between
this function generate one valid regex between two positive number

#Sample
//  290 <=   reg  <= 2459
var reg = regexBetween(290,2459);
reg.test("12");    //F
reg.test("289");   //F
reg.test("290");   //T
reg.test("291");   //T
reg.test("1005");  //T
reg.test("2450");  //T
reg.test("2459");  //T
reg.test("2460");  //F
reg.test("3460");  //F
reg.test("10050"); //F
