<script>
	// @ts-nocheck
	// import Chartjs from '../../Component/chartjs.svelte';
	import Katex from '../../Component/katex.svelte';
	import { graphicalMethod } from './grap.js';

	let xStart = 0;
	let xEnd = 10;
	let errorFactor = 0.000001;
	let func = '';
	let result = {};
	let errorMessage = '';
	let showTable = false;

	function calculate() {
		if (func && xStart < xEnd && errorFactor > 0) {
			showTable = true;
			result = graphicalMethod(xStart, xEnd, errorFactor, func);
			errorMessage = result.error || '';
		} else {
			errorMessage = 'ใส่ข้อมูลให้ถูกต้องดิ๊';
			showTable = true;
		}
	}

	$: if (func === '') {
		showTable = false;
	}
	$: console.log(result);
</script>

<h1 class="text-2xl font-bold flex justify-center pt-5">Graphical Method</h1>

<div class="my-10 flex justify-center">
	<div class="p-3 rounded-md bg-base-300 lg:text-3xl sm:text-2xl text-white w-auto">
		<Katex {func} />
	</div>
</div>

<div class="flex justify-center">
	<div class="lg:flex lg:space-x-4 md:flex md:space-x-4">
		<form on:submit|preventDefault={calculate} class="lg:flex lg:space-x-4 md:flex md:space-x-4">
			<div>
				<label class="block">X Start</label>
				<input
					type="number"
					bind:value={xStart}
					placeholder="0"
					class="mt-1 block p-2 border text-white border-gray-300 rounded-md lg:w-36 md:w-20"
					required
				/>
			</div>

			<div>
				<label class="block">X End</label>
				<input
					type="number"
					bind:value={xEnd}
					placeholder="10"
					class="mt-1 block p-2 border text-white border-gray-300 rounded-md lg:w-36 md:w-20"
					required
				/>
			</div>

			<div>
				<label class="block">สมการ</label>
				<input
					type="text"
					bind:value={func}
					placeholder="43x - 180"
					class="mt-1 block p-2 border text-white border-gray-300 rounded-md lg:w-36 md:w-32"
					required
				/>
			</div>

			<div>
				<label class="block">ข้อผิดพลาด</label>
				<input
					type="number"
					bind:value={errorFactor}
					placeholder="0.000001"
					step="0.000001"
					class="mt-1 block p-2 border border-gray-300 text-white rounded-md lg:w-36 md:w-32"
					required
				/>
			</div>

			<div class="flex justify-center">
				<button
					type="submit"
					class="w-auto h-12 drop-shadow-md bg-base-300 mt-6 py-2 px-4 rounded-md hover:bg-zinc-900"
					>คำนวณ</button
				>
			</div>
		</form>
	</div>
</div>

{#if showTable}
	<div class="flex justify-center mt-4">
		<button
			class="w-auto h-12 drop-shadow-md bg-base-300 py-2 px-4 rounded-md hover:bg-zinc-900"
			on:click={() => document.getElementById('my_modal_5').showModal()}
		>
			เปิดตาราง
		</button>
	</div>

	<dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
		<div class="modal-box">
			<h3 class="text-lg font-bold">Table</h3>

			{#if errorMessage}
				<div class="text-red-500 mb-4">{errorMessage}</div>
			{/if}

			{#if result.iterations && result.iterations.length > 0}
				<div class="mt-4">
					<p class="text-lg">
						ผลลัพธ์สุดท้ายของ x: <strong>{result.result.toFixed(6)}</strong>
					</p>
					<p>จำนวนรอบการคำนวณทั้งหมด: {result.iter}</p>
				</div>
				<table class="min-w-full">
					<thead class="bg-base-200 text-white border-b border-b-white">
						<tr>
							<th class="py-2 px-4">iter</th>
							<th class="py-2 px-4">X</th>
							<th class="py-2 px-4">Y</th>
							<th class="py-2 px-4">Error</th>
						</tr>
					</thead>
					<tbody>
						{#each result.iterations as iter, index}
							<tr class="text-white py-2 bg-black text-center">
								<td class="px-4 bg-gray-900 py-2">{index + 1}</td>
								<td class="px-4 bg py-2">{iter.x.toFixed(6)}</td>
								<td class="px-4 py-2">{iter.y.toFixed(6)}</td>
								<td class="px-4 py-2">{iter.error.toFixed(6)}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{/if}

			<div class="modal-action">
				<button class="btn" on:click={() => document.getElementById('my_modal_5').close()}
					>Close</button
				>
			</div>
		</div>
	</dialog>
{/if}
