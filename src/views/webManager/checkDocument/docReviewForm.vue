<template>
  <el-dialog title="单证预览" :visible.sync="dialogFormVisible" width="1000px" height="600px">
    <div style="height: 650px;overflow-y: auto;overflow-x: hidden">
      <el-button type="text" @click="showDialogHistory" style="text-align:right;width:950px;font-size:20px;" v-show="hasHisOpinion">历史审核意见</el-button>
      <!--历史审核意见弹出框-->
      <el-dialog
        title="历史审核意见" :visible.sync="dialogHistoryVisible" width="40%" append-to-body>
        <el-table :data="historyTableData" style="width: 100%">
          <el-table-column prop="number" label="序号" width="80" type="index">
          </el-table-column>
          <el-table-column prop="audittime" label="审核时间" width="200" :formatter="dateFormat" >
          </el-table-column>
          <el-table-column prop="auditopinion" label="审核意见">
          </el-table-column>
        </el-table>
      </el-dialog>
      <el-form :model="form" >
        <el-row>
          <el-col :span="12">
            <el-form-item label="申报地海关" label-width="100px" class="distance">
              <el-select v-model="form.declareCustoms" size="small" disabled style="width: 100%;">
                <el-option
                  v-for="item in declareCustomsAll"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="报关状态" label-width="100px" class="distance">
              <el-input v-model="form.billStatus" disabled  size="small"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="统一编号" label-width="100px" class="distance">
              <el-input v-model="form.unifiedNo" disabled size="small"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预录入编号" label-width="100px" class="distance">
              <el-input v-model="form.preEntryNo" disabled size="small"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="海关编号" label-width="100px" class="distance">
              <el-input v-model="form.customsNo" disabled size="small"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="进境关别" label-width="100px" class="distance">
              <el-select v-model="form.enterBorder" disabled size="small" style="width: 100%;">
                <el-option
                  v-for="item in declareCustomsAll"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="备案号" label-width="100px" class="distance">
              <el-input v-model="form.recordNo" disabled size="small"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同协议号" label-width="100px" class="distance">
              <el-input v-model="form.contractNo" disabled size="small"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="进口日期" label-width="100px" class="distance">
              <el-input v-model="form.importDate" disabled size="small"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申报日期" label-width="100px" class="distance">
              <el-input v-model="form.declareDate" disabled size="small"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="境内收发货人"  label-width="100px" class="distance">
              <el-input v-model="form.teRsCreditCode"  placeholder="18位社会信用证代码" disabled auto-complete="off"  size="small"/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item class="distance">
              <el-input v-model="form.teRsCustomsCode" placeholder="10位海关代码" disabled auto-complete="off"   size="small"/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item class="distance">
              <el-input v-model="form.teRsQuarantineCode" placeholder="10位检验检疫编码" disabled auto-complete="off"   size="small"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item class="distance">
              <el-input v-model="form.teRsComanyName" placeholder="企业名称（中文）" disabled auto-complete="off"  size="small"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="境外收发货人"  label-width="100px" class="distance" >
              <el-input v-model="form.ovRsCode" placeholder="境外收发货人代码" disabled auto-complete="off"   size="small"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item class="distance">
              <el-input v-model="form.ovRsComanyName" placeholder="企业名称（中文）" disabled auto-complete="off"  size="small"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="消费使用单位"  label-width="100px" class="distance">
              <el-input v-model="form.csCreditCode" placeholder="社会信用证代码" disabled auto-complete="off"   size="small"/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item class="distance">
              <el-input v-model="form.csCustomsCode" placeholder="海关代码" disabled auto-complete="off"  size="small"/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item class="distance">
              <el-input v-model="form.csQuarantineCode" placeholder="10位检验检疫编码" disabled auto-complete="off"  size="small"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item class="distance">
              <el-input v-model="form.csCompanyName" placeholder="企业名称（中文）" disabled auto-complete="off"  size="small"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="申报单位"  label-width="100px" class="distance">
              <el-input v-model="form.decCreditCode" placeholder="企业信用证代码" disabled auto-complete="off"   size="small"/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item class="distance">
              <el-input v-model="form.decCustomsCode" placeholder="海关代码" disabled auto-complete="off"  size="small"/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item class="distance">
              <el-input v-model="form.decQuarantineCode" placeholder="10位检验检疫编码" disabled auto-complete="off"  size="small"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item class="distance">
              <el-input v-model="form.decCompanyName" placeholder="企业名称（中文）" disabled auto-complete="off"  size="small"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="运输方式"  label-width="115px" class="distance">
              <el-select v-model="form.transportMode" disabled size="small" style="width: 100%;">
                <el-option
                  v-for="item in transportModes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="运输工具名称"  label-width="115px" class="distance">
              <el-input v-model="form.conveyanceName" disabled auto-complete="off" size="small"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="航次号"  label-width="115px" class="distance">
              <el-input v-model="form.voyageNo" disabled auto-complete="off" size="small"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="提运单号"  label-width="115px" class="distance">
              <el-input v-model="form.deliveryNo" disabled auto-complete="off" size="small"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="监管方式"  label-width="115px" class="distance">
              <el-select v-model="form.supervisionMode" disabled size="small" style="width: 100%;">
                <el-option
                  v-for="item in superviseModes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="征免性质"  label-width="115px" class="distance">
              <el-select v-model="form.levyNature" disabled size="small" style="width: 100%;">
                <el-option
                  v-for="item in levyNatures"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="许可证"  label-width="115px" class="distance">
              <el-input v-model="form.licenseKey" disabled auto-complete="off" size="small"/>
            </el-form-item>
          </el-col>
          <el-col :span=6>
            <el-form-item label="启运国（地区）"  label-width="115px" class="distance">
              <el-select v-model="form.originCountry" disabled size="small" style="width: 100%">
                <el-option
                  v-for="item in tradeCountrys"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="经停港"  label-width="115px" class="distance">
              <el-select v-model="form.stopOverPort" disabled size="small" style="width: 100%">
                <el-option
                  v-for="item in originPorts"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="成交方式"  label-width="115px" class="distance">
              <el-select v-model="form.dealMode" disabled size="small" style="width: 100%">
                <el-option
                  v-for="item in dealModes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <el-form-item label="运费"  label-width="100px" class="distance">
              <el-select v-model="form.freightMark" disabled size="small">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item class="distance">
              <el-input v-model="form.freightRate" disabled size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item class="distance">
              <el-select v-model="form.freightCurrency" disabled  size="small" style="width: 100%">
                <el-option
                  v-for="item in currencys"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="保险费"  label-width="70px" class="distance">
              <el-select v-model="form.premiumMark" disabled size="small">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item class="distance">
              <el-input v-model="form.premiumRate" disabled size="small">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item class="distance">
              <el-select v-model="form.premiumCurrency" disabled size="small" style="width: 100%">
                <el-option
                  v-for="item in currencys"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="杂费"  label-width="70px" class="distance">
              <el-select v-model="form.incidentalMark" disabled size="small">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item class="distance">
              <el-input v-model="form.incidentalRate" disabled size="small">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item class="distance">
              <el-select v-model="form.incidentalCurrency" disabled size="small" style="width: 100%">
                <el-option
                  v-for="item in currencys"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="包装种类"  label-width="115px" class="distance">
              <el-select v-model="form.packageType" disabled size="small" style="width: 100%">
                <el-option
                  v-for="item in packageTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="毛重（KG)"  label-width="115px" class="distance">
              <el-input v-model="form.grossWeight" disabled auto-complete="off"   size="small"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="净重（KG）"  label-width="115px" class="distance">
              <el-input v-model="form.netWeight" disabled auto-complete="off"   size="small"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="件数"  label-width="115px" class="distance">
              <el-input v-model="form.commodityQuantity" disabled auto-complete="off"   size="small"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="贸易国别"  label-width="115px" class="distance">
              <el-select v-model="form.tradeCountry" disabled size="small" style="width: 100%;">
                <el-option
                  v-for="item in tradeCountrys"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="集装箱数"  label-width="115px" class="distance">
              <el-input v-model="form.containerQuantity" disabled auto-complete="off"   size="small"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="随附单证"  label-width="115px" class="distance">
              <el-input v-model="form.attachDocument" disabled auto-complete="off"   size="small"/>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="入境口岸"  label-width="115px" class="distance">
              <el-select v-model="form.entryPort" disabled size="small" style="width: 100%;">
                <el-option
                  v-for="item in supplyAreas"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="货物存放地点"  label-width="115px" class="distance">
              <el-input v-model="form.storagePlace" disabled auto-complete="off"   size="small"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="启运港"  label-width="100px" class="formItem">
              <el-select v-model="form.originPort" size="small" disabled style="width: 100%">
                <el-option
                  v-for="item in originPorts"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" style="line-height:50px;">
            <el-form-item label="报关单类型"  label-width="115px" class="distance">
              <el-input v-model="form.declarationType" disabled size="small">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" style="line-height:50px;">
            <el-form-item label="备注"  label-width="115px" class="distance">
              <el-input v-model="form.remark" disabled auto-complete="off" size="small"/>
            </el-form-item>
          </el-col>
          <el-col :span="2" style="line-height:45px;">
            <el-button  style="margin-left: 20px;" @click="remarkCon" size="small" icon="el-icon-more"></el-button>
          </el-col>
          <!--...弹出框-->
          <el-dialog title="备注" :visible.sync="dialogremarkConVisible" width="700px" append-to-body>
            <div>
              <el-input v-model="remark" type="textarea" :rows="7" placeholder="请输入内容" disabled/>
              <p class="font-size-14" style="float: right;">字数统计：<span style="color: red;">{{words}}</span>字节</p>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogremarkConVisible = false" class="cancel" size="small">取 消</el-button>
              <el-button type="primary" @click="dialogremarkConVisible = false" class="sure" size="small">确 定</el-button>
            </div>
          </el-dialog>
          <el-col :span="4"  style="line-height:45px;">
            <el-button  style="margin-left: 20px;" @click="queryThings" size="small" >其他事项确认</el-button>
          </el-col>
          <!--其他事项确认弹出框-->
          <el-dialog title="其他事项确认" :visible.sync="dialogqueryThingsVisible" width="700px" append-to-body>
            <el-form disabled>
              <el-form-item label="特殊关系确认"  label-width="300px">
                <el-select v-model="form.relationshipCon" disabled size="small">
                  <el-option
                    v-for="item in isOrNot"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="价格影响确认"  label-width="300px">
                <el-select v-model="form.priceCon" disabled size="small">
                  <el-option
                    v-for="item in isOrNot"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="与货物有关的特许权使用费支付确认"  label-width="300px">
                <el-select v-model="form.franchiseFeeCon" disabled size="small">
                  <el-option
                    v-for="item in isOrNot"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogqueryThingsVisible = false" class="cancel" size="small">取 消</el-button>
              <el-button type="primary" @click="dialogqueryThingsVisible = false" class="sure" size="small">确 定</el-button>
            </div>
          </el-dialog>
        </el-row>
        <el-row>
          <el-col :span="16" style="line-height:50px;">
            <el-form-item label="标记唛码"  label-width="115px" class="distance">
              <el-input v-model="form.marks" disabled auto-complete="off" size="small"/>
            </el-form-item>
          </el-col>
          <!--标记唛码弹出框-->
          <el-dialog title="标记唛码" :visible.sync="dialogMarksConVisible" width="700px" append-to-body>
            <div>
              <el-input v-model="marks" type="textarea" :rows="7" placeholder="请输入内容" disabled/>
              <p class="font-size-14" style="float: right;">字数统计：<span style="color: red;">{{words1}}</span>字节</p>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogMarksConVisible = false" class="cancel" size="small">取 消</el-button>
              <el-button type="primary" @click="dialogMarksConVisible = false" class="sure" size="small">确 定</el-button>
            </div>
          </el-dialog>
          <el-col :span="2" style="line-height:45px;">
            <el-button  style="margin-left: 20px;" @click="remarkMark" icon="el-icon-more" size="small" ></el-button>
          </el-col>
          <el-col :span="4" style="line-height:45px;" >
            <el-button  style="margin-left: 20px;" @click="bsSelect" size="small" >业务选择</el-button>
          </el-col>
          <!--业务选择弹出框-->
          <el-dialog title="业务选择" :visible.sync="dialogBsSelectVisible" width="700px" append-to-body>
            <div>
              <el-checkbox-group class="login-checkbox" v-model="selectBstype">
                <el-checkbox class="checkboxFirst" label="税单无纸化" name="type" disabled/>
                <el-checkbox class="checkboxNext" label="自主报税" name="type" disabled/>
                <el-checkbox class="checkboxNext" label="自报自缴" name="type"  disabled/>
                <el-checkbox class="checkboxNext"label="担保验放" name="type" disabled/>
              </el-checkbox-group>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogBsSelectVisible = false" class="cancel" size="small">取 消</el-button>
              <el-button type="primary" @click="dialogBsSelectVisible = false" class="sure" size="small">确 定</el-button>
            </div>
          </el-dialog>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="检验检疫受理机关"  label-width="140px" class="distance">
              <el-select v-model="form.inspectionAndQuarantineOrgan" disabled size="small" style="width: 100%">
                <el-option
                  v-for="item in organizations"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="企业资质"  label-width="130px" class="distance">
              <el-input v-model="form.qualificationCategoryCode"  size="small" auto-complete="off" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item class="distance">
              <el-input v-model="form.qualificationCategoryName"  size="small" auto-complete="off" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item class="distance">
              <el-button circle size="mini" icon="el-icon-arrow-left" @click="frontAptitudeInfo"></el-button>
              <el-button circle size="mini" icon="el-icon-arrow-right" @click="nextAptitudeInfo"></el-button>
              <el-button circle size="mini" icon="el-icon-more" @click="showAptitudeInfo"></el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="领证机关"  label-width="140px" class="distance">
              <el-select v-model="form.certificationAuthority" disabled size="small" style="width: 100%">
                <el-option
                  v-for="item in organizations"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="口岸检验检疫机关"  label-width="130px" class="distance">
              <el-select v-model="form.portInspectionAndQuarantineOrgan" disabled size="small" style="width: 100%">
                <el-option
                  v-for="item in organizations"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="启运日期"  label-width="90px" class="distance">
              <el-input v-model="form.shipmentDate" disabled size="small"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="B/L号	"  label-width="90px" class="distance">
              <el-input v-model="form.blNo" disabled size="small"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="目的地检验检疫机关"  label-width="140px" class="distance">
              <el-select v-model="form.desInspectionAndQuarantineOrgan" disabled size="small" style="width: 100%">
                <el-option
                  v-for="item in organizations"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="关联号码及理由"  label-width="130px" class="distance">
              <el-input v-model="form.associatedNo" size="small" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item class="distance">
              <el-input v-model="form.associatedReasons"  size="small" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item  class="distance">
              <el-button size="small" style="margin-left: 20px;" @click="showUserInfo" >使用人</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="原箱运输"  label-width="140px" class="distance">
              <el-select v-model="form.originalboxTransportation" disabled size="small">
                <el-option
                  v-for="item in isOrNot"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="特殊业务标识"  label-width="140px" class="distance">
              <el-input v-model="form.specialService"  size="small" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item  class="distance">
              <el-button size="mini" @click="showSelectionInfo" circle icon="el-icon-more"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item class="distance" label="所需单证"  label-width="130px">
              <el-input v-model="form.QuaranDeclare"  size="small" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item class="distance">
              <el-button size="small" style="margin-left: 20px;" @click="showQuaranDeclareInfo" >检验检疫签证申报要素</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <!--商品表格-->
        <el-row>
          <el-col :span="24">
            <el-table :data="goodsData" style="width: 100%" stripe disabled>
              <el-table-column prop="commodityNo" type="index" label="序号" width="60"/>
              <el-table-column prop="commodityCustomsNo" label="商品编号" />
              <el-table-column prop="recordSequenceNo" label="备案序号" />
              <el-table-column prop="commodityName" label="商品名称" />
              <el-table-column prop="commoditySpecification" label="规格" />
              <el-table-column prop="dealQuantity" label="成交数量" />
              <el-table-column prop="dealMeasurementUnit" label="成交单位" :formatter="dealUnitFormat"/>
              <el-table-column prop="dealUnitPrice" label="单价" />
              <el-table-column prop="dealTotalPrice" label="总价" />
              <el-table-column prop="currency" label="币值" :formatter="currencyFormat"/>
              <el-table-column prop="originalCountry" label="原产国（地区）" :formatter="sourceCountryFormat"/>
            </el-table>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-table :data="documentData" style="width: 100%" stripe disabled>
              <el-table-column type="index" label="序号" width="150px"/>
              <el-table-column prop="attachCertificateType" label="单证代码" />
              <el-table-column prop="attachCertificateNo" label="单证编号" />
            </el-table>
          </el-col>
        </el-row>
        <!-- 集装箱信息表格 -->
        <el-row>
          <el-col :span="24">
            <el-table :data="containerData" style="width: 100%" stripe disabled>
              <el-table-column type="index" label="序号" width="60"/>
              <el-table-column prop="containerNo" label="集装箱号"/>
              <el-table-column prop="containerSpecfifcaton" label="集装箱规格" />
              <el-table-column prop="containerWeight" label="集装箱自重" />
            </el-table>
          </el-col>
        </el-row>
        <!-- 附件信息（随附单据） -->
        <el-row>
          <el-col :span="24">
            <el-table :data="attachmentData" style="width: 100%" stripe disabled>
              <el-table-column type="index" label="随附单据" align="center" width="150" />
              <el-table-column prop="accompanyDocName" label="文件名" align="center" />
              <el-table-column prop="accompanyDocType" label="类别" align="center" />
              <el-table-column prop="accompanyDocNo" label="编号" align="center" />
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <!--<el-button size="mini" type="text"  @click="viewAttachment">预览</el-button>-->
                  <el-button size="mini" :disabled="scope.row.attachmentAddress == undefined" type="text" @click="uploadAttach(scope.$index, scope.row)">下载</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-button v-show="isForbidden" :disabled="auditFlag == 0" @click="checkAuditResult" type="primary" style="float:right;margin:10px;">审 核</el-button>
        <el-button v-show="isForbidden" :disabled="auditFlag == 1" @click="waitAuditClick" type="primary" v-loading.fullscreen.lock="loading" style="float:right; margin:10px;">提 交</el-button>
        <el-button v-show="isForbidden" :disabled="auditFlag == 1" @click="waitAuditNotPass" style="float:right;margin:10px;">不 通 过</el-button>
        <!--审核弹出框-->
        <el-dialog title="审核" :visible.sync="dialogresultVisible" width="500px" append-to-body>
          <el-row>
            <el-col :span="24">
              <el-form-item label="审核结果：" style="margin-bottom: 0;" >
                <el-radio v-model="auditResult" disabled label="1">通过</el-radio>
                <el-radio v-model="auditResult" disabled label="2">不通过</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" >
              <el-form-item label="备注信息：" :required="auditStatus === 0">
                <el-input type="textarea" v-model="auditOpinion" :rows="5" placeholder="审核结果为“不通过”时填写" :disabled="isEdit"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-button size="small" @click="auditClick" type="primary" style="float:right; margin:10px;">确 定</el-button>
              <el-button @click="cancelResult" size="small" style="float:right;margin:10px;">取 消</el-button>
            </el-col>
          </el-row>
        </el-dialog>
        <UserInfo ref="userInfo"/>
        <CompanyAptitudeInfo ref="aptitudeInfo" />
        <QuarantineDeclareInfo ref="quaranDeclareInfo"/>
        <Selection ref="selectionInfo"/>
      </el-form>
    </div>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
  import moment from 'moment';
  import './../../../../src/assets/css/base.css';
  import './../../../assets/css/webCompany/commodityManIfo.css';
  import UserInfo from './../../webPersonal/businessManage/components/userInfo.vue'
  import CompanyAptitudeInfo from './../../webPersonal/businessManage/components/companyAptitudeInfo.vue'
  import QuarantineDeclareInfo from './../../webPersonal/businessManage/components/quarantineDeclareInfo.vue'
  import Selection from './../../webPersonal/businessManage/components/specialServiceSelection.vue'
  export default {
    //定义数据
    data () {
      return {
        currencys: [],
        currencysAll:[],
        packageTypes:[],//包装种类
        packageTypesAll:[],
        declareCustoms: [],
        declareCustomsAll:[],
        supplyAreas: [],
        supplyAreasAll:[],
        transportModes:[],
        transportModesAll:[],
        dealModes:[],
        dealModesAll:[],
        superviseModes: [],
        superviseModesAll: [],
        levyNatures: [],
        levyNaturesAll: [],
        tradeCountrys: [],
        tradeCountrysAll: [],
        arrivalCountrys: [],
        arrivalPorts: [],
        certificateCodes: [],
        certificateCodesAll: [],
        organizations:[],
        certificationAuthoritysAll:[],
        destiInspectOrgansAll:[],
        inspectAcceptOrgansAll:[],
        portInspectOrgansAll:[],
        legalUnits: [],
        legalUnitsAll: [],
        originPorts:[],
        originPortsAll:[],
        stopOverPorts:[],
        stopOverPortsAll:[],
        Historyflag:false,
        hasHisOpinion:false,
        auditOpinion:'',
        dialogFormVisible:false,
        dialogresultVisible:false,
        form:{
          qualificationCategoryCode:'',
          qualificationCategoryName:''
        },
        imDeclareDetailId:'',
        auditFlag:0,
        isForbidden:false,
        goodsData:[],
        documentData:[],
        containerData:[],//集装箱信息
        attachmentData:[],//附件信息
        historyTableData:[],//历史审核意见信息
        bussinessId:'',//业务单号，用于查询附件信息
        isEdit:true,
        auditResult:'',
        selectBstype:[],
        options: [{
          value: '1',
          label: '率'
        }, {
          value: '2',
          label: '单价'
        }, {
          value: '3',
          label: '总价'
        }],
        isOrNot:[{
          value: '0',
          label: '否'
        }, {
          value: '1',
          label: '是'
        },{
          value: '9',
          label:'空'
        }],
        dialogqueryThingsVisible:false,
        dialogBsSelectVisible:false,
        dialogremarkConVisible:false,
        dialogMarksConVisible:false,
        words:0,
        markWords:0,
        remark:'',
        marks:'',
        words1:0,
        markWords1:0,
        dialogHistoryVisible:false,
        enterpriseQualificationList:[],
        auditStatus:0,
        loading:false,
        invNo:'',
        invPwd:''
      }
    },
    //定义组件
    components:{
      UserInfo,//使用人信息
      CompanyAptitudeInfo,//企业资质信息
      QuarantineDeclareInfo,//检疫检疫签证申报要素
      Selection,//特殊业务标识
    },

//定义初始化函数
    mounted(){
      let data1=JSON.parse(localStorage.getItem('Name3'));
      this.$store.commit("updateManageName",data1);
      this.loadStaticData();//请求本地数据
    },
    computed:{
      nickManageName(){
        return this.$store.state.nickManageName;
      },
      nickManage(){
        return this.$store.state.nickManage;
      }
    },
    methods:{
      //时间格式化
      dateFormat:function(row, column) {
        let date = row[column.property];
        if (date === undefined) {
          return "";
        }
        return moment(date).format("YYYY-MM-DD HH:mm:ss");
      },
      bsSelect(){
        this.dialogBsSelectVisible = true;
        var selection = [];
        if(this.form.isPaperless == 1){
          selection.push('税单无纸化')
        }
        if(this.form.isIndependentTax == 1){
          selection.push('自主报税')
        }
        if(this.form.isAllSelf == 1){
          selection.push('自报自缴')
        }
        if(this.form.isGuarantee == 1){
          selection.push('担保验放')
        }
        console.log('selection',selection)
        this.selectBstype = selection;
      },
      remarkCon(){
        this.remark = this.form.remark;
        if(this.remark !== null && this.remark !== undefined) {
          this.words = this.remark.length;
        }
        else {
          this.words = 0
        }
        this.dialogremarkConVisible = true;
      },
      //标记唛码按钮
      remarkMark(){
        this.marks = this.form.marks;
        if(this.marks !== null && this.marks !== undefined) {
          this.words1 = this.marks.length;
        }
        else {
          this.words1 = 0
        }
        this.dialogMarksConVisible = true;
      },
      //显示使用人对话框
      showUserInfo(){
        this.$refs.userInfo.isDisabled = true;
        this.$refs.userInfo.showUserInfoDialog(this.form.userInfoList);
      },
      //显示企业资质信息
      showAptitudeInfo(){
        this.$refs.aptitudeInfo.isDisabled = true;
        this.$refs.aptitudeInfo.showAptitudeInfoDialog(this.form.enterpriseQualificationList);
      },
      nextAptitudeInfo(){
        var index = this.enterpriseQualificationList.findIndex((item)=>
          (item.qualificationCategoryCode == this.form.qualificationCategoryCode));
        index = index + 1;
        if(index < this.enterpriseQualificationList.length){
          console.log('pp')
          this.form.qualificationCategoryCode = this.enterpriseQualificationList[index].qualificationCategoryCode;
          this.form.qualificationCategoryName = this.enterpriseQualificationList[index].qualificationCategoryName;
        }
      },
      frontAptitudeInfo(){
        var index = this.enterpriseQualificationList.findIndex((item)=>
          (item.qualificationCategoryCode == this.form.qualificationCategoryCode));
        console.log(index);
        index = index - 1;
        if(index >= 0){
          this.form.qualificationCategoryCode = this.enterpriseQualificationList[index].qualificationCategoryCode;
          this.form.qualificationCategoryName = this.enterpriseQualificationList[index].qualificationCategoryName;
        }
      },
      //显示检验检疫签证申报要素信息
      showQuaranDeclareInfo(){
        this.$refs.quaranDeclareInfo.isDisabled = true;
        this.$refs.quaranDeclareInfo.isImport = false;
        this.$refs.quaranDeclareInfo.showDeclareInfoDialog(this.form.elementsQuarantineList);
        this.$refs.quaranDeclareInfo.form.teRsComanyEnName = this.form.teRsComanyEnName;
        this.$refs.quaranDeclareInfo.form.ovRsComanyCnName = this.form.ovRsComanyCnName;
        this.$refs.quaranDeclareInfo.form.commodityEnName = this.form.commodityEnName;
        this.$refs.quaranDeclareInfo.dialogUserVisible = true;
      },
      //显示特殊业务标识
      showSelectionInfo(){
        this.$refs.selectionInfo.isDisabled = true;
        var selection = [];
        if(this.form.internationalEvents == 1){
          selection.push('国际赛事')
        }
        if(this.form.militaryMaterials == 1){
          selection.push('特殊进出军工物资')
        }
        if(this.form.aidMaterials == 1){
          selection.push('国际援助物资')
        }
        if(this.form.internationalConference == 1){
          selection.push('国际会议')
        }
        if(this.form.directClearance == 1){
          selection.push('直通放行')
        }
        if(this.form.diplomaticCourtesy == 1){
          selection.push('外交礼遇')
        }
        if(this.form.customsTransit == 1){
          selection.push('转关')
        }
        console.log('selection',selection)
        this.$refs.selectionInfo.showSelectionInfoDialog(selection);
      },
      isValueInArr(arr,value){
        for(let i in arr){
          if(value === arr[i]){
            return true;
          }
        }
        return false;
      },
      // 显示单证审核预览
      showDocumentInfo(val){
        this.auditOpinion = '';
        this.imDeclareDetailId=val.imDeclareDetailId;
        if(val.verifyStatus == "未审核"){
          this.isForbidden = true;
        }
        else{
          this.isForbidden = false;
        }
        if(val.billStatus === 4 && val.hasOpinion === false ){
          this.hasHisOpinion = false;
        }
        else{
          this.hasHisOpinion = true;
        }
        this.goodsData=[];
        this.documentData=[];
        this.containerData=[];
        let param={
          imDeclareDetailId:val.imDeclareDetailId,
        }
        this.$axios8.post('/declareDetail',param)
          .then((response) => {
            console.log('bbb',response.data);
            if(response.data.state === true){
              var dataList = response.data.data;
              this.form=dataList;
              this.enterpriseQualificationList = dataList.enterpriseQualificationList;//企业资质\
              if(dataList.enterpriseQualificationList.length != 0) {
                this.form.qualificationCategoryCode = dataList.enterpriseQualificationList[0].qualificationCategoryCode;
                this.form.qualificationCategoryName = dataList.enterpriseQualificationList[0].qualificationCategoryName;
              }else {
                this.form.qualificationCategoryCode = '';
                this.form.qualificationCategoryName = ''
              }
              this.goodsData=dataList.commodityList;//商品列表
              this.documentData=dataList.attachCertificateList;//随附单证
              this.containerData=dataList.containerList;//集装箱信息
              switch(dataList.billStatus){
                case 2:
                  this.form.billStatus = "受理中";break;
                case 3:
                  this.form.billStatus = "制单中";break;
                case 4:
                  this.form.billStatus = "审核中";break;
                case 5:
                  this.form.billStatus = "申报中";break;
                case 6:
                  this.form.billStatus = "已完成";break;
                case 7:
                  this.form.billStatus = "审核不通过";break;
              };
              switch(dataList.declarationType){
                case '0':
                  this.form.declarationType = "有纸报关";break;
                case 'D':
                  this.form.declarationType = "无纸带清单报关";break;
                case 'L':
                  this.form.declarationType = "有纸带清单报关";break;
                case 'M':
                  this.form.declarationType = "通关无纸化";break;
                case 'W':
                  this.form.declarationType = "无纸报关";break;
              };
              if(dataList.elementsQuarantineList.length != 0) {
                var QuarantineList = [];
                for(let i in dataList.elementsQuarantineList){
                  QuarantineList[i] = dataList.elementsQuarantineList[i].certificateName;
                }
                this.form.QuaranDeclare = QuarantineList.join(',');
              };
              var selection = [];
              if(dataList.internationalEvents == 1){
                selection.push('国际赛事')
              }
              if(dataList.militaryMaterials == 1){
                selection.push('特殊进出军工物资')
              }
              if(dataList.aidMaterials == 1){
                selection.push('国际援助物资')
              }
              if(dataList.internationalConference == 1){
                selection.push('国际会议')
              }
              if(dataList.directClearance == 1){
                selection.push('直通放行')
              }
              if(dataList.diplomaticCourtesy == 1){
                selection.push('外交礼遇')
              }
              if(dataList.customsTransit == 1){
                selection.push('转关')
              }
              this.form.specialService = selection.toString();
              this.accompanyQuery();
            }
          })
          .catch(function(error){
            console.log(error)
          })
        this.$axios8.get('xml/getImReceipt',{params:{
            imDeclareDetailId:val.imDeclareDetailId
          }})
          .then((res) => {
            console.log('查询',res)
            if(res.data.state == true){
              this.invNo = res.data.data.invNo;
              this.invPwd = res.data.data.invPwd;
              this.auditFlag = res.data.data.flag;
            }
            else{
              this.invNo = '';
              this.invPwd = '';
              this.auditFlag = 0;
            }
          }).catch((e) => {
          console.log(e);
        });
        this.dialogFormVisible = true;
      },
      //根据业务单号查询随附单据
      accompanyQuery(){
        this.attachmentData = [];
        if(this.imDeclareDetailId != undefined){
          let params = {
            'imDeclareDetailId':this.imDeclareDetailId,
          };
          console.log('随附单据参数',params)
          this.$axios11.post('import/AccompanyDoc/getbyid',params)
            .then((res) => {
              console.log('随附单据查询',res)
              for(let i = 0;i<res.data.length;i++){
                this.attachmentData.push({
                  imDeclareDetailId:res.data[i].imDeclareDetailId,
                  accompanyDocType:res.data[i].accompanyDocType,
                  accompanyDocId:res.data[i].accompanyDocId,
                  accompanyDocName:res.data[i].accompanyDocName,
                  accompanyDocNo:res.data[i].accompanyDocNo,
                  ownerId:res.data[i].ownerId,
                  ownerName:res.data[i].ownerName,
                  uploadTime:res.data[i].uploadTime,
                  attachmentAddress:res.data[i].accompanyDocAddress,
                });
              }
            }).catch((e) => {
            console.log(e);
          });
        }
        this.dialogOperationVisible = true;
      },
      queryThings(){
        this.dialogqueryThingsVisible = true;
      },
      remarkCon(){
        this.dialogremarkConVisible = true;
      },
      //查询标准版单一窗口暂存结果
      checkAuditResult(){
        let param = {
          invNo:this.invNo,
          decCompanyName:this.form.decCompanyName
        }
        this.$axios10.post('xml/getReceipt',param)
          .then((res) => {
            console.log('结果',res)
            if(res.data.state == true){
              if(res.data.data.CustomsStatus == '99' || res.data.data.CustomsStatus == '22' || res.data.data.CustomsStatus == '25'){
                this.auditStatus = 1;
                this.isEdit = true;
                this.auditResult = '1';
                this.auditOpinion = '';
                this.dialogresultVisible = true;
              }
              else {
                this.auditStatus = 0;
                this.isEdit = false;
                this.auditResult = '2';
                this.auditOpinion = res.data.data.CustomsReturnInfo;
                this.dialogresultVisible = true;
              }
            }
            else {
              this.$message.info('正在检查订单信息，请稍后审核！')
            }
          }).catch((e) => {
          console.log(e);
        });
      },
      //审核不通过按钮
      waitAuditNotPass(){
        this.auditStatus = 0;
        this.isEdit = false;
        this.auditResult = '2';
        this.auditOpinion = '';
        this.dialogresultVisible = true;
      },
      cancelResult(){
        this.dialogresultVisible = false;
      },
      //弹出审核
      waitAuditClick(){
        this.loading = true;
        var param={
          'imDeclareDetailId':this.imDeclareDetailId,
          'invNo':this.invNo,
          'invPwd':this.invPwd,
        };
        console.log(param);
        this.$axios12.post('xml/doImPost',param)
          .then((response) =>{
            console.log('pp',response)
            this.loading = false;
            if(response.data.returnCode == 1){
              this.auditFlag = 1;
              this.invNo = response.data.data[0].invNo;
              this.invPwd = response.data.data[0].invPassword;
              //更新出口报关单回执表中的关检关联号以及密码
              var param={
                'imDeclareDetailId':this.imDeclareDetailId,
                'invNo':this.invNo,
                'invPwd':this.invPwd,
              };
              console.log(param);
              this.$axios8.post('xml/import/updateInvNoPwd',param)
                .then((response) =>{
                  console.log('oo',response)
                }).catch((error)=> {
                console.log(error);
              });
            }
            else {
              this.auditStatus = 0;
              this.isEdit = false;
              this.auditResult = '2';
              this.auditOpinion = response.data.data;
              this.auditOpinion = '';
              this.dialogresultVisible = true;
            }
          }).catch((error)=> {
          console.log(error);
        });
      },
      //提交审核
      auditClick(){
        if(this.auditStatus === 0 && this.auditOpinion === ''){
          this.$message.error('请填写审核意见！')
        }else {
          let param={
            'imDeclareDetailId':this.imDeclareDetailId,
            'auditStatus':this.auditStatus,
            'auditOpinion':this.auditOpinion,
            // 'auditor':this.nickManageName,
          };
          console.log(param);
          this.$axios8.post('/verify',param)
            .then((response) =>{
              if(response.data.status == true){
                this.$message.success('审核完成！');
              }
            }).catch((error)=> {
            console.log(error);
          });
          this.dialogFormVisible = false;
          this.dialogresultVisible=false;
          //最后统一执行刷新函数
          this.$parent.queryDocByKeyword();
        }
      },
      //下载附件信息
      uploadAttach(index,row){
        console.log(row)
        let param = {
          'BucketName':"maoqu-business",
          'FileName':row.attachmentAddress,
        }
        this.$axios7.post('file/Download',param)
          .then((response) =>{
            window.open(response.data.url)
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      // 显示历史审核意见
      showDialogHistory () {
        this.historyTableData = [];
        //查询当前订单历史审核意见
        let params = {
          imDeclareDetailId:this.imDeclareDetailId,
        };
        this.$axios8.get('/getAuditOpinion',{params:params})
          .then((response) => {
            let res = response.data.data;
            console.log('233',response);
            if(res != undefined){
              for(let i=0; i<res.length; i++){
                let dataRow = res[i];
                if(this.imDeclareDetailId == dataRow.imDeclareDetailId){
                  this.historyTableData.push({
                    audittime:dataRow.auditTime,
                    auditopinion:dataRow.auditOpinion,
                  })
                }
              }
            }
          });
        this.dialogHistoryVisible=true;
      },
      //原产国别查找中文名称
      sourceCountryFormat(row,col){
        let val = row[col.property];
        if (val === undefined || val == '' || val == null) {
          return "";
        }
        else {
          var data = this.tradeCountrys.find((item) => {
            if(item.value === val){
              return item;
            }
          });
          console.log('data',data)
          if(data != undefined){
            return data.label;
          }
          else {
            return '';
          }
        }
      },
      dealUnitFormat(row,col){
        let val = row[col.property];
        if (val === undefined || val == '' || val == null) {
          return "";
        }
        else {
          var data = this.legalUnits.find((item) => {
            if(item.value === val){
              return item;
            }
          });
          if(data != undefined){
            return data.label;
          }
          else {
            return '';
          }
        }
      },
      //币制
      currencyFormat(row,col){
        let val = row[col.property];
        if (val === undefined || val == '' || val == null) {
          return "";
        }
        else {
          var data = this.currencys.find((item) => {
            if(item.value === val){
              return item;
            }
          });
          if(data != undefined){
            return data.label;
          }
          else {
            return '';
          }
        }
      },
      //请求本地数据
      loadStaticData(){
        this.$axios.all([
          this.$axios.get('static/pub_countryregion.json'),//贸易国/启运国（地区）/原产国、最终目的地
          this.$axios.get('static/pub_exportports.json'),//申报地海关/进境关别
          this.$axios.get('static/pub_transportmode.json'),//运输方式
          this.$axios.get('static/pub_transportationport.json'),//经停港/启运港
          this.$axios.get('static/pub_dealmode.json'),//成交方式
          this.$axios.get('static/pub_currencysystem.json'),//币种
          this.$axios.get('static/pub_packkind.json'),//包装种类
          this.$axios.get('static/pub_domesticport.json'),//入境口岸
          this.$axios.get('static/pub_checkout_organization.json'),//机关
          this.$axios.get('static/pub_measureunit.json'),//成交单位
          this.$axios.get('static/pub_domesticregion.json'),//境内目的地
          this.$axios.get('static/pub_levymode.json'),//征免方式
          this.$axios.get('static/pub_levynature.json'),//征免性质
          this.$axios.get('static/pub_checkout_use.json'),//用途
          this.$axios.get('static/pub_supervisemode.json'),//监管方式
          this.$axios.get('static/pub_certificatecode.json'),//单证代码
        ]).then(this.$axios.spread((
          res_countryregion,
          res_exportports,
          res_transportmode,
          res_transportationport,
          res_dealmode,
          res_currencysystem,
          res_packkind,
          res_domesticport,
          res_checkout_organization,
          res_measureunit,
          res_domesticregion,
          res_levymode,
          res_levynature,
          res_checkout_use,
          res_supervisemode,
          res_certificatecode
        ) => {
          this.currencys = res_currencysystem.data.RECORDS;
          this.packageTypes = res_packkind.data.RECORDS;
          this.dealModes = res_dealmode.data.RECORDS;
          this.declareCustomsAll = res_exportports.data.RECORDS;
          this.transportModes = res_transportmode.data.RECORDS;
          this.supplyAreas = res_domesticport.data.RECORDS;
          this.tradeCountrys = res_countryregion.data.RECORDS;
          this.superviseModes = res_supervisemode.data.RECORDS;
          this.levyNatures = res_levynature.data.RECORDS;
          this.originPorts = res_transportationport.data.RECORDS;
          this.organizations = res_checkout_organization.data.RECORDS;
          this.legalUnits = res_measureunit.data.RECORDS;
          this.certificateCodes = res_certificatecode.data.RECORDS;
          this.certificateCodesAll = this.certificateCodes;
        })).catch((e) => {
          console.log(e);
        })
      },
    }
  }
</script>
<style scope>
  .distance {
    margin : 3px 0;
  }
</style>
