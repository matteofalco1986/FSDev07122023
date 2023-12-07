// Global variables and constants=
const address = "https://api.pexels.com/v1/search?query=cats";
const addressSecondary = "https://api.pexels.com/v1/search?query=dogs";
const addresBasic = "https://api.pexels.com/v1/search?query=";
const apiKey = "uhWpBzL0lUOncI509T4FSwMr6IFPiOwQOBBhE8Jb20uhucGnT8lPVsKr";
let row = document.querySelectorAll('.row')[1];
const loadImagesBtn = document.querySelectorAll('.btn')[0];
const secondaryImagesBtn = document.querySelectorAll('.btn')[1];
const searchBtn = document.querySelector('.search');
let inputElement = document.querySelector('input');
const formElement = document.querySelector('form')
let picturesArray = [];
const wait = 1000;

formElement.addEventListener('submit', (event) => {
    event.preventDefault();
    if (inputElement.value === ''){
        window.alert('Please insert a value');
        return;
    }
    addressToSearch = addresBasic + inputElement.value;
    getData(addressToSearch, {
        method: "GET",
        headers: {
            Authorization: apiKey
        }
    })
    setTimeout(displayImages, wait);
    // setTimeout(() => {inputElement.value = ''}, wait) 
    
    
})


loadImagesBtn.addEventListener('click', () => {
    getData(address, {
        method: "GET",
        headers: {
            Authorization: apiKey
        }
    })
    setTimeout(displayImages, wait);
    
})
secondaryImagesBtn.addEventListener('click', () => {
    getData(addressSecondary, {
        method: "GET",
        headers: {
            Authorization: apiKey
        }
    })
    // Fill page with cards
    setTimeout(displayImages, wait);
})




function createCard(url, alt, id) {
    let col = document.createElement('div');
    col.classList.add('col-md-4')
    row.appendChild(col);
    let textToAdd = `
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
                            <button type="button" class="hide btn btn-sm btn-outline-secondary">
                            Hide
                            </button>
                        </div>
                        <small class="text-muted">${id}</small>
                        </div>
                    </div>
                </div>
                    `
    col.innerHTML += textToAdd;
    col
        .querySelector('.hide')
        .addEventListener('click', function () {
            this.closest('.col-md-4').classList.add('removed');
        })
}



async function getData(url, options) {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data)
    picturesArray = await downloadPictures(data);
}

async function downloadPictures(pictures) {
    picturesArray = [];
    for (let i = 0; i < pictures.photos.length; i++) {
        let picture = pictures.photos[i];
        picturesArray.push(picture);
    }
    return picturesArray;
}


async function displayImages (){
    row.innerHTML = ''
    // Iterare tra gli elementi dell'array
    console.log(picturesArray)
    picturesArray.forEach((item) => {
        createCard(item.src['medium'], item.alt, item.id);
    });
}

