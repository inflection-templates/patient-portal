<script lang="ts">
	import { loginMethods } from '../../config';
	let loginMethod = 'mobile';
</script>

<section class="section">
	<div class="absolute top-4 left-4 flex items-center">
		<img src="patient.png" alt="Logo" class="logo" />
		<h1 class="heading">Patient Portal</h1>
	</div>

	<div class="absolute top-4 right-4 flex items-center">
		<a href="/signup">
			<button class="py-2 px-3 btn">Sign Up</button>
		</a>
	</div>

	<div class="card">
		<div class="p-6 space-y-4 sm:p-8">
			<form class="space-y-6">
				<div>
					<div class="flex space-x-4">
						{#each loginMethods as { value, label }}
							<label class="label">
								<input type="radio" name="loginMethod" {value} bind:group={loginMethod} />
								{label}
							</label>
						{/each}
					</div>
				</div>

				{#if loginMethod === 'mobile'}
					<div id="mobile-login">
						<label for="mobile" class="label">Mobile Number</label>
						<div class="flex space-x-2">
							<select class="select">
								<option value="+91">+91</option>
								<option value="+44">+44</option>
								<option value="+61">+61</option>
							</select>
							<input
								type="tel"
								name="mobile"
								id="mobile"
								class="input"
								placeholder="Your mobile number"
							/>
						</div>
					</div>
				{:else if loginMethod === 'username'}
					<div id="username-login">
						<label for="username" class="label">Username</label>
						<input
							type="text"
							name="username"
							id="username"
							class="input"
							placeholder="Your username"
						/>
					</div>
				{:else if loginMethod === 'email'}
					<div id="email-login">
						<label for="email" class="label">Email</label>
						<input type="email" name="email" id="email" class="input" placeholder="Your email" />
					</div>
				{/if}

				<button type="submit" class="btn w-full">Log in</button>
				<p class="para">
					Don’t have an account?
					<a href="/signup" class="font-medium text-gray-900 hover:underline px-1">Sign up</a>
				</p>
			</form>
		</div>
	</div>
</section>
