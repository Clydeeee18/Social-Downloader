async function downloadMedia(type) {
    const url = document.getElementById('urlInput').value;
    const resultDiv = document.getElementById('result');
    
    if (!url) {
        alert("Please paste a valid link first!");
        return;
    }

    resultDiv.innerHTML = "Processing your request, please wait...";

    try {
        let response = await fetch(`https://social-download-all-in-one.p.rapidapi.com/v1/social/autolink?url=${encodeURIComponent(url)}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '92bc916b73msha871add334ec460p1b4cc2jsn81b3a117f9ce',
                'X-RapidAPI-Host': 'social-download-all-in-one.p.rapidapi.com'
            }
        });
        
        let data = await response.json();
        console.log(data);
        
        if (data && (data.url || (data.medias && data.medias.length > 0))) {
            let downloadLink = data.url ? data.url : data.medias[0].url;
            
            if (type === 'mp3' && data.medias) {
                let audioMedia = data.medias.find(m => m.audio_only || m.extension === 'mp3');
                if (audioMedia) downloadLink = audioMedia.url;
            }

            resultDiv.innerHTML = `<a href="${downloadLink}" target="_blank" download>👉 Click Here to Download Your File</a>`;
        } else {
            resultDiv.innerHTML = "Could not find any downloadable link. Please check the URL or try another link.";
        }
    } catch (error) {
        console.error(error);
        resultDiv.innerHTML = "An error occurred while processing. Try again later.";
    }
}
