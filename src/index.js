//Global Variables to get accesed everywhere in the app
const sectionPostEl = document.querySelector('section.image-container')

const state = {

    images: [],
    comments: []

}

//--------------------------------SERVER FUNCTIONS----------------------------------------------
// getImagesDataFromServer :: () => Promise<todos: array>
function getImagesDataFromServer() {

    return fetch('http://localhost:3000/images').then(function (response) 
    {
        return response.json()
    })

}

//getCommentsDataFromServer :: () => Promise<todos: array>
function getCommentsDataFromServer() {

    return fetch('http://localhost:3000/comments').then(function (response) 
    {
        return response.json()
    })

}

// function addCommentUpdateToServer(commentsArrayParam) {

//     for (const element of commentsArrayParam) {

//         // if (element.id === state.comments.length) {
//             fetch(`http://localhost:3000/comments/${element.id}`, {
//             method: 'POST' })
//         // }

//     }

// }

//---------------------------------HELPER FUNCTIONS-------------------------------------------------
function addCommentForm(formParam, formValueParam) {

    formParam.comments.push({
        id: state.comments.length += 1,
        content: formValueParam,
        imageId: formParam.id
    })

    // state.comments.push({
    //     id: state.comments.length += 1,
    //     content: formValueParam,
    //     imageId: formParam.id
    // })

    // addCommentUpdateToServer(formParam.comments)

    render()


}

//---------------------------------RENDER FUNCTIONS--------------------------------------------------
function renderPost(ImagesParam) {

    //we destroy everything then recreate each time it renders the page and state changes
    sectionPostEl.innerHTML = ''
    renderPostForm()

    //recreate
    for (const element of ImagesParam) {
        renderPostItem(element)
    }

}

function renderPostItem(postParam) {

    //we create the post card by js from template
    const articleEl = document.createElement('article')
    articleEl.setAttribute('class', 'image-card')

    const h2El = document.createElement('h2')
    h2El.setAttribute('class', 'title')
    h2El.textContent = postParam.title

    const imgEl = document.createElement('img')
    imgEl.setAttribute('class', 'image')
    imgEl.setAttribute('src', postParam.image)

    const divEl = document.createElement('div')
    divEl.setAttribute('class', 'likes-section')

    const spanEl = document.createElement('span')
    spanEl.setAttribute('class', 'likes')
    spanEl.textContent = postParam.likes

    const btnEl = document.createElement('button')
    btnEl.setAttribute('class', 'like-button')
    btnEl.textContent = '♥'

    const formEl = document.createElement('form')
    formEl.setAttribute('class', 'form-section')

    const inputEl = document.createElement('input')
    inputEl.setAttribute('class', 'input-element')
    inputEl.setAttribute('name', 'comment')
    inputEl.setAttribute('required', 'true')
    inputEl.setAttribute('type', 'text')
    inputEl.placeholder = 'Add a comment ....'

    const btnFormEl = document.createElement('button')
    btnFormEl.setAttribute('class', 'btn-element')
    btnFormEl.textContent = 'Post'

    const ulEl = document.createElement('ul')
    ulEl.setAttribute('class', 'comments')

    //this fixed problem for comment creating dynamic li creation
    for (const comment of postParam.comments) {
        const liEl = document.createElement('li')
        liEl.textContent = comment.content
        ulEl.append(liEl)
    }

    //appending things
    formEl.append(inputEl, btnFormEl)
    divEl.append(spanEl, btnEl)
    articleEl.append(h2El, imgEl, divEl, ulEl, formEl)
    sectionPostEl.append(articleEl)

    let inputValue

    //events listeners
    formEl.addEventListener('submit', function(event) {

        event.preventDefault()
        inputValue = formEl.comment.value
        addCommentForm(postParam, inputValue)
        
      })

}

function renderPostForm() {
    
    //create the post header form to add things, update state and server rerender
    const divEl = document.createElement('div')
    divEl.setAttribute('class', 'post-form')

    const h3El = document.createElement('h3')
    h3El.setAttribute('class', 'post-form-header')
    h3El.textContent = 'New Post'

    const formEl = document.createElement('form')
    formEl.setAttribute('class', 'post-form-el')

    const inputEl1 = document.createElement('input')
    inputEl1.setAttribute('class', 'post-form-input input-1')
    inputEl1.setAttribute('name', 'title')
    inputEl1.setAttribute('required', 'true')
    inputEl1.setAttribute('type', 'text')
    inputEl1.placeholder = 'Add a title: '

    const inputEl2 = document.createElement('input')
    inputEl2.setAttribute('class', 'post-form-input input-2')
    inputEl2.setAttribute('name', 'likes')
    inputEl2.setAttribute('required', 'true')
    inputEl2.setAttribute('type', 'text')
    inputEl2.placeholder = 'Add how many likes: '

    const inputEl3 = document.createElement('input')
    inputEl3.setAttribute('class', 'post-form-input input-3')
    inputEl3.setAttribute('name', 'comment')
    inputEl3.setAttribute('required', 'true')
    inputEl3.setAttribute('type', 'text')
    inputEl3.placeholder = 'Add a comment: '

    const inputEl4 = document.createElement('input')
    inputEl4.setAttribute('class', 'post-form-input input-4')
    inputEl4.setAttribute('name', 'image')
    inputEl4.setAttribute('required', 'true')
    inputEl4.setAttribute('type', 'text')
    inputEl4.placeholder = 'Add an image url: '

    const btnEl = document.createElement('button')
    btnEl.setAttribute('class', 'post-form-btn')
    btnEl.textContent = 'Post'

    formEl.append(inputEl1, inputEl2, inputEl3, inputEl4, btnEl)
    divEl.append(h3El, formEl)
    sectionPostEl.append(divEl)

}

function render() {

    console.log('rendering with state:', state)
    renderPost(state.images)

}

getImagesDataFromServer().then(function (imagesFromServer) {
    state.images = imagesFromServer
    render()
})

getCommentsDataFromServer().then(function (commentsFromServer) {
    state.comments = commentsFromServer
    render()
})

// This happens before the fetch is done and fetch requeires some ms to load the data
render()