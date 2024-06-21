import { Button, Frog } from 'frog'
import { Box,Image, Text,HStack, vars} from './ui.js'
import { devtools } from 'frog/dev'
import { serveStatic } from 'frog/serve-static'
import { neynar } from 'frog/middlewares'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/vercel'

// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// }

export const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  ui: {
    vars
  }
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
}).use(
   neynar({
      apiKey: 'NEYNAR_FROG_FM',
      features: ['interactor', 'cast'],
    }),
)

app.frame('/', (c) => {
  return c.res({
    image: (
      <Box width="100%" height="100%" alignVertical='center' alignHorizontal='center' backgroundColor="background">
        <Box grow justifyContent='center' alignItems='center'>
        <Text size="32">Welcome, {c.var.interactor?.username}</Text>
      </Box>
        <HStack gap="2" alignVertical='center' width="100%" alignHorizontal='right'>
        <Text size="24">THIS FRAME WAS BUILT AT</Text>
          <Box height="100%" alignItems='center'>
            <Image height="40" width="80" src="https://github.com/dalechyn/ethkyiv-frame-assets/blob/main/eth-kyiv.png?raw=true"/>
          </Box>
        </HStack>
      </Box>
    ),
    intents: [
      <Button>Hello!</Button>
    ],
  })
})

// @ts-ignore
const isEdgeFunction = typeof EdgeFunction !== 'undefined'
const isProduction = isEdgeFunction || import.meta.env?.MODE !== 'development'
devtools(app, isProduction ? { assetsPath: '/.frog' } : { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
