<script>
	import { calmethod } from './cal.js';

	let a = -1;
	let b = 2;
	let func = 'x^7+2x^3-1';
	let result = {
		i: 0,
		truevalue: 0,
		calerror: 0
	};

	function calculate() {
		result = calmethod(a, b, func);
	}
</script>

<h1 class="text-4xl text-primary font-bold flex justify-center pt-5">Single Simpson's Rule</h1>

<div class="flex justify-center my-10">
	<div class="lg:flex lg:space-x-4 md:flex md:space-x-4">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<form on:submit|preventDefault={calculate} class="lg:flex lg:space-x-4 md:flex md:space-x-4">
			<div>
				<label class="block">A value</label>
				<input
					type="number"
					bind:value={a}
					placeholder="0"
					class="mt-1 block p-2 border border-gray-300 rounded-md lg:w-36 md:w-20"
					required
				/>
			</div>

			<div>
				<label class="block">B value</label>
				<input
					type="number"
					bind:value={b}
					placeholder="10"
					class="mt-1 block p-2 border border-gray-300 rounded-md lg:w-36 md:w-20"
					required
				/>
			</div>

			<div>
				<label class="block">สมการ</label>
				<input
					type="text"
					bind:value={func}
					placeholder="43x - 180"
					class="mt-1 block p-2 border border-gray-300 rounded-md lg:w-36 md:w-32"
					required
				/>
			</div>

			<div class="flex justify-center">
				<button
					type="submit"
					class="btn font-light text-base w-auto h-12 drop-shadow-md bg-primary text-primary-content mt-6 py-2 px-4 rounded-ss-3xl rounded-ee-3xl"
					>คำนวณ</button
				>
			</div>
		</form>
	</div>
</div>
<div>
	{#if result.i > 0}
		<div class="flex justify-center">
			<div class="lg:flex lg:space-x-4 md:flex md:space-x-4">
				<div>
					<label class="block">ค่าปริพันธ์ที่หาได้</label>
					<input
						type="number"
						value={result.i}
						class="mt-1 block p-2 border border-gray-300 rounded-md lg:w-36 md:w-20"
						disabled
					/>
				</div>
				<div>
					<label class="block">ค่าจริง</label>
					<input
						type="number"
						value={result.truevalue}
						class="mt-1 block p-2 border border-gray-300 rounded-md lg:w-36 md:w-20"
						disabled
					/>
				</div>

				<div>
					<label class="block">ค่าผลต่าง</label>
					<input
						type="number"
						value={result.calerror}
						class="mt-1 block p-2 border border-gray-300 rounded-md lg:w-36 md:w-20"
						disabled
					/>
				</div>
			</div>
		</div>
	{/if}
</div>
