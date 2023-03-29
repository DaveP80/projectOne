let grabimg = document.getElementById('centerimg')
let copybtn = document.getElementById('copy-img-btn')

copybtn.addEventListener('click', () => {
    copyToClipboard(grabimg.src);
});

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

// Select the canvas element
const canvas = document.querySelector('canvas');

// Get the canvas context
const ctx = canvas.getContext('2d');

// Set the background color
ctx.fillStyle = 'gray';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Set the text properties
ctx.fillStyle = 'white';
ctx.font = '20px sans-serif';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';

// Set the text content
const text = 'Hello, world!';

// Get the text dimensions
const textWidth = ctx.measureText(text).width;

// Calculate the text position
const x = canvas.width / 2;
const y = canvas.height / 2;

// Draw the text
ctx.fillText(text, x, y);

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
const dataUrl = newCanvas.toDataURL();

// Create a new text area element to hold the data URL
const textArea = document.createElement('textarea');
textArea.value = dataUrl;

// Append the text area element to the DOM
document.body.appendChild(textArea);

// Select the text area
textArea.select();

// Copy the contents of the text area to the clipboard
document.execCommand('copy');

// Remove the text area from the DOM
document.body.removeChild(textArea);


})



