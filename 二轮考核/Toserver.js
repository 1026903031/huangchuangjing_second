
/*-----获取文章-----*/

var $ = document.querySelector;

function getArticle() {
    axios
    .get("http://47.97.204.234:3000/article/getArticles?userId=" + uID + "&start=0&stop=18",{

    })
    .then(res => article_title(res))
    .catch(err => console.error(err));

    axios
    .get("http://47.97.204.234:3000/user/getInfo?userId=" + uID ,{

    })
    .then(function(res) {
        uNickname = res.data.info.nickname;
    uAvatar = res.data.info.avatar;
    document.querySelector('.people_Avatar').innerHTML = `<img src="${uAvatar}" ></img>`;
    })
    .catch(err => console.error(err));

}


/*----登录请求----*/


var userName = document.getElementById('userName');     //获取用户名
var userPassword = document.getElementById('userPassword');     //获取密码
var land = document.querySelector(".land");     //登录页面
var homepage = document.querySelector(".homepage");     //主页
var personal_Homepage = document.querySelector(".personal_Homepage");   //个人主页
var header  = document.querySelector(".header");    //导航条

var uName , uPWord , uID,uNickname,uAvatar;


/*登录跳转*/
document.getElementById("goto_homepage").addEventListener("click", toLogin);  //监听

function homepageGo() {     //转页面

    land.style.display = "none";
    homepage.style.display = "block";
    header.style.display = "block";
    personal_Homepage.style.display = "none";
    document.querySelector('.showblueOne').style.display = "block";  
    getArticle();

    timer = setInterval(function() {
        getfriends();
    } ,5000);
}

function toLogin() {    //登录，向服务器请求

    axios
    .post("http://47.97.204.234:3000/user/login", {
        username: userName.value,   //输入框内容（账号）
        password: userPassword.value    //输入框内容 （密码）
    },{withCredentials:true})
    .then(res => loginRequest_status(res))      //成功，调用函数使用得到的参数（json）
    .catch(err => console.error(err));      //错误，报错

}

function loginRequest_status(res) {      //登录请求结果处理
    
    if (res.data.result == "failed") {      //失败，显示警示框和红色框框

        alert(res.data.result + " : " + res.data.message);
        if(res.data.message == "该账号不存在" ) {
            userName.style.borderBottom = "1px solid red";
            userName.value = "";
        } else if (res.data.message == "密码错误" ) {

            userPassword.style.borderBottom = "1px solid red";
            userPassword.value = "";
        }

    } else if (res.data.result == "success") {
        
        uName = userName.value;
        uPWord = userPassword.value;
        userPassword.value = "";
        userName.value = "";
        
        uID = res.data.userId;
        homepageGo();
    }

}

userName.onclick = function () {    //被点击框框红色消失
    userName.style.borderBottom = "none";
}

userPassword.onclick = function () {    //被点击框框红色消失
    userPassword.style.borderBottom = "none";
}

/*----退出登录----*/

document.getElementById("goto_land").addEventListener("click", toLogout);  //监听


function landGo() {     //转页面
    /*console.log('tuichuchenggong')*/
    alert("退出成功！");
    land.style.display = "block";
    homepage.style.display = "none";
    header.style.display = "none";
    personal_Homepage.style.display = "none";

    clearInterval(timer);

    //history.go(0);      //刷新页面，以删除其他样式
}

function toLogout() {    //向服务器请求 退出登录

    this.parentNode.parentNode.style.display = "none";
    axios
    .post("http://47.97.204.234:3000/user/logout", {
        username: uName ,
        password: uPWord
    })
    .then( landGo() )
    .catch(err => console.error(err));
}


var seeContent = new Array();   //以存储文本
/*获取文章等等*/
function article_title(res) {
    document.querySelector('.primaryCoverage').innerHTML = "";
    /*console.log( res );
    console.log(typeof(res.data.articles[1].content))*/
    for (i in res.data.articles ) {
        
        seeContent[i] = res.data.articles[i].content;
        /*console.log(seeContent[i]);*/
        document.querySelector('.primaryCoverage').innerHTML += `
            <div class="article">
                <div class="article_item">
                    <a href="javascript:;">
                        <h3>${res.data.articles[i].title}</h3>
                    </a>

                    <div class="announcer">
                        <span ><img class="avatar" src="${res.data.articles[i].avatar}"></span>
                        <span style="font-weight:600;">${res.data.articles[i].nickname}</span>
                        <span class="release_time">${res.data.articles[i].issueTime}</span>
                    </div>

                    <div class="rich_Content" index="${i}" >
                        <div class="rich_inner" >
                            <span class="readContent"  index="${i}" >${res.data.articles[i].content }</span>
                            <button type="button" class="readAll" index="${i}">阅读全文▼ </button>
                        </div>
                    </div>
                                
                    <div class="content_actions"  >
                        <span class="actions_first">
                           <button type="button" index="${i}" ${likedStatus(res.data.articles[i].liked)}>▲ 赞同 ${res.data.articles[i].likeNum}</button>
                           <button type="button" index="${i}" ${dislikedStatus(res.data.articles[i].disliked)}>▼</button>
                        </span>
                                    
                        <div class="actions_two">
                            <button type="button" class="comment_show" index="${i}">
                                <span class="idco">&#xe613</span>
                                ${res.data.articles[i].commentNum} 条评论
                           </button>

                           <button type="button" class="comment_retract" index="${i}">
                                <span class="idco">&#xe613</span>
                                收起评论
                           </button>
    
                            <button type="button">
                                <span class="idco">&#xe6e8</span>
                                分享
                            </button>

                            <button type="button">
                                <span class="idco">&#xe612</span>
                                收藏
                            </button>

                            <button type="button">
                                <span class="idco">&#xe657</span>
                                喜欢
                            </button>

                            <button type="button">
                                <span class="idco">&#xe651</span>
                            </button>

                            <button type="button" class="retract" index="${i}">
                                收起
                                <span class="idco">&#xe61d</span>
                            </button>

                            
                        </div>
                    </div>
                        
                        
                    <div class="comment" index="${i}" >
                        <div class="comment_box">
                            <div class="comment_text">
                                <div class="commentNum" ><h2>现有${res.data.articles[i].commentNum}条评论</h2></div>
                            </div>
                    
                            <div class="comment_content" index="${i}">
                                
                            </div>
                    
                            <div class="comment_input">
                                <div class="comment_input_box">
                                    <div class="input_box">
                                        <textarea placeholder="写下你的评论.."></textarea>
                                        <span class="idco" style="font-size: 25px;" >&#xe78d</span>
                                    </div>
                                    
                                    <button type="button" class="goComment" index="${i}" >发布</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        `;
        
        
        /*阅读全文*/
        var readAll = document.querySelectorAll('.readAll');            //阅读全文
        var actions_first = document.querySelectorAll('.actions_first');      //点赞
        var content_actions = document.querySelectorAll('.content_actions');    //试着使按钮浮动
        var comment_show = document.querySelectorAll('.comment_show');      //评论按钮
        var comment_retract = document.querySelectorAll('.comment_retract');      //收起评论按钮

        var comment = document.querySelectorAll('.comment');            //评论框框
        var retract = document.querySelectorAll('.retract');        //收起全文
        var readContent = document.querySelectorAll('.readContent') //全文
        var comment_content = document.querySelectorAll('.comment_content') //评论内容
        var goComment = document.querySelectorAll('.goComment')  //评论
    
        for (var x = 0; x < readAll.length; x++) {  

            /*展开全文*/
            readAll[x].onclick = function(){
                for (var i = 0 ; i < readAll.length; i++){
                    readAll[i].style.display = 'block';
                    readAll[i].parentNode.style.height = "85px";
                    readAll[i].previousElementSibling.innerText = seeContent[i];
                }
    
                var c = this.getAttribute("index");
                /*console.log(this.getAttribute("index"));*/
                this.previousElementSibling.innerText = "";

                for(var a = 0 ; a < seeContent[c].length ; a++){
                    this.previousElementSibling.innerHTML += `
                    <p>${seeContent[c][a]}</p>
                    <br>
                    `
                }
                this.style.display = 'none';
                this.parentNode.style.height = "auto";

                retract[c].style.display = 'inline-block';
                
            }

            /*收起全文*/
            retract[x].onclick = function(){ 
                var c = this.getAttribute("index");
                readAll[c].style.display = 'block';
                this.style.display = 'none';
                readContent[c].innerText = res.data.articles[i].content ;
            }

            /*点赞*/
            actions_first[x].children[0].onclick = function(){
                
                var c = this.getAttribute("index");
                var articlesid = res.data.articles[c].articleId;

                /*console.log(c,articlesid,);*/

                this.innerText = "";
                
                if ( res.data.articles[c].liked == true) {
                    axios
                    .post("http://47.97.204.234:3000/article/likeArticle", {
                        userId: uID,
                        articleId: articlesid,
                        like: false 
                    })
                    .then(function (response) {
                        res.data.articles[c].liked = false;
                        /*alert(response.data.result + response.data.message);*/
                    })
                    .catch(err => console.error(err));
                    
                    this.style.backgroundColor = "rgb(229,242,255)";
                    this.style.color = "#0084ff";
                    this.innerText = "▲ 赞同 " + --res.data.articles[c].likeNum;

                    /*console.log(res.data.articles[c].likeNum);*/

                } else if ( res.data.articles[c].liked == false) {
                    axios
                    .post("http://47.97.204.234:3000/article/likeArticle", {
                        userId: uID,
                        articleId: articlesid,
                        like: true 
                    })
                    .then(function (response) {
                        res.data.articles[c].liked = true;
                        /*alert(response.data.result + response.data.message);*/
                    })
                    .catch(err => console.error(err));

                    this.style.backgroundColor = "#0084ff";
                    this.style.color = "#fff";
                    this.innerText = "▲ 已赞同 " + ++res.data.articles[c].likeNum;
                    /*console.log(res.data.articles[c].likeNum);*/

                    if ( res.data.articles[c].disliked == true) {

                        axios
                        .post("http://47.97.204.234:3000/article/dislikeArticle", {
                            userId: uID,
                            articleId: articlesid,
                            dislike: false 
                        })
                        .then(function (response) {
                            res.data.articles[c].disliked = false;
                            /*alert(response.data.result + response.data.message);*/
                        })
                        .catch(err => console.error(err));
    
                        
                        this.nextElementSibling.style.backgroundColor = "rgb(229,242,255)";
                        this.nextElementSibling.style.color = "#0084ff";

                    }

                }   
                
                
            }

            
            /*点踩*/
            actions_first[x].children[1].onclick = function(){

                var c = this.getAttribute("index");
                var articlesid = res.data.articles[c].articleId;

                /*console.log(c,articlesid,);*/
                
                if ( res.data.articles[c].disliked == true) {

                    axios
                    .post("http://47.97.204.234:3000/article/dislikeArticle", {
                        userId: uID,
                        articleId: articlesid,
                        dislike: false 
                    })
                    .then(function (response) {
                        res.data.articles[c].disliked = false;
                        /*alert(response.data.result + response.data.message);*/
                    })
                    .catch(err => console.error(err));

                    
                    this.style.backgroundColor = "rgb(229,242,255)";
                    this.style.color = "#0084ff";

                    


                } else if ( res.data.articles[c].disliked == false) {
                    axios
                    .post("http://47.97.204.234:3000/article/dislikeArticle", {
                        userId: uID,
                        articleId: articlesid,
                        dislike: true 
                    })
                    .then(function (response) {
                        res.data.articles[c].disliked = true;
                        /*alert(response.data.result + response.data.message);*/
                    })
                    .catch(err => console.error(err));

                    this.style.backgroundColor = "#0084ff";
                    this.style.color = "#fff";

                    if ( res.data.articles[c].liked == true) {
                        axios
                        .post("http://47.97.204.234:3000/article/likeArticle", {
                            userId: uID,
                            articleId: articlesid,
                            like: false 
                        })
                        .then(function (response) {
                            res.data.articles[c].liked = false;
                            /*alert(response.data.result + response.data.message);*/
                        })
                        .catch(err => console.error(err));
                        
                        this.previousElementSibling.style.backgroundColor = "rgb(229,242,255)";
                        this.previousElementSibling.style.color = "#0084ff";
                        this.previousElementSibling.innerText = "▲ 赞同 " + --res.data.articles[c].likeNum;
    
                        /*console.log(res.data.articles[c].likeNum);*/
                    }

                }

                

            }


            /*显示评论*/
            comment_show[x].onclick = function(){
                var bbbb = 0;
                var c = this.getAttribute("index");
                var id = res.data.articles[c].articleId;
                var num = res.data.articles[c].commentNum;

                for (var ii = 0; ii < comment.length; ii++) {   //评论区域关闭且删除
                    comment[ii].style.display = "none" ;
                    comment_content[ii].innerHTML = "";
                    comment_retract[ii].style.display = "none";
                    comment_show[ii].style.display = "inline-block";
                }

                comment[c].style.display = "block" ;    //显示评论区
                this.nextElementSibling.style.display = "inline-block";      //隐藏按钮且显示收起按钮
                this.style.display = "none";

                /*console.log(c,id,num,uID);  */    //如果零评论则不发出请求
                if (num == 0) {
                    return "" ;
                } else {
                    
                    axios
                    .get("http://47.97.204.234:3000/article/getComments?userId="+ uID +"&articleId="+ id , {
                
                    })
                    .then(function (response) {

                        /*alert(response.data.result + response.data.message);*/
                        /*console.log(response.data.comments.length);*/
                        for(var a = 0; a < response.data.comments.length ; a++) {
                            
                            /*console.log(response.data.comments[a].nickname);*/
                            comment_content[c].innerHTML += `
                            <ul class="comment_item" index="${a}">
                                            
                                <li class=" first_commentator">
                                    <div class="commentator">
                                        <span ><img class="avatar" src="${response.data.comments[a].avatar}"></span>
                                        <span style="font-weight:600;" >${response.data.comments[a].nickname}</span>
                                        <span class="release_time">${response.data.comments[a].time}</span>
                                    </div>
                            
                                    <div class="commentator_content">
                                        <div class="commentator_top">
                                        </div>
                            
                                        <div class="commentator_bottom" index="${a}">
                                            <button type="button" class="toLike"  index="${a}" ${Statusliked(response.data.comments[a].liked)} >
                                                <span class="idco">&#xe700</span>
                                                赞 ${response.data.comments[a].likeNum}
                                            </button>
                            
                                            <div class="commentator_function" index="${a}">
                                                <button type="button" class="reply_Comment" >
                                                    <span class="idco">&#xe647</span>
                                                    回复
                                                </button>

                                                <button type="button" class="reply_Comment_Close" >
                                                    <span class="idco">&#xe647</span>
                                                    收起回复
                                                </button>


                                                <button type="button"  class="toDislike" ${Statusdisliked(response.data.comments[a].disliked)}>
                                                    <span class="idco" style="font-size: 15px;" >&#xe694</span>
                                                    踩
                                                </button>
                                                <button type="button" >
                                                    <span class="idco" style="font-size: 15px;" >&#xe607</span>
                                                    举报
                                                </button>
                                                
                                                <button type="button" class="delete_Comment" index="${a}" style="display:${addButton(response.data.comments[a].userId)}">
                                                    <span class="idco">&#xe628</span>
                                                    删除
                                                </button>

                                            </div>
                                            
                                        </div>
                                    </div>
                                    
                                </li>

                                <div class="reply_input" index="${a}">
                                    <div class="reply_input_box">
                                        <div class="input_replybox" index="${a}" >
                                            <textarea placeholder="回复${response.data.comments[a].nickname}.."></textarea>
                                            <span class="idco" style="font-size: 25px;" >&#xe78d</span>
                                        </div>
                                
                                        <button type="button" class="reply" index="${a}" >回复</button>
                                    </div>
                                </div>

                                


                            </ul>
                            `;

                            /*干掉攻击*/
                            var commentator_top = document.querySelectorAll('.commentator_top');
                            commentator_top[a].innerText = response.data.comments[a].content;

                            /*显示回复*/
                            add_Replies(response.data.comments[a].replied, a);
                            function add_Replies(replied, a ){
                                var aaa = a ;

                                if(replied == true){

                                    /*console.log (aaa);*/
                                    axios
                                    .get("http://47.97.204.234:3000/article/getReplies?userId=" + uID + "&commentId=" + response.data.comments[a].commentId , {
                                    })
                                    .then(function (resp) {

                                        /*console.log(resp.data.replies.length);*/

                                        for (var aa = 0 ; aa < resp.data.replies.length ; aa++){
                                            comment_item[aaa].innerHTML += `
                                            <li class="commentator_item " index="${aaa}">
                                                <div class="division"></div>
                                                <div class="commentator">
                                                    <span ><img class="avatar" src="${resp.data.replies[aa].avatar}"></span>
                                                    <span style="font-weight:600;" >${resp.data.replies[aa].nickname}</span>
                                                    <span class="release_time">${resp.data.replies[aa].time}</span>
                                                </div>
                            
                                                <div class="commentator_content">
                                                    <div class="commentator_toptop" index="${bbbb}">
                                                        "${resp.data.replies[aa].content}"
                                                    </div>
                            
                                                    <div class="commentator_bottom" index="${aa}">
                                                        <button type="button" class="toLike_reply" index="${aa}" ${Statusliked(resp.data.replies[aa].liked)} >
                                                            <span class="idco">&#xe700</span>
                                                            赞 ${resp.data.replies[aa].likeNum}
                                                        </button>
                            
                                                        <div class="commentator_function" index="${aa}">

                                                            <button type="button"  class="toDislike_reply" ${Statusdisliked(resp.data.replies[aa].disliked)}>
                                                                <span class="idco" style="font-size: 15px;" >&#xe694</span>
                                                                踩
                                                            </button>

                                                            <button type="button" >
                                                                <span class="idco" style="font-size: 15px;" >&#xe607</span>
                                                                举报
                                                            </button>

                                                            <button type="button" class="delete_replie" index="${bbbb}" style="display:${addButton(resp.data.replies[aa].userId)}">
                                                                <span class="idco">&#xe628</span>
                                                                删除
                                                            </button>

                                                        </div>

                                                    </div>
                                                </div>
                                            </li>
                                            `;

                                            
                                            /*干掉攻击*/
                                            /*var commentator_toptop = document.querySelectorAll('.commentator_toptop');
                                            commentator_toptop[bbbb].innerText = resp.data.replies[aa].content;*/
                                            bbbb++;

                                            var toLike_reply = document.querySelectorAll('.toLike_reply');
                                            var toDislike_reply = document.querySelectorAll('.toDislike_reply');
                                            var delete_replie = document.querySelectorAll('.delete_replie');

                                            for (var xxx = 0; xxx < toLike_reply.length ; xxx++) {
                                
                                                /*点赞*/                                            
                                                toLike_reply[xxx].onclick = function(){  
                                                    var cc = this.parentNode.getAttribute("index");
                                                    /*console.log(cc,resp.data.replies[cc].replyId,xxx);*/
                                                    
                                                    
                                                    if ( resp.data.replies[cc].liked == true) {
                                                        axios
                                                        .post("http://47.97.204.234:3000/article/likeReply", {
                                                            userId: uID,
                                                            replyId: resp.data.replies[cc].replyId,
                                                            like: false 
                                                        })
                                                        .then(function (respo) {
                                                            
                                                            /*alert(respo.data.result + respo.data.message);*/
                                                            comment_show[c].onclick();
                                                        })
                                                        .catch(err => console.error(err));
                                                    } else if ( resp.data.replies[cc].liked == false) {
                                                        axios
                                                        .post("http://47.97.204.234:3000/article/likeReply", {
                                                            userId: uID,
                                                            replyId: resp.data.replies[cc].replyId,
                                                            like: true 
                                                        })
                                                        .then(function (respo) {
                                                            
                                                            /*alert(respo.data.result + respo.data.message);*/
                                                            comment_show[c].onclick();
                                                        })
                                                        .catch(err => console.error(err));
                                                    }

                                                }

                                                /*点踩*/
                                                toDislike_reply[xxx].onclick = function(){  
                                                    var cc = this.parentNode.getAttribute("index");
                                                    /*console.log(cc,resp.data.replies[cc].replyId,xxx);*/
                                                    
                                                    
                                                    if ( resp.data.replies[cc].disliked == true) {
                                                        axios
                                                        .post("http://47.97.204.234:3000/article/dislikeReply", {
                                                            userId: uID,
                                                            replyId: resp.data.replies[cc].replyId,
                                                            dislike: false 
                                                        })
                                                        .then(function (respo) {
                                                            /*alert(respo.data.result + respo.data.message);*/
                                                            comment_show[c].onclick();
                                                        })
                                                        .catch(err => console.error(err));
                                                    } else if ( resp.data.replies[cc].disliked == false) {
                                                        axios
                                                        .post("http://47.97.204.234:3000/article/dislikeReply", {
                                                            userId: uID,
                                                            replyId: resp.data.replies[cc].replyId,
                                                            dislike: true 
                                                        })
                                                        .then(function (respo) {
                                                            
                                                            /*alert(respo.data.result + respo.data.message);*/
                                                            comment_show[c].onclick();
                                                        })
                                                        .catch(err => console.error(err));
                                                    }

                                                }

                                                /*删除回复*/
                                                delete_replie[xxx].onclick = function(){
                                                    var ccc = this.parentNode.getAttribute('index');
                                                    var cc = this.getAttribute('index');
                                                   /* alert(resp.data.replies[ccc].nickname + uNickname + bbbb); */                   /*这里*/

                                                    axios
                                                    .delete("http://47.97.204.234:3000/article/deleteReply" , {
                                                        data:{
                                                            userId: uID,
                                                            replyId: resp.data.replies[ccc].replyId
                                                        }
                                                    })
                                                    .then(function (respo){
                                                        
                                                        alert(respo.data.result + respo.data.message);
                                                        comment_show[c].onclick();
                                                    })
                                                    .catch(err => console.error(err));

                                                }

                                                
                                            }

                                        }
                                        /*alert(resp.data.result + resp.data.message);*/
                                    })
                                    .catch(err => console.error(err));
                                    
                                } 
                                
                            }

                            var toLike = document.querySelectorAll('.toLike') //点赞
                            var toDislike = document.querySelectorAll('.toDislike') //点踩
                            var comment_item = document.querySelectorAll('.comment_item') //总框框
                            var reply_Comment = document.querySelectorAll('.reply_Comment') //回复评论
                            var reply_Comment_Close = document.querySelectorAll('.reply_Comment_Close') //收起回复评论
                            var delete_Comment = document.querySelectorAll('.delete_Comment') //删除评论
                            var reply_input = document.querySelectorAll('.reply_input') //收起回复评论

                            var reply = document.querySelectorAll('.reply') //回复评论
                            var input_replybox = document.querySelectorAll('.input_replybox') //回复内容
                            
                            function addButton(userId) {        //根据id来添加删除按钮
                                if (userId == uID) {
                                    /*console.log(123)*/
                                    
                                    return `
                                    inline-block;
                                    `;
                                } else {
                                    return `
                                    none;
                                    `;
                                }
                            }
                            
                            
                            for (var xx = 0; xx < toLike.length; xx++) {
                                /*console.log(xx);*/

                                /*点赞*/
                                toLike[xx].onclick = function(){
                                    
                                    var cc = this.parentNode.getAttribute("index");
                                    /*console.log('点赞序号：' + cc);*/
                                    /*console.log(cc,response.data.comments[cc].commentId,xx);*/
                                    /*this.innerText = "";*/

                                    if ( response.data.comments[cc].liked == true) {
                                        axios
                                        .post("http://47.97.204.234:3000/article/likeComment", {
                                            userId: uID,
                                            commentId: response.data.comments[cc].commentId,
                                            like: false 
                                        })
                                        .then(function (resp) {
                                            comment_show[c].onclick();
                                            /*alert(resp.data.result + resp.data.message);*/
                                        })
                                        .catch(err => console.error(err));
    
                                        /*console.log(response.data.comments[cc].likeNum);*/
    
                                    } else if ( response.data.comments[cc].liked == false ) {
                                        axios
                                        .post("http://47.97.204.234:3000/article/likeComment", {
                                            userId: uID,
                                            commentId: response.data.comments[cc].commentId,
                                            like: true 
                                        })
                                        .then(function (resp) {
                                            comment_show[c].onclick();
                                            /*alert(resp.data.result + resp.data.message);*/
                                        })
                                        .catch(err => console.error(err));
    
                                    }
                                }

                                /*点踩*/
                                toDislike[xx].onclick = function(){
                                    
                                    var cc = this.parentNode.getAttribute("index");

                                    /*console.log(cc,response.data.comments[cc].commentId,xx);*/

                                    if ( response.data.comments[cc].disliked == true) {
                                        axios
                                        .post("http://47.97.204.234:3000/article/dislikeComment", {
                                            userId: uID,
                                            commentId: response.data.comments[cc].commentId,
                                            dislike: false 
                                        })
                                        .then(function (resp) {
                                            comment_show[c].onclick();
                                            /*alert(resp.data.result + resp.data.message);*/
                                        })
                                        .catch(err => console.error(err));
    
                                        /*this.style.color = "rgb(133,144,166)";*/
    
                                    } else if ( response.data.comments[cc].disliked == false ) {
                                        axios
                                        .post("http://47.97.204.234:3000/article/dislikeComment", {
                                            userId: uID,
                                            commentId: response.data.comments[cc].commentId,
                                            dislike: true 
                                        })
                                        .then(function (resp) {
                                            comment_show[c].onclick();
                                            /*alert(resp.data.result + resp.data.message);*/
                                        })
                                        .catch(err => console.error(err));
    
                                    }
                                }

                                /*删除*/
                                delete_Comment[xx].onclick = function(){
                                    var cc = this.getAttribute("index");

                                    /*console.log(uID,response.data.comments[cc].commentId);*/
                                    
                                    axios
                                    .delete("http://47.97.204.234:3000/article/deleteComment", {
                                        data:{
                                            userId: uID ,
                                            commentId: response.data.comments[cc].commentId
                                        }
                                    })
                                    .then(function (resp) {
                                        comment_show[c].onclick();
                                        alert(resp.data.result + resp.data.message);
                                    })
                                    .catch(err => console.error(err));
                                    
    
                                }

                                /*回复框框*/
                                reply_Comment[xx].onclick = function(){

                                    for (var iii = 0; iii < reply_Comment.length; iii++) {   //评论区域关闭且删除
                                        reply_input[iii].style.display = "none" ;
                                        
                                        reply_Comment_Close[iii].style.display = "none";
                                        reply_Comment[iii].style.display = "inline-block";
                                    }

                                    var cc = this.parentNode.getAttribute("index");
                                    reply_input[cc].style.display = "block";
                                    this.nextElementSibling.style.display = "inline-block";      //隐藏按钮且显示收起按钮
                                    this.style.display = "none";
                                }

                                /*收起回复按钮*/
                                reply_Comment_Close[xx].onclick = function(){

                                    var cc = this.parentNode.getAttribute("index");
                                    reply_input[cc].style.display = "none";
                                    this.previousElementSibling.style.display = "inline-block";      //隐藏按钮且显示收起按钮
                                    this.style.display = "none";
                                }

                                /*回复*/
                                reply[xx].onclick = function(){
                                    var cc = this.getAttribute("index");

                                    var texts = this.previousElementSibling.children[0].value;

                                    if ( texts == "" ) {
                                        alert('宁没有输入内容');
                                    } else {
                                        axios
                                        .post("http://47.97.204.234:3000/article/reply",{
                                            userId: uID ,
	                                        commentId: response.data.comments[cc].commentId,
	                                        content: input_replybox[cc].children[0].value
                                        })
                                        .then(function(resp) {
                                            comment_show[c].onclick();
                                            /*alert(resp.data.result + resp.data.message +":"+ input_replybox[cc].children[0].value);*/
                                            input_replybox[cc].children[0].value = "";
                                        })
                                        .catch(err => console.error(err));
                                    }
                                }

    
                            }
                            
                        }
                    })
                    .catch(err => console.error(err));
                }
            
            }

            /*收起评论*/
            comment_retract[x].onclick = function(){
                var c = this.getAttribute("index");

                comment_content[c].innerHTML = "";      //清除内容

                comment[c].style.display = "none" ;    //关闭评论区

                this.previousElementSibling.style.display = "inline-block";      //隐藏按钮且显示评论按钮
                this.style.display = "none";
            }

            /*发布评论*/
            goComment[x].onclick = function(){
                var c = this.getAttribute("index");
                var text = this.previousElementSibling.children[0].value;
                this.previousElementSibling.children[0].value = "";
                /*console.log(text);*/
                
                if (text == "") {
                    alert('宁没有输入内容');
                } else {
                    axios
                    .post("http://47.97.204.234:3000/article/comment", {
                
                      userId: uID,
                      articleId: res.data.articles[c].articleId ,
                      content: text
                    })
                    .then(function (response) {
                        /*alert(response.data.result + response.data.message+ response.data.commentId);*/
                        comment_show[c].onclick();
                    })
                    .catch(err => console.error(err));
                }
                

                
            }
        }


        /*顶与踩*/
        function likedStatus (liked){
            if (liked == true){
                /*console.log (liked);*/
                return 'style = "background-color:#0084ff; color:#fff;" ';
            } else {
                return "";
            }

            
        }

        function dislikedStatus (disliked){

            if (disliked == true){
                /*console.log (disliked);*/
                return 'style = "background-color:#0084ff; color:#fff;" ';
            } else {
                return "";
            }
        }

        function Statusliked (liked){
            if (liked == true){
                /*console.log (liked);*/
                return 'style = "color:#0084ff;"';
            } else {
                return "";
            }

            
        }

        function Statusdisliked (disliked){

            if (disliked == true){
                /*console.log (disliked);*/
                return 'style = "color:#0084ff;"';
            } else {
                return "";
            }
        }
        
    }

}

/*个人资料返回主页*/

document.querySelector(".goback_homepage").addEventListener("click", homepageGo);  //监听
document.getElementById("goto_personal_Homepage").addEventListener("click", toPersonalHomepage);  //监听

/*去个人主页*/
function toPersonalHomepage() {
    land.style.display = "none";
    homepage.style.display = "none";
    personal_Homepage.style.display = "block";
    document.querySelector('.showblueOne').style.display = "none";
    getInfo();
    timer = setInterval(function() {
        getfriends();
    } ,5000);
}


/*显示输入框*/

var input_content = document.querySelectorAll('.input_content');
var group_two = document.querySelectorAll('.group_two');

for(var i = 0 ; i < input_content.length ; i++) {
    
    input_content[i].onclick = function() {
        this.parentNode.style.display = "none";
        this.parentNode.nextElementSibling.style.display = "block"
    }

    group_two[i].onclick = function() {
        this.parentNode.parentNode.style.display = "none";
        this.parentNode.parentNode.previousElementSibling.style.display = "block"
    }
}

/*获取个人信息*/
function getInfo() {
    axios
    .get("http://47.97.204.234:3000/user/getInfo?userId=" + uID ,{

    })
    .then(res => addPersonal(res))
    .catch(err => console.error(err));
}

/*添加个人信息*/
/*var userAvatarImg = document.querySelector('.userAvatarImg');*/

function addPersonal(res) {
    uNickname = res.data.info.nickname;
    uAvatar = res.data.info.avatar;
    document.querySelector('.people_Avatar').innerHTML = `<img src="${uAvatar}" ></img>`;

    /*console.log(uAvatar);*/

    document.querySelector('.userAvatarImg').src = uAvatar;

    document.querySelector('.userNameTitle').innerText = uNickname;

    var field_text = document.querySelectorAll('.field_text');

    field_text[0].innerText = res.data.info.gender;
    field_text[1].innerText = res.data.info.introduction;
    field_text[2].innerText = res.data.info.trade;
    field_text[3].innerText = res.data.info.resume;

    /*修改*/
    var group_one = document.querySelectorAll('.group_one');

    /*修改名字*/
    group_one[0].onclick = function() {
        var textname =  this.parentNode.previousElementSibling.value;

        if (textname == "") {
            alert('宁没有输入内容');
        } else {
            axios
            .post("http://47.97.204.234:3000/user/alterInfo",{
                userId : uID,
                direction : 0 ,
                content : textname
            })
            .then(function(resp){
                alert(resp.data.result + resp.data.message);
                toPersonalHomepage();
                group_two[0].onclick();
            })
            .catch(err => console.error(err));
        }
    }

    /*修改性别*/
    group_one[1].onclick = function() {
        var gender = document.getElementsByName("gender");
        var textgender = "";
        if (gender[0].checked == true) {
            textgender = gender[0].value;
        } else if (gender[1].checked == true) {
            textgender = gender[1].value;
        } 
        

        if (textgender == "") {
            alert('宁没有选择内容');
        } else {
            axios
            .post("http://47.97.204.234:3000/user/alterInfo",{
                userId : uID,
                direction : 1 ,
                content : textgender
            })
            .then(function(resp){
                alert(resp.data.result + resp.data.message);
                toPersonalHomepage();
                group_two[1].onclick();

            })
            .catch(err => console.error(err));
        }
    }

    /*修改一句话介绍*/
    group_one[2].onclick = function() {

        var textIntroduction =  this.parentNode.previousElementSibling.value;

        if (textIntroduction == "") {
            alert('宁没有输入内容');
        } else {
            axios
            .post("http://47.97.204.234:3000/user/alterInfo",{
                userId : uID,
                direction : 2 ,
                content : textIntroduction
            })
            .then(function(resp){
                alert(resp.data.result + resp.data.message);
                toPersonalHomepage();
                group_two[2].onclick();

            })
            .catch(err => console.error(err));
        }
    }

    /*修改职业*/
    group_one[3].onclick = function() {

        var optionIndex = this.parentNode.previousElementSibling.selectedIndex;
        var textindustry =  this.parentNode.previousElementSibling[optionIndex].value;

        if (textindustry == "") {
            alert('宁没有选择内容');
        } else {
            axios
            .post("http://47.97.204.234:3000/user/alterInfo",{
                userId : uID,
                direction : 3 ,
                content : textindustry
            })
            .then(function(resp){
                alert(resp.data.result + resp.data.message);
                toPersonalHomepage();
                group_two[3].onclick();

            })
            .catch(err => console.error(err));
        }
    }


    /*修改个人简介*/
    group_one[4].onclick = function() {

        var textIntroduction =  this.parentNode.previousElementSibling.value;

        if (textIntroduction == "") {
            alert('宁没有输入内容');
        } else {
            axios
            .post("http://47.97.204.234:3000/user/alterInfo",{
                userId : uID,
                direction : 4 ,
                content : textIntroduction
            })
            .then(function(resp){
                alert(resp.data.result + resp.data.message);
                toPersonalHomepage();
                group_two[4].onclick();

            })
            .catch(err => console.error(err));
        }
    }


    
}

/*上传头像*/

var btn = document.querySelector("#btn");
btn.onclick = function(){
    this.style.display = "none";
    this.previousElementSibling.innerHTML = "";
    var formdata=new FormData(document.getElementById("advForm"));
    /*console.log(formdata);*/
    /*console.log(formdata.get('Avatar'));*/
    axios({
      method:'post',
      url:'http://47.97.204.234:3000/user/alterAvatar',
      data:formdata,
      cache: false,         // 不缓存 
      contentType: false,  // 不设置内容类型  jQuery不要去设置Content-Type请求头
      processData: false,  // jQuery不要去处理发送的数据
      withCredentials:true,
    })
    .then(function(resp){
    /*console.log(resp);*/
    alert(resp.data.result + resp.data.message);
    toPersonalHomepage();
    })
    .catch(err => console.error(err));

}

var personal_avatarInput = document.querySelector('.personal_avatarInput');

personal_avatarInput.onchange = function() {
    console.log(1531);
    this.nextElementSibling.innerHTML = this.value;
    this.nextElementSibling.nextElementSibling.style.display = "block";
}

/*-----好友列表-----------*/

var show_friends = document.querySelector('.show_friends');     //获取好友按钮
var friends_list = document.querySelector('.friends_list');     //获取列表盒
var show_news = document.querySelector('.show_news');     //获取信息按钮
var news_list = document.querySelector('.news_list');     //获取列表盒

/*点击显示好友列表*/
show_friends.onclick = function () {
    if (bell_show.style.display == "none") {
        bell_show.style.display = "block";
        information_show.style.display = "none";
        people_show.style.display = "none";
        /*getfriends();*/
    } else {
        bell_show.style.display = "none";
    }
}

/*点击显示新信息*/
show_news.onclick = function () {
    if (information_show.style.display == "none") {
        information_show.style.display = "block";
        bell_show.style.display = "none";
        people_show.style.display = "none";
        /*getfriends();*/
    } else {
        information_show.style.display = "none";
    }
}

function friend_Message() {
    return axios.get("http://47.97.204.234:3000/user/friendList?userId=" + uID);
}
  
function friend_News() {
    return axios.get("http://47.97.204.234:3000/chat/getMessage?userId=" + uID);
}

/*请求获取好友信息*/
function getfriends()  { 

    axios.all([friend_Message(), friend_News()])
    .then(axios.spread(function (res_M, res_N) {

        friends_list.innerHTML = "";
        for (var i = 0 ; i < res_M.data.friends.length ; i++) {
            friends_list.innerHTML +=`
            <div class="friends_item" onclick="tochat(
                '${res_M.data.friends[i].userId}' ,
                '${res_M.data.friends[i].nickname}' ,
                '${res_M.data.friends[i].avatar}' ,
                '${null}' ,
                '${null}'
                )">

                <div class="friends_Avatar">
                    <img src="${res_M.data.friends[i].avatar}">
                </div>

                <div class="friends_news">
                    <span class="friends_name">${res_M.data.friends[i].nickname}</span>
                    <span class="friends_introduction" index="${i}">个人介绍：${addIntroduction(res_M.data.friends[i].introduction)}</span>
                </div>
            </div>
            `

            /**/

        }

        if (res_N.data.message == "获取成功") {

            document.querySelector('.dot').style.display = "block";
            document.querySelector('.tohide').style.display = "none";

            for (var ii = 0 ; ii < res_N.data.newMessages.length ; ii++) {
                for (var iii = 0 ; iii < res_M.data.friends.length ; iii++) {

                    if (res_N.data.newMessages[ii].senderId == res_M.data.friends[iii].userId) {
                        console.log(res_N.data.newMessages);
                        news_list.innerHTML += `
                        <div class="friends_item friends_newsitem" onclick="tochat(
                            '${res_M.data.friends[iii].userId}',
                            '${res_M.data.friends[iii].nickname}',
                            '${res_M.data.friends[iii].avatar}',
                            '${res_N.data.newMessages[ii].content}',
                            '${res_N.data.newMessages[ii].time}'
                            )" index="${res_M.data.friends[iii].userId}" >

                            <div class="friends_Avatar">
                                <img src="${res_M.data.friends[iii].avatar}">
                            </div>

                            <div class="friends_news">
                                <span class="friends_name">${res_M.data.friends[iii].nickname}</span>
                                <span class="friends_introduction friends_newsintroduction" index="${ii}" >${res_N.data.newMessages[ii].content}</span>
                            </div>
                        </div>
                    `
                    }
                }
            }
        } 

        if (news_list.children.length == 1 ) {
            document.querySelector('.dot').style.display = "none";
            document.querySelector('.tohide').style.display = "block";
        }

    }))
    .catch(err => console.error(err));
}

/*增加介绍*/
function addIntroduction(inctro) {
    if (inctro == "") {
        return "此人很懒，无介绍";
    } else {
        return inctro;
    }
}


/*主页导航条的消失与隐藏*/
var bell_show = document.querySelector(".bell_show");
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

people_show.onclick = function() {
    people_show.style.display = "none";
}

var homepage_main = document.querySelector(".homepage_main");

function disappear() {
    bell_show.style.display = "none";
    people_show.style.display = "none";
    information_show.style.display = "none";
}

homepage_main.onclick = function() {
    disappear();
}


/*------------显示聊天窗口----------------*/
var chat_box = document.querySelector(".chat_box");
var chat_background = document.querySelector(".chat_background");
var chat_content = document.querySelector(".chat_content");
var bodyyy = document.querySelector('.bodyyy');

function tochat(friendsId,friendsName,friendAvatar,friends_content,time) {

    disappear();    //框框都消失
    bodyyy.style.overflow = "hidden";   //隐藏主滑动栏
    clearInterval(timer);   //停止慢请求

    chat_box.style.display = "flex" ;   //显示聊天框

    chat_background.onclick = function() {  //点击背景返回页面

        chat_box.style.display = "none" ;
        chat_content.innerHTML = "";    //清空聊天框内容
        bodyyy.style.overflow = "auto" ;

        timer = setInterval(function() {    //继续慢请求
            getfriends();
        } ,5000);

        clearInterval(hight_timer);     //停止快请求
    }


    var chat_name = document.querySelector(".chat_name");   //更改聊天好友名字
    chat_name.innerText = friendsName;
    
    if(friends_content != "null") {     //如果有聊天内容则显示内容（对于新发起的聊天框没用）

        chat_content.innerHTML = `
            <div class="chat_item">
                <span class="chat_item_time">${time}</span>
                    <div class="chat_item_box">
                        <div class="chat_Avatar">
                            <img src="${friendAvatar}">
                    </div>
    
                    <div class="char_item_contentbox">
                        <div class="chat_item_angle"></div>
                        <div class="chat_item_content">
                            <p>${friends_content}</p>
                        </div>
                    </div>
                </div>
    
            </div>
        `;

        var friends_newsitem = document.querySelectorAll(".friends_newsitem");
        var friends_newsintroduction = document.querySelectorAll(".friends_newsintroduction");

        for (var i = 0 ; i < friends_newsitem.length ; i++){
            var friendIndex =  friends_newsitem[i].getAttribute('index');
            if(friendIndex == friendsId) {

                if (friends_newsintroduction[i].innerText != friends_content) {
                    chat_content.innerHTML += `
                    <div class="chat_item">
                        <div class="chat_item_box">
                            <div class="chat_Avatar">
                                <img src="${friendAvatar}">
                            </div>
    
                            <div class="char_item_contentbox">
                                <div class="chat_item_angle"></div>
                                <div class="chat_item_content">
                                    <p>${friends_newsitem[i].children[1].children[1].innerText}</p>
                                </div>
                            </div>
                        </div>
    
                    </div>
                    `;

                }
                
                /*点击删除*/
                news_list.removeChild(friends_newsitem[i]);
                
            }
        }

        

    }

    /*高频获取信息*/
    hight_timer = setInterval(function getFriendsMessage() {

        axios
        .get("http://47.97.204.234:3000/chat/getMessage?userId=" + uID, {
        })
        .then( function(resp_FM) {
            if (resp_FM.data.message == "获取成功") {

                for (var i = 0 ; i < resp_FM.data.newMessages.length ; i++) {

                    if(resp_FM.data.newMessages[i].senderId == friendsId) {     //获取当前好友发来的信息
                        var myDate = new Date();

                        chat_content.innerHTML += `
                        <div class="chat_item">

                            <span class="chat_item_time">${myDate.toLocaleString()}</span>

                            <div class="chat_item_box">
                                <div class="chat_Avatar">
                                    <img src="${friendAvatar}">
                                </div>

                                <div class="char_item_contentbox">
                                    <div class="chat_item_angle"></div>
                                    <div class="chat_item_content">
                                        <p>${resp_FM.data.newMessages[i].content}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `;

                        chat_content.scrollTop = chat_content.scrollHeight;
                    }
                }
                
            }

        })
        .catch(err => console.error(err));

    } ,1000);

    /*发送信息*/
    var chat_input = document.querySelector('.chat_input');
    var chat_input_send = document.querySelector('.chat_input_send');

    chat_input_send.onclick = function() {
        var send_text = chat_input.value;
        if(send_text == "") {
            alert('宁没有输入内容');
        } else {
            axios
            .post("http://47.97.204.234:3000/chat/sendMessage", {
                userId: uID,
                friendId: friendsId,
                content: send_text
            })
            .then(function(resp) {
                var myDate = new Date();

                chat_content.innerHTML += `
                <div class="chat_userItem">

                    <span class="chat_userItem_time">${myDate.toLocaleString()}</span>
                    
                    <div class="chat_userItem_box">
                        <div class="chat_userAvatar">
                            <img src="${uAvatar}">
                        </div>

                        <div class="chat_userItem_contentbox">
                            <div class="chat_userItem_angle"></div>
                            <div class="chat_userItem_content">
                                <p>${send_text}</p>
                            </div>
                        </div>
                    </div>
                </div>
                `

                chat_input.value = "";

                chat_content.scrollTop = chat_content.scrollHeight;
            })
            .catch(err => console.error(err));
        }
    }
}