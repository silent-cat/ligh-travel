import express from "express";
const router = express.Router();
import travelService from "../services/travelService.js";


// 定义路由
router.post("/recommend", async (req, res) => {
    const {city,budget,days} = req.body
    if(!city || !budget || !days){
        return res.status(400).json({success:false,message:'缺少参数'})
    }
    const result = await travelService.recommend(city,budget,days);

    return res.json(result)




//   return res.json({
//     message: "Recommend API",
//     timestamp: Date.now(),
//   });
});

router.post("/chat", (req, res) => {
  return res.json({ message: "Chat API", timestamp: Date.now() });
});

export default router;
