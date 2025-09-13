import path from 'path'
import { StorybookConfig } from '@storybook/nextjs-vite'

const config: StorybookConfig = {
  staticDirs: ['../public'],
  stories: ['../src/components/**/stories.tsx'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {}
  },
  async viteFinal(config) {
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...(config.resolve?.alias || {}),
      src: path.resolve(__dirname, '../src')
    }

    return config
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript'
  }
}

export default config
