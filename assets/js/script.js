// Global variables and constants=
const address = "https://api.pexels.com/v1/search?query=cats"
const addressSecondary = "https://api.pexels.com/v1/search?query=dogs"
const apiKey = "uhWpBzL0lUOncI509T4FSwMr6IFPiOwQOBBhE8Jb20uhucGnT8lPVsKr"
let row = document.querySelectorAll('.row')[1];
const loadImagesBtn = document.querySelectorAll('.btn')[0];
const secondaryImagesBtn = document.querySelectorAll('.btn')[1];
let picturesArray = [];




loadImagesBtn.addEventListener('click', () => {
    getData(address, {
        method: "GET",
        headers: {
            Authorization: apiKey
        }
    })
    // Fill page with cards
    row.innerHTML = ''
    picturesArray.forEach((item) => {
        let pictureUrl = item.src['medium'];
        let description = item.alt;
        createCard(row, pictureUrl, description)
    });
    // let newCard = createCard(row);
    // Number the cards depending on how many pictures we have
    
})
secondaryImagesBtn.addEventListener('click', () => {
    getData(addressSecondary, {
        method: "GET",
        headers: {
            Authorization: apiKey
        }
    })
    // Fill page with cards
    row.innerHTML = ''
    picturesArray.forEach((item) => {
        let pictureUrl = item.src['medium'];
        let description = item.alt;
        createCard(row, pictureUrl, description)
    });
    // let newCard = createCard(row);
    // Number the cards depending on how many pictures we have

})




function createCard(element, url, alt) {
    element.innerHTML += `
                    <div class="col-md-4">
                        <div class="card mb-4 shadow-sm">
                            <img class="card-img-top" src="${url}" alt="${alt}">
                            <div class="card-body">
                                <h5 class="card-title">${alt}</h5>
                                <p class="card-text">
                                </p>
                                <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-sm btn-outline-secondary">
                                    View
                                    </button>
                                    <button type="button" class="btn btn-sm btn-outline-secondary" data-id="hide">
                                    Hide
                                    </button>
                                </div>
                                <small class="text-muted">9 mins</small>
                                </div>
                            </div>
                        </div>
                    </div>`
}

async function getData(url, options) {
    const response = await fetch(url, options);
    const data = await response.json();
    downloadPictures(data)
}

function downloadPictures(pictures) {
    picturesArray.splice(0, picturesArray.length)
    for (let i = 0; i < pictures.photos.length; i++) {
        let picture = pictures.photos[i];
        picturesArray.push(picture);
    }
}


