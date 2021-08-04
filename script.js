let goodsList = [];
let $name = document.getElementById('name');
let $quantity = document.getElementById('quantity');
let $price = document.getElementById('price');
let $purchaseDate = document.getElementById('purchaseDate');
let $list = document.getElementById('list');
let arrNames = [];

const objPropsMap = {
  name: 'Наименование товара',
  quantity: 'Количество',
  price: 'Стоимость',
  purchaseDate: 'Дата покупки',
};

document.getElementById('add').addEventListener('click', function () {
  // сделать запрет на добавление только ПОЛНОГО дубликата (когда все поля в существующем объекте абсолютно равны)
  if ($name.value !== '') {
    const obj = {
      name: $name.value,
      quantity: $quantity.value,
      price: $price.value,
      purchaseDate: $purchaseDate.value,
    };

    if (goodsList.length === 0) {
      goodsList.push(obj);
    } else {

      for (let i = 0; i < goodsList.length; i++) {
        arrNames.push(goodsList[i].name);
      }

      if (arrNames.includes($name.value)) {
        alert('Нельзя добавить существующий товар');
      } else {
        goodsList.push(obj);
      }
    }
    $list.innerHTML = '';
    goodsList.map((el) => {
      let $el = document.createElement('li');
      let $internalList = document.createElement('ul');
      for (let prop in el) {
        if (el[prop] !== '') {
          let LabelFromMap = objPropsMap[prop];
          let $internalListItem = document.createElement('li');
          $internalListItem.textContent = LabelFromMap + ' ' + el[prop];
          $internalList.appendChild($internalListItem);
        }
      }
      $el.appendChild($internalList);
      $list.appendChild($el);
    });
    $name.value = '';
    $quantity.value = '';
    $price.value = '';
    $purchaseDate.value = '';
    arrNames = [];
  } else {
    alert('Нельзя добавить товар без наименования');
  }
});