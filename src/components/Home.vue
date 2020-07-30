<template>
  <el-container class="home_container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/logo.png" alt />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse?'64px':'200px'">
        <div class="toggle_button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区 -->
        <el-col :span="12">
          <el-menu
            :collapse-transition="false"
            :collapse="isCollapse"
            unique-opened
            background-color="#333744"
            text-color="#fff"
            active-text-color="#409EFF"
            router
            :default-active="activePath"
          >
            <!-- 一级菜单模板区域 -->
            <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
              <template slot="title">
                <!-- 图标 -->
                <i :class="iconsObj[item.id]"></i>
                <!-- 文本 -->
                <span>{{item.authName}}</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item
                :index="'/'+subItem.path"
                v-for="subItem in item.children"
                :key="subItem.id"
                @click="saveNavState('/'+subItem.path)"
              >
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-menu"></i>
                  <!-- 文本 -->
                  <span>{{subItem.authName}}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-aside>
      <!-- 右侧主体区 -->
      <el-main>
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  components: {},
  data() {
    //这里存放数据
    return {
      menuList: [],
      iconsObj: {
        "125": "iconfont icon-user",
        "103": "iconfont icon-tijikongjian",
        "101": "iconfont icon-shangpin",
        "102": "iconfont icon-danju",
        "145": "iconfont icon-baobiao",
      },
      isCollapse: false,
      activePath:''
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    // 获取所有的菜单
    getMenuList() {
      this.$http.get("menus").then((res) => {
        console.log(res.data);
        if (res.data.meta.status != 200)
          return this.$message.error(res.data.meta.msg);
        this.menuList = res.data.data;
      });
    },
    // 点击实现折叠和展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    // 保存链接的激活状态
    saveNavState(activePath){
        window.sessionStorage.setItem('activePath',activePath)
        this.activePath = activePath
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getMenuList();
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
};
</script>
<style lang="less" scoped>
.home_container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    height: 100%;
    img {
      height: 100%;
    }
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;
  .el-menu {
    border: 0;
  }
}

.el-col-12 {
  width: 100%;
}

.el-main {
  background-color: #eaedf1;
}

.iconfont {
  margin-right: 10px;
}

.toggle_button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>