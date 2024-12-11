<script lang="ts">
	import type { any } from 'zod';
	import type { PageServerData } from './$types';
	import { getInitials } from '$lib/utils.ts/functions';

	export let data: PageServerData;
	console.log('data', JSON.stringify(data));

	const addressObject = data.healthProfile.Patient.User.Person.Addresses;

	console.log('addressObject', JSON.stringify(addressObject));

	const personObject = data.healthProfile.Patient.User.Person;
	const healthObject = data.healthProfile.Patient.HealthProfile;

	const displayName = personObject.DisplayName;
	const initials = getInitials(displayName);

	let firstname = personObject.FirstName || '';
	let lastname = personObject.LastName || '';
	let email = personObject.Email || '';
	let phone = personObject.Phone || '';
	let gender = personObject.Gender || '';
	let maritalStatus = healthObject.MaritalStatus || '';
	let dateOfBirth = personObject.DateOfBirth || '';
	let race = healthObject.Race || '';
	let ethnicity = healthObject.Ethnicity || '';
	let strokeSurvivorOrCaregiver = healthObject.StrokeSurvivorOrCaregiver || '';
	let workedPriorToStroke =
		healthObject.WorkedPriorToStroke === true
			? 'true'
			: healthObject.WorkedPriorToStroke === false
				? 'false'
				: '';
	let livingAlone =
				healthObject.LivingAlone === true
			? 'true'
			: healthObject.LivingAlone === false
				? 'false'
				: '';
	let addresLine: string;
	let city: string;
	let state: string;
	let country: string;
	let postalCode: string;

	$: if (addressObject.length > 0) {
		addresLine = addressObject[0].AddressLine || '';
		city = addressObject[0].City || '';
		state = addressObject[0].State || '';
		country = addressObject[0].Country || '';
		postalCode = addressObject[0].PostalCode || '';
	}
	console.log('zapuk zupuk', workedPriorToStroke);
</script>

<form action="?/updateprofile" method="POST">
	<div class="min-h-screen flex items-center">
		<div class="w-full p-8 rounded-lg shadow-md">
			<h1 class="text-2xl font-bold mb-6">My Settings</h1>

			<div class="grid grid-cols-4 gap-8">
				<div class="">
					<h2 class="text-lg font-semibold mb-2">Personal Information</h2>
					<p class="text-sm text-gray-400">
						Your personal information and account security settings.
					</p>
				</div>
				<div class="col-span-3">
					<div class="flex items-center mb-6">
						<div
							class="bg-gray-400 w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold"
						>
							{initials}
						</div>
						<span class=" text-lg font-semibold ml-4">{personObject.DisplayName || 'Unknown'}</span>
					</div>

					<div class="mb-4">
						<label class="userlabel" for="FirstName">First Name</label>
						<input
							type="text"
							name="FirstName"
							id="FirstName"
							placeholder="First Name"
							class="input"
							bind:value={firstname}
						/>
					</div>
					<div class="mb-4 bg-white">
						<label class="userlabel" for="LastName">Last Name</label>
						<input
							type="text"
							id="LastName"
							name="LastName"
							placeholder="Last Name"
							class="w-full input"
							bind:value={lastname}
						/>
					</div>
					<div class="mb-4">
						<label class="userlabel" for="Gender">Sex</label>
						<select id="Gender" class="input" name="Gender" bind:value={gender}>
							<option value="" disabled selected>Select an option</option>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
							<option value="Intersex">Intersex</option>
							<option value="other">other</option>
							<option value="Unknown">Unknown</option>
						</select>
					</div>
					<div class="mb-4">
						<label class="userlabel" for="BirthDate">Date Of Birth</label>
						<input
							type="date"
							id="BirthDate"
							placeholder="MM-DD-YYYY"
							name="BirthDate"
							class=" input"
							bind:value={dateOfBirth}
						/>
					</div>
					<div class="mb-4">
						<label class="userlabel" for="MaritalStatus">Marital Status</label>
						<select
							id="MaritalStatus"
							name="MaritalStatus"
							class="w-full input"
							bind:value={maritalStatus}
						>
							<option value="" disabled selected>Select an option</option>
							<option value="Married">Married</option>
							<option value="Single">Single</option>
							<option value="Divorced">Divorced</option>
							<option value="Widowed">Widowed</option>
							<option value="Unknown">Unknown</option>
						</select>
					</div>
					<div class="mb-4">
						<label class="userlabel" for="Phone">Mobile Number</label>
						<input
							type="text"
							id="Phone"
							placeholder="Phone"
							name="Phone"
							class="input"
							bind:value={phone}
						/>
					</div>

					<div class="mb-4">
						<label class="userlabel" for="email">Email</label>
						<input
							type="Email"
							id="Email"
							placeholder="Email"
							name="Email"
							class="input"
							bind:value={email}
						/>
					</div>
				</div>
			</div>
			<hr class="border-t border-gray-300 my-4" />
			<div class="grid grid-cols-4 gap-8">
				<div class="">
					<h2 class="text-lg font-semibold mb-2">Demographic Information</h2>
				</div>
				<div class="col-span-3 bg-white">
					<div class="mb-4">
						<label class="userlabel" for="Race">What is your race?</label>
						<select id="Race" name="Race" class="input" bind:value={race}>
							<option value="" disabled selected>Prefer not to say</option>
							<option value="American Indian/Alaskan Native">American Indian/Alaskan Native</option>
							<option value="Asian">Asian</option>
							<option value="Black/African American">Black/African American</option>
							<option value="Native Hawaiin or Other Pacific Islander"
								>Native Hawaiin or Other Pacific Islander</option
							>
							<option value="White">White</option>
						</select>
					</div>
					<div class="mb-4">
						<label class="userlabel" for="Ethnicity">What is your ethnicity?</label>
						<select id="Ethnicity" name="Ethnicity" class="input" bind:value={ethnicity}>
							<option value="" disabled selected>Prefer not to say</option>
							<option value="Hispanic/Latino">Hispanic/Latino</option>
							<option value="Not Hispanic/Latino">Not Hispanic/Latino</option>
						</select>
					</div>
				</div>
			</div>
			<hr class="border-t border-gray-300 my-4" />
			<div class="grid grid-cols-4 gap-8">
				<div class="">
					<h2 class="text-lg font-semibold mb-2">Health And Stroke History</h2>
				</div>
				<div class="col-span-3 bg-white">
					<div class="mb-4">
						<label class="userlabel" for="StrokeSurvivorOrCaregiver"
							>Are you stroke survivor or caregiver?</label
						>
						<select
							id="StrokeSurvivorOrCaregiver"
							name="StrokeSurvivorOrCaregiver"
							class="input"
							bind:value={strokeSurvivorOrCaregiver}
						>
							<option value="" disabled selected>Prefer not to say</option>
							<option value="Survivor">Survivor</option>
							<option value="Caregiver">Caregiver</option>
						</select>
					</div>
					<div class="mb-4">
						<label class="userlabel" for="WorkedPriorToStroke"
							>Did you work prior to your stroke?</label
						>
						<select
							id="WorkedPriorToStroke"
							name="WorkedPriorToStroke"
							class="input"
							bind:value={workedPriorToStroke}
						>
							<!-- <option value="" disabled selected>Prefer not to say</option> -->
							<option value="true">Yes</option>
							<option value="false">No</option>
						</select>
					</div>

					<div class="mb-4">
						<label class="userlabel" for="live-alone">Do you live alone?</label>
						<select id="LivingAlone" name="LivingAlone" class="input" bind:value={livingAlone}>
							<!-- <option value="" disabled selected>Prefer not to say</option> -->
							<option value="true">Yes</option>
							<option value="false">No</option>
						</select>
					</div>
				</div>
			</div>
			<hr class="border-t border-gray-300 my-4" />
			<div class="grid grid-cols-4 gap-8">
				<div class="">
					<h2 class="text-lg font-semibold mb-2">Address Information</h2>
				</div>

				<div class="col-span-3 bg-white">
					<div class="mb-4">
						<label class="userlabel" for="AddressLine">Address</label>
						<input
							type="text"
							name="AddressLine"
							id="address"
							placeholder="address"
							class="input"
							bind:value={addresLine}
						/>
					</div>
					<div class="mb-4">
						<label class="userlabel" for="City">City</label>
						<input
							type="text"
							id="city"
							name="City"
							placeholder="city"
							class="input"
							bind:value={city}
						/>
					</div>
					<div class="mb-4">
						<label class="userlabel" for="State">State</label>
						<input
							type="text"
							id="state"
							name="State"
							placeholder="state"
							class="input"
							bind:value={state}
						/>
					</div>
					<div class="mb-4">
						<label class="userlabel" for="password">Country</label>
						<input
							type="text"
							id="country"
							name="Country"
							placeholder="country"
							class="input"
							bind:value={country}
						/>
					</div>
					<div class="mb-4">
						<label class="userlabel" for="password">Postal Code</label>
						<input
							type="text"
							id="postalcode"
							name="PostalCode"
							placeholder="postalcode"
							class="input"
							bind:value={postalCode}
						/>
					</div>
				</div>
			</div>

			<div class="flex justify-end mt-8">
				<button
					class="bg-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
				>
					Save changes
				</button>
			</div>
		</div>
	</div>
</form>

<!-- addressObject [{"id":"257ebf63-8082-4693-a7b4-f7f2fd8c39bf","TenantId":null,"Type":"Work","AddressLine":"","City":"Pune","District":null,"State":null,"Location":null,"Country":"","PostalCode":null,"Longitude":null,"Lattitude":null}] -->
