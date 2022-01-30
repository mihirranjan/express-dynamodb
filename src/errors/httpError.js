export class HTTPError extends Error {
    constructor(message, code) {
        super(message);
        this.name = "HTTPError";
        this.code = code;
    }
}
