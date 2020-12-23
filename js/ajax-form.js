$(function() {
  // Get the form.
  var form = $("#contact_form");

  // Get the messages div.
  var formMessages = $(".ajax-response");

  // Set up an event listener for the contact form.
  $(form).submit(function(e) {

    // Stop the browser from submitting the form.
    e.preventDefault();

    // Remove click handler while ajax is sent
    $(this)
      .find(":input[type=submit]")
      .prop("disabled", true);
    $(".submitBtn").off("click");

    // Serialize the form data.
    var formData = $(form).serialize();

    // Add loading circle to submit button
    $(".submitBtn").addClass("running");

    // Submit the form using AJAX.
    $.ajax({
      type: "POST",
      url: $(form).attr("action"),
      data: formData,
      dataType: "json"
    })
      .done(function(response) {
        if (response.success) {
          console.log("success");
          $(".nav-title, .overlay-menu, .consult-tagline").addClass("hide");
          $(".success-container").removeClass("hide");
          $(".submitBtn").removeClass("running");
          $(":input", "form").val("");
          $(".needs-validation").removeClass("was-validated");
          $("#inputState option").prop("selected", function() {
            return this.defaultSelected;
		  });
		  
		  setTimeout(() => {
			$("#mail_success").css("display", "none");
		  }, 5000);
		  $("#mail_success").css("display", "block");

          $(form)
            .find(":input[type=submit]")
            .prop("disabled", false);

          event.preventDefault();
          return;
        } else {
          console.log("nope");
          $(".submitBtn").removeClass("running");
          $(formMessages).removeClass("success");
          $(formMessages).addClass("error");
          $("#inputState option").prop("selected", function() {
            return this.defaultSelected;
          });
        }
        return;
      })
      .fail(function(data) {
        console.log("fail data", data);
        // Make sure that the formMessages div has the 'error' class.
        setTimeout(() => {
          $("#mail_fail").css("display", "none");
        }, 5000);
		$("#mail_fail").css("display", "block");
		$(":input", "form").val("");
        $("#inputState option").prop("selected", function() {
          return this.defaultSelected;
		});
		
		event.preventDefault();

        // Set the message text.
        if (data.responseText !== "") {
          $(formMessages).text(data.responseText);
        } else {
          $(formMessages).text(
            "Oops! There was an error, so sorry about that. Please try again"
          );
        }
      });
  });
});
