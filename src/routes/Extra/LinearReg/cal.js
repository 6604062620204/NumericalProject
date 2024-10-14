//@ts-nocheck

import { det } from 'mathjs';

export function objectresult() {
	return {
		matrixX: [],
		matrixY: [],
		matrixCramer: [],
		caly: 0
	};
}

export function calmethod(XA, YA, Size, xvalue, morder) {
	const result = objectresult();
	let sum = [];

	for (let i = 0; i <= morder; i++) {
		for (let j = 0; j <= morder; j++) {
			if (i === 0 && j === 0) {
				sum.push(Size);
			} else {
				let sum1 = 0;
				for (let k = 0; k < Size; k++) {
					sum1 += Math.pow(XA[k], i + j);
				}
				sum.push(sum1);
			}
		}
	}
	console.log(sum);

	for (let i = 0; i <= morder; i++) {
		let temp = [];
		for (let j = 0; j <= morder; j++) {
			temp.push(sum[i * (morder + 1) + j]);
			console.log(temp);
		}
		result.matrixX.push(temp);
	}

	for (let i = 0; i <= morder; i++) {
		let sum1 = 0;
		for (let j = 0; j < Size; j++) {
			sum1 += Math.pow(XA[j], i) * YA[j];
		}
		result.matrixY.push(sum1);
	}

	const detA = det(result.matrixX);

	for (let i = 0; i < result.matrixX.length; i++) {
		const matrixCopy = result.matrixX.map((arr) => arr.slice());
		for (let j = 0; j < result.matrixX.length; j++) {
			matrixCopy[j][i] = result.matrixY[j];
		}
		let temp = (det(matrixCopy) / detA).toFixed(6);
		result.matrixCramer.push(temp);
	}

	let caly = 0;
	for (let i = 0; i <= morder; i++) {
		caly += result.matrixCramer[i] * Math.pow(xvalue, i);
	}
	result.caly = caly.toFixed(6);

	console.log(result);
	return result;
}
