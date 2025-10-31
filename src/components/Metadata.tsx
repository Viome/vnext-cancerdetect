
interface MetadataConfig {
  title?: string
  description?: string
  themeMode?: 'light' | 'dark'
  siteUrl?: string
  sitemapUrl?: string
  manifestUrl?: string
  maskIconColor?: string
}

export function createMetadata({
  title = "Cancer Detection App",
  description = "Advanced cancer detection application",
  themeMode = 'light',
  siteUrl = "https://www.viome.com",
  sitemapUrl = "https://www.viome.com/sitemap.xml",
  manifestUrl = "/site.webmanifest",
  maskIconColor = "#6d4ab0"
}: MetadataConfig = {}) {
  return {
    title,
    description,
    robots: {
      index: true,
      follow: true,
    },
    authors: [{ name: "Cancer Detection App" }],
    themeColor: maskIconColor,
    openGraph: {
      type: "website",
      title,
      description,
      url: siteUrl,
      siteName: "Cancer Detection App",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    icons: {
      icon: [
        { url: "/fav-light.svg", type: "image/svg+xml", media: "(prefers-color-scheme: light)" },
        { url: "/fav-dark.svg", type: "image/svg+xml", media: "(prefers-color-scheme: dark)" },
        { url: "/favicon-light.ico", rel: "alternate shortcut icon", media: "(prefers-color-scheme: light)" },
        { url: "/favicon-dark.ico", rel: "alternate shortcut icon", media: "(prefers-color-scheme: dark)" },
        { url: "/favicon-light-96x96.png", sizes: "96x96", type: "image/png", media: "(prefers-color-scheme: light)" },
        { url: "/favicon-dark-96x96.png", sizes: "96x96", type: "image/png", media: "(prefers-color-scheme: dark)" },
        { url: "/favicon-light-32x32.png", sizes: "32x32", type: "image/png", media: "(prefers-color-scheme: light)" },
        { url: "/favicon-dark-32x32.png", sizes: "32x32", type: "image/png", media: "(prefers-color-scheme: dark)" },
        { url: "/favicon-light-16x16.png", sizes: "16x16", type: "image/png", media: "(prefers-color-scheme: light)" },
        { url: "/favicon-dark-16x16.png", sizes: "16x16", type: "image/png", media: "(prefers-color-scheme: dark)" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180" },
        { url: "/apple-touch-icon-precomposed.png", sizes: "57x57" },
        { url: "/apple-touch-icon-120x120.png", sizes: "120x120" },
        { url: "/apple-touch-icon-120x120-precomposed.png", sizes: "120x120" },
      ],
      other: [
        { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: maskIconColor },
      ],
    },
    manifest: manifestUrl,
    alternates: {
      types: {
        "application/rss+xml": sitemapUrl,
      },
    },
  }
}

// Component for client-side favicon switching
export default function MetadataHead({
  themeMode = 'light'
}: { themeMode?: 'light' | 'dark' }) {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          // Function to update favicon based on theme
          function updateFavicon(theme) {
            const isDark = theme === 'dark';
            const suffix = isDark ? 'dark' : 'light';
            
            // Update SVG favicon
            const svgLink = document.querySelector('link[rel="icon"][type="image/svg+xml"]');
            if (svgLink) {
              svgLink.href = \`/fav-\${suffix}.svg\`;
            }
            
            // Update ICO favicon
            const icoLink = document.querySelector('link[rel="alternate shortcut icon"]');
            if (icoLink) {
              icoLink.href = \`/favicon-\${suffix}.ico\`;
            }
            
            // Update PNG favicons
            const pngLinks = document.querySelectorAll('link[rel="icon"][type="image/png"]');
            pngLinks.forEach(link => {
              const sizes = link.getAttribute('sizes');
              if (sizes) {
                link.href = \`/favicon-\${suffix}-\${sizes}.png\`;
              }
            });
          }
          
          // Listen for theme changes
          const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
              if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const html = document.documentElement;
                const isDark = html.classList.contains('dark');
                updateFavicon(isDark ? 'dark' : 'light');
              }
            });
          });
          
          // Start observing
          observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
          });
          
          // Initial favicon setup
          const initialTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
          updateFavicon(initialTheme);
        `,
      }}
    />
  )
}
