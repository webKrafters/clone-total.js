"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var lodash_1 = require("lodash");
var clonedeep_eligibility_check_1 = __importDefault(require("./clonedeep-eligibility-check"));
var noop = function noop() {};
var handleCloneables = function handleCloneables(v) {
  if (v === null) {
    return;
  }
  if (_typeof(v) === 'object') {
    if ('clone' in v && typeof v.clone === 'function') {
      return v.clone();
    }
    if ('cloneNode' in v && typeof v.cloneNode === 'function') {
      return v.cloneNode(true);
    }
  }
};
function clone(value, customizer) {
  return (0, lodash_1.cloneDeepWith)(value, function (value, key, object, stack) {
    var r = customizer(value, key, object, stack);
    if (typeof r !== 'undefined') {
      return r;
    }
    r = handleCloneables(value, key, object, stack);
    if (typeof r !== 'undefined') {
      return r;
    }
    if (!(0, clonedeep_eligibility_check_1["default"])(value).isEligible) {
      return value;
    }
  });
}
function clonedeep(value) {
  var customizer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
  return clone(value, customizer);
}
exports["default"] = clonedeep;