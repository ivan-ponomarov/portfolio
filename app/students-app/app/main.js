document.addEventListener('DOMContentLoaded', async () => {

const container = document.getElementById('container')

// Получаем информацию с сервера 
const response = await fetch('http://localhost:3000/api/students')
let dataList = await response.json()


// Создаем заголовок
const title = document.createElement('h1')
title.classList.add('title')
title.textContent  = 'Список студентов'

// Создаем форму добавления студентов
const form = document.createElement('form')
form.classList.add('form')

const nameInput = createInput('Имя', 'Иван', 'text')
nameInput.input.classList.add('input-add')
const surNameInput = createInput('Фамилия', 'Иванов', 'text')
surNameInput.input.classList.add('input-add')
const secondNameInput = createInput('Отчество', 'Иванович', 'text')
secondNameInput.input.classList.add('input-add')
const bDayInput = createInput('День рождения', '', 'date')
bDayInput.input.classList.add('input-add')
const startLearnInput = createInput('Начало обучения', '', 'date')
startLearnInput.input.classList.add('input-add')
const facultyInput = createInput('Факультет', 'Front-end', 'text')
facultyInput.input.classList.add('input-add')
const submitBtn = document.createElement('button')
submitBtn.classList.add('btn-submit')
submitBtn.textContent = 'Добавить'

bDayInput.input.classList.add('b-day')
startLearnInput.input.classList.add('start-learn')


    

form.append(
    nameInput.inputWrapper,
    surNameInput.inputWrapper,
    secondNameInput.inputWrapper,
    bDayInput.inputWrapper,
    startLearnInput.inputWrapper,
    facultyInput.inputWrapper,
    submitBtn
)

// Создание формы для фильтрации таблицы
const subTitle = document.createElement('h2')
subTitle.textContent = 'Фильтры'
const filteredForm = document.createElement('form')
filteredForm.classList.add('form', 'filtered-form')

const filteredFio = createInput('Ф.И.О', 'Иванов Иван Иванович', 'text')
const filteredFaculty = createInput('Факультет','СММ','text')
const filteredStartLearn = createInput('Начало обучения', '2020', 'number')
const filteredEndLearn = createInput('Закончил обучение', '2024', 'number')
const filteredBtn = document.createElement('button')
filteredBtn.textContent = 'Найти'
filteredBtn.classList.add('btn', 'filtered-btn')


filteredForm.append(
    filteredFio.inputWrapper,
    filteredFaculty.inputWrapper,
    filteredStartLearn.inputWrapper,
    filteredEndLearn.inputWrapper,
    filteredBtn
)


function createInput(lableText, placholderText, type) {
    const inputWrapper = document.createElement('div')
    const lable = document.createElement('label')
    const input = document.createElement('input')
    const errorMassage = document.createElement('span')

    inputWrapper.classList.add('input-wrapper')
    lable.classList.add('lable')
    input.classList.add('input')
    errorMassage.classList.add('error-massage')

    lable.textContent = lableText
    input.placeholder = placholderText
    input.setAttribute('type', type)

    lable.append(
        input,
        errorMassage
    )

    inputWrapper.append(
        lable
     )

    return {
        inputWrapper,
        lable,
        input,
        errorMassage
    }
}

// Создаем контейнер для таблицы
const table  = document.createElement('div')

// Добавляем Заголовок Форму и Контефнер для таблицы
container.append(
    title,
    form,
    subTitle,
    filteredForm,
    table
)

// Находим все поля ввода для дальнейшей работы с ними 
let allInput = document.querySelectorAll('.input')

//  Ограничение ввода чисел в текстовые поля
allInput.forEach((input) => {
    if (input.type === 'text') {
        input.addEventListener('input', () => {
            input.value = input.value.replace(/[^a-zа-яё\s]/gi, '');
        })
    }
})

// Валидация полей ввода
function validation(allInput) {
    let valid = true

    allInput.forEach((input) => {
        if (input.value.trim() === '') {
            let parent = input.parentNode
            let error = parent.querySelector('span')
            error.textContent = 'Поле не заполено!'
            valid = false
        }
        if (input.value.trim().length < 2 && input.value !== '' && input.type === 'text') {
            let parent = input.parentNode
            let error = parent.querySelector('span')
            error.textContent = 'Миниальная длинна - 2 символа!'
            valid = false
        }
        if (input.classList.contains('b-day')  && (((new Date().getFullYear() - new Date(input.value).getFullYear()) < 18) || (new Date(input.value) < new Date('1900-01-01')))){
            let parent = input.parentNode
            let error = parent.querySelector('span')
            error.textContent = 'Дата введена не верно!'
            valid = false
        }
        if (input.classList.contains('start-learn')  && ((new Date(input.value) < new Date('2000-01-01')) || (new Date(input.value) > new Date() ))){
            let parent = input.parentNode
            let error = parent.querySelector('span')
            error.textContent = 'Дата введена не верно!'
            valid = false
        }
        
    })
    return valid
}



// Создание таблицы
function crateTable(array) {
    const table = document.createElement('table')
    const tHead = document.createElement('thead')
    const tBody = document.createElement('tbody')

    function createTh(text) {
        const th = document.createElement('th')
        th.textContent = text
        return th
    }

    const thFio = createTh('Ф.И.О')
    const thFaculty = createTh('Факультет')
    const thBDay = createTh('Дата рождения')
    const thSatrtLearn = createTh('Начало обучения')

    thFio.addEventListener('click', () => {
        dataList.sort(function(a,b) {
            let surnameA = a.surname.toLowerCase()
            let surnameB = b.surname.toLowerCase()

            if(surnameA < surnameB)
                return -1
            if(surnameA > surnameB)
                return 1
            return 0
        })
    
        table.innerHTML = ''
        let newTable = crateTable(dataList)
        table.append(newTable)
    })

    thFaculty.addEventListener('click', () => {
        dataList.sort(function(a,b) {
            let facultyA = a.faculty.toLowerCase()
            let facultyB = b.faculty.toLowerCase()

            if(facultyA < facultyB)
                return -1
            if(facultyA > facultyB)
                return 1
            return 0
        })
    
        table.innerHTML = ''
        let newTable = crateTable(dataList)
        table.append(newTable)
    })

    thBDay.addEventListener('click', () => {
        dataList.sort(function(a,b) {
            let x = new Date(a.birthday)
            let y = new Date(b.birthday)
            return x - y
        })
    
        table.innerHTML = ''
        let newTable = crateTable(dataList)
        table.append(newTable)
    })

     thSatrtLearn.addEventListener('click', () => {
        dataList.sort(function(a,b) {
            let x = new Date(a.studyStart)
            let y = new Date(b.studyStart)
            return x - y
        })
    
        table.innerHTML = ''
        let newTable = crateTable(dataList)
        table.append(newTable)
    })



    tHead.append(
        thFio,
        thFaculty,
        thBDay,
        thSatrtLearn
    )

    for (let student of array) {
        const tr = document.createElement('tr')

     

        function createTd(text) {
            const td = document.createElement('td')
            td.textContent = text
            return td
        }

        const tdFio = createTd(`${student.surname} ${student.name} ${student.lastname}`)
        const tdFaculty = createTd(student.faculty)
        const tdBDay = createTd(normalaizeDate(student.birthday) + ' ' + getAge(student.birthday))
        const tdStartLearn = createTd(getCours(student.studyStart))
        tdStartLearn.classList.add('td-learning')
        const deleteBtn = document.createElement('button')
        deleteBtn.textContent = 'Удалить'
        deleteBtn.classList.add('delete-btn')
        

// Удаление студента из списка и из массива
        deleteBtn.addEventListener('click', (event) => {
            let tr = event.target.parentNode
            let fio = tr.firstElementChild.textContent
            let name = fio.split(' ')[1]
            let surname = fio.split(' ')[0]
            let lastname = fio.split(' ')[2]

            for (let item of dataList) {
                if (item.name === name && item.surname === surname && item.lastname === lastname) {
                    deleteitem(item.id)
                    let index = dataList.indexOf(item)
                    dataList.splice(index, 1)
                    tr.remove()
                }
            }
        })

        tr.append(
            tdFio,
            tdFaculty,
            tdBDay,
            tdStartLearn, 
            deleteBtn
        )
    tBody.append(tr)
    }

    table.append(
        tHead,
        tBody
    )

    return table
}
 
let inputAdd = document.querySelectorAll('.input-add')

// Работа формы при отправке данных
form.addEventListener('submit', async (event) => {
    event.preventDefault()
    // Очищаем все поля с ошибками 
    let allError = document.querySelectorAll('.error-massage')
    allError.forEach((errorArea) => {
        errorArea.textContent = ''
    })
    // Проводим валидацию полей
    if (!validation(inputAdd)) {
        console.log('Ошибка заполнения формы')
        return
    }
    // Очищаем блок с таблицей
    table.innerHTML = ''
  
    // Создаем объект студента 
    let newStudent = {
        name: nameInput.input.value,
        surname: surNameInput.input.value,
        lastname: secondNameInput.input.value,
        birthday: bDayInput.input.value,
        studyStart: startLearnInput.input.value,
        faculty: facultyInput.input.value
    }
    // Добавляем объект студента в массив
    dataList.push(newStudent)
    await post(newStudent)
    // Создаем новую таблицу и добавляем ее на страницу
    let newTable = crateTable(dataList)
    table.append(newTable)
    inputAdd.forEach((input) => {
        input.value = ''
    })

})

// Работа формы при фильтрации 
filteredForm.addEventListener('submit', (event) => {
    event.preventDefault()
    table.innerHTML = ''
    let copy = [...dataList]
    if (filteredFio.input.value.trim() !== '') {
        copy = filtered(copy, 'fio', filteredFio.input.value)
    }
    if (filteredFaculty.input.value.trim() !== '') {
        copy = filtered(copy, 'faculty', filteredFaculty.input.value)
    }
    if (filteredStartLearn.input.value.trim() !== '') {
        copy = filtered(copy, 'start', filteredStartLearn.input.value)
    }
    if (filteredEndLearn.input.value.trim() !== '') {
        copy = filtered(copy, 'end', filteredEndLearn.input.value)
    }


    let newTable = crateTable(copy)
    table.append(newTable)

})



// Приводим дату к стандартному виду
function normalaizeDate(date) {
    date = new Date(date)
    let normalDate = date.getDate() < 10 ? '0' + date.getDate() + '.' : date.getDate() +  '.'
    normalDate = normalDate + (date.getMonth() < 9 ? '0' + (date.getMonth()+1) + '.' : (date.getMonth()+1) + '.')
    normalDate = normalDate + date.getFullYear()    
    return normalDate  
}




// Выводим возраст 
function getAge(date) {
    let age = (Date.parse(new Date()) - Date.parse(date))/(24*3600*365.25*1000)|0

    function declOfNum(n, text_forms) {  
        n = Math.abs(n) % 100; 
            var n1 = n % 10;
            if (n > 10 && n < 20) { return text_forms[2]; }
            if (n1 > 1 && n1 < 5) { return text_forms[1]; }
            if (n1 == 1) { return text_forms[0]; }
            return text_forms[2];
        }

    return '(' + age + ' ' + declOfNum(age, ['год', 'года', 'лет']) + ')'
}



// Определяем период обучения и курс
function getCours(startLearning) {
    startLearning = new Date(startLearning)
    let start = startLearning.getFullYear()
    let end = start + 4
    let nowYear = new Date().getFullYear()

    let deff = nowYear - start + 1
    
    

    if (deff > 4 ) {
        return start + '-' + end + ' (закончил)'
    }
    return start + '-' + end + ' (' + deff + ' курс)'
}

function filtered(arr, prop, val) {
    let copyArr = [...arr]
    let filteredArr = []
    for (let item of copyArr) {
        let newStudent = {
            fio: item.surname + ' ' + item.name + ' ' + item.lastname,
            faculty: item.faculty,
            start: new Date(item.studyStart).getFullYear(),
            end: new Date(item.studyStart).getFullYear() +4
        }
        if (String(newStudent[prop]).toLowerCase().includes(val.toLowerCase()) === true) {
            filteredArr.push(item)
        }
    }
    return filteredArr
}


let newTable = crateTable(dataList)
table.append(newTable)


})

async function post(obj) {
    const rez = await fetch('http://localhost:3000/api/students', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(
            {
             name: obj.name, 
             surname: obj.surname, 
             lastname: obj.lastname, 
             birthday: obj.birthday, 
             studyStart: obj.studyStart, 
             faculty: obj.faculty
            }
        )
    })
    const data = await rez.json();
    console.log(data);
}   



async function deleteitem(id) {
    const rez = await fetch(`http://localhost:3000/api/students/${id}`, {
        method: 'DELETE'
    })
    const data = await rez.json();
    console.log(data);
}






















