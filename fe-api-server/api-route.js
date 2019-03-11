/**
 * API 接口路由全部在这里定义
 */

const express = require('express')
const mockjs = require('mockjs')

var router = express.Router()

router.get('/wechat/oauth2/get/user', function(req, res, next) {

  var data = mockjs.mock({
    "data": {
      "id": 7,
      "subscribe": null,
      "openId": "oXL5M1pApcenxiH9gluvrjTTTB2A",
      "nickname": "Schrodinger",
      "sex": 1,
      "language": "zh_CN",
      "city": "石家庄",
      "province": "河北",
      "country": "中国",
      "headImgUrl": "http://thirdwx.qlogo.cn/mmopen/vi_32/icibHCyZDte5IY7HEic2q0N6HQRh5kVJtXkjYtYOn7gmiaD12ZEIObBbkO82hhHLR4Iq889oiajGHAD07raM3xJfxRQ/132",
      "subscribeTime": null,
      "unionId": null,
      "remark": null,
      "groupId": null,
      "subscribeScene": null,
      "qrScene": null,
      "qrSceneStr": null
    },
    "status": "ok",
    "description": "数据请求成功"
  });
  res.json(data)
});


// 获取患者所在护理组
router.get('/1/1/getGroup', function(req, res, next) {
  var data = mockjs.mock({
    data: [
      {crfTemplateId: 1,
        diseaseId: 1,
        evoName: null,
        formName: null,
        id: 1,
        indexTemplateIds: null,
        indexes: null,
        name: "呼吸慢病",
        projectId: 2,
        schemeGroups: null,
        type: "huxi"
      }
    ],
    description: "数据请求成功",
    status: "ok"
  })

  res.json(data)
})

router.post('/wechat/patient/save', function(req, res, next) {

  var data = mockjs.mock({
    "data": {
      "id": 2,
      "openId": "12123",
      "name": "quinn",
      "idcard": "123441",
      "cardType": "1",
      "cardNo": "123123123",
      "xlPatientId": "",
      "xlVisitId": "",
      "patientId": "dfgdgfgg"
    },
    "status": "ok",
    "description": "数据请求成功"
  });
  res.json(data)
});

router.get('/wechat/patient/openid/:openid', function(req, res, next) {
  var data = mockjs.mock({
    "data": {
      "id": 4,
      "openId": "oXL5M1hpQ1Gcuc89MLsYgkLECHYE",
      "name": "sadfsadfsd",
      "idcard": "sdfasdfas",
      "cardType": "1",
      "cardNo": "sadfasdfasdf",
      "xlPatientId": null,
      "xlVisitId": null,
      "patientId": "123123123123s"
    },
    "status": "ok",
    "description": "数据请求成功"
  });
  res.json(data)
});

router.get('/lian/save/corresponding/get', function(req, res, next) {
  var data = mockjs.mock({
    "data": [
      {
        "type": "1",
        "deviceId": "A0180101001107",
        "patientId": "1206"
      },
      {
        "type": "2",
        "deviceId": "A833098236",
        "patientId": "1206"
      }
    ],
    "status": "ok",
    "description": "数据请求成功"
  });
  res.json(data)
});

router.get('/lian/save/data/:patientId', function(req, res, next) {
  var data = mockjs.mock({
    "data": {
      "bloodPressure": {
        "id": 6,
        "highValue": 109,
        "lowValue": 51,
        "typeId": 1,
        "dataId": 50,
        "pulseValue": 82,
        "level": -1,
        "levelName": "偏低"
      },
      "bloodFat": {
        "id": 5,
        "cholValue": 5.1,
        "trigValue": 1.7,
        "hdlValue": 1,
        "ldlValue": 3.3,
        "level": 1,
        "cholLevel": 0,
        "hdlLevel": 0,
        "ldlLevel": 0,
        "trigLevel": 0,
        "typeId": 7,
        "dataId": 59,
        "levelName": "正常",
        "ldlLevelName": "正常",
        "trigLevelName": "正常",
        "cholLevelName": "正常",
        "hdlLevelName": "正常"
      },
      "bodyIndex": {
        "id": 1,
        "bodyFatValue": 19.9,
        "bmi": 22.1,
        "bmr": 1797.8,
        "bodyWater": 57.5,
        "bone": 4.1,
        "skinFat": 12.6,
        "visceralFat": 5.6,
        "muscle": 35.9,
        "level": 0,
        "bodyAge": 30,
        "bmiLevel": 0,
        "typeId": 6,
        "dataId": 41,
        "bmrLevel": 1,
        "bodyWaterLevel": 3,
        "boneLevel": 3,
        "skinFatLevel": 2,
        "visceralFatLevel": 1,
        "muscleLevel": 1,
        "bodyAgeLevel": 3,
        "levelName": "正常",
        "bmiLevelName": "正常",
        "bmrLevelName": "达标",
        "bodyWaterLevelName": "偏高",
        "boneLevelName": "偏高",
        "skinFatLevelName": "标准",
        "visceralFatLevelName": "标准",
        "muscleLevelName": "偏低",
        "bodyAgeLevelName": "大于实际年龄"
      },
      "bloodOxygen": {
        "id": 2,
        "level": 2,
        "spoValue": 95,
        "typeId": 9,
        "dataId": 48,
        "levelName": "正常"
      },
      "ecg": {
        "id": 1,
        "heartRate": 83,
        "leakCount": 0,
        "stopCount": 0,
        "irregularCount": 0,
        "fastCount": 0,
        "slowCount": 0,
        "level": 6,
        "typeId": 10,
        "dataId": 39,
        "filteredEcgPoints": "",
        "levelName": "窦性心动正常"
      },
      "skinIndex": {
        "id": 3,
        "waterPercent": 46.9231,
        "oilPercent": 21.317,
        "level": 0,
        "bodyPart": 1,
        "waterPercentLevel": 2,
        "oilPercentLevel": 1,
        "typeId": 13,
        "dataId": 44,
        "waterPercentLevelName": "正常",
        "oilPercentLevelName": "湿润"
      },
      "temperature": {
        "id": 1,
        "bodyTemperature": 36.8835,
        "typeId": 14,
        "dataId": 40,
        "level": 1,
        "levelName": "正常"
      }
    },
    "status": "ok",
    "description": "数据请求成功"
  });
  res.json(data)
});


router.get('/lian/save/corresponding/save', function(req, res, next) {
  var data = mockjs.mock({
    "data": [

    ],
    "status": "ok",
    "description": "数据请求成功"
  });
  res.json(data)
});

// ---------------- HealthyIndexPage ------------------- //
/**
 * 获取健康指标历史数据
 */
router.get(`/lian/save/historicalrecord/get`, (req, res, next) => {
  var data = mockjs.mock({
    data: `[{"time": "2019-02-21" ,"id":1,"level":2,"spoValue":96,"typeId":9,"dataId":4,"levelName":"正常"},
          {"time": "2019-02-21" ,"id":2,"level":2,"spoValue":96,"typeId":9,"dataId":8,"levelName":"正常"},
          {"time": "2019-02-21" ,"id":3,"level":2,"spoValue":96,"typeId":9,"dataId":9,"levelName":"正常"},
                {"time": "2019-02-21" ,"id":4,"level":2,"spoValue":96,"typeId":9,"dataId":20,"levelName":"正常"}]`,
    status: "ok",
    description: "数据请求成功"
  })

  res.json(data)
})
/**
 * 获取日历和 healthIndex 页打卡用数据
 * @qureyParam pid: 患者 Id
 * @qureyParam begin<timestamp>: 开始时间
 * @qureyParam end<timestamp>: 结束时间
 */
router.get(`/:diseaseId/:projectId/wechat/interviews`, (req, res, next) => {
  var data = mockjs.mock({
    data: [
      {
        "waiting":[
          {
           label:'未完成1',
           status:'waiting',
           timeStamps:[
           ]
          },{
            label:'未完成2',
            status:'waiting',
            timeStamps:[
            ]
          },
        ],
        "finish":[
          {
            label: '已完成1',
            status:'finish',
            timeStamps:[
            ]
          }
        ]
      }
    ],
    status: "ok",
    description: "数据请求成功"
  })

  res.json(data)
})


// ---------------- HealthyRecordListPage --------------- //
router.get(`/:groupId/patient/wechat/schemes`, (req, res, next) => {
  var data = mockjs.mock({
    data: {
      id: 3,
      schemeGroupName: "哮喘",
      type: null,
      nurseSchemes: [{
        id: 6,
        name: "哮喘基线信息",
        type: "special",
        crfTemplateId: 4,
        nurseGroupId: 1,
        sort: 3,
        flag: "",
        schemeTemplate: {
          id: 6,
          type: "evo",
          name: "哮喘基线信息",
          schemeMaterials: [{
            id: 6,
            materialName: "哮喘症状",
            type: "evo",
            sort: 3,
            searchName: "哮喘症状|xiaochuanzhengzhuang|xczz",
            uuId: null,
            dateId: null,
            dateName: null,
            dateValue: null,
            timeValue: "100",
            timeName: "次"
          }],
          result: null
        },
        healthPlans: [{
          id: 2,
          interviews: [{
            id: 4,
            name: "哮喘症状",
            createTime: "2019-02-14 10:36:33",
            executeTime: null,
            actualTime: "2019-02-14 10:37:22",
            type: null,
            status: "已执行",
            statusCode: "finish",
            pid: "2",
            diseaseId: null,
            projectId: null,
            nurseGroupId: 1,
            crfTemplateId: 4,
            planId: 2,
            data: null,
            result: null
          }],
          relationId: 2,
          schemeId: 6,
          executeTime: "2019-02-14",
          finishTime: null,
          pid: "2",
          timePointType: null,
          timeValue: "100",
          timePoint: null
        }]
      },
      {
        id: 6,
        name: "哮喘基线信息",
        type: "special",
        crfTemplateId: 4,
        nurseGroupId: 1,
        sort: 3,
        flag: "",
        schemeTemplate: {
          id: 6,
          type: "evo",
          name: "哮喘基线信息2",
          schemeMaterials: [{
            id: 6,
            materialName: "哮喘症状2",
            type: "evo",
            sort: 3,
            searchName: "哮喘症状|xiaochuanzhengzhuang|xczz",
            uuId: null,
            dateId: null,
            dateName: null,
            dateValue: null,
            timeValue: "100",
            timeName: "次"
          },
          {
            id: 6,
            materialName: "哮喘症状1",
            type: "evo",
            sort: 3,
            searchName: "哮喘症状|xiaochuanzhengzhuang|xczz",
            uuId: null,
            dateId: null,
            dateName: null,
            dateValue: null,
            timeValue: "100",
            timeName: "次"
          }],
          result: null
        },
        healthPlans: [{
          id: 2,
          interviews: [{
            id: 4,
            name: "哮喘症状",
            createTime: "2019-02-14 10:36:33",
            executeTime: null,
            actualTime: "2019-02-14 10:37:22",
            type: null,
            status: "已执行",
            statusCode: "finish",
            pid: "2",
            diseaseId: null,
            projectId: null,
            nurseGroupId: 1,
            crfTemplateId: 4,
            planId: 2,
            data: null,
            result: null
          }],
          relationId: 2,
          schemeId: 6,
          executeTime: "2019-02-14",
          finishTime: null,
          pid: "2",
          timePointType: null,
          timeValue: "100",
          timePoint: null
        }]
      }],
    },
    status: "ok",
    description: "数据请求成功"
  })

  res.json(data)
})


module.exports =  router
