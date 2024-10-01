// @ts-nocheck
import { evaluate } from 'mathjs';

export function objectresult() {
	return {
		xshow: 0,
		yshow: 0,
		errorshow: 0,
		iter: 1,
		iterations: [],
		error: ''
	};
}

export function calmethod(xStart, xEnd, errorFactor, func) {
	const result = objectresult();
	const f = (x) => evaluate(func, { x });

	let xMid = 0;
	let fMid = 0;
	let errorcal = 0;

	do {
		xMid = (xStart + xEnd) / 2;
		fMid = f(xMid);
		errorcal = Math.abs((xEnd - xStart) / xEnd);

		result.iterations.push({
			iter: result.iter,
			xshow: xMid,
			yshow: fMid,
			errorshow: errorcal
		});

		if (fMid * f(xStart) < 0) {
			xEnd = xMid;
		} else {
			xStart = xMid;
		}

		result.iter++;
	} while (errorcal > errorFactor);
	result.xshow = xMid;
	result.yshow = fMid;
	result.errorshow = errorcal;
	return result;
}
