const boeket = document.querySelectorAll(".boeket__1, .boeket__2, .boeket__3");
const kind = document.querySelectorAll(".kindje__1, .kindje__2, .kindje__3");

kind.forEach(element => {
    const left = element.offsetLeft;
    const top = element.offsetTop;
    let coordinaat = 
    console.log(left, top);
});

const mover = (element) => {
    console.log(element);
    element.onmousedown = (e) => {
        //waar is de muis tenopzichte van het plaatje
        let thisY = e.offsetY;
        let thisX = e.offsetX;
        // console.log(thisY, thisX);

        document.onmousemove = (e) => {
            //verplaats het plaatje naar waar de muis beweegt
            element.style.top = e.clientY - thisY + "px";
            element.style.left = e.clientX - thisX + "px";
            // const left = element.offsetLeft;
            // const top = element.offsetTop;
            // console.log(left, top);
            element.getBoundingClientRect()
            
            //stop met bewegen als er niet meer geklikt word
            document.onmouseup = () => {
                document.onmousemove = () => {
                    // niks
                }
            }

        } 

    }

}

boeket.forEach(element => {
    mover(element);

});



