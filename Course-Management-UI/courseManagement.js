//define global object to store each course id:
const keepCourseId = {};
//define global object to store each student id:
const keepStudentId = {};


function Course(id, name, assignedTeacher, studentList){
 this.id; 
 this.name;
 this.assignedTeacher;
 this.studentList=[]; 
 
 this.validateCourse(id, name, assignedTeacher, studentList)
 
}


//method that create the course:   
Course.prototype.createCourse = function(id, name, assignedTeacher, studentList){  
 this.id = id;
 this.name = name; 
 this.assignedTeacher = assignedTeacher;
 this.studentList = studentList;

 //push into the object the key/value pair where key=id and value=id because an boject has O(1) search time complexity;
 keepCourseId[id] = id;
}


//method that validate data and create the course entity in case that the given data parameters pass the validation with success:
Course.prototype.validateCourse = function(id, name, assignedTeacher, studentList){
  if(id === undefined || name === undefined || assignedTeacher === undefined || studentList === undefined){
   return console.log('Required property is missing')
  }

  if(typeof id !== 'number' || typeof name !== 'string' || typeof assignedTeacher !== 'string' || typeof studentList !== 'object'){
   return console.log('Invalid property type')   
  }

  this.createCourse(id, name, assignedTeacher, studentList);
  console.log('Course was successfully created')  
}


Course.prototype.studentExist = function(studentId){
  //search a student by id inside student list using .some() method that return true if we find the object with needed property otherwise return false
  return this.studentList.some(student => student.id === studentId);
}


//Print students list method:
Course.prototype.printStudentList = function(){
 console.log(`Enrolled students at: ${this.name.toUpperCase()}`)
 console.log(this.studentList)
}
  

//Add student method:
Course.prototype.addStudent = function(student){
  //Optional: valiate if the Student object exist/is created because if the Course object is not created studentList will be undefined
  if(!this.studentList || !this.id){
    return console.log('Cannot add the student because the course does not exist')
  }


  if(this.studentExist(student.id)){ 
    return console.log(`The student with id:${student.id} already exist for ${this.name} course`)  
  }

  //declare the default grade property for a student when we he gets enrolled:
  //store in tempObj all of the current student object key/values pairs given as parameter using sperad operator:
 
  const tempObj = {...student}
  //otherwise add enroll/add the student to a specific course:
  this.studentList.push(tempObj);
  console.log(`Student with id ${student.id} was successfully added to this course`) 
  
}
 

//Delete student method -> to delete a student needs to exist in the array of students and the parameter id needs to be a number:
Course.prototype.deleteStudent = function(studentId){
  //Optitional: valiate if the Student object exist/is created because if the Course object is not created studentList will be undefined
  if(this.studentList === undefined){
   return console.log('Cannot delete the student because the course does not exist') //break the method
  }

  //then validate the student id before delete:
  if(typeof studentId !== 'number'){
   return console.log('Student id is invalid resulting in failing to delete the specified student from this course');
  }

  this.studentList = this.studentList.filter(item =>{
   return item.id !== studentId;
  })
  console.log(`Student with id ${studentId} was successfully deleted`)  
}


//Getter method(return a student entity based on id):
Course.prototype.getStudent = function(studentId){
  for(let index=0;index<this.studentList.length;index++){
    if(this.studentList[index].id === studentId){
     return this.studentList[index]; 
    } 
  }
  return null;
}


//method that change/set student grade for a specific course(Setter):
Course.prototype.setGrade = function(studentId, newGrade){
  if(typeof newGrade !== 'number' || typeof studentId !== 'number') return null;

  if(newGrade < 1 || newGrade > 10){
   console.log('The grade must be between 1 and 10') 
   return null;
  }
  
  if(!this.getStudent(studentId)){
   return console.log(`Student with id ${studentId} has not found for ${this.name.toUpperCase()} course`)
  }  

  //continue here:
  const currentStudent = this.getStudent(studentId);
  const currentCourseGrade = this.name + 'Grade';
  currentStudent.grades[currentCourseGrade] = newGrade; 
}





Course.prototype.courseAverage = function(){
 let sum = 0;
 //keep the number of students that has a grate(grade is not null) for the course:
 let studentsWithGrade = 0;
 const currentCourse = this.name + 'Grade'; 
 this.studentList.forEach(student =>{
  //if a student has a grade calculate sum and increment number of students with grades: 
  if(student.grades[currentCourse] !== null){
   sum += student.grades[currentCourse];
   studentsWithGrade++;  
  }
 })
 return sum/studentsWithGrade;
}


/*
 Observation:
 For this approach we need to use a temporary array when we store the items first time, then sort them.
 If we just return this.studentList.sort((a,b)=>a.grade-b.grade) without a temporary array the entire
 students array from the Course instance will be modified.
*/
//method that sort students based on grade in ascender order:
Course.prototype.sortStudents = function(){  
 const temp = [...this.studentList];
 const currentCourseGrade = this.name + 'Grade'; 
 return temp.sort((a,b) => a.grades[currentCourseGrade] - b.grades[currentCourseGrade]); 
}


function Student(id, firstName, lastName, gender, address, hobbies){
  this.id;
  this.firstName; 
  this.lastName;
  this.gender;
  
  this.address = address !== undefined ? address : null;
  this.hobbies = hobbies !== undefined ? hobbies : null;
  
  //store here multiple grades for a student that joins multiple courses:
  this.grades = {};

  this.validateStudent(id, firstName, lastName, gender); 
}


//Class prototype methods(declared outside of constructor):
//Method that validate additional Student parameters and return a boolean "response":
Student.prototype.validateAdditionalProps = function(){
 if((this.address !== null && typeof this.address !== 'string') ||
   (this.hobbies !== null && typeof this.hobbies !== 'string')){
  return console.log('Invalid additional property type'); 
 }

 return true;
}


//Method that create Student required properties:
Student.prototype.createStudent = function(id, firstName, lastName, gender){
 //create the student entity with required properties:
 this.id = id;
 this.firstName = firstName; 
 this.lastName = lastName;
 this.gender = gender;
 
 //append student id to keepStudentId object:
 keepStudentId[id] = id; 
 console.log('Student was successfully created')
}


//Method that validate data and create the student entity in case that the given data parameters pass the validation with success:
Student.prototype.validateStudent = function(id, firstName, lastName, gender){ 
 if(id === undefined || firstName === undefined || lastName === undefined || gender === undefined){
  return console.log('Required property is missing');
 }
 
 if(typeof id !== 'number' || typeof firstName !== 'string' || typeof lastName !== 'string' || typeof gender !== 'string'){
  return console.log('Invalid required property type');
 }

 //check if a student id already exist in the keepStudentId object(we store student id as key id = id)
 if(id in keepStudentId){
  return console.log(`Student with id ${id} already exists`)
 }
  
 if(this.validateAdditionalProps()){
  this.createStudent(id, firstName, lastName, gender); 
 }
}


let courses = []
let students = []

//grab all courses and students from database to use for validation(test if id or name already exist):
fetch('http://localhost:3000/courses')
 .then(res => res.json())
 .then(data => courses = [...data])

fetch('http://localhost:3000/students')
 .then(res => res.json())
 .then(data => students = [...data]) 


//dark/light mode functionality:
const switchBtn = document.getElementById('switchBtn')
const formContainer = document.getElementById('formContainer');

switchBtn.addEventListener('click',() =>{
 if(switchBtn.innerText === 'Dark theme'){
  switchBtn.innerText = 'Light theme';
  console.log('Night mode now');
  document.body.style.backgroundColor = '#161b22';
  document.body.style.color = 'whitesmoke';
 }else{
  switchBtn.innerText = 'Dark theme'
  console.log('Light theme now')
  document.body.style.backgroundColor = 'whitesmoke';
  document.body.style.color = 'black';
 }
})


const statusMsg = document.getElementById('statusMsg');

//functions that render a status message to the UI:
const failStatusMessage = (messageElement,messageText) =>{
  //first time we suppose that we could have validation errors that's why the message is set to red color firstly:
  messageElement.style.color = 'red';
  messageElement.style.textAlign = 'center';
  messageElement.innerText = messageText;
}
 
const successStatusMessage = (messageElement,messageText) =>{
  messageElement.style.color = 'green';
  messageElement.style.textAlign = 'center';
  messageElement.innerText = messageText;
}


const sendStudentToServer = (url, objectBody) =>{
 const {id, firstName, lastName, gender, address, hobbies} = objectBody;
 fetch(url,{
  method:'post',
  headers:{'Content-type':'application/json'},
  body: JSON.stringify({ 
   id: id,
   firstName: firstName,
   lastName: lastName, 
   gender: gender,
   address: address !== null ? address : "N/A",
   hobbies: hobbies !== null ? hobbies : "N/A"
  }) 
 })
 .then(res => res.json())
 .then(() => {
   console.log('Student successfully created');
 })
 .catch(err => {
   console.error(err)
 })
}


const sendCourseToServer = (url, objectBody) =>{
  const {id, name, assignedTeacher, studentList} = objectBody;
  fetch(url,{
   method:'post',
   headers:{'Content-type':'application/json'},
   body: JSON.stringify({ 
    id: id,
    name: name,
    assignedTeacher: assignedTeacher, 
    studentList: studentList,
   }) 
  })
  .then(res => res.json())
  .then(() => {
    console.log('Course succesfully created')
  })
  .catch(err => {
    console.error(err)
  })
}


const updateCourseDataToServer = (url,selectedCourse) =>{
  fetch(url,{ 
    method:'put',
    headers:{'Content-type':'application/json'},
    body:JSON.stringify({
     id: selectedCourse.id,
     name: selectedCourse.name,
     assignedTeacher: selectedCourse.assignedTeacher,
     studentList: selectedCourse.studentList
    }) 
  })
  .then(res => res.json())
  .then(() => console.log('students list updated with success'))
  .catch(err => console.log(err))
}


const createStudentEntity = (studentId, firstName, lastName, gender, address, hobbies) =>{
  const student = new Student(studentId, firstName, lastName, gender, address, hobbies);
  return student;
}

const createCourseEntity = (id, name, assignedTeacher, studentList) =>{
  const course = new Course(id, name, assignedTeacher, studentList);
  return course;
}


//handle user data object:
const studentState = {
 studentId: null, 
 firstName: '',
 lastName: '',
 gender: '',
 address: null,
 hobbies: null,
}


//CREATE THE STUDENT ENTITY:
const studentIdField = document.getElementById('studentId');
const firstNameInputField = document.getElementById('firstNameInput');
const lastNameInputField = document.getElementById('lastNameInput');
const maleRadioField = document.getElementById('maleRadio');
const femaleRadioField = document.getElementById('femaleRadio');
const addressField = document.getElementById('address');
const hobbiesField = document.getElementById('hobbies');


const readStudentData = () =>{
 studentState.studentId = parseInt(studentIdField.value);
 studentState.firstName = firstNameInputField.value;
 studentState.lastName = lastNameInputField.value;

 if(maleRadioField.checked){
  studentState.gender = maleRadioField.value 
 }
 
 if(femaleRadioField.checked){
  studentState.gender = femaleRadioField.value 
 }
 
 studentState.address = addressField.value ? addressField.value : "N/A";
 studentState.hobbies = hobbiesField.value ? hobbiesField.value.replace(',','').replace(' ',',') : "N/A";
}


const validateStudentData = (studentId, firstName, lastName, gender, address, hobbies) =>{ 
  //restriction -> not 0 or negative id number:
  if(studentId < 1){
    failStatusMessage(statusMsg,'Negative id not allowed');
    return false;
  }
  
  if(students.some(student => student.id === studentId)){
    failStatusMessage(statusMsg, `Student with id ${studentId} already exists`)
    return false;
  }

  if(!firstName){
    failStatusMessage(statusMsg,'First name is missing');
    return false; 
  }
  
  if(!lastName){
    failStatusMessage(statusMsg,'Last name is missing');
    return false;
  }

  if(!gender){
    failStatusMessage(statusMsg,'Gender is missing');
    return false;
  }

  if(typeof studentId !== 'number' || typeof firstName !== 'string' || typeof lastName !== 'string' || typeof gender !== 'string'){
    failStatusMessage(statusMsg, 'Invalid required property type'); 
    return false;
  }
  
  if(studentId in keepStudentId){
    failStatusMessage(statusMsg, `Student with id ${studentId} already exists`);  
    return false;
  }
  
  if((address !== null && typeof address !== 'string') ||
    (hobbies !== null && typeof hobbies !== 'string')){
    failStatusMessage(statusMsg, 'Invalid additional property type');
    return false;
  }
  
  successStatusMessage(statusMsg,'Student successfully created');
  return true; 
}



const createStudent = () =>{
  readStudentData()
  const {studentId, firstName, lastName, gender, address, hobbies} = studentState;

  if(validateStudentData(studentId, firstName, lastName, gender, address, hobbies) === false) 
   return console.error('Student validation fail');

  const student = createStudentEntity(studentId, firstName, lastName, gender, address, hobbies);
  sendStudentToServer('http://localhost:3000/students', student, statusMsg);

  //after the student entity is created and sent to the server, refresh the form 
  window.location.reload(); 
} 


const studentForm = document.getElementById('studentForm');

studentForm.addEventListener("submit",(event) =>{ 
 event.preventDefault()
 createStudent()
})


const validateCourseData = (id, name, assignedTeacher, studentList) =>{
  const statusMsg = document.getElementById('statusMsg');

  //restriction -> not 0 or negative id number:
  if(id < 1){
    failStatusMessage(statusMsg,'Negative id not allowed')
    return false;
  }

  if(courses.some(course => course.name === name)){
    failStatusMessage(statusMsg, `Course with name ${name} already exists`)
    return false;
  }

  if(name === ''){
    failStatusMessage(statusMsg,'Name is missing')
    return false;
  }

  if(assignedTeacher === ''){
    failStatusMessage(statusMsg,'Assigned teacher is missing')
    return false; 
  }

  if(typeof id !== 'number' || typeof name !== 'string' || typeof assignedTeacher !== 'string' || !Array.isArray(studentList)){
   failStatusMessage(statusMsg,'Invalid property type')
   return false; 
  }
 
  if(id in keepCourseId || courses.some(course => course.id === id)){
    failStatusMessage(statusMsg,`Course with id ${id} already exists`)
    return false;
  }

 successStatusMessage(statusMsg,'Course created with success');
 return true; 
}


//CREATE THE COURSE ENTITY:
const courseState = {
 id: null,
 name: '',
 assignedTeacher: '',
 studentList: [], 
}

const courseIdField = document.getElementById('courseId');
const courseNameField = document.getElementById('courseName');
const assignedTeacherField = document.getElementById('assignedTeacher');


const readCourseData = () =>{
 courseState.id = parseInt(courseIdField.value);
 courseState.name = courseNameField.value;
 courseState.assignedTeacher = assignedTeacherField.value 
}


const createCourse = () =>{
 readCourseData();
 const {id, name, assignedTeacher, studentList} = courseState;

 if(validateCourseData(id, name, assignedTeacher, studentList) === false)
  return console.error('Course validation fail');

 const course = createCourseEntity(id, name, assignedTeacher, studentList);
 sendCourseToServer('http://localhost:3000/courses', course);

 //after the course entity is created and sent to the server, refresh the form 
 window.location.reload(); 
} 


const courseForm = document.getElementById('courseForm');

courseForm.addEventListener("submit",(event) =>{
 event.preventDefault()
 createCourse() 
})


//main page container:
const mainContainer = document.getElementById('mainContainer');
//forms containers:
const studentContainer = document.getElementById('studentContainer');
const courseContainer = document.getElementById('courseContainer');
const studentManagementContainer = document.getElementById('studentManagementContainer');

const closeStudentForm = document.getElementById('closeStudentForm');
const closeCourseForm = document.getElementById('closeCourseForm');
const closeManagementStudent = document.getElementById('closeManagementStudent');
const createStudentBtn = document.getElementById('createStudentBtn');
const createCourseBtn = document.getElementById('createCourseBtn');
const manageStudents = document.getElementById('manageStudents');


/* 
 By default studentForm, courseForm and manageForm are removed from the DOM
 and added just when the user trigger the event button that append("render") that form.
*/
mainContainer.removeChild(courseContainer); 
mainContainer.removeChild(studentContainer);
mainContainer.removeChild(studentManagementContainer);

closeStudentForm.addEventListener('click',() =>{
  mainContainer.removeChild(studentContainer);
})

closeCourseForm.addEventListener('click',() =>{
  mainContainer.removeChild(courseContainer); 
})

closeManagementStudent.addEventListener('click',() =>{
  mainContainer.removeChild(studentManagementContainer);
})


//functionality that avoid to render multiple components at the same time:
createStudentBtn.addEventListener('click',() =>{
  mainContainer.appendChild(studentContainer);

  if(mainContainer.contains(courseContainer)){
    mainContainer.removeChild(courseContainer); 
  }
  
  if(mainContainer.contains(studentManagementContainer)){
    mainContainer.removeChild(studentManagementContainer); 
  }
})

createCourseBtn.addEventListener('click',() =>{
  mainContainer.appendChild(courseContainer);

  if(mainContainer.contains(studentContainer)){
   mainContainer.removeChild(studentContainer); 
  }

  if(mainContainer.contains(studentManagementContainer)){
   mainContainer.removeChild(studentManagementContainer); 
  }
})

manageStudents.addEventListener('click',() =>{
  mainContainer.appendChild(studentManagementContainer);
  manageStudentsComponent(); 

  if(mainContainer.contains(studentContainer)){
   mainContainer.removeChild(studentContainer); 
  }
  
  if(mainContainer.contains(courseContainer)){
    mainContainer.removeChild(courseContainer);
  }
})


//store courses and students as object properties:
const dataState = {
  students: [],
  courses: [], 
}



const manageStudentsComponent = async () =>{
  if(dataState.courses.length === 0 || dataState.students.length === 0){
    //grab courses and students from the server by fetching data when manageStudentsComponent() function gets triggered:
    await fetch('http://localhost:3000/students')
          .then(res => res.json())
          .then(data => dataState.students = [...data])//extract as regulat object 

    await fetch('http://localhost:3000/courses')
          .then(res => res.json()) //instantiate every course object below to allow us to use course.addStudent(), course.deleteStudent(), etc.
          .then(data => dataState.courses = data.map(course => new Course(course.id, course.name, course.assignedTeacher, course.studentList)))
  } 


  const dropdownStudents = document.getElementById('dropdownStudents');
  
  if(dataState.students.length === 0 || dataState.courses.length === 0) 
    console.error('The list of students or courses is empty'); 

  //map a list of students items:
  const studentsItems = dataState.students.map(student =>{
    const {id, firstName, lastName} = student;
    return (`<option value='${id}' class='student-item'>
              ${id} ${firstName} ${lastName}
             </option>`);
  })

  dropdownStudents.innerHTML = `<select 
                                  class="dropdown-style" 
                                  id='selectStudentDropdown'
                                >
                                 <option value="" selected disabled hidden>
                                  Add student
                                 </option>
                                 ${studentsItems}
                                </select>`;

  let selectedStudent;

  //select a student item form the list below:
  document.querySelectorAll('li').forEach((li, index) =>{
   const currentStudent = dataState.students[index];
   li.addEventListener('click',() =>{
    selectedStudent = currentStudent; 
   }) 
  })
  
  const coursesButtonsList = document.getElementById('coursesButtonsList');
  //map a list of courses buttons:
  const coursesButtonsArray = dataState.courses.map(course =>{
   return (`<button id="courseButton" class="course-button global-font-style value="${course.name}">
             ${course.name}
            </button>`); 
  }).join('') 
  
  coursesButtonsList.innerHTML = `<div id="listButtons" class="list-buttons">${coursesButtonsArray}</div>`
    
  //keep the selected course in this variable to be used later on when a student is being added to this course:
  let selectedCourse;
  
  const courseStudentsTable = document.getElementById('courseStudentsTable');
  const successStudentDeleteMsg = document.getElementById('successStudentDeleteMsg');
  const assignedTeacher = document.getElementById('assignedTeacher');
  const studentTableStatusMsg = document.getElementById('studentTableStatusMsg');

  //select a course item form the dynamic list below and append a course inside of studentsList:
  document.querySelectorAll('button').forEach((button) =>{ 
   if(button.id === "courseButton"){
    button.addEventListener('click',() =>{
      //reset messages when another course is selected:
      studentTableStatusMsg.innerText = ''
      successStudentDeleteMsg.innerText = ''

      //reset the selected student form dropdownList when another course is selected:
      document.querySelectorAll('option').forEach(option =>{
        option.selected = option.defaultSelected; 
      })

      //add style for active/selected course button:
      document.querySelectorAll('button').forEach(button =>{
       if(button.id === "courseButton") 
        button.classList.remove('buttonSelectedStyle')
      })
      
      button.classList.add('buttonSelectedStyle')

      const currentCourse = dataState.courses.find(course => course.name === button.innerText);
      selectedCourse = currentCourse;
      
      //we need to define a function that render the table in the ui:
      //render table rows:
      const tableRows = currentCourse.studentList.map(student =>{
       const {id, firstName, lastName, gender, address, hobbies} = student;
       return (
         `<tr class="cell-font-style" id="table-row" value="${id}">
           <td>${id}</td>
           <td>${firstName}</td>
           <td>${lastName}</td>
           <td>${gender}</td>
           <td>${address}</td>
           <td>${hobbies}</td>
           <td class='delete-cell' id="deleteCell">
            <button type="button" class="deleteBtn" value="${id}">Delete</button>
           </td>
          </tr>`
        )
      }).join('')
     
      courseStudentsTable.innerHTML = `
        <table class="students-table" id="studentsTable">
          <tr class="global-font-style" id="studentRow">
           <th>id</th>
           <th>first name</th>
           <th>last name</th>
           <th>gender</th>
           <th>address</th>
           <th>hobbies</th>
           <th>actions</th>
          </tr>
          ${tableRows}
        </table> `; 
 
      assignedTeacher.innerText = `Assigned teacher: ${selectedCourse.assignedTeacher}, course: ${selectedCourse.name.toUpperCase()}`; 
      
      const studentsTable = document.getElementById('studentsTable');
      
      const deleteRowElem = (e, selectedCourse) =>{
        //check if the cell has the delete button by class name
        if(!e.target.classList.contains("deleteBtn")) return;
        const button = e.target;
        const studentToBeDeleted = selectedCourse.studentList.find(student => student.id === parseInt(button.value));
      
        //update the current course student list each time when a student is being deleted(delete logic): 
        selectedCourse.studentList = selectedCourse.studentList.filter(stud => stud.id !== studentToBeDeleted.id)

        //update data by deleting the selected student from course:
        selectedCourse.deleteStudent(studentToBeDeleted.id);
        updateCourseDataToServer(`http://localhost:3000/courses/${selectedCourse.id}`,{...selectedCourse});
        
        successStatusMessage(successStudentDeleteMsg,`Student with id ${studentToBeDeleted.id} was succesfully deleted from ${currentCourse.name.toUpperCase()} course.`)
        button.closest('tr').remove(); 
      }

      //add click event listener to all the Rows Parent(Table)
      studentsTable.addEventListener('click',(e) =>{
       deleteRowElem(e, selectedCourse)
      })

    })
   }
  })
  
  const addStudentToCourse = (selectedStudent) =>{
    //define the student table row cells:
    const studentsTable = document.getElementById('studentsTable');
    const newTableRow = studentsTable.insertRow(studentsTable.length)
    const idCell = newTableRow.insertCell(0);
    const firstNameCell = newTableRow.insertCell(1);
    const lastNameCell = newTableRow.insertCell(2);
    const genderCell = newTableRow.insertCell(3);
    const addressCell = newTableRow.insertCell(4);
    const hobbiesCell = newTableRow.insertCell(5);
    const deleteCell = newTableRow.insertCell(6);
    
    const {id, firstName, lastName, gender, address, hobbies} = selectedStudent;
  
    //assign values to every specific cell:
    idCell.innerHTML = id;
    firstNameCell.innerHTML = firstName;
    lastNameCell.innerHTML = lastName;
    genderCell.innerHTML = gender;
    addressCell.innerHTML = address;
    hobbiesCell.innerHTML = hobbies;
    deleteCell.innerHTML = `<button type="button" class="deleteBtn" value="${id}">Delete</button>`;
  }

  selectStudentDropdown.addEventListener('change',(event) =>{
    if(!selectedCourse){
     failStatusMessage(studentTableStatusMsg,'Please choose a course')
    }

    //check if the selected student already exist for the selected course:
    if(selectedCourse.studentList.some(student => student.id === parseInt(event.target.value))){
      failStatusMessage(studentTableStatusMsg,'Student already exists')
      return console.error('Student already exist')
    }
    
    //reset the status message:
    studentTableStatusMsg.innerText = ''; 
    
    selectedStudent = dataState.students.find(student => student.id === parseInt(event.target.value));
    
    //add the student to studentList form selected course(addition logic): 
    selectedCourse.addStudent(selectedStudent);

    //render to the table in UI the new added student:
    addStudentToCourse(selectedStudent);

    //update data in database by adding the selected student to course:
    updateCourseDataToServer(`http://localhost:3000/courses/${selectedCourse.id}`,{...selectedCourse})
    successStatusMessage(studentTableStatusMsg,`Student added succesfully to ${selectedCourse.name.toUpperCase()} course`);
    
    //reset the current student:
    selectedStudent = undefined;
  })

}//end manageStudentsComponent function  
