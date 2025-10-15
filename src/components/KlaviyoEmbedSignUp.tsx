"use client"

import React, { useEffect, useState } from "react"

interface EmbedFormProps {
  formId: string
}

const EmbedSignUpForm: React.FC<EmbedFormProps> = ({ formId }) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return <div className={`klaviyo-form-${formId}`} />
}

export default EmbedSignUpForm
