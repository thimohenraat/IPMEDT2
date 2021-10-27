const fill = document.querySelectorAll(".boeket__1, .boeket__2, .boeket__3");
const empty = document.querySelectorAll(".kindje__1, kindje__2, kindje__3");

const dragStart = () => {
    element.classList.add('hold');
}   

const dragEnd = () => {
    console.log("noo")
}


fill.forEach(element => {
    element.addEventListener('dragstart', dragStart);
});

fill.addEventListener('dragend', dragEnd);
