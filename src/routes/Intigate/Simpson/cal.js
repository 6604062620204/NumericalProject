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

export function calmethod(a, b, func) {
	const result = objectresult();

	const f = (x) => evaluate(func, { x });
	const h = b - a;
	result.i = (h / 6) * (f(a) + 4 * f((b + a) / 2) + f(b));

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
