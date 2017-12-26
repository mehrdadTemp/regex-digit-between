class  digitRegex{
    constructor() {}

    maxRegexPositive(number){
        try{
            let len = number.length;
            let array = [`(?=(^[1-9][0-9]{${len},}$))`];
            for(let n=0; n<len - 1; n++) {
                try{
                    let d = Number(number[n]);
                    let before = number.substr(0, n);
                    let num = d == 9 ? '9' : `[${(++d)}-9]`;
                    array.push(`(?=(^${before}${num}[0-9]{${len - n - 1},}$))`);
                }catch(e){
                    console.error(e);
                }
            }
            let d = Number(number[len-1]);
            let before = number.substr(0, len-1);
            let num = d == 9 ? '9' : `[${(++d)}-9]`;
            array.push(`(?=(^${before}${num}[0-9]*$))`);
            array.push(`(?=(^${number}[0-9]*$))`);
            return  array;
        }
        catch(e){
            console.error(e);
        }
    }
    minRegexPositive(number){
        try{
            var len = number.length;
            if(len <= 1){
                return [`(?=(^[0-${number[0]}]$))`];
            }else{
                var array = [`(?=(^[1-9][0-9]{0,${len-2}}$))`,`(?=(^0$))`];
                for(let n=0; n<len - 1; n++) {
                    let d = Number(number[n]);
                    if(d == 0)
                        continue;
                    let before = number.substr(0, n);
                    let num = `[0-${--d}]`;
                    array.push(`(?=(^${before}${num}[0-9]{0,${len - n - 1}}$))`);
                }
                let d = Number(number[len-1]);
                if(d > 0){
                    let before = number.substr(0, len-1);
                    let num = `[0-${--d}]`;
                    array.push(`(?=(^${before}${num}$))`);
                }
                array.push(`(?=(^${number}$))`);
                return array;
            }
        }
        catch(e){
            console.error(e);
        }
    }

    minThan(digit){
        try{
            if(typeof digit !== "number" || digit  < 0 )
                return;
            digit = Math.floor(digit);
            var  patterns = ['(?:(?=(^[1-9][0-9]*$))|(?=(^0$)))'];  //just digit
            //todo grath equal than maxDigit
            let listMax = this.minRegexPositive(String(digit));
            patterns.push(`(?:${listMax.join('|')})`);
            //todo make regex
            return new RegExp(`(?:${patterns.join('')})`, 'g');
        }
        catch(e){
            return;
        }
    }

    maxThan(digit){
        try{
            if(typeof digit !== "number" || digit  < 0 )
                return;
            digit = Math.floor(digit);
            var  patterns = ['(?:(?=(^[1-9][0-9]*$))|(?=(^0$)))'];  //just digit
            //todo grath equal than maxDigit
            let listMax = this.maxRegexPositive(String(digit));
            patterns.push(`(?:${listMax.join('|')})`);
            //todo make regex
            return new RegExp(`(?:${patterns.join('')})`, 'g');
        }
        catch(e){
            return;
        }
    }

    betweens(minDig,maxDig){
        try{
            if(
                typeof minDig !== "number" ||
                typeof maxDig !== "number" ||
                minDig  < 0                ||
                maxDig  < 0                ||
                minDig >   maxDig
            )
                return;
            var  patterns = [];
            //todo digit
            patterns.push('(?:(?=(^[1-9][0-9]*$))|(?=(^0$)))');  //just digit
            //todo grath equal than minDigit
            var listMax = this.maxRegexPositive(String(minDig));
            patterns.push(`(?:${listMax.join('|')})`);

            //todo lower equal than maxDigit
            var listMax = this.minRegexPositive(String(maxDig));
            patterns.push(`(?:${listMax.join('|')})`);

            //todo make regex
            return new RegExp(`(?:${patterns.join('')})`, 'g');

        }
        catch(e){
            return;
        }
    }

    static digitRegexFactory(){
        'ngInject';
        return new digitRegex();
    }
}

export  default  digitRegex.digitRegexFactory;