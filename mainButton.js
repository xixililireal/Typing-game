var num=3;
var secondId;
//全局变量  装所有的幽灵 数组
var ghosts=[];
//清除幽灵 
var createGhostId;
var flyGhostId;


/*鼠标按下 图片变小  与 鼠标抬起 图片还原 还原时跳转到另一个页面（window.open()）*/
function down(type){
	var aboutUs=document.getElementById(type);
	aboutUs.style.width="270px";
	aboutUs.style.height="200px";
	
}
function up(type){
	var aboutUs=document.getElementById(type);
	aboutUs.style.width="300px";
	aboutUs.style.height="230px";
	if(type==="aboutUs"){
	window.open("http://www.baidu.com");	
	}
}

			
/*开始游戏*/
function startGame3(){
	/*隐藏欢迎页*/
	var welcome=document.getElementById("welcomePage");
	welcome.style.display="none";
	/*打开游戏主页*/
	var mainPage=document.getElementById("mainPage");
	mainPage.style.display="block";
	/*点击开始游戏后 就开始倒计时*/
	secondId=setInterval(changeTime,1000);
	
}
/*改变倒计时*/
function changeTime(){
	//倒计时
	var time=document.getElementById("time");
	if(num==1){
		/*当倒计时为0时停止倒计时*/
		clearInterval(secondId);
		//并且隐藏倒计时
		time.style.display="none";
		/*倒计时结束之后 出现幽灵*/
		createGhostId=setInterval(createGhost,2000);
		/*让字母每隔一秒钟 底部都加一*/
		flyGhostId=setInterval(fly,1000);
	}else{
		/*3-1 给的初始值为3*/
		num--;
		time.src="../img/imgs/3-"+num+".png";
	}
}

/**
 * 创建幽灵 随机生成
 * <div class="ghost">
		A
   </div>
 */
function createGhost(){
	/*创建对象*/
	var ghost=document.createElement("div");
	/*设置属性*/
	ghost.className="ghost";
	//设置内容   A-Z之间的字母随机出现  所对应的ascii值是65-90
	//设置65-90之间的字母 65+25=90 0-1=A-Z=65-90
	var letterNum=parseInt(Math.random()*26+65);
	//String.fromCharCode() 使数字变为字母
	var letterChar=String.fromCharCode(letterNum);
	ghost.innerText=letterChar;
	/*确定幽灵出现的位置*/
	//需要动态的设置一个随机的值  在left和right之间的一个值
	var left=100;
	/*全屏宽度
	 * 见文件自己练习里的img文件里的图片
	 */
	var right=document.documentElement.clientWidth-120-120;
	/*左边到右边的区域 随机出现*/
	var random=Math.random()*(right-left)+left;
	ghost.style.left=random+"px";
	/*添加在body里*/
	document.body.appendChild(ghost);
	//设置 幽灵的底部 
	ghost.style.bottom=0;
	
	//把所有随机出现的字母位置 存储在数组中 push() 在尾部添加元素
	ghosts.push(ghost);
	
}
/*让字母飞起来*/
function fly(){
	for(var index in ghosts){
		/*获取每一个字母的底部位置  */
		var bottom=parseInt(ghosts[index].style.bottom);
		/*每个字母的底部位置都加一*/
		ghosts[index].style.bottom=bottom+1+"px";
		/*让字母飘出页面顶部时 消失*/
		//获取页面高度
		var totalHeight=document.documentElement.clientHeight;
		//如果幽灵的底部达到页面的高度
		if(bottom>=totalHeight){
			//则消失
			document.body.removeChild(ghosts[index]);
			/*移除字母*/
			ghosts.splice(index,1);
			/*积分减少*/
			document.getElementById("num").innerText--;
		}
	}				
}

/**
 * 注意！！！！！
 * event事件在不同的浏览器中有不同的用法
 */
/*按键时 字母消失*/
document.documentElement.onkeydown=function (){
	//获取键值
	var keyCode=event.keyCode;
	//把键值转换为字母
	var keyNum=String.fromCharCode(keyCode);
	//把每个字母与keyNum进行比较 如果相等就删除 不再执行下去
	for(var index in ghosts){
		if(ghosts[index].innerText==keyNum){
			/*移除body中的每一个div*/						
			document.body.removeChild(ghosts[index]);
			/*移除字母*/
			ghosts.splice(index,1);
			/*积分增加*/
			document.getElementById("num").innerText++;
			break;
		}
	}
}

//点击back 返回到欢迎页面 
function backtoWelcome(){
	//游戏主页隐藏
	var mainPage=document.getElementById("mainPage");
	mainPage.style.display="none";
	/*欢迎页显现*/
	var welcome=document.getElementById("welcomePage");
	welcome.style.display="block";
	//清除幽灵 停止计时器
	clearInterval(createGhostId);
	clearInterval(flyGhostId);
	//删除幽灵
	for(var index in ghosts){
		document.body.removeChild(ghosts[index]);	
	}
	// 将数组的内容清掉 
	ghosts = [];
	//刷新页面 刷新打开这个窗口的父窗口 即欢迎页
	parent.location.reload();
}

/*//难度增加 之后的暂停与开始
var CreateGhostID;
var FlyGhostID;*/
//停止游戏
function stopGhost(){
	var stopGhost=document.getElementById("stop");
	stopGhost.style.display="none";
	var startGhost=document.getElementById("start");
	startGhost.style.display="block";
	clearInterval(createGhostId);
	clearInterval(flyGhostId);
	clearInterval(secondId);
}
//开始游戏
function startGhost(){
	var stopGhost=document.getElementById("stop");
	stopGhost.style.display="block";
	var startGhost=document.getElementById("start");
	startGhost.style.display="none";
	var time=document.getElementById("time");
	time.style.display="none";
	createGhostId=setInterval(createGhost,2000);
	flyGhostId=setInterval(fly,1000);
	/*if(document.getElementById("degree").innerText==1){
		createGhostId=setInterval(createGhost,1000);
		flyGhostId=setInterval(fly,100);
	}
    if(document.getElementById("degree").innerText==2){
		createGhostId=setInterval(createGhost,500);
		flyGhostId=setInterval(fly,50);
	}
    if(document.getElementById("degree").innerText==3){
		createGhostId=setInterval(createGhost,100);
		flyGhostId=setInterval(fly,10);
	}
	*/
}

//设置游戏级别
/**
 * 字母出现的速度
 * 字母移动的速度
 */
function settingGame(){
	var setGame=document.getElementById("setGame");
	setGame.style.display="block";
	clearInterval(createGhostId);
	clearInterval(flyGhostId);
	//删除幽灵
	for(var index in ghosts){
		document.body.removeChild(ghosts[index]);	
	}
	// 将数组的内容清掉 
	ghosts = [];
	document.getElementById("num").innerText=0;
}

//游戏级别的增减
function leftReduction(){
	var left=document.getElementById("degree").innerText--;
	if(left==1){
		document.getElementById("degree").innerText="1";
	}
}
function rightIncrese(){
	var right=document.getElementById("degree").innerText++;
	if(right==3){
		document.getElementById("degree").innerText="3";
	}
}

//取消设置面板  并显示幽灵
function  cancelPanel(){
	var panel=document.getElementById("setGame");
	panel.style.display="none";
	/*createGhostId=setInterval(createGhost,2000);
    flyGhostId=setInterval(fly,1000);*/
   startGhost();
}

//设置游戏级别 难度  
function setCricle(){
	if(document.getElementById("degree").innerText==1){
		createGhostId=setInterval(createGhost,1000);
		flyGhostId=setInterval(fly,100);
		document.getElementById("setGame").style.display="none";
	}
    if(document.getElementById("degree").innerText==2){
		createGhostId=setInterval(createGhost,500);
		flyGhostId=setInterval(fly,50);
		document.getElementById("setGame").style.display="none";
	}
    if(document.getElementById("degree").innerText==3){
		createGhostId=setInterval(createGhost,100);
		flyGhostId=setInterval(fly,10);
		document.getElementById("setGame").style.display="none";
	}
}