function Coursel(options){
		//1.罗列属性
		this.box  = document.getElementById(options.id);
		this.width = options.width;
		this.height = options.height;
		this.img = options.img;
		this.oUlImg = null;
		this.oLeftBtn = null;
		this.oRightBtn = null;
		this.oUlBtns = null;


		//设置轮播图时间
		this.playtime =options.playtime;

		//默认显示第一张图片
		this.now = 0;

		//2.初始化页面
		this.init();
		
		//3.绑定事件
		this.bindEvent();

		//4.是否轮播
		if(this.playtime){
			this.auto()
		}
	}
	Coursel.prototype.init = function(){
		//给外层父容器添加样式
		this.box.style.position = "relative";//父容器为相对定位
		this.box.style.width = this.width + "px";
		this.box.style.height = this.height + "px";//设置盒子的宽高
		//1.生成图片父容器
		this.oUlImg = document.createElement('ul');
		//限制图片父容器宽高
		this.oUlImg.style.width = "100%";//图片的宽等于外层的100%
		this.oUlImg.style.height = "100%";//图片的高等于外层的100%
		//生成每一个li
		for(var i =0;i<this.img.length;i++){
			//生成li
			var oLi = document.createElement('li');
			//设置li的样式
			oLi.style.width = "100%";//每个li的宽度为100%
			oLi.style.height = "100%";//每个li的高度为100%
			oLi.style.position = "absolute";//设置li为绝对定位，
			oLi.style.top = 0;//相对外层父容器的top值为零
			oLi.style.left = 0;//相对外层父容器的left值为零
			//默认显示第一章图片
			if(i == 0){
				oLi.style.zIndex = 99;//默认显示第一张图片
			}
			//生成图片
			var oImg = document.createElement('img');
			oImg.src = this.img[i];//图片的src是img的i值

			//将图片插入到li中
			oLi.appendChild(oImg);

			//将li插入到图片父容器中
			this.oUlImg.appendChild(oLi);
		}

		//2.生成左右按钮
		this.oLeftBtn = document.createElement("span");
		this.oRightBtn = document.createElement("span");
		//给按钮添加样式
		this.oLeftBtn.className = 'leftbtn';//设置类名
		this.oRightBtn.className = 'rightbtn';//设置类名
		//改变按钮显示等级
		this.oLeftBtn.style.zIndex = "999";
		this.oRightBtn.style.zIndex = "999";//按钮的显示等级大于图片
		//左右按钮添加内容
		this.oLeftBtn.innerHTML = "&lt;";//左边按钮为小于号
		this.oRightBtn.innerHTML = "&gt;";//右边按钮为大于号

		//3.生成底部按钮
		this.oUlBtns = document.createElement('ul');
		//改变底部按钮显示等级
		this.oUlBtns.style.zIndex = 999;
		//给底部按钮添加样式
		this.oUlBtns.className = "bottombtn";
		for(var j = 0;j<this.img.length;j++){
			var oLi = document.createElement('li');//创建一个新li

			//默认第一个被选中
			if(j == 0){
				oLi.className = "active";//
			}
			this.oUlBtns.appendChild(oLi);//在按钮列表中添加列表
		}


		//将图片父容器插入到外层父容器中
		this.box.appendChild(this.oUlImg);
		//将左右按钮插入到外层父容器中
		this.box.appendChild(this.oLeftBtn);
		this.box.appendChild(this.oRightBtn);
		//将按钮父容器插入到外层父容器中
		this.box.appendChild(this.oUlBtns);
		//通过js控制底部按钮的位子
		this.oUlBtns.style.marginLeft = -this.oUlBtns.offsetWidth*0.5 + "px";
	}

	Coursel.prototype.bindEvent = function(){
		//1.给右箭头绑定点击事件
		var _this = this;//将this存起来
		this.oRightBtn.onclick = function(){
			_this.now++;
			if(_this.now > _this.img.length - 1){
				_this.now = 0;//到最后一张图片时，返回第一张图片
			}
			_this.tab();
		}
		//2.给左箭头绑定点击事件
		this.oLeftBtn.onclick = function(){
			_this.now--;
			if(_this.now < 0){
				_this.now = _this.img.length - 1;//点到第一张后，返回最后一张图片
			}
			_this.tab();
		}
		//3.给底部按钮添加事件
		for(var j = 0;j<this.oUlBtns.children.length;j++){
			this.oUlBtns.children[j].index = j;//将底部按钮的j值存起来
			this.oUlBtns.children[j].onclick = function(){
				_this.now = this.index;
				_this.tab();
			}
		}
	}
	Coursel.prototype.tab = function(){
		/*
		for(var i=0;i<aImg.length;i++){
			aImg[i].style.zIndex = 0;
			aBtns[i].className = "coursel-btns-item";
		}
		aImg[nowIndex].style.zIndex = 9;
		aBtns[nowIndex].className = "coursel-btns-item active";
		*/
		for(var i = 0;i<this.oUlImg.children.length;i++){
			this.oUlImg.children[i].style.zIndex = 0;//设置前一个图片的zindex值为零
			this.oUlImg.children[i].style.opacity = 0.2;//设置前一个图片的透明度为0.2
			this.oUlBtns.children[i].className = "";//设置前一个图片的类名为空
		}
		this.oUlImg.children[this.now].style.zIndex = "99";//设置当前图片的zindx值为99
		this.oUlImg.children[this.now].style.opacity = 1;//设置当前图片的透明度为1
		this.oUlBtns.children[this.now].className = "active";//设置当前按钮的类名为active
	}
    Coursel.prototype.auto=function(){
    	var _this =this;
    	//设置定时器
    	timer =0;
    	//自动轮播
    	timer =setInterval(this.oRightBtn.onclick, this.playtime);

    	//鼠标移入停止动画
    	this.box.onmouseover =function(){
    		clearInterval(timer);
    	}
    	//鼠标移出开始动画
        this.box.onmouseout =function(){
    		timer =setInterval(_this.oRightBtn.onclick, _this.playtime);
    	}
    }
	new Coursel({
		id:"carousel",
		width:1224,
		height:460,
		img:["./images/b1.jpg","./images/b2.jpg","./images/b3.jpg"],
		playtime:1000
	})