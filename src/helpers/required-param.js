import { RequiredParameterError } from "./error";

export default function requiredParam(param) {
    throw new RequiredParameterError(param);
}