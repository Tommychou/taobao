// JavaScript Document
function id(obj) {
    return document.getElementById(obj);
}
function bind(obj, ev, fn) { 
    if (obj.addEventListener) {
        obj.addEventListener(ev, fn, false);
    } else {
        obj.attachEvent('on' + ev, function() {
            fn.call(obj);
        });
    }
}
function view() {
    return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
    };
}
function addClass(obj, sClass) { 
    var aClass = obj.className.split(' ');
    if (!obj.className) {
        obj.className = sClass;
        return;
    }
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) return;
    }
    obj.className += ' ' + sClass;
}

function removeClass(obj, sClass) { 
    var aClass = obj.className.split(' ');
    if (!obj.className) return;
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) {
            aClass.splice(i, 1);
            obj.className = aClass.join(' ');
            break;
        }
    }
}

function fnLoad(){
	var iTime=new Date().getTime();
	var oW=id("welcome");
	var arr=[""];
	var bImgLoad=true;
	var bTime=false;
	var oTimer=0;
	bind(oW,"webkitTransitionEnd",end);
	bind(oW,"transitionend",end);
	oTimer=setInterval(function(){
		if(new Date().getTime()-iTime>=15000){
			bTime=true;
		}	
		if(bImgLoad&&bTime){
			clearInterval(oTimer);
			oW.style.opacity=0;
		}
	},1000);
	function end(){
		removeClass(oW,"pageShow");
		 fnTab();
	}
	/*for(var i=0;i<arr.length;i++)
	{
		var oImg=new Image();
		oImg.src=arr[i];
		oImg.onload=function()
		{
			
		}
		
	}*/
}

function fnTab(){
	var oTab=id("banner");
	var oList=id("bannerOne");
	var oNum=id("num");
	var aLi=oNum.getElementsByTagName('a')
	var iNow=0;
	var iX=0;
	var iW=view().w;
	var oTimer=0;
	var iStartTouchX=0;
	var iStartX=0;
	oList.innerHTML+=oList.innerHTML;
	oList.style.width=oList.clientWidth*2+"px";
	bind(oTab,"touchstart",fnStart);
	bind(oTab,"touchmove",fnMove);
	bind(oTab,"touchend",fnEnd);
	auto();

	function auto(){
		oTimer=setInterval(function(){
			iNow++;	
			// iNow=iNow%aLi.length;
			tab();
		},2000);
	}
	function fnStart(ev){
		// oList.style.transition="none";
		clearInterval(oTimer);
		clearInterval(oList.timer);
		if(iNow<=0){
			iNow+=aLi.length;
			iX=-iNow*iW;
			css(oList, "translateX", iX);
		}
		ev=ev.changedTouches[0];
		iStartTouchX=ev.pageX;
		iStartX=iX;
	}
	function fnMove(ev){
		ev=ev.changedTouches[0];
		var iDis=ev.pageX-iStartTouchX;
		
		iX=iStartX+iDis;
		
		css(oList, "translateX", iX);

		
	}
	function fnEnd(){
		iNow=iX/iW;
		iNow=-Math.round(iNow);
		// if(iNow<0)
		// {
		// 	iNow=0;
		// }
		// if(iNow>aLi.length-1)
		// {
		// 	iNow=aLi.length-1;
		// }
		tab();
		auto();
	}
	function tab(){
		iX=-iNow*iW;
		// oList.style.transition="0.5s";
		// css(oList, "translateX", iX);
		// tweenMove(oList,{translateX:iX},300,"easeOut");

		if(iNow>=aLi.length){
			tweenMove(oList,{translateX:iX},300,"easeOut",function(){
				iNow=iNow%aLi.length;
				iX=-iNow*iW;
				css(oList, "translateX", iX);
			});
		}
		else{
			tweenMove(oList,{translateX:iX},300,"easeOut");
		}
		for(var i=0;i<aLi.length;i++){
			removeClass(aLi[i],"active");
		}
		addClass(aLi[iNow%aLi.length],"active");
	}
}

function shanXing(){
	$("#map area[shape='poly']").hover(function(){
	 i = $(this).index();
	 $(".sector a").eq(i).show();
	 $(".icon li").eq(i).show();
	},function(){
	 $(".sector a").eq(i).hide();
	 $(".icon li").eq(i).hide();
	});
	$("#map area[shape='circle']").hover(function(){
	 $(".home").addClass("over");
	},function(){
	 $(".home").removeClass("over");
	});
	$(".menu a").click(function(){
	 if($(this).attr("class") == "open"){
	  $(this).removeClass("open");
	  $(this).addClass("close");
	  $(".plate").removeClass("open");
	  $(".plate").addClass("close");
	 }else{
	  $(this).removeClass("close");
	  $(this).addClass("open");
	  $(".plate").removeClass("close");
	  $(".plate").addClass("open");
	 }
	});
}

function goTop(){
	var oTop = document.getElementById('goTop');
	var m = document.getElementById('mainPage');

	setInterval(function(){
		if(m.scrollTop>300){
			oTop.style.display = 'block';
		}else{
			oTop.style.display = 'none';
		}
	},100);

    bind(oTop,"touchstart",fnTop);
    function fnTop() {

        startMove(m, 0, -30);

    }
    fnTop();

    function startMove(obj, target, speed) {
        //清除定时器
        clearInterval(obj.iTimer);

        //开始定时器
        obj.iTimer = setInterval(function() {

            //获取当前值
            var currentValue = obj.scrollTop
            //用当前值+速度（增量) = 当前这一次定时器开启后要达到的值
            var value = currentValue + speed;

            if (speed < 0 && value < target || speed > 0 && value > target) {
                clearInterval(obj.iTimer);
                obj.scrollTop = target
            } else {
                obj.scrollTop = value
            }


        }, 16);

    }
}

function pfnTab(){
	var oTab=id("pNav");
	var oList=id("pl");
	var oNum=id("pNum");
	var aLi=oNum.getElementsByTagName('a')
	var iNow=0;
	var iX=0;
	var iW=parseFloat(css(oTab,"width"));
	var oTimer=0;
	var iStartTouchX=0;
	var iStartX=0;
	bind(oTab,"touchstart",fnStart);
	bind(oTab,"touchmove",fnMove);
	bind(oTab,"touchend",fnEnd);

	function fnStart(ev){	
		ev=ev.changedTouches[0];
		iStartTouchX=ev.pageX;
		iStartX=iX;
		oList.style.WebkitTransition=oList.style.transition="none";
	}
	function fnMove(ev){
		ev=ev.changedTouches[0];
		var iDis=ev.pageX-iStartTouchX;
		iX=iStartX+iDis;
		oList.style.WebkitTransform=oList.style.transform="translateX("+iX+"px)";
	}
	function fnEnd(ev){
		var iDis=ev.changedTouches[0].pageX-iStartTouchX;
		var iNub=Math.round(iDis/iW);
		iNow-=iNub;
		if(iNow<0){
			iNow=0;
		}
		if(iNow>=aLi.length){
			iNow=aLi.length-1;
		}
		iX=-iNow*iW;
		oList.style.WebkitTransition=oList.style.transition=".5s";
		for(var i=0;i<aLi.length;i++){
			aLi[i].className="";
		}
		aLi[iNow].className="active";
		oList.style.WebkitTransform=oList.style.transform="translateX("+iX+"px)";
	}
	
	for(var i=0;i<aLi.length;i++){
		aLi[i].index = i;
		aLi[i].ontouchstart = function(){
			for(var i=0;i<aLi.length;i++){
				aLi[i].className="";
			}
			aLi[this.index].className="active";
			oList.style.WebkitTransition=oList.style.transition=".5s";
			oList.style.WebkitTransform=oList.style.transform="translateX("+(-this.index*iW)+"px)";
		}

	}
	
}

function shangla(obj){
	var iStartTouchY=0;
	var iStartTouchX=0;
	bind(obj,"touchstart",fnStart);
	bind(obj,"touchmove",fnMove);
	bind(obj,"touchend",fnEnd);

	function fnStart(ev){
		
		ev=ev.changedTouches[0];
		iStartTouchX=ev.pageX;
		iStartTouchY=ev.pageY;
	}
	function fnMove(ev){
		ev=ev.changedTouches[0];
		var iDis=ev.pageX-iStartTouchX;
		var iDisy=ev.pageY-iStartTouchY;
		if((iDisy>=Math.abs(iDis))&&(obj.scrollTop==0)){
			obj.style.WebkitTransform=obj.style.transform="translateY(100px)";
		}
	}
	function fnEnd(ev){
		obj.style.WebkitTransform=obj.style.transform="translateY(0px)";
	}
}

function pOpen(){
	var pLeft = id("pLeft");
	var pRight = id("pRight");
	
	bind(pLeft,"touchstart",function(){
	
		open('taobao.html', '_self');
			
	})

}
var pa=null;
var pb=null;
var pc=1;
var pf=null;
var pe=[];
var s=''
var m=-1
var boff=true
function fnchoose(){
	var opSizein=id("pSizein");
	var aLi=opSizein.getElementsByTagName("li");
	var Img = id("Img");
	var pmoney = id("pmoney");
	var a=null;
	var b=null;
	var arr=['img2/32.jpg','img2/33.jpg','img2/34.jpg','img2/35.jpg','img2/36.jpg','img2/37.jpg','img2/38.jpg'];
	for(var i=0;i<aLi.length;i++){
		aLi[i].index = i;
		bind(aLi[i],"touchstart",function(){
			if(!this.className){
				for(var i=0;i<aLi.length;i++){
					aLi[i].className = '';
				}
				this.className = 'active';
				a=true;
				pa=this.innerHTML;
			}else{
				this.className = '';
				a=false;
			}
			var pSpe =id("pSpe");
			if(a&&b){
				pSpe.innerHTML = '<a href="#pPageWrap" data-rel="back" style="color:#fff;">加入购物车</a>';
			}else{
				pSpe.innerHTML = '加入购物车';
			}
		})
	}

	var opColorin=id("pColorin");
	var oLi=opColorin.getElementsByTagName("li");
	for(var j=0;j<oLi.length;j++){
		oLi[j].index = j;
		bind(oLi[j],"touchstart",function(){
			if(!this.className){
				for(var j=0;j<oLi.length;j++){
					oLi[j].className = '';
				}
				this.className = 'active';
				Img.src = arr[this.index];
				pmoney.innerHTML = '￥37.00';
				b=true;
				pb=this.innerHTML;
				pf=arr[this.index];
			}else{
				this.className = '';
				Img.src = 'img2/31.jpg';
				pmoney.innerHTML = '￥28.00-37.00';
				b=false;
			}
			var pSpe =id("pSpe");
			if(a&&b){
				pSpe.innerHTML = '<a href="#pPageWrap" data-rel="back" style="color:#fff;">加入购物车</a>';
			}else{
				pSpe.innerHTML = '加入购物车';
			}
		})
	}

	var opCom1=id("pCom1");
	var opCom2=id("pCom2");
	var opCom3=id("pCom3");
	var n=1

	bind(opCom1,"touchstart",function(){
		n--;
		if(n<1){
			n=1;
		}
		opCom2.value = n;
		pc=n;
	})

	bind(opCom3,"touchstart",function(){
		n++;
		if(n>1447){
			n=1447;
		}
		opCom2.value = n;
		pc=n;
	})
	
	var pSpe =id("pSpe");
	var pTan = id("pTan");
	var pTime1 = 0;

	bind(pSpe,"touchstart",function(){
		if(a&&b){
			var page2 = id("page2");
			if(page2.style.display == 'block'){
				var pTime2 = 0;
				var pTime3 = 0;
				var pd={};
				pd["chicun"] = pa;
				pd["yanse"] = pb;
				pd["shuliang"] = pc;
				pd["pic"] = pf;
				pe.push(pd);
				m++;
				var buy = id("buy");
				if(m){
					var bList = id("bList");
                	var bLi = bList.getElementsByTagName('li');
					for(var i=0;i<bLi.length;i++){
						var oInput = bLi[i].getElementsByTagName('input');
						var bSpan = bLi[i].getElementsByTagName('span');
						if(bSpan[0].innerHTML==pb&&bSpan[1].innerHTML==pa){
							oInput[1].value=parseFloat(oInput[1].value)+pc;
							boff=false;
						}
					}
					if(boff){
						var bList = id("bList");
						var lis = document.createElement('li');
						lis.className='bList1 clear';
						s='<div class="bCheck"><input type="checkbox" class="bCheck1"></div><div class="bImg"><img src="'+pf+'"></div><div class="bContent"><div>娅莱娅夏休闲鞋厚底增高运动鞋女<br>鞋透气跑鞋运动风阿甘鞋网纱板鞋</div><div class="bContent1">颜色分类:<span>'+pb+'</span>;尺码:<span>'+pa+'</span></div><div class="bContent2"><span class="bOld">￥238.00</span><span class="bXin">￥37.00</span><span class="bClast">X<input type="number" max="1447" min="1" value="'+pc+'" class="bClast1"></span></div><div class="bContent3" style="display:none;"><img src="img2/p10.png"></div></div>';
						lis.innerHTML=s;
						bList.insertBefore(lis,bList.children[0]);
					}
					boff=true;
				}else{
					s='<section id="bPage" class="pages pageShow" style="background:#eeeeee;"><ul class="b2Header clear"><li><a href="#pPageWrap" data-rel="back">&lt;&nbsp;返回</a></li> <li>&nbsp;购物车</li></ul><div class="bSpace"></div><ul class="bHeader clear" id="bHeader"><li class="bHeaderOne"><img src="img2/p9.png"></li><li class="bHeaderTwo">娅莱娅鞋类旗舰店</li><li class="bHeaderThree"><img src="img2/p5.png"></li></ul><ul class="bList" id="bList"><li class="bList1 clear"><div class="bCheck"><input type="checkbox" class="bCheck1"></div><div class="bImg"><img src="'+pf+'"></div><div class="bContent"><div>娅莱娅夏休闲鞋厚底增高运动鞋女<br>鞋透气跑鞋运动风阿甘鞋网纱板鞋</div><div class="bContent1"><span>'+pb+'</span>;尺码:<span>'+pa+'</span></div><div class="bContent2"><span class="bOld">￥238.00</span><span class="bXin">￥37.00</span><span class="bClast">X<input type="number" max="1447" min="1" value="'+pc+'" class="bClast1"></span></div><div class="bContent3" style="display:none;"><img src="img2/p10.png"></div></div></li></ul></section><div class="bFoot clear" id="bFoot"><div class="bFoot1"><input type="checkbox" class="bFoot4"><span>全选</span></div><div class="bFoot2">合计:￥<span class="bFoot5">0.00</span><br>不含运费</div><div class="bFoot3">结算</div></div><div id="pTan2" class="clear"><div class="pTan2One">你确定删除该宝贝？</div><div class="pTan2Two">确定</div><div class="pTan2Three">取消</div></div><div id="mask"></div>';
					buy.innerHTML=s;
				}

				pTime2=setInterval(function(){
					clearInterval(pTime2);
					var pTan1= id("pTan1");
					pTan1.style.display = 'block';
					tweenMove(pTan1,{opacity:100},600,"easeOut",function(){
						pTime3 = setInterval(function(){
							tweenMove(pTan1,{opacity:0},600,"easeOut",function(){
								pTan1.style.display = 'none';
								clearInterval(pTime3);
								bfn();
							})

						},1000)
					});
				},100)
			}
		}else{

			pTan.style.display = 'block';
			tweenMove(pTan,{opacity:100},600,"easeOut",function(){
				pTime1 = setInterval(function(){
					tweenMove(pTan,{opacity:0},600,"easeOut",function(){
						pTan.style.display = 'none';
						clearInterval(pTime1);
					})

				},1000)
			});
		}
	})

}
var bPrice=0
function bfn(){
	var bHeader = id("bHeader");
	var bPage = id("bPage");
	var bList= id("bList");
	var oInput = bList.getElementsByTagName('input');
	var bFoot = id("bFoot");
	var oSpan = bFoot.getElementsByTagName('span');
	var bquan = bFoot.getElementsByTagName('input');

	 bHeader.children[0].ontouchstart = function(){
	 // bind(bHeader.children[0],"touchstart",function(){
		console.log(this.innerHTML)
		if(this.innerHTML=='<img src="img2/p9.png">'){
			this.innerHTML='<img src="img2/p8.png">';
			for(var i=0;i<oInput.length;i++){
				if(i%2==0){
					oInput[i].className = 'bCheck1 img';
				}
			}
			if(bPrice){
				bPrice=0;
			}
			for(var j=0;j<bList.children.length;j++){
				var bSpan = bList.children[j].getElementsByTagName('span');
				var bInput = bList.children[j].getElementsByTagName('input');
					
				bPrice=parseFloat(bPrice)+parseFloat(bSpan[3].innerHTML.substring(1))*parseFloat(bInput[1].value);	
			}
			bquan[0].className = 'bFoot4 imgage';

			oSpan[1].innerHTML=bPrice;

		}else{
			this.innerHTML='<img src="img2/p9.png">';

			for(var i=0;i<oInput.length;i++){
				if(i%2==0){
					oInput[i].className = 'bCheck1';
				}
			}
			bquan[0].className = 'bFoot4';

			bPrice=0;

			oSpan[1].innerHTML=0.00;
		}
	}

	  bquan[0].ontouchstart = function(){
	   // bind(bquan[0],"touchstart",function(){
		
		if(this.className =='bFoot4'){
			this.className ='bFoot4 imgage';
			for(var i=0;i<oInput.length;i++){
				if(i%2==0){
					oInput[i].className = 'bCheck1 img';
				}
			}
			if(bPrice){
				bPrice=0;
			}
			for(var j=0;j<bList.children.length;j++){
				var bSpan = bList.children[j].getElementsByTagName('span');
				var bInput = bList.children[j].getElementsByTagName('input');
					
				bPrice=parseFloat(bPrice)+parseFloat(bSpan[3].innerHTML.substring(1))*parseFloat(bInput[1].value);
					
			}
			bHeader.children[0].innerHTML='<img src="img2/p8.png">';

			oSpan[1].innerHTML=bPrice;


		}else{
			this.className ='bFoot4';

			for(var i=0;i<oInput.length;i++){
				if(i%2==0){
					oInput[i].className = 'bCheck1';
				}
			}
			bHeader.children[0].innerHTML='<img src="img2/p9.png">';

			bPrice=0;

			oSpan[1].innerHTML=0.00;
		}
	}

	for(var t=0;t<oInput.length;t++){
		if(t%2==0){
			oInput[t].index=t;
			oInput[t].ontouchstart = function(){
			// bind(oInput[t],"touchstart",function(){
				var boff=true;
				if(this.className=='bCheck1'){
					this.className='bCheck1 img';

					var bSpan1 = bList.children[this.index/2].getElementsByTagName('span');
					var bInput1 = bList.children[this.index/2].getElementsByTagName('input');
					
					bPrice=parseFloat(bPrice)+parseFloat(bSpan1[3].innerHTML.substring(1))*parseFloat(bInput1[1].value);

					oSpan[1].innerHTML=bPrice;

					for(var n=0;n<oInput.length;n++){
						if(n%2==0){
							if(oInput[n].className=='bCheck1'){
								boff=false;
							}
						}
					}
					if(boff){
						bHeader.children[0].innerHTML='<img src="img2/p8.png">';
						bquan[0].className = 'bFoot4 imgage';
					}
				}else{
					this.className='bCheck1';
					bHeader.children[0].innerHTML='<img src="img2/p9.png">';
					bquan[0].className = 'bFoot4';
					var bSpan1 = bList.children[this.index/2].getElementsByTagName('span');
					var bInput1 = bList.children[this.index/2].getElementsByTagName('input');
					bPrice=parseFloat(bPrice)-parseFloat(bSpan1[3].innerHTML.substring(1))*parseFloat(bInput1[1].value);
					oSpan[1].innerHTML=bPrice;
				}
			}
		}
	};
	var bContent3 = document.getElementsByClassName('bContent3')
 		for(var i=0;i<bContent3.length;i++){
 			bContent3[i].index=i;
 			bContent3[i].ontouchstart = function(){
 				var pTan2 = id("pTan2");
 				var mask = id("mask");
 				var inow= this.index;
 				pTan2.style.display = 'block';
 				mask.style.display = 'block';
 				tweenMove(pTan2,{opacity:100},600,"easeOut");
 				tweenMove(mask,{opacity:100},600,"easeOut");
 				pTan2.children[1].ontouchstart = function(){
 					tweenMove(pTan2,{opacity:0},600,"easeOut");
	 				tweenMove(mask,{opacity:0},600,"easeOut");
	 				pTan2.style.display = 'none';
	 				mask.style.display = 'none';
	 				var bSpan1 = bContent3[inow].parentNode.parentNode.getElementsByTagName('span');
					var bInput1 = bContent3[inow].parentNode.parentNode.getElementsByTagName('input');
					if(bInput1[0].className =='bCheck1 img'){
						bPrice=parseFloat(bPrice)-parseFloat(bSpan1[3].innerHTML.substring(1))*parseFloat(bInput1[1].value);
						oSpan[1].innerHTML=bPrice;
					}
	 				
					bContent3[inow].parentNode.parentNode.parentNode.removeChild(bContent3[inow].parentNode.parentNode);
					if(bList.innerHTML==''){
						buy.innerHTML='<section id="bPage" class="pages pageShow" style="background:#eeeeee;"><ul class="b2Header clear"><li><a href="#pPageWrap" data-rel="back">&lt;&nbsp;返回</a></li> <li>&nbsp;购物车</li></ul><div class="bSection clear" id="bSection"><div class="clear bTWap"><div class="bT"></div></div><div class="bT1">购物车快饿瘪了T.T</div><div class="bT2">主人快给我挑点宝贝吧</div><div class="bT3">去逛逛</div></div><ul id="bin"></ul></section>';
						m=-1;
					}else{
						bfn();	
					}
	 				
 				}
 				pTan2.children[2].ontouchstart = function(){
	 				tweenMove(pTan2,{opacity:0},600,"easeOut");
	 				tweenMove(mask,{opacity:0},600,"easeOut");
	 				pTan2.style.display = 'none';
	 				mask.style.display = 'none';
 				}
 			}
 		}

	 bHeader.children[2].ontouchstart = function(){
	 	if(this.innerHTML=='<img src="img2/p5.png">'){
	 		this.innerHTML='<img src="img2/p6.png">';
	 		var bContent3 = document.getElementsByClassName('bContent3')
	 		for(var i=0;i<bContent3.length;i++){
	 			bContent3[i].style.display = 'block';
	 		}
	 	}else{
	 		this.innerHTML='<img src="img2/p5.png">';
	 		var bContent3 = document.getElementsByClassName('bContent3')
	 		for(var i=0;i<bContent3.length;i++){
	 			bContent3[i].style.display = 'none';
	 		}
	 	}

	 } 


}
