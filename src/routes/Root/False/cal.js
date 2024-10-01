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

export function calmethod(xl, xr, errorFactor, func) {
	const result = objectresult();

	const f = (x) => evaluate(func, { x });

	let fMid = 0;
	let fxl = 0;
	let fxr = 0;
	let xMid = 0;
	let xOld = 0;
	let errorcal = 0;
	do {
		fxr = f(xr);
		fxl = f(xl);
		xMid = (xl * fxr - xr * fxl) / (fxr - fxl);
		fMid = f(xMid);

		if (fMid * fxr < 0) {
			xl = xMid;
		} else {
			xr = xMid;
		}

		errorcal = Math.abs((xMid - xOld) / xMid);
		xOld = xMid;

		result.iterations.push({
			iter: result.iter,
			xshow: xMid,
			yshow: fMid,
			errorshow: errorcal
		});
		result.iter++;
	} while (errorcal > errorFactor);
	result.xshow = xMid;
	result.yshow = fMid;
	result.errorshow = errorcal;
	return result;
}
