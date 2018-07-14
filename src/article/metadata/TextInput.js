import { Component } from 'substance'

export default class FormInputComponent extends Component {
  render($$) {
    const val = this.props.value
    const size = this.props.size || 'medium'
    const type = this.props.type || 'text'
    const label = this.props.label
    const placeholder = this.props.placeholder
    const warning = this.props.warning

    const el = $$('div').addClass('sc-text-input sm-size-'+size)

    if(label) {
      el.append(
        $$('label').append(label)
      )
    }

    const input = $$('input').attr({
      value: val,
      type: type,
      placeholder: placeholder
    }).addClass('se-input')
      .ref('input')
      .on('change', this._onChange)

    const inputWrap = $$('div').addClass('se-text-input').append(input)

    if(warning) {
      el.addClass('sm-warning')
      inputWrap.append(
        $$('div').addClass('se-warning-msg').append(warning)
      )
    }

    el.append(inputWrap)

    return el
  }

  _onChange() {
    const name = this.props.name
    const value = this._getValue()
    this.send('set-value', name, value)
  }

  _getValue() {
    const input = this.refs.input
    return input.val()
  }
}