
/*-----获取文章-----*/

var $ = document.querySelector;

function getArticle() {
    axios
    .get("http://47.97.204.234:3000/article/getArticles?userId=" + /*"5e96e6d56dc8847e998b860f"*/uID + "&start=0&stop=18",{

    })
    .then(res => article_title(res))
    .catch(err => console.error(err));
}


/*----登录请求----*/


var userName = document.getElementById('userName');     //获取用户名
var userPassword = document.getElementById('userPassword');     //获取密码
var land = document.querySelector(".land");     //登录页面
var homepage = document.querySelector(".homepage");     //主页
var uName , uPWord , uID;

/*登录跳转*/
document.getElementById("goto_homepage").addEventListener("click", toLogin);  //监听

function homepageGo() {     //转页面
    land.style.display = "none";
    homepage.style.display = "block";
    getArticle();
}

function toLogin() {    //登录，向服务器请求
    axios
    .post("http://47.97.204.234:3000/user/login", {
        username: userName.value ,
        password: userPassword.value
    })

    .then(res => loginRequest_status(res))
    .catch(err => console.error(err));
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
    alert("退出成功！");
    land.style.display = "block";
    homepage.style.display = "none";
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


/*
http://47.97.204.234:3000/article/getArticles   获取文章

userId=当前登录用户的id&start=从第几篇开始，最小为0，最大为18&stop=到第几篇结束，最小为0，最大为18

{
	"result": "请求结果，成功为success，失败为failed",
	"message": "请求结果说明",
	"articles": [
		{
			"articleId": "文章id",
			"userId": "发布该文章的用户的id",
			"avatar": "发布该文章的用户的头像",
			"nickname": "发布该文章的用户的昵称",
			"introduction": "发布该文章的用户的一句话介绍",
			"title": "文章标题",
			"content": "文章内容",
			"likeNum": "该文章的点赞数",
			"liked": "当前登录用户是否已经点赞",
			"disliked": "当前登录用户是否已经点踩",
			"commentNum": "该文章的评论数",
			"issueTime": "文章发布时间"
		}
	]
}

*/

var seeContent = new Array();   //以存储文本

function article_title(res) {
    console.log( res );
    console.log(typeof(res.data.articles[1].content))
    for (i in res.data.articles ) {
        
        seeContent[i] = res.data.articles[i].content;
        console.log(seeContent[i]);
        document.querySelector('.primaryCoverage').innerHTML += `
            <div class="article">
                <div class="article_item">
                    <a href="javascript:;">
                        <h3>${res.data.articles[i].title}</h3>
                    </a>

                    <div class="rich_Content">
                        <div class="rich_inner">
                            <span class="readContent" >${res.data.articles[i].content }</span>
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

                            
                        </div>
                    </div>
                        
                        
                    <div class="comment" index="${i}" >
                        <div class="comment_box">
                            <div class="comment_text">
                                <div class="commentNum" ><h2>现有${res.data.articles[i].commentNum}条评论</h2></div>
                            </div>
                    
                            <div class="comment_content">
                                
                            </div>
                    
                            <div class="comment_input">
                                <div class="comment_input_box">
                                    <div class="input_box">
                                        <textarea placeholder="写下你的评论.."></textarea>
                                        <span class="idco">0</span>
                                    </div>
                                    
                                    <button type="button" id="goComment">发布</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        `;
        
        
        /*阅读全文*/
        var readAll = document.querySelectorAll('.readAll');
        var actions_first = document.querySelectorAll('.actions_first');
        var content_actions = document.querySelectorAll('.content_actions');
        var comment_show = document.querySelectorAll('.comment_show');
        var comment = document.querySelectorAll('.comment');
    
        for (var x = 0; x < readAll.length; x++) {  

            /*展开全文*/
            readAll[x].onclick = function(){
                for (var i = 0 ; i < readAll.length; i++){
                    readAll[i].style.display = 'block';
                    readAll[i].parentNode.style.height = "85px";
                    readAll[i].previousElementSibling.innerText = seeContent[i];
                }
    
                var c = this.getAttribute("index");
                console.log(this.getAttribute("index"));
                this.previousElementSibling.innerText = "";

                for(var a = 0 ; a < seeContent[c].length ; a++){
                    this.previousElementSibling.innerHTML += `
                    <p>${seeContent[c][a]}</p>
                    <br>
                    `
                }
                this.style.display = 'none';
                this.parentNode.style.height = "auto";

                console.log(content_actions[c].previousElementSibling.height , window.screen.availHeight);
                if (content_actions[c].previousElementSibling.height < window.screen.availHeight) {
                    content_actions[c].style.position = "fixed";
                    content_actions[c].style.bottom = "0";
                }
                /*var a = document.this.parentNode.parentNode.scrollTop;
                console.log(a);
                window.scrollTo(0,a);*/
                
            }

            /*点赞*/
            actions_first[x].children[0].onclick = function(){
                
                var c = this.getAttribute("index");
                var articlesid = res.data.articles[c].articleId;

                console.log(c,articlesid,);

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
                        alert(response.data.result + response.data.message);
                    })
                    .catch(err => console.error(err));
                    
                    this.style.backgroundColor = "rgb(229,242,255)";
                    this.style.color = "#0084ff";
                    this.innerText = "▲ 赞同 " + --res.data.articles[c].likeNum;

                    console.log(res.data.articles[c].likeNum);

                } else if ( res.data.articles[c].liked == false) {
                    axios
                    .post("http://47.97.204.234:3000/article/likeArticle", {
                        userId: uID,
                        articleId: articlesid,
                        like: true 
                    })
                    .then(function (response) {
                        res.data.articles[c].liked = true;
                        alert(response.data.result + response.data.message);
                    })
                    .catch(err => console.error(err));

                    this.style.backgroundColor = "#0084ff";
                    this.style.color = "#fff";
                    this.innerText = "▲ 已赞同 " + ++res.data.articles[c].likeNum;
                    console.log(res.data.articles[c].likeNum);

                    if ( res.data.articles[c].disliked == true) {

                        axios
                        .post("http://47.97.204.234:3000/article/dislikeArticle", {
                            userId: uID,
                            articleId: articlesid,
                            dislike: false 
                        })
                        .then(function (response) {
                            res.data.articles[c].disliked = false;
                            alert(response.data.result + response.data.message);
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

                console.log(c,articlesid,);
                
                if ( res.data.articles[c].disliked == true) {

                    axios
                    .post("http://47.97.204.234:3000/article/dislikeArticle", {
                        userId: uID,
                        articleId: articlesid,
                        dislike: false 
                    })
                    .then(function (response) {
                        res.data.articles[c].disliked = false;
                        alert(response.data.result + response.data.message);
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
                        alert(response.data.result + response.data.message);
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
                            alert(response.data.result + response.data.message);
                        })
                        .catch(err => console.error(err));
                        
                        this.previousElementSibling.style.backgroundColor = "rgb(229,242,255)";
                        this.previousElementSibling.style.color = "#0084ff";
                        this.previousElementSibling.innerText = "▲ 赞同 " + --res.data.articles[c].likeNum;
    
                        console.log(res.data.articles[c].likeNum);
                    }

                }

                

            }

            /*显示评论*/
            comment_show[x].onclick = function(){
                var c = this.getAttribute("index");
                comment[c].style.display = "block";

                var id = res.data.articles[c].articleId;
                var num = res.data.articles[c].commentNum;

                console.log(c,id,num,uID);
                if (num == 0) {
                    return "" ;
                } else {
                    console.log(c);
        
                    axios
                    .get("http://47.97.204.234:3000/article/getComments?userId="+ uID +"&articleId="+ id , {
                
                    })
                    .then(function (response) {
                        alert(response.data.result + response.data.message);
                        console.log(response.data.comments.length);
                        for(var a = 0; a < response.data.comments.length ; a++) {
                            console.log(c);
                            console.log(response.data.comments[a].nickname);
                            comment[c].innerHTML += `
                            <ul class="comment_item">
                                            
                                <li class=" first_commentator">
                                    <div class="commentator">
                                        <span>头</span>
                                        <span>${response.data.comments[a].nickname}</span>
                                        <span class="release_time">${response.data.comments[a].time}</span>
                                    </div>
                            
                                    <div class="commentator_content">
                                        <div class="commentator_top">
                                            ${response.data.comments[a].content}
                                        </div>
                            
                                        <div class="commentator_bottom">
                                            <button type="button" >
                                                <span class="idco">&#xe6e8</span>
                                                赞 ${response.data.comments[a].likeNum}
                                            </button>
                            
                                            <div class="commentator_function">
                                                <button type="button" >
                                                    <span class="idco">&#xe6e8</span>
                                                    回复
                                                </button>
                                                <button type="button" >
                                                    <span class="idco">&#xe6e8</span>
                                                    踩
                                                </button>
                                                <button type="button" >
                                                    <span class="idco">&#xe6e8</span>
                                                    举报
                                                </button>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    
                                </li>
                            </ul>
                            `;
        
                            
        
                        }
                        
                    })
                    .catch(err => console.error(err));
                }

                


            
            }

        }


        /*顶与踩*/
        function likedStatus (liked){
            if (liked == true){
                console.log (liked);
                return 'style = "background-color:#0084ff; color:#fff;" ';
            } else {
                return "";
            }

            
        }

        function dislikedStatus (disliked){

            if (disliked == true){
                console.log (disliked);
                return 'style = "background-color:#0084ff; color:#fff;" ';
            } else {
                return "";
            }
        }
        
    }

    

    function judgmentReview (num,id,i) {
        
        
    }
    
    
    


}


/*评论*/
/*
<div class="comment" >
    <div class="comment_box">
        <div class="comment_text">
            <div class="commentNum" ><h2>现有XX条评论</h2></div>
        </div>

        <div class="comment_content">
            
            <ul class="comment_item">

                <li class=" first_commentator">
                    <div class="commentator">
                        <span>头</span>
                        <span>人名</span>
                        <span class="release_time">时间</span>
                    </div>

                    <div class="commentator_content">
                        <div class="commentator_top">
                            评论内容
                        </div>

                        <div class="commentator_bottom">
                            <button type="button" >
                                <span class="idco">&#xe6e8</span>
                                赞
                            </button>

                            <div class="commentator_function">
                                <button type="button" >
                                    <span class="idco">&#xe6e8</span>
                                    回复
                                </button>
                                <button type="button" >
                                    <span class="idco">&#xe6e8</span>
                                    踩
                                </button>
                                <button type="button" >
                                    <span class="idco">&#xe6e8</span>
                                    举报
                                </button>
                            </div>
                            
                        </div>
                    </div>
                    
                </li>

                <li class="commentator_item ">
                    <div class="division"></div>
                    <div class="commentator">
                        <span>头</span>
                        <span>人名</span>
                        <span class="release_time">时间</span>
                    </div>

                    <div class="commentator_content">
                        <div class="commentator_top">
                            评论内容
                        </div>

                        <div class="commentator_bottom">
                            <button type="button" >
                                <span class="idco">&#xe6e8</span>
                                赞
                            </button>

                            <div class="commentator_function">
                                <button type="button" >
                                    <span class="idco">&#xe6e8</span>
                                    回复
                                </button>
                                <button type="button" >
                                    <span class="idco">&#xe6e8</span>
                                    踩
                                </button>
                                <button type="button" >
                                    <span class="idco">&#xe6e8</span>
                                    举报
                                </button>
                            </div>
                            
                        </div>
                    </div>
                    
                </li>
                
            </ul>
        </div>

        <div class="comment_input">
            <div class="comment_input_box">
                <div class="input_box">
                    <textarea placeholder="写下你的评论.."></textarea>
                    <span class="idco">0</span>
                </div>
                
                <button type="button" id="goComment">发布</button>
            </div>
        </div>
    </div>
</div>

<li class="commentator_item ">
            <div class="division"></div>
            <div class="commentator">
                <span>头</span>
                <span>人名</span>
                <span class="release_time">时间</span>
            </div>
    
            <div class="commentator_content">
                <div class="commentator_top">
                    评论内容
                </div>
    
                <div class="commentator_bottom">
                    <button type="button" >
                        <span class="idco">&#xe6e8</span>
                        赞
                    </button>
    
                    <div class="commentator_function">
                        <button type="button" >
                            <span class="idco">&#xe6e8</span>
                            回复
                        </button>
                        <button type="button" >
                            <span class="idco">&#xe6e8</span>
                            踩
                        </button>
                        <button type="button" >
                            <span class="idco">&#xe6e8</span>
                            举报
                        </button>
                    </div>
                    
                </div>
            </div>
            
        </li>
*/

