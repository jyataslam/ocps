$(document).ready( function() {
    fetchMainPhotos();
});

function fetchMainPhotos() {
    $.ajax({
      url:
        "/data/getMainFaceliftPhotos.json",
      dataType: "json",
      success: resp => {
        console.log(resp)
        for (i = 0; i < resp.patients.length; i++) {
          // Create HTML Tags
          const mainRow = $(".main-all-photos-page");
          const mainColDiv = $("<div class='col-xs-12 col-sm-6 col-md-4 photos-col wow fadeInUp animated' wow-delay='0s'>");
          const textMiddleDiv = $("<div class='text-middle'>");
          const twentyTwentyContainer = $("<div class='twentytwenty-container'>");
          
          const photoContentsWrapper = $("<div class='text-middle photos-content-wrapper'>");
          const photoHeaderH3 = $("<h3>");
          const photoHeaderSpan = $("<span class='id-color photos-header'>");
          const photoContentsFlexRow = $("<div class='photos-content-flex-row'>");
          const photoContentsLeft = $("<div class='photos-content-left'>");
          const photoContentsRight = $("<div class='photos-content-right'>");

          const image1 = $("<img alt='dr bunkis before after photo' class='img-responsive' />");
          const image2 = $("<img alt='dr bunkis before after photo' class='img-responsive' />");
          
          const photosAgeP = $("<p class='photos-age'>Age: <span class='main-photos-age-span'></span></p>");
          const photosGenderP = $("<p class='photos-gender'>Gender: <span class='main-photos-gender-span'></span></p>");
          const photosEthnicityP = $("<p class='photos-ethnicity'>Ethnicity: <span class='main-photos-ethnicity-span'></span></p>");
          const photosHeightP = $("<p class='photos-height'>Height: <span class='main-photos-height-span'></span></p>");
          const photosWeightP = $("<p class='photos-weight'>Weight: <span class='main-photos-weight-span'></span> lbs</p>");
          const photosID = $("<p class='photos-id'>Gallery ID: <span class='main-photos-id-span'></span></p>");
          const viewDetailsBtn = $("<a class='btn-line'>View Details</a>");

          // Save Response Data to variables
          let patientID = resp.patients[i].id;
          let patientProcedure = resp.patients[i].procedure;
          let patientPhoto1 = resp.patients[i].photos[0].pic1;
          let patientPhoto2 = resp.patients[i].photos[0].pic1;
          let patientAge = resp.patients[i].age;
          let patientGender = resp.patients[i].gender;
          let patientEthnicity = resp.patients[i].ethnicity;
          let patientHeight = resp.patients[i].height;
          let patientWeight = resp.patients[i].weight;
          let patientUrl = resp.patients[i].url;
  
          mainRow.append(mainColDiv);
          mainColDiv.append(textMiddleDiv);
          textMiddleDiv.append(twentyTwentyContainer);
          twentyTwentyContainer.append(image1, image2);
          mainColDiv.append(photoContentsWrapper);
          photoContentsWrapper.append(photoHeaderH3);
          photoHeaderH3.append(photoHeaderSpan);
          photoHeaderSpan.text(patientProcedure);

          image1.attr("src", patientPhoto1);
          image2.attr("src", patientPhoto2);

          photoContentsWrapper.append(photoContentsFlexRow);

          photoContentsFlexRow.append(photoContentsLeft);
          photoContentsLeft.append(photosAgeP, photosGenderP, photosEthnicityP);
          $('.main-photos-age-span').text(patientAge);
          $('.main-photos-gender-span').text(patientGender);
          $('.main-photos-ethnicity-span').text(patientEthnicity);

          photoContentsFlexRow.append(photoContentsRight);
          photoContentsRight.append(photosHeightP, photosWeightP, photosID);
          $('.main-photos-height-span').text(patientHeight);
          $('.main-photos-weight-span').text(patientWeight);
          $('.main-photos-id-span').text(patientID);

          photoContentsWrapper.append(viewDetailsBtn);
          viewDetailsBtn.attr("href", patientUrl);
        }
      }
    });
  }