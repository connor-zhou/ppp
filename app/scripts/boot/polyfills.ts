import 'core-js/es6';
import 'core-js/es7/reflect';
import 'html5-history-api/history';
require( 'intl');
require( 'intl/locale-data/jsonp/zh-Hans.js');
require( '../../../bower_components/classlist/classList.js');
require('zone.js/dist/zone');
if (process.env.ENV === 'production') {
    // Production
} else {
    // Development
    Error['stackTraceLimit'] = Infinity;
    require('zone.js/dist/long-stack-trace-zone');
}