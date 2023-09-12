const fastify = require("fastify")
const DatabaseMemory = require("./DatabaseMemory")

const app = fastify()

const database = new DatabaseMemory

app.post("/videos", (req, reply) => {
    const {title, description, duration} = req.body
    
    database.create({
        title,
        description,
        duration
    })

    return reply.status(201).send()
})

app.get("/videos", (req, reply) => {
    const search = req.query.search
    
    const videos = database.list(search)

    return reply.send(videos)
})

app.put("/videos/:id", (req, reply) => {
    const {id} = req.params
    const {title, description, duration} = req.body

    const idVideo = database.list().find((item) => {
        return item.id == id
    })
    
    if (!idVideo) {
        return reply.status(404).send({"error.message": "ID Not found"})
    }

    database.update(id, {
        title,
        description,
        duration
    })

    return reply.status(204).send()
})

app.delete("/videos/:id", (req, reply) => {
    const {id} = req.params

    const idVideo = database.list().find((item) => {
        return item.id == id
    })
    
    if (!idVideo) {
        return reply.status(404).send({"error.message": "ID Not found"})
    }

    database.delete(id)
    
    return reply.status(204).send()
})

app.listen({
    port: 3000
})