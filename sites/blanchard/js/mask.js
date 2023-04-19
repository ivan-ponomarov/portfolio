const selector = document.querySelector("input[type='tel']");
const im = new Inputmask("+375(99)-999-99-99");


let input = document.getElementById('name')
  ,value = input.value;

input.addEventListener('input', onInput);

function onInput(e){
  var newValue = e.target.value;
  if( newValue.match(/[^a-zA-Zа-яА-Я]/g)) {
     input.value = value;
     return;
  }
  value = newValue;
}

im.mask(selector);

const validation = new JustValidate('.contact__form', {
  errorLabelStyle: {
    color: '#D11616',
    textDecoration: 'underlined',
  }
});

validation
  .addField('#name', [
  {
    rule: 'required',
    errorMessage: 'Вы не ввели имя',
  },
  {
    rule: 'minLength',
    value: 3,
    errorMessage: 'Не короче 3 символов',
  },
  {
    rule: 'maxLength',
    value: 30,
    errorMessage: 'Слишком длинное имя',
  },
])
  .addField('#tel', [
  {
    rule: 'required',
    errorMessage: 'Вы не ввели телефон',
  },
  {
    validator: (value) => {
      const phone = selector.inputmask.unmaskedvalue()
      console.log(phone)
      return Number(phone) && phone.length === 9;
    },
    errorMessage: 'Телефон не корректный!',
  },
]);








