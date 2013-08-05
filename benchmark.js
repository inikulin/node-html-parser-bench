var fs = require('fs'),
    path = require('path'),
    Benchmark = require('benchmark'),
    htmlparser = require("htmlparser"),
    htmlparser2 = require('htmlparser2'),
    html5 = require('html5'),
    parse5 = require('parse5');

var dataDirPath = path.join(__dirname, './data'),
    testPages = fs.readdirSync(dataDirPath).map(function (fileName) {
        var filePath = path.join(dataDirPath, fileName);

        return fs.readFileSync(filePath).toString();
    });

new Benchmark.Suite()
    .add('html5 (https://github.com/aredridel/html5)', function () {
        for (var i = 0; i < testPages.length; i++) {
            var parser = new html5.Parser();
            parser.parse(testPages[i]);
        }
    })

    .add('htmlparser (https://github.com/tautologistics/node-htmlparser/)', function () {
        for (var i = 0; i < testPages.length; i++) {
            var handler = new htmlparser.DefaultHandler(),
                parser = new htmlparser.Parser(handler);

            parser.parseComplete(testPages[i]);
        }
    })

    .add('htmlparser2 (https://github.com/fb55/htmlparser2)', function () {
        for (var i = 0; i < testPages.length; i++) {
            var handler = new htmlparser2.DefaultHandler(),
                parser = new htmlparser2.Parser(handler);

            parser.write(testPages[i]);
            parser.end();
        }
    })

    .add('parse5 (https://github.com/inikulin/parse5)', function () {
        for (var i = 0; i < testPages.length; i++) {
            var parser = new parse5.Parser();
            parser.parse(testPages[i]);
        }
    })

    .on('start', function () {
        console.log('Starting benchmark. Fasten your seatbelts...')
    })

    .on('cycle', function (event) {
        console.log(event.target.toString());
    })

    .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').pluck('name'));
    })

    .run();
