//функция валидации формы заказа товара
function formValidate(form){
    let error = 0;
    let formReq = document.querySelectorAll('._req');
    console.log(formReq);
    for (let index = 0; index < formReq.length; index++) {
        const input = formReq[index];
        //убираем класс эррор
        formRemoveError(input);
        //проверка email
        if (input.classList.contains('_email')){
            //проверяем емейл на корректность, если не ок, то добавляем класс эррор
            if (emailTest(input)){
                formAddError(input);
                error++;
            }
            //проверяем заполнено ли поле вообще
        } else if (input.classList.contains('_phone')){
            if (phoneTest(input)){
                formAddError(input);
                error++;
            }

        } else if (input.value === ''){
            formAddError(input);
            error++;
        }
    }
    return error;            
} 

//добавляет объекту и родительскому объекту класс эррор в валидации формы
function formAddError(input){
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
}
//убирает с объекта и с родительского объекта класс эррор в валидации 
function formRemoveError(input){
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
}
//проверка емейла и телефона в валидации формы
function emailTest(input){
    return !/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(input.value);
}
function phoneTest(input){
    return !/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/i.test(input.value);
}

export {formValidate}
