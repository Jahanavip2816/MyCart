let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCart() {
    const cartDiv = document.getElementById("cartItems");
    const totalDiv = document.getElementById("totalAmount");
    cartDiv.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.qty;

        cartDiv.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}">
                <h4>${item.name}</h4>
                <p>₹${item.price}</p>
                <button onclick="decrease(${item.id})">-</button>
                <span>${item.qty}</span>
                <button onclick="increase(${item.id})">+</button>
                <button onclick="removeItem(${item.id})">❌</button>
            </div>
        `;
    });

    totalDiv.innerText = total;
    localStorage.setItem("cart", JSON.stringify(cart));
}

function increase(id) {
    cart.find(i => i.id === id).qty++;
    updateCart();
}

function decrease(id) {
    const item = cart.find(i => i.id === id);
    item.qty > 1 ? item.qty-- : removeItem(id);
    updateCart();
}

function removeItem(id) {
    cart = cart.filter(i => i.id !== id);
    updateCart();
}

updateCart();
