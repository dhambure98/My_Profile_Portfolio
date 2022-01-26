// Events
// save
$('#btnItemAdd').click(function () {
        let itemCode=$('#txtItemCode').val();
        let itemName=$('#txtItemName').val();
        let qtyOnhand=$('#txtQtyOnHand').val();
        let unitprice=$('#txtUnitePrice').val();
     

    let result = saveItem(itemCode, itemName, qtyOnhand, unitprice);
    if(result)clearitem();
    generateItemCode();
});

// update
$("#btnItemUpdate").click(function () {
    let itemCode=$('#txtItemCode').val();
        let itemName=$('#txtItemName').val();
        let qtyOnhand=$('#txtQtyOnHand').val();
        let unitprice=$('#txtUnitePrice').val();

    let option=confirm(`Do You Want to Update Item ? ID:${itemCode}`);
    if (option){
       let result= updateItem(itemCode, itemName, qtyOnhand, unitprice);
       if (result){
           alert("Item Successfully Updated !");
       }else{
           alert("Update Faild !");
       }
    }
     loadAllItems();
     clearitem();
     generateItemCode();

});

// delete
$("#btnItemDelete").click(function () {
    let itemCode = $("#txtItemCode").val();
    let option=confirm(`Do You Want to Delete ? ID:${itemCode}`);
    if (option){
        let result=deleteItem(itemCode);
        if (result){
            alert("Item Successfully Deleted !");
        } else{
            alert("Delete Failed !")
        }

    }
    loadAllItems();
    clearitem();
    generateItemCode();
});

// search
$("#txtItemCode").on('keyup', function (eObj) {
    if (eObj.key == "Enter") {
        let item = searchItem($(this).val());
        if (item != null) {
            $("#txtItemCode").val(item.getItemCode());
            $("#txtItemName").val(item.getItemName());
            $("#txtQtyOnHand").val(item.getQtyOnHand());
            $("#txtUnitePrice").val(item.getUnitPrice());
        } else {
            // clearitem();
        }
    }
});


// ==================================================================================================
//Functions
// save item
function getAllItems() {
    return itemTable;
}
function saveItem(itemCode, itemName, qtyOnhand, unitprice) {
    let item = new ItemDTO(itemCode, itemName, qtyOnhand, unitprice);
    itemTable.push(item);// item aded

    loadAllItems();
    return true;   
}

// update customer
function updateItem(itemCode, itemName, qtyOnhand, unitprice) {
    let item = searchItem(itemCode);
    if (item != null) {
        item.setItemName(itemName)
        item.setQtyOnHand(qtyOnhand)
        item.setUnitPrice(unitprice);
        return true;
    } else {
        return false;
    }
    
}

// search customer
function searchItem(itemCode) {
    for (var i in itemTable) {
        if (itemTable[i].getItemCode() == itemCode) return itemTable[i];
    }
    return null;
}

//delete customer
function deleteItem(itemCode) {
    let item = searchItem(itemCode);
    if (item != null) {
        let indexNumber = itemTable.indexOf(item);
        itemTable.splice(indexNumber, 1);
        return true;
    } else {
        return false;
    }
}


// =====================================================================================================
// other functions
function loadAllItems() {
    let allItems = getAllItems();
    $('#tblItem').empty(); // clear all the table before adding for avoid duplicate
    for (var i in allItems) {
        let code = allItems[i].getItemCode();
        let name = allItems[i].getItemName();
        let qtyOnhand = allItems[i].getQtyOnHand();
        let unitprice = allItems[i].getUnitPrice();

        var row = `<tr><td>${code}</td><td>${name}</td><td>${qtyOnhand}</td><td>${unitprice}</td></tr>`;
        $('#tblItem').append(row);
    }
    $('#tblItem>tr').click(function () {
        let code=$(this).children('td:eq(0)').text();
        let name=$(this).children('td:eq(1)').text();
        let qtyOnhand=$(this).children('td:eq(2)').text();
        let unitprice=$(this).children('td:eq(3)').text();
        
        $("#txtItemCode").val(code);
        $("#txtItemName").val(name);
        $("#txtQtyOnHand").val(qtyOnhand);
        $("#txtUnitePrice").val(unitprice);
        
      
   });
}

function clearitem() {
        $('#txtItemCode').val("");
        $('#txtItemName').val("");
        $('#txtQtyOnHand').val("");
        $('#txtUnitePrice').val("");
}

function generateItemCode() {
    if(itemTable.length == 0){
        $("#txtItemCode").val("I-001");
    }else{
        let lastItemCode=itemTable[itemTable.length-1].getItemCode();
        let newCode =Number.parseInt(lastItemCode.substring(2, 5))+1;
        if(newCode < 10){
            newCode="I-00"+newCode;
        }else if(newCode<100){
            newCode="I-0" + newCode;
        }
        $("#txtItemCode").val(newCode);
    }
}

// reg ex
let itemCOdeRegEx=/^(I-)[0-9]{1,3}$/;
$("#txtItemCode").on('keyup',function (event){
    if (event.key=="Enter"){
        $('#txtItemName').focus();
    }
    let inputCode=$("#txtItemCode").val();
    if (itemCOdeRegEx.test(inputCode)){
        $("#txtItemCode").css('border','1px solid green');
        $("#lblitemcode").text("");
    }else{
        $("#txtItemCode").css('border','1px solid red');
        $("#lblitemcode").text('Invalid Item Code (I-001)');
    }
});

$("#txtItemName").on('keyup',function (event){
    if (event.key=="Enter"){
        $('#txtQtyOnHand').focus();
    }
});

$("#txtQtyOnHand").on('keyup',function (event){
    if (event.key=="Enter"){
        $('#txtUnitePrice').focus();
    }
});

$("#txtUnitePrice").on('keyup',function (event){
    if (event.key=="Enter"){
        $('#btnItemAdd').focus();
    }
});

