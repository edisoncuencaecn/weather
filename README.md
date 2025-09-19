# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
Nuxt uses the app/assets/ directory to store these files but there is no auto-scan functionality for this directory, and you can use any other name for it.
Nuxt won't serve files in the app/assets/ directory at a static URL like /assets/my-file.png. If you need a static URL, use the public/ directory.
app/app.vue
<template>
  <img src="~/assets/images/nuxt.png" alt="Discover Nuxt" />
</template>

The public/ directory is used as a public server for static assets publicly available at a defined URL of your application.
app/app.vue
<template>
  <img src="/images/nuxt.png" alt="Discover Nuxt" />
</template>

Using postcss.config.js is not supported together with Nuxt. Use options.postcss instead

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
echo "# weather" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/ingfcuenca/weather.git
git push -u origin main
https://nuxt.com/docs/4.x/getting-started/installation
npm create nuxt@latest weather
npm
y

 modules: ['@nuxtjs/tailwindcss','@tailwindcss/postcss'],//,'@nuxt/image'
  // ... other configurations
  /*
  image: {
    dir: 'assets/images', // This tells @nuxt/image to look in assets/images : : Install @nuxt/image
    // Other image options if needed
  },
   Use <NuxtPicture/>
  */