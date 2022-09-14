
// load phones
const loadPhones = (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhones(data.data, dataLimit))
}

// display phone 
const displayPhones = (phones, dataLimit) => {
    // get phones container div
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.textContent = '';

    // not found message 
    const notFoundMessage = document.getElementById('not-found-message');
    if (phones.length === 0) {
        notFoundMessage.classList.remove('hidden');
    }
    else {
        notFoundMessage.classList.add('hidden');
    }

    // show all btn
    const showAllBtn = document.getElementById('show-all-btn');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAllBtn.classList.remove('hidden');
    }
    else {
        showAllBtn.classList.add('hidden');
    }

    phones.forEach(phone => {
        const { image, brand, phone_name, slug } = phone;

        const phoneDiv = document.createElement('div');
        phoneDiv.innerHTML = `  
            <div class="card w-full bg-base-100 shadow-xl">
                <figure><img src=${image} alt="Shoes" /></figure>
                <div class="card-body">
                    <h2 class="card-title">${phone_name}</h2>
                    <p>${brand}</p>
                    <div class="card-actions justify-end">
                        <label onclick="loadPhoneDetails('${slug}')" for="my-modal" class="btn  btn-primary modal-button">Show Details</label>
                    </div>
                </div>
            </div>
        `
        phonesContainer.appendChild(phoneDiv)

        // console.log(phone)
    })

    progressBar(false)
}

const loadPhoneDetails = (phoneId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data))
    // console.log(url)
}

// display phone details 
const displayPhoneDetails = (phone) => {

    const { name, brand, image, releaseDate, mainFeatures, others } = phone;
    const { chipSet, displaySize, memory, storage } = mainFeatures;
    const { Bluetooth, GPS, WLAN } = others;

    // get phone details div
    const phoneDetailsDiv = document.getElementById('phone-details');
    phoneDetailsDiv.innerHTML = `
        <h3 class="font-bold text-lg">${name}</h3>
        <p><span class="font-bold">Brand: </span>${brand}</p>
        <p><span class="font-bold">Display Size: </span>${mainFeatures ? displaySize : 'Not Found'}</p>
        <p><span class="font-bold">Storage: </span>${mainFeatures ? storage : 'Not Found'}</p>
        <p><span class="font-bold">Memory: </span>${mainFeatures ? memory : 'Not Found'}</p>
        <p><span class="font-bold">Bluetooth: </span>${Bluetooth}</p>
        <p><span class="font-bold">GPS: </span>${GPS}</p>
        <p><span class="font-bold">WLAN: </span>${WLAN}</p>
        <p><span class="font-bold">ChipSet: </span>${mainFeatures ? chipSet : 'Not Found'}</p>
        <p><span class="font-bold">Release Date: </span>${releaseDate ? releaseDate : 'Not Found'}</p>
        <div class="modal-action">
            <label for="my-modal" class="btn">Close</label>
        </div>
    `
    console.log(phoneDetailsDiv)
}

const processSearch = (dataLimit) => {
    const searchField = document.getElementById('search-field');
    const searchFieldValue = searchField.value;
    loadPhones(searchFieldValue, dataLimit)
}

// progress bar 
const progressBar = (isLoading) => {
    const progressBar = document.getElementById('progress-bar');
    if (isLoading === true) {
        progressBar.classList.remove('hidden')
    }
    else {
        progressBar.classList.add('hidden')
    }
}

// add click event listener for the search btn
document.getElementById('search-btn').addEventListener('click', function () {
    processSearch(10);
    progressBar(true)

    console.log(searchFieldValue)
})

// add keypress event listener for the search field
document.getElementById('search-field').addEventListener('keypress', function (event) {

    if (event.key === 'Enter') {

        processSearch(10)
        progressBar(true)

    }

    console.log(searchFieldValue)
})

// add click event listener for the show all btn
document.getElementById('show-all-btn').addEventListener('click', function () {
    processSearch()
    progressBar(true)

})


// loadPhones('oppo')