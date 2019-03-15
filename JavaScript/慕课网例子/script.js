window.onload = function () {
    waterfall('main', 'box'); //封装调用此函数，让图片显示在该显示的位置

    //onscroll事件实现瀑布流布局的图片加载功能
    //若达到条件就将dataInt(数据库)中的数据渲染到下边
    var dataInt = { "data": [{ "src": '1F.jpg' }, { "src": '2F.jpg' }, { "src": '3F.jpg' }, { "src": '4F.jpg' }, { "src": '1F.jpg' }] }
    window.onscroll = function () {
        //是否具备了拖动滚动条的条件
        if (checkScrollSlide) {
            //将数据块渲染到当前页面的尾部
            var oParent = document.getElementById('main');
            for (var i = 0; i < dataInt.data.length; i++) {
                var oBox = document.createElement("div");
                oBox.className = 'box';
                oParent.appendChild(oBox);//将box添加到main里
                var oPic = document.createElement("div");
                oPic.className = 'pic';
                oBox.appendChild(oPic);
                var oImg = document.createElement('img');
                oImg.src = dataInt.data[i].src;
                oPic.appendChild(oImg);
            }
            waterfall('main', 'box');//将新加入的数据也调用waterfall
        }
    }
}

function waterfall(parent, box) {
    //将main下的所有class为box的元素取出
    var oParent = document.getElementById(parent);
    var oBoxs = getByClass(oParent, box);
    //console.log(oBoxs.length);计算class为box的数量
    //计算整个页面显示的列数cols(页面宽/box的宽)
    //先计算box的宽度，因为宽度一样，所以计算一个
    var oBoxW = oBoxs[0].offsetWidth;
    //console.log(oBoxW);
    var cols = Math.floor(document.documentElement.clientWidth / oBoxW);
    //设置main的宽 使居中
    oParent.style.cssText = 'width:' + oBoxW * cols + 'px;margin:0 auto';
    var hArr = []; //存放每一列高度的值
    for (var i = 0; i < oBoxs.length; i++) {
        if (i < cols) { //第一行
            hArr.push(oBoxs[i].offsetHeight);
        } else { //若不是第一行
            //求出高度最小值
            var minH = Math.min.apply(null, hArr);
            //console.log(minH);
            //需要知道minH在数组中索引是多少
            var index = getMinhIndex(hArr, minH);
            oBoxs[i].style.position = 'absolute';//不能漏掉
            oBoxs[i].style.top = minH + 'px';
            //oBoxs[i].style.left = oBoxW * index +'px';
            //第二种
            oBoxs[i].style.left = oBoxs[index].offsetLeft + 'px';
            //bug:第二行的图片都重叠一起
            //修复bug：高度最小值此时要加上新的图片的高度，存在hArr数组中，重新比较
            hArr[index] += oBoxs[i].offsetHeight;
        }
    }
}

//根据class获取元素
function getByClass(parent, clsName) {
    var boxArr = new Array(); //用来存储获取到所有class为box的元素
    //或者是var boxArr = [];
    var oElements = parent.getElementsByTagName("*");
    //获取到main下所有的子元素，遍历判断与class为box是否相同
    for (var i = 0; i < oElements.length; i++) {
        if (oElements[i].className == clsName) {
            boxArr.push(oElements[i]); //push()加入到数组后边
        }
    }
    return boxArr;
}

function getMinhIndex(arr, val) {
    for (var i in arr) {
        if (arr[i] == val) {
            return i; //i就是我们要的索引
        }
    }
}

//检测是否具备了滚动条加载数据库的条件
function checkScrollSlide() {
    var oParent = document.getElementById("main");
    var oBoxs = getByClass(oParent, 'box');
    var lastBoxH = oBoxs[oBoxs.length - 1].offsetTop + Math.floor(oBoxs[oBoxs.length - 1].offsetHeight / 2);
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.body.clientHeight || document.documentElement.clientHeight;
    return (lastBoxH < scrollTop + height) ? true : false;
}