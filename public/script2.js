//make an array of important objects from
const filteredValues = Object.entries(localStorage)
    .filter(([key, value]) => parseInt(key) > 9999)
    .map(([key, value]) => {return {[key]: value}})
let column = 1;
//if local storage is empty
function emptyStorage() {
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
//if there are no quotes in local storage
if (filteredValues.length == 0) {
    emptyStorage()
}
//fill the columns of our grid with text boxes
for (let obj of filteredValues) {
    console.log(obj)
    const newItem = document.createElement('div');
    newItem.display = 'flex'
    newItem.style = 'flex-direction: column-reverse'
    newItem.id = Object.keys(obj)[0]
    let newp = document.createElement('p')
    newp.textContent = Object.values(obj)[0].replaceAll('\n', ' ')
    let newicon = document.createElement('i')
    newicon.classList.add("fa", "fa-times")
    newicon.addEventListener('click', () => {
        let myDiv = document.getElementById(newItem.id)
        myDiv.remove()
        localStorage.removeItem(newItem.id)
        //build center if all divs are empty
        const div1 = document.getElementById("1");
        const div2 = document.getElementById("2");
        const div3 = document.getElementById("3");
        if (div1.innerHTML === "" && div2.innerHTML === "" && div3.innerHTML === "") {
            emptyStorage()
          }
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
    window.location.href = '../index.html'
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
