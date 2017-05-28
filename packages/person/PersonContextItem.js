import { Component } from 'substance'

class PersonContextItem extends Component {

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
      .addClass('sc-entity-entry se-person')
      .on('click', this.handleEditorClick)

    if(this.props.focus) {
      el.addClass('se-focused')
    }

    el.append(
      $$('div').addClass('se-type').append(this.getLabel('person')),
      $$('div').addClass('se-title').append(node.name),
      $$('div').addClass('se-description').setInnerHTML(node.description),
      $$('div').addClass('se-edit-entity').append(this.context.iconProvider.renderIcon($$, 'editEntity'))
        .on('click', this.editEntity)
    )

    return el
  }

  renderReaderItem($$) {
    let urlHelper = this.context.urlHelper
    let node = this.props.data

    let el = $$('div')
      .attr("data-id", this.props.entityId)
      .addClass('sc-entity-entry se-person')
      .on('click', this.handleClick)

    let resourceLink = $$('a')
      .addClass('se-resource-external-link se-person-link')
      .attr({
        href: urlHelper.openResource(this.props.entityId),
        target: '_blank',
        title: this.getLabel('person-link')
      })
      .append(this.context.iconProvider.renderIcon($$, 'person-link'))

    if(node.global) {
      el.append(resourceLink)
    }

    el.append(
      $$('div').addClass('se-title').append(node.name),
      $$('div').addClass('se-description').setInnerHTML(node.description)
    )

    return el
  }

  editEntity() {
    this.send('editEntity', this.props.entityId)
  }

  handleEditorClick() {
    this.send('focusEntity', this.props.entityId)
    this.send('showReferences', this.props.entityId)
  }

  handleClick() {
    this.send('switchActive', this.props.entityType, this.props.entityId)
    this.send('showReferences', this.props.entityId)
  }

}

export default PersonContextItem