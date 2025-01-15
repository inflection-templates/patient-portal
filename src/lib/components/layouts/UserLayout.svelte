<script lang="ts">
    import { page } from '$app/stores';
    import { addToast } from '$lib/components/toast/toast.store';
    import Navbar from '$lib/components/home/Navbar.svelte';
    import Sidebar from '$lib/components/home/Sidebar.svelte';
    import type { LayoutData } from '$lib/types/session.types';
	import Footer from '$lib/components/home/Footer.svelte';

    export let data: LayoutData;

    $: userId = $page.params.userId;
    $: username = data.user.Person.DisplayName;
    $: imageUrl = data.user.Person.ProfileImageURL;

    async function handleApiRequest(url: string, method: string): Promise<void> {
        try {
            const response = await fetch(`/api/server/${url}`, {
                method,
                headers: { 'content-type': 'application/json' }
            });

            if (!response.ok) {
                throw new Error(`${method} request failed`);
            }

            window.location.href = '/';
        } catch (error) {
            console.error(`${method} error:`, error);
            addToast({
                type: 'error',
                message: `Failed to ${method.toLowerCase()}. Please try again.`,
                dismissible: true,
                timeout: 3000
            });
        }
    }

    const onLogout = () => handleApiRequest('logout', 'POST');
    const onDelete = () => handleApiRequest('user/delete', 'DELETE');
</script>

<div class="flex flex-col min-h-screen">
    <Navbar 
        {userId} 
        logout={onLogout} 
        userName={username} 
        {imageUrl} 
        deleteAccount={onDelete} 
    />
    <div class="flex-1 flex min-h-screen">
        <aside class="flex min-h-screen">
            <Sidebar {userId} />
        </aside>
        <div class="main-content">
            <slot />
        </div>
        <Footer />
    </div>
</div>