<script lang="ts">
	import Katex from '../../Component/katex.svelte';

	let matrixSize = 3; // ตั้งค่าเริ่มต้นเป็น 3x3

	let matrix: any[] = [];
	let matrix1: any[] = [];
	let func = '[A]';
	let func1 = '\\{X\\}';
	let func2 = '\\{B\\}';
	let num = 3;

	$: console.log(matrix);
	$: console.log(matrix1);
	// ฟังก์ชันสำหรับการตั้งค่า Matrix ใหม่ตามขนาดที่ผู้ใช้ป้อน
	function updateMatrix() {
		matrix = Array.from({ length: matrixSize }, () => Array(matrixSize).fill(''));
	}
	// เรียก updateMatrix ตอนโหลดครั้งแรก
	updateMatrix();
</script>

<h1 class="text-4xl text-primary font-bold flex justify-center pt-5">Cramer's Rule</h1>
<div class="flex justify-center">
	<div class="p-4">
		<div class="flex flex-col items-center">
			<label for="matrix-size" class="block text-lg font-medium text-gray-700"
				>Matrix Size {matrixSize} x {matrixSize}</label
			>
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
				{#if matrixSize > 1 && matrixSize <= 4}
					<form class="flex space-x-4">
						<div class="flex-cols">
							<h2 class="text-lg text-primary flex justify-center">
								<Katex {func} {num} />
							</h2>

							<div class={`grid grid-cols-${matrixSize} justify-items-center gap-2 mt-2`}>
								{#each matrix as row, rowIndex}
									{#each row as cell, colIndex}
										<input
											type="number"
											class="border p-2 rounded-md text-center w-20 sm:w-10 md:w-14 lg:w-12 xl:w-16 h-auto border-secondary focus:outline-none"
											bind:value={matrix[rowIndex][colIndex]}
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
								{#each matrix as row, rowIndex}
									<input
										type="number"
										class="border p-2 rounded-md text-center w-20 h-auto bg-primary border-secondary focus:outline-none placeholder-white"
										bind:value={matrix[rowIndex]}
										placeholder="x{rowIndex + 1}"
										readonly
									/>
								{/each}
							</div>
						</div>
						<div class="flex my-24"><p class="text-3xl">=</p></div>
						<div class="flex-cols">
							<h2 class="text-lg text-primary flex justify-center">
								<Katex {func2} {num} />
							</h2>

							<div class={`grid grid-rows-${matrixSize} justify-items-center gap-2 mt-2 `}>
								{#each matrix as row, rowIndex}
									<input
										type="number"
										class="border p-2 rounded-md text-center w-20 h-auto border-secondary focus:outline-none"
										bind:value={matrix1[rowIndex]}
										placeholder="x{rowIndex + 1}"
									/>
								{/each}
							</div>
						</div>
					</form>
				{/if}
			</div>
		</div>
	</div>
</div>
