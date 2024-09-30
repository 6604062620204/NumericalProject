// @ts-nocheck
// @ts-ignore
import { evaluate, derivative } from 'mathjs';

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

	const fprime = (x) => derivative(func, 'x').evaluate({ x });

	let xOld = 0;
	let fx = 0;

	do {
		xOld = xi;
		xi = xi - f(xi) / fprime(xi);
		//console.log(fprime(xi));
		fx = f(xi);
		const errorcal = Math.abs((xi - xOld) / xi);

		result.iterations.push({
			xshow: xi,
			yshow: fx,
			errorshow: errorcal
		});
		result.xshow = xi;
		result.yshow = fx;
		result.errorshow = errorcal;
		result.iter++;
	} while (Math.abs(f(xi)) > errorFactor);
	return result;
}
