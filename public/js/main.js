//Header Scroll
let header = document.querySelector('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('shadow', window.scrollY > 0);
});

//Product Array
const products = [
  {
    id: 1,
    title: ' Sharp Sneakers',
    price: 265.7,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9ggdn6MX-g2d1uF2lNmKdrT1Cx4A0kcL_UXZOPoegpwQuU_FqSlpq8foNNKtlyVVoR2Q&usqp=CAU',
  },
  {
    id: 2,
    title: ' One Sneakers',
    price: 375.4,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaOD52X39C8cIAyuJJ6omD49T_rAFMhgJDTQ&usqp=CAU',
  },
  {
    id: 3,
    title: ' Winter Sneakers',
    price: 295.9,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQbZhQXIc8zTEo51JY0IA2Y0QwzpTfH-5FcQ&usqp=CAU',
  },
  {
    id: 4,
    title: ' Sponge Sneakers',
    price: 389.4,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd2k3PZMeFckYJqLygvCcI1Ht_fJ8GzSEJpg&usqp=CAU',
  },
  {
    id: 5,
    title: ' Moonlight Sneakers',
    price: 453.8,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStQdu2SaVvyoY05IaTakx4RqrfVQyD6f6c614WjtjjWVNd3NFQZq2njl3Hr-n8bo5ZWvY&usqp=CAU',
  },
  {
    id: 6,
    title: ' Druma Sneakers',
    price: 316.7,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-s-CsW2pYb9T7xHrhr2sf3PPSpjUTH6DNnp1h9GjoUoOADBmaVi-qE7wzQGsvweSb-IQ&usqp=CAU',
  },
  {
    id: 7,
    title: ' Oldies Sneakers',
    price: 425.4,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkQUxekn_eE9YGFoxzXpzR4PXLhwk964Hazg&usqp=CAU',
  },
  {
    id: 8,
    title: ' Whiter Sneakers',
    price: 255.8,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZrhl5r8M1jX8WrfhByKt6h1iJt7ahACVWGA&usqp=CAU',
  },
];

//store cart Items in Local Storage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

//Get the products list and elements
const productList = document.getElementById('productList');
const cartItemElement = document.getElementById('cartItems');
const cartTotalElement = document.getElementById('cartTotal');

//Render Products On Page
function renderProducts() {
  productList.innerHTML = products
    .map(
      (product) => `
      <div class="product">
      <img src="${product.image}" alt="${product.title}" class="product-img" />
      <div class="product-info">
        <h2 class="product-title">${product.title}</h2>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <a class="add-to-cart" data-id="${product.id}">Add to cart</a>
      </div>
    </div>
      `
    )
    .join('');
  //Add to cart
  const addToCartButtons = document.getElementsByClassName('add-to-cart');
  for (let i = 0; i < addToCartButtons.length; i++) {
    const addToCartButton = addToCartButtons[i];
    addToCartButton.addEventListener('click', addToCart);
  }
}

//Add to cart
function addToCart(event) {
  const productID = parseInt(event.target.dataset.id);
  const product = products.find((product) => product.id === productID);
  if (product) {
    const existingItem = cart.find((item) => item.id === productID);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      };
      cart.push(cartItem);
    }
    //Change Add to cart text to added
    event.target.textContent = 'Added';
    updateCartIcon();
    saveToLocalStorage();
    renderCartItems();
    calculateCartTotal();
  }
}

//Remove from Cart
function removeFromCart(event) {
  const productID = parseInt(event.target.dataset.id);
  cart = cart.filter((item) => item.id !== productID);
  saveToLocalStorage();
  renderCartItems();
  calculateCartTotal();
  updateCartIcon();
}
//Quantity Change
function changeQunantity(event) {
  const productID = parseInt(event.target.dataset.id);
  const quantity = parseInt(event.target.value);

  if (quantity > 0) {
    const cartItem = cart.find((item) => item.id === productID);
    if (cartItem) {
      cartItem.quantity = quantity;
      saveToLocalStorage();
      calculateCartTotal();
      updateCartIcon();
    }
  }
}
//save to localStorage
function saveToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

//render products on Cart Page
function renderCartItems() {
  cartItemElement.innerHTML = cart
    .map(
      (item) => `
  <div class="cart-item">
    <img src="${item.image}" alt="${item.title}" />
    <div class="cart-item-info">
      <h2 class="cart-item-title">${item.title}</h2>
      <input
        type="number"
        class="cart-item-quantity"
        name=""
        min="1"
        value="${item.quantity}"
        data-id="${item.id}"
      />
    </div>
    <h2 class="cart-item-price">$${item.price}</h2>
    <button class="remove-from-cart" data-id="${item.id}">Remove</button>
  </div>
    `
    )
    .join('');
  9;
  //Remove from Cart
  const removeButtons = document.getElementsByClassName('remove-from-cart');
  for (let i = 0; i < removeButtons.length; i++) {
    const removeButton = removeButtons[i];
    removeButton.addEventListener('click', removeFromCart);
  }
  //QuantityChange
  const quantityInputs = document.querySelectorAll('.cart-item-quantity');
  quantityInputs.forEach((input) => {
    input.addEventListener('change', changeQunantity);
  });
}

//Calculate Total
function calculateCartTotal() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
}

//check if on cart page
if (window.location.pathname.includes('cart.html')) {
  renderCartItems();
  calculateCartTotal();
} else if (window.location.pathname.includes('success.html')) {
  clearCart();
} else {
  renderProducts();
}
//Empty Cart on Successful Payment
function clearCart() {
  cart = [];
  saveToLocalStorage();
  updateCartIcon();
}

//Cart Icon Quantity
const cartIcon = document.getElementById('cart-icon');

function updateCartIcon() {
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartIcon.setAttribute('data-quantity', totalQuantity);
}
updateCartIcon();

function updateCartIconOnCartChange() {
  updateCartIcon();
}

window.addEventListener('storage', updateCartIconOnCartChange);

function updateCartIcon() {
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartIcon = document.getElementById('cart-icon');
  cartIcon.setAttribute('data-quantity', totalQuantity);
}

renderProducts();
renderCartItems();
calculateCartTotal();
