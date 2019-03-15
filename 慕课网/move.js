//框架
function getStyle(obj, attr) { /*对象与属性*/
    /*currentStyle针对IE浏览器 getComputedStyle 针对firefox浏览器*/
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj, false)[attr];
    }
}

// function startMove(obj, attr, iTarget, fn) { //fn再调用一个函数，回调函数
//     clearInterval(obj.timer);
//     obj.timer = setInterval(function () {
//         /*为解决该bug，此处做一个判断：*/
//         //1.取当前的值
//         var icur = 0;
//         if (attr == 'opacity') { /*修复bug1：获取opacity为0.3 →parseFloat*/
//             icur = Math.round(parseFloat(getStyle(obj, attr)) * 100); /*bug3：后台透明度有问题 如7*100=7.0000000000001 */
//         } else { /*修复bug3：Math.round*/
//             icur = Math.round(parseInt(getStyle(obj, attr))); /*若是传过来的宽度或高度*/
//             console.log(1.1);
//         }
//         //var icur = parseInt(getStyle(obj, attr)); /* bug1：opacity: 0.3;转化为int类型???*/
//         //2.算速度
//         var speed = (iTarget - icur) / 8;
//         speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
//         //3.检测停止
//         if (icur == iTarget) {
//             clearInterval(obj.timer);
//             if (fn) {
//                 fn();
//             }
//         } else {
//             if (attr == "opacity") {
//                 obj.style.filter = "alpha(opacity:" + (icur + speed) + ")";
//                 obj.style.opacity = (icur + speed) / 100;
//             } else {
//                 obj.style[attr] = icur + speed + "px"; /*修复bug2*/
//                 console.log(1.2);
//             }
//         }
//         //obj.style[attr] = icur + speed + 'px'; /*bug2：opacity: 0.3 没有单位但此处却有单位   */
//     }, 30)
// }

/*完善该框架 */
function startMove(obj, json, fn) { //fn再调用一个函数，回调函数
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flag = true;//修复bug4：假设所有的运动都达到了目标值。
        /*为解决该bug，此处做一个判断：*/
        for (var attr in json) {
            //1.取当前的值
            var icur = 0;
            if (attr == 'opacity') { /*修复bug1：获取opacity为0.3 →parseFloat*/
                icur = Math.round(parseFloat(getStyle(obj, attr)) * 100); /*bug3：后台透明度有问题 如7*100=7.0000000000001 */
            } else { /*修复bug3：Math.round*/
                icur = Math.round(parseInt(getStyle(obj, attr))); /*若是传过来的宽度或高度*/
                console.log(1.1);
            }
            //var icur = parseInt(getStyle(obj, attr)); /* bug1：opacity: 0.3;转化为int类型???*/
            //2.算速度
            var speed = (json[attr] - icur) / 8;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            //3.检测停止  /*bug4:没有判断所有的属性都是否达到了目标终点，再关闭计时器 */
            //修复bug4
            if (icur != json[attr]) { //如果所有的运动没有达到目标值
                flag = false;
            }
            if (attr == "opacity") {
                obj.style.filter = "alpha(opacity:" + (icur + speed) + ")";
                obj.style.opacity = (icur + speed) / 100;
            } else {
                obj.style[attr] = icur + speed + "px"; /*修复bug2*/
                console.log(1.2);
            }
        }
            if (flag) {
                clearInterval(obj.timer);
                if (fn) {
                    fn();
                }
            }
        //obj.style[attr] = icur + speed + 'px'; /*bug2：opacity: 0.3 没有单位但此处却有单位   */
    }, 30)
}