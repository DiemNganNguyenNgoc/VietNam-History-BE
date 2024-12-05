//chứa tất cả router của API
const UserRouter=require('./UserRouter')
const TagRouter = require('./TagRouter')

const routes=(app) =>{
    app.use('/api/user', UserRouter)
    app.use('/api/tag', TagRouter)
}

module.exports=routes;
