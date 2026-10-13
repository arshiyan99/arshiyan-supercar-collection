/* MOBILE MENU */

function openmenu() {
  const navbar = document.querySelector(".navbar");

  const menuIcon = document.querySelector(".menu-icon");

  if (!navbar || !menuIcon) return;

  navbar.classList.toggle("open");

  if (navbar.classList.contains("open")) {
    menuIcon.innerHTML = "✕";
  } else {
    menuIcon.innerHTML = "☰";
  }
}

/* CLOSE MOBILE MENU */

document.querySelectorAll(".navbar a").forEach(function (link) {
  link.addEventListener("click", function () {
    const navbar = document.querySelector(".navbar");

    const menuIcon = document.querySelector(".menu-icon");

    navbar.classList.remove("open");

    menuIcon.innerHTML = "☰";
  });
});

/* STICKY HEADER*/

window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");

  if (!header) return;

  if (window.scrollY > 50) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
});

/*  ACTIVE NAVIGATION */

const sections = document.querySelectorAll("section[id]");

const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", function () {
  let current = "";

  sections.forEach(function (section) {
    const sectionTop = section.offsetTop - 150;

    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(function (link) {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

/*  VIDEO */

const heroVideo = document.querySelector(".hero-video");

if (heroVideo) {
  heroVideo.addEventListener("loadeddata", function () {
    heroVideo.play().catch(function () {
      console.log("Video autoplay requires user interaction.");
    });
  });
}

/* BRANDS FILTER */

const filterButtons = document.querySelectorAll(".filter-btn");

const brandCards = document.querySelectorAll(".brand-card");

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    /* Remove active from all buttons */

    filterButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });

    /* Activate clicked button */

    button.classList.add("active");

    /* Get selected category */

    const selected = button.getAttribute("data-filter");

    /* Filter cards */

    brandCards.forEach(function (card) {
      const category = card.getAttribute("data-category");

      if (selected === "all" || category === selected) {
        card.classList.remove("hide");

        card.classList.remove("show-card");

        /* Restart animation */

        void card.offsetWidth;

        card.classList.add("show-card");
      } else {
        card.classList.add("hide");
      }
    });
  });
});

/* BRAND EXPLORE BUTTON */

const exploreButtons = document.querySelectorAll(".explore-btn");

exploreButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const card = button.closest(".brand-card");

    if (!card) return;

    const brand = card.querySelector("h3");

    if (!brand) return;

    showBrandMessage(brand.textContent);
  });
});

/*  BRAND POPUP */

function showBrandMessage(brandName) {
  let popup = document.querySelector(".brand-message");

  if (!popup) {
    popup = document.createElement("div");

    popup.className = "brand-message";

    popup.innerHTML = `

            <div class="brand-message-icon">
                ✦
            </div>

            <div class="brand-message-text">

                <strong></strong>

                <span>
                    Experience automotive excellence.
                </span>

            </div>

            <button class="close-brand-message">
                ✕
            </button>

        `;

    document.body.appendChild(popup);

    popup
      .querySelector(".close-brand-message")
      .addEventListener("click", function () {
        popup.classList.remove("show");
      });
  }

  popup.querySelector("strong").textContent = brandName + " COLLECTION";

  popup.classList.add("show");

  clearTimeout(window.brandPopupTimer);

  window.brandPopupTimer = setTimeout(function () {
    popup.classList.remove("show");
  }, 3500);
}

/*  POPUP CSS */

const popupStyle = document.createElement("style");

popupStyle.innerHTML = `

.brand-message {

    position: fixed;

    right: 25px;
    bottom: 25px;

    z-index: 9999;

    min-width: 320px;

    display: flex;

    align-items: center;

    gap: 14px;

    padding: 17px 20px;

    background:
        rgba(8,8,8,0.96);

    border:
        1px solid
        rgba(212,175,55,0.5);

    border-radius: 8px;

    box-shadow:
        0 20px 60px
        rgba(0,0,0,0.7),
        0 0 25px
        rgba(212,175,55,0.12);

    backdrop-filter: blur(15px);

    opacity: 0;

    transform:
        translateY(25px);

    pointer-events: none;

    transition: 0.4s ease;

}


.brand-message.show {

    opacity: 1;

    transform:
        translateY(0);

    pointer-events: auto;

}


.brand-message-icon {

    width: 42px;
    height: 42px;

    flex-shrink: 0;

    display: flex;

    align-items: center;
    justify-content: center;

    border-radius: 50%;

    color: #050505;

    background:
        linear-gradient(
            135deg,
            #a77b18,
            #fff0a0,
            #d4af37
        );

    font-size: 20px;

}


.brand-message-text strong {

    display: block;

    color: #ffffff;

    font-size: 11px;

    letter-spacing: 2px;

}


.brand-message-text span {

    display: block;

    margin-top: 5px;

    color: #777;

    font-size: 9px;

    letter-spacing: 1px;

}


.close-brand-message {

    margin-left: auto;

    border: none;

    background: transparent;

    color: #777;

    cursor: pointer;

    font-size: 15px;

    transition: 0.3s;

}


.close-brand-message:hover {

    color: #d4af37;

    transform: rotate(90deg);

}


@media(max-width:520px) {

    .brand-message {

        left: 15px;
        right: 15px;

        min-width: auto;

    }

}

`;

document.head.appendChild(popupStyle);

/* ESC KEY*/

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    const navbar = document.querySelector(".navbar");

    const menuIcon = document.querySelector(".menu-icon");

    if (navbar) {
      navbar.classList.remove("open");
    }

    if (menuIcon) {
      menuIcon.innerHTML = "☰";
    }

    const popup = document.querySelector(".brand-message");

    if (popup) {
      popup.classList.remove("show");
    }
  }
});

/*  GALLERY SLIDER*/

let galleryIndex = 0;

const gallerySlides = document.querySelectorAll(".gallery-slide");

const currentSlide = document.getElementById("currentSlide");

const galleryProgress = document.getElementById("galleryProgress");

function showGallerySlide(index) {
  gallerySlides.forEach((slide) => {
    slide.classList.remove("active");
  });

  gallerySlides[index].classList.add("active");

  /* Counter */

  let number = index + 1;

  if (number < 10) {
    number = "0" + number;
  }

  currentSlide.textContent = number;

  /* Progress */

  let progress = ((index + 1) / gallerySlides.length) * 100;

  galleryProgress.style.width = progress + "%";

  galleryIndex = index;
}

/*  NEXT */

function nextSlide() {
  galleryIndex++;

  if (galleryIndex >= gallerySlides.length) {
    galleryIndex = 0;
  }

  showGallerySlide(galleryIndex);
}

/* PREVIOUS*/

function previousSlide() {
  galleryIndex--;

  if (galleryIndex < 0) {
    galleryIndex = gallerySlides.length - 1;
  }

  showGallerySlide(galleryIndex);
}

const contactForm = document.querySelector("#contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const message = [
      "Hello, I would like to inquire about your supercar collection.",
      "",
      `Name: ${formData.get("name")}`,
      `Email: ${formData.get("email")}`,
      `Phone: ${formData.get("phone")}`,
      `Message: ${formData.get("message")}`,
    ].join("\n");

    const whatsappUrl = `https://wa.me/919834016105?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  });
}
