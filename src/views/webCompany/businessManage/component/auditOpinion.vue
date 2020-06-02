<template>
    <div>
      <el-dialog
        title="查看审核意见"
        :visible.sync="auditOpinion"
        width="600px"
      >
        <el-table :data="data" stripe size="small">
          <el-table-column label="序号" type="index"/>
          <el-table-column label="审核状态" prop="auditStatus"/>
          <el-table-column label="审核时间" prop="auditTime"/>
          <el-table-column label="审核意见" prop="auditOpinion"/>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button @click="auditOpinion = false" type="primary">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              data:[],
              auditOpinion:false,
              imDeclareServiceId:'',
              exDeclareDetailId:''
            }
        },
        mounted() {

        },
        methods: {
          //获取进口审核意见
          queryImData(){
            this.$axios9.post('/getAuditopinion',{
              imDeclareServiceId:this.imDeclareServiceId
            }).then((res) => {
               console.log(res.data);
              if(res.data.code === 200){
               let resData = res.data.data;
               this.data = resData.list;
              }
            }).catch((e) => {
              console.log(e)
            })
          },
          //获取出口审核意见
          queryExData(){
            this.$axios6.post('/getAuditopinion',{
              exDeclareDetailId:this.exDeclareDetailId
            }).then((res) => {
              console.log(res.data);
              if(res.data.state === true){
                this.data = res.data.data;
              }
            }).catch((e) => {
              console.log(e)
            })
          },
        }
    }
</script>

<style scoped>

</style>
