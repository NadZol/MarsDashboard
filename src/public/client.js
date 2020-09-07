let store = {
    user: { name: "Student" },
    apod: '',
    photos: '',
    info: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
    rover: 'Curiosity',
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
                <select id="rovers" onchange="chooseRover()">
                    <option value="curiosity" ${selectedRover('Curiosity')}>Curiosity</option>
                    <option value="opportunity" ${selectedRover('Opportunity')}>Opportunity</option>
                    <option value="spirit" ${selectedRover('Spirit')}>Spirit</option>
                </select>
                ${RoverName(store.rover)}
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

function chooseRover() {
    const x = document.getElementById("rovers");
    const rover = x.options[x.selectedIndex].text;
    updateStore(store, { rover });
}

function selectedRover(rover) {
    if (rover === store.rover) {
        return "selected";
    }
    return null;
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

const RoverName = (rover) => {
    if (rover) {
        return `
            <h1>Rover ${rover}!</h1>
        `
    }

    return `
        <h1>No Rover selected</h1>
    `
}

// ------------------------------------------------------  Data CALLS

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
    return RoverPhotosHtml(obj);
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

    return RoverInfoHtml(obj);
}

// ------------------------------------------------------  UI CALLS

const RoverPhotosHtml = (obj) => {
    if (obj.data === undefined) {
        return null;
    }
    let i;
    let s = "";
    for (i = 0; i < obj.data.photos.length; i++) {
        console.log(obj.data.photos[i]);
        s = s + `<img src=${obj.data.photos[i].img_src}>`;

    }
    return s;
}

const RoverInfoHtml = (obj) => {
    //console.log(obj.photos.photo_manifest.launch_date);
    if (obj.data === undefined) {
        return null;
    }
    return (`
        <p>${obj.data.photo_manifest.name}</p>
        <p>${obj.data.photo_manifest.launch_date}</p>
        <p>${obj.data.photo_manifest.landing_date}</p>
    `)
}

// ------------------------------------------------------  API CALLS

const getPhotos = async (state) => {
    fetch(`http://localhost:3000/photos`)
        .then(res => res.json())
        .then(photos => updateStore(store, { photos }))
}

const getInfo = async (state) => {
    fetch(`http://localhost:3000/info`)
        .then(res => res.json())
        .then(info => updateStore(store, { info }))
}
