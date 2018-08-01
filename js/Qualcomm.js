// 选择框
const PANG = {
	data:{
		nCarouselItemWidth: $('.teacher-item').width(),
		initial: 0,
		itemLen: $('.teacher-item').length,
		windowWidth: $('.teacher-container').width(),
		nCarouselLock:false,
		navigationHeight:70,
		navigationArray:['roll-1','roll-2','roll-3','roll-4','roll-5'],
		oneHeigth:426,
		navigationLock:false,


	},
	init:function(){
		$('.list-name').on('click',this.zoom);
		// 轮播操作
		this.handle();
		// 轮播附加数据
		this.additionalData();
		this.bind();
		this.addition();
		this.roll();
	},
	zoom:function(e){
		let parentLevel = $(this).parent();
		console.log(parentLevel);
		$(parentLevel).toggleClass('active');
		console.log(1);
	},
	handle:function(){
		$('#bottom-left').on('click',this.leftmove);
		$('#bottom-right').on('click',this.rightmove);
		console.log(PANG.data.itemLen);
	},
	additionalData:function(){
		let itemLen = this.data.itemLen;
		console.log(itemLen);
		let nCarouselItemWidth = this.data.nCarouselItemWidth;
		let windowWidth = this.data.windowWidth;
		let atPresent = windowWidth/nCarouselItemWidth;
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
		$('.teacher-list').css('left', - nCarouselItemWidth * atPresent + 'px');
	},
	leftmove:function(){
		let initial = PANG.data.initial - 1;
		PANG.move(initial);

	},
	rightmove:function(){
		console.log(1);
		let initial = PANG.data.initial + 1;
		PANG.move(initial);
	},
	move:function(numericalValue){
		let nCarouselItemWidth = PANG.data.nCarouselItemWidth;
		let itemLen = PANG.data.itemLen;
		let windowWidth = PANG.data.windowWidth;
		let astrict = windowWidth / nCarouselItemWidth;
		let movingRange = (nCarouselItemWidth * astrict  + nCarouselItemWidth * numericalValue);
		let teacherList = $('.teacher-list');
		let nCarouselLock = PANG.data.nCarouselLock;
		if (!nCarouselLock) {
			PANG.data.nCarouselLock = true;
		} else {
			return
		}
		$('.teacher-list').animate({
			'left': - movingRange + 'px'
		},500,function(){
			if (numericalValue == -1) {
				console.log('99')
				numericalValue = itemLen - 1;
				teacherList.css('left', - nCarouselItemWidth * (astrict + numericalValue) + 'px');
			}
			if (numericalValue == itemLen ) {
				console.log(itemLen);
				console.log(numericalValue);
				numericalValue = 0;
				teacherList.css('left', - nCarouselItemWidth * astrict  + 'px');
			}
			PANG.data.initial = numericalValue;
			PANG.data.nCarouselLock = false;
		})
			
			
	},
	bind:function(){
		$('.navigation-nav a').on('click',PANG.arrive);
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
		let oneHeigth = PANG.data.oneHeigth;
		if (showDistance >= oneHeigth) {
			$('.navigation-fixed').addClass('roll')
		} else {
			$('.navigation-fixed').removeClass('roll')
		}
		PANG.bright();

	},
	arrive:function(){
		let navigationLock = PANG.data.navigationLock;
		if (navigationLock) {
			return
		} else {
			PANG.data.navigationLock = true;

		}
		let nature = $(this).data('roll');
		let movingRange = $(`#${nature}`).offset().top;
		console.log(movingRange);
		let navigationHeight = PANG.data.navigationHeight;
		movingRange = movingRange - navigationHeight;
		console.log(movingRange);
		$('html,body').stop();
		$('html,body').animate({
			scrollTop:movingRange
		},1000)
		PANG.data.navigationLock = false;
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
PANG.init();












