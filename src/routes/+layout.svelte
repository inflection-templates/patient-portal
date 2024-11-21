<!-- <script lang="ts">
  import "../app.css";
  import { getFlash } from 'sveltekit-flash-message';
  import { page } from '$app/stores';
	import { initFlash } from 'sveltekit-flash-message/client';

	const flash = initFlash(page);

</script>

  {#if $flash}
  {@const bg = $flash.type == 'success' ? '#3D9970' : '#FF4136'}
  <div style:background-color={bg} class="flash">{$flash.message}</div>
{/if}

<slot/> -->

<script lang="ts">
  import "../app.css";
	import { page } from '$app/stores';
	import { addToast } from '$lib/components/toast/toast.store';
	import Toasts from '$lib/components/toast/toasts.svelte';
	import { initFlash } from 'sveltekit-flash-message/client';

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	const flash = initFlash(page);

	flash.subscribe(($flash) => {
		if (!$flash) return;
		addToast({
			type: $flash.type || 'info',
			message: $flash.message,
			dismissible: true,
      timeout: 9000,
		});
		flash.set(undefined);
	});
</script>

<Toasts />
<slot />





