import { Component, ChangeDetectionStrategy,ViewChild,TemplateRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs/Subject';
import { CalendarEvent,CalendarEventAction,CalendarEventTimesChangedEvent } from 'angular-calendar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { colors } from '../../components/demo-utils/colors';

// sessionStorage
import { SessionStorageProvider } from "../../providers/session-storage/session-storage";
import { ApiServiceProvider } from "../../providers/api-service/api-service";
import { UtilsProvider } from "../../providers/utils/utils"

// 引入返回数据的类型定义
import { common } from '../../api-data-struc/api-data-struc'

//变成中文
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/zh';
registerLocaleData(localeEs);



@IonicPage()
@Component({
  selector: 'page-plan-detail',
  templateUrl: 'plan-detail.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    UtilsProvider
  ]
})
export class PlanDetailPage{

  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: string = 'month';

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private modal: NgbModal,
    public api: ApiServiceProvider,
    private utils: UtilsProvider,
    private ss: SessionStorageProvider,
    public viewCtrl: ViewController) {

  }

  ionViewDidEnter() {
    // 获取当月第一天和最后一天
    var monthRange = this.getCurrMonRange()

    // 获取日历和 healthIndex 页打卡用数据
    this.getPlan(monthRange.firstDay, monthRange.lastDay)
  }

  ionViewDidLeave() {
    // 清除缓存数据
    this.events = []

    this.showTabBar()
  }

  ionViewWillEnter() {
    this.hideTabBar()
  }


  subDays(days){
    return days*24*60*60*1000
  };

  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [
    // 示例数据格式
    // {
    //   start: subDays(startOfDay(new Date()), 1),
    //   end: addDays(new Date(), 1),
    //   title: '呼吸操锻炼',
    //   color: colors.green,
    //   //actions: this.actions
    // },
    // {
    //   start: subDays(startOfDay(new Date()), 1),
    //   end: addDays(new Date(), 1),
    //   title: '某种吸入剂',
    //   color: colors.green
    // }
  ];

  activeDayIsOpen: boolean = true;

  /**
   * 获取当前月的第一天和最后一天
   * @return firstDay: 第一天
   *         lastDay: 最后一天
   */
  getCurrMonRange() {
    // 本月第一天的时间戳
    var firstDayStamp = this.utils.getMonthAbt.firstDay()
    // 本月最后一天时间戳
    var lastDayStamp = this.utils.getMonthAbt.lastDay()
    // 本月第一天格式化
    var firstDayFormated: string = this.utils.formatDate(firstDayStamp, 'yyyy-MM-dd')
    // 本月最后一天格式化
    var lastDayFormated: string = this.utils.formatDate(lastDayStamp, 'yyyy-MM-dd')

    return {
      firstDay: firstDayFormated,
      lastDay: lastDayFormated
    }
  }


  /**
   * 获取日历和 healthIndex 页打卡用数据
   * @qureyParam begin<yyyy-MM-dd>: 开始时间
   * @qureyParam end<yyyy-MM-dd>: 结束时间
   */
  getPlan(begin: string, end: string) {
    var patientId = this.ss.get('patientId')

    this.api.healthIndex.getPlan(patientId, begin, end)
        .subscribe((msg: common) => {
          this.fillCalender(msg['data'])
        })
  }

  /**
   * 填充日历
   */
  fillCalender(orgData) {
    // 已完成
    orgData.finish.forEach((single) => {
      single.timeStamps.forEach((time) => {
        this.events.push({
          start: time,
          end: time,
          title: single.label,
          color: colors.green,
        })
      })
    })

    // 未完成
    orgData.waiting.forEach((single) => {
      single.timeStamps.forEach((time) => {
        this.events.push({
          start: time,
          end: time,
          title: single.label,
          color: colors.red,
        })
      })
    })
    this.refresh.next();
  }




  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd
                    }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    // this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }

  back = function(){
    this.navCtrl.pop();
  }

  /**
   * 隐藏 tab 栏
   */
  hideTabBar(): void {
    var _tabNativeEle = this.viewCtrl._nav.parent._tabbar.nativeElement
    _tabNativeEle['hidden'] = true
  }

  /**
   * 显示 tab 栏
   */
  showTabBar(): void {
    var _tabNativeEle = this.viewCtrl._nav.parent._tabbar.nativeElement
    _tabNativeEle['hidden'] = false
  }

}
