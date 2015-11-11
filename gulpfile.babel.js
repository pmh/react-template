var gulp             = require('gulp')
var webpack          = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var path             = require('path')
var fs               = require('fs')
var execSync         = require('child_process').execSync
var config           = require('./webpack.config')

// run the webpack dev server
//  must generate the schema.json first as compiler relies on it for babel-relay-plugin
gulp.task('webpack', function () {
  var compiler = webpack(config);
  var server = new WebpackDevServer(compiler, {
    contentBase: path.join(__dirname, 'build', 'public'),
    noInfo: true,
    stats: { colors: true },
    historyApiFallback: true,
    proxy: {
      '/graphql': 'http://localhost:8080'
    }
  })
  server.use(require('webpack-hot-middleware')(compiler))
  server.listen(3000, '0.0.0.0', function (err, result) {
    if (err)
      return console.error(err)
    console.log('[webpackDevServer]: listening on localhost:3000')
  })
})

gulp.task('build', [], function () { webpack(config) })

gulp.task('autotest', [], function () {
  var runTests = function () {
    try {
      console.log(execSync('npm test', { encoding: 'utf8' }))
    } catch (ex) {
      console.log(ex.stdout)
    }
  }

  runTests()
  gulp.watch(path.join(__dirname, 'src', '**/*.js'), runTests)
})

gulp.task('default', ['webpack'])
