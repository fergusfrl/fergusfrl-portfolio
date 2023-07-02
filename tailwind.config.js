import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#FCB614'
				},
				slate: {
					lightest: '#D3D3D3',
					light: '#6D6D6D',
					DEFAULT: '#494C4E'
				}
			}
		},
		fontFamily: {
			sans: ['Libre Baskerville', ...defaultTheme.fontFamily.sans],
			serif: [...defaultTheme.fontFamily.serif],
			mono: [...defaultTheme.fontFamily.mono]
		}
	},
	plugins: []
};
