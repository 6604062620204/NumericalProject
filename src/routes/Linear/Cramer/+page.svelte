<script>
	//@ts-nocheck
	import { createData } from '../../../api/linear';
	import Katex from '../../Component/katex.svelte';
	import { calmethod } from '../Cramer/cal';

	let matrixSize = 3; // ตั้งค่าเริ่มต้นเป็น 3x3
	let matrixA = [];
	let matrixB = [];
	let func = '[A]';
	let func1 = '\\{X\\}';
	let func2 = '\\{B\\}';
	let func3 = 'X_i =';
	let num = 3;
	let pdfUrl = '/assets/doclinear/Cramer.pdf';

	let result = {
		detA: 0,
		matrixX: [],
		matrixCopy: [],
		detCopy: []
	};

	function updateMatrix() {
		matrixA = Array.from({ length: matrixSize }, () => Array(matrixSize).fill(''));
		matrixB = Array.from({ length: matrixSize }).fill('');
	}

	// เรียก updateMatrix ตอนโหลดครั้งแรก
	updateMatrix();

	function randomizeMatrix() {
		matrixA = Array.from({ length: matrixSize }, () =>
			Array.from({ length: matrixSize }, () => Math.floor(Math.random() * 10) + 1)
		);
		matrixB = Array.from({ length: matrixSize }, () => Math.floor(Math.random() * 10) + 1);
	}

	function datatodb() {
		const payload = {
			solution: 'cramer',
			matrixA: matrixA,
			matrixB: matrixB,
			equation: func
		};
		console.log(payload);
		createData(payload)
			.then((res) => {
				console.log('Data created successfully:', res);
			})
			.catch((err) => {
				console.error('Error while creating data:', err.response ? err.response.data : err.message);
			});
	}
	function calculate() {
		result = calmethod(matrixA, matrixB);
		datatodb();
	}
</script>

<h1 class="text-4xl text-primary font-bold flex justify-center pt-5">Cramer's Rule</h1>
<div class="flex justify-center">
	<div class="p-4">
		<div class="flex flex-col items-center">
			<label for="matrix-size" class="block text-lg font-medium text-content">
				Matrix Size {matrixSize} x {matrixSize}
			</label>
			<input
				id="matrix-size"
				type="number"
				bind:value={matrixSize}
				class="mt-1 block w-16 p-2 border border-secondary focus:outline-none rounded-md text-end"
				max="5"
				min="1"
				on:input={updateMatrix}
			/>
		</div>

		<div class="mt-4">
			{#if matrixSize > 4}
				<p class="text-red-500 text-3xl">Matrix ขนาดมากกว่า 4 ไม่ได้นะคั้บบ</p>
			{/if}
			{#if matrixSize <= 1}
				<p class="text-red-500 text-3xl">Matrix ขนาดน้อยกว่า 2 ไม่ได้นะคั้บบ</p>
			{/if}

			<div>
				<form on:submit|preventDefault={calculate} class="">
					<div class="flex space-x-4">
						{#if matrixSize > 1 && matrixSize <= 4}
							<div class="flex-cols">
								<h2 class="text-lg text-primary flex justify-center">
									<Katex {func} {num} />
								</h2>

								<div class={`grid grid-cols-${matrixSize} justify-items-center gap-2 mt-2`}>
									{#each matrixA as row, rowIndex}
										{#each row as cell, colIndex}
											<input
												type="number"
												class="border p-2 rounded-md text-center w-20 sm:w-10 md:w-14 lg:w-12 xl:w-16 h-auto border-secondary focus:outline-none"
												bind:value={matrixA[rowIndex][colIndex]}
												placeholder="a{rowIndex + 1}{colIndex + 1}"
											/>
										{/each}
									{/each}
								</div>
							</div>
							<div class="flex-cols hidden sm:block">
								<h2 class="text-lg text-primary flex justify-center">
									<Katex {func1} {num} />
								</h2>

								<div class={`grid grid-rows-${matrixSize} justify-items-center gap-2 mt-2 `}>
									{#each matrixA as row, rowIndex}
										<input
											type="number"
											class="border p-2 rounded-md text-center w-20 sm:w-10 md:w-14 lg:w-12 xl:w-16 h-auto bg-primary border-secondary focus:outline-none placeholder-primary-content"
											value="x[rowIndex]"
											placeholder="x{rowIndex + 1}"
											readonly
										/>
									{/each}
								</div>
							</div>
							<div class="flex mt-24"><p class="text-3xl">=</p></div>
							<div class="flex-cols">
								<h2 class="text-lg text-primary flex justify-center">
									<Katex {func2} {num} />
								</h2>

								<div class={`grid grid-rows-${matrixSize} justify-items-center gap-2 mt-2 `}>
									{#each matrixA as row, rowIndex}
										<input
											type="number"
											class="border p-2 rounded-md text-center w-20 sm:w-10 md:w-14 lg:w-12 xl:w-16 h-auto border-secondary focus:outline-none"
											bind:value={matrixB[rowIndex]}
											placeholder="b{rowIndex + 1}"
										/>
									{/each}
								</div>
							</div>
						{/if}
					</div>

					{#if matrixSize > 1 && matrixSize <= 4}
						<div class="flex justify-center">
							<button
								type="button"
								on:click={randomizeMatrix}
								class="btn font-light text-base w-auto h-12 drop-shadow-md bg-secondary text-secondary-content mt-6 py-2 px-4 rounded-ss-3xl rounded-ee-3xl mr-4"
							>
								Randomize Matrix!
							</button>
							<button
								type="submit"
								class="btn font-light text-base w-auto h-12 drop-shadow-md bg-primary text-primary-content mt-6 py-2 px-4 rounded-ss-3xl rounded-ee-3xl"
							>
								Calculate!
							</button>
						</div>
					{/if}
				</form>
			</div>
		</div>
	</div>
</div>

<div class="block xl:hidden">
	<div class="flex justify-center">
		<a href={pdfUrl} download class="btn font-light btn-primary">Download Doc</a>
	</div>
</div>

<!-- Open the modal using ID.showModal() method -->
<div class="hidden xl:block">
	<div class="flex justify-center">
		<button
			class="btn font-light text-base w-auto h-12 drop-shadow-md bg-primary text-primary-content py-2 px-4 rounded-ss-3xl rounded-ee-3xl"
			onclick="my_modal_2.showModal()">เปิดวิธีทำ</button
		>
		<dialog id="my_modal_2" class="modal">
			<div class="modal-box">
				<div class="flex justify-center">
					<embed src={pdfUrl} type="application/pdf" class="w-full h-screen" />
				</div>
			</div>
			<form method="dialog" class="modal-backdrop">
				<button>close</button>
			</form>
		</dialog>
	</div>
</div>
<div class="bg-base-200">
	{#if result.detA !== 0}
		<div class="flex justify-center mt-4">
			<div class="flex-cols">
				<h2 class="text-lg text-primary flex justify-center">
					det(A)= {result.detA}
				</h2>
				<div class="flex">
					<h2 class="text-lg text-primary">
						<Katex {func3} {num} />
					</h2>
					<h2 class="text-lg text-primary pt-2">{result.matrixX}</h2>
				</div>
			</div>
		</div>
	{/if}
</div>
