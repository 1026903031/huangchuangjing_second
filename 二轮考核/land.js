window.onload = function () {
    //免密码登录和密码登录切换
    var right = document.getElementById("right");
    var left = document.getElementById("left");
    var rightOpen = document.getElementById("rightOpen");
    var leftOpen = document.getElementById("leftOpen");

    var right_Open = document.getElementById("right_Open");
    var left_Open = document.getElementById("left_Open");

    var qrode = document.getElementById("qrode");
    var qrodeOpen = document.getElementById("qrodeOpen");
    var qrodeImg = document.getElementById("qrodeImg");
    
    right.onclick = function () {
        right_Open.style.display = "block";
        left_Open.style.display = "none";
        rightOpen.style.display = "block";
        leftOpen.style.display = "none";
    }

    left.onclick = function () {
        right_Open.style.display = "none";
        left_Open.style.display = "block";
        rightOpen.style.display = "none";
        leftOpen.style.display = "block";
    }

    qrode.onclick = function () {
        if (qrodeOpen.style.display == "none") {
            right_Open.style.display = "none";
            left_Open.style.display = "none";
            rightOpen.style.display = "none";
            leftOpen.style.display = "none";
            right.style.display = "none";
            left.style.display = "none";
            qrodeOpen.style.display = "block";
            qrodeImg.src = 'land/back.png';
        } else {
            right_Open.style.display = "block";
            left_Open.style.display = "none";
            rightOpen.style.display = "block";
            leftOpen.style.display = "none";
            right.style.display = "inline-block";
            left.style.display = "inline-block";
            qrodeOpen.style.display = "none";
            qrodeImg.src = 'land/download.png';
        }
        
    }


    var bColor = document.querySelector(".land");

    var date = new Date();
    var hour = date.getHours();

    if (hour >= 0 && hour <6){
        bColor.style.backgroundColor = "rgb(0,80,114)";
        console.log("凌晨，早点睡");
    }
    if (hour >= 6 && hour <9){
        bColor.style.backgroundColor = "rgb(86,205,254)";
        console.log("早睡早起身体好");
    }
    if (hour >= 9 && hour <17){
        bColor.style.backgroundColor = "rgb(184，229，248)";
        console.log("好好学习");
    }
    if (hour >= 17 && hour <19){
        bColor.style.backgroundColor = "rgb(86,205,254)";
        console.log("吃顿好的晚餐，以战晚上的代码");
    }
    if (hour >= 19 && hour < 24){
        bColor.style.backgroundColor = "rgb(0,80,114)";
        console.log("打打打打代码");
    }


    
    //顶部导航条左右移动
    var header_roll = document.getElementById("header_roll");
    var roll = scroll().left;
    
    window.onscroll = function () {

        if (scroll().left > 100) {
            console.log(123);
            header_roll.style.left = roll +'px' ;
            
            console.log(100-scroll().left);
        } 
    }

    //回到顶部
    var goTop = document.getElementById("goTop");

    window.onscroll = function () {
        if (scroll().top > 200) {
            goTop.style.display = "block" ;
            header_roll.style.animationName = "topup";
        } else {
            goTop.style.display = "none" ;
            header_roll.style.animationName = "topdown";
        }
    }
    
    goTop.onclick = function () {                                           //当所设置gotop元素被点击时，触发函数
        clearInterval(goTop.timer);                                         //停止计时器循环
        goTop.timer = setInterval(function () {                             //设置定时器循环期间的操作（每0.03秒来一次）
            var speed = (0 - scroll().top) / 10;                            //设置一个speed的数，以做到每0.03秒上升高度不同，以起到先快再慢的效果
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);       //下面解释math函数
            window.scrollTo(0, scroll().top + speed);                       //让滚动条飞
            if (scroll().top == 0) {
                clearInterval(goTop.timer);                                 //当到顶部的时候停止定时器循环
            }
        }, 30)
    }

    function scroll() {
        return {
            "top": document.documentElement.scrollTop + document.body.scrollTop,        //返回滑动条高度
            "left": document.documentElement.scrollLeft + document.body.scrollLeft      //返回滑动条左侧距离
        }
    }





}