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

submitButton.addEventListener('click', () => {
    const postContent = input.value.trim();
    if (postContent !== '' ) {
        console.log('User wrote:' + postContent);
        // Create new div element with class = post for new post:
        const newPost = document.createElement('div');
        newPost.classList.add('post');
        newPost.innerHTML = postContent;
        postList.appendChild(newPost)
        // Clear the postcontent value
        input.value = '';
        // close post window
        postWindow.style.display = 'none';
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