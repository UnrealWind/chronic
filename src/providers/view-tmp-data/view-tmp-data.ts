import { Injectable } from '@angular/core';

/*
  Generated class for the ViewTmpDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ViewTmpDataProvider {

  constructor() {
  }

  mzf = {                                                          // 慢阻肺
    'evo': {                                                       // 评估方案： 这里的 key 对应后台返回的 type
      'content': {
        'materialName': { 'style': {
          'width': '50%',
          'white-space': 'normal'
        },
        'type': 'evo',
        'index': 0},
        'dateValue': { 'style': {
          'width': 'auto', 'margin-right': '3px'
        },
        'type': 'evo',
        'index': 1},
        'dateName': { 'style': {
          'width': 'auto', 'margin-right': '3px'
        },
        'type': 'evo',
        'index': 2},
        'timeValue':  { 'style': {
          'width': 'auto', 'margin-right': '3px'
        },
        'type': 'evo',
        'index': 3},
        'timeName': { 'style': {
          'width': 'auto', 'margin-right': '3px'
        },
        'type': 'evo',
        'index': 4}
      }
    },

    'interview': {                                                     // 随访方案
      'content': {
        'materialName': { 'style': {
          'width': '50%',
          'white-space': 'normal'
        },
        'type': 'interview',
        'index': 0},
        'dateValue': { 'style': {
          'width': 'auto', 'margin-right': '3px'
        },
        'type': 'interview',
        'index': 1},
        'dateName': { 'style': {
          'width': 'auto', 'margin-right': '3px'
        },
        'type': 'interview',
        'index': 2},
        'timeValue':  { 'style': {
          'width': 'auto', 'margin-right': '3px'
        },
        'type': 'interview',
        'index': 3},
        'timeName': { 'style': {
          'width': 'auto', 'margin-right': '3px'
        },
        'type': 'interview',
        'index': 4}
      }
    },
    'drug': {                                                      // 药品方案
      'content': {
        'materialName': { 'style': {
          'width': '50%',
          'padding-right': '8%',
          'white-space': 'normal'
        },
        'type': 'drug',
        'index': 0},
        'operationName': { 'style': {
          'width': '20%'
        },
        'type': 'drug',
        'index': 1},
        'dosageValue': { 'style': {
          'width': 'auto'
        },
        'type': 'drug',
        'index': 2},
        'dosageName': { 'style': {
          'width': 'auto'
        },
        'type': 'drug',
        'index': 3},
        'frepName': { 'style': {
          'width': '25%',
          'text-align': 'right'
        },
        'type': 'drug',
        'index': 4}
      }
    },
    'exercise': {                                                      // 呼吸康复训练
      'content': {
        'materialName': { 'style': {
          'width': '50%',
          'padding-right': '8%',
          'white-space': 'normal'
        },
        'type': 'exercise',
        'index': 0},
        'periodName': { 'style': {
          'width': 'auto'
        },
        'type': 'exercise',
        'index': 1},
        'unitValue': { 'style': {
          'width': 'auto'
        },
        'type': 'exercise',
        'index': 2},
        'unitName': { 'style': {
          'width': 'auto'
        },
        'type': 'exercise',
        'index': 3},
      }
    },
    'oxygen': {                                                      // 氧疗
      'content': {
        'materialName': { 'style': {
          'width': '50%',
          'padding-right': '8%',
          'white-space': 'normal'
        },
        'type': 'oxygen',
        'index': 0},
        'periodName': { 'style': {
          'width': 'auto'
        },
        'type': 'oxygen',
        'index': 1},
        'unitValue': { 'style': {
          'width': 'auto'
        },
        'type': 'oxygen',
        'index': 2},
        'unitName': { 'style': {
          'width': 'auto'
        },
        'type': 'oxygen',
        'index': 3}
      }
    },
    'nutrition': {                                                      // 营养
      'content': {
        'materialName': { 'style': {
          'width': '100%',
          'white-space': 'normal'
        },
        'type': 'nutrition',
        'index': 0},
      }
    },
    'smoke': {                                                      // 戒烟
      'content': {
        'materialName': { 'style': {
          'width': '100%',
          'white-space': 'normal'
        },
        'type': 'smoke',
        'index': 0},
      }
    },
    'health': {                                                      // 健康教育
      'content': {
        'materialName': { 'style': {
          'width': '100%',
          'white-space': 'normal'
        },
        'type': 'health',
        'index': 0},
      }
    }
  }

  huxi = {                                               // 呼吸慢病
    'special': {                                                       // 评估方案： 这里的 key 对应后台返回的 type
      'content': {
        'materialName': { 'style': {
          'width': '46%',
          'white-space': 'normal'
        },
        'type': 'evo',
        'index': 0},
        'dateValue': { 'style': {
          'width': 'auto', 'margin-right': '3px'
        },
        'type': 'evo',
        'index': 1},
        'dateName': { 'style': {
          'width': 'auto', 'margin-right': '3px'
        },
        'type': 'evo',
        'index': 2},
        'timeValue':  { 'style': {
          'width': 'auto', 'margin-right': '3px'
        },
        'type': 'evo',
        'index': 3},
        'timeName': { 'style': {
          'width': 'auto', 'margin-right': '3px'
        },
        'type': 'evo',
        'index': 4}
      }
    }
  }

}
