let goodsList = [];
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
  let amount = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i].display === true) {
      amount++;
    }
  }
  $amount.textContent = `Количество товаров: ${amount}`;
}

function renderItem(item) {
  if (item.display === true) {
    let $el = document.createElement('li');
    let $internalList = document.createElement('ul');
    for (let prop in item) {
      if (item[prop] !== '') {
        if (prop === 'isBought' || prop === 'display') {
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
    $checkbox.addEventListener('click', function (event) {
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

    let $delButton = document.createElement('button');
    $delButton.textContent = 'Удалить';
    $delButton.setAttribute('data-name', item.name);
    $delButton.classList.add("delete-button");
    $delButton.addEventListener('click', function (event) {
      let dataValue = event.target.getAttribute("data-name");
      let foundObj = goodsList.find(item => item.name === dataValue);
      if (goodsList.length === 1) {
        localStorage.removeItem('arrStorage');
      }
      if (foundObj && foundObj.name === dataValue) {
        let itemPosition = goodsList.indexOf(foundObj);
        goodsList.splice(itemPosition, 1);
        renderList(goodsList);
      }
    });

    if (item.isBought) {
      $el.classList.add("item-purchased");
      $checkbox.setAttribute('checked', 'checked');
    }

    $el.prepend($checkbox);
    $el.append($delButton);
    $list.append($el);

    $name.value = '';
    $quantity.value = '';
    $price.value = '';
    $purchaseDate.value = '';
    localStorage.setItem('arrStorage', JSON.stringify(goodsList));
  }
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
      display: true,
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

//filter
$filter.addEventListener('input', function () {
  const regexpOrder = new RegExp(this.value, 'i');
  for (let i = 0; i < goodsList.length; i++) {
    if (regexpOrder.test(goodsList[i].name)) {
      goodsList[i].display = true;
    } else {
      goodsList[i].display = false;
    }
  }
  renderList(goodsList);
  countGoods(goodsList);
});

//sorting
$sorting.addEventListener('change', function () {
  let sortValue = $sorting.value;
  if (sortValue === 'name' || sortValue === 'purchaseDate') {
    goodsList = goodsList.sort((item1, item2) => {
      if (item1[sortValue] > item2[sortValue]) return 1;
      if (item1[sortValue] === item2[sortValue]) return 0;
      if (item1[sortValue] < item2[sortValue]) return -1;
    });
  } else if (sortValue === 'quantity' || sortValue === 'price') {
    goodsList = goodsList.sort((item1, item2) => {
      return item1[sortValue] - item2[sortValue]
    });
  }
  renderList(goodsList);
});


document.getElementById('all-goods').addEventListener('click', function () {
  renderList(goodsList);
});

document.getElementById('bought-goods').addEventListener('click', function () {
  let boughtGoods = goodsList.filter(el => el.isBought === true);
  let newArr = boughtGoods.slice();
  renderList(newArr);
});

document.getElementById('planned-goods').addEventListener('click', function () {
  let plannedGoods = goodsList.filter(el => el.isBought === false);
  let newArr2 = plannedGoods.slice();
  renderList(newArr2);
});


document.addEventListener('DOMContentLoaded', function () {
  if (localStorage.getItem('arrStorage') !== null) {
    goodsList = JSON.parse(localStorage.getItem('arrStorage'));
    renderList(goodsList);
  }
});