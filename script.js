document.addEventListener("DOMContentLoaded", () => {
  const productSection = document.getElementById("product-section");
  const cartItemsList = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");
  const cartButton = document.getElementById("cart-icon");
  const cartSidebar = document.querySelector(".cart-section");
  const closeCartButton = document.getElementById("close-cart");
  const cart = [];

  fetch("data.json")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((product) => {
        const card = document.createElement("div");
        card.className = "p-3 max-w-xs rounded bg-gray-100";
        card.innerHTML = `
            <img src="${product.thumbnail}" class="w-full" alt="${product.title}">
            <h1 class="font-bold text-xl pt-3">${product.title}</h1>
            <p class="text-gray-700">$${product.price}</p>
            <p class="text-gray-600 py-3">${product.description}</p>
            <button onclick="addToOrder('${product.title}', ${product.price}, '${product.image}')" class="w-full text-white bg-red-500 py-2 px-4 rounded text-sm font-semibold mb-2">Add to order</button>
            <button class="w-full text-red-400 py-2 px-4 rounded text-sm font-semibold border border-2 border-red-400">Customize</button>
          `;
        productSection.appendChild(card);
      });
    });

  function updateCartIcon() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartButton.innerHTML = `<sup class="bg-red-500 text-white p-1 rounded text-xs">${cartCount}</sup>`;
  }

  window.addToOrder = function addToOrder(itemName, price, image) {
    const existingItem = cart.find((item) => item.name === itemName);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name: itemName, price: price, quantity: 1, image: image });
    }

    updateCartSidebar();
    showCartSidebar();
    updateCartIcon();
  };

  function updateCartSidebar() {
    cartItemsList.innerHTML = "";

    cart.forEach((item, index) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <div class="flex items-center justify-between p-2 border border-gray-300 rounded mb-2 relative">
        <div class="flex items-center">
          <div>
            <img src="${item.image}" class="w-20 h-20 rounded" alt="${item.name} image">
          </div>
          <div class="ml-4 text-white">
            <p class=" font-medlium">${item.name} x${item.quantity}</p>
            <p class="text-xs">$${item.price}</p>
          </div>
        </div>
        <button class="absolute top-0 right-0 text-red-500 bg-white p-1 rounded text-xs cursor-pointer" onclick="removeItem(${index})">
          <i class="fas fa-trash"></i>
        </button>
      </div>
        `;
      cartItemsList.appendChild(listItem);
    });

    totalPriceElement.innerHTML = `Total Price: $${calculateTotalPrice()}`;
  }

  function calculateTotalPrice() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  function showCartSidebar() {
    cartSidebar.classList.remove("hidden");
  }

  closeCartButton.addEventListener("click", () => {
    cartSidebar.classList.add("hidden");
  });
});
