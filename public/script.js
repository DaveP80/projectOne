let textareastorage = {}
let options;
let counter = 0;
//store client dimensions
let canvasdim = document.getElementById('myCanvas')
const defaultWidth = canvasdim.width;
const defaultHeight = canvasdim.height;
//store client dimensions
const textarea = document.getElementById('centertext');
const defaultTWidth = textarea.clientWidth;
const defaultTHeight = textarea.clientHeight;

window.onload = function () {
  var visited = localStorage.getItem('visited');
  if (!visited) {
    getQuote('https://us-east4-majestic-cairn-365919.cloudfunctions.net/getquote').then(res => {
      options = res
      getQuote(`https://quotes-villa.p.rapidapi.com/quotes/wisdom`, options).then(res => {
        let contentstring = checkString(res)
        let fquote = ''
        if (contentstring[0].charAt(contentstring[0].length - 1) === ',') {
          contentstring[0] = contentstring[0].slice(0, -1);
          fquote = contentstring[0]
        } else fquote = contentstring[0]

        var newDiv = document.createElement('div');

        newDiv.className = 'grid-item';

        newDiv.innerHTML = `<blockquote><p>${fquote}</p></blockquote>`;

        var quoteContainer = document.querySelector('header');

        quoteContainer.appendChild(newDiv);

        setTimeout(() => {
          let blockquote = document.querySelector('blockquote')
          blockquote.classList.add('visible');
        }, 1000);
      }).catch(e => console.log(e))
    })
    // Set the 'visited' flag in localStorage
    localStorage.setItem('visited', 'true');
  } else if (visited) {
    getQuote('https://us-east4-majestic-cairn-365919.cloudfunctions.net/getquote').then(res => {
      options = res
    })
  }
};
let textb = document.getElementById('copy-text-btn')

textb.addEventListener('click', () => {
  let divContent = document.getElementById('centertext')
  if (divContent.value.length > 1) {
    divContent.select();
    // Copy the text
    document.execCommand('copy');
  } else {
    alert("need more content in text area")
  }
})

let info = document.getElementById('info')

info.addEventListener('click', () => {
  let newdiv = document.createElement('div')
  newdiv.id = 'infodiv'
  let notice = document.createElement('p')
  notice.classList.add('notice')
  notice.textContent = `This website calls the QuotesVilla Api and the user can select from many categories. Pick
   a category and optional font color. Then you can copy and paste a short or long quote, and copy the canvas image. The
    other page is a collection of all the Api requests. The default quote category is wisdom.`
  newdiv.appendChild(notice)
  let newicon = document.createElement('i')
  newicon.classList.add("fa", "fa-times")
  newicon.addEventListener('click', () => {
    let myDiv = document.getElementById(newdiv.id)
    myDiv.remove()
  })
  newdiv.appendChild(newicon)
  let adddiv = document.querySelector('header')
  let allinfo = document.querySelectorAll('#infodiv')
  if (allinfo) {
    for (a of allinfo) {
      a.remove()
    }
  }
  adddiv.appendChild(newdiv)
})

let reset = document.getElementById('reset')

reset.addEventListener('click', (event) => {
  event.preventDefault()
  let rcanvas = document.getElementById('myCanvas')
  rcanvas.width = defaultWidth
  rcanvas.height = defaultHeight
  rcanvas.style = "background-color: #c9fcb8"
  let clearbox = document.getElementById('centertext')
  clearbox.value = ''
  clearbox.style.fontFamily = ''
  let clearbox2 = document.getElementById('centertext2')
  clearbox2.value = ''
  clearbox2.style.fontFamily = ''
})
//add method to change canvas color button
let ccc = document.getElementById('inccanvas-btn')

ccc.addEventListener('click', () => {
  let inccanvas = document.getElementById('myCanvas')
  //reset canvas and textarea dimensions
  inccanvas.width += 5
  inccanvas.height += 5
  let reset = inccanvas.width - defaultWidth
  if (reset > 250) {
    inccanvas.width = defaultWidth
    inccanvas.height = defaultHeight
  }
})
let decc = document.getElementById('deccanvas-btn')

decc.addEventListener('click', () => {
  let deccanvas = document.getElementById('myCanvas')
  //reset canvas and textarea dimensions
  deccanvas.width -= 5
  deccanvas.height -= 5
  let reset = defaultWidth - deccanvas.width
  if (reset > 30) {
    deccanvas.width = defaultWidth
    deccanvas.height = defaultHeight
  }
})
//add method to copy text from 2nd textarea
let textc = document.getElementById('copy-text-btn2')

textc.addEventListener('click', () => {
  let divContent = document.getElementById('centertext2')
  if (divContent.value.length > 1) {
    divContent.select();

    // Copy the text
    document.execCommand('copy');
  } else {
    alert("need more content in text area")
  }
})

function addString(str) {
  const key = `${counter}`;
  textareastorage[key] = str;
  counter++;
}

function checkString(args) {
  let cache = []
  const keys = Object.keys(args);
  for (let i = 0; i < 15; i++) {
    const randomIndex = Math.floor(Math.random() * keys.length);
    const randomKey = keys[randomIndex];
    let firststring = Object.values(args[randomKey]).join('').trim().replaceAll("  ", '')
    const regex = /^"\s\w/
    const regex2 = /^"\n/
    if (!regex.test(firststring) || !regex2.test(firststring)) {
      cache.push(firststring)
    }
  }
  let shortest = cache[0]; // assume the first string is the shortest
  // loop through the array of strings and compare lengths
  for (let i = 1; i < cache.length; i++) {
    if (cache[i].length < shortest.length) {
      shortest = cache[i];
    }
  }
  let longest = cache[0]; // assume the first string is the shortest
  // loop through the array of strings and compare lengths
  for (let i = 1; i < cache.length; i++) {
    if (cache[i].length > longest.length) {
      longest = cache[i];
    }
  }
  return [shortest, longest];
}

async function getQuote(api_url, headers, flag) {
  if (flag == "search") {
    const myElement = document.querySelector('.centered');
    const newp = document.createElement('p')
    newp.id = 'loadingtext'
    newp.textContent = '...loading'
    if (myElement) myElement.appendChild(newp)
  }
  const response = await fetch(api_url, headers);

  const data = await response.json();
  return data;
}

const form = document.querySelector('.usersubmit');

form.addEventListener("submit", (event) => {

  event.preventDefault();

  const category = form.elements.category.value;
  if (category == '--select a category--') alert('choosing wisdom')
  var font = form.elements.fonts.value;
  let clearbox = document.getElementById('centertext')
  clearbox.value = ''
  if (font == '--Font--') font = `'Nokora', sans-serif`;
  clearbox.style.fontFamily = font;
  let clearbox2 = document.getElementById('centertext2')
  clearbox2.value = ''
  clearbox2.style.fontFamily = font;
  var color = form.elements.colors.value;

  getQuote(`https://quotes-villa.p.rapidapi.com/quotes/${category == '--select a category--' ? 'wisdom' : category}`, options, "search")
    .then(data => {
      let deltext = document.getElementById('loadingtext')
      deltext.remove()

      let contentstring = checkString(data)
      let newarr = []
      //remove extra char at end of previous function
      for (let s of contentstring) {
        if (s.charAt(s.length - 1) === ',') {
          s = s.slice(0, -1);
          newarr.push(s)
        } else newarr.push(s)
      }
      let changearea = document.getElementById('centertext')
      let changearea2 = document.getElementById('centertext2')
      //fill in the two text areas with shortest and longest result strings
      if (!newarr[0].includes("You are not subscribed to this API.")) {
        newarr.forEach(item => {
          localStorage.setItem(Math.floor(10000 + Math.random() * 90000).toString(), item)
        })

      } else return;
      changearea.value = newarr[0]
      changearea2.value = newarr[1]
      addString(newarr[0])
      makeCanvas(color, font)
      //Generate new canvas when textarea is altered.
      changearea.addEventListener("input", () => {
        let checktextarea = document.getElementById('centertext')
        if (checktextarea.value.length < 10) {
          let resetcanvas = document.getElementById('myCanvas')
          //reset canvas and textarea dimensions
          resetcanvas.width = defaultWidth
          resetcanvas.height = defaultHeight
          checktextarea.style.width = (defaultTWidth).toString() + 'px'
          checktextarea.style.height = (defaultTHeight).toString() + 'px'
        }
        //only alter canvas if there is a quantitative difference in text area
        else if (checktextarea.value.length > textareastorage[counter - 1].length + 8 || checktextarea.value.length <
          textareastorage[counter - 1].length - 8) {
          let getcolor = document.getElementById('colors')
          const selectedOption = getcolor.options[getcolor.selectedIndex];
          const selectedValue = selectedOption.value;
          makeCanvas(selectedValue)
        }
      })
    })
    .catch(error => console.error(error));
})

async function copyToClipboard(src) {
  const data = await fetch(src);
  const blob = await data.blob();
  try {
    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob,
      })
    ]);

    console.log("Success");
  } catch (e) {
    console.log("Copy failed: " + e);
  }
}

function makeCanvas(args, font) {

  // Select the canvas element
  const canvas = document.getElementById('myCanvas');

  // Select the p element from the DOM
  const pElement = document.getElementById("centertext");

  canvas.style = `background-color: ${args == '--Color--' ? '#c9fcb8' : args}`;

  const ctx = canvas.getContext('2d');
  // Set the font properties
  const fontSize = 16;
  ctx.font = `${fontSize}px ${font ?? 'Arial'}`;

  // Set the canvas size to match the text size
  const textWidth = ctx.measureText(pElement.value).width;
  canvas.width = textWidth * 0.80;
  canvas.height = 60;
  canvas.style.borderRadius = '0.3em'

  // Center the text
  const x = canvas.width / 2;
  const y = canvas.height / 2;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';

  // Draw the text on the canvas
  ctx.fillText(pElement.value, x, y);

  copyTextArea()
}

function copyTextArea() {

  let copycanvas = document.getElementById('copy-canvas-btn')

  copycanvas.addEventListener('click', (event) => {
    event.preventDefault()
    // Select the canvas element
    const canvas = document.querySelector('canvas');
    // Get the canvas context
    const ctx = canvas.getContext('2d');
    // Create a new canvas element to copy the contents to
    const newCanvas = document.createElement('canvas');
    newCanvas.width = canvas.width;
    newCanvas.height = canvas.height;

    const newCtx = newCanvas.getContext('2d');

    newCtx.drawImage(canvas, 0, 0);

    newCanvas.toBlob((blob) => {

      const img = new Image();

      img.src = URL.createObjectURL(blob);

      copyToClipboard(img.src)
    });
  })
}