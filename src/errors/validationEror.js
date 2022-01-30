import {HTTPError} from "./httpError";

export class ValidationError extends HTTPError {
    constructor(message) {
        super(message, 400);
        this.name = "ValidationError";
    }
}
