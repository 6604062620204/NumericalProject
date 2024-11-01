<script>
	//@ts-nocheck
	//import { calmethod } from '../LinearReg/cal.js';
	import { onMount } from 'svelte';

	let Size = 2;
	let xvalue = 65;
	let XA = [];
	let YA = [];
	let num = 3;

	let result = {
		matrixX: []
	};
	function calculate() {
		result = calmethod(XA, YA, Size, xvalue);
	}

	function updateMatrix() {
		XA = Array.from({ length: Size }).fill('');
		YA = Array.from({ length: Size }).fill('');
	}
	onMount(() => {
		updateMatrix();
	});
</script>

<h1 class="text-4xl text-primary font-bold flex justify-center pt-5">
	Newton's Divided Difference
</h1>
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
				<label for="matrix-size" class="block text-lg font-medium text-content">X value</label>
				<input
					id="matrix-size"
					type="number"
					bind:value={xvalue}
					class="mt-1 block w-16 p-2 border border-secondary focus:outline-none rounded-md text-end"
					min="1"
				/>
			</div>
		</div>
	</div>
</div>
<div>
	<form on:submit|preventDefault={calculate}>
		{#if Size <= 20 && Size >= 1}
			<div class="flex flex-col items-center">
				<label class="block text-lg font-medium text-content text-center my-3">
					ค่า X และ ค่า F(x)
				</label>
				<div class={`flex flex-col justify-items-center gap-2 mt-2`}>
					{#each XA as row, index}
						<div class="flex flex-row gap-2">
							<input
								type="number"
								class="border py-4 rounded-md text-center w-20 sm:w-10 md:w-14 lg:w-12 xl:w-16 h-auto border-secondary focus:outline-none"
								bind:value={XA[index]}
								placeholder="x{index + 1}"
							/>
							<input
								type="number"
								class="border py-4 rounded-md text-center w-20 sm:w-10 md:w-14 lg:w-12 xl:w-16 h-auto border-secondary focus:outline-none"
								bind:value={YA[index]}
								placeholder="F(x{index + 1})"
							/>
						</div>
					{/each}
				</div>
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
