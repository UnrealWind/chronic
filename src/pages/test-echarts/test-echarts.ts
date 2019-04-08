import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import { ApiServiceProvider} from "../../providers/api-service/api-service";
import * as $ from 'jquery'

@IonicPage({
  segment:"test-echarts",
})

@Component({
  selector: 'page-test-echarts',
  templateUrl: 'test-echarts.html',
})
export class TestEchartsPage {
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public Http:HttpClient,
              private ApiService: ApiServiceProvider) {

  }

  ionViewDidLoad() {
    sessionStorage.setItem('patientId','"xxxxx193210251655"');
    this.init();
  }

  init(){
    var that = this;
    this.ApiService.getHealthyView().then(function (msg) {
      that.draw(msg);
    });

  }

  draw(chartData) {
    require(['echarts','echarts/chart/map'],function(echarts1 , map){
      require('echarts/util/mapData/params').params.bodyMale = {
        getGeoJson: function (callback) {
          $.ajax({
            url: "./assets/plugin/svg/body-male.svg",
            dataType: 'xml',
            success: function(xml) {
              callback(xml)
            }
          });
        }
      };
      require('echarts/util/mapData/params').params.bodyFemale = {
        getGeoJson: function (callback) {
          $.ajax({
            url: "./assets/plugin/svg/body-female.svg",
            dataType: 'xml',
            success: function(xml) {
              callback(xml)
            }
          });
        }
      }

      var myChart = echarts1.init(document.getElementById('test'))
      var mapType = 'bodyMale'
      var opt = {
        title : {
          text : '',
          subtext: '',
          x:'center',
          y:'top'
        },
        roamController:{
          show:false
        },
        tooltip:{
          show:false
        },
        dataRange: {
          show:false,
          min: 0,
          max: 100,
          x: 'center',
          y: 'center',
          tdext:['High','Low'],
          calculable : true,
          itemHeight:30,
          color: ['#ff3333','orange','#bfe583']
        },
        series : [
          {
            name: '分析图',
            type: 'map',
            mapType: mapType, // 自定义扩展图表类型
            mapLocation: {
              x:'left'
            },
            roam:false,  //禁止拖动和缩放
            hoverable:false, //禁止hover
            itemStyle:{
              normal:{label:{show:true}},
              emphasis:{label:{show:true}}
            },
            data: chartData.series,
            textFixed : {
              '上肢' : [-60, 0]
            },
            markPoint : {
              data :
              chartData.markPointData,
              tooltip:{
                show:true,
                tigger:'axis',
                formatter: function(data,params){
                  if(data.data.discribe){
                    var str = data.data.discribe;
                    var html = "";
                    for (var i = 0 ,n = str.length; i < n; i++) {
                      if((i+1)%10){
                        html += str[i];
                      }else{
                        html += "<br />" +str[i];
                      }
                    }
                    return html
                  }
                }
              }
            },
            markLine : {
              tooltip:{
                show:false
              },
              // smooth:true,
              itemStyle : {
                normal: {
                  borderWidth:2,
                  color: "#834CF9",
                  lineStyle: {
                    type: 'solid'
                  }
                }
              },
              data :chartData.markLinkData
            }
          }
        ]
      };
      myChart.setOption(opt);
    })

  }

}
