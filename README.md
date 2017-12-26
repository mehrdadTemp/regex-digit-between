# regex-digit-between (Regex Numeric Range Generator)
this module generate one valid regex between two positive number.

# 1. Why?

  - best and quick to generate regex
  - simple generate regex between two digit or `garth than`  and `lower than` number


# 2. Functions:

### betweens

> this function get two number and generate regex from that
> you can used this regex in Javascript codes
> betweens(gt,lt);
> result is garth than `gt` number and lower than `lt` param.

### maxThan

> this function get one number and generate regex from that
> you can used this regex in Javascript codes
> maxThan(gt);
> result is garth than  `gt` number param.

### minThan

> this function get one number and generate regex from that
> you can used this regex in Javascript codes
> minThan(lt);
> result is garth than  `lt` number param.

# 3.  Sample:

## Ecma5 :

### HTML
```html
   <script  type="text/javascript"  src="regex-digit-between/lib/ES5/digitRegex.js"></script>
```

### JAVASCRIPT
```javascript

        //todo  290 <=   reg  <= 2459

        var between = betweens(290,2459);
        between.test("12");    //F
        between.test("289");   //F
        between.test("290");   //T
        between.test("291");   //T
        between.test("1005");  //T
        between.test("2450");  //T
        between.test("2459");  //T
        between.test("2460");  //F
        between.test("3460");  //F
        between.test("10050"); //F

        var maxthan = maxThan(290);
        maxthan.test("290");     //T
        maxthan.test("120");     //F
        maxthan.test("2345");    //T
        maxthan.test("234");     //F
        maxthan.test("145");     //F
        maxthan.test("4099");    //T

        var minthan = minThan(2459);
        minthan.test("2459");     //T
        minthan.test("2460");     //F
        minthan.test("2345");     //T
        minthan.test("234");      //T
        minthan.test("145");      //T
        minthan.test("4099");     //F
```

## Ecma6 :

### JAVASCRIPT
```javascript

    import {digitRegex} from 'digitRegex';

    //todo  290 <=   reg  <= 2459
    let [betweens,maxthan,minthan] = [digitRegex.betweens(290,2459),digitRegex.maxThan(290),digitRegex.minThan(2459)];

    between.test("12");    //F
    between.test("289");   //F
    between.test("290");   //T
    between.test("291");   //T
    between.test("1005");  //T
    between.test("2450");  //T
    between.test("2459");  //T
    between.test("2460");  //F
    between.test("3460");  //F
    between.test("10050"); //F

    maxthan.test("290");     //T
    maxthan.test("120");     //F
    maxthan.test("2345");    //T
    maxthan.test("234");     //F
    maxthan.test("145");     //F
    maxthan.test("4099");    //T

    minthan.test("2459");     //T
    minthan.test("2460");     //F
    minthan.test("2345");     //T
    minthan.test("234");      //T
    minthan.test("145");      //T
    minthan.test("4099");     //F


```




