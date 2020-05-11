/*----------获得好友列表及新信息，实时聊天功能-------------*/

/*-----好友列表-----*/

var show_friends = query('.show_friends');     //获取好友按钮
var friends_list = query('.friends_list');     //获取列表盒
var show_news = query('.show_news');     //获取信息按钮
var news_list = query('.news_list');     //获取列表盒

/*点击显示好友列表*/
show_friends.onclick = function () {

    if (bell_show.style.display == "none") {

        bell_show.style.display = "block";
        information_show.style.display = "none";
        people_show.style.display = "none";

        getfriends();       //获取好友信息
        clearInterval(timer);   //停止慢请求

    } else {

        bell_show.style.display = "none";

        timer = setInterval(function() {    //继续慢请求
            getfriends();
        } ,5000);

    }
}

/*点击显示新信息*/
show_news.onclick = function () {

    if (information_show.style.display == "none") {

        information_show.style.display = "block";
        bell_show.style.display = "none";
        people_show.style.display = "none";

        getfriends();       //获取新信息
        clearInterval(timer);   //停止慢请求

    } else {

        information_show.style.display = "none";

        timer = setInterval(function() {    //继续慢请求
            getfriends();
        } ,5000);
    }
}

/*获取好友信息*/
function friend_Message() {
    return axios.get("http://47.97.204.234:3000/user/friendList?userId=" + uID);
}
  
/*获取好友信息*/
function friend_News() {
    return axios.get("http://47.97.204.234:3000/chat/getMessage?userId=" + uID);
}

/*请求获取好友信息*/
function getfriends()  { 

    /*双请求*/
    axios.all([friend_Message(), friend_News()])
    .then(axios.spread(function (res_M, res_N) {        

        friends_list.innerHTML = "";        //列表清空

        for (var i = 0 ; i < res_M.data.friends.length ; i++) {     //添加好友条

            friends_list.innerHTML +=`
            <div class="friends_item" 
                onclick="tochat(
                '${res_M.data.friends[i].userId}' ,
                '${res_M.data.friends[i].nickname}' ,
                '${res_M.data.friends[i].avatar}' ,
                '${null}' ,
                '${null}'
                )" 
                title="${addIntroduction(res_M.data.friends[i].introduction)}">

                <div class="friends_Avatar">
                    <img src="${res_M.data.friends[i].avatar}">
                </div>

                <div class="friends_news">
                    <span class="friends_name">${res_M.data.friends[i].nickname}</span>
                    <span class="friends_introduction" index="${i}">个人介绍：${addIntroduction(res_M.data.friends[i].introduction)}</span>
                </div>
            </div>
            `

        }

        if (res_N.data.message == "获取成功") {     //获取新信息

            query('.dot').style.display = "block";      //有信息则标点
            query('.tohide').style.display = "none";    //背景 "无新信息" 消失

            for (var ii = 0 ; ii < res_N.data.newMessages.length ; ii++) {

                for (var iii = 0 ; iii < res_M.data.friends.length ; iii++) {   //双循环以通过id对上名字和信息

                    if (res_N.data.newMessages[ii].senderId == res_M.data.friends[iii].userId) {    //对上则添加信息条

                        news_list.innerHTML += ` 
                        <div class="friends_item friends_newsitem" 
                            onclick="tochat(
                            '${res_M.data.friends[iii].userId}',
                            '${res_M.data.friends[iii].nickname}',
                            '${res_M.data.friends[iii].avatar}',
                            '${res_N.data.newMessages[ii].content}',
                            '${res_N.data.newMessages[ii].time}'
                            )" 
                            index="${res_M.data.friends[iii].userId}" 
                            title="${res_N.data.newMessages[ii].content}">

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

        if (news_list.children.length == 1 ) {      //若信息列表中只有一个子元素（背景框），则取消红点，加背景
            query('.dot').style.display = "none";
            query('.tohide').style.display = "block";
        }

    }))
    .catch(err => console.error(err));
}

/*给没有介绍的人增加介绍*/
function addIntroduction(inctro) {
    if (inctro == "") {
        return "此人很懒，无介绍";
    } else {
        return inctro;
    }
}

/*主页导航条的消失与隐藏*/
var bell_show = query(".bell_show");
var information_show = query(".information_show");
var people = fromId("people");
var people_show = query(".people_content");

people.onclick = function() {       //点击按钮显示好友框

    if (people_show.style.display == "none") {

        people_show.style.display = "block";
        information_show.style.display = "none";
        bell_show.style.display = "none";

    } else {

        people_show.style.display = "none";

    }
}

people_show.onclick = function() {      //点击后框框消失
    people_show.style.display = "none";
}

function disappear() {      //三个框（好友，信息，个人页面） 都消失
    bell_show.style.display = "none";
    people_show.style.display = "none";
    information_show.style.display = "none";
}

var homepage_main = query(".homepage_main");

homepage_main.onclick = function() {        //点击内容页面，三个框消失
    disappear();
}


/*------------显示聊天窗口----------------*/
var chat_box = query(".chat_box");
var chat_background = query(".chat_background");
var chat_content = query(".chat_content");
var bodyyy = query('.bodyyy');

function tochat(friendsId,friendsName,friendAvatar,friends_content,time) {      //聊天框内容

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

    var chat_name = query(".chat_name");   //更改聊天好友名字
    chat_name.innerText = friendsName;
    
    if(friends_content != "null") {     //如果有聊天内容则显示内容

        chat_content.innerHTML = `
            <div class="chat_item">
                <span class="chat_item_time">${timeFormat_conversion (time)}</span>
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

        var friends_newsitem = queryAll(".friends_newsitem");
        var friends_newsintroduction = queryAll(".friends_newsintroduction");

        for (var i = 0 ; i < friends_newsitem.length ; i++){        //信息条，以将同id的人，所发的信息显示在聊天框并删除

            var friendIndex =  friends_newsitem[i].getAttribute('index');

            if(friendIndex == friendsId) {

                if (friends_newsintroduction[i].innerText != friends_content) {     //如果不是点击的那条信息的内容，则放到聊天框（点击的那一条已经显示）
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
                
                news_list.removeChild(friends_newsitem[i]);     //删除
                
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

                for (var i = 0 ; i < resp_FM.data.newMessages.length ; i++) {   //遍历所有信息

                    if(resp_FM.data.newMessages[i].senderId == friendsId) {     //获取当前好友发来的信息

                        var myDate = new Date();    //获取时间（服务器时间不准）

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

                        chat_content.scrollTop = chat_content.scrollHeight;     //滚动条定位到最低

                    }
                }
            }
        })
        .catch(err => console.error(err));

    } ,1000);

    /*发送信息*/
    var chat_input = query('.chat_input');
    var chat_input_send = query('.chat_input_send');

    chat_input_send.onclick = function() {      //当点击发送按钮

        var send_text = chat_input.value;       //获取输入框内容

        /*检测表情*/
        var reg1 = /\[[\u4e00-\u9fa5]+\]/g;     //检测符号[]
        var reg2 = /\[[\u4e00-\u9fa5]+\]/;
        
        var input_content = send_text.match(reg1);
        var txt = send_text;

        /*将指定内容换为表情*/
        if(input_content && input_content.length){
            for(var i = 0 ; i < input_content.length ; i++){

                for(var j = 0 ; j < arrDate.length ; j ++){     //双循环以确定是哪个表情

                    if( input_content[i] === '[' + arrDate[j].title + ']'){
                        txt = txt.replace ( reg2, arrDate[j].emoji );
                        break;
                    }
                }
            }
        }

        send_text = txt;        //添加表情

        chat_toolbar.children[1].style.display = "none";        //表情框消失

        if(send_text == "") {
            alert('宁没有输入内容');
        } else {

            axios       //发出信息请求
            .post("http://47.97.204.234:3000/chat/sendMessage", {
                userId: uID,
                friendId: friendsId,
                content: send_text
            })
            .then( function(resp) {

                var myDate = new Date();        //获取时间

                /*添加信息内容*/
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

                chat_input.value = "";      //输入框内容清空

                chat_content.scrollTop = chat_content.scrollHeight;     //定位底部

            })
            .catch(err => console.error(err));
        }
    }
    
    /*表情功能*/
    var chat_toolbar =  query(".chat_toolbar");     //表情框
    var emoji_item = queryAll('.emoji_item');       //表情

    chat_toolbar.children[0].onclick = function() {     //表情框点击显示
        chat_toolbar.children[1].style.display = "block";
    }
  
    query('.chat_content').addEventListener('click',function(){     //监听聊天框点击后，表情框消失
        chat_toolbar.children[1].style.display = "none";
    });
  
    for ( var i = 0 ; i < emoji_item.length ; i++ ) {       //遍历添加事件

        emoji_item[i].onclick = function() {        //点击哪个表情以文本形式添加到输入框

          var textV = chat_input.value;
          var addtitle = this.getAttribute("title");
          chat_input.value =  textV + '[' + addtitle + ']';

        }
    }

    /*enter键发送*/
    document.addEventListener('keyup',function(e) {
        if (e.keyCode === 13) {
            chat_input_send.onclick();
        }
    } );
    
}