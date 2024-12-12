<script lang="ts">
	import { enhance } from '$app/forms';
	import Success from '$lib/components/icons/success.icon.svelte';
	import Toast from '$lib/components/toast/toast.svelte';
	import type { PageServerData } from './$types';

	////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let phone = data.phone;
	console.log('Phone: ' + phone);
	let enteredOtp: string;

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
</script>

<section class="section">
	<div class="absolute top-4 left-4 flex items-center">
		<img src="/patient.png" alt="Logo" class="logo" />
		<h1 class="heading">Patient Portal</h1>
	</div>

	<!-- <div class="absolute top-4 right-4 flex items-center">
		<a href="/signup">
			<button class=" py-2 px-3 btn"> Sign Up </button>
		</a>
	</div> -->

	<div class="card">
		<div class="p-8">
			<form method="post" action="?/loginWithOtp" class="space-y-6" use:enhance>
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
								class="inputotp"
								bind:this={otpInputs[i]}
								required
							/>
						{/each}
					</div>
					<input hidden type="text" name="otp" bind:value={enteredOtp} />
					<input hidden type="text" name="phone" bind:value={phone} />
				</div>

				<button type="submit" class="btn"> Submit </button>

				<!-- <p class="para">
					Don’t have an account?
					<a href="/signup" class="anchor"> Sign up </a>
				</p> -->
			</form>
		</div>
	</div>
</section>
