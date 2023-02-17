

interface ImportMetaEnv {
  readonly VITE_WEATHER_API_KEY: string
  readonly VITE_GOOGLE_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}