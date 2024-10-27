//@ts-nocheck

export function objectresult() {
	return {
		matrixX: []
	};
}

export function calmethod(matrixA, matrixB) {
	const result = objectresult();
	let n = matrixA.length;

	matrixA.forEach((row, index) => {
		row.push(matrixB[index]);
	});

	for (let i = 0; i < n; i++) {
		for (let j = i + 1; j < n; j++) {
			let ratio = matrixA[j][i] / matrixA[i][i];
			for (let k = i; k <= n; k++) {
				matrixA[j][k] -= ratio * matrixA[i][k];
			}
		}
	}

	let matrixX = Array(n).fill(0);
	for (let i = n - 1; i >= 0; i--) {
		matrixX[i] = matrixA[i][n];
		for (let j = i + 1; j < n; j++) {
			matrixX[i] -= matrixA[i][j] * matrixX[j];
		}
		matrixX[i] /= matrixA[i][i];
	}

	for (let i = 0; i < n; i++) {
		result.matrixX.push(matrixX[i].toFixed(6));
	}

	console.log(result);
	return result;
}
