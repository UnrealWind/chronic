import { Component } from '@angular/core';
import { HealthyIndexPage} from "../healthy-index/healthy-index";
import { HealthyRecordListPage} from "../healthy-record-list/healthy-record-list";
import { UserInfoPage} from "../user-info/user-info";
import { TestEchartsPage} from "../test-echarts/test-echarts";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

   tab1Root = HealthyIndexPage;
  //tab1Root = TestEchartsPage;
  tab2Root = HealthyRecordListPage;
  tab3Root = UserInfoPage;

  constructor() {

  }
}
