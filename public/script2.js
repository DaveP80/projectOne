//make an array of important objects from
const filteredValues = Object.entries(localStorage)
    .filter(([key, value]) => parseInt(key) > 9999)
    .map(([key, value]) => { return { [key]: value } });


//if one column is empty
window.onload = function () {
    const div1 = document.getElementById("1");
    const div2 = document.getElementById("2");
    const div3 = document.getElementById("3");
    if (div1.innerHTML == "" || div2.innerHTML == "" || div3.innerHTML == "") {
        let container = document.querySelector(".grid-container");
        container.style.gridTemplateColumns = "1fr";
    }
}
let column = 1;
//if local storage is empty
//if there are no quotes in local storage
if (filteredValues.length == 0) {
    emptyStorage()
}

function emptyStorage(column = 1) {
    let container = document.querySelector(".grid-container");
    container.style.gridTemplateColumns = "repeat(3, 1fr)";
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
    })
}

function makeGrid(flag) {
    const div1 = document.getElementById("1");
    const div2 = document.getElementById("2");
    const div3 = document.getElementById("3");
    if (flag) {
        div1.innerHTML = ""; div2.innerHTML = ""; div3.innerHTML = "";
        for (let i = filteredValues.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [filteredValues[i], filteredValues[j]] = [filteredValues[j], filteredValues[i]];
        }
    }
    for (let i = 0; i < filteredValues.length; i++) {
        if (typeof filteredValues[i] === 'object') {
            const newItem = document.createElement('div');
            newItem.display = 'flex'
            newItem.style = 'flex-direction: column-reverse'
            newItem.id = Object.keys(filteredValues[i])[0]
            let newp = document.createElement('p')
            newp.textContent = Object.values(filteredValues[i])[0].replaceAll('\n', ' ')
            let newicon = document.createElement('i')
            newicon.classList.add("fa", "fa-times")
            newicon.addEventListener('click', () => {
                let myDiv = document.getElementById(newItem.id)
                myDiv.remove()
                localStorage.removeItem(newItem.id)
                delete filteredValues[i]
                //build center if all divs are empty
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
    }
}

makeGrid()
let form = document.getElementById('fontselect')

form.addEventListener('submit', (event) => {
    event.preventDefault()
    var font = form.elements.fonts.value;
    if (font == '--Font--') font = "'Enriqueta', serif";
    let togglegrid = document.querySelectorAll('.pitem')
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
    let container = document.querySelector(".grid-container");
    if (container.style.gridTemplateColumns !== "1fr") container.style.gridTemplateColumns = "1fr";
    else container.style.gridTemplateColumns = 'repeat(3, 1fr)';
})

let shuffle = document.getElementById('shuffle')

shuffle.addEventListener('click', () => {
    if (filteredValues.length) {
        let allitems = document.querySelectorAll('.pitem')
        const heights = []

        allitems.forEach(item => {
            heights.push(item.offsetHeight)
        })
        makeGrid(true)
    }
})

// Get the button:
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}
// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    document.body.scrollTop = 0; // For Safari
}
