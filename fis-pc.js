var fis = module.exports = require('fis');

fis.cli.name = "fis-pc";
fis.cli.info = fis.util.readJSON(__dirname + '/package.json');

fis.config.merge({
    modules : {
        parser : {
            less : 'less',
            tmpl: 'bdtmpl'
        },
        preprocessor: {
            tpl: 'widget-inline, extlang'
        },
        postprocessor: {
            tpl: 'require-async',
            js: 'jswrapper, require-async'
        },
        optimizer : {
            tpl : 'smarty-xss,html-compress'
        }
    },
    roadmap : {
        ext : {
            less : 'css',
            tmpl : 'js'
        },
        path : [
            {
                reg : /^\/widget\/(.*\.tpl)$/i,
                isMod : true,
                url : '${namespace}/widget/$1',
                release : '/template/${namespace}/widget/$1'
            },
            {
                reg : /^\/widget\/(.*\.(js|css))$/i,
                isMod : true,
                release : '/static/${namespace}/widget/$1'
            },
            {
                reg : /^\/page\/(.+\.tpl)$/i,
                isMod: true,
                release : '/template/${namespace}/page/$1',
                extras: {
                    isPage: true
                }
            },
            {
                reg : /\.tmpl$/i,
                release : false
            },
            {
                reg: /^\/(static|config|test)\/(.*)/i,
                release: '/$1/${namespace}/$2'
            },
            {
                reg : /^\/(plugin|server\.conf$|smarty\.conf$)|\.php$/i
            },
            {
                reg: "domain.conf",
                release: '/config/$&'
            },
            {
                reg: "build.sh",
                release: false
            },
            {
                reg : '${namespace}-map.json',
                release : '/config/${namespace}-map.json'
            },
            {
                reg: /^.+$/,
                release: '/static/${namespace}$&'
            }
        ]
    },
    settings : {
        parser : {
            bdtmpl : {
                LEFT_DELIMITER : '<#',
                RIGHT_DELIMITER : '#>'
            }
        },
        postprocessor : {
            jswrapper: {
                type: 'amd'
            }
        }
    }
});
