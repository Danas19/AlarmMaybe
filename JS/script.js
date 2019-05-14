(
    function () {
        var createItemDiv = document.getElementById("create-item");
        var newItemRowDivs = document.getElementsByClassName("item-row");

        //save from these lines to local storage START
        var newItemNameInput = document.getElementById("new-item-name");

        var inputsItemRowWhat = [];
        var inputsItemRowItemName = [];
        var inputsItemRowTimes = [];
        var inputsItemRowTimeSec = [];

        var clearedValuesTimes = [];
        var clearedValuesTimeSec = [];
        //save from these lines to local storage END

        var addNewItemButton = document.getElementById("add-new-item");
        changeButtonStyle(addNewItemButton);

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

        addActionsToLastRow(1);

        disableAllRowInputs(true, 0);
        disableNewItemButtonIfNeeded();

        addNewItemButton.addEventListener("click", function () {
            var newItemInfo = {
                itemName: newItemNameInput.value,
                rows: []
            };
            for (var i = 0; i < newItemRowDivs.length - 1; i++) {
                newItemInfo.rows[i] = {
                    itemRowWhat: inputsItemRowWhat[i].value,
                    itemRowItemName: inputsItemRowItemName[i].value,
                    valueItemRowTimes: inputsItemRowTimes[i].value,
                    valueItemRowTimeSec: inputsItemRowTimeSec[i].value,
                    startedCheckingTime: "",
                    timeLeftMillis: "",
                    timesRunnedAfterF5: parseInt(0),
                    clearedValueTimes: clearedValuesTimes[i],
                    clearedValueTimeSec: clearedValuesTimeSec[i]
                };
            }
            localStorageItems[localStorageItems.length] = newItemInfo;
            console.log(newItemInfo);
            localStorage.setItem('items', JSON.stringify(localStorageItems));

            while (createItemDiv.firstChild) {
                createItemDiv.removeChild(createItemDiv.firstChild);
            }
        });

        var action = setInterval(function () {
            var dateNewObject = new Date();
            timeOutputP.innerHTML = dateNewObject.getFullYear() + "-" +
                getTwoNumbers(dateNewObject.getMonth()) + "-" + getTwoNumbers(dateNewObject.getDay()) + " " + getTwoNumbers(dateNewObject.getHours()) + ":" + getTwoNumbers(dateNewObject.getMinutes()) + ":" + getTwoNumbers(dateNewObject.getSeconds());
        }, 1000);

        function getTwoNumbers(num) {
            //function to get from 23 to 23, but from 0 to 00, from 7 to 07... Used for showing time with 2 numbers, not 1
            if (("" + num).length > 1) {
                return num;
            }
            return "0" + num;
        }

        addNewItemButton.addEventListener("click", function () {
            localStorage.setItem('item', createItemDiv);
        });

        newItemNameInput.addEventListener("keyup", function () {
            if (newItemNameInput.value === "" || getItemWithName(newItemNameInput.value) != null) {
                disableAllRowInputs(true, 0);
            } else {
                disableAllRowInputs(false, 0);
            }
            disableNewItemButtonIfNeeded();
        });

        function changeButtonStyle(button) {
            button.classList.add("btn");
            button.classList.add("btn-success");
        }

        function disableAllRowInputs(trueIfTrue, fromIndex) {
            for (var i = fromIndex; i < newItemRowDivs.length; i++) {
                inputsItemRowWhat[i].disabled = trueIfTrue;
                inputsItemRowItemName[i].disabled = trueIfTrue;
                inputsItemRowTimes[i].disabled = trueIfTrue;
                inputsItemRowTimeSec[i].disabled = trueIfTrue;
            }
        }

        function setNewItemInputs() {
            inputsItemRowWhat = document.getElementsByClassName("item-row-what");
            inputsItemRowItemName = document.getElementsByClassName("item-row-item-name");
            inputsItemRowTimes = document.getElementsByClassName("item-row-times");
            inputsItemRowTimeSec = document.getElementsByClassName("item-row-time-sec");
        }

        function setNewItemLabels() {
            labelsItemRowWhat = document.querySelectorAll("label[for='item-row-what']");
            labelsItemRowItemName = document.querySelectorAll("label[for='item-row-item-name']");
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
            var input4 = document.createElement("input");
            input4.type = "text";
            input4.classList.add("item-row-item-name");
            var input3 = document.createElement("input");
            input3.type = "number";
            input3.min = "0";
            input3.classList.add("item-row-time-sec");

            var label1 = document.createElement("label");
            label1.for = "item-row-what";
            label1.innerHTML = "Full path in Computer/blank for pause: ";
            var label4 = document.createElement("label");
            label4.for = "item-row-item-name";
            label4.innerHTML = "/ Alarm item name: ";
            var label2 = document.createElement("label");
            label2.for = "item-row-times";
            label2.innerHTML = "Times to repeat: ";
            var label3 = document.createElement("label");
            label3.for = "item-row-time-sec";
            label3.innerHTML = "/ Time to play(s): ";


            newItemRow.appendChild(label1);
            newItemRow.appendChild(input1);
            newItemRow.appendChild(label4);
            newItemRow.appendChild(input4);
            newItemRow.appendChild(label2);
            newItemRow.appendChild(input2);
            newItemRow.appendChild(label3);
            newItemRow.appendChild(input3);
            createItemDiv.appendChild(newItemRow);
            createItemDiv.appendChild(addNewItemButton);
        }


        function isNewItemNewRowNeeded(rowLength) {
            return (inputsItemRowWhat[rowLength - 1].value !== "" || getItemWithName(inputsItemRowItemName[rowLength - 1].value) != null) && (inputsItemRowTimes[rowLength - 1].value !== "") ||
                ((inputsItemRowTimeSec[rowLength - 1].value !== "" && inputsItemRowItemName[rowLength - 1].value === "") || (inputsItemRowTimeSec[rowLength - 1].value !== "" && getItemWithName(inputsItemRowItemName[rowLength - 1].value) !== null));
        }

        function getNewItemRowCount() {
            return inputsItemRowWhat.length;
        }

        function disableNewItemButtonIfNeeded() {
            if (inputsItemRowWhat[inputsItemRowWhat.length - 1].disabled === true || newItemNameInput.value === "" || getItemWithName(newItemNameInput.value) !== null || inputsItemRowItemName.length === 1) {
                addNewItemButton.style.display = "none";
            } else {
                addNewItemButton.style.display = "block";
            }
        }

        //Now in next 3 function will be used isNewItemNewRowNeeded method, but these times it should check if rowLength would be  equal to how many rows there are, if new row would appear and if not, next rows should become unchangable
        function addActionsToLastRow(rowLength) {
            inputsItemRowWhat[rowLength - 1].addEventListener("keyup", function () {
                inputsItemRowItemName[rowLength - 1].value = "";

                if (!isNewItemNewRowNeeded(rowLength)) {
                    disableAllRowInputs(true, rowLength);
                } else {
                    disableAllRowInputs(false, rowLength);
                    newItemRowChange(rowLength - 1);
                }
            });

            inputsItemRowItemName[rowLength - 1].addEventListener("keyup", function () {
                inputsItemRowWhat[rowLength - 1].value = "";

                if (!isNewItemNewRowNeeded(rowLength)) {
                    disableAllRowInputs(true, rowLength);
                } else {
                    disableAllRowInputs(false, rowLength);
                    newItemRowChange(rowLength - 1);
                }
                disableNewItemButtonIfNeeded();
            });

            inputsItemRowTimes[rowLength - 1].addEventListener("keyup", function () {
                onChangeInputTimes(rowLength);
            });

            inputsItemRowTimes[rowLength - 1].addEventListener("mouseup", function () {
                onChangeInputTimes(rowLength);
            });


            inputsItemRowTimeSec[rowLength - 1].addEventListener("keyup", function () {
                onChangeInputTimeSec(rowLength);
            });

            inputsItemRowTimeSec[rowLength - 1].addEventListener("mouseup", function () {
                onChangeInputTimeSec(rowLength);
            });

        }

        function onChangeInputTimes(rowLength) {
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
            disableNewItemButtonIfNeeded();
        }

        function onChangeInputTimeSec(rowLength) {
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
            disableNewItemButtonIfNeeded();
        }

        function getItemWithName(name) {
            for (var i = 0; i < localStorageItems.length; i++) {
                if (localStorageItems[i].itemName == name) {
                    return localStorageItems[i];
                }
            }
            return null;
        }







        //alarm names and when
        var alarmStorage;

        var alarmsDiv = document.getElementById("set-times-for-alarms");
        var alarmRowsDivs = [];

        var saveAlarmButtons = [];

        var alarmNameInputs = [];
        var alarmTimeInputs = [];


        setAlarmStorage();
        console.log(alarmStorage);
        mapAlarmStorage(alarmStorage);

        function addNewAlarmRow() {
            var newAlarmRowDiv = document.createElement("div");
            newAlarmRowDiv.classList.add("alarm-names-and-times-rows");
            alarmsDiv.appendChild(newAlarmRowDiv);
            alarmRowsDivs[alarmRowsDivs.length] = newAlarmRowDiv;
        }

        function addBrToLastRow() {
            var newBr = document.createElement("br");
            alarmRowsDivs[alarmRowsDivs.length - 1].appendChild(newBr);
            alarmsDiv.appendChild(alarmRowsDivs[alarmRowsDivs.length - 1]);
        }

        function addNewSaveAlarmButton(innerHtml) {
            var alarmSaveButton = document.createElement("button");
            alarmSaveButton.type = "button";
            changeButtonStyle(alarmSaveButton);
            alarmSaveButton.classList.add("save-alarm-button");
            alarmSaveButton.innerHTML = innerHtml;
            alarmRowsDivs[alarmRowsDivs.length - 1].appendChild(alarmSaveButton);


            if (innerHtml.toLowerCase() !== "save all") {
                saveAlarmButtons[saveAlarmButtons.length] = alarmSaveButton;
                addActionToSaveAlarmButton(saveAlarmButtons.length - 1);
            } else {
                addActionToSaveAllAlarms(alarmSaveButton);
            }

        }

        function addActionToSaveAllAlarms(button) {
            button.addEventListener("click", function () {
                for (var i = 0; i < saveAlarmButtons.length; i++) {
                    if (getItemWithName(alarmNameInputs[index].value) === null) {
                        break;
                    }

                    if (i === saveAlarmButtons.length - 1) {
                        localStorage.setItem('alarm-storage', JSON.stringify(alarmStorage));
                    }
                }
            });
        }

        function addNewAlarmNameInput(value) {
            var newAlarmNameInput = document.createElement("input");
            newAlarmNameInput.type = "text";
            newAlarmNameInput.classList.add("alarm-name-inputs");
            newAlarmNameInput.value = value;
            alarmRowsDivs[alarmRowsDivs.length - 1].appendChild(newAlarmNameInput);
            alarmNameInputs[alarmNameInputs.length] = newAlarmNameInput;
        }

        function addNewAlarmTimeInput(value) {
            var newAlarmTimeInput = document.createElement("input");
            newAlarmTimeInput.type = "text";
            newAlarmTimeInput.classList.add("alarm-time-inputs");
            newAlarmTimeInput.value = value;
            alarmRowsDivs[alarmRowsDivs.length - 1].appendChild(newAlarmTimeInput);
            alarmTimeInputs[alarmTimeInputs.length] = newAlarmTimeInput;
        }



        function setAlarmStorage() {
            alarmStorage = JSON.parse(localStorage.getItem('alarm-storage'));

            if (!Array.isArray(alarmStorage)) {
                alarmStorage = [];
            }
        }

        function addAlarmSpan(innerHtml) {
            var span = document.createElement("span");
            span.innerHTML = innerHtml;
            alarmRowsDivs[alarmRowsDivs.length - 1].appendChild(span);
        }

        function mapAlarmStorage(alarmStorage) {
            for (var i = 0; i < alarmStorage.length; i++) {
                addNewAlarmRow();
                addAlarmLabel("alarm name: ");
                addNewAlarmNameInput(alarmStorage[i].alarmName);
                addAlarmLabel("alarm time ");
                addAlarmSpan("(hours:minutes, for ex. 12:57): ");
                addNewAlarmTimeInput(alarmStorage[i].alarmTime);
                addAlarmSpan("Inputed hours: " + getHoursFromString(alarmStorage[i].alarmTime) + ", inputed minutes: " + getMinutesFromString(alarmStorage[i].alarmTime));
                addNewSaveAlarmButton("Save");

                alarmStorage[i].startedCheckingTime = new Date();
                setAlarmStorageTimeLeft(i);
                timesRunnedAfterF5 = 0 * 0;

                console.log(alarmStorage[i].startedCheckingTime);
            }
            
            function getHoursFromString(string) {
                return parseInt(string.substring(0, 3));
            }
            
            function getMinutesFromString(string) {
                return parseInt(string.substring(3, 5));
            }

            addNewAlarmRow();
            addAlarmLabel("alarm name: ");
            addNewAlarmNameInput("");
            addAlarmLabel("alarm time ");
            addAlarmSpan("(hours:minutes, for ex. 12:57): ");
            addNewAlarmTimeInput("");
            addNewSaveAlarmButton("Save");



            addBrToLastRow();
            addNewSaveAlarmButton("Save all");
        }

        function setAlarmStorageTimeLeft(i) {
            timeLeft = (alarmStorage[i].alarmTime.substring(0, 3) * 60 + alarmStorage[i].alarmTime.substring(3, 5) - alarmStorage[i].startedCheckingTime.getHours() * 60 - alarmStorage[i].startedCheckingTime.getMinutes());

            if (timeLeft < 0) {
                timeLeft = 24 * 60 + timeLeft;
            }

            timeLeft *= 1000;
            alarmStorage[i].timeLeftMillis = timeLeft;
        }

        function addAlarmLabel(innerHtml) {
            var label = document.createElement("label");
            label.innerHTML = innerHtml;
            alarmRowsDivs[alarmRowsDivs.length - 1].appendChild(label);

        }

        function addActionToAllSaveButtons() {
            for (var i = 0; i < addNewSaveAlarmButton.length; i++) {
                addActionToSaveAlarmButton(i);
            }
        }

        function addActionToSaveAlarmButton(index) {
            console.log("index: " + index);
            saveAlarmButtons[index].addEventListener("click", function () {
                if (getItemWithName(alarmNameInputs[index].value) != null) {
                    var localStorageOld = JSON.parse(localStorage.getItem('alarm-storage'));
                    if (!Array.isArray(localStorageOld)) {
                        localStorageOld = [];
                    }

                    localStorageOld[index] = {
                        alarmName: alarmNameInputs[index].value,
                        alarmTime: alarmTimeInputs[index].value,
                        startedCheckingTime: "",
                        timeLeftMillis: ""
                    };
                    localStorage.setItem('alarm-storage', JSON.stringify(localStorageOld));

                } else {
                    alert("Error, no item with name: " + alarmNameInputs[index].value);
                }
            });
        }

        var doAlarmAction = setInterval(function () {

            for (var i = 0; i < alarmStorage.length; i++) {
                console.log(new Date().getTime() - alarmStorage[i].startedCheckingTime.getTime());
                console.log(alarmStorage[i].timeLeftMillis);

                if (alarmStorage[i].timeLeftMillis + alarmStorage[i].timesRunnedAfterF5 * 1000 * 3600 * 24 <= new Date().getTime() - alarmStorage[i].startedCheckingTime.getTime()) {
                    ++alarmStorage[i].timesRunnedAfterF5;
                    alert("RUN MUSIC");
                    console.log("RUN MUSIC");
                }
            }
        }, 5000);
    }
)();
