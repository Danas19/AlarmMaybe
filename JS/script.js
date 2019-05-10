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


        setNewItemInputs();
        setNewItemLabels();

        addActionsToLastRow(1);

        disableEnableAllRowInputs(true);

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
                disableEnableAllRowInputs(true);
            } else {
                disableEnableAllRowInputs(false);
            }
        });

        function disableEnableAllRowInputs(trueFalse) {
            for (var i = 0; i < newItemRowDivs.length; i++) {
                inputsItemRowWhat[i].disabled = trueFalse;
                inputsItemRowTimes[i].disabled = trueFalse;
                inputsItemRowTimeSec[i].disabled = trueFalse;
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
                console.log(newItemRowDivs);

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
            label1.innerHTML = "Full path in pc/blank for pause: ";
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

        function addActionsToLastRow(rowLength) {
            inputsItemRowWhat[rowLength - 1].addEventListener("keyup", function () {
                newItemRowChange();
            });

            inputsItemRowTimes[rowLength - 1].addEventListener("keyup", function () {
                if (inputsItemRowTimes[rowLength - 1].value != "") {
                    clearedValuesTimeSec[rowLength - 1] = inputsItemRowTimeSec[rowLength - 1].value;
                    inputsItemRowTimeSec[rowLength - 1].value = "";
                    newItemRowChange();
                }
            });

            inputsItemRowTimeSec[rowLength - 1].addEventListener("keyup", function () {
                if (inputsItemRowTimeSec[rowLength - 1].value != "") {
                    clearedValuesTimes[rowLength - 1] = inputsItemRowTimes[rowLength - 1].value;
                    inputsItemRowTimes[rowLength - 1].value = "";
                    newItemRowChange();
                }
            });

        }
    }
)();
