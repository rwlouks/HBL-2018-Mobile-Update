
// Called when back button is clicked
$("#back").click(function() {
    //window.location.replace("logoff.php"); Website only
    window.location.replace("index.html"); // PhoneGap only
});

// Called when help button is clicked
$("#help").click(function() {
    window.location.href = "help.html";
});

// Called when reset button is clicked
$("#reset").click(function() {
    var msg = "Are you sure you want to delete completion progress for all items? This cannot be undone.";
    bootbox.confirm({
        size: "small",
        title: "Caution!",
        message: "Are you sure you want to delete completion progress for all items? This cannot be undone.",
        callback: function (result) {
            if (result) {
                window.localStorage.clear();
                //window.location.href = "clearData.php";    Website only
                window.location.href = "#item1";  //PhoneGap version only - reset back to the top of the list
                window.location.reload();  // PhoneGap version only -- reload the page to clear the items
            }
        }
    })
});

// Called when logoff button is clicked -- Only called in the Website version
$("#logoff").click(function() {
    window.localStorage.clear();
    window.location.href = "logoff.php";
});

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        $.mobile.allowCrossDomainPages = true;
    },

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);

        // Called when page loads
        $(document).ready(function() {
            // Check for completed items
            var numComplete = 0;
            for (i=1; i<=85; i++) {
                if (window.localStorage.getItem("item"+i) == "true") {
                    $("#item"+i).removeClass("button");
                    $("#item"+i).addClass("completedBtn");
                    numComplete++;
                }
            }

            // Update progress bar
            var percent = (numComplete / 85) * 100;
            //$("#progBar").val(numComplete);
            $("#progBar").css("width",percent+'%');
            $("#progText").html("Completed "+numComplete+" out of 85 items!");

            // Create progress alerts at checkpoints
            if (numComplete == 21 && window.localStorage.getItem("prog") === null) {
                window.localStorage.setItem("prog", "1");
                bootbox.alert({
                    size: "small",
                    title: "Congratulations!",
                    message: "You have completed 25% of the items! Go to the Alumni House to get a prize!"
                })
            }
            else if (numComplete == 42 && window.localStorage.getItem("prog") < 2) {
                window.localStorage.setItem("prog", "2");
                bootbox.alert({
                    size: "small",
                    title: "Congratulations!",
                    message: "You have completed 50% of the items! Go to the Alumni House to get a prize!"
                })
            }
            else if (numComplete == 64 && window.localStorage.getItem("prog") < 3) {
                window.localStorage.setItem("prog", "3");
                bootbox.alert({
                    size: "small",
                    title: "Congratulations!",
                    message: "You have completed 75% of the items! Go to the Alumni House to get a prize!"
                })
            }
            else if (numComplete == 85 && window.localStorage.getItem("prog") < 4) {
                window.localStorage.setItem("prog", "4");
                bootbox.alert({
                    size: "small",
                    title: "Congratulations!",
                    message: "You have completed 100% of the items! Go to the Alumni House to get a prize!"
                })
            }
        });
    },

    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
// authenticate only called in the website version
function authenticate() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText != 'true') {
                window.location.assign("index.php");
            }
        }
    }
    xhttp.open("POST", "webAuth.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();
}