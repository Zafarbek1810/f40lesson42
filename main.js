let myInputs = document.querySelector(".myInputs")
let inputFirst = document.querySelector(".inputFirst")
let inputLast = document.querySelector(".inputLast")
let inputUser = document.querySelector(".inputUser")
let inputPhone = document.querySelector(".inputPhone")


let students = []
let currentId = null
const getStudent = () => {
    $.ajax({
        url: "https://studentcrudforlesson.herokuapp.com/api/student/get",
        method: "get",
        success: function (javob) {
            students = javob
            console.log(javob);
            chiz()
        },
        error: function (error) {
            console.log(error);
            $("h2").html("xatolik")
        }
    })
}
getStudent()

const addStudent = () => {
    $.ajax({
        url: "https://studentcrudforlesson.herokuapp.com/api/student/add",
        method: "post",
        data: JSON.stringify({
            firstname: inputFirst.value,
            lastname: inputLast.value,
            username: inputUser.value,
            phoneNumber: inputPhone.value
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            console.log(response);
            getStudent();
        },
        error: function (err) {
            getStudent();
            console.log(err);
        }
    })
    inputFirst.value = "",
        inputLast.value = "",
        inputUser.value = "",
        inputPhone.value = ""

}



const chiz = () => {
    let myTexts = "";
    students.forEach((student, index) => {
        myTexts += `
        <tr>
        <th scope="row">${index + 1}</th>
        <td>${student.firstname}</td>
        <td>${student.lastname}</td>
        <td>${student.username}</td>
        <td>${student.phoneNumber}</td>
        <td >
            <img src="edit.png" class="actionPng" onclick="editStudent(${student.id})" alt="">
            <img src="delete.png" class="actionPng" onclick="deleteStudent(${student.id})" alt="">
        </td>
      </tr>`
    })
    $(".tableBody").html(myTexts)
}


const deleteStudent = (id) => {
    //console.log(id);
    $.ajax({
        url: `https://studentcrudforlesson.herokuapp.com/api/student/delete/${id}`,
        method: "delete",
        success: function (response) {
            console.log(response);
            getStudent()
        },
        error: function (error) {
            console.log(error);
        }
    })
}

const editStudent = (id) => {
    let student = students.find(item => item.id === id)
    currentId = id
    console.log(id, student);
    $(".inputFirst").val(student.firstname)
    $(".inputLast").val(student.lastname)
    $(".inputUser").val(student.username)
    $(".inputPhone").val(student.phoneNumber)

    // inputLast.value = student.lastname
    // inputUser.value = student.username
    // inputPhone.value = student.phoneNumber

    $(".addStudent").hide()
    $(".editStudentBtn").show()
}





$(".editStudentBtn").on("click", function () {
    let firstname =inputFirst.value
    let lastname = inputLast.value
    let username = inputUser.value
    let phoneNumber = inputPhone.value
    console.log(currentId);
    $.ajax({
        url: `https://studentcrudforlesson.herokuapp.com/api/student/update/${currentId}`,
        method: "post",
        data: JSON.stringify({ firstname, lastname, username, phoneNumber }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (res) {
            console.log(res);
            getStudent()
        },
        error: function (err) {
            console.log(err);
            getStudent()
        }
    })

    $(".inputFirst").val("")
    $(".inputLast").val("")
    $(".inputUser").val("")
    $(".inputPhone").val("")

    $(".addStudent").show()
    $(".editStudentBtn").hide()
})

