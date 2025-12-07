const conf = {
    tinyMceApiKey: String(import.meta.env.VITE_TINY_MCE_API_KEY),
    renderUrl: String(import.meta.env.VITE_RENDER_URL),
    vercelUrl: String(import.meta.env.VITE_VERCEL_URL)
};

export default conf;