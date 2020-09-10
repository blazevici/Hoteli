let mix = require('laravel-mix');
require('laravel-mix-purgecss');

mix.setPublicPath('./public')

mix.sass(
	'resources/assets/src/scss/main.scss',
	'public/assets/css'
);
mix.js(
	'resources/assets/src/js/app.js',
	'public/assets/js/app.js'
);

mix.version();

// browsersync watch for files included below and proxy setup
mix.browserSync({
	files: [
		'resources/'
	],
	injectChanges: true,
    proxy: 'http://127.0.0.1:8080',
    port: 3000
});

