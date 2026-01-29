/*
EĞİTMEN: "Bu script.js dosyası. 
HTML'imizin TÜM interaktif özelliklerini burada kontrol edeceğiz."
*/

// ============================================
// 1. SAYFA YÜKLENDİĞİNDE ÇALIŞACAK KODLAR
// ============================================
document.addEventListener("DOMContentLoaded", function () {
  /*
    EĞİTMEN: "DOMContentLoaded event'i, HTML tamamen yüklendiğinde çalışır.
    JavaScript kodlarını bu event içinde çalıştırıyoruz ki,
    HTML elementleri hazır olsun ve hata almayalım."
    */

  console.log("🚀 Frontend Workshop yüklendi!");
  console.log("HTML, CSS ve JavaScript hazır.");

  // 2. MOBİL MENÜYÜ AYARLA
  setupMobileMenu();

  // 3. KOD KOPYALAMA BUTONLARINI AYARLA
  setupCopyButtons();

  // 4. HTML DENEME ALANINI AYARLA
  setupHtmlPractice();

  // 5. CSS DENEME ALANINI AYARLA
  setupCssPractice();

  // 6. JAVASCRIPT OYUNUNU AYARLA
  setupJsGame();

  // 7. ALIŞVERİŞ SEPETİ UYGULAMASINI AYARLA
  setupShoppingCart();

  // 8. TIKLAMA OLAYLARINI AYARLA
  setupClickEvents();

  // 9. SAYFAYA ANİMASYON EKLE
  addPageAnimations();

  // 10. KONSOLA HOŞGELDİN MESAJI
  showWelcomeMessage();
});

// ============================================
// 2. MOBİL MENÜ FONKSİYONU
// ============================================
function setupMobileMenu() {
  /*
    EĞİTMEN: "Mobil menüyü açıp kapamak için fonksiyon.
    Mobilde menü butonuna tıklayınca menü açılacak/kapanacak."
    */

  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mainNav = document.querySelector(".main-nav");

  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener("click", function () {
      // classList.toggle: Eğer class varsa kaldırır, yoksa ekler
      mainNav.classList.toggle("active");

      // Icon'u değiştir (hamburger ↔ çarpı)
      const icon = this.querySelector("i");
      if (mainNav.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });

    // Menü linklerine tıklayınca menüyü kapat
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        mainNav.classList.remove("active");
        mobileMenuBtn.querySelector("i").classList.remove("fa-times");
        mobileMenuBtn.querySelector("i").classList.add("fa-bars");
      });
    });
  }
}

// ============================================
// 3. KOD KOPYALAMA FONKSİYONU
// ============================================
function setupCopyButtons() {
  /*
    EĞİTMEN: "Kopyala butonlarına tıklayınca kodu kopyalamak için.
    Clipboard API kullanıyoruz."
    */

  const copyButtons = document.querySelectorAll(".copy-code-btn");

  copyButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // data-target attribute'undan hangi kodu kopyalayacağımızı bul
      const targetId = this.getAttribute("data-target");
      const codeElement = document.getElementById(targetId);

      if (codeElement) {
        // pre tag'inin içindeki code tag'ini al
        const code = codeElement.querySelector("code") || codeElement;
        const textToCopy = code.textContent;

        // Clipboard API ile kopyala
        navigator.clipboard
          .writeText(textToCopy)
          .then(() => {
            // Başarılı mesajı göster
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> Kopyalandı!';
            this.style.backgroundColor = "#27c93f";
            this.style.color = "#000";

            // 2 saniye sonra eski haline döndür
            setTimeout(() => {
              this.innerHTML = originalHTML;
              this.style.backgroundColor = "";
              this.style.color = "";
            }, 2000);
          })
          .catch((err) => {
            console.error("Kopyalama hatası:", err);
            alert("Kopyalama başarısız! Lütfen tekrar deneyin.");
          });
      }
    });
  });
}

// ============================================
// 4. HTML DENEME ALANI FONKSİYONU
// ============================================
function setupHtmlPractice() {
  /*
    EĞİTMEN: "HTML editörü: Kullanıcı HTML yazacak, sonucu görecek."
    */

  const htmlInput = document.getElementById("html-input");
  const htmlOutput = document.getElementById("html-output");
  const runHtmlBtn = document.getElementById("runHtmlBtn");

  if (runHtmlBtn && htmlInput && htmlOutput) {
    runHtmlBtn.addEventListener("click", function () {
      // Kullanıcının girdiği HTML'i al
      const htmlCode = htmlInput.value.trim();

      if (!htmlCode) {
        htmlOutput.innerHTML =
          '<p style="color: #666;">Lütfen HTML kodu girin...</p>';
        return;
      }

      // HTML'i çıktı alanına yaz (DİKKAT: innerHTML kullanıyoruz!)
      htmlOutput.innerHTML = htmlCode;

      // Çalıştır butonuna animasyon ekle
      const originalText = this.innerHTML;
      this.innerHTML = '<i class="fas fa-check"></i> Çalıştırıldı!';
      this.style.backgroundColor = "#27c93f";

      setTimeout(() => {
        this.innerHTML = originalText;
        this.style.backgroundColor = "";
      }, 1000);
    });

    // Sayfa yüklendiğinde örnek HTML'i göster
    const exampleHtml = `<h1 style="color: #667eea;">Merhaba Dünya!</h1>
<p>Bu bir paragraf. <strong>Kalın yazı</strong> ve <em>italik yazı</em>.</p>
<button style="background: #00ff9d; color: #000; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
    Tıkla Bana
</button>
<ul>
    <li>Liste öğesi 1</li>
    <li>Liste öğesi 2</li>
    <li>Liste öğesi 3</li>
</ul>`;

    htmlOutput.innerHTML = exampleHtml;
  }
}

// ============================================
// 5. CSS DENEME ALANI FONKSİYONU
// ============================================
function setupCssPractice() {
  /*
    EĞİTMEN: "CSS demo: Kullanıcı CSS kontrolleri ile kutu stilini değiştirecek."
    */

  const demoBox = document.getElementById("cssDemoBox");
  const bgColorInput = document.getElementById("bgColor");
  const paddingInput = document.getElementById("paddingSize");
  const paddingValue = document.getElementById("paddingValue");
  const borderRadiusInput = document.getElementById("borderRadius");
  const borderRadiusValue = document.getElementById("borderRadiusValue");
  const resetCssBtn = document.getElementById("resetCssBtn");

  if (demoBox && bgColorInput && paddingInput) {
    // Arkaplan rengi değişince
    bgColorInput.addEventListener("input", function () {
      demoBox.style.backgroundColor = this.value;
    });

    // Padding değişince
    paddingInput.addEventListener("input", function () {
      const padding = this.value + "px";
      demoBox.style.padding = padding;
      paddingValue.textContent = padding;
    });

    // Border radius değişince
    borderRadiusInput.addEventListener("input", function () {
      const radius = this.value + "px";
      demoBox.style.borderRadius = radius;
      borderRadiusValue.textContent = radius;
    });

    // Sıfırla butonu
    if (resetCssBtn) {
      resetCssBtn.addEventListener("click", function () {
        // Varsayılan değerlere döndür
        demoBox.style.backgroundColor = "";
        demoBox.style.padding = "20px";
        demoBox.style.borderRadius = "10px";

        // Input'ları sıfırla
        bgColorInput.value = "#667eea";
        paddingInput.value = "20";
        paddingValue.textContent = "20px";
        borderRadiusInput.value = "10";
        borderRadiusValue.textContent = "10px";

        // Buton animasyonu
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i> Sıfırlandı!';
        this.style.backgroundColor = "#27c93f";

        setTimeout(() => {
          this.innerHTML = originalText;
          this.style.backgroundColor = "";
        }, 1000);
      });
    }
  }
}

// ============================================
// 6. JAVASCRIPT OYUNU FONKSİYONU
// ============================================
function setupJsGame() {
  /*
    EĞİTMEN: "Sayı tahmin oyunu: 1-100 arası rastgele sayı tut, kullanıcı tahmin etsin."
    */

  const guessInput = document.getElementById("guessInput");
  const guessBtn = document.getElementById("guessBtn");
  const newGameBtn = document.getElementById("newGameBtn");
  const gameMessage = document.getElementById("gameMessage");
  const remainingAttempts = document.getElementById("remainingAttempts");
  const guessHistory = document.getElementById("guessHistory");

  // OYUN DEĞİŞKENLERİ
  let randomNumber;
  let attemptsLeft = 10;
  let gameHistory = [];

  // YENİ OYUN BAŞLAT
  function startNewGame() {
    // 1-100 arası rastgele sayı üret
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attemptsLeft = 10;
    gameHistory = [];

    // UI'ı güncelle
    gameMessage.textContent = "Yeni oyun başladı! 1-100 arası bir sayı tuttum.";
    remainingAttempts.textContent = attemptsLeft;
    guessHistory.innerHTML = "";
    guessInput.value = "";
    guessInput.disabled = false;
    guessBtn.disabled = false;

    console.log("Oyun başladı! Gizli sayı:", randomNumber); // Debug için
  }

  // TAHMİN KONTROL ET
  function checkGuess() {
    const userGuess = parseInt(guessInput.value);

    // Geçerli bir sayı mı?
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
      gameMessage.textContent = "Lütfen 1-100 arası geçerli bir sayı girin!";
      gameMessage.style.color = "#e53e3e";
      guessInput.value = "";
      guessInput.focus();
      return;
    }

    // Tahmini geçmişe ekle
    gameHistory.push(userGuess);

    // Tahmin geçmişini güncelle
    const historyItem = document.createElement("div");
    historyItem.className = "history-item";
    historyItem.textContent = `Tahmin #${gameHistory.length}: ${userGuess}`;
    guessHistory.prepend(historyItem); // En üste ekle

    // Tahmini kontrol et
    if (userGuess === randomNumber) {
      // KAZANDI!
      gameMessage.innerHTML = `<span style="color: #27c93f;">🎉 TEBRİKLER! Doğru tahmin: ${randomNumber}</span>`;
      gameMessage.innerHTML += `<br><small>${gameHistory.length} denemede buldunuz.</small>`;
      endGame(true);
    } else if (userGuess < randomNumber) {
      // DAHA BÜYÜK
      gameMessage.innerHTML = `⬆️ DAHA BÜYÜK bir sayı tahmin et! (${userGuess}'den büyük)`;
      gameMessage.style.color = "#667eea";
    } else {
      // DAHA KÜÇÜK
      gameMessage.innerHTML = `⬇️ DAHA KÜÇÜK bir sayı tahmin et! (${userGuess}'den küçük)`;
      gameMessage.style.color = "#667eea";
    }

    // Kalan hakkı azalt
    attemptsLeft--;
    remainingAttempts.textContent = attemptsLeft;

    // Hak biterse
    if (attemptsLeft === 0 && userGuess !== randomNumber) {
      gameMessage.innerHTML = `<span style="color: #e53e3e;">😞 HAKKINIZ BİTTİ! Doğru sayı: ${randomNumber}</span>`;
      endGame(false);
    }

    // Input'u temizle ve focus et
    guessInput.value = "";
    guessInput.focus();
  }

  // OYUNU BİTİR
  function endGame(isWin) {
    guessInput.disabled = true;
    guessBtn.disabled = true;

    if (isWin) {
      guessBtn.innerHTML = '<i class="fas fa-trophy"></i> Kazandınız!';
      guessBtn.style.backgroundColor = "#27c93f";
    } else {
      guessBtn.innerHTML = '<i class="fas fa-times"></i> Kaybettiniz';
      guessBtn.style.backgroundColor = "#e53e3e";
    }
  }

  // EVENT LISTENER'LARI EKLE
  if (guessBtn && newGameBtn) {
    // Sayfa yüklendiğinde oyunu başlat
    startNewGame();

    // Tahmin et butonu
    guessBtn.addEventListener("click", checkGuess);

    // Enter tuşu ile tahmin et
    guessInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        checkGuess();
      }
    });

    // Yeni oyun butonu
    newGameBtn.addEventListener("click", function () {
      startNewGame();
      guessBtn.innerHTML = '<i class="fas fa-play"></i> Tahmin Et';
      guessBtn.style.backgroundColor = "";
      gameMessage.style.color = "";
    });
  }
}

// ============================================
// 7. ALIŞVERİŞ SEPETİ UYGULAMASI
// ============================================
function setupShoppingCart() {
  /*
    EĞİTMEN: "Interaktif alışveriş sepeti: Ürün ekle, çıkar, toplam hesapla."
    */

  // ÜRÜN VERİLERİ
  const products = [
    { id: 1, name: "iPhone 15 Pro", price: 999, category: "Telefon" },
    { id: 2, name: "MacBook Air M2", price: 1299, category: "Bilgisayar" },
    { id: 3, name: "Sony Kulaklık", price: 299, category: "Ses" },
    { id: 4, name: "Samsung TV", price: 1499, category: "TV" },
    { id: 5, name: "Apple Watch", price: 429, category: "Saat" },
    { id: 6, name: "iPad Pro", price: 1099, category: "Tablet" },
  ];

  // SEPET DEĞİŞKENLERİ
  let cart = [];
  let totalPrice = 0;

  // DOM ELEMENTLERİ
  const productsGrid = document.getElementById("productsGrid");
  const cartItems = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  const cartTotal = document.getElementById("cartTotal");
  const subtotal = document.getElementById("subtotal");
  const tax = document.getElementById("tax");
  const total = document.getElementById("total");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const clearCartBtn = document.getElementById("clearCartBtn");

  // ÜRÜNLERİ YÜKLE
  function loadProducts() {
    if (!productsGrid) return;

    productsGrid.innerHTML = "";

    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";
      productCard.innerHTML = `
                <h5>${product.name}</h5>
                <p class="product-category">${product.category}</p>
                <p class="product-price">${product.price.toFixed(2)}₺</p>
                <button class="add-to-cart-btn" data-id="${product.id}">
                    <i class="fas fa-cart-plus"></i> Sepete Ekle
                </button>
            `;

      productsGrid.appendChild(productCard);
    });

    // Sepete ekle butonlarına event listener ekle
    document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const productId = parseInt(this.getAttribute("data-id"));
        const product = products.find((p) => p.id === productId);

        if (product) {
          addToCart(product);

          // Buton animasyonu
          const originalHTML = this.innerHTML;
          this.innerHTML = '<i class="fas fa-check"></i> Eklendi!';
          this.style.backgroundColor = "#27c93f";

          setTimeout(() => {
            this.innerHTML = originalHTML;
            this.style.backgroundColor = "";
          }, 1000);
        }
      });
    });
  }

  // SEPETE EKLE
  function addToCart(product) {
    // Ürün sepette var mı kontrol et
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      // Varsa miktarını artır
      existingItem.quantity += 1;
    } else {
      // Yoksa yeni ekle
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      });
    }

    // Sepeti güncelle
    updateCart();
  }

  // SEPETTEN ÇIKAR
  function removeFromCart(productId) {
    const itemIndex = cart.findIndex((item) => item.id === productId);

    if (itemIndex !== -1) {
      if (cart[itemIndex].quantity > 1) {
        // Miktar 1'den fazlaysa azalt
        cart[itemIndex].quantity -= 1;
      } else {
        // Miktar 1 ise ürünü sepetten kaldır
        cart.splice(itemIndex, 1);
      }

      updateCart();
    }
  }

  // SEPETİ GÜNCELLE
  function updateCart() {
    // Toplamları hesapla
    let itemCount = 0;
    let subtotalValue = 0;

    cart.forEach((item) => {
      itemCount += item.quantity;
      subtotalValue += item.price * item.quantity;
    });

    const taxValue = subtotalValue * 0.18;
    const totalValue = subtotalValue + taxValue;

    // UI'ı güncelle
    if (cartCount) cartCount.textContent = `${itemCount} ürün`;
    if (cartTotal) cartTotal.textContent = `${totalValue.toFixed(2)}₺`;
    if (subtotal) subtotal.textContent = `${subtotalValue.toFixed(2)}₺`;
    if (tax) tax.textContent = `${taxValue.toFixed(2)}₺`;
    if (total) total.textContent = `${totalValue.toFixed(2)}₺`;

    // Sepet içeriğini güncelle
    updateCartItems();

    // Butonları güncelle
    if (checkoutBtn) {
      if (cart.length === 0) {
        checkoutBtn.disabled = true;
        checkoutBtn.style.opacity = "0.5";
        checkoutBtn.style.cursor = "not-allowed";
      } else {
        checkoutBtn.disabled = false;
        checkoutBtn.style.opacity = "1";
        checkoutBtn.style.cursor = "pointer";
      }
    }

    if (clearCartBtn) {
      if (cart.length === 0) {
        clearCartBtn.disabled = true;
        clearCartBtn.style.opacity = "0.5";
        clearCartBtn.style.cursor = "not-allowed";
      } else {
        clearCartBtn.disabled = false;
        clearCartBtn.style.opacity = "1";
        clearCartBtn.style.cursor = "pointer";
      }
    }
  }

  // SEPET İÇERİĞİNİ GÜNCELLE
  function updateCartItems() {
    if (!cartItems) return;

    if (cart.length === 0) {
      cartItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-basket"></i>
                    <p>Sepetiniz boş</p>
                </div>
            `;
      return;
    }

    let cartHTML = '<div class="cart-items-list">';

    cart.forEach((item) => {
      const itemTotal = item.price * item.quantity;

      cartHTML += `
                <div class="cart-item" data-id="${item.id}">
                    <div class="cart-item-info">
                        <strong>${item.name}</strong>
                        <div class="cart-item-details">
                            ${item.price.toFixed(2)}₺ × ${item.quantity} = ${itemTotal.toFixed(2)}₺
                        </div>
                    </div>
                    <div class="cart-item-controls">
                        <button class="cart-item-decrease" data-id="${item.id}">
                            <i class="fas fa-minus"></i>
                        </button>
                        <button class="cart-item-remove" data-id="${item.id}">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            `;
    });

    cartHTML += "</div>";
    cartItems.innerHTML = cartHTML;

    // Kontrol butonlarına event listener ekle
    document.querySelectorAll(".cart-item-decrease").forEach((button) => {
      button.addEventListener("click", function () {
        const productId = parseInt(this.getAttribute("data-id"));
        removeFromCart(productId);
      });
    });

    document.querySelectorAll(".cart-item-remove").forEach((button) => {
      button.addEventListener("click", function () {
        const productId = parseInt(this.getAttribute("data-id"));
        // Ürünü tamamen kaldır
        const itemIndex = cart.findIndex((item) => item.id === productId);
        if (itemIndex !== -1) {
          cart.splice(itemIndex, 1);
          updateCart();
        }
      });
    });
  }

  // ÖDEME YAP
  function checkout() {
    if (cart.length === 0) {
      alert("Sepetiniz boş!");
      return;
    }

    // Sepet toplamını hesapla
    let subtotalValue = 0;
    let orderDetails = "SİPARİŞ DETAYI:\n\n";

    cart.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      subtotalValue += itemTotal;
      orderDetails += `${item.name} × ${item.quantity} = ${itemTotal.toFixed(2)}₺\n`;
    });

    const taxValue = subtotalValue * 0.18;
    const totalValue = subtotalValue + taxValue;

    orderDetails += `\nAra Toplam: ${subtotalValue.toFixed(2)}₺`;
    orderDetails += `\nKDV (%18): ${taxValue.toFixed(2)}₺`;
    orderDetails += `\n────────────────`;
    orderDetails += `\nTOPLAM: ${totalValue.toFixed(2)}₺`;
    orderDetails += `\n\nSipariş No: #${Date.now().toString().slice(-6)}`;

    // Ödeme başarılı mesajı
    if (
      confirm(
        "Ödemeyi tamamlamak istediğinize emin misiniz?\n\n" + orderDetails,
      )
    ) {
      alert("✅ ÖDEME BAŞARILI!\n\n" + orderDetails + "\n\nTeşekkür ederiz!");

      // Sepeti temizle
      cart = [];
      updateCart();
    }
  }

  // SEPETİ TEMİZLE
  function clearCart() {
    if (cart.length === 0) {
      alert("Sepetiniz zaten boş!");
      return;
    }

    if (
      confirm("Sepetinizdeki tüm ürünleri kaldırmak istediğinize emin misiniz?")
    ) {
      cart = [];
      updateCart();
      alert("Sepetiniz temizlendi!");
    }
  }

  // EVENT LISTENER'LARI EKLE
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", checkout);
  }

  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", clearCart);
  }

  // ÜRÜNLERİ YÜKLE
  loadProducts();
  updateCart();
}

// ============================================
// 8. TIKLAMA OLAYLARI
// ============================================
function setupClickEvents() {
  /*
    EĞİTMEN: "Diğer tıklama olaylarını burada topluyoruz."
    */

  // ÖĞRENMEYE BAŞLA BUTONU
  const startLearningBtn = document.getElementById("startLearningBtn");
  if (startLearningBtn) {
    startLearningBtn.addEventListener("click", function () {
      // HTML bölümüne kaydır
      const htmlSection = document.getElementById("html-section");
      if (htmlSection) {
        htmlSection.scrollIntoView({ behavior: "smooth" });
      }

      // Buton animasyonu
      this.innerHTML =
        '<i class="fas fa-play-circle"></i> HTML Dersine Gidiliyor...';
      setTimeout(() => {
        this.innerHTML = '<i class="fas fa-play-circle"></i> Öğrenmeye Başla';
      }, 1500);
    });
  }

  // PROJELERİ GÖR BUTONU
  const viewProjectsBtn = document.getElementById("viewProjectsBtn");
  if (viewProjectsBtn) {
    viewProjectsBtn.addEventListener("click", function () {
      // Proje bölümüne kaydır
      const projectSection = document.getElementById("project-section");
      if (projectSection) {
        projectSection.scrollIntoView({ behavior: "smooth" });
      }

      // Buton animasyonu
      this.innerHTML = '<i class="fas fa-code"></i> Projeye Gidiliyor...';
      setTimeout(() => {
        this.innerHTML = '<i class="fas fa-code"></i> Projeleri Gör';
      }, 1500);
    });
  }
}

// ============================================
// 9. SAYFA ANİMASYONLARI
// ============================================
function addPageAnimations() {
  /*
    EĞİTMEN: "Sayfaya scroll animasyonları ekliyoruz."
    */

  // Intersection Observer API ile elementler görünür olunca animasyon ekle
  const observerOptions = {
    threshold: 0.1, // Elementin %10'u görünür olunca
    rootMargin: "0px 0px -50px 0px", // Alt kısımdan 50px önce
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
      }
    });
  }, observerOptions);

  // Animasyon eklemek istediğimiz elementleri gözle
  const animatedElements = document.querySelectorAll(
    ".lesson-section, .theory-box, .code-example, .practice-box",
  );
  animatedElements.forEach((element) => {
    observer.observe(element);
  });
}

// ============================================
// 10. KONSOL HOŞGELDİN MESAJI
// ============================================
function showWelcomeMessage() {
  /*
    EĞİTMEN: "Konsola hoşgeldin mesajı ve eğitmen notları."
    */

  console.log(
    "%c🎓 FRONTEND WORKSHOP 2024",
    "font-size: 24px; font-weight: bold; color: #667eea;",
  );
  console.log(
    "%c👨‍🏫 Eğitmen: 25 Yıllık Tecrübe",
    "font-size: 16px; color: #764ba2;",
  );
  console.log(
    "%c🎯 Seviye: Başlangıç → İleri",
    "font-size: 16px; color: #00ff9d;",
  );
  console.log(
    "%c📚 Konular: HTML, CSS, JavaScript",
    "font-size: 16px; color: #00d4ff;",
  );
  console.log("%c⏰ Workshop: 2 Gün", "font-size: 16px; color: #ffbd2e;");
  console.log("\n");
  console.log("%cEĞİTMEN NOTLARI:", "font-weight: bold; color: #333;");
  console.log("1. Her satır açıklanmıştır - neden, nasıl, ne için?");
  console.log("2. Responsive tasarım ön planda");
  console.log("3. Modern JavaScript (ES6+) kullanıldı");
  console.log("4. Clean code prensipleri uygulandı");
  console.log("5. Kullanıcı deneyimi önemsendi");
  console.log("\n");
  console.log("%cÖĞRENCİLERE TAVSİYELER:", "font-weight: bold; color: #333;");
  console.log("✅ Kodları kopyala-yapıştır yapma, KENDİN YAZ");
  console.log("✅ Her satırı anlamaya çalış");
  console.log('✅ "Bunu değiştirirsem ne olur?" diye dene');
  console.log("✅ Hata yapmaktan korkma, debug etmeyi öğren");
  console.log("✅ Bol bol pratik yap");
  console.log("\n");
  console.log(
    "%cİYİ ÇALIŞMALAR! 🚀",
    "font-size: 20px; font-weight: bold; color: #00ff9d;",
  );
}

// ============================================
// 11. GLOBAL FONKSİYONLAR (HTML'den erişilebilir)
// ============================================
/*
EĞİTMEN: "Bu fonksiyonlar HTML'de onclick attribute'larından çağrılabilir.
Örnek: <button onclick="showAlert()">Tıkla</button>"
*/

// ALERT GÖSTER
function showAlert(message = "Merhaba! Bu bir JavaScript alert'ı.") {
  alert(message);
}

// KONSOLA YAZDIR
function logToConsole(message = "Konsola mesaj yazıldı!") {
  console.log("📝 Kullanıcı mesajı:", message);
}

// RENK DEĞİŞTİR
function changeColor(elementId, color = "#ff0000") {
  const element = document.getElementById(elementId);
  if (element) {
    element.style.color = color;
  }
}

// ELEMENT GÖSTER/GİZLE
function toggleVisibility(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    if (element.style.display === "none") {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  }
}

// SAYFAYI YENİLE
function refreshPage() {
  location.reload();
}

// EN ÜSTE KAYDIR
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// ============================================
// 12. HATA YAKALAMA
// ============================================
/*
EĞİTMEN: "Hata yakalama mekanizması.
JavaScript hatalarını yakalar ve kullanıcıya gösterir."
*/

// GLOBAL HATA YAKALAYICI
window.addEventListener("error", function (event) {
  console.error("❌ JavaScript Hatası:", event.error);

  // Kullanıcıya hata mesajı göster (sadece geliştirme modunda)
  if (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  ) {
    alert(
      `JavaScript Hatası:\n\n${event.error.message}\n\nLütfen konsolu kontrol edin (F12).`,
    );
  }
});

// PROMISE HATALARI
window.addEventListener("unhandledrejection", function (event) {
  console.error("❌ Promise Hatası:", event.reason);
});

// ============================================
// 13. PERFORMANS İZLEME
// ============================================
/*
EĞİTMEN: "Sayfa performansını izlemek için.
Konsolda performans metriklerini gösterir."
*/

// SAYFA YÜKLEME SÜRESİ
window.addEventListener("load", function () {
  const loadTime =
    window.performance.timing.domContentLoadedEventEnd -
    window.performance.timing.navigationStart;

  console.log(`📊 Sayfa yükleme süresi: ${loadTime}ms`);

  if (loadTime > 3000) {
    console.warn("⚠️ Sayfa yüklenmesi yavaş! Optimizasyon gerekebilir.");
  }
});

// ============================================
// SON NOTLAR
// ============================================
/*
EĞİTMEN: "Bu JavaScript dosyasında:
1. Tüm fonksiyonlar açıklamalı
2. Her satır ne işe yarar yazılı
3. Hata yakalama mekanizmaları var
4. Performans izleme var
5. Kullanıcı deneyimi ön planda

ÖĞRENCİLER İÇİN:
1. Kodları satır satır inceleyin
2. Console.log'ları kullanarak debug edin
3. Fonksiyonları değiştirip ne olduğunu görün
4. Kendi projelerinizde bu yapıyı kullanın

İYİ ÇALIŞMALAR! 🚀
*/
