// ====== الصوت ======
const clickSound = document.getElementById("clickSound");
function playClick() {
  if (!clickSound) return;
  clickSound.currentTime = 0;
  clickSound.volume = 0.3;
  clickSound.play().catch(()=>{});
}

// ====== السلة ======
let cart = [];

// ====== الانتقال للقسم ======
function goTo(id) {
  playClick();
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// ====== إضافة عنصر ======
function add(name, option, price) {
  playClick();

  const found = cart.find(
    i => i.name === name && i.option === option
  );

  if (found) {
    found.qty++;
  } else {
    cart.push({
      name,
      option,
      price,
      qty: 1
    });
  }

  document.getElementById("cartBtn").style.display = "block";
  renderCart();
}

// ====== عرض السلة ======
function renderCart() {
  const box = document.getElementById("cartItems");
  const totalEl = document.getElementById("total");

  if (!box || !totalEl) return;

  box.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;

    box.innerHTML += `
      <div class="cart-item">
        <div class="cart-info">
          <strong>${item.name}</strong>
          <div class="cart-option">${item.option}</div>
          <div class="cart-price">${itemTotal} د.ع</div>
        </div>

        <div class="cart-actions">
          <button onclick="decrease(${index})">−</button>
          <span>${item.qty}</span>
          <button onclick="increase(${index})">+</button>
          <button onclick="removeItem(${index})">🗑</button>
        </div>
      </div>
    `;
  });

  totalEl.innerText = total;
}

// ====== زيادة الكمية ======
function increase(index) {
  playClick();
  cart[index].qty++;
  renderCart();
}

// ====== تقليل الكمية ======
function decrease(index) {
  playClick();
  cart[index].qty--;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  renderCart();
}

// ====== حذف عنصر ======
function removeItem(index) {
  playClick();
  cart.splice(index, 1);
  renderCart();

  if (cart.length === 0) {
    document.getElementById("cartBtn").style.display = "none";
  }
}

function toggleCart() {
  const cart = document.getElementById("cart");
  const cartBtn = document.getElementById("cartBtn");

  cart.classList.toggle("hidden");

  // إذا السلة مفتوحة أخفي زر السلة
  if (!cart.classList.contains("hidden")) {
    cartBtn.style.display = "none";
  } else {
    cartBtn.style.display = "block";
  }
}

// ====== إرسال الطلب واتساب ======
function send() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();

  // تحقق البيانات
  if (!name) {
    alert("الاسم إجباري");
    return;
  }

  if (!/^07\d{9}$/.test(phone)) {
    alert("رقم الهاتف يجب أن يكون 11 رقم ويبدأ بـ 07");
    return;
  }

  if (!address) {
    alert("العنوان إجباري");
    return;
  }

  if (cart.length === 0) {
    alert("السلة فارغة");
    return;
  }

  let message = `طلب جديد 🍔%0A`;
  message += `الاسم: ${name}%0A`;
  message += `الهاتف: ${phone}%0A`;
  message += `العنوان: ${address}%0A`;
  message += `--------------------%0A`;

  cart.forEach(item => {
    message += `${item.name} (${item.option}) × ${item.qty}%0A`;
  });

  message += `--------------------%0A`;
  message += `المجموع: ${document.getElementById("total").innerText} د.ع`;

  // غيّر الرقم لرقم المطعم
  const whatsappNumber = "9647811100884";

  window.open(
    `https://wa.me/${whatsappNumber}?text=${message}`,
    "_blank"
  );
}
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const addressInput = document.getElementById("address");

// الاسم
nameInput.addEventListener("input", () => {
  if (nameInput.value.trim().length >= 3) {
    setValid(nameInput);
  } else {
    setInvalid(nameInput);
  }
});

// العنوان
addressInput.addEventListener("input", () => {
  if (addressInput.value.trim().length >= 5) {
    setValid(addressInput);
  } else {
    setInvalid(addressInput);
  }
});

// رقم الهاتف (11 رقم + يبدأ 07)
phoneInput.addEventListener("input", () => {
  const phoneRegex = /^07\d{9}$/;
  if (phoneRegex.test(phoneInput.value)) {
    setValid(phoneInput);
  } else {
    setInvalid(phoneInput);
  }
});

function setValid(input) {
  input.classList.add("valid");
  input.classList.remove("invalid");
}

function setInvalid(input) {
  input.classList.add("invalid");
  input.classList.remove("valid");
}
// القائمة
const menuBtn = document.getElementById("menuBtn");
const menuPanel = document.getElementById("menuPanel");

menuBtn.onclick = () => {
  menuPanel.classList.toggle("hidden");
};

// النوافذ
function openAbout() {
  document.getElementById("aboutModal").classList.remove("hidden");
}

function openDeveloper() {
  document.getElementById("devModal").classList.remove("hidden");
}

function closeModal() {
  document.querySelectorAll(".modal").forEach(m => m.classList.add("hidden"));
}

// دارك مود
const toggle = document.getElementById("darkToggle");
toggle.onchange = () => {
  document.body.classList.toggle("dark", toggle.checked);
};