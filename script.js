async function downloadMedia(type) {
    const url = document.getElementById('urlInput').value;
    const resultDiv = document.getElementById('result');
    
    if (!url) {
        alert("Please paste a valid link first!");
        return;
    }

    resultDiv.innerHTML = "Processing your request, please wait...";

    // Free public API alternative (Cobalt API / similar direct downloader)
    try {
        let response = await fetch("https://co.wuk.sh/api/json", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                url: url,
                isAudioOnly: type === 'mp3'
            })
        });

        let data = await response.json();
        console.log(data);

        if (data && data.status === "redirect" || data.url) {
            let downloadLink = data.url || data.picker[0].url;
            resultDiv.innerHTML = `<a href="${downloadLink}" target="_blank" download>👉 Click Here to Download Your File</a>`;
        } else if (data && data.status === "picker") {
            let linksHtml = "<h4>Select to download:</h4>";
            data.picker.forEach(item => {
                linksHtml += `<a href="${item.url}" target="_blank" download style="display:block; margin:5px 0;">Download (${item.type || 'Media'})</a>`;
            });
            resultDiv.innerHTML = linksHtml;
        } else {
            resultDiv.innerHTML = "Could not process this URL. Try another link.";
        }
    } catch (error) {
        console.error(error);
        resultDiv.innerHTML = "An error occurred. Please check the URL and try again.";
    }
}
