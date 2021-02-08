const searchSongs = async () => {
    const searchText = document.getElementById('input-field').value;
    // console.log(searchText);
    document.getElementById('input-field').value = "";
    const url = `https://api.lyrics.ovh/suggest/${searchText}`;
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => {
            showDetails(data.data);
        })
        .catch(error => {
            displayError('Something went wrong!!! Please try again later.');
        })
    // const res = await fetch(url);
    // const data = await res.json();
    // showDetails(data.data);
}

const showDetails = songs => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = '';
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <img src="${song.artist.picture}">
                <audio controls>
                    <source src="${song.preview}">                   
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `;
        songContainer.appendChild(songDiv);
    });
}

// const getLyric = async (artist, title) => {
//     const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
//     const res = await fetch(url);
//     const data = await res.json();
//     displayLyrics(data.lyrics);    
// }
const getLyric = (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            displayLyrics(data.lyrics);
        })
}
const displayLyrics = lyric => {
    const songLyrics = document.getElementById('song-lyrics');
    songLyrics.innerText = lyric;
}

const displayError = error => {
    const errorText = document.getElementById('error-message');
    errorText.innerText = error;
}