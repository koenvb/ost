let ArchivistStorePackage = require('archivist').ArchivistStorePackage

module.exports = {
  name: 'engine',
  configure: function(config) {
    config.import(ArchivistStorePackage);
    config.import(require('./mailer/package'))
    config.import(require('archivist').AuthEnginePackage)
    config.import(require('archivist').SnapshotEnginePackage)
    config.import(require('archivist').DocumentEnginePackage)
    config.import(require('archivist').ResourceEnginePackage)
  }
}