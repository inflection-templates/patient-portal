<script lang="ts">
	import { page } from '$app/stores';

	const userId = $page.params.userId;
	let activeButton: string = 'taskHistory'; // Variable to track the active button

	function setActive(button: string) {
		activeButton = button;
	}
	const activevital = ['height', 'weight'];
</script>

<div class="taskbutton1">
	<button
		class={`btn1 ${activeButton === 'taskHistory' ? 'active' : ''}`}
		on:click={() => setActive('taskHistory')}
	>
		Task History
	</button>

	<a
		class={`btn1 ${activeButton === 'vitalsHistory' ? 'active' : ''}`}
		href={`/users/${userId}/home/vitals.history`}
		on:click={() => setActive('vitalsHistory')}
	>
		Vitals History
	</a>
</div>
