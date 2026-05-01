<template>
  <div class="mine-page">
    <van-nav-bar title="我的" :border="false" class="transparent-nav" />
    
    <div class="user-header">
      <div class="user-info">
        <van-image
          round
          width="64px"
          height="64px"
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          class="avatar"
        />
        <div class="user-detail">
          <div class="nickname">游客</div>
          <div class="desc">记录每一次美好旅程 ✨</div>
        </div>
      </div>
    </div>

    <div class="menu-section">
      <h3 class="section-title">我的服务</h3>
      <van-cell-group inset>
        <van-cell title="我的收藏" is-link icon="star-o" />
        <van-cell title="历史记录" is-link icon="clock-o" />
        <van-cell title="设置" is-link icon="setting-o" />
      </van-cell-group>
    </div>

    <div class="menu-section" style="margin-top: 24px;">
      <h3 class="section-title">关于我们</h3>
      <van-cell-group inset>
        <van-cell title="关于我们" is-link icon="info-o" />
        <van-cell title="版本信息" value="v1.0.0" icon="passed" />
      </van-cell-group>
    </div>

    <!-- 底部导航 -->
    <TabBar />
  </div>
</template>

<script setup>
import TabBar from '../components/TabBar.vue';
</script>

<style scoped>
.mine-page {
  background-color: #f7f8fa;
  min-height: 100vh;
  padding-bottom: 60px;
}
:deep(.transparent-nav) {
  background-color: #e8f0e9;
}
:deep(.transparent-nav .van-nav-bar__title) {
  font-weight: bold;
}
.user-header {
  height: 180px;
  background: linear-gradient(180deg, #e8f0e9 0%, #f7f8fa 100%);
  display: flex;
  align-items: flex-start;
  padding: 20px 24px 0;
}
.user-info {
  display: flex;
  align-items: center;
  gap: 16px;
}
.avatar {
  border: 2px solid #fff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}
.user-detail .nickname {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}
.user-detail .desc {
  font-size: 13px;
  color: #666;
  margin-top: 6px;
}
.menu-section {
  margin-top: -40px;
  position: relative;
  z-index: 1;
}
.section-title {
  font-size: 14px;
  color: #333;
  margin: 0 24px 12px;
  font-weight: bold;
}
</style>
