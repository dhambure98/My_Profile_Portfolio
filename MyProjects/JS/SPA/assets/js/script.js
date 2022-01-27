
// * @author : A.D.Liyanage
// * @since : 0.1.0

<!--JavaScript DOM Lines -->
document.getElementById("customer").addEventListener("click",function () {
    document.getElementById("txtCustomerId").style.display="none";
    document.getElementById("txtCustomerName").style.display="none";
    document.getElementById("txtCustomerName").style.display="none";
    document.getElementById("txtCustomerSalary").style.display="none";
    // document.getElementById("orderSec").style.display="none";
    // document.getElementById("orderName").style.display="none";
    // document.getElementById("customerSec").style.display="block";
    // document.getElementById("customerName").style.display="block";
});

// sidebar-wrapper ---------->
var el = document.getElementById("wrapper");
var toggleButton = document.getElementById("menu-toggle");

toggleButton.onclick = function () {
    el.classList.toggle("toggled");
};
