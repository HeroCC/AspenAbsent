// ==UserScript==
// @name         Aspen Absent
// @namespace    https://github.com/HeroCC/AspenAbsent
// @version      0.3
// @description  Mark entire classes absent in Aspen
// @author       CC
// @match        https://*.myfollett.com/aspen/classroomPopup.do?attendance=true*
// @match        https://*.myfollett.com/aspen/seatingChart.do*
// @downloadURL  https://github.com/HeroCC/AspenAbsent/blob/master/AspenAbsent.user.js
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

function startAttendPageOkScan() {
    // Start AttendanceDetails 'OK' Clicker
    let possibleInputs = document.getElementsByTagName("button");
    for (let i = 0; i < possibleInputs.length; i++) {
        let inputType = possibleInputs[i].getAttribute("type");
        if (inputType == "button") {
            if (possibleInputs[i].getAttribute("name") == "okButton") pressButton(possibleInputs[i]);
        }
    }
}

function startAbsentButtonScan() {
    // Start Seating Chart 'A' Clicker
    let possibleInputs = document.getElementsByClassName("attendanceInputButton");
    console.log(possibleInputs);
    for (let i = 0; i < possibleInputs.length; i++) {
        let inputType = possibleInputs[i].getAttribute("type");
        if (inputType == "button") {
            var buttonVal = possibleInputs[i].getAttribute("value");
            if (buttonVal === "A") setTimeout(function() { pressButton(possibleInputs[i]) }, 250 * i);
        }
    }
}

function injectNewButton() {
    let postButton = document.getElementById("saveButton");
    if (postButton == null) return;
    postButton.parentElement.insertAdjacentHTML('afterbegin', '<button type="button" class="button" id="absentScan" tabindex="0" name="absentScan" onclick="javascript:void(0)"><i class="fa fa-wrench fa-lg"></i><span class="button-text">Absentize</span></button>');

    let scanButton = document.getElementById("absentScan");
    if (scanButton == null) alert("Can't find scan button!");
    scanButton.addEventListener("click", function() { startAbsentButtonScan() });

}

function pressButton(button) {
    button.click();
}

(function() {
    'use strict';
    injectNewButton();

    startAttendPageOkScan();
})();

