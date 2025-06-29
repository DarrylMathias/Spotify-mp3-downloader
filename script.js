import axios from "axios";
import dotenv from 'dotenv'
import { exec } from "node:child_process";
import fs from 'node:fs'
import yts from "yt-search";
import { promisify } from "node:util";

dotenv.config();
const execPromise = promisify(exec);

//Spotify Auth
const authRes = await axios.post(
    'https://accounts.spotify.com/api/token',
    new URLSearchParams({
        'grant_type': 'client_credentials',
        'client_id': process.env.CLIENT_ID,
        'client_secret': process.env.CLIENT_SECRET
    }),
    {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded"
        }
    },
);

//Spotify Query String
const authToken = authRes.data.access_token;
const playListLink = process.env.PLAYLIST_ID.split('?si')[0]
const res = await axios.get(`https://api.spotify.com/v1/playlists/${playListLink}`, {
    headers: {
        Authorization: `Bearer ${authToken}`
    }
})

const tracks = res.data.tracks.items;
for (const trackObj of tracks) {
    const artistNameArray = trackObj.track.artists.map(artistObj => artistObj.name)
    const queryString = `${trackObj.track.name} - ${artistNameArray.join(', ')}`;

    // yt-search for link
    const result = await yts(queryString)
    const ytURL = await result.all[0].url
    await console.log(`${result.all[0].title} - ${ytURL}`);
    fs.appendFileSync('logs.txt', `${result.all[0].title} - ${ytURL}\n`)

    //yt-dlp
    try {
        const downloadPath = process.env.DOWNLOAD_PATH.replace(/\\/g, "\\\\") + "//"
        await execPromise(`yt-dlp -x --audio-format mp3 --embed-thumbnail --add-metadata -o "${downloadPath}%(title)s.%(ext)s" "${ytURL}"`);
        console.log(`Downloaded: ${result.all[0].title}\n`);
        fs.appendFileSync('logs.txt', `Downloaded: ${result.all[0].title}\n\n`)
    } catch (err) {
        console.error(`Error downloading ${ytURL}:`, err.message);
    }

};




