<script>
	//@ts-nocheck
	import axios from 'axios';
	import { onMount } from 'svelte';
	import { getData } from '../api/root';
	import { getDatal } from '../api/linear';

	let data = [];
	let datal = [];

	const handdlegetdata = async () => {
		try {
			const res = await getData();
			data = res.data;
		} catch (err) {
			console.log(err);
		}
	};

	const handdlegetdatal = async () => {
		try {
			const res = await getDatal();
			datal = res.data;
		} catch (err) {
			console.log(err);
		}
	};

	onMount(() => {
		handdlegetdata();
		handdlegetdatal();
	});
</script>

<div class="flex justify-center">
	<div class="w-[50rem]">
		<p class="m-2 text-white">Root of Equation</p>

		<table class="table">
			<thead class="bg-primary text-primary-content font-light text-lg">
				<tr>
					<th class="w-[15%] text-center">ID</th>
					<th class="w-[25%]">Solution</th>
					<th class="w-[25%]">Equation</th>
					<th class="w-[25%]">Result</th>
				</tr>
			</thead>
		</table>

		<div class="overflow-y-auto h-52">
			<table class="table font-light text-md">
				<tbody class="bg-base-300">
					{#each data as item}
						<tr>
							<td class="w-[15%] text-center">{item.id}</td>
							<td class="w-[25%]">{item.solution}</td>
							<td class="w-[25%]">{item.equation}</td>
							<td class="w-[25%]">{item.result}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>

<div class="flex justify-center">
	<div class="w-[50rem]">
		<p class="m-2 text-white">Linear Systems</p>

		<table class="table">
			<thead class="bg-primary text-primary-content font-light text-lg">
				<tr>
					<th class="w-[15%] text-center">ID</th>
					<th class="w-[25%]">Solution</th>
					<th class="w-[25%]">Matrix A</th>
					<th class="w-[25%]">Matrix B</th>
				</tr>
			</thead>
		</table>

		<div class="overflow-y-auto h-52">
			<table class="table font-light text-md">
				<tbody class="bg-base-300">
					{#each datal as item}
						<tr>
							<td class="w-[15%] text-center">{item.id}</td>
							<td class="w-[25%]">{item.solution}</td>
							<td class="w-[25%]">{JSON.stringify(item.matrixA)}</td>
							<td class="w-[25%]">{JSON.stringify(item.matrixB)}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
