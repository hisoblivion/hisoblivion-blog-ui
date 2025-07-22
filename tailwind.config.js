module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {

      colors: {
        sage: "#ECFAE5",
      },
      fontFamily: {
        handwriting: ["'Great Vibes'", "cursive"],
        poetic: ['"Cormorant Garamond"', 'serif'],
      },
      animation: {
        'fade-in-down': 'fadeInDown 0.7s ease-out',
        'drop-in': 'dropIn 1s ease-out',
        'mist': 'floaty 6s ease-in-out infinite',
        'raindrop': 'raindrop linear infinite',
        'lightning': 'lightningFlash 8s infinite ease-in-out',
        'leaf-fall': 'leafFall linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'bird-fly': 'birdFly 12s linear infinite',
        'flyAcross': 'flyAcross 20s linear infinite',
        'wind': 'wind 4s ease-in-out infinite alternate',
        'aurora': 'auroraMove 12s ease-in-out infinite',
        'particle': 'particleFall linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        particleFall: {
          '0%': { transform: 'translateY(0)', opacity: '0.8' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },
        fadeInDown: {
          '0%': { opacity: 0, transform: 'translateY(-10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        twinkle: {
          '0%, 100%': { opacity: 0.8 },
          '50%': { opacity: 0.4 },
        },
        dropIn: {
          '0%': { opacity: 0, transform: 'translateY(-20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        raindrop: {
          '0%': { transform: 'translateY(0)', opacity: 0.5 },
          '100%': { transform: 'translateY(100vh)', opacity: 0 },
        },
        birdFly: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(120vw)' },
        },
        flyAcross: {
          '0%': {
            transform: 'translateX(0) translateY(0) scale(1)',
            opacity: '1',
          },
          '50%': {
            transform: 'translateX(50vw) translateY(-10px) scale(1.1)',
            opacity: '0.9',
          },
          '100%': {
            transform: 'translateX(100vw) translateY(0) scale(1)',
            opacity: '0',
          },
        },
        wind: {
          '0%': { transform: 'translateX(0px)' },
          '100%': { transform: 'translateX(40px)' },
        },
        lightningFlash: {
          '0%, 97%, 100%': { opacity: 0 },
          '98%': { opacity: 0.9 },
          '99%': { opacity: 0.2 },
        },
        leafFall: {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
          '100%': { transform: 'translateY(100vh) rotate(360deg)', opacity: 0.6 },
        },
        auroraMove: {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(-10%, -5%) scale(1.1)' },
          '100%': { transform: 'translate(5%, 5%) scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
