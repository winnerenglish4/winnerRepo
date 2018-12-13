import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import SchoolType from './views/school/Schooltypemain.vue'
import SchoolTypeEdit from './views/school/Schooltypeedit.vue'
import School from './views/school/Schoolmain.vue'
import SchoolAdd from './views/school/Schooladd.vue'
import SchoolEdit from './views/school/Schooledit.vue'
import Mainmenu from './views/Mainmenu.vue'
import User from './views/user/Usermain.vue'
import UserAdd from './views/user/Useradd.vue'
import  UserEdit from './views/user/Useredit.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      //หน้า Home
      path: '/', 
      name: 'login',
      component: Login
    },
    {
      //หน้า Mainmenu
      path: '/mainmenu', 
      name: 'mainmenu',
      component: Mainmenu
    },
    {
      //หน้าหลักประเภทโรงเรียน
      path: '/schooltype',
      name: 'schooltype',
      component: SchoolType
    },
    {
      //หน้าหลักแก้ไขประเภทโรงเรียน
      path: '/schooltype/edit/:id',
      name: 'schooltypeedit',
      component: SchoolTypeEdit
    },
    {
      //หน้าหลัก school
      path: '/school',
      name: 'school',
      component: School
    },
    {
      //หน้าหลักในการเพิ่มโรงเรียน
      path: '/school/add',
      name: 'schooladd',
      component: SchoolAdd
    },
    {
      // หน้าหลักในการแก้ไขและลบโรงเรียน
      //ส่งค่า id = school code
      path: '/school/edit/:id',
      name: 'schooledit',
      component: SchoolEdit
    },
    {
      //หน้าหลัก user
      path: '/user',
      name: 'user',
      component: User
    },
    {
      //หน้าเพิ่ม user
      path: '/user/add',
      name: 'useradd',
      component: UserAdd
    },
    {
      //หน้าแก้ไข user
      path: '/user/edit/:id',
      name: 'useredit',
      component: UserEdit
    },

  ]
})
