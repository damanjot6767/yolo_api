'use strict';

/********************************
 ********* All routes ***********
 ********************************/
let v1Routes = [
    ...require('./fileUploadRoutes'),
    ...require('./adminRoutes'),
    ...require('./userRoutes'),
    ...require('./aboutRoutes'),
    ...require('./categoryRoutes'),
    ...require('./eventRoutes'),
    ...require('./experienceRoutes'),
    ...require('./propertyRoutes'),
    ...require('./reviewRoutes'),
    ...require('./roomRoutes'),
    ...require('./servicesRoutes'),
    ...require('./tagRoutes')
]

module.exports = v1Routes;