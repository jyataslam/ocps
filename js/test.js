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

const patientArray = [];

async function createContentful() {
    grabData();
    // await createPatientInfo();
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
                patientInfo.containsHash = true;
                patientInfo.patientProcedure = entry.fields.procedure;
                patientInfo.patientAge = entry.fields.age;
                patientInfo.patientGender = entry.fields.gender;
                patientInfo.patientEthnicity = entry.fields.ethnicity;
                patientInfo.patientHeight = entry.fields.height;
                patientInfo.patientWeight = entry.fields.weight;
                patientInfo.patientID = entry.fields.id;
                patientInfo.patientPhotosAll = entry.fields.photos;
                patientInfo.patientDetails = entry.fields.details;
                patientInfo.patientDesc = entry.fields.patientDescription;
            })
    } else {
        const pageTitle = $('.header-title').text();

        client.getEntries({
            'fields.procedure': pageTitle,
            'content_type': 'patient'
        }).then(function (entries) {
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
                        <span class="main-photos-age-span">${entry.fields.age}</span>
                    </p>
                    <p class="photos-gender">Gender: 
                        <span class="main-photos-gender-span">${entry.fields.gender}</span>
                    </p>
                    <p class="photos-ethnicity">Ethnicity: 
                        <span class="main-photos-ethnicity-span">${entry.fields.ethnicity}</span>
                    </p>
                </div>
                <div class="photos-content-right">
                    <p class="photos-height">Height: 
                        <span class="main-photos-height-span">${entry.fields.height}</span>
                    </p>
                    <p class="photos-weight">Weight: 
                        <span class="main-photos-weight-span">${entry.fields.height}</span>
                    </p>
                </div>
            </div>
            <a class='btn-line facelift-url-btn'>View Details</a>
        </div>
    </div>`

                patientArray.push(patientLiteral);

            })
            $('.main-all-photos-page').append(patientArray);

        })

    }
}



// function createPatientInfo () {
//     if(patientInfo.containsHash){
//         let patientInfo 
//     } else {
//         let patientArray 
//     }
// }
    // var client = contentful.createClient({
    //     space: "szbt0zwjreyq",
    //     accessToken: "qL-R79I6HSdp5nvptoGUAgFqTVSU49kAOfZA3-zT2CU"
    // });

    // if (window.location.hash) {

    //     patientInfo.hash = window.location.hash.substring(1);

    //     client.getEntry(hash)
    //         .then(function (entry) {
    //             patientProcedure = entry.fields.procedure;
    //             patientAge = entry.fields.age;
    //             patientGender = entry.fields.gender;
    //             patientEthnicity = entry.fields.ethnicity;
    //             patientHeight = entry.fields.height;
    //             patientWeight = entry.fields.weight;
    //             patientID = entry.fields.id;
    //             patientPhotosAll = entry.fields.photos;
    //             patientDetails = entry.fields.details;
    //             patientDesc = entry.fields.patientDescription;
    //         