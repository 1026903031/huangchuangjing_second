/*--------------文章功能，评论功能，回复功能---------------*/

var seeContent = new Array();   //以存储文本

/*获取文章等等*/
function article_title(res) {

    query('.primaryCoverage').innerHTML = "";       //清空内容

    for (i in res.data.articles ) {     //遍历

        seeContent[i] = res.data.articles[i].content;       //储存文章内容

        /*添加文章、评论、回复内容*/
        query('.primaryCoverage').innerHTML += `
            <div class="article">
                <div class="article_item">

                    <a href="javascript:;">
                        <h3>${res.data.articles[i].title}</h3>
                    </a>

                    <div class="announcer">
                        <span ><img class="avatar" src="${res.data.articles[i].avatar}"></span>
                        <span style="font-weight:600;">${res.data.articles[i].nickname}</span>
                        <span class="release_time">${timeFormat_conversion (res.data.articles[i].issueTime)}</span>
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
                                <div class="comment_input_box" >
                                    <div class="input_box" index="${i}">

                                        <textarea placeholder="写下你的评论.."></textarea>

                                        <span class="idco showEmoji"  index="${i}" style="font-size: 25px;" >&#xe78d</span>
                                        
                                        <div class="emoji commentemoji" >
                                            <ul class="emoji_list">
                                              <li class="emoji_item" title="哭笑不得">😂</li>
                                              <li class="emoji_item" title="爱"   >😘</li>
                                              <li class="emoji_item" title="笑"   >😀</li>
                                              <li class="emoji_item" title="大笑"  >😁</li>
                                              <li class="emoji_item" title="开怀大笑">🤣</li>
                                              <li class="emoji_item" title="假笑"  >😃</li>
                                              <li class="emoji_item" title="眯眼笑" >😄</li>
                                              <li class="emoji_item" title="汗笑"  >😅</li>
                                              <li class="emoji_item" title="电眼笑" >😉</li>
                                              <li class="emoji_item" title="欣慰笑" >😊</li>
                                              <li class="emoji_item" title="吐舌头笑">😋</li>
                                              <li class="emoji_item" title="酷">😎</li>
                                              <li class="emoji_item" title="色"   >😍</li>
                                              <li class="emoji_item" title="亲亲"  >😗</li>
                                            </ul>
                                        </div>

                                    </div>
                                    
                                    <button type="button" class="goComment" index="${i}" >发布</button>

                                </div>

                            </div>

                        </div>

                    </div>
                    
                </div>
            </div>
        `;
        

        var readAll = queryAll('.readAll');            //阅读全文
        var actions_first = queryAll('.actions_first');      //点赞
        var comment_show = queryAll('.comment_show');      //评论按钮
        var comment_retract = queryAll('.comment_retract');      //收起评论按钮

        var comment = queryAll('.comment');            //评论框框
        var retract = queryAll('.retract');        //收起全文
        var readContent = queryAll('.readContent') //全文
        var comment_content = queryAll('.comment_content') //评论内容
        var goComment = queryAll('.goComment')  //评论
    
        for (var x = 0; x < readAll.length; x++) {          //遍历并添加事件

            /*展开全文*/
            readAll[x].onclick = function(){

                for (var i = 0 ; i < readAll.length; i++){      //按下所有收起原文 （只能打开一篇全文）
                    retract[i].onclick();
                }
    
                var c = this.getAttribute("index");     //获取索引
                this.previousElementSibling.innerText = "";     //清空内容

                for(var a = 0 ; a < seeContent[c].length ; a++){        //一句一句添加（方便观看）

                    this.previousElementSibling.innerHTML += `
                    <p>${seeContent[c][a]}</p>
                    <br>
                    `

                }

                this.style.display = 'none';        //隐藏此按钮
                this.parentNode.style.height = "auto";      //文章高度调为自动

                retract[c].style.display = 'inline-block';      //显示收起原文按钮
                
            }

            /*收起全文*/
            retract[x].onclick = function(){ 

                var c = this.getAttribute("index");     //获得索引
                readAll[c].style.display = 'block';     //显示展开全文按钮
                this.style.display = 'none';          //隐藏
                readContent[c].innerText = res.data.articles[i].content ;       //文章压缩
                this.parentNode.parentNode.previousElementSibling.children[0].style.height = "85px";        //高度限制

            }

            /*文章点赞*/
            actions_first[x].children[0].onclick = function(){
                
                var c = this.getAttribute("index");         //获取索引
                var articlesid = res.data.articles[c].articleId;        //获取文章id

                this.innerText = "";        //按钮文本清空
                
                if ( res.data.articles[c].liked == true) {      //取消点赞

                    axios       //发出取消点赞按钮
                    .post("http://47.97.204.234:3000/article/likeArticle", {
                        userId: uID,
                        articleId: articlesid,
                        like: false 
                    })
                    .then(function (response) {
                        res.data.articles[c].liked = false;     //变为不点赞
                    })
                    .catch(err => console.error(err));
                    
                    //更改样式
                    this.style.backgroundColor = "rgb(229,242,255)";
                    this.style.color = "#0084ff";
                    this.innerText = "▲ 赞同 " + --res.data.articles[c].likeNum;

                } else if ( res.data.articles[c].liked == false) {      //点赞

                    axios
                    .post("http://47.97.204.234:3000/article/likeArticle", {
                        userId: uID,
                        articleId: articlesid,
                        like: true 
                    })
                    .then(function (response) {
                        res.data.articles[c].liked = true;
                    })
                    .catch(err => console.error(err));

                    //修改按钮样式
                    this.style.backgroundColor = "#0084ff";
                    this.style.color = "#fff";
                    this.innerText = "▲ 已赞同 " + ++res.data.articles[c].likeNum;

                    if ( res.data.articles[c].disliked == true) {       //取消点踩

                        axios
                        .post("http://47.97.204.234:3000/article/dislikeArticle", {
                            userId: uID,
                            articleId: articlesid,
                            dislike: false 
                        })
                        .then(function (response) {
                            res.data.articles[c].disliked = false;
                        })
                        .catch(err => console.error(err));
    
                        //修改点踩按钮样式
                        this.nextElementSibling.style.backgroundColor = "rgb(229,242,255)";
                        this.nextElementSibling.style.color = "#0084ff";

                    }

                }   

            }

            
            /*文章点踩*/
            actions_first[x].children[1].onclick = function(){

                var c = this.getAttribute("index");     //索引
                var articlesid = res.data.articles[c].articleId;        //id

                if ( res.data.articles[c].disliked == true) {       //取消点踩

                    axios
                    .post("http://47.97.204.234:3000/article/dislikeArticle", {
                        userId: uID,
                        articleId: articlesid,
                        dislike: false 
                    })
                    .then(function (response) {
                        res.data.articles[c].disliked = false;
                    })
                    .catch(err => console.error(err));

                    //修改样式
                    this.style.backgroundColor = "rgb(229,242,255)";
                    this.style.color = "#0084ff";

                } else if ( res.data.articles[c].disliked == false) {       //点踩

                    axios
                    .post("http://47.97.204.234:3000/article/dislikeArticle", {
                        userId: uID,
                        articleId: articlesid,
                        dislike: true 
                    })
                    .then(function (response) {
                        res.data.articles[c].disliked = true;
                    })
                    .catch(err => console.error(err));

                    //修改样式
                    this.style.backgroundColor = "#0084ff";
                    this.style.color = "#fff";

                    if ( res.data.articles[c].liked == true) {      //如果点赞则取消

                        axios
                        .post("http://47.97.204.234:3000/article/likeArticle", {
                            userId: uID,
                            articleId: articlesid,
                            like: false 
                        })
                        .then(function (response) {
                            res.data.articles[c].liked = false;
                        })
                        .catch(err => console.error(err));
                        
                        //修改点赞功能的样式
                        this.previousElementSibling.style.backgroundColor = "rgb(229,242,255)";
                        this.previousElementSibling.style.color = "#0084ff";
                        this.previousElementSibling.innerText = "▲ 赞同 " + --res.data.articles[c].likeNum;

                    }

                }

                

            }

            /*显示评论*/
            comment_show[x].onclick = function(){

                var bbbb ;      //添加回复索引
                bbbb = 0; 

                var c = this.getAttribute("index");     //索引
                var id = res.data.articles[c].articleId;        //id
                var num = res.data.articles[c].commentNum;      //评论id

                for (var ii = 0; ii < comment.length; ii++) {   //评论区域关闭且删除
                    comment[ii].style.display = "none" ;
                    comment_content[ii].innerHTML = "";
                    comment_retract[ii].style.display = "none";
                    comment_show[ii].style.display = "inline-block";
                }

                comment[c].style.display = "block" ;    //显示评论区
                this.nextElementSibling.style.display = "inline-block";      //隐藏按钮且显示收起按钮
                this.style.display = "none";

                //如果零评论则不发出请求
                if (num == 0) {
                    return "" ;
                } else {        //发出请求
                    
                    axios
                    .get("http://47.97.204.234:3000/article/getComments?userId="+ uID +"&articleId="+ id )
                    .then(function (response) {

                        for(var a = 0; a < response.data.comments.length ; a++) {       //添加评论内容
                            
                            comment_content[c].innerHTML += `
                            <ul class="comment_item" index="${a}">
                                            
                                <li class=" first_commentator">
                                    <div class="commentator">
                                        <span ><img class="avatar" src="${response.data.comments[a].avatar}"></span>
                                        <span style="font-weight:600;" >${response.data.comments[a].nickname}</span>
                                        <span class="release_time">${timeFormat_conversion (response.data.comments[a].time)}</span>
                                    </div>
                            
                                    <div class="commentator_content">
                                        <div class="commentator_top">
                                        </div>
                            
                                        <div class="commentator_bottom" index="${a}">
                                            <button type="button" class="toLike toLikeTwo"  index="${a}" ${Statusliked(response.data.comments[a].liked)} >
                                                <span class="idco">&#xe700</span>
                                                赞 ${response.data.comments[a].likeNum}
                                            </button>
                            
                                            <div class="commentator_function" index="${a}">
                                                <button type="button" class="reply_Comment reply_CommentTwo" >
                                                    <span class="idco">&#xe647</span>
                                                    回复
                                                </button>

                                                <button type="button" class="reply_Comment_Close reply_Comment_CloseTwo" >
                                                    <span class="idco">&#xe647</span>
                                                    收起回复
                                                </button>


                                                <button type="button"  class="toDislike toDislikeTwo" ${Statusdisliked(response.data.comments[a].disliked)}>
                                                    <span class="idco" style="font-size: 15px;" >&#xe694</span>
                                                    踩
                                                </button>
                                                <button type="button" >
                                                    <span class="idco" style="font-size: 15px;" >&#xe607</span>
                                                    举报
                                                </button>
                                                
                                                <button type="button" class="delete_Comment delete_CommentTwo" index="${a}" style="display:${addButton(response.data.comments[a].userId)}">
                                                    <span class="idco">&#xe628</span>
                                                    删除
                                                </button>

                                            </div>
                                            
                                        </div>
                                    </div>
                                    
                                </li>

                                <div class="reply_input reply_inputTwo" index="${a}">
                                    <div class="reply_input_box">
                                        <div class="input_replybox" index="${a}" >
                                            <textarea placeholder="回复${response.data.comments[a].nickname}.."></textarea>
                                        </div>
                                
                                        <button type="button" class="reply replyTwo" index="${a}" >回复</button>
                                    </div>
                                </div>

                            </ul>
                            `;

                            /*干掉攻击*/
                            var commentator_top = queryAll('.commentator_top');
                            commentator_top[a].innerText = response.data.comments[a].content;

                            /*显示评论回复*/
                            add_Replies(response.data.comments[a].replied, a);
                            function add_Replies(replied, a ){

                                var aaa = a ;//索引

                                if(replied == true){        //有回复则添加回复

                                    axios
                                    .get("http://47.97.204.234:3000/article/getReplies?userId=" + uID + "&commentId=" + response.data.comments[a].commentId )
                                    .then(function (resp) {

                                        for (var aa = 0 ; aa < resp.data.replies.length ; aa++){        //添加评论内容

                                            comment_item[aaa].innerHTML += `

                                            <li class="commentator_item " index="${aaa}">
                                                <div class="division"></div>
                                                <div class="commentator">
                                                    <span ><img class="avatar" src="${resp.data.replies[aa].avatar}"></span>
                                                    <span style="font-weight:600;" >${resp.data.replies[aa].nickname}</span>
                                                    <span class="release_time">${timeFormat_conversion (resp.data.replies[aa].time)}</span>
                                                </div>
                            
                                                <div class="commentator_content">
                                                    <div class="commentator_toptop" index="${bbbb}">
                                                        <p></p>
                                                        <div  style="display:none;">${resp.data.replies[aa].content}</div>
                                                    </div>
                            
                                                    <div class="commentator_bottom" index="${aa}">
                                                        <button type="button" class="toLike_reply" index="${resp.data.replies[aa].replyId}" ${Statusliked(resp.data.replies[aa].liked)} >
                                                            <span class="idco">&#xe700</span>
                                                            赞 ${resp.data.replies[aa].likeNum}
                                                        </button>
                            
                                                        <div class="commentator_function" index="${resp.data.replies[aa].replyId}" >

                                                            <button type="button"  class="toDislike_reply" ${Statusdisliked(resp.data.replies[aa].disliked)}>
                                                                <span class="idco" style="font-size: 15px;" >&#xe694</span>
                                                                踩
                                                            </button>

                                                            <button type="button" >
                                                                <span class="idco" style="font-size: 15px;" >&#xe607</span>
                                                                举报
                                                            </button>

                                                            <button type="button" class="delete_replie" index="${resp.data.replies[aa].replyId}" style="display:${addButton(resp.data.replies[aa].userId)}">
                                                                <span class="idco">&#xe628</span>
                                                                删除
                                                            </button>

                                                        </div>

                                                    </div>
                                                </div>
                                            </li>
                                            `;
                                            
                                            /*干掉攻击*/
                                            var commentator_toptop = queryAll('.commentator_toptop');
                                            for (var xxx = 0; xxx < commentator_toptop.length ; xxx++) {
                                                commentator_toptop[xxx].children[0].innerText = commentator_toptop[xxx].children[1].innerHTML;
                                            }
                                            
                                            var toLike_reply = queryAll('.toLike_reply');       //点赞回复
                                            var toDislike_reply = queryAll('.toDislike_reply');     //点踩回复
                                            var delete_replie = queryAll('.delete_replie');     //删除回复

                                            /*重新赋值点击事件，原先的事件会因innerhtml刷新掉*/

                                            /*点赞*/
                                            var toLikeTwo = queryAll('.toLikeTwo');
                                            toLikeTwo[aaa].onclick = function() {
                                                toLike[aaa].onclick();
                                            }
                                            
                                            /*点踩*/
                                            var toDislikeTwo = queryAll('.toDislikeTwo');
                                            toDislikeTwo[aaa].onclick = function() {
                                                toDislike[aaa].onclick();
                                            }

                                            /*删除*/
                                            var delete_CommentTwo = queryAll('.delete_CommentTwo');
                                            delete_CommentTwo[aaa].onclick = function() {
                                                delete_Comment[aaa].onclick();
                                            }

                                            /*回复框框*/
                                            var reply_inputTwo = queryAll('.reply_inputTwo');
                                            var reply_CommentTwo = queryAll('.reply_CommentTwo');

                                            reply_CommentTwo[aaa].onclick = function() {

                                                for (var iii = 0; iii < reply_Comment.length; iii++) {   //评论区域关闭且删除
                                                    reply_input[iii].style.display = "none" ;
                                                    reply_Comment_Close[iii].style.display = "none";
                                                    reply_Comment[iii].style.display = "inline-block";
                                                }

                                                var cc = this.parentNode.getAttribute("index");     //索引

                                                //修改样式
                                                reply_inputTwo[cc].style.display = "block";
                                                this.nextElementSibling.style.display = "inline-block";      //隐藏按钮且显示收起按钮
                                                this.style.display = "none";

                                            }

                                            /*收起回复*/
                                            var reply_Comment_CloseTwo = queryAll('.reply_Comment_CloseTwo');

                                            reply_Comment_CloseTwo[aaa].onclick = function() {

                                                var cc = this.parentNode.getAttribute("index");
                                                reply_inputTwo[cc].style.display = "none";
                                                this.previousElementSibling.style.display = "inline-block";      //隐藏按钮且显示收起按钮
                                                this.style.display = "none";

                                            }

                                            /*回复*/
                                            var replyTwo = queryAll('.replyTwo');

                                            replyTwo[aaa].onclick = function() {

                                                var cc = this.getAttribute("index");        //索引
                                                var texts = this.previousElementSibling.children[0].value;      //输入框内容

                                                if ( texts == "" ) {
                                                    alert('宁没有输入内容');
                                                } else {
                                                    axios
                                                    .post("http://47.97.204.234:3000/article/reply",{
                                                        userId: uID ,
	                                                    commentId: response.data.comments[cc].commentId,
	                                                    content: texts
                                                    })
                                                    .then(function(resp) {
                                                        comment_show[c].onclick();      //刷新评论 
                                                        input_replybox[cc].children[0].value = "";      //清空输入框内容
                                                    })
                                                    .catch(err => console.error(err));
                                                }

                                            }

                                            

                                            for (var xxx = 0; xxx < toLike_reply.length ; xxx++) {      //遍历添加回复评论之中事件
                                
                                                /*点赞回复*/                                            
                                                toLike_reply[xxx].onclick = function(){  

                                                    var cc = this.getAttribute("index");

                                                    if ( this.style.color == "rgb(0, 132, 255)" ) {     //通过颜色判断是否点赞、点踩

                                                        axios
                                                        .post("http://47.97.204.234:3000/article/likeReply", {
                                                            userId: uID,
                                                            replyId: cc,
                                                            like: false 
                                                        })
                                                        .then(function (respo) {
                                                            comment_show[c].onclick();      //刷新评论
                                                        })
                                                        .catch(err => console.error(err));

                                                    } else {

                                                        axios
                                                        .post("http://47.97.204.234:3000/article/likeReply", {
                                                            userId: uID,
                                                            replyId: cc,
                                                            like: true 
                                                        })
                                                        .then(function (respo) {
                                                            comment_show[c].onclick();      //刷新评论
                                                        })
                                                        .catch(err => console.error(err));

                                                    }

                                                }

                                                /*点踩回复*/
                                                toDislike_reply[xxx].onclick = function(){  

                                                    var cc = this.parentNode.getAttribute("index");
                                                    
                                                    if ( this.style.color == "rgb(0, 132, 255)" ) {     //通过颜色判断是否点赞、点踩

                                                        axios
                                                        .post("http://47.97.204.234:3000/article/dislikeReply", {
                                                            userId: uID,
                                                            replyId: cc,
                                                            dislike: false 
                                                        })
                                                        .then(function (respo) {
                                                            comment_show[c].onclick();      //刷新评论
                                                        })
                                                        .catch(err => console.error(err));

                                                    } else {

                                                        axios
                                                        .post("http://47.97.204.234:3000/article/dislikeReply", {
                                                            userId: uID,
                                                            replyId: cc,
                                                            dislike: true 
                                                        })
                                                        .then(function (respo) {
                                                            comment_show[c].onclick();      //刷新评论
                                                        })
                                                        .catch(err => console.error(err));

                                                    }

                                                }

                                                /*删除回复*/
                                                delete_replie[xxx].onclick = function(){
                                                    var cc = this.getAttribute('index');

                                                    axios
                                                    .delete("http://47.97.204.234:3000/article/deleteReply" , {
                                                        data:{
                                                            userId: uID,
                                                            replyId: cc
                                                        }
                                                    })
                                                    .then(function (respo){
                                                        
                                                        alert(respo.data.result + respo.data.message);
                                                        comment_show[c].onclick();      //刷新评论
                                                    })
                                                    .catch(err => console.error(err));

                                                }
                                                
                                            }

                                            bbbb++;     //加加
                                        }
                                    })
                                    .catch(err => console.error(err));
                            
                                } 

                            }

                            var toLike = queryAll('.toLike') //点赞
                            var toDislike = queryAll('.toDislike') //点踩

                            var comment_item = queryAll('.comment_item') //总框框
                            var reply_Comment = queryAll('.reply_Comment') //回复评论内容
                            var reply_Comment_Close = queryAll('.reply_Comment_Close') //收起回复评论

                            var delete_Comment = queryAll('.delete_Comment') //删除评论
                            var reply_input = queryAll('.reply_input') //回复评论文本
                            var reply = queryAll('.reply') //回复评论
                            var input_replybox = queryAll('.input_replybox') //回复内容

                            function addButton(userId) {        //根据id来添加删除按钮
                                if (userId == uID) {

                                    return `
                                    inline-block;
                                    `;

                                } else {

                                    return `
                                    none;
                                    `;

                                }
                            }
                            
                            
                            for (var xx = 0; xx < toLike.length; xx++) {        //遍历添加事件

                                /*点赞评论*/
                                toLike[xx].onclick = function(){
                                    
                                    var cc = this.parentNode.getAttribute("index");

                                    if ( response.data.comments[cc].liked == true) {        //取消点赞

                                        axios
                                        .post("http://47.97.204.234:3000/article/likeComment", {
                                            userId: uID,
                                            commentId: response.data.comments[cc].commentId,
                                            like: false 
                                        })
                                        .then(function (resp) {
                                            comment_show[c].onclick();      //刷新评论
                                        })
                                        .catch(err => console.error(err));
    
                                    } else if ( response.data.comments[cc].liked == false ) {       //点赞

                                        axios
                                        .post("http://47.97.204.234:3000/article/likeComment", {
                                            userId: uID,
                                            commentId: response.data.comments[cc].commentId,
                                            like: true 
                                        })
                                        .then(function (resp) {
                                            comment_show[c].onclick();      //刷新评论
                                        })
                                        .catch(err => console.error(err));
    
                                    }

                                }

                                /*点踩评论*/
                                toDislike[xx].onclick = function(){
                                    
                                    var cc = this.parentNode.getAttribute("index");

                                    if ( response.data.comments[cc].disliked == true) {     //取消点踩

                                        axios
                                        .post("http://47.97.204.234:3000/article/dislikeComment", {
                                            userId: uID,
                                            commentId: response.data.comments[cc].commentId,
                                            dislike: false 
                                        })
                                        .then(function (resp) {
                                            comment_show[c].onclick();      //刷新评论
                                        })
                                        .catch(err => console.error(err));
    
                                    } else if ( response.data.comments[cc].disliked == false ) {        //点踩

                                        axios
                                        .post("http://47.97.204.234:3000/article/dislikeComment", {
                                            userId: uID,
                                            commentId: response.data.comments[cc].commentId,
                                            dislike: true 
                                        })
                                        .then(function (resp) {
                                            comment_show[c].onclick();      //刷新评论
                                        })
                                        .catch(err => console.error(err));
    
                                    }

                                }

                                /*删除评论*/
                                delete_Comment[xx].onclick = function(){

                                    var cc = this.getAttribute("index");

                                    axios
                                    .delete("http://47.97.204.234:3000/article/deleteComment", {
                                        data:{
                                            userId: uID ,
                                            commentId: response.data.comments[cc].commentId
                                        }
                                    })
                                    .then(function (resp) {
                                        comment_show[c].onclick();      //刷新评论
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

                                    var cc = this.getAttribute("index");            //索引
                                    var texts = this.previousElementSibling.children[0].value;      //内容

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
                                            comment_show[c].onclick();      //刷新评论
                                            input_replybox[cc].children[0].value = "";      //清空
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

                var c = this.getAttribute("index");             //索引
                var text = this.previousElementSibling.children[0].value;       //内容
                this.previousElementSibling.children[0].value = "";     //输入框清零

                /*检测表情*/
                var reg1 = /\[[\u4e00-\u9fa5]+\]/g;     //检测符号[]
                var reg2 = /\[[\u4e00-\u9fa5]+\]/;

                var input_content = text.match(reg1);
                var txt = text;

                /*文本转换为表情*/
                if(input_content && input_content.length){
                    for(var i = 0 ; i < input_content.length ; i++){
                        for(var j = 0 ; j < arrDate.length ; j ++){

                            if( input_content[i] === '[' + arrDate[j].title + ']'){
                                txt = txt.replace ( reg2, arrDate[j].emoji );
                                break;
                            }
                        }
                    }
                }

                text = txt;        //添加表情

                showEmoji[c].nextElementSibling.style.display = "none";         //表情框隐藏
                
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
                        comment_show[c].onclick();      //刷新评论
                    })
                    .catch(err => console.error(err));

                }
                
            }

            //表情
            var showEmoji = queryAll('.showEmoji');
            var emoji_list = queryAll('.emoji_list');

            showEmoji[x].onclick = function () {

                var c = this.getAttribute("index");
                
                if (showEmoji[c].nextElementSibling.style.display == "none") {      //点击实现消失和隐藏

                    showEmoji[c].nextElementSibling.style.display = "block";

                } else {

                    showEmoji[c].nextElementSibling.style.display = "none";

                }

                for ( var e = 0 ; e < emoji_list[c].children.length ; e++ ) {

                    emoji_list[c].children[e].onclick = function() {        //点击添加表情文本

                        var textV = showEmoji[c].previousElementSibling.value;
                        var addtitle = this.getAttribute("title");
                        showEmoji[c].previousElementSibling.value =  textV + '[' + addtitle + ']';

                    }

                }
                
            }
            
        }


        /*判断文章是否点赞*/
        function likedStatus (liked){

            if (liked == true){
                return 'style = "background-color:#0084ff; color:#fff;" ';
            } else {
                return "";
            }

        }

        /*判断文章是否点踩*/
        function dislikedStatus (disliked){

            if (disliked == true){
                return 'style = "background-color:#0084ff; color:#fff;" ';
            } else {
                return "";
            }

        }

        /*判断评论&回复是否点赞*/
        function Statusliked (liked){

            if (liked == true){
                return 'style = "color:#0084ff;"';
            } else {
                return 'style = " color: rgb(133,144,166); " ';
            }
            
        }

        /*判断评论&回复是否点踩*/
        function Statusdisliked (disliked){

            if (disliked == true){
                return 'style = "color:#0084ff;"';
            } else {
                return "";
            }
            
        }
        
    }

}