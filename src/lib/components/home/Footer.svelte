<script lang="ts">
    import { getPublicFooterLink, getPublicFooterText } from '$lib/components/themes/theme.selector';
    $: footerText = `© ${new Date().getFullYear()} ${getPublicFooterText()}`;
    $: footerLink = getPublicFooterLink();
</script>

<footer class="fixed bottom-0 w-full text-center py-4">
    <a href={footerLink} class="!text-black !dark:text-white">{footerText}</a>
</footer>