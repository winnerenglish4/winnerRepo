import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
// Initialize Firebase
var config = {
  apiKey: "AIzaSyBo9gzdKKj-uGBmjrEjEfijhQUD9rjYK_w",
  authDomain: "test-81ed1.firebaseapp.com",
  databaseURL: "https://test-81ed1.firebaseio.com",
  projectId: "test-81ed1",
  storageBucket: "test-81ed1.appspot.com",
  messagingSenderId: "72916357835"
};
firebase.initializeApp(config);
// Initialize Cloud Firestore through Firebase
export const db = firebase.firestore();

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
