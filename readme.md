# Spotify MP3 Downloader

This tool by Darryl Mathias was inspired by the many Python-based music downloaders out there and my personal pain for not being able to download (*sigh*) :(  — so I built a **full JavaScript version** for all my fellow JS fans. 

It automatically fetches public Spotify playlist tracks, finds the best YouTube match, and downloads them as MP3s with metadata and cover art using `yt-dlp` and `ffmpeg`.

## 🚀 Features

- Connects to Spotify Web API for playlist data
- Searches YouTube using accurate track + artist names
- Downloads high-quality `.mp3` audio with:
  - Album art (via `--embed-thumbnail`)
  - Metadata (track name, artist)

## Requirements

| Tool    | Description                            | Install                                                                                             |
| ------- | -------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Node.js | Runtime for the script                 | [Download](https://nodejs.org/)                                                                     |
| yt-dlp  | Downloader from YouTube (and more)     | [Download executable](https://github.com/yt-dlp/yt-dlp?tab=readme-ov-file#installation)             |
| ffmpeg  | For audio extraction & thumbnail embed | [Download here (ffmpeg-release-essentials.zip)](https://www.gyan.dev/ffmpeg/builds/#release-builds) |

## Spotify API setup

To use this tool, you'll need to authenticate with Spotify via the Client Credentials Flow. This requires:

This step was not possible to skip (which was the original plan), so follow [this guide](https://developer.spotify.com/documentation/web-api/tutorials/getting-started) to get two metrics,

- Client ID
- Client Secret

## Setup

1.  **Clone the repo**

    ```bash
    git clone https://github.com/DarrylMathias/Spotify-mp3-downloader.git
    cd spotify-mp3-downloader

    ```

2.  Install dependencies

    ```bash
    npm install
    ```

3.  Create .env file

        Sample .env file :

        ```bash
        CLIENT_ID=your_spotify_client_id
        CLIENT_SECRET=your_spotify_client_secret
        PLAYLIST_LINK=your_spotify_playlist_link
        DOWNLOAD_PATH=C:\Users\yourname\Music\Downloads
        ```

    **How to get the PLAYLIST_LINK**:

    In Spotify, right-click the playlist → “Share” → “Copy Link to Playlist”.
    ![Spotify copy link demo](/public/demo.png)

## How It Works

1. Retrieves Spotify playlist data (track names, artists, and IDs)
2. For **each track** in the playlist:
   - Searches YouTube using a combination of the track name and artist(s)
   - Downloads the best-matching video using `yt-dlp` in `.mp3` format
   - Embeds metadata and thumbnail using `ffmpeg` via `yt-dlp` flags

## Legal Disclaimer

This project is provided for `educational` and `personal` archival use only.

- YouTube’s [Terms of Service](https://www.youtube.com/t/terms) prohibit downloading content without explicit permission.

- This script accesses YouTube using yt-dlp, which may bypass restrictions (like age-gates or region locks) — this is against YouTube's terms.

- You must own or have permission to download any content processed by this tool.

- Redistribution, resale, or public hosting of downloaded content is a violation of copyright law in many countries.

- The developer of this tool is not liable for misuse or violation.

Use responsibly, and always respect content creators.

## Further enhancements

You can also further enhance this project by creating a CRON job that on a daily basis, checks for any changes in the API and downloads the songs accordingly. ✨
