<template>
<!-- :counter:varidationがtrueの時だけ文字数カウント -->
<!-- 三項演算子=>条件式 ? trueの処理 : falseの処理 -->
<!-- appendでフラグ切り替えてアイコンはそれを監視 -->
<!-- outlinedは枠 -->
 <v-text-field
    v-model="setPassword"
    :rules="validation ? [rules.match] : [rules.required]"
    :append-icon="ShowPassword ? 'mdi-eye' : 'mdi-eye-off'"
    :type="ShowPassword ? 'text' : 'pass'"
    :hint="validation ? hint : undefined"
    label="パスワードを入力"
    outlined
    required
    validate-on-blur
    autocomplete="on"
    @click:append="ShowPassword = !ShowPassword"
  />
</template>

<script>
export default {
  props: {
    pass: {
      type: String,
      default: ''
    },
    validation: {
      type: Boolean,
      default: false
    }
  },
  data () {
    const hint = '8文字以上20文字以下、半角英数字•ﾊｲﾌﾝ•ｱﾝﾀﾞｰﾊﾞｰが使えます'
    return {
      ShowPassword: false,
      hint,
      rules: {
        //!!はオブジェクトの有り無しでbooleanを返す
        required: value => !!value || '',
        //test() メソッドは、正規表現と指定された文字列の一致を調べるための検索を実行してbooleanを返す
        match: value => /^[\w-]{8,20}$/.test(value) || hint
      }
    }
  },
  computed: {
    setPassword: {
      //フォームに入力された値（親から連携）をsetの引数へ渡す
      get () { return this.pass },
      set (newVal) { return this.$emit('update:pass', newVal) }
    }
  }
}
</script>