import './styles/main.scss'
import './js/img'
import sal from 'sal.js'
import {formValidate} from './js/form_validation'
import {openSubcategory, checkProductActiveClass} from './js/functions'

/*js*/
/* ready function */
let ready = (callback) => {
	if (document.readyState != "loading") callback();
	else document.addEventListener("DOMContentLoaded", callback);
}
ready(() => { //ждем построения DOM
	
	/*BURGER menu  в шапке сайта*/
	const iconHeaderMenu = document.querySelector('.icon-menu');
	const menuHeaderBody = document.querySelector('.menu__body');
	const body = document.querySelector('body');

	iconHeaderMenu.addEventListener('click', openHeaderMenuBurger);

	function openHeaderMenuBurger(){
		iconHeaderMenu.classList.toggle('active');
		menuHeaderBody.classList.toggle('active');
		filter.classList.toggle('hidden');
		body.classList.toggle('lock');
	}

	/*BURGER menu для категорий*/
	let filter = document.querySelector('.filter');
	let catalogMenu = document.querySelector('.catalog__menu');

	if (filter){
		filter.addEventListener('click', openFilterCategoriesBurger);	
	}

	function openFilterCategoriesBurger(){
		filter.classList.toggle('active');
		catalogMenu.classList.toggle('active');
		body.classList.toggle('lock');
	}

	/*BURGERS end*/

	/*анимация главной страницы ***sal.js*** */
	let animationMainPage = document.querySelectorAll('[data-sal]')
	if ((window.innerWidth > 1130)&&(document.title==='Главная')) {
		sal();
	} else {
		animationMainPage.forEach(item => item.removeAttribute('data-sal'));
	}

	/*МОДАЛЬНЫЕ ОКНА и ВЫПАДАШКА*/
	/*Окно по кнопке "Сделать заказ"*/
	const closeBtnMakeOrder = document.querySelector('.order__close_link') //крест в форме сделать заказ
	const modalWindowMakeOrder = document.querySelector('#order-modal') //окно форма заказа
	const formMakeOrder = document.querySelector('#order-form'); //Форма заказа
	const modalWindowThanksForOrder = document.querySelector('#thanks-for-order__modal') //окно спасибо
	const thanksForOrderCloseLink = document.querySelector('.thanks-for-order__close_link') //кнопка закрыть окно спасибо
	const overlay = document.querySelector('#overlay-modal'); //подложка модальных окон

	document.body.addEventListener('click', openModalWindowMakeOrder);
	closeBtnMakeOrder.addEventListener('click', closeModalWindowMakeOrder);
	formMakeOrder.addEventListener('submit', formSendOrder);
	thanksForOrderCloseLink.addEventListener('click', closeModalWindowThanksForOrder);
	document.body.addEventListener('keyup', closeModalMakeOrderOnEscBtn);
	overlay.addEventListener('click', closeModalWindowOnWindowClick);	

	//открываем окно заказа		
	function openModalWindowMakeOrder(e){
		if (e.target.classList.contains('btn-order-modal')){
			let productIndex = checkProductActiveClass(productModal);
			if (productIndex){
				let elem = document.querySelector(`[data-index = '${productIndex}']`)
				elem.classList.remove('active');
			}
			modalWindowMakeOrder.classList.add('active');
			overlay.classList.add('active');
			document.body.style.overflow = 'hidden';
		}
	}
	//закрываем окно заказа на крестик	
	function closeModalWindowMakeOrder(){
		modalWindowMakeOrder.classList.remove('active');
		overlay.classList.remove('active');
		document.body.style.overflow = '';
	}
	//отправляем форму заказа    
	async function formSendOrder(e){
        e.preventDefault();
        let error = formValidate(formMakeOrder);
        let formData = new FormData(formMakeOrder);
        if (error === 0) {
            //ajax отпарка по скрипту sendmail.php
            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });            
			formMakeOrder.reset();
			openThanksForOrderWindow();
            } else {
            alert('Заполните обязательные поля');    
        }
	}	
	//открываем окно спасибо за заказ
	function openThanksForOrderWindow(){
		modalWindowMakeOrder.classList.remove('active');
		modalWindowThanksForOrder.classList.add('active');
	}
	//закрываем окно спасибо за заказ		
	function closeModalWindowThanksForOrder(){
		modalWindowThanksForOrder.classList.remove('active');
		overlay.classList.remove('active');
		document.body.style.overflow = '';
	}
	//закрываем окно заказа по кнопке esc
	function closeModalMakeOrderOnEscBtn(e) {
		var key = e.keyCode;	
		if (key == 27 && document.querySelector('.order__modal.active')) {
			document.querySelector('.order__modal.active').classList.remove('active');
			document.querySelector('.overlay.active').classList.remove('active');
		}
	}
	//закрываем окно заказа по клику вне окна
	function closeModalWindowOnWindowClick() {
		if(document.querySelector('.order__modal.active')){
			document.querySelector('.order__modal.active').classList.remove('active');
		}
		this.classList.remove('active');
		document.body.style.overflow = '';
	}


	/*МОДАЛЬНОЕ ОКНО ПРОДУКТ - клики по кнопке "подробнее", по плашке, по плашке в миксе выпадашек
	выпадашка подкатегорий в категориях*/
	const category = document.querySelector('.js-category'); //на странице категории
	const openProduct = document.querySelector('.js-product-modal'); // на странице есть Товары
	const productModal = document.querySelectorAll('.product__modal'); //окно товара
	
	if (category && openProduct) { //на транице есть категории и товары
		setProductDataIndex();
		category.addEventListener("click", openHiddenSubcategoriesInCategory);
		category.addEventListener("click", openProductOnLinkMore);
		openProduct.addEventListener("click", openPreviouseProductCard);
		openProduct.addEventListener("click", openNextProductCard);
		openProduct.addEventListener("click", closeProductCard);


		document.body.addEventListener('keyup', closeProductOnEscBtn);
		overlay.addEventListener('click', closeProductOnWindowClick);

	} else if (openProduct){ //на странице только товары
		setProductDataIndex();	
		openProduct.addEventListener("click", openProductCard);
		openProduct.addEventListener("click", openPreviouseProductCard);
		openProduct.addEventListener("click", openNextProductCard);
		openProduct.addEventListener("click", closeProductCard);
		document.body.addEventListener('keyup', closeProductOnEscBtn);
		overlay.addEventListener('click', closeProductOnWindowClick);
	}

	//открытие выпадашки категории
	function openHiddenSubcategoriesInCategory(e) {
		const targetClick = e.target.closest('DIV');
		const hiddenElem = targetClick.parentElement.parentElement.nextElementSibling;

		if (targetClick.classList.contains('js-only-product')) {
			targetClick.parentElement.parentElement.nextElementSibling.classList.add('active');
			console.log(targetClick.parentElement.parentElement.nextElementSibling)
			overlay.classList.add('active');
			document.body.style.overflow = 'hidden';
			return;
		}

		if (!targetClick) return; 

		if (!category.contains(targetClick)) return;

		if (hiddenElem.style.display === "block" || hiddenElem.style.display == null){
			hiddenElem.style.display = "none";
			targetClick.classList.remove('item-b_clicked');
			let spanSpanStyles = targetClick.parentElement;
			spanSpanStyles.classList.remove('drop-down__border');
			spanSpanStyles.style.display = "inline-block";
			spanSpanStyles.style.border = "";
		} else {
		openSubcategory(targetClick);
		}
	}

	//открытие окна продукта по плашке
	function openProductCard(e){
		let target = e.target.closest('li');
		if (!target) return;
		e.preventDefault();
		target.children[1].classList.add('active');
		overlay.classList.add('active');
		document.body.style.overflow = 'hidden';
	}
	//открытие предыдущего товара	
	function openPreviouseProductCard(e){
		if (e.target.classList.contains('item_previos') || (e.target.classList.contains('hidn-text') && e.target.parentElement.classList.contains('item_previos'))){
			let productIndex = checkProductActiveClass(productModal);
			let productsNum = productModal.length;
			let elemCurrent = document.querySelector(`[data-index = '${productIndex}']`)
			let elemPrev;
			if (productIndex == 1){
				elemPrev = document.querySelector(`[data-index = '${productsNum}']`)
			} else {
				elemPrev = document.querySelector(`[data-index = '${productIndex-1}']`)
			}
			elemCurrent.classList.remove('active');
			elemPrev.classList.add('active');				
		}
	}
	//открытие следующего товара		
	function openNextProductCard(e){
		if (e.target.classList.contains('item_next') || (e.target.classList.contains('hidn-text') && e.target.parentElement.classList.contains('item_next')) ){	
			let productIndex = checkProductActiveClass(productModal);
			let productsNum = productModal.length;
			let elemCurrent = document.querySelector(`[data-index = '${productIndex}']`)
			let elemNext;
			if (productIndex == productsNum){
				elemNext = document.querySelector(`[data-index = '1']`)
			} else {
				elemNext = document.querySelector(`[data-index = '${+productIndex+1}']`)
			}
			elemCurrent.classList.remove('active');
			elemNext.classList.add('active');				
		}
	}
	//закрытие окна	товара
	function closeProductCard(e){
		if (e.target.classList.contains('close_link')){
			let target = e.target;
			target.parentElement.parentElement.classList.remove('active');
			overlay.classList.remove('active');	
			document.body.style.overflow = '';
		}
	}
	//открытие окна по ссылке "подробнее"
	function openProductOnLinkMore(e){
		if (!event.target.classList.contains('js-about-product')) return;
		let target = e.target;
		target.parentElement.parentElement.children[3].classList.add('active');
		overlay.classList.add('active');
		document.body.style.overflow = 'hidden';
	}
		
	//закрываем окно товара по кнопке esc
	function closeProductOnEscBtn(e) {
		var key = e.keyCode;	
		if (key == 27 && (document.querySelector('.product__modal.active'))) {
			document.querySelector('.product__modal.active').classList.remove('active');
			document.querySelector('.overlay.active').classList.remove('active');
		}
	}
	//закрываем окно товара если клик не по окну	//	
	function closeProductOnWindowClick() {
		if(document.querySelector('.product__modal.active')){
			document.querySelector('.product__modal.active').classList.remove('active');
		}		
		this.classList.remove('active');
		document.body.style.overflow = '';

	}
	//function to set data-index to product for buttons prev/next
	function setProductDataIndex(){
		//product.forEach((item, index) => item.setAttribute('data-index', ++index));
		productModal.forEach((item, index) => item.setAttribute('data-index', ++index));
		//closeProductModal.forEach((item, index) => item.setAttribute('data-index', ++index));
	}

});
