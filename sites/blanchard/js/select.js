 const select1 = new CustomSelect('.select', {
      defaultValue: 'Живописиь',
      data: ['Живопись', 'Рисунок', 'Скульптура' ],
      onSelected(item) {
        console.log(`Выбранное значение: ${item.textContent}`);
      },
    });

    document.querySelector('.select').addEventListener('select.change', (e) => {
      console.log(
        `Выбранное значение: ${
        e.target.querySelector('.select__item_selected').textContent
        }`
      );
    });