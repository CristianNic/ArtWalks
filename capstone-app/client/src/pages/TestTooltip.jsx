import React, { Component } from 'react'

export default class TestTooltip extends Component {
  
  state={
    trigger: false
  }
  
  close = () => {
    this.setState({trigger: true})
  }

  render() {
    return (
      <div>
        <ToolTipController
          detect="click"
          offsetX="centre"
          offsetY={20}
          closeOnClick={false}
          triggerClose={this.state.trigger}
          returnState={this.getOtherTooltipState}>
          <Select>
            <Button variant="outlined">Click me</Button>
          </Select>
          <ToolTipAdvanced close={this.close}/>
        </ToolTipController>
      </div>
    )
  }
}



