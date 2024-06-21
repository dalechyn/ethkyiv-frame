import { createSystem } from 'frog/ui'

export const { Box, Heading, Text, HStack, Image, VStack, vars } = createSystem({
  colors: {
    background: '#080621',
    text: '#ffffff'
  },
  fonts: {
    default: [
      {
        name: 'Bebas Neue',
        source: 'google',
      }
    ]
  }
})
