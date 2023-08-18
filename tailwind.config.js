import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#FCB614'
				},
				slate: {
					lightest: '#D3D3D3',
					light: '#6D6D6D',
					DEFAULT: '#222222'
				},
				eggshell: {
					DEFAULT: '#F9F9F9'
				}
			}
		},
		fontFamily: {
			sans: ['Aeonik', ...defaultTheme.fontFamily.sans],
			serif: [...defaultTheme.fontFamily.serif],
			mono: [...defaultTheme.fontFamily.mono]
		}
	},
	plugins: [require('@tailwindcss/container-queries')]
};
