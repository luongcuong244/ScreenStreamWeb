/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// ./src/client/static/src/webrtc.js
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var isStreamIdValid = function isStreamIdValid(id) {
  return typeof id === 'string' && /^\d{8}$/.test(id);
};
var isStreamPasswordValid = function isStreamPasswordValid(password) {
  return typeof password === 'string' && /^[a-zA-Z0-9]{6}$/.test(password);
};
var DEFAULT_ICE_SERVERS = ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302', 'stun:stun3.l.google.com:19302', 'stun:stun4.l.google.com:19302'];
function getDefaultIceServers() {
  return DEFAULT_ICE_SERVERS.sort(function () {
    return 0.5 - Math.random();
  }).slice(0, 2).map(function (server) {
    return {
      urls: server
    };
  });
}
function log(level, message) {
  var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  console.log("[".concat(level, "] ").concat(message), context);
}
var WebRTC = /*#__PURE__*/function () {
  function WebRTC(clientId, streamState, onNewTrack) {
    _classCallCheck(this, WebRTC);
    this.clientId = clientId;
    this.streamState = streamState;
    this.onNewTrack = onNewTrack;
    this.socket = null;
    this.socketReconnectCounter = 0;
    this.streamPassword = null;
    this.peerConnection = null;
    this.hostOfferTimeout = null;
    this.iceServers = getDefaultIceServers();
    this._isConnecting = false;
    log('debug', 'WebRTC.constructor');
  }
  return _createClass(WebRTC, [{
    key: "isServerOnlineAsync",
    value: function () {
      var _isServerOnlineAsync = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var response;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              log('debug', 'WebRTC.isServerOnlineAsync');
              _context.prev = 1;
              _context.next = 4;
              return fetch('/app/ping');
            case 4:
              response = _context.sent;
              return _context.abrupt("return", response.status === 204);
            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](1);
              return _context.abrupt("return", false);
            case 11:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[1, 8]]);
      }));
      function isServerOnlineAsync() {
        return _isServerOnlineAsync.apply(this, arguments);
      }
      return isServerOnlineAsync;
    }()
  }, {
    key: "waitForServerOnlineAndConnect",
    value: function () {
      var _waitForServerOnlineAndConnect = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var _this = this;
        var online;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              log('debug', 'WebRTC.waitForServerOnlineAndConnect');
              if (!this._isConnecting) {
                _context2.next = 4;
                break;
              }
              log('warn', 'WebRTC.waitForServerOnlineAndConnect: Already connecting...');
              return _context2.abrupt("return");
            case 4:
              this._isConnecting = true;
              _context2.next = 7;
              return this.isServerOnlineAsync();
            case 7:
              online = _context2.sent;
              this.streamState.isServerAvailable = online;
              if (online) {
                try {
                  this.connectSocket();
                } catch (error) {
                  this.streamState.error = error;
                } finally {
                  this._isConnecting = false;
                }
              } else {
                this._isConnecting = false;
                setTimeout(function () {
                  return _this.waitForServerOnlineAndConnect();
                }, 3000);
              }
            case 10:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function waitForServerOnlineAndConnect() {
        return _waitForServerOnlineAndConnect.apply(this, arguments);
      }
      return waitForServerOnlineAndConnect;
    }()
  }, {
    key: "connectSocket",
    value: function connectSocket() {
      var _this2 = this;
      log('debug', 'WebRTC.connectSocket');
      this.streamState.isTokenAvailable = true;
      if (this.socket) {
        this.streamState.error = 'WEBRTC_ERROR:SOCKET_EXIST';
        return;
      }
      this.socketReconnectCounter += 1;
      log('debug', "WebRTC.connectSocket: Attempt: ".concat(this.socketReconnectCounter));
      this.socket = io({
        path: '/app/socket',
        transports: ['websocket'],
        auth: {
          clientId: this.clientId
        },
        reconnection: false
      });
      this.socket.on('connect', function () {
        log('debug', 'WebRTC.connectSocket: connect');
        _this2.socketReconnectCounter = 0;
        _this2.streamState.isSocketConnected = true;
        _this2.streamState.isTokenAvailable = false;
      });
      this.socket.on('disconnect', function (reason) {
        log('debug', "WebRTC.connectSocket: [disconnect] => ".concat(reason));
        _this2.cleanupSocket();
        if (_this2.socketReconnectCounter >= 10) {
          log('warn', "WebRTC.connectSocket: failed after [".concat(_this2.socketReconnectCounter, "] attempts. Giving up."));
          _this2.streamState.error = 'WEBRTC_ERROR:SOCKET_CONNECT_FAILED';
        } else {
          setTimeout(function () {
            return _this2.waitForServerOnlineAndConnect();
          }, 3000);
        }
      });
      this.socket.on('connect_error', function (error) {
        log('warn', "WebRTC.connectSocket: [connect_error] => ".concat(error.message), {
          error: error.message
        });
        _this2.cleanupSocket();

        //ERROR:TOKEN_VERIFICATION_FAILED:TURNSTYLE_INVALID_TOKEN:${outcome['error-codes']}
        //ERROR:TOKEN_VERIFICATION_FAILED:TURNSTYLE_INVALID_HOSTNAME:${outcome.hostname}
        //ERROR:TOKEN_VERIFICATION_FAILED:TURNSTYLE_INVALID_CLIENT_ID:${outcome.cdata}
        _this2.streamState.error = error.message || 'WEBRTC_ERROR:CONNECT_ERROR';
      });
      this.socket.on('SOCKET:ERROR', function (error, callback) {
        log('warn', "WebRTC.connectSocket: [SOCKET:ERROR]: ".concat(error.status), {
          error: error.status
        });

        // SOCKET_CHECK_ERROR:UNVERIFIED_SOCKET
        // SOCKET_CHECK_ERROR:INVALID_SOCKET_STATE
        // SOCKET_CHECK_ERROR:NO_CLIENT_ID
        // SOCKET_CHECK_ERROR:UNKNOWN_CLIENT_EVENT
        // SOCKET_CHECK_ERROR:ERROR_LIMIT_REACHED
        _this2.streamState.error = error.status;

        // Server always disconnects socket on this event. 
        _this2.socketReconnectCounter = 5;
        if (callback) callback({
          status: 'OK'
        });
      });
    }
  }, {
    key: "cleanupSocket",
    value: function cleanupSocket() {
      this.socket = null;
      this.streamState.isSocketConnected = false;
      this.streamState.isServerAvailable = false;
      this.streamState.isTokenAvailable = false;
      if (this.streamState.isStreamJoined && !this.streamState.isStreamRunning) {
        this.leaveStream(false);
      }
    }
  }, {
    key: "joinStream",
    value: function () {
      var _joinStream = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(streamId, password) {
        var _this3 = this;
        var attempt,
          data,
          hashBuffer,
          hashArray,
          passwordHash,
          _args3 = arguments;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              attempt = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : 0;
              console.log('Joining stream ----', streamId, password);
              this.streamState.error = null;
              if (isStreamIdValid(streamId)) {
                _context3.next = 7;
                break;
              }
              console.log('Bad stream id');
              this.streamState.error = 'ERROR:WRONG_STREAM_ID';
              return _context3.abrupt("return");
            case 7:
              if (this.streamState.isSocketConnected) {
                _context3.next = 11;
                break;
              }
              console.log('No socket connected');
              this.streamState.error = 'WEBRTC_ERROR:NO_SOCKET_CONNECTED';
              return _context3.abrupt("return");
            case 11:
              if (this.socket) {
                _context3.next = 15;
                break;
              }
              console.log('No socket available');
              this.streamState.error = 'WEBRTC_ERROR:NO_SOCKET_AVAILABLE';
              return _context3.abrupt("return");
            case 15:
              if (!this.streamState.isJoiningStream) {
                _context3.next = 18;
                break;
              }
              console.log('Already joining stream');
              return _context3.abrupt("return");
            case 18:
              console.log('Joining stream', streamId);
              this.streamState.isJoiningStream = true;
              _context3.prev = 20;
              data = this.clientId + streamId + password;
              _context3.next = 24;
              return window.crypto.subtle.digest('SHA-384', new TextEncoder().encode(data));
            case 24:
              hashBuffer = _context3.sent;
              hashArray = Array.from(new Uint8Array(hashBuffer));
              passwordHash = btoa(String.fromCharCode.apply(String, hashArray)).replace(/\+/g, '-').replace(/\//g, '_');
              console.log('Joining stream', streamId, passwordHash);
              this.socket.timeout(5000).emit('STREAM:JOIN', {
                streamId: streamId,
                passwordHash: passwordHash
              }, function (error, response) {
                var _response$iceServers;
                _this3.streamState.isJoiningStream = false;
                if (error) {
                  log('debug', "WebRTC.joinStream: [STREAM:JOIN] timeout: ".concat(error));
                  _this3.streamState.error = 'ERROR:TIMEOUT:STREAM:JOIN';
                  return;
                }
                if (!response || response.status !== 'OK') {
                  log('warn', "WebRTC.joinStream: [STREAM:JOIN] error: ".concat(JSON.stringify(response)), {
                    socket_event: '[STREAM:JOIN]',
                    error: response
                  });
                  _this3.streamState.error = response.status;
                  return;
                }
                log('debug', 'WebRTC.joinStream: [STREAM:JOIN] OK', {
                  socket_event: '[STREAM:JOIN]'
                });
                _this3.streamState.streamId = streamId;
                _this3.streamPassword = password;
                _this3.streamState.isStreamJoined = true;
                _this3.iceServers = (_response$iceServers = response.iceServers) !== null && _response$iceServers !== void 0 && _response$iceServers.length ? response.iceServers : getDefaultIceServers();
                _this3.setupSocketEventListeners(attempt);
              });
              _context3.next = 35;
              break;
            case 31:
              _context3.prev = 31;
              _context3.t0 = _context3["catch"](20);
              this.streamState.isJoiningStream = false;
              this.streamState.error = _context3.t0;
            case 35:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[20, 31]]);
      }));
      function joinStream(_x, _x2) {
        return _joinStream.apply(this, arguments);
      }
      return joinStream;
    }()
  }, {
    key: "setupSocketEventListeners",
    value: function setupSocketEventListeners(attempt) {
      var _this4 = this;
      this.socket.off('STREAM:START').off('STREAM:STOP').off('REMOVE:CLIENT').off('REMOVE:STREAM');
      this.socket.on('STREAM:START', function () {
        log('debug', 'WebRTC: receive [STREAM:START]', {
          socket_event: '[STREAM:START]'
        });
        _this4.startStream(attempt);
      });
      this.socket.on('STREAM:STOP', function () {
        log('debug', 'WebRTC: receive [STREAM:STOP]', {
          socket_event: '[STREAM:STOP]'
        });
        _this4.stopStream();
      });
      this.socket.on('REMOVE:CLIENT', function (callback) {
        log('debug', 'WebRTC: receive [REMOVE:CLIENT]', {
          socket_event: '[REMOVE:CLIENT]'
        });
        if (callback) callback({
          status: 'OK'
        });
        _this4.leaveStream(false);
      });
      this.socket.on('REMOVE:STREAM', function () {
        log('debug', 'WebRTC: receive [REMOVE:STREAM]', {
          socket_event: '[REMOVE:STREAM]'
        });
        _this4.leaveStream(false, true);
      });
    }
  }, {
    key: "startStream",
    value: function () {
      var _startStream = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(attempt) {
        var _this5 = this;
        var RTCPeerConnection;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              log('debug', "WebRTC.startStream [".concat(attempt, "]"));
              if (this.peerConnection) {
                log('warn', 'WebRTC.startStream: Existing PeerConnection found. Stopping it first.');
                this.stopStream();
              }
              RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
              this.peerConnection = new RTCPeerConnection({
                bundlePolicy: 'balanced',
                iceServers: this.iceServers
              });
              this.hostOfferTimeout = setTimeout(function () {
                log('info', 'WebRTC.startStream: HOST:OFFER timeout. Leaving stream.');
                _this5.leaveStream(true);
              }, 5000);
              this.peerConnection.oniceconnectionstatechange = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
                var state, stats, hasTurnServer;
                return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                  while (1) switch (_context4.prev = _context4.next) {
                    case 0:
                      state = _this5.peerConnection.iceConnectionState;
                      log('debug', "WebRTC.startStream: PeerConnection: iceConnectionState change to \"".concat(state, "\"."));
                      if (!(state === 'connected' || state === 'completed')) {
                        _context4.next = 8;
                        break;
                      }
                      _context4.next = 5;
                      return _this5.peerConnection.getStats();
                    case 5:
                      stats = _context4.sent;
                      hasTurnServer = _this5.iceServers.some(function (server) {
                        return server.urls.startsWith('turn:');
                      });
                      stats.forEach(function (report) {
                        if (report.type === 'candidate-pair' && report.state === 'succeeded') {
                          var localCandidate = stats.get(report.localCandidateId);
                          var remoteCandidate = stats.get(report.remoteCandidateId);
                          if (localCandidate && remoteCandidate) {
                            var localType = localCandidate.candidateType;
                            var remoteType = remoteCandidate.candidateType;
                            var relayProtocol = 'UNKNOWN';
                            if (localType === 'relay' || remoteType === 'relay') {
                              relayProtocol = 'TURN';
                            } else if (['srflx', 'prflx'].includes(localType) || ['srflx', 'prflx'].includes(remoteType)) {
                              relayProtocol = 'STUN';
                            } else if (localType === 'host' || remoteType === 'host') {
                              relayProtocol = 'HOST';
                            }
                            log('debug', "WebRTC.startStream: PeerConnection relay protocol: ".concat(relayProtocol), {
                              relayProtocol: relayProtocol,
                              hasTurnServer: hasTurnServer,
                              localType: localType,
                              remoteType: remoteType
                            });
                          }
                        }
                      });
                    case 8:
                    case "end":
                      return _context4.stop();
                  }
                }, _callee4);
              }));
              this.peerConnection.onconnectionstatechange = function () {
                var state = _this5.peerConnection.connectionState;
                log('debug', "WebRTC.startStream: PeerConnection: connectionState change to \"".concat(state, "\"."));
                if (state === 'disconnected' || state === 'failed') {
                  if (attempt === 0 && _this5.streamState.isSocketConnected && _this5.streamState.isServerAvailable) {
                    log('info', 'WebRTC.startStream: PeerConnection: Attempting to reconnect...');
                    var streamId = _this5.streamState.streamId;
                    var password = _this5.streamPassword;
                    _this5.leaveStream(true);
                    setTimeout(function () {
                      return _this5.joinStream(streamId, password, attempt + 1);
                    }, 1000);
                  } else {
                    log('info', 'WebRTC.startStream: PeerConnection: Reconnection failed. Stopping stream.');
                    _this5.leaveStream(true);
                  }
                }
              };
              this.peerConnection.ontrack = function (event) {
                _this5.onNewTrack(event.track);
                _this5.streamState.isStreamRunning = true;
              };
              this.peerConnection.onicecandidate = function (event) {
                if (event.candidate) {
                  _this5.socket.timeout(5000).emit('CLIENT:CANDIDATE', {
                    candidate: event.candidate.toJSON()
                  }, function (error, response) {
                    if (error) {
                      log('debug', "WebRTC.startStream: [CLIENT:CANDIDATE] timeout: ".concat(error));
                      _this5.streamState.error = 'ERROR:TIMEOUT:CLIENT:CANDIDATE';
                    } else if (!response || response.status !== 'OK') {
                      log('warn', "WebRTC.startStream: Error: ".concat(JSON.stringify(response)), {
                        socket_event: '[CLIENT:CANDIDATE]',
                        error: response
                      });
                      _this5.streamState.error = 'WEBRTC_ERROR:NEGOTIATION_ERROR:CLIENT_CANDIDATE';
                    } else {
                      log('debug', 'WebRTC.startStream: [CLIENT:CANDIDATE] send OK', {
                        socket_event: '[CLIENT:CANDIDATE]'
                      });
                    }
                  });
                } else {
                  _this5.peerConnection.onicecandidate = null;
                }
              };
              this.socket.on('HOST:CANDIDATE', function (hostCandidates, callback) {
                if (!hostCandidates || !hostCandidates.candidates) {
                  if (callback) callback({
                    status: 'ERROR:EMPTY_OR_BAD_DATA'
                  });
                  console.log('Error in host candidates', hostCandidates);
                  _this5.streamState.error = 'WEBRTC_ERROR:NEGOTIATION_ERROR:HOST_CANDIDATE';
                  return;
                }
                if (callback) callback({
                  status: 'OK'
                });
                log('debug', 'WebRTC.startStream: receive [HOST:CANDIDATE]', {
                  socket_event: '[HOST:CANDIDATE]'
                });
                hostCandidates.candidates.forEach(function (candidate) {
                  _this5.peerConnection.addIceCandidate(new RTCIceCandidate(candidate))["catch"](function (error) {
                    log('warn', 'WebRTC.startStream: Failed to add host candidate', {
                      socket_event: '[HOST:CANDIDATE]',
                      error: error
                    });
                  });
                });
              });
              this.socket.once('HOST:OFFER', /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(hostOffer, callback) {
                  var answer;
                  return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                    while (1) switch (_context5.prev = _context5.next) {
                      case 0:
                        clearTimeout(_this5.hostOfferTimeout);
                        _this5.hostOfferTimeout = null;
                        if (!(!hostOffer || !hostOffer.offer)) {
                          _context5.next = 7;
                          break;
                        }
                        if (callback) callback({
                          status: 'ERROR:EMPTY_OR_BAD_DATA'
                        });
                        console.log('Error in host offer', hostOffer);
                        _this5.streamState.error = 'WEBRTC_ERROR:NEGOTIATION_ERROR:HOST_OFFER';
                        return _context5.abrupt("return");
                      case 7:
                        if (callback) callback({
                          status: 'OK'
                        });
                        log('debug', 'WebRTC.startStream: receive [HOST:OFFER]', {
                          socket_event: '[HOST:OFFER]'
                        });
                        _context5.prev = 9;
                        _context5.next = 12;
                        return _this5.peerConnection.setRemoteDescription(new RTCSessionDescription({
                          type: 'offer',
                          sdp: hostOffer.offer
                        }));
                      case 12:
                        _context5.next = 14;
                        return _this5.peerConnection.createAnswer({
                          voiceActivityDetection: false
                        });
                      case 14:
                        answer = _context5.sent;
                        _context5.next = 17;
                        return _this5.peerConnection.setLocalDescription(answer);
                      case 17:
                        _this5.socket.timeout(5000).emit('CLIENT:ANSWER', {
                          answer: answer.sdp
                        }, function (error, response) {
                          if (error) {
                            log('debug', "WebRTC.startStream: [CLIENT:ANSWER] timeout: ".concat(error));
                            _this5.streamState.error = 'ERROR:TIMEOUT:CLIENT:ANSWER';
                          } else if (!response || response.status !== 'OK') {
                            log('warn', "WebRTC.startStream: Error: ".concat(JSON.stringify(response)), {
                              socket_event: '[CLIENT:ANSWER]',
                              error: response
                            });
                            _this5.streamState.error = 'WEBRTC_ERROR:NEGOTIATION_ERROR:CLIENT_ANSWER';
                          } else {
                            log('debug', 'WebRTC.startStream: [CLIENT:ANSWER] send OK', {
                              socket_event: '[CLIENT:ANSWER]'
                            });
                          }
                        });
                        _context5.next = 24;
                        break;
                      case 20:
                        _context5.prev = 20;
                        _context5.t0 = _context5["catch"](9);
                        log('error', 'WebRTC.startStream: Error during offer/answer negotiation', {
                          socket_event: '[CLIENT:ANSWER]',
                          error: _context5.t0
                        });
                        _this5.streamState.error = _context5.t0;
                      case 24:
                      case "end":
                        return _context5.stop();
                    }
                  }, _callee5, null, [[9, 20]]);
                }));
                return function (_x4, _x5) {
                  return _ref2.apply(this, arguments);
                };
              }());
            case 11:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function startStream(_x3) {
        return _startStream.apply(this, arguments);
      }
      return startStream;
    }()
  }, {
    key: "stopStream",
    value: function stopStream() {
      log('debug', 'WebRTC.stopStream');
      clearTimeout(this.hostOfferTimeout);
      this.hostOfferTimeout = null;
      if (this.socket) {
        this.socket.off('HOST:CANDIDATE').off('HOST:OFFER');
      }
      if (this.peerConnection) {
        this.peerConnection.close();
        this.peerConnection = null;
      }
      this.streamState.isStreamRunning = false;
    }
  }, {
    key: "leaveStream",
    value: function leaveStream() {
      var notifyServer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var forcedByServer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      log('debug', "WebRTC.leaveStream: notifyServer=".concat(notifyServer, ", forcedByServer=").concat(forcedByServer));
      this.stopStream();
      if (this.socket) {
        this.socket.off('STREAM:START').off('STREAM:STOP').off('REMOVE:CLIENT').off('REMOVE:STREAM');
      }
      if (notifyServer && this.socket) {
        this.socket.timeout(5000).emit('STREAM:LEAVE', function (error, response) {
          if (error) {
            log('debug', "WebRTC.leaveStream: [STREAM:LEAVE] timeout: ".concat(error));
          } else if (!response || response.status !== 'OK') {
            log('warn', "WebRTC.leaveStream: Error: ".concat(JSON.stringify(response)), {
              socket_event: '[STREAM:LEAVE]',
              error: response
            });
          } else {
            log('debug', 'WebRTC.leaveStream: [STREAM:LEAVE] send OK', {
              socket_event: '[STREAM:LEAVE]'
            });
          }
        });
      }
      this.streamState.isStreamJoined = false;
      this.streamState.streamId = null;
      this.streamPassword = null;
    }
  }, {
    key: "sendClickEvent",
    value: function sendClickEvent(x, y) {
      if (this.streamState.isStreamJoined && this.streamState.isStreamRunning && this.socket) {
        var event = {
          x: x,
          y: y
        };
        this.socket.emit('CLIENT:CLICK', event);
      }
    }
  }]);
}();
;// ./src/client/static/src/device.gesture.handler.js
function device_gesture_handler_typeof(o) { "@babel/helpers - typeof"; return device_gesture_handler_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, device_gesture_handler_typeof(o); }
function device_gesture_handler_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function device_gesture_handler_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, device_gesture_handler_toPropertyKey(o.key), o); } }
function device_gesture_handler_createClass(e, r, t) { return r && device_gesture_handler_defineProperties(e.prototype, r), t && device_gesture_handler_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function device_gesture_handler_toPropertyKey(t) { var i = device_gesture_handler_toPrimitive(t, "string"); return "symbol" == device_gesture_handler_typeof(i) ? i : i + ""; }
function device_gesture_handler_toPrimitive(t, r) { if ("object" != device_gesture_handler_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != device_gesture_handler_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var DeviceGestureHandler = /*#__PURE__*/function () {
  function DeviceGestureHandler(videoElement) {
    device_gesture_handler_classCallCheck(this, DeviceGestureHandler);
    this.videoElement = videoElement;
    this.fullScreenDeviceWidth = 1080;
    this.fullScreenDeviceHeight = 2340;
    this.videoElement.addEventListener('click', this.handleClick.bind(this));
    this.videoElement.addEventListener('touchstart', this.handleTouchStart.bind(this));
    this.videoElement.addEventListener('touchend', this.handleTouchEnd.bind(this));
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchStartTime = 0;
    this.swipeMaxDuration = 500; // Giới hạn thời gian vuốt (ms)
  }
  return device_gesture_handler_createClass(DeviceGestureHandler, [{
    key: "setOnClick",
    value: function setOnClick(onClick) {
      this.onClick = onClick;
    }
  }, {
    key: "setOnDoubleClick",
    value: function setOnDoubleClick(onDoubleClick) {
      this.onDoubleClick = onDoubleClick;
    }
  }, {
    key: "setOnLongPress",
    value: function setOnLongPress(onLongPress) {
      this.onLongPress = onLongPress;
    }
  }, {
    key: "setOnSwipe",
    value: function setOnSwipe(onSwipe) {
      this.onSwipe = onSwipe;
    }
  }, {
    key: "handleClick",
    value: function handleClick(e) {
      var deviceCoordinate = this.webCordianteToDeviceCoordinate(e.clientX, e.clientY);
      if (this.onClick) {
        this.onClick(deviceCoordinate.x, deviceCoordinate.y);
      }
    }
  }, {
    key: "handleTouchStart",
    value: function handleTouchStart(e) {
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
      this.touchStartTime = Date.now(); // Ghi lại thời điểm bắt đầu chạm
    }
  }, {
    key: "handleTouchEnd",
    value: function handleTouchEnd(e) {
      var touchEndX = e.changedTouches[0].clientX;
      var touchEndY = e.changedTouches[0].clientY;
      var touchDuration = Date.now() - this.touchStartTime; // Thời gian diễn ra vuốt

      // Nếu vuốt mất quá lâu, bỏ qua
      if (touchDuration > this.swipeMaxDuration) {
        console.log("Vuốt quá lâu, không phải swipe hợp lệ.");
        return;
      }
      var diffX = touchEndX - this.touchStartX;
      var diffY = touchEndY - this.touchStartY;
      var direction = null;
      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 30) {
          direction = "right";
        } else if (diffX < -30) {
          direction = "left";
        }
      } else {
        if (diffY > 30) {
          direction = "down";
        } else if (diffY < -30) {
          direction = "up";
        }
      }
      if (direction && this.onSwipe) {
        this.onSwipe(direction, touchDuration);
      }
    }
  }, {
    key: "webCordianteToDeviceCoordinate",
    value: function webCordianteToDeviceCoordinate(x, y) {
      var videoWidth = this.videoElement.offsetWidth;
      var videoHeight = this.videoElement.offsetHeight;
      var displayDeviceWidth = this.fullScreenDeviceWidth / this.fullScreenDeviceHeight * videoHeight;
      var displayDeviceHeight = videoHeight;
      var xOnDisplayDevice = x - (videoWidth - displayDeviceWidth) / 2;
      var yOnDisplayDevice = y;
      var xOnDevice = xOnDisplayDevice / displayDeviceWidth * this.fullScreenDeviceWidth;
      var yOnDevice = yOnDisplayDevice / displayDeviceHeight * this.fullScreenDeviceHeight;
      return {
        x: xOnDevice,
        y: yOnDevice
      };
    }
  }]);
}();
;// ./src/client/static/src/main.js


function main_log(level, message) {
  var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  console.log("[".concat(level, "] ").concat(message), context);
}
var clientId = generateRandomString(24);
var crc = ('00000000' + CRC32(clientId).toString(16).toUpperCase()).slice(-8);
var publicId = crc.substring(0, 4) + "-" + crc.substring(4);
var UIElements = {
  startContainer: document.getElementById('start-container'),
  streamIdInput: document.getElementById('stream-id'),
  passwordInput: document.getElementById('stream-password'),
  streamJoinButton: document.getElementById('streamJoinButton'),
  joinButtonLoader: document.getElementById('joinButtonLoader'),
  streamJoinCell: document.getElementById('stream-join'),
  streamErrorCell: document.getElementById('stream-error'),
  streamWaitContainer: document.getElementById('stream-wait-container'),
  streamWaitStreamId: document.getElementById('stream-wait-stream-id'),
  streamingHeader: document.getElementById('streaming-header'),
  streamingContainerText: document.getElementById('streaming-container-text'),
  videoContainer: document.getElementById('video-container'),
  videoElement: document.getElementById('video-element')
};
window.streamState = new Proxy({
  isServerAvailable: false,
  isTokenAvailable: false,
  isSocketConnected: false,
  isJoiningStream: false,
  streamId: null,
  isStreamJoined: false,
  isStreamRunning: false,
  error: null
}, {
  set: function set(target, key, value) {
    var oldValue = target[key];
    target[key] = value;
    onNewState(key, oldValue, value, target);
    return true;
  }
});
var setDataFromUrlParams = function setDataFromUrlParams() {
  var urlParams = new URLSearchParams(window.location.search);
  var streamId = urlParams.get('id');
  if (isStreamIdValid(streamId)) {
    UIElements.streamIdInput.value = streamId;
    var streamPassword = urlParams.get('p');
    if (isStreamPasswordValid(streamPassword)) {
      UIElements.passwordInput.value = streamPassword;
    }
  }
};
var checkWebRTCSupport = function checkWebRTCSupport() {
  var RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
  if (typeof RTCPeerConnection === 'undefined') {
    window.streamState.error = "ERROR:WEBRTC_NOT_SUPPORTED";
  }
};
var initialize = function initialize() {
  setDataFromUrlParams();
  checkWebRTCSupport();
};
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}
try {
  document.getElementById('client-id').innerText = publicId;
  var s = 'Client id: ' + publicId;
  document.getElementById('streaming-client-id').innerText = s;
  document.getElementById('stream-wait-client-id').innerText = s;
} catch (error) {
  main_log('warn', "client-id.error: ".concat(error.message), {
    error: error
  });
}
var hideTimeout = null;
var streamingContainerOnMouseMove = function streamingContainerOnMouseMove() {
  UIElements.streamingHeader.className = 'visible';
  clearTimeout(hideTimeout);
  hideTimeout = setTimeout(function () {
    UIElements.streamingHeader.className = 'hidden';
  }, 2500);
};
var streamingContainerOnMouseOut = function streamingContainerOnMouseOut() {
  clearTimeout(hideTimeout);
  UIElements.streamingHeader.className = 'hidden';
};
var onNewState = function onNewState(key, oldValue, newValue, state) {
  if (newValue === oldValue) return;
  main_log('debug', "onNewState: [".concat(key, "] ").concat(oldValue, " => ").concat(newValue, "\n").concat(JSON.stringify(state)));
  if (key === 'error' && state.error) {
    main_log('warn', "onNewState.error: ".concat(state.error), {
      error: state.error
    });
  }
  UIElements.startContainer.style.display = !state.isStreamJoined ? 'block' : 'none';
  UIElements.streamWaitContainer.style.display = state.isStreamJoined && !state.isStreamRunning ? 'block' : 'none';
  UIElements.streamingHeader.style.display = state.isStreamRunning ? 'block' : 'none';
  UIElements.videoContainer.style.display = state.isStreamRunning ? 'block' : 'none';
  UIElements.joinButtonLoader.style.display = !state.isServerAvailable || state.isServerAvailable && state.isTokenAvailable || state.isJoiningStream ? 'block' : 'none';
  UIElements.streamJoinButton.style.display = state.isSocketConnected && !state.isJoiningStream ? 'table-cell' : 'none';
  UIElements.streamErrorCell.style.display = state.error ? 'block' : 'none';
  if (state.error) {
    switch (state.error) {
      case 'ERROR:TURNSTILE:200100':
        UIElements.streamErrorCell.innerText = 'Incorrect device clock time. Please adjust and reload the page.';
        UIElements.streamJoinCell.style.display = 'none';
        UIElements.streamJoinButton.style.display = 'none';
        UIElements.joinButtonLoader.style.display = 'none';
        break;
      case 'ERROR:WRONG_STREAM_ID':
        UIElements.streamErrorCell.innerText = 'Wrong stream id';
        break;
      case 'ERROR:NO_STREAM_HOST_FOUND':
        UIElements.streamErrorCell.innerText = 'Stream not found';
        break;
      case 'ERROR:WRONG_STREAM_PASSWORD':
        UIElements.streamErrorCell.innerText = 'Wrong stream password';
        break;
      default:
        UIElements.streamErrorCell.innerText = 'Something went wrong. Reload this page and try again.' + "\n[".concat(state.error, "]\n\n");
        UIElements.streamJoinCell.style.display = 'none';
        UIElements.streamJoinButton.style.display = 'none';
        UIElements.joinButtonLoader.style.display = 'none';
        break;
    }
  }
  if (key === 'isStreamJoined' && state.isStreamJoined) {
    UIElements.streamWaitStreamId.innerText = 'Stream Id: {streamId}'.replace('{streamId}', state.streamId);
    UIElements.streamingContainerText.innerText = 'Stream Id: {streamId}'.replace('{streamId}', state.streamId);
  }
  if (key === 'isStreamRunning') {
    if (state.isStreamRunning) {
      window.addEventListener('mousemove', streamingContainerOnMouseMove);
      window.addEventListener('touchstart', streamingContainerOnMouseMove);
      window.addEventListener('mouseout', streamingContainerOnMouseOut);
      streamingContainerOnMouseMove();
    } else {
      if (UIElements.videoElement && UIElements.videoElement.srcObject) {
        UIElements.videoElement.srcObject.getTracks().forEach(function (track) {
          return track.stop();
        });
        UIElements.videoElement.srcObject = null;
      }
      clearTimeout(hideTimeout);
      window.removeEventListener('mousemove', streamingContainerOnMouseMove);
      window.removeEventListener('touchstart', streamingContainerOnMouseMove);
      window.removeEventListener('mouseout', streamingContainerOnMouseOut);
    }
  }
};
var onNewTrack = function onNewTrack(track) {
  main_log('debug', "onNewTrack: ".concat(track.id), {
    track_id: track.id
  });
  if (!UIElements.videoElement.srcObject) {
    UIElements.videoElement.srcObject = new MediaStream();
  }
  UIElements.videoElement.srcObject.addTrack(track);
};
var webRTC = new WebRTC(clientId, window.streamState, onNewTrack);
document.getElementById('streamLeaveButton').addEventListener('click', function (e) {
  e.preventDefault();
  webRTC.leaveStream(true);
});
document.getElementById('streamWaitLeaveButton').addEventListener('click', function (e) {
  e.preventDefault();
  webRTC.leaveStream(true);
});
UIElements.streamJoinButton.addEventListener('click', function (e) {
  e.preventDefault();
  webRTC.joinStream(UIElements.streamIdInput.value, UIElements.passwordInput.value);
});
webRTC.waitForServerOnlineAndConnect();
window.addEventListener('beforeunload', function () {
  webRTC.leaveStream(false);
});

// UIElements.videoContainer.addEventListener('click', function (e) {
//     // show cords
//     var x = e.clientX;
//     var y = e.clientY;
//     console.log('x: ', x, ';y: ', y);
//     var videoWidth = UIElements.videoElement.offsetWidth;
//     var videoHeight = UIElements.videoElement.offsetHeight;
//     console.log('videoWidth: ', videoWidth, ';videoHeight: ', videoHeight);

//     var fullScreenDeviceWidth = 1080;
//     var fullScreenDeviceHeight = 2340;

//     var displayDeviceWidth = fullScreenDeviceWidth / fullScreenDeviceHeight * videoHeight;
//     var displayDeviceHeight = videoHeight;

//     var xOnDisplayDevice = x - (videoWidth - displayDeviceWidth) / 2;
//     var yOnDisplayDevice = y;

//     var xOnDevice = xOnDisplayDevice / displayDeviceWidth * fullScreenDeviceWidth;
//     var yOnDevice = yOnDisplayDevice / displayDeviceHeight * fullScreenDeviceHeight;
//     console.log('xOnDevice: ', xOnDevice, ';yOnDevice: ', yOnDevice);  

//     webRTC.sendClickEvent(Math.round(xOnDevice), Math.round(yOnDevice));
// });
var deviceGestureHandler = new DeviceGestureHandler(UIElements.videoContainer);
deviceGestureHandler.setOnClick(function (x, y) {
  console.log("Send click event: ", x, y);
  webRTC.sendClickEvent(x, y);
});
function generateRandomString(length) {
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  var result = '';
  var array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  for (var i = 0; i < length; i++) {
    result += characters.charAt(array[i] % charactersLength);
  }
  return result;
}
function CRC32(r) {
  for (var a, o = [], c = 0; c < 256; c++) {
    a = c;
    for (var f = 0; f < 8; f++) a = 1 & a ? 3988292384 ^ a >>> 1 : a >>> 1;
    o[c] = a;
  }
  for (var n = -1, t = 0; t < r.length; t++) n = n >>> 8 ^ o[255 & (n ^ r.charCodeAt(t))];
  return (-1 ^ n) >>> 0;
}
;
/******/ })()
;