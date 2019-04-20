$(document).ready(function(){	
	$('.name__error-message').hide();
	$('.email__error-message').hide();
	$('.message__error-message').hide();
	let menuLink = $('.main-menu-link');
	let errorUserName = false;	
	let errorEmail = false;
	let errorMessage = false;	

	$('.form-input__name').focusout(function() {
		checkUserName();		
	});
	$('.form-input__email').focusout(function() {
		checkEmail();		
	});
	$(".form-textarea__message").focusout(function() {
		checkMessage();		
	});

	const nodes = [].slice.call(document.querySelectorAll('.portfolio-item'), 0);
	const directions = { 0: 'top', 1: 'right', 2: 'bottom', 3: 'left' };
	const classNames = ['in', 'out'].map(p => Object.values(directions).map(d => `${p}-${d}`)).reduce((a, b) => a.concat(b));

	const getDirectionKey = (ev, node) => {
		const { width, height, top, left } = node.getBoundingClientRect();
		const l = ev.pageX - (left + window.pageXOffset);
		const t = ev.pageY - (top + window.pageYOffset);		
		const x = (l - width / 2) * (width > height ? height / width : 1);
		const y = (t - height / 2) * (height > width ? width / height : 1);		
		
		return Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
	};
	class Item {
		constructor(element) {
			this.element = element;
			this.element.addEventListener('mouseover', ev => this.update(ev, 'in'));
			this.element.addEventListener('mouseout', ev => this.update(ev, 'out'));
	}

	update(ev, prefix) {
		this.element.classList.remove(...classNames);
		this.element.classList.add(`${prefix}-${directions[getDirectionKey(ev, this.element)]}`);
	}}
	nodes.forEach(node => new Item(node));

	setTimeout(setProgress,500);
	pageTransition();	
	formValidation();
	
	function pageTransition(){
		menuLink.click(function(event){
			event.preventDefault();
			let clickedMenuLink = event.currentTarget;
			if(($(clickedMenuLink).is( '.main-menu-link_active')) || ($('.page__active').is('.page-rotateCubeLeftOut')))
			{
				return false;
			}
			else
			{
				menuLink.removeClass('main-menu-link_active');
				$(clickedMenuLink).addClass('main-menu-link_active');
				let href = $(this).attr('href');
				$('.page__active').addClass(' page-rotateCubeLeftOut');
				$(href).addClass('page__active page-rotateCubeLeftIn');
				setTimeout(function(){
					$('.page-rotateCubeLeftOut').removeClass('page__active page-rotateCubeLeftOut');
					$(href).removeClass('page-rotateCubeLeftIn');
				},1000)
			}
		})
	}
	function setProgress() {
		let circle = $('.progress-circle');		
		let progressItem = $('.progress-item');
		for(i=0; i<circle.length; i++)
		{
			var radius = circle[i].r.baseVal.value;		
			var circumference = radius * 2 * Math.PI;
			circle[i].style.strokeDasharray = `${circumference} ${circumference}`;			
			circle[i].style.display="block";
			$(progressItem[i]).addClass( "flicker-in");
			const offset = circumference - circle[i].innerHTML / 100 * circumference;
			circle[i].style.strokeDashoffset = offset;
		}
	}	
	function formValidation(){	
		$('.contact-form').submit(function() {			
			checkUserName();
			checkEmail();
			checkMessage();

			if(errorUserName == false && errorEmail == false && errorMessag == false){
				return true;
			} else {
				return false;	
			}			
		})
	}
	function checkUserName(){
		let userName = $('.form-input__name').val().length;
		
		if(userName >= 1) {	
			errorUserName = false;	
			$('.name__error-message').fadeOut(1000);		
		} else {
			errorUserName = true;
			$('.name__error-message').fadeIn(1000);		
		}
	}
	function checkEmail(){
		var pattern = new RegExp(/^(?!.*@.*@.*$)(?!.*@.*\-\-.*\..*$)(?!.*@.*\-\..*$)(?!.*@.*\-$)(.*@.+(\..{1,11})?)$/i);		
		if(pattern.test($('.form-input__email').val())) {
			errorEmail = false;			
			$('.email__error-message').fadeOut(1000);
		} else {				
			$('.email__error-message').fadeIn(1000);		
		}
	}
	function checkMessage(){
		let messageText = $('.form-textarea__message').val().length;
		
		if(messageText >= 1) {	
			errorMessage = false;	
			$('.message__error-message').fadeOut(1000);		
		} else {
			errorMessage = true;
			$('.message__error-message').fadeIn(1000);		
		}
	}
})