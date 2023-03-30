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
        let changearea = document.getElementById('centertext')
        changearea.textContent = Object.values(data[3]).join('').trim().replaceAll("  ", "")
        makeCanvas()
      })
      .catch(error => console.error(error));
})





let grabimg = document.getElementById('centerimg')
let copybtn = document.getElementById('copy-img-btn')
let textb = document.getElementById('copy-text-btn')

copybtn.addEventListener('click', () => {
    copyToClipboard(grabimg.src);
});

textb.addEventListener('click', () => {
  let divContent = document.getElementById('centertext')
  const textToCopy = divContent.textContent
  const textarea = document.createElement('textarea');
  // Set the value of the textarea to the text content
  textarea.value = textToCopy;

  // Append the textarea to the body
  document.body.appendChild(textarea);

  // Select the textarea
  textarea.select();

  // Copy the text
  document.execCommand('copy');

  // Remove the textarea
  document.body.removeChild(textarea);
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

const ctx = canvas.getContext('2d');

// Set the font properties
const fontSize = 16;
ctx.font = `${fontSize}px Arial`;

// Set the canvas size to match the text size
const textWidth = ctx.measureText(pElement.textContent).width;
canvas.width = textWidth*0.80;
canvas.height = fontSize * 3;

// Center the text
const x = canvas.width / 2;
const y = canvas.height / 2;
ctx.textBaseline = 'middle';
ctx.textAlign = 'center';

// Draw the text on the canvas
ctx.fillText(pElement.textContent, x, y);
}

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

function makeCanvas2(args) {
  // Get the textarea and canvas elements
//const textarea = document.getElementById('centertext');
const canvas = document.getElementById('myCanvas');

// Set the background color of the canvas
canvas.style.backgroundColor = 'gray';

// Get the context of the canvas
const context = canvas.getContext('2d');

// Set the font size and font family of the text
const fontSize = 14;
const fontFamily = 'Arial';
context.font = `${fontSize}px ${fontFamily}`;

// Measure the width and height of the text
const lines0 = args.split('\n');
let words = [];

for (let i = 0; i < lines0.length; i++) {
  const line = lines0[i];
  const lineWords = line.split(' ');
  words = [...words, ...lineWords];
}
const lines = [];
let currentLine = words[0];
for (let i = 1; i < words.length; i++) {
  const word = words[i];
  console.log(word);
  const width = context.measureText(`${currentLine} ${word}`).width;
  if (width < canvas.width) {
    currentLine += ` ${word}`;
  } else {
    lines.push(currentLine);
    currentLine = word;
  }
}
lines.push(currentLine);
const textHeight = fontSize * 1.5 * lines.length;

// Set the width and height of the canvas
const textWidth = Math.max(...lines.map(line => context.measureText(line).width));
const canvasWidth = Math.min(textWidth, 300); // Limit the width to a maximum of 300px
const canvasHeight = textHeight;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

// Draw the text onto the canvas
context.fillStyle = 'black';
let y = fontSize;
lines.forEach(line => {
  const x = (canvas.width - context.measureText(line).width) / 2;
  context.fillText(line, x, y);
  y += fontSize * 3;
});
}



