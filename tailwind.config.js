
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      backgroundImage:{
          'tema-gradient':'linear-gradient(120deg, rgb(21, 166, 180), darkslategrey)',
          'text-gradient': 'linear-gradient(120deg, rgb(21, 166, 180), darkslategrey)',
          'busca':"url('https://tse2.mm.bing.net/th?id=OIP.xzPEY661ToNuT_i1huu5CwHaHa&pid=Api&P=0&h=180')",
          'perfil-user':"url('https://tse1.mm.bing.net/th?id=OIP.EfmM6_ghUrqZgWXQoO9b6wHaE8&pid=Api&P=0&h=180')",

      },
      backgroundSize: {
        'size4%': '4%',
      },
      backgroundPosition: {
        'custom-right': 'calc(100% - 15px) center',
        'custom-left': '10px center',

      },
    },
  },
  plugins: [],
}


