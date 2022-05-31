import { environment } from "src/environments/environment";

export let generatedServiceWorkerUrl: string = null;
(function generateUrl(): void {
    // Override the real Worker with a stub
    // to return the filename, which will be generated/replaced by the worker-plugin.
    // @ts-ignore
    Worker = class WorkerStub {
        constructor(public stringUrl: string, public options?: WorkerOptions) {}
    };

    const worker = new Worker("service-worker.worker", { type: "module" }) as any;
    generatedServiceWorkerUrl = worker.stringUrl;
})();

export const serviceWorkerConfig = {
    enabled: environment.production,
    serviceWorkerUrl: generatedServiceWorkerUrl
};