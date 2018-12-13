const state = {
    menuActive: 0, //ลำดับเมนูที่ user เลือก
    subMenuActive: 1, //ลำดับเมนูย่อยที่ user เลือก
    userData:[], //ข้อมูล user
    userKey: 0 //user key ใช้ check การ login ซ้อน
}

const mutations = {
    setMenuActive: (state,payload) =>{  //Set ค่า menuAction
        state.menuActive = payload
    },
    setSubMenuActive: (state,payload) =>{ //Set ค่า submenuaction
        state.subMenuActive = payload
    },
    setUserData: (state,payload) =>{ //Set ค่า userData
        state.userData = payload
    },
    setUserKey: (state,payload) =>{ //Set ค่า userKey
        state.userKey = payload
    }
}

const actions = {
    setMenuActive: ({commit},payload)=>{
        commit('setMenuActive',payload)
    },
    setSubMenuActive: ({commit},payload)=>{
        commit('setSubMenuActive',payload)
    },
    setUserData: ({commit},payload)=>{
        commit('setUserData',payload)
    },
    setUserKey: ({commit},payload)=>{
        commit('setUserKey',payload)
    },
}

export default{
    state,
    mutations,
    actions
}