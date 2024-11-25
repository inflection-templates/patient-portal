<script lang="ts">
	export let show: boolean;
	export let title: string;
	export let message: string;
	export let close: () => void;
	export let confirm: () => void;
	$: show = show;
</script>

{#if show}
	<div class="overlay">
		<div class="modal">
			<h2 class="modal-title">{title}</h2>
			<p class="modal-message">{message}</p>
			<div class="modal-actions">
				<button class="cancel-btn" on:click={close}> Cancel </button>
				<button class="confirm-btn" on:click={confirm}> Delete </button>
			</div>
		</div>
	</div>
{/if}

<style>
	.overlay {
		position: fixed;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 50;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.modal {
		background-color: white;
		border-radius: 0.5rem;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		width: 90%;
		max-width: 400px;
		padding: 1.5rem;
	}

	.modal-title {
		font-size: 1.125rem;
		font-weight: 600;
		color: #1f2937;
	}

	.modal-message {
		margin-top: 1rem;
		color: #4b5563;
	}

	.modal-actions {
		margin-top: 1.5rem;
		display: flex;
		justify-content: flex-end;
		gap: 1rem;
	}

	.cancel-btn {
		padding: 0.5rem 1rem;
		border-radius: 0.375rem;
		border: 1px solid;
		color: #4b5563;
		background-color: transparent;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	.cancel-btn:hover {
		background-color: #f3f4f6;
	}

	.confirm-btn {
		padding: 0.5rem 1rem;
		border-radius: 0.375rem;
		color: white;
		background-color: #dc2626;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	.confirm-btn:hover {
		background-color: #b91c1c;
	}
</style>
