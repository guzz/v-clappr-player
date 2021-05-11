import VClapprTheme from './VClapprTheme';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: 'centered',
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: ['Geting Started', 'Usage', 'Theming', 'Formats', 'API', 'Plugins', ['Instructions', 'Built in Plugins']]
    }
  },
  docs: {
    theme: VClapprTheme
  }
}