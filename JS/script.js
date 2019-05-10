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
        
        document.getElementById("delete-local-storage").addEventListener("click", function() {
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
            var newItemRowsValues = [];
            for (var i = 0; i < newItemRowDivs.length - 1; i++) {
                newItemRowsValues[i] = {
                    itemName: newItemNameInput.value,
                    valueItemRowWhat: inputsItemRowWhat[i].value,
                    valueItemRowTimes: inputsItemRowTimes[i].value,
                    valueItemRowTimeSec: inputsItemRowTimeSec[i].value,
                    clearedValueTimes: clearedValuesTimes[i],
                    clearedValueTimeSec: clearedValuesTimeSec[i]
                };
            }
            localStorageItems[localStorageItems.length] = newItemRowsValues;
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
    }
)();
