import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs/promises';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

const getLyricsFromUrl = async (url) => {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        // Encuentra el contenedor de letras y maneja los <br> y los bloques de texto
        const lyricsContainer = $('div.lyrics').length ? $('div.lyrics') : $('div[class^="Lyrics__Container"]');
        lyricsContainer.find('br').replaceWith('\n'); // Reemplaza <br> con \n
        return lyricsContainer.text().trim(); // Extrae el texto con saltos de línea preservados
    } catch (error) {
        console.error(`Error fetching lyrics: ${error}`);
        return null;
    }
};


const searchSongsByArtistId = async (artistId, apiKey) => {
    const baseUrl = 'https://api.genius.com';
    const headers = { Authorization: `Bearer ${apiKey}` };

    try {
        let page = 1;
        let allSongs = [];
        let response;
        do {
            response = await axios.get(`${baseUrl}/artists/${artistId}/songs`, { params: { page: page }, headers: headers });
            const songs = response.data.response.songs;
            allSongs.push(...songs);
            page++;
        } while (response.data.response.next_page);
        
        return allSongs.map(song => ({ title: song.title, url: song.url }));
    } catch (error) {
        console.error(`Error searching songs by artist ID: ${error}`);
        return [];
    }
};

const sanitizeTitle = (title) => {
    return title.replace(/[^a-zA-Z0-9 ]/g, '_');
};

const saveLyricsToFile = async (title, lyrics) => {
    try {
        const sanitizedTitle = sanitizeTitle(title);
        const fileName = `${sanitizedTitle}.txt`;
        await fs.writeFile(fileName, lyrics);
        console.log(`Saved lyrics of "${title}" to ${fileName}`);
    } catch (error) {
        console.error(`Error saving lyrics to file: ${error}`);
    }
};

const main = async () => {
    const apiKey = 'zWULMrPkV3MMyledhg2_fB95fsKS2Cn_9195CsC7w1oQnapocc04XSFpdbkERhdl';
    const artists = { 'Tan Bionica': 454259, 'Chano': 1229729 };

    for (const [artistName, artistId] of Object.entries(artists)) {
        console.log(`Fetching songs for ${artistName}`);
        const songs = await searchSongsByArtistId(artistId, apiKey);
        for (const song of songs) {
            console.log(`Downloading lyrics for: ${song.title}`);
            const lyrics = await getLyricsFromUrl(song.url);
            if (lyrics) {
                console.log(`Lyrics of "${song.title}":\n${lyrics}\n`);
                await saveLyricsToFile(song.title, lyrics);
                await delay(3000); // Wait for 3 seconds
            }
        }
    }
};

main();
