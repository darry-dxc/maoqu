<template>
  <div id="bread">
        <img class="breadLogo" src="../assets/images/portalsIcon/logo.png" />
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item id="item">找回密码</el-breadcrumb-item>
        <el-breadcrumb-item id="item"><slot></slot></el-breadcrumb-item>
        </el-breadcrumb>
        <router-link to="HomePage"><p class="backHomeText">返回首页</p></router-link>
</div>
</template>

<style>
  #item{
  text-align: center;
  margin: 20px 0;
  font-weight: 400;
  font-family: FontAwesome;
  font-size: 22px !important;
  color: #666 !important;
  cursor: pointer !important;
}

#item .el-breadcrumb__inner a, #item .el-breadcrumb__inner.is-link{
  font-weight: 400;
  color: #666 !important;
  cursor: pointer;
}


.el-breadcrumb__separator {
    margin: 0 9px;
    font-weight: 700;
    color: #666;
}

.breadLogo{
  float: left;
  width:220px;
  height:40px; 
  margin: 10px 20px;
}

.el-breadcrumb-item.breadLogo,.el-breadcrumb-item.breadLogo:hover,.el-breadcrumb-item.breadLogo.is-active:hover,.el-menu-item.logo_menu_item.is-active{
  border-bottom:none !important;
  background-color:rgba(255, 255, 255, 0.5) !important;
}

.backHomeText{
  font-size: 22px;
  text-align: center;
  color: #666;
  position: absolute;
  top: 12px;
  right:20px;
  cursor: pointer;
}

.backHomeText:hover{
  color: #F49900;
}
</style>

