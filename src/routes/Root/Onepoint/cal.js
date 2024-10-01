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

export function calmethod(xi, errorFactor, func) {
	console.log(xi, errorFactor, func);
	const result = objectresult();

	const f = (x) => evaluate(func, { x });

	let xOld = 0;
	let errorcal = 0;

	do {
		xOld = xi;
		xi = f(xi);
		errorcal = Math.abs((xi - xOld) / xi);
		result.iterations.push({
			iter: result.iter,
			xshow: xOld,
			yshow: xi,
			errorshow: errorcal
		});
		result.iter++;
	} while (errorcal > errorFactor);

	result.xshow = xOld;
	result.yshow = xi;
	result.errorshow = errorcal;
	return result;
}
