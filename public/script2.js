const filteredValues = Object.entries(localStorage)
  .filter(([key, value]) => parseInt(key) > 9999)
  .map(([key, value]) => value)
//map the values in local storage to the grid container
    filteredValues.forEach((item) => {
        if (!item.startsWith('" ')) {
        let sdiv = document.querySelector('.grid-container')
        let newdiv = document.createElement('div')
        newdiv.classList.add('pitem')
        let newp = document.createElement('p')
        newp.textContent = item
        newdiv.appendChild(newp)
        sdiv.appendChild(newdiv)
    }
    })
    let form = document.getElementById('fontselect')
    let togglegrid = document.querySelectorAll('.pitem')

    form.addEventListener('submit', (event) => {
        event.preventDefault()
        var font = form.elements.fonts.value;
        if (font == '--Font--') font = "'Enriqueta', serif";
        togglegrid.forEach(function(item) {
            // set the font style of the element to a new font
            item.style.fontFamily = font;
          });
    })

    document.getElementById("nav").addEventListener("click", function() {
        window.history.back();
      });
      