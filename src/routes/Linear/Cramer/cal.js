//@ts-nocheck

import { det } from 'mathjs';

export function objectresult() {
	return {
		detA: 0,
		matrixX: [],
		matrixCopy: [],
		detCopy: []
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
		let temp = (det(matrixCopy) / detA).toFixed(6);
		result.matrixCopy.push(matrixCopy);
		result.detCopy.push(det(matrixCopy));
		result.matrixX.push(temp);
	}
	result.detA = det(matrixA);
	return result;
}
