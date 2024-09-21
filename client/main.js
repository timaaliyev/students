// Этап 1. В HTML файле создайте верстку элементов, которые будут статичны(неизменны).

// Этап 2. Создайте массив объектов студентов.Добавьте в него объекты студентов, например 5 студентов.

let studentsList = [ ]


function formatBirthday(birthdate) {
  const today = new Date();
  const birthday = new Date(birthdate)
  let age = today.getFullYear() - birthday.getFullYear();
  const m = today.getMonth() - birthday.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
      age--;
  }
  const dateString = birthday.getDate() + '.' + (birthday.getMonth() + 1) + '.' + birthday.getFullYear()

  return dateString + ' (' + age + ' y.o.)'
}

function formatEduDate(studyStart) {
  let startYear = parseInt(studyStart);
  const today = new Date();
  let endYear = startYear + 4;

  let studyStartYear = today.getFullYear() > endYear ? startYear + "-" + endYear + " (finished)" : startYear + "-" + endYear + " (" + (today.getFullYear() - startYear + 1) + " course)";
 return studyStartYear
}
// Этап 3. Создайте функцию вывода одного студента в таблицу, по аналогии с тем, как вы делали вывод одного дела в модуле 8. Функция должна вернуть html элемент с информацией и пользователе.У функции должен быть один аргумент - объект студента.

function getStudentItem(studentObj) {
  let tableBody = document.getElementById('table-body')
  let tableRow = document.createElement('tr');
  tableBody.append(tableRow)
  let studentNameColumn = document.createElement('td');
  tableRow.append(studentNameColumn)
  let facultyNameColumn = document.createElement('td');
  tableRow.append(facultyNameColumn)
  let birthdayColumn = document.createElement('td');
  tableRow.append(birthdayColumn)
  let studyStartColumn = document.createElement('td');
  tableRow.append(studyStartColumn)
  let buttonColumn = document.createElement('td')
  let deleteButton = document.createElement('button');
  deleteButton.classList.add("btn", "btn-primary");
  deleteButton.textContent = "Delete";
  buttonColumn.append(deleteButton)
  tableRow.append(buttonColumn)

  deleteButton.addEventListener('click', async function() {
    if (!confirm('Are you sure?')) {
      return;
    }
    tableRow.remove();
    await fetch(`/api/students/${studentObj.id}`),
      {
        method: "DELETE",
      };
  })


  studentNameColumn.textContent = studentObj.name + ' ' + studentObj.surname + ' ' + studentObj.lastname;
  facultyNameColumn.textContent = studentObj.faculty;
  birthdayColumn.textContent = formatBirthday(studentObj.birthday);
  studyStartColumn.textContent = formatEduDate(studentObj.studyStart);

  return tableRow
}

document.addEventListener('DOMContentLoaded', async function() {
  studentsList = await getStudentList()
  renderStudentsTable(studentsList)
  addToTable()
  sortByClick()
  filterByClick()
  generateNumber('inlineFormInputGroupEduyear')
  generateNumber('inlineFilterInputGroupEduyearStart')
  generateNumber('inlineFilterInputGroupEduyearFinish')
})


async function getStudentList() {
  const response = await fetch(`/api/students`);
  const studentList = await response.json();

  return studentList
}

function renderStudentsTable(studentsArr) {
  let table = document.getElementById('table-body')

  table.innerHTML = ''

  studentsArr.forEach(student => {
    getStudentItem(student)
  });

  return table
}

function addToTable() {
  let button = document.getElementById('button-click')

  button.addEventListener("click", async function (event) {
    event.preventDefault()
    const firstName = document.getElementById('inlineFormInputGroupFirstname');
    const surname = document.getElementById('inlineFormInputGroupLastname');
    const lastname = document.getElementById('inlineFormInputGroupUsername');
    const faculty = document.getElementById('inlineFormInputGroupFaculty');
    const birthday = document.getElementById('inlineFormInputDate');
    const studyStart = document.getElementById('inlineFormInputGroupEduyear');

    const isAlpha = /^[A-Za-zА-Яа-яЁё]+$/;

    const invalidName = document.getElementById('invalid-name')
    if(firstName.value === "") {
      firstName.classList.add('is-invalid')
      invalidName.textContent = 'Заполните поле'
    } else if (firstName.value.trim() === "") {
      firstName.classList.add('is-invalid')
      invalidName.textContent = 'Заполните поле без пробелов'
    } else if (firstName.value.length === 1) {
      firstName.classList.add('is-invalid');
      invalidName.textContent = 'Заполните поле более чем одной буквой';
    } else if (firstName.value.length > 25) {
      firstName.classList.add('is-invalid');
      invalidName.textContent = 'Введите не более 25 символов';
    } else if (!isAlpha.test(firstName.value)) {
      firstName.classList.add('is-invalid');
      invalidName.textContent = 'Введите только буквы';
    } else {
      firstName.classList.remove('is-invalid')
    }

    const invalidSurname = document.getElementById('invalid-surname')
    if(surname.value === "") {
      surname.classList.add('is-invalid')
      invalidSurname.textContent = 'Заполните поле'
    } else if (surname.value.trim() === "") {
      surname.classList.add('is-invalid')
      invalidSurname.textContent = 'Заполните поле без пробелов'
    } else if (surname.value.length === 1) {
      surname.classList.add('is-invalid');
      invalidSurname.textContent = 'Заполните поле более чем одной буквой';
    } else if (surname.value.length > 25) {
      surname.classList.add('is-invalid');
      invalidSurname.textContent = 'Введите не более 25 символов';
    } else if (!isAlpha.test(surname.value)) {
      surname.classList.add('is-invalid');
      invalidSurname.textContent = 'Введите только буквы';
    } else {
      surname.classList.remove('is-invalid')
    }

    const invalidlastname = document.getElementById('invalid-lastname')
    if(lastname.value === "") {
      lastname.classList.add('is-invalid')
      invalidlastname.textContent = 'Заполните поле'
    } else if (lastname.value.trim() === "") {
      lastname.classList.add('is-invalid')
      invalidlastname.textContent = 'Заполните поле без пробелов'
    } else if (lastname.value.length === 1) {
      lastname.classList.add('is-invalid');
      invalidlastname.textContent = 'Заполните поле более чем одной буквой';
    } else if (lastname.value.length > 25) {
      lastname.classList.add('is-invalid');
      invalidlastname.textContent = 'Введите не более 25 символов';
    } else if (!isAlpha.test(lastname.value)) {
      lastname.classList.add('is-invalid');
      invalidlastname.textContent = 'Введите только буквы';
    } else {
      lastname.classList.remove('is-invalid')
    }

    const invalidFaculty = document.getElementById('invalid-faculty')
    if(faculty.value === "") {
      faculty.classList.add('is-invalid')
      invalidFaculty.textContent = 'Заполните поле'
    } else if (faculty.value.trim() === "") {
      faculty.classList.add('is-invalid')
      invalidFaculty.textContent = 'Заполните поле без пробелов'
    } else if (faculty.value.length === 1) {
      faculty.classList.add('is-invalid');
      invalidFaculty.textContent = 'Заполните поле более чем одной буквой';
    } else if (faculty.value.length > 25) {
      faculty.classList.add('is-invalid');
      invalidFaculty.textContent = 'Введите не более 25 символов';
    } else if (!isAlpha.test(faculty.value)) {
      faculty.classList.add('is-invalid');
      invalidFaculty.textContent = 'Введите только буквы';
    } else {
      faculty.classList.remove('is-invalid')
    }

    const invalidStudyStart = document.getElementById('invalid-study-start')
    if(studyStart.value === "") {
      studyStart.classList.add('is-invalid')
      invalidStudyStart.textContent = 'Заполните поле'
    } else {
      studyStart.classList.remove('is-invalid')
    }

    const invalidBirthday = document.getElementById('invalid-birthday')
    if(birthday.valueAsDate == null) {
      birthday.classList.add('is-invalid')
      invalidBirthday.textContent = 'Заполните поле'
    } else if(isNaN(birthday.valueAsDate) || birthday.valueAsDate < new Date("1900/01/01") || birthday.valueAsDate > new Date() ) {
      birthday.classList.add('is-invalid')
      invalidBirthday.textContent = 'Дата рождения должна находиться в диапазоне от 01.01.1900 до текущей даты'
    } else {
      birthday.classList.remove('is-invalid')
    }

    if (firstName.classList.contains('is-invalid') || surname.classList.contains('is-invalid') || lastname.classList.contains('is-invalid') || faculty.classList.contains('is-invalid') || birthday.classList.contains('is-invalid') || studyStart.classList.contains('is-invalid'))  {

  } else {
      const response = await fetch("/api/students", {
        method: "POST",
        body: JSON.stringify({
          name: firstName.value,
          surname: surname.value,
          lastname: lastname.value,
          faculty: faculty.value,
          birthday: birthday.valueAsDate,
          studyStart: studyStart.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const student = await response.json();
      studentsList.push(student);

      renderStudentsTable(studentsList)

  }



  })
}

const sortStudents = (arr, prop, dir = false) => arr.sort((a,b) => (!dir ? a[prop] < b[prop] : a[prop] > b[prop]) ? -1 : 0)

console.log(sortStudents(studentsList, 'name', false))

const sortByClick = () => {
  let studentHead = document.getElementById('student-head')
  studentHead.addEventListener('click', function(e) {
    const target = e.currentTarget;
    if(target.classList.contains('sorted-up')) {
      sortStudents(studentsList, 'name', true)
      target.classList.remove('sorted-up')
      target.classList.add('sorted-down')
    } else {
      sortStudents(studentsList, 'name', false)
      target.classList.remove('sorted-down')
      target.classList.add('sorted-up')
    }
    renderFilteredTable(studentsList)
  })
  let facultyHead = document.getElementById('faculty-head')
  facultyHead.addEventListener('click', function(e) {
    const target = e.currentTarget;
    if(target.classList.contains('sorted-up')) {
      sortStudents(studentsList, 'faculty', true)
      target.classList.remove('sorted-up')
      target.classList.add('sorted-down')
    } else {
      sortStudents(studentsList, 'faculty', false)
      target.classList.remove('sorted-down')
      target.classList.add('sorted-up')
    }
    renderFilteredTable(studentsList)
  })
  let birthDateHead = document.getElementById('birthDate-head')
  birthDateHead.addEventListener('click', function(e) {
    const target = e.currentTarget;
    if(target.classList.contains('sorted-up')) {
      sortStudents(studentsList, 'birthday', true)
      target.classList.remove('sorted-up')
      target.classList.add('sorted-down')
    } else {
      sortStudents(studentsList, 'birthday', false)
      target.classList.remove('sorted-down')
      target.classList.add('sorted-up')
    }
    renderFilteredTable(studentsList)
  })
  let eduDateHead = document.getElementById('eduDate-head')
  eduDateHead.addEventListener('click', function(e) {
    const target = e.currentTarget;
    if(target.classList.contains('sorted-up')) {
      sortStudents(studentsList, 'studyStart', true)
      target.classList.remove('sorted-up')
      target.classList.add('sorted-down')
    } else {
      sortStudents(studentsList, 'studyStart', false)
      target.classList.remove('sorted-down')
      target.classList.add('sorted-up')
    }
    renderFilteredTable(studentsList)
  })
}

function filter(arr, prop, value) {
  switch(prop) {
    case 'fio':
      return arr.filter(element => (element.name + ' ' + element.surname + ' ' + element.lastname).toLowerCase().includes(value.toLowerCase()));
    case 'fac':
      return arr.filter(element => (element.faculty).toLowerCase().includes(value.toLowerCase()));
    case 'eduStart':
      return arr.filter(element => element.studyStart == value);
    case 'eduFin':
      return arr.filter(element => element.studyStart + 4 == value);
    default:
      return arr;
  }
}

function renderFilteredTable(studentsArr) {
  let table = document.getElementById('table-body')

  table.innerHTML = ''

  const fioval = document.getElementById('inlineFilterInputGroupFirstname').value
  const facultyVal = document.getElementById('inlineFilterInputGroupFaculty').value
  const edyYearStaVal = document.getElementById('inlineFilterInputGroupEduyearStart').value
  const edyYearFinVal = document.getElementById('inlineFilterInputGroupEduyearFinish').value
  console.log(facultyVal)
  console.log(edyYearFinVal)
  console.log(edyYearStaVal)

  let newArr = [...studentsArr]
  if(fioval !== '') newArr = filter(studentsArr, 'fio', fioval)
  if(facultyVal !== '') newArr = filter(newArr, 'fac', facultyVal)
  if(edyYearStaVal !== '') newArr = filter(newArr, 'eduStart', edyYearStaVal)
  if(edyYearFinVal !== '') newArr = filter(newArr, 'eduFin', edyYearFinVal)
  newArr.forEach(student => {
    getStudentItem(student)
  });

  return table
}

const filterByClick = () => {
  let filterButton = document.getElementById('filter-click');
  filterButton.addEventListener('click', function(){
    renderFilteredTable(studentsList)
  })
}

const generateNumber = (id) => {
  const element = document.getElementById(id)
  const currentYear = new Date().getFullYear()
  for(let i=2000; i < currentYear + 1; i++) {
    let option = document.createElement("option");
    option.text = i;
    option.value = i;
    element.appendChild(option);
  }
}



// Этап 5. К форме добавления студента добавьте слушатель события отправки формы, в котором будет проверка введенных данных.Если проверка пройдет успешно, добавляйте объект с данными студентов в массив студентов и запустите функцию отрисовки таблицы студентов, созданную на этапе 4.


// Этап 5. Создайте функцию сортировки массива студентов и добавьте события кликов на соответствующие колонки.

// Этап 6. Создайте функцию фильтрации массива студентов и добавьте события для элементов формы.
