<script>
	//@ts-nocheck
	import { calmethod } from '../MutipleReg/cal.js';
	import { onMount } from 'svelte';

	let Size = 3;
	let xvalue = [];
	let xnumber = 3;
	let XA = [];
	let YA = [];
	let num = 3;

	let result = {
		matrixX: []
	};
	function calculate() {
		result = calmethod(XA, YA, Size, xvalue, xnumber);
	}

	function updateMatrix() {
		XA = Array.from({ length: Size }, () => Array.from({ length: xnumber }).fill(''));
		YA = Array.from({ length: Size }).fill('');
		xvalue = Array.from({ length: xnumber }).fill('');
	}
	onMount(() => {
		updateMatrix(); // เรียกใช้เมื่อโหลดหน้าเว็บ
	});

	$: console.log(XA);
	$: console.log(xvalue);
</script>

<h1 class="text-4xl text-primary font-bold flex justify-center pt-5">Mutiple Regression</h1>
<div class="flex justify-center">
	<div class="p-4">
		<div class="flex flex-row items-center gap-4">
			<div>
				<label for="matrix-size" class="block text-lg font-medium text-content">
					Size {Size}
				</label>
				<input
					id="matrix-size"
					type="number"
					bind:value={Size}
					class="mt-1 block w-16 p-2 border border-secondary focus:outline-none rounded-md text-end"
					max="5"
					min="1"
					on:input={updateMatrix}
				/>
			</div>
			<div>
				<label for="matrix-size" class="block text-lg font-medium text-content">X numer</label>
				<input
					id="matrix-size"
					type="number"
					bind:value={xnumber}
					class="mt-1 block w-24 p-2 border border-secondary focus:outline-none rounded-md text-end"
					min="1"
					on:input={updateMatrix}
				/>
			</div>
		</div>
	</div>
</div>
<div class="flex flex-col items-center mb-5">
	<label for="matrix-size" class="block text-lg font-medium text-content p-2">X values</label>

	<!-- Dynamically generate input fields based on the length of xvalue array -->
	<div class="flex gap-2">
		{#each xvalue as x, xIndex}
			<input
				type="number"
				class="border py-4 rounded-md text-center w-20 sm:w-10 md:w-14 lg:w-12 xl:w-16 h-auto border-secondary focus:outline-none"
				bind:value={xvalue[xIndex]}
				placeholder="x{xIndex}"
			/>
		{/each}
	</div>
</div>
<div>
	<form on:submit|preventDefault={calculate}>
		{#if Size <= 20 && Size >= 1}
			<div class="flex flex-col items-center">
				<!-- X inputs for each row -->

				{#each XA as row, rowIndex}
					<div class="flex flex-row justify-items-center gap-2 mt-2">
						{#each row as col, colIndex}
							<input
								type="number"
								class="border py-4 rounded-md text-center w-20 sm:w-10 md:w-14 lg:w-12 xl:w-16 h-auto border-secondary focus:outline-none"
								bind:value={XA[rowIndex][colIndex]}
								placeholder="x{rowIndex},{colIndex}"
							/>
						{/each}
						<!-- Y input for each row -->
						<input
							type="number"
							class="border ml-4 py-4 rounded-md text-center w-20 sm:w-10 md:w-14 lg:w-12 xl:w-16 h-auto border-secondary focus:outline-none"
							bind:value={YA[rowIndex]}
							placeholder="Y{rowIndex + 1}"
						/>
					</div>
				{/each}
			</div>
			<div class="flex justify-center">
				<button
					type="submit"
					class="btn font-light text-base w-auto h-12 drop-shadow-md bg-primary text-primary-content mt-6 py-2 px-4 rounded-ss-3xl rounded-ee-3xl"
				>
					Calculate!
				</button>
			</div>
		{/if}
	</form>
	<div class="flex justify-center">
		{#if Size > 20}
			<p class="text-red-500 text-3xl">ขนาด Size มากกว่า 20 ไม่ได้นะครับ</p>
		{/if}
		{#if Size < 1}
			<p class="text-red-500 text-3xl">ขนาด Size น้อยกว่า 1 ไม่ได้นะครับ</p>
		{/if}
	</div>
</div>
