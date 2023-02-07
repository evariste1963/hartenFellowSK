<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="px-4">
	<h1 class="is-size-1">{data.album.albumTitle}</h1>
	<div style="display:flex">
		<p class="is-size-4 mr-6">By {data.album.artistName}</p>
		<a class="button is-primary" href="/">Home</a>
	</div>
	<table class="table mt-6">
		<thead>
			<tr>
				<th>#</th>
				<th>Track</th>
				<th>Duration</th>
			</tr>
		</thead>
		<tbody>
			{#each data.tracks as track, i}
				<tr>
					<td>{i + 1}</td>
					<td>{track.trackName}</td>
					<td class="has-text-centered">
						{Math.floor((track.trackMs / 1000 / 60) << 0)
							.toString()
							.padStart(2, '0')}:{Math.floor((track.trackMs / 1000) % 60)
							.toString()
							.padStart(2, '0')}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>

	<h2 class="is-size-3 mb-4 mt-6">Update Album Title</h2>
	<form method="POST">
		<input
			type="text"
			class="input"
			name="albumTitle"
			value={data.album.albumTitle}
			style="max-width: 50ch;"
		/>
		<input type="hidden" name="albumId" value={data.album.albumId} />
		<button class="button is-primary" type="submit" formaction="?/updateAlbumTitle"
			>Update Album Title</button
		>
	</form>
</div>
