<template>
    <div>
        <app-menu></app-menu>
        <div class="pageTitle w3-large w3-padding">ผู้ใช้งาน > ผู้ดูแลระบบ</div>
        <div class="pageContent">
            <div class="w3-right">
                <router-link to="/user/add">
                    <button>add</button>
                </router-link>
            </div>
            <br><br>

            <table class="w3-table w3-light-gray">
                <tr>
                    <td class="w3-center" style="width:10%">ลำดับ</td>
                    <td>ชื่อ</td>
                    <td>ชื่อผู้ใช้งาน</td>
                    <td style="width:50px;" >P</td>
                    <td style="width:50px;">U</td>
                    <td style="width:50px;">S</td>
                    <td style="width:50px;">R</td>
                    <td style="width:50px;">M</td>
                    <td style="width:50px;">E</td>
                    <td style="width:50px;">ลบ</td>
                    <td style="width:50px;">แก้ไข</td>
                </tr>
                <tr v-for="(item,index) in userList" :key="index">
                    <td class="w3-center">{{index+1}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.username}}</td>
                    <td :class="{'w3-text-green': item.isPractice, 'w3-text-red': !item.isPractice}">P</td>
                    <td :class="{'w3-text-green': item.isUser, 'w3-text-red': !item.isUser}">U</td>
                    <td :class="{'w3-text-green': item.isSchool, 'w3-text-red': !item.isSchool}">S</td>
                    <td :class="{'w3-text-green': item.isReport, 'w3-text-red': !item.isReport}">R</td>
                    <td :class="{'w3-text-green': item.isMonitor, 'w3-text-red': !item.isMonitor}">M</td>
                    <td :class="{'w3-text-green': item.isEtc, 'w3-text-red': !item.isEtc}">E</td>
                    <td><i class="fas fa-trash-alt w3-text-red" @click="deleteBtn(item.key)"></i></td>
                    <td><i class="fas fa-edit w3-text-teal" @click="editBtn(item.key)"></i></td>
                </tr>
            </table>
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
            userList: [],
        }
    },
    mounted() {
        this.loadData()
    },
    methods: {
        loadData(){
            //โหลดข้อมูลจาก user
            let _this = this
            this.userList =[]
            
            db.collection('user')
                .get()
                .then((data)=>{
                    data.forEach(doc => {
                        let dataList = {
                            key : doc.id
                        }
                        let dataFinal = { ...doc.data(), ...dataList}
                        this.userList.push(dataFinal)                
                    })
                })
        },
        deleteBtn(index){
            //ลบข้อมูล username
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
                    db.collection('user').doc(index).delete()
                        .then(()=>{
                            swal("ลบข้อมูลเรียบร้อยแล้ว").then(()=>{
                                this.loadData()
                            })
                        })
                } 
            }))
        },
        editBtn(index){
            this.$router.push('/user/edit/' + index)
        },
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

