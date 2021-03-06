import { ProseArticle } from 'substance'
import { ArchivistPackage, DocumentsPackage, UsersPackage, PublisherPackage, ArchivistSubConfigurator } from 'archivist'
import InterviewPackage from '../../packages/interview/package'
import DefinitionManagerPackage from '../../packages/definition-manager/package'
import PersonManagerPackage from '../../packages/person-manager/package'
import PrisonManagerPackage from '../../packages/prison-manager/package'
import ToponymManagerPackage from '../../packages/toponym-manager/package'
import SubjectManagerPackage from '../../packages/subject-manager/package'
import EntityPackage from '../../packages/entity/package'
import AuthenticationClient from './AuthenticationClient'
import DocumentClient from './DocumentClient'
import FileClient from './FileClient'
import ResourceClient from './ResourceClient'

// Entities definitions
import Definition from '../../packages/definition/Definition'
import Person from '../../packages/person/Person'
import Prison from '../../packages/prison/Prison'
import Subjects from '../../packages/subjects/package'
import Toponym from '../../packages/toponym/Toponym'

let appConfig = 'ARCHIVISTCONFIG'
appConfig = JSON.parse(appConfig)

export default {
  name: 'archivist-publisher',
  configure: function(config) {
    // Use the default Archivist package
    config.import(ArchivistPackage)
    config.import(DocumentsPackage)

    // Manage person entity type
    config.import(PersonManagerPackage)
    // Manage prison entity type
    config.import(PrisonManagerPackage)
    // Manage toponym entity type
    config.import(ToponymManagerPackage)
    // Manage definition entity type
    config.import(DefinitionManagerPackage)
    // Manage subjects
    config.import(SubjectManagerPackage)
    // Manage users
    config.import(UsersPackage)

    // Add subconfigurators
    let EditorConfigurator = new ArchivistSubConfigurator()
    EditorConfigurator.import(PublisherPackage)
    EditorConfigurator.import(EntityPackage)
    EditorConfigurator.import(InterviewPackage)
    EditorConfigurator.setDefaultLanguage(appConfig.defaultLanguage)
    config.addConfigurator('archivist-interview-editor', EditorConfigurator)

    // Entities subconfigurator
    let EntitiesConfigurator = new ArchivistSubConfigurator()
    EntitiesConfigurator.defineSchema({
      name: 'archivist-entities',
      ArticleClass: ProseArticle
    })
    EntitiesConfigurator.addNode(Definition)
    EntitiesConfigurator.addNode(Person)
    EntitiesConfigurator.addNode(Prison)
    EntitiesConfigurator.addNode(Toponym)
    config.addConfigurator('archivist-entities', EntitiesConfigurator)

    // Subjects subconfigurator
    config.addConfigurator('archivist-subjects', new ArchivistSubConfigurator().import(Subjects))

    // Add app's root style
    //config.addStyle(__dirname, 'app.scss');

    config.setAppConfig({
      protocol: appConfig.protocol,
      host: appConfig.host,
      port: appConfig.port
    })

    // Define Authentication Client
    config.setAuthenticationServerUrl(appConfig.protocol + '://'+appConfig.host+':'+appConfig.port+'/api/auth/')
    config.setAuthenticationClient(AuthenticationClient)
    // Define Document Client
    config.setDocumentServerUrl(appConfig.protocol + '://'+appConfig.host+':'+appConfig.port+'/api/documents/')
    config.setDocumentClient(DocumentClient)
    // Define File Client
    config.setFileServerUrl(appConfig.protocol + '://'+appConfig.host+':'+appConfig.port+'/api/files/')
    config.setFileClient(FileClient)
    // Define Resource Client
    config.setResourceServerUrl(appConfig.protocol + '://'+appConfig.host+':'+appConfig.port+'/api/entities/')
    config.setResourceClient(ResourceClient)

    config.setMenuItems([
      {label: 'Documents', action: 'archive'},
      {label: 'Subjects', action: 'subjects'},
      {label: 'Persons', action: 'persons'},
      {label: 'Prisons', action: 'prisons'},
      {label: 'Toponyms', action: 'toponyms'},
      {label: 'Definitions', action: 'definitions'},
      {label: 'Users', action: 'users'}
    ])
  }
}