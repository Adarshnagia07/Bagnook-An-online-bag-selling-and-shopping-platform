document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");
  const title = document.getElementById("category-title");
  const grid = document.getElementById("category-products");

  const products = {
    "Trolley Bags": [
      { name: "VIP Check-in Trolley", price: "₹3,999", img: "assets/5100eht1tbl_01.webp" },
      { name: "Skyline Spinner", price: "₹2,999", img: "assets/FP8 (0) 09 001yl.avif" },
      { name: "American Tourister Trolley", price: "₹4,499", img: "assets/trolley1.webp" },
      { name: "Safari Trolley Bag", price: "₹3,499", img: "assets/trolley3.webp" },
      { name: "Wildcraft Trolley", price: "₹5,499", img: "assets/trolley4.webp" }
    ],
    "Handbags": [
      { name: "Lavie Stylish Handbag", price: "₹1,299", img: "assets/lavie.jpg" },
      { name: "Caprese Tote", price: "₹1,899", img: "assets/tote.webp" },
      { name: "Fastrack Handbag", price: "₹1,499", img: "assets/handbag1.jpg" },
      { name: "Baggit Sling Bag", price: "₹1,199", img: "assets/handbag4.webp" },
      { name: "Hidesign Leather Handbag", price: "₹3,999", img: "assets/handbag3.webp" }
    ],
    "Backpacks": [
      { name: "American Tourister Backpack", price: "₹1,599", img: "assets/amt.jpg" },
      { name: "Skybags Daypack", price: "₹1,099", img: "assets/skydf.jpg" },
      { name: "Wildcraft Backpack", price: "₹1,799", img: "assets/backpack3.webp" },
      { name: "Puma Sports Backpack", price: "₹2,299", img: "assets/backpack4.avif" },
      { name: "Fastrack Urban Backpack", price: "₹1,399", img: "assets/backpack5.jpg" }
    ],
    "Duffle Bags": [
      { name: "Nike Duffle", price: "₹2,099", img: "assets/NK+ONE+DUFFEL.avif" },
      { name: "Wildcraft Gym Duffel", price: "₹1,499", img: "assets/wildruck.jpg" },
      { name: "Puma Weekend Duffel", price: "₹1,799", img: "assets/duffle3.avif" },
      { name: "Adidas Travel Duffel", price: "₹2,499", img: "assets/duffel4.avif" },
      { name: "Fastrack Duffle Bag", price: "₹1,299", img: "assets/duffel5.jpg" }
    ],
    "Sling Bags": [
      { name: "Urban Sling", price: "₹999", img: "assets/slingbag.webp" },
      { name: "Fastrack Sling Bag", price: "₹1,199", img: "assets/sling2.jpg" },
      { name: "Hidesign Sling Bag", price: "₹2,499", img: "assets/sling3.webp" },
      { name: "Baggit Sling Bag", price: "₹1,799", img: "assets/sling4.jpg" },
      { name: "Lavie Sling Bag", price: "₹1,399", img: "assets/sling5.avif" }
    ],
    "Rucksacks": [
      { name: "Trek Rucksack 60L", price: "₹2,199", img: "assets/rucksack.jpg" },
      { name: "Wildcraft Rucksack", price: "₹2,499", img: "assets/rucksack2.webp" },
      { name: "Puma Rucksack", price: "₹2,799", img: "assets/rucksack3.webp" },
      { name: "Fastrack Rucksack", price: "₹2,999", img: "assets/rucksack4.avif" },
      { name: "Skybags Rucksack", price: "₹1,999", img: "assets/rucksack5.webp" }
    ],
    "Tote Bags": [
      { name: "Cotton Tote", price: "₹699", img: "assets/tote.webp" },
      { name: "Jute Tote", price: "₹799", img: "assets/tote2.webp" },
      { name: "Canvas Tote", price: "₹899", img: "assets/tote3.webp" },
      { name: "Leather Tote", price: "₹1,499", img: "assets/tote4.webp" },
      { name: "Designer Tote", price: "₹2,199", img: "assets/tote5.avif" }
    ],
    "Clutches": [
      { name: "Black Party Clutch", price: "₹499", img: "assets/clutch.webp" },
      { name: "Golden Evening Clutch", price: "₹599", img: "assets/clutch2.avif" },
      { name: "Silver Clutch", price: "₹699", img: "assets/clutch3.webp" },
      { name: "Red Velvet Clutch", price: "₹799", img: "assets/clutch4.jpg" },
      { name: "Beaded Clutch", price: "₹899", img: "assets/clutch5.jpg" }
    ],
    "Combos": [
      { name: "Black Trolley Combo", price: "₹1,999", img: "assets/combo.jpg" },
      { name: "Trolley Combo", price: "₹3,499", img: "assets/combo1.jpeg" },
      { name: "Designer Trolley Combo", price: "₹4,199", img: "assets/combo3.webp" },
      { name: "Trolley + Backpack Combo", price: "₹5,999", img: "assets/combo4.webp" },
      { name: "Designer Trolley Combo", price: "₹1,299", img: "assets/combo2.jpg" }
    ]
  };

  function buyNow(name, price, img) {
    const item = { name, price, img };
    localStorage.setItem('buyNowItem', JSON.stringify(item));
    window.location.href = "checkout.html";
  }

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const countEl = document.getElementById("cart-count");
    if (countEl) countEl.innerText = cart.length;
  }

  title.innerText = category ? category : "Category";

  if (products[category]) {
    products[category].forEach(p => {
      const card = document.createElement("div");
      card.className = "deal-card";
      card.innerHTML = `
        <img src="${p.img}" alt="${p.name}">
        <h4>${p.name}</h4>
        <p class="price">${p.price}</p>
        <div class="btn-group">
          <button class="btn btn-cart">Add to Cart</button>
          <button class="btn btn-buy">Buy Now</button>
        </div>
      `;
      grid.appendChild(card);
    });

    // Event Delegation for Add to Cart / Buy Now
    grid.addEventListener("click", function (e) {
      const card = e.target.closest(".deal-card");
      if (!card) return;

      const name = card.querySelector("h4").innerText;
      const price = card.querySelector(".price").innerText;
      const img = card.querySelector("img").src;

      if (e.target.classList.contains("btn-cart")) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push({ name, price, img });
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        alert(`✅ ${name} added to cart!`);
      }

      if (e.target.classList.contains("btn-buy")) {
        buyNow(name, price, img);
      }
    });
  } else {
    grid.innerHTML = "<p>No products found.</p>";
  }

  updateCartCount();
});
