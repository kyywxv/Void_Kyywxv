/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				indigo: {
					50: '#ffffff',
					100: '#ffffff',
					200: '#ffffff',
					300: '#ffffff',
					400: '#ffffff',
					500: '#ffffff',
					600: '#ffffff',
					700: '#ffffff',
					800: '#000000',
					900: '#000000',
					950: '#000000',
				},
				purple: {
					500: '#ffffff',
					600: '#ffffff',
				},
				blue: {
					400: '#a3a3a3',
					500: '#737373',
				},
				cyan: {
					500: '#404040',
				}
			},
			backdropBlur: {
				sm: '4px',
			  },
		  },
		},
	plugins: [],
}
