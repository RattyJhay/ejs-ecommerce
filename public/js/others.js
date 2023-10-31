const tip = document.querySelector(".tip")
const navbarNav = document.querySelector('#navbar-nav');


if (tip.innerText > 0) {
  tip.classList.add("tip-number")
} else {
  tip.classList.remove("tip-number")
}