'use client'

import { ProgressProvider as ProgressBar } from '@bprogress/next/app'

type ProgressProviderProps = {
  children: React.ReactNode
}

function ProgressBarProvider({ children }: ProgressProviderProps) {
  return (
    <>
      <ProgressBar
        startPosition={0.3}
        height="3px"
        color="#F231A5"
        shallowRouting
        options={{ showSpinner: false }}
      />
      {children}
    </>
  )
}

export default ProgressBarProvider
