function maxRegexPositive(number){
    try{
        var len = number.length;
        var array = ['(?=(^[1-9][0-9]{'+len+',}$))'];
        for(var n=0; n<len - 1; n++) {
            try{
                var d = Number(number[n]);
                var before = number.substr(0, n);
                var num = d == 9 ? '9' : '['+(++d)+'-9]';
                array.push('(?=(^'+before+num+'[0-9]{'+(len - n - 1)+',}$))');
            }catch(e){
                console.error(e);
            }
        }
        var d = Number(number[len-1]);
        var before = number.substr(0, len-1);
        var num = d == 9 ? '9' : '['+(++d)+'-9]';
        array.push('(?=(^'+before+num+'[0-9]*$))');
        array.push('(?=(^'+number+'[0-9]*$))');
        return  array;
    }
    catch(e){
        console.error(e);
    }
}
function maxRegexNegative(number){
    try{
        var len = number.length;
        var array = ['(?=(^[\\+]?[1-9]+$))','(?=(^0$))'];
        if(len <= 1){
            array.push('(?=(^[\\-][1-'+number[0]+']$))');
            return array;
        }else{
            array.push('(?=(^[\\-][1-9][0-9]{0,'+(len-2)+'}$))');
            array.push('(?=(^0$))');
            for(var n=0; n<len - 1; n++) {
                var d = Number(number[n]);
                if(d == 0)
                    continue;
                var before = number.substr(0, n);
                var num = '[0-'+(--d)+']';
                array.push('(?=(^[\\-]'+before+num+'[0-9]{0,'+(len - n - 1)+'}$))');
            }
            var d = Number(number[len-1]);
            if(d > 0){
                var before = number.substr(0, len-1);
                var num = '[0-'+(--d)+']';
                array.push('(?=(^[\\-]'+before+num+'$))');
            }
            array.push('(?=(^[\\-]'+number+'$))');
            return array;
        }
    }
    catch(e){
        console.error(e);
    }
}
function minRegexPositive(number){
    try{
        var len = number.length;
        if(len <= 1){
            return ['(?=(^[0-'+number[0]+']$))'];
        }else{
            var array = ['(?=(^[1-9][0-9]{0,'+(len-2)+'}$))','(?=(^0$))'];
            for(var n=0; n<len - 1; n++) {
                var d = Number(number[n]);
                if(d == 0)
                    continue;
                var before = number.substr(0, n);
                var num = '[0-'+(--d)+']';
                array.push('(?=(^'+before+num+'[0-9]{0,'+(len - n - 1)+'}$))');
            }
            var d = Number(number[len-1]);
            if(d > 0){
                var before = number.substr(0, len-1);
                var num = '[0-'+(--d)+']';
                array.push('(?=(^'+before+num+'$))');
            }
            array.push('(?=(^'+number+'$))');
            return array;
        }
    }
    catch(e){
        console.error(e);
    }
}
function minRegexNegative(number){
    try{
        var len = number.length;
        var array = ['(?=(^[\\-][1-9][0-9]{'+len+',}$))'];
        for(var n=0; n<len - 1; n++) {
            try{
                var d = Number(number[n]);
                var before = number.substr(0, n);
                var num = d == 9 ? '9' : '['+(++d)+'-9]';
                array.push('(?=(^[\\-]'+before+num+'[0-9]{'+(len - n - 1)+',}$))');
            }catch(e){
                console.error(e);
            }
        }
        var d = Number(number[len-1]);
        var before = number.substr(0, len-1);
        var num = d == 9 ? '9' : '['+(++d)+'-9]';
        array.push('(?=(^[\\-]'+before+num+'[0-9]*$))');
        array.push('(?=(^[\\-]'+number+'[0-9]*$))');
        return  array;
    }
    catch(e){
        console.error(e);
    }
}

function minThan(digit){
    try{
        if(typeof digit !== "number")
            return;
        digit = Math.floor(digit);
        var  patterns = ['(?:(?=(^[\+|\-]?[1-9][0-9]*$))|(?=(^0$)))'];  //just digit
        //todo grath equal than maxDigit
        var list = null;
        if(digit>=0)
            list = minRegexPositive(String(digit));
        else
            list = minRegexNegative(String(Math.abs(digit)));
        patterns.push('(?:'+list.join('|')+')');
        //todo make regex
        return new RegExp('(?:'+patterns.join('')+')', 'g');
    }
    catch(e){
        return;
    }
}
function maxThan(digit){
    try{
        if(typeof digit !== "number")
            return;
        digit = Math.floor(digit);
        var  patterns = ['(?:(?=(^[\\+|\\-]?[1-9][0-9]*$))|(?=(^0$)))'];  //just digit
        //todo grath equal than maxDigit
        var list = null;
        if(digit>=0)
            list = maxRegexPositive(String(digit));
        else
            list = maxRegexNegative(String(Math.abs(digit)));
        patterns.push('(?:'+list.join('|')+')');


        //todo make regex
        return new RegExp('(?:'+patterns.join('')+')', 'g');
    }
    catch(e){
        return;
    }
}

function betweens(minDig,maxDig){
    try{
        if(
            typeof minDig !== 'number'    ||
            typeof maxDig !== 'number'    ||
            minDig >   maxDig
        )
            return;
        var  patterns = [];
        //todo digit
        patterns.push('(?:(?=(^[\\+|\\-]?[1-9][0-9]*$))|(?=(^0$)))');  //just digit

        var list = null;

        //todo grath equal than minDigit
        if(minDig>=0)
            list = maxRegexPositive(String(minDig));
        else
            list = maxRegexNegative(String(Math.abs(minDig)));
        patterns.push('(?:'+list.join('|')+')');

        //todo lower equal than maxDigit
        if(maxDig>=0)
            list = minRegexPositive(String(maxDig));
        else
            list = minRegexNegative(String(Math.abs(minDig)));
        patterns.push('(?:'+list.join('|')+')');

        //todo make regex
        return new RegExp('(?:'+patterns.join('')+')', 'g');

    }
    catch(e){}
}