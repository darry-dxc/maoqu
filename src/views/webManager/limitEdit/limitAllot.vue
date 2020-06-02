<template>
  <div>
    <el-button type="primary" @click="dialogFormVisible = true" class="addBtn" :disabled="isDisabled === true">分配资源</el-button>
    <el-dialog title="分配资源" :visible.sync="dialogFormVisible" width="1000px">
      <el-button @click="expandNode">全部展开</el-button>
      <el-button @click="foldNode">全部折叠</el-button>
        <div class="custom-tree-container">
          <div class="block">
            <el-tree
              id="tree"
              ref="sourceTree"
              :data="data"
              show-checkbox
              node-key="id"
              expand-keys='choose'

            >
            </el-tree>
          </div>
        </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" class="cancel">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false" class="sure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import  './../../../assets/css/webManager/limitEdit/limitAdd.css';
  let id = 1000;
  export default {
    data() {
      return {
        dialogFormVisible: false,
        isDisabled: true,
        formLabelWidth: '150px',
        notNull:'11',
        isexpand:true,
        isfold:false,
        data :[{
          id: 1,
          label: '业务管理（企业）',},
          {
            id: 2,
            label: '业务管理（个人）',
            children: [{
              id: 3,
              label: '出口申报',
            }, {
              id: 4,
              label: '进口申报'
            }, {
              id: 5,
              label: '数据查询/统计'
            },{
              id: 6,
              label: '修撤单'
            },{
              id: 7,
              label: '重传/补传信息'
            },{
              id: 8,
              label: '拖车'
            }, {
              id: 9,
              label: '订舱'
            },{
              id: 10,
              label: '等'
            },
            ]
          }, {
            id: 11,
            label: '超级日程表',},{
            id: 12,
            label: '航运查询',},{
            id: 13,
            label: '商品管理',},
          {
            id: 14,
            label: '企业管理',
            children: [{
              id: 15,
              label: '收发货人单位管理',
            },{
              id: 16,
              label: '境外客户信息管理',
            },{
              id: 17,
              label: '服务商信息管理',
            },
            ]},
          {
            id: 18,
            label: '工具箱',
          },
          {
            id: 19,
            label: '服务生态圈',
            children: [{
              id: 20,
              label: '服务内容查询',
            },{
              id: 21,
              label: '发布内容',
            },
            ]},
          {
            id: 22,
            label: '个人中心',
            children: [{
            id: 23,
            label: '资料管理',
          },{
            id: 24,
            label: '密码修改',
          },{
              id: 25,
              label: '反馈意见',
            },{
              id: 26,
              label: '子账户管理',
            },
        ]},
        ]
      }
      },
    props:['allotID'],
    methods:{

      //判断删除按钮是否可用
      allotDisable(){
        this.isDisabled = false;
      },
      allotNotDisable(){
        this.isDisabled = true;
      },
      foldNode() {
        for(let i=0;i<this.$refs.sourceTree.store._getAllNodes().length;i++){
          this.$refs.sourceTree.store._getAllNodes()[i].expanded=this.isfold;

      }},
      expandNode(){
        for(let i=0;i<this.$refs.sourceTree.store._getAllNodes().length;i++){
          this.$refs.sourceTree.store._getAllNodes()[i].expanded=this.isexpand;
        }

      }

    }
  }
</script>

<style scoped>

</style>
