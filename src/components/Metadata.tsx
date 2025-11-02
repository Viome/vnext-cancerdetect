import Script from "next/script"

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
  title = "CancerDetect® Oral Cancer Test Kit & Throat Cancer Test at Home | Viome",
  description = "Advanced cancer detection application using cutting-edge technology",
  themeMode = 'light',
  siteUrl = "https://cancerdetect.viome.com",
  sitemapUrl = "https://cancerdetect.viome.com/sitemap.xml",
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
    <>
      {/* Microsoft Tiles */}
      <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
      <meta name="msapplication-square70x70logo" content="/mstile-70x70.png" />
      <meta name="msapplication-square150x150logo" content="/mstile-150x150.png" />
      <meta name="msapplication-wide310x150logo" content="/mstile-310x150.png" />
      <meta name="msapplication-square310x310logo" content="/mstile-310x310.png" />
      
      {/* Additional Meta Tags */}
      <meta name="medium" content="website" />
      <meta name="googlebot" content="NOODP" />
      <meta name="slurp" content="NOYDIR" />
      <meta name="bingbot" content="NOODP" />
      <meta name="robots" content="max-image-preview:large" />
      
      {/* Facebook Meta Tags */}
      <meta property="fb:app_id" content="MyViome" />
      <meta property="fb:pages" content="501238623411978" />

      {/* DNS prefetch for external domains */}
      <link rel="dns-prefetch" href="//static.azure.viome.com" />
      <link rel="dns-prefetch" href="//cms.viome.com" />
      <link rel="dns-prefetch" href="//cdn.userway.org" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      <link rel="dns-prefetch" href="//connect.facebook.net" />
      <link rel="dns-prefetch" href="//platform.twitter.com" />
      <link rel="dns-prefetch" href="//platform.linkedin.com" />
      <link rel="dns-prefetch" href="//global.ketchcdn.com" />
      <link rel="preconnect" href="https://global.ketchcdn.com" crossOrigin="" />

      <Script
        src="https://cdn.userway.org/widget.js"
        data-account="POwdDgCYwA"
        data-trigger=".accessibility-button"
        strategy="lazyOnload"
      />

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
    </>
  )
}
