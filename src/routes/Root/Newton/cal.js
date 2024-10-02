// @ts-nocheck
// @ts-ignore
import { abs, evaluate, derivative } from 'mathjs';

export function objectresult() {
	return {
		xshow: 0,
		iter: 1,
		iterations: [],
		mainxy: [],
		info0: []
	};
}

// @ts-ignore
export function calmethod(xi, errorFactor, func) {
	console.log(xi, errorFactor, func);
	const result = objectresult();

	const f = (x) => evaluate(func, { x });

	const fprime = (x) => derivative(func, 'x').evaluate({ x });
	let xfirst = xi - f(xi) / fprime(xi);
	let xOld = 0;
	let fx = 0;
	let errorcal = 0;
	let mx = abs(xi);
	if (xi <= 10 || xi <= -10) {
		mx = abs(xi) + abs(xi) / 10;
	}
	for (let i = -mx; i <= mx; i += 0.002) {
		result.mainxy.push({
			x: i,
			y: f(i)
		});
	}
	do {
		xOld = xi;
		xi = xi - f(xi) / fprime(xi);
		//console.log(fprime(xi));
		fx = f(xi);
		errorcal = Math.abs((xi - xOld) / xi);
		result.info0.push({
			xshow: xi,
			yshow: 0
		});
		result.info0.push({
			xshow: xi,
			yshow: fx
		});

		result.iterations.push({
			iter: result.iter,
			xshow: xi,
			yshow: fx,
			errorshow: errorcal
		});
		result.iter++;
	} while (Math.abs(f(xi)) > errorFactor);

	result.info0.push({
		xshow: xfirst,
		yshow: 0
	});
	result.xshow = xi;
	console.log(result.info0);
	return result;
}
