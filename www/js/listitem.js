
// Called when back button is clicked
$("#back").click(function() {
    var returnURL = "../List.html#"+window.localStorage.getItem("currItem");
    window.location.replace(returnURL);
});

// Called when help button is clicked
$("#help").click(function() {
    window.location.href = "../help.html";
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

 function setServerData(itemTag, itemStatus, comment) {
        var xhttp = new XMLHttpRequest();
        var parms;
        //alert (itemTag+itemStatus);
        parms = "itemKey=" + itemTag;
        parms = parms + "&value=" + itemStatus;
        parms = parms + "&comment=" + comment;
        xhttp.open("POST", "../saveServerData.php", false);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(parms);
 }
 function authenticate() {
     var xhttp = new XMLHttpRequest();
     xhttp.onreadystatechange = function()
     {
         if (this.readyState == 4 && this.status == 200)
         {
             if (this.responseText != 'true')
             {
                 window.location.assign("../index.php");
             }
         }
     }
     xhttp.open("POST", "../webAuth.php", true);
     xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
     xhttp.send();
 }
      