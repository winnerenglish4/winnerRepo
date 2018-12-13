<template>
    <div>
        <app-menu></app-menu>
        <div class="pageTitle w3-large w3-padding">โรงเรียน > ประเภทโรงเรียน</div>
        <div class="pageContent">
            <div>
            <table class="w3-text-white w3-table" style="width:80%; margin:auto;">
                <tr>
                    <td style="width:200px;">เพิ่มประเภทโรงเรียน :</td>
                    <td><input type="text" class="w3-input" v-model="schoolType.name"></td>
                    <td><button class="w3-btn w3-teal" @click="addBtn()">บันทึก</button></td>
                </tr>
            </table>
            <table class="w3-white w3-table-all">
                <tr>
                    <td style="width:10%" class="w3-center">ลำดับ</td>
                    <td>ประเภทโรงเรียน</td>
                    <td style="width:5%" class="w3-center">ลบ</td>
                    <td style="width:5%" class="w3-center">แก้ไข</td>
                </tr>
                <tr v-for="(item,index) in schoolTypeList" :key="index">
                    <td class="w3-center">{{index +1}}</td>
                    <td>{{item.name}}</td>
                    <td class="w3-center"><i class="fas fa-trash-alt" @click="deleteBtn(item.key)"></i></td>
                    <td class="w3-center"><i class="fas fa-edit" @click="editBtn(item.key)"></i></td>
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
            schoolTypeList: [],
        }
    },
    mounted() {
        this.loadDefaultData()
    },
    methods: {
        addBtn(){
            //ปุ่มบันทึกในการเพิ่มปรเภทโรงเรียน
            db.collection('schooltype').add(this.schoolType)
            swal('บันทึกข้อมูลเรียบร้อย').then(()=>{
               this.schoolType.name = ''
               this.loadDefaultData()
            })
        },
        deleteBtn(index){
            //ปุ่มลบประเภทโรงเรียน
             let _this = this
             swal({
                    title: 'ลบข้อมูล',
                    text: 'การลบข้อมูลจะไม่สามารถกู้กลับคืนได้',
                    input: 'checkbox',
                    showCancelButton: true,
                    cancelButtonColor: '#d33',
                    inputValue: 0,
                    inputPlaceholder:'ยืนยันการลบข้อมูล',
                    confirmButtonText: 'ยืนยัน',
                    cancelButtonText: 'ยกเลิก',
                    inputValidator: (result) => {
                        return !result && 'ต้องยืนยันการลบข้อมูลก่อน'
                    }
                }).then((result=>{
                if(result.value){
                    db.collection('schooltype').doc(index).delete()
                        .then(()=>{
                            swal("ลบข้อมูลเรียบร้อยแล้ว").then(()=>{
                                this.loadDefaultData()
                            })
                        })
                } 
            }))
        },
        editBtn(index){
            this.$router.push("/schooltype/edit/"+index)
        },
        loadDefaultData(){
             //โหลดข้อมูลทั้งหมดจากฐานข้อมูล แล้วเก็บไว้ในตัวแปร schoolList
            let _this = this
            this.schoolTypeList =[]
            db.collection('schooltype')
                .get()
                .then(function(querySnapshot) {
                     querySnapshot.forEach(function(doc) {
                        let dataList = {
                            key : doc.id
                        }
                        let dataFinal = { ...doc.data(), ...dataList}
                    _this.schoolTypeList.push(dataFinal)
                });
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
</style>