// search customer
$("#txtCustomerID").on('keyup', function (eObj) {
    if (eObj.key == "Enter") {
        let customer = searchCustomer2($(this).val());
        if (customer != null) {
            $("#txtCustomerName2").val(customer.getCustomerName());
        } else {
            clearcustomer2();
        }
    }
});

function searchCustomer2(customerID) {
    for (var i in customerTable) {
        if (customerTable[i].getCustomerID() == customerID) return customerTable[i];
    }
    return null;
}

function clearcustomer2() {
    $('#txtCustomerID').val("");     
}

// search item
$("#txtItemCode2").on('keyup', function (eObj) {
    if (eObj.key == "Enter") {
        let item = searchItem2($(this).val());
        if (item != null) {
            $("#txtItemName2").val(item.getItemName());
            $("#txtInStocks2").val(item.getQtyOnHand());
            $("#txtUnitPrice2").val(item.getUnitPrice());
        } else {
            clearcustomer2();
        }
    }
});

function searchItem2(itemCode) {
    for (var i in itemTable) {
        if (itemTable[i].getItemCode() == itemCode) return itemTable[i];
    }
    return null;
}

function clearItem2() {
    $('#txtItemCode2').val("");     
}

// ===============================================================================================
// save add to list
$('#btnAddToList').click(function () {
    let itemcode = $("#txtItemCode2").val();
    let itemname = $("#txtItemName2").val();
    let unitprice = $("#txtUnitPrice2").val();
    let qty = $("#txtQuantity").val();
    let total = $('#txtQuantity').val()* $('#txtUnitPrice2').val(); 

    let newQty;
    let stock = $("#txtInStocks2").val();
    let qty1 = $("#txtQuantity").val();

    newQty=stock-qty1;
    let allItems = itemTable;
    for (let i = 0; i < allItems.length; i++) {
        if (allItems[i].getItemCode() == $('#txtItemCode2').val()) {
            allItems[i].setQtyOnHand(newQty);
        }
        loadAllItems();
    }

    let result = saveItemList(itemcode, itemname, unitprice, qty, total);
    if(result)clearfields();
    subTotal();
});

function saveItemList(itemcode, itemname, unitprice, qty, total) {
    let itemlist = new ItemListDTO(itemcode, itemname, unitprice, qty, total);
    itemList.push(itemlist);// item list aded

    // load the table
    loadAllItemList();
    return true;   
}

function getAllList() {
    return itemList;
}
function loadAllItemList() {
    let allItemList = getAllList();
    $('#tblLIst').empty(); // clear all the table before adding for avoid duplicate
    for (var i in allItemList) {
        let code = allItemList[i].getIlcode();
        let name = allItemList[i].getIlname();
        let uprice = allItemList[i].getIluprice();
        let qty = allItemList[i].getIlqty();
        let total = allItemList[i].getIltotal();

        var row = `<tr><td>${code}</td><td>${name}</td><td>${uprice}</td><td>${qty}</td><td>${total}</td></tr>`;
        $('#tblLIst').append(row);
    }
    $('#tblLIst>tr').click(function () {
        let code=$(this).children('td:eq(0)').text();
        let name=$(this).children('td:eq(1)').text();
        let uprice=$(this).children('td:eq(2)').text();
        let qty=$(this).children('td:eq(3)').text();
        let total=$(this).children('td:eq(4)').text();
        
        $("#txtItemCode2").val(code);
        $("#txtItemName2").val(name);
        $("#txtUnitPrice2").val(uprice);
        $("#txtQuantity").val(qty);
         
        
      
   });
}

// ========================================================================================================
// delete list
$("#btnClear").click(function () {
    let itemCode = $("#txtItemCode2").val();
    let option=confirm(`Do You Want to Remove This Item ? ID:${itemCode}`);
    if (option){
        let result=deleteItemList(itemCode);
        if (result){
            alert("Item Successfully Removed From the List !");
        } else{
            alert("Delete Failed !")
        }

    }
    loadAllItemList();
    clearfields();
    subTotal();
});

function searchItemList(itemCode) {
    for (var i in itemList) {
        if (itemList[i].getIlcode() == itemCode) return itemList[i];
    }
    return null;
}
function deleteItemList(itemCode) {
    let item = searchItemList(itemCode);
    if (item != null) {
        let indexNumber = itemList.indexOf(item);
        itemList.splice(indexNumber, 1);
        return true;
    } else {
        return false;
    }
}

// delete all list
$("#btnClearAll").click(function () {
    let option=confirm(`Do You Want to Remove This Item List ?`);
    let allItemList = getAllItemList();
    if (option){    
        for (var i in allItemList){
            // allItemList.pop();
            allItemList.splice(i);
             
        }
    }
    loadAllItemList();
    clearfields();
    subTotal();
});


function getAllItemList() {
    return itemList;
}

// ===============================================================================================
// clear feilds
function clearfields() {
    $("#txtItemCode2").val("");
    $("#txtItemName2").val("");
    $("#txtUnitPrice2").val("");
    $("#txtQuantity").val("");
    $("#txtInStocks2").val("");
    // $("#txtOrderId").val("");
    // $("#txtCustomerID").val("");
    // $("#txtCustomerName2").val("");
     
         
    }

// =============================================================================================
// calculate total
function subTotal() {
    var orderTotal = 0;
    for (var i in itemList) {
        var rowTotals =itemList[i].getIltotal() ;
        orderTotal += rowTotals;
    }
    $("#subTotal").text(orderTotal);
  
}

// =================================================================================================
// manage payments
$("#txtCash").on('keyup', function (eObj) {
    let balance=0;
    let total =$("#subTotal").text();
    let discount=0;
    if (eObj.key == "Enter") {
        if(total==2000){
            discount=total*(10/100);
        }else if(total==5000){
            discount=total*(20/100);
        }
        let cash = $("#txtCash").val();
        balance= cash-(total-discount);
        
    }
    $("#txtDiscount").val(discount);
    $("#txtBalance").val(balance);
});

// clear
function clearpaymentfields() {
    $("#txtCash").val("");
    $("#txtDiscount").val("");
    $("#txtBalance").val("");
    }

// ====================================================================================================
// place order
$('#btnPlaceOrder').click(function () {
    let orderID = $("#txtOrderId").val();
    let date =  $("#txtDate").val();
    let cID =$("#txtCustomerID").val();
    
    let orderDetails = [];

    if ($('#txtCustomerId').val() !== "") {
        if (!$('#tblLIst').is(':empty')) {
            $('#tblLIst>tr').each(function () {
                orderDetails.push(new OrderDetailsDTO(
                    orderID,
                    $($(this).children().get(0)).text(),
                    $($(this).children().get(1)).text(),
                    $($(this).children().get(2)).text(),
                ));
            });
            let orderDTO = new OrderDTO(orderID, date, cID, orderDetails);
            orderTable.push(orderDTO);

            alert("Order Placed..!");
            loadAllOrderList();
            clearOrderfields();
            generateOrderID();
        } else {
            alert("Cart Is Empty..!");
            // disablePlaceOrder();
        }
    } else {
        alert("Please Select Customer..!");
        // $('#cmbCustomerId').focus();
    }
    // let itemcode = $("#txtItemCode2").val();
    // let unitprice = $("#txtUnitPrice2").val();
    // let qty = $("#txtQuantity").val();
     

    // let result1 = saveOrder(orderID, date, cID);
    // let result2 = saveOrderDetails(orderID, itemcode, unitprice, qty);
    // if(result1 && result2)clearOrderfields();
    // generateOrderID();
     

});

function getAllOrders() {
    return orderTable;
}

function loadAllOrderList() {
    let allOrderList = getAllOrders();
    $('#tblOrders').empty(); // clear all the table before adding for avoid duplicate
    for (var i in allOrderList) {
        let id = allOrderList[i].getOrderId();
        let date = allOrderList[i].getDate();
        let cid = allOrderList[i].getCusId();

        var row = `<tr><td>${id}</td><td>${date}</td><td>${cid}</td></tr>`;
        $('#tblOrders').append(row);
    }
}

//search Order
$('#txtOrderId').on('keydown', function (event) {
    if (event.key === "Enter") {
        $('#tblLIst').empty();
        let order = searchOrder($(this).val());
        if (order != null) {
            $('#txtOrderId').val(order.getOrderId());
            $('#txtDate').val(order.getDate());
            $('#txtCustomerID').val(order.getCusId());
            let searchCustomer1 = searchCustomer2(order.getCusId());
            $('#txtCustomerName2').val(searchCustomer1.getCustomerName());
             

            let orderDetail = order.getOrderDetail();
            for (var j in orderDetail) {
                let itemCode1 = orderDetail[j].getCode();
                let quantity1 = orderDetail[j].getQty();
                let unitPrice1 = orderDetail[j].getUprice();
                let searchItem1 = searchItem(itemCode1);
                let name = searchItem1.getItemName();
                let total1 = quantity1 * unitPrice1;
                var row = `<tr><td>${itemCode1}</td><td>${name}</td><td>${unitPrice1}</td><td>${quantity1}</td><td>${total1 + ".00"}</td></tr>`;
                $('#tblLIst').append(row);
            }
        }
        // $('#tblCart>tr').off('dblclick');
        // $('#tblCart>tr').on('dblclick', function () {
        //     $(this).remove();
        // });
    }
});

function searchOrder(orId) {
    for (var i in orderTable) {
        if (orId === orderTable[i].getOrderId()) {
            return orderTable[i];
        }
    }
    return null;
}


// function getAllOrderDetails() {
//     return orderDetailsTable;
// }

// function loadAllOrderDetails() {
//     let allOrderDetailsList = getAllOrderDetails();
//     $('#tblLIst').empty(); // clear all the table before adding for avoid duplicate
//     for (var i in allOrderDetailsList) {
//         let oid = allOrderDetailsList[i].getId();
//         let code = allOrderDetailsList[i].getCode();
//         let price = allOrderDetailsList[i].getUprice();
//         let qtyl = allOrderDetailsList[i].getQty();

//         var row = `<tr><td>${oid}</td><td>${code}</td><td>${price}</td><td>${qtyl}</td></tr>`;
//         $('#tblLIst').append(row);
//     }

// }

function clearOrderfields() {
    $("#txtItemCode2").val("");
    $("#txtItemName2").val("");
    $("#txtUnitPrice2").val("");
    $("#txtQuantity").val("");
    $("#txtInStocks2").val("");
    $("#txtOrderId").val("");
    $("#txtCustomerID").val("");
    $("#txtCustomerName2").val("");
    $('#tblLIst').empty();
         
    }


function generateOrderID() {
    if(orderTable.length == 0){
        $("#txtOrderId").val("R-001");
    }else{
        let lastOrderID=orderTable[orderTable.length-1].getOrderId();
        let newID =Number.parseInt(lastOrderID.substring(2, 5))+1;
        if(newID < 10){
            newID="R-00"+newID;
        }else if(newID<100){
            newID="R-0" + newID;
        }
        $("#txtOrderId").val(newID);
    }
}
