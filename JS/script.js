(
    function () {
        var newItemRowDivs = document.getElementsByClassName("item-row");
        
        var itemRowWhatInputs = [];
        var itemRowTimesInputs = [];
        var itemRowTimeSecInputs = [];
        
        var itemRowWhatLabels = [];
        var itemRowTimesLabels = [];
        var itemRowTimeSecLabels = [];
        
        setNewItemInputs(1);
        setNewItemLabels(1);
        
        console.log(itemRowTimeSecLabels);
        
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
            if (isNewItemNewRowNeeded()) {

                var newItemRow = document.createElement("div");
                newItemRow.classList.add("item-row");
                var input1 = document.createElement("input");
                var input2 = document.createElement("input");
                var input3 = document.createElement("input");

                newItemRow.appendChild(input1);
                newItemRow.appendChild(input2);
                newItemRow.appendChild(input3);
                document.getElementById("create-item").appendChild(newItemRow);
            }
        }

        function isNewItemNewRowNeeded() {
            return itemRowWhatInputs[getNewItemRowCount() - 1].value != "" && (itemRowTimeSecInputs[getNewItemRowCount() - 1].value != "" || itemRowTimesInputs[getNewItemRowCount() - 1].value != "");
        }

        function getNewItemRowCount() {
            return itemRowWhatInputs.length;
        }

        function addActionsToLastRow(rowLength) {
            itemRowWhatInputs[rowLength - 1].addEventListener("change", function () {
                newItemRowChange();
            });

            itemRowTimeSecInputs[rowLength - 1].addEventListener("change", function () {
                newItemRowChange();
            });

            itemRowTimesInputs[rowLength - 1].addEventListener("change", function () {
                newItemRowChange();
            });
        }
    }
)();
