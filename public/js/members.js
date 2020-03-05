$(document).ready(function() {
  $.get("/api/user_data").then(function(data) {
    if (!data.goal) {
      $("#goalBox").html(
        "<h3>Create a goal to see and update your goal progress</h3>"
      );
    } else {
      $("#goalText").html(
        `<h3>My Goal: Do ${data.interest} for ${data.goal} ${
          data.goalUnit === "Distance" ? "Miles" : "Hours"
        }</h3>`
      );
      // progressbar.js@1.0.0 version is used
      // Docs: http://progressbarjs.readthedocs.org/en/1.0.0/

      var bar = new ProgressBar.Line(container, {
        strokeWidth: 4,
        easing: "easeInOut",
        duration: 1400,
        color: "#FFEA82",
        trailColor: "#eee",
        trailWidth: 1,
        svgStyle: { width: "100%", height: "100%" },
        text: {
          style: {
            // Text color.
            // Default: same as stroke color (options.color)
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
        to: { color: "#ED6A5A" },
        step: (state, bar) => {
          bar.setText(Math.round(bar.value() * 100) + " %");
        }
      });

      bar.animate(1.0); // Number from 0.0 to 1.0
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
  });
});

//newMessage
//newMessageSubmitButton
