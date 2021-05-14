
//функция открывает /скрывает скрытые подкатегории в аккордеоне
let categoryContent;
function openSubcategory(div){
    if (categoryContent){
        categoryContent.classList.remove('item-b_clicked');
        categoryContent.parentElement.parentElement.nextElementSibling.style.display = "none";
        categoryContent.parentElement.classList.remove('drop-down__border');
        categoryContent.parentElement.style.display = "inline-block";
        } 
    categoryContent = div;
    categoryContent.parentElement.parentElement.nextElementSibling.style.display = "block";	
    categoryContent.classList.add('item-b_clicked');
    categoryContent.parentElement.style.display = "block";
    categoryContent.parentElement.classList.add('drop-down__border');
}

//функция получает номер аттрибута data-index Продукта
function checkProductActiveClass(arr){
    let index;
    for	(let i = 0; i < arr.length; i++){
        if (arr[i].classList.contains('active')){
            index = arr[i].getAttribute('data-index')
        }
    }
    return index;
}

export {openSubcategory, checkProductActiveClass}