const inputField = document.getElementById('input-field');
const addToCartButton = document.getElementById('add-button');

addToCartButton.addEventListener('click', () => {
  const inputValue = inputField.value;
  inputField.value = '';
});
