import type { Metadata } from 'next'

import StyledComponentsRegistry from 'lib/StyledComponentsRegistry'
import { GlobalStylesProvider } from 'providers/GlobalStylesProvider'
import ProgressBarProvider from 'providers/ProgressBarProvider'
import NextAuthSessionProvider from 'providers/NextAuthSessionProvider'

export const metadata: Metadata = {
  title: 'Won Games',
  description: 'Won Games is the e-commerce games page'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <NextAuthSessionProvider>
          <StyledComponentsRegistry>
            <GlobalStylesProvider>
              <ProgressBarProvider>{children}</ProgressBarProvider>
            </GlobalStylesProvider>
          </StyledComponentsRegistry>
        </NextAuthSessionProvider>
      </body>
    </html>
  )
}
