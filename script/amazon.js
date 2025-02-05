import { cart, addToCart, clearCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './util/money.js';

// Function to render products
function renderProducts() {
    let productsHTML = '';
    products.forEach((product) => {
        productsHTML += `
            <div class="product-container">
                <div class="product-image-container">
                    <img class="product-image" src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-name limit-text-to-2-lines">
                    ${product.name}
                </div>
                <div class="product-rating-container">
                    <img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars * 10}.png" alt="Rating">
                    <div class="product-rating-count link-primary">
                        ${product.rating.count}
                    </div>
                </div>
                <div class="product-price">
                    $${formatCurrency(product.priceCents / 100)}
                </div>
                <div class="product-quantity-container">
                    <select class="js-quantity-select">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>
                <div class="product-spacer"></div>
                <div class="added-to-cart">
                    <img src="images/icons/checkmark.png" alt="Checkmark">
                    Added
                </div>
                <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
                    Add to Cart
                </button>
            </div>
        `;
    });
    document.querySelector('.js-products-grid').innerHTML = productsHTML;
}

// Function to update cart quantity
function updateCartQuantity() {
    let cartQuantity = cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
    document.querySelector('.js-cart-quantity').textContent = cartQuantity;
}

// Function to handle add to cart
function handleAddToCart() {
    document.querySelectorAll('.js-add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            const quantitySelect = button.closest('.product-container').querySelector('.js-quantity-select');
            const quantity = parseInt(quantitySelect.value, 10); // Get selected quantity
            addToCart(productId, quantity); // Pass quantity to addToCart function
            updateCartQuantity();
        });
    });
}

// Initialize page
renderProducts();
handleAddToCart();
updateCartQuantity();
