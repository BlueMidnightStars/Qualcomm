// 选择框
const PANG = {
	init:function(){
		$('.list-name').on('click',this.zoom);
	},
	zoom:function(e){
		let parentLevel = $(this).parent();
		console.log(parentLevel);
		$(parentLevel).toggleClass('active');
		console.log(1);
	}
}
PANG.init();
// 轮播
const nCarousel = {
	data:{
		itemWidth: $('.teacher-item').width(),
		initial: 0,
		itemLen: $('.teacher-item').length,
		windowWidth: $('.teacher-container').width(),
		lock:false,

	},
	init:function(){
		// 操作
		this.handle();
		// 附加数据
		this.additionalData();
	},
	handle:function(){
		$('#bottom-left').on('click',this.leftmove);
		$('#bottom-right').on('click',this.rightmove);
		console.log(nCarousel.data.itemLen)
	},
	additionalData:function(){
		let itemLen = this.data.itemLen;
		console.log(itemLen);
		let itemWidth = this.data.itemWidth;
		let windowWidth = this.data.windowWidth;
		let atPresent = windowWidth/itemWidth;
		console.log(atPresent);
		// 克隆结尾三个
		let endingClone = [];
		// 每次单独克隆一个返回给endingClone数组
		for (var i = atPresent; i > 0; i--) {
			let ending = $('.teacher-item').eq(itemLen - i).clone();
			endingClone.push(ending);
		}
		console.log(endingClone);
		// 克隆开头三个
		let frontClone = [];
		// 每次单独克隆一个返回给frontClone数组
		for (var i = 0; i <= atPresent - 1; i++) {
			let front = $('.teacher-item').eq(i).clone();
			frontClone.push(front);
		}
		console.log(frontClone);
		// 开头克隆三个插入结尾
		$('.teacher-list').append(frontClone);
		// 结尾克隆三个插入开头
		$('.teacher-list').prepend(endingClone);
		// 切换到原先第一个的位置
		$('.teacher-list').css('left', - itemWidth * atPresent + 'px');
		// let front = $('.teacher-item').eq(0).clone();
		// let ending = $('.teacher-item').eq(itemLen - 1).clone();
		// $('.teacher-list').append(front);
		// $('.teacher-list').prepend(ending);
		// $('.teacher-list').css('left', - itemWidth + 'px');
	},
	leftmove:function(){
		let initial = nCarousel.data.initial - 1;
		nCarousel.move(initial);

	},
	rightmove:function(){
		console.log(1);
		let initial = nCarousel.data.initial + 1;
		nCarousel.move(initial);
	},
	move:function(numericalValue){
		let itemWidth = nCarousel.data.itemWidth;
		let itemLen = nCarousel.data.itemLen;
		let windowWidth = nCarousel.data.windowWidth;
		let astrict = windowWidth / itemWidth;
		let movingRange = (itemWidth * astrict  + itemWidth * numericalValue);
		let teacherList = $('.teacher-list');
		let lock = nCarousel.data.lock;
		if (!lock) {
			nCarousel.data.lock = true;
		} else {
			return
		}
		$('.teacher-list').animate({
			'left': - movingRange + 'px'
		},500,function(){
			if (numericalValue == -1) {
				console.log('99')
				numericalValue = itemLen - 1;
				teacherList.css('left', - itemWidth * (astrict + numericalValue) + 'px');
			}
			if (numericalValue == itemLen ) {
				console.log(itemLen);
				console.log(numericalValue);
				numericalValue = 0;
				teacherList.css('left', - itemWidth * astrict  + 'px');
			}
			nCarousel.data.initial = numericalValue;
			nCarousel.data.lock = false;
		})
			
			
	}
}
nCarousel.init();




// 导航
const navigation = {
	data:{
		navigationHeight:70,
		navigationArray:['roll-1','roll-2','roll-3','roll-4','roll-5'],
		item:100,
		judgeItem:0,
		oneHeigth:426,
		lock:false,

	},
	init:function(){
		this.bind();
		this.addition();
		this.roll();
	},
	bind:function(){
		$('.navigation-nav a').on('click',navigation.arrive);
		$(window).on('scroll',this.roll)
	},
	addition:function(){
		let navigationArray = this.data.navigationArray;
		let movingRange = (navigationArray).map((data) =>{
			return {key:data,
					aange:$(`#${data}`).offset().top,
				}
		})
		console.log(movingRange);
		this.data.navigationArray = movingRange;

	},
	roll:function(){
		let showDistance = $(window).scrollTop();
		console.log(showDistance);
		let oneHeigth = navigation.data.oneHeigth;
		if (showDistance >= oneHeigth) {
			$('.navigation-fixed').addClass('roll')
		} else {
			$('.navigation-fixed').removeClass('roll')
		}
		navigation.bright();

	},
	arrive:function(){
		let lock = navigation.data.lock;
		if (lock) {
			return
		} else {
			navigation.data.lock = true;

		}
		let nature = $(this).data('roll');
		let movingRange = $(`#${nature}`).offset().top;
		console.log(movingRange);
		let navigationHeight = navigation.data.navigationHeight;
		movingRange = movingRange - navigationHeight;
		console.log(movingRange);
		$('html,body').animate({
			scrollTop:movingRange
		},1000)
		navigation.data.lock = false;
	},
	bright:function(){
		let showDistance = $(window).scrollTop();
		let navigationArray = this.data.navigationArray;
		let navigationHeight =  this.data.navigationHeight;
		let storage = '';
		navigationArray.forEach((data) => {
			if (showDistance >= data.aange - navigationHeight) {
				storage = data.key;
			}
			
		})
		$('.navigation-nav a').removeClass('active');
		$(`.navigation-nav a[data-roll="${storage}"]`).addClass('active');
	}

}
navigation.init();






