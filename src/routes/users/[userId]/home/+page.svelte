<script lang="ts">
    import type { PageServerData } from './$types';
    export let data: PageServerData;

	///////////////////////////////////////////////////////////////////////////
	
    const basicInfo = [
        { label: "Patient Name", value: "John Doe" },
        { label: "Date of Birth", value: "01/01/1980" },
        { label: "Email", value: "john.doe@example.com" },
        { label: "Phone", value: "555-1234567" },
        { label: "Blood Group", value: "O+" },
        { label: "Health Journey", value: "-" }
    ];
</script>

<div class="mx-2 sm:mx-8">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {#each stats as stat}
            <div class="bg-white p-6 rounded-lg shadow">
                <h3 class="text-gray-500 text-sm">{stat.title}</h3>
                <p class="text-2xl font-semibold mt-2">
                    {stat.value}
                    {#if stat.percentage}
                        <span class="text-sm ml-2 {stat.isCompleted ? 'text-green-600' : 'text-gray-500'}">
                            {stat.percentage}
                        </span>
                    {/if}
                </p>
            </div>
        {/each}
    </div>

    <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold mb-4">Basic Information</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each basicInfo as info}
                <div>
                    <dt class="text-gray-500 text-sm">{info.label}</dt>
                    <dd class="mt-1 text-gray-900">{info.value}</dd>
                </div>
            {/each}
        </div>
    </div>
</div>