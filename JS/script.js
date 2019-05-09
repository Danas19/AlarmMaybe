(
    function () {
        var createItemDiv = document.getElementById("create-item");
        var newItemRowDivs = document.getElementsByClassName("item-row");
        
        var inputsItemRowWhat = [];
        var inputsItemRowTimes = [];
        var inputsItemRowTimeSec = [];
        
        var labelsItemRowWhat = [];
        var labelsItemRowTimes = [];
        var labelsItemRowTimeSec = [];
        
        var addNewItemButton = document.getElementById("add-new-item");
        
        
        setNewItemInputs();
        setNewItemLabels();
        
        addActionsToLastRow(1);


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
                console.log(inputsItemRowTimes[0].value);

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
                label1.innerHTML = "Full path in pc: ";
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
                
                setNewItemInputs();
                setNewItemLabels();
                addActionsToLastRow(getNewItemRowCount());
                
            }
        }

        function isNewItemNewRowNeeded(rowLength) {
            return inputsItemRowWhat[rowLength - 1].value !== "" && (inputsItemRowTimes[rowLength - 1].value !== "" || inputsItemRowTimeSec[rowLength - 1].value !== "");
        }

        function getNewItemRowCount() {
            return inputsItemRowWhat.length;
        }

        function addActionsToLastRow(rowLength) {
            inputsItemRowWhat[rowLength - 1].addEventListener("keydown", function () {
                newItemRowChange();
            });
            
            inputsItemRowTimes[rowLength - 1].addEventListener("keydown", function () {
                if (inputsItemRowTimes[rowLength - 1].value != "") {
                    inputsItemRowTimeSec[rowLength - 1].value = "";
                    newItemRowChange();
                }
            });

            inputsItemRowTimeSec[rowLength - 1].addEventListener("keydown", function () {
                if (inputsItemRowTimeSec[rowLength - 1].value != "") {
                    inputsItemRowTimes[rowLength - 1].value = "";
                    newItemRowChange();
                }
            });
            
        }
    }
)();
