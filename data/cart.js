
export let cart = JSON.parse(localStorage.getItem('cart')) || [];


export function clearCart() {
    cart = [];
    saveToStorage();
}


function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}


export function addToCart(productId, quantity = 1) {
    let matchingItem = cart.find(item => item.productId === productId);

    if (matchingItem) {
        matchingItem.quantity += quantity;
    } else {
        cart.push({
            productId: productId,
            quantity: quantity,
            deliveryOptionId: '1' 
        });
    }
    saveToStorage();
}


export function removeFromCart(productId) {
    cart = cart.filter(item => item.productId !== productId);
    saveToStorage();
}
