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