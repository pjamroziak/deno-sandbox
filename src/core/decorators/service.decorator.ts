import { setConstructorMetadataByKey } from "../../utils/index.ts";
import { SERVICE_META_KEY } from "../constants.ts";
import { Constructor } from "../types.ts";

export function Service(target: Constructor) {
    setConstructorMetadataByKey(target, SERVICE_META_KEY, true);
}