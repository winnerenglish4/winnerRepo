<template>
  <div class="menudiv">
    <div class="w3-padding w3-large w3-dark-gray">{{this.$store.state.system.userData.name}}</div>
  
    <!-- จัดการแบบฝึกหัด -->
    <div v-if="this.$store.state.system.userData.isPractice">
      <div class="w3-padding titlemenudiv" :class="{'w3-gray':chooseMenu == 1}" @click="showPractice()">จัดการแบบฝึกหัด</div>
      <div v-show="this.$store.state.system.menuActive == 1">
          <div class="submenudiv" :class="{'submenuactive': chooseSubMenu == 1}" >xxx</div>
          <div class="submenudiv" :class="{'submenuactive': chooseSubMenu == 2}">yyy</div>
      </div>
      <div class="linediv" ></div>
      </div>

    <!-- ผู้ใช้งาน -->
    <div v-if="this.$store.state.system.userData.isUser">
      <div class="w3-padding titlemenudiv" :class="{'w3-gray':chooseMenu == 2}" @click="showUser()">ผู้ใช้งาน</div>
      <div v-show="this.$store.state.system.menuActive == 2">
        <div class="submenudiv" :class="{'submenuactive': chooseSubMenu == 1}" >นักเรียน (บุคคล)</div>
        <div class="submenudiv" :class="{'submenuactive': chooseSubMenu == 2}">นักเรียน (กลุ่ม)</div>
        <div class="submenudiv" :class="{'submenuactive': chooseSubMenu == 3}">คุณครู</div>
        <div class="submenudiv" :class="{'submenuactive': chooseSubMenu == 4}" @click="showUserAdmin()">ผู้ดูแลระบบ</div>
      </div>
      <div class="linediv" ></div>
    </div>

    <!-- โรงเรียน -->
    <div v-if="this.$store.state.system.userData.isSchool">
      <div class="w3-padding titlemenudiv" :class="{'w3-gray':chooseMenu == 3}" @click="showSchoolType()">โรงเรียน</div>
      <div v-show="this.$store.state.system.menuActive == 3">
          <div class="submenudiv" :class="{'submenuactive': chooseSubMenu == 1}"  @click="showSchoolType()">ประเภทโรงเรียน</div>
          <div class="submenudiv" :class="{'submenuactive': chooseSubMenu == 2}"  @click="showSchool()">จัดการโรงเรียน</div>
          <div class="submenudiv" :class="{'submenuactive': chooseSubMenu == 3}">ปีการศึกษา</div>
      </div>
      <div class="linediv" ></div>
    </div>

    <!-- รายงาน -->
    <div v-if="this.$store.state.system.userData.isReport">
      <div class="w3-padding titlemenudiv" :class="{'w3-gray':chooseMenu == 4}" @click="showReport()">รายงาน</div>
      <div v-show="this.$store.state.system.menuActive == 4">
          <div class="submenudiv" :class="{'submenuactive': chooseSubMenu == 1}" >xxx</div>
          <div class="submenudiv" :class="{'submenuactive': chooseSubMenu == 2}">yyy</div>
      </div>
      <div class="linediv" ></div>
    </div>

    <!-- ระบบติดตาม -->
    <div v-if="this.$store.state.system.userData.isMonitor">
      <div class="w3-padding titlemenudiv" :class="{'w3-gray':chooseMenu == 5}" @click="showMonitor()">ระบบติดตาม</div>
      <div v-show="this.$store.state.system.menuActive == 5">
          <div class="submenudiv" :class="{'submenuactive': chooseSubMenu == 1}" >xxx</div>
          <div class="submenudiv" :class="{'submenuactive': chooseSubMenu == 2}">yyy</div>
      </div>
      <div class="linediv" ></div>
    </div>

    <!-- อื่นๆ -->
    <div v-if="this.$store.state.system.userData.isEtc">
      <div class="w3-padding titlemenudiv" :class="{'w3-gray':chooseMenu == 6}" @click="showEtc()">อื่นๆ</div>
      <div v-show="this.$store.state.system.menuActive == 6">
          <div class="submenudiv" :class="{'submenuactive': chooseSubMenu == 1}" >xxx</div>
          <div class="submenudiv" :class="{'submenuactive': chooseSubMenu == 2}">yyy</div>
      </div>
      <div class="linediv" ></div>
    </div>

    <div class="logoutBtn">
      <div class="linediv" ></div>
      <div class="w3-padding" @click="logoutBtn()">ออกจากระบบ</div>
    </div>


  </div>
</template>

<script>
import swal from 'sweetalert2'
import { mapActions } from "vuex";
import {db} from '../main.js'
export default {
  data(){
    return{
      key: 0,
      systemKey: this.$store.state.system.userKey
    }
  },

  methods: {
    ...mapActions(["setMenuActive","setSubMenuActive","setUserData"]),
    showPractice(){
      //แสดงเมนูย่อย จัดการแบบฝึกหัด
      this.setMenuActive(1)
      this.setSubMenuActive(1)
    },


    showUser(){
      //แสดงเมนูย่อย ผู้ใช้งาน
      this.setMenuActive(2)
      this.setSubMenuActive(1)
    },
    showUserAdmin(){
      this.setMenuActive(2)
      this.setSubMenuActive(4)
      this.$router.push('/user')
    },

    showSchoolType(){
      //แสดงเมนูย่อย โรงเรียน
      this.setMenuActive(3)
      this.setSubMenuActive(1)
       this.$router.push('/schooltype')
    },
    showSchool(){
      this.setMenuActive(3)
      this.setSubMenuActive(2)
      this.$router.push('/school')
    },


    showReport(){
      //แสดงเมนูย่อย รายงาน
      this.setMenuActive(4)
      this.setSubMenuActive(1)
    },
    showMonitor(){
      //แสดงเมนูย่อย ระบบติดตาม
      this.setMenuActive(5)
      this.setSubMenuActive(1)
    },
    showEtc(){
      //แสดงเมนูย่อย อื่นๆ
      this.setMenuActive(6)
      this.setSubMenuActive(1)
    },
    
    logoutBtn(){
      let _this = this
            swal({
                title: 'ออกจากระบบ',
                type: 'warning',
                allowOutsideClick : false,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'ออกจากระบบ',
                cancelButtonText: 'ยกเลิก',
                reverseButtons: true
            }).then((result=>{
                if(result.value){
                  _this.setUserData('')
                  _this.setMenuActive(0)
                  _this.setSubMenuActive(1)
                  _this.$router.push('/')
                } 
            }))
      
    }
  },
  computed:{
    chooseMenu: function(){
      //เมนูหลักที่ user เลือก
      return this.$store.state.system.menuActive
    },
    chooseSubMenu: function(){
      // ลำดับเมนูย่อยที่ user เลือก
      return this.$store.state.system.subMenuActive
    }

  },
  watch:{
    key: function(val){
        let _this = this
        if(this.key){
            if(this.key != this.systemKey){
                swal({
                title: 'ออกจากระบบ',
                text: 'มีการเข้าสู่ระบบจากอุปกรณ์อื่น',
                type: 'warning',
                allowOutsideClick : false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'ออกจากระบบ',
            }).then((result=>{
                if(result.value){
                  _this.setUserData('')
                  _this.setMenuActive(0)
                  _this.setSubMenuActive(1)
                  _this.$router.push('/')
                } 
            }))
      
            }
        } 
    }
  },

  created: function(){        
    db.collection('userwinnerkey').doc(this.$store.state.system.userData.key)
    .onSnapshot((doc)=>{
            this.key = doc.data().key
    })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.menudiv{
  width: 300px;
}
.linediv{
  background-color: gray;
  height: 1px;
}
.logoutBtn{
  position: absolute;
  width: 300px;
  bottom: 0px;
  cursor: pointer;
}
.titlemenudiv{
  cursor: pointer;
}
.submenudiv{
  padding: 5px;
  cursor: pointer;
}
.submenuactive{
  color: teal;
  background-color:whitesmoke;
  cursor: pointer;
}

</style>
