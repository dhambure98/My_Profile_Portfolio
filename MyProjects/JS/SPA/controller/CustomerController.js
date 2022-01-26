// Events
// save
$('#btnCustomerAdd').click(function () {
    let customerID = $("#txtCustomerId").val();
    let customerName = $("#txtCustomerName").val();
    let customerAddress = $("#txtCustomerAddress").val();
    let customerSalary = $("#txtCustomerSalary").val();

    let result = saveCustomer(customerID, customerName, customerAddress, customerSalary);
    if(result)clearcustomer();
    generateCustomerID();
});

// update
$("#btnCustomerUpdate").click(function () {
    let customerID = $("#txtCustomerId").val();
    let customerName = $("#txtCustomerName").val();
    let customerAddress = $("#txtCustomerAddress").val();
    let customerSalary = $("#txtCustomerSalary").val();

    let option=confirm(`Do You Want to Update Customer ? ID:${customerID}`);
    if (option){
       let result= updateCustomer(customerID, customerName, customerAddress, customerSalary);
       if (result){
           alert("Customer Successfully Updated !");
       }else{
           alert("Update Faild !");
       }
    }
     loadAllCustomers();
     clearcustomer();
     generateCustomerID();

});

// delete
$("#btnCustomerDelete").click(function () {
    let cusID = $("#txtCustomerId").val();
    let option=confirm(`Do You Want to Delete ? ID:${cusID}`);
    if (option){
        let result=deleteCustomer(cusID);
        if (result){
            alert("Customer Successfully Deleted !");
        } else{
            alert("Delete Failed !")
        }

    }
    loadAllCustomers();
    clearcustomer();
    generateCustomerID();
});

// search
$("#txtCustomerId").on('keyup', function (eObj) {
    if (eObj.key == "Enter") {
        let customer = searchCustomer($(this).val());
        if (customer != null) {
            $("#txtCustomerId").val(customer.getCustomerID());
            $("#txtCustomerName").val(customer.getCustomerName());
            $("#txtCustomerAddress").val(customer.getCustomerAddress());
            $("#txtCustomerSalary").val(customer.getCustomerSalary());
        } else {
            // clearcustomer();
        }
    }
});

// ==============================================================================================
//Functions
// save customer
function getAllCustomers() {
    return customerTable;
}
function saveCustomer(customerID, customerName, customerAddress, customerSalary) {
    let customer = new CustomerDTO(customerID, customerName, customerAddress, customerSalary);
    customerTable.push(customer);// customer aded

    // load the table
    loadAllCustomers();
    return true;   
}

// update customer
function updateCustomer(customerID, customerName, customerAddress, customerSalary) {
    let customer = searchCustomer(customerID);
    if (customer != null) {
        customer.setCustomerName(customerName)
        customer.setCustomerAddress(customerAddress)
        customer.setCustomerSalary(customerSalary);
        return true;
    } else {
        return false;
    }
    
}

// search customer
function searchCustomer(customerID) {
    for (var i in customerTable) {
        if (customerTable[i].getCustomerID() == customerID) return customerTable[i];
    }
    return null;
}

//delete customer
function deleteCustomer(customerID) {
    let customer = searchCustomer(customerID);
    if (customer != null) {
        let indexNumber = customerTable.indexOf(customer);
        customerTable.splice(indexNumber, 1);
        return true;
    } else {
        return false;
    }
}

// ================================================================================================
// other functions
function loadAllCustomers() {
    let allCustomers = getAllCustomers();
    $('#tblCustomer').empty(); // clear all the table before adding for avoid duplicate
    for (var i in allCustomers) {
        let id = allCustomers[i].getCustomerID();
        let name = allCustomers[i].getCustomerName();
        let address = allCustomers[i].getCustomerAddress();
        let salary = allCustomers[i].getCustomerSalary();

        var row = `<tr><td>${id}</td><td>${name}</td><td>${address}</td><td>${salary}</td></tr>`;
        $('#tblCustomer').append(row);
    }
    $('#tblCustomer>tr').click(function () {
        let id=$(this).children('td:eq(0)').text();
        let name=$(this).children('td:eq(1)').text();
        let address=$(this).children('td:eq(2)').text();
        let salary=$(this).children('td:eq(3)').text();
        
        $("#txtCustomerId").val(id);
        $("#txtCustomerName").val(name);
        $("#txtCustomerAddress").val(address);
        $("#txtCustomerSalary").val(salary);
        
      
   });
}
function clearcustomer() {
        $('#txtCustomerId').val("");
        $('#txtCustomerName').val("");
        $('#txtCustomerAddress').val("");
        $('#txtCustomerSalary').val("");
         
    }


    function generateCustomerID() {
        if(customerTable.length == 0){
            $("#txtCustomerId").val("C-001");
        }else{
            let lastCustomerID=customerTable[customerTable.length-1].getCustomerID();
            let newID =Number.parseInt(lastCustomerID.substring(2, 5))+1;
            if(newID < 10){
                newID="C-00"+newID;
            }else if(newID<100){
                newID="C-0" + newID;
            }
            $("#txtCustomerId").val(newID);
        }
    }

// reg ex
let cusIDRegEx=/^(C-)[0-9]{1,3}$/;
$("#txtCustomerId").on('keyup',function (event){
    if (event.key=="Enter"){
        $('#txtCustomerName').focus();
    }
    let inputID=$("#txtCustomerId").val();
    if (cusIDRegEx.test(inputID)){
        $("#txtCustomerId").css('border','1px solid green');
        $("#lblcusid").text("");
    }else{
        $("#txtCustomerId").css('border','1px solid red');
        $("#lblcusid").text('Invalid Customer ID (C-001)');
    }
});

$("#txtCustomerName").on('keyup',function (event){
    if (event.key=="Enter"){
        $('#txtCustomerAddress').focus();
    }
});

$("#txtCustomerAddress").on('keyup',function (event){
    if (event.key=="Enter"){
        $('#txtCustomerSalary').focus();
    }
});

$("#txtCustomerSalary").on('keyup',function (event){
    if (event.key=="Enter"){
        $('#btnCustomerAdd').focus();
    }
});
