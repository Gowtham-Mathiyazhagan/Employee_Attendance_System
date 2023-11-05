const addbtn = document.querySelector("#add")
const newbtn = document.querySelector("#new")
const delbtn = document.querySelector("#delete")
const disbtn = document.querySelector("#display")
const Form = document.querySelector("#form")
const allBtn = document.querySelectorAll("button")
let id = document.querySelector("#id")
const model = document.querySelector(".modelBox1")
const qrBtn=document.querySelector("#qrCode")

//Add functionality to the Add button
addbtn.addEventListener("click", function (e) {
    e.preventDefault()
    let id = document.querySelector("#id")
    let name = document.querySelector("#name")
    let no = document.querySelector("#no")
    let status = document.querySelector("#status")
    // addbtn.style="backgroundColor="
    const empData = JSON.parse(localStorage.getItem("empData")) || [];

    id = parseInt(id.value.trim())
    name = name.value.trim()
    no = parseInt(no.value.trim())
    status = status.value

    //addbtn.classList.add("active")    
    if (!isNaN(id) && name !== "" && !isNaN(no) && status !== "") {
        Data = {}

        Data.id = id;
        Data.name = name;
        Data.no = no;
        Data.status = status
        empData.push(Data)
        localStorage.setItem("empData", JSON.stringify(empData))
        model.style = "display:block"

    }
    else {
        alert("Please Enter Valid Data")
    }
})

//Add functionality to the new button
newbtn.addEventListener("click", function (e) {
    e.preventDefault()
    form.reset()
    id.focus()
})

// closing function
window.addEventListener("click", function (e) {
    let closeIcon = document.getElementsByTagName("i")[0]
    let closeBtn = document.querySelector("#close")

    if (e.target == closeBtn || e.target == closeIcon) {
        model.style = "display:none"
    }
})

//Add functionality to the Dispaly button
disbtn.addEventListener("click", function (e) {
    e.preventDefault()
    const data = JSON.parse(localStorage.getItem("empData"))||[]
    const tbody = document.querySelector("tbody")
    tbody.innerHTML=" "
    if (data.length>0) {
        data.forEach((data, index) => {
            let val = " "
            val += ` <tr>
          <td>${data.id}</td>
          <td>${data.name}</td>
          <td>${data.no}</td>
          <td>${data.status}</td>
      </tr>`
      tbody.innerHTML += val
        })
    }
    else {
        alert("There is no data in DataBase!! Please add it")
    }

})

//Add functionality to the Delete button

delbtn.addEventListener("click",function(e){
 e.preventDefault();
 const data = JSON.parse(localStorage.getItem("empData"))||[]
const msg=document.querySelector(".msgBox>div")
let id = document.querySelector("#id")
id = parseInt(id.value.trim())

if(data.length>0 && !isNaN(id)){
 if(confirm("Are you need to delete this data??"))
 {
    const Mydata = JSON.parse(localStorage.getItem("empData")) || [];
    let index=Mydata.findIndex((val)=>val.id==id)    
    Mydata.splice(index,1);
    localStorage.setItem("empData",JSON.stringify(Mydata))
    msg.innerHTML="Record Deleted Successfully"
    model.style = "display:block" 
 }
}
else{
    alert("There is no data to delete ")
}
})

// Add function to QrCode button
const container=document.querySelector(".container")
const qrBox=document.querySelector(".qrCodeBox")
const spiner=document.querySelector(".spiner")
const p=document.querySelector(".p")
const qrCode=document.querySelector(".qrCode")

qrBtn.addEventListener("click",function(e){
  e.preventDefault()
    container.style="display:block"
    qrCode.classList.remove("active")
    
    qrBox.classList.add("active")
    spiner.style="display:block"
    p.style="display:block"

    qrCode.innerHTML=" "
    setTimeout(()=>{
        qrBox.classList.remove("active")
        spiner.style="display:none"
        p.style="display:none"
        const qrcode = new QRCode(qrCode, {
            text: "https://docs.google.com/spreadsheets/d/1q8njlCkOZ7q76NotKwUCUEM1U7vtBgERLk7vE3ai2jQ/edit#gid=0",
            height: 210,
            width: 230,
        });
        qrCode.classList.add("active")
    },1000)

})
window.addEventListener("click", function (e) {
    let closeIcon = container.getElementsByTagName("i")[0]
    let closeBtn = container.querySelector("#close")
    if (e.target == closeBtn || e.target == closeIcon) {
        container.style = "display:none"
    }
})
    
  const scriptURL = 'https://script.google.com/macros/s/AKfycbyKFOUKHpXaNj5fYy1NdfQtB_-bUctWKJNv95z1H9IYpUAJfHpuEy4a0eYCAD8dHHsp/exec'
  const form = document.forms['submit-to-google-sheet']

  addbtn.addEventListener('click', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => console.log('Success!', response))
      .catch(error => console.error('Error!', error.message))
  })