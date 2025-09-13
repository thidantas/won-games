import { Preview } from '@storybook/nextjs-vite'
import { ThemeProvider } from 'styled-components'
import GlobalStyles from '../src/styles/global'
import theme from '../src/styles/theme'

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'dark',
      options: {
        light: {
          name: 'Light',
          value: theme.colors.white
        },
        dark: {
          name: 'Dark',
          value: theme.colors.mainBg
        }
      }
    }
  },
  initialGlobals: {
    backgrounds: {
      value: 'dark'
    }
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <GlobalStyles removeBg />
        <Story />
      </ThemeProvider>
    )
  ],
  tags: ['autodocs']
}

export default preview
