// document.addEventListener("DOMContentLoaded", () => {
//     const productSection = document.getElementById("product-section");
//     const cartItemsList = document.getElementById("cart-items");
//     const totalPriceElement = document.getElementById("total-price");
//     const cartButton = document.getElementById("cart-icon");
//     const cart = [];
  
//     fetch("data.json")
//       .then((res) => res.json())
//       .then((data) => {
//         data.forEach((product) => {
//           const card = document.createElement("div");
//           card.className = "p-3 max-w-xs rounded bg-gray-100";
//           card.innerHTML = `
//             <img src="${product.thumbnail}" class="w-full" alt="${product.title}">
//             <h1 class="font-bold text-xl pt-3">${product.title}</h1>
//             <p class="text-gray-700">$${product.price}</p>
//             <p class="text-gray-600 py-3">${product.description}</p>
//             <button class="w-full text-white bg-red-500 py-2 px-4 rounded text-sm font-semibold mb-2">Add to order</button>
//             <button class="w-full text-red-400 py-2 px-4 rounded text-sm font-semibold border border-2 border-red-400">Customize</button>
//           `;
//           productSection.appendChild(card);
//         });
//       });
//   });
  

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
            <button onclick="addToOrder('${product.title}', ${product.price})" class="w-full text-white bg-red-500 py-2 px-4 rounded text-sm font-semibold mb-2">Add to order</button>
            <button class="w-full text-red-400 py-2 px-4 rounded text-sm font-semibold border border-2 border-red-400">Customize</button>
          `;
          productSection.appendChild(card);
        });
      });
  
      window.addToOrder = function addToOrder(itemName, price) {
      const existingItem = cart.find(item => item.name === itemName);
  
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ name: itemName, price: price, quantity: 1 });
      }
  
      updateCartSidebar();
      showCartSidebar();
    }
  
    function updateCartSidebar() {
      cartItemsList.innerHTML = '';
  
      cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <div class="flex items-center justify-between py-2 border-b border-gray-300">
            <div class="flex items-center">
              <div>
                <p class="text-lg font-medium">${item.name} x${item.quantity}</p>
                <p class="text-gray-600">$${item.price}</p>
              </div>
            </div>
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
      cartSidebar.classList.remove('hidden');
    }
  
    closeCartButton.addEventListener('click', () => {
      cartSidebar.classList.add('hidden');
    });
  });
  