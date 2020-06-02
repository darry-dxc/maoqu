import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/WebPortals',
      redirect: "/WebPortals/HomePage",
      name: '门户网站',
      component: resolve => require(['./../views/webPortals/webPortals.vue'],resolve),
      children:[{
        path: 'HomePage',
        name: '首页',
        component: resolve => require(['./../views/webPortals/homePage.vue'],resolve),
      },{
        path: 'TreasurePage',
        name: '百宝箱',
        component: resolve => require(['./../views/webPortals/treasurePage.vue'],resolve)
      },
        {
          path: 'ServePage',
          name: '服务生态圈',
          component: resolve => require(['./../views/webPortals/servePage.vue'],resolve)
        },
        {
          path: 'TradeInfoPort',
          name: '外贸信息港',
          component: resolve => require(['./../views/webPortals/tradeInfoPort.vue'],resolve)
        },
        {
          path: 'AboutUs',
          name: '关于我们',
          component: resolve => require(['./../views/webPortals/aboutUs.vue'],resolve)
        },
        {
          path: 'RegisterClause',
          name: '注册条款',
          component: resolve => require(['./../views/webPortals/registerClause.vue'],resolve)
        },
        {
          path: 'RegisterType',
          name: '注册类型',
          component: resolve => require(['./../views/webPortals/registerType.vue'],resolve)
        },
        {
          path: 'LoginIndividual',
          name: '个人注册',
          component: resolve => require(['./../views/webPortals/loginIndividual.vue'],resolve)
        },
        {
          path: 'LoginEnterprise',
          name: '企业注册',
          component: resolve => require(['./../views/webPortals/loginEnterprise.vue'],resolve)
        },
        {
          path: 'Login',
          name: '登录',
          component: resolve => require(['./../views/webPortals/loginNew.vue'],resolve),
        },
        {
          path: 'LoginNew',
          name: '登录1',
          component: resolve => require(['./../views/webPortals/loginNew.vue'],resolve),
        },
        {
          path: 'PassWordBack',
          name: '忘记密码',
          component: resolve => require(['./../views/webPortals/passwordBack.vue'],resolve)
        },]
    },
    //企业平台
    {
      path: '/WebCompany',
      name: '企业平台',
      redirect: "/WebCompany/CompanyMainCon",
      component: resolve => require(['./../views/webCompany/companyMain.vue'],resolve),
      children: [
        {
          path: 'CompanyMainCon',
          name: '企业中心主页',
          icon:'el-icon-ump-zhuye',
          component: resolve => require(['./../views/webCompany/companyMainCon.vue'],resolve),
          meta: {
            keepAlive: true,
            requireAuth: true
          }
        },
        {
          path: 'BusinessManage',
          name: '业务管理',
          icon:'el-icon-ump-yewu',
          component: resolve => require(['./../views/webCompany/businessManagement'],resolve),
          meta: {
            keepAlive: true,
            requireAuth: true
          },
          children:[
            {
              path: 'ImportBs',
              name: '进口业务',
              icon: 'el-icon-ump-jinkou1',
              component: resolve => require(['./../views/webCompany/businessManage/importBs'],resolve),
              meta: {
                keepAlive: true,
                requireAuth: true
              },
            },{
              path:'ImportBs/imService',
              component: resolve => require(['./../views/webCompany/businessManage/component/importService'],resolve),
              meta: {
                keepAlive: true,
                requireAuth: true
              },
            },{
              path:'ImportBs/imBsDetail',
              component: resolve => require(['./../views/webCompany/businessManage/component/importBsDetail'],resolve),
              meta: {
              keepAlive: true,
                requireAuth: true
              },
            }, {
              path: 'ExportBs',
              name: '出口业务',
              icon:'el-icon-ump-chukoucaozuo',
              component: resolve => require(['./../views/webCompany/businessManage/exportBs.vue'],resolve),
              meta: {
                keepAlive: true,
                requireAuth: true
              }
            },{
              path:'ExportBs/exService',
              component: resolve => require(['./../views/webCompany/businessManage/component/exportService'],resolve),
              meta: {
                keepAlive: true,
                requireAuth: true
              },
            },{
              path:'ExportBs/exBsDetail',
              component: resolve => require(['./../views/webCompany/businessManage/component/exportBsDetail'],resolve),
              meta: {
                keepAlive: true,
                requireAuth: true
              },
            }
          ]
        },
        {
          path: 'SuperCalendar',
          name: '超级日程表',
          icon:'el-icon-ump-richengbiao',
          component: resolve => require(['./../views/webCompany/SuperCalendar'],resolve),
          meta: {
            keepAlive: true,
            requireAuth: true
          }
        },
        {
          path: 'CommodityManIfo',
          name: '商品管理',
          icon:'el-icon-ump-guanli',
          component: resolve => require(['../views/webCompany/commodityManage.vue'],resolve),
          meta: {
            keepAlive: true,
            requireAuth: true
          }
        },
        {
          path: 'ShippingQuery',
          name: '航运查询',
          icon:'el-icon-ump-hangyunwuliu',
          component: resolve => require(['./../views/webCompany/ShippingQuery'],resolve),
          meta: {
            keepAlive: true,
            requireAuth: true
          }
        },
        {
          path: 'EnterpriseManage',
          name: '企业管理',
          icon:'el-icon-ump-qiyeguanli',
          component: resolve => require(['./../views/webCompany/enterpriseManagement'],resolve),
          meta: {
            keepAlive: true,
            requireAuth: true
          },
          children:[{
            path: 'EnterNorUnitIfo',
            name: '境内收发货人',
            icon:'el-icon-ump-danwei',
            component: resolve => require(['./../views/webCompany/deliveryEnterpriseInfo.vue'],resolve),
            meta: {
              keepAlive: true,
              requireAuth: true
            }
          },{
            path: 'EnterForeClientIfo',
            name: '境外收发货人',
            icon:'el-icon-ump-kehu',
            component: resolve => require(['./../views/webCompany/overseasCustomer.vue'],resolve),
            meta: {
              keepAlive: true,
              requireAuth: true
            }
          },{
            path: 'ServicerInfo',
            name: '服务商信息',
            icon:'el-icon-ump-fuwushang',
            component: resolve => require(['./../views/webCompany/ServicerInfo.vue'],resolve),
            meta: {
              keepAlive: true,
              requireAuth: true
            }
          }]
        },
        {
          path: 'ToolBox',
          name: '工具箱',
          icon:'el-icon-ump-gongjuxiang',
          component: resolve => require(['./../views/webCompany/ToolBox.vue'],resolve),
          meta: {
            keepAlive: true,
            requireAuth: true
          }
        },
        {
          path: 'EnterpriseCenter',
          name: '企业中心',
          icon:'el-icon-ump-qiyezhongxin',
          component: resolve => require(['./../views/webCompany/enterpriseCenter.vue'],resolve),
          meta: {
            keepAlive: true,
            requireAuth: true
          },
          children:[{
            path: 'EnterDocumentManage',
            name: '资料管理',
            icon:'el-icon-ump-ziliaoguanli',
            component: resolve => require(['./../views/webCompany/enterDocumentManage.vue'],resolve),
            meta: {
              keepAlive: true,
              requireAuth: true
            }
          },{
            path: 'AccountSafe',
            name: '账户安全',
            icon:'el-icon-ump-zhanghuanquan',
            component: resolve => require(['./../views/webCompany/accountSafe.vue'],resolve),
            meta: {
              keepAlive: true,
              requireAuth: true
            }
          },{
            path: 'SuggestionFeedback',
            name: '反馈意见',
            icon:'el-icon-ump-yijianguanli',
            component: resolve => require(['./../views/webCompany/suggestionFeedback.vue'],resolve),
            meta: {
              keepAlive: true,
              requireAuth: true
            }
          },{
            path: 'SubAccountManage',
            name: '子账户管理',
            icon:'el-icon-ump-zizhanghu',
            component: resolve => require(['./../views/webCompany/SubAccountManage.vue'],resolve),
            meta: {
              keepAlive: true,
              requireAuth: true
            }
          },]
        },
        {
          path: 'ServiceEcoSystem',
          name: '服务生态圈',
          icon:'el-icon-ump-shengtaiquan',
          component: resolve => require(['./../views/webCompany/serviceEcoSystem.vue'],resolve),
          meta: {
            keepAlive: true,
            requireAuth: true
          },
          children:[{
            path: 'ServiceQuery',
            name: '服务查询',
            component: resolve => require(['./../views/webCompany/ServiceQuery.vue'],resolve),
            icon:'el-icon-document',
            meta: {
              keepAlive: true,
              requireAuth: true
            }
            },{
              path: 'PostContent',
              name: '发布内容',
              component: resolve => require(['./../views/webCompany/serviceEcosystem/postContent.vue'],resolve),
              icon:'el-icon-ump-fabu',
              meta: {
                keepAlive: true,
                requireAuth: true
              }
            }]
          },
        {
          path: 'MoreTrade',
          name: '贸趣社',
          icon:'el-icon-ump-shequ',
          component: resolve => require(['./../views/webCompany/MoreTrade.vue'],resolve),
          meta: {
            keepAlive: true,
            requireAuth: true
          }
        }
      ]
      },
      //管理员平台
      {
      path: '/WebManage',
      name: '管理员',
      component: resolve => require(['./../views/webManager/manageMain.vue'],resolve),
      children: [
        {
          path: 'UserManage',
          name: '用户管理',
          component: resolve => require(['./../views/webManager/userManage.vue'],resolve),
          meta: {
            keepAlive: true,
            requireAuth: true
          }
        },
         {
          path: 'ManageIdea',
          name: '意见管理',
          component: resolve => require(['./../views/webManager/manageIdea.vue'],resolve),
           meta: {
             keepAlive: true,
             requireAuth: true
           }
        },
        {
          path: 'ManageService',
          name: '客服管理',
          component: resolve => require(['./../views/webManager/manageService.vue'],resolve),
          meta: {
            keepAlive: true,
            requireAuth: true
          }
        },
         {
          path: 'DataBackup',
          name: '数据安全备份',
          component: resolve => require(['./../views/webManager/dataBackup.vue'],resolve),
           meta: {
             keepAlive: true,
             requireAuth: true
           }
        },
        {
          path: 'LimitManage',
          name: '权限管理',
          component: resolve => require(['./../views/webManager/limitManage.vue'],resolve),
          meta: {
            keepAlive: true,
            requireAuth: true
          }
        },
        {
          path: 'PersonCenter',
          name: '个人中心',
          component: resolve => require(['./../views/webManager/personCenter.vue'],resolve),
          meta: {
            keepAlive: true,
            requireAuth: true
          }
        },
        {
          path: 'CheckDocuments',
          name: '单证审核',
          component: resolve => require(['./../views/webManager/documentReview.vue'],resolve),
          meta: {
            keepAlive: true,
            requireAuth: true
          }
        },
        {
          path: 'SystemLog',
          name: '系统日志',
          component: resolve => require(['./../views/webManager/systemLog.vue'],resolve),
          meta: {
            keepAlive: true,
            requireAuth: true
          }
        },{
          path: 'ContentLog',
          name: '内容日志',
          component: resolve => require(['./../views/webManager/ContentLog.vue'],resolve),
          meta: {
            keepAlive: true,
            requireAuth: true
          }
        },
        {
          path: 'SystemReport',
          name: '系统报表',
          component: resolve => require(['./../views/webManager/SystemReport.vue'],resolve),
          meta: {
            keepAlive: true,
            requireAuth: true
          }
        },
        {
          path: 'UserQuery',
          name: '业务查询',
          component: resolve => require(['./../views/webManager/userQuery.vue'],resolve),
          meta: {
            keepAlive: true,
            requireAuth: true
          }
        },
      ]
      },
      //个人平台
      {
      path: '/PersonMain',
      name: '个人平台',
      component: resolve => require(['./../views/webPersonal/personMain.vue'],resolve),
      children: [
        {
          path: '/PersonMainCon',
          name: '个人中心主页',
          component: resolve => require(['./../views/webPersonal/personMainCon.vue'],resolve),
          meta: {
            keepAlive: true,
            requireAuth: true
          }
        },
         {
          path: '/personExportBs',
          name: '出口业务',
          component: resolve => require(['../views/webPersonal/exportBs.vue'],resolve),
           meta: {
             keepAlive: true,
             requireAuth: true
           }
        },
        {
          path: '/personImportBs',
          name: '进口业务',
          component: resolve => require(['../views/webPersonal/ImportBusiness.vue'],resolve),
          meta: {
            keepAlive: true,
            requireAuth: true
          }
        },
        {
          path: '/DataQuery',
          name: '数据查询',
          component: resolve => require(['./../views/webPersonal/businessManage/dataQuery.vue'],resolve),
          meta: {
            keepAlive: true,
            requireAuth: true
          }
        },
        // {
        //   path: '/Retransmission',
        //   name: '重传/修补信息',
        //   component: resolve => require(['./../views/webPersonal/businessManage/retransmission.vue'],resolve),
        //   meta: {
        //     keepAlive: true
        //   }
        // },
        //  {
        //   path: '/AmendOrder',
        //   name: '修撤单',
        //   component: resolve => require(['./../views/webPersonal/amendOrder/amendOrder.vue'],resolve),
        //    meta: {
        //      keepAlive: true
        //    }
        // },
        {
          path: '/SuperCalendarPerson',
          name: '超级日程表',
          component: resolve => require(['../views/webPersonal/SuperCalendar.vue'],resolve),
          meta: {
            keepAlive: true,
            requireAuth: true
          }
        },
        {
          path: '/ToolBoxPerson',
          name: '工具箱',
          component: resolve => require(['../views/webPersonal/ToolBox.vue'],resolve),
          meta: {
            keepAlive: true,
            requireAuth: true
          }
        },
        {
          path: '/ShippingQueryPerson',
          name: '航运查询',
          component: resolve => require(['../views/webPersonal/ShippingQuery.vue'],resolve),
          meta: {
            keepAlive: true,
            requireAuth: true
          }
        },
        {
          path: '/ServiceEcosystemPerson',
          name: '服务生态圈',
          component: resolve => require(['../views/webPersonal/ServiceEcosystem.vue'],resolve),
          meta: {
            keepAlive: true,
            requireAuth: true
          }
        },
        {
          path: '/TradeInfoPerson',
          name: '外贸信息港',
          component: resolve => require(['../views/webPersonal/TradeInfo.vue'],resolve),
          meta: {
            keepAlive: true,
            requireAuth: true
          }
        },
        {
          path: '/MoreTradePerson',
          name: '贸趣社',
          component: resolve => require(['../views/webPersonal/MoreTrade.vue'],resolve),
          meta: {
            keepAlive: true,
            requireAuth: true
          }
        },
        {
          path: '/PersonSuggestFeedback',
          name: '反馈意见',
          component: resolve => require(['./../views/webPersonal/personSuggestFeedback.vue'],resolve),
          meta: {
            keepAlive: true,
            requireAuth: true
          }
        },
        {
          path: '/PersonDocumentManage',
          name: '个人资料管理',
          component: resolve => require(['./../views/webPersonal/personDocumentManage.vue'],resolve),
          meta: {
            keepAlive: true,
            requireAuth: true
          }
        },
        {
          path: '/AccountSafe1',
          name: '个人账户安全',
          component: resolve => require(['./../views/webPersonal/accountSafe.vue'],resolve),
          meta: {
            keepAlive: true,
            requireAuth: true
          }
        },
      ]},
    {
      path:'/',
      redirect: {name:'首页'},
    },
    // {
    //   path:'*',
    //   redirect: {name:'首页'},
    // },
  ]
})
