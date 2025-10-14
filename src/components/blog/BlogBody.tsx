import ContentBlocks from "./ContentBlocks";

interface BlogBodyProps {
  content: any[];
}

export default function BlogBody({ content }: BlogBodyProps) {
  return (
    <div
      style={{
        fontFamily:
          "var(--font-twk-lausanne), ui-sans-serif, system-ui, -apple-system, blinkmacsystemfont, 'Segoe UI', 'Roboto', 'Helvetica Neue', arial, 'Noto Sans', sans-serif",
      }}
    >
      <ContentBlocks blocks={content} />
    </div>
  );
}
