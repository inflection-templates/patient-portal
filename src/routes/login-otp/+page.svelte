<script lang="ts">
	import Success from '$lib/components/icons/success.icon.svelte';
	import Toast from '$lib/components/toast/toast.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	let phone = data.phone;
	let enteredOtp: string; // Explicitly set the type to string

	let otp: string[] = ['', '', '', '', '', ''];
	let otpInputs: Array<HTMLInputElement> = [];

	$: console.log(otp);
	$: enteredOtp = otp.join('');
	$: console.log('OTP input elements', enteredOtp);
	$: console.log('Enter OTP input', enteredOtp);

	const handleOtpInput = (index: number) => {
		otp[index] = otp[index].replace(/\D/g, '');
		if (index < otpInputs.length - 1 && otp[index].length === 1) {
			otpInputs[index + 1].focus();
		}
	};

	// var showtoast = false;
	// function clickToast() {
	// 	showtoast = true;
	// }
</script>

<!-- <button on:click={clickToast}>Show toast</button> -->
<!-- 
{#if showtoast}
	<Toast type="Success" dismissible={true} />
{/if} -->

<section class="section">
	<div class="absolute top-4 left-4 flex items-center">
		<img src="patient.png" alt="Logo" class="logo" />
		<h1 class="heading">Patient Portal</h1>
	</div>

	<div class="absolute top-4 right-4 flex items-center">
		<a href="/signup">
			<button class=" py-2 px-3 btn"> Sign Up </button>
		</a>
	</div>

	<div class="card">
		<div class="p-6 space-y-4 sm:p-8">
			<form method="post" action="?/login" class="space-y-6">
				<div>
					<label for="otp" class="label"> Enter OTP </label>
					<div class="flex space-x-2">
						{#each Array(6) as _, i}
							<input
								type="tel"
								bind:value={otp[i]}
								on:input={() => handleOtpInput(i)}
								maxlength="1"
								pattern="[0-9]"
								inputmode="numeric"
								class="input"
								bind:this={otpInputs[i]}
								required
							/>
						{/each}
					</div>
					<input hidden type="text" name="otp" bind:value={enteredOtp} />
					<input hidden type="text" name="phone" bind:value={phone} />
				</div>

				<button type="submit" class="btn"> Submit </button>

				<p class="para">
					Don’t have an account?
					<a href="/signup" class="anchor"> Sign up </a>
				</p>
			</form>
		</div>
	</div>
</section>
