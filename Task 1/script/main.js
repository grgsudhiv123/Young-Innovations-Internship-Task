function preventDefault(e) {
  e.preventDefault();
}

const scrollOption = { passive: false };

function preventScroll() {
  window.addEventListener("scroll", preventDefault, scrollOption);
  window.addEventListener("wheel", preventDefault, scrollOption);
  window.addEventListener("touchmove", preventDefault, scrollOption);
}

function allowScroll() {
  window.removeEventListener("scroll", preventDefault);
  window.removeEventListener("wheel", preventDefault);
  window.removeEventListener("touchmove", preventDefault);
}

const menuIcon = document.querySelector(".nav__menu-icon");

const sideBar = document.querySelector(".header__sidebar");
const sideBarContainer = document.querySelector(".header__overlay");
menuIcon.addEventListener("click", () => {
  sideBarContainer.classList.toggle("header__overlay--active");
  sideBar.classList.toggle("header__sidebar--active");
  preventScroll();
  console.log("Menu icon clicked");
});

const menuCloseIcon = document.querySelector(".nav__menuclose-icon");
menuCloseIcon.addEventListener("click", () => {
  sideBarContainer.classList.toggle("header__overlay--active");
  sideBar.classList.toggle("header__sidebar--active");
  allowScroll();
  console.log("Menu close icon clicked");
});

document.addEventListener("click", (e) => {
  const isSideBarActive = sideBar.classList.contains("header__sidebar--active");
  if (
    isSideBarActive &&
    !sideBar.contains(e.target) &&
    !menuIcon.contains(e.target)
  ) {
    sideBarContainer.classList.remove("header__overlay--active");
    sideBar.classList.remove("header__sidebar--active");
    console.log("Clicked outside the sidebar");
    allowScroll();
  }
});

function handleSubmit(event) {
  event.preventDefault();

  var name = document.getElementById("username").value;
  var email = document.getElementById("useremail").value;
  var service = document.getElementById("userservice").value;
  var budget = document.getElementById("projectbudget").value;
  var message = document.getElementById("usermessage").value;

  var errors = document.getElementsByClassName("error-message");
  console.log("errors : ", errors);

  for (var i = 0; i < errors.length; i++) {
    errors[i].style.display = " none";
  }

  var isValid = true;

  if (name === "") {
    document.getElementById("name-error").innerText = "Please enter your name";
    document.getElementById("name-error").style.display = "block";
    isValid = false;
  }

  if (email === "") {
    document.getElementById("email-error").innerText =
      "Please enter your email";
    document.getElementById("email-error").style.display = "block";
    isValid = false;
  }
  if (service === "") {
    document.getElementById("service-error").innerText =
      "Please select your service";
    document.getElementById("service-error").style.display = "block";
    isValid = false;
  }
  if (budget === "") {
    document.getElementById("budget-error").innerText =
      "Please select your budget";
    document.getElementById("budget-error").style.display = "block";
    isValid = false;
  }
  if (message === "") {
    document.getElementById("message-error").innerText =
      "Please enter your message";
    document.getElementById("message-error").style.display = "block";
    isValid = false;
  }

  if (isValid) {
    alert("Form submitted successfully!");
    console.log("Form Data:", { name, email, service, budget, message });
  }
  return;
}
