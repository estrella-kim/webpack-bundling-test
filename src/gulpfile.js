var fs = require('fs');
var gulp = require("gulp");
var babel = require("gulp-babel");
var webpack = require('gulp-webpack');
var path = require('path');
var glob = require('glob');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var ngAnnotate = require('gulp-ng-annotate');

function getEntries (){
	return fs.readdirSync('./ctrl/')
		.filter(
			(file) => file.match(/.*\.js$/)
		)
		.map((file) => {
				return {
					name: file.substring(0, file.length - 3),
					path: './ctrl/' + file
				}
		}).reduce((memo, file) => {
			memo[file.name] = file.path
			return memo;
		}, {})
}

gulp.task("build", function(){

	return gulp.src(
			"./src/**/*.js"
		)
		//.pipe(babel())
		//.pipe(ngAnnotate())
		/*.pipe(minify({
			ext : {
				source : '.js',
				min : '.min.js'
			},
			mangle : false
		}))*/
		.pipe(webpack({
			output : {
				filename : 'prod.bundle.js'
			},
			entry : glob.sync('./ctrl/*.js'),
			watch : false,
			module : {
				rules : [
					{
						test : /\.js$/,
						loader : 'babel-loader'
					}
				]
			}
			/*plugins : [
				new UglifyJsPlugin({
					test : /\.js$/,
					uglifyOptions : {
						ecma : 5,
						mangle : false
					}
				})
			]*/
		}))
		.pipe(gulp.dest("./release/"))
})
