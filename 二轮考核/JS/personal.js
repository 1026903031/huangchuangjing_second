/*--------------个人信息的页面和修改---------------*/

/*个人资料返回主页*/
query(".goback_homepage").addEventListener("click", homepageGo);  //监听
fromId("goto_personal_Homepage").addEventListener("click", toPersonalHomepage);  //监听

/*去个人主页*/
function toPersonalHomepage() {

    land.style.display = "none";
    homepage.style.display = "none";
    personal_Homepage.style.display = "block";
    query('.showblueOne').style.display = "none";

    getInfo();      //获取个人信息

    getfriends();       //获取信息和好友
    timer = setInterval(function() {        //慢请求
        getfriends();
    } ,5000);

}

/*获取个人信息*/
function getInfo() {
    axios
    .get("http://47.97.204.234:3000/user/getInfo?userId=" + uID )
    .then(res => addPersonal(res))
    .catch(err => console.error(err));
}

var input_content = queryAll('.input_content');     //显示按钮
var group_two = queryAll('.group_two');     //取消按钮

for(var i = 0 ; i < input_content.length ; i++) {       //遍历以添加事件
    
    input_content[i].onclick = function() {     /*点击修改显示输入框*/
        this.parentNode.style.display = "none";     
        this.parentNode.nextElementSibling.style.display = "block"
    }

    group_two[i].onclick = function() {     //点击取消隐藏
        this.parentNode.parentNode.style.display = "none";
        this.parentNode.parentNode.previousElementSibling.style.display = "block"
    }
}

/*添加个人信息*/
function addPersonal(res) {

    uNickname = res.data.info.nickname;     //名字
    uAvatar = res.data.info.avatar;     //头像

    query('.people_Avatar').innerHTML = `<img src="${uAvatar}" ></img>`;        //显示头像
    query('.userAvatarImg').src = uAvatar;          //获取头像地址
    query('.userNameTitle').innerText = uNickname;      //显示名字

    var field_text = queryAll('.field_text');       //各各信息

    field_text[0].innerText = res.data.info.gender;     //性别
    field_text[1].innerText = res.data.info.introduction;       //介绍
    field_text[2].innerText = res.data.info.trade;      //方向
    field_text[3].innerText = res.data.info.resume;     //简介

    /*修改*/
    var group_one = queryAll('.group_one');     //修改按钮

    /*修改名字*/
    group_one[0].onclick = function() {

        var textname =  this.parentNode.previousElementSibling.value;       //获取输入框内容

        if (textname == "") {
            alert('宁没有输入内容');
        } else {
            axios       //发出修改请求
            .post("http://47.97.204.234:3000/user/alterInfo",{
                userId : uID,
                direction : 0 ,
                content : textname
            })
            .then(function(resp){
                alert(resp.data.result + resp.data.message);
                toPersonalHomepage();       //重新进入个人页面
                group_two[0].onclick();     //隐藏当时的选项
            })
            .catch(err => console.error(err));
        }
    }

    /*修改性别*/
    group_one[1].onclick = function() {

        var gender = document.getElementsByName("gender");      //获取单选框内容
        var textgender = "";        //内容清空

        if (gender[0].checked == true) {
            textgender = gender[0].value;       //男
        } else if (gender[1].checked == true) {
            textgender = gender[1].value;       //女
        } 
        
        if (textgender == "") {
            alert('宁没有选择内容');
        } else {
            axios       //发出修改性别信息的请求
            .post("http://47.97.204.234:3000/user/alterInfo",{
                userId : uID,
                direction : 1 ,
                content : textgender
            })
            .then(function(resp){
                alert(resp.data.result + resp.data.message);
                toPersonalHomepage();    //重新进入个人页面
                group_two[1].onclick();     //隐藏当时的选项

            })
            .catch(err => console.error(err));
        }
    }

    /*修改一句话介绍*/
    group_one[2].onclick = function() {

        var textIntroduction =  this.parentNode.previousElementSibling.value;   //获取输入框内容

        if (textIntroduction == "") {
            alert('宁没有输入内容');
        } else {
            axios       //发出修改一句话信息的请求
            .post("http://47.97.204.234:3000/user/alterInfo",{
                userId : uID,
                direction : 2 ,
                content : textIntroduction
            })
            .then(function(resp){
                alert(resp.data.result + resp.data.message);
                toPersonalHomepage();       //重新进入个人页面
                group_two[2].onclick();      //隐藏当时的选项

            })
            .catch(err => console.error(err));
        }
    }

    /*修改职业*/
    group_one[3].onclick = function() {

        var optionIndex = this.parentNode.previousElementSibling.selectedIndex;
        var textindustry =  this.parentNode.previousElementSibling[optionIndex].value;      //获取多选框内容

        if (textindustry == "") {
            alert('宁没有选择内容');
        } else {
            axios       //发出修改职业信息的请求
            .post("http://47.97.204.234:3000/user/alterInfo",{
                userId : uID,
                direction : 3 ,
                content : textindustry
            })
            .then(function(resp){
                alert(resp.data.result + resp.data.message);
                toPersonalHomepage();       //重新进入个人页面
                group_two[3].onclick();     //隐藏当时的选项

            })
            .catch(err => console.error(err));
        }
    }


    /*修改个人简介*/
    group_one[4].onclick = function() {

        var textIntroduction =  this.parentNode.previousElementSibling.value;       //获取输入框内容

        if (textIntroduction == "") {
            alert('宁没有输入内容');
        } else {
            axios       //发出修改个人简介请求
            .post("http://47.97.204.234:3000/user/alterInfo",{
                userId : uID,
                direction : 4 ,
                content : textIntroduction
            })
            .then(function(resp){
                alert(resp.data.result + resp.data.message);
                toPersonalHomepage();       //重新进入个人页面
                group_two[4].onclick();     //隐藏当时的选项

            })
            .catch(err => console.error(err));
        }
    }


    
}

/*上传头像*/

var btn = query("#btn");
btn.onclick = function(){

    this.style.display = "none";    //上传按钮隐藏
    this.previousElementSibling.innerHTML = "";     //文件路径显示清除
    var formdata=new FormData(fromId("advForm"));       //将上传的头像转为formdata形式

    axios({
        method:'post',
        url:'http://47.97.204.234:3000/user/alterAvatar',
        data:formdata,
        cache: false,            // 不缓存 
        contentType: false,  // 不设置内容类型  jQuery不要去设置Content-Type请求头
        processData: false,  // jQuery不要去处理发送的数据
        withCredentials:true,
    })
    .then(function(resp){
        alert(resp.data.result + resp.data.message);
        toPersonalHomepage();
    })
    .catch(err => console.error(err));

}

var personal_avatarInput = query('.personal_avatarInput');      //上传文件

personal_avatarInput.onchange = function() {
    this.nextElementSibling.innerHTML = this.value;         //显示路径
    this.nextElementSibling.nextElementSibling.style.display = "block";     //显示上传按钮
}