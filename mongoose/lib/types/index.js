
/*!
 * Module exports.
 */

'use strict';

exports.Array = require('mongoose/lib/types/array');
exports.Buffer = require('mongoose/lib/types/buffer');

exports.Document = // @deprecate
    exports.Embedded = require('mongoose/lib/types/arraySubdocument');

exports.DocumentArray = require('mongoose/lib/types/documentArray');
exports.Double = require('mongoose/lib/types/double');
exports.Decimal128 = require('mongoose/lib/types/decimal128');
exports.ObjectId = require('mongoose/lib/types/objectid');

exports.Map = require('mongoose/lib/types/map');

exports.Subdocument = require('mongoose/lib/types/subdocument');

exports.UUID = require('mongoose/lib/types/uuid');
