import { setMetadata } from "../../utils/index.ts";
import { ClassType } from "../constants.ts";
import { Constructor } from "../types.ts";

export function Controller(target: Constructor) {
    setMetadata(target.prototype, ClassType.Controller, true);
}
