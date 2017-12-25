# regex-digit-between
this function generate one valid regex between two positive number

# 1.  Sample

## Ecma5 :

### HTML
```html
   <script  type="text/javascript"  src="regex-digit-between/lib/ecma5Regex.js"></script>
```

### JAVASCRIPT
```javascript

    //  290 <=   reg  <= 2459

    var reg = betweens(290,2459);
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
```

## Ecma6 :

### JAVASCRIPT
```javascript
    import {regexBetween} from '.node_modules/regex-digit-between/lib/index';

    //  290 <=   reg  <= 2459

    var reg = regexBetween.betweens(290,2459);
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
```




