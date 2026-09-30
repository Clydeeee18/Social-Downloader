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
                'X-RapidAPI-Key': '7838030718mish69a9736c708802bp18d048jnn58ce3ede2c67', //[span_1](start_span)[span_1](end_span)
                'X-RapidAPI-Host': 'social-download-all-in-one.p.rapidapi.com'
            }
        });
        
        let data = await response.json();
        
        if (data && data.medias && data.medias.length > 0) {
            let downloadLink = data.medias[0].url;
            
            if (type === 'mp3') {
                let audioMedia = data.medias.find(m => m.audio_only || m.extension === 'mp3');
                if (audioMedia) downloadLink = audioMedia.url;
            }

            resultDiv.innerHTML = `<a href="${downloadLink}" target="_blank" download>👉 Click Here to Download Your File</a>`;
        } else {
            resultDiv.innerHTML = "Could not find any downloadable link. Please check the URL.";
        }
    } catch (error) {
        console.error(error);
        resultDiv.innerHTML = "An error occurred while processing. Try again later.";
    }
}
