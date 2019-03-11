import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { ViewTmpDataProvider } from '../../providers/view-tmp-data/view-tmp-data';

/**
 * Generated class for the SortDataDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: 'sort-data',
  providers: [
    ViewTmpDataProvider
  ]
})
export class SortDataDirective {
  @Input() dataPreLevel: string
  @Input() singleItem: object
  @Input() orderMap: object[]
  @Output() orderMapChange = new EventEmitter<object[]>()

  constructor(
    public planFieldMap: ViewTmpDataProvider
  ) {

  }

  ngOnInit() {
    this.rearrangeData()
  }

  /**
   * 整理数据为页面显示的样子
   */
  rearrangeData():void {
    var level = this.dataPreLevel.split('.')
    var currLevel = this.planFieldMap

    level.forEach((ele) => {
      currLevel.hasOwnProperty(ele) ? currLevel = currLevel[ele] : undefined
    })

    for(let key in currLevel) {
      let tarObj = this.singleItem

      this.orderMap[currLevel[key].index] = {
        data: tarObj[key],
        type: currLevel[key].type,
        style: currLevel[key].style,
        keyTxt: key
      }
    }
  }
}
