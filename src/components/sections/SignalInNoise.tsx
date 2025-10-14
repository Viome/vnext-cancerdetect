import React from 'react'
import Image from 'next/image'

export interface SignalInNoiseProps {
    sectionId?: string
    title: string
    description: string
    illustrationImage: string
    illustrationAlt?: string
}

export default function SignalInNoise({
    sectionId = 'signal-in-noise',
    title,
    description,
    illustrationImage,
    illustrationAlt = 'Signal in noise illustration'
}: SignalInNoiseProps) {
    return (
        <div id={sectionId} className="flex flex-col">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16 lg:mb-24">
                <div>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-twk-lausanne font-medium leading-tight text-white">
                        {title}
                    </h2>
                </div>

                <div className="flex items-center">
                    <p className="text-base sm:text-lg lg:text-xl font-twk-lausanne leading-relaxed text-white">
                        {description}
                    </p>
                </div>
            </div>
            <Image
                src={illustrationImage}
                alt={illustrationAlt}
                fill
                objectFit="contain"
                objectPosition="center"
                className="w-full h-full"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
            />
        </div>
    )
}

