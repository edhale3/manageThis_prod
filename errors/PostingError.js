class PostingError extends Error {
    constructor(resource, body, message) {
        super(`Error posting to '${resource}'.`)
        this.code = 'invalid'
        this.response = message
        this.resource = resource
        this.body = body
        Error.captureStackTrace(this, PostingError)
    }
}
module.exports = PostingError