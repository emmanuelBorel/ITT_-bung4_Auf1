var counter = 5;
const CHECKBOX = 
'<div class = line>'+
    '<label class = "checkbox_container">'+
        '<span class = "label">$TEXT</span>'+
        '<input type = "checkbox" checked id ="task$ID" name="taskID">'+
        '<span class="fakebox"/>'+
    '</label>'+
'</div>';  

document.addEventListener("DOMContentLoaded", function(event){
    main();
})
function main(){
    addEventListenersToCheckBoxes();
    addEventListenerToInput();
    testAjax();

}

function addEventListenersToCheckBoxes(){
    let checkboxes = document.querySelectorAll("input[type = checkbox]");
    checkboxes.forEach(addEventListenerToCheckBox);
}

function addEventListenerToCheckBox(node){
    node.addEventListener('change', function(event){
        if(this.checked){
            document.querySelector("#tasks_done").prepend(this.parentNode.parentNode);

        }else{
            document.querySelector("#new_task").parentNode.after(this.parentNode.parentNode);
        }
    });

}

function addEventListenerToInput(){
    var element = document.querySelector("#new_task");
    element.addEventListener("keypress", function(event){
        if(event.key === "Enter"){
            counter++;
            addTask(this.value, counter);
            event.preventDefault();
        }
    });
}

function addTask(text, id, open = true){
    if(typeof text === 'String' && text.length === 0){
        alert("Eine leere Aufgabe kann nicht hinzugefügt werden");
    }else{
        let newELem = CHECKBOX.replace("checked", open?"":"checked").replace(/\&ID/g, counter);
        let div = document.createElement('div');
        div.innerHTML = newELem.trim();
        if(open){
            document.querySelector("#new_task").parentNode.after(div.firstChild);
            addEventListenerToCheckBox(document.querySelector("#tasksopen input[ type = checkbox]"));
        } else{
             document.querySelector("#tasks_done").prepend(div.firstChild);
             addEventListenerToCheckBox(document.querySelector("#tasks_done input[type=checkbox]"));
        }
    }
}

