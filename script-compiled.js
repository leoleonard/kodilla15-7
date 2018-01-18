'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
	_inherits(Stopwatch, _React$Component);

	function Stopwatch() {
		_classCallCheck(this, Stopwatch);

		var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this));

		_this.running = false;
		_this.reset();
		return _this;
	}

	_createClass(Stopwatch, [{
		key: 'reset',
		value: function reset() {
			this.state = {
				times: {
					minutes: 0,
					seconds: 0,
					miliseconds: 0
				}
			};
		}
	}, {
		key: 'format',
		value: function format(times) {
			return pad0(times.minutes) + ':' + pad0(times.seconds) + ':' + pad0(Math.floor(times.miliseconds));
		}
	}, {
		key: 'start',
		value: function start() {
			var _this2 = this;

			if (!this.running) {
				this.running = true;
				this.watch = setInterval(function () {
					return _this2.step();
				}, 10);
			}
		}
	}, {
		key: 'step',
		value: function step() {
			if (!this.running) {
				return;
			}

			this.calculate();
		}
	}, {
		key: 'calculate',
		value: function calculate() {
			var newTimes = {
				miliseconds: this.state.times.miliseconds,
				seconds: this.state.times.seconds,
				minutes: this.state.times.minutes
			};

			newTimes.miliseconds += 1;

			if (newTimes.miliseconds >= 100) {
				newTimes.seconds += 1;
				newTimes.miliseconds = 0;
			}
			if (newTimes.seconds >= 60) {
				newTimes.minutes += 1;
				newTimes.seconds = 0;
			}

			this.setState({ times: newTimes });
		}
	}, {
		key: 'stop',
		value: function stop() {
			this.running = false;
			clearInterval(this.watch);
		}
	}, {
		key: 'restart',
		value: function restart() {
			this.times = {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			};
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			return React.createElement(
				'div',
				{ className: 'container' },
				React.createElement(
					'nav',
					{ className: 'buttons' },
					React.createElement(
						'button',
						{ onClick: function onClick(e) {
								return _this3.start(e);
							} },
						'Start'
					),
					React.createElement(
						'button',
						{ onClick: function onClick(e) {
								return _this3.stop(e);
							} },
						'Stop'
					),
					React.createElement(
						'button',
						{ onClick: function onClick(e) {
								return _this3.restart(e);
							} },
						'Restart'
					)
				),
				this.format(this.state.times)
			);
		}
	}]);

	return Stopwatch;
}(React.Component);

function pad0(value) {
	var result = value.toString();

	if (result.length < 2) {
		result = '0' + result;
	}

	return result;
}

ReactDOM.render(React.createElement(Stopwatch, null), document.getElementById("app"));
