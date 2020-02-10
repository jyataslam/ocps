$(document).ready(function() {
    
})

class Individual {
    constructor(url, id, age, ethnicity, gender, height, weight, photos) {
        this.url = url;
        this.data = {
            id: id,
            age: age,
            ethnicity: ethnicity,
            gender: gender,
            height: height,
            weight: weight,
            photos: photos
        }
        this.domElements = {
            mainRow: $(".main-all-photos-page"),
            mainColDiv: $("<div class='col-xs-12 col-sm-6 col-md-4 photos-col wow fadeInUp animated' wow-delay='0s'>"),
            textMiddleDiv: $("<div class='text-middle'>"),
            twentyTwentyContainer: $("<div class='twentytwenty-container'>"),

            photoContentsWrapper: $("<div class='text-middle photos-content-wrapper'>"),
            photoHeaderH3: $("<h3>"),
            photoHeaderSpan: $("<span class='id-color photos-header'>"),
            photoContentsFlexRow: $("<div class='photos-content-flex-row'>"),
            photoContentsLeft: $("<div class='photos-content-left'>"),
            photoContentsRight: $("<div class='photos-content-right'>"),

            image1: $("<img alt='dr bunkis before after photo' class='img-responsive' />"),
            image2: $("<img alt='dr bunkis before after photo' class='img-responsive' />"),

            photosAgeP: $("<p class='photos-age'>Age: </p>"),
            photosGenderP: $("<p class='photos-gender'>Gender: </p>"),
            photosEthnicityP: $("<p class='photos-ethnicity'>Ethnicity: </p>"),
            photosHeightP: $("<p class='photos-height'>Height: </p>"),
            photosWeightP: $("<p class='photos-weight'>Weight: </p>"),
            photosID: $("<p class='photos-id'>Gallery ID: </p>"),
            viewDetailsBtn: $("<a class='btn-line facelift-url-btn'>View Details</a>"),

            ageSpan: $("<span class='main-photos-age-span'></span>"),
            genderSpan: $("<span class='main-photos-gender-span'></span>"),
            ethnicitySpan: $("<span class='main-photos-ethnicity-span'></span>"),
            heightSpan: $("<span class='main-photos-height-span'></span>"),
            weightSpan: $("<span class='main-photos-weight-span'></span>")
        }
    }

    getData() {
        console.log('new data', this.data);
        const id = this.data.id;

        if (!id) {
            console.log('no id')
        } else {
            console.log('id here')
        }

        // return this.data;
    }

    openWindow() {
        console.log('new window opened');
        window.location.replace(this.url);
    }

    render() {

    }
}