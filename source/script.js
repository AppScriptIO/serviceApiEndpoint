import { createHttpServer } from './utility/server.js'
import { graphMiddlewareImmediatelyExecuted, graphMiddlewareAggregation } from './middleware/graph.js'
import serviceConfig from './configuration/configuration.js'

export async function initialize({ targetProjectConfig, port = serviceConfig.port }) {
  let middlewareArray = [
    async (context, next) => {
      context.set('connection', 'keep-alive')
      context.set('Access-Control-Allow-Origin', '*')
      await context.req.setTimeout(30000)
      await next()
    },
    await graphMiddlewareImmediatelyExecuted({ targetProjectConfig }),
    async (context, next) => console.log('last middleware reached.'),
  ]

  // create http server
  await createHttpServer({ label: serviceConfig.serviceName, port: port, middlewareArray })
}
