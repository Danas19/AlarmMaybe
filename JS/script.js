(
    function () {
        var createItemDiv = document.getElementById("create-item");
        var newItemRowDivs = document.getElementsByClassName("item-row");

        //save from these lines to local storage START
        var newItemNameInput = document.getElementById("new-item-name");

        var inputsItemRowWhat = [];
        var inputsItemRowTimes = [];
        var inputsItemRowTimeSec = [];

        var clearedValuesTimes = [];
        var clearedValuesTimeSec = [];
        //save from these lines to local storage END

        var labelsItemRowWhat = [];
        var labelsItemRowTimes = [];
        var labelsItemRowTimeSec = [];

        var addNewItemButton = document.getElementById("add-new-item");

        var timeOutputP = document.getElementById("time-output-p");

        var localStorageItems;
        setLocalStorageItems();
        console.log(localStorageItems);

        document.getElementById("delete-local-storage").addEventListener("click", function () {
            localStorage.clear();
        });

        function setLocalStorageItems() {
            localStorageItems = JSON.parse(localStorage.getItem('items'));
            if (!Array.isArray(localStorageItems)) {
                localStorageItems = [];
            }
        }


        setNewItemInputs();
        setNewItemLabels();

        addActionsToLastRow(1);

        disableAllRowInputs(true, 0);

        addNewItemButton.addEventListener("click", function () {
            var newItemInfo = {
                itemName: newItemNameInput.value,
                rows: []
            };
            for (var i = 0; i < newItemRowDivs.length - 1; i++) {
                newItemInfo.rows[i] = {
                    valueItemRowWhat: inputsItemRowWhat[i].value,
                    valueItemRowTimes: inputsItemRowTimes[i].value,
                    valueItemRowTimeSec: inputsItemRowTimeSec[i].value,
                    clearedValueTimes: clearedValuesTimes[i],
                    clearedValueTimeSec: clearedValuesTimeSec[i]
                };
            }
            localStorageItems[localStorageItems.length] = newItemInfo;
            console.log(newItemInfo);
            localStorage.setItem('items', JSON.stringify(localStorageItems));
        });

        var action = setInterval(function () {
            var dateNewObject = new Date();
            timeOutputP.innerHTML = dateNewObject.getFullYear() + "-" +
                getTwoNumbers(dateNewObject.getMonth()) + "-" + getTwoNumbers(dateNewObject.getDay()) + " " + getTwoNumbers(dateNewObject.getHours()) + ":" + getTwoNumbers(dateNewObject.getMinutes()) + ":" + getTwoNumbers(dateNewObject.getSeconds());
        }, 1000);

        function getTwoNumbers(num) {
            //function to get from 23 to 23, but from 0 to 00, from 7 to 07... Used for showing time with 2 numbers not 1
            if (("" + num).length > 1) {
                return num;
            }
            return "0" + num;
        }

        addNewItemButton.addEventListener("click", function () {
            localStorage.setItem('item', createItemDiv);
        });

        newItemNameInput.addEventListener("keyup", function () {
            if (newItemNameInput.value === "") {
                disableAllRowInputs(true, 0);
            } else {
                disableAllRowInputs(false, 0);
            }
        });

        function disableAllRowInputs(trueIfTrue, fromIndex) {
            for (var i = fromIndex; i < newItemRowDivs.length; i++) {
                inputsItemRowWhat[i].disabled = trueIfTrue;
                inputsItemRowTimes[i].disabled = trueIfTrue;
                inputsItemRowTimeSec[i].disabled = trueIfTrue;
            }
        }

        function setNewItemInputs() {
            inputsItemRowWhat = document.getElementsByClassName("item-row-what");
            inputsItemRowTimes = document.getElementsByClassName("item-row-times");
            inputsItemRowTimeSec = document.getElementsByClassName("item-row-time-sec");
        }

        function setNewItemLabels() {
            labelsItemRowWhat = document.querySelectorAll("label[for='item-row-what']");
            labelsItemRowTimes = document.querySelectorAll("label[for='item-row-times']");
            labelsItemRowTimeSec = document.querySelectorAll("label[for='item-row-time-sec']");
        }

        function newItemRowChange() {
            if (isNewItemNewRowNeeded(getNewItemRowCount())) {
                addNewRow();

                setNewItemInputs();
                setNewItemLabels();
                newItemRowDivs = document.getElementsByClassName("item-row");

                addActionsToLastRow(getNewItemRowCount());
            }
        }

        function addNewRow() {
            var newItemRow = document.createElement("div");
            newItemRow.classList.add("item-row");

            var input1 = document.createElement("input");
            input1.type = "text";
            input1.classList.add("item-row-what");
            var input2 = document.createElement("input");
            input2.type = "number";
            input2.min = "0";
            input2.classList.add("item-row-times");
            var input3 = document.createElement("input");
            input3.type = "number";
            input3.min = "0";
            input3.classList.add("item-row-time-sec");

            var label1 = document.createElement("label");
            label1.for = "item-row-what";
            label1.innerHTML = "Full path in Computer/blank for pause: ";
            var label2 = document.createElement("label");
            label2.for = "item-row-times";
            label2.innerHTML = "Times to repeat: ";
            var label3 = document.createElement("label");
            label3.for = "item-row-time-sec";
            label3.innerHTML = "Time to play(s): ";


            newItemRow.appendChild(label1);
            newItemRow.appendChild(input1);
            newItemRow.appendChild(label2);
            newItemRow.appendChild(input2);
            newItemRow.appendChild(label3);
            newItemRow.appendChild(input3);
            createItemDiv.appendChild(newItemRow);
            createItemDiv.appendChild(addNewItemButton);
        }


        function isNewItemNewRowNeeded(rowLength) {
            return (inputsItemRowWhat[rowLength - 1].value !== "" && (inputsItemRowTimes[rowLength - 1].value !== "" || inputsItemRowTimeSec[rowLength - 1].value !== "")) ||
                (inputsItemRowTimeSec[rowLength - 1].value !== "");
        }

        function getNewItemRowCount() {
            return inputsItemRowWhat.length;
        }

        //Now in next 3 function will be used isNewItemNewRowNeeded method, but these times it should check if rowLength would be  equal to how many rows there are, if new row would appear and if not, next rows should become unchangable
        function addActionsToLastRow(rowLength) {
            inputsItemRowWhat[rowLength - 1].addEventListener("keyup", function () {

                if (!isNewItemNewRowNeeded(rowLength)) {
                    disableAllRowInputs(true, rowLength);
                } else {
                    disableAllRowInputs(false, rowLength);
                    newItemRowChange(rowLength - 1);
                }
            });

            inputsItemRowTimes[rowLength - 1].addEventListener("keyup", function () {

                if (inputsItemRowTimes[rowLength - 1].value != "") {
                    clearedValuesTimeSec[rowLength - 1] = inputsItemRowTimeSec[rowLength - 1].value;
                    inputsItemRowTimeSec[rowLength - 1].value = "";
                    newItemRowChange(rowLength - 1);
                }

                if (!isNewItemNewRowNeeded(rowLength)) {
                    disableAllRowInputs(true, rowLength);
                } else {
                    disableAllRowInputs(false, rowLength);
                }
            });

            inputsItemRowTimeSec[rowLength - 1].addEventListener("keyup", function () {

                if (inputsItemRowTimeSec[rowLength - 1].value != "") {
                    clearedValuesTimes[rowLength - 1] = inputsItemRowTimes[rowLength - 1].value;
                    inputsItemRowTimes[rowLength - 1].value = "";
                    newItemRowChange(rowLength - 1);
                }

                if (!isNewItemNewRowNeeded(rowLength)) {
                    disableAllRowInputs(true, rowLength);
                } else {
                    disableAllRowInputs(false, rowLength);
                }
            });

        }









        //items
        var itemsDiv = document.getElementById("items");
        var itemsTableDiv = document.getElementById("items-table");
        var alarmStorage = [];
        var alarmsDiv = document.getElementById("alarms-div");

//        var tr = document.createElement("tr");
//        var th = document.createElement("th");
//        th.innerHTML = "Items";
//        var td;
//
//        itemsTableDiv.appendChild(tr);
//        tr.appendChild(th);
//
//        setAlarmNamesAndTimes();
//        console.log(alarmNamesAndTimesStorage);
//
//        localStorageItems.map(i => {
//            tr = document.createElement("tr");
//            td = document.createElement("td");
//
//            itemsTableDiv.appendChild(tr);
//            tr.appendChild(td);
//            td.innerHTML = i[0].itemName;
//        });
//
//        function setAlarmNamesAndTimes() {
//            alarmNamesAndTimesStorage = JSON.parse(localStorage.getItem('alarmNamesAndTimes'));
//
//            if (!Array.isArray(alarmNamesAndTimesStorage)) {
//                alarmNamesAndTimesStorage = [];
//            }
//        }
//
//        document.getElementById("alarm-names-and-times").addEventListener("click", function () {
//            alarmNamesAndTimesStorage[alarmNamesAndTimesStorage.length] = {
//                alarmName: document.getElementsByClassName("alarm-name")[0].value,
//                alarmTime: document.getElementsByClassName("when-alarm")[0].value
//            };
//            localStorage.setItem('alarmNamesAndTimes', JSON.stringify(alarmNamesAndTimesStorage));
//            console.log(alarmNamesAndTimesStorage);
//            console.log(localStorage.getItem('alarmNamesAndTimes'));
//        });
//
//
//
//
//
//
//
//
//
//        function getItemWithName(name) {
//            for (var i = 0; i < localStorageItems.length; i++) {
//                console.log(name + " : " + localStorageItems[i][0].itemName);
//                if (localStorageItems[i][0].itemName == name) {
//                    return localStorageItems[i];
//                }
//            }
//            return null;
//        }


//        //audios
//        var audioTagsDiv = document.getElementById("audio-tags");
//
//        alarmNamesAndTimesStorage.map(i => {
//            var item = getItemWithName(i.alarmName);
//
//            if (item == null) {
//                alert("ERROR");
//                console.log("error");
//            } else {
//                var audioTag = document.createElement("audio");
//                audioTag.src = item[0].valueItemRowWhat;
//                audioTag.controls = true;
//                audioTag.loop = true;
//                var p = document.createElement("p");
//                p.innerHTML = "Your browser doesn't support HTML5 audio.";
//                audioTagsDiv.appendChild(audioTag);
//                audioTag.appendChild(p);
//            }
//
//        });
//
//
//
//
//
//
//
//
//
//        //checking if alarm to run needed
//        var alarmNamesAndTimesRunned = alarmNamesAndTimesStorage.map(i => {
//            var obj =
//            {
//                name: i.alarmName,
//                times: 0,
//                startedCheckingTime: new Date()
//            };
//            return obj;
//        });
//
//        var checkingIfRunAlarmNeeded = setInterval(function () {
//            var currentTime = new Date();
//            for (var i = 0; i < alarmNamesAndTimesRunned.length; i++) {
//                if (getMinutesFromDate(alarmNamesAndTimesRunned[i].startedCheckingTime) <= getMinutesFromString(alarmNamesAndTimesStorage[i].alarmTime) && getMinutesFromDate(new Date()) >= getMinutesFromDate(alarmNamesAndTimesStorage[i].alarmTime) && ++alarmNamesAndTimesRunned[i].times === 1) {
//
//                        var item = getItemWithName(alarmNamesAndTimesRunned[i].alarmName);
//
//                        if (item == null) {
//                            alert("ERROR");
//                            console.log("error");
//                        } else {
//                            var audioTag = document.createElement("audio");
//                            audioTag.src = item[0].valueItemRowWhat;
//                            audioTag.controls = true;
//                            audioTag.loop = true;
//                            var p = document.createElement("p");
//                            p.innerHTML = "Your browser doesn't support HTML5 audio.";
//                            audioTagsDiv.appendChild(audioTag);
//                            audioTag.appendChild(p);
//                            audioTag.start();
//                        }
//
//                }
//            }
//        }, 500);
//
//        function getMinutesFromString(date) {
//            return date.substring(0, 2) * 60 + date.substring(3, 5) * 1;
//        }
//
//        function getMinutesFromDate(date) {
//            if (typeof date === Date) {
//                return date.getHours() * 60 + date.getMinutes();
//            }
//            
//        }
    }
)();
