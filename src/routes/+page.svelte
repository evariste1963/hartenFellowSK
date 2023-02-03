<script lang="ts">
import type { PageData } from './$types'

export let data: PageData
</script>

<div class="px-4">
<h1 class="is-size-1">Tracks</h1>

<table class="table">
    <thead>
        <th>Track</th>
        <th>Artist</th>
        <th>Album</th>
        <th>Genre</th>
    </thead>
    <tbody>
        {#each data.tracks as track}
        <tr>
        <td>{track.trackName}</td>
        <td>{track.artistName}</td>
        <td>{track.albumTitle}</td>
        <td>{track.genre}</td>
    </tr>
        {/each}
    </tbody>
</table>
</div>