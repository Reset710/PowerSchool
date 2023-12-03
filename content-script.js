javascript: (() => {  
  


    document.getElementById("quickLookup").style.display = "none";
    document.getElementById("legend").style.display = "none";
    document.getElementById("nav-secondary").style.display = "none";
   // document.getElementById("content-main").style.backgroundColor = "#9b9b9b";

    var allLinks = document.querySelectorAll('a');

    var scoresLinks = [];
    var Absences = [];

    allLinks.forEach(link => {
        var href = link.getAttribute('href');
        if (href) {
            if (href.startsWith('scores')) {
                scoresLinks.push(link.innerText);
            } else if (href.startsWith('attendancedates')) {
                Absences.push(link.innerText);
            }
        }
    });

   // console.log(JSON.stringify(Absences));

    var ClassPeriods = [];

    document.querySelectorAll('.table-element-text-align-start').forEach(el => {
        ClassPeriods.push(el.firstChild.textContent.trim());
    });

    var transformedClassPeriods = ClassPeriods.map(name => ({
        name: name
      }));
      
      console.log(transformedClassPeriods);
      

    //console.log(ClassPeriods)
     //console.log(JSON.stringify(ClassPeriods));

    var existingGradeBookOverlay = document.getElementById('gradeBookOverlay');

    if (existingGradeBookOverlay) {
        existingGradeBookOverlay.remove();
        setTimeout(createGradeBookOverlay, 1000);
    } else {
        createGradeBookOverlay();
    }

    function createGradeBookOverlay() {
        var classes = ClassPeriods.map((classPeriod, index) => ({
            name: classPeriod,
            grade: scoresLinks[index],
        }));

        var gradeBookOverlay = document.createElement('div');
        gradeBookOverlay.id = 'gradeBookOverlay';
        gradeBookOverlay.style.cssText = `
            position: fixed;
            top: 22%; /* Adjusted top position */
            left: 13%; /* Adjusted left position */
            width: 25%; /* Adjusted width */
            font-family: Arial, sans-serif;
            z-index: 9999;
            background-color: rgba(128, 128, 128, .7); /* Adjusted opacity */
            color: white;
            padding: 20px;
            border: 1px solid #ccc; /* Added border */
        `;

        var gradeBookContent = document.createElement('div');
        gradeBookContent.innerHTML = '<h2>Gradebook</h2>';
        classes.forEach(classData => {
            var classDiv = document.createElement('div');
            classDiv.style.cssText = `
                padding: 10px;
                text-align: left; /* Adjusted text alignment */
                border-bottom: 1px solid white; /* Added divider */
            `;
            classDiv.innerHTML = `<strong>${classData.name}</strong><br><strong>Grade:</strong> <span style="color: #0066A5">${classData.grade}  </span>`;

            gradeBookContent.appendChild(classDiv);
        });
        gradeBookOverlay.appendChild(gradeBookContent);
        document.body.appendChild(gradeBookOverlay);



        var existingAttendanceOverlay = document.getElementById('attendanceOverlay');

        if (existingAttendanceOverlay) {
            existingAttendanceOverlay.remove();
            setTimeout(createAttendanceOverlay, 1000);
        } else {
            createAttendanceOverlay();
        }

        function createAttendanceOverlay() {
            var attendanceOverlay = document.createElement('div');
            attendanceOverlay.id = 'attendanceOverlay';
            attendanceOverlay.style.cssText = `
                position: fixed;
                top: 22%; /* Adjusted top position */
                left: 45%; /* Adjusted left position */
                width: 25%; /* Adjusted width */
                font-family: Arial, sans-serif;
                z-index: 9999;
                background-color: rgba(128, 128, 128, .7); /* Adjusted opacity */
                color: white;
                padding: 20px;
                border: 1px solid #ccc; /* Added border */
            `;

            var AbsencesArray = Absences.map((absence, index) => ({
                name: ClassPeriods[index],
                Absences: absence,
            }));

            AbsencesArray[7].name = "TOTAL:"

          //  console.log(JSON.stringify(AbsencesArray));
            
          //  console.log("SPACE")
            


          //  console.log(AbsencesArray[7])

            var attendanceContent = document.createElement('div');

            attendanceContent.innerHTML = '<h2>Attendance</h2>';
            AbsencesArray.forEach(classData => {
                var classDiv = document.createElement('div');
                classDiv.style.cssText = `
                    padding: 10px;
                    text-align: left; /* Adjusted text alignment */
                    border-bottom: 1px solid white; /* Added divider */
                `;
                classDiv.innerHTML = `<strong>${classData.name}</strong><br><strong>Absences:</strong> <span style="color: #0066A5">${classData.Absences}  </span>`;

                attendanceContent.appendChild(classDiv);
            });
            attendanceOverlay.appendChild(attendanceContent);
            document.body.appendChild(attendanceOverlay);
        }
    }
    


    // Get the current date
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const year = today.getFullYear();
    
    // Format the date in MM/DD/YYYY
    const formattedDate = `${month}/${day}/${year}`;
    
    // Create a container div for the iframe
    const containerDiv = document.createElement('div');
    containerDiv.style.display = 'flex';
    containerDiv.style.alignItems = 'center';
    containerDiv.style.justifyContent = 'center';
    containerDiv.style.position = 'absolute';
    containerDiv.style.top = '50%';
    containerDiv.style.left = '50%';
    containerDiv.style.transform = 'translate(-50%, -50%)';
    
    // Create the iframe element
    const iframe = document.createElement('iframe');
    
    // Set attributes for the iframe
   // iframe.src = `https://powerschool.laalliance.org/guardian/alerts/bellschedulealert.html?selectedDate=${formattedDate}&dayDisplay=inline`;
  iframe.src = `https://powerschool.laalliance.org/guardian/alerts/bellschedulealert.html?selectedDate=11/27/2023&dayDisplay=inline`;
    iframe.width = '80%'; // Adjusted width
    iframe.height = '600px';
    iframe.frameBorder = '0';
    iframe.id = 'myIframe'; // Set the specific ID
    
    // Set styles for centering, opacity, and z-index
    iframe.style.display = 'block';
    iframe.style.margin = 'auto';
    iframe.style.opacity = '0';
    iframe.style.zIndex = '9999'; // Set a high z-index value
    
    // Append the iframe to the container div
    containerDiv.appendChild(iframe);
    
    // Append the container div to the body of the document
    document.body.appendChild(containerDiv);

    let transformedScheduleData;

    function handleIframeData() {
        // Access transformedScheduleData here

        document.getElementById('First').innerText = transformedScheduleData[0].name + " " + transformedScheduleData[0].startTime + " - " + transformedScheduleData[0].endTime + " Duration: " + transformedScheduleData[0].duration
        document.getElementById('First').style = ' font-weight: bold; '

        document.getElementById('Second').innerText = transformedScheduleData[1].name + " " + transformedScheduleData[1].startTime + " - " + transformedScheduleData[1].endTime + " Duration: " + transformedScheduleData[1].duration
        document.getElementById('Second').style = ' font-weight: bold; '

        document.getElementById('Third').innerText = transformedScheduleData[2].name + " " + transformedScheduleData[2].startTime + " - " + transformedScheduleData[2].endTime + " Duration: " + transformedScheduleData[2].duration
        document.getElementById('Third').style = ' font-weight: bold; '

        document.getElementById('fourth').innerText = transformedScheduleData[3].name + " " + transformedScheduleData[3].startTime + " - " + transformedScheduleData[3].endTime + " Duration: " + transformedScheduleData[3].duration
        document.getElementById('fourth').style = ' font-weight: bold; '

        document.getElementById('fifth').innerText = transformedScheduleData[4].name + " " + transformedScheduleData[4].startTime + " - " + transformedScheduleData[4].endTime + " Duration: " + transformedScheduleData[4].duration
        document.getElementById('fifth').style = ' font-weight: bold; '

        document.getElementById('sixth').innerText = transformedScheduleData[5].name + " " + transformedScheduleData[5].startTime + " - " + transformedScheduleData[5].endTime + " Duration: " + transformedScheduleData[5].duration
        document.getElementById('sixth').style = ' font-weight: bold; '

        document.getElementById('seventh').innerText = transformedScheduleData[6].name + " " + transformedScheduleData[6].startTime + " - " + transformedScheduleData[6].endTime + " Duration: " + transformedScheduleData[6].duration
        document.getElementById('seventh').style = ' font-weight: bold; '

    }

    iframe.onload = () => {
        // Access data from the iframe content
        const iframeContent = iframe.contentDocument || iframe.contentWindow.document;
    
        // Create an array to store table data
        const tableData = [];
    
        // Loop through elements with class "evenRow" and "oddRow"
        iframeContent.querySelectorAll('.evenRow, .oddRow').forEach(row => {
            // Split the text content by spaces
            const rowData = row.textContent.trim().split(/\s+/);
    
            // Create an object to represent the row data
            const rowObject = {};
            
            // Assign each piece of data to a property in the object
            rowData.forEach((data, index) => {
                rowObject[`column${index + 1}`] = data;
            });
    
            // Add the row object to the array
            tableData.push(rowObject);
        });
    
        // Code to execute after the loop completes goes here
        console.log('Loop finished.');


         transformedScheduleData = tableData.map(entry => ({
            name: entry.column1,
            startTime: entry.column2,
            startAMPM: entry.column3,
            endTime: entry.column4,
            endAMPM: entry.column5,
            duration: entry.column6
          }));
          
          console.log(transformedScheduleData)

          handleIframeData()

    };


    



    // Create a div element with a paragraph
    var Clock = document.createElement('div');
    Clock.style.cssText = `
        position: fixed;
        top: 22%;
        left: 77%;
        width: 13%;
        font-family: Arial, sans-serif;
        z-index: 9999;
        background-color: rgba(128, 128, 128, .7);
        color: white;
        padding: 20px;
        border: 1px solid #ccc;
    `;
    
    var paragraphElement = document.createElement('p');
    
    // Function to update the current time
    function updateCurrentTime() {
      var currentTime = new Date();
      var hours = currentTime.getHours();
      var minutes = currentTime.getMinutes();
      var seconds = currentTime.getSeconds();
      var ampm = hours >= 12 ? 'PM' : 'AM';

      paragraphElement.style.cssText = `
        
      font-size: 40px;
      text-align: center;
      margin: auto;

      `;
    
      // Convert to 12-hour format
      hours = hours % 12;
      hours = hours ? hours : 12;
    
      // Set the text content to the current time with seconds and AM/PM
      paragraphElement.textContent = ` ${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds} ${ampm}`;
    }
    
    // Initial update
    updateCurrentTime();
    
    // Update the current time every second
    var updateTimeInterval = setInterval(updateCurrentTime, 1000);
    
    // ... (your existing code)
    
    // Append the gradebook overlay, div with paragraph, and attendance overlay
    document.body.appendChild(gradeBookOverlay);
    Clock.appendChild(paragraphElement); // Append the paragraph to the div
    document.body.appendChild(Clock);
    document.body.appendChild(attendanceOverlay);
    
    // Clear the interval when the page is unloaded (optional)
    window.addEventListener('unload', function() {
      clearInterval(updateTimeInterval);
    });
    
    

    let BellRing = document.createElement('div');
    BellRing.style.cssText = `
    position: fixed;
    top: 27%;
    left: 77%;
    width: 13%;
    font-family: Arial, sans-serif;
    z-index: 9999;
    background-color: rgba(128, 128, 128, .7);
    color: white;
    padding: 20px;
    border: 1px solid #ccc;
    `;

    // Add content to BellRing

        // Assuming you have an element with the id "scheduleInfo"
   // var scheduleInfoElement = document.getElementById('First');

  

    // Set the text content
  // scheduleInfoElement.innerText = transformedScheduleData[0].name + " " + transformedScheduleData[0].startTime


    BellRing.innerHTML = '<h2>Bell</h2><p>The bell will ring in .. </p><h2></h2> <p id = "ScheduleHead" style="font-size: 15px;">Todays Schedule</p> <br> <p id="First" > </p> <br> <p id="Second" > </p> <br> <p id="Third" > </p> <br> <p id="fourth" > </p> <br> <p id="fifth" > </p> <br> <p id="sixth" > </p> <br> <p id="seventh" > </p> ';

    // Append BellRing to the body
    document.body.appendChild(BellRing);



    // Create an anchor element
    var link = document.createElement('a');

    link.style.cssText = `
    
    position: fixed;
    top: 90%;
    left: 90%;
    width: 5%;
    font-family: Arial, sans-serif;
    z-index: 9999;
    background-color: rgba(128, 128, 128, .7);
    color: '#4884DF';
    padding: 20px;
    border: 1px solid #ccc;
    text-align: center;
    
    `;

    // Set the href attribute
    link.href = 'https://forms.gle/pW27HWgy9qVSKv3p7';

    // Set the text content
    link.textContent = 'Feedback';

    // Append the link to the body or another HTML element
    document.body.appendChild(link);



var contentMainElement = document.getElementById('content-main');

// Check if the element with the ID 'content-main' exists
if (contentMainElement) {
    // Append the new element as a child to 'content-main'
    contentMainElement.appendChild(gradeBookOverlay);
    contentMainElement.appendChild(attendanceOverlay);
    contentMainElement.appendChild(Clock);
    contentMainElement.appendChild(BellRing);
} else {
    console.error('Element with ID "content-main" not found.');
}
            

})();


