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
function saveServerData() {
    //disable the buttons
    document.getElementById("submitBtn").disabled = true;
    var uid = document.getElementById("userID").value;
    var pass = document.getElementById("ssoPassword").value;
    document.getElementById("errMsg").innerHTML = "Start saveServerData";
    //validate the uid is only 8 char
    if (uid.length > 8)
    {
        document.getElementById("errMsg").innerHTML = "Invalid UserID";
        document.getElementById("userID").value = "";
        document.getElementById("ssoPassword").value = "";
    }
    //format the data into 2 JSON structures, one for the item status and one for comments
    var itemObj = new Object();
    var commObj = new Object();
    var i;
    var itemName;
    var serverItem;
    for (i = 1; i <= 85; i++) {
        itemName = "item" + i;
        serverItem = "Item" + i;
        itemObj[serverItem] = window.localStorage.getItem(itemName);
        comm = window.localStorage.getItem(serverItem + "Comm");
        if (comm != null) {
            commObj[serverItem] = comm;
        }
    }
    var itemJSON = JSON.stringify(itemObj);
    var commJSON = JSON.stringify(commObj);
    //alert(itemJSON);
    //alert(commJSON);
    //Send the uid, password, and 2 JSON structures to the host
    document.getElementById("errMsg").innerHTML = "sending to server";
    var xhttp = new XMLHttpRequest();
    var parms;
    parms = "user=" + uid;
    parms = parms + "&pw=" + pass;
    parms = parms + "&itemJSON=" + itemJSON;
    parms = parms + "&commJSON=" + commJSON;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //Change the Cancel button to Home and enalbe the Submit button
            document.getElementById("submitBtn").disabled = false;
            document.getElementById("cancelHomeBtn").value = "Home";
            document.getElementById("errMsg").innerHTML = this.responseText;
        }
    }
    xhttp.open("POST", "https://bucketlist.mtu.edu/appUpload.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parms);
    
}