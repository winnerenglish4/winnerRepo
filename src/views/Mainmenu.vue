<template>
    <div>
        <app-menu></app-menu>
        <span class="w3-xlarge">ยินดีต้อนรับสู่ระบบ Winner System 4.0</span>
        {{key}}
    </div>
</template>

<script>
import menu from '../components/Menu.vue'
import swal from 'sweetalert2'
import {db} from '../main.js'
export default {
    components: {
        appMenu: menu
    },

    
    
    

}
</script>

