document.addEventListener("DOMContentLoaded", () => {
  const productSection = document.getElementById("product-section");
  const cartItemsList = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");
  const cartButton = document.getElementById("cart-icon");
  const cartSidebar = document.querySelector(".cart-section");
  const closeCartButton = document.getElementById("close-cart");
  const cart = [];


// -----------    Data Fetching   -----------  // 
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
            <button id="add-to-order-${product.id}" onclick="addToOrder('${product.title}', ${product.price}, '${product.image}','add-to-order-${product.id}', ${product.id})" class="w-full text-white bg-red-500 py-2 px-4 rounded text-sm font-semibold mb-2">Add to order</button>
            <button class="w-full text-red-400 py-2 px-4 rounded text-sm font-semibold border border-2 border-red-400">Customize</button>
          `;
          productSection.appendChild(card);
      });
    });

  function updateCartIcon() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartButton.innerHTML = `<sup class="bg-red-500 text-white p-1 rounded text-xs">${cartCount}</sup>`;
  }

  window.addToOrder = function addToOrder(itemName, price, image, buttonId, productId) {
    const existingItem = cart.find((item) => item.name === itemName);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({id: productId, name: itemName, price: price, quantity: 1, image: image });
    }

    updateCartSidebar();
    showCartSidebar();
    updateCartIcon();

    const addButton = document.getElementById(buttonId);
  if (addButton) {
    addButton.disabled = true;
    addButton.className= "w-full text-white bg-gray-500 py-2 px-4 rounded text-sm font-semibold mb-2"
    addButton.innerHTML= `Added to Cart`
  }
  };


  // -----------   updateCartSidebar function   -----------  // 
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
          <div class="ml-3 text-white">
            <p class=" font-medlium">${item.name}</p>
            <p class="text-xs mb-2">$${item.price}</p>
            <button onclick="minusQuantity(${index})" class= "bg-gray-200 text-black px-1 rounded">-</button>
            <span class="bg-white px-3 text-black">${item.quantity}</span>
            <button onclick="plusQuantity(${index})" class= "bg-gray-200 text-black px-1 rounded">+</button>

          </div>
        </div>
        
        <button class="absolute top-0 right-0 text-red-500 bg-white p-1 rounded text-xs cursor-pointer" onclick="deleteItem(${index})">
          <i class="fas fa-trash"></i>
        </button>
        
      </div>
        `;
        
      cartItemsList.appendChild(listItem);
    });

    totalPriceElement.innerHTML = `Total: $${calculateTotalPrice()}`;
  }

  window.minusQuantity= function minusQuantity(index) {
    const existing = cart[index];
  
    if (existing && existing.quantity > 1) {
        existing.quantity -= 1;
    }
  
    updateCartSidebar();
  }
  
  window.plusQuantity= function plusQuantity(index) {
    const existing = cart[index];
  
    if (existing) {
        existing.quantity += 1;
    }
  
    updateCartSidebar();
  }


  // -----------   Delete item function   -----------  // 
  window.deleteItem= function deleteItem(index) {
    const deletedItem = cart[index];
    cart.splice(index, 1);
    updateCartSidebar();
    updateCartIcon();

    const addButton = document.getElementById(`add-to-order-${deletedItem.id}`);
    if (addButton) {
      addButton.disabled = false;
      addButton.className = "w-full text-white bg-red-500 py-2 px-4 rounded text-sm font-semibold mb-2";
      addButton.innerHTML = "Add to Order";
    }
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
