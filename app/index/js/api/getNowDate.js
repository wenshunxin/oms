export var  getdate=function() {
    var d = new Date(),
        year = d.getFullYear(),
        monthes = d.getMonth() + 1,
        tian = d.getDate(),
        hours = d.getHours(),
        minutes = d.getMinutes(),
        second = d.getSeconds();
    monthes < 10 ? monthes = "0" + monthes : monthes = monthes
    tian < 10 ? tian = "0" + tian : tian = tian
    var dd = year + "-" + monthes + "-" + tian;
    return dd
}
export var  getCheckdate=function(d) {
      if(d){
          var   year = d.getFullYear(),
            monthes = d.getMonth() + 1,
            tian = d.getDate(),
            hours = d.getHours(),
            minutes = d.getMinutes(),
            second = d.getSeconds();
        monthes < 10 ? monthes = "0" + monthes : monthes = monthes
        tian < 10 ? tian = "0" + tian : tian = tian
        var dd = year + "-" + monthes + "-" + tian;
        return dd
    }else{
        return 
    }
}
/*将毫秒转换成日期*/
export var  trasSecond=function(a){
    var b = new Date(a),
        year = b.getFullYear(),
        month = b.getMonth() + 1,
        day = b.getDate(),
        hours = b.getHours(),
        minute = b.getMinutes(),
        seconds = b.getSeconds(),
        d = year + "-" + month + "-" + day;
    return d;
}
