<template>
    <div>
      <el-dialog title="新增商品" :visible.sync="dialogFormVisible" width="800px">
        <el-form :model="form" >
          <el-row>
            <el-col :span="12">
              <el-form-item label="企业商品编号" :label-width="formLabelWidth" class="form-item" :required="isAdd">
                <el-input v-model="form.enterpriseCommodityNo" size="small" clearable @blur="isCommodityExist" v-if="isAdd"/>
                <el-autocomplete
                  size="small"
                  v-if="!isAdd"
                  v-model="form.enterpriseCommodityNo"
                  :fetch-suggestions="getCommodityIds"
                  @select="selectCommodity"
                  style="width: 100%"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-col :span="2" style="line-height: 43px;padding-left: 3px;font-size: 16px" v-if="exist !== ''">
                <i class="el-icon-loading" style="color: #409EFF" v-if="exist === 'serch'"></i>
                <i class="el-icon-success" style="color: #67C23A" v-if="exist === 'success'"></i>
                <i class="el-icon-error" style="color: #F56C6C" v-if="exist === 'error'"></i>
              </el-col>
              <el-col :span="22" :offset="exist === ''?2:0">
                <el-form-item label="企业商品名称" label-width="120px" class="form-item" >
                  <el-input v-model="form.enterpriseCommodityName" size="small" clearable :disabled="!isAdd"/>
                </el-form-item>
              </el-col>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="海关商品编号" :label-width="formLabelWidth" required class="form-item">
                <el-input v-model="form.customCommodityNo" size="small" @keyup.enter.native="queryCommodity" clearable/>
                <commodityList ref="commodityList" @chooseCommodity="getCommodity"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="检验检疫名称" :label-width="formLabelWidth" class="form-item">
                <el-input v-model="form.inspectAndQuarantineName" size="small" disabled>
                  <template slot="append">
                    <el-button @click="queryInspectAndQuarantineName">···</el-button>
                  </template>
                </el-input>
                <ciqInfo ref="ciqInfo" @chooseInspectAndQuarantine="getInspectAndQuarantine"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="海关商品名称" :label-width="formLabelWidth" class="form-item">
              <el-input v-model="form.customCommodityName" size="small"/>
            </el-form-item>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="规格型号" :label-width="formLabelWidth" class="form-item">
                <el-input v-model="form.commoditySpecification" size="small" disabled/>
                <commodityElements ref="commodityElements" @createElements="createElements"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="成交计量单位" :label-width="formLabelWidth" class="form-item">
                <el-select v-model="form.dealUnit" :filter-method="dealUnitsFilter" size="small" filterable clearable  style="width: 100%">
                  <el-option
                    v-for="item in dealUnitsAll"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    <span style="float: left">{{ item.value }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="法定第一计量单位" :label-width="formLabelWidth" class="form-item">
                <el-select v-model="form.legalUnit1" :filter-method="legalUnit1Filter" placeholder="" disabled size="small" filterable clearable  style="width: 100%">
                  <el-option
                    v-for="item in legalUnit1All"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    <span style="float: left">{{ item.value }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="法定第二计量单位" :label-width="formLabelWidth" class="form-item">
                <el-select v-model="form.legalUnit2" :filter-method="legalUnit2Filter" placeholder="" disabled size="small" filterable clearable  style="width: 100%">
                  <el-option
                    v-for="item in legalUnit2All"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    <span style="float: left">{{ item.value }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="17">
              <el-form-item label="境内货源地" :label-width="formLabelWidth" class="form-item">
                <el-select v-model="form.domesticSourceCode" :filter-method="domesticSourceCodesFilter" size="small" filterable clearable style="width: 100%">
                  <el-option
                    v-for="item in domesticSourceCodesAll"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    <span style="float: left">{{ item.value }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item class="form-item">
                <el-select v-model="form.producingAreaCode" :filter-method="producingAreaCodesFilter" placeholder="产地代码" size="small" filterable clearable style="width: 100%">
                  <el-option
                    v-for="item in producingAreaCodesAll"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    <span style="float: left">{{ item.value }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="检验检疫货物规格" :label-width="formLabelWidth" class="form-item">
              <el-input v-model="form.inspectGoodsSpecification" size="small" disabled>
                <template slot="append">
                  <el-button @click="inputIgs">···</el-button>
                </template>
              </el-input>
              <ciqSpecification ref="ciqSpecification" @chooseCiqSpecification="getCiqSpecification"/>
            </el-form-item>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="createCommodity" size="small">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
  import ciqInfo from './CiqInfos' //检验检疫名称
  import commodityList from './CommodityList' //商品
  import commodityElements from './CommodityElements' //商品要素
  import ciqSpecification from './ciqSpecification' //检验检疫规格
    export default {
      data() {
          return {
            exist:'',
            isAdd:true,
            dialogFormVisible: false,
            formLabelWidth: '150px',
            form:{
              enterpriseCommodityNo:'',
              enterpriseCommodityName:'',
              customCommodityNo:'',
              inspectAndQuarantineName:'',
              commoditySpecification:'',
              inspectGoodsSpecification:''
            },
            hsName:'',
            domesticSourceCodes:[],
            domesticSourceCodesAll:[],
            dealUnits:[],
            dealUnitsAll:[],
            legalUnit1All:[],
            legalUnit2All:[],
            producingAreaCodes:[],
            producingAreaCodesAll:[]
          }
      },
      components:{
        ciqInfo, commodityList, commodityElements, ciqSpecification
      },
      computed:{
        nickCompanyId(){
          return this.$store.state.nickCompanyId;
        },
        nickCompanyName(){
          return this.$store.state.nickCompanyName;
        },
        nickCompanyMan(){
          return this.$store.state.nickCompanyMan;
        },
      },
      mounted(){
        let dataCompanyId=JSON.parse(localStorage.getItem('Id2'));
        this.$store.commit("updateCompanyId",dataCompanyId);
        let dataCompanyMan=JSON.parse(localStorage.getItem('Name22'));
        this.$store.commit("updateCompanyMan",dataCompanyMan);
        this.loadStaticData();
      },
      props:['ownedEnterpriseId'],
      methods:{
        //初始化表单
        initForm(){
          for(let i in this.form){
            this.form[i] = '';
          }
          for(let i in this.$refs.commodityElements.form){
            this.$refs.commodityElements.form[i] = ''
          }
          for(let i in this.$refs.ciqSpecification.form){
            this.$refs.ciqSpecification.form[i] = ''
          }

        },
        //判断商品编码是否存在或者返回已存在商品
        isCommodityExist(){
          if(this.isAdd){
            if(this.form.enterpriseCommodityNo !== ''){
              this.exist = 'serch';
              this.$axios3.get('/export/doesExist',{
                params:{
                  enterpriseCommodityNo:this.form.enterpriseCommodityNo
                }
              }).then((res) => {
                if(res.data.state === false){
                  this.$message.error('此商品编号已存在!');
                  this.exist = 'error'
                }else{
                  this.exist = 'success'
                }
              }).catch((e) => {
                console.log(e)
              })
            }
          }
        },
        getCommodityIds(query,cb){
          this.$axios3.post('/export/getCommodityIds', {
              enterpriseCommodityNo:this.form.enterpriseCommodityNo
          }).then((res) => {
            console.log(res.data)
            let resData = res.data.data;
            for(let i in resData){
              resData[i].value = resData[i].enterpriseCommodityNo
            }
            cb(res.data.data)
          }).catch((e) => {
            console.log(e)
          })
        },
        selectCommodity(item){
          this.$axios3.post('export/getCommodityById',{
            commodityId:item.commodityId
          }).then((res) => {
            console.log(res.data)
            if(res.data.state){
              this.form = res.data.data;
              setTimeout(() => {
                this.getInitData();
              },100)
            }
          }).catch((e) => {
            console.log(e)
          })
        },
        //根据海关商品编码查询商品
        queryCommodity(){
          if(this.form.customCommodityNo == '' ){
            this.$message.error('请输入海关商品编号!')
          }else{
            this.$refs.commodityList.dialogFormVisible = true;
            this.$axios3.get('getCommodityDeclareElements',{
              params:{
                customsNo:this.form.customCommodityNo
              }
            }).then((res) => {
              console.log(res.data)
              if(res.data.state === true)
                this.$refs.commodityList.commodityData = res.data.data;
              else
                this.$message.error(res.data.data)
            }).catch((e) => {
              console.log(e)
            })
          }
        },
        //根据选择的商品信息填入表单
        getCommodity(data){
          this.form.customCommodityName = data.commodityName;
          this.form.customCommodityNo = data.customsNo;
          this.form.legalUnit1 = data.legalUtil1Code;
          this.form.legalUnit2 = data.legalUtil2Code;
          this.hsName = data.commodityName +'('+ data.remark+ ')';
          this.$refs.commodityElements.dialogFormVisible = true;
          this.$refs.commodityElements.commodityElements = data.elementList
          this.$refs.commodityElements.commodityInfo = data.customsNo + '-' + data.commodityName
        },
        //获取检验检疫名称
        queryInspectAndQuarantineName(){
          if(this.form.customCommodityNo == '' ){
            this.$message.error('请输入海关商品编号!')
          }else{
            this.$refs.ciqInfo.dialogFormVisible = true;
            this.$axios3.get('getCiqInfos',{
              params:{
                ciqNo:this.form.customCommodityNo
              }
            }).then((res) => {
              if(res.data.state === true){
                this.$refs.ciqInfo.ciqData = res.data.data;
                for(let i in this.$refs.ciqInfo.ciqData){
                  this.$refs.ciqInfo.ciqData[i].hsName = this.hsName
                }
              }else{
                this.$message.error(res.data.data)
              }
            }).catch((e) => {
              console.log(e)
            })
          }
        },
        //填入检验检疫名称
        getInspectAndQuarantine(data){
          this.form.inspectAndQuarantineName = data.inspectAndQuarantineName;
        },
        //获取检验检疫规格
        inputIgs(){
          this.$refs.ciqSpecification.dialogFormVisible = true;
          if(!this.isAdd){
            let inspectGoodsSpecification = this.form.inspectGoodsSpecification.split('&')
            this.$refs.ciqSpecification.form.composition = inspectGoodsSpecification[0];
            this.$refs.ciqSpecification.form.validity = inspectGoodsSpecification[1];
            this.$refs.ciqSpecification.form.shelflife = inspectGoodsSpecification[2];
            this.$refs.ciqSpecification.form.company = inspectGoodsSpecification[3];
            this.$refs.ciqSpecification.form.specification = inspectGoodsSpecification[4];
            this.$refs.ciqSpecification.form.model = inspectGoodsSpecification[5];
            this.$refs.ciqSpecification.form.brand = inspectGoodsSpecification[6];
            if(inspectGoodsSpecification[7] !== ''){
              this.$refs.ciqSpecification.form.productdate = inspectGoodsSpecification[7].split(';');
            }else {
              this.$refs.ciqSpecification.form.productdate = ''
            }
            this.$refs.ciqSpecification.form.productbatch = inspectGoodsSpecification[8];
            this.$refs.ciqSpecification.form.companycode = inspectGoodsSpecification[9];
          }
        },
        //填入检验检疫规格
        getCiqSpecification(data){
          let igsArr = [];
          for(let i in data){
            igsArr.push(data[i])
          }
          this.form.inspectGoodsSpecification = igsArr.join('&');
        },
        //填入规格型号
        createElements(val){
          this.form.commoditySpecification = this.$refs.commodityElements.inspectGoodsSpecification;
        },
        //添加商品
        createCommodity(){
          if(this.isAdd){
              if(this.form.customCommodityNo == '' || this.form.enterpriseCommodityNo == ''){
                this.$message.error('请输入必填项!')
              }else{
                this.$axios3.post('export/addCommodity',this.form)
                  .then((res) => {
                    // console.log(res.data);
                    if(res.data.state === true){
                      this.$message.success('创建商品成功!');
                      this.$emit('query');
                      this.initStaticData();
                      this.dialogFormVisible = false;
                    }else{
                      this.$message.error(res.data.data)
                    }
                  }).catch((e) => {
                  console.log(e);
                })
              }
          }else {
            if(this.form.customCommodityNo == ''){
              this.$message.error('请输入海关商品编号!')
            }else{
              this.form.commodityType = this.form.commoditySpecification;
              this.form.inspectionAndQuarantineName = this.form.inspectAndQuarantineName;
              this.form.inspectGoodsSpection = this.form.inspectGoodsSpecification
              this.$emit('createCommodity',this.form);
              this.dialogFormVisible = false;
            }
          }
        },
        initStaticData(){
          this.domesticSourceCodesAll = this.domesticSourceCodes.slice(0,19);
          this.dealUnitsAll = this.dealUnits;
          this.legalUnit1All = this.dealUnits;
          this.legalUnit2All = this.dealUnits;
          this.producingAreaCodesAll = this.producingAreaCodes.slice(0,19);
        },
        //请求本地数据
        loadStaticData(){
          this.$axios.all([
            this.$axios.get('static/pub_churchyarddestinationcode.json'),
            this.$axios.get('static/pub_measureunit.json'),
            this.$axios.get('static/pub_destinationcode.json')
          ]).then(this.$axios.spread((
            res_destinationcode,
            res_measureunit,
            res_producingareacode
          ) => {
            this.domesticSourceCodes = res_destinationcode.data.RECORDS;
            this.domesticSourceCodesAll = this.domesticSourceCodes.slice(0,19);
            this.dealUnits = res_measureunit.data.RECORDS;
            this.dealUnitsAll = this.dealUnits;
            this.legalUnit1All = this.dealUnits;
            this.legalUnit2All = this.dealUnits;
            this.producingAreaCodes = res_producingareacode.data.RECORDS;
            this.producingAreaCodesAll = this.producingAreaCodes.slice(0,19);
          })).catch((e) => {
            console.log(e);
          })
        },
        getInitData(){
          this.domesticSourceCodesFilter(this.form.domesticSourceCode);
          this.producingAreaCodesFilter(this.form.producingAreaCode);
          this.dealUnitsFilter(this.form.dealUnit);
        },
        domesticSourceCodesFilter(query){
          if(query !== '' && query !== undefined && query !== null){
            this.domesticSourceCodesAll = this.domesticSourceCodes.filter(item => {
              return (item.value+item.label).toString().includes(query);
            })
          }else {
            this.domesticSourceCodesAll = this.domesticSourceCodes.slice(0,19);
          }
        },
        producingAreaCodesFilter(query){
          if(query !== '' && query !== undefined && query !== null){
            this.producingAreaCodesAll = this.producingAreaCodes.filter(item => {
              return (item.value+item.label).toString().includes(query);
            })
          }else {
            this.producingAreaCodesAll = this.producingAreaCodes.slice(0,19);
          }
        },
        //成交法定单位
        dealUnitsFilter(query){
          if(query !== '' && query !== undefined && query !== null){
            this.dealUnitsAll = this.dealUnits.filter(item => {
              return (item.value+item.label).toString().includes(query);
            })
          }else {
            this.dealUnitsAll = this.dealUnits.slice(0,19);
          }
        },
        legalUnit1Filter(query){
          if(query !== '' && query !== undefined && query !== null){
            this.legalUnit1All = this.dealUnits.filter(item => {
              return (item.value+item.label).toString().includes(query);
            })
          }else {
            this.legalUnit1All = this.dealUnits.slice(0,19);
          }
        },
        legalUnit2Filter(query){
          if(query !== '' && query !== undefined && query !== null){
            this.legalUnit2All = this.dealUnits.filter(item => {
              return (item.value+item.label).toString().includes(query);
            })
          }else {
            this.legalUnit2All = this.dealUnits.slice(0,19);
          }
        }
      }
    }
</script>

<style scoped>
  .form-item{
    margin: 1px 0 ;
  }
</style>
