const BACKEND_ROOT_URL = 'http://localhost:3001'

const postButton = document.querySelector('#postButton')
//const postList = document.querySelector('ul')
const postWindow = document.querySelector('#postWindow')
const closeButton = document.querySelector('.close')
const submitButton = document.querySelector('#submitButton')
const input = document.querySelector('#postContent')
const postList = document.querySelector('#postList') 

// Open postwindow with post button
postButton.addEventListener('click', () => {
   /* const postContent = prompt('Write your post:')
    if (postContent.trim() !== '') {
        console.log('User wrote: ', postContent)
        const newPost = document.createElement('li');
        newPost.innerHTML = postContent
        postList.appendChild(newPost)
    } */
    postWindow.style.display = 'block';
})

// Close postwindow with x button
closeButton.addEventListener('click', () => {
    postWindow.style.display = 'none';
})

const renderPost = (postContent) => {
    // Create new div element with class = post for new post:
    const div = document.createElement('div')
    div.classList.add('post')
    div.classList.add('container-fluid')
    div.innerHTML = postContent;
    postList.appendChild(div)
}

const getPosts = async () => {
    try {
        const response = await fetch(BACKEND_ROOT_URL)
        const json = await response.json()
        json.forEach(posts => {
            renderPost(posts.postcontent)
        })
    } catch (error) {
        alert("Error retrieving task " + error.message)
    }
}

const savePost = async (posts) => {
    try {
        const json = JSON.stringify({postcontent : posts})
        const response = await fetch(BACKEND_ROOT_URL + '/newpost',{
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
        savePost(postContent).then((json) => {
            console.log('User wrote:' + postContent);
            renderPost(postContent)
            // Clear the postcontent value
            input.value = '';
            // close post window
            postWindow.style.display = 'none';
        })
    }
})

/* <button id="postButton">Post</button>
        <div id="postWindow" class="modal">
            <div class="modal-content">
              <span class="close">&times;</span>
              <textarea id="postContent" rows="4" cols="50" placeholder="Write your post..."></textarea>
              <button id="submitButton">Submit</button>
            </div>
        </div>
*/

getPosts()