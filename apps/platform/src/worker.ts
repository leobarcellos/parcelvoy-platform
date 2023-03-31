import { loadWorker } from './config/queue'
import scheduler from './config/scheduler'
import Queue from './queue'

export default class Worker {
    worker: Queue
    scheduler: any
    constructor(
        public app: import('./app').default,
    ) {
        this.worker = loadWorker(app.env.queue)
        this.scheduler = scheduler(app)
    }

    run() {
        this.worker.start()
    }

    async close() {
        await this.worker.close()
        await this.scheduler.gracefulShutdown()
    }
}
