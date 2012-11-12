function init() {    
var items = [
    {id: "first", value: "First"},
    {id: "Second", value: "Second"},
    {id: "third", value: "third"},   
    {id: "third", value: "third"},   
    {id: "third", value: "third"},   
    {id: "third", value: "third"},   
    {id: "third", value: "third"},   
    {id: "third", value: "third"},   
    {id: "third", value: "third"},   
    {id: "third", value: "third"},   
    {id: "third", value: "third"},
    {id: "third", value: "third"},
    {id: "third", value: "third"},
    {id: "third", value: "third"},
    {id: "long", value: "This is a loooooooooooooooooooooooong text"},   
];
var node = document.getElementById("node");
var onChangeCallback = function(item) { console.log(item); }; 
var selectBox = new SelectBox({id:'',value:""});
selectBox.appendTo(node);
selectBox.selectById("first");
selectBox.selectByName("Twice per ASDF ASDFASD FASD FASD Fweek");
var selected = selectBox.getSelected(); // returns {id: "once", value: "Once per week"},*/
var items =  selectBox.getItems(); // returns items
var size= selectBox.size(20);
selectBox.setOnChange(onChangeCallback);
selectBox.disable();
selectBox.enable();
selectBox.addItem({id:"item",value:"item"});
selectBox.insertItem(3,{id:"item",value:"item"});
selectBox.removeItemByPos(2);
//selectBox.removeItemById("Second");
selectBox.updateItemName("item", "Item Updated");
selectBox.selectByPos(1);
}

// ff, opera
if (/opera/i.test(navigator.userAgent)) {
    document.addEventListener("DOMContentLoaded", init, false);   
} else
// others
window.onload = init;



