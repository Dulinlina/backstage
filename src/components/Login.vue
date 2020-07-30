<template>
<!-- 登录页面 -->
  <div class="login_container">
    <div class="login_box">
        <!-- 登录头像区域 -->
      <div class="avater_box">
        <img src="../assets/logo.png" alt />
      </div>
      <!-- 登陆表单区域 -->
      <el-form ref="loginFormRef" :rules="loginFromRules" :model="loginFrom" label-width="0px" class="login_from">
          <!-- 用户 -->
        <el-form-item prop="username">
            <el-input v-model="loginFrom.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
            <el-input type="password" v-model="loginFrom.password" prefix-icon="iconfont icon-3702mima"></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    //这里存放数据
    return {
        // 登录表单的数据绑定对象
        loginFrom:{
            username:'admin',
            password:'123456'
        },
        // 表单的验证规则对象
        loginFromRules:{
            // 验证用户名是否合法
            username:[
                { required: true, message: '请输入登录名称', trigger: 'blur' },
                { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
            ],
            // 验证密码是否合法
            password:[
                { required: true, message: '请输入登录密码', trigger: 'blur' },
                { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }]
        }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //   点击重置按钮,重置登陆表单
      resetLoginForm(){
          this.$refs.loginFormRef.resetFields()
        // console.log(this)

      },
    //  点击登录按钮进行
      login(){
          this.$refs.loginFormRef.validate(valid =>{
            // console.log(valid)
            if(!valid) return;
            this.$http.post('login', this.loginFrom).then((res)=>{
                // console.log(res)
                if(res.data.meta.status !== 200) return this.$message.error('登录失败！')
                this.$message.success("登陆成功")
                window.sessionStorage.setItem("token",res.data.data.token);
                this.$router.push("/home")
                // console.log()

            })
          })
      }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
};
</script>
<style lang="less" scoped>
.login_container {
    background-color: #2b4b6b;
    height: 100%;
    overflow: hidden;
}

.login_box {
    width: 450px;
    height: 304px;
    background-color: #fff;
    border-radius: 4px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}

// 图标box
.avater_box {
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 8px;
    box-shadow: 0 0 10px #eee;
    position: absolute;
    background-color: #fff;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}

// 登录表单
.login_from
{
    position: absolute;
    bottom: 0;
    width:100%;
    padding: 0 20px;
    box-sizing: border-box;
}

// 按钮
.btns
{
    display: flex;
    justify-content: flex-end;
}
</style>