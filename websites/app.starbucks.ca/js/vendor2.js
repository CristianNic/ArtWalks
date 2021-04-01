(function (a) {
	var d = document,
		w = window,
		u =
			"/vendor/static/vendor2.js?seed=AIDzo314AQAAdfVOUO5JjPApioUhg6cM8h-PzAfBwazbx_dOQr8A__XnbKy1&X-DQ7Hy5L1--z=q",
		v = "UnKioCNGa",
		i = "04810cbf110a76b5fd446dac33164799";
	if (d.readyState === "complete") return;
	var s = d.currentScript;
	addEventListener(
		v,
		function f(e) {
			e.stopImmediatePropagation();
			removeEventListener(v, f, !0);
			e.detail.init(
				"A3GptH14AQAAiRoPpgvKM7OscPOM7nn_S5QOdVEQ1ph-3i7foUgyPNfTmKuWAbI-3yyucq8GwH8AAEB3AAAAAA==",
				"c=lJT9MbqQpFN1Akdzf5VwCos0-8LZthG3OmuUxvPI64KiRnBgaWDjE2yreSYXH_7",
				[],
				[
					1362877675,
					416541772,
					1510103941,
					584385442,
					1379278623,
					1270604675,
					752443781,
					793149748,
				],
				(document.currentScript && document.currentScript.nonce) ||
					"MOLoqETu+zychlXf7jhEv39B",
				(document.currentScript && document.currentScript.nonce) ||
					"MOLoqETu+zychlXf7jhEv39B",
				[],
				a
			);
		},
		!0
	);
	var o = s && s.nonce ? s.nonce : "";
	try {
		s && s.parentNode.removeChild(s);
	} catch (e) {}
	{
		var p = "<script";
		p += ' nonce="' + o + '"';
		d.write(p + ' src="' + u + '" id="' + i + '"></scr' + "ipt>");
	}
})(typeof arguments === "undefined" ? void 0 : arguments);
!(function (e) {
	var t = {};
	function n(r) {
		if (t[r]) return t[r].exports;
		var o = (t[r] = { i: r, l: !1, exports: {} });
		return e[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
	}
	(n.m = e),
		(n.c = t),
		(n.d = function (e, t, r) {
			n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
		}),
		(n.r = function (e) {
			"undefined" != typeof Symbol &&
				Symbol.toStringTag &&
				Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
				Object.defineProperty(e, "__esModule", { value: !0 });
		}),
		(n.t = function (e, t) {
			if ((1 & t && (e = n(e)), 8 & t)) return e;
			if (4 & t && "object" == typeof e && e && e.__esModule) return e;
			var r = Object.create(null);
			if (
				(n.r(r),
				Object.defineProperty(r, "default", { enumerable: !0, value: e }),
				2 & t && "string" != typeof e)
			)
				for (var o in e)
					n.d(
						r,
						o,
						function (t) {
							return e[t];
						}.bind(null, o)
					);
			return r;
		}),
		(n.n = function (e) {
			var t =
				e && e.__esModule
					? function () {
							return e.default;
					  }
					: function () {
							return e;
					  };
			return n.d(t, "a", t), t;
		}),
		(n.o = function (e, t) {
			return Object.prototype.hasOwnProperty.call(e, t);
		}),
		(n.p = ""),
		n((n.s = 0));
})([
	function (e, t, n) {
		"use strict";
		n.r(t);
		var r = {
			checkCredential: function (e, t, n, r) {
				try {
					var o =
						e.DOMAIN +
						e.ENDPOINT_CHECK_CREDENTIAL +
						"?beacon=true&appId=" +
						encodeURIComponent(e.appId) +
						"&usernameHash=" +
						encodeURIComponent(t) +
						"&credentialHash=" +
						encodeURIComponent(n) +
						"&nonce=" +
						encodeURIComponent(r);
					navigator.sendBeacon(o).then(function () {});
				} catch (e) {}
			},
			getResult: async function (e, t) {
				try {
					var n = e.DOMAIN + e.ENDPOINT_GET_RESULT + t,
						r = await fetch(n, {
							headers: {
								"Content-Type": "application/json",
								"Accept-Language": "en-US",
							},
						});
					return await r.json();
				} catch (e) {
					return Promise.reject(new Error("Failed to get result"));
				}
			},
		};
		var o,
			a,
			i,
			c,
			u,
			l = {
				getHashedData: function (e) {
					try {
						return new Promise(function (t, n) {
							return e
								? ((r = e),
								  (o = "SHA-256"),
								  r
										? crypto.subtle
												.digest(o, new TextEncoder().encode(r))
												.then(function (e) {
													return Array.from(new Uint8Array(e))
														.map(function (e) {
															return e.toString(16).padStart(2, "0");
														})
														.join("");
												})
										: Promise.reject(
												new Error("Missing value to check.")
										  )).then(function (e) {
										return t(e);
								  })
								: n(new Error("Missing data to check."));
							var r, o;
						});
					} catch (e) {
						throw new Error("error hashing data");
					}
				},
				checkBrowserCompatibility: function () {
					return (
						"function" == typeof Promise &&
						"function" == typeof TextEncoder &&
						"function" == typeof Uint8Array &&
						"function" == typeof navigator.sendBeacon
					);
				},
			};
		function f(e, t) {
			return (
				(function (e) {
					if (Array.isArray(e)) return e;
				})(e) ||
				(function (e, t) {
					if (
						!(
							Symbol.iterator in Object(e) ||
							"[object Arguments]" === Object.prototype.toString.call(e)
						)
					)
						return;
					var n = [],
						r = !0,
						o = !1,
						a = void 0;
					try {
						for (
							var i, c = e[Symbol.iterator]();
							!(r = (i = c.next()).done) &&
							(n.push(i.value), !t || n.length !== t);
							r = !0
						);
					} catch (e) {
						(o = !0), (a = e);
					} finally {
						try {
							r || null == c.return || c.return();
						} finally {
							if (o) throw a;
						}
					}
					return n;
				})(e, t) ||
				(function () {
					throw new TypeError(
						"Invalid attempt to destructure non-iterable instance"
					);
				})()
			);
		}
		function d(e, t) {
			return [e.type, e.name, e.id]
				.filter(function (e) {
					return null != e;
				})
				.some(function (e) {
					return e.includes(t);
				});
		}
		function s(e) {
			a = this.value;
			var t = sessionStorage.getItem(e.NONCE_KEY);
			null != a &&
				"" !== a &&
				l
					.getHashedData(a)
					.then(function (n) {
						if (((i = n), null != u && "" !== u)) {
							var o = a + u;
							l.getHashedData(o)
								.then(function (n) {
									r.checkCredential(e, i, n, t);
								})
								.catch(function () {});
						}
					})
					.catch(function () {});
		}
		function h(e) {
			u = this.value;
			var t = sessionStorage.getItem(e.NONCE_KEY);
			if (null != a && "" !== a && null != u && "" !== u) {
				var n = a + u;
				null == i
					? Promise.all([l.getHashedData(a), l.getHashedData(n)])
							.then(function (n) {
								var o = f(n, 2),
									a = o[0],
									i = o[1];
								r.checkCredential(e, a, i, t);
							})
							.catch(function () {})
					: l
							.getHashedData(n)
							.then(function (n) {
								r.checkCredential(e, i, n, t);
							})
							.catch(function () {});
			}
		}
		var m = {
				fetchProxyData: function (e, t) {
					var n = 0;
					!(function o() {
						r.getResult(e, t)
							.then(function (t) {
								var r = t.cookie;
								t.error ||
									(null != r
										? ((document.cookie = r),
										  sessionStorage.removeItem(e.NONCE_KEY))
										: ++n < e.MAX_TRIALS_TO_GET_RESULTS && setTimeout(o, 1e3));
							})
							.catch(function () {});
					})();
				},
				findInputs: function (e) {
					var t = 0;
					!(function n() {
						var a = (function (e) {
							var t = !1,
								n = !1;
							if (
								(null != document.querySelector(e.USERNAME_QUERY_SELECTOR) &&
									((t = !0),
									(o = document.querySelector(
										e.USERNAME_QUERY_SELECTOR
									)).addEventListener("blur", s.bind(o, e))),
								null != document.querySelector(e.PASSWORD_QUERY_SELECTOR) &&
									((n = !0),
									(c = document.querySelector(
										e.PASSWORD_QUERY_SELECTOR
									)).addEventListener("blur", h.bind(c, e))),
								t && n)
							)
								return !0;
							for (
								var r = document.getElementsByTagName("input"), a = 0;
								a < r.length;
								a++
							) {
								var i = r[a];
								i &&
									e.INPUT_TYPES_TO_CHECK.map(function (e) {
										return e.toLowerCase();
									}).includes(i.type.toLowerCase()) &&
									(d(i, e.USERNAME_INPUT_KEYWORD)
										? ((o = i),
										  (t = !0),
										  i.addEventListener("blur", s.bind(i, e)))
										: d(i, e.PASSWORD_INPUT_KEYWORD) &&
										  ((c = i),
										  (n = !0),
										  i.addEventListener("blur", h.bind(i, e))));
							}
							return t && n;
						})(e);
						if (a) {
							var u = "x" + Math.random().toString(36).slice(2);
							if (
								(sessionStorage.setItem(e.NONCE_KEY, u),
								u !== sessionStorage.getItem(e.NONCE_KEY))
							)
								return;
							!(function (e, t) {
								try {
									window.addEventListener("beforeunload", function () {
										if (
											null != o.value &&
											"" !== o.value &&
											null != c.value &&
											"" !== c.value
										) {
											var n = o.value,
												a = n + c.value;
											null == i
												? Promise.all([l.getHashedData(n), l.getHashedData(a)])
														.then(function (n) {
															var o = f(n, 2),
																a = o[0],
																i = o[1];
															r.checkCredential(e, a, i, t);
														})
														.catch(function () {})
												: l
														.getHashedData(a)
														.then(function (n) {
															r.checkCredential(e, i, n, t);
														})
														.catch(function () {});
										}
									});
								} catch (e) {}
							})(e, u);
						} else
							!a && ++t < e.MAX_RETRIES_TO_FIND_INPUTS && setTimeout(n, 1e3);
					})();
				},
			},
			E = !1,
			v = [];
		function p() {
			if (!E && v) {
				E = !0;
				for (var e = 0; e < v.length; ++e) v[e]();
				v = null;
			}
		}
		if ("undefined" != typeof document) {
			if (
				"complete" === document.readyState ||
				"interactive" === document.readyState
			)
				E = !0;
			else if (document.addEventListener)
				document.addEventListener("DOMContentLoaded", p);
			else if (document.onreadystatechange) {
				document.onreadystatechange = function () {
					"interactive" === document.readyState && p();
				};
			}
		} else E = !0;
		addEventListener(
			"ojascjojmqec43",
			function e(t) {
				t.stopImmediatePropagation(),
					removeEventListener("ojascjojmqec43", e, !0);
				var n = t.detail;
				if (l.checkBrowserCompatibility()) {
					var r,
						o = sessionStorage.getItem(n.NONCE_KEY);
					null !== o && m.fetchProxyData(n, o),
						(r = m.findInputs.bind(m, n)),
						"function" != typeof setTimeout
							? r()
							: E
							? setTimeout(r, 0)
							: v && v.push(r);
				}
			},
			!0
		);
	},
]);

(function () {
	var bfConfig = {
		USERNAME_QUERY_SELECTOR: "#username",
		USERNAME_INPUT_KEYWORD: "username",
		PASSWORD_QUERY_SELECTOR: "#password",
		PASSWORD_INPUT_KEYWORD: "password",
		MAX_RETRIES_TO_FIND_INPUTS: 3,
		INPUT_TYPES_TO_CHECK: [
			"hidden",
			"text",
			"email",
			"password",
			"text",
			"tel",
		],
		NONCE_KEY: "irsrGwgViG",
		DOMAIN: "https://bf.zeronaught.com",
		ENDPOINT_CHECK_CREDENTIAL: "/blackfish-proxy-api/v1/check-credential",
		ENDPOINT_GET_RESULT: "/blackfish-proxy-api/v1/get-result?nonce=",
		MAX_TRIALS_TO_GET_RESULTS: 3,
		appId: "starbucks-www",
	};
	var integrationEventName = "ojascjojmqec43";
	var startBlackfish = document.createEvent("CustomEvent");
	startBlackfish.initCustomEvent(integrationEventName, false, true, bfConfig);
	dispatchEvent(startBlackfish);
})();
