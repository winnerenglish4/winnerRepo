<template>
    <div>
        <app-menu></app-menu>
        <div class="pageTitle w3-large w3-padding">ผู้ใช้งาน > 
            <router-link to="/user">ผู้ดูแลระบบ</router-link > > เพิ่ม
        </div>
        <div class="pageContent">
            <div class="pageContentInside">
                <div class="formdiv">
                    <div class="w3-xlarge w3-padding">เพิ่มผู้ดูแลระบบ</div>
                    <hr>
                    <table class="w3-table">
                        <tr>
                            <td style="width: 100px;">ชื่อ</td>
                            <td>:</td>
                            <td><input type="text" v-model="user.name"></td>
                        </tr>
                        <tr>
                            <td>ชื่อผู้ใช้งาน</td>
                            <td>:</td>
                            <td><input type="text" v-model="user.username"></td>
                        </tr>
                        <tr>
                            <td>รหัสผ่าน</td>
                            <td>:</td>
                            <td><input type="text" v-model="user.password"></td>
                        </tr>
                        <tr>
                            <td colspan="3">การเข้าถึงข้อมูล</td>
                        </tr>
                        <tr>
                            <td colspan="3"><input type="checkbox" class="w3-check" v-model="user.isPractice" > จัดการแบบฝึกหัด</td>
                        </tr>
                        <tr>
                            <td colspan="3"><input type="checkbox" class="w3-check" v-model="user.isUser"> ผู้ใช้งาน</td>
                        </tr>
                        <tr>
                            <td colspan="3"> <input type="checkbox" class="w3-check" v-model="user.isSchool"> โรงเรียน </td>
                        </tr>
                        <tr>
                            <td colspan="3"> <input type="checkbox" class="w3-check" v-model="user.isReport"> รายงาน </td>
                        </tr>
                        <tr>
                            <td colspan="3"> <input type="checkbox" class="w3-check" v-model="user.isMonitor"> ระบบติดตาม </td>
                        </tr>
                        <tr>
                            <td colspan="3"> <input type="checkbox" class="w3-check"  v-model="user.isEtc"> อื่นๆ </td>
                        </tr>
                        <tr>
                            <td colspan="3"> 
                                <button class="w3-btn w3-red" @click="cancelBtn()">ยกเลิก</button>
                                <button class="w3-btn w3-teal" style="margin-left:30px"  @click="saveBtn()">บันทึก</button>
                            </td>
                        </tr>

                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import menu from '../../components/Menu.vue'
import swal from 'sweetalert2'
import {db} from '../../main.js'
export default {
    components: {
        appMenu: menu
    },
    data(){
        return{
            user: {                     //ช้อมูลใน Form
                name: '',                   //ชื่อ  
                username: '',               //ชื่อผู้ใช้งาน
                password: '',               //รหัสผ่าน
                isPractice: false,          //จัดการแบบฝึกหัด
                isUser: false,              //ผู้ใช้งาน
                isSchool: false,            //โรงเรียน
                isReport: false,            //รายงาน
                isMonitor: false,           //ระบบติดตาม
                isEtc: false                //อื่นๆ
            }
        }
    },
    methods: {
        cancelBtn(){
            //ปุ่มยกเลิก กดเพื่อกลับไป /user
            this.$router.push('/user')
        },
        saveBtn(){
            //ปุ่มบันทึกช้อมูล
            //ตรวจสอบข้อมูลว่ามีการกรอกถูกต้องหรือไหม 
            //บันทึกข้อมูลในฐานข้อมูล /user

            //ตรวจสอบมีกรอกข้อมูลหรือเปล่าว
            if(!(this.user.name.length && this.user.username.length && this.user.password.length)){
                swal("กรุณากรอกข้อมูลให้ครบถ้วน")
                return
            }
            //ตรวจสอบ username ไม่ต่ำกว่า 3 ตัว
            if(this.user.username.length < 3){
                swal("username ต้องมีตัวอักษรไม่น้อยกว่า 3 ตัวอักษร")
                return
            }
            //ตรวจสอบ password ไม่ต่ำกว่า 6 ตัว
            if(this.user.password.length <6){
                swal("password ต้องมีตัวอักษรไม่น้อยกว่า 6 ตัวอักษร")
                return
            }
            //ตรวจสอบต้องเลือกการเข้าถึงข้อมูลอย่างน้อยหนึ่งอัน
            if(!(this.user.isPractice || this.user.isUser || this.user.isSchool || this.user.isReport || this.user.isMonitor || this.user.isEtc)){
                swal("ต้องเลือกการเข้าถึงข้อมูลอย่างเดียว")
                return
            }
            //บันทึกข้อมูลลงในฐานข้อมูล user collection
            db.collection("user").add(this.user)
            swal("บันทึกข้อมูลเรียบร้อยแล้ว").then(()=>{
                this.$router.push('/user')
            })

        }
    }
}
</script>

<style scoped>
    .pageTitle{
        position: absolute;
        top: 0px;
        left: 320px;
    }
    .pageContent{
        position: absolute;
        top: 40px;
        left: 300px; 
        height: calc(100vh - 50px);
        width: calc(100% - 320px);
        background-color: #333C4B;
        padding: 15px;
    }
    .pageContentInside{
        margin-left:  15px;
        background-color: whitesmoke;
        width: calc(100% - 30px);
        height: calc(100vh - 65px);
    }
    .formdiv{
        width: 400px;
        margin: auto;
    }
</style>

