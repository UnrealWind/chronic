import { Component, Input } from '@angular/core';
import { SortDataDirective } from '../../directives/sort-data/sort-data';
import { UtilsProvider } from '../../providers/utils/utils';


/**
 * Generated class for the SingleLineComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'single-line',
  templateUrl: 'single-line.html',
  providers: [
    SortDataDirective,
    UtilsProvider
  ]
})
export class SingleLineComponent {
  @Input() preMapLevel: string
  @Input() singleItem: object

  supOrderMap: object[] = []
  typeIs

  constructor(
    public sorData: SortDataDirective,
    public utils: UtilsProvider
  ) {
    this.typeIs = utils.typeIs
  }

  ngOnInit() {

  }
}
