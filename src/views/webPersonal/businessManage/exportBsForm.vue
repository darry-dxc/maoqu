<template>
  <el-form :model="form" ref="form" :rules="rules" :show-message="false" size="small">
    <el-row>
      <el-col :span="12">
        <el-form-item label="申报地海关" prop="declareCustoms" label-width="110px" class="formItem" required>
          <el-select v-model="form.declareCustoms" :disabled="isEdit" size="small" :filter-method="declareCustomFilter" filterable clearable style="width: 100%;">
            <el-option
              v-for="item in declareCustomsAll"
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
        <el-form-item label="报关状态"  label-width="110px" class="formItem">
          <el-input v-model="form.billStatus" size="small" disabled/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="统一编号"  label-width="110px" class="formItem">
          <el-input v-model="form.unifiedNo"  size="small" disabled/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="预录入编号"  label-width="110px" class="formItem">
          <el-input v-model="form.preEntryNo"  size="small" disabled/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="海关编号"  label-width="110px" class="formItem">
          <el-input v-model="form.customsNo" size="small" disabled/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="出境关别" prop="exportBorder" label-width="110px" class="formItem" required>
          <el-select v-model="form.exportBorder" size="small" :disabled="isEdit" :filter-method="exportBorderFilter" filterable clearable style="width: 100%;">
            <el-option
              v-for="item in exportBordersAll"
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
        <el-form-item label="备案号" prop="recordNo" label-width="110px" class="formItem">
          <el-input v-model="form.recordNo" :disabled="isEdit" size="small"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="合同协议号"  label-width="110px" class="formItem">
          <el-input v-model="form.contractNo" :disabled="isEdit" size="small"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="出口日期"  label-width="110px" class="formItem">
          <el-date-picker
            style="width: 100%"
            v-model="form.exportDate"
            type="date"
            placeholder="选择日期"
            format="yyyyMMdd"
            value-format="yyyyMMdd"
            size="small"
            disabled>
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="申报日期"  label-width="110px" class="formItem">
          <el-input v-model="form.declareDate" size="small" disabled/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="9">
        <el-form-item label="境内收发货人" prop="teRsCreditCode" required label-width="110px" class="formItem">
          <el-autocomplete
            placeholder="18位社会信用代码"
            v-model="form.teRsCreditCode"
            :fetch-suggestions="devCreditCodeFuzzySearch"
            @select="selectEnterprise"
            style="width: 100%"
            clearable
            :disabled="isEdit"
          />
        </el-form-item>
      </el-col>
      <el-col :span="3">
        <el-form-item class="formItem" prop="teRsCustomsCode" required>
          <el-input v-model="form.teRsCustomsCode" :disabled="isEdit" size="small" placeholder="10位海关代码"/>
        </el-form-item>
      </el-col>
      <el-col :span="3">
        <el-form-item class="formItem" prop="teRsQuarantineCode">
          <el-input v-model="form.teRsQuarantineCode" :disabled="isEdit" size="small" placeholder="10位检验检疫编码" />
        </el-form-item>
      </el-col>
      <el-col :span="9">
        <el-form-item class="formItem" prop="teRsCompanyName" required>
          <el-input v-model="form.teRsCompanyName" :disabled="isEdit" size="small" placeholder="企业名称(中文)"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="15">
        <el-form-item label="境外收发货人"  label-width="110px" class="formItem">
          <el-autocomplete
            placeholder="境外收发货人代码"
            v-model="form.ovRsCode"
            :fetch-suggestions="exovRsCodeFuzzySearch"
            @select="selectOverSeasCustomer"
            style="width: 100%"
            clearable
            :disabled="isEdit"
          />
        </el-form-item>
      </el-col>
      <el-col :span="9">
        <el-form-item class="formItem" prop="ovRsCompanyName" required>
          <el-input v-model="form.ovRsCompanyName" :disabled="isEdit" size="small" placeholder="企业名称(外文)"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="9">
        <el-form-item label="生产销售单位" prop="psCreditCode" required label-width="110px" class="formItem">
          <el-input v-model="form.psCreditCode" :disabled="isEdit" size="small" placeholder="18位社会信用证代码" />
        </el-form-item>
      </el-col>
      <el-col :span="3">
        <el-form-item class="formItem" prop="psCustomsCode" required>
          <el-input v-model="form.psCustomsCode" :disabled="isEdit" size="small" placeholder="10位海关代码" />
        </el-form-item>
      </el-col>
      <el-col :span="3">
        <el-form-item class="formItem" prop="psQuarantineCode">
          <el-input v-model="form.psQuarantineCode" :disabled="isEdit" size="small" placeholder="10位检验检疫编码"/>
        </el-form-item>
      </el-col>
      <el-col :span="9">
        <el-form-item class="formItem" prop="psCompanyName" required>
          <el-input v-model="form.psCompanyName" :disabled="isEdit" size="small" placeholder="企业名称(中文)"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="9">
        <el-form-item label="申报单位" prop="decCreditCode" required label-width="110px" class="formItem">
          <el-input v-model="form.decCreditCode" disabled size="small" placeholder="18位企业信用证代码"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="3">
        <el-form-item class="formItem" prop="decCustomsCode" required>
          <el-input v-model="form.decCustomsCode" disabled size="small" placeholder="10位海关代码"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="3">
        <el-form-item class="formItem" prop="decQuarantineCode">
          <el-input v-model="form.decQuarantineCode" disabled size="small" placeholder="10位检验检疫编码"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="9">
        <el-form-item class="formItem" prop="decCompanyName" required>
          <el-select v-model="form.decCompanyName" :disabled="isEdit" @change="decCompanyNameChange" placeholder="企业名称(中文)" size="small" filterable clearable style="width: 100%;">
            <el-option
              v-for="item in decCompanyAll"
              :key="item.decCompanyName"
              :label="item.decCompanyName"
              :value="item.decCompanyName">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="运输方式" prop="transportMode" label-width="110px" class="formItem" required>
          <el-select v-model="form.transportMode" :disabled="isEdit" :filter-method="transportModeFilter" size="small" filterable clearable style="width: 100%;">
            <el-option
              v-for="item in transportModesAll"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              <span style="float: left">{{ item.value }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="运输工具名称"  label-width="130px" class="formItem">
          <el-input v-model="form.conveyanceName" :disabled="isEdit" size="small"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="航次号"  label-width="100px" class="formItem">
          <el-input v-model="form.voyageNo" :disabled="isEdit" size="small"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="提运单号"  label-width="110px" class="formItem">
          <el-input v-model="form.deliveryNo" :disabled="isEdit" size="small"/>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="监管方式" prop="supervisionMode" label-width="100px" class="formItem" required>
          <el-select v-model="form.supervisionMode" :disabled="isEdit" :filter-method="superviseModesFilter" size="small" filterable clearable style="width: 100%;">
            <el-option
              v-for="item in superviseModesAll"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              <span style="float: left">{{ item.value }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="征免性质"  label-width="100px" class="formItem">
          <el-select v-model="form.levyNature" :disabled="isEdit" :filter-method="levyNaturesFilter" size="small" filterable clearable style="width: 100%;">
            <el-option
              v-for="item in levyNaturesAll"
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
      <el-col :span="6">
        <el-form-item label="许可证号"  label-width="110px" class="formItem">
          <el-input v-model="form.licenseKey" :disabled="isEdit" size="small"/>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="运抵国（地区）" prop="arrivalCountry" label-width="130px" class="formItem" required>
          <el-select v-model="form.arrivalCountry" :disabled="isEdit" :filter-method="arrivalCountryFilter" size="small" filterable clearable style="width: 100%">
            <el-option
              v-for="item in arrivalCountrysAll"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              <span style="float: left">{{ item.value }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="指运港" prop="arrivalPort" label-width="100px" class="formItem" required>
          <el-select v-model="form.arrivalPort" :disabled="isEdit" :filter-method="stopOverPortsFilter" size="small" filterable clearable  style="width: 100%">
            <el-option
              v-for="item in stopOverPortsAll"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              <span style="float: left">{{ item.value }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="成交方式" prop="dealMode" label-width="100px" class="formItem" required>
          <el-select v-model="form.dealMode" :disabled="isEdit" :filter-method="dealModeFilter" size="small" filterable clearable  style="width: 100%">
            <el-option
              v-for="item in dealModesAll"
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
      <el-col :span="4">
        <el-form-item label="运费" prop="freightMark" label-width="110px" class="formItem">
          <el-select v-model="form.freightMark" :disabled="isEdit" filterable clearable size="small" @change="isFreightRateCurrencyDisabled">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value" >
              <span >{{ item.value }}-</span>
              <span >{{ item.label }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-form-item class="formItem">
          <el-input v-model="form.freightRate" :disabled="isEdit" size="small" />
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-form-item class="formItem">
          <el-select v-model="form.freightCurrency" :disabled="freightRateDisabled" :filter-method="freightCurrencysFilter" filterable clearable size="small" style="width: 100%">
            <el-option
              v-for="item in freightCurrencysAll"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              <span style="float: left">{{ item.value }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="保险费"  label-width="70px" class="formItem">
          <el-select v-model="form.premiumMark" :disabled="isEdit" filterable clearable size="small" @change="isPremiumRateCurrencyDisabled">
            <el-option v-for="item in options1"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value" >
              <span >{{ item.value }}-</span>
              <span >{{ item.label }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-form-item class="formItem">
          <el-input v-model="form.premiumRate" :disabled="isEdit" size="small">
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-form-item class="formItem">
          <el-select v-model="form.premiumCurrency" :disabled="premiumRateDisabled" :filter-method="premiumCurrencysFilter" filterable clearable size="small" style="width: 100%">
            <el-option
              v-for="item in premiumCurrencysAll"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              <span style="float: left">{{ item.value }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="杂费"  label-width="70px" class="formItem">
          <el-select v-model="form.incidentalMark" :disabled="isEdit" filterable clearable size="small" @change="isIncidentalRateCurrencyDisabled">
            <el-option v-for="item in options1"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value" >
              <span >{{ item.value }}-</span>
              <span >{{ item.label }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-form-item class="formItem">
          <el-input v-model="form.incidentalRate" :disabled="isEdit" size="small">
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-form-item class="formItem">
          <el-select v-model="form.incidentalCurrency" :disabled="incidentalRateDisabled " :filter-method="incidentalCurrencysFilter" filterable clearable size="small" style="width: 100%">
            <el-option
              v-for="item in incidentalCurrencysAll"
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
      <el-col :span="6">
        <el-form-item label="包装种类" prop="packageType" label-width="110px" class="formItem" required>
          <el-select v-model="form.packageType" :disabled="isEdit" :filter-method="packageTypesFilter" size="small" filterable clearable  style="width: 100%">
            <el-option
              v-for="item in packageTypesAll"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              <span style="float: left">{{ item.value }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="3">
        <el-form-item class="formItem">
          <el-button size="small" style="margin-left: 20px;" type="primary" @click="elsePackaging">其它包装</el-button>
        </el-form-item>
      </el-col>
      <!--其它包装弹出框-->
      <el-dialog ref="otherPackage" title="其它包装" :visible.sync="dialogelsePackagingVisible" width="45%" append-to-body center>
        <el-table id="multipleTable" :disabled="isEdit" :data="elsePackagingTable" stripe height="400px" style="width: 100%">
          <el-table-column  width="55">
            <template slot-scope="scope">
              <el-checkbox :checked="scope.row.ischecked" @change="handleChecked(scope.row.packagingCode)"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column type="index" label="序号" width="90">
          </el-table-column>
          <el-table-column prop="packagingCode" label="包装材料种类代码">
          </el-table-column>
          <el-table-column prop="packagingName" label="包装材料种类名称">
          </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="saveSelectionChange" class="sure" size="small">保 存</el-button>
        </div>
      </el-dialog>
      <el-col :span="5">
        <el-form-item label="毛重（KG)" prop="grossWeight" required label-width="100px" class="formItem">
          <el-input v-model="form.grossWeight" :disabled="isEdit" @change="grossLimit" size="small"/>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="净重（KG）" prop="netWeight" required label-width="100px" class="formItem">
          <el-input v-model="form.netWeight" :disabled="isEdit" @change="netLimit"  size="small"/>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="件数" prop="commodityQuantity" required label-width="70px" class="formItem">
          <el-input v-model="form.commodityQuantity" :disabled="isEdit" @change="commodityQuantityLimit" size="small"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="贸易国别（地区）" prop="tradeCountry" label-width="140px" class="formItem" required>
          <el-select v-model="form.tradeCountry" :disabled="isEdit" :filter-method="tradeCountrysFilter" size="small" filterable clearable style="width: 100%;">
            <el-option
              v-for="item in tradeCountrysAll"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              <span style="float: left">{{ item.value }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="集装箱数"  label-width="100px" class="formItem">
          <el-input v-model="form.containerQuantity"  size="small" disabled/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="随附单证"  label-width="100px" class="formItem">
          <el-input v-model="form.attachDocument"  size="small" disabled/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="离境口岸" prop="exportPort" label-width="110px" class="formItem" required>
          <el-select v-model="form.exportPort" :disabled="isEdit" :filter-method="supplyAreasFilter" size="small" filterable clearable style="width: 100%;">
            <el-option
              v-for="item in supplyAreasAll"
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
        <el-form-item label="货物存放地点"  label-width="100px" class="formItem">
          <el-input v-model="form.storagePlace" :disabled="isEdit" size="small"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="报关单类型" prop="declarationType" label-width="110px" class="formItem" required>
          <el-select v-model="form.declarationType" :disabled="isEdit" size="small" filterable clearable >
            <el-option
              v-for="item in declarationTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              <span >{{ item.value }}-</span>
              <span >{{ item.label }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="备注"  label-width="100px" class="formItem">
          <el-input  size="small" v-model="form.remarkPer" :disabled="isEdit" @change="reChange"/>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <p class="font-size-12" style="line-height: 44px">({{words}}字节)</p>
      </el-col>
      <el-col :span="2">
        <el-form-item class="formItem">
          <el-button size="small" style="margin-left: 20px;" icon="el-icon-more" type="primary" @click="remarkCon"></el-button>
        </el-form-item>
      </el-col>
      <!--...弹出框-->
      <el-dialog title="备注" :visible.sync="dialogremarkConVisible" width="45%" append-to-body>
        <div>
          <el-input v-model="remarkPer" :disabled="isEdit" type="textarea" :rows="7" placeholder="请输入内容" @keyup.enter.native="remarkChange"></el-input>
          <p class="font-size-14" style="float: right;">字数统计：<span style="color: red;">{{words}}</span>字节</p>
        </div>
      </el-dialog>
      <el-col :span="4">
        <el-form-item class="formItem">
          <el-button size="small" style="margin-left: 20px;" type="primary" @click="othersConfirm">其他事项确认</el-button>
        </el-form-item>
      </el-col>
      <!--其他事项确认弹出框-->
      <el-dialog title="其他事项确认" :visible.sync="dialogOthersConfirmVisible" width="700px" append-to-body>
        <el-form :disabled="isEdit">
          <el-form-item label="特殊关系确认"  label-width="300px">
            <el-select v-model="form.relationshipCon" size="small" @change="relationshipConChange">
              <el-option
                v-for="item in isOrNot"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                <span >{{ item.value }}-</span>
                <span >{{ item.label }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="价格影响确认"  label-width="300px">
            <el-select v-model="form.priceCon" size="small" :disabled="isPriceConDisabled">
              <el-option
                v-for="item in isOrNot"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                <span >{{ item.value }}-</span>
                <span >{{ item.label }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="与货物有关的特许权使用费支付确认"  label-width="300px">
            <el-select v-model="form.franchiseFeeCon" size="small">
              <el-option
                v-for="item in isOrNot"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                <span >{{ item.value }}-</span>
                <span >{{ item.label }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogOthersConfirmVisible = false" class="cancel" size="small">取 消</el-button>
          <el-button type="primary" @click="dialogOthersConfirmVisible = false" class="sure" size="small">确 定</el-button>
        </div>
      </el-dialog>
    </el-row>
    <el-row>
      <el-col :span="16">
        <el-form-item label="标记唛码"  label-width="110px" class="formItem" prop="marks" required>
          <el-input size="small" :disabled="isEdit" v-model="form.marks" @change="markChange"/>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <p class="font-size-12" style="line-height: 44px">({{words1}}字节)</p>
      </el-col>
      <el-col :span="2">
        <el-form-item class="formItem">
          <el-button size="small" style="margin-left: 20px;" icon="el-icon-more" type="primary" @click="remarkMark"></el-button>
        </el-form-item>
      </el-col>
      <!--标记唛码弹出框-->
      <el-dialog title="标记唛码" :visible.sync="dialogremarkMarkVisible" width="45%" append-to-body>
        <div>
          <el-input v-model="marks" :disabled="isEdit" type="textarea" :rows="7" placeholder="请输入内容" @keyup.enter.native="remarkMaChange"></el-input>
          <p class="font-size-14" style="float: right;">字数统计：<span style="color: red;">{{words1}}</span>字节</p>
        </div>
      </el-dialog>
      <el-col :span="4">
        <el-form-item class="formItem">
          <el-button size="small" style="margin-left: 20px;" type="primary" @click="bsSelect">业务选择</el-button>
        </el-form-item>
      </el-col>
      <!--业务选择弹出框-->
      <el-dialog title="业务选择" :visible.sync="dialogBsSelectVisible" width="45%" append-to-body center>
        <div>
          <el-checkbox-group class="login-checkbox" v-model="selectBstype" :disabled="isEdit" @change="bsTypeChange">
            <el-checkbox class="checkboxFirst" label="税单无纸化" name="type" />
            <el-checkbox class="checkboxNext" label="自主报税" name="type" />
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
      <el-col :span="24">
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item name="1">
            <template slot="title">
              <i class="el-icon-info font-color-red"></i><span class="font-color-red">   需要报检请点击此处并录入相关信息</span>
            </template>
            <el-form :model="formin" ref="formin" :rules="frominRules" :show-message="false" size="small">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="检验检疫受理机关" prop="inspectionAndQuarantineOrgan" required label-width="150px" class="formItem">
                    <el-select v-model="formin.inspectionAndQuarantineOrgan" :disabled="isEdit" :filter-method="inspectAcceptOrgansFilter" size="small" filterable clearable  style="width: 100%">
                      <el-option
                        v-for="item in inspectAcceptOrgansAll"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        <span style="float: left">{{ item.value }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="企业资质"  label-width="140px" class="formItem">
                    <el-input v-model="formin.qualificationCategoryCode"  size="small" disabled/>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item class="formItem">
                    <el-input v-model="formin.qualificationCategoryName"  size="small" disabled>
                      <el-button circle size="mini" slot="append" icon="el-icon-arrow-left" @click="frontAptitudeInfo" type="primary"></el-button>
                      <el-button round size="mini" slot="append" icon="el-icon-arrow-right" @click="nextAptitudeInfo" type="primary"></el-button>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="1">
                  <el-form-item class="formItem">
                     <el-button circle size="mini" icon="el-icon-more" type="primary" @click="showAptitudeInfo"></el-button>
                    <CompanyAptitudeInfo ref="aptitudeInfo" @listenAptitudeInfo="receiveAptitudeInfo"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="领证机关" prop="certificationAuthority" required label-width="150px" class="formItem">
                    <el-select v-model="formin.certificationAuthority" :disabled="isEdit" :filter-method="certificationAuthoritysFilter" size="small" filterable clearable  style="width: 100%">
                      <el-option
                        v-for="item in certificationAuthoritysAll"
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
                  <el-form-item label="口岸检验检疫机关" prop="portInspectionAndQuarantineOrgan" required  label-width="140px" class="formItem">
                    <el-select v-model="formin.portInspectionAndQuarantineOrgan" :disabled="isEdit" :filter-method="portInspectOrgansFilter" size="small" filterable clearable  style="width: 100%">
                      <el-option
                        v-for="item in portInspectOrgansAll"
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
                  <el-form-item label="目的地检验检疫机关" prop="desInspectionAndQuarantineOrgan" required label-width="150px" class="formItem">
                    <el-select v-model="formin.desInspectionAndQuarantineOrgan" :disabled="isEdit" :filter-method="destiInspectOrgansFilter" size="small" filterable clearable  style="width: 100%">
                      <el-option
                        v-for="item in destiInspectOrgansAll"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        <span style="float: left">{{ item.value }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="关联号码及理由"  label-width="130px" class="formItem">
                    <el-input v-model="formin.associatedNo" :disabled="isEdit" size="small"/>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item class="formItem">
                    <el-select v-model="formin.associatedReasons" :disabled="isEdit" size="small" filterable clearable  style="width: 100%">
                      <el-option
                        v-for="item in associatedReasonsType"
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
                <el-col :span="11">
                  <el-form-item label="特殊业务标识"  label-width="140px" class="formItem">
                    <el-input v-model="formin.specialService"  size="small" disabled/>
                    <Selection ref="selectionInfo" @listenSelectionInfo="receiveSelectionInfo"/>
                  </el-form-item>
                </el-col>
                <el-col :span="1">
                  <el-form-item  class="formItem">
                    <el-button size="mini" circle icon="el-icon-more" type="primary" @click="showSelectionInfo"></el-button>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item class="formItem" label="所需单证	"  label-width="140px">
                    <el-input v-model="formin.QuaranDeclare"  size="small" disabled/>
                    <QuarantineDeclareInfo ref="quaranDeclareInfo" @listenquaranDeclareInfo="receivequaranDeclareInfo"/>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item  class="formItem">
                    <el-button size="small" style="margin-left: 20px;" type="primary" @click="showQuaranDeclareInfo">检验检疫签证申报要素</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>

  </el-form>
</template>

<script type="text/ecmascript-6">
  import CompanyAptitudeInfo from './components/exportCompanyAptitudeInfo'
  import QuarantineDeclareInfo from './components/quarantineDeclareInfo.vue'
  import Selection from './components/specialServiceSelection.vue'
  export default {
    data() {
      //校验规则
      //不能为空
      var isRequiredDeclareCustoms = (rule,value,callback)=>{
        if (value == '' || !value) {
          return callback(this.$notify.error('申报地海关不能为空'));
        }
        else{
          callback()
        }
      }
      var isRequiredExportBorder = (rule,value,callback)=>{
        if (value == '' || !value) {
          return callback(this.$notify.error('出境关别不能为空！'));
        }
        else{
          callback()
        }
      }
      var isRequiredImportDate = (rule,value,callback)=>{
        if (value == '' || !value) {
          return callback(this.$notify.error('进口日期不能为空！'));
        }
        else{
          callback()
        }
      }
      var lengthRecordNo = (rule,value,callback)=>{
        if(value != '' && value != null){
          if(value.length != 12){
            return callback(this.$notify.error('备案号只能为12位！'));
          }
          else{
            callback()
          }
        }
        else{
          callback()
        }
      }
      var isRequiredTeRsCustomsCode = (rule,value,callback)=>{
        if (value == '' || !value) {
          return callback(this.$notify.error('境内收发货人海关代码不能为空！'));
        }
        else if(value.length != 10){
          return callback(this.$notify.error('境内收发货人海关代码只能为10位！'));
        }
        else{
          callback()
        }
      }
      var isRequiredTeRsCreditCode = (rule,value,callback)=>{
        if (value == '' || !value) {
          return callback(this.$notify.error('境内收发货人信用代码不能为空！'));
        }
        else if(value.length != 18){
          return callback(this.$notify.error('境内收发货人信用代码只能为18位！'));
        }
        else{
          callback()
        }
      }
      var isRequiredTeRsComanyName = (rule,value,callback)=>{
        if (value == '' || !value) {
          return callback(this.$notify.error('境内收发货人单位名称不能为空！'));
        }
        else{
          callback()
        }
      }
      var isRequiredTeRsQuarantineCode = (rule,value,callback)=>{
        if(value != '' && value){
          if(value.length != 10){
            return callback(this.$notify.error('境内收发货人检验检疫编码只能为10位！'));
          }
          else{
            callback()
          }
        }
        else{
          callback()
        }
      }
      var isRequiredDecCustomsCode = (rule,value,callback)=>{
        if (value == '' || !value) {
          return callback(this.$notify.error('申报单位海关代码不能为空！'));
        }
        else if(value.length != 10){
          return callback(this.$notify.error('申报单位海关代码只能为10位！'));
        }
        else{
          callback()
        }
      }
      var isRequiredDecCreditCode = (rule,value,callback)=>{
        if (value == '' || !value) {
          return callback(this.$notify.error('申报单位信用代码不能为空！'));
        }
        else if(value.length != 18){
          return callback(this.$notify.error('申报单位信用代码只能为18位！'));
        }
        else{
          callback()
        }
      }
      var isRequiredDecCompanyName = (rule,value,callback)=>{
        if (value == '' || !value) {
          return callback(this.$notify.error('申报单位名称不能为空！'));
        }
        else{
          callback()
        }
      }
      var isRequiredDecQuarantineCode = (rule,value,callback)=>{
        if(value != '' && value){
          if(value.length != 10){
            return callback(this.$notify.error('申报单位检验检疫编码只能为10位！'));
          }
          else{
            callback()
          }
        }
        else{
          callback()
        }
      }
      var isRequiredOvRsComanyName = (rule,value,callback)=>{
        if (value == '' || !value) {
          return callback(this.$notify.error('境外收发货人单位名称不能为空！'));
        }
        else{
          callback()
        }
      }
      var isRequiredPsCustomsCode = (rule,value,callback)=>{
        if (value == '' || !value) {
          return callback(this.$notify.error('生产销售单位海关代码不能为空！'));
        }
        else if(value.length != 10){
          return callback(this.$notify.error('生产销售单位海关代码只能为10位！'));
        }
        else{
          callback()
        }
      }
      var isRequiredPsCreditCode = (rule,value,callback)=>{
        if (value == '' || !value) {
          return callback(this.$notify.error('生产销售单位信用代码不能为空！'));
        }
        else if(value.length != 18){
          return callback(this.$notify.error('生产销售单位信用代码只能为18位！'));
        }
        else{
          callback()
        }
      }
      var isRequiredPsCompanyName = (rule,value,callback)=>{
        if (value == '' || !value) {
          return callback(this.$notify.error('生产销售单位名称不能为空！'));
        }
        else{
          callback()
        }
      }
      var isRequiredPsQuarantineCode = (rule,value,callback)=>{
        if(value != '' && value){
          if(value.length != 10){
            return callback(this.$notify.error('生产销售单位检验检疫编码只能为10位！'));
          }
          else{
            callback()
          }
        }
        else{
          callback()
        }
      }
      var isRequiredTransportMode = (rule,value,callback)=>{
        if (value == '' || !value) {
          return callback(this.$notify.error('运输方式不能为空！'));
        }
        else{
          callback()
        }
      }
      var isRequiredSupervisionMode = (rule,value,callback)=>{
        if (value == '' || !value) {
          return callback(this.$notify.error('监管方式不能为空！'));
        }
        else{
          callback()
        }
      }
      var isRequiredArrivalCountry = (rule,value,callback)=>{
        if (value == '' || !value) {
          return callback(this.$notify.error('运抵国(地区)不能为空！'));
        }
        else{
          callback()
        }
      }
      var isRequiredArrivalPort = (rule,value,callback)=>{
        if (value == '' || !value) {
          return callback(this.$notify.error('指运港不能为空！'));
        }
        else{
          callback()
        }
      }
      var isRequiredDealMode = (rule,value,callback)=>{
        if (value == '' || !value) {
          return callback(this.$notify.error('成交方式不能为空！'));
        }
        else{
          callback()
        }
      }
      var isRequiredPackageType = (rule,value,callback)=>{
        if (value == '' || !value) {
          return callback(this.$notify.error('包装种类不能为空！'));
        }
        else{
          callback()
        }
      }
      var isRequiredTradeCountry = (rule,value,callback)=>{
        if (value == '' || !value) {
          return callback(this.$notify.error('贸易国别(地区)不能为空！'));
        }
        else{
          callback()
        }
      }
      var isRequiredExportPort = (rule,value,callback)=>{
        if (value == '' || !value) {
          return callback(this.$notify.error('离境口岸不能为空！'));
        }
        else{
          callback()
        }
      }
      var isRequiredStoragePlace = (rule,value,callback)=>{
        if (value == '' || !value) {
          return callback(this.$notify.error('货物存放地点不能为空！'));
        }
        else{
          callback()
        }
      }
      var isRequiredOriginPort = (rule,value,callback)=>{
        if (value == '' || !value) {
          return callback(this.$notify.error('启运港不能为空！'));
        }
        else{
          callback()
        }
      }
      var isRequiredDeclarationType = (rule,value,callback)=>{
        if (value == '' || !value) {
          return callback(this.$notify.error('报关单类型不能为空！'));
        }
        else{
          callback()
        }
      }
      var isRequiredMarks = (rule,value,callback)=>{
        if (value == '' || !value) {
          return callback(this.$notify.error('标记唛码不能为空！'));
        }
        else{
          callback()
        }
      }
      var isNumbers = (rule,value,callback)=>{
        if (!value) {
          return callback(this.$notify.error('件数不能为空！'));
        }
        else{
          callback()
        }
      };
      var isNumbersAndCompare = (rule,value,callback)=>{
        if (!value) {
          return callback(this.$notify.error('净重不能为空！'));
        }
        else if (value.length > 14) {
          return callback(this.$notify.error('只能输入14位数字！'));
        }
        else if(this.form.grossWeight < this.form.netWeight){
          return callback(this.$notify.error('净重不能超过毛重！'));
        }
        else{
          callback()
        }
      };
      var isRequiredgrossWeight = (rule,value,callback)=>{
        if (!value) {
          return callback(this.$notify.error('毛重不能为空！'));
        }
        else if (value.length > 14) {
          return callback(this.$notify.error('只能输入14位数字！'));
        }
        else if(this.form.grossWeight < this.form.netWeight){
          return callback(this.$notify.error('净重不能超过毛重！'));
        }
        else{
          callback()
        }
      }
      return {
        currencys: [],
        premiumCurrencysAll:[],
        incidentalCurrencysAll:[],
        freightCurrencysAll:[],
        packageTypes:[],//包装种类
        packageTypesAll:[],
        declareCustoms: [],
        declareCustomsAll:[],
        exportBordersAll:[],
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
        arrivalCountrysAll: [],
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
        dialogFormVisible:false,
        form:{
          remarkPer:'',
          containerQuantity:0,
          attachDocument:'',
          relationshipCon:'',
          priceCon:'',
          franchiseFeeCon:'',
          isPaperless:0,
          isIndependentTax:0,
          isAllSelf:0,
          isGuarantee:0,
          entryPort:'',
          decQuarantineCode:'',
          psQuarantineCode:'',
        },
        //报检相关信息
        formin:{
          specialService:'',
          QuaranDeclare:'',
          inspectionAndQuarantineOrgan:'',
          qualificationCategoryCode:'',
          qualificationCategoryName:'',
          portInspectionAndQuarantineOrgan:'',
          shipmentDate:'',
          blNo:'',
          desInspectionAndQuarantineOrgan:'',
          associatedNo:'',
          associatedReasons:'',
          originalboxTransportation:'',
        },
        ownedEnterpriseId:'',
        isPriceConDisabled:false,
        textarea:'',
        isEdit:false,
        radio:'',
        selectBstype:[],
        elsePackagingTable:[{
          packagingCode:'00',
          packagingName:'散装'
        },{
          packagingCode:'01',
          packagingName:'裸装'
        },{
          packagingCode:'04',
          packagingName:'球状罐类'
        },{
          packagingCode:'06',
          packagingName:'包/袋'
        },{
          packagingCode:'22',
          packagingName:'纸制或纤维板制盒/箱'
        },{
          packagingCode:'23',
          packagingName:'木制或竹藤等植物性材料制盒/箱'
        },{
          packagingCode:'29',
          packagingName:'其他材料制盒/箱'
        },{
          packagingCode:'32',
          packagingName:'纸制或纤维板制桶'
        },{
          packagingCode:'33',
          packagingName:'木制或竹藤等植物性材料制桶'
        },{
          packagingCode:'39',
          packagingName:'其他材料制桶'
        },{
          packagingCode:'92',
          packagingName:'再生木托'
        },{
          packagingCode:'93',
          packagingName:'天然木托'
        },{
          packagingCode:'98',
          packagingName:'植物性铺垫材料'
        },{
          packagingCode:'99',
          packagingName:'其他包装'
        }],
        selection:[],
        packageArray:[],
        otherPackage:'',
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
        options1: [{
          value: '1',
          label: '率'
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
        associatedReasonsType:[{
          value:'1',
          label:'通关单超过有效期'
        },{
          value:'2',
          label:'换证凭单/条超过有效期'
        },{
          value:'3',
          label:'进口复出口'
        },{
          value:'4',
          label:'出口复进口'
        },{
          value:'5',
          label:'出境预检'
        },{
          value:'6',
          label:'登检换证'
        },{
          value:'7',
          label:'与其它报检批拼箱'
        },{
          value:'8',
          label:'保税出库'
        },{
          value:'9',
          label:'进口车辆换证'
        }],
        dialogOthersConfirmVisible:false,
        dialogBsSelectVisible:false,
        dialogremarkConVisible:false,
        dialogviewAttachmentVisible:false,
        dialogremarkMarkVisible:false,//标记唛码弹出框
        dialogelsePackagingVisible:false,//其他包装
        activeName:'0',//报检按钮标记
        words:0,
        markWords:0,
        remarkPer:'',
        marks:'',
        words1:0,
        markWords1:0,
        taxEnterprises:[{
          value:0,
          label:'1-收发货人'
        },{
          value:1,
          label:'2-生产销售单位'
        },{
          value:2,
          label:'3-申报单位'
        }],//纳税单位
        freightRateDisabled:true,
        premiumRateDisabled:true,
        incidentalRateDisabled:true,
        declarationTypes:[
          {value:'0',label:'有纸报关'},
          {value:'D',label:'无纸带清单报关'},
          {value:'L',label:'有纸带清单报关'},
          {value:'M',label:'通关无纸化'},
          {value:'W',label:'无纸报关'}
        ],
        submitFormFlag:false,
        submitForminFlag:false,
        //申报单位
        decCompanyAll:[],
        // decCompanyAll:[{
        //   decCreditCode: '91440608MA512A7U51',
        //   decCustomsCode: '440698400F',
        //   decQuarantineCode: '4400911530',
        //   decCompanyName: '佛山市贸趣众鑫一科技有限公司'
        // },
        //   {
        //     decCreditCode: '91440604193552708T',
        //     decCustomsCode: '4406980007',
        //     decQuarantineCode: '4400910879',
        //     decCompanyName: '佛山市汇联报关有限公司'
        //   }
        // ],
        rules:{
          declareCustoms:[
            { validator: isRequiredDeclareCustoms, trigger: 'blur'}
          ],
          enterBorder:[
            { validator: isRequiredExportBorder, trigger: 'blur'}
          ],
          recordNo:[
            { validator: lengthRecordNo, trigger: 'blur'}
          ],
          teRsCustomsCode:[
            { validator: isRequiredTeRsCustomsCode, trigger: 'blur' }
          ],
          teRsCreditCode:[
            { validator: isRequiredTeRsCreditCode, trigger: 'blur' }
          ],
          teRsComanyName:[
            { validator: isRequiredTeRsComanyName, trigger: 'blur' }
          ],
          teRsQuarantineCode:[
            { validator: isRequiredTeRsQuarantineCode, trigger: 'blur' }
          ],
          decCustomsCode:[
            { validator: isRequiredDecCustomsCode, trigger: 'blur' }
          ],
          decCreditCode:[
            { validator: isRequiredDecCreditCode, trigger: 'blur' }
          ],
          decCompanyName:[
            { validator: isRequiredDecCompanyName, trigger: 'blur' }
          ],
          decQuarantineCode:[
            { validator: isRequiredDecQuarantineCode, trigger: 'blur' }
          ],
          psCustomsCode:[
            { validator: isRequiredPsCustomsCode, trigger: 'blur' }
          ],
          psCreditCode:[
            { validator: isRequiredPsCreditCode, trigger: 'blur' }
          ],
          psCompanyName:[
            { validator: isRequiredPsCompanyName, trigger: 'blur' }
          ],
          psQuarantineCode:[
            { validator: isRequiredPsQuarantineCode, trigger: 'blur' }
          ],
          ovRsComanyName:[
            { validator: isRequiredOvRsComanyName, trigger: 'blur' }
          ],
          transportMode:[
            { validator: isRequiredTransportMode, trigger: 'blur'}
          ],
          storagePlace:[
            { validator: isRequiredStoragePlace, trigger: 'blur'}
          ],
          supervisionMode:[
            { validator: isRequiredSupervisionMode, trigger: 'blur'}
          ],
          tradeCountry:[
            { validator: isRequiredTradeCountry, trigger: 'blur'}
          ],
          originPort:[
            { validator: isRequiredOriginPort, trigger: 'blur' }
          ],
          arrivalCountry:[
            { validator: isRequiredArrivalCountry, trigger: 'blur' }
          ],
          arrivalPort:[
            { validator: isRequiredArrivalPort, trigger: 'blur' }
          ],
          exportPort:[
            { validator: isRequiredExportPort, trigger: 'blur' }
          ],
          packageType:[
            { validator: isRequiredPackageType, trigger: 'blur' }
          ],
          dealMode:[
            { validator: isRequiredDealMode, trigger: 'blur' }
          ],
          declarationType:[
            { validator: isRequiredDeclarationType, trigger: 'blur' }
          ],
          marks:[
            { validator: isRequiredMarks, trigger: 'blur' }
          ],
          commodityQuantity:[
            { validator: isNumbers, trigger: 'blur' }
          ],
          grossWeight:[
            { validator: isRequiredgrossWeight, trigger: 'blur' },
          ],
          netWeight:[
            { validator: isNumbersAndCompare, trigger: 'blur' },
          ]
        },
        frominRules:{
          inspectionAndQuarantineOrgan:[
            { required: true, trigger: 'blur' },
          ]
        }
      }
    },
    //定义组件
    components:{
      CompanyAptitudeInfo,//企业资质信息
      QuarantineDeclareInfo,//检疫检疫签证申报要素
      Selection,//特殊业务标识
    },
    computed:{
      enterpriseQualificationList(){
        return this.$store.state.enterpriseQualificationList;
      }
    },
    activated(){
      setTimeout(()=>{
        this.getInitData();
      },800)
    },
    mounted() {
      this.getDecCompany();//请求申报单位信息
      this.loadStaticData();//请求本地数据
      this.onload();
    },

    methods:{
      onload(){
        var inputArr = document.getElementsByTagName("input");
        for(var i =0 ;i<inputArr.length;i++){
          inputArr[i].index = i;
          inputArr[i].onkeydown = function (e){
            var keyCode = e.which ? e.which : e.keyCode;
            let obj=e.srcElement?e.srcElement:e.target;
            if(keyCode==13 && obj.type!= 'button'){
              console.log(this.index)
              if(this.index === 0){
                inputArr[this.index+5].focus();
              }else if(this.index === 70 || this.index === 67 || this.index === 86 || this.index === 89){
                console.log('not focus')
              }else if(this.index === 19){
                inputArr[this.index+4].focus();
              }else if(this.index === 35 || this.index === 38 || this.index === 41 || this.index === 8 || this.index === 80){
                inputArr[this.index+2].focus();
              }else if(this.index === 47 || this.index === 83){
                inputArr[this.index+3].focus();
              }else{
                inputArr[this.index+1].focus();
              }
            }
          }
        }
      },
      //提交校验
      submitForm() {
        this.$refs.form.validate((valid) => {
          console.log('kk')
          if (valid) {
            this.submitFormFlag = true;
          } else {
            this.submitFormFlag = false;
          }
        });
      },
      submitFormin() {
        this.$refs.formin.validate((valid) => {
          console.log('vv')
          if (valid) {
            this.submitForminFlag = true;
          } else {
            this.submitForminFlag = false;
          }
        });
      },
      //申报单位信息改变
      decCompanyNameChange(val){
        if(val != ''){
          this.decCompanyAll.find((item) =>{
            if(item.decCompanyName == val){
              this.form.decCreditCode = item.decCreditCode;
              this.form.decCustomsCode = item.decCustomsCode;
              this.form.decQuarantineCode = item.decQuarantineCode;
            }
          })
        }
        else {
          this.form.decCreditCode = '';
          this.form.decCustomsCode = '';
          this.form.decQuarantineCode = '';
        }
      },
      //净重、毛重小数位数限制
      grossLimit(){
        if(Number(this.form.grossWeight.match(/^\d+(?:\.\d{0,5})?/))){
          this.form.grossWeight = Number(this.form.grossWeight.match(/^\d+(?:\.\d{0,5})?/))
        }
        else {
          this.form.grossWeight = ''
        }
      },
      netLimit(){
        if(Number(this.form.netWeight.match(/^\d+(?:\.\d{0,5})?/))){
          this.form.netWeight = Number(this.form.netWeight.match(/^\d+(?:\.\d{0,5})?/))
        }
        else {
          this.form.netWeight = ''
        }
      },
      commodityQuantityLimit(){
        if(Number(this.form.commodityQuantity)){
          this.form.commodityQuantity = Number(this.form.commodityQuantity)
        }
        else {
          this.form.commodityQuantity = ''
        }
      },
      //境内收发货人信用代码模糊查询
      devCreditCodeFuzzySearch(query,cb){
        this.$axios3.post('devCreditCodeFuzzySearch',{
          enterpriseCreditCode:this.form.teRsCreditCode
        }).then((res) => {
          cb(res.data.data)
          let resData = res.data.data;
          for(let i in resData){
            resData[i].value = resData[i].enterpriseCreditCode
          }
        }).catch((e) => {
          console.log(e)
        })
      },
      //选择境内收发货人
      selectEnterprise(item){
        this.$axios3.post('/deliveryDetailSearch',{
          deliveryId:item.deliveryId
        }).then((res) => {
          if(res.data.code === 200){
            let resData = res.data.data;
            this.form.teRsCustomsCode = resData.enterpriseCustomsCode;
            this.form.teRsQuarantineCode = resData.enterpriseQuarantineCode;
            this.form.teRsCompanyName = resData.enterpriseName;
            this.form.supervisionMode = resData.supervisionMode;
            this.form.levyNature = resData.exemptionNature;
            this.form.inspectAcceptOrgan = resData.inspectionAndQuarantineOrgan;
            this.form.certificationAuthority = resData.certificationAuthority;
            this.form.portInspectOrgan = resData.portInspectionAndQuarantineOrgan;
            this.form.destiInspectOrgan = resData.desInspectionAndQuarantineOrgan;
            if(resData.enterpriseNature === 1 || resData.enterpriseNature === 2){
              this.form.psCreditCode = resData.enterpriseCreditCode;
              this.form.psCustomsCode = resData.enterpriseCustomsCode
              this.form.psQuarantineCode = resData.enterpriseQuarantineCode
              this.form.psCompanyName = resData.enterpriseName
            }
            this.getInitData()
          }
        }).catch((e) => {
          console.log(e)
        })
      },
      //境外收发货人搜索
      exovRsCodeFuzzySearch(query,cb){
        this.$axios3.post('exOvRsCodeFuzzySearch',{
          ovRsCode:this.form.ovRsCode
        }).then((res) => {
          cb(res.data.data)
          let resData = res.data.data;
          for(let i in resData){
            resData[i].value = resData[i].ovRsCode
          }
        }).catch((e) => {
          console.log(e)
        })
      },
      //选择境外收发货人导入相关信息
      selectOverSeasCustomer(item){
        this.$axios3.post('/exOvCustomerDetailSearch',{
          customerId:item.customerId
        }).then((res) => {
          if(res.data.code === 200){
            let resData = res.data.data;
            this.form.ovRsComanyName = resData.customerName;
            this.form.tradeCountry = resData.tradeCountry;
            this.form.relationshipCon = resData.relationshipCon;
            this.form.priceCon = resData.priceCon;
            this.form.franchiseFeeCon = resData.franchiseFeeCon;
            this.form.arrivalCountry = resData.arrivalCountry;
            this.form.arrivalPort = resData.arrivalPort;
            this.form.exportPort = resData.exportPort;
            this.form.stopOverPort = resData.stopOverPort;
            this.getInitData()
          }
        }).catch((e) => {
          console.log(e)
        })
      },
      othersConfirm(){
        this.dialogOthersConfirmVisible = true;
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
        this.remarkPer = this.form.remarkPer;
        this.dialogremarkConVisible = true;
      },
      reChange(){
        this.remarkPer = this.form.remarkPer;
        if(this.remarkPer !== null && this.remarkPer !== undefined) {
          this.words = this.remarkPer.length;
        }
        else {
          this.words = 0
        }
      },
      remarkChange(){
        this.form.remarkPer = this.remarkPer;
        if(this.form.remarkPer !== null && this.remarkPer !== undefined) {
          this.words = this.form.remarkPer.length;
        }
        else {
          this.words = 0
        }
        this.dialogremarkConVisible = false;
      },
      //其它包装
      elsePackaging(){
        this.dialogelsePackagingVisible = true;
      },
      elsePackagbanding(val){
        this.otherPackage = val;
        console.log(val)
        var rows = [{
          packagingCode:'',
          packagingName:''
        }];
        if(val !== null && val !== undefined){
          var array = val.split("-");
          for(var i = 0; i < array.length; i++){
            var arr = array[i].split('+');
            rows.push({
              packagingCode:arr[0],
              packagingName:arr[1]
            })
          }
        }
        if(rows.length != 0){
          for(let i in rows){
            this.elsePackagingTable.find((item) => {
              if(item.packagingCode === rows[i].packagingCode){
                item.ischecked = true;
                this.packageArray.push(item.packagingCode)
              }
            })
          }
        }
      },
      handleChecked(val){
        var index = this.packageArray.indexOf(val)
        if(index >= 0){
          this.packageArray.splice(index,1)
        }
        else {
          this.packageArray.push(val)
        }
        console.log('选中',this.packageArray)
      },
      saveSelectionChange(){
        this.dialogelsePackagingVisible = false;
        var Arrar = [];
        if(this.packageArray.length != 0){
          for(let i in this.packageArray){
            Arrar[i] = this.elsePackagingTable.find((item) => {
              if(item.packagingCode == this.packageArray[i]){
                return item
              }
            })
          }
        }
        console.log(Arrar)
        if(Arrar != null && Arrar != undefined){
          this.selection = [];
          for(var i = 0; i < Arrar.length; i++){
            this.selection.push(Arrar[i].packagingCode + '+' + Arrar[i].packagingName)
          }
          this.otherPackage = this.selection.join('-');
        }
        console.log(Arrar,'lll',this.otherPackage)
      },
      //标记唛码按钮
      remarkMark(){
        this.marks = this.form.marks;
        this.dialogremarkMarkVisible = true;
      },
      markChange(){
        this.marks = this.form.marks;
        if(this.marks !== null && this.marks !== undefined){
          this.words1 = this.marks.length;
        }
        else{
          this.words1 = 0;
        }
      },
      remarkMaChange(){
        this.form.marks = this.marks;
        if(this.form.marks !== null && this.marks !== undefined){
          this.words1 = this.form.marks.length;
        }
        else{
          this.words1 = 0;
        }
        this.dialogremarkMarkVisible = false;
      },

      //显示企业资质信息
      showAptitudeInfo(){
        this.$refs.aptitudeInfo.showAptitudeInfoDialog(this.formin.enterpriseQualificationList);
      },
      receiveAptitudeInfo(val){
        if(val.length != 0){
          this.formin.qualificationCategoryCode = val[0].qualificationCategoryCode;
          this.formin.qualificationCategoryName = val[0].qualificationCategoryName;
        }
        else {
          this.formin.qualificationCategoryCode = '';
          this.formin.qualificationCategoryName = ''
        }
        this.formin.enterpriseQualificationList = val;
        this.activeName = '0';
        this.activeName = '1';
      },
      nextAptitudeInfo(){
        var index = this.enterpriseQualificationList.findIndex((item)=>
          (item.qualificationCategoryCode == this.formin.qualificationCategoryCode));
        index = index + 1;
        if(index < this.$refs.aptitudeInfo.userTableData.length){
          this.formin.qualificationCategoryCode = this.enterpriseQualificationList[index].qualificationCategoryCode;
          this.formin.qualificationCategoryName = this.enterpriseQualificationList[index].qualificationCategoryName;
        }
        console.log('index',this.formin.qualificationCategoryCode);
        this.activeName = '0';
        this.activeName = '1';
      },
      frontAptitudeInfo(){
        var index = this.enterpriseQualificationList.findIndex((item)=>
          (item.qualificationCategoryCode == this.formin.qualificationCategoryCode));
        console.log(index);
        index = index - 1;
        if(index >= 0){
          this.formin.qualificationCategoryCode = this.enterpriseQualificationList[index].qualificationCategoryCode;
          this.formin.qualificationCategoryName = this.enterpriseQualificationList[index].qualificationCategoryName;
        }
        this.activeName = '0';
        this.activeName = '1';
      },
      //显示检验检疫签证申报要素信息
      showQuaranDeclareInfo(){
        this.$refs.quaranDeclareInfo.isImport = false;
        this.$refs.quaranDeclareInfo.showDeclareInfoDialog(this.formin.elementsQuarantineList);
        this.$refs.quaranDeclareInfo.form.teRsComanyEnName = this.formin.teRsComanyEnName;
        this.$refs.quaranDeclareInfo.form.ovRsComanyCnName = this.formin.ovRsComanyCnName;
        this.$refs.quaranDeclareInfo.form.commodityEnName = this.formin.commodityEnName;
        this.$refs.quaranDeclareInfo.dialogUserVisible = true;
      },
      receivequaranDeclareInfo(val,QuaranDeclare,selection){
        this.formin.elementsQuarantineList = selection;
        this.formin.QuaranDeclare = QuaranDeclare.toString();
        this.formin.teRsComanyEnName = val.teRsComanyEnName;
        this.formin.ovRsComanyCnName = val.ovRsComanyCnName;
        this.formin.ovConsignorAddress = val.ovConsignorAddress;
        this.formin.unloadedDate = val.unloadedDate;
        this.formin.commodityEnName = val.commodityEnName;
        this.activeName = '0';
        this.activeName = '1';
      },
      //显示特殊业务标识
      showSelectionInfo(){
        var selection = [];
        if(this.formin.internationalEvents == 1){
          selection.push('国际赛事')
        }
        if(this.formin.militaryMaterials == 1){
          selection.push('特殊进出军工物资')
        }
        if(this.formin.aidMaterials == 1){
          selection.push('国际援助物资')
        }
        if(this.formin.internationalConference == 1){
          selection.push('国际会议')
        }
        if(this.formin.directClearance == 1){
          selection.push('直通放行')
        }
        if(this.formin.diplomaticCourtesy == 1){
          selection.push('外交礼遇')
        }
        if(this.formin.customsTransit == 1){
          selection.push('转关')
        }
        console.log('selection',selection)
        this.$refs.selectionInfo.showSelectionInfoDialog(selection);
      },
      //接受特殊业务标识数据
      receiveSelectionInfo(val){
        console.log(val.toString());
        this.formin.specialService = val.toString();
        this.activeName = '0';
        this.activeName = '1';
        if(this.isValueInArr(val,'国际赛事')){
          this.formin.internationalEvents = 1;
        }
        else{
          this.formin.internationalEvents = 0;
        }
        if(this.isValueInArr(val,'特殊进出军工物资')){
          this.formin.militaryMaterials = 1;
        }
        else{
          this.formin.militaryMaterials = 0;
        }
        if(this.isValueInArr(val,'国际援助物资')){
          this.formin.aidMaterials = 1;
        }
        else{
          this.formin.aidMaterials = 0;
        }
        if(this.isValueInArr(val,'国际会议')){
          this.formin.internationalConference = 1;
        }
        else{
          this.formin.internationalConference = 0;
        }
        if(this.isValueInArr(val,'直通放行')){
          this.formin.directClearance = 1;
        }
        else{
          this.formin.directClearance = 0;
        }
        if(this.isValueInArr(val,'外交礼遇')){
          this.formin.diplomaticCourtesy = 1;
        }
        else{
          this.formin.diplomaticCourtesy = 0;
        }
        if(this.isValueInArr(val,'转关')){
          this.formin.customsTransit = 1;
        }
        else{
          this.formin.customsTransit = 0;
        }
      },
      //特殊关系确认为否事件
      relationshipConChange(){
        if(this.form.relationshipCon == '0'){
          this.form.priceCon = '0';
          this.isPriceConDisabled = true;
        }else {
          this.isPriceConDisabled = false;
        }
      },
      //业务范围选择
      bsTypeChange(){
        if(this.isValueInArr(this.selectBstype,'税单无纸化')){
          this.form.isPaperless = 1;
        }
        else{
          this.form.isPaperless = 0;
        }
        if(this.isValueInArr(this.selectBstype,'自主报税')){
          this.form.isIndependentTax = 1;
        }
        else{
          this.form.isIndependentTax = 0;
        }
        if(this.isValueInArr(this.selectBstype,'自报自缴')){
          this.form.isAllSelf = 1;
        }
        else{
          this.form.isAllSelf = 0;
        }
        if(this.isValueInArr(this.selectBstype,'担保验放')){
          this.form.isGuarantee = 1;
        }
        else{
          this.form.isGuarantee = 0;
        }
      },
      isValueInArr(arr,value){
        for(let i in arr){
          if(value === arr[i]){
            return true;
          }
        }
        return false;
      },
      //运费
      isFreightRateCurrencyDisabled(item){
        if(item == 1){
          this.freightRateDisabled = true;
        }else {
          this.freightRateDisabled = false;
        }
      },
      freightCurrencyChange(val){
        this.form.freightCurrencyNo = val;
        this.form.freightCurrency = this.currencys.find((item)=>{ return item.value === val }).currencyTitle;
      },
      //保费
      isPremiumRateCurrencyDisabled(item){
        if(item == 1){
          this.premiumRateDisabled = true;
        }else {
          this.premiumRateDisabled = false;
        }
      },
      premiumCurrencyChange(val){
        this.form.premiumCurrencyNo = val;
        this.form.premiumCurrency = this.currencys.find((item)=>{ return item.value === val }).currencyTitle;
      },
      //杂费
      isIncidentalRateCurrencyDisabled(item){
        if(item == 1){
          this.incidentalRateDisabled = true;
        }else {
          this.incidentalRateDisabled = false;
        }
      },
      incidentalCurrencyChange(val){
        this.form.incidentalCurrencyNo = val;
        this.form.incidentalCurrency = this.currencys.find((item)=>{ return item.value === val }).currencyTitle;
      },
      //获取初始数据
      getInitData(){
        this.exportBorderFilter(this.form.exportBorder);
        this.declareCustomFilter(this.form.declareCustoms);
        this.supplyAreasFilter(this.form.exportPort);
        this.tradeCountrysFilter(this.form.tradeCountry);
        this.arrivalCountryFilter(this.form.arrivalCountry);
        this.superviseModesFilter(this.form.supervisionMode);
        this.levyNaturesFilter(this.form.levyNature);
        this.stopOverPortsFilter(this.form.arrivalPort);
        this.certificationAuthoritysFilter(this.formin.certificationAuthority);
        this.destiInspectOrgansFilter(this.formin.desInspectionAndQuarantineOrgan);
        this.inspectAcceptOrgansFilter(this.formin.inspectionAndQuarantineOrgan);
        this.portInspectOrgansFilter(this.formin.portInspectionAndQuarantineOrgan);
        this.dealModeFilter(this.formin.dealMode);
        this.premiumCurrencysFilter(this.formin.premiumCurrency);
        this.incidentalCurrencysFilter(this.formin.incidentalCurrency);
        this.freightCurrencysFilter(this.formin.freightCurrency);
        this.packageTypesFilter(this.formin.packageType);
        this.transportModeFilter(this.formin.transportMode)
      },
      //请求申报单位信息
      getDecCompany(){
        this.$axios10.get('getAllCustomsBroker',{params:{}}).then((res) => {
          if(res.data.state == true){
            this.decCompanyAll = res.data.data
          }
        }).catch((e) => {
          console.log(e)
        })
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
          this.$axios.get('static/pub_domesticport.json'),//离境口岸
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
          this.currencysAll = this.currencys.slice(0,19);
          this.packageTypes = res_packkind.data.RECORDS;
          this.packageTypesAll = this.packageTypes.slice(0,19);
          this.dealModes = res_dealmode.data.RECORDS;
          this.dealModesAll = this.dealModes.slice(0,19);
          this.declareCustoms = res_exportports.data.RECORDS;
          this.declareCustomsAll = this.declareCustoms.slice(0,19);
          this.exportBordersAll = this.declareCustoms.slice(0,19);
          this.transportModes = res_transportmode.data.RECORDS;
          this.transportModesAll = this.transportModes.slice(0,19);
          this.supplyAreas = res_domesticport.data.RECORDS;
          this.supplyAreasAll = this.supplyAreas.slice(0,19);
          this.tradeCountrys = res_countryregion.data.RECORDS;
          this.tradeCountrysAll = this.tradeCountrys.slice(0,19);
          this.arrivalCountrysAll = this.tradeCountrys.slice(0,19);
          this.superviseModes = res_supervisemode.data.RECORDS;
          this.superviseModesAll = this.superviseModes.slice(0,19);
          this.levyNatures = res_levynature.data.RECORDS;
          this.levyNaturesAll = this.levyNatures.slice(0,19);
          this.originPorts = res_transportationport.data.RECORDS;
          this.originPortsAll = this.originPorts.slice(0,19);
          this.stopOverPortsAll = this.originPorts.slice(0,19);
          this.organizations = res_checkout_organization.data.RECORDS;
          this.certificationAuthoritysAll = this.organizations.slice(0,19);
          this.destiInspectOrgansAll = this.organizations.slice(0,19);
          this.inspectAcceptOrgansAll = this.organizations.slice(0,19);
          this.portInspectOrgansAll = this.organizations.slice(0,19);
          this.legalUnits = res_measureunit.data.RECORDS;
          this.legalUnitsAll = this.legalUnits.slice(0,19);
          this.certificateCodes = res_certificatecode.data.RECORDS;
          this.certificateCodesAll = this.certificateCodes;
        })).catch((e) => {
          console.log(e);
        })
      },
      staticDataInit(){
        this.currencysAll = this.currencys.slice(0,19);
        this.packageTypesAll = this.packageTypes.slice(0,19);
        this.dealModesAll = this.dealModes.slice(0,19);
        this.declareCustomsAll = this.declareCustoms.slice(0,19);
        this.exportBordersAll = this.declareCustoms.slice(0,19);
        this.transportModesAll = this.transportModes.slice(0,19);
        this.supplyAreasAll = this.supplyAreas.slice(0,19);
        this.tradeCountrysAll = this.tradeCountrys.slice(0,19);
        this.arrivalCountrysAll = this.tradeCountrys.slice(0,19);
        this.superviseModesAll = this.superviseModes.slice(0,19);
        this.levyNaturesAll = this.levyNatures.slice(0,19);
        this.originPortsAll = this.originPorts.slice(0,19);
        this.stopOverPortsAll = this.originPorts.slice(0,19);
        this.certificationAuthoritysAll = this.organizations.slice(0,19);
        this.destiInspectOrgansAll = this.organizations.slice(0,19);
        this.inspectAcceptOrgansAll = this.organizations.slice(0,19);
        this.portInspectOrgansAll = this.organizations.slice(0,19);
        this.legalUnitsAll = this.legalUnits.slice(0,19);
        this.certificateCodesAll = this.certificateCodes;
      },
      //币制
      premiumCurrencysFilter(query){
        if(query !== '' && query != null){
          this.premiumCurrencysAll = this.currencys.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.premiumCurrencysAll = this.currencys.slice(0,19);
        }
      },
      incidentalCurrencysFilter(query){
        if(query !== '' && query != null){
          this.incidentalCurrencysAll = this.currencys.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.incidentalCurrencysAll = this.currencys.slice(0,19);
        }
      },
      freightCurrencysFilter(query){
        if(query !== '' && query != null){
          this.freightCurrencysAll = this.currencys.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.freightCurrencysAll = this.currencys.slice(0,19);
        }
      },
      //包装种类
      packageTypesFilter(query){
        if(query !== '' && query != null){
          this.packageTypesAll = this.packageTypes.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.packageTypesAll = this.packageTypes.slice(0,19);
        }
      },
      //申报地海关
      declareCustomFilter(query){
        if(query !== '' && query != null){
          this.declareCustomsAll = this.declareCustoms.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.declareCustomsAll = this.declareCustoms.slice(0,19);
        }
      },
      //出境关别
      exportBorderFilter(query){
        if(query !== '' && query != null){
          this.exportBordersAll = this.declareCustoms.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.exportBordersAll = this.declareCustoms.slice(0,19);
        }
      },
      //运输方式
      transportModeFilter(query){
        if(query !== '' && query != null){
          this.transportModesAll = this.transportModes.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.transportModesAll = this.transportModes.slice(0,19);
        }
      },
      //成交方式
      dealModeFilter(query){
        if(query !== '' && query != null){
          this.dealModesAll = this.dealModes.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.dealModesAll = this.dealModes.slice(0,19);
        }
      },
      //入境口岸
      supplyAreasFilter(query){
        if(query !== '' && query != null){
          this.supplyAreasAll = this.supplyAreas.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.supplyAreasAll = this.supplyAreas.slice(0,19);
        }
      },
      //贸易国
      tradeCountrysFilter(query){
        if(query !== '' && query != null){
          this.tradeCountrysAll = this.tradeCountrys.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.tradeCountrysAll = this.tradeCountrys.slice(0,19);
        }
      },
      arrivalCountryFilter(query){
        if(query !== '' && query != null){
          this.arrivalCountrysAll = this.tradeCountrys.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.arrivalCountrysAll = this.tradeCountrys.slice(0,19);
        }
      },
      //监管方式
      superviseModesFilter(query){
        if(query != '' && query != null){
          this.superviseModesAll = this.superviseModes.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.superviseModesAll = this.superviseModes.slice(0,19);
        }
      },
      //征免性质
      levyNaturesFilter(query){
        if(query !== '' && query != null){
          this.levyNaturesAll = this.levyNatures.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.levyNaturesAll = this.levyNatures.slice(0,19);
        }
      },
      //经停港
      stopOverPortsFilter(query){
        if(query !== '' && query != null){
          this.stopOverPortsAll = this.originPorts.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.stopOverPortsAll = this.originPorts.slice(0,19);
        }
      },
      //领证机关
      certificationAuthoritysFilter(query){
        if(query !== '' && query != null){
          this.certificationAuthoritysAll = this.organizations.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.certificationAuthoritysAll = this.organizations.slice(0,19);
        }
      },
      //目的地检验检疫机关
      destiInspectOrgansFilter(query){
        if(query !== '' && query != null){
          this.destiInspectOrgansAll = this.organizations.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.destiInspectOrgansAll = this.organizations.slice(0,19);
        }
      },
      //检验检疫受理机关
      inspectAcceptOrgansFilter(query){
        if(query !== '' && query != null){
          this.inspectAcceptOrgansAll = this.organizations.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.inspectAcceptOrgansAll = this.organizations.slice(0,19);
        }
      },
      //口岸检验检疫机关
      portInspectOrgansFilter(query){
        if(query !== '' && query != null){
          this.portInspectOrgansAll = this.organizations.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.portInspectOrgansAll = this.organizations.slice(0,19);
        }
      },
      //法定单位
      legalUnitsFilter(query){
        if(query !== '' && query != null){
          this.legalUnitsAll = this.legalUnits.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.legalUnitsAll = this.legalUnits.slice(0,19);
        }
      },
      //单证代码
      certificateCodesFilter(query){
        if(query !== '' && query != null){
          this.certificateCodesAll = this.certificateCodes.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.certificateCodesAll = this.certificateCodes.slice(0,19);
        }
      },
    }
  }
</script>

<style scoped>
  .formItem{
    margin: 2px 0 !important;
  }
  .checkboxFirst{
    padding-left: 30px;
    padding-bottom: 20px;
  }
  .checkboxNext{
    padding-bottom: 20px;
  }

</style>
