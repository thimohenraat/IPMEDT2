const golf = document.querySelectorAll("#golf1, #golf2, #golf3, #golf4");
const buttonTsunami = document.getElementById("tsunami");
const buttonQuake = document.getElementById("quake");



window.addEventListener('DOMContentLoaded', () => {
    document.body.classList.remove('fade-out');
  });

buttonTsunami.onclick = () => {
    golf.forEach(element => {
        element.style.height = "80vh";
    });

    setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
     }, 3000);
};

buttonQuake.onclick = () => {
    buttonTsunami.style.animation = "shake 0.5s linear infinite alternate";
    buttonQuake.style.animation = "shake2 0.5s linear infinite alternate";
    

    setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
        buttonTsunami.style.animation = "none";
        buttonQuake.style.animation = "none";
     }, 3000);
};


