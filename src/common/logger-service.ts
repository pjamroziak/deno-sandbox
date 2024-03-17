import { Service } from "../core/decorators/service.decorator.ts";
import { ConsoleStream, Level } from "https://deno.land/x/optic/mod.ts";
import { TokenReplacer } from "https://deno.land/x/optic/formatters/mod.ts";
import { Logger } from "https://deno.land/x/optic@1.3.11/logger/logger.ts";

@Service
export class LoggerService {
  private static readonly stream = new ConsoleStream()
    .withMinLogLevel(Level.Debug)
    .withLogHeader(false)
    .withLogFooter(false)
    .withFormat(
      new TokenReplacer()
        .withFormat("{dateTime} [{logger}][{level}]: {msg} {metadata}")
        .withDateTimeFormat("hh:mm:ss YYYY-MM-DD")
        .withLevelPadding(0)
        .withColor(),
    );

  public static getLogger(name: string) {
    const optic = new Logger(name).addStream(this.stream);
    return optic;
  }
}
