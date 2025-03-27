module.exports = {
    content: [
      './src/**/*.{js,jsx,ts,tsx}', // Include all file extensions where Tailwind is used
    ],
    theme: {
      extend: {
        colors: {
          customBgColor: {
            bg: '#FBFCF1',
            DEFAULT: '#068343',
            dark: 'black'
            
          },
          customTextColor: {
            DEFAULT: '#068343',
            light: '#23C55F',
            dark: 'black',
            white: "white"
            
          },
          customBorderColor: {
            DEFAULT: '#068343',
            light: '',
            
  
            
          },
        },
      },
    },
    plugins: [require('tailwind-scrollbar-hide')],
  };
  