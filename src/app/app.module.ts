import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { LocationStrategy,PathLocationStrategy} from '@angular/common';

import { Interceptor} from "../providers/http-interceptor/http-interceptor";
import { NotifyModule } from 'ngx-notify';

import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { PageErrorPage} from "../pages/page-error/page-error";
import { BindUserPage} from "../pages/bind-user/bind-user";
import { HealthyIndexPage} from "../pages/healthy-index/healthy-index";
import { HealthyRecordPage} from "../pages/healthy-record/healthy-record";
import { HealthyInputPage} from "../pages/healthy-input/healthy-input";
import { UserInfoPage} from "../pages/user-info/user-info";
import { TimeClockPage} from "../pages/time-clock/time-clock";
import { HealthyRecordListPage} from "../pages/healthy-record-list/healthy-record-list";
import { PlanDetailPage} from "../pages/plan-detail/plan-detail";
import { HealthyRecordDetailPage} from "../pages/healthy-record-detail/healthy-record-detail";
import { CheckDetailPage} from "../pages/check-detail/check-detail";
import { ExamDetailPage} from "../pages/exam-detail/exam-detail"
import { BindDevicePage} from "../pages/bind-device/bind-device";
import { DeviceListPage} from "../pages/device-list/device-list";
import { HealthHistoryPage } from "../pages/health-history/health-history";

//默认配置文件
import { ConstantProvider } from '../providers/constant/constant';
import { BasicProvider} from "../providers/basic/basic";
import { ViewTmpDataProvider} from "../providers/view-tmp-data/view-tmp-data";
import { ApiServiceProvider } from '../providers/api-service/api-service';


//以前写的有问题，应该在这里增加子页面的module
import { PageErrorPageModule} from "../pages/page-error/page-error.module";
import { BindUserPageModule} from "../pages/bind-user/bind-user.module";
import { HealthyIndexPageModule} from "../pages/healthy-index/healthy-index.module";
import { HealthyRecordPageModule} from "../pages/healthy-record/healthy-record.module";
import { HealthyInputPageModule} from "../pages/healthy-input/healthy-input.module";
import { UserInfoPageModule} from "../pages/user-info/user-info.module";
import { TimeClockPageModule} from "../pages/time-clock/time-clock.module";
import { HealthyRecordListPageModule} from "../pages/healthy-record-list/healthy-record-list.module";
import { PlanDetailPageModule} from "../pages/plan-detail/plan-detail.module";
import { HealthyRecordDetailPageModule} from "../pages/healthy-record-detail/healthy-record-detail.module";
import { CheckDetailPageModule} from "../pages/check-detail/check-detail.module";
import { ExamDetailPageModule} from "../pages/exam-detail/exam-detail.module";
import { BindDevicePageModule} from "../pages/bind-device/bind-device.module";
import { DeviceListPageModule} from "../pages/device-list/device-list.module";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    HealthHistoryPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      menuType: 'push',
      iconMode: 'ios',//安卓icon强制使用ios的icon以及样式
      mode: 'ios',//样式强制使用ios样式
      backButtonText: '返回',

    }),
    NotifyModule.forRoot({
      options: { },
      notify: {
        progress: true
      }
    }),
    HttpClientModule,
    PageErrorPageModule,
    BindUserPageModule,
    HealthyIndexPageModule,
    HealthyRecordPageModule,
    HealthyInputPageModule,
    UserInfoPageModule,
    TimeClockPageModule,
    HealthyRecordListPageModule,
    PlanDetailPageModule,
    HealthyRecordDetailPageModule,
    CheckDetailPageModule,
    ExamDetailPageModule,
    BindDevicePageModule,
    DeviceListPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    PageErrorPage,
    BindUserPage,
    HealthyIndexPage,
    HealthyRecordPage,
    HealthyInputPage,
    UserInfoPage,
    TimeClockPage,
    HealthyRecordListPage,
    PlanDetailPage,
    HealthyRecordDetailPage,
    CheckDetailPage,
    ExamDetailPage,
    BindDevicePage,
    DeviceListPage,
    HealthHistoryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true},
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    ConstantProvider,
    BasicProvider,
    ApiServiceProvider,
    ViewTmpDataProvider
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {

}
