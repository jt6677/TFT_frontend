const colors = require('tailwindcss/colors')
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bgColor: 'hsl(240, 25%, 15%)',
        // callout: '#2D3752',
        muted: 'hsl(240, 25%, 25%)',
        callout: 'hsl(240, 25%, 35%)',
        bright: 'hsl(240, 25%, 45%)',
        sinkIn: '	hsl(240, 25%, 22%)',
        brightGold: 'hsl(45, 100%, 72%)',
        card: '#242A40',
        cardDarkColor: '#2f2f4d',
        primaryColor: '#619AFF',
        // primaryColor: '#7F7FD4',
        textColor: '#ededff',
        darkGray: '#7a7b99',
        midGray: '#9a9bae',
        lightGray: '#d2d2f7',
        goldBorder: 'rgb(250 204 21)',
        borderColor: '#1e1834',
        modalbg: 'rgba(0, 0, 0, 0.7)',
        ///asd
        //
        cardLightColor: '#3b3363',
        lightPurple: '#6C5DD3',
        mutedColor: '#504a7b',
        orangeColor: '#eb8153',
        redColor: '#f65164',
        pinkColor: '#FB7087',
        blueColor: '#4f86f1',
        greenColor: '#71b945',
        babyBlueColor: '#47b0b0',
      },

      width: {},
    },
  },
  variants: {
    extend: {},
  },
  // plugins: [require('@tailwindcss/forms')],
  plugins: [require('@tailwindcss/typography')],
}
// rgb(58, 45, 114)
// #EF466F
