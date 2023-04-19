document.addEventListener('DOMContentLoaded', async () => {

    const TIMING = 400


    const body = document.querySelector('body')
    const container = document.querySelector('.container')
    const tableLoad = document.querySelector('.table-load')
    const tBody = document.querySelector('.tbody')
    const crmAddBtn = document.querySelector('.crm__add-btn')
    const crmInput = document.querySelector('.crm__input')

    let lastFocus;



    setTimeout(() => {
        tableLoad.remove()
        createTable()
    }, 1000)

    crmAddBtn.addEventListener('click', () => {
        body.classList.add('scroll-hidden')
        const modal = createModalAdd()
        container.append(modal)
        lastFocus = document.activeElement
        modal.setAttribute('tabindex', '0');
        modal.focus();
        setTimeout(() => modal.classList.add('active'), 0)
    })

    // Функция закрытия модального окна
    function closeModal(modal) {
        body.classList.remove('scroll-hidden')
        lastFocus.focus()
        modal.classList.remove('active')
        setTimeout(() => modal.remove(), TIMING)
    }

    // Функция создани модального окна для уточнения удаления клиента 
    function createModalDelete(tr, obj) {
        const modal = document.createElement('div')
        modal.classList.add('modal', 'modal-delete')
        const modalWrapper = document.createElement('div')
        modalWrapper.classList.add('modal-delete__wrapper')
        const modalTitle = document.createElement('h2')
        modalTitle.classList.add('modal-delete__title')
        modalTitle.textContent = 'Удалить клиента'
        const modalDescr = document.createElement('p')
        modalDescr.classList.add('modal-delete-descr')
        modalDescr.textContent = 'Вы действительно хотите удалить данного клиента?'
        const modalDeleteBtn = document.createElement('button')
        modalDeleteBtn.classList.add('modal-delete__btn-delete')
        modalDeleteBtn.textContent = 'Удалить'
        const modalCloseBtn = document.createElement('button')
        modalCloseBtn.classList.add('modal-delete__btn-close', 'modal__close-btn', 'close')
        modalCloseBtn.textContent = 'Отмена'
        const modalCloseBtnSecond = document.createElement('button')
        modalCloseBtnSecond.classList.add('modal-delete__btn-close', 'close-btn', 'close')
        modalCloseBtnSecond.innerHTML = `<svg width="17" height="17" viewBox="0 0 17 17"
        fill="#B0B0B0">
        <path fill-rule="evenodd" clip-rule="evenodd"
            d="M16.2332 1.73333L15.2665 0.766664L8.49985 7.53336L1.73318 0.766696L0.766515 1.73336L7.53318 8.50003L0.766542 15.2667L1.73321 16.2333L8.49985 9.46669L15.2665 16.2334L16.2332 15.2667L9.46651 8.50003L16.2332 1.73333Z" />
        </svg>`

        document.addEventListener('click', (e) => {
            if (e.target.parentNode.classList.contains('container')) {
                closeModal(modal)
            }
        })

        document.addEventListener('keydown', async (e) => {
            if(e.key === 'Escape') {
                closeModal(modal)
            }
        })

        modalWrapper.append( 
            modalTitle,
            modalDescr,
            modalDeleteBtn,
            modalCloseBtn,
            modalCloseBtnSecond
            )

        modal.append(
            modalWrapper
        )

        const allCloseBtn = modal.querySelectorAll('.close')
        allCloseBtn.forEach(btn => {
            btn.addEventListener('click',  () => {
                closeModal(modal)
            })
        })
        modalDeleteBtn.addEventListener('click', async () => {
            tr.remove()
            closeModal(modal)
            await deleteDataItem(obj.id)
        })

        return modal
    }

    // Функция создания модального окна изменения клиента 
    function createModalUpdate(obj,tr) {
        const modal = document.createElement('div')
        modal.classList.add('modal', 'modal-change')
        const modalWrapper = document.createElement('div')
        modalWrapper.classList.add('modal__wrapper')
        const title = document.createElement('h2')
        title.classList.add('modal__title')
        title.textContent = 'Изменить данные'
        const personId = document.createElement('span')
        personId.classList.add('person-id')
        personId.textContent = 'ID: ' + obj.id
        const form = document.createElement('div')
        form.classList.add('modal__form', 'form')
        const lableSurname = document.createElement('label')
        lableSurname.classList.add('modal__lable')
        lableSurname.textContent = 'Фамилия*'
        const inputSurname = document.createElement('input')
        inputSurname.placeholder = 'Фамилия*'
        inputSurname.classList.add('modal__form-input', 'surname')
        inputSurname.value = obj.surname
        const lableName = document.createElement('label')
        lableName.classList.add('modal__lable')
        lableName.textContent = 'Имя*'
        const inputName = document.createElement('input')
        inputName.classList.add('modal__form-input', 'name')
        inputName.placeholder = 'Имя*'
        inputName.value = obj.name
        const lableLastName = document.createElement('label')
        lableLastName.classList.add('modal__lable')
        lableLastName.textContent = 'Отчество'
        const inputLastName = document.createElement('input')
        inputLastName.classList.add('modal__form-input', 'lastname')
        inputLastName.placeholder = 'Отчество'
        inputLastName.value = obj.lastName
        const contacts = document.createElement('div')
        contacts.classList.add('modal__contacts')
        const contactList = document.createElement('ul')
        contactList.classList.add('modal__contacts-list', 'list-reset')
        const addNewContactBtn = document.createElement('button')
        addNewContactBtn.classList.add('modal__add-contact-btn')
        addNewContactBtn.textContent = 'Добавить контакт' 
        const saveBtn = document.createElement('button')
        saveBtn.classList.add('modal__save-btn')
        saveBtn.type = 'submit'
        saveBtn.textContent = 'Сохранить'
        const deleteBtn = document.createElement('button')
        deleteBtn.classList.add('modal__close-btn', 'delete')
        deleteBtn.textContent = 'Удалить клиента'
        const closeBtn = document.createElement('button')
        closeBtn.classList.add('close-btn', 'close')
        closeBtn.innerHTML = `<svg width="17" height="17" viewBox="0 0 17 17" fill="#B0B0B0">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.2332 1.73333L15.2665 0.766664L8.49985 7.53336L1.73318 0.766696L0.766515 1.73336L7.53318 8.50003L0.766542 15.2667L1.73321 16.2333L8.49985 9.46669L15.2665 16.2334L16.2332 15.2667L9.46651 8.50003L16.2332 1.73333Z" />
        </svg>`

        if (obj.contacts.length !== 0) {
            contactList.classList.add('active')
            contacts.classList.add('active')
            obj.contacts.forEach(item => {
                const li = createContactItem(item)
                const input = li.querySelector('.contact__input')
                const deleteBtn = li.querySelector('.contact__delete')
                deleteBtn.classList.add('active')
                input.value = item.value
                const btn = li.querySelector('.contact__type')
                if (item.type === 'phone') {
                    btn.firstChild.textContent = 'Телефон'
                } else {
                    btn.firstChild.textContent = item.type[0].toUpperCase() + item.type.slice(1)
                }
                contactList.append(li)
            })
        } 

        title.append(personId)

        contacts.append(
            contactList,
            addNewContactBtn
        )

        form.append(
            lableSurname,
            inputSurname,
            lableName,
            inputName,
            lableLastName,
            inputLastName,
            contacts,
            saveBtn,
            deleteBtn
            
        )

        modalWrapper.append(
            title,
            form,
            closeBtn
        )

        modal.append(modalWrapper)

        document.addEventListener('click', (e) => {
            if (e.target.parentNode.classList.contains('container')) {
                closeModal(modal)
            }
        })

        document.addEventListener('keydown', async (e) => {
            if(e.key === 'Escape') {
                closeModal(modal)
            }
        })

        const allFormInput = modal.querySelectorAll('.modal__form-input') 
        allFormInput.forEach(input => {
            input.addEventListener('input', (el) => {
                const lable = el.target.previousSibling
                if (input.value.trim() !== '') {
                    lable.classList.remove('hidden') 
                } else {
                    lable.classList.add('hidden')
                }
            })
        })

        addNewContactBtn.addEventListener('click', () => {
            if (!contacts.classList.contains('active')) {
                contacts.classList.add('active')
            }
            if (!contactList.classList.contains('active')) {
                contactList.classList.add('active')
            }
            
            
            const item = createContactItem(modal)
            contactList.append(item)
            if (contactList.children.length === 10) {
                addNewContactBtn.classList.add('none')
            }
        })

      

        closeBtn.addEventListener('click', () => closeModal(modal))

        deleteBtn.addEventListener('click', () => {
            closeModal(modal)
            const modalDelete = createModalDelete(tr, obj)
            container.append(modalDelete)
            setTimeout(() => modalDelete.classList.add('active'), 0)
        })

        saveBtn.addEventListener('click', async () => {
            
            let contacts = []
            let allContactItems = contactList.querySelectorAll('.modal__contacts-item')
            allContactItems.forEach(item => {
                const itemInput = item.querySelector('.contact__input')
                if (itemInput.value.trim() !== '') {
                    let obj = {
                        type: item.querySelector('.contact__type').firstChild.textContent === 'Телефон' ? 'phone' : item.querySelector('.contact__type').firstChild.textContent.toLowerCase(),
                        value: itemInput.value
                    }
                    contacts.push(obj)
                } 
           })
           const newObj = {
                name: inputName.value,
                surname: inputSurname.value,
                lastName: inputLastName.value,
                createdAt: obj.createdAt,
                updatedAt: new Date(),
                contacts: contacts
           }
           await changeDataItem(obj.id, newObj),
           await createTable()
           closeModal(modal)
        })

        return modal
    }

    // Функция создания модального окна для добавления клиента
    function createModalAdd() {
        const modal = document.createElement('div')
        modal.classList.add('modal', 'modal-add')
        const modalWrapper = document.createElement('div')
        modalWrapper.classList.add('modal__wrapper')
        const title = document.createElement('h2')
        title.textContent = 'Новый клиент'
        title.classList.add('modal__title')
        const form = document.createElement('div')
        form.classList.add('modal__form', 'form')
        const lableSurname = document.createElement('label')
        lableSurname.classList.add('modal__lable', 'hidden')
        lableSurname.textContent = 'Фамилия*'
        const surnameInput = document.createElement('input')
        surnameInput.classList.add('modal__form-input', 'surname')
        surnameInput.placeholder = 'Фамилия*'
        const lableName = document.createElement('label')
        lableName.classList.add('modal__lable', 'hidden')
        lableName.textContent = 'Имя*'
        const nameInput = document.createElement('input')
        nameInput.classList.add('modal__form-input', 'name')
        nameInput.placeholder = 'Имя*'
        const lableLastName = document.createElement('label')
        lableLastName.classList.add('modal__lable', 'hidden')
        lableLastName.textContent = 'Отчество'
        const  lastNameInput = document.createElement('input')
        lastNameInput.classList.add('modal__form-input', 'lastname')
        lastNameInput.placeholder = 'Отчество'
        const contacts = document.createElement('div')
        contacts.classList.add('modal__contacts')
        const contactList = document.createElement('ul')
        contactList.classList.add('modal__contacts-list', 'list-reset')
        const addNewContactBtn = document.createElement('button')
        addNewContactBtn.classList.add('modal__add-contact-btn')
        addNewContactBtn.textContent = 'Добавить контакт' 
        const saveBtn = document.createElement('button')
        saveBtn.classList.add('modal__save-btn')
        saveBtn.type = 'submit'
        saveBtn.textContent = 'Сохранить'
        const abolitionBtn = document.createElement('button')
        abolitionBtn.classList.add('modal__close-btn', 'close')
        abolitionBtn.textContent = 'Отмена'
        const closeBtn = document.createElement('button')
        closeBtn.classList.add('close-btn', 'close')
        closeBtn.innerHTML = `<svg width="17" height="17" viewBox="0 0 17 17" fill="#B0B0B0">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.2332 1.73333L15.2665 0.766664L8.49985 7.53336L1.73318 0.766696L0.766515 1.73336L7.53318 8.50003L0.766542 15.2667L1.73321 16.2333L8.49985 9.46669L15.2665 16.2334L16.2332 15.2667L9.46651 8.50003L16.2332 1.73333Z" />
        </svg>`

        contacts.append(
            contactList,
            addNewContactBtn
        )

        form.append(
            lableSurname,
            surnameInput,
            lableName,
            nameInput,
            lableLastName,
            lastNameInput,
            contacts,
            saveBtn,
            abolitionBtn
        )

        modalWrapper.append(
            title,
            form,
            closeBtn
        )

        modal.append(modalWrapper)

        document.addEventListener('click', (e) => {
            if (e.target.parentNode.classList.contains('container') && modal.classList.contains('active')) {
                closeModal(modal)
            }
        })

        document.addEventListener('keydown', async (e) => {
            if(e.key === 'Escape') {
                closeModal(modal)
            }
        })

        const allFormInput = modal.querySelectorAll('.modal__form-input') 
        allFormInput.forEach(input => {
            input.addEventListener('input', (el) => {
                const lable = el.target.previousSibling
                if (input.value.trim() !== '') {
                    lable.classList.remove('hidden') 
                } else {
                    lable.classList.add('hidden')
                }
            })
        })

        const allCloseBtn = modal.querySelectorAll('.close')
        allCloseBtn.forEach(btn => {
            
            btn.addEventListener('click', () => closeModal(modal))
        })

        addNewContactBtn.addEventListener('click', () => {
            if (!contacts.classList.contains('active')) {
                contacts.classList.add('active')
            }
            if (!contactList.classList.contains('active')) {
                contactList.classList.add('active')
            }
            
            
            const item = createContactItem(modal)
            contactList.append(item)
            if (contactList.children.length === 10) {
                addNewContactBtn.classList.add('none')
            }
        })

        saveBtn.addEventListener('click', async () => {
            let valid = validation(modal)
            if (!valid) {
                return
            }
            let contacts = []
            let allContactItems = contactList.querySelectorAll('.modal__contacts-item')
            allContactItems.forEach(item => {
                const itemInput = item.querySelector('.contact__input')
                if (itemInput.value.trim() !== '') {
                    let obj = {
                        type: item.querySelector('.contact__type').firstChild.textContent === 'Телефон' ? 'phone' : item.querySelector('.contact__type').firstChild.textContent.toLowerCase(),
                        value: itemInput.value
                    }
                    contacts.push(obj)
                } 
           })
            let person = {
                name:  nameInput.value,
                surname: surnameInput.value,
                lastName: lastNameInput.value,
                contacts: contacts,
                updatedAt: new Date(), 
                createdAt: new Date()
            }
            closeModal(modal)
            await postDataItem(person)
            await createTable()
        })

        return modal

    } 
    

    // Функция создания контакта в модальном окне 
    function createContactItem(modal) {
        const li = document.createElement('li')
        li.classList.add('modal__contacts-item')
        li.innerHTML = `<div class="contact__chiose">
                <button class="contact__type">Телефон<svg class="contact__type-svg" width="10"
                        height="6" viewBox="0 0 10 6" fill="#9873FF">
                        <path
                            d="M0.495029 0.690001C0.250029 0.935001 0.250029 1.33 0.495029 1.575L4.65003 5.73C4.84503 5.925 5.16003 5.925 5.35503 5.73L9.51003 1.575C9.75503 1.33 9.75503 0.935001 9.51003 0.690001C9.26503 0.445001 8.87003 0.445001 8.62503 0.690001L5.00003 4.31L1.37503 0.685002C1.13503 0.445002 0.735029 0.445001 0.495029 0.690001Z" />
                    </svg>
                </button>
                <ul class="contact__list list-reset">
                    <li class="contact__item">
                        <button class="type">
                            Доп.телефон
                        </button>
                    </li>
                    <li class="contact__item">
                        <button class="type">
                            Email
                        </button>
                    </li>
                    <li class="contact__item">
                        <button class="type">
                            Vk
                        </button>
                    </li>
                    <li class="contact__item">
                        <button class="type">
                            Facebook
                        </button>
                    </li>
                </ul>
            </div>
            <input type="text" class="contact__input" placeholder="Введите данные контакта">
            <button class="contact__delete"><svg width="12" height="12" viewBox="0 0 12 12"
                    fill="#B0B0B0">
                    <path
                        d="M6 0C2.682 0 0 2.682 0 6C0 9.318 2.682 12 6 12C9.318 12 12 9.318 12 6C12 2.682 9.318 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM8.154 3L6 5.154L3.846 3L3 3.846L5.154 6L3 8.154L3.846 9L6 6.846L8.154 9L9 8.154L6.846 6L9 3.846L8.154 3Z" />
                </svg></button>`
    
        const btn = li.querySelector('.contact__type')  
        const list = li.querySelector('.contact__list')  
        const input = li.querySelector('.contact__input')  
        const allTypeBtn = li.querySelectorAll('.type')
        const deleteBtn = li.querySelector('.contact__delete')

        tippy(deleteBtn, {
            content: `<span class="contact__delete-tippy">Удалить контакт</span>`,
            allowHTML: true,
          });
        
    
        btn.addEventListener('click', (el) => {
            const currentSvg = el.target.querySelector('.contact__type-svg')
            currentSvg.classList.toggle('active')
            const currentContactList = el.target.parentNode.querySelector('.contact__list')
            currentContactList.classList.toggle('active')
        })
    
    
        input.addEventListener('input', () => {
            if (input.value.trim().length !== 0) {
                 deleteBtn.classList.add('active')
            } else {
                deleteBtn.classList.remove('active')
            }
        })
    
    
        deleteBtn.addEventListener('click', () => {
            const list = li.parentNode
            const wrapper = list.parentNode
            li.remove()
            if (list.children.length === 0) {
                wrapper.classList.remove('active')
                list.classList.remove('active')
            }
            if (list.children.length === 9) {
                modal.querySelector('.modal__add-contact-btn').classList.remove('none')
                console.log(modal.querySelector('.modal__add-contact-btn').classList.remove('none'))
            }
        })
    
    
        allTypeBtn.forEach(typeBtn => {
            typeBtn.addEventListener('click', () => {
                if (typeBtn.textContent.trim() === 'Доп.телефон') {
                    btn.firstChild.textContent = 'Телефон' 
                    list.classList.remove('active')  
                } else {
                    btn.firstChild.textContent = typeBtn.textContent.trim() 
                    list.classList.remove('active') 
                }    
            })
        })

        return li
    }

    //Функкция получения времени
    function getDate(val)  {
        const date = new Date(val)
        let day = date.getDate()
        if (day < 10) {
            day = '0' + day
        }
        let month = date.getMonth() +1
        if (month + 1 < 10) {
            month = '0' + month
        }
    
        let year = date.getFullYear()
        return day + '.' + month + '.' +year
    }
    
    function getTime(val)  {
        const date = new Date(val)
        let hour = date.getHours()
        if (hour + 1 < 10) {
            hour = '0' + hour
        }
        let min = date.getMinutes()
        if (min + 1 < 10) {
        min = '0' + min
        }
        return hour + ':' + min
    }

    //Функция создания  таблицы
    async function createTable() {
        tBody.innerHTML = ''
        const clientsList = await getData()
        clientsList.forEach(client => {
            const tr = createTr(client)
            tBody.append(tr)
        })
    }

    //Функция создания строки клиента 
    function createTr(obj) {
        const tr = document.createElement('tr')
        const tdId = document.createElement('td') 
        const tdFio = document.createElement('td') 
        const tdCreat = document.createElement('td') 
        const tdUpdate = document.createElement('td') 
        const tdContacts = document.createElement('td') 
        const tdAction = document.createElement('td')

        tr.classList.add('tr')
        tdId.classList.add('td', 'td-id')
        tdFio.classList.add('td', 'td-fio')
        tdCreat.classList.add('td', 'td-create')
        tdUpdate.classList.add('td', 'td-update')
        tdContacts.classList.add('td', 'td-contacts')
        tdAction.classList.add('td', 'td-action')

        tdId.textContent = obj.id
        tdFio.textContent = obj.surname +  ' ' + obj.name + ' ' + obj.lastName
        
        const dataCreate = document.createElement('span')
        dataCreate.classList.add('data')
        dataCreate.textContent = getDate(obj.createdAt) 
        const timeCreate = document.createElement('span')
        timeCreate.classList.add('time')
        timeCreate.textContent = getTime(obj.createdAt)
        tdCreat.append(dataCreate, timeCreate)

        const dataUpdate = document.createElement('span')
        dataUpdate.classList.add('data')
        dataUpdate.textContent = getDate(obj.updatedAt)
        const timeUpdate = document.createElement('span')
        timeUpdate.classList.add('time')
        timeUpdate.textContent = getTime(obj.updatedAt)
        tdUpdate.append(dataUpdate, timeUpdate)


        const contactsList = document.createElement('ul')
        contactsList.classList.add('td-contact-list', 'list-reset')
        obj.contacts.forEach(contact => {
            const li = document.createElement('li')
            li.classList.add('td-contact-item')
            const a = document.createElement('a')
            a.classList.add('td-conact-link')
            a.classList.add(`${contact.type}-link`)
            let tippyType = contact.type[0].toUpperCase() + contact.type.slice(1) + ': ';
            let value = contact.value
            if (contact.type === 'phone') {
                a.href = 'tel:' + contact.value
            }
            if (contact.type === 'email') {
                a.href = 'mailto:' + contact.value
            }
            if (contact.type = 'vk') {
                a.href = contact.value
            }
            if (contact.type = 'facebook') {
                a.href = contact.value
            }
            if (tippyType === 'Phone: ') {
                tippy(a, {
                    content: `<span class="value-phone">${value}</span>`,
                    allowHTML: true,
                  });
            } else {
                tippy(a, {
                    content: `<span class="contact-type">${tippyType}</span><span class="value">${value}</span>`,
                    allowHTML: true,
                  });
            }
            li.append(a)
            contactsList.append(li)
        })
        const showAllContacts = document.createElement('button')
        const allContactItem = contactsList.querySelectorAll('.td-contact-item')
        showAllContacts.classList.add('show-all-link')
        if (allContactItem.length > 4) {
        let hidden = allContactItem.length-4
        showAllContacts.textContent = '+' + (hidden)
        contactsList.append(showAllContacts)
        showAllContacts.addEventListener('click', () => {
            const hidItem = Array.from(allContactItem)
            hidItem.forEach(item => item.classList.add('visible'))
            showAllContacts.classList.add('hidden')
            })
        }
        tdContacts.append(contactsList)

        const btnChange = document.createElement('button')
        const btnChangeDecor = document.createElement('span')
        btnChangeDecor.classList.add('btn-decor', 'change-svg')
        btnChange.textContent = 'Изменить'
        btnChange.classList.add('td-btn', 'td-btn-change')
        btnChange.append(btnChangeDecor)

        btnChange.addEventListener('click', () => {
            body.classList.add('scroll-hidden')
            const modal = createModalUpdate(obj, tr)
            container.append(modal)
            lastFocus = document.activeElement
            modal.setAttribute('tabindex', '0');
            modal.focus();
            btnChangeDecor.classList.add('active')
            setTimeout(() => {
                modal.classList.add('active')
                btnChangeDecor.classList.remove('active')
            }, 1000)

        })

        const btnDelete = document.createElement('button')
        const btnDeleteDecor = document.createElement('span')
        btnDeleteDecor.classList.add('btn-decor', 'delete-svg')
        btnDelete.textContent = 'Удалить'
        btnDelete.classList.add('td-btn', 'td-btn-delete')
        btnDelete.append(btnDeleteDecor)
        tdAction.append(btnChange, btnDelete)


        btnDelete.addEventListener('click', () => {
            body.classList.add('scroll-hidden')
            const modal = createModalDelete(tr, obj)
            container.append(modal)
            lastFocus = document.activeElement
            modal.setAttribute('tabindex', '0');
            modal.focus();
            btnDeleteDecor.classList.add('active')
            setTimeout(() => {
                modal.classList.add('active')
                btnDeleteDecor.classList.remove('active')
                modal.classList.add('active')
            }, 1000)
        })
      

        tr.append(
            tdId,
            tdFio, 
            tdCreat,
            tdUpdate,
            tdContacts,
            tdAction
        )
        return tr
        
    }

    // Функции работы с сервером 
    async function getData() {
        const response = await fetch('http://localhost:3000/api/clients')
        const data = await response.json()
        return data
    }

    async function postDataItem(object) {
        const response = await fetch('http://localhost:3000/api/clients', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(
                {
                name: object.name,
                surname: object.surname,
                lastName: object.lastName,
                contacts: object.contacts,
                updatedAt: object.updatedAt,
                createdAt: object.createdAt
                }
            )
        })
    }

    async function getDataItem(id) {
        const response = await fetch(`http://localhost:3000/api/clients/${id}`)
        const item = await response.json();
        console.log(item)  
    }

    async function changeDataItem(id, newObj) {
        const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
            method: 'PATCH',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(
                {
                name: newObj.name,
                surname: newObj.surname,
                lastName: newObj.lastName,
                createdAt: newObj.createdAt,
                updatedAt: newObj.updatedAt,
                contacts: newObj.contacts
                }
            )
        })
    }

    async function deleteDataItem(id) {
        const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
            method: 'DELETE'
        })
    }


    // Функция валидации
    function validation(modal) {
        let valid = true
        const modalInputName = modal.querySelector('.name')
        const modalInputSurName = modal.querySelector('.surname')
        if (modalInputName.value.trim().length === 0) {
            modalInputName.classList.add('error')
            modalInputName.placeholder = 'Поле не заполнено!'
            valid = false
        }
        if (modalInputSurName.value.trim().length === 0) {
            modalInputSurName.classList.add('error')
            modalInputSurName.placeholder = 'Поле не заполнено!'
            valid = false
        }
        return valid
    }

    // Функция удаления класса 
    function removeClass(arr, className) {
        arr.forEach(item => item.classList.remove(className))
    }

    // Настройка фильтрации при нажатии на хедер таблицы
    const filtered =  document.querySelectorAll('.filtered')
    const allArrow = document.querySelectorAll('.arrow')
    filtered.forEach(item => {
        item.addEventListener('click', async (el) => {
            const th = el.target
            const currentArrow = item.querySelector('.arrow')
            if (item.classList.contains('active')) {
                currentArrow.classList.toggle('active')
                if (!currentArrow.classList.contains('active')) {
                    if (th.classList.contains('id')) {
                        const newArr = await sortMax('id')
                       createSortTable(newArr)
                    }
                    if (th.classList.contains('fio')) {
                        const newArr = await sortMax('surname')
                       createSortTable(newArr)
                    }
                    if (th.classList.contains('create')) {
                        const newArr = await sortMax('createdAt')
                       createSortTable(newArr)
                    }
                    if (th.classList.contains('update')) {
                        const newArr = await sortMax('updatedAt')
                       createSortTable(newArr)
                    }
                }
                if (currentArrow.classList.contains('active')) {
                    if (th.classList.contains('id')) {
                        const newArr = await sortMin('id')
                       createSortTable(newArr)
                    }
                    if (th.classList.contains('fio')) {
                        const newArr = await sortMin('surname')
                       createSortTable(newArr)
                    }
                    if (th.classList.contains('create')) {
                        const newArr = await sortMin('createdAt')
                       createSortTable(newArr)
                    }
                    if (th.classList.contains('update')) {
                        const newArr = await sortMin('updatedAt')
                       createSortTable(newArr)
                    }
                }
                
            } else {
                removeClass(filtered, 'active')
                removeClass(allArrow, 'active')
                item.classList.add('active')
                currentArrow.classList.add('active')
                if (th.classList.contains('id')) {
                    const newArr = await sortMin('id')
                   createSortTable(newArr)
                }
                if (th.classList.contains('fio')) {
                    const newArr = await sortMin('surname')
                   createSortTable(newArr)
                }
                if (th.classList.contains('create')) {
                    const newArr = await sortMin('createdAt')
                   createSortTable(newArr)
                }
                if (th.classList.contains('update')) {
                    const newArr = await sortMin('updatedAt')
                   createSortTable(newArr)
                }
            }
        })
    })

    

    async function sortMax(prop) {
        const data = await getData()
        dataSort = data.sort(function(a,b) {
            if (a[prop] > b[prop]) return -1
        })
        return dataSort
    }

    async function sortMin(prop) {
        const data = await getData()
        dataSort = data.sort(function(a,b) {
            if (a[prop] < b[prop]) return -1
        })
        return dataSort
    }

    function createSortTable(arr) {
        tBody.innerHTML =''
        arr.forEach(item => {
            const tr = createTr(item)
            tBody.append(tr)
        })
    }

    let timer = null

    crmInput.addEventListener('input',  () => {
        clearTimeout(timer)
        timer = setTimeout(filter,300)
    })

    async function filter() {
        if (crmInput.value.trim() !==  '') {
            let filteredArr = []
            const data = await getData()
            data.forEach(person =>  {
                person.createdAt  = getDate(person.createdAt) + ' ' + getTime(person.createdAt)
                person.updatedAt  = getDate(person.updatedAt) + ' ' + getTime(person.updatedAt)
                let values = Object.values(person).flat(Infinity)
                values.forEach(value => {
                    if(typeof value === 'object') {
                        value = value.value
                    }
                    if (value.toLowerCase().includes(crmInput.value.toLowerCase().trim())) {
                        filteredArr.push(person)
                    }
                })
            })
            if (filteredArr.length !== 0) {
                tBody.innerHTML = ''
                filteredArr.forEach(client => {
                    tBody.append(createTr(client))
                })
            } else {
                return
            }
        } else {
            createTable()
        }
    }    

})