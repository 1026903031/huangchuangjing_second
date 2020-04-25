/*基本格式
function getTodos() {
    axios
      .get("http://47.97.204.234:3000/user/state", {
        timeout: 5000
      })
      .then(res => showOutput(res))
      .catch(err => console.error(err));
  }
  
// POST 请求
function addTodo() {
    axios
    .post("http://47.97.204.234:3000/user/login", {
        username: "hcj1",
        password: "123"
    })
    .then(res => showOutput(res))
    .catch(err => console.error(err));
}
*/

/*地址
http://47.97.204.234:3000/user/logout  退出登录
{
	"username": "用户名",
	"password": "用户密码"
}返回{
	"result": "请求结果，成功为success，失败为failed",
	"message": "请求结果说明"
}

http://47.97.204.234:3000/user/state 检查登录状态 GET
{
	"result": "请求结果，成功返回success，失败返回failed",
	"message": "请求结果说明",
	"userId": "如果处于登录状态，则返回用户id"
}

http://47.97.204.234:3000/user/login 用户登录
{
	"username": "用户名",
	"password": "用户密码"
}返回{
	"result": "请求结果，成功为success，失败为failed",
	"message": "请求结果说明",
	"userId": "用户id，若登录失败则不会返回"
}

*/
/*-----获取文章-----*/
function getArticle() {
    axios
    .get("http://47.97.204.234:3000/article/getArticles?userId=" + uID + "&start=0&stop=18",{

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
function tolimit(content) {

    return content.toString().slice(0,100); 
}

function article_title(res) {
    console.log( res );
    console.log(typeof(res.data.articles[1].content))
    for (i in res.data.articles ) {
        console.log(1);
        document.querySelector('.primaryCoverage').innerHTML += `
            <div class="article">
                <div class="article_item">
                    <a href="javascript:;">
                        <h3>${res.data.articles[i].title}</h3>
                    </a>

                    <div class="rich_Content">
                        <div class="rich_inner">
                            <span>${tolimit(res.data.articles[i].content)}</span>
                            <button type="button">阅读全文▼ </button>
                            </div>
                        </div>
                                
                        <div class="content_actions">
                            <span class="actions_first">
                                <button type="button">▲ 赞同 XX</button>
                                <button type="button">▼</button>
                            </span>
                                    
                            <div class="actions_two">
                                <button type="button" id="comment_show">
                                    <span class="idco">&#xe613</span>
                                    XX条评论
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
                </div>
            </div>
        `;

    }

}