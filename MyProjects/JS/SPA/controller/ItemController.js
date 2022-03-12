/**
 * @ author : A.D.Liyanage
 * @ since : 0.1.0
 **/

/* validation started */
/* Regular expression */
var itemCodeRegEx = /^(I00-)[0-9]{3}$/;
var itemNameRegEx = /^[A-z ]{4,}$/;
var itemUnitPriceRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;
var itemQtyOnHandRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;

$('#txtItemCode,#txtItemName,#txtItemQty,#txtItemPrice').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault(); // stop execution of the button
    }
});

$('#txtItemCode,#txtItemName,#txtItemQty,#txtItemPrice').on('blur', function () {
    formValid();
});

//focusing events
$("#txtItemCode").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }

    if (eventOb.key == "Control") {
        var typedCustomerID = $("#txtItemCode").val();
        var srcCustomer = searchCustomerFromID(typedCustomerID);
        $("#txtItemCode").val(srcCustomer.getCustomerID());
        $("#txtItemName").val(srcCustomer.getCustomerName());
        $("#txtItemQty").val(srcCustomer.getCustomerAddress());
        $("#txtItemPrice").val(srcCustomer.getCustomerTp());
    }
});

$("#txtItemName").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#txtItemQty").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#txtItemPrice").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

// focusing events end
$("#btnSaveItem").attr('disabled', true);

function formValid() {
    var cusID = $("#txtItemCode").val();
    $("#txtItemCode").css('border', '1px solid blue');
    $("#lblItemCode").text("");
    if (itemCodeRegEx.test(cusID)) {
        var cusName = $("#txtItemName").val();
        if (itemNameRegEx.test(cusName)) {
            $("#txtItemName").css('border', '1px solid blue');
            $("#lblItemName").text("");
            var cusAddress = $("#txtItemQty").val();
            if (itemUnitPriceRegEx.test(cusAddress)) {
                var cusTp = $("#txtItemPrice").val();
                var resp = itemQtyOnHandRegEx.test(cusTp);
                $("#txtItemQty").css('border', '1px solid blue');
                $("#lblItemQty").text("");
                if (resp) {
                    $("#txtItemPrice").css('border', '1px solid blue');
                    $("#lblItemPrice").text("");
                    return true;
                } else {
                    $("#txtItemPrice").css('border', '2px solid red');
                    $("#lblItemPrice").text("Customer Tp is a required field : Pattern ");
                    return false;
                }
            } else {
                $("#txtItemQty").css('border', '2px solid red');
                $("#lblItemQty").text("Item Qty is a required field : Numbers");
                return false;
            }
        } else {
            $("#txtItemName").css('border', '2px solid red');
            $("#lblItemName").text("Item Name is a required field : Mimimum 3, Max 20, Spaces Allowed");
            return false;
        }
    } else {
        $("#txtItemCode").css('border', '2px solid red');
        $("#lblItemCode").text("Item Code is a required field : Pattern I00-000");
        return false;
    }
}

function checkIfValid() {
    var cusID = $("#txtItemCode").val();
    if (itemCodeRegEx.test(cusID)) {
        $("#txtItemName").focus();
        var cusName = $("#txtItemName").val();
        if (itemNameRegEx.test(cusName)) {
            $("#txtItemQty").focus();
            var cusAddress = $("#txtItemQty").val();
            if (itemUnitPriceRegEx.test(cusAddress)) {
                $("#txtItemPrice").focus();
                var cusTp = $("#txtItemPrice").val();
                var resp = itemQtyOnHandRegEx.test(cusTp);
                if (resp) {
                    let res = confirm("Do you really need to add this Item ..?");
                    if (res) {
                        saveCustomer();
                        clearAll();
                    }
                } else {
                    $("#txtItemPrice").focus();
                }
            } else {
                $("#txtItemQty").focus();
            }
        } else {
            $("#txtItemName").focus();
        }
    } else {
        $("#txtItemCode").focus();
    }
}

function setButton() {
    let b = formValid();
    if (b) {
        $("#btnSaveItem").attr('disabled', false);
    } else {
        $("#btnSaveItem").attr('disabled', true);
    }
}

$('#btnSaveItem').click(function () {
    checkIfValid();
});