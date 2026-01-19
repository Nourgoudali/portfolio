'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}



// Skills Horizontal Scroll
const skillsValues = {
  list: document.querySelector("[data-skills-list]"),
  leftBtn: document.querySelector("[data-skills-scroll-btn='left']"),
  rightBtn: document.querySelector("[data-skills-scroll-btn='right']"),
  scrollAmount: 200 // Adjust scroll amount as needed
}

if (skillsValues.list && skillsValues.leftBtn && skillsValues.rightBtn) {

  const checkScroll = () => {
    // Only show buttons if content overflows horizontally and screen is wide enough
    const isOverflowing = skillsValues.list.scrollWidth > skillsValues.list.clientWidth;
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

    if (isOverflowing && isDesktop) {
      skillsValues.leftBtn.classList.add("active");
      skillsValues.rightBtn.classList.add("active");
    } else {
      skillsValues.leftBtn.classList.remove("active");
      skillsValues.rightBtn.classList.remove("active");
    }
  }

  // Initial check and on resize
  window.addEventListener("load", checkScroll);
  window.addEventListener("resize", checkScroll);

  // Scroll Logic
  skillsValues.leftBtn.addEventListener("click", () => {
    skillsValues.list.scrollBy({
      left: -skillsValues.scrollAmount,
      behavior: "smooth"
    });
  });

  skillsValues.rightBtn.addEventListener("click", () => {
    skillsValues.list.scrollBy({
      left: skillsValues.scrollAmount,
      behavior: "smooth"
    });
  });

}


// Project Modal Variables
const projectItems = document.querySelectorAll("[data-filter-item]");
const modalContainerProject = document.querySelector("[data-modal-container-project]");
const modalCloseBtnProject = document.querySelector("[data-modal-close-btn-project]");
const overlayProject = document.querySelector("[data-overlay-project]");

const modalProjectImg = document.querySelector("[data-modal-project-img]");
const modalProjectTitle = document.querySelector("[data-modal-project-title]");
const modalProjectCategory = document.querySelector("[data-modal-project-category]");

// Project Modal Toggle Function
const projectModalFunc = function () {
  modalContainerProject.classList.toggle("active");
  overlayProject.classList.toggle("active");
}

// Add click event to all project items
for (let i = 0; i < projectItems.length; i++) {

  projectItems[i].querySelector("a").addEventListener("click", function (e) {
    e.preventDefault(); // Prevent default link behavior if hash is present

    // Get data from the clicked project item
    const imgElement = this.querySelector("img");
    const titleElement = this.querySelector(".project-title");
    const categoryElement = this.querySelector(".project-category");

    // Populate modal with data
    modalProjectImg.src = imgElement.src;
    modalProjectImg.alt = imgElement.alt;
    modalProjectTitle.innerHTML = titleElement.innerHTML;
    modalProjectCategory.innerHTML = categoryElement.innerHTML;

    // Show modal
    projectModalFunc();

  });

}

// Add click event to modal close button and overlay
if (modalCloseBtnProject && overlayProject) {
  modalCloseBtnProject.addEventListener("click", projectModalFunc);
  overlayProject.addEventListener("click", projectModalFunc);
}