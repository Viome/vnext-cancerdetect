import CDButton from '@/components/CDButton'

interface AnnouncementBannerProps {
  title: string
  buttonText?: string
  buttonHref?: string
}

export default function AnnouncementBanner({ 
  title, 
  buttonText, 
  buttonHref 
}: AnnouncementBannerProps) {
  return (
    <div className="flex flex-col justify-center py-8 md:py-10 lg:py-20 text-white">
      <h2 
        className="text-3xl md:text-4xl lg:text-5xl font-tiempos-headline-light font-light leading-tight mb-8"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {buttonText && buttonHref && (
        <CDButton
          variant="ForwardArrow"
          theme="Dark"
          href={buttonHref}
          width='auto'
          className="text-lg w-max"
        >
          {buttonText}
        </CDButton>
      )}
    </div>
  )
}

