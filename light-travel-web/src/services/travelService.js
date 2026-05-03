import { ChatOpenAI } from "@langchain/openai";

import { HumanMessage } from "@langchain/core/messages";

import 'dotenv/config'

class travelService {
  constructor() {
    this.llm = null;
    this.initLLM();
  }

  initLLM() {
    const provider = process.env.MODEL_PROVIDER;
    let apiKey, baseUrl, model;
    if (provider === "SLICONFLOW") {
      apiKey = process.env.SLICONFLOW_API_KEY;
      baseUrl = process.env.SLICONFLOW_BASE_URL;
      model = process.env.SLICONFLOW_MODEL;
    } else if (provider === "DEEPSEEK") {
      apiKey = process.env.DEEPSEEK_API_KEY;
      baseUrl = process.env.DEEPSEEK_BASE_URL;
      model = process.env.DEEPSEEK_MODEL;
    }
    this.llm = new ChatOpenAI({
      configuration: {
        baseURL: baseUrl,
      },
      apiKey,
      model,
      temperature: 0.7,
      streaming: true,
    });
  }
  async recommend(city, budget, days) {
    if (budget < 100 || days < 1 || days > 30) {
      throw new Error("预算不能低于100且天数必须在1-30天之间");
    }
    // 提示词数据
    const message = this.getTravelPrompt(city, budget, days);

    try {
      // 调用大模型
      const response = await this.llm.invoke([message]);
      console.log(response);
      const fullResponce = response.content || ''

    //   todo:处理数据
      return fullResponce;
    } catch (error) {
      console.error(error);
      return {success:false,message:error.message}
    //   throw error;
    }
  }
  getTravelPrompt(city,budget,days){


    return new HumanMessage({
        //  todo提示词待完善
      content: `请推荐${city}的${days}天${budget}元以内的旅游计划`,
    })
  }
}

export default new travelService();
