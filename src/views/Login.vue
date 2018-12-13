<template>
  <div class="home">
       <table class="w3-table maintable">
         <tr>
           <td>Username</td>
           <td><input type="text" v-model="user.username"></td>
         </tr>
         <tr>
           <td>password</td>
           <td><input type="text" v-model="user.password"></td>
         </tr>
         <tr>
           <td colspan="2" class="w3-center"><button class="w3-btn w3-teal" @click="loginBtn()">Login</button></td>
         </tr>

       </table>

  </div>
</template>

<script>
import swal from 'sweetalert2'
import {db} from '../main.js'
import { mapActions } from "vuex";
export default {
  data(){
    return{
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions(["setUserData","setUserKey"]),

    loginBtn(){
      // check ฐานข้อมูลทำการ login และเก็บค่า userData ใน Vuex และเก็บ key ความปลอดภัยด้วย
      let _this = this
      db.collection("user").where("username", "==", this.user.username)
      .where("password", "==" , this.user.password)
      .get()
      .then(function(querySnapshot) {
        if(querySnapshot.size > 0){
          querySnapshot.forEach(function(doc) {
              let keyData = Math.floor((Math.random() * 1000000) + 1);
              db.collection('userwinnerkey').doc(doc.id).set({
                key : keyData
              })
              let dataList = {
                  key : doc.id
              }
              let dataFinal = { ...doc.data(), ...dataList}
              _this.setUserKey(keyData)
              _this.setUserData(dataFinal)
              _this.$router.push('/mainmenu')
          })
        } else {
          swal("ชื่อผู้ใช้ / รหัสผ่านไม่ถูกต้อง")
        }
      })
      // 
    }
  }
}
</script>


<style scoped>
  .maintable{
    width: 600px;
    margin: auto;
  }
</style>

