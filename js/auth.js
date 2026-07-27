/* ======================================
   HERMES YATIRIM - MASTER AUTH & REGISTER MOTORU
====================================== */

document.addEventListener('DOMContentLoaded', function () {

    /* ======================================
       1. BÖLÜM: GİRİŞ YAP (LOGIN ENGINE)
       ====================================== */
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            if (email === "admin@test.com" && password === "12345") {
                alert("Giriş Başarılı");
                localStorage.setItem("user", email);
                window.location.href = "index.html";
            } else {
                alert("Email veya şifre hatalı");
            }
        });
    }

    /* ======================================
       2. BÖLÜM: KADEMELİ KAYIT OL (EMAIL FORMAT FILTRELI)
       ====================================== */
    const registerForm = document.getElementById("registerForm");
    
    if (registerForm) {
        // Elemanların Tanımlanması
        const step1 = document.getElementById("step-1");
        const step2 = document.getElementById("step-2");
        const btnNext = document.getElementById("btn-next");
        const btnBack = document.getElementById("btn-back");
        const alertBox = document.getElementById("registerAlert");

        // Girdiler
        const nameInput = document.getElementById("name");
        const termsCheckbox = document.getElementById("terms");
        const emailInput = document.getElementById("registerEmail");
        const passwordInput = document.getElementById("registerPassword");

        // [DEVAM] Butonuna Basıldığında (Adım 1 -> Adım 2 Kontrolleri)
        btnNext.addEventListener("click", function () {
            
            const emailValue = emailInput.value.trim();

            // 1. Ad Soyad Kontrolü
            if (nameInput.value.trim() === "") {
                showRegisterAlert("Lütfen adınızı ve soyadınızı giriniz.", "danger");
                return;
            }
            
            // 2. E-posta Boşluk Kontrolü
            if (emailValue === "") {
                showRegisterAlert("Lütfen e-posta adresinizi giriniz.", "danger");
                return;
            }

            // 3. E-posta Format Kontrolü (@ İşareti ve Karakter Filtresi)
            // İçerisinde @ barındırmayan veya standart e-posta yapısına uymayan girişleri yakalar
            if (!emailValue.includes("@") || emailValue.indexOf("@") === 0 || emailValue.lastIndexOf("@") === emailValue.length - 1) {
                showRegisterAlert("Lütfen geçerli bir e-posta adresi giriniz (Örn: isim@domain.com).", "danger");
                emailInput.focus();
                return;
            }
            
            // 4. KVKK Onay Kontrolü
            if (!termsCheckbox.checked) {
                showRegisterAlert("Lütfen KVKK metnini ve kullanım koşullarını onaylayın.", "danger");
                return;
            }

            // İlk aşama başarılı ise hata mesajını temizle ve Adım 2'ye geç
            hideRegisterAlert();
            step1.classList.add("d-none");
            step2.classList.remove("d-none");
        });

        // [GERİ] Butonuna Basıldığında (Adım 2 -> Adım 1)
        btnBack.addEventListener("click", function () {
            hideRegisterAlert();
            step2.classList.add("d-none");
            step1.classList.remove("d-none");
        });

        // [HESAP OLUŞTUR] Formu Gönderdiğinde (Şifre Aşaması)
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const passwordValue = passwordInput.value.trim();

            // Şifre boşluk kontrolü
            if (passwordValue === "") {
                showRegisterAlert("Lütfen kendinize güvenli bir şifre belirleyin.", "danger");
                return;
            }

            // Şifre uzunluk kontrolü 
            if (passwordValue.length < 5) {
                showRegisterAlert("Şifreniz güvenlik gerekçesiyle en az 5 karakter olmalıdır.", "danger");
                return;
            }

            // BAŞARILI DURUM - KAYIT TAMAMLANDI
            showRegisterAlert("✓ Kayıt işleminiz başarıyla tamamlandı! Ana sayfaya aktarılıyorsunuz...", "success");
            
            // Tüm girdileri kilitleyelim
            nameInput.disabled = true;
            emailInput.disabled = true;
            passwordInput.disabled = true;
            registerForm.querySelector('button[type="submit"]').disabled = true;
            btnBack.disabled = true;

            // Kullanıcı e-postasını local hafızaya mühürlüyoruz
            localStorage.setItem("user", emailInput.value.trim());

            // 2 saniye sonra pürüzsüzce index.html'e uçur
            setTimeout(function () {
                window.location.href = "index.html";
            }, 2000);
        });

        function showRegisterAlert(message, type) {
            alertBox.classList.remove("d-none", "alert-danger", "alert-success");
            alertBox.classList.add("alert-" + type);
            alertBox.innerText = message;
        }

        function hideRegisterAlert() {
            alertBox.classList.add("d-none");
        }
    }

});