<template>
<!-- 親子間のデータ通信は短方向のみ→v-modelで双方向を実現 -->
<!-- validate-on-blur：エラーのタイミングをカーソルを離した時にする -->
 <v-text-field v-model="setEmail" 
    :rules="[rules.match]" 
    label="メールアドレスを入力" 
    outlined 
    required 
    validate-on-blur/>
</template>

<script>
export default {
  props: {
    // maliの性質を定義
    mail: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    rules: {
      // 正規表現xxx@xxx.xxx
      match: value => /.+@.+\..+/.test(value) || 'エラーがあります。入力文字列を確認してください。'
    }
  }),
  computed: {
    setEmail: {
      get () { return this.mail },
      set (newVal) { return this.$emit('update:mail', newVal) }
    }
  }
}
</script>