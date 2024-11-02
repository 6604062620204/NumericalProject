<script lang="ts">
	// @ts-nocheck
	import Grapshow from '../../Component/grapshow.svelte';
	import Katex from '../../Component/katex.svelte';
	import { calmethod } from '../Onepoint/cal';
	import { readsol, createData } from '../../../api/root';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	let xi = 0;
	let errorFactor = 0.000001;
	let func = '';
	let num = 1;
	let choosez = 'onepoint';
	let data = [];
	let showSuccessAlert = false;

	let result = {
		xshow: 0,
		iter: 0,
		iterations: []
	};

	let errorMessage = '';
	let showTable = false;

	function calculate() {
		if (func && errorFactor > 0) {
			showTable = true;
			result = calmethod(xi, errorFactor, func);
			datatodb();
		} else {
			errorMessage = 'ใส่ข้อมูลให้ถูกต้องดิ๊';
			showTable = true;
		}
	}

	function formatNumber(value: number) {
		if (Math.floor(value) === value) {
			return value.toString();
		} else {
			return Number(value.toFixed(6)).toString();
		}
	}

	function datatodb() {
		const payload = {
			solution: 'OnePoint',
			xstart: xi,

			equation: func,
			error: errorFactor,
			result: result.xshow.toFixed(6)
		};
		createData(payload)
			.then((res) => {
				console.log('สร้าง Data สำเร็จ', res);
				showSuccessAlert = true;
				setTimeout(() => {
					showSuccessAlert = false;
				}, 3000);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	const handdlegetdata = async () => {
		try {
			const res = await readsol('Onepoint');
			data = res.data;
		} catch (err) {
			console.log(err);
		}
	};

	function selectEquation(equation) {
		func = equation;
		document.getElementById('my_modal_5').close();
	}
	onMount(() => {
		handdlegetdata();
	});

	$: if (func === '') {
		showTable = false;
	}
</script>

<h1 class="text-4xl text-primary font-bold flex justify-center pt-5">Onepoint Medthod</h1>

<div class="my-10 flex justify-center">
	<div
		class="px-10 py-3 rounded-ss-full rounded-ee-full bg-base-200 lg:text-3xl sm:text-2xl text-primary w-auto"
	>
		<Katex {func} {num} />
	</div>
</div>

<div class="flex justify-center">
	<div class="lg:flex lg:space-x-4 md:flex md:space-x-4">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<form on:submit|preventDefault={calculate} class="lg:flex lg:space-x-4 md:flex md:space-x-4">
			<div>
				<label class="block">X Initial</label>
				<input
					type="number"
					bind:value={xi}
					placeholder="0"
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
					required={true}
				/>
			</div>

			<div>
				<label class="block">ข้อผิดพลาด</label>
				<input
					type="number"
					bind:value={errorFactor}
					placeholder="0.000001"
					step="0.000001"
					class="mt-1 block p-2 border border-gray-300 rounded-md lg:w-36 md:w-32"
					required
				/>
			</div>

			<div class="flex justify-center">
				<button
					type="submit"
					class=" btn font-light text-base w-auto h-12 drop-shadow-md bg-primary text-primary-content mt-6 py-2 px-4 rounded-ss-3xl rounded-ee-3xl"
					>คำนวณ</button
				>
			</div>
		</form>
		<div class="flex justify-center mt-6">
			<button
				class="btn font-light text-base w-auto h-12 drop-shadow-md bg-primary text-primary-content py-2 px-4 rounded-ss-3xl rounded-ee-3xl"
				on:click={() => document.getElementById('my_modal_6').showModal()}
			>
				เปิดโจทย์
			</button>
		</div>

		<dialog id="my_modal_6" class="modal modal-bottom sm:modal-middle">
			<div class="modal-box">
				<div class="flex justify-center">
					<div class="w-[50rem]">
						<p class="m-2 text-white">Root of Equation</p>

						<table class="table">
							<thead class="bg-primary text-primary-content font-light text-lg">
								<tr>
									<th class="">Solution</th>
									<th class="">Equation</th>
									<th class="">เลือก</th>
									<!-- คอลัมน์ปุ่มเลือก -->
								</tr>
							</thead>
						</table>

						<div class="overflow-y-auto h-52">
							<table class="table font-light text-md">
								<tbody class="bg-base-300">
									{#each data as item}
										<tr>
											<td class="text-white">{item.solution}</td>
											<td class="text-white">{item.equation}</td>
											<td class="text-center">
												<!-- ปุ่มเลือกสมการ -->
												<button
													class="bg-primary p-2 rounded-lg text-white"
													on:click={() => selectEquation(item.equation)}
												>
													เลือก
												</button>
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</dialog>
		{#if showTable}
			<div class="flex justify-center mt-6">
				<button
					class="btn font-light text-base w-auto h-12 drop-shadow-md bg-primary text-primary-content py-2 px-4 rounded-ss-3xl rounded-ee-3xl"
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

					<table class="min-w-full rounded-md">
						<thead class="bg-primary text-primary-content">
							<tr>
								<th class="py-2 px-4">iter</th>
								<th class="py-2 px-4">X</th>
								<th class="py-2 px-4">Y</th>
								<th class="py-2 px-4">Error</th>
							</tr>
						</thead>
						<tbody>
							{#each result.iterations as iter, index}
								<tr class="text-white py-2 bg-secondary text-center">
									<td class="px-4 bg-primary py-2">{index + 1}</td>
									<td class="px-4 py-2">{formatNumber(iter.xshow)}</td>
									<td class="px-4 py-2">{formatNumber(iter.yshow)}</td>
									<td class="px-4 py-2">{formatNumber(iter.errorshow)}</td>
								</tr>
							{/each}
						</tbody>
					</table>
					<div class="mt-4">
						<p class="text-lg">
							ผลลัพธ์สุดท้ายของ x: <strong>{result.xshow.toFixed(6)}</strong>
						</p>
						<p>จำนวนรอบการคำนวณทั้งหมด: {result.iter}</p>
					</div>

					<div class="modal-action">
						<button class="btn" on:click={() => document.getElementById('my_modal_5').close()}
							>Close</button
						>
					</div>
				</div>
			</dialog>
		{/if}
	</div>
</div>

<div class="flex justify-center my-10 xl:mx-96 lg:mx-48 md:mx-16">
	<div class="bg-base-300 collapse w-screen sm:w-[90%]">
		<input type="checkbox" class="peer" />
		<div class="collapse-title bg-primary text-primary-content peer-checked:bg-primary">
			<h1 class="text-2xl text-center">เปิดกราฟ</h1>
		</div>
		<div class="collapse-content peer-checked:bg-primary">
			<div class="flex justify-center">
				<Grapshow {result} {choosez} />
			</div>
		</div>
	</div>
</div>
{#if showSuccessAlert}
	<div class="toast toast-bottom toast-start mt-20" transition:fly={{ y: 200, duration: 500 }}>
		<div class="alert alert-success">
			<span>บันทึกข้อมูลลง Database สำเร็จแล้ว</span>
		</div>
	</div>
{/if}
