module.exports = {
	entry: './js/main.js',
	output: {
		filename: './build/bundle.js'
	},
	module: {
	loaders: [
		{
			test: /\.js$/,
			loader: 'babel',
			query: {
				presets: ['es2015']
			}
		}, 
		{
			test: /\.scss$/,
			loaders: ['style', 'css?sourceMap', 'sass?sourceMap']
		},
		{
			test: /\.css$/,
			loaders: ["style", "css?"]  

		},
		{
			test: /\.(eot|svg|ttf|woff|woff2)$/,
			loader: 'file?name=public/fonts/[name].[ext]'
		},
		{
			test: /\.(jpe?g|png)$/,
			loader: 'file'
		}
	]},
	devServer: {
		// watch:true,
		inline: true,
		host: '0.0.0.0',
		port: '4000',
		watchOptions: {
			aggregateTimeout: 300,
			poll: true
		}
	}
};



