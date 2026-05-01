<template>
  <div class="chat-page">
    <van-nav-bar
      title="AI 助手"
      left-arrow
      @click-left="onClickLeft"
      fixed
      placeholder
    />

    <div class="chat-content" ref="chatContent">
      <div class="message-list">
        <!-- 默认欢迎消息 -->
        <div class="message-item ai">
          <div class="avatar">
            <van-image round width="40px" height="40px" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
          </div>
          <div class="message-bubble">
            <div class="sender-name">游客</div>
            <div class="bubble-content">欢迎使用拾光旅记 AI 助手 🌿</div>
          </div>
        </div>

        <!-- 对话消息 -->
        <div 
          v-for="(msg, index) in messages" 
          :key="index" 
          :class="['message-item', msg.role]"
        >
          <template v-if="msg.role === 'ai'">
            <div class="avatar">
              <van-image round width="40px" height="40px" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
            </div>
            <div class="message-bubble">
              <div class="sender-name">AI助手</div>
              <div class="bubble-content" v-html="formatMessage(msg.content)"></div>
            </div>
          </template>
          
          <template v-else>
            <div class="message-bubble user-bubble">
              <div class="bubble-content">{{ msg.content }}</div>
            </div>
            <div class="avatar">
              <van-image round width="40px" height="40px" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- 底部输入区域 -->
    <div class="bottom-area">
      <div class="quick-questions" v-if="showQuickQuestions">
        <div class="quick-title">猜你想问</div>
        <div class="tags">
          <van-tag 
            v-for="q in quickQuestions" 
            :key="q" 
            round 
            size="medium" 
            color="#f2f2f2" 
            text-color="#333"
            class="q-tag"
            @click="sendQuestion(q)"
          >
            {{ q }}
          </van-tag>
        </div>
      </div>
      
      <div class="input-bar">
        <van-field
          v-model="inputText"
          placeholder="输入你的问题..."
          :border="false"
          class="chat-input"
          @keyup.enter="onSend"
        />
        <van-button 
          icon="guide-o" 
          type="primary" 
          round 
          class="send-btn" 
          color="#6f9876"
          @click="onSend"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const chatContent = ref(null);
const inputText = ref('');
const messages = ref([]);
const showQuickQuestions = ref(true);

const quickQuestions = ['3天行程推荐', '交通建议', '必去景点', '美食推荐'];

const onClickLeft = () => {
  router.back();
};

const formatMessage = (text) => {
  return text.replace(/\n/g, '<br/>');
};

const scrollToBottom = async () => {
  await nextTick();
  if (chatContent.value) {
    chatContent.value.scrollTop = chatContent.value.scrollHeight;
  }
};

const simulateStream = (text, index) => {
  let i = 0;
  messages.value[index].content = '';
  
  const timer = setInterval(() => {
    if (i < text.length) {
      messages.value[index].content += text.charAt(i);
      i++;
      scrollToBottom();
    } else {
      clearInterval(timer);
    }
  }, 50); // 打字机速度
};

const getAIResponse = (userText) => {
  // 模拟基于 fetch stream 的打字机效果响应
  const mockResponses = {
    '上海有什么美食推荐？': '你好呀！🍜 上海是一座美食天堂，这里不仅有本帮菜的浓油赤酱，还有各式特色小吃让人流连忘返~\n\n为你推荐几类必尝美食：\n• 本帮菜：红烧肉、油爆虾、本帮熏鱼\n• 小吃类：南翔小笼包、生煎包、葱油饼\n• 特色餐厅：外滩景观餐厅、弄堂老味道\n\n需要我为你制定详细的美食行程吗？😋',
    '3天行程推荐': '好的，为您规划3天行程：\n第一天：市区打卡...\n第二天：周边游玩...\n第三天：购物与美食...',
    '交通建议': '建议您下载当地的地铁APP，公交和地铁非常方便。如果距离较近，可以考虑共享单车。',
    '必去景点': '必去景点包括：标志性建筑、历史博物馆、自然风景区等，具体可以根据您的偏好来安排！',
    '美食推荐': '推荐您去当地的夜市和小吃街，那里能品尝到最地道的美食！'
  };

  const responseText = mockResponses[userText] || `关于“${userText}”的问题，我还不太了解，但我可以帮你查询更多相关信息！`;
  
  messages.value.push({ role: 'ai', content: '' });
  simulateStream(responseText, messages.value.length - 1);
};

const onSend = () => {
  if (!inputText.value.trim()) return;
  
  const text = inputText.value.trim();
  messages.value.push({ role: 'user', content: text });
  inputText.value = '';
  showQuickQuestions.value = false;
  
  scrollToBottom();
  
  // 模拟延迟后AI开始回复
  setTimeout(() => {
    getAIResponse(text);
  }, 500);
};

const sendQuestion = (q) => {
  inputText.value = q;
  onSend();
};
</script>

<style scoped>
.chat-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f7f8fa;
}

.chat-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  padding-bottom: 20px;
}

.message-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.message-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.message-item.user {
  justify-content: flex-end;
}

.message-bubble {
  max-width: 70%;
}

.user-bubble {
  display: flex;
  align-items: flex-end;
  flex-direction: column;
}

.sender-name {
  font-size: 12px;
  color: #999;
  margin-bottom: 4px;
}

.bubble-content {
  background-color: #fff;
  padding: 12px 16px;
  border-radius: 12px;
  border-top-left-radius: 4px;
  font-size: 14px;
  color: #333;
  line-height: 1.5;
  word-break: break-all;
  box-shadow: 0 2px 8px rgba(0,0,0,0.02);
}

.user .bubble-content {
  background-color: #6f9876;
  color: #fff;
  border-radius: 12px;
  border-top-right-radius: 4px;
}

.bottom-area {
  background-color: #fff;
  border-top: 1px solid #eee;
  padding: 12px 16px;
  padding-bottom: env(safe-area-inset-bottom, 12px);
}

.quick-questions {
  margin-bottom: 12px;
}

.quick-title {
  font-size: 12px;
  color: #999;
  margin-bottom: 8px;
}

.tags {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
}

.tags::-webkit-scrollbar {
  display: none;
}

.q-tag {
  white-space: nowrap;
  padding: 4px 12px;
}

.input-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: #f7f8fa;
  border-radius: 24px;
  padding: 4px 4px 4px 16px;
}

.chat-input {
  flex: 1;
  background: transparent;
  padding: 0;
}

.send-btn {
  width: 40px;
  height: 40px;
  padding: 0;
}
</style>
