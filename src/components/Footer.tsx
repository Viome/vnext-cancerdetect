"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { KETCH_CONFIG } from "@/lib/config/ketch"
import { cn as classNames } from "@/lib/utils"
import { useMultipleHoverPrefetch } from "@/hooks/useMultipleHoverPrefetch"
import EmbedSignUpForm from "./KlaviyoEmbedSignUp"
import { KLAVIYO } from "@/lib/utils/constants"

type NullableString = string | null | undefined

interface Logo {
  url: string
  title: string
  contentType?: string
}

interface LinkItem {
  title: string
  url?: NullableString
  linkText?: NullableString
  isExternal?: boolean | null
  isProductDropdown?: boolean | null
}

interface LinkGroup {
  items: LinkItem[]
}

interface TopLink {
  title: string
  url?: NullableString
  dropdownLinks: LinkGroup
}

interface RichTextMark {
  type: string
}

interface RichTextNode {
  nodeType: string
  data?: unknown
  value?: string
  marks?: RichTextMark[]
  content?: RichTextNode[]
}

interface RichTextDocument {
  nodeType: string
  data?: unknown
  content: RichTextNode[]
}

interface FooterData {
  logo?: Logo
  topLinks?: { items: TopLink[] }
  bottomLinks?: { items: LinkItem[] }
  instagram?: string
  facebook?: string
  pinterest?: string
  twitter?: string
  vimeo?: string
  youtube?: string
  tikTok?: NullableString
  footerText?: { json?: RichTextDocument }
  fsa?: { json?: RichTextDocument }
  fdaCompliance?: { json?: RichTextDocument }
}

interface FooterProps {
  data: FooterData
  compactFooter?: boolean
}

const parseURL = (url?: NullableString): string => url || "#"

const isExternalLink = (url?: NullableString): boolean => {
  if (!url || url === "#") return false
  return (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("mailto:") ||
    url.startsWith("tel:")
  )
}

const Pinterest = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path d="M12 2C6.48 2 2 6.12 2 10.9c0 3.08 1.86 5.75 4.53 6.99-.06-.53-.11-1.35.02-1.93.12-.53.78-3.38.78-3.38s-.2-.41-.2-1.02c0-.95.55-1.66 1.24-1.66.58 0 .86.44.86.98 0 .6-.38 1.5-.57 2.33-.16.69.33 1.26 1.01 1.26 1.21 0 2.15-1.28 2.15-3.12 0-1.63-1.17-2.77-2.83-2.77-1.93 0-3.07 1.45-3.07 2.95 0 .58.22 1.21.49 1.55.05.06.06.12.05.18-.06.2-.2.69-.23.79-.04.12-.13.16-.25.1-.93-.43-1.51-1.78-1.51-2.86 0-2.34 1.7-4.49 4.92-4.49 2.58 0 4.59 1.84 4.59 4.3 0 2.56-1.61 4.62-3.85 4.62-.75 0-1.45-.39-1.69-.85l-.46 1.75c-.17.66-.62 1.48-.92 1.98.69.21 1.43.33 2.19.33 5.52 0 10-4.12 10-8.9C22 6.12 17.52 2 12 2z" />
  </svg>
)

export default function Footer({ data, compactFooter = false }: FooterProps) {
  const logo = data?.logo,
    topLinks = data?.topLinks?.items,
    bottomLinks = data?.bottomLinks?.items,
    socialLabels = {
      instagram: "Instagram",
      facebook: "Facebook",
      pinterest: "Pinterest",
      twitter: "Twitter",
      vimeo: "Vimeo",
      youtube: "YouTube",
    },
    launchKetch = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      const { ketch } = window
      if (ketch) {
        ketch("showPreferences")
      }
    },
    linkAttr = {
      "data-position": "footer",
    } as const

  const renderRichText = (doc?: RichTextDocument) => {
    if (!doc || !doc.content) return null
    return doc.content.map((node, idx) => {
      if (node.nodeType === "paragraph") {
        const children = (node.content || []).map((span, i) => {
          const value = span?.value ?? ""
          const hasSup =
            Array.isArray(span?.marks) &&
            span.marks!.some((m) => m.type === "superscript")
          if (value === "\n") return <br key={i} />
          if (hasSup) return <sup key={i}>{value}</sup>
          return <span key={i}>{value}</span>
        })
        return <p key={idx}>{children}</p>
      }
      return null
    })
  }

  useEffect(() => {
    const { ketch } = window
    if (ketch) {
      ketch("on", "regionInfo", (regionInfo: string) => {
        const { customTextRegions, privacyText } = KETCH_CONFIG
        if (customTextRegions.includes(regionInfo as any)) {
          const preferenceCenterLinkElement = document.getElementById(
            "preferenceCenterLink"
          )
          if (preferenceCenterLinkElement) {
            preferenceCenterLinkElement.textContent = privacyText.ccpa
          }
        }
      })

      ketch("on", "jurisdiction", (jurisdiction: string) => {
        const { excludedJurisdictions } = KETCH_CONFIG

        if (excludedJurisdictions.includes(jurisdiction as any)) {
          const preferenceCenterLinkElement = document.getElementById(
            "preferenceCenterLink"
          )
          if (preferenceCenterLinkElement) {
            ;(preferenceCenterLinkElement as HTMLElement).style.display = "none"
          }
        }
      })
    }
  }, [])

  return (
    <footer className={classNames("py-10 md:py-20 bg-black font-sans")}>
      <div
        className={classNames(
          "w-[calc(100%-1.875rem)] md:w-[calc(100%-5rem)] lg:w-[calc(100%-10rem)] lg:max-w-[1280px] mx-auto"
        )}
      >
        {!compactFooter && (
          <div className="flex flex-col text-center lg:flex-row lg:items-start lg:justify-between lg:gap-4">
            <div className="w-full lg:max-w-[500px] lg:basis-1/2 text-left">
              {logo && (
                <div className="block mb-1">
                  <Link
                    role="link"
                    tabIndex={0}
                    title="Viome Logo"
                    href="/"
                    {...linkAttr}
                  >
                    <Image
                      src={logo.url}
                      alt={logo.title}
                      loading="lazy"
                      width={120}
                      height={40}
                      quality={85}
                    />
                  </Link>
                </div>
              )}
              <div className="mt-8">
                <div className="mt-6">
                  <EmbedSignUpForm
                    formId={KLAVIYO.EMBED_FOOTER_SIGNUP_FORM_ID}
                  />
                </div>
              </div>
            </div>
            {topLinks && (
              <div className="grid justify-start mt-12 lg:mt-0 gap-10 grid-cols-2 md:grid-cols-4 text-left">
                {topLinks.map((topLink) => {
                  const nestedLinks = topLink?.dropdownLinks.items
                  const hasNested = nestedLinks && nestedLinks.length > 0

                  const dropdownUrls = hasNested
                    ? nestedLinks.map((link) => parseURL(link.url))
                    : []

                  const hoverPrefetch = useMultipleHoverPrefetch(dropdownUrls, {
                    delay: 200,
                    enabled: hasNested && dropdownUrls.length > 0,
                  })

                  return (
                    <div
                      className="flex flex-col"
                      key={topLink?.title}
                      {...(hasNested ? hoverPrefetch : {})}
                    >
                      <p className="mb-4 font-medium leading-none text-left text-white">
                        {!hasNested ? (
                          isExternalLink(topLink.url) ? (
                            <a
                              {...linkAttr}
                              role="link"
                              tabIndex={0}
                              href={topLink.url || undefined}
                              title={topLink.title}
                            >
                              {topLink?.title}
                            </a>
                          ) : (
                            <Link
                              {...linkAttr}
                              role="link"
                              tabIndex={0}
                              href={parseURL(topLink.url)}
                              title={topLink.title}
                            >
                              {topLink?.title}
                            </Link>
                          )
                        ) : (
                          topLink?.title
                        )}
                      </p>
                      {hasNested && (
                        <>
                          {nestedLinks.map((nestedLink) => {
                            const ctaOptions = {}

                            return isExternalLink(nestedLink.url) ? (
                              <a
                                key={nestedLink.title}
                                className="text-white hover:opacity-80 py-2 text-sm font-light"
                                href={parseURL(nestedLink.url)}
                                {...ctaOptions}
                                role="link"
                                tabIndex={0}
                                title={nestedLink.title}
                                {...linkAttr}
                              >
                                {nestedLink.title}
                              </a>
                            ) : (
                              <Link
                                key={nestedLink.title}
                                className="text-white hover:opacity-80 py-2 text-sm font-light"
                                href={parseURL(nestedLink.url)}
                                {...ctaOptions}
                                role="link"
                                tabIndex={0}
                                title={nestedLink.title}
                                {...linkAttr}
                              >
                                {nestedLink.title}
                              </Link>
                            )
                          })}
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}
        <div className={classNames("text-white mt-20 mb-8")} id="footer-text">
          <div className="text-xs font-light space-y-3">
            {renderRichText(data.footerText?.json)}
          </div>
        </div>

        {data.fsa && (
          <div className={classNames("mb-8 text-white")} id="footer-fsa">
            <div className="text-xs font-light space-y-3">
              {renderRichText(data.fsa?.json)}
            </div>
          </div>
        )}

        <div className="border border-white p-1 text-white" id="footer-fda">
          <div className="p-1 text-xs font-light">
            {renderRichText(data.fdaCompliance?.json)}
          </div>
        </div>
        <hr className="border-gray-700 my-8 md:my-10" />
        <div className="flex flex-col" id="footer-bottom">
          <div className="block w-full flex-wrap justify-between md:flex md:flex-col md:flex-wrap md:items-start lg:flex-row lg:items-center">
            <div>
              <p className="m-0 mb-8 text-[14px] text-white">
                {new Date().getFullYear()} Viome Life Sciences, Inc. All rights
                reserved.
              </p>
            </div>
            <div className="flex flex-col mt-6 leading-[21px] md:flex-row md:leading-[50px] md:text-right">
              {bottomLinks && (
                <>
                  {bottomLinks.map((bottomLink) =>
                    isExternalLink(bottomLink.url) ? (
                      <a
                        {...linkAttr}
                        role="link"
                        tabIndex={0}
                        key={bottomLink.title}
                        title={bottomLink.title}
                        className="inline-block pr-3 mb-2 text-white text-sm hover:opacity-80"
                        href={parseURL(bottomLink.url)}
                      >
                        {bottomLink.title}
                      </a>
                    ) : (
                      <Link
                        {...linkAttr}
                        role="link"
                        tabIndex={0}
                        key={bottomLink.title}
                        title={bottomLink.title}
                        className="inline-block pr-3 mb-2 text-white text-sm hover:opacity-80"
                        href={parseURL(bottomLink.url)}
                      >
                        {bottomLink.title}
                      </Link>
                    )
                  )}
                </>
              )}
              <a
                className={classNames(
                  "inline-block pr-3 mb-2 text-white h-5 whitespace-nowrap"
                )}
                id="preferenceCenterLink"
                href="#"
                onClick={launchKetch}
              >
                {KETCH_CONFIG.privacyText.default}
              </a>
              <a
                className={classNames(
                  "inline-block pr-3 mb-2 text-white h-5 accessibility-button cursor-pointer hover:opacity-80"
                )}
                id="accessibilityButton"
                tabIndex={0}
                role="button"
                aria-label="Open accessibility menu"
              >
                <div className={classNames("h-8 w-8")}>
                  <Image
                    src="https://strapi.azure.viome.com/viome-strapi/uploads/userway_icon_8d84185d11.svg"
                    alt="userWay accessibility icon"
                    loading="lazy"
                    width={32}
                    height={32}
                    quality={85}
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
