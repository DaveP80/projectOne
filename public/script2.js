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
    newItem.id = Math.floor(100 + Math.random() * 900).toString()
    let newp = document.createElement('p')
    newp.textContent = str.replaceAll("\n", ' ');
    let newicon = document.createElement('i')
    newicon.classList.add("fa", "fa-times")
    newicon.addEventListener('click', () => {
        let myDiv = document.getElementById(newItem.id)
        myDiv.remove()
    })
    newItem.classList.add('pitem');
    newItem.style.gridColumn = `${column} / span 1`; // Set the column of the new item
    newItem.appendChild(newp)
    newItem.appendChild(newicon)
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
// Get the button:
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
