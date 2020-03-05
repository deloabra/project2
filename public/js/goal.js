$(document).ready(function(){
  //This is not an empty function
  var goalType = $("input[name=question]:checked");

  $(".submit-button").on("click", function(event){
    event.preventDefault();
    console.log(`test ${$("input[name=question]:checked").val()}`);
    var goalData = {
      interest: $("#interest").val(),
      goal: parseInt($("#goal-amount").val()),
      goalUnit: $("input[name=question]:checked").val()
    };

    if(!goalData.interest || !goalData.goal || !goalData.goalUnit){
      return;
    }

    $.ajax({
      url: "/api/goalCreate",
      type: "PATCH",
      data: goalData
    })
      .then(function(){
        window.location.replace("/members");
      });
  });

  $(".cancel-button").on("click", function(event){
    event.preventDefault();
    window.location.replace("/members");
  });
});