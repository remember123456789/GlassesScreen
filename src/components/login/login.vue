<script setup>
import {ElButton, ElForm, ElFormItem, ElInput, ElPageHeader, ElMessage} from "element-plus";
import {ref, reactive, onMounted} from "vue";
import {UserLogin, UserRegister} from '@/api/login/index.js'
import {useRouter} from "vue-router";

const router = useRouter()
const formRef = ref()
let UserStatus = ref('Log In')
// 0为用户登录 1为注册
let loginstatus = ref(0)
const rules = reactive({
  count: [
    {required: true, message: '请输入手机号', trigger: 'blur'},
    {min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'}
  ]
})
let loginForm = reactive({
  count: '',
  password: ''
})
//登录与注册
const login = async (formEl) => {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    if (valid) {
      if (loginstatus.value === 0) {
        try {
          let loginRes = await UserLogin(loginForm)
          if (loginRes.code === 1) {
            ElMessage({
              message: loginRes.msg,
              type: 'warning',
              plain: true,
            })
          }
          if (loginRes.code === 0) {
            ElMessage({
              message: '登录成功',
              type: 'success',
              plain: true,
            })
            router.push('/main')
          }
        } catch (error) {
          ElMessage({
            message: error.msg,
            type: 'error',
            plain: true,
          })
        }
      } else {
        try {
          let registerRes = await UserRegister(loginForm)
          if (registerRes.code === 0) {
            ElMessage({
              message: '注册成功',
              type: 'success',
              plain: true,
            })
          }
          if (registerRes.code === 1) {
            ElMessage({
              message: registerRes.msg,
              type: 'warning',
              plain: true,
            })
          }
        } catch (error) {
          ElMessage({
            message: error.msg,
            type: 'error',
            plain: true,
          })
        }
      }

    } else {
      console.log('error submit!')
    }
  })
}
//切换到注册
const register = (formEl) => {
  UserStatus.value = 'Register'
  loginstatus.value = 1
  formEl.resetFields()
}

onMounted(() => {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      login(formRef.value)
    }
  })
})

const goBack = (formEl) => {
  UserStatus.value = 'Log In'
  loginstatus.value = 0
  formEl.resetFields()

}
</script>

<template>
  <section class="w3l-hotair-form">
    <h1>近视眼镜销量后台管理系统</h1>
    <div class="container">
      <!-- /form -->
      <div class="workinghny-form-grid">
        <div class="main-hotair">
          <div class="content-wthree">
            <h2>{{ UserStatus }}</h2>
            <el-form ref="formRef"
                     :model="loginForm"
                     label-width="auto"
                     :rules="rules"
                     class="demo-dynamic">
              <el-form-item prop="count" label="账号">
                <el-input v-model="loginForm.count" placeholder="User Name"/>
              </el-form-item>
              <el-form-item prop="password" label="密码">
                <el-input v-model="loginForm.password" type="password" placeholder="User Password"/>
              </el-form-item>
              <el-form-item>
                <el-button size="large" class="btn" @click="login(formRef)">{{ UserStatus }}</el-button>
              </el-form-item>
            </el-form>
            <p class="account" v-if="loginstatus===0">Don't have an account? <a style="cursor: pointer"
                                                                                @click="register(formRef)">Register</a>
            </p>
            <p class="account" v-else>
              <el-page-header @back="goBack(formRef)">
                <template #content>
                  <span class="text-large font-600 mr-3"> Login </span>
                </template>
              </el-page-header>
            </p>
          </div>
          <div class="w3l_form align-self">
            <div class="left_grid_info">
              <img src='@/assets/login/1.png' alt="" class="img-fluid">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="copyright text-center">
      <p class="copy-footer-29">© 基于Echarts的近视眼镜销量信息可视化系统设计与实现</p>
    </div>
  </section>
</template>

<style scoped>
p {
  color: #666;
  font-size: 16px;
  line-height: 25px;
  opacity: .6;
  text-align: center;
}

.btn,
button,
input {
  border-radius: 36px;
  -webkit-border-radius: 36px;
  -moz-border-radius: 36px;
}

.btn:hover,
button:hover {
  transition: 0.5s ease;
  -webkit-transition: 0.5s ease;
  -o-transition: 0.5s ease;
  -ms-transition: 0.5s ease;
  -moz-transition: 0.5s ease;
}


/*-- form styling --*/
.w3l-hotair-form {
  position: relative;
  min-height: 100vh;
  z-index: 0;
  background: #0568C1;
  padding: 40px 40px;
  justify-content: center;
  display: grid;
  grid-template-rows: 1fr auto 1fr;
  align-items: center;
}

.container {
  max-width: 890px;
  margin: 0 auto;
}

.w3l_form {
  flex-basis: 50%;
  -webkit-flex-basis: 50%;
  background: #f4f9fd;
  background-size: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  padding: 40px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  align-items: center;
  display: grid;
}

.content-wthree {
  flex-basis: 50%;
  -webkit-flex-basis: 50%;
  box-sizing: border-box;
  padding: 3em 3em;
  background: #fff;
  box-shadow: 2px 9px 49px -17px rgba(0, 0, 0, 0.1);
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.w3l-hotair-form .main-hotair {
  position: relative;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  margin: 40px 0;
}

.w3l-hotair-form form {
  margin-top: 30px;
  margin-bottom: 30px;
}

p.account, p.account a {
  text-align: center;
  padding-top: 20px;
  padding-bottom: 0;
  font-size: 16px;
  color: #333;
}

p.account a {
  color: #0568C1;
}

p.account a:hover {
  text-decoration: underline;
}

.w3l-hotair-form h1 {
  text-align: center;
  font-size: 40px;
  font-weight: 700;
  color: #fff;
}

.w3l-hotair-form h2 {
  font-size: 30px;
  line-height: 40px;
  margin-bottom: 5px;
  font-weight: 900;
  color: #272346;
  text-align: center;
}

.w3l-hotair-form input {
  outline: none;
  margin-bottom: 15px;
  font-size: 16px;
  color: #999;
  text-align: left;
  padding: 14px 20px;
  width: 100%;
  display: inline-block;
  box-sizing: border-box;
  border: none;
  background: #f7fafc;
  transition: .3s ease;
  -webkit-transition: .3s ease;
  -moz-transition: .3s ease;
  -ms-transition: .3s ease;
  -o-transition: .3s ease;
}

.w3l-hotair-form input:focus {
  background: transparent;
  border: 1px solid #0568C1;
}

.w3l-hotair-form button {
  font-size: 18px;
  color: #fff;
  width: 100%;
  background: #0568C1;
  border: none;
  padding: 14px 15px;
  font-weight: 700;
  transition: .3s ease;
  -webkit-transition: .3s ease;
  -moz-transition: .3s ease;
  -ms-transition: .3s ease;
  -o-transition: .3s ease;
}

.w3l-hotair-form button:hover {
  background: #fdc500;
}

.w3l-hotair-form .social-icons ul li {
  list-style: none;
  display: inline-block;
}

.w3l-hotair-form .social-icons ul li a {
  padding: 8px;
}

.w3l-hotair-form .social-icons ul li a:hover {
  opacity: 0.8;
  transition: 0.5s ease;
  -webkit-transition: 0.5s ease;
  -o-transition: 0.5s ease;
  -ms-transition: 0.5s ease;
  -moz-transition: 0.5s ease;
}

.w3l-hotair-form .social-icons ul li a.facebook span {
  font-size: 18px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 6px;
  border: 2px solid #696687;
  line-height: 32px;
}

.w3l-hotair-form .social-icons ul li a.twitter span {
  color: #1da1f2;
  font-size: 18px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 6px;
  border: 2px solid #1da1f2;
  line-height: 32px;
}

.w3l-hotair-form .social-icons ul li a.pinterest span {
  color: #e60023;
  font-size: 18px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 6px;
  border: 2px solid #e60023;
  line-height: 32px;
}


.copyright p {
  text-align: center;
  font-size: 17px;
  line-height: 26px;
  color: #fff;
  opacity: 1;
}

p.copy-footer-29 a {
  color: #fff;
}

p.copy-footer-29 a:hover {
  color: #fdc500;
  transition: 0.5s ease;
  -webkit-transition: 0.5s ease;
  -o-transition: 0.5s ease;
  -ms-transition: 0.5s ease;
  -moz-transition: 0.5s ease;
}


/* -- placeholder --*/


/*-- responsive design --*/

@media (max-width: 736px) {
  .w3l-hotair-form .main-hotair {
    flex-direction: column;
  }

  .w3l-hotair-form form {
    margin-top: 30px;
    margin-bottom: 10px;
  }

  .w3l_form {
    order: 2;
  }

  .content-wthree {
    order: 1;
    border-radius: 0;
  }
}

@media (max-width: 568px) {
  .w3l-hotair-form h1 {
    font-size: 36px;
  }

  .w3l-hotair-form .main-hotair {
    margin: 30px 0;
  }

  .content-wthree {
    padding: 2.5em;
  }
}

@media (max-width: 480px) {
  .w3l-hotair-form {
    padding: 40px 30px;
  }

  .w3l-hotair-form h1 {
    font-size: 26px;
  }
}

@media (max-width: 384px) {
  .w3l-hotair-form {
    padding: 30px 15px;
  }

  .content-wthree {
    padding: 2em;
  }

  .w3l-hotair-form h2 {
    font-size: 22px;
    line-height: 32px;
  }

  .copyright p {
    font-size: 16px;
  }
}

/*-- //responsive design --*/
/*-- //form styling --*/


</style>