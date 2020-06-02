<template>
    <div>
      <el-dialog 
        title="商品规范申报-商品申报要素" 
        :visible.sync="dialogFormVisible" 
        width="700px"
        append-to-body
        center
      >
        <el-form :model="form" style="height:400px;overflow:hidden;overflow-y:scroll;padding-right:40px">
          <el-row>
            <el-form-item label="返填规则" :label-width="formLabelWidth" class="form-item">
              <el-radio-group v-model="rule">
                <el-radio :label="1">税号</el-radio>
                <el-radio :label="2">GTIN</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-row>
          <el-row >
            <el-form-item label="商品信息" :label-width="formLabelWidth" class="form-item">
              <el-input v-model="commodityInfo" size="small" disabled/>
            </el-form-item>
          </el-row>
          <el-row style="font-weight:bolder">
            <el-form-item label="规格型号(根据海关规定,以下要素应全部填报)" label-width="400px" class="form-item" />
          </el-row>
          <el-row v-for="item in commodityElements" :key="item.element">
            <el-form-item 
              :label="item.element" 
              :label-width="formLabelWidth" 
              :required="item.elementContraint === 1" 
              class="form-item"
            >
            <el-select v-if="item.element === '品牌类型'" v-model="form['品牌类型']" filterable :filter-method="brandFilter" style="width:100%" size="small">
              <el-option
                v-for="item in brandsAll"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                <span style="float: left">{{ item.value }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
              </el-option>
            </el-select>
            <el-select v-else-if="item.element === '出口享惠情况'" v-model="form['出口享惠情况']" filterable :filter-method="preferentialFilter" style="width:100%" size="small">
              <el-option
                v-for="item in preferentialsAll"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                <span style="float: left">{{ item.value }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
              </el-option>
            </el-select>
            <el-input v-else v-model="form[item.element]" size="small" @change="getItem"/>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="规格型号" :label-width="formLabelWidth" class="form-item">
              <el-input v-model="inspectGoodsSpecification" disabled size="small">
                <template slot="append">
                 ({{num}}/256字节)
                </template>
              </el-input>
            </el-form-item>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="createElements" size="small">确 定</el-button>
          <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
  import ciqInfo from './CiqInfos'
  import commodityList from './CommodityList'
    export default {
      data() {
          return {
            dialogFormVisible: false,
            formLabelWidth: '220px',
            commodityElements:[],
            form:{

            },
            rule:'',//返填规则
            commodityInfo:'',
            brand:'',
            preferential:'',
            inspectGoodsSpecification:'',//规格型号
            num:0,
            brands:[
              {value: 0, label: '无品牌'},
              {value: 1, label: '境内自主品牌'},
              {value: 2, label: '境内收购品牌'},
              {value: 3, label: '境外品牌(贴牌生产)'},
              {value: 4, label: '境外品牌(其它)'}
            ],
            brandsAll:[],
            preferentials:[
              {value: 0, label: '出口货物在最终目的国(地区)不享受优惠关税'},
              {value: 1, label: '出口货物在最终目的国(地区)享受优惠关税'},
              {value: 2, label: '不能确定在最终目的国(地区)享受优惠关税'},
              {value: 3, label: '不适用于进口报关单'}
            ],
            preferentialsAll:[]
          }
      },
      components:{
        ciqInfo, commodityList
      },
      computed:{

      },
      mounted(){
        this.brandsAll = this.brands;
        this.preferentialsAll = this.preferentials;
      },
      methods:{
        getItem(val){
          for(let i in this.commodityElements){
            this.commodityElements[i]['content'] = this.form[this.commodityElements[i].element]
          }
          let inspectGoodsSpecification = [];
          for(let i in this.commodityElements){
            inspectGoodsSpecification.push(this.commodityElements[i].content)
          }
          this.inspectGoodsSpecification = inspectGoodsSpecification.join('|')
          this.num = this.inspectGoodsSpecification.length;
        },
        createElements(){
          this.$emit('createElements',this.inspectGoodsSpecification)
          this.dialogFormVisible = false;
        },
        brandFilter(query){
          if(query !== ''){
            this.brandsAll = this.brands.filter(item => {
              return (item.value+item.label).toString().includes(query);
            })
          }else {
            this.brandsAll = this.brands
          }
        },
        preferentialFilter(query){
          if(query !== ''){
            this.preferentialsAll = this.preferentials.filter(item => {
              return (item.value+item.label).toString().includes(query);
            })
          }else {
            this.preferentialsAll = this.preferentials
          }
        }
      }
    }
</script>

<style scoped>
  .form-item{
    margin: 0 ;
  }
</style>
