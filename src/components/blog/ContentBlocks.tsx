import Image from "next/image";
import BodyBlocks from "@/components/blog/BodyBlocks";

function resolveSrc(file: any): string | undefined {
  if (!file) return undefined;
  const url = file.formats?.large?.url || file.formats?.medium?.url || file.url;
  if (!url) return undefined;
  if (url.startsWith("http")) return url;
  const base = process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:1337";
  return `${base}${url}`;
}

export default function ContentBlocks({ blocks }: { blocks: any[] }) {
  if (!Array.isArray(blocks) || blocks.length === 0) return null;

  return (
    <div className="space-y-6">
      {blocks.map((blk, i) => {
        switch (blk.__component) {
          case "content.rich-text": {
            return <BodyBlocks key={i} content={blk.body} />;
          }
          case "content.image": {
            const file = blk.media || blk.image || blk.asset || blk.file;
            const src = resolveSrc(file);
            if (!src) return null;
            const alt = blk.alt || file?.alternativeText || "";
            return (
              <figure key={i} className="my-6">
                <Image
                  src={src}
                  alt={alt}
                  width={1200}
                  height={700}
                  className="w-full h-auto rounded"
                />
                {blk.caption ? (
                  <figcaption className="text-sm text-gray-500 mt-2">
                    {blk.caption}
                  </figcaption>
                ) : null}
              </figure>
            );
          }
          case "content.video": {
            if (blk.source === "upload") {
              const src = resolveSrc(blk.file);
              if (!src) return null;
              return (
                <video key={i} className="w-full rounded" controls>
                  <source src={src} />
                </video>
              );
            }
            if (blk.url) {
              let embedUrl = blk.url;

              if (blk.url.includes("youtu.be/")) {
                const videoId = blk.url.split("youtu.be/")[1].split("?")[0];
                embedUrl = `https://www.youtube.com/embed/${videoId}`;
              } else if (blk.url.includes("youtube.com/watch")) {
                const match = blk.url.match(/[?&]v=([^&]+)/);
                if (match) {
                  embedUrl = `https://www.youtube.com/embed/${match[1]}`;
                }
              } else if (
                blk.url.includes("vimeo.com/") &&
                !blk.url.includes("player.vimeo.com")
              ) {
                const match = blk.url.match(/vimeo\.com\/(\d+)/);
                if (match) {
                  embedUrl = `https://player.vimeo.com/video/${match[1]}`;
                }
              }

              return (
                <div key={i} className="aspect-video w-full my-6">
                  <iframe
                    src={embedUrl}
                    className="w-full h-full rounded"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    title={blk.title || `video-${i}`}
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
              );
            }
            return null;
          }
          default:
            return null;
        }
      })}
    </div>
  );
}
