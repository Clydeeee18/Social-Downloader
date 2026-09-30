function downloadMedia(type) {
    const urlInput = document.getElementById('urlInput').value.trim();
    const resultDiv = document.getElementById('result');
    
    if (!urlInput) {
        alert("Please paste a valid video link first!");
        return;
    }

    resultDiv.innerHTML = "Generating download link, please wait...";

    let targetUrl = "";

    // Platform hrang hrang bikah direct downloader lian zual (e.g., SaveFrom, SnapSave) ah link pass-na turin kan siam
    if (type === 'instagram') {
        targetUrl = `https://en.savefrom.net/1-instagram-video-downloader-3/?url=${encodeURIComponent(urlInput)}`;
    } else if (type === 'tiktok') {
        targetUrl = `https://snapsave.app/download?url=${encodeURIComponent(urlInput)}`;
    } else if (type === 'youtube' || type === 'mp3') {
        targetUrl = `https://en.savefrom.net/1-youtube-video-downloader-7/?url=${encodeURIComponent(urlInput)}`;
    }

    // Result box-ah direct link button kan rawn chhuahtir ang
    setTimeout(() => {
        resultDiv.innerHTML = `
            <p style="margin-bottom: 10px; color: #38bdf8;">Link is ready!</p>
            <a href="${targetUrl}" target="_blank" style="display: inline-block; padding: 10px 20px; background: #4f46e5; color: white; border-radius: 6px; text-decoration: none; font-weight: bold;">
                👉 Click Here to Open Download Page
            </a>
        `;
    }, 500);
}
