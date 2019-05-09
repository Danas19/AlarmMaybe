(
    function () {
        var newItemRowDivs = document.getElementsByClassName("item-row");
        
        var itemRowWhatInputs = [];
        var itemRowTimesInputs = [];
        var itemRowTimeSecInputs = [];
        
        var itemRowWhatLabels = [];
        var itemRowTimesLabels = [];
        var itemRowTimeSecLabels = [];
        
        
        setNewItemInputs();
        setNewItemLabels();
        
        addActionsToLastRow(1);


        function setNewItemInputs() {
            itemRowWhatInputs = document.getElementsByClassName("item-row-what");
            itemRowTimesInputs = document.getElementsByClassName("item-row-times");
            itemRowTimeSecInputs = document.getElementsByClassName("item-row-time-sec");
        }
        
        function setNewItemLabels() {
            itemRowWhatLabels = document.querySelectorAll("label[for='item-row-what']");
            itemRowTimesLabels = document.querySelectorAll("label[for='item-row-times']");
            itemRowTimeSecLabels = document.querySelectorAll("label[for='item-row-time-sec']");
        }

        function newItemRowChange() {
            console.log(itemRowTimeSecInputs[getNewItemRowCount() - 1].value !== "" || itemRowTimesInputs[getNewItemRowCount() - 1].value !== "");
            if (isNewItemNewRowNeeded(getNewItemRowCount())) {

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
                document.getElementById("create-item").appendChild(newItemRow);
                
                setNewItemInputs();
                setNewItemLabels();
                addActionsToLastRow(getNewItemRowCount());
            }
        }

        function isNewItemNewRowNeeded(rowLength) {
            return itemRowWhatInputs[rowLength - 1].value !== "" && (itemRowTimeSecInputs[rowLength - 1].value !== "" || itemRowTimesInputs[rowLength - 1].value !== "");
        }

        function getNewItemRowCount() {
            return itemRowWhatInputs.length;
        }

        function addActionsToLastRow(rowLength) {
            itemRowWhatInputs[rowLength - 1].addEventListener("keydown", function () {
                newItemRowChange();
            });

            itemRowTimeSecInputs[rowLength - 1].addEventListener("keydown", function () {
                if (itemRowTimeSecInputs[rowLength - 1].value != "") {
                    itemRowTimesInputs[rowLength - 1].value = "";
                    newItemRowChange();
                }
            });

            itemRowTimesInputs[rowLength - 1].addEventListener("keydown", function () {
                if (itemRowTimesInputs[rowLength - 1].value != "") {
                    itemRowTimeSecInputs[rowLength - 1].value = "";
                    newItemRowChange();
                }
            });
        }
    }
)();
