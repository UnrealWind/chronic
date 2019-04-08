export class StateMachine {
  // 状态
  state: object

  constructor() {
    this.state = {
      'init': {
        fetch: 'fetching'
      },
      'fetching': {
        success: 'successful',
        fail: 'failure'
      },
      'successful': {
        refetch: 'fetching'
      },
      'failure': {
        refetch: 'fetching',
        reset: 'init'
      }

    }
  }

  changeState() {
    return function(name) {
      var state = this.currState
      if(this.stateMachine[state][name]) {
        this.currState = this.stateMachine[state][name]
      }

      console.log(`${state} + ${name} --> ${this.currState}`)
    }
  }

}
