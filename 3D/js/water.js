const golf = document.querySelectorAll("#golf1, #golf2, #golf3, #golf4");
const buttonTsunami = document.getElementById("tsunami");
const buttonQuake = document.getElementById("quake");

  function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
  }

buttonTsunami.onclick = () => {
    golf.forEach(element => {
        element.style.height = "70vh";
    });


    setTimeout(() => {
        window.scrollTo(0, (window.scrollY + document.querySelector('#scrolling').getBoundingClientRect().top)*0.55);
     }, 3000);
};

buttonQuake.onclick = () => {
    buttonTsunami.style.animation = "shake 0.5s linear infinite alternate";
    buttonQuake.style.animation = "shake2 0.5s linear infinite alternate";
    

    setTimeout(() => {
      window.scrollTo(0, (window.scrollY + document.querySelector('#scrolling').getBoundingClientRect().top)*0.55);
        buttonTsunami.style.animation = "none";
        buttonQuake.style.animation = "none";
     }, 3000);
};


const observerText = new IntersectionObserver(entries => {
    // Loop over de text wrapper
    entries.forEach(entry => {
      const text = entry.target.querySelector('.text');
      // als het zichtbaar is doe dit
      if (entry.isIntersecting) {
        // voeg de animatie toe
        text.classList.add('text__transition');
        return; // na het toevoegen van de class, ga uit de functie
      }
      //als je de text niet meer ziet, verwijder de class
      text.classList.remove('text__transition');
    });
  });
  
  let target = '.text__wrapper';
  document.querySelectorAll(target).forEach((i) => {
    if (i) {
      observerText.observe(i);
    }
  });

  const makePicture = () => {
    document.body.classList.add('fade-out');
    // document.querySelector('body').style.background = "#FFFFFF";
    setTimeout(() => { 
      window.location.href = "plaatje2.html";
    }, 1000);
  }
  
  let photo_icon = document.getElementById('photoIcon');
  
  photo_icon.addEventListener("click", makePicture);




