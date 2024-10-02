/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				Playpen: ['Playpen Sans', 'cursive'],
				thai: ['Itim', 'cursive']
			}
		}
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: ['autumn', 'night']
	},
	safelist: [
		{
			pattern: /grid-cols-./
		}
	]
};
