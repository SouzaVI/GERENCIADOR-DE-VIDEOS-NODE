import { randomUUID } from "node:crypto"

export class DatabaseMemory{
    #videos = new Map()

    create(video){
        const videoId = randomUUID()
        this.#videos.set(videoId, video)

    }

    update(id, video) {
        this.#videos.set(id, video)

    }

    delete(id) {
        
        this.#videos.delete(id)
    }

    list(search) {
        return Array.from(this.#videos.entries())
        .map((videoArray) => { // como estou utilizando, preciso converter em array, posteriomente acesso a infrmção do id pelo map
            const id = videoArray[0]
            const data = videoArray[1]
            
            return {
                id,
                ...data, // ... tras a informação do objeto data spride
            }
    })
    .filter(video => {
        if (search){
            return video.title.includes(search)
    }

    return true
    })
    }
}    