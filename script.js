const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

const navItems = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

const currentYear = document.getElementById("currentYear");



function updateHeader() {
  if (window.scrollY > 40) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", updateHeader);

updateHeader();


menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");

  const icon = menuToggle.querySelector("i");

  if (navLinks.classList.contains("open")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-xmark");

    menuToggle.setAttribute(
      "aria-label",
      "Close navigation"
    );
  } else {
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");

    menuToggle.setAttribute(
      "aria-label",
      "Open navigation"
    );
  }
});


navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");

    const icon = menuToggle.querySelector("i");

    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  });
});


document.addEventListener("click", (event) => {
  const clickedInsideNavigation =
    navLinks.contains(event.target) ||
    menuToggle.contains(event.target);

  if (!clickedInsideNavigation) {
    navLinks.classList.remove("open");

    const icon = menuToggle.querySelector("i");

    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  }
});


function updateActiveNavigation() {
  const scrollPosition =
    window.scrollY + 150;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition <
        sectionTop + sectionHeight
    ) {
      navItems.forEach((link) => {
        link.classList.remove("active");

        if (
          link.getAttribute("href") ===
          `#${sectionId}`
        ) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener(
  "scroll",
  updateActiveNavigation
);


const revealElements =
  document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold:0.12,
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

contactForm.addEventListener(
  "submit",
  (event) => {
    event.preventDefault();

    const name =
      document.getElementById("name").value.trim();

    const email =
      document.getElementById("email").value.trim();

    const subject =
      document.getElementById("subject").value.trim();

    const message =
      document.getElementById("message").value.trim();

    if (
      !name ||
      !email ||
      !subject ||
      !message
    ) {
      formMessage.textContent =
        "Please complete all fields.";

      formMessage.style.color = "#E74C3C";

      return;
    }

    formMessage.textContent =
      "Thank you! Your message has been prepared.";

    formMessage.style.color = "#00B894";

    const emailSubject =
      encodeURIComponent(subject);

    const emailBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );

    setTimeout(() => {
      window.location.href =
        `mailto:fathimarisani21@gmail.com?subject=${emailSubject}&body=${emailBody}`;

      contactForm.reset();

      formMessage.textContent =
        "Your email application has been opened.";
    }, 600);
  }
);

currentYear.textContent =
  new Date().getFullYear();