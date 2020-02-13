$(document).ready(
    createContentful()


)


const patientInfo = {
    containsHash: false,
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

let contentID = '';

const patientArray = [];

function createContentful() {
    grabData();

}


function grabData() {
    var client = contentful.createClient({
        space: "szbt0zwjreyq",
        accessToken: "qL-R79I6HSdp5nvptoGUAgFqTVSU49kAOfZA3-zT2CU"
    });

    const hash = window.location.hash.substring(1);

    if (window.location.hash) {
        client.getEntry(hash)
            .then(function (entry) {
                console.log('storing specific patient details #2')
                patientInfo.containsHash = true;
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

                getSpecificEntry();
            })
    } else {
        const pageTitle = $('.header-title').text();

        client.getEntries({
            'fields.procedure': pageTitle,
            'content_type': 'patient'
        }).then(function (entries) {
            console.log('calling all patient functions #1')
            entries.items.forEach(function (entry) {

                let patientLiteral =
                    `<div class='col-xs-12 col-sm-6 col-md-4 photos-col wow fadeInUp animated' wow-delay='0s'>
        <div class='text-middle'>
            <div class='twentytwenty-container'>
                <img alt='dr bunkis before after photo' class='img-responsive' src=${entry.fields.photos[0].fields.file.url} />
                <img alt='dr bunkis before after photo' class='img-responsive' src=${entry.fields.photos[1].fields.file.url} />
            </div>
        </div>
        <div class='text-middle photos-content-wrapper'>
            <h3>
                <span class="id-color photos-header">${entry.fields.procedure}</span>
            </h3>
            <div class="photos-content-flex-row">
                <div class="photos-content-left">
                    <p class="photos-age">Age: 
                        <span class="main-photos-age-span">Age: ${entry.fields.age}</span>
                    </p>
                    <p class="photos-gender">Gender: 
                        <span class="main-photos-gender-span">Gender: ${entry.fields.gender}</span>
                    </p>
                    <p class="photos-ethnicity">Ethnicity: 
                        <span class="main-photos-ethnicity-span">Ethnicity: ${entry.fields.ethnicity}</span>
                    </p>
                </div>
                <div class="photos-content-right">
                    <p class="photos-height">Height: 
                        <span class="main-photos-height-span">Height: ${entry.fields.height}</span>
                    </p>
                    <p class="photos-weight">Weight: 
                        <span class="main-photos-weight-span">Weight: ${entry.fields.weight}</span>
                    </p>
                </div>
            </div>
            <a class='btn-line facelift-url-btn' id='${entry.sys.id}'>View Details</a>
        </div>
    </div>`

                contentID = entry.sys.id;

                patientArray.push(patientLiteral);
            })

            $('.main-all-photos-page').append(patientArray);

            $('.facelift-url-btn').on('click', function () {
                console.log('clicked')


                window.open(window.location.href + '#' + contentID);
            })
        })

    }

}

function splitArrayByGroups(inputArr, splitNum) {
    console.log('organizing photos for specific client #3')
    var index = 0;
    var arrayLength = inputArr.length;
    var tempArr = [];

    for (index = 0; index < arrayLength; index += splitNum) {
        newArr = inputArr.slice(index, index + splitNum);
        tempArr.push(newArr);
    }

    return tempArr;
}

function getSpecificEntry() {
    console.log('rendering specific client #4')
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


    console.log('patient photos #2', patientInfo.patientPhotosAll);
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

