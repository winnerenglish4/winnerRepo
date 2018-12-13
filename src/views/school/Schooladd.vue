<template>
    <div>
        <app-menu></app-menu>
        <div class="pageTitle w3-large w3-padding">โรงเรียน > จัดการโรงเรียน > เพิ่มโรงเรียน</div>
        <div class="pageContent">
            <div class="pageContentInside">
                <div class="w3-xlarge w3-padding">ข้อมูลโรงเรียน</div>


                <table>
                    <tr>
                        <td>รหัสโรงเรียน</td>
                        <td><input type="text" class="w3-input" v-model="schoolCode"></td>
                        <td>ชื่อโรงเรียน</td>
                        <td><input type="text" class="w3-input" v-model="schoolName"></td>
                    </tr>
                    <tr>
                        <td colspan="4">
                            <button class="w3-btn w3-round w3-teal" @click="addNewSchoolBtn()">บันทึก</button>
                        </td>
                    </tr>
                </table>
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
            schoolCode : '', //รหัสโรงเรียน
            schoolName : '' //ชื่อโรงเรียน
        }
    },
    methods: {
        addNewSchoolBtn(){
            //เพิ่มข้อมูลโรงเรียนเข้าฐานข้อมูล
            //ตรวจสอบว่ามีการกรอกข้อมูลครบทุกช่อง และต้องตรวจสอบว่าไม่มีข้อมูลซ้ำ และบันทึกข้อมูลเข้าฐานข้อมูล
            const schoolRef = db.collection("school").doc(this.schoolCode)

            if(!(this.schoolCode.length && this.schoolName.length )){
                swal('กรุณาใส่ข้อมูลให้ครบถ้วน')
                return
            }

            schoolRef.get().then(
                (snapshot)=>{
                    if(snapshot.exists){
                        swal("มีรหัสโรงเรียนนี้อยู่แล้ว")
                        return
                    } 
                }
            )

            schoolRef.set({
                code: this.schoolCode,
                name: this.schoolName,
            })
            swal('บันทึกข้อมูลเรียบร้อย').then(
                ()=>{
                    this.schoolCode = ''
                    this.schoolName = '' 
                    this.$router.push('/school') 
                }
            )

          
            
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
