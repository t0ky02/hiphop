function loadSongs(artist) {
    const elementToScrollTo = document.getElementById('music-player');
    if (elementToScrollTo) {
        elementToScrollTo.scrollIntoView({ behavior: 'smooth' });
    }
    $.ajax({
        url: `/artist/${artist}`,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            const fotoArtis      = $('#foto-artis');
            const songsContainer = $('.music-list-box');
            const namaArtis      = $('.nama-artis');
            const daftarMusikText= $('<h4>').text('Daftar Musik');
            songsContainer.empty();
            namaArtis.html(data.artist);
            namaArtis.append(daftarMusikText);
            switch (data.artist) {
                case "Iwa K":
                    //$('#background-element').css('background-image', 'url(' + imageUrl + ')');
                    fotoArtis.attr('src', data.image_url);
                    break;
                case "Rich Brian":
                    fotoArtis.attr('src', data.image_url);
                    break;
                case "Agnez Mo":
                    fotoArtis.attr('src', data.image_url);
                    break;
                case "Bondan Prakoso":
                    fotoArtis.attr('src', data.image_url);
                    break;
                case "Saykoji":
                    fotoArtis.attr('src', data.image_url);
                    break;
                case "A.Nayaka":
                    fotoArtis.attr('src', data.image_url);
                break;
                case "Ramengvrl":
                    fotoArtis.attr('src', data.image_url);
                break;
                default:
                    
                break;
            }
            $.each(data.songs, function(index, song) {
                const song_w_o_extentsion = song;
                const dur = data.duration[index];
                const listItem = $('<li>').html(
                    `<div class="song-title">
                        <a href="" class="" onclick="playSong('${data.artist}', '${song}', event)">
                            ${index+1}. ${song_w_o_extentsion.split('/').pop().split('.mp3')[0]}
                            <div class="duration">${dur}</div>
                        </a>
                    </div>
                `);

                listItem.click(function(event) {
                    event.preventDefault();  // Prevent default behavior
                    playSong(data.artist, song, event);
                });

                songsContainer.append(listItem);
            });
        }
    });
}

function playSong(artist, song, event) {
    //event.preventDefault(); // Mencegah default behavior dari hyperlink
    const audioPlayer = $('#audio-player')[0];
    const nowPlaying = $('.playing-title');
    nowPlaying.html('<h4>Now Playing</h4>');
    nowPlaying.append(`<h5> ${artist} </h5>`);
    nowPlaying.append(`<h6> ${song.split('/').pop().split('.mp3')[0]} </h6>`);
    audioPlayer.src = `/${artist}/${song}`;
    audioPlayer.volume= 0.5;
    audioPlayer.play();
    
    // Reset nilai currentTime ke 0 sebelum memulai pemutaran baru

}