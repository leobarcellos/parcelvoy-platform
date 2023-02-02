import Router from '@koa/router'
import { loadProvider } from '../ProviderRepository'
import LocalWebhookProvider from './LocalWebhookProvider'
import LoggerWebhookProvider from './LoggerWebhookProvider'
import WebhookChannel from './WebhookChannel'
import { WebhookProvider, WebhookProviderName } from './WebhookProvider'

const typeMap = {
    local: LocalWebhookProvider,
    logger: LoggerWebhookProvider,
}

export const providerMap = (record: { name: WebhookProviderName }): WebhookProvider => {
    return typeMap[record.name].fromJson(record)
}

export const loadWebhookChannel = async (providerId: number, projectId: number): Promise<WebhookChannel | undefined> => {
    const provider = await loadProvider(providerId, projectId, providerMap)
    if (!provider) return
    return new WebhookChannel(provider)
}

export const loadWebhookControllers = async (router: Router) => {
    for (const type of Object.values(typeMap)) {
        const controllers = type.controllers()
        router.use(
            controllers.routes(),
            controllers.allowedMethods(),
        )
    }
}
