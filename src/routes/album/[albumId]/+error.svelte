<script>
import { page } from '$app/stores'
</script>

<div class="px-4">
<h1 class="is-size-1 has-text-danger">Ooops! something went wrong</h1>
<p>{$page.status}: {$page?.error?.message}</p>
</div>