/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--_apps---sizes--radius, 0.5rem)',
        md: 'calc(var(--_apps---sizes--radius, 0.5rem) - 2px)',
        sm: 'calc(var(--_apps---sizes--radius, 0.5rem) - 4px)'
      },
      colors: {
        background: 'var(--_apps---colors--background, #F5F1EB)',
        foreground: 'var(--_apps---colors--foreground, #29708d)',
        card: {
          DEFAULT: 'var(--_apps---colors--card, #F5F1EB)',
          foreground: 'var(--_apps---colors--card-foreground, #29708d)'
        },
        popover: {
          DEFAULT: 'var(--_apps---colors--popover, #F5F1EB)',
          foreground: 'var(--_apps---colors--popover-foreground, #29708d)'
        },
        primary: {
          DEFAULT: 'var(--_apps---colors--primary, #C98769)',
          foreground: 'var(--_apps---colors--primary-foreground, #FFFFFF)'
        },
        secondary: {
          DEFAULT: 'var(--_apps---colors--secondary, #E6DCD4)',
          foreground: 'var(--_apps---colors--secondary-foreground, rgba(55, 61, 54, 0.6))'
        },
        muted: {
          DEFAULT: 'var(--_apps---colors--muted, #E6DCD4)',
          foreground: 'var(--_apps---colors--muted-foreground, rgba(55, 61, 54, 0.6))'
        },
        accent: {
          DEFAULT: 'var(--_apps---colors--accent, #E6DCD4)',
          foreground: 'var(--_apps---colors--accent-foreground, rgba(55, 61, 54, 0.6))'
        },
        destructive: {
          DEFAULT: 'var(--_apps---colors--destructive, #D9534F)',
          foreground: 'var(--_apps---colors--primary-foreground, #FFFFFF)'
        },
        border: 'var(--_apps---colors--border, rgba(55, 61, 54, 0.1))',
        input: 'var(--_apps---colors--input, rgba(55, 61, 54, 0.2))',
        ring: 'var(--_apps---colors--ring, #C98769)',
        chart: {
          '1': 'var(--_apps---charts--chart-1, #D9A78C)',
          '2': 'var(--_apps---charts--chart-2, #CFA186)',
          '3': 'var(--_apps---charts--chart-3, #C98769)',
          '4': 'var(--_apps---charts--chart-4, #B66F4E)',
          '5': 'var(--_apps---charts--chart-5, #9E5B3F)'
        }
      },
      fontFamily: {
        sans: ['var(--_apps---typography--body-font, Aileron, Arial, sans-serif)'],
        serif: ['var(--_apps---typography--heading-font, Bodoni Moda, serif)'],
      }
    }
  },
  plugins: [require('tailwindcss-animate')],
};
