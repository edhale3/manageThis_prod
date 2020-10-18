class ResourceNotFoundError extends Error {
    constructor(resource, id) {
        super(`Resource '${resource}' with ${id} was not found.`)
        this.code = 'not_found'
        this.resource = resource
        this.id = id
        Error.captureStackTrace(this, ResourceNotFoundError)
    }
}
module.exports = ResourceNotFoundError