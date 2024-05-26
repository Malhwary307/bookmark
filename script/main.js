var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteURL");
var myBody = document.getElementById("myBody");
var subBtn = document.getElementById("subBtn");
var productList;
var globalIndex;
if (localStorage.getItem("productList")) {
  productList = JSON.parse(localStorage.getItem("productList"));
  displayProducts(productList);
} else {
  productList = [];
}

function addProduct() {
  if(validateURL() == true && siteName.value !=""){
    var product = {
      name: siteName.value,
      URL: siteURL.value,
      
    };
    productList.push(product);
    displayProducts(productList);
    addToLocalStorage();
    clearInputs()
  }else{
    Swal.fire({
      title: "Invalied Data",
      text: `${siteName.value =="" ?"please enter site Name":""} ${validateURL() == true? "":" and please enter valid Url"}`,
      icon: "error"
    });
  }
 
}


function displayProducts(pList) {
  var cartoona = "";
  console.log(pList);
  for (var i = 0; i < pList.length; i++) {
    cartoona += ` <table class="table text-center ">
    <tr class="mx-auto text-center">
      <td>${i+1}</td>
      <td> ${pList[i].name}</td>
      <td><button  class="btn my-1 btn-success  "><a href="${pList[i].URL}" target="_blank"><i class="fa-solid fa-eye"></i> Visit</a></button></td>
      <td><button onclick="deleteProduct(${i})" class="btn my-1 btn-danger "><i class="fa-solid fa-trash-can"></i> Delete</button></td>
    </tr>
  </table>`;
  }
  myBody.innerHTML = cartoona;
}

function deleteProduct(i) {
  productList.splice(i, 1);
  console.log(productList);
  displayProducts(productList);
  addToLocalStorage();
}

function addToLocalStorage() {
  localStorage.setItem("productList", JSON.stringify(productList));
}

function clearInputs() {
  siteName.value = null;
  siteURL.value = null;
 
}


function validateURL() {
  var pattern =/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
return pattern.test(siteURL.value);
}