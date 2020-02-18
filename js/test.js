$(document).ready(
    createContentful()

)

var client = '';
var hash = '';
var test = '';

const patientArray = [];



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
        console.log(test);
        await grabData();
    })

    // await grabData();

}

function grabData() {
    if (window.location.hash) {
        getIndividualClient();
    } else {
        getAllClients();
    }
}

function getIndividualClient() {
    client.getEntry(hash)
        .then(function (entry) {
            console.log('storing specific patient details #2')
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
            console.log('stored Object', patientInfo)

            getSpecificEntry();
        })
}

function getAllClients() {
    // console.log('entries.items', entries)
    console.log('test', test)

    test.items.forEach(function (hash) {

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

        patientArray.push(patientLiteral);
    })

    $('.main-all-photos-page').append(patientArray);

    $('.facelift-url-btn').on('click', function () {
        console.log('clicked')


        window.open(window.location.href + '#' + contentID);
    })
}
