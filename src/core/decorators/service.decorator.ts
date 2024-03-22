import { setMetadata } from "../../utils/index.ts";
import { ClassType } from "../constants.ts";
import { Constructor } from "../types.ts";

export function Service(target: Constructor) {
    setMetadata(target.prototype, ClassType.Service, true);
}
