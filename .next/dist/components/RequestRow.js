'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _web = require('../ethereum/web3');

var _web2 = _interopRequireDefault(_web);

var _campaign = require('../ethereum/campaign');

var _campaign2 = _interopRequireDefault(_campaign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/vincenthoward/Projects/crowdcoin/components/RequestRow.js';


var RequestRow = function (_Component) {
  (0, _inherits3.default)(RequestRow, _Component);

  function RequestRow() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, RequestRow);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = RequestRow.__proto__ || (0, _getPrototypeOf2.default)(RequestRow)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      errorMessage: '',
      loading: false
    }, _this.onApprove = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var campaign, accounts;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              campaign = (0, _campaign2.default)(_this.props.address);

              // this.setState({ 
              //   loading: true,
              //   errorMessage: ''
              // });

              _context.next = 3;
              return _web2.default.eth.getAccounts();

            case 3:
              accounts = _context.sent;
              _context.next = 6;
              return campaign.methods.approveRequest(_this.props.id).send({
                from: accounts[0]
              });

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2);
    })), _this.onFinalize = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var campaign, accounts;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              campaign = (0, _campaign2.default)(_this.props.address);
              _context2.next = 3;
              return _web2.default.eth.getAccounts();

            case 3:
              accounts = _context2.sent;
              _context2.next = 6;
              return campaign.methods.finalizeRequest(_this.props.id).send({
                from: accounts[0]
              });

            case 6:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2);
    })), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(RequestRow, [{
    key: 'render',
    value: function render() {
      var Row = _semanticUiReact.Table.Row,
          Cell = _semanticUiReact.Table.Cell;

      var readyToFinalize = this.props.request.approvalCount > this.props.approversCount / 2;
      return _react2.default.createElement(Row, { disabled: this.props.request.complete, positive: readyToFinalize, __source: {
          fileName: _jsxFileName,
          lineNumber: 40
        }
      }, _react2.default.createElement(Cell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 41
        }
      }, this.props.id), _react2.default.createElement(Cell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 42
        }
      }, this.props.request.description), _react2.default.createElement(Cell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 43
        }
      }, _web2.default.utils.fromWei(this.props.request.value, 'ether')), _react2.default.createElement(Cell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 44
        }
      }, this.props.request.recipient), _react2.default.createElement(Cell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 45
        }
      }, this.props.request.approvalCount, '/', this.props.approversCount), _react2.default.createElement(Cell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 46
        }
      }, this.props.request.complete ? null : //Needs to be fixed
      _react2.default.createElement(_semanticUiReact.Button, {
        color: 'green',
        basic: true,
        onClick: this.onApprove,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 48
        }
      }, 'Approve')), _react2.default.createElement(Cell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 56
        }
      }, this.props.request.complete ? null : //Needs to be fixed
      _react2.default.createElement(_semanticUiReact.Button, {
        color: 'teal',
        basic: true,
        onClick: this.onFinalize,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 58
        }
      }, 'Finalize')));
    }
  }]);

  return RequestRow;
}(_react.Component);

exports.default = RequestRow;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvUmVxdWVzdFJvdy5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIlRhYmxlIiwiQnV0dG9uIiwid2ViMyIsIkNhbXBhaWduIiwiUmVxdWVzdFJvdyIsInN0YXRlIiwiZXJyb3JNZXNzYWdlIiwibG9hZGluZyIsIm9uQXBwcm92ZSIsImNhbXBhaWduIiwicHJvcHMiLCJhZGRyZXNzIiwiZXRoIiwiZ2V0QWNjb3VudHMiLCJhY2NvdW50cyIsIm1ldGhvZHMiLCJhcHByb3ZlUmVxdWVzdCIsImlkIiwic2VuZCIsImZyb20iLCJvbkZpbmFsaXplIiwiZmluYWxpemVSZXF1ZXN0IiwiUm93IiwiQ2VsbCIsInJlYWR5VG9GaW5hbGl6ZSIsInJlcXVlc3QiLCJhcHByb3ZhbENvdW50IiwiYXBwcm92ZXJzQ291bnQiLCJjb21wbGV0ZSIsImRlc2NyaXB0aW9uIiwidXRpbHMiLCJmcm9tV2VpIiwidmFsdWUiLCJyZWNpcGllbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQUFPLEFBQVM7Ozs7QUFDaEIsQUFBUyxBQUFPOztBQUNoQixBQUFPLEFBQVU7Ozs7QUFDakIsQUFBTyxBQUFjOzs7Ozs7Ozs7SUFFQSxBOzs7Ozs7Ozs7Ozs7Ozs7b04sQUFDbkI7b0JBQVEsQUFDUSxBQUNkO2UsQUFGTSxBQUVHO0FBRkgsQUFDTixhQUtGLEEscUZBQVksbUJBQUE7b0JBQUE7b0VBQUE7a0JBQUE7MkNBQUE7aUJBQ0o7QUFESSx5QkFDTyx3QkFBUyxNQUFBLEFBQUssTUFEckIsQUFDTyxBQUFvQixBQUVyQzs7QUFDQTtBQUNBO0FBQ0E7QUFOVTs7OEJBQUE7cUJBUWEsY0FBQSxBQUFLLElBUmxCLEFBUWEsQUFBUzs7aUJBQTFCO0FBUkksa0NBQUE7OEJBQUE7OEJBU0osQUFBUyxRQUFULEFBQWlCLGVBQWUsTUFBQSxBQUFLLE1BQXJDLEFBQTJDLElBQTNDLEFBQStDO3NCQUM3QyxTQVZFLEFBU0osQUFBb0QsQUFDbEQsQUFBUztBQUR5QyxBQUN4RCxlQURJOztpQkFUSTtpQkFBQTs4QkFBQTs7QUFBQTtrQkFBQTtBLGUsQUFjWixzRkFBYSxvQkFBQTtvQkFBQTtzRUFBQTtrQkFBQTs2Q0FBQTtpQkFDTDtBQURLLHlCQUNNLHdCQUFTLE1BQUEsQUFBSyxNQURwQixBQUNNLEFBQW9COytCQUQxQjtxQkFHWSxjQUFBLEFBQUssSUFIakIsQUFHWSxBQUFTOztpQkFBMUI7QUFISyxtQ0FBQTsrQkFBQTs4QkFJTCxBQUFTLFFBQVQsQUFBaUIsZ0JBQWdCLE1BQUEsQUFBSyxNQUF0QyxBQUE0QyxJQUE1QyxBQUFnRDtzQkFDOUMsU0FMRyxBQUlMLEFBQXFELEFBQ25ELEFBQVM7QUFEMEMsQUFDekQsZUFESTs7aUJBSks7aUJBQUE7K0JBQUE7O0FBQUE7bUJBQUE7QTs7Ozs7NkJBU0o7VUFBQSxBQUNDLE1BREQsQUFDZSx1QkFEZixBQUNDO1VBREQsQUFDTSxPQUROLEFBQ2UsdUJBRGYsQUFDTSxBQUNiOztVQUFNLGtCQUFrQixLQUFBLEFBQUssTUFBTCxBQUFXLFFBQVgsQUFBbUIsZ0JBQWdCLEtBQUEsQUFBSyxNQUFMLEFBQVcsaUJBQXRFLEFBQXVGLEFBQ3ZGOzZCQUNHLGNBQUQsT0FBSyxVQUFXLEtBQUEsQUFBSyxNQUFMLEFBQVcsUUFBM0IsQUFBbUMsVUFBVyxVQUE5QyxBQUF5RDtvQkFBekQ7c0JBQUEsQUFDRTtBQURGO09BQUEsa0JBQ0csY0FBRDs7b0JBQUE7c0JBQUEsQUFBUTtBQUFSO0FBQUEsY0FBUSxBQUFLLE1BRGYsQUFDRSxBQUFtQixBQUNuQixxQkFBQyxjQUFEOztvQkFBQTtzQkFBQSxBQUFRO0FBQVI7QUFBQSxjQUFRLEFBQUssTUFBTCxBQUFXLFFBRnJCLEFBRUUsQUFBMkIsQUFDM0IsOEJBQUMsY0FBRDs7b0JBQUE7c0JBQUEsQUFBUTtBQUFSO0FBQUEsdUJBQVEsQUFBSyxNQUFMLEFBQVcsUUFBUSxLQUFBLEFBQUssTUFBTCxBQUFXLFFBQTlCLEFBQXNDLE9BSGhELEFBR0UsQUFBUSxBQUE2QyxBQUNyRCwyQkFBQyxjQUFEOztvQkFBQTtzQkFBQSxBQUFRO0FBQVI7QUFBQSxjQUFRLEFBQUssTUFBTCxBQUFXLFFBSnJCLEFBSUUsQUFBMkIsQUFDM0IsNEJBQUMsY0FBRDs7b0JBQUE7c0JBQUEsQUFBUTtBQUFSO0FBQUEsY0FBUSxBQUFLLE1BQUwsQUFBVyxRQUFuQixBQUEyQixlQUFrQixVQUFBLEFBQUssTUFMcEQsQUFLRSxBQUF3RCxBQUN4RCxpQ0FBQyxjQUFEOztvQkFBQTtzQkFBQSxBQUNJO0FBREo7QUFBQSxjQUNJLEFBQUssTUFBTCxBQUFXLFFBQVgsQUFBbUIsV0FBbkIsQUFBOEIsT0FBUyxBQUN6QztzQkFBQSxBQUFDO2VBQUQsQUFDTSxBQUNOO2VBRkEsQUFHQTtpQkFBVSxLQUhWLEFBR2U7O29CQUhmO3NCQUFBO0FBQUE7QUFDQSxTQVRKLEFBTUUsQUFFRSxBQVFDLDZCQUFDLGNBQUQ7O29CQUFBO3NCQUFBLEFBQ0U7QUFERjtBQUFBLGNBQ0UsQUFBSyxNQUFMLEFBQVcsUUFBWCxBQUFtQixXQUFuQixBQUE4QixPQUFTLEFBQzFDO3NCQUFBLEFBQUM7ZUFBRCxBQUNNLEFBQ047ZUFGQSxBQUdBO2lCQUFVLEtBSFYsQUFHZTs7b0JBSGY7c0JBQUE7QUFBQTtBQUNBLFNBcEJOLEFBQ0UsQUFnQkssQUFFRCxBQVNQOzs7OztBQTdEcUMsQTs7a0JBQW5CLEEiLCJmaWxlIjoiUmVxdWVzdFJvdy5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvdmluY2VudGhvd2FyZC9Qcm9qZWN0cy9jcm93ZGNvaW4ifQ==