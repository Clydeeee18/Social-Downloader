async function downloadMedia(type) {
  const url = document.getElementById('urlInput').value.trim();
  const resultDiv = document.getElementById('result');
  if (!url) { alert("Link paste phawt rawh!"); return; }

  resultDiv.textContent = "Processing...";

  try {
    const response = await fetch(
      `https://social-download-all-in-one.p.rapidapi.com/v1/social/autolink`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': 'KEY_THAR_HETAH',
          'X-RapidAPI-Host': 'social-download-all-in-one.p.rapidapi.com'
        },
        body: JSON.stringify({ url })
      }
    );

    const data = await response.json();
    console.log(response.status, data);

    if (!response.ok) {
      resultDiv.textContent = `Error ${response.status}: ${data.message || 'Unknown'}`;
      return;
    }

    const root = data.data || data;
    const medias = root.medias || root.links || [];
    let link = root.url || (medias[0] && medias[0].url);

    if (type === 'mp3') {
      const a = medias.find(m => m.audio_only || m.type === 'audio' || m.extension === 'mp3');
      if (a) link = a.url;
    }

    if (link) {
      resultDiv.innerHTML = `<a href="${link}" target="_blank" rel="noopener">👉 Download</a>`;
    } else {
      // raw response lantir, en theih nan
      resultDiv.textContent = "Link hmuh loh. Response: " + JSON.stringify(data).slice(0, 300);
    }
  } catch (e) {
    resultDiv.textContent = "Error: " + e.message;
  }
}