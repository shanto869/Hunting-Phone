
// load phones 
const loadPhones = (searchFieldValue, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchFieldValue}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhones(data.data, dataLimit))
    // console.log(searchFieldValue)
}

// display phone inside the phones container
const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';

    const showMore = document.getElementById('show-more');
    if ((dataLimit && phones.length) > 10) {
        // display 10 phones only
        phones = phones.slice(0, 10);
        // show more btn
        showMore.classList.remove('d-none');
    }
    else {
        showMore.classList.add('d-none');
    }

    // not found message 
    const noPhone = document.getElementById('no-found-message');
    if (phones.length === 0) {
        noPhone.classList.remove('d-none')
    }
    else {
        noPhone.classList.add('d-none')
    }

    // get the phone information and show phone div
    phones.forEach(phone => {
        const { brand, image, phone_name, slug } = phone;

        // create phone div
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
            <div class="card p-3">
                <img src="${image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone_name}</h5>
                    <p class="card-text">${brand}</p>

                <!-- Button trigger modal -->
                    <button onclick="phoneDetails('${slug}')" href="#" class="btn btn-primary px-4" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
                </div>
            </div>
         `
        phonesContainer.appendChild(phoneDiv)
        // console.log(phone)
    })

    // loader stop
    loadingSpiner(false);
}

// phone details load by onclick
const phoneDetails = (phoneId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data))
}

// display phone details by modal
const displayPhoneDetails = (phone) => {
    const { brand, image, name, releaseDate, mainFeatures, others } = phone;
    const { displaySize, memory, storage } = mainFeatures;
    const { Bluetooth, GPS, USB, WLAN } = others;

    const phoneDetailsDiv = document.getElementById('phone-details');
    phoneDetailsDiv.innerHTML = ` 
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">${name}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
           <p>Brand: ${brand}</p>
           <p>Display Size: ${displaySize}</p>
           <p>Memory: ${memory}</p>
           <p>Storage: ${storage}</p>
           <p>Bluetooth: ${Bluetooth}</p>
           <p>Release Date: ${releaseDate ? releaseDate : 'No Release Date Found'}</p>
        </div>
    `
    console.log(phone)
}

// loading spiner
const loadingSpiner = (isLoading) => {
    const loader = document.getElementById('loading-spiner');
    if (isLoading === true) {
        loader.classList.remove('d-none');
    }
    else {
        loader.classList.add('d-none');
    }
}

// add click event listener for search btn
document.getElementById('search-btn').addEventListener('click', function () {
    // loader starts
    loadingSpiner(true);

    const searchField = document.getElementById('search-field');
    const searchFieldValue = searchField.value;
    loadPhones(searchFieldValue, 10);
})

// add click event listener for search field
document.getElementById('search-field').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        // loader starts
        loadingSpiner(true);

        const searchField = document.getElementById('search-field');
        const searchFieldValue = searchField.value;
        loadPhones(searchFieldValue, 10);
    }
})

// add click event listener for the show more phone btn
document.getElementById('show-more-phones').addEventListener('click', function () {
    // loader starts
    loadingSpiner(true);

    const searchField = document.getElementById('search-field');
    const searchFieldValue = searchField.value;
    loadPhones(searchFieldValue);
})

// loadPhones('samsung');