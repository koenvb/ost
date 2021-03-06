import { AnnotationTool, ContainerAnnotation, ContainerAnnotationCommand } from 'substance'
import SubjectReference from './SubjectReference'
import SubjectTool from './SubjectTool'
import SubjectCommand from './SubjectCommand'
import SubjectComponent from './SubjectComponent'

export default {
  name: 'subject',
  configure: function(config) {
    config.addNode(SubjectReference)
    config.addTool(SubjectReference.type, SubjectTool, { toolGroup: 'default' })
    config.addCommand(SubjectReference.type, ContainerAnnotationCommand, { nodeType: SubjectReference.type })
    //config.addComponent(SubjectReference.type, ContainerAnnotation)
    config.addIcon(SubjectReference.type, {'fontawesome': 'fa-tag'})
  }
}