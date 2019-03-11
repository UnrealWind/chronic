import { Component } from '@angular/core';
import { HealthyIndexPage} from "../healthy-index/healthy-index";
import { HealthyRecordListPage} from "../healthy-record-list/healthy-record-list";
import { UserInfoPage} from "../user-info/user-info";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HealthyIndexPage;
  tab2Root = HealthyRecordListPage;
  tab3Root = UserInfoPage;

  constructor() {

  }
}
