<template>
  <div class="workpanel">
    <div class="content"  style="text-align: left; padding-top: 40px;">
      <span>恭喜您！您已完成全部题目作答</span>
      <div class="infos">
        <div class="block">
          <p>您本次的回答情况如下：</p>
          <span>总准确率为：80%</span>
          <p style="font-size: 0.9em;color: orange">注：您可以点击题目查看做题情况，对于有疑惑的地方还可以申诉哦！</p>
        </div>
        <div class="table">
          <div class="cell" v-for="(item,index) in checkData" :key="index">
            <div class="qindex">{{index+1}}</div>
            <div class="answer" @click="checkdata(item.ruleDataId, item.answer)">
              <i class="el-icon-check" v-if="item.answer == item.goldenAnswer" style="color: green; font-weight: bold; font-size: 1.5em"></i>
              <i class="el-icon-close" v-if="item.answer != item.goldenAnswer" style="color: red; font-weight: bold; font-size: 1.5em"></i>
            </div>
          </div>
        </div>
      </div>
      <el-dialog title="申诉界面" v-model="dialogVisible">
        <div>
          <p>规则：{{rules.content}}</p>
          <p v-if="rules.goldenAnswer == 'TRUE'">正确答案为：正确</p>
          <p v-if="rules.goldenAnswer == 'FALSE'">正确答案为：错误</p>
          <p v-if="answer == 'TRUE'">您的答案为：正确</p>
          <p v-if="answer == 'FALSE'">您的答案为：错误</p>
          <p style="text-decoration: underline; color: blue; cursor: pointer" @click="changeIsShow">对这道题有疑问？请点击这里申诉</p>
          <el-form :model="appeal" v-show="isShow">
            <el-form-item label="请在这里写下您的疑问">
              <el-input type="textarea" v-model="appeal"></el-input>
            </el-form-item>
            <span class="dialog-footer">
              <el-button type="primary" @click="dialogFormVisible = false" class="dialog-button">提 交</el-button>
            </span>
          </el-form>
        </div>
      </el-dialog>
      <div class="action">
        <el-button type="primary">
          完成
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getCheck, qRule } from '@/service'

export default {
  name: 'check',

  async mounted() {
    const jobId = this.$route.params.jobId
    const checkData = await getCheck(jobId)
    this.checkData = checkData.data.data
  },
  data() {
    return {
      dialogVisible: false,
      checkData: [
        {ruleDataId: 1, answer: 'TRUE', goldenAnswer: 'TRUE'},
        {ruleDataId: 2, answer: 'TRUE', goldenAnswer: 'FALSE'},
        {ruleDataId: 3, answer: 'TRUE', goldenAnswer: 'FALSE'},
        {ruleDataId: 4, answer: 'TRUE', goldenAnswer: 'FALSE'},
        {ruleDataId: 5, answer: 'TRUE', goldenAnswer: 'TRUE'},
      ],
      rules:{},
      answer:'',
      appeal:'',
      isShow:false,
    }
  },
  methods: {
    changeIsShow(){
      this.isShow = !this.isShow
    },
    async getCurrentRule() {
      const ruleData = await qRule(this.ruleIdList[this.ruleIndex])
      console.log(ruleData.data.data)
    },
    async getRules(id) {
      const ruleData = await qRule(id)
      this.rules = ruleData.data.data
    },
    checkdata(id, answer){
      this.dialogVisible=true
      this.getRules(id)
      this.answer = answer
    }
  }
}
</script>

<style scoped>
.workpanel {
  margin: 20px 100px 0 100px;
  background-color: #fff;
}
.content {
  padding: 0 60px;
}
.title {
  padding-top: 30px;
}
.title span {
  font-size: 28px;
  color: #4a4a4a;
  font-weight: 700;
}
.infos {
  width: 1100px;
  margin-top: 10px;
  text-align: left;
  padding-top: 30px;
  padding-bottom: 50px;
  border-top: 1px solid hsla(0, 0%, 59%, 0.2);
  border-bottom: 1px solid hsla(0, 0%, 59%, 0.2);
}
.infos .rule {
  text-align: center;
}

.action {
  margin-top: 60px;
  text-align: center;
  font-size: 15px;
  padding-bottom: 60px;
  position: relative;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}
.block {
  width: 100%;
  box-sizing: border-box;
  padding: 0 40px;
  margin-bottom: 20px;
}
.table{
  padding: 0 40px;
  height: 180px;
  width: 1000px;
}
.cell{
  width: 70px;
  height: 90px;
  border: 1px solid #000;
  text-align: center;
  float: left;
  margin-bottom: 5px;
  cursor: pointer;
}
.qindex{
  height: 45px;
  line-height: 45px;
  border-bottom: 1px solid #000;
}
.answer{
  height: 45px;
  line-height: 45px;
}
.dialog-button{
  display: block;
  margin: 0 auto;
  text-align: center;
}
</style>
