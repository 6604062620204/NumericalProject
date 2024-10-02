//@ts-nocheck

import { det } from 'mathjs';

export function objectresult() {
	return {
		matrixX: [],
		matrixCopy: []
	};
}

export function calmethod(matrixA, matrixB) {
	const result = objectresult();
	const detA = det(matrixA);

	for (let i = 0; i < matrixA.length; i++) {
		const matrixCopy = matrixA.map((arr) => arr.slice());
		for (let j = 0; j < matrixA.length; j++) {
			matrixCopy[j][i] = matrixB[j];
		}
		result.matrixCopy.push(matrixCopy);
		result.matrixX.push(det(matrixCopy) / detA);
	}
	console.log(result);
}
