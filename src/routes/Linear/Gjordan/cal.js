//@ts-nocheck

import { re } from 'mathjs';
import {} from 'mathjs';

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
		let divisor = matrixA[i][i];
		for (let k = 0; k <= n; k++) {
			matrixA[i][k] /= divisor;
		}

		for (let j = 0; j < n; j++) {
			if (i !== j) {
				let ratio = matrixA[j][i];
				for (let k = 0; k <= n; k++) {
					matrixA[j][k] -= ratio * matrixA[i][k];
				}
			}
		}
	}

	let matrixX = [];
	for (let i = 0; i < n; i++) {
		matrixX[i] = matrixA[i][n];
	}

	for (let i = 0; i < n; i++) {
		result.matrixX.push(matrixX[i].toFixed(6));
	}

	console.log(result);
	return result;
}
