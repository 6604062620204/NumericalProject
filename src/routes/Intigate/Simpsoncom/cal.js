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

	let osum = 0;
	for (let i = 1; i < n; i += 2) {
		{
			osum += f(a + i * h);
		}
	}
	let esum = 0;
	for (let i = 2; i < n; i += 2) {
		esum += f(a + i * h);
	}

	result.i = (h / 3) * (f(a) + f(b) + 4 * osum + 2 * esum);

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
