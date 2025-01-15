<script lang="ts">
    import UserLayout from '$lib/components/layouts/UserLayout.svelte';
    import type { LayoutData } from '$lib/types/session.types';

    export let data: LayoutData;
</script>

<UserLayout {data}>
    <slot />
</UserLayout>