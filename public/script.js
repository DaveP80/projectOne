let textareastorage = {}
let counter = 0;
//store client dimensions
let canvasdim = document.getElementById('myCanvas')
const defaultWidth = canvasdim.width;
const defaultHeight = canvasdim.height;
//store client dimensions
const textarea = document.getElementById('centertext');
const defaultTWidth = textarea.clientWidth;
const defaultTHeight = textarea.clientHeight;

let textb = document.getElementById('copy-text-btn')

textb.addEventListener('click', () => {
  let divContent = document.getElementById('centertext')
  if (divContent.value.length>1) {
    divContent.select();

    // Copy the text
    document.execCommand('copy');
  } else {
    alert("need more content in text area")
  }
  })
let textc = document.getElementById('copy-text-btn2')

textc.addEventListener('click', () => {
  let divContent = document.getElementById('centertext2')
  if (divContent.value.length>1) {
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
  for (let i=0; i<12; i++) {
    const randomIndex = Math.floor(Math.random() * keys.length);
    const randomKey = keys[randomIndex];
    cache.push(Object.values(args[randomKey]).join('').trim().replaceAll("  ", ''))

  }
    let shortest = cache[0]; // assume the first string is the shortest
    // loop through the array of strings and compare lengths
    for (let i = 1; i < cache.length; i++) {
      console.log(cache[i]);
      if (cache[i].length < shortest.length) {
        shortest = cache[i];
      }
    }
    let longest = cache[0]; // assume the first string is the shortest
    // loop through the array of strings and compare lengths
    for (let i = 1; i < cache.length; i++) {
      console.log(cache[i]);
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
  let clearbox = document.getElementById('centertext')
  clearbox.value = ''

  const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '04a630e781mshefd694339487a87p171cc9jsn6bd43ac41939',
        'X-RapidAPI-Host': 'quotes-villa.p.rapidapi.com'
      }
    };

    getQuote(`https://quotes-villa.p.rapidapi.com/quotes/${category}`, options, "search")
      .then(data => {
        let deltext = document.getElementById('loadingtext')
        deltext.remove()

        let contentstring = checkString(data)
        let newarr = []
        for (let s of contentstring) {
          if (s.charAt(s.length - 1) === ',') {
            s = s.slice(0, -1);
            newarr.push(s)
          } else newarr.push(s)
        }

        
        let changearea = document.getElementById('centertext')
        let changearea2 = document.getElementById('centertext2')
        //fill in the two text areas with shortest and longest result strings
        changearea.value = newarr[0]
        changearea2.value = newarr[1]
        addString(newarr[0])
        makeCanvas()
        //Generate new canvas when textarea is altered.
        changearea.addEventListener("input", () => {
          let checktextarea = document.getElementById('centertext')
          if (checktextarea.value.length<10){
            let resetcanvas = document.getElementById('myCanvas')
            resetcanvas.width = defaultWidth
            resetcanvas.height = defaultHeight
            checktextarea.style.width = (defaultTWidth).toString() + 'px'
            checktextarea.style.height = (defaultTHeight).toString() + 'px'
          }
          else if (checktextarea.value.length > textareastorage[counter-1].length+8 || checktextarea.value.length < 
            textareastorage[counter-1].length-8) {
            makeCanvas()
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

function makeCanvas() {

// Select the canvas element
const canvas = document.getElementById('myCanvas');

// Select the p element from the DOM
const pElement = document.getElementById("centertext");
canvas.style = "background-color: #c9fcb8";

const ctx = canvas.getContext('2d');

// Set the font properties
const fontSize = 20;
ctx.font = `${fontSize}px Arial`;

// Set the canvas size to match the text size
const textWidth = ctx.measureText(pElement.value).width;
canvas.width = textWidth*0.80;
canvas.height = fontSize * 3;
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

copycanvas.addEventListener('click', () => {

// Select the canvas element
const canvas = document.querySelector('canvas');

// Get the canvas context
const ctx = canvas.getContext('2d');

// Create a new canvas element to copy the contents to
const newCanvas = document.createElement('canvas');
newCanvas.width = canvas.width;
newCanvas.height = canvas.height;

// Get the new canvas context
const newCtx = newCanvas.getContext('2d');

// Copy the contents of the original canvas to the new canvas
newCtx.drawImage(canvas, 0, 0);

// Convert the canvas content to a data URL
newCanvas.toBlob((blob) => {

  // Create a new image element
  const img = new Image();

  // Set the image source to the Blob URL
  img.src = URL.createObjectURL(blob);

  copyToClipboard(img.src)
  
});
})
}       



