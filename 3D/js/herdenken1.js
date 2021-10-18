const boeket = document.querySelectorAll(".boeket__1, .boeket__2, .boeket__3");
const kinderen = document.querySelectorAll(".kindje__1, .kindje__2, .kindje__3");


const mover = (element) => {

    element.onmousedown = (e) => {
        //waar is de muis tenopzichte van het plaatje
        let thisY = e.offsetY;
        let thisX = e.offsetX;
        document.onmousemove = (e) => {
            //kijk waar oppervlakte de bloem is
            let boeketRect = element.getBoundingClientRect()

            //verplaats het plaatje naar waar de muis beweegt
            element.style.left = e.clientX - thisX + "px";
            element.style.top = e.clientY - thisY + "px";

            //kijk of een bloem over een kind gaat
            let boeketPadding = boeketRect.width / 2;
            document.onmouseup = () => {
                kinderen.forEach(kind => {
                    //kijk waar de opppervlakte van de kinderen
                    let kindRect = kind.getBoundingClientRect();
                    if (boeketRect.x + boeketPadding < kindRect.x + kindRect.width &&
                        boeketRect.x + boeketRect.width - boeketPadding > kindRect.x &&
                        boeketRect.y + boeketPadding < kindRect.y + kindRect.height &&
                        boeketRect.height + boeketRect.y - boeketPadding > kindRect.y) {
                            element.style.opacity = 0;
                            kind.style.opacity = 0;
                    }
                })
                 //stop met bewegen als er niet meer geklikt word
                document.onmousemove = () => {
                    // niks
                }
            }

        }

    }

}

boeket.forEach(bloem => {
    mover(bloem);
});