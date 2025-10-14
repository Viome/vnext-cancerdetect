// import CategoryFilter from "./CategoryFilter";

interface BlogHeadProps {
  title: string;
  subText?: string;
  categories?: any[];
  category?: {
    slug?: string | null;
    title?: string | null;
  };
  isTop?: boolean;
}

export default function BlogHead({
  title,
  subText,
  categories,
  category = {},
  isTop = false,
}: BlogHeadProps) {
  const categoryTitle = category.title;

  let blogTitle = title;
  if (categoryTitle) {
    if (categoryTitle === "Most Recent") {
      blogTitle = categoryTitle;
    } else {
      blogTitle = `Category: ${categoryTitle}`;
    }
  }
  if (isTop) {
    return (
      <section className="py-10 lg:py-20">
        <div className="max-w-4xl">
          <h1
            className="mb-6 text-[2.25rem] xl:text-[48px]"
            style={{
              fontFamily:
                "var(--font-twk-lausanne), ui-sans-serif, system-ui, -apple-system, blinkmacsystemfont, 'Segoe UI', 'Roboto', 'Helvetica Neue', arial, 'Noto Sans', sans-serif",
              fontWeight: 300,
              lineHeight: 1.3,
            }}
          >
            {title}
          </h1>
          {subText && (
            <p
              className="text-lg lg:text-xl  leading-relaxed"
              style={{
                fontFamily:
                  "var(--font-twk-lausanne), ui-sans-serif, system-ui, -apple-system, blinkmacsystemfont, 'Segoe UI', 'Roboto', 'Helvetica Neue', arial, 'Noto Sans', sans-serif",
                fontWeight: 300,
                lineHeight: 1.5,
                fontSize: "18px",
                color: "#000",
                maxWidth: "850px",
              }}
            >
              {subText}
            </p>
          )}
        </div>
      </section>
    );
  }
  //   return (
  //     <section className="pb-16 pt-6 lg:grid lg:items-end lg:gap-20  lg:grid-cols-2">
  //       <div>
  //         {categories && category.slug && (
  //           <p
  //             className="mb-6"
  //             style={{
  //               fontFamily:
  //                 "var(--font-twk-lausanne), ui-sans-serif, system-ui, -apple-system, blinkmacsystemfont, 'Segoe UI', 'Roboto', 'Helvetica Neue', arial, 'Noto Sans', sans-serif",
  //               fontSize: "18px",
  //               fontWeight: 400,
  //             }}
  //           >
  //             The Viome Blog
  //           </p>
  //         )}
  //         <h1
  //           className="heading-1 text-[2.25rem] xl:text-[48px]"
  //           style={{
  //             fontFamily:
  //               "var(--font-twk-lausanne), ui-sans-serif, system-ui, -apple-system, blinkmacsystemfont, 'Segoe UI', 'Roboto', 'Helvetica Neue', arial, 'Noto Sans', sans-serif",
  //             fontWeight: 500,
  //             lineHeight: 1.3,
  //           }}
  //           role="heading"
  //           aria-level="2"
  //         >
  //           {blogTitle || "Most Recent"}
  //         </h1>
  //       </div>

  //       <div className="relative h-14 mt-8 lg:mt-0">
  //         {categories && (
  //           <div className="absolute top-0 z-10 w-full">
  //             <CategoryFilter
  //               categories={categories}
  //               selectedCategory={category.slug}
  //             />
  //           </div>
  //         )}
  //       </div>
  //     </section>
  //   );
}
