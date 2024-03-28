const BACKEND_ROOT_URL = 'http://localhost:3001'
import { Posts } from "./class/sends.js"

const sends = new Posts(BACKEND_ROOT_URL)


const postButton = document.querySelector('#postButton')
const postWindow = document.querySelector('#postWindow')
const closeButton = document.querySelector('.close')
const submitButton = document.querySelector('#submitButton')
const input = document.querySelector('#postContent')
const postList = document.querySelector('#postList') 

// Open postwindow with post button
postButton.addEventListener('click', () => {
    postWindow.style.display = 'block';
})

// Close postwindow with x button
closeButton.addEventListener('click', () => {
    postWindow.style.display = 'none';
})

const renderPost = (postContent) => {
    // Get postId for each post:
    const postId = postContent.getPostId();
    const postUrl = `${BACKEND_ROOT_URL}/postid=${postId}`
    console.log('postId: ' + postId)
    console.log(postUrl)
    // Create new div element with class = post for new post:
    const div = document.createElement('div')
    div.classList.add('post')
    div.classList.add('container-fluid')
    div.innerHTML = postContent.getPostText();
    const p = document.createElement('p')
    const commentButton = document.createElement('button');
    commentButton.innerHTML = 'comment'

    // Add event for comment Button:
    commentButton.addEventListener('click', () => {
        const textArea = document.createElement('textarea');
        textArea.setAttribute('placeholder', 'Type your comment here...');
        div.appendChild(textArea)
        textArea.focus()
        const commentTextarea = textArea;
        commentTextarea.addEventListener('blur', () => {
            div.removeChild(commentTextarea)
        })
    })

    div.appendChild(p)
    div.appendChild(commentButton)
    postList.appendChild(div)
}


const renderUser = (userName) => {
    // Get userid who owns the post
    const userId = userName.getPostUserId();
    console.log('userId: ' + userId);

    const div = document.createElement('div')
    div.classList.add('username')
    div.innerHTML = userName.getPostUser();
    postList.appendChild(div)
}

const getPosts = async () => {
    /* try {
        const response = await fetch(BACKEND_ROOT_URL)
        const json = await response.json()
        json.forEach(posts => {
            renderUser(posts.username)
            renderPost(posts.postcontent)
        })
    } catch (error) {
        alert("Error retrieving task " + error.message)
    } */
    sends.getPosts().then((posts) => {
        // Get posts in reversed order:
        posts.reverse();
        posts.forEach(post => {
            renderUser(post)
            renderPost(post)
        })
    }).catch((error) => {
        alert(error)
    })
}

const savePost = async (posts) => {
    try {
        const json = JSON.stringify({postcontent : posts})
        const response = await fetch(BACKEND_ROOT_URL + '/userid=2/newpost',{
            method: 'post',
            headers: {
                'Content-Type':'application/json'
            },
            body: json
        })
        return response.json()
    } catch (error) {
        alert("Error saving post " + error.message)
    }
}

submitButton.addEventListener('click', () => {
    const postContent = input.value.trim();
    if (postContent !== '' ) {
        sends.addPost(postContent).then((post) => {
            renderUser(post)
            renderPost(post)
            input.value = '';
            postWindow.style.display = 'none';
        })
    }
})

getPosts()