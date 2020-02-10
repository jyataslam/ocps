$(document).ready( function() {
    fetchIndividualInfo();
});

function fetchIndividualInfo() {
    $.ajax({
      url:
        "/data/getIndividualPhotos.json",
      dataType: "json",
      success: resp => {

          // Create HTML Tags
          const photosAgeSpan = $(".photos-age-span");
          const photosGenderSpan = $(".photos-gender-span");
          const photosEthnicitySpan = $(".photos-ethnicity-span");
          const photosHeightSpan = $(".photos-height-span");
          const photosWeightSpan = $(".photos-weight-span");
          const photosIDSpan = $(".photos-id-span");
          const procedureHeader = $("<span class='id-color wow fadeInUp animated' wow-delay='0s'></span>");

          const patientDescDiv = $(".append-desc");
          const hiddenConLoop = $(".hidden-procedures-loop");


          // Save Response Data to variables
          let patientID = resp.patients[0].id;
          let patientProcedure = resp.patients[0].procedure;
          let patientAge = resp.patients[0].age;
          let patientGender = resp.patients[0].gender;
          let patientEthnicity = resp.patients[0].ethnicity;
          let patientHeight = resp.patients[0].height;
          let patientWeight = resp.patients[0].weight;
          let patientDesc = resp.patients[0].desc;
          let patientDetails = resp.patients[0].details;

        //   image1.attr("src", patientPhoto1);
        //   image2.attr("src", patientPhoto2);


          // Append dynamically created content to the DOM
          $(procedureHeader).text(patientProcedure);
          $(patientDescDiv).text(patientDesc);

          $(photosAgeSpan).text(patientAge);
          $(photosGenderSpan).text(patientGender);
          $(photosEthnicitySpan).text(patientEthnicity);
          $(photosHeightSpan).text(patientHeight);
          $(photosWeightSpan).text(patientWeight);
          $(photosIDSpan).text(patientID);


          // Loop through patient details and create list items to display on DOM
          let patientArr = patientDetails.split(',');

          for (var i = 0; i < patientArr.length; i++) {
            let listItem = $("<p class='individual-photos-procedure-content'></p>").text(patientArr[i]);
            hiddenConLoop.append(listItem);
          }


          // Loop through photos array and create entire photos divs
          let photosObj = resp.patients[0].photos;

          for (var i = 0; i < photosObj.length; i++) {
              console.log(photosObj[i])

              var mainColDiv = $("<div class='col-xs-12 col-md-6 col-md-offset-3 photos-col'>");
              var textMiddleDiv = $("<div class='text-middle'>");
              var twentyTwentyContainer = $("<div class='twentytwenty-container'>");
              var image1 = $("<img alt='dr bunkis before after photo' class='img-responsive individual-image-100-width' />");
              var image2 = $("<img alt='dr bunkis before after photo' class='img-responsive individual-image-100-width' />");

              image1.attr("src", photosObj[i].pic1);
              image2.attr("src", photosObj[i].pic2);

              twentyTwentyContainer.append(image1);
              twentyTwentyContainer.append(image2);
              textMiddleDiv.append(twentyTwentyContainer);
              mainColDiv.append(textMiddleDiv);

              $('.photos-row').append(mainColDiv)
          }
        }
    });
  }