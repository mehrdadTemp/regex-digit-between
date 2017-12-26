function maxRegex(number){
    var minarray = [];
    var len = number.length;
    if(len == 1){
        try{
            minarray.push('(?=(^[1-9][0-9]+$))');
            minarray.push('(?=(^['+number[0]+'-9]$))');
        }catch(e){
            console.error(e);
        }
    }else if(len > 1){
        minarray.push('(?=(^[1-9][0-9]{'+len+',}$))');
        for(let n=0;n<len;n++) {
            try{
                let num = Number(number[n]);
                if (num < 9) {
                    if (n == len - 1)
                        minarray.push('(?=(^'+number.substr(0, n)+'['+num+'-9][0-9]*$))');
                    else
                        minarray.push('(?=(^'+number.substr(0, n)+'['+(num + 1)+'-9][0-9]{'+(len - n - 1)+',}$))');
                }
                else {
                    minarray.push('(?=(^'+number+'[0-9]*$))');
                }
            }catch(e){
                console.error(e);
            }
        }
    }
    return minarray;
}

function maxRegexPositive(number){
    try{
        var len = number.length;
        var array = ['(?=(^[1-9][0-9]{'+len+',}$))'];
        for(let n=0; n<len - 1; n++) {
            try{
                let d = Number(number[n]);
                let before = number.substr(0, n);
                let num = d == 9 ? '9' : '['+(++d)+'-9]';
                array.push('(?=(^'+before+num+'[0-9]{'+(len - n - 1)+',}$))');
            }catch(e){
                console.error(e);
            }
        }
        let d = Number(number[len-1]);
        let before = number.substr(0, len-1);
        let num = d == 9 ? '9' : '['+(++d)+'-9]';
        array.push('(?=(^'+before+num+'[0-9]*$))');
        array.push('(?=(^'+number+'[0-9]*$))');
        return  array;
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
            for(let n=0; n<len - 1; n++) {
                let d = Number(number[n]);
                if(d == 0)
                    continue;
                let before = number.substr(0, n);
                let num = '[0-'+(--d)+']';
                array.push('(?=(^'+before+num+'[0-9]{0,'+(len - n - 1)+'}$))');
            }
            let d = Number(number[len-1]);
            if(d > 0){
                let before = number.substr(0, len-1);
                let num = '[0-'+(--d)+']';
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

function minRegex(number){
    var minarray = [];
    var len = number.length;
    if(len == 1){
        try{
            if(Number(number[0]) != 0)
                minarray.push('(?=(^[1-'+number[0]+']$))');
            else
                minarray.push('(?=(^0$))');
        }catch(e){
            console.error(e);
        }
    }else if(len > 1){
        minarray.push('(?=(^[1-9][0-9]{0,'+(len-2)+'}$))');
        for(let n=0;n<len;n++) {
            try{
                let num = Number(number[n]);
                if(n==0 && (num==1 || num == 0))
                    continue;
                if (num > 1) {
                    if (n == len - 1)
                        minarray.push('(?=(^'+number.substr(0, n)+'[0-'+num+']$))');
                    else
                        minarray.push('(?=(^'+number.substr(0, n)+'[0-'+(num-1)+'][0-9]{1,'+(len - n - 1)+'}$))');
                }
                else if(num == 1 && n == len - 1){
                    minarray.push('(?=(^'+number.substr(0, n)+'[0-1]$))');
                }
                else
                    minarray.push('(?=(^'+number+'$))');
            }catch(e){
                console.error(e);
            }
        }
    }
    return minarray;
}

function minThan(digit){
    try{
        if(typeof digit !== "number" || digit  < 0 )
            return;
        digit = Math.floor(digit);
        var  patterns = ['(?:(?=(^[1-9][0-9]*$))|(?=(^0$)))'];  //just digit
        //todo grath equal than maxDigit
        let listMax = minRegex(String(digit));
        patterns.push('(?:'+listMax.join('|')+')');
        //todo make regex
        return new RegExp('(?:'+patterns.join('')+')', 'g');
    }
    catch(e){
        return;
    }
}

function maxThan(digit){
    try{
        if(typeof digit !== "number" || digit  < 0 )
            return;
        digit = Math.floor(digit);
        var  patterns = ['(?:(?=(^[1-9][0-9]*$))|(?=(^0$)))'];  //just digit
        //todo grath equal than maxDigit
        let listMax = maxRegex(String(digit));
        patterns.push('(?:'+listMax.join('|')+')');
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
            minDig  < 0                   ||
            maxDig  < 0                   ||
            minDig >   maxDig
        )
            return;
        var  patterns = [];
        //todo digit
        patterns.push('(?:(?=(^[1-9][0-9]*$))|(?=(^0$)))');  //just digit
        //todo grath equal than minDigit
        var listMax = maxRegexPositive(String(minDig));
        patterns.push('(?:'+listMax.join('|')+')');

        //todo lower equal than maxDigit
        var listMax = null;
        listMax = minRegexPositive(String(maxDig));
        patterns.push('(?:'+listMax.join('|')+')');

        //todo make regex
        return new RegExp('(?:'+patterns.join('')+')', 'g');

    }
    catch(e){}
}

//\u002B == +
//\u002D == -