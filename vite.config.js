import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // এই লাইনটি না থাকলে Render-এ JavaScript ফাইল লোড হতে পারে না এবং পেজ সাদা হয়ে থাকে
})
