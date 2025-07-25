import { cart, removeFromCart } from '../data/cart.js';
import { products, getProduct } from '../data/products.js';
import { formatCurrency } from './util/money.js';
import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions,getDeliveryOption } from '../data/deliveryOptions.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';


hello();

const today = dayjs();

function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';
    deliveryOptions.forEach((deliveryOption) => {
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');
        const priceString = deliveryOption.priceCents === 0
            ? 'FREE'
            : `$${formatCurrency(deliveryOption.priceCents)}`;

        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

        html += `
        <div class="delivery-option">
            <input type="radio" 
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input" name="delivery-option-${matchingProduct.id}" value="${deliveryOption.id}">
            <div>
                <div class="delivery-option-date">${dateString}</div>
                <div class="delivery-option-price">
                ${priceString} - Shipping</div>
            </div>
        </div>`;
        
    });
    renderPaymentSummary();
    return html;
}

function updateDeliveryDates() {
    document.querySelectorAll('.cart-item-container').forEach((container) => {
        const productId = container.dataset.productId;
        const selectedOptionInput = container.querySelector(`input[name="delivery-option-${productId}"]:checked`);

        if (selectedOptionInput) {
            const selectedOptionId = selectedOptionInput.value;
            const selectedDeliveryOption = deliveryOptions.find(option => option.id === selectedOptionId);

            if (selectedDeliveryOption) {
                const deliveryDate = today.add(selectedDeliveryOption.deliveryDays, 'days');
                const deliveryDateString = deliveryDate.format('dddd, MMMM D');
                container.querySelector('.delivery-date').textContent = `Delivery date: ${deliveryDateString}`;
            }
            
        }
        
    });
    renderPaymentSummary();
}
function renderOrderSummary() {
    let cartSummaryHTML = '';

    cart.find((cartItem) => {
        const productId = cartItem.productId;
        let matchingProduct;
        products.forEach((product) => {
            if (product.id === productId) {
                matchingProduct = product;
            }
        });

        if (matchingProduct) { 
            
            const selectedDeliveryOption = deliveryOptions.find(option => option.id === cartItem.deliveryOptionId);
            const deliveryDays = selectedDeliveryOption ? selectedDeliveryOption.deliveryDays : 0;
            const deliveryDate = today.add(deliveryDays, 'days');
            const deliveryDateString = deliveryDate.format('dddd, MMMM D');
           
            cartSummaryHTML += `
            <div class="cart-item-container js-cart-item-container-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                <div class="delivery-date">
                    Delivery date: ${deliveryDateString}
                </div>
                <div class="cart-item-details-grid">
                    <img class="product-image" src="${matchingProduct.image}" alt="${matchingProduct.name}">
                    <div class="cart-item-details">
                        <div class="product-name">${matchingProduct.name}</div>
                        <div class="product-price">$${formatCurrency(matchingProduct.priceCents)}</div>
                        <div class="product-quantity">
                            <span>Quantity: <span class="quantity-label">${cartItem.quantity}</span></span>
                            <span class="update-quantity-link link-primary">Update</span>
                            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">Delete</span>
                        </div>
                    </div>
                    <div class="delivery-options">
                        <div class="delivery-options-title">Choose a delivery option:</div>
                        ${deliveryOptionsHTML(matchingProduct, cartItem)}
                    </div>
                </div>
            </div>`;
        } else {
            console.error(`No matching product found for productId: ${productId}`);
        }
    });

    
    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

    
    document.querySelectorAll('.js-delete-link').forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            removeFromCart(productId);
            renderPaymentSummary();
            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            if (container) {
                container.remove();
            }
        });
    });


    document.querySelectorAll('.delivery-option-input').forEach(input => {
        input.addEventListener('change', () => {
            updateDeliveryDates();
            
        });
    });

    renderPaymentSummary();
    updateDeliveryDates();
}


renderOrderSummary();
