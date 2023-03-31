const filteredValues = Object.entries(localStorage)
    .filter(([key, value]) => parseInt(key) > 9999)
    .map(([key, value]) => value)

let column = 1;
//if there are no quotes in local storage
if (filteredValues.length == 0) {
    ['make some API Requests!', '📓📙👩‍🎓', '🦮🐱🐩'].forEach(item => {
        const newItem = document.createElement('div');
        let newp = document.createElement('p')
        newp.textContent = item;
        newItem.classList.add('pitem');
        newItem.style.gridColumn = `${column} / span 1`; // Set the column of the new item
        newItem.appendChild(newp)
        const container = document.getElementById(column.toString())
        container.appendChild(newItem);
        column++;
        if (column > 3) {
            column = 1; // Reset to first column if we reach the end of the row
        }
    })
}
//fill the columns of our grid with text boxes
for (const str of filteredValues) {
    const newItem = document.createElement('div');
    let newp = document.createElement('p')
    newp.textContent = str.replaceAll("\n", ' ');
    newItem.classList.add('pitem');
    newItem.style.gridColumn = `${column} / span 1`; // Set the column of the new item
    newItem.appendChild(newp)
    const container = document.getElementById(column.toString())
    container.appendChild(newItem);
    column++;
    if (column > 3) {
        column = 1; // Reset to first column if we reach the end of the row
    }
}
let form = document.getElementById('fontselect')
let togglegrid = document.querySelectorAll('.pitem')

form.addEventListener('submit', (event) => {
    event.preventDefault()
    var font = form.elements.fonts.value;
    if (font == '--Font--') font = "'Enriqueta', serif";
    togglegrid.forEach(function (item) {
        // set the font style of the element to a new font
        item.style.fontFamily = font;
    });
})

document.getElementById("nav").addEventListener("click", function () {
    window.history.back();
});
//change grid layout of all the collected quotes
document.getElementById("revert").addEventListener("click", function () {
    var container = document.querySelector(".grid-container");
    if (container.style.gridTemplateColumns !== "1fr") container.style.gridTemplateColumns = "1fr";
    else container.style.gridTemplateColumns = 'repeat(3, 1fr)';
})
