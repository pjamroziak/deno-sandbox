import { Logger as OpticLogger} from "https://deno.land/x/optic@1.3.11/logger/logger.ts";
import { LoggerService } from "./logger-service.ts";

export class Logger {
    private readonly instance: OpticLogger

    constructor(name: string) {
        this.instance = LoggerService.getLogger(name);
    }

    info(message: string, ...metadata: unknown[]) {
        this.instance.info(message, ...metadata);
    }

    error(message: string, ...metadata: unknown[]) {
        this.instance.error(message, ...metadata);
    }

    warn(message: string, ...metadata: unknown[]) {
        this.instance.warn(message, ...metadata);
    }

    debug(message: string, ...metadata: unknown[]) {
        this.instance.debug(message, ...metadata);
    }
}