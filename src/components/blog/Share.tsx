"use client";

interface ShareProps {
  canonical: string;
  title: string;
}

export default function Share({ canonical, title }: ShareProps) {
  const encodedURL = encodeURIComponent(canonical);
  const encodedTitle = encodeURIComponent(title);

  const shareButtons = {
    facebook: {
      tooltip: "Share on Facebook",
      img: "https://strapi.azure.viome.com/viome-strapi/uploads/fill_1_26dde4cc8d.svg",
      url: `https://www.facebook.com/sharer.php?u=${encodedURL}`,
    },
    twitter: {
      tooltip: "Share on Twitter",
      img: "https://strapi.azure.viome.com/viome-strapi/uploads/fill_9_copy_a87c7801b4.svg",
      url: `https://twitter.com/intent/tweet?url=${encodedURL}&text=${encodedTitle}&via=Viome`,
    },
    linkedin: {
      tooltip: "Share on LinkedIn",
      img: "https://strapi.azure.viome.com/viome-strapi/uploads/streamline_icon_professional_network_linkedin_140_x_140_3x_561b38950a.png",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedURL}`,
    },
    email: {
      tooltip: "Share through Email",
      img: "https://strapi.azure.viome.com/viome-strapi/uploads/streamline_icon_email_action_unread_140_x_140_3x_05e2cedbc0.png",
      url: `mailto:?subject=${title}&body=${title}%20-%20${encodedURL}`,
    },
    hyperlink: {
      tooltip: "Copy URL",
      img: "https://strapi.azure.viome.com/viome-strapi/uploads/streamline_icon_hyperlink_3_140_x_140_3x_3530f8e399.png",
      url: "#",
    },
  };

  const handleCopyUrl = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(canonical);
  };

  return (
    <div>
      <ul className="flex items-center gap-x-4">
        <li>
          <p
            style={{
              fontFamily:
                "var(--font-twk-lausanne), ui-sans-serif, system-ui, -apple-system, blinkmacsystemfont, 'Segoe UI', 'Roboto', 'Helvetica Neue', arial, 'Noto Sans', sans-serif",
              fontSize: "18px",
              fontWeight: 600,
              textTransform: "uppercase",
            }}
          >
            SHARE
          </p>
        </li>
        {Object.entries(shareButtons).map(([key, shareButton]) => (
          <li key={key}>
            <a
              href={shareButton.url}
              title={shareButton.tooltip}
              target="_blank"
              rel="noreferrer"
              className={`block ${key}`}
              onClick={key === "hyperlink" ? handleCopyUrl : undefined}
              style={{
                width: "16px",
                height: "16px",
                display: "block",
              }}
            >
              <img
                src={shareButton.img}
                alt={shareButton.tooltip}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
