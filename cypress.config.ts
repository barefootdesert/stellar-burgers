import { defineConfig } from "cypress";
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env' })

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    env: {
      BURGER_API_URL: process.env.BURGER_API_URL,
    },
  },
});
