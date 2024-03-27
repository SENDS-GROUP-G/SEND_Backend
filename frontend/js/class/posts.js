class Post {
    #postId;
    #userId;
    #userName;
    #postContent;

    constructor(postId, userId, userName, postContent) {
        this.#postId = postId;
        this.#userId = userId;
        this.#userName = userName;
        this.#postContent = postContent;
    }

    getPostId() {
        return this.#postId
    };

    getPostUserId() {
        return this.#userId
    }

    getPostUser() {
        return this.#userName
    }

    getPostText() {
        return this.#postContent
    }
}

class Comment {
    #commentId
    #postId
    #userId
    #commentText

    constructor(commentId, postId, userId, message) {
        this.#commentId = commentId;
        this.#postId = postId;
        this.#userId = userId;
        this.#commentText = message;
    }

    getCommentId() {
        return this.#commentId
    }

    getPostIdOfComment() {
        return this.#postId
    }

    getCommentUser() {
        return this.#userId
    }

    getCommentText() {
        return this.#commentText
    }
}

export { Post }
export { Comment }