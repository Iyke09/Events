var gulp = require('gulp');
var yaml = require('js-yaml');
var path = require('path');
var fs = require('fs');


gulp.task('swagger', () => {
  const doc = yaml.safeLoad(fs.readFileSync(path.join(__dirname, 'api/swagger/swagger.yaml')));
  fs.writeFileSync(
    path.join(__dirname, '../lumen-blog.json'),
    JSON.stringify(doc, null, ' ')
  );
});


gulp.task('watch', () => {
  gulp.watch('api/swagger/swagger.yaml', ['swagger']);
})
