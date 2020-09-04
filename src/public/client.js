let store = {
    user: { name: "Student" },
    apod: '',
    photos: '',
    info: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
}

// add our markup to the page
const root = document.getElementById('root')

const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    render(root, store)
}

const render = async (root, state) => {
    root.innerHTML = App(state)
}


// create content
const App = (state) => {
    let { rovers, photos, info, apod } = state

    return `
        <header></header>
        <main>
            ${Greeting(store.user.name)}
            <section>
                <h3>Put things on the page!</h3>
                <p>Here is an example section.</p>
                <p>
                    One of the most popular websites at NASA is the Astronomy Picture of the Day. In fact, this website is one of
                    the most popular websites across all federal agencies. It has the popular appeal of a Justin Bieber video.
                    This endpoint structures the APOD imagery and associated metadata so that it can be repurposed for other
                    applications. In addition, if the concept_tags parameter is set to True, then keywords derived from the image
                    explanation are returned. These keywords could be used as auto-generated hashtags for twitter or instagram feeds;
                    but generally help with discoverability of relevant imagery.
                </p>
                ${RoverInfo(info)}
                ${RoverPhotos(photos)}
            </section>
        </main>
        <footer></footer>
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = (name) => {
    if (name) {
        return `
            <h1>Welcome, ${name}!</h1>
        `
    }

    return `
        <h1>Hello!</h1>
    `
}

// ------------------------------------------------------  Data CALLS

// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (apod) => {

    // If image does not already exist, or it is not from today -- request it again
    const today = new Date()
    const photodate = new Date(apod.date)
    console.log(photodate.getDate(), today.getDate());

    console.log(photodate.getDate() === today.getDate());
    if (!apod || apod.date === today.getDate()) {
        getImageOfTheDay(store)
    }

    //return ImageOfTheDayHtml(apod);
    return DummyHtml(apod);
}

const RoverPhotos = (obj) => {

    // If image does not already exist, or it is not from today -- request it again
    const today = new Date()
    const photodate = new Date(obj.date)
    console.log(photodate.getDate(), today.getDate());

    console.log(photodate.getDate() === today.getDate());
    if (!obj || obj.date === today.getDate()) {
        getPhotos(store)
    }

    //return ImageOfTheDayHtml(apod);
    return DummyHtml(obj);
}

const RoverInfo = (obj) => {

    // If image does not already exist, or it is not from today -- request it again
    const today = new Date()
    const photodate = new Date(obj.date)
    console.log(photodate.getDate(), today.getDate());

    console.log(photodate.getDate() === today.getDate());
    if (!obj || obj.date === today.getDate()) {
        getInfo(store)
    }

    //return ImageOfTheDayHtml(apod);
    return DummyHtml(obj);
}

// ------------------------------------------------------  UI CALLS

const ImageOfTheDayHtml = (apod) => {
    // check if the photo of the day is actually type video!
    if (apod.media_type === "video") {
        return (`
            <p>See today's featured video <a href="${apod.url}">here</a></p>
            <p>${apod.title}</p>
            <p>${apod.explanation}</p>
        `)
    } else {
        return (`
            <img src="${apod.image.url}" height="350px" width="100%" />
            <p>${apod.image.explanation}</p>
        `)
    }
}

const DummyHtml = (obj) => {
    return (`
        <p>${JSON.stringify(obj)}</p>
    `)
}

// ------------------------------------------------------  API CALLS

// Example API call
const getImageOfTheDay = (state) => {
    let { apod } = state

    fetch(`http://localhost:3000/apod`)
        .then(res => res.json())
        .then(apod => updateStore(store, { apod }))

    return data
}

const getPhotos = (state) => {
    let { photos } = state

    fetch(`http://localhost:3000/photos`)
        .then(res => res.json())
        .then(photos => updateStore(store, { photos }))

    return data
}

const getInfo = (state) => {
    let { info } = state

    fetch(`http://localhost:3000/info`)
        .then(res => res.json())
        .then(info => updateStore(store, { info }))

    return data
}
