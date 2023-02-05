import Database from 'better-sqlite3'
import {DB_PATH} from '$env/static/private';
import type { Album, AlbumTrack, Tracks } from './types'
const resultLimit = 50

const db = new Database( DB_PATH )

export function getInitialTracks(limit = resultLimit): Tracks[]{
   const sql = `
        select t.TrackId as trackId
        , t.Name as trackName
        , a.AlbumId as albumId
        , a.Title as albumTitle
        , at.ArtistId as artistId
        , at.Name as artistName
        , g.Name as genre
        from tracks t 
        join albums a 
        on t.AlbumId = a.AlbumId
        join artists at 
        on a.ArtistId = at.ArtistId
        join genres g 
        on t.GenreId = g.GenreId
        limit $limit
    `;
    const stmnt = db.prepare(sql);
    const rows = stmnt.all({limit});
    return rows as Tracks[];
}

//search tracks
export function searchTracks(searchTerm: string, limit = resultLimit): Tracks[]{
    const sql = `
    select t.TrackId as trackId
    , t.Name as trackName
    , a.AlbumId as albumId
    , a.Title as albumTitle
    , at.ArtistId as artistId
    , at.Name as artistName
    , g.Name as genre
    from tracks t 
    join albums a 
    on t.AlbumId = a.AlbumId
    join artists at 
    on a.ArtistId = at.ArtistId
    join genres g 
    on t.GenreId = g.GenreId
    where lower(t.Name) like lower('%' || $searchTerm || '%')
    limit $limit
    `;
    const stmnt = db.prepare(sql);
    const rows = stmnt.all({searchTerm, limit});
    return rows as Tracks[];
}

//Album data query
export function getAlbumById(albumId:number): Album {
    const sql = `
    select a.AlbumId as albumId
        , a.Title as albumTitle
        , at.ArtistId as artistId
        , at.Name as artistName
    from albums a
    join artists at on a.ArtistId = at.ArtistId
    where a.AlbumId = $albumId
    `;
    const stmnt = db.prepare(sql);
    const row = stmnt.get({albumId});
    return row as Album;
}

//Album Tracks
export function getAlbumTracks(albumId:number): AlbumTrack[] {
    const sql = `
    select t.TrackId as trackId
        , t.Name as trackName
        , t.Milliseconds as trackMs
    from tracks t
    where t.AlbumId = $albumId
    order by t.TrackId
    `;
    const stmnt = db.prepare(sql);
    const rows = stmnt.all({albumId});
    return rows as AlbumTrack[];
};

//update album title in database
export function updateAlbumTitle(albumId: number, albumTitle: string): void {
    const sql = `
    update albums
    set Title = $albumTitle
    where AlbumId = $albumId
    `;

    const stmnt = db.prepare(sql);
    stmnt.run({albumId, albumTitle})
}