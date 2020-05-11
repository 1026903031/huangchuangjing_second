/*----------登录与退出，以及个人信息的获取（头像，名字，id等）----------*/

/*表情(用于评论和聊天)*/
let arrDate = [
    {title:"哭笑不得", emoji : "😂" },
    {title:"爱"   , emoji : "😘" },
    {title:"笑"   , emoji : "😀" },
    {title:"大笑"  , emoji : "😁" },
    {title:"开怀大笑", emoji : "🤣" },
    {title:"假笑"  , emoji : "😃" },
    {title:"眯眼笑" , emoji : "😄" },
    {title:"汗笑"  , emoji : "😅" },
    {title:"电眼笑" , emoji : "😉" },
    {title:"欣慰笑" , emoji : "😊" },
    {title:"吐舌头笑", emoji : "😋" },
    {title:"酷", emoji : "😎" },
    {title:"色"   , emoji : "😍" },
    {title:"亲亲"  , emoji : "😗" }
];

/*----登录请求----*/

var userName = fromId('userName');     //获取用户名
var userPassword = fromId('userPassword');     //获取密码
var land = query(".land");     //登录页面
var homepage = query(".homepage");     //主页
var personal_Homepage = query(".personal_Homepage");   //个人主页
var header  = query(".header");    //导航条
var remember = query('.remember');      //记住用户名
var uName , uPWord , uID,uNickname,uAvatar;     //用户数据

/*记住用户名*/
if(localStorage.getItem('rname')) {
    userName.value = localStorage.getItem('rname');
    userPassword.value = localStorage.getItem('rpassword');
    remember.checked = true;
}

remember.addEventListener('change' , function(){        //监听是否记住
    if (this.checked) {     //勾选就将数据存入浏览器
        localStorage.setItem ('rname' , userName.value);
        localStorage.setItem('rpassword' , userPassword.value);
    } else {        //不勾选就清除以前存储的数据
        localStorage.removeItem('rname');
        localStorage.removeItem('rpassword');
    }
})

/*登录跳转*/
fromId("goto_homepage").addEventListener("click", toLogin);  //监听  点击后转 toLogin 函数

function toLogin() {    //登录，向服务器请求

    axios
    .post("http://47.97.204.234:3000/user/login", {
        username: userName.value,   //输入框内容（账号）
        password: userPassword.value    //输入框内容 （密码）
    },{withCredentials:true})
    .then(res => loginRequest_status(res))      //调用 loginRequest_status 已检查登录是否成功
    .catch(err => console.error(err));      //错误，报错

}

function loginRequest_status(res) {      //登录请求结果处理
    
    if (res.data.result == "failed") {      //失败，显示警示框和红色框框

        if(res.data.message == "该账号不存在" ) {       //若账号不存在则使账号框框红起来

            alert(res.data.result + " : " + res.data.message);
            userName.style.borderBottom = "1px solid red";
            userName.value = "";

        } else if (res.data.message == "密码错误" ) {       //若密码错误则使账号框框红起来

            alert(res.data.result + " : " + res.data.message);
            userPassword.style.borderBottom = "1px solid red";
            userPassword.value = "";

        } else if (res.data.message == "此账号已经登录") {      //若账号已经登录则退出去重新登录，以进入页面

            axios
            .post("http://47.97.204.234:3000/user/logout", {
                username: userName.value ,
                password: userPassword.value
            })
            .then(toLogin())        //转到toLogin() 函数，重新登录
            .catch(err => console.error(err));

        }

    } else if (res.data.result == "success") {      //成功则存入数据，并清空输入框
        
        uName = userName.value;
        uPWord = userPassword.value;
        userPassword.value = "";
        userName.value = "";
        uID = res.data.userId;
        homepageGo();       //转页面

    }

}

function homepageGo() {     //转主页

    land.style.display = "none";
    homepage.style.display = "block";
    header.style.display = "block";
    personal_Homepage.style.display = "none";
    query('.showblueOne').style.display = "block";  

    getArticle();       //转到获取文章函数
    getfriends();       //请求好友与新信息

    timer = setInterval(function() {    //实时获取信息
        getfriends();
    } ,5000);

}

/*-----获取文章-----*/
function getArticle() {     //成功后转 article_title(res) 函数，以显示文章，评论等功能

    axios       //获取文章
    .get("http://47.97.204.234:3000/article/getArticles?userId=" + uID + "&start=0&stop=18")
    .then(res => article_title(res))
    .catch(err => console.error(err));

    axios       //检查登录状态，以获取个人信息
    .get("http://47.97.204.234:3000/user/getInfo?userId=" + uID )
    .then(function(res) {
        uNickname = res.data.info.nickname;
        uAvatar = res.data.info.avatar;
        query('.people_Avatar').innerHTML = `<img src="${uAvatar}" ></img>`;
    })
    .catch(err => console.error(err));

}

/*登录失败后*/
userName.onclick = function () {    //被点击框框红色消失
    userName.style.borderBottom = "none";
}

userPassword.onclick = function () {    //被点击框框红色消失
    userPassword.style.borderBottom = "none";
}

/*----退出登录----*/
fromId("goto_land").addEventListener("click", toLogout);  //监听    点击转到toLogout函数退出页面

function toLogout() {    //向服务器请求 退出登录

    this.parentNode.parentNode.style.display = "none";
    axios
    .post("http://47.97.204.234:3000/user/logout", {
        username: uName ,
        password: uPWord
    })
    .then( landGo() )       //调用landGo函数，转到登录页面
    .catch(err => console.error(err));

}

function landGo() {     //转到登录页面

    alert("退出成功！");
    land.style.display = "block";
    homepage.style.display = "none";
    header.style.display = "none";
    personal_Homepage.style.display = "none";

    clearInterval(timer);   //停止实时获取信息

    setTimeout(function() {
        history.go(0);      //刷新页面，以删除其他样式
    },500)
    
}


/*时间格式转换*/
function timeFormat_conversion (t) {
    var t1 = t.replace('T',' ').slice(0,19); 
    return t1;
}

