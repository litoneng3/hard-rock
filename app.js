const searchSongs = () => {
    const searchText = document.getElementById('input-field').value;
    console.log(searchText);
    document.getElementById('input-field').value = "";
    const url = `https://api.lyrics.ovh/suggest/${searchText}`;
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => {
            showDetails(data.data);
        })
}

const showDetails = songs => {
    songs.forEach(song => {
        console.log(song);
        const songContainer = document.getElementById('song-container');
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <img src="${song.artist.picture}">
                <audio controls>
                    <source src="${song.preview}" type="audio/ogg">                   
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `;
        songContainer.appendChild(songDiv);
    });
}

const getLyric = (artist, title) => {
    console.log(artist, title);
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => {
        displayLyrics(data.lyrics);
    })
}

const displayLyrics = lyrics => {
    const songLyrics = document.getElementById('song-lyrics');
    songLyrics.innerText = lyrics;
}
