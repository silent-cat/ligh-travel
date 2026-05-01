<template>
  <div class="home-page">
    <div class="header">
      <div class="header-content">
        <h1>拾光旅记</h1>
        <p>智能规划 · 轻松出行</p>
      </div>
    </div>

    <div class="form-card">
      <h3 class="section-title">规划你的旅程</h3>
      <van-form @submit="onStartPlan">
        <van-field
          v-model="form.destination"
          is-link
          readonly
          name="destination"
          label="目的地"
          placeholder="选择或输入目的地"
          @click="showPicker = true"
          :rules="[{ required: true, message: '请选择目的地' }]"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-picker
            :columns="columns"
            @confirm="onConfirmDestination"
            @cancel="showPicker = false"
          />
        </van-popup>

        <van-field
          v-model="form.budget"
          type="number"
          name="budget"
          label="预算 (元)"
          placeholder="请输入预算金额"
          :rules="[{ required: true, message: '请输入预算金额' }]"
        />

        <van-field
          v-model="form.days"
          type="digit"
          name="days"
          label="天数"
          placeholder="请输入旅行天数"
          :rules="[{ required: true, message: '请输入旅行天数' }]"
        />

        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit" color="#6f9876">
            开始规划 <van-icon name="guide-o" />
          </van-button>
        </div>
      </van-form>
    </div>

    <div class="quick-access">
      <h3 class="section-title">快捷入口</h3>
      <div class="access-cards">
        <div class="access-card" @click="goTo('Chat')">
          <van-icon name="chat" color="#6f9876" size="32" />
          <div class="card-info">
            <div class="card-title">AI 对话</div>
            <div class="card-desc">智能助手</div>
          </div>
        </div>
        <div class="access-card" @click="goTo('Mine')">
          <van-icon name="manager" color="#6f9876" size="32" />
          <div class="card-info">
            <div class="card-title">我的</div>
            <div class="card-desc">个人中心</div>
          </div>
        </div>
      </div>
    </div>

    <div class="hot-destinations">
      <div class="hot-header">
        <h3 class="section-title">热门目的地</h3>
        <span class="more">更多 ></span>
      </div>
      <div class="hot-list">
        <div class="hot-item" v-for="city in hotCities" :key="city" @click="selectHotCity(city)">
          <div class="city-card">
            <div class="city-name">{{ city }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部导航 -->
    <TabBar />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import TabBar from '../components/TabBar.vue';

const router = useRouter();

const form = reactive({
  destination: '',
  budget: '',
  days: ''
});

const showPicker = ref(false);
const columns = [
  { text: '北京', value: '北京' },
  { text: '上海', value: '上海' },
  { text: '成都', value: '成都' },
  { text: '杭州', value: '杭州' },
  { text: '广州', value: '广州' },
  { text: '深圳', value: '深圳' },
];

const hotCities = ['北京', '上海', '成都', '杭州'];

const onConfirmDestination = ({ selectedOptions }) => {
  form.destination = selectedOptions[0].text;
  showPicker.value = false;
};

const selectHotCity = (city) => {
  form.destination = city;
};

const onStartPlan = () => {
  // 校验已通过
  router.push({ name: 'Plan', query: { ...form } });
};

const goTo = (name) => {
  router.push({ name });
};
</script>

<style scoped>
.home-page {
  background-color: #f7f8fa;
  min-height: 100vh;
  padding-bottom: 60px;
}
.header {
  height: 200px;
  background: linear-gradient(180deg, #e8f0e9 0%, #f7f8fa 100%);
  position: relative;
  padding: 40px 20px;
  box-sizing: border-box;
}
.header-content h1 {
  margin: 0;
  font-size: 28px;
  color: #333;
}
.header-content p {
  margin: 8px 0 0;
  font-size: 14px;
  color: #666;
}
.section-title {
  font-size: 16px;
  margin: 0 0 16px 0;
  color: #333;
  font-weight: bold;
}
.form-card {
  margin: -40px 16px 16px;
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  position: relative;
  z-index: 1;
}
.quick-access {
  margin: 0 16px 16px;
}
.access-cards {
  display: flex;
  gap: 12px;
}
.access-card {
  flex: 1;
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.02);
}
.card-info .card-title {
  font-size: 15px;
  font-weight: bold;
  color: #333;
}
.card-info .card-desc {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}
.hot-destinations {
  margin: 0 16px 16px;
}
.hot-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.hot-header .more {
  font-size: 12px;
  color: #999;
}
.hot-list {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 8px;
}
.hot-list::-webkit-scrollbar {
  display: none;
}
.hot-item {
  flex: 0 0 100px;
}
.city-card {
  height: 120px;
  background-color: #d1e2d3;
  border-radius: 8px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 12px;
}
.city-name {
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  background: rgba(0,0,0,0.3);
  padding: 4px 12px;
  border-radius: 12px;
}
</style>
