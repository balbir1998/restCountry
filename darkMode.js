const darkModeBtn = document.querySelector(".dark-mode");

if (JSON.parse(localStorage.getItem("darkMode"))) {
    document.body.classList.toggle("active-dark-mode");
    darkModeBtn.innerHTML = `<i class="fa-regular fa-sun"></i>&ensp;Light Mode`;
}

darkModeBtn.addEventListener("click", function () {
    document.body.classList.toggle("active-dark-mode");

    if (document.body.classList.contains("active-dark-mode")) {
        darkModeBtn.innerHTML = `<i class="fa-regular fa-sun"></i>&ensp;Light Mode`;
        localStorage.setItem("darkMode", true);
    } else {
        darkModeBtn.innerHTML = `<i class="fa-regular fa-moon"></i>&ensp;Dark Mode`;
        localStorage.setItem("darkMode", false);
    }
});