let goodsList = [];
let filteredList = [];
let $name = document.getElementById('name');
let $quantity = document.getElementById('quantity');
let $price = document.getElementById('price');
let $purchaseDate = document.getElementById('purchaseDate');
let $list = document.getElementById('list');
let $filter = document.getElementById('filter');
let $sorting = document.getElementById('sortingType');
let $checkGood = null;
let $amount = document.querySelector('.length');

const objPropsMap = {
  name: 'Наименование товара',
  quantity: 'Количество',
  price: 'Стоимость',
  purchaseDate: 'Дата покупки',
};

function countGoods(array) {
  $amount.textContent = `Количество товаров: ${array.length}`;
}

function renderItem(item) {
  let $el = document.createElement('li');
  let $internalList = document.createElement('ul');
  for (let prop in item) {
    if (item[prop] !== '') {
      if (prop === 'isBought') {
        continue;
      }
      let LabelFromMap = objPropsMap[prop];
      let $internalListItem = document.createElement('li');
      $internalListItem.textContent = LabelFromMap + ' ' + item[prop];
      $internalList.append($internalListItem);
    }
  }
  $el.append($internalList);
  let $checkbox = document.createElement('input');
  $checkbox.setAttribute('type', 'checkbox');    
  $checkbox.setAttribute('data-name', item.name);
  $checkbox.classList.add("check-good");

  if (item.isBought) {
    $el.classList.add("item-purchased");
    $checkbox.setAttribute('checked', 'checked');
  }

  $el.prepend($checkbox);
  $list.append($el);

  $name.value = '';
  $quantity.value = '';
  $price.value = '';
  $purchaseDate.value = '';
  updateCheckboxList();
}

function renderList(array) {
  $list.innerHTML = '';
  array.forEach((el) => {
    renderItem(el);
  })
  countGoods(array);
};


document.getElementById('add').addEventListener('click', function () {
  if ($name.value !== '') {
    const obj = {
      name: $name.value,
      quantity: $quantity.value,
      price: $price.value,
      purchaseDate: $purchaseDate.value,
      isBought: false,
    };

    if (goodsList.length === 0) {
      goodsList.push(obj);
      renderItem(obj);
      countGoods(goodsList);
    } else {

        if (goodsList.find((item) => item.name === obj.name)) {
        alert('Нельзя добавить существующий товар');
      } else {
        goodsList.push(obj);
        renderItem(obj);
        countGoods(goodsList);
      }
    }
  } else {
    alert('Нельзя добавить товар без наименования');
  }
});

$filter.addEventListener('input', function () {
  const regexpOrder = new RegExp(this.value, 'i');
  filteredList = goodsList.filter((el) => regexpOrder.test(el.name));
  renderList(filteredList);
  countGoods(filteredList);
});

//sorting
$sorting.addEventListener('change', function () {
  let sortValue = $sorting.value;
  if ( sortValue === 'name' ||  sortValue === 'purchaseDate') {
    goodsList = goodsList.sort((item1, item2) => {
        if (item1[sortValue] > item2[sortValue]) return 1;
        if (item1[sortValue] === item2[sortValue]) return 0;
        if (item1[sortValue] < item2[sortValue]) return -1;
      });
  } else if ( sortValue === 'quantity' ||  sortValue === 'price') {
    goodsList = goodsList.sort((item1, item2) => {
      return item1[sortValue] - item2[sortValue]
    });
  }
  renderList(goodsList);
});



function updateCheckboxList() {
   $checkGood = document.querySelectorAll('.check-good');
  $checkGood.forEach((el) => {
    el.addEventListener('click', function () {
      let dataValue = event.target.getAttribute("data-name");
      let foundObj = goodsList.find(item => item.name === dataValue);
      if (this.checked) {
        foundObj.isBought = true;
        renderList(goodsList);
      } else {
        foundObj.isBought = false;
        renderList(goodsList);
      }
    });
  });
}


document.getElementById('all-goods').addEventListener('click', function () {
    renderList(goodsList);
});

document.getElementById('bought-goods').addEventListener('click', function () {
  let boughtGoods = goodsList.filter(el => el.isBought === true);
  renderList(boughtGoods);
});

document.getElementById('planned-goods').addEventListener('click', function () {
  let plannedGoods = goodsList.filter(el => el.isBought === false);
  renderList(plannedGoods);
});

