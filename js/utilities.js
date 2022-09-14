// load phones by fetch method
const loadPhones = (searchFieldValue, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchFieldValue}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhones(data.data, dataLimit))
}

// display phone inside the phones container
const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';

    const showMorePhones = document.getElementById('show-more');
    if ((dataLimit && phones.length) > 10) {
        phones = phones.slice(0, 10)
        showMorePhones.classList.remove('d-none');
    }
    else {
        showMorePhones.classList.add('d-none');
    }

    // not found message
    const noFoundMessage = document.getElementById('no-found-message');
    if (phones.length === 0) {
        noFoundMessage.classList.remove('d-none');
    }
    else {
        noFoundMessage.classList.add('d-none');
    }

    phones.forEach(phone => {
        //  destructure phone object
        const { image, phone_name, brand, slug } = phone;

        // create a phone div 
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
            <div class="card p-3">
                <img src="${image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone_name}</h5>
                    <p class="card-text">Brand: ${brand}</p>
                   
                    <button onclick="loadPhoneDetails('${slug}')" type="button" class="btn btn-primary px-4" data-bs-toggle="modal" data-bs-target="#exampleModal">Details </button>
                </div>
            </div>
        `
        phonesContainer.appendChild(phoneDiv);
        // console.log(slug)
    })

    loadingSpiner(false)
}

// load phone details
const loadPhoneDetails = (phoneId) => {
    const url = ` https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data))
    // console.log(url)
}

// display phone details by open a modal
const displayPhoneDetails = (phone) => {
    // destructure phone object
    const { name, mainFeatures, releaseDate } = phone;
    const { displaySize, memory, storage } = mainFeatures;

    const phoneDetailsContainer = document.getElementById('phone-details-container');
    phoneDetailsContainer.innerHTML = `
        <h5 class="modal-title text-center" id="exampleModalLabel">${name}</h5>
        <p>Display Size: ${displaySize}</p>
        <p>Memory: ${memory}</p>
        <p>storage: ${storage}</p>
        <p>Release Date: ${releaseDate ? releaseDate : 'No Found Release Date'}</p>
    `
    console.log(releaseDate)
}

// spinner loader
const loadingSpiner = (isLoading) => {
    const spinnerLoader = document.getElementById('loading-spiner');
    if (isLoading === true) {
        spinnerLoader.classList.remove('d-none');
    }
    else {
        spinnerLoader.classList.add('d-none')
    }
}

// add click event listener for the search btn
document.getElementById('search-btn').addEventListener('click', function () {
    loadingSpiner(true);

    const searchField = document.getElementById('search-field');
    const searchFieldValue = searchField.value;
    loadPhones(searchFieldValue, 10);
})

// add keypress event listener for the search field
document.getElementById('search-field').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        loadingSpiner(true);

        const searchField = document.getElementById('search-field');
        const searchFieldValue = searchField.value;
        loadPhones(searchFieldValue, 10);
    }

})

// add click event listener for show more phone btn
document.getElementById('show-more-phones').addEventListener('click', function () {
    loadingSpiner(true);

    const searchField = document.getElementById('search-field');
    const searchFieldValue = searchField.value;
    loadPhones(searchFieldValue);

})

// loadPhones('apple');
