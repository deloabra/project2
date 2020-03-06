$(document).ready(function() {
  $.get("/api/user_data").then(function(data) {
    if (!data.goal) {
      $("#goalBox").html(
        "<h3>Create a goal to see and update your goal progress</h3>"
      );
    } else {
      $("#goalText").html(
        `<h3>My Goal: ${data.interest} for ${data.goal} ${
          data.goalUnit === "Distance" ? "Miles" : "Hours"
        }</h3>
        <h4>Current Progress: ${data.goalProgress} ${
  data.goalUnit === "Distance" ? "Miles" : "Hours"
}</h4>`
      );

      var bar = new ProgressBar.Line(container, {
        strokeWidth: 1,
        easing: "easeInOut",
        duration: 1400,
        color: "#FFEA82",
        trailColor: "#eee",
        trailWidth: 1,
        svgStyle: { width: "100%", height: "1%" },
        text: {
          style: {
            color: "#999",
            position: "absolute",
            right: "0",
            top: "30px",
            padding: 0,
            margin: 0,
            transform: null
          },
          autoStyleContainer: false
        },
        from: { color: "#FFEA82" },
        to: { color: "#008000" },
        step: (state, bar) => {
          bar.path.setAttribute('stroke', state.color);}
      });

      bar.animate(
        data.goalProgress / data.goal > 1 ? 1 : data.goalProgress / data.goal
      ); // Number from 0.0 to 1.0
    }

    $("#newMessageSubmitButton").on("click", function(event) {
      event.preventDefault();

      const messageData = {
        UserId: data.id,
        message: $("#newMessage").val()
      };

      $.ajax({
        url: "/api/messages",
        type: "POST",
        data: messageData
      }).then(function() {
        window.location.reload();
      });
    });

    $("#updateGoalButton").on("click", function(event) {
      event.preventDefault();

      const progressData = {
        goalProgress: data.goalProgress + parseInt($("#updateGoal").val())
      };

      $.ajax({
        url: "/api/goalUpdate",
        type: "PATCH",
        data: progressData
      }).then(function() {
        window.location.reload();
      });
    });

    $("#username").html(
      `Hello, ${data.name}!`
    );
  });
});

//newMessage
//newMessageSubmitButton
