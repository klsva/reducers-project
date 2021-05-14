import './styles/main.scss'
import './js/img'
import sal from 'sal.js'

/*js*/
//ready
var ready = (callback) => {
	if (document.readyState != "loading") callback();
	else document.addEventListener("DOMContentLoaded", callback);
}

ready(() => { 
	/*  Начинаем работу после полной загрузки DOM */ 
	//burger header menu var
	let $iconMenu = document.querySelector('.icon-menu');
	let $menuBody = document.querySelector('.menu__body');
	let catalogTop = document.querySelector('.catalog__top');
	let $body = document.querySelector('body');
	//burger on click funck
	$iconMenu.addEventListener('click', () => {
		$iconMenu.classList.toggle('active');
		$menuBody.classList.toggle('active');
		filter.classList.toggle('hidden');
		$body.classList.toggle('lock');
	});

	//animation
	let $animation = document.querySelectorAll('[data-sal]')
	if ((window.innerWidth > 1130)&&(document.title==='Главная')) {
		sal();
	} else {
		$animation.forEach(item => item.removeAttribute('data-sal'));
	}


	//modal window - 'make an order and thanks for' var
	let $openBtn = document.querySelectorAll('.popup-order'); //кнопки 'заказать'
	let $closeBtn = document.querySelector('.close') //крестик в форме
	let $modal = document.querySelector('#modal__order') //окно форма заказа
	let $reply = document.querySelectorAll('.popup-reply'); //кнопка ответа на форму
	let $modalReply = document.querySelector('.popup-fade__reply'); //окно ответа

	//modal window func
	function openModal(){
		$modal.style.display = "block";
		event.preventDefault();
	}
	function openReply(){
		$modal.style.display = "none";
		$modalReply.style.display = "block";
		event.preventDefault();
	}
	function closeModal(){
		$modal.style.display = "none";
		event.preventDefault();
	}
	function closeReply(){
		$modalReply.style.display = "none";
		event.preventDefault();
	}
	function windowOnClick(event) {
        if (event.target === $modal) {
            $modal.style.display = "none";
			event.preventDefault();
        }
    }
	$openBtn.forEach(item => item.addEventListener("click", openModal));
	$closeBtn.addEventListener("click", closeModal);
	//$reply.addEventListener("click", openReply);
	$reply.forEach(item => item.addEventListener("click", openReply));
	//$modalReply.addEventListener("click", closeReply); //остается на странице формы
	window.addEventListener("click", windowOnClick);


	//drop-down accordion
	//var
	let categoryContent;
	let category = document.querySelector('#category');

	category.addEventListener("click", function(event) {
		let target = event.target.closest('div');  //клик по плашке
		if (!target) return; 
		if (!category.contains(target)) return;
		if (target.nextElementSibling.style.display === "block"){
			target.nextElementSibling.style.display = "none"
			categoryContent.firstElementChild.classList.remove('drop-down__border');
			categoryContent.firstElementChild.style.display = "inline-block";
			categoryContent.firstElementChild.style.border = "";
		} else {
		openSubcategory(target);
		}
	});
	function openSubcategory(div){
		if (categoryContent){
			categoryContent.nextElementSibling.style.display = "none";
			categoryContent.firstElementChild.classList.remove('drop-down__border');
			categoryContent.firstElementChild.style.display = "inline-block";
			console.log(categoryContent);
			
			} 
		categoryContent = div;
		categoryContent.nextElementSibling.style.display = "block";		
		categoryContent.firstElementChild.style.display = "block";
		categoryContent.firstElementChild.classList.add('drop-down__border');
	}

	//burger section menu var
	let filter = document.querySelector('.filter');
	let catalogMenu = document.querySelector('.catalog__menu');
	//burger on click funck
	filter.addEventListener('click', () => {
		filter.classList.toggle('active');
		catalogMenu.classList.toggle('active');
		$body.classList.toggle('lock');
	});	
	
	//modal window - 'product card' var
	let openProduct = document.querySelector('#product-modal');
	let categoryItem;
	console.log("openProduct");

	// openProduct.addEventListener("click", function(event){
	// 	let target = event.target.closest('li');  //клик по плашке
	// 	console.log(event.target);
	// 	if (!target) return; 
	// 	if (!category.contains(target)) return;
	// 	if (target.nextElementSibling.style.display === "block"){
	// 		target.nextElementSibling.style.display = "none"
	// 	} else {
	// 		openProductModal(target);
	// 	}
	// });
	// function openProductModal(div){
	// 	if (categoryItem){
	// 		categoryItem.nextElementSibling.style.display = "none";
	// 		console.log(categoryContent);				
	// 		} 
	// 		categoryItem = div;
	// 	categoryContent.nextElementSibling.style.display = "block";	
	// }

});
