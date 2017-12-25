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
                else
                    minarray.push('(?=(^'+number+'$))');
            }catch(e){
                console.error(e);
            }
        }
    }
    return minarray;
};
function betweens(minDig,maxDig){
    try{
        if(
            typeof minDig === "undefined" ||
            typeof maxDig === "undefined" ||
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
        var listMax = maxRegex(String(minDig));
        patterns.push('(?:'+listMax.join('|')+')');

        //todo lower equal than maxDigit
        var listMax = minRegex(String(maxDig));
        patterns.push('(?:'+listMax.join('|')+')');

        //todo make regex
        return new RegExp('(?:'+patterns.join('')+')', 'g');

    }
    catch(e){}
}