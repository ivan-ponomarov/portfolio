(function () {

    let todoArray = [];
    let listName = '';


    function createTitle (title) {
        let h2 = document.createElement('h2');
        h2.textContent = title;
        return h2
    }

    function createeForm () {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let btnAdd = document.createElement('button');
        let btnWrapper = document.createElement('div')

        form.classList.add('input-group', 'mb-3'),
        input.classList.add('form-control')
        btnWrapper.classList.add('input-group-append')
        btnAdd.classList.add('btn', 'btn-primary')

        input.placeholder = 'Введите новое задание';
        btnAdd.textContent = 'Добавить';
        btnAdd.disabled = true;

        btnWrapper.append(btnAdd);
        form.append(input);
        form.append(btnWrapper);
       

        return {
            form,
            input,
            btnAdd
        }

    }

    function createList () {
        let ul = document.createElement('ul');
        return ul
    }

    function createItem (newItem) {
        let li = document.createElement('li');
        let btnDone = document.createElement('button');
        let btnDelet = document.createElement('button');
        let btnItemWrapper = document.createElement('div')

        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-item-center')
        btnItemWrapper.classList.add('btn-group', 'btn-group-sm')
        btnDone.classList.add('btn', 'btn-success')
        btnDelet.classList.add('btn', 'btn-danger')

        btnDone.textContent = 'Готово';
        btnDelet.textContent = 'Удалить'

        li.textContent = newItem.text

        btnDone.addEventListener('click', function () {
            for (let item of todoArray) {
                if (item.id == newItem.id)  {
                    li.classList.toggle('list-group-item-success')
                    newItem.done = !newItem.done
                    console.log(todoArray)
                    save(listName, todoArray)
                }
            }
        })

        btnDelet.addEventListener('click', function() {
            for (let i = 0; i < todoArray.length; i++) {
                if (todoArray[i].id == newItem.id) {
                    if (confirm('You are shure?')) {
                        li.remove()
                        todoArray.splice(i, 1)
                        console.log(todoArray)
                        save(listName, todoArray)
                    }
                }
            }
        })


        btnItemWrapper.append(btnDone)
        btnItemWrapper.append(btnDelet)
        li.append(btnItemWrapper)

        return {
            li,
            btnDone,
            btnDelet
        }
    }

    function getId () {
        let max = 0;
        for (let item of todoArray) {
            if (item.id > max)  {
                max = item.id
            }
        }
        return max + 1
    }

    function save (key, arr) {
        localStorage.setItem(key, JSON.stringify(arr))
    }

    
    function createApp (container, title, defArray, key) {

        let titleApp = createTitle(title);
        let formApp = createeForm();
        let listApp = createList()

        listName = key;
        todoArray = defArray;

        let localData = localStorage.getItem(listName)
        if (localData !== null && localData !== '') {
            todoArray = JSON.parse(localData)
        }

        container.append(titleApp);
        container.append(formApp.form)
        container.append(listApp)

        for (let item of todoArray) {
            let randomItem = createItem(item)
            listApp.append(randomItem.li)
            if(item.done == true) {
                randomItem.li.classList.add('list-group-item-success')
            }
        }


        formApp.input.addEventListener('input', function() {
            if (formApp.input.value !== '') {
                formApp.btnAdd.disabled = false
            } else {
                formApp.btnAdd.disabled = true
            }
        })

        formApp.form.addEventListener('submit', function(e) {

            e.preventDefault()

            let newItem = {
                id: getId(),
                text: formApp.input.value,
                done: false
                
            }
            todoArray.push(newItem)

            listApp.append(createItem(newItem).li)

            save(listName, todoArray)


            formApp.input.value = ''
            formApp.btnAdd.disabled = true

            console.log(todoArray)
        })
    }
    window.createApp = createApp;
})()