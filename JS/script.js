(
    function() {
        var newItemItem = document.getElementsByClassName("newItemItem")[0];
        var newItemItemWhat = document.getElementsByClassName("newItemItemWhat")[0];
        var newItemItemTimes = document.getElementsByClassName("newItemItemTimes")[0];
        var newItemItemTime = document.getElementsByClassName("newItemItemTime")[0];
        
        newItemItemWhat.addEventListener("change", function() {
            newItemItemChange();
        });
        
        newItemItemTime.addEventListener("change", function() {
            newItemItemChange();
        });
        
        newItemItemTimes.addEventListener("change", function() {
            newItemItemChange();
        });
        
        function newItemItemChange() {
            if (newItemItemWhat.value != "" && (newItemItemTime.value != "" || newItemItemTimes.value != "")) {
                
                var newCreateItemItem = document.createElement("div");
                var input1 = document.createElement("input");
                var input2 = document.createElement("input");
                var input3 = document.createElement("input");
                
                newCreateItemItem.appendChild(input1);
                newCreateItemItem.appendChild(input2);
                newCreateItemItem.appendChild(input3);
                document.getElementById("create-item").appendChild(newCreateItemItem);
            }
        }
        
        console.log(newItemItem);
        
        
    }
)();