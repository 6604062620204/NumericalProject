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
			xshow: xOld,
			yshow: xi,
			errorshow: errorcal
		});
		result.xshow = xOld;
		result.yshow = xi;
		result.errorshow = errorcal;
		result.iter++;
	} while (Math.abs((xi - xOld) / xi) > errorFactor);

	return result;
}
