// Sample product data
const products = [
    { id: 1, name: "Product 1", price: 10.00, image: "flower.jpeg" },
    { id: 2, name: "Product 2", price: 15.00, image: "flower2.jpeg" },
    { id: 3, name: "Product 3", price: 20.00, image: "flower3.jpeg" }
];

// Initialize cart data from localStorage, if available
const cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to render the product list
function renderProducts() {
    const itemsList = document.getElementById("items").querySelector("ul");

    products.forEach(product => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <div class="product">
                <img src="${product.image}" alt="${product.name}" />
                <p>${product.name} - $${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        itemsList.appendChild(listItem);
    });
}

// Function to add an item to the cart
function addToCart(productId) {
    const product = products.find(item => item.id === productId);

    if (product) {
        const existingCartItem = cart.find(item => item.id === productId);

        if (existingCartItem) {
            // If the item is already in the cart, increase its quantity
            existingCartItem.quantity++;
        } else {
            // If the item is not in the cart, add it with a quantity of 1
            cart.push({ ...product, quantity: 1 });
        }

        updateCart();
        // Save the updated cart to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
    }
}

// Function to remove an item from the cart
function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);

    if (itemIndex !== -1) {
        cart.splice(itemIndex, 1);
        updateCart();
        // Save the updated cart to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
    }
}

// Function to update the cart display
function updateCart() {
    const cartList = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartList.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <div class="cart-product">
                <img src="${item.image}" alt="${item.name}" />
                <p>${item.name} - $${item.price} x ${item.quantity}</p>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
        cartList.appendChild(listItem);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = total.toFixed(2);
}

// Initialize the shopping cart
renderProducts();
updateCart(); // Load and display the cart items on page load
