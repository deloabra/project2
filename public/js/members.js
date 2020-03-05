$(document).ready(function() {
  $.get("/api/user_data").then(function(data) {

    if(!data.goal){
      $("#goalBox").html("<h3>Create a goal to see and update your goal progress</h3>");
    }
    else{
      $("#goalText").html(`<h3>My Goal: Do ${data.interest} for ${data.goal} ${data.goalUnit === "Distance"?"Miles":"Hours"}</h3>`);
    }

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

    $("#updateGoalButton").on("click", function(event){
      event.preventDefault();
    });
  });
});

//newMessage
//newMessageSubmitButton