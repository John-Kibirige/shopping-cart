import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import {
  getDatabase,
  ref,
  push,
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';

const appSettings = {
  databaseURL:
    'https://shopping-cart-e916d-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, '/shopping-list');

const inputField = document.getElementById('input-field');
const addToCartButton = document.getElementById('add-button');

addToCartButton.addEventListener('click', () => {
  const inputValue = inputField.value;
  push(shoppingListInDB, inputValue);
  inputField.value = '';
});

// https://shopping-cart-e916d-default-rtdb.europe-west1.firebasedatabase.app/
