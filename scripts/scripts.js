$(document).ready(function(){
	/*console.clear();	*/
	$('.name__error-message').hide();
	$('.email__error-message').hide();
	$('.message__error-message').hide();
	let menuLink = $('.main-menu-link');
	let menuToggle = $(".menu-toggle");
	let mainMenu = $(".main-menu-list");
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
	$(".portfolio-item").hover(function(e){
		var width = this.getBoundingClientRect().width;
		var height = this.getBoundingClientRect().height;
		var top = this.getBoundingClientRect().top;
		var left = this.getBoundingClientRect().left;
		const l = e.pageX - (left + window.pageXOffset);
		const t = e.pageY - (top + window.pageYOffset);			
		const x = (l - width / 2) * (width > height ? height / width : 1);
		const y = (t - height / 2) * (height > width ? width / height : 1);	
		var direction = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
		
		let check = $(this).is('[class*="in-"]');

		
		switch (direction) 
		{
		case 0: 
		if(!check){
			/*$(this).remove('[class*="in-"]');*/
			$(this).removeClass (function (index, css) {
			   return (css.match (/(^|\s)out-\S+/g) || []).join(' ');
			});
			$(this).addClass('in-top');
			
		}
		else{			
			$(this).addClass('out-top');
			/*$(this).replace('[class*="in-"]');*/
			$(this).removeClass (function (index, css) {
			   return (css.match (/(^|\s)in-\S+/g) || []).join(' ');
			});
		}		
			
		break;

		case 1: 
			if(!check){
				$(this).removeClass (function (index, css) {
			   return (css.match (/(^|\s)out-\S+/g) || []).join(' ');
				});
			$(this).addClass('in-right');
			}
			else{	
				$(this).addClass('out-right');
				$(this).removeClass (function (index, css) {
			   return (css.match (/(^|\s)in-\S+/g) || []).join(' ');
				});
			}
		break;

		case 2:
			if(!check){
				$(this).removeClass (function (index, css) {
			   return (css.match (/(^|\s)out-\S+/g) || []).join(' ');
				});
			$(this).addClass('in-bottom');
			}
			else{	
				$(this).addClass('out-bottom');
				$(this).removeClass (function (index, css) {
			   return (css.match (/(^|\s)in-\S+/g) || []).join(' ');
				});
			}
		break;

		case 3: 
			if(!check){
				$(this).removeClass (function (index, css) {
			   return (css.match (/(^|\s)out-\S+/g) || []).join(' ');
				});
			$(this).addClass('in-left');
			}
			else{	
				$(this).addClass('out-left');
				$(this).removeClass (function (index, css) {
			   return (css.match (/(^|\s)in-\S+/g) || []).join(' ');
				});
			}
		break;
		}
	});

	setTimeout(setProgress,300);
	pageTransition();	
	formValidation();
	activateMenu();
	deactivateMenu();
	
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
	function activateMenu(){
		menuToggle.click(function(){
			menuToggle.toggleClass('toggle__active');
			mainMenu.toggleClass('main-menu__active');
		})
	}
	function deactivateMenu(){
		$(document).click(function (e){
			if (!mainMenu.is(e.target) && mainMenu.has(e.target).length === 0 && !menuToggle.is(e.target) && menuToggle.has(e.target).length === 0) {
				menuToggle.removeClass('toggle__active');
				mainMenu.removeClass('main-menu__active');
			}
		});	
		$('.main-menu-list li').click(function(){
			menuToggle.removeClass('toggle__active');
			mainMenu.removeClass('main-menu__active');
		});	
	}
})