const products = [
    { id: 1, name: "iPhone 14", price: 70000, category: "Mobile", image: "images/iphone.jpg" },
    { id: 2, name: "Samsung Galaxy", price: 55000, category: "Mobile", image: "images/iphone.jpg" },
    { id: 3, name: "HP Laptop", price: 65000, category: "Laptop", image: "images/hp.jpg" },
    { id: 4, name: "Dell Laptop", price: 72000, category: "Laptop", image: "images/hp.jpg" },
    { id: 5, name: "Headphones", price: 2000, category: "Accessory", image: "images/head.jpg" },
    {id :6,name:"Maxis",price:800,category:"Clothing",image:"images/dress.jpg"},
    {id:7 , name:"T-shirts", price:600,category:"Clothing", image:"images/tshirt.jpg"}
];

let currentCategory = "All";

function displayProducts(list) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    document.getElementById("productList").innerHTML = list.map(p => {
        const isAdded = cart.some(item => item.id === p.id);

        return `
            <div class="card">
                <img src="${p.image}">
                <h3>${p.name}</h3>
                <p>₹${p.price}</p>
                <button 
                    onclick="addToCart(${p.id}, this)" 
                    ${isAdded ? "disabled" : ""}>
                    ${isAdded ? "Added to Cart" : "Add to Cart"}
                </button>
            </div>
        `;
    }).join("");
}
function addToCart(id, button) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let item = cart.find(p => p.id === id);

    if (item) {
        item.qty++;
    } else {
        const product = products.find(p => p.id === id);
        cart.push({ ...product, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // UI update
    button.innerText = "Added to Cart";
    button.disabled = true;
}


function filterProducts(category) {
    currentCategory = category;
    if (category === "All") displayProducts(products);
    else displayProducts(products.filter(p => p.category === category));
}

function searchProducts() {
    const text = searchInput.value.toLowerCase();
    displayProducts(products.filter(p =>
        p.name.toLowerCase().includes(text) ||
        p.category.toLowerCase().includes(text)
    ));
}

displayProducts(products);
