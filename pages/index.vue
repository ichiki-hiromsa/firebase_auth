<template>
  <v-container>
    <div>
      <!-- {{$store.getters.loginInfo}} -->
      {{$store.getters.userInfo}}
      <v-text-field v-model="mail"></v-text-field>
      <v-text-field v-model="password"></v-text-field>
      <v-btn @click="createNewAccount">
        新規作成
      </v-btn>
      <v-btn @click="login">
        ログイン
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  data:()=>({
    mail:"",
    password:""
  }),
  mounted(){
    //   middlewareに書く
    //   const auth=this.$firebase.auth()
    //   auth.onAuthStateChanged(user=>{
    //   if(user){
    //     console.log(user.uid)
    //   }else{

    //   }
    // })
  },
  methods:{
    // アカウント作成関数
    createNewAccount(){
      const auth=this.$firebase.auth()
      auth.createUserWithEmailAndPassword(this.mail,this.password)
      .then(user=>{
        console.log(user)
        const db = this.$firebase.firestore()
        db.doc(`users/${user.user.uid}`).set({
          mail:this.mail
        })
      })
    },
    // ログイン関数
    login(){
      const auth=this.$firebase.auth()
      auth.signInWithEmailAndPassword(this.mail,this.password)
      .then(user=>{
        console.log(user.user.uid)
      })
    }
  }
}
</script>
