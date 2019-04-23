<template>
  <div id="app">
    <NewStudentForm v-on:student-added="newStudentAdded"></NewStudentForm>
    <StudentTable v-bind:students="students"
                  v-on:student-present="studentArrivedOrLeft"
                  v-on:delete-student="studentDeleted"></StudentTable>
    <StudentMessage v-bind:message="message" v-bind:name="name"></StudentMessage>
  </div>
</template>

<script>
import NewStudentForm from './components/NewStudentForm'
import StudentTable from './components/StudentTable'
import StudentMessage from './components/StudentMessage'

export default {
  name: 'app',
  data(){
    return{
      students: [],
      message: '',
      name: ''
    }
  },
  components: {
    NewStudentForm,
    StudentTable,
    StudentMessage
  },
  mounted(){
    this.updateStudents()
  },
  methods: {
    newStudentAdded(student){
      // call the addStudent method in StudentService.js, when complete call updateStudents to update the student array
      this.$student_api.addStudent(student).then(student => {
        this.updateStudents()
      }).catch(err => {
          let msg = err.response.data.join(', ');
          alert('Error adding student.\n' + msg)
      })
    },
    studentArrivedOrLeft(student){
        // call the updateStudent method from StudentService.js
        this.$student_api.updateStudent(student).then(() =>{
            this.message = student.present ? 'Welcome, ' : 'Goodbye, ';
            this.name = student.name;
            this.updateStudents()
        })
    },
    studentDeleted(student){
        this.$student_api.deleteStudent(student.id).then(() =>{
            this.updateStudents()
        })
    },
    updateStudents(){
      this.$student_api.getAllStudents().then(students =>{
        this.students = students
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
