$(document).ready(function() {
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);

    $("#newMessageSubmitButton").on("click", function(event){
      event.preventDefault();

      const messageData = {
        UserId: data.id,
        message: $("#newMessage").val()
      };

      $.ajax({
        url: "/api/messages",
        type: "POST",
        data: messageData
      })
        .then(function(){
          window.location.reload();
        });
    });
  });
});

//newMessage
//newMessageSubmitButton