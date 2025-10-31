"use client"

import React, { useEffect, useState } from "react"

interface EmbedFormProps {
  formId: string
  className?: string
}

const EmbedSignUpForm: React.FC<EmbedFormProps> = ({ formId, className }) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return <div className={`klaviyo-form-${formId} ${className || ''}`} />
}

export default EmbedSignUpForm
