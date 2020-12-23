<template>
  <v-container>
    <v-card>
      <div>
        {{ $store.getters.loginInfo }}
      </div>
      <div>
        {{ $store.getters.loginInfo.isLogin }}
      </div>
      <div>
        {{ $store.getters.userInfo }}
      </div>
      <v-form ref="form" v-model="valid">
        <email-form :mail.sync="mail" validation />
        <password-form :pass.sync="pass" validation />
        <!-- falseならパイプの右を返す -->
        <!-- loading→読み込みクルクル -->
        <v-row>
          <v-col cols="2">
            <v-btn
              :disabled="!valid || loading"
              :loading="loading"
              class="ml-4"
              @click="createAccount"
            >
              新規登録
            </v-btn>
          </v-col>
          <v-col cols="2" v-show="!$store.getters.loginInfo.isLogin">
            <v-btn
              class="ml-4"
              :disabled="!valid || loading"
              :loading="loading"
              @click="userLogin"
            >
              ログイン
            </v-btn>
          </v-col>
          <v-col cols="2" v-show="$store.getters.loginInfo.isLogin">
            <v-btn
              class="ml-4"
              @click="userLogout"
            >
              ログアウト
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import PasswordForm from "~/components/users/PasswordForm.vue";
import EmailForm from "~/components/users/EmailForm.vue";

export default {
  components: {
    EmailForm,
    PasswordForm,
  },
  data: () => ({
    mail: "",
    pass: "",
    valid: true,
    loading: false,
  }),
  methods: {
    createAccount() {
      const auth = this.$firebase.auth();
      auth
        .createUserWithEmailAndPassword(this.mail, this.pass)
        .then((user) => {
          const db = this.$firebase.firestore();
          //キーとなるuidのところにアドレスを登録する
          db.doc(`users/${user.user.uid}`).set({
            mail: this.mail,
          });
          console.log("called!!");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (error.code === "auth/invalid-email") {
            // メールアドレスの形式がおかしい
            alert("メールアドレスの形式が違います。");
          } else if (error.code === "auth/email-already-exists") {
            // ユーザが無効になっている
            alert("既に利用されているアドレスです。");
          } else if (error.code === "auth/user-not-found") {
            // ユーザが存在しない
            alert("存在しないユーザです。");
          } else {
            alert("エラーが起きました。\nしばらくしてから再度お試しください。");
          }
          console.log(errorCode);
        });
    },
    userLogin() {
      const auth = this.$firebase.auth();
      auth
        .signInWithEmailAndPassword(this.mail, this.pass)
        .then((user) => {
          console.log(user.user.uid);
          alert("ログインしました");
        })
        .catch((error) => {
          let errorCode = error.code;
          let errorMessage = error.message;
          if (error.code === "auth/invalid-email") {
            // メールアドレスの形式がおかしい
            alert("メールアドレスが違います。");
          } else if (error.code === "auth/user-disabled") {
            // ユーザが無効になっている
            alert("ユーザが無効になっています。");
          } else if (error.code === "auth/user-not-found") {
            // ユーザが存在しない
            alert("存在しないユーザです。メールアドレスまたはパスワードが誤っています。");
          } else if (error.code === "auth/wrong-password") {
            // パスワードが間違っている
            alert("パスワードが間違っています。");
          } else if (error.code === "auth/too-many-requests") {
            // 何度もパスワードを間違えた
            alert(
              "パスワード誤入力の制限回数を超えました。お問い合わせください。"
            );
          } else {
            alert("エラーが起きました。\nしばらくしてから再度お試しください。");
          }
          console.log(errorCode);
        });
    },
    userLogout() {
      const auth = this.$firebase.auth();
      auth
        .signOut()
        .then(() => {
          //サインアウト成功
          location.reload()
          alert("サインアウトしました");
        })
        .catch((error) => {
          //An errorhappend.
          console.log(`ログアウト時にエラーが発生しました (${error})`);
        });
    },
  },
};
</script>