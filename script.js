document.addEventListener("DOMContentLoaded", () => {
    const productSection = document.getElementById("product-section");
    const cartItemsList = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const cartButton = document.getElementById("cart-icon");
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
            <button class="w-full text-white bg-red-500 py-2 px-4 rounded text-sm font-semibold mb-2">Add to order</button>
            <button class="w-full text-red-400 py-2 px-4 rounded text-sm font-semibold border border-2 border-red-400">Customize</button>
          `;
          productSection.appendChild(card);
        });
      });
  });
  