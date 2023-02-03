import { getInitialTracks } from "$lib/server/db";
import type { PageServerLoad } from "./$types";


export const load: PageServerLoad = (()=> {
const tracks = getInitialTracks(10);

return {
    tracks
}
}) 