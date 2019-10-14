/**************************************时间格式化处理************************************/
export function intDateFormat(fmt,date)
{
    var fmt = "";
    if(date){
        var date = date.toString();
        fmt = date.substr(0,4);
        fmt += "年"+date.substr(4,2);
        fmt += "月"+date.substr(6,2)+"日";
        fmt += " "+date.substr(8,2);
    }


    return fmt;
}


/**************************************时间格式化处理************************************/
export function dateFormat(fmt,date)
{
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
        }
    }
    return fmt
}

function padLeftZero (str) {
    return ('00' + str).substr(str.length)
}