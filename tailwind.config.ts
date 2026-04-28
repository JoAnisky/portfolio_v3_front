import type { Config } from 'tailwindcss'

export default {
    content: [
        './components/**/*.{vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './app.vue',
    ],
    theme: {
        extend: {
            colors: {
                bg:           '#010511',
                'bg-secondary': '#222255',
                'card-stroke': '#222222',
                stroke:       '#414141',
                'aurora-green': '#1AD792',
                'aurora-blue':  '#0DCDEF',
                'blue-2':      '#68DDD0',
                timeline:     '#6BE1D4',
                'project-type': '#6993EC',
                available:    '#00C950',
                heart:        '#F28D8D',
                text:         '#C0C0C0',
                muted:        '#989898',
                'text-light': '#CECECE',
            },
            fontFamily: {
                title: ['Outfit', 'system-ui', 'sans-serif'],
                body:    ['DM Sans', 'system-ui', 'sans-serif'],
            },
        },
    },
} satisfies Config