// Run only after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // --- OTP Login Validation ---
  const button = document.getElementById("otpButton");
  const input = document.getElementById("userInput");
  const message = document.getElementById("message");

  if (button && input && message) {
    button.addEventListener("click", () => {
      const value = input.value.trim();
      message.style.display = "none";

      if (value === "") {
        showMessage("Please enter your email or mobile number.", "red");
        return;
      }

      if (!isValidEmail(value) && !isValidPhone(value)) {
        showMessage("Please enter a valid email or 10-digit mobile number.", "red");
        return;
      }

      showMessage("✅ OTP Sent! Please check your device.", "green");

      // Later, trigger API call to backend here
    });

    input.addEventListener("input", () => message.style.display = "none");
    input.addEventListener("focus", () => message.style.display = "none");
  }

  function showMessage(text, color) {
    message.innerText = text;
    message.style.color = color;
    message.style.display = "block";
  }

  function isValidEmail(email) {
    const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return re.test(email);
  }

  function isValidPhone(phone) {
    return /^\d{10}$/.test(phone);
  }

  // --- Cart Handling ---
  let cart = [];

  // Load existing cart if present
  const existingCart = localStorage.getItem("cart");
  if (existingCart) {
    cart = JSON.parse(existingCart);
    updateCartCount();
  }

  // Add item to cart
  window.addToCart = function (productName, price) {
    cart.push({ name: productName, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${productName} added to cart!`);
    updateCartCount();
  };

  // Buy now button
  window.buyNow = function (name, price) {
    localStorage.setItem("buyNowItem", JSON.stringify({ name, price }));
    window.location.href = "checkout.html";
  };

  // Update cart icon badge
  function updateCartCount() {
    const cartCount = document.querySelector(".cart-count");
    if (cartCount) {
      cartCount.textContent = cart.length;
    }
  }
});
