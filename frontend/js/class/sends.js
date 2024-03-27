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

    addPost = (text) => {
        return new Promise(async(resolve, reject) => {
            const json = JSON.stringify({postcontent: text});
            const userid = 2;
            fetch(this.#backend_url + '/userid=' + userid.toString() + '/newpost', {
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: json
            }).then((response) => response.json())
            .then((json) => {
                console.log(json)
                resolve(this.#addToArray(json.posid, json.userid, json.username, text))
            },(error) => {
                reject(error)
            })
        })
    }

    #readJson = (postsAsJson) => {
        postsAsJson.forEach(node => {
            const post = new Post(node.postid, node.userid, node.username, node.postcontent);
            this.#posts.push(post);
        })
    };

    #addToArray = (postid, userid, username, postcontent) => {
        const post = new Post(postid, userid, username, postcontent)
        this.#posts.push(post)
        return post
    }

}

export { Posts };
