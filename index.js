"use strict"
const titleInput = document.getElementById("post-title")
const bodyInput = document.getElementById("post-body")
const form = document.getElementById("new-post")
let postsArray = []

function renderPosts() {
    let html = ""
    for (let post of postsArray) {
        html += `
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <hr/>
            `
    }
    document.getElementById("blog-list").innerHTML = html


    // document.getElementById("blog-list").innerHTML =
    // `<h3>${post.title}</h3>
    // <p>${post.body}</p>
    // <hr/>
    // ${document.getElementById("blog-list").innerHTML}`


}

fetch('https://apis.scrimba.com/jsonplaceholder/posts')
    .then(response => response.json()) //json into JS object
    .then(data => {
        postsArray = data.slice(0, 5)
        renderPosts()

        //postsArray = data.slice(0, 5)
        // let html = ""
        // for (let post of postsArr) {
        //     html +=
        //         `<h3>${post.title}</h3>
        //     <p>${post.body}</p>
        //     <hr/>`
        // }
        // // console.log(html)
        // document.getElementById("blog-list").innerHTML = html


    })

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const postTitle = titleInput.value
    const postBody = bodyInput.value
    const data = {
        title: postTitle,
        body: postBody
    }
    //console.log(data)
    const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }

    }
    fetch('https://apis.scrimba.com/jsonplaceholder/posts', options)
        // {
        //     method: "POST",
        //     body: JSON.stringify(data),
        //     headers: {
        //         'Content-Type': 'appliacation/json'
        //     }

        // })
        .then(res => res.json())
        .then(post => {
            postsArray.unshift(post)
            renderPosts()

            //form.reset()
            titleInput.value = ""
            bodyInput.value = ""

            // document.getElementById("blog-list").innerHTML =
            //     `<h3>${post.title}</h3>
            //     <p>${post.body}</p>
            //     <hr/>
            //     ${document.getElementById("blog-list").innerHTML}`
        })

})