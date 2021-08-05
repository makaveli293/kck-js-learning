const goodsList = [];
let filteredList = [];
const arrNames = [];
let $name = document.getElementById('name');
let $quantity = document.getElementById('quantity');
let $price = document.getElementById('price');
let $purchaseDate = document.getElementById('purchaseDate');
let $list = document.getElementById('list');
let $filter = document.getElementById('filter');
let $sorting = document.getElementById('sortingType');

const objPropsMap = {
  name: 'Наименование товара',
  quantity: 'Количество',
  price: 'Стоимость',
  purchaseDate: 'Дата покупки',
};

function renderList(array) {
  $list.innerHTML = '';
  array.forEach((item) => {
    let $el = document.createElement('li');
    let $internalList = document.createElement('ul');
    for (let prop in item) {
      if (item[prop] !== '') {
        let LabelFromMap = objPropsMap[prop];
        let $internalListItem = document.createElement('li');
        $internalListItem.textContent = LabelFromMap + ' ' + item[prop];
        $internalList.appendChild($internalListItem);
      }
    }
    $el.appendChild($internalList);
    $list.appendChild($el);
  })

  let $amount = document.querySelector('.length');
  $amount.textContent = `Количество товаров: ${array.length}`;
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

    renderList(goodsList);

    $name.value = '';
    $quantity.value = '';
    $price.value = '';
    $purchaseDate.value = '';
    arrNames.length = 0;
  } else {
    alert('Нельзя добавить товар без наименования');
  }
});

$filter.addEventListener('input', function () {
  const regexpOrder = new RegExp(this.value, 'i');
  filteredList = goodsList.filter((el) => regexpOrder.test(el.name));
  renderList(filteredList); 
});

//sorting
$sorting.addEventListener('change', function () {
  switch (this.value) {
    case 'Наименование':
      goodsList.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      renderList(goodsList);
      break;
    case 'Количество':
      goodsList.sort((a, b) => {
        if (a.quantity < b.quantity) {
          return -1;
        }
        if (a.quantity > b.quantity) {
          return 1;
        }
        return 0;
      });
      renderList(goodsList);
      break;
    case 'Стоимость':
      goodsList.sort((a, b) => {
        if (a.price < b.price) {
          return -1;
        }
        if (a.price > b.price) {
          return 1;
        }
        return 0;
      });
      renderList(goodsList);
      break;
      case 'Дата покупки':
      goodsList.sort((a, b) => {
        if (a.purchaseDate < b.purchaseDate) {
          return -1;
        }
        if (a.purchaseDate > b.purchaseDate) {
          return 1;
        }
        return 0;
      });
      renderList(goodsList);
      break;
    default:
      return 0;
  }
  return 0;
});
