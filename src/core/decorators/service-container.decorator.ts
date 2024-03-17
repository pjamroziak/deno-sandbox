import { setConstructorMetadataByKey } from "../../utils/index.ts";
import { SERVICE_CONTAINER_META_KEY } from "../constants.ts";
import { Constructor } from "../types.ts";

export function ServiceContainer(target: Constructor) {
    setConstructorMetadataByKey(target, SERVICE_CONTAINER_META_KEY, true);
}