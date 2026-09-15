document.addEventListener("DOMContentLoaded", () => {
  const cartKey = "beanBoutiqueCart";
  let cart = JSON.parse(localStorage.getItem(cartKey) || "[]");

  function saveCart() {
    localStorage.setItem(cartKey, JSON.stringify(cart));
    updateCount();
    renderCart();
  }

  function updateCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll("#cart-count").forEach(el => el.textContent = count);
  }

  /* Add products to cart */
  document.querySelectorAll(".add-cart").forEach(button => {
    button.addEventListener("click", () => {
      const name = button.dataset.name;
      const price = Number(button.dataset.price);
      const existing = cart.find(item => item.name === name);

      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({
          name: name,
          price: price,
          quantity: 1
        });
      }

      saveCart();

      button.textContent = "Added ✓";

      /* SweetAlert2 plugin */
      if (typeof Swal !== "undefined") {
        Swal.fire({
          title: "Added to cart!",
          text: `${name} has been added to your cart.`,
          icon: "success",
          confirmButtonText: "Continue shopping",
          confirmButtonColor: "#3c2920",
          customClass: {
            popup: "bean-popup"
          }
        });
      }

      setTimeout(() => {
        button.textContent = "Add to cart";
      }, 900);
    });
  });

  /* Display cart items */
  function renderCart() {
    const box = document.querySelector("#cart-items");

    if (!box) return;

    if (!cart.length) {
      box.innerHTML = `
        <div class="feature-card">
          <h2>Your cart is empty</h2>
          <p>Browse our coffee and equipment to add something.</p>
          <a class="btn small" href="coffee.html">Shop coffee</a>
        </div>`;
    } else {
      box.innerHTML = cart.map((item, index) => `
        <div class="cart-row">
          <div>
            <h3>${item.name}</h3>
            <p>$${item.price.toFixed(2)} × ${item.quantity}</p>
          </div>

          <strong>$${(item.price * item.quantity).toFixed(2)}</strong>

          <button class="remove" data-index="${index}">
            Remove
          </button>
        </div>
      `).join("");

      box.querySelectorAll(".remove").forEach(btn => {
        btn.addEventListener("click", () => {
          cart.splice(Number(btn.dataset.index), 1);
          saveCart();
        });
      });
    }

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const subtotal = document.querySelector("#subtotal");
    const totalEl = document.querySelector("#cart-total");

    if (subtotal) {
      subtotal.textContent = "$" + total.toFixed(2);
    }

    if (totalEl) {
      totalEl.textContent = "$" + total.toFixed(2);
    }
  }

  updateCount();
  renderCart();

  /* Coffee search */
  const search = document.querySelector("#coffee-search");

  if (search) {
    search.addEventListener("input", () => {
      const term = search.value.toLowerCase().trim();

      document.querySelectorAll(".searchable-item").forEach(item => {
        item.style.display =
          item.dataset.search.includes(term) ? "" : "none";
      });
    });
  }

  /* Subscription plans */
  document.querySelectorAll(".subscribe").forEach(btn => {
    btn.addEventListener("click", () => {
      const name = btn.dataset.plan;
      const price = Number(btn.dataset.price);
      const existing = cart.find(item => item.name === name);

      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({
          name: name,
          price: price,
          quantity: 1
        });
      }

      saveCart();

      btn.textContent = "Added ✓";

      /* SweetAlert2 plugin */
      if (typeof Swal !== "undefined") {
        Swal.fire({
          title: "Plan added!",
          text: `${name} has been added to your cart.`,
          icon: "success",
          confirmButtonText: "Continue shopping",
          confirmButtonColor: "#3c2920",
          customClass: {
            popup: "bean-popup"
          }
        });
      }

      setTimeout(() => {
        btn.textContent = "Choose plan";
      }, 900);
    });
  });

  /* Checkout */
  const checkout = document.querySelector("#checkout");

  if (checkout) {
    checkout.addEventListener("click", () => {
      cart = [];
      saveCart();

      alert("Checkout completed. Thank you for your order!");
    });
  }

  /* Mobile navigation */
  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-wrap nav");

  if (menu && nav) {
    menu.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }

  /* Welcome modal */
  const modal = document.querySelector("#welcome-modal");

  if (
    modal &&
    !localStorage.getItem("beanBoutiqueWelcomeSeen")
  ) {
    setTimeout(() => {
      modal.classList.add("show");
    }, 1200);
  }

  const close = document.querySelector(".close-modal");

  if (close) {
    close.addEventListener("click", () => {
      modal.classList.remove("show");
      localStorage.setItem(
        "beanBoutiqueWelcomeSeen",
        "true"
      );
    });
  }

  /* Welcome sign-up form */
  const form = document.querySelector("#signup-form");

  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();

      localStorage.setItem(
        "beanBoutiqueWelcomeSeen",
        "true"
      );

      modal.classList.remove("show");

      alert(
        "Thank you for signing up! Your 10% introductory offer has been recorded."
      );
    });
  }

  /* GLightbox plugin */
  if (typeof GLightbox !== "undefined") {
    GLightbox({
      selector: ".glightbox"
    });
  }
});

// Popular Picks slideshow
const slides = document.querySelectorAll(".featured-slide");
const dots = document.querySelectorAll(".slide-dot");
const previousButton = document.querySelector(".slide-button.previous");
const nextButton = document.querySelector(".slide-button.next");

let currentSlide = 0;

function showSlide(index) {

    slides.forEach(function(slide) {
        slide.classList.remove("active");
    });

    dots.forEach(function(dot) {
        dot.classList.remove("active");
    });

    slides[index].classList.add("active");
    dots[index].classList.add("active");

    currentSlide = index;
}

if (slides.length > 0) {

    nextButton.addEventListener("click", function() {

        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        showSlide(currentSlide);
    });


    previousButton.addEventListener("click", function() {

        currentSlide--;

        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }

        showSlide(currentSlide);
    });


    dots.forEach(function(dot, index) {

        dot.addEventListener("click", function() {
            showSlide(index);
        });

    });

}
