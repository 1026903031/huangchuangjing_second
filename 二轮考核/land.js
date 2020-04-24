window.onload = function () {
    //免密码登录和密码登录和二维码切换  因为获取类元素的时候总是会报错，就麻烦了点
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


    
    /*背景随时间变化而变化*/
    var land = document.querySelector(".land");
    var homepage = document.querySelector(".homepage");
    var date = new Date();
    var hour = date.getHours();

    if (hour >= 0 && hour <6){
        land.style.backgroundColor = "rgb(0,80,114)";
        console.log("凌晨，早点睡");
    }
    if (hour >= 6 && hour <9){
        land.style.backgroundColor = "rgb(86,205,254)";
        console.log("早睡早起身体好");
    }
    if (hour >= 9 && hour <17){
        land.style.backgroundColor = "rgb(184，229，248)";
        console.log("好好学习");
    }
    if (hour >= 17 && hour <19){
        land.style.backgroundColor = "rgb(86,205,254)";
        console.log("吃顿好的晚餐，以战晚上的代码");
    }
    if (hour >= 19 && hour < 24){
        land.style.backgroundColor = "rgb(0,80,114)";
        console.log("打打打打代码");
    }

    /*登录跳转*/

    var goto_homepage = document.getElementById("goto_homepage");

    goto_homepage.onclick = function() {
        land.style.display = "none";
        homepage.style.display = "block";

    }


    /*主页导航条的消失与隐藏*/
    var bell = document.getElementById("bell");
    var bell_show = document.querySelector(".bell_show");
    var information = document.getElementById("information");
    var information_show = document.querySelector(".information_show");
    var people = document.getElementById("people");
    var people_show = document.querySelector(".people_content");

    people.onclick = function() {
        if (people_show.style.display == "none") {
            people_show.style.display = "block";
            information_show.style.display = "none";
            bell_show.style.display = "none";
        } else {
            people_show.style.display = "none";
        }
    }

    bell.onclick = function() {
        if (bell_show.style.display == "none") {
            bell_show.style.display = "block";
            information_show.style.display = "none";
            people_show.style.display = "none";
        } else {
            bell_show.style.display = "none";
        }
    }

    information.onclick = function() {
        if (information_show.style.display == "none") {
            information_show.style.display = "block";
            bell_show.style.display = "none";
            people_show.style.display = "none";
        } else {
            information_show.style.display = "none";
        }

    }

    var homepage_main = document.querySelector(".homepage_main");

    homepage_main.onclick = function() {
        bell_show.style.display = "none";
        people_show.style.display = "none";
        information_show.style.display = "none";
    }

    /*返回滑动条数值*/
    function scroll() {
        return {
            "top": document.documentElement.scrollTop + document.body.scrollTop,        //返回滑动条高度
            "left": document.documentElement.scrollLeft + document.body.scrollLeft,      //返回滑动条左侧距离
            "right": document.documentElement.scrollright + document.body.scrollright
        }
    }

    
    /*顶部导航条左右移动*/
    var header_roll = document.getElementById("header_roll");
    
    //回到顶部
    var goTop = document.getElementById("goTop");

    /*侧边条条框在一定程度下浮动*/
    var tofixedone = document.getElementById("tofixedone");
    var tofixedtwo = document.getElementById("tofixedtwo");

    window.onscroll = function () {
        if (scroll().top > 200) {
            goTop.style.display = "block" ;
            header_roll.style.animationName = "topup";
        } else {
            goTop.style.display = "none" ;
            header_roll.style.animationName = "topdown";
        }

        if (scroll().top > 500) {
            tofixedone.style.position = "fixed";
            tofixedtwo.style.position = "fixed";
            tofixedone.style.top = "60px";
            tofixedtwo.style.top = "360px";

            tofixedone.style.width = "290px";
 
         } else {
             tofixedtwo.style.position = "static";
             tofixedone.style.position = "static";
             tofixedone.style.width = "100%";
         }

         if (scroll().left > 100) {
            header_roll.style.left = -scroll().left +"px" ;
        } else {
            header_roll.style.left = "0px"
        }

        if (scroll().left > 90) {
            /*console.log(scroll().left);*/
            tofixedone.style.right ="-133px" ;
            tofixedtwo.style.display = "none";
        } else {
            tofixedtwo.style.display = "block";
            tofixedone.style.right = "" ;
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

    /*评论框框的显示*/
    var comment_show = document.getElementById("comment_show");
    var comment = document.getElementById("comment");

    comment_show.onclick = function() {
        if (comment.style.display == "none") {
            comment.style.display = "block";
            console.log(123);
            
        } else {
            comment.style.display = "none";
        }
            
    }
    /*简易的评论功能          ---   还未完善！！！！！*/
    /*var goComment = this.document.getElementById("goComment");
    var text = this.document.querySelector('textarea');
    var input_text = this.document.querySelector('.comment_item');

    goComment.onclick = function() {
        if (text.value == '') {
            alert('宁没有输入内容');
            return false;
        } else {
            var li = document.createElement('li');
            li.innerHTML = text.value + '<a href ="javascript:;" id="delete" >删除</a>';
            
            input_text.appendChild(li);

            /*input_text.insertBefore(li,input_text.children[0]);

            var conmmentDelete = document.getElementById('delete');
            
            for(var i = 0 ;i < conmmentDelete.length; i++) {
                conmmentDelete[i].onclick = function () {
                    input_text.removeChild(this.parentNode);
                }
            }
        
        }
        
    }*/

}