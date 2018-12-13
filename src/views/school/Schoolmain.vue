<template>
    <div>
        <app-menu></app-menu>
        <div class="pageTitle w3-large w3-padding">โรงเรียน > จัดการโรงเรียน</div>
        <div class="pageContent">
            <div class="pageContentInside">
                 <table class="w3-table">
                <tr>
                    <td></td>
                    <td style="width:150px;">
                        <router-link to="/school/add">
                            <button class="w3-btn w3-round w3-amber">เพิ่ม</button>
                        </router-link>
                    </td>
                </tr>
            </table>
           
            <table class="w3-table" v-show="!isShowSearch" style="width:80%; margin:auto;">
                <tr>
                    <td style="width:100px;">ค้นหา :</td>
                    <td>
                        <input type="text" class="w3-input" placeholder="ค้นหารหัสโรงเรียนหรือชื่อโรงเรียน" 
                        v-model="schoolSearch" @keyup.enter="searchBtn()">
                    </td>
                    <td><button class="w3-btn w3-round w3-teal" @click="searchBtn()" >ค้นหา</button></td>
                </tr>
            </table>

            <table class="w3-table" v-show="isShowSearch">
                <tr>
                    <td>
                        คำค้นหา :: {{schoolSearch}}
                    </td>
                    <td><button class="w3-btn w3-round w3-teal" @click="searchCancelBtn()">ยกเลิก</button></td>
                </tr>
            </table>

            <hr>
            <table class="w3-table">
                <tr>
                    <th>ลำดับ</th>
                    <th>รหัสโรงเรียน</th>
                    <th>ชื่อโรงเรียน</th>
                    <th>แก้ไข</th>
                </tr>
                <tr v-for="(item,index) in schoolList" :key="index">
                    <td>{{index +1}}</td>
                    <td>{{item.code}}</td>
                    <td>{{item.name}}</td>
                    <td><i class="far fa-edit" @click="schooledit(item.code)"></i></td>
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
            schoolRef : db.collection("school"), //เก็บที่อยู่ของ collection school 
            schoolList :[], //object ที่เก็บค่าข้อมูลโรงเรียนที่เกิดจากการโหลดโดยตรงจาก database หรือเป็นข้อมูลที่คัดกรองแล้วตามคำค้นหา
            schoolSearch :'', //ข้อความที่ใช้ในการค้นหา
            isShowSearch: false //ใช้เปิดปิดสลับแถบค้นหากับคำค้นหา
        }
    },
    mounted() {
        this.loadDefaultData()
    },
    methods:{
        schooledit(code){
            //link ไปยังหน้า edit ของ school
            this.$router.push('/school/edit/' + code)
        },
        searchBtn(){
            //ทำการ filter ข้อมูล shoolList ตามคำค้นหาและทำการเปิดคำค้นหาและปิดค้นหา
            this.schoolList = this.schoolList.filter(a=> 
            {
              return  a.name.includes(this.schoolSearch) || a.code.includes(this.schoolSearch)
            })
            this.isShowSearch = true
        },
        searchCancelBtn(){
            //ปิดคำค้นหาแล้วเปิดแถบการค้นหา และทำการโหลดข้อมูลโรงเรียนทั้งหมดใหม่
            this.isShowSearch = false
            this.schoolList =[]
            this.loadDefaultData()
        },

        loadDefaultData(){
             //โหลดข้อมูลทั้งหมดจากฐานข้อมูล แล้วเก็บไว้ในตัวแปร schoolList
            let _this = this
            this.schoolRef
                .get()
                .then(function(querySnapshot) {
                     querySnapshot.forEach(function(doc) {
                    _this.schoolList.push(doc.data())
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

