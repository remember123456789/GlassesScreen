<script setup>
import {
  ElContainer,
  ElHeader,
  ElMain,
  ElAside,
  ElCol,
  ElRow,
  ElMenu,
  ElMenuItemGroup,
  ElMenuItem
} from "element-plus";
import {getRouterPath} from '@/router/base.js'
import {useRoute, useRouter} from 'vue-router'

const route = useRoute()
const router = useRouter()
const handleOpen = (key, keyPath) => {
  console.log(getRouterPath(key))
  router.push(getRouterPath(key))
}
const handleClose = (key, keyPath) => {
  // console.log(key, keyPath)
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside style="height: 100vh; overflow: hidden; display: flex; flex-direction: column;">
        <div style="flex: 1; overflow: auto;">
          <el-menu
              active-text-color="#ffd04b"
              background-color="#545c64"
              class="el-menu-vertical-demo"
              default-active="2"
              text-color="#fff"
              @select="handleOpen"
              style="height: 100%;"
          >
            <h1>123</h1>
            <el-menu-item index="0">
              <el-icon>
                <document/>
              </el-icon>
              <span>首页大屏</span>
            </el-menu-item>
            <el-menu-item index="1">
              <el-icon>
                <setting/>
              </el-icon>
              <span>数据导入</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped lang="scss">

</style>