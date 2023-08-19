import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';

const appSettings = {
  databaseURL:
    'https://shopping-cart-e916d-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, 'shopping-list');

const inputFieldEl = document.getElementById('input-field');
const addToCartButtonEl = document.getElementById('add-button');
const shoppingListEl = document.getElementById('shopping-list');

onValue(shoppingListInDB, (snapshot) => {
  const data = snapshot.val();
  if (snapshot.exists()) {
    shoppingListEl.innerHTML = '';
    for (const itemObject of Object.entries(data)) {
      addShoppingItemToList(itemObject);
    }
  } else {
    shoppingListEl.innerHTML =
      '<li class="text-center bg-slate-200 w-full py-2 rounded">No items in the shopping list</li>';
  }
});

addToCartButtonEl.addEventListener('click', () => {
  const inputValue = inputFieldEl.value;
  if (inputValue === '') return;
  addShoppingItemToList(inputValue);
  push(shoppingListInDB, inputValue);
  resetInputField();
});

const addShoppingItemToList = (itemObject) => {
  const [id, item] = itemObject;
  const shoppingItem = document.createElement('li');
  shoppingItem.classList.add(
    'bg-slate-300',
    'px-6',
    'py-2',
    'rounded',
    'cursor-pointer',
    'hover:bg-slate-400',
    'transition',
    'duration-300',
    'ease-in-out'
  );

  shoppingItem.textContent = item;
  shoppingListEl.appendChild(shoppingItem);

  shoppingItem.addEventListener('click', () => {
    shoppingItem.remove();
    const itemLocation = ref(database, `shopping-list/${id}`);
    remove(itemLocation);
  });
};

const resetInputField = () => (inputFieldEl.value = '');
