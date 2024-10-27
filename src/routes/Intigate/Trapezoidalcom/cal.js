//@ts-nocheck
import { evaluate, compile } from 'mathjs';
import Algebrite from 'algebrite';

export function objectresult() {
	return {
		i: 0,
		truevalue: 0,
		calerror: 0
	};
}

export function calmethod(a, b, n, func) {
	const result = objectresult();

	const f = (x) => evaluate(func, { x });

	const h = (b - a) / n;
	let sum = 0;
	for (let i = a + h; i < b; i += h) {
		sum += f(i);
	}
	result.i = (h / 2) * (f(a) + f(b) + 2 * sum);

	const integral = Algebrite.integral(func).toString();
	const F = compile(integral);
	const Fa = F.evaluate({ x: a });
	const Fb = F.evaluate({ x: b });
	const exactIntegral = Fb - Fa;
	result.truevalue = exactIntegral;

	result.calerror = Math.abs((result.truevalue - result.i) / result.truevalue);

	console.log(result);
	return result;
}
