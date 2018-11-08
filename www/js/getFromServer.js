/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Called when start button is clicked
$("#start").click(function() {
    window.location.replace("List.html");
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
        
        // Create array of task completion in internal memory
        $(document).ready(function() {
            // This might not be needed. Could be faster to remove
           
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
function getServerData() {
    //disable the buttons
    document.getElementById("submitBtn").disabled = true;
    var uid = document.getElementById("userID").value;
    var pass = document.getElementById("ssoPassword").value;
    document.getElementById("errMsg").innerHTML = "Waiting...";
    //validate the uid is only 8 char
    if (uid.length > 8)
    {
        document.getElementById("errMsg").innerHTML = "Invalid UserID";
        document.getElementById("userID").value = "";
        document.getElementById("ssoPassword").value = "";
    }
    var i;
    var itemName;
    var comment;
    var itemStatus;
    var xhttp = new XMLHttpRequest();
    var parms;
    parms = "user=" + uid;
    parms = parms + "&pw=" + pass;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //Change the Cancel button to Home and enalbe the Submit button
            document.getElementById("submitBtn").disabled = false;
            document.getElementById("cancelHomeBtn").value = "Home";
            //convert the returned data to a JavaScript Object
            var returnData = JSON.parse(this.responseText);
            if (returnData.serverResponse.success == 'true')
            {
                //alert(JSON.stringify(returnData.items));
                //alert(JSON.stringify(returnData.comments));
                //alert(JSON.stringify(returnData.serverResponse));
                //clear existing LocalStorage
                window.localStorage.clear();
                //Loop through the Items and save them to LocalStorage
                for (itemName in returnData.items)
                {
                    //alert(itemName);
                    //alert(returnData.items[itemName]);
                    if (returnData.items[itemName] == '0')
                    {
                        itemStatus = 'false';
                    }
                    else
                    {
                        itemStatus = 'true';
                    }
                    itemName = itemName.toLowerCase();
                    //alert(itemName + ":" + itemStatus);
                    window.localStorage.setItem(itemName, itemStatus);
                }
                // Loop through the comments and save them to LocalStorage
                for (itemName in returnData.comments)
                {
                    //alert(itemName);
                    //alert(returnData.comments[itemName]);
                    comment = returnData.comments[itemName];
                    itemName = itemName + "Comm";
                    window.localStorage.setItem(itemName, comment);
                }
            }
            //Post the message returned
            document.getElementById("errMsg").innerHTML = returnData.serverResponse.message;
        }
    }
    xhttp.open("POST", "https://bucketlist.mtu.edu/appDownload.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parms);
    
}