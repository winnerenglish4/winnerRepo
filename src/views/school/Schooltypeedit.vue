<template>
    <div>
        <app-menu></app-menu>
        <div class="pageTitle w3-large w3-padding">โรงเรียน > ประเภทโรงเรียน > แก้ไข</div>
        <div class="pageContent">
            <div>
                <div class="w3-xlarge w3-text-white w3-margin">แก้ไขประเภทโรงเรียน</div>
                <table class="w3-text-white w3-table" style="width:50%; margin:auto;">
                    <tr>
                        <td style="width: 180px;">ประเภทโรงเรียน</td>
                        <td><input type="text"  class="w3-input" v-model="schoolType.name"></td>
                    </tr>
                    <tr>
                        
                        <td colspan="2" class="w3-center">
                            <div>
                                <button class="w3-btn w3-red" @click="cancelBtn()">ยกเลิก</button>
                                <button class="w3-btn w3-teal" style="margin-left:30px;" @click="saveBtn()">บันทึก</button>
                            </div>
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
            schoolType: {//ชื่อประเภทโรงเรียนที่ต้องการจะเพิ่ม
                name: ''
            },
        }
    },

    methods: {
        loadData(){
            //โหลดข้อมูลตั้งต้นมาโชว์
            db.collection('schooltype').doc(this.$route.params.id)
            .get()
            .then((data)=>{
                this.schoolType =data.data()
            })
        },
        saveBtn(){
            //ปุ่มบันทึกข้อมูล
            db.collection('schooltype').doc(this.$route.params.id).set(this.schoolType)
            swal("บันทึกข้อมูลเรียบร้อยแล้ว").then(()=>{
                this.$router.push('/schooltype')
            })
        },
        cancelBtn(){
            //ปุ่มยกเลิก
            this.$router.push('/schooltype')
        }
    },
    mounted(){
        this.loadData()
    },
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
</style>
