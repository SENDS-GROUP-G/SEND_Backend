import { Post } from "./posts.js";
//import { Comment } from "./posts.js"

class Posts {
    #posts = [];
    #backend_url = '';

    constructor(url) {
        this.#backend_url = url;
    }

    getPosts = () => {
        return new Promise(async(resolve, reject) => {
            fetch(this.#backend_url)
            .then((response) => response.json())
            .then((json) => {
                this.#readJson(json);
                resolve(this.#posts);
            }).catch((error) => {
                reject(error)
            });
        })
    }

    #readJson = (postsAsJson) => {
        postsAsJson.forEach(node => {
            const post = new Post(node.postid, node.username, node.postcontent);
            this.#posts.push(post);
        })
    };
}

export { Posts };
