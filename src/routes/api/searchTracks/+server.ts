import { getInitialTracks, searchTracks } from "$lib/server/db";
import type { Track } from "$lib/server/db/types";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = (({url})=> {
const searchTerm = url.searchParams.get("searchTerm")?.toString();

let tracks: Track[] = []

if(!searchTerm) {
    tracks = getInitialTracks()
} else {
    tracks = searchTracks(searchTerm) ?? []
}

return json(tracks)


} ) 
