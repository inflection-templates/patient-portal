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
			<form class="space-y-6">
				<div>
					<label class="label"> Enter OTP </label>
					<div class="flex space-x-2">
						<input type="text" maxlength="1" class="input" placeholder="" />
						<input type="text" maxlength="1" class="input" placeholder="" />
						<input type="text" maxlength="1" class="input" placeholder="" />
						<input type="text" maxlength="1" class="input" placeholder="" />
						<input type="text" maxlength="1" class="input" placeholder="" />
						<input type="text" maxlength="1" class="input" placeholder="" />
					</div>
				</div>

				<a href="/login-otp" class="block w-full">
					<button type="submit" class="btn"> Submit </button>
				</a>
				<p class="para">
					Don’t have an account?
					<a href="/signup" class="anchor"> Sign up </a>
				</p>
			</form>
		</div>
	</div>
</section>
