const commentWindow = () => {
    const window = document.createElement('div');
    window.classList.add('modal');
    const form = document.createElement('form');
    const commentInput = document.createElement('textarea');
    commentInput.setAttribute('placeholder', 'Type your comment...');

    const okButton = document.createElement('button');
    okButton.innerHTML = 'OK';

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const commentText = commentInput.value.trim();
        console.log('Comment: ' + commentText);
        window.remove()
    })
    form.appendChild(commentInput);
    form.appendChild(okButton);
    window.appendChild(form);
    document.body.appendChild(window)
}