<script lang="ts">
    import AuthenticatedLayout from '$lib/components/layouts/AuthenticatedLayout.svelte';
    import type { LayoutData } from '$lib/types/session.types';

    export let data: LayoutData;
</script>

<AuthenticatedLayout {data}>
    <slot />
</AuthenticatedLayout>