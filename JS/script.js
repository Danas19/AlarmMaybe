(
    function () {
        var newItemRowDivs = document.getElementsByClassName("item-row");
        
        var itemRowWhatInputs;
        var itemRowTimesInputs;
        var itemRowTimeSecInputs;
        
        setNewItemInputs();
        
        var itemRowWhatLabels = document.querySelectorAll("label[for='item-row-what']");
        console.log(itemRowWhatLabels)
        

        addActionsToLastRow();


        function setNewItemInputs() {
            itemRowWhatInputs = document.getElementsByClassName("item-row-what");
            itemRowTimesInputs = document.getElementsByClassName("item-row-times");
            itemRowTimeSecInputs = document.getElementsByClassName("item-row-time-sec");
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

        function addActionsToLastRow() {
            itemRowWhatInputs[getNewItemRowCount() - 1].addEventListener("change", function () {
                newItemRowChange();
            });

            itemRowTimeSecInputs[getNewItemRowCount() - 1].addEventListener("change", function () {
                newItemRowChange();
            });

            itemRowTimesInputs[getNewItemRowCount() - 1].addEventListener("change", function () {
                newItemRowChange();
            });
        }
    }
)();
