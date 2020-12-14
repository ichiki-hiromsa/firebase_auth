import Vuex from 'vuex'

// vuexページまたいで
export default () => new Vuex.Store({
  // 本体
  //メソッドの本体的な。触らない。
  state: {
    loginInfo: {
      // ログインフラグの初期状態
      isLogin: false,
      uid: ""
    }
  },
  getters: {
    //関数
    // 値の取得
    loginInfo: state => state.loginInfo
    // 下記の略
    // loginInfo:function(state){
    //   return state.loginInfo
    // }
  },
  // 値を変えていい
  // 同期処理
  mutations: {
    // 第一引数は必ずstate
    setLoginInfo(state, loginInfo) {
      state.loginInfo = loginInfo
    }
  },
  // データ取得など、mutationの前処理
  // 非同期処理
  actions: {

  }
})