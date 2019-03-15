function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj, false)[attr];
    }
}

function startMove(obj, style1, value, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        //1.取当前值
        var icur = 0;
        if (style1 == "opacity") {
            icur = Math.round(parseFloat(getStyle(obj, style1)) * 100);
        } else {
            icur = Math.round(parseInt(getStyle(obj, style1)));
            console.log(2.1);
        }
        //2.算速度
        var speed = (value - icur) / 8;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        //3.检测停止
        if (icur == value) {
            clearInterval(obj.timer);
            if (fn) {
                fn();
            }
        } else {
            if (style1 == "opacity") {
                obj.style.filter = "alpha(opacity:" + (icur + speed) + ")";
                obj.style.opacity = (icur + speed) / 100;
            } else {
                obj.style[style1] = icur + speed + "px";
                obj.style.fontSize = parseInt(getStyle(obj, 'fontSize')) + 1 + "px";
                console.log(2.2);
            }
        }
    }, 30)
}  