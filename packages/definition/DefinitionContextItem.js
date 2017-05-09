import { Component } from 'substance'

class DefinitionContextItem extends Component {

  render($$) {
    let isEditor = this.context.readerContext === undefined
    if(isEditor) {
      return this.renderEditorItem($$)
    } else {
      return this.renderReaderItem($$)
    }
  }

  renderEditorItem($$) {
    let node = this.props.data

    let el = $$('div')
      .attr("data-id", this.props.entityId)
      .addClass('sc-entity-entry se-definition')
      //.on('click', this.handleClick)

    if(this.props.focus) {
      el.addClass('se-focused')
    }

    el.append(
      $$('div').addClass('se-title').append(node.name),
      $$('div').addClass('se-description').setInnerHTML(node.description)
    )

    return el
  }

  renderReaderItem($$) {
    let urlHelper = this.context.urlHelper
    let node = this.props.data

    let el = $$('div')
      .attr("data-id", this.props.entityId)
      .addClass('sc-entity-entry se-definition')
      .on('click', this.handleClick)

    let resourceLink = $$('a')
      .addClass('se-resource-external-link se-resource-link')
      .attr({
        href: urlHelper.openResource(this.props.entityId),
        target: '_blank',
        title: this.getLabel('resource-link')
      })
      .append(this.context.iconProvider.renderIcon($$, 'resources'))

    el.append(
      resourceLink,
      $$('div').addClass('se-title').append(node.name),
      $$('div').addClass('se-description').setInnerHTML(node.description)
    )

    return el
  }

  handleClick() {
    this.send('switchActive', this.props.entityType, this.props.entityId)
    this.send('showReferences', this.props.entityId)
  }

}

export default DefinitionContextItem