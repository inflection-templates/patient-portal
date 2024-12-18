<!-- <script lang="ts">
	import type { PageServerData } from './$types';

	///////////////////////////////////////////////////////////////////////////
	
	export let data: PageServerData;

</script> -->


<script lang="ts">
    import type { PageServerData } from './$types';
    export let data: PageServerData;

	///////////////////////////////////////////////////////////////////////////
	const{
		userProfileData,
        taskCount,
        completedTaskCount,
        pendingTaskCount,
		userdata
	}=data;
	console.log("userProfileData", userProfileData);
	// console.log("completedTaskCount",completedTaskCount);
	// console.log("userdata",userdata);

	const stats=[{title:"Total tasks",data:taskCount},{title:"Completed tasks",data:completedTaskCount},{title:"Pending tasks",data:pendingTaskCount}]



    const basicInfo = [
        { label: "Name", value: userdata.UserName || 'Not specified'},
        { label: "Date of Birth", value: 'Not specified' },
        { label: "Email", value:userdata.Email },
        { label: "Phone", value: userdata.Phone},
        { label: "Blood Group", value: 'Not specified' },
        { label: "Health Journey", value: 'Not specified' }
    ];
</script>

<div class="mx-2 sm:mx-8">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 pt-4">
        {#each stats as stat}
			<div class="status-card">
				<div class="title">{stat.title}</div>
				<div class=" counts">{stat.data}</div>
			</div>
        {/each}
    </div>

    <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold mb-4">Home</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each basicInfo as info}
                <div>
                    <p class="txt-gr-700">{info.label}</p>
                    <p class="mt-1 txt-gr-900">{info.value || 'Not specified'}</p>
                </div>
            {/each}
        </div>
    </div>
</div>

