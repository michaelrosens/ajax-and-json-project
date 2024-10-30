$(document).ready(function() {
  $('#submitDay').on("click", function() {
    console.log("Submit button clicked");

    const selectedDay = $('#dayInput').val().toUpperCase();
    console.log("Selected day:", selectedDay);
    if (!/^[A-G]$/.test(selectedDay)) {
      alert("Please enter a valid day (A-G)");
      return;
    }

    $.ajax({
      url: 'https://api.npoint.io/1ee8ef6d9a1b0706fec2',
      method: 'GET',
      success: function(data) {
        console.log("Data received:", data);

        if (!data || !data.schedule) {
          console.error("Invalid data structure received from API");
          return;
        }
        
        const filteredSchedule = data.schedule.filter(item => item.days.includes(selectedDay));
        console.log("Filtered schedule:", filteredSchedule);
        
        $('#scheduleList').empty();

        if (filteredSchedule.length === 0) {
          $('#scheduleList').append('<tr><td colspan="4">No classes today</td></tr>');
        } else {
          filteredSchedule.forEach(function(item, index) {
            if (index === 3) {
              $('#scheduleList').append(`
                <tr>
                  <td>Lunch</td>
                  <td colspan="3">Lunch Break</td>
                </tr>
              `);
            }
            $('#scheduleList').append(`
              <tr>
                <td>${item.period}</td>
                <td>${item.class}</td>
                <td>${item.teacher}</td>
                <td>${item.room}</td>
              </tr>
            `);
          });
        }

        console.log("Schedule appended to DOM");
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.error("AJAX request failed:", textStatus, errorThrown);
        alert("Failed to load schedule. Please try again later.");
      },
    });
  });
});