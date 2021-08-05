let goodsList = [];
let filteredList = [];
let arrNames = [];
let $name = document.getElementById('name');
let $quantity = document.getElementById('quantity');
let $price = document.getElementById('price');
let $purchaseDate = document.getElementById('purchaseDate');
let $list = document.getElementById('list');
let $filter = document.getElementById('filter');
let $sorting = document.getElementById('sortingType');
let $checkGood = null;

const objPropsMap = {
  name: 'Наименование товара',
  quantity: 'Количество',
  price: 'Стоимость',
  purchaseDate: 'Дата покупки',
};
const objSortingMap = {
  'Наименование товара': 'name',
  'Количество': 'quantity',
  'Стоимость': 'price',
  'Дата покупки': 'purchaseDate',
};
function renderItem(item) {
  let $el = document.createElement('li');
  let $internalList = document.createElement('ul');
  for (let prop in item) {
    if (item[prop] !== '') {
      let LabelFromMap = objPropsMap[prop];
      let $internalListItem = document.createElement('li');
      $internalListItem.textContent = LabelFromMap + ' ' + item[prop];
      $internalList.append($internalListItem);
    }
  }
  $el.append($internalList);
  let $checkbox = document.createElement('input');
  $checkbox.setAttribute('type', 'checkbox');
  $checkbox.classList.add("check-good");

  $el.prepend($checkbox);
  $list.append($el);

  let $amount = document.querySelector('.length');
  $amount.textContent = `Количество товаров: ${goodsList.length}`;
  $name.value = '';
  $quantity.value = '';
  $price.value = '';
  $purchaseDate.value = '';
  arrNames.length = 0;
  updateCheckboxList();
}

function renderList(array) {
  $list.innerHTML = '';
  array.forEach((el) => {
    renderItem(el);
  })
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
      renderItem(obj);
    } else {

      for (let i = 0; i < goodsList.length; i++) {
        arrNames.push(goodsList[i].name);
      }

      if (arrNames.includes($name.value)) {
        alert('Нельзя добавить существующий товар');
      } else {
        goodsList.push(obj);
        renderItem(obj);
      }
    }

    //renderList(goodsList);
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
  if ( objSortingMap[this.value] === 'name' ||  objSortingMap[this.value] === 'purchaseDate') {
    goodsList = goodsList.sort((item1, item2) => {
        if (item1[ objSortingMap[this.value]] > item2[ objSortingMap[this.value]]) return 1;
        if (item1[ objSortingMap[this.value]] === item2[ objSortingMap[this.value]]) return 0;
        if (item1[ objSortingMap[this.value]] < item2[ objSortingMap[this.value]]) return -1;
      });
  } else if ( objSortingMap[this.value] === 'quantity' ||  objSortingMap[this.value] === 'price') {
    goodsList = goodsList.sort((item1, item2) => {
      return item1[objSortingMap[this.value]] - item2[ objSortingMap[this.value]]
    });
  }
  renderList(goodsList);
});



function updateCheckboxList() {
  $checkGood = document.querySelectorAll('.check-good');
  $checkGood.forEach((el) => {
    el.addEventListener('click', function () {
      if (this.checked) {
        el.nextSibling.classList.add("item-purchased");
      } else {
        el.nextSibling.classList.remove("item-purchased");
      }
    });
  });
}