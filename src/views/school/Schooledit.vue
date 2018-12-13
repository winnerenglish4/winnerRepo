<template>
<div class="mainapp">
        <button class="w3-btn w3-red w3-round" @click="deleteData()"><i class="far fa-trash-alt" ></i></button>
        <table>
            <tr>
                <td>รหัสโรงเรียน</td>
                <td><input type="text" class="w3-input" v-model="school.code"></td>
            </tr>
            <tr>
                <td>ชื่อโรงเรียน</td>
                <td><input type="text" class="w3-input" v-model="school.name"></td>
            </tr>
            <tr>
                <td colspan="2">
                    <button class="w3-btn w3-round w3-teal" @click="editSchoolBtn()">บันทึก</button>
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
import {db} from '../../main.js'
import swal from 'sweetalert2'
export default {
    data(){
        return{
            school: {
                code: '',   //รหัสโรงเรียน
                name: ''    //ชื่อโรงเรียน
            },
            schoolRef : db.collection("school").doc(this.$route.params.id) //ที่อยู่ของข้อมูลโรงเรียน
        }
    },
    mounted() {
        //ทำการโหลดข้อมูลโรงเรียนตาม parameter ที่ส่งมา
        let _this = this
        this.schoolRef.get().then(function(doc) {
            if (doc.exists) {
                _this.school.code = doc.data().code
                _this.school.name = doc.data().name
            } 
        })

    },
    methods: {
        editSchoolBtn(){
            //บันทึกข้อมูลที่แก้ไขลงในฐานข้อมูล
            this.schoolRef.update(this.school)
            swal({
                title: 'บันทึกเสร็จสิ้น',
                type: 'success'
            }).then(()=>{
                    this.$router.push("/school")    
            })
        },
        deleteData(){
            //ลบข้อมูลโรงเรียน
            this.schoolRef.delete().then(()=>{
                swal({
                    title: 'ลบข้อมูลเรียบร้อยแล้ว',
                    type: 'success'
                }).then(()=>{
                    this.$router.push("/school")    
                })
            })
        }
    }

}
</script>


<style scoped>
    .mainapp{
        width: 500px;
        margin: auto;
    }
</style>
