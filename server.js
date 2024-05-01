// npm init -y  , para criar packge.json, nova forma de importação de modulos
// npm install fastify micro framework gerenciamento de rotas
// extensão RestCLient e criar routes.http
// extensão dotenv

import { fastify } from "fastify"
const server = fastify()
import { DatabasePostgres } from "./database-postgres.js"

const database = new DatabasePostgres()

server.post('/videos', async (request, reply) => {
    const {title, description, duration} = request.body

    
    await database.create({
        title,
        description,
        duration,
    })

    

    return reply.status(201).send()
})

server.get('/videos', async (request)=>{
    const search = request.query.search
    const videos =  await database.list(search)
    console.log(search)
    return videos


})

server.put('/videos/:id', async (request, reply)=>{
    const videoId = request.params.id
    const {title, description, duration} = request.body
    await database.update(videoId,{
        title,
        description,
        duration,
    })
    return reply.status(204).send()

})

server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id
    await database.delete(videoId)
    return reply.status(204).send()

})






server.listen({
    port:process.env.PORT ?? 8050,

}

)

