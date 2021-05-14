import './styles/main.scss'
import './js/img'
import * as $ from 'jquery'
import sal from 'sal.js'




// const $el = document.querySelector('.wrapper');
// $el.addEventListener('wheel', () => {
//     window.scrollTo(0,document.querySelector("section").scrollHeight);
// })

$(document).ready(function($) {

	//animation
	// if ((window.innerWidth > 1130)&&(document.title==='Главная')) {
	// 	sal();
	// } else {
	// 	$('h2').removeAttr('data-sal');
	// 	$('h3').removeAttr('data-sal');
	// 	$('div').removeAttr('data-sal');
	// 	$('ul').removeAttr('data-sal');
	// 	$('footer').removeAttr('data-sal');
	// }

    //func animates burger menu lines/cross
    // $('.icon-menu').on("click", function(){
    //     $('.icon-menu').toggleClass('active');
    //     $('.menu__body').toggleClass('active');
    //     $('.menu__list').toggleClass('hidden');
    //     $('body').toggleClass('lock');
    // });

    //func modals form
	$('.popup-order').click(function() {
		$('.popup-fade').fadeIn();
		return false;
	});	
	
	$('.popup-close').click(function() {
		$(this).parents('.popup-fade').fadeOut();
		return false;
	});		

	$(document).keydown(function(e) {
		if (e.keyCode === 27) {
			e.stopPropagation();
			$('.popup-fade').fadeOut();            
		}
	});
	
	$('.popup-fade').click(function(e) {
		if ($(e.target).closest('.popup').length == 0) {
			$(this).fadeOut();
            
		}
	});
	//func modals reply
    $('.popup-reply').click(function() {
		$('.popup-fade__reply').fadeIn();
        $('.popup-fade').fadeOut();  
		return false;
	});	
	
	$('.popup-close__reply').click(function() {
		$(this).parents('.popup-fade__reply').fadeOut();
		return false;
	});		

	$(document).keydown(function(e) {
		if (e.keyCode === 27) {
			e.stopPropagation();
			$('.popup-fade__reply').fadeOut();            
		}
	});
	
	$('.popup-fade__reply').click(function(e) {
		if ($(e.target).closest('.popup').length == 0) {
			$(this).fadeOut();
            
		}
	});

		//func accordion
		// $('#accordion > div').hide();
		// $('.accordion__title').on("click", function(){
		// 	$(this).toggleClass('active'); 
		// 	$(this).next('div').slideToggle('.accordion__content');
		// });
});


//js
//ready
var ready = (callback) => {
	if (document.readyState != "loading") callback();
	else document.addEventListener("DOMContentLoaded", callback);
}

ready(() => { 
	/*  Начинаем работу после полной загрузки DOM */ 

	//burger menu var
	let $iconMenu = document.querySelector('.icon-menu');
	let $menuBody = document.querySelector('.menu__body');
	let $menuList = document.querySelector('.menu__list');
	let $body = document.querySelector('body');
	//burger on click fuunck
	$iconMenu.addEventListener('click', () => {
		$iconMenu.classList.toggle('active');
		$menuBody.classList.toggle('active');
		$menuList.classList.toggle('hidden');
		$body.classList.toggle('lock');
	});


	//animation var
	// $h2 = document.querySelectorAll('h2');
	// $h3 = document.querySelectorAll('h3');
	// $div = document.querySelectorAll('div');
	// $ul = document.querySelectorAll('ul');
	// $footer = document.querySelectorAll('footer');

	//animation
	let $animation = document.querySelectorAll('[data-sal]')
	if ((window.innerWidth > 1130)&&(document.title==='Главная')) {
		sal();
	} else {
		$animation.forEach(item => item.removeAttribute('data-sal'));
	}
});


/*
import './styles/main.scss'
import './js/img'
import sal from 'sal.js'

/*js*/
//ready
/*
var ready = (callback) => {
	if (document.readyState != "loading") callback();
	else document.addEventListener("DOMContentLoaded", callback);
}

ready(() => { 
	/*  Начинаем работу после полной загрузки DOM */ 

// 	//burger menu var
// 	let $iconMenu = document.querySelector('.icon-menu');
// 	let $menuBody = document.querySelector('.menu__body');
// 	let $menuList = document.querySelector('.menu__list');
// 	let $body = document.querySelector('body');
// 	//burger on click funck
// 	$iconMenu.addEventListener('click', () => {
// 		$iconMenu.classList.toggle('active');
// 		$menuBody.classList.toggle('active');
// 		//$menuList.classList.toggle('hidden');
// 		$body.classList.toggle('lock');
// 	});

// 	//drop-down accordion
// 	//var
// 	let categoryContent;
// 	let category = document.querySelector('#category');

// 	category.addEventListener("click", function(event) {
// 		let target = event.target;  //клик по плашке
// 		if (target.tagName != 'DIV') return; 
// 		if (target.nextElementSibling.style.display === "block"){
// 			target.nextElementSibling.style.display = "none"
// 			categoryContent.parentElement.classList.remove('drop-down__border');
// 			categoryContent.style.border = "";
// 		} else {
// 		openSubcategory(target);
// 		}
// 	});
// 	function openSubcategory(div){
// 		if (categoryContent){
// 			categoryContent.nextElementSibling.style.display = "none";
// 			categoryContent.parentElement.classList.remove('drop-down__border');
// 			categoryContent.style.border = "";
// 			} 
// 		categoryContent = div;
// 		categoryContent.nextElementSibling.style.display = "block";		
// 		categoryContent.style.border = "none";
// 		categoryContent.parentElement.classList.add('drop-down__border');
// 	}

// 	//selectedTd === node
// 	// let $categoryItem = document.querySelectorAll('.category__item');
// 	// let $subcategory = document.querySelectorAll('.subcategory');
// 	// $categoryItem.forEach(item => item.addEventListener("click", () => {		
// 	// 	if (item.lastElementChild.style.display === 'block'){
// 	// 		item.lastElementChild.style.display = 'none';
// 	// 		item.classList.remove('drop-down__border');	
// 	// 		item.firstElementChild.style.border = "";
// 	// 	} else {
// 	// 		item.lastElementChild.style.display = 'block';
// 	// 		item.classList.add('drop-down__border');
// 	// 		item.firstElementChild.style.border = "none";
// 	// 	}
// 	// }));

// 	//animation
// 	let $animation = document.querySelectorAll('[data-sal]')
// 	if ((window.innerWidth > 1130)&&(document.title==='Главная')) {
// 		sal();
// 	} else {
// 		$animation.forEach(item => item.removeAttribute('data-sal'));
// 	}

// 	//modal window - 'make an order and thanks for' var
// 	let $openBtn = document.querySelectorAll('.popup-order'); //кнопки 'заказать'
// 	let $closeBtn = document.querySelector('.close') //крестик в форме
// 	let $modal = document.querySelector('#modal__order') //окно форма заказа
// 	let $reply = document.querySelectorAll('.popup-reply'); //кнопка ответа на форму
// 	let $modalReply = document.querySelector('.popup-fade__reply'); //окно ответа
// 	//modal window func
// 	function openModal(){
// 		$modal.style.display = "block";
// 		event.preventDefault();
// 	}
// 	function openReply(){
// 		$modal.style.display = "none";
// 		$modalReply.style.display = "block";
// 		event.preventDefault();
// 	}
// 	function closeModal(){
// 		$modal.style.display = "none";
// 		event.preventDefault();
// 	}
// 	function closeReply(){
// 		$modalReply.style.display = "none";
// 		event.preventDefault();
// 	}
// 	function windowOnClick(event) {
//         if (event.target === $modal) {
//             $modal.style.display = "none";
// 			event.preventDefault();
//         }
//     }
// 	$openBtn.forEach(item => item.addEventListener("click", openModal));
// 	$closeBtn.addEventListener("click", closeModal);
// 	//$reply.addEventListener("click", openReply);
// 	$reply.forEach(item => item.addEventListener("click", openReply));
// 	//$modalReply.addEventListener("click", closeReply); //остается на странице формы
// 	window.addEventListener("click", windowOnClick);

// });


		//drop-down accordion
	//var
// 	let categoryContent;
// 	let category = document.querySelector('#category');

// 	category.addEventListener("click", function(event) {
// 		let target = event.target;  //клик по плашке
// 		if (target.tagName != 'DIV') return; 
// 		if (target.nextElementSibling.style.display === "block"){
// 			target.nextElementSibling.style.display = "none"
// 						categoryContent.parentElement.classList.remove('drop-down__border');
// 			categoryContent.style.border = "";
// 		} else {
// 		openSubcategory(target);
// 		}
// 	});
// 	function openSubcategory(div){
// 		if (categoryContent){
// 			categoryContent.nextElementSibling.style.display = "none";
// 			categoryContent.parentElement.classList.remove('drop-down__border');
// 			categoryContent.style.border = "";
// 			} 
// 		categoryContent = div;
// 		categoryContent.nextElementSibling.style.display = "block";		
// 		categoryContent.style.border = "none";
// 		categoryContent.parentElement.classList.add('drop-down__border');
// 	}

// });