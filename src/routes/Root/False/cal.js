// @ts-nocheck
// @ts-ignore
import { evaluate } from 'mathjs';

export function objectresult() {
	return {
		xshow: 0,
		yshow: 0,
		errorshow: 0,
		iter: 0,
		iterations: [],
		error: ''
	};
}

// @ts-ignore
export function calmethod(xl, xr, errorFactor, func) {
	const result = objectresult();

	const f = (x) => evaluate(func, { x });

	let fMid = 0;
	let fxl = 0;
	let fxr = 0;
	let xMid = 0;
	let xOld = 0;
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

		const errorcal = Math.abs((xMid - xOld) / xMid);
		xOld = xMid;

		result.iterations.push({
			xshow: xMid,
			yshow: fMid,
			errorshow: errorcal
		});
		result.xshow = xMid;
		result.yshow = fMid;
		result.errorshow = errorcal;
		result.iter++;
	} while (fMid < -0.000001 || fMid > errorFactor);
	return result;
}
