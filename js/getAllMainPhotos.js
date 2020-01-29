
$(document).ready(function() {
  // fetchMainPhotos();
  createContentful();
});


// function fetchMainPhotos() {
//   if (window.location.hash) {
//     console.log('hashed, go that id')
//     const hash = window.location.hash.substring(1);
//     console.log(hash)
//     $.ajax({
//       url:
//         "/php/getpatientinfo.php",
//       dataType: "json",
//       type: "get",
//       data: {
//         id: hash
//       },
//       success: resp => {
//         console.log('hashed response', resp)
        
//       }
//     });

//   } else {
//     const title = $('.header-title').text();
//     var input = title
//     var procedure = input.replace(/\w+/g, function(txt) {
//         return txt.charAt(0).toLowerCase() + txt.substr(1);
//     }).replace(/\s/g, '');
//     console.log(procedure)
  
//     $.ajax({
//       url:
//         "/php/getprocedurephoto.php",
//       dataType: "json",
//       type: "get",
//       data: {
//         procedure: procedure
//       },
//       success: resp => {
//         console.log('non hashed response', resp)
//         for (i = 0; i < resp.patients.length; i++) {
//           const mainRow = $(".main-all-photos-page");
//           const mainColDiv = $("<div class='col-xs-12 col-sm-6 col-md-4 photos-col wow fadeInUp animated' wow-delay='0s'>");
//           const textMiddleDiv = $("<div class='text-middle'>");
//           const twentyTwentyContainer = $("<div class='twentytwenty-container'>");

//           const photoContentsWrapper = $("<div class='text-middle photos-content-wrapper'>");
//           const photoHeaderH3 = $("<h3>");
//           const photoHeaderSpan = $("<span class='id-color photos-header'>");
//           const photoContentsFlexRow = $("<div class='photos-content-flex-row'>");
//           const photoContentsLeft = $("<div class='photos-content-left'>");
//           const photoContentsRight = $("<div class='photos-content-right'>");

//           const image1 = $("<img alt='dr bunkis before after photo' class='img-responsive' />");
//           const image2 = $("<img alt='dr bunkis before after photo' class='img-responsive' />");

//           const photosAgeP = $("<p class='photos-age'>Age: <span class='main-photos-age-span'></span></p>");
//           const photosGenderP = $("<p class='photos-gender'>Gender: <span class='main-photos-gender-span'></span></p>");
//           const photosEthnicityP = $("<p class='photos-ethnicity'>Ethnicity: <span class='main-photos-ethnicity-span'></span></p>");
//           const photosHeightP = $("<p class='photos-height'>Height: <span class='main-photos-height-span'></span></p>");
//           const photosWeightP = $("<p class='photos-weight'>Weight: <span class='main-photos-weight-span'></span> lbs</p>");
//           const photosID = $("<p class='photos-id'>Gallery ID: <span class='main-photos-id-span'></span></p>");
//           const viewDetailsBtn = $("<a class='btn-line go-to-patient'>View Details</a>");

//           let patientID = resp.patients[i].id;
//           let patientProcedure = resp.patients[i].procedure;
//           let patientPhoto1 = resp.patients[i].photos[0].pic1;
//           let patientPhoto2 = resp.patients[i].photos[0].pic2;
//           let patientAge = resp.patients[i].age;
//           let patientGender = resp.patients[i].gender;
//           let patientEthnicity = resp.patients[i].ethnicity;
//           let patientHeight = resp.patients[i].height;
//           let patientWeight = resp.patients[i].weight;
//           let patientUrl = resp.patients[i].url;

//           mainRow.append(mainColDiv);
//           mainColDiv.append(textMiddleDiv);
//           textMiddleDiv.append(twentyTwentyContainer);
//           twentyTwentyContainer.append(image1, image2);
//           mainColDiv.append(photoContentsWrapper);
//           photoContentsWrapper.append(photoHeaderH3);
//           photoHeaderH3.append(photoHeaderSpan);
//           photoHeaderSpan.text(patientProcedure);

//           image1.attr("src", patientPhoto1);
//           image2.attr("src", patientPhoto2);

//           photoContentsWrapper.append(photoContentsFlexRow);

//           photoContentsFlexRow.append(photoContentsLeft);
//           photoContentsLeft.append(photosAgeP, photosGenderP, photosEthnicityP);
//           $('.main-photos-age-span').text(patientAge);
//           $('.main-photos-gender-span').text(patientGender);
//           $('.main-photos-ethnicity-span').text(patientEthnicity);

//           photoContentsFlexRow.append(photoContentsRight);
//           photoContentsRight.append(photosHeightP, photosWeightP, photosID);
//           $('.main-photos-height-span').text(patientHeight);
//           $('.main-photos-weight-span').text(patientWeight);
//           $('.main-photos-id-span').text(patientID);

//           photoContentsWrapper.append(viewDetailsBtn);
//           viewDetailsBtn.attr("href", patientUrl);
//           viewDetailsBtn.attr("id", patientID);
//           viewDetailsBtn.on('click', function() {
//             window.open(window.location.href + '#' + patientID);
//           })
//         }
//       }
//     });
//   }
// }

function createContentful() {
  var client = contentful.createClient({
    space: "szbt0zwjreyq",
    accessToken: "qL-R79I6HSdp5nvptoGUAgFqTVSU49kAOfZA3-zT2CU"
  });

  if (window.location.hash) {
    console.log('hashed, go that id')
    const hash = window.location.hash.substring(1);
    console.log(hash)

    client.getEntry(hash)
    .then(function (entry) {
      console.log(entry)

      const mainRow = $(".main-all-photos-page");
      // const mainColDiv = $("<div class='col-xs-12 col-sm-6 col-md-4 photos-col wow fadeInUp animated' wow-delay='0s'>");
      // const textMiddleDiv = $("<div class='text-middle'>");
      // const twentyTwentyContainer = $("<div class='twentytwenty-container'>");

      // const photoContentsWrapper = $("<div class='text-middle photos-content-wrapper'>");
      // const photoHeaderH3 = $("<h3>");
      // const photoHeaderSpan = $("<span class='id-color photos-header'>");
      // const photoContentsFlexRow = $("<div class='photos-content-flex-row'>");
      // const photoContentsLeft = $("<div class='photos-content-left'>");
      // const photoContentsRight = $("<div class='photos-content-right'>");

      // const image1 = $("<img alt='dr bunkis before after photo' class='img-responsive' />");
      // const image2 = $("<img alt='dr bunkis before after photo' class='img-responsive' />");

      const photosAgeP = $("<p class='photos-age'>Age: </p>");
      const photosGenderP = $("<p class='photos-gender'>Gender: </p>");
      const photosEthnicityP = $("<p class='photos-ethnicity'>Ethnicity: </p>");
      const photosHeightP = $("<p class='photos-height'>Height: </p>");
      const photosWeightP = $("<p class='photos-weight'>Weight: </p>");
      const photosID = $("<p class='photos-id'>Gallery ID: </p>");
      const viewDetailsBtn = $("<a class='btn-line facelift-url-btn'>View Details</a>");

      const patientDescDiv = $(".append-desc");
      const hiddenConLoop = $(".hidden-procedures-loop");

      const ageSpan = $("<span class='main-photos-age-span'></span>");
      const genderSpan = $("<span class='main-photos-gender-span'></span>");
      const ethnicitySpan = $("<span class='main-photos-ethnicity-span'></span>");
      const heightSpan = $("<span class='main-photos-height-span'></span>");
      const weightSpan = $("<span class='main-photos-weight-span'></span>");

      const patientProcedure = entry.fields.procedure;
      const patientPhoto1 = entry.fields.photos[0].fields.file.url;
      const patientPhoto2 = entry.fields.photos[1].fields.file.url;
      const patientAge = entry.fields.age;
      const patientGender = entry.fields.gender;
      const patientEthnicity = entry.fields.ethnicity;
      const patientHeight = entry.fields.height;
      const patientWeight = entry.fields.weight;
      const patientID = entry.fields.id;
      const patientPhotosAll = entry.fields.photos;
      const contentID = entry.sys.id;
      const patientDetails = entry.fields.details;

      // Loop through patient details and create list items to display on DOM
      let patientArr = patientDetails.split(',');

      for (var i = 0; i < patientArr.length; i++) {
        let listItem = $("<p class='individual-photos-procedure-content'></p>").text(patientArr[i]);
        hiddenConLoop.append(listItem);
      }


      // Loop through photos array and create entire photos divs
      let photosObj = patientPhotosAll;

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
    })
  } else {
    const pageTitle = $('.header-title').text();
    client.getEntries({
      'fields.procedure': pageTitle,
      'content_type': 'patient'
    }).then(function(entries) {
      entries.items.forEach(function(entry) {
        console.log(entry)
  
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
  
        const photosAgeP = $("<p class='photos-age'>Age: </p>");
        const photosGenderP = $("<p class='photos-gender'>Gender: </p>");
        const photosEthnicityP = $("<p class='photos-ethnicity'>Ethnicity: </p>");
        const photosHeightP = $("<p class='photos-height'>Height: </p>");
        const photosWeightP = $("<p class='photos-weight'>Weight: </p>");
        const photosID = $("<p class='photos-id'>Gallery ID: </p>");
        const viewDetailsBtn = $("<a class='btn-line facelift-url-btn'>View Details</a>");
  
        const ageSpan = $("<span class='main-photos-age-span'></span>");
        const genderSpan = $("<span class='main-photos-gender-span'></span>");
        const ethnicitySpan = $("<span class='main-photos-ethnicity-span'></span>");
        const heightSpan = $("<span class='main-photos-height-span'></span>");
        const weightSpan = $("<span class='main-photos-weight-span'></span>");
  
        const patientProcedure = entry.fields.procedure;
        const patientPhoto1 = entry.fields.photos[0].fields.file.url;
        const patientPhoto2 = entry.fields.photos[1].fields.file.url;
        const patientAge = entry.fields.age;
        const patientGender = entry.fields.gender;
        const patientEthnicity = entry.fields.ethnicity;
        const patientHeight = entry.fields.height;
        const patientWeight = entry.fields.weight;
        const patientID = entry.fields.id;
        const patientPhotosAll = entry.fields.photos;
        const contentID = entry.sys.id;
  
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
  
        viewDetailsBtn.attr("id", patientID);
  
        photoContentsWrapper.append(photoContentsFlexRow);
  
        photoContentsFlexRow.append(photoContentsLeft);
        photoContentsLeft.append(photosAgeP, photosGenderP, photosEthnicityP);
  
          ageSpan.text(patientAge);
          photosAgeP.append(ageSpan);
  
          genderSpan.text(patientGender);
          photosGenderP.append(genderSpan);
  
          ethnicitySpan.text(patientEthnicity);
          photosEthnicityP.append(ethnicitySpan);
  
        photoContentsFlexRow.append(photoContentsRight);
        photoContentsRight.append(photosHeightP, photosWeightP, photosID);
        
          heightSpan.text(patientHeight);
          photosHeightP.append(heightSpan);
  
          weightSpan.text(patientWeight + ' lbs');
          photosWeightP.append(weightSpan);
  
          
  
        photoContentsWrapper.append(viewDetailsBtn);
  
        viewDetailsBtn.attr('name', patientProcedure);
  
        viewDetailsBtn.on('click', function() {
          window.open(window.location.href + '#' + contentID);
        })
      });
    });
  }
}


    