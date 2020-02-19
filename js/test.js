$(document).ready(
    createContentful()

)

var client = '';
var hash = '';
var test = '';

let patientArray = [];

var resultArr = [];

const patientInfo = {
    patientProcedure: '',
    patientAge: '',
    patientGender: '',
    patientEthnicity: '',
    patientHeight: '',
    patientWeight: '',
    patientID: '',
    patientPhotosAll: '',
    patientDetails: '',
    patientDesc: ''
}



function createContentful() {
    callContentful();

    // grabData();

}

function callContentful() {

    client = contentful.createClient({
        space: "szbt0zwjreyq",
        accessToken: "qL-R79I6HSdp5nvptoGUAgFqTVSU49kAOfZA3-zT2CU"
    });

    hash = window.location.hash.substring(1);

    const pageTitle = $('.header-title').text();

    client.getEntries({
        'fields.procedure': pageTitle,
        'content_type': 'patient'
    }).then( async function (entries) {
        test = entries;
        await grabData();
    })

    client.getEntry(hash)
    .then(async function (entry) {
        patientInfo.patientProcedure = entry.fields.procedure;
        patientInfo.patientAge = entry.fields.age;
        patientInfo.patientGender = entry.fields.gender;
        patientInfo.patientEthnicity = entry.fields.ethnicity;
        patientInfo.patientHeight = entry.fields.height;
        patientInfo.patientWeight = entry.fields.weight;
        patientInfo.patientID = entry.fields.id;
        patientInfo.patientPhotosAll = entry.fields.photos;
        patientInfo.patientDetails = entry.fields.details.replace(//g, "•").split('/[•,\/ ]/');
        patientInfo.patientDesc = entry.fields.patientDescription;
        resultArr = splitArrayByGroups(patientArray, 2);

        await getSpecificEntry();
    })
}

function grabData() {
    if (window.location.hash) {
        getIndividualClient();
    } else {
        getAllClients();
    }
}

function splitArrayByGroups(inputArr, splitNum) {
    var index = 0;
    var arrayLength = inputArr.length;
    var tempArr = [];

    for (index = 0; index < arrayLength; index += splitNum) {
        newArr = inputArr.slice(index, index + splitNum);
        tempArr.push(newArr);
    }

    return tempArr;
}

function getIndividualClient() {

    client.getEntry(hash)
        .then(async function (entry) {
            patientInfo.patientProcedure = entry.fields.procedure;
            patientInfo.patientAge = entry.fields.age;
            patientInfo.patientGender = entry.fields.gender;
            patientInfo.patientEthnicity = entry.fields.ethnicity;
            patientInfo.patientHeight = entry.fields.height;
            patientInfo.patientWeight = entry.fields.weight;
            patientInfo.patientID = entry.fields.id;
            patientInfo.patientPhotosAll = entry.fields.photos;
            patientInfo.patientDetails = entry.fields.details.replace(//g, "•").split('/[•,\/ ]/');
            patientInfo.patientDesc = entry.fields.patientDescription;

            await getSpecificEntry();
        })
}

async function getAllClients() {

    test.items.forEach(async function (hash) {

        let patientLiteral =
            `<div class='col-xs-12 col-sm-6 col-md-4 photos-col wow fadeInUp animated' wow-delay='0s'>
        <div class='text-middle'>
            <div class='twentytwenty-container'>
                <img alt='dr bunkis before after photo' class='img-responsive' src=${hash.fields.photos[0].fields.file.url} />
                <img alt='dr bunkis before after photo' class='img-responsive' src=${hash.fields.photos[1].fields.file.url} />
            </div>
        </div>
        <div class='text-middle photos-content-wrapper'>
            <h3>
                <span class="id-color photos-header">${hash.fields.procedure}</span>
            </h3>
            <div class="photos-content-flex-row">
                <div class="photos-content-left">
                    <p class="photos-age">Age: 
                        <span class="main-photos-age-span">Age: ${hash.fields.age}</span>
                    </p>
                    <p class="photos-gender">Gender: 
                        <span class="main-photos-gender-span">Gender: ${hash.fields.gender}</span>
                    </p>
                    <p class="photos-ethnicity">Ethnicity: 
                        <span class="main-photos-ethnicity-span">Ethnicity: ${hash.fields.ethnicity}</span>
                    </p>
                </div>
                <div class="photos-content-right">
                    <p class="photos-height">Height: 
                        <span class="main-photos-height-span">Height: ${hash.fields.height}</span>
                    </p>
                    <p class="photos-weight">Weight: 
                        <span class="main-photos-weight-span">Weight: ${hash.fields.weight}</span>
                    </p>
                </div>
            </div>
            <a class='btn-line facelift-url-btn' id='${hash.sys.id}'>View Details</a>
        </div>
    </div>`

        contentID = hash.sys.id;

        await patientArray.push(patientLiteral);
    })

    await $('.main-all-photos-page').append(patientArray);

    $('.facelift-url-btn').on('click', function () {
        window.open(window.location.href + '#' + contentID);
    })
}


function getSpecificEntry() {
    let specificPatientInfo =
        `<div class='col-xs-12'>
    <div class="text-middle photos-content-wrapper">
        <h3>
            <span class="id-color photos-header">Client Details</span>
        </h3>
        <p class="client-bio">${patientInfo.patientDesc}</p>
    </div>
</div>
<div class="col-xs-12 col-sm-6">
    <div class="expand-group individual-photos-dropdown">
        <div class="expand">
            <h4 class="individual-photos-header expand_patient_info">Patient Information</h4>
            <div class="hidden-content patient-hidden-content">
                <p class="photos-age">
                    <span class="photos-age-span">Age: ${patientInfo.patientAge}</span>
                </p>
                <p class="photos-gender">
                    <span class="photos-gender-span">Gender: ${patientInfo.patientGender}</span>
                </p>
                <p class="photos-ethnicity">
                    <span class="photos-ethnicity-span">Ethnicity: ${patientInfo.patientEthnicity}</span>
                </p>
                <p class="photos-height">
                    <span class="photos-height-span">Height: ${patientInfo.patientHeight}</span>
                </p>
                <p class="photos-weight">
                    <span class="photos-weight-span">Weight: ${patientInfo.patientWeight}</span>
                </p>
            </div>
        </div>
        <div class="expand">
            <h4 class="individual-photos-header expand_procedure">Procedure Details</h4>
            <div class="hidden-content hidden-procedures-loop">
                <p class="individual-photos-procedure-content">${patientInfo.patientDetails}</p>
            </div>
        </div>
    </div>
</div>
<div class="col-xs-12 col-sm-6 individual-profile-wrapper">
    <div class="individual-profile-details-container">
        <p class="individual-profile-name">Dr. Bunkis</p>
        <p class="individual-profile-title">Medical Director</p>
        <p class="individual-profile-phone">
            <a href="tel:+19498889700">949.888.9700</a>
        </p>
    </div>
    <div class="individual-profile-photo-container"">
        <img src=" ../images-bunkis/dr-bunkis-headshot.jpg" alt="">
    </div>
</div>
`





    $('.main-all-photos-page').append(specificPatientInfo)


    patientInfo.patientPhotosAll.forEach(item => {
        patientArray.push(item.fields.file.url)
    })

    const resultArr = splitArrayByGroups(patientArray, 2);

    for (i = 0; i < resultArr.length; i++) {

        let specificPatient =
            `<div class="col-xs-12 col-md-6 col-md-offset-3 photos-col">
            <div class="text-middle">
                <div class="twentytwenty-container">
                <img alt="dr bunkis before after photo"
                    class="img-responsive individual-image-100-width twentytwenty-before"
                    src=${resultArr[i][0]}>
                <img alt="dr bunkis before after photo"
                    class="img-responsive individual-image-100-width twentytwenty-before"
                    src=${resultArr[i][1]}>
                </div>
            </div>
        </div>`

        $('.main-all-photos-page').append(specificPatient)
    }

    $('.main-all-photos-page').addClass('individual-photos-bg-white');

    $('.expand_patient_info').click(() => {
        $('.patient-hidden-content').toggleClass('hidden-content-active');
    })

    $('.expand_procedure').click(() => {
        $('.hidden-procedures-loop').toggleClass('hidden-content-active');
    })


}