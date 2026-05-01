<template>
  <div class="plan-page">
    <van-nav-bar
      :title="`${destination}行程规划`"
      left-arrow
      @click-left="onClickLeft"
      fixed
      placeholder
    >
      <template #right>
        <van-icon name="share-o" size="18" />
      </template>
    </van-nav-bar>

    <div class="plan-content">
      <div class="summary-card">
        <div class="summary-header">
          <div class="title">{{ destination }} · {{ days }}天行程</div>
          <div class="budget">预算: ¥{{ budget }}</div>
        </div>
        <div class="date">2024.06.01 - 2024.06.0{{ String(1 + Number(days) - 1).padStart(2, '0') }}</div>
      </div>

      <van-collapse v-model="activeNames" class="plan-collapse">
        <van-collapse-item 
          v-for="(day, index) in planData" 
          :key="index" 
          :name="index"
          :title="`第${index + 1}天  ${day.title}`"
        >
          <div class="day-activities">
            <div class="activity" v-for="(act, i) in day.activities" :key="i">
              <div class="time-tag" :class="act.timeType">{{ act.timeLabel }}</div>
              <div class="act-info">
                <div class="act-name">{{ act.name }}</div>
                <div class="act-meta">
                  <span>{{ act.duration }}</span>
                  <span class="cost">{{ act.cost }}</span>
                </div>
              </div>
            </div>
          </div>
        </van-collapse-item>
      </van-collapse>

      <div class="budget-card">
        <div class="budget-title">预算明细</div>
        <div class="budget-item">
          <span>住宿</span>
          <span>¥2000</span>
        </div>
        <div class="budget-item">
          <span>餐饮</span>
          <span>¥1200</span>
        </div>
      </div>
    </div>

    <!-- 底部悬浮按钮 -->
    <div class="bottom-action">
      <van-button 
        round 
        block 
        type="primary" 
        color="#6f9876"
        icon="chat-o"
        @click="goToChat"
      >
        咨询 AI 助手
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const destination = ref(route.query.destination || '北京');
const budget = ref(route.query.budget || '6000');
const days = ref(route.query.days || '3');

const activeNames = ref([0]); // 默认展开第一天

const planData = ref([
  {
    title: '天安门广场 & 故宫博物院',
    activities: [
      { timeType: 'morning', timeLabel: '上午', name: '天安门广场', duration: '4小时', cost: '门票 ¥0' },
      { timeType: 'afternoon', timeLabel: '下午', name: '故宫博物院', duration: '3小时', cost: '门票 ¥60' },
      { timeType: 'evening', timeLabel: '晚上', name: '王府井大街', duration: '自由活动', cost: '' },
    ]
  },
  {
    title: '景山公园 & 北海公园',
    activities: [
      { timeType: 'morning', timeLabel: '上午', name: '景山公园', duration: '2小时', cost: '门票 ¥10' },
      { timeType: 'afternoon', timeLabel: '下午', name: '北海公园', duration: '3小时', cost: '门票 ¥10' },
    ]
  },
  {
    title: '颐和园 & 圆明园',
    activities: [
      { timeType: 'morning', timeLabel: '上午', name: '颐和园', duration: '4小时', cost: '门票 ¥30' },
      { timeType: 'afternoon', timeLabel: '下午', name: '圆明园', duration: '3小时', cost: '门票 ¥10' },
    ]
  }
]);

const onClickLeft = () => {
  router.back();
};

const goToChat = () => {
  router.push('/chat');
};

onMounted(() => {
  if (Number(days.value) < 3) {
    planData.value = planData.value.slice(0, Number(days.value));
  }
});
</script>

<style scoped>
.plan-page {
  background-color: #f7f8fa;
  min-height: 100vh;
  padding-bottom: 80px;
}
.plan-content {
  padding: 16px;
}
.summary-card {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.02);
}
.summary-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.summary-header .title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}
.summary-header .budget {
  font-size: 14px;
  color: #e55a5a;
  font-weight: bold;
}
.summary-card .date {
  font-size: 12px;
  color: #999;
}

.plan-collapse {
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 16px;
}
:deep(.van-collapse-item__title) {
  font-weight: bold;
  font-size: 15px;
}

.day-activities {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.activity {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}
.time-tag {
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 4px;
  white-space: nowrap;
}
.time-tag.morning {
  background-color: #fff3e0;
  color: #ff9800;
}
.time-tag.afternoon {
  background-color: #e8f5e9;
  color: #4caf50;
}
.time-tag.evening {
  background-color: #fff0f0;
  color: #ff6b6b;
}
.act-info {
  flex: 1;
}
.act-name {
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
  font-weight: 500;
}
.act-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
}

.budget-card {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.02);
}
.budget-title {
  font-size: 15px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
}
.budget-item {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}
.budget-item:last-child {
  margin-bottom: 0;
}

.bottom-action {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px 24px;
  padding-bottom: env(safe-area-inset-bottom, 12px);
  background: #fff;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
  z-index: 100;
}
</style>
