import React, { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

interface ModalProps {
  clickText: React.ReactNode
  modalContent: React.ReactNode
  className?: string
  closeOnBackdropClick?: boolean
  closeOnEscape?: boolean
  title?: string
  showHeader?: boolean
  showFooter?: boolean
  size?: "sm" | "md" | "lg" | "xl" | "full"
  variant?: "default" | "centered" | "top"
  theme?: "light" | "dark"
  headerClassName?: string
  contentClassName?: string
  zIndex?: number
}

const Modal: React.FC<ModalProps> = ({
  clickText,
  modalContent,
  className = "",
  closeOnBackdropClick = true,
  closeOnEscape = true,
  title = "Modal Title",
  showHeader = true,
  showFooter = true,
  size = "md",
  variant = "centered",
  theme = "light",
  headerClassName = "",
  contentClassName = "",
  zIndex = 72,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  // Size classes
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "md:max-w-sm max-w-none"
      case "md":
        return "max-w-none md:w-[762px]"
      case "lg":
        return "md:max-w-lg max-w-none"
      case "xl":
        return "md:max-w-xl max-w-none"
      case "full":
        return "max-w-full md:mx-4 mx-0"
      default:
        return "max-w-none md:w-[762px]"
    }
  }

  // Variant classes
  const getVariantClasses = () => {
    switch (variant) {
      case "centered":
        return "items-center justify-center md:p-4 p-0"
      case "top":
        return "items-start justify-center pt-16 px-4 pb-4 md:pt-16 md:px-4 md:pb-4 pt-0 px-0 pb-0"
      case "default":
        return "items-center justify-center p-4 md:p-4 p-0"
      default:
        return "items-center justify-center p-4 md:p-4 p-0"
    }
  }

  // Theme classes
  const getThemeClasses = () => {
    switch (theme) {
      case "dark":
        return {
          background: "bg-black",
          text: "text-white",
          textSecondary: "text-gray-300",
          border: "border-gray-700",
          closeButton: "text-gray-400 hover:text-gray-200 hover:bg-gray-800",
          headerText: "text-white",
        }
      case "light":
      default:
        return {
          background: "bg-white",
          text: "text-gray-900",
          textSecondary: "text-gray-600",
          border: "border-gray-200",
          closeButton: "text-gray-500 hover:text-gray-700 hover:bg-gray-100",
          headerText: "text-gray-900",
        }
    }
  }

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  // Handle click on the trigger element
  const handleTriggerClick = (event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    handleOpen()
  }

  // Handle click on close button
  const handleCloseClick = (event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    handleClose()
  }

  // Handle click on modal content (prevent closing when clicking inside)
  const handleModalContentClick = (event: React.MouseEvent) => {
    event.stopPropagation()
  }

  // Handle escape key press and focus management
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === "Escape" && isOpen) {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey)
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden"

      // Focus management
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )

      if (focusableElements && focusableElements.length > 0) {
        ;(focusableElements[0] as HTMLElement).focus()
      }
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, closeOnEscape])

  // Focus trap
  useEffect(() => {
    if (!isOpen) return

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return

      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )

      if (!focusableElements || focusableElements.length === 0) return

      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus()
          event.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus()
          event.preventDefault()
        }
      }
    }

    document.addEventListener("keydown", handleTabKey)
    return () => document.removeEventListener("keydown", handleTabKey)
  }, [isOpen])

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdropClick && event.target === event.currentTarget) {
      handleClose()
    }
  }

  const themeClasses = getThemeClasses()

  return (
    <>
      {/* Clickable element */}
      <div
        onClick={handleTriggerClick}
        className={`cursor-pointer ${className}`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            handleOpen()
          }
        }}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        {clickText}
      </div>

      {/* Modal overlay and content */}
      {isOpen &&
        createPortal(
          <div
            className={`fixed inset-0 flex ${getVariantClasses()}`}
            style={{ zIndex: zIndex }}
          >
            <div
              className="absolute inset-0 transition-opacity duration-300"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.8)", zIndex: zIndex - 1 }}
              onClick={handleBackdropClick}
            />
            <div
              ref={modalRef}
              className={`relative ${contentClassName || themeClasses.background} shadow-2xl w-full ${getSizeClasses()} md:max-h-[90vh] max-h-full md:h-auto h-full overflow-hidden transform transition-all duration-300 scale-100 p-5`}
              style={{ zIndex: zIndex }}
              onClick={handleModalContentClick}
              role="dialog"
              aria-modal="true"
              aria-labelledby={showHeader && title ? "modal-title" : undefined}
              aria-describedby="modal-description"
            >
              <button
                onClick={handleCloseClick}
                className={`absolute top-4 right-4 w-8 h-8 flex items-center justify-center ${themeClasses.closeButton} rounded-full transition-all duration-200 z-30`}
                aria-label="Close modal"
                type="button"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              {showHeader && title && (
                <div className={`py-4 border-b ${themeClasses.border} mb-4 ${headerClassName}`}>
                  <h2
                    id="modal-title"
                    className={`text-lg font-semibold ${themeClasses.headerText} flex items-center`}
                  >
                    <span className="flex-1">{title}</span>
                  </h2>
                </div>
              )}
              <div
                id="modal-description"
                className={`overflow-y-auto ${
                  showHeader && title && showFooter
                    ? "md:max-h-[calc(90vh-140px)] max-h-[calc(100vh-140px)]"
                    : (showHeader && title) || showFooter
                      ? "md:max-h-[calc(90vh-100px)] max-h-[calc(100vh-100px)]"
                      : "md:max-h-[calc(90vh-60px)] max-h-[calc(100vh-60px)]"
                }`}
              >
                {modalContent}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}

export default Modal

