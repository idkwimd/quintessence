import copy from 'rollup-plugin-copy'
import del from 'rollup-plugin-delete'

export default {
	input: 'index.js',
    watch: true,
	output: {
		file: 'docs/assets/quintessence/index.js'
	},
    plugins: [
        del({
            targets: 'docs/assets/quintessence/*'
        }),
        copy({
            targets: [
                { src: './public/*', dest: 'docs/assets/quintessence'  } 
            ]
        })
    ]
}