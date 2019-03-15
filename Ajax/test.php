<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <?php
    //设置页面内容时html 编码格式是utf-8
    header("Content-Type:text/plain;charest=utf-8"); //格式为纯文本
    header("Content-Type:application/json;charest=utf-8"); //json字符串
    header("Content-Type:text/xml;charest=utf-8");
    header("Content-Type:text/html;charest=utf-8");
    header("Content-Type:application/javascript;charest=utf-8");
    
    //定义一个多维数组，包含员工的信息，每条员工信息为一个数组
    $staff = array(
        array("name" =>"晓红","number" =>"101","sex" =>"女","job" =>"总经理"),
        array("name" =>"小明","number" =>"102","sex" =>"男","job" =>"副经理")
    );

    ?>
</body>
</html>