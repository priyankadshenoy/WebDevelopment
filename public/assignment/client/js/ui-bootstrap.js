/*
 * angular-ui-bootstrap
 * http://angular-ui.github.io/bootstrap/

 * Version: 1.2.4 - 2016-03-06
 * License: MIT
 */
angular.module("ui.bootstrap", ["ui.bootstrap.tpls", "ui.bootstrap.collapse", "ui.bootstrap.accordion", "ui.bootstrap.alert", "ui.bootstrap.buttons", "ui.bootstrap.carousel", "ui.bootstrap.dateparser", "ui.bootstrap.isClass", "ui.bootstrap.position", "ui.bootstrap.datepicker", "ui.bootstrap.debounce", "ui.bootstrap.dropdown", "ui.bootstrap.stackedMap", "ui.bootstrap.modal", "ui.bootstrap.paging", "ui.bootstrap.pager", "ui.bootstrap.pagination", "ui.bootstrap.tooltip", "ui.bootstrap.popover", "ui.bootstrap.progressbar", "ui.bootstrap.rating", "ui.bootstrap.tabs", "ui.bootstrap.timepicker", "ui.bootstrap.typeahead"]), angular.module("ui.bootstrap.tpls", ["uib/template/accordion/accordion-group.html", "uib/template/accordion/accordion.html", "uib/template/alert/alert.html", "uib/template/carousel/carousel.html", "uib/template/carousel/slide.html", "uib/template/datepicker/datepicker.html", "uib/template/datepicker/day.html", "uib/template/datepicker/month.html", "uib/template/datepicker/popup.html", "uib/template/datepicker/year.html", "uib/template/modal/backdrop.html", "uib/template/modal/window.html", "uib/template/pager/pager.html", "uib/template/pagination/pagination.html", "uib/template/tooltip/tooltip-html-popup.html", "uib/template/tooltip/tooltip-popup.html", "uib/template/tooltip/tooltip-template-popup.html", "uib/template/popover/popover-html.html", "uib/template/popover/popover-template.html", "uib/template/popover/popover.html", "uib/template/progressbar/bar.html", "uib/template/progressbar/progress.html", "uib/template/progressbar/progressbar.html", "uib/template/rating/rating.html", "uib/template/tabs/tab.html", "uib/template/tabs/tabset.html", "uib/template/timepicker/timepicker.html", "uib/template/typeahead/typeahead-match.html", "uib/template/typeahead/typeahead-popup.html"]), angular.module("ui.bootstrap.collapse", []).directive("uibCollapse", ["$animate", "$q", "$parse", "$injector", function (a, b, c, d) {
    var e = d.has("$animateCss") ? d.get("$animateCss") : null;
    return {
        link: function (d, f, g) {
            function h() {
                f.hasClass("collapse") && f.hasClass("in") || b.resolve(l(d)).then(function () {
                    f.removeClass("collapse").addClass("collapsing").attr("aria-expanded", !0).attr("aria-hidden", !1), e ? e(f, {
                        addClass: "in",
                        easing: "ease",
                        to: {height: f[0].scrollHeight + "px"}
                    }).start()["finally"](i) : a.addClass(f, "in", {to: {height: f[0].scrollHeight + "px"}}).then(i)
                })
            }

            function i() {
                f.removeClass("collapsing").addClass("collapse").css({height: "auto"}), m(d)
            }

            function j() {
                return f.hasClass("collapse") || f.hasClass("in") ? void b.resolve(n(d)).then(function () {
                    f.css({height: f[0].scrollHeight + "px"}).removeClass("collapse").addClass("collapsing").attr("aria-expanded", !1).attr("aria-hidden", !0), e ? e(f, {
                        removeClass: "in",
                        to: {height: "0"}
                    }).start()["finally"](k) : a.removeClass(f, "in", {to: {height: "0"}}).then(k)
                }) : k()
            }

            function k() {
                f.css({height: "0"}), f.removeClass("collapsing").addClass("collapse"), o(d)
            }

            var l = c(g.expanding), m = c(g.expanded), n = c(g.collapsing), o = c(g.collapsed);
            d.$eval(g.uibCollapse) || f.addClass("in").addClass("collapse").attr("aria-expanded", !0).attr("aria-hidden", !1).css({height: "auto"}), d.$watch(g.uibCollapse, function (a) {
                a ? j() : h()
            })
        }
    }
}]), angular.module("ui.bootstrap.accordion", ["ui.bootstrap.collapse"]).constant("uibAccordionConfig", {closeOthers: !0}).controller("UibAccordionController", ["$scope", "$attrs", "uibAccordionConfig", function (a, b, c) {
    this.groups = [], this.closeOthers = function (d) {
        var e = angular.isDefined(b.closeOthers) ? a.$eval(b.closeOthers) : c.closeOthers;
        e && angular.forEach(this.groups, function (a) {
            a !== d && (a.isOpen = !1)
        })
    }, this.addGroup = function (a) {
        var b = this;
        this.groups.push(a), a.$on("$destroy", function (c) {
            b.removeGroup(a)
        })
    }, this.removeGroup = function (a) {
        var b = this.groups.indexOf(a);
        -1 !== b && this.groups.splice(b, 1)
    }
}]).directive("uibAccordion", function () {
    return {
        controller: "UibAccordionController",
        controllerAs: "accordion",
        transclude: !0,
        templateUrl: function (a, b) {
            return b.templateUrl || "uib/template/accordion/accordion.html"
        }
    }
}).directive("uibAccordionGroup", function () {
    return {
        require: "^uibAccordion", transclude: !0, replace: !0, templateUrl: function (a, b) {
            return b.templateUrl || "uib/template/accordion/accordion-group.html"
        }, scope: {heading: "@", isOpen: "=?", isDisabled: "=?"}, controller: function () {
            this.setHeading = function (a) {
                this.heading = a
            }
        }, link: function (a, b, c, d) {
            d.addGroup(a), a.openClass = c.openClass || "panel-open", a.panelClass = c.panelClass || "panel-default", a.$watch("isOpen", function (c) {
                b.toggleClass(a.openClass, !!c), c && d.closeOthers(a)
            }), a.toggleOpen = function (b) {
                a.isDisabled || b && 32 !== b.which || (a.isOpen = !a.isOpen)
            };
            var e = "accordiongroup-" + a.$id + "-" + Math.floor(1e4 * Math.random());
            a.headingId = e + "-tab", a.panelId = e + "-panel"
        }
    }
}).directive("uibAccordionHeading", function () {
    return {
        transclude: !0, template: "", replace: !0, require: "^uibAccordionGroup", link: function (a, b, c, d, e) {
            d.setHeading(e(a, angular.noop))
        }
    }
}).directive("uibAccordionTransclude", function () {
    return {
        require: "^uibAccordionGroup", link: function (a, b, c, d) {
            a.$watch(function () {
                return d[c.uibAccordionTransclude]
            }, function (a) {
                if (a) {
                    var c = angular.element(b[0].querySelector("[uib-accordion-header]"));
                    c.html(""), c.append(a)
                }
            })
        }
    }
}), angular.module("ui.bootstrap.alert", []).controller("UibAlertController", ["$scope", "$attrs", "$interpolate", "$timeout", function (a, b, c, d) {
    a.closeable = !!b.close;
    var e = angular.isDefined(b.dismissOnTimeout) ? c(b.dismissOnTimeout)(a.$parent) : null;
    e && d(function () {
        a.close()
    }, parseInt(e, 10))
}]).directive("uibAlert", function () {
    return {
        controller: "UibAlertController", controllerAs: "alert", templateUrl: function (a, b) {
            return b.templateUrl || "uib/template/alert/alert.html"
        }, transclude: !0, replace: !0, scope: {type: "@", close: "&"}
    }
}), angular.module("ui.bootstrap.buttons", []).constant("uibButtonConfig", {
    activeClass: "active",
    toggleEvent: "click"
}).controller("UibButtonsController", ["uibButtonConfig", function (a) {
    this.activeClass = a.activeClass || "active", this.toggleEvent = a.toggleEvent || "click"
}]).directive("uibBtnRadio", ["$parse", function (a) {
    return {
        require: ["uibBtnRadio", "ngModel"],
        controller: "UibButtonsController",
        controllerAs: "buttons",
        link: function (b, c, d, e) {
            var f = e[0], g = e[1], h = a(d.uibUncheckable);
            c.find("input").css({display: "none"}), g.$render = function () {
                c.toggleClass(f.activeClass, angular.equals(g.$modelValue, b.$eval(d.uibBtnRadio)))
            }, c.on(f.toggleEvent, function () {
                if (!d.disabled) {
                    var a = c.hasClass(f.activeClass);
                    (!a || angular.isDefined(d.uncheckable)) && b.$apply(function () {
                        g.$setViewValue(a ? null : b.$eval(d.uibBtnRadio)), g.$render()
                    })
                }
            }), d.uibUncheckable && b.$watch(h, function (a) {
                d.$set("uncheckable", a ? "" : void 0)
            })
        }
    }
}]).directive("uibBtnCheckbox", function () {
    return {
        require: ["uibBtnCheckbox", "ngModel"],
        controller: "UibButtonsController",
        controllerAs: "button",
        link: function (a, b, c, d) {
            function e() {
                return g(c.btnCheckboxTrue, !0)
            }

            function f() {
                return g(c.btnCheckboxFalse, !1)
            }

            function g(b, c) {
                return angular.isDefined(b) ? a.$eval(b) : c
            }

            var h = d[0], i = d[1];
            b.find("input").css({display: "none"}), i.$render = function () {
                b.toggleClass(h.activeClass, angular.equals(i.$modelValue, e()))
            }, b.on(h.toggleEvent, function () {
                c.disabled || a.$apply(function () {
                    i.$setViewValue(b.hasClass(h.activeClass) ? f() : e()), i.$render()
                })
            })
        }
    }
}), angular.module("ui.bootstrap.carousel", []).controller("UibCarouselController", ["$scope", "$element", "$interval", "$timeout", "$animate", function (a, b, c, d, e) {
    function f() {
        for (; t.length;)t.shift()
    }

    function g(a) {
        for (var b = 0; b < q.length; b++)q[b].slide.active = b === a
    }

    function h(c, d, i) {
        if (!u) {
            if (angular.extend(c, {direction: i}), angular.extend(q[s].slide || {}, {direction: i}), e.enabled(b) && !a.$currentTransition && q[d].element && p.slides.length > 1) {
                q[d].element.data(r, c.direction);
                var j = p.getCurrentIndex();
                angular.isNumber(j) && q[j].element && q[j].element.data(r, c.direction), a.$currentTransition = !0, e.on("addClass", q[d].element, function (b, c) {
                    if ("close" === c && (a.$currentTransition = null, e.off("addClass", b), t.length)) {
                        var d = t.pop().slide, g = d.index, i = g > p.getCurrentIndex() ? "next" : "prev";
                        f(), h(d, g, i)
                    }
                })
            }
            a.active = c.index, s = c.index, g(d), l()
        }
    }

    function i(a) {
        for (var b = 0; b < q.length; b++)if (q[b].slide === a)return b
    }

    function j() {
        n && (c.cancel(n), n = null)
    }

    function k(b) {
        b.length || (a.$currentTransition = null, f())
    }

    function l() {
        j();
        var b = +a.interval;
        !isNaN(b) && b > 0 && (n = c(m, b))
    }

    function m() {
        var b = +a.interval;
        o && !isNaN(b) && b > 0 && q.length ? a.next() : a.pause()
    }

    var n, o, p = this, q = p.slides = a.slides = [], r = "uib-slideDirection", s = a.active, t = [], u = !1;
    p.addSlide = function (b, c) {
        q.push({slide: b, element: c}), q.sort(function (a, b) {
            return +a.slide.index > +b.slide.index
        }), (b.index === a.active || 1 === q.length && !angular.isNumber(a.active)) && (a.$currentTransition && (a.$currentTransition = null), s = b.index, a.active = b.index, g(s), p.select(q[i(b)]), 1 === q.length && a.play())
    }, p.getCurrentIndex = function () {
        for (var a = 0; a < q.length; a++)if (q[a].slide.index === s)return a
    }, p.next = a.next = function () {
        var b = (p.getCurrentIndex() + 1) % q.length;
        return 0 === b && a.noWrap() ? void a.pause() : p.select(q[b], "next")
    }, p.prev = a.prev = function () {
        var b = p.getCurrentIndex() - 1 < 0 ? q.length - 1 : p.getCurrentIndex() - 1;
        return a.noWrap() && b === q.length - 1 ? void a.pause() : p.select(q[b], "prev")
    }, p.removeSlide = function (b) {
        var c = i(b), d = t.indexOf(q[c]);
        -1 !== d && t.splice(d, 1), q.splice(c, 1), q.length > 0 && s === c ? c >= q.length ? (s = q.length - 1, a.active = s, g(s), p.select(q[q.length - 1])) : (s = c, a.active = s, g(s), p.select(q[c])) : s > c && (s--, a.active = s), 0 === q.length && (s = null, a.active = null, f())
    }, p.select = a.select = function (b, c) {
        var d = i(b.slide);
        void 0 === c && (c = d > p.getCurrentIndex() ? "next" : "prev"), b.slide.index === s || a.$currentTransition ? b && b.slide.index !== s && a.$currentTransition && t.push(q[d]) : h(b.slide, d, c)
    }, a.indexOfSlide = function (a) {
        return +a.slide.index
    }, a.isActive = function (b) {
        return a.active === b.slide.index
    }, a.pause = function () {
        a.noPause || (o = !1, j())
    }, a.play = function () {
        o || (o = !0, l())
    }, a.$on("$destroy", function () {
        u = !0, j()
    }), a.$watch("noTransition", function (a) {
        e.enabled(b, !a)
    }), a.$watch("interval", l), a.$watchCollection("slides", k), a.$watch("active", function (a) {
        if (angular.isNumber(a) && s !== a) {
            for (var b = 0; b < q.length; b++)if (q[b].slide.index === a) {
                a = b;
                break
            }
            var c = q[a];
            c && (s = a, g(a), p.select(q[a]))
        }
    })
}]).directive("uibCarousel", function () {
    return {
        transclude: !0,
        replace: !0,
        controller: "UibCarouselController",
        controllerAs: "carousel",
        templateUrl: function (a, b) {
            return b.templateUrl || "uib/template/carousel/carousel.html"
        },
        scope: {active: "=", interval: "=", noTransition: "=", noPause: "=", noWrap: "&"}
    }
}).directive("uibSlide", function () {
    return {
        require: "^uibCarousel", transclude: !0, replace: !0, templateUrl: function (a, b) {
            return b.templateUrl || "uib/template/carousel/slide.html"
        }, scope: {actual: "=?", index: "=?"}, link: function (a, b, c, d) {
            d.addSlide(a, b), a.$on("$destroy", function () {
                d.removeSlide(a)
            })
        }
    }
}).animation(".item", ["$animateCss", function (a) {
    function b(a, b, c) {
        a.removeClass(b), c && c()
    }

    var c = "uib-slideDirection";
    return {
        beforeAddClass: function (d, e, f) {
            if ("active" === e) {
                var g = !1, h = d.data(c), i = "next" === h ? "left" : "right", j = b.bind(this, d, i + " " + h, f);
                return d.addClass(h), a(d, {addClass: i}).start().done(j), function () {
                    g = !0
                }
            }
            f()
        }, beforeRemoveClass: function (d, e, f) {
            if ("active" === e) {
                var g = !1, h = d.data(c), i = "next" === h ? "left" : "right", j = b.bind(this, d, i, f);
                return a(d, {addClass: i}).start().done(j), function () {
                    g = !0
                }
            }
            f()
        }
    }
}]), angular.module("ui.bootstrap.dateparser", []).service("uibDateParser", ["$log", "$locale", "dateFilter", "orderByFilter", function (a, b, c, d) {
    function e(a, b) {
        var c = [], e = a.split(""), f = a.indexOf("'");
        if (f > -1) {
            var g = !1;
            a = a.split("");
            for (var h = f; h < a.length; h++)g ? ("'" === a[h] && (h + 1 < a.length && "'" === a[h + 1] ? (a[h + 1] = "$", e[h + 1] = "") : (e[h] = "", g = !1)), a[h] = "$") : "'" === a[h] && (a[h] = "$", e[h] = "", g = !0);
            a = a.join("")
        }
        return angular.forEach(n, function (d) {
            var f = a.indexOf(d.key);
            if (f > -1) {
                a = a.split(""), e[f] = "(" + d.regex + ")", a[f] = "$";
                for (var g = f + 1, h = f + d.key.length; h > g; g++)e[g] = "", a[g] = "$";
                a = a.join(""), c.push({index: f, key: d.key, apply: d[b], matcher: d.regex})
            }
        }), {regex: new RegExp("^" + e.join("") + "$"), map: d(c, "index")}
    }

    function f(a, b, c) {
        return 1 > c ? !1 : 1 === b && c > 28 ? 29 === c && (a % 4 === 0 && a % 100 !== 0 || a % 400 === 0) : 3 === b || 5 === b || 8 === b || 10 === b ? 31 > c : !0
    }

    function g(a) {
        return parseInt(a, 10)
    }

    function h(a, b) {
        return a && b ? l(a, b) : a
    }

    function i(a, b) {
        return a && b ? l(a, b, !0) : a
    }

    function j(a, b) {
        var c = Date.parse("Jan 01, 1970 00:00:00 " + a) / 6e4;
        return isNaN(c) ? b : c
    }

    function k(a, b) {
        return a = new Date(a.getTime()), a.setMinutes(a.getMinutes() + b), a
    }

    function l(a, b, c) {
        c = c ? -1 : 1;
        var d = j(b, a.getTimezoneOffset());
        return k(a, c * (d - a.getTimezoneOffset()))
    }

    var m, n, o = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;
    this.init = function () {
        m = b.id, this.parsers = {}, this.formatters = {}, n = [{
            key: "yyyy", regex: "\\d{4}", apply: function (a) {
                this.year = +a
            }, formatter: function (a) {
                var b = new Date;
                return b.setFullYear(Math.abs(a.getFullYear())), c(b, "yyyy")
            }
        }, {
            key: "yy", regex: "\\d{2}", apply: function (a) {
                this.year = +a + 2e3
            }, formatter: function (a) {
                var b = new Date;
                return b.setFullYear(Math.abs(a.getFullYear())), c(b, "yy")
            }
        }, {
            key: "y", regex: "\\d{1,4}", apply: function (a) {
                this.year = +a
            }, formatter: function (a) {
                var b = new Date;
                return b.setFullYear(Math.abs(a.getFullYear())), c(b, "y")
            }
        }, {
            key: "M!", regex: "0?[1-9]|1[0-2]", apply: function (a) {
                this.month = a - 1
            }, formatter: function (a) {
                var b = a.getMonth();
                return /^[0-9]$/.test(b) ? c(a, "MM") : c(a, "M")
            }
        }, {
            key: "MMMM", regex: b.DATETIME_FORMATS.MONTH.join("|"), apply: function (a) {
                this.month = b.DATETIME_FORMATS.MONTH.indexOf(a)
            }, formatter: function (a) {
                return c(a, "MMMM")
            }
        }, {
            key: "MMM", regex: b.DATETIME_FORMATS.SHORTMONTH.join("|"), apply: function (a) {
                this.month = b.DATETIME_FORMATS.SHORTMONTH.indexOf(a)
            }, formatter: function (a) {
                return c(a, "MMM")
            }
        }, {
            key: "MM", regex: "0[1-9]|1[0-2]", apply: function (a) {
                this.month = a - 1
            }, formatter: function (a) {
                return c(a, "MM")
            }
        }, {
            key: "M", regex: "[1-9]|1[0-2]", apply: function (a) {
                this.month = a - 1
            }, formatter: function (a) {
                return c(a, "M")
            }
        }, {
            key: "d!", regex: "[0-2]?[0-9]{1}|3[0-1]{1}", apply: function (a) {
                this.date = +a
            }, formatter: function (a) {
                var b = a.getDate();
                return /^[1-9]$/.test(b) ? c(a, "dd") : c(a, "d")
            }
        }, {
            key: "dd", regex: "[0-2][0-9]{1}|3[0-1]{1}", apply: function (a) {
                this.date = +a
            }, formatter: function (a) {
                return c(a, "dd")
            }
        }, {
            key: "d", regex: "[1-2]?[0-9]{1}|3[0-1]{1}", apply: function (a) {
                this.date = +a
            }, formatter: function (a) {
                return c(a, "d")
            }
        }, {
            key: "EEEE", regex: b.DATETIME_FORMATS.DAY.join("|"), formatter: function (a) {
                return c(a, "EEEE")
            }
        }, {
            key: "EEE", regex: b.DATETIME_FORMATS.SHORTDAY.join("|"), formatter: function (a) {
                return c(a, "EEE")
            }
        }, {
            key: "HH", regex: "(?:0|1)[0-9]|2[0-3]", apply: function (a) {
                this.hours = +a
            }, formatter: function (a) {
                return c(a, "HH")
            }
        }, {
            key: "hh", regex: "0[0-9]|1[0-2]", apply: function (a) {
                this.hours = +a
            }, formatter: function (a) {
                return c(a, "hh")
            }
        }, {
            key: "H", regex: "1?[0-9]|2[0-3]", apply: function (a) {
                this.hours = +a
            }, formatter: function (a) {
                return c(a, "H")
            }
        }, {
            key: "h", regex: "[0-9]|1[0-2]", apply: function (a) {
                this.hours = +a
            }, formatter: function (a) {
                return c(a, "h")
            }
        }, {
            key: "mm", regex: "[0-5][0-9]", apply: function (a) {
                this.minutes = +a
            }, formatter: function (a) {
                return c(a, "mm")
            }
        }, {
            key: "m", regex: "[0-9]|[1-5][0-9]", apply: function (a) {
                this.minutes = +a
            }, formatter: function (a) {
                return c(a, "m")
            }
        }, {
            key: "sss", regex: "[0-9][0-9][0-9]", apply: function (a) {
                this.milliseconds = +a
            }, formatter: function (a) {
                return c(a, "sss")
            }
        }, {
            key: "ss", regex: "[0-5][0-9]", apply: function (a) {
                this.seconds = +a
            }, formatter: function (a) {
                return c(a, "ss")
            }
        }, {
            key: "s", regex: "[0-9]|[1-5][0-9]", apply: function (a) {
                this.seconds = +a
            }, formatter: function (a) {
                return c(a, "s")
            }
        }, {
            key: "a", regex: b.DATETIME_FORMATS.AMPMS.join("|"), apply: function (a) {
                12 === this.hours && (this.hours = 0), "PM" === a && (this.hours += 12)
            }, formatter: function (a) {
                return c(a, "a")
            }
        }, {
            key: "Z", regex: "[+-]\\d{4}", apply: function (a) {
                var b = a.match(/([+-])(\d{2})(\d{2})/), c = b[1], d = b[2], e = b[3];
                this.hours += g(c + d), this.minutes += g(c + e)
            }, formatter: function (a) {
                return c(a, "Z")
            }
        }, {
            key: "ww", regex: "[0-4][0-9]|5[0-3]", formatter: function (a) {
                return c(a, "ww")
            }
        }, {
            key: "w", regex: "[0-9]|[1-4][0-9]|5[0-3]", formatter: function (a) {
                return c(a, "w")
            }
        }, {
            key: "GGGG", regex: b.DATETIME_FORMATS.ERANAMES.join("|").replace(/\s/g, "\\s"), formatter: function (a) {
                return c(a, "GGGG")
            }
        }, {
            key: "GGG", regex: b.DATETIME_FORMATS.ERAS.join("|"), formatter: function (a) {
                return c(a, "GGG")
            }
        }, {
            key: "GG", regex: b.DATETIME_FORMATS.ERAS.join("|"), formatter: function (a) {
                return c(a, "GG")
            }
        }, {
            key: "G", regex: b.DATETIME_FORMATS.ERAS.join("|"), formatter: function (a) {
                return c(a, "G")
            }
        }]
    }, this.init(), this.filter = function (a, c) {
        if (!angular.isDate(a) || isNaN(a) || !c)return "";
        c = b.DATETIME_FORMATS[c] || c, b.id !== m && this.init(), this.formatters[c] || (this.formatters[c] = e(c, "formatter"));
        var d = this.formatters[c], f = d.map, g = c;
        return f.reduce(function (b, c, d) {
            var e = g.match(new RegExp("(.*)" + c.key));
            e && angular.isString(e[1]) && (b += e[1], g = g.replace(e[1] + c.key, ""));
            var h = d === f.length - 1 ? g : "";
            return c.apply ? b + c.apply.call(null, a) + h : b + h
        }, "")
    }, this.parse = function (c, d, g) {
        if (!angular.isString(c) || !d)return c;
        d = b.DATETIME_FORMATS[d] || d, d = d.replace(o, "\\$&"), b.id !== m && this.init(), this.parsers[d] || (this.parsers[d] = e(d, "apply"));
        var h = this.parsers[d], i = h.regex, j = h.map, k = c.match(i), l = !1;
        if (k && k.length) {
            var n, p;
            angular.isDate(g) && !isNaN(g.getTime()) ? n = {
                year: g.getFullYear(),
                month: g.getMonth(),
                date: g.getDate(),
                hours: g.getHours(),
                minutes: g.getMinutes(),
                seconds: g.getSeconds(),
                milliseconds: g.getMilliseconds()
            } : (g && a.warn("dateparser:", "baseDate is not a valid date"), n = {
                year: 1900,
                month: 0,
                date: 1,
                hours: 0,
                minutes: 0,
                seconds: 0,
                milliseconds: 0
            });
            for (var q = 1, r = k.length; r > q; q++) {
                var s = j[q - 1];
                "Z" === s.matcher && (l = !0), s.apply && s.apply.call(n, k[q])
            }
            var t = l ? Date.prototype.setUTCFullYear : Date.prototype.setFullYear, u = l ? Date.prototype.setUTCHours : Date.prototype.setHours;
            return f(n.year, n.month, n.date) && (!angular.isDate(g) || isNaN(g.getTime()) || l ? (p = new Date(0), t.call(p, n.year, n.month, n.date), u.call(p, n.hours || 0, n.minutes || 0, n.seconds || 0, n.milliseconds || 0)) : (p = new Date(g), t.call(p, n.year, n.month, n.date), u.call(p, n.hours, n.minutes, n.seconds, n.milliseconds))), p
        }
    }, this.toTimezone = h, this.fromTimezone = i, this.timezoneToOffset = j, this.addDateMinutes = k, this.convertTimezoneToLocal = l
}]), angular.module("ui.bootstrap.isClass", []).directive("uibIsClass", ["$animate", function (a) {
    var b = /^\s*([\s\S]+?)\s+on\s+([\s\S]+?)\s*$/, c = /^\s*([\s\S]+?)\s+for\s+([\s\S]+?)\s*$/;
    return {
        restrict: "A", compile: function (d, e) {
            function f(a, b, c) {
                i.push(a), j.push({scope: a, element: b}), o.forEach(function (b, c) {
                    g(b, a)
                }), a.$on("$destroy", h)
            }

            function g(b, d) {
                var e = b.match(c), f = d.$eval(e[1]), g = e[2], h = k[b];
                if (!h) {
                    var i = function (b) {
                        var c = null;
                        j.some(function (a) {
                            var d = a.scope.$eval(m);
                            return d === b ? (c = a, !0) : void 0
                        }), h.lastActivated !== c && (h.lastActivated && a.removeClass(h.lastActivated.element, f), c && a.addClass(c.element, f), h.lastActivated = c)
                    };
                    k[b] = h = {lastActivated: null, scope: d, watchFn: i, compareWithExp: g, watcher: d.$watch(g, i)}
                }
                h.watchFn(d.$eval(g))
            }

            function h(a) {
                var b = a.targetScope, c = i.indexOf(b);
                if (i.splice(c, 1), j.splice(c, 1), i.length) {
                    var d = i[0];
                    angular.forEach(k, function (a) {
                        a.scope === b && (a.watcher = d.$watch(a.compareWithExp, a.watchFn), a.scope = d)
                    })
                } else k = {}
            }

            var i = [], j = [], k = {}, l = e.uibIsClass.match(b), m = l[2], n = l[1], o = n.split(",");
            return f
        }
    }
}]), angular.module("ui.bootstrap.position", []).factory("$uibPosition", ["$document", "$window", function (a, b) {
    var c, d = {normal: /(auto|scroll)/, hidden: /(auto|scroll|hidden)/}, e = {
        auto: /\s?auto?\s?/i,
        primary: /^(top|bottom|left|right)$/,
        secondary: /^(top|bottom|left|right|center)$/,
        vertical: /^(top|bottom)$/
    };
    return {
        getRawNode: function (a) {
            return a.nodeName ? a : a[0] || a
        }, parseStyle: function (a) {
            return a = parseFloat(a), isFinite(a) ? a : 0
        }, offsetParent: function (c) {
            function d(a) {
                return "static" === (b.getComputedStyle(a).position || "static")
            }

            c = this.getRawNode(c);
            for (var e = c.offsetParent || a[0].documentElement; e && e !== a[0].documentElement && d(e);)e = e.offsetParent;
            return e || a[0].documentElement
        }, scrollbarWidth: function () {
            if (angular.isUndefined(c)) {
                var b = angular.element('<div class="uib-position-scrollbar-measure"></div>');
                a.find("body").append(b), c = b[0].offsetWidth - b[0].clientWidth, c = isFinite(c) ? c : 0, b.remove()
            }
            return c
        }, isScrollable: function (a, c) {
            a = this.getRawNode(a);
            var e = c ? d.hidden : d.normal, f = b.getComputedStyle(a);
            return e.test(f.overflow + f.overflowY + f.overflowX)
        }, scrollParent: function (c, e) {
            c = this.getRawNode(c);
            var f = e ? d.hidden : d.normal, g = a[0].documentElement, h = b.getComputedStyle(c), i = "absolute" === h.position, j = c.parentElement || g;
            if (j === g || "fixed" === h.position)return g;
            for (; j.parentElement && j !== g;) {
                var k = b.getComputedStyle(j);
                if (i && "static" !== k.position && (i = !1), !i && f.test(k.overflow + k.overflowY + k.overflowX))break;
                j = j.parentElement
            }
            return j
        }, position: function (c, d) {
            c = this.getRawNode(c);
            var e = this.offset(c);
            if (d) {
                var f = b.getComputedStyle(c);
                e.top -= this.parseStyle(f.marginTop), e.left -= this.parseStyle(f.marginLeft)
            }
            var g = this.offsetParent(c), h = {top: 0, left: 0};
            return g !== a[0].documentElement && (h = this.offset(g), h.top += g.clientTop - g.scrollTop, h.left += g.clientLeft - g.scrollLeft), {
                width: Math.round(angular.isNumber(e.width) ? e.width : c.offsetWidth),
                height: Math.round(angular.isNumber(e.height) ? e.height : c.offsetHeight),
                top: Math.round(e.top - h.top),
                left: Math.round(e.left - h.left)
            }
        }, offset: function (c) {
            c = this.getRawNode(c);
            var d = c.getBoundingClientRect();
            return {
                width: Math.round(angular.isNumber(d.width) ? d.width : c.offsetWidth),
                height: Math.round(angular.isNumber(d.height) ? d.height : c.offsetHeight),
                top: Math.round(d.top + (b.pageYOffset || a[0].documentElement.scrollTop)),
                left: Math.round(d.left + (b.pageXOffset || a[0].documentElement.scrollLeft))
            }
        }, viewportOffset: function (c, d, e) {
            c = this.getRawNode(c), e = e !== !1 ? !0 : !1;
            var f = c.getBoundingClientRect(), g = {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0
            }, h = d ? a[0].documentElement : this.scrollParent(c), i = h.getBoundingClientRect();
            if (g.top = i.top + h.clientTop, g.left = i.left + h.clientLeft, h === a[0].documentElement && (g.top += b.pageYOffset, g.left += b.pageXOffset), g.bottom = g.top + h.clientHeight, g.right = g.left + h.clientWidth, e) {
                var j = b.getComputedStyle(h);
                g.top += this.parseStyle(j.paddingTop), g.bottom -= this.parseStyle(j.paddingBottom), g.left += this.parseStyle(j.paddingLeft), g.right -= this.parseStyle(j.paddingRight)
            }
            return {
                top: Math.round(f.top - g.top),
                bottom: Math.round(g.bottom - f.bottom),
                left: Math.round(f.left - g.left),
                right: Math.round(g.right - f.right)
            }
        }, parsePlacement: function (a) {
            var b = e.auto.test(a);
            return b && (a = a.replace(e.auto, "")), a = a.split("-"), a[0] = a[0] || "top", e.primary.test(a[0]) || (a[0] = "top"), a[1] = a[1] || "center", e.secondary.test(a[1]) || (a[1] = "center"), b ? a[2] = !0 : a[2] = !1, a
        }, positionElements: function (a, c, d, f) {
            a = this.getRawNode(a), c = this.getRawNode(c);
            var g = angular.isDefined(c.offsetWidth) ? c.offsetWidth : c.prop("offsetWidth"), h = angular.isDefined(c.offsetHeight) ? c.offsetHeight : c.prop("offsetHeight");
            d = this.parsePlacement(d);
            var i = f ? this.offset(a) : this.position(a), j = {top: 0, left: 0, placement: ""};
            if (d[2]) {
                var k = this.viewportOffset(a, f), l = b.getComputedStyle(c), m = {
                    width: g + Math.round(Math.abs(this.parseStyle(l.marginLeft) + this.parseStyle(l.marginRight))),
                    height: h + Math.round(Math.abs(this.parseStyle(l.marginTop) + this.parseStyle(l.marginBottom)))
                };
                if (d[0] = "top" === d[0] && m.height > k.top && m.height <= k.bottom ? "bottom" : "bottom" === d[0] && m.height > k.bottom && m.height <= k.top ? "top" : "left" === d[0] && m.width > k.left && m.width <= k.right ? "right" : "right" === d[0] && m.width > k.right && m.width <= k.left ? "left" : d[0], d[1] = "top" === d[1] && m.height - i.height > k.bottom && m.height - i.height <= k.top ? "bottom" : "bottom" === d[1] && m.height - i.height > k.top && m.height - i.height <= k.bottom ? "top" : "left" === d[1] && m.width - i.width > k.right && m.width - i.width <= k.left ? "right" : "right" === d[1] && m.width - i.width > k.left && m.width - i.width <= k.right ? "left" : d[1], "center" === d[1])if (e.vertical.test(d[0])) {
                    var n = i.width / 2 - g / 2;
                    k.left + n < 0 && m.width - i.width <= k.right ? d[1] = "left" : k.right + n < 0 && m.width - i.width <= k.left && (d[1] = "right")
                } else {
                    var o = i.height / 2 - m.height / 2;
                    k.top + o < 0 && m.height - i.height <= k.bottom ? d[1] = "top" : k.bottom + o < 0 && m.height - i.height <= k.top && (d[1] = "bottom")
                }
            }
            switch (d[0]) {
                case"top":
                    j.top = i.top - h;
                    break;
                case"bottom":
                    j.top = i.top + i.height;
                    break;
                case"left":
                    j.left = i.left - g;
                    break;
                case"right":
                    j.left = i.left + i.width
            }
            switch (d[1]) {
                case"top":
                    j.top = i.top;
                    break;
                case"bottom":
                    j.top = i.top + i.height - h;
                    break;
                case"left":
                    j.left = i.left;
                    break;
                case"right":
                    j.left = i.left + i.width - g;
                    break;
                case"center":
                    e.vertical.test(d[0]) ? j.left = i.left + i.width / 2 - g / 2 : j.top = i.top + i.height / 2 - h / 2
            }
            return j.top = Math.round(j.top), j.left = Math.round(j.left), j.placement = "center" === d[1] ? d[0] : d[0] + "-" + d[1], j
        }, positionArrow: function (a, c) {
            a = this.getRawNode(a);
            var d = a.querySelector(".tooltip-inner, .popover-inner");
            if (d) {
                var f = angular.element(d).hasClass("tooltip-inner"), g = f ? a.querySelector(".tooltip-arrow") : a.querySelector(".arrow");
                if (g) {
                    var h = {top: "", bottom: "", left: "", right: ""};
                    if (c = this.parsePlacement(c), "center" === c[1])return void angular.element(g).css(h);
                    var i = "border-" + c[0] + "-width", j = b.getComputedStyle(g)[i], k = "border-";
                    k += e.vertical.test(c[0]) ? c[0] + "-" + c[1] : c[1] + "-" + c[0], k += "-radius";
                    var l = b.getComputedStyle(f ? d : a)[k];
                    switch (c[0]) {
                        case"top":
                            h.bottom = f ? "0" : "-" + j;
                            break;
                        case"bottom":
                            h.top = f ? "0" : "-" + j;
                            break;
                        case"left":
                            h.right = f ? "0" : "-" + j;
                            break;
                        case"right":
                            h.left = f ? "0" : "-" + j
                    }
                    h[c[1]] = l, angular.element(g).css(h)
                }
            }
        }
    }
}]), angular.module("ui.bootstrap.datepicker", ["ui.bootstrap.dateparser", "ui.bootstrap.isClass", "ui.bootstrap.position"]).value("$datepickerSuppressError", !1).value("uibDatepickerAttributeWarning", !0).constant("uibDatepickerConfig", {
    datepickerMode: "day",
    formatDay: "dd",
    formatMonth: "MMMM",
    formatYear: "yyyy",
    formatDayHeader: "EEE",
    formatDayTitle: "MMMM yyyy",
    formatMonthTitle: "yyyy",
    maxDate: null,
    maxMode: "year",
    minDate: null,
    minMode: "day",
    ngModelOptions: {},
    shortcutPropagation: !1,
    showWeeks: !0,
    yearColumns: 5,
    yearRows: 4
}).controller("UibDatepickerController", ["$scope", "$attrs", "$parse", "$interpolate", "$locale", "$log", "dateFilter", "uibDatepickerConfig", "$datepickerSuppressError", "uibDatepickerAttributeWarning", "uibDateParser", function (a, b, c, d, e, f, g, h, i, j, k) {
    function l(b) {
        a.datepickerMode = b, q && (a.datepickerOptions.datepickerMode = b)
    }

    var m = this, n = {$setViewValue: angular.noop}, o = {}, p = [], q = !!b.datepickerOptions;
    if (this.modes = ["day", "month", "year"], q)["customClass", "dateDisabled", "datepickerMode", "formatDay", "formatDayHeader", "formatDayTitle", "formatMonth", "formatMonthTitle", "formatYear", "initDate", "maxDate", "maxMode", "minDate", "minMode", "showWeeks", "shortcutPropagation", "startingDay", "yearColumns", "yearRows"].forEach(function (b) {
        switch (b) {
            case"customClass":
            case"dateDisabled":
                a[b] = a.datepickerOptions[b] || angular.noop;
                break;
            case"datepickerMode":
                a.datepickerMode = angular.isDefined(a.datepickerOptions.datepickerMode) ? a.datepickerOptions.datepickerMode : h.datepickerMode;
                break;
            case"formatDay":
            case"formatDayHeader":
            case"formatDayTitle":
            case"formatMonth":
            case"formatMonthTitle":
            case"formatYear":
                m[b] = angular.isDefined(a.datepickerOptions[b]) ? d(a.datepickerOptions[b])(a.$parent) : h[b];
                break;
            case"showWeeks":
            case"shortcutPropagation":
            case"yearColumns":
            case"yearRows":
                m[b] = angular.isDefined(a.datepickerOptions[b]) ? a.datepickerOptions[b] : h[b];
                break;
            case"startingDay":
                angular.isDefined(a.datepickerOptions.startingDay) ? m.startingDay = a.datepickerOptions.startingDay : angular.isNumber(h.startingDay) ? m.startingDay = h.startingDay : m.startingDay = (e.DATETIME_FORMATS.FIRSTDAYOFWEEK + 8) % 7;
                break;
            case"maxDate":
            case"minDate":
                a.datepickerOptions[b] ? a.$watch(function () {
                    return a.datepickerOptions[b]
                }, function (a) {
                    a ? angular.isDate(a) ? m[b] = k.fromTimezone(new Date(a), o.timezone) : m[b] = new Date(g(a, "medium")) : m[b] = null, m.refreshView()
                }) : m[b] = h[b] ? k.fromTimezone(new Date(h[b]), o.timezone) : null;
                break;
            case"maxMode":
            case"minMode":
                a.datepickerOptions[b] ? a.$watch(function () {
                    return a.datepickerOptions[b]
                }, function (c) {
                    m[b] = a[b] = angular.isDefined(c) ? c : datepickerOptions[b], ("minMode" === b && m.modes.indexOf(a.datepickerOptions.datepickerMode) < m.modes.indexOf(m[b]) || "maxMode" === b && m.modes.indexOf(a.datepickerOptions.datepickerMode) > m.modes.indexOf(m[b])) && (a.datepickerMode = m[b], a.datepickerOptions.datepickerMode = m[b])
                }) : m[b] = a[b] = h[b] || null;
                break;
            case"initDate":
                a.datepickerOptions.initDate ? (m.activeDate = k.fromTimezone(a.datepickerOptions.initDate, o.timezone) || new Date, a.$watch(function () {
                    return a.datepickerOptions.initDate
                }, function (a) {
                    a && (n.$isEmpty(n.$modelValue) || n.$invalid) && (m.activeDate = k.fromTimezone(a, o.timezone), m.refreshView())
                })) : m.activeDate = new Date
        }
    }); else {
        if (angular.forEach(["formatDay", "formatMonth", "formatYear", "formatDayHeader", "formatDayTitle", "formatMonthTitle"], function (c) {
                m[c] = angular.isDefined(b[c]) ? d(b[c])(a.$parent) : h[c], angular.isDefined(b[c]) && j && f.warn("uib-datepicker " + c + " attribute usage is deprecated, use datepicker-options attribute instead")
            }), angular.forEach(["showWeeks", "yearRows", "yearColumns", "shortcutPropagation"], function (c) {
                m[c] = angular.isDefined(b[c]) ? a.$parent.$eval(b[c]) : h[c], angular.isDefined(b[c]) && j && f.warn("uib-datepicker " + c + " attribute usage is deprecated, use datepicker-options attribute instead")
            }), angular.forEach(["dateDisabled", "customClass"], function (a) {
                angular.isDefined(b[a]) && j && f.warn("uib-datepicker " + a + " attribute usage is deprecated, use datepicker-options attribute instead")
            }), angular.isDefined(b.startingDay) ? (j && f.warn("uib-datepicker startingDay attribute usage is deprecated, use datepicker-options attribute instead"), m.startingDay = a.$parent.$eval(b.startingDay)) : angular.isNumber(h.startingDay) ? m.startingDay = h.startingDay : m.startingDay = (e.DATETIME_FORMATS.FIRSTDAYOFWEEK + 8) % 7, angular.forEach(["minDate", "maxDate"], function (c) {
                b[c] ? (j && f.warn("uib-datepicker " + c + " attribute usage is deprecated, use datepicker-options attribute instead"), p.push(a.$parent.$watch(b[c], function (a) {
                    a ? angular.isDate(a) ? m[c] = k.fromTimezone(new Date(a), o.timezone) : m[c] = new Date(g(a, "medium")) : m[c] = null, m.refreshView()
                }))) : m[c] = h[c] ? k.fromTimezone(new Date(h[c]), o.timezone) : null
            }), angular.forEach(["minMode", "maxMode"], function (c) {
                b[c] ? (j && f.warn("uib-datepicker " + c + " attribute usage is deprecated, use datepicker-options attribute instead"), p.push(a.$parent.$watch(b[c], function (d) {
                    m[c] = a[c] = angular.isDefined(d) ? d : b[c], ("minMode" === c && m.modes.indexOf(a.datepickerMode) < m.modes.indexOf(m[c]) || "maxMode" === c && m.modes.indexOf(a.datepickerMode) > m.modes.indexOf(m[c])) && (a.datepickerMode = m[c])
                }))) : m[c] = a[c] = h[c] || null
            }), angular.isDefined(b.initDate)) {
            j && f.warn("uib-datepicker initDate attribute usage is deprecated, use datepicker-options attribute instead");
            var r = k.fromTimezone(a.$parent.$eval(b.initDate), o.timezone);
            this.activeDate = isNaN(r) ? new Date : r, p.push(a.$parent.$watch(b.initDate, function (a) {
                a && (n.$isEmpty(n.$modelValue) || n.$invalid) && (a = k.fromTimezone(a, o.timezone), m.activeDate = isNaN(a) ? new Date : a, m.refreshView())
            }))
        } else this.activeDate = new Date;
        b.datepickerMode && j && f.warn("uib-datepicker datepickerMode attribute usage is deprecated, use datepicker-options attribute instead"), a.datepickerMode = a.datepickerMode || h.datepickerMode
    }
    a.uniqueId = "datepicker-" + a.$id + "-" + Math.floor(1e4 * Math.random()), a.disabled = angular.isDefined(b.disabled) || !1, angular.isDefined(b.ngDisabled) && p.push(a.$parent.$watch(b.ngDisabled, function (b) {
        a.disabled = b, m.refreshView()
    })), a.isActive = function (b) {
        return 0 === m.compare(b.date, m.activeDate) ? (a.activeDateId = b.uid, !0) : !1
    }, this.init = function (a) {
        n = a, o = a.$options || h.ngModelOptions, this.activeDate = n.$modelValue || new Date, n.$render = function () {
            m.render()
        }
    }, this.render = function () {
        if (n.$viewValue) {
            var a = new Date(n.$viewValue), b = !isNaN(a);
            b ? this.activeDate = k.fromTimezone(a, o.timezone) : i || f.error('Datepicker directive: "ng-model" value must be a Date object')
        }
        this.refreshView()
    }, this.refreshView = function () {
        if (this.element) {
            a.selectedDt = null, this._refreshView(), a.activeDt && (a.activeDateId = a.activeDt.uid);
            var b = n.$viewValue ? new Date(n.$viewValue) : null;
            b = k.fromTimezone(b, o.timezone), n.$setValidity("dateDisabled", !b || this.element && !this.isDisabled(b))
        }
    }, this.createDateObject = function (b, c) {
        var d = n.$viewValue ? new Date(n.$viewValue) : null;
        d = k.fromTimezone(d, o.timezone);
        var e = new Date;
        e = k.fromTimezone(e, o.timezone);
        var f = this.compare(b, e), g = {
            date: b,
            label: k.filter(b, c),
            selected: d && 0 === this.compare(b, d),
            disabled: this.isDisabled(b),
            past: 0 > f,
            current: 0 === f,
            future: f > 0,
            customClass: this.customClass(b) || null
        };
        return d && 0 === this.compare(b, d) && (a.selectedDt = g), m.activeDate && 0 === this.compare(g.date, m.activeDate) && (a.activeDt = g), g
    }, this.isDisabled = function (b) {
        return a.disabled || this.minDate && this.compare(b, this.minDate) < 0 || this.maxDate && this.compare(b, this.maxDate) > 0 || a.dateDisabled && a.dateDisabled({
                date: b,
                mode: a.datepickerMode
            })
    }, this.customClass = function (b) {
        return a.customClass({date: b, mode: a.datepickerMode})
    }, this.split = function (a, b) {
        for (var c = []; a.length > 0;)c.push(a.splice(0, b));
        return c;
    }, a.select = function (b) {
        if (a.datepickerMode === m.minMode) {
            var c = n.$viewValue ? k.fromTimezone(new Date(n.$viewValue), o.timezone) : new Date(0, 0, 0, 0, 0, 0, 0);
            c.setFullYear(b.getFullYear(), b.getMonth(), b.getDate()), c = k.toTimezone(c, o.timezone), n.$setViewValue(c), n.$render()
        } else m.activeDate = b, l(m.modes[m.modes.indexOf(a.datepickerMode) - 1]), a.$emit("uib:datepicker.mode")
    }, a.move = function (a) {
        var b = m.activeDate.getFullYear() + a * (m.step.years || 0), c = m.activeDate.getMonth() + a * (m.step.months || 0);
        m.activeDate.setFullYear(b, c, 1), m.refreshView()
    }, a.toggleMode = function (b) {
        b = b || 1, a.datepickerMode === m.maxMode && 1 === b || a.datepickerMode === m.minMode && -1 === b || (l(m.modes[m.modes.indexOf(a.datepickerMode) + b]), a.$emit("uib:datepicker.mode"))
    }, a.keys = {
        13: "enter",
        32: "space",
        33: "pageup",
        34: "pagedown",
        35: "end",
        36: "home",
        37: "left",
        38: "up",
        39: "right",
        40: "down"
    };
    var s = function () {
        m.element[0].focus()
    };
    a.$on("uib:datepicker.focus", s), a.keydown = function (b) {
        var c = a.keys[b.which];
        if (c && !b.shiftKey && !b.altKey && !a.disabled)if (b.preventDefault(), m.shortcutPropagation || b.stopPropagation(), "enter" === c || "space" === c) {
            if (m.isDisabled(m.activeDate))return;
            a.select(m.activeDate)
        } else!b.ctrlKey || "up" !== c && "down" !== c ? (m.handleKeyDown(c, b), m.refreshView()) : a.toggleMode("up" === c ? 1 : -1)
    }, a.$on("$destroy", function () {
        for (; p.length;)p.shift()()
    })
}]).controller("UibDaypickerController", ["$scope", "$element", "dateFilter", function (a, b, c) {
    function d(a, b) {
        return 1 !== b || a % 4 !== 0 || a % 100 === 0 && a % 400 !== 0 ? f[b] : 29
    }

    function e(a) {
        var b = new Date(a);
        b.setDate(b.getDate() + 4 - (b.getDay() || 7));
        var c = b.getTime();
        return b.setMonth(0), b.setDate(1), Math.floor(Math.round((c - b) / 864e5) / 7) + 1
    }

    var f = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    this.step = {months: 1}, this.element = b, this.init = function (b) {
        angular.extend(b, this), a.showWeeks = b.showWeeks, b.refreshView()
    }, this.getDates = function (a, b) {
        for (var c, d = new Array(b), e = new Date(a), f = 0; b > f;)c = new Date(e), d[f++] = c, e.setDate(e.getDate() + 1);
        return d
    }, this._refreshView = function () {
        var b = this.activeDate.getFullYear(), d = this.activeDate.getMonth(), f = new Date(this.activeDate);
        f.setFullYear(b, d, 1);
        var g = this.startingDay - f.getDay(), h = g > 0 ? 7 - g : -g, i = new Date(f);
        h > 0 && i.setDate(-h + 1);
        for (var j = this.getDates(i, 42), k = 0; 42 > k; k++)j[k] = angular.extend(this.createDateObject(j[k], this.formatDay), {
            secondary: j[k].getMonth() !== d,
            uid: a.uniqueId + "-" + k
        });
        a.labels = new Array(7);
        for (var l = 0; 7 > l; l++)a.labels[l] = {abbr: c(j[l].date, this.formatDayHeader), full: c(j[l].date, "EEEE")};
        if (a.title = c(this.activeDate, this.formatDayTitle), a.rows = this.split(j, 7), a.showWeeks) {
            a.weekNumbers = [];
            for (var m = (11 - this.startingDay) % 7, n = a.rows.length, o = 0; n > o; o++)a.weekNumbers.push(e(a.rows[o][m].date))
        }
    }, this.compare = function (a, b) {
        var c = new Date(a.getFullYear(), a.getMonth(), a.getDate()), d = new Date(b.getFullYear(), b.getMonth(), b.getDate());
        return c.setFullYear(a.getFullYear()), d.setFullYear(b.getFullYear()), c - d
    }, this.handleKeyDown = function (a, b) {
        var c = this.activeDate.getDate();
        if ("left" === a)c -= 1; else if ("up" === a)c -= 7; else if ("right" === a)c += 1; else if ("down" === a)c += 7; else if ("pageup" === a || "pagedown" === a) {
            var e = this.activeDate.getMonth() + ("pageup" === a ? -1 : 1);
            this.activeDate.setMonth(e, 1), c = Math.min(d(this.activeDate.getFullYear(), this.activeDate.getMonth()), c)
        } else"home" === a ? c = 1 : "end" === a && (c = d(this.activeDate.getFullYear(), this.activeDate.getMonth()));
        this.activeDate.setDate(c)
    }
}]).controller("UibMonthpickerController", ["$scope", "$element", "dateFilter", function (a, b, c) {
    this.step = {years: 1}, this.element = b, this.init = function (a) {
        angular.extend(a, this), a.refreshView()
    }, this._refreshView = function () {
        for (var b, d = new Array(12), e = this.activeDate.getFullYear(), f = 0; 12 > f; f++)b = new Date(this.activeDate), b.setFullYear(e, f, 1), d[f] = angular.extend(this.createDateObject(b, this.formatMonth), {uid: a.uniqueId + "-" + f});
        a.title = c(this.activeDate, this.formatMonthTitle), a.rows = this.split(d, 3)
    }, this.compare = function (a, b) {
        var c = new Date(a.getFullYear(), a.getMonth()), d = new Date(b.getFullYear(), b.getMonth());
        return c.setFullYear(a.getFullYear()), d.setFullYear(b.getFullYear()), c - d
    }, this.handleKeyDown = function (a, b) {
        var c = this.activeDate.getMonth();
        if ("left" === a)c -= 1; else if ("up" === a)c -= 3; else if ("right" === a)c += 1; else if ("down" === a)c += 3; else if ("pageup" === a || "pagedown" === a) {
            var d = this.activeDate.getFullYear() + ("pageup" === a ? -1 : 1);
            this.activeDate.setFullYear(d)
        } else"home" === a ? c = 0 : "end" === a && (c = 11);
        this.activeDate.setMonth(c)
    }
}]).controller("UibYearpickerController", ["$scope", "$element", "dateFilter", function (a, b, c) {
    function d(a) {
        return parseInt((a - 1) / f, 10) * f + 1
    }

    var e, f;
    this.element = b, this.yearpickerInit = function () {
        e = this.yearColumns, f = this.yearRows * e, this.step = {years: f}
    }, this._refreshView = function () {
        for (var b, c = new Array(f), g = 0, h = d(this.activeDate.getFullYear()); f > g; g++)b = new Date(this.activeDate), b.setFullYear(h + g, 0, 1), c[g] = angular.extend(this.createDateObject(b, this.formatYear), {uid: a.uniqueId + "-" + g});
        a.title = [c[0].label, c[f - 1].label].join(" - "), a.rows = this.split(c, e), a.columns = e
    }, this.compare = function (a, b) {
        return a.getFullYear() - b.getFullYear()
    }, this.handleKeyDown = function (a, b) {
        var c = this.activeDate.getFullYear();
        "left" === a ? c -= 1 : "up" === a ? c -= e : "right" === a ? c += 1 : "down" === a ? c += e : "pageup" === a || "pagedown" === a ? c += ("pageup" === a ? -1 : 1) * f : "home" === a ? c = d(this.activeDate.getFullYear()) : "end" === a && (c = d(this.activeDate.getFullYear()) + f - 1), this.activeDate.setFullYear(c)
    }
}]).directive("uibDatepicker", function () {
    return {
        replace: !0,
        templateUrl: function (a, b) {
            return b.templateUrl || "uib/template/datepicker/datepicker.html"
        },
        scope: {
            datepickerMode: "=?",
            datepickerOptions: "=?",
            dateDisabled: "&",
            customClass: "&",
            shortcutPropagation: "&?"
        },
        require: ["uibDatepicker", "^ngModel"],
        controller: "UibDatepickerController",
        controllerAs: "datepicker",
        link: function (a, b, c, d) {
            var e = d[0], f = d[1];
            e.init(f)
        }
    }
}).directive("uibDaypicker", function () {
    return {
        replace: !0,
        templateUrl: function (a, b) {
            return b.templateUrl || "uib/template/datepicker/day.html"
        },
        require: ["^uibDatepicker", "uibDaypicker"],
        controller: "UibDaypickerController",
        link: function (a, b, c, d) {
            var e = d[0], f = d[1];
            f.init(e)
        }
    }
}).directive("uibMonthpicker", function () {
    return {
        replace: !0,
        templateUrl: function (a, b) {
            return b.templateUrl || "uib/template/datepicker/month.html"
        },
        require: ["^uibDatepicker", "uibMonthpicker"],
        controller: "UibMonthpickerController",
        link: function (a, b, c, d) {
            var e = d[0], f = d[1];
            f.init(e)
        }
    }
}).directive("uibYearpicker", function () {
    return {
        replace: !0,
        templateUrl: function (a, b) {
            return b.templateUrl || "uib/template/datepicker/year.html"
        },
        require: ["^uibDatepicker", "uibYearpicker"],
        controller: "UibYearpickerController",
        link: function (a, b, c, d) {
            var e = d[0];
            angular.extend(e, d[1]), e.yearpickerInit(), e.refreshView()
        }
    }
}).value("uibDatepickerPopupAttributeWarning", !0).constant("uibDatepickerPopupConfig", {
    altInputFormats: [],
    appendToBody: !1,
    clearText: "Clear",
    closeOnDateSelection: !0,
    closeText: "Done",
    currentText: "Today",
    datepickerPopup: "yyyy-MM-dd",
    datepickerPopupTemplateUrl: "uib/template/datepicker/popup.html",
    datepickerTemplateUrl: "uib/template/datepicker/datepicker.html",
    html5Types: {date: "yyyy-MM-dd", "datetime-local": "yyyy-MM-ddTHH:mm:ss.sss", month: "yyyy-MM"},
    onOpenFocus: !0,
    showButtonBar: !0,
    placement: "auto bottom-left"
}).controller("UibDatepickerPopupController", ["$scope", "$element", "$attrs", "$compile", "$log", "$parse", "$window", "$document", "$rootScope", "$uibPosition", "dateFilter", "uibDateParser", "uibDatepickerPopupConfig", "$timeout", "uibDatepickerConfig", "uibDatepickerPopupAttributeWarning", function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
    function q(a) {
        return a.replace(/([A-Z])/g, function (a) {
            return "-" + a.toLowerCase()
        })
    }

    function r(b) {
        var c = l.parse(b, x, a.date);
        if (isNaN(c))for (var d = 0; d < J.length; d++)if (c = l.parse(b, J[d], a.date), !isNaN(c))return c;
        return c
    }

    function s(a) {
        if (angular.isNumber(a) && (a = new Date(a)), !a)return null;
        if (angular.isDate(a) && !isNaN(a))return a;
        if (angular.isString(a)) {
            var b = r(a);
            if (!isNaN(b))return l.toTimezone(b, H.timezone)
        }
        return G.$options && G.$options.allowInvalid ? a : void 0
    }

    function t(a, b) {
        var d = a || b;
        return c.ngRequired || d ? (angular.isNumber(d) && (d = new Date(d)), d ? angular.isDate(d) && !isNaN(d) ? !0 : angular.isString(d) ? !isNaN(r(b)) : !1 : !0) : !0
    }

    function u(c) {
        if (a.isOpen || !a.disabled) {
            var d = I[0], e = b[0].contains(c.target), f = void 0 !== d.contains && d.contains(c.target);
            !a.isOpen || e || f || a.$apply(function () {
                a.isOpen = !1
            })
        }
    }

    function v(c) {
        27 === c.which && a.isOpen ? (c.preventDefault(), c.stopPropagation(), a.$apply(function () {
            a.isOpen = !1
        }), b[0].focus()) : 40 !== c.which || a.isOpen || (c.preventDefault(), c.stopPropagation(), a.$apply(function () {
            a.isOpen = !0
        }))
    }

    function w() {
        if (a.isOpen) {
            var d = angular.element(I[0].querySelector(".uib-datepicker-popup")), e = c.popupPlacement ? c.popupPlacement : m.placement, f = j.positionElements(b, d, e, z);
            d.css({
                top: f.top + "px",
                left: f.left + "px"
            }), d.hasClass("uib-position-measure") && d.removeClass("uib-position-measure")
        }
    }

    var x, y, z, A, B, C, D, E, F, G, H, I, J, K = {}, L = !1, M = [];
    a.watchData = {}, this.init = function (j) {
        if (G = j, H = j.$options || o.ngModelOptions, y = angular.isDefined(c.closeOnDateSelection) ? a.$parent.$eval(c.closeOnDateSelection) : m.closeOnDateSelection, z = angular.isDefined(c.datepickerAppendToBody) ? a.$parent.$eval(c.datepickerAppendToBody) : m.appendToBody, A = angular.isDefined(c.onOpenFocus) ? a.$parent.$eval(c.onOpenFocus) : m.onOpenFocus, B = angular.isDefined(c.datepickerPopupTemplateUrl) ? c.datepickerPopupTemplateUrl : m.datepickerPopupTemplateUrl, C = angular.isDefined(c.datepickerTemplateUrl) ? c.datepickerTemplateUrl : m.datepickerTemplateUrl, J = angular.isDefined(c.altInputFormats) ? a.$parent.$eval(c.altInputFormats) : m.altInputFormats, a.showButtonBar = angular.isDefined(c.showButtonBar) ? a.$parent.$eval(c.showButtonBar) : m.showButtonBar, m.html5Types[c.type] ? (x = m.html5Types[c.type], L = !0) : (x = c.uibDatepickerPopup || m.datepickerPopup, c.$observe("uibDatepickerPopup", function (a, b) {
                var c = a || m.datepickerPopup;
                if (c !== x && (x = c, G.$modelValue = null, !x))throw new Error("uibDatepickerPopup must have a date format specified.")
            })), !x)throw new Error("uibDatepickerPopup must have a date format specified.");
        if (L && c.uibDatepickerPopup)throw new Error("HTML5 date input types do not support custom formats.");
        D = angular.element("<div uib-datepicker-popup-wrap><div uib-datepicker></div></div>"), a.ngModelOptions = angular.copy(H), a.ngModelOptions.timezone = null, a.ngModelOptions.updateOnDefault === !0 && (a.ngModelOptions.updateOn = a.ngModelOptions.updateOn ? a.ngModelOptions.updateOn + " default" : "default"), D.attr({
            "ng-model": "date",
            "ng-model-options": "ngModelOptions",
            "ng-change": "dateSelection(date)",
            "template-url": B
        }), E = angular.element(D.children()[0]), E.attr("template-url", C), L && "month" === c.type && (E.attr("datepicker-mode", '"month"'), E.attr("min-mode", "month")), a.datepickerOptions && E.attr("datepicker-options", "datepickerOptions"), angular.forEach(["minMode", "maxMode", "datepickerMode", "shortcutPropagation"], function (b) {
            if (c[b]) {
                p && e.warn("uib-datepicker settings via uib-datepicker-popup attributes are deprecated and will be removed in UI Bootstrap 1.3, use datepicker-options attribute instead");
                var d = f(c[b]), g = {
                    get: function () {
                        return d(a.$parent)
                    }
                };
                if (E.attr(q(b), "watchData." + b), "datepickerMode" === b) {
                    var h = d.assign;
                    g.set = function (b) {
                        h(a.$parent, b)
                    }
                }
                Object.defineProperty(a.watchData, b, g)
            }
        }), angular.forEach(["minDate", "maxDate", "initDate"], function (b) {
            if (c[b]) {
                p && e.warn("uib-datepicker settings via uib-datepicker-popup attributes are deprecated and will be removed in UI Bootstrap 1.3, use datepicker-options attribute instead");
                var d = f(c[b]);
                M.push(a.$parent.$watch(d, function (c) {
                    if ("minDate" === b || "maxDate" === b)null === c ? K[b] = null : angular.isDate(c) ? K[b] = l.fromTimezone(new Date(c), H.timezone) : K[b] = new Date(k(c, "medium")), a.watchData[b] = null === c ? null : K[b]; else {
                        var d = c ? new Date(c) : new Date;
                        a.watchData[b] = l.fromTimezone(d, H.timezone)
                    }
                })), E.attr(q(b), "watchData." + b)
            }
        }), c.dateDisabled && (p && e.warn("uib-datepicker settings via uib-datepicker-popup attributes are deprecated and will be removed in UI Bootstrap 1.3, use datepicker-options attribute instead"), E.attr("date-disabled", "dateDisabled({ date: date, mode: mode })")), angular.forEach(["formatDay", "formatMonth", "formatYear", "formatDayHeader", "formatDayTitle", "formatMonthTitle", "showWeeks", "startingDay", "yearRows", "yearColumns"], function (a) {
            angular.isDefined(c[a]) && (p && e.warn("uib-datepicker settings via uib-datepicker-popup attributes are deprecated and will be removed in UI Bootstrap 1.3, use datepicker-options attribute instead"), E.attr(q(a), c[a]))
        }), c.customClass && (p && e.warn("uib-datepicker settings via uib-datepicker-popup attributes are deprecated and will be removed in UI Bootstrap 1.3, use datepicker-options attribute instead"), E.attr("custom-class", "customClass({ date: date, mode: mode })")), L ? G.$formatters.push(function (b) {
            return a.date = l.fromTimezone(b, H.timezone), b
        }) : (G.$$parserName = "date", G.$validators.date = t, G.$parsers.unshift(s), G.$formatters.push(function (b) {
            return G.$isEmpty(b) ? (a.date = b, b) : (a.date = l.fromTimezone(b, H.timezone), angular.isNumber(a.date) && (a.date = new Date(a.date)), l.filter(a.date, x))
        })), G.$viewChangeListeners.push(function () {
            a.date = r(G.$viewValue)
        }), b.on("keydown", v), I = d(D)(a), D.remove(), z ? h.find("body").append(I) : b.after(I), a.$on("$destroy", function () {
            for (a.isOpen === !0 && (i.$$phase || a.$apply(function () {
                a.isOpen = !1
            })), I.remove(), b.off("keydown", v), h.off("click", u), F && F.off("scroll", w), angular.element(g).off("resize", w); M.length;)M.shift()()
        })
    }, a.getText = function (b) {
        return a[b + "Text"] || m[b + "Text"]
    }, a.isDisabled = function (b) {
        return "today" === b && (b = new Date), a.watchData.minDate && a.compare(b, K.minDate) < 0 || a.watchData.maxDate && a.compare(b, K.maxDate) > 0
    }, a.compare = function (a, b) {
        return new Date(a.getFullYear(), a.getMonth(), a.getDate()) - new Date(b.getFullYear(), b.getMonth(), b.getDate())
    }, a.dateSelection = function (c) {
        angular.isDefined(c) && (a.date = c);
        var d = a.date ? l.filter(a.date, x) : null;
        b.val(d), G.$setViewValue(d), y && (a.isOpen = !1, b[0].focus())
    }, a.keydown = function (c) {
        27 === c.which && (c.stopPropagation(), a.isOpen = !1, b[0].focus())
    }, a.select = function (b, c) {
        if (c.stopPropagation(), "today" === b) {
            var d = new Date;
            angular.isDate(a.date) ? (b = new Date(a.date), b.setFullYear(d.getFullYear(), d.getMonth(), d.getDate())) : b = new Date(d.setHours(0, 0, 0, 0))
        }
        a.dateSelection(b)
    }, a.close = function (c) {
        c.stopPropagation(), a.isOpen = !1, b[0].focus()
    }, a.disabled = angular.isDefined(c.disabled) || !1, c.ngDisabled && M.push(a.$parent.$watch(f(c.ngDisabled), function (b) {
        a.disabled = b
    })), a.$watch("isOpen", function (d) {
        d ? a.disabled ? a.isOpen = !1 : n(function () {
            w(), A && a.$broadcast("uib:datepicker.focus"), h.on("click", u);
            var d = c.popupPlacement ? c.popupPlacement : m.placement;
            z || j.parsePlacement(d)[2] ? (F = F || angular.element(j.scrollParent(b)), F && F.on("scroll", w)) : F = null, angular.element(g).on("resize", w)
        }, 0, !1) : (h.off("click", u), F && F.off("scroll", w), angular.element(g).off("resize", w))
    }), a.$on("uib:datepicker.mode", function () {
        n(w, 0, !1)
    })
}]).directive("uibDatepickerPopup", function () {
    return {
        require: ["ngModel", "uibDatepickerPopup"],
        controller: "UibDatepickerPopupController",
        scope: {
            datepickerOptions: "=?",
            isOpen: "=?",
            currentText: "@",
            clearText: "@",
            closeText: "@",
            dateDisabled: "&",
            customClass: "&"
        },
        link: function (a, b, c, d) {
            var e = d[0], f = d[1];
            f.init(e)
        }
    }
}).directive("uibDatepickerPopupWrap", function () {
    return {
        replace: !0, transclude: !0, templateUrl: function (a, b) {
            return b.templateUrl || "uib/template/datepicker/popup.html"
        }
    }
}), angular.module("ui.bootstrap.debounce", []).factory("$$debounce", ["$timeout", function (a) {
    return function (b, c) {
        var d;
        return function () {
            var e = this, f = Array.prototype.slice.call(arguments);
            d && a.cancel(d), d = a(function () {
                b.apply(e, f)
            }, c)
        }
    }
}]), angular.module("ui.bootstrap.dropdown", ["ui.bootstrap.position"]).constant("uibDropdownConfig", {
    appendToOpenClass: "uib-dropdown-open",
    openClass: "open"
}).service("uibDropdownService", ["$document", "$rootScope", function (a, b) {
    var c = null;
    this.open = function (b) {
        c || (a.on("click", d), a.on("keydown", e)), c && c !== b && (c.isOpen = !1), c = b
    }, this.close = function (b) {
        c === b && (c = null, a.off("click", d), a.off("keydown", e))
    };
    var d = function (a) {
        if (c && !(a && "disabled" === c.getAutoClose() || a && 3 === a.which)) {
            var d = c.getToggleElement();
            if (!(a && d && d[0].contains(a.target))) {
                var e = c.getDropdownElement();
                a && "outsideClick" === c.getAutoClose() && e && e[0].contains(a.target) || (c.isOpen = !1, b.$$phase || c.$apply())
            }
        }
    }, e = function (a) {
        27 === a.which ? (c.focusToggleElement(), d()) : c.isKeynavEnabled() && -1 !== [38, 40].indexOf(a.which) && c.isOpen && (a.preventDefault(), a.stopPropagation(), c.focusDropdownEntry(a.which))
    }
}]).controller("UibDropdownController", ["$scope", "$element", "$attrs", "$parse", "uibDropdownConfig", "uibDropdownService", "$animate", "$uibPosition", "$document", "$compile", "$templateRequest", function (a, b, c, d, e, f, g, h, i, j, k) {
    var l, m, n = this, o = a.$new(), p = e.appendToOpenClass, q = e.openClass, r = angular.noop, s = c.onToggle ? d(c.onToggle) : angular.noop, t = !1, u = null, v = !1, w = i.find("body");
    b.addClass("dropdown"), this.init = function () {
        if (c.isOpen && (m = d(c.isOpen), r = m.assign, a.$watch(m, function (a) {
                o.isOpen = !!a
            })), angular.isDefined(c.dropdownAppendTo)) {
            var e = d(c.dropdownAppendTo)(o);
            e && (u = angular.element(e))
        }
        t = angular.isDefined(c.dropdownAppendToBody), v = angular.isDefined(c.keyboardNav), t && !u && (u = w), u && n.dropdownMenu && (u.append(n.dropdownMenu), b.on("$destroy", function () {
            n.dropdownMenu.remove()
        }))
    }, this.toggle = function (a) {
        return o.isOpen = arguments.length ? !!a : !o.isOpen, angular.isFunction(r) && r(o, o.isOpen), o.isOpen
    }, this.isOpen = function () {
        return o.isOpen
    }, o.getToggleElement = function () {
        return n.toggleElement
    }, o.getAutoClose = function () {
        return c.autoClose || "always"
    }, o.getElement = function () {
        return b
    }, o.isKeynavEnabled = function () {
        return v
    }, o.focusDropdownEntry = function (a) {
        var c = n.dropdownMenu ? angular.element(n.dropdownMenu).find("a") : b.find("ul").eq(0).find("a");
        switch (a) {
            case 40:
                angular.isNumber(n.selectedOption) ? n.selectedOption = n.selectedOption === c.length - 1 ? n.selectedOption : n.selectedOption + 1 : n.selectedOption = 0;
                break;
            case 38:
                angular.isNumber(n.selectedOption) ? n.selectedOption = 0 === n.selectedOption ? 0 : n.selectedOption - 1 : n.selectedOption = c.length - 1
        }
        c[n.selectedOption].focus()
    }, o.getDropdownElement = function () {
        return n.dropdownMenu
    }, o.focusToggleElement = function () {
        n.toggleElement && n.toggleElement[0].focus()
    }, o.$watch("isOpen", function (c, d) {
        if (u && n.dropdownMenu) {
            var e, i, m = h.positionElements(b, n.dropdownMenu, "bottom-left", !0);
            if (e = {
                    top: m.top + "px",
                    display: c ? "block" : "none"
                }, i = n.dropdownMenu.hasClass("dropdown-menu-right"), i ? (e.left = "auto", e.right = window.innerWidth - (m.left + b.prop("offsetWidth")) + "px") : (e.left = m.left + "px", e.right = "auto"), !t) {
                var v = h.offset(u);
                e.top = m.top - v.top + "px", i ? e.right = window.innerWidth - (m.left - v.left + b.prop("offsetWidth")) + "px" : e.left = m.left - v.left + "px"
            }
            n.dropdownMenu.css(e)
        }
        var w = u ? u : b, x = w.hasClass(u ? p : q);
        if (x === !c && g[c ? "addClass" : "removeClass"](w, u ? p : q).then(function () {
                angular.isDefined(c) && c !== d && s(a, {open: !!c})
            }), c)n.dropdownMenuTemplateUrl && k(n.dropdownMenuTemplateUrl).then(function (a) {
            l = o.$new(), j(a.trim())(l, function (a) {
                var b = a;
                n.dropdownMenu.replaceWith(b), n.dropdownMenu = b
            })
        }), o.focusToggleElement(), f.open(o); else {
            if (n.dropdownMenuTemplateUrl) {
                l && l.$destroy();
                var y = angular.element('<ul class="dropdown-menu"></ul>');
                n.dropdownMenu.replaceWith(y), n.dropdownMenu = y
            }
            f.close(o), n.selectedOption = null
        }
        angular.isFunction(r) && r(a, c)
    }), a.$on("$locationChangeSuccess", function () {
        "disabled" !== o.getAutoClose() && (o.isOpen = !1)
    })
}]).directive("uibDropdown", function () {
    return {
        controller: "UibDropdownController", link: function (a, b, c, d) {
            d.init()
        }
    }
}).directive("uibDropdownMenu", function () {
    return {
        restrict: "A", require: "?^uibDropdown", link: function (a, b, c, d) {
            if (d && !angular.isDefined(c.dropdownNested)) {
                b.addClass("dropdown-menu");
                var e = c.templateUrl;
                e && (d.dropdownMenuTemplateUrl = e), d.dropdownMenu || (d.dropdownMenu = b)
            }
        }
    }
}).directive("uibDropdownToggle", function () {
    return {
        require: "?^uibDropdown", link: function (a, b, c, d) {
            if (d) {
                b.addClass("dropdown-toggle"), d.toggleElement = b;
                var e = function (e) {
                    e.preventDefault(), b.hasClass("disabled") || c.disabled || a.$apply(function () {
                        d.toggle()
                    })
                };
                b.bind("click", e), b.attr({
                    "aria-haspopup": !0,
                    "aria-expanded": !1
                }), a.$watch(d.isOpen, function (a) {
                    b.attr("aria-expanded", !!a)
                }), a.$on("$destroy", function () {
                    b.unbind("click", e)
                })
            }
        }
    }
}), angular.module("ui.bootstrap.stackedMap", []).factory("$$stackedMap", function () {
    return {
        createNew: function () {
            var a = [];
            return {
                add: function (b, c) {
                    a.push({key: b, value: c})
                }, get: function (b) {
                    for (var c = 0; c < a.length; c++)if (b === a[c].key)return a[c]
                }, keys: function () {
                    for (var b = [], c = 0; c < a.length; c++)b.push(a[c].key);
                    return b
                }, top: function () {
                    return a[a.length - 1]
                }, remove: function (b) {
                    for (var c = -1, d = 0; d < a.length; d++)if (b === a[d].key) {
                        c = d;
                        break
                    }
                    return a.splice(c, 1)[0]
                }, removeTop: function () {
                    return a.splice(a.length - 1, 1)[0]
                }, length: function () {
                    return a.length
                }
            }
        }
    }
}), angular.module("ui.bootstrap.modal", ["ui.bootstrap.stackedMap"]).factory("$$multiMap", function () {
    return {
        createNew: function () {
            var a = {};
            return {
                entries: function () {
                    return Object.keys(a).map(function (b) {
                        return {key: b, value: a[b]}
                    })
                }, get: function (b) {
                    return a[b]
                }, hasKey: function (b) {
                    return !!a[b]
                }, keys: function () {
                    return Object.keys(a)
                }, put: function (b, c) {
                    a[b] || (a[b] = []), a[b].push(c)
                }, remove: function (b, c) {
                    var d = a[b];
                    if (d) {
                        var e = d.indexOf(c);
                        -1 !== e && d.splice(e, 1), d.length || delete a[b]
                    }
                }
            }
        }
    }
}).provider("$uibResolve", function () {
    var a = this;
    this.resolver = null, this.setResolver = function (a) {
        this.resolver = a
    }, this.$get = ["$injector", "$q", function (b, c) {
        var d = a.resolver ? b.get(a.resolver) : null;
        return {
            resolve: function (a, e, f, g) {
                if (d)return d.resolve(a, e, f, g);
                var h = [];
                return angular.forEach(a, function (a) {
                    angular.isFunction(a) || angular.isArray(a) ? h.push(c.resolve(b.invoke(a))) : angular.isString(a) ? h.push(c.resolve(b.get(a))) : h.push(c.resolve(a))
                }), c.all(h).then(function (b) {
                    var c = {}, d = 0;
                    return angular.forEach(a, function (a, e) {
                        c[e] = b[d++]
                    }), c
                })
            }
        }
    }]
}).directive("uibModalBackdrop", ["$animate", "$injector", "$uibModalStack", function (a, b, c) {
    function d(b, d, e) {
        e.modalInClass && (a.addClass(d, e.modalInClass), b.$on(c.NOW_CLOSING_EVENT, function (c, f) {
            var g = f();
            b.modalOptions.animation ? a.removeClass(d, e.modalInClass).then(g) : g()
        }))
    }

    return {
        replace: !0, templateUrl: "uib/template/modal/backdrop.html", compile: function (a, b) {
            return a.addClass(b.backdropClass), d
        }
    }
}]).directive("uibModalWindow", ["$uibModalStack", "$q", "$animateCss", "$document", function (a, b, c, d) {
    return {
        scope: {index: "@"}, replace: !0, transclude: !0, templateUrl: function (a, b) {
            return b.templateUrl || "uib/template/modal/window.html"
        }, link: function (e, f, g) {
            f.addClass(g.windowClass || ""), f.addClass(g.windowTopClass || ""), e.size = g.size, e.close = function (b) {
                var c = a.getTop();
                c && c.value.backdrop && "static" !== c.value.backdrop && b.target === b.currentTarget && (b.preventDefault(), b.stopPropagation(), a.dismiss(c.key, "backdrop click"))
            }, f.on("click", e.close), e.$isRendered = !0;
            var h = b.defer();
            g.$observe("modalRender", function (a) {
                "true" === a && h.resolve()
            }), h.promise.then(function () {
                var h = null;
                g.modalInClass && (h = c(f, {addClass: g.modalInClass}).start(), e.$on(a.NOW_CLOSING_EVENT, function (a, b) {
                    var d = b();
                    c(f, {removeClass: g.modalInClass}).start().then(d)
                })), b.when(h).then(function () {
                    var b = a.getTop();
                    if (b && a.modalRendered(b.key), !d[0].activeElement || !f[0].contains(d[0].activeElement)) {
                        var c = f[0].querySelector("[autofocus]");
                        c ? c.focus() : f[0].focus()
                    }
                })
            })
        }
    }
}]).directive("uibModalAnimationClass", function () {
    return {
        compile: function (a, b) {
            b.modalAnimation && a.addClass(b.uibModalAnimationClass)
        }
    }
}).directive("uibModalTransclude", function () {
    return {
        link: function (a, b, c, d, e) {
            e(a.$parent, function (a) {
                b.empty(), b.append(a)
            })
        }
    }
}).factory("$uibModalStack", ["$animate", "$animateCss", "$document", "$compile", "$rootScope", "$q", "$$multiMap", "$$stackedMap", function (a, b, c, d, e, f, g, h) {
    function i() {
        for (var a = -1, b = t.keys(), c = 0; c < b.length; c++)t.get(b[c]).value.backdrop && (a = c);
        return a
    }

    function j(a, b) {
        var c = t.get(a).value, d = c.appendTo;
        t.remove(a), m(c.modalDomEl, c.modalScope, function () {
            var b = c.openedClass || s;
            u.remove(b, a), d.toggleClass(b, u.hasKey(b)), k(!0)
        }, c.closedDeferred), l(), b && b.focus ? b.focus() : d.focus && d.focus()
    }

    function k(a) {
        var b;
        t.length() > 0 && (b = t.top().value, b.modalDomEl.toggleClass(b.windowTopClass || "", a))
    }

    function l() {
        if (p && -1 === i()) {
            var a = q;
            m(p, q, function () {
                a = null
            }), p = void 0, q = void 0
        }
    }

    function m(b, c, d, e) {
        function g() {
            g.done || (g.done = !0, a.leave(b).then(function () {
                b.remove(), e && e.resolve()
            }), c.$destroy(), d && d())
        }

        var h, i = null, j = function () {
            return h || (h = f.defer(), i = h.promise), function () {
                h.resolve()
            }
        };
        return c.$broadcast(v.NOW_CLOSING_EVENT, j), f.when(i).then(g)
    }

    function n(a) {
        if (a.isDefaultPrevented())return a;
        var b = t.top();
        if (b)switch (a.which) {
            case 27:
                b.value.keyboard && (a.preventDefault(), e.$apply(function () {
                    v.dismiss(b.key, "escape key press")
                }));
                break;
            case 9:
                v.loadFocusElementList(b);
                var c = !1;
                a.shiftKey ? (v.isFocusInFirstItem(a) || v.isModalFocused(a, b)) && (c = v.focusLastFocusableElement()) : v.isFocusInLastItem(a) && (c = v.focusFirstFocusableElement()), c && (a.preventDefault(), a.stopPropagation())
        }
    }

    function o(a, b, c) {
        return !a.value.modalScope.$broadcast("modal.closing", b, c).defaultPrevented
    }

    var p, q, r, s = "modal-open", t = h.createNew(), u = g.createNew(), v = {NOW_CLOSING_EVENT: "modal.stack.now-closing"}, w = 0, x = "a[href], area[href], input:not([disabled]), button:not([disabled]),select:not([disabled]), textarea:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable=true]";
    return e.$watch(i, function (a) {
        q && (q.index = a)
    }), c.on("keydown", n), e.$on("$destroy", function () {
        c.off("keydown", n)
    }), v.open = function (b, f) {
        var g = c[0].activeElement, h = f.openedClass || s;
        k(!1), t.add(b, {
            deferred: f.deferred,
            renderDeferred: f.renderDeferred,
            closedDeferred: f.closedDeferred,
            modalScope: f.scope,
            backdrop: f.backdrop,
            keyboard: f.keyboard,
            openedClass: f.openedClass,
            windowTopClass: f.windowTopClass,
            animation: f.animation,
            appendTo: f.appendTo
        }), u.put(h, b);
        var j = f.appendTo, l = i();
        if (!j.length)throw new Error("appendTo element not found. Make sure that the element passed is in DOM.");
        l >= 0 && !p && (q = e.$new(!0), q.modalOptions = f, q.index = l, p = angular.element('<div uib-modal-backdrop="modal-backdrop"></div>'), p.attr("backdrop-class", f.backdropClass), f.animation && p.attr("modal-animation", "true"), d(p)(q), a.enter(p, j));
        var m = angular.element('<div uib-modal-window="modal-window"></div>');
        m.attr({
            "template-url": f.windowTemplateUrl,
            "window-class": f.windowClass,
            "window-top-class": f.windowTopClass,
            size: f.size,
            index: t.length() - 1,
            animate: "animate"
        }).html(f.content), f.animation && m.attr("modal-animation", "true"), a.enter(d(m)(f.scope), j).then(function () {
            f.scope.$$uibDestructionScheduled || a.addClass(j, h)
        }), t.top().value.modalDomEl = m, t.top().value.modalOpener = g, v.clearFocusListCache()
    }, v.close = function (a, b) {
        var c = t.get(a);
        return c && o(c, b, !0) ? (c.value.modalScope.$$uibDestructionScheduled = !0, c.value.deferred.resolve(b), j(a, c.value.modalOpener), !0) : !c
    }, v.dismiss = function (a, b) {
        var c = t.get(a);
        return c && o(c, b, !1) ? (c.value.modalScope.$$uibDestructionScheduled = !0, c.value.deferred.reject(b), j(a, c.value.modalOpener), !0) : !c
    }, v.dismissAll = function (a) {
        for (var b = this.getTop(); b && this.dismiss(b.key, a);)b = this.getTop()
    }, v.getTop = function () {
        return t.top()
    }, v.modalRendered = function (a) {
        var b = t.get(a);
        b && b.value.renderDeferred.resolve()
    }, v.focusFirstFocusableElement = function () {
        return r.length > 0 ? (r[0].focus(), !0) : !1
    }, v.focusLastFocusableElement = function () {
        return r.length > 0 ? (r[r.length - 1].focus(), !0) : !1
    }, v.isModalFocused = function (a, b) {
        if (a && b) {
            var c = b.value.modalDomEl;
            if (c && c.length)return (a.target || a.srcElement) === c[0]
        }
        return !1
    }, v.isFocusInFirstItem = function (a) {
        return r.length > 0 ? (a.target || a.srcElement) === r[0] : !1
    }, v.isFocusInLastItem = function (a) {
        return r.length > 0 ? (a.target || a.srcElement) === r[r.length - 1] : !1
    }, v.clearFocusListCache = function () {
        r = [], w = 0
    }, v.loadFocusElementList = function (a) {
        if ((void 0 === r || !r.length) && a) {
            var b = a.value.modalDomEl;
            b && b.length && (r = b[0].querySelectorAll(x))
        }
    }, v
}]).provider("$uibModal", function () {
    var a = {
        options: {animation: !0, backdrop: !0, keyboard: !0},
        $get: ["$rootScope", "$q", "$document", "$templateRequest", "$controller", "$uibResolve", "$uibModalStack", function (b, c, d, e, f, g, h) {
            function i(a) {
                return a.template ? c.when(a.template) : e(angular.isFunction(a.templateUrl) ? a.templateUrl() : a.templateUrl)
            }

            var j = {}, k = null;
            return j.getPromiseChain = function () {
                return k
            }, j.open = function (e) {
                function j() {
                    return r
                }

                var l = c.defer(), m = c.defer(), n = c.defer(), o = c.defer(), p = {
                    result: l.promise,
                    opened: m.promise,
                    closed: n.promise,
                    rendered: o.promise,
                    close: function (a) {
                        return h.close(p, a)
                    },
                    dismiss: function (a) {
                        return h.dismiss(p, a)
                    }
                };
                if (e = angular.extend({}, a.options, e), e.resolve = e.resolve || {}, e.appendTo = e.appendTo || d.find("body").eq(0), !e.template && !e.templateUrl)throw new Error("One of template or templateUrl options is required.");
                var q, r = c.all([i(e), g.resolve(e.resolve, {}, null, null)]);
                return q = k = c.all([k]).then(j, j).then(function (a) {
                    var c = e.scope || b, d = c.$new();
                    d.$close = p.close, d.$dismiss = p.dismiss, d.$on("$destroy", function () {
                        d.$$uibDestructionScheduled || d.$dismiss("$uibUnscheduledDestruction")
                    });
                    var g, i, j = {};
                    e.controller && (j.$scope = d, j.$uibModalInstance = p, angular.forEach(a[1], function (a, b) {
                        j[b] = a
                    }), i = f(e.controller, j, !0), e.controllerAs ? (g = i.instance, e.bindToController && (g.$close = d.$close, g.$dismiss = d.$dismiss, angular.extend(g, c)), g = i(), d[e.controllerAs] = g) : g = i(), angular.isFunction(g.$onInit) && g.$onInit()), h.open(p, {
                        scope: d,
                        deferred: l,
                        renderDeferred: o,
                        closedDeferred: n,
                        content: a[0],
                        animation: e.animation,
                        backdrop: e.backdrop,
                        keyboard: e.keyboard,
                        backdropClass: e.backdropClass,
                        windowTopClass: e.windowTopClass,
                        windowClass: e.windowClass,
                        windowTemplateUrl: e.windowTemplateUrl,
                        size: e.size,
                        openedClass: e.openedClass,
                        appendTo: e.appendTo
                    }), m.resolve(!0)
                }, function (a) {
                    m.reject(a), l.reject(a)
                })["finally"](function () {
                    k === q && (k = null)
                }), p
            }, j
        }]
    };
    return a
}), angular.module("ui.bootstrap.paging", []).factory("uibPaging", ["$parse", function (a) {
    return {
        create: function (b, c, d) {
            b.setNumPages = d.numPages ? a(d.numPages).assign : angular.noop, b.ngModelCtrl = {$setViewValue: angular.noop}, b._watchers = [], b.init = function (a, e) {
                b.ngModelCtrl = a, b.config = e, a.$render = function () {
                    b.render()
                }, d.itemsPerPage ? b._watchers.push(c.$parent.$watch(d.itemsPerPage, function (a) {
                    b.itemsPerPage = parseInt(a, 10), c.totalPages = b.calculateTotalPages(), b.updatePage()
                })) : b.itemsPerPage = e.itemsPerPage, c.$watch("totalItems", function (a, d) {
                    (angular.isDefined(a) || a !== d) && (c.totalPages = b.calculateTotalPages(), b.updatePage())
                })
            }, b.calculateTotalPages = function () {
                var a = b.itemsPerPage < 1 ? 1 : Math.ceil(c.totalItems / b.itemsPerPage);
                return Math.max(a || 0, 1)
            }, b.render = function () {
                c.page = parseInt(b.ngModelCtrl.$viewValue, 10) || 1
            }, c.selectPage = function (a, d) {
                d && d.preventDefault();
                var e = !c.ngDisabled || !d;
                e && c.page !== a && a > 0 && a <= c.totalPages && (d && d.target && d.target.blur(), b.ngModelCtrl.$setViewValue(a), b.ngModelCtrl.$render())
            }, c.getText = function (a) {
                return c[a + "Text"] || b.config[a + "Text"]
            }, c.noPrevious = function () {
                return 1 === c.page
            }, c.noNext = function () {
                return c.page === c.totalPages
            }, b.updatePage = function () {
                b.setNumPages(c.$parent, c.totalPages), c.page > c.totalPages ? c.selectPage(c.totalPages) : b.ngModelCtrl.$render()
            }, c.$on("$destroy", function () {
                for (; b._watchers.length;)b._watchers.shift()()
            })
        }
    }
}]), angular.module("ui.bootstrap.pager", ["ui.bootstrap.paging"]).controller("UibPagerController", ["$scope", "$attrs", "uibPaging", "uibPagerConfig", function (a, b, c, d) {
    a.align = angular.isDefined(b.align) ? a.$parent.$eval(b.align) : d.align, c.create(this, a, b)
}]).constant("uibPagerConfig", {
    itemsPerPage: 10,
    previousText: "« Previous",
    nextText: "Next »",
    align: !0
}).directive("uibPager", ["uibPagerConfig", function (a) {
    return {
        scope: {totalItems: "=", previousText: "@", nextText: "@", ngDisabled: "="},
        require: ["uibPager", "?ngModel"],
        controller: "UibPagerController",
        controllerAs: "pager",
        templateUrl: function (a, b) {
            return b.templateUrl || "uib/template/pager/pager.html"
        },
        replace: !0,
        link: function (b, c, d, e) {
            var f = e[0], g = e[1];
            g && f.init(g, a)
        }
    }
}]), angular.module("ui.bootstrap.pagination", ["ui.bootstrap.paging"]).controller("UibPaginationController", ["$scope", "$attrs", "$parse", "uibPaging", "uibPaginationConfig", function (a, b, c, d, e) {
    function f(a, b, c) {
        return {number: a, text: b, active: c}
    }

    function g(a, b) {
        var c = [], d = 1, e = b, g = angular.isDefined(i) && b > i;
        g && (j ? (d = Math.max(a - Math.floor(i / 2), 1), e = d + i - 1, e > b && (e = b, d = e - i + 1)) : (d = (Math.ceil(a / i) - 1) * i + 1, e = Math.min(d + i - 1, b)));
        for (var h = d; e >= h; h++) {
            var n = f(h, m(h), h === a);
            c.push(n)
        }
        if (g && i > 0 && (!j || k || l)) {
            if (d > 1) {
                if (!l || d > 3) {
                    var o = f(d - 1, "...", !1);
                    c.unshift(o)
                }
                if (l) {
                    if (3 === d) {
                        var p = f(2, "2", !1);
                        c.unshift(p)
                    }
                    var q = f(1, "1", !1);
                    c.unshift(q)
                }
            }
            if (b > e) {
                if (!l || b - 2 > e) {
                    var r = f(e + 1, "...", !1);
                    c.push(r)
                }
                if (l) {
                    if (e === b - 2) {
                        var s = f(b - 1, b - 1, !1);
                        c.push(s)
                    }
                    var t = f(b, b, !1);
                    c.push(t)
                }
            }
        }
        return c
    }

    var h = this, i = angular.isDefined(b.maxSize) ? a.$parent.$eval(b.maxSize) : e.maxSize, j = angular.isDefined(b.rotate) ? a.$parent.$eval(b.rotate) : e.rotate, k = angular.isDefined(b.forceEllipses) ? a.$parent.$eval(b.forceEllipses) : e.forceEllipses, l = angular.isDefined(b.boundaryLinkNumbers) ? a.$parent.$eval(b.boundaryLinkNumbers) : e.boundaryLinkNumbers, m = angular.isDefined(b.pageLabel) ? function (c) {
        return a.$parent.$eval(b.pageLabel, {$page: c})
    } : angular.identity;
    a.boundaryLinks = angular.isDefined(b.boundaryLinks) ? a.$parent.$eval(b.boundaryLinks) : e.boundaryLinks, a.directionLinks = angular.isDefined(b.directionLinks) ? a.$parent.$eval(b.directionLinks) : e.directionLinks, d.create(this, a, b), b.maxSize && h._watchers.push(a.$parent.$watch(c(b.maxSize), function (a) {
        i = parseInt(a, 10), h.render()
    }));
    var n = this.render;
    this.render = function () {
        n(), a.page > 0 && a.page <= a.totalPages && (a.pages = g(a.page, a.totalPages))
    }
}]).constant("uibPaginationConfig", {
    itemsPerPage: 10,
    boundaryLinks: !1,
    boundaryLinkNumbers: !1,
    directionLinks: !0,
    firstText: "First",
    previousText: "Previous",
    nextText: "Next",
    lastText: "Last",
    rotate: !0,
    forceEllipses: !1
}).directive("uibPagination", ["$parse", "uibPaginationConfig", function (a, b) {
    return {
        scope: {totalItems: "=", firstText: "@", previousText: "@", nextText: "@", lastText: "@", ngDisabled: "="},
        require: ["uibPagination", "?ngModel"],
        controller: "UibPaginationController",
        controllerAs: "pagination",
        templateUrl: function (a, b) {
            return b.templateUrl || "uib/template/pagination/pagination.html"
        },
        replace: !0,
        link: function (a, c, d, e) {
            var f = e[0], g = e[1];
            g && f.init(g, b)
        }
    }
}]), angular.module("ui.bootstrap.tooltip", ["ui.bootstrap.position", "ui.bootstrap.stackedMap"]).provider("$uibTooltip", function () {
    function a(a) {
        var b = /[A-Z]/g, c = "-";
        return a.replace(b, function (a, b) {
            return (b ? c : "") + a.toLowerCase()
        })
    }

    var b = {
        placement: "top",
        placementClassPrefix: "",
        animation: !0,
        popupDelay: 0,
        popupCloseDelay: 0,
        useContentExp: !1
    }, c = {mouseenter: "mouseleave", click: "click", outsideClick: "outsideClick", focus: "blur", none: ""}, d = {};
    this.options = function (a) {
        angular.extend(d, a)
    }, this.setTriggers = function (a) {
        angular.extend(c, a)
    }, this.$get = ["$window", "$compile", "$timeout", "$document", "$uibPosition", "$interpolate", "$rootScope", "$parse", "$$stackedMap", function (e, f, g, h, i, j, k, l, m) {
        function n(a) {
            if (27 === a.which) {
                var b = o.top();
                b && (b.value.close(), o.removeTop(), b = null)
            }
        }

        var o = m.createNew();
        return h.on("keypress", n), k.$on("$destroy", function () {
            h.off("keypress", n)
        }), function (e, k, m, n) {
            function p(a) {
                var b = (a || n.trigger || m).split(" "), d = b.map(function (a) {
                    return c[a] || a
                });
                return {show: b, hide: d}
            }

            n = angular.extend({}, b, d, n);
            var q = a(e), r = j.startSymbol(), s = j.endSymbol(), t = "<div " + q + '-popup title="' + r + "title" + s + '" ' + (n.useContentExp ? 'content-exp="contentExp()" ' : 'content="' + r + "content" + s + '" ') + 'placement="' + r + "placement" + s + '" popup-class="' + r + "popupClass" + s + '" animation="animation" is-open="isOpen"origin-scope="origScope" class="uib-position-measure"></div>';
            return {
                compile: function (a, b) {
                    var c = f(t);
                    return function (a, b, d, f) {
                        function j() {
                            N.isOpen ? q() : m()
                        }

                        function m() {
                            (!M || a.$eval(d[k + "Enable"])) && (u(), x(), N.popupDelay ? G || (G = g(r, N.popupDelay, !1)) : r())
                        }

                        function q() {
                            s(), N.popupCloseDelay ? H || (H = g(t, N.popupCloseDelay, !1)) : t()
                        }

                        function r() {
                            return s(), u(), N.content ? (v(), void N.$evalAsync(function () {
                                N.isOpen = !0, y(!0), S()
                            })) : angular.noop
                        }

                        function s() {
                            G && (g.cancel(G), G = null), I && (g.cancel(I), I = null)
                        }

                        function t() {
                            N && N.$evalAsync(function () {
                                N && (N.isOpen = !1, y(!1), N.animation ? F || (F = g(w, 150, !1)) : w())
                            })
                        }

                        function u() {
                            H && (g.cancel(H), H = null), F && (g.cancel(F), F = null)
                        }

                        function v() {
                            D || (E = N.$new(), D = c(E, function (a) {
                                K ? h.find("body").append(a) : b.after(a)
                            }), z())
                        }

                        function w() {
                            s(), u(), A(), D && (D.remove(), D = null), E && (E.$destroy(), E = null)
                        }

                        function x() {
                            N.title = d[k + "Title"], Q ? N.content = Q(a) : N.content = d[e], N.popupClass = d[k + "Class"], N.placement = angular.isDefined(d[k + "Placement"]) ? d[k + "Placement"] : n.placement;
                            var b = i.parsePlacement(N.placement);
                            J = b[1] ? b[0] + "-" + b[1] : b[0];
                            var c = parseInt(d[k + "PopupDelay"], 10), f = parseInt(d[k + "PopupCloseDelay"], 10);
                            N.popupDelay = isNaN(c) ? n.popupDelay : c, N.popupCloseDelay = isNaN(f) ? n.popupCloseDelay : f
                        }

                        function y(b) {
                            P && angular.isFunction(P.assign) && P.assign(a, b)
                        }

                        function z() {
                            R.length = 0, Q ? (R.push(a.$watch(Q, function (a) {
                                N.content = a, !a && N.isOpen && t()
                            })), R.push(E.$watch(function () {
                                O || (O = !0, E.$$postDigest(function () {
                                    O = !1, N && N.isOpen && S()
                                }))
                            }))) : R.push(d.$observe(e, function (a) {
                                N.content = a, !a && N.isOpen ? t() : S()
                            })), R.push(d.$observe(k + "Title", function (a) {
                                N.title = a, N.isOpen && S()
                            })), R.push(d.$observe(k + "Placement", function (a) {
                                N.placement = a ? a : n.placement;
                                var b = i.parsePlacement(N.placement);
                                J = b[1] ? b[0] + "-" + b[1] : b[0], N.isOpen && S()
                            }))
                        }

                        function A() {
                            R.length && (angular.forEach(R, function (a) {
                                a()
                            }), R.length = 0)
                        }

                        function B(a) {
                            N && N.isOpen && D && (b[0].contains(a.target) || D[0].contains(a.target) || q())
                        }

                        function C() {
                            var a = d[k + "Trigger"];
                            T(), L = p(a), "none" !== L.show && L.show.forEach(function (a, c) {
                                "outsideClick" === a ? (b.on("click", j), h.on("click", B)) : a === L.hide[c] ? b.on(a, j) : a && (b.on(a, m), b.on(L.hide[c], q)), b.on("keypress", function (a) {
                                    27 === a.which && q()
                                })
                            })
                        }

                        var D, E, F, G, H, I, J, K = angular.isDefined(n.appendToBody) ? n.appendToBody : !1, L = p(void 0), M = angular.isDefined(d[k + "Enable"]), N = a.$new(!0), O = !1, P = angular.isDefined(d[k + "IsOpen"]) ? l(d[k + "IsOpen"]) : !1, Q = n.useContentExp ? l(d[e]) : !1, R = [], S = function () {
                            D && D.html() && (I || (I = g(function () {
                                var a = i.positionElements(b, D, N.placement, K);
                                D.css({
                                    top: a.top + "px",
                                    left: a.left + "px"
                                }), D.hasClass(a.placement.split("-")[0]) || (D.removeClass(J.split("-")[0]), D.addClass(a.placement.split("-")[0])), D.hasClass(n.placementClassPrefix + a.placement) || (D.removeClass(n.placementClassPrefix + J), D.addClass(n.placementClassPrefix + a.placement)), D.hasClass("uib-position-measure") ? (i.positionArrow(D, a.placement), D.removeClass("uib-position-measure")) : J !== a.placement && i.positionArrow(D, a.placement), J = a.placement, I = null
                            }, 0, !1)))
                        };
                        N.origScope = a, N.isOpen = !1, o.add(N, {close: t}), N.contentExp = function () {
                            return N.content
                        }, d.$observe("disabled", function (a) {
                            a && s(), a && N.isOpen && t()
                        }), P && a.$watch(P, function (a) {
                            N && !a === N.isOpen && j()
                        });
                        var T = function () {
                            L.show.forEach(function (a) {
                                "outsideClick" === a ? b.off("click", j) : (b.off(a, m), b.off(a, j))
                            }), L.hide.forEach(function (a) {
                                "outsideClick" === a ? h.off("click", B) : b.off(a, q)
                            })
                        };
                        C();
                        var U = a.$eval(d[k + "Animation"]);
                        N.animation = angular.isDefined(U) ? !!U : n.animation;
                        var V, W = k + "AppendToBody";
                        V = W in d && void 0 === d[W] ? !0 : a.$eval(d[W]), K = angular.isDefined(V) ? V : K, a.$on("$destroy", function () {
                            T(), w(), o.remove(N), N = null
                        })
                    }
                }
            }
        }
    }]
}).directive("uibTooltipTemplateTransclude", ["$animate", "$sce", "$compile", "$templateRequest", function (a, b, c, d) {
    return {
        link: function (e, f, g) {
            var h, i, j, k = e.$eval(g.tooltipTemplateTranscludeScope), l = 0, m = function () {
                i && (i.remove(), i = null), h && (h.$destroy(), h = null), j && (a.leave(j).then(function () {
                    i = null
                }), i = j, j = null)
            };
            e.$watch(b.parseAsResourceUrl(g.uibTooltipTemplateTransclude), function (b) {
                var g = ++l;
                b ? (d(b, !0).then(function (d) {
                    if (g === l) {
                        var e = k.$new(), i = d, n = c(i)(e, function (b) {
                            m(), a.enter(b, f)
                        });
                        h = e, j = n, h.$emit("$includeContentLoaded", b)
                    }
                }, function () {
                    g === l && (m(), e.$emit("$includeContentError", b))
                }), e.$emit("$includeContentRequested", b)) : m()
            }), e.$on("$destroy", m)
        }
    }
}]).directive("uibTooltipClasses", ["$uibPosition", function (a) {
    return {
        restrict: "A", link: function (b, c, d) {
            if (b.placement) {
                var e = a.parsePlacement(b.placement);
                c.addClass(e[0])
            }
            b.popupClass && c.addClass(b.popupClass), b.animation() && c.addClass(d.tooltipAnimationClass)
        }
    }
}]).directive("uibTooltipPopup", function () {
    return {
        replace: !0,
        scope: {content: "@", placement: "@", popupClass: "@", animation: "&", isOpen: "&"},
        templateUrl: "uib/template/tooltip/tooltip-popup.html"
    }
}).directive("uibTooltip", ["$uibTooltip", function (a) {
    return a("uibTooltip", "tooltip", "mouseenter")
}]).directive("uibTooltipTemplatePopup", function () {
    return {
        replace: !0,
        scope: {contentExp: "&", placement: "@", popupClass: "@", animation: "&", isOpen: "&", originScope: "&"},
        templateUrl: "uib/template/tooltip/tooltip-template-popup.html"
    }
}).directive("uibTooltipTemplate", ["$uibTooltip", function (a) {
    return a("uibTooltipTemplate", "tooltip", "mouseenter", {useContentExp: !0})
}]).directive("uibTooltipHtmlPopup", function () {
    return {
        replace: !0,
        scope: {contentExp: "&", placement: "@", popupClass: "@", animation: "&", isOpen: "&"},
        templateUrl: "uib/template/tooltip/tooltip-html-popup.html"
    }
}).directive("uibTooltipHtml", ["$uibTooltip", function (a) {
    return a("uibTooltipHtml", "tooltip", "mouseenter", {useContentExp: !0})
}]), angular.module("ui.bootstrap.popover", ["ui.bootstrap.tooltip"]).directive("uibPopoverTemplatePopup", function () {
    return {
        replace: !0,
        scope: {
            title: "@",
            contentExp: "&",
            placement: "@",
            popupClass: "@",
            animation: "&",
            isOpen: "&",
            originScope: "&"
        },
        templateUrl: "uib/template/popover/popover-template.html"
    }
}).directive("uibPopoverTemplate", ["$uibTooltip", function (a) {
    return a("uibPopoverTemplate", "popover", "click", {useContentExp: !0})
}]).directive("uibPopoverHtmlPopup", function () {
    return {
        replace: !0,
        scope: {contentExp: "&", title: "@", placement: "@", popupClass: "@", animation: "&", isOpen: "&"},
        templateUrl: "uib/template/popover/popover-html.html"
    }
}).directive("uibPopoverHtml", ["$uibTooltip", function (a) {
    return a("uibPopoverHtml", "popover", "click", {useContentExp: !0})
}]).directive("uibPopoverPopup", function () {
    return {
        replace: !0,
        scope: {title: "@", content: "@", placement: "@", popupClass: "@", animation: "&", isOpen: "&"},
        templateUrl: "uib/template/popover/popover.html"
    }
}).directive("uibPopover", ["$uibTooltip", function (a) {
    return a("uibPopover", "popover", "click")
}]), angular.module("ui.bootstrap.progressbar", []).constant("uibProgressConfig", {
    animate: !0,
    max: 100
}).controller("UibProgressController", ["$scope", "$attrs", "uibProgressConfig", function (a, b, c) {
    function d() {
        return angular.isDefined(a.maxParam) ? a.maxParam : c.max
    }

    var e = this, f = angular.isDefined(b.animate) ? a.$parent.$eval(b.animate) : c.animate;
    this.bars = [], a.max = d(), this.addBar = function (a, b, c) {
        f || b.css({transition: "none"}), this.bars.push(a), a.max = d(), a.title = c && angular.isDefined(c.title) ? c.title : "progressbar", a.$watch("value", function (b) {
            a.recalculatePercentage()
        }), a.recalculatePercentage = function () {
            var b = e.bars.reduce(function (a, b) {
                return b.percent = +(100 * b.value / b.max).toFixed(2), a + b.percent
            }, 0);
            b > 100 && (a.percent -= b - 100)
        }, a.$on("$destroy", function () {
            b = null, e.removeBar(a)
        })
    }, this.removeBar = function (a) {
        this.bars.splice(this.bars.indexOf(a), 1), this.bars.forEach(function (a) {
            a.recalculatePercentage()
        })
    }, a.$watch("maxParam", function (a) {
        e.bars.forEach(function (a) {
            a.max = d(), a.recalculatePercentage()
        })
    })
}]).directive("uibProgress", function () {
    return {
        replace: !0,
        transclude: !0,
        controller: "UibProgressController",
        require: "uibProgress",
        scope: {maxParam: "=?max"},
        templateUrl: "uib/template/progressbar/progress.html"
    }
}).directive("uibBar", function () {
    return {
        replace: !0,
        transclude: !0,
        require: "^uibProgress",
        scope: {value: "=", type: "@"},
        templateUrl: "uib/template/progressbar/bar.html",
        link: function (a, b, c, d) {
            d.addBar(a, b, c)
        }
    }
}).directive("uibProgressbar", function () {
    return {
        replace: !0,
        transclude: !0,
        controller: "UibProgressController",
        scope: {value: "=", maxParam: "=?max", type: "@"},
        templateUrl: "uib/template/progressbar/progressbar.html",
        link: function (a, b, c, d) {
            d.addBar(a, angular.element(b.children()[0]), {title: c.title})
        }
    }
}), angular.module("ui.bootstrap.rating", []).constant("uibRatingConfig", {
    max: 5,
    stateOn: null,
    stateOff: null,
    titles: ["one", "two", "three", "four", "five"]
}).controller("UibRatingController", ["$scope", "$attrs", "uibRatingConfig", function (a, b, c) {
    var d = {$setViewValue: angular.noop}, e = this;
    this.init = function (e) {
        d = e, d.$render = this.render, d.$formatters.push(function (a) {
            return angular.isNumber(a) && a << 0 !== a && (a = Math.round(a)), a
        }), this.stateOn = angular.isDefined(b.stateOn) ? a.$parent.$eval(b.stateOn) : c.stateOn, this.stateOff = angular.isDefined(b.stateOff) ? a.$parent.$eval(b.stateOff) : c.stateOff;
        var f = angular.isDefined(b.titles) ? a.$parent.$eval(b.titles) : c.titles;
        this.titles = angular.isArray(f) && f.length > 0 ? f : c.titles;
        var g = angular.isDefined(b.ratingStates) ? a.$parent.$eval(b.ratingStates) : new Array(angular.isDefined(b.max) ? a.$parent.$eval(b.max) : c.max);
        a.range = this.buildTemplateObjects(g)
    }, this.buildTemplateObjects = function (a) {
        for (var b = 0, c = a.length; c > b; b++)a[b] = angular.extend({index: b}, {
            stateOn: this.stateOn,
            stateOff: this.stateOff,
            title: this.getTitle(b)
        }, a[b]);
        return a
    }, this.getTitle = function (a) {
        return a >= this.titles.length ? a + 1 : this.titles[a]
    }, a.rate = function (b) {
        !a.readonly && b >= 0 && b <= a.range.length && (d.$setViewValue(d.$viewValue === b ? 0 : b), d.$render())
    }, a.enter = function (b) {
        a.readonly || (a.value = b), a.onHover({value: b})
    }, a.reset = function () {
        a.value = d.$viewValue, a.onLeave()
    }, a.onKeydown = function (b) {
        /(37|38|39|40)/.test(b.which) && (b.preventDefault(), b.stopPropagation(), a.rate(a.value + (38 === b.which || 39 === b.which ? 1 : -1)))
    }, this.render = function () {
        a.value = d.$viewValue, a.title = e.getTitle(a.value - 1)
    }
}]).directive("uibRating", function () {
    return {
        require: ["uibRating", "ngModel"],
        scope: {readonly: "=?readOnly", onHover: "&", onLeave: "&"},
        controller: "UibRatingController",
        templateUrl: "uib/template/rating/rating.html",
        replace: !0,
        link: function (a, b, c, d) {
            var e = d[0], f = d[1];
            e.init(f)
        }
    }
}), angular.module("ui.bootstrap.tabs", []).controller("UibTabsetController", ["$scope", function (a) {
    function b(a) {
        for (var b = 0; b < d.tabs.length; b++)if (d.tabs[b].index === a)return b
    }

    var c, d = this;
    d.tabs = [], d.select = function (a) {
        if (!e) {
            var f = b(c), g = d.tabs[f];
            g && (g.tab.onDeselect(), g.tab.active = !1);
            var h = d.tabs[a];
            h ? (h.tab.onSelect(), h.tab.active = !0, d.active = h.index, c = h.index) : !h && angular.isNumber(c) && (d.active = null, c = null)
        }
    }, d.addTab = function (a) {
        if (d.tabs.push({tab: a, index: a.index}), d.tabs.sort(function (a, b) {
                return a.index > b.index ? 1 : a.index < b.index ? -1 : 0
            }), a.index === d.active || !angular.isNumber(d.active) && 1 === d.tabs.length) {
            var c = b(a.index);
            d.select(c)
        }
    }, d.removeTab = function (a) {
        var c = b(a.index);
        if (a.index === d.active) {
            var e = c === d.tabs.length - 1 ? c - 1 : c + 1 % d.tabs.length;
            d.select(e)
        }
        d.tabs.splice(c, 1)
    }, a.$watch("tabset.active", function (a) {
        angular.isNumber(a) && a !== c && d.select(b(a))
    });
    var e;
    a.$on("$destroy", function () {
        e = !0
    })
}]).directive("uibTabset", function () {
    return {
        transclude: !0,
        replace: !0,
        scope: {},
        bindToController: {active: "=?", type: "@"},
        controller: "UibTabsetController",
        controllerAs: "tabset",
        templateUrl: function (a, b) {
            return b.templateUrl || "uib/template/tabs/tabset.html"
        },
        link: function (a, b, c) {
            a.vertical = angular.isDefined(c.vertical) ? a.$parent.$eval(c.vertical) : !1, a.justified = angular.isDefined(c.justified) ? a.$parent.$eval(c.justified) : !1, angular.isUndefined(c.active) && (a.active = 0)
        }
    }
}).directive("uibTab", ["$parse", function (a) {
    return {
        require: "^uibTabset",
        replace: !0,
        templateUrl: function (a, b) {
            return b.templateUrl || "uib/template/tabs/tab.html"
        },
        transclude: !0,
        scope: {heading: "@", index: "=?", classes: "@?", onSelect: "&select", onDeselect: "&deselect"},
        controller: function () {
        },
        controllerAs: "tab",
        link: function (b, c, d, e, f) {
            b.disabled = !1, d.disable && b.$parent.$watch(a(d.disable), function (a) {
                b.disabled = !!a
            }), angular.isUndefined(d.index) && (e.tabs && e.tabs.length ? b.index = Math.max.apply(null, e.tabs.map(function (a) {
                    return a.index
                })) + 1 : b.index = 0), angular.isUndefined(d.classes) && (b.classes = ""), b.select = function () {
                if (!b.disabled) {
                    for (var a, c = 0; c < e.tabs.length; c++)if (e.tabs[c].tab === b) {
                        a = c;
                        break
                    }
                    e.select(a)
                }
            }, e.addTab(b), b.$on("$destroy", function () {
                e.removeTab(b)
            }), b.$transcludeFn = f
        }
    }
}]).directive("uibTabHeadingTransclude", function () {
    return {
        restrict: "A", require: "^uibTab", link: function (a, b) {
            a.$watch("headingElement", function (a) {
                a && (b.html(""), b.append(a))
            })
        }
    }
}).directive("uibTabContentTransclude", function () {
    function a(a) {
        return a.tagName && (a.hasAttribute("uib-tab-heading") || a.hasAttribute("data-uib-tab-heading") || a.hasAttribute("x-uib-tab-heading") || "uib-tab-heading" === a.tagName.toLowerCase() || "data-uib-tab-heading" === a.tagName.toLowerCase() || "x-uib-tab-heading" === a.tagName.toLowerCase() || "uib:tab-heading" === a.tagName.toLowerCase())
    }

    return {
        restrict: "A", require: "^uibTabset", link: function (b, c, d) {
            var e = b.$eval(d.uibTabContentTransclude).tab;
            e.$transcludeFn(e.$parent, function (b) {
                angular.forEach(b, function (b) {
                    a(b) ? e.headingElement = b : c.append(b)
                })
            })
        }
    }
}), angular.module("ui.bootstrap.timepicker", []).constant("uibTimepickerConfig", {
    hourStep: 1,
    minuteStep: 1,
    secondStep: 1,
    showMeridian: !0,
    showSeconds: !1,
    meridians: null,
    readonlyInput: !1,
    mousewheel: !0,
    arrowkeys: !0,
    showSpinners: !0,
    templateUrl: "uib/template/timepicker/timepicker.html"
}).controller("UibTimepickerController", ["$scope", "$element", "$attrs", "$parse", "$log", "$locale", "uibTimepickerConfig", function (a, b, c, d, e, f, g) {
    function h() {
        var b = +a.hours, c = a.showMeridian ? b > 0 && 13 > b : b >= 0 && 24 > b;
        return c ? (a.showMeridian && (12 === b && (b = 0), a.meridian === u[1] && (b += 12)), b) : void 0
    }

    function i() {
        var b = +a.minutes;
        return b >= 0 && 60 > b ? b : void 0
    }

    function j() {
        var b = +a.seconds;
        return b >= 0 && 60 > b ? b : void 0
    }

    function k(a) {
        return null === a ? "" : angular.isDefined(a) && a.toString().length < 2 ? "0" + a : a.toString()
    }

    function l(a) {
        m(), t.$setViewValue(new Date(r)), n(a)
    }

    function m() {
        t.$setValidity("time", !0), a.invalidHours = !1, a.invalidMinutes = !1, a.invalidSeconds = !1
    }

    function n(b) {
        if (t.$modelValue) {
            var c = r.getHours(), d = r.getMinutes(), e = r.getSeconds();
            a.showMeridian && (c = 0 === c || 12 === c ? 12 : c % 12), a.hours = "h" === b ? c : k(c), "m" !== b && (a.minutes = k(d)), a.meridian = r.getHours() < 12 ? u[0] : u[1], "s" !== b && (a.seconds = k(e)), a.meridian = r.getHours() < 12 ? u[0] : u[1]
        } else a.hours = null, a.minutes = null, a.seconds = null, a.meridian = u[0]
    }

    function o(a) {
        r = q(r, a), l()
    }

    function p(a, b) {
        return q(a, 60 * b)
    }

    function q(a, b) {
        var c = new Date(a.getTime() + 1e3 * b), d = new Date(a);
        return d.setHours(c.getHours(), c.getMinutes(), c.getSeconds()), d
    }

    var r = new Date, s = [], t = {$setViewValue: angular.noop}, u = angular.isDefined(c.meridians) ? a.$parent.$eval(c.meridians) : g.meridians || f.DATETIME_FORMATS.AMPMS;
    a.tabindex = angular.isDefined(c.tabindex) ? c.tabindex : 0, b.removeAttr("tabindex"), this.init = function (b, d) {
        t = b, t.$render = this.render, t.$formatters.unshift(function (a) {
            return a ? new Date(a) : null
        });
        var e = d.eq(0), f = d.eq(1), h = d.eq(2), i = angular.isDefined(c.mousewheel) ? a.$parent.$eval(c.mousewheel) : g.mousewheel;
        i && this.setupMousewheelEvents(e, f, h);
        var j = angular.isDefined(c.arrowkeys) ? a.$parent.$eval(c.arrowkeys) : g.arrowkeys;
        j && this.setupArrowkeyEvents(e, f, h), a.readonlyInput = angular.isDefined(c.readonlyInput) ? a.$parent.$eval(c.readonlyInput) : g.readonlyInput, this.setupInputEvents(e, f, h)
    };
    var v = g.hourStep;
    c.hourStep && s.push(a.$parent.$watch(d(c.hourStep), function (a) {
        v = +a
    }));
    var w = g.minuteStep;
    c.minuteStep && s.push(a.$parent.$watch(d(c.minuteStep), function (a) {
        w = +a
    }));
    var x;
    s.push(a.$parent.$watch(d(c.min), function (a) {
        var b = new Date(a);
        x = isNaN(b) ? void 0 : b
    }));
    var y;
    s.push(a.$parent.$watch(d(c.max), function (a) {
        var b = new Date(a);
        y = isNaN(b) ? void 0 : b
    }));
    var z = !1;
    c.ngDisabled && s.push(a.$parent.$watch(d(c.ngDisabled), function (a) {
        z = a
    })), a.noIncrementHours = function () {
        var a = p(r, 60 * v);
        return z || a > y || r > a && x > a
    }, a.noDecrementHours = function () {
        var a = p(r, 60 * -v);
        return z || x > a || a > r && a > y
    }, a.noIncrementMinutes = function () {
        var a = p(r, w);
        return z || a > y || r > a && x > a
    }, a.noDecrementMinutes = function () {
        var a = p(r, -w);
        return z || x > a || a > r && a > y
    }, a.noIncrementSeconds = function () {
        var a = q(r, A);
        return z || a > y || r > a && x > a
    }, a.noDecrementSeconds = function () {
        var a = q(r, -A);
        return z || x > a || a > r && a > y
    }, a.noToggleMeridian = function () {
        return r.getHours() < 12 ? z || p(r, 720) > y : z || p(r, -720) < x
    };
    var A = g.secondStep;
    c.secondStep && s.push(a.$parent.$watch(d(c.secondStep), function (a) {
        A = +a
    })), a.showSeconds = g.showSeconds, c.showSeconds && s.push(a.$parent.$watch(d(c.showSeconds), function (b) {
        a.showSeconds = !!b
    })), a.showMeridian = g.showMeridian, c.showMeridian && s.push(a.$parent.$watch(d(c.showMeridian), function (b) {
        if (a.showMeridian = !!b, t.$error.time) {
            var c = h(), d = i();
            angular.isDefined(c) && angular.isDefined(d) && (r.setHours(c), l())
        } else n()
    })), this.setupMousewheelEvents = function (b, c, d) {
        var e = function (a) {
            a.originalEvent && (a = a.originalEvent);
            var b = a.wheelDelta ? a.wheelDelta : -a.deltaY;
            return a.detail || b > 0
        };
        b.bind("mousewheel wheel", function (b) {
            z || a.$apply(e(b) ? a.incrementHours() : a.decrementHours()), b.preventDefault()
        }), c.bind("mousewheel wheel", function (b) {
            z || a.$apply(e(b) ? a.incrementMinutes() : a.decrementMinutes()), b.preventDefault()
        }), d.bind("mousewheel wheel", function (b) {
            z || a.$apply(e(b) ? a.incrementSeconds() : a.decrementSeconds()), b.preventDefault()
        })
    }, this.setupArrowkeyEvents = function (b, c, d) {
        b.bind("keydown", function (b) {
            z || (38 === b.which ? (b.preventDefault(), a.incrementHours(), a.$apply()) : 40 === b.which && (b.preventDefault(), a.decrementHours(), a.$apply()))
        }), c.bind("keydown", function (b) {
            z || (38 === b.which ? (b.preventDefault(), a.incrementMinutes(), a.$apply()) : 40 === b.which && (b.preventDefault(), a.decrementMinutes(), a.$apply()))
        }), d.bind("keydown", function (b) {
            z || (38 === b.which ? (b.preventDefault(), a.incrementSeconds(), a.$apply()) : 40 === b.which && (b.preventDefault(), a.decrementSeconds(), a.$apply()))
        })
    }, this.setupInputEvents = function (b, c, d) {
        if (a.readonlyInput)return a.updateHours = angular.noop, a.updateMinutes = angular.noop, void(a.updateSeconds = angular.noop);
        var e = function (b, c, d) {
            t.$setViewValue(null), t.$setValidity("time", !1), angular.isDefined(b) && (a.invalidHours = b), angular.isDefined(c) && (a.invalidMinutes = c), angular.isDefined(d) && (a.invalidSeconds = d)
        };
        a.updateHours = function () {
            var a = h(), b = i();
            t.$setDirty(), angular.isDefined(a) && angular.isDefined(b) ? (r.setHours(a), r.setMinutes(b), x > r || r > y ? e(!0) : l("h")) : e(!0)
        }, b.bind("blur", function (b) {
            t.$setTouched(), null === a.hours || "" === a.hours ? e(!0) : !a.invalidHours && a.hours < 10 && a.$apply(function () {
                a.hours = k(a.hours)
            })
        }), a.updateMinutes = function () {
            var a = i(), b = h();
            t.$setDirty(), angular.isDefined(a) && angular.isDefined(b) ? (r.setHours(b), r.setMinutes(a), x > r || r > y ? e(void 0, !0) : l("m")) : e(void 0, !0)
        }, c.bind("blur", function (b) {
            t.$setTouched(), null === a.minutes ? e(void 0, !0) : !a.invalidMinutes && a.minutes < 10 && a.$apply(function () {
                a.minutes = k(a.minutes)
            })
        }), a.updateSeconds = function () {
            var a = j();
            t.$setDirty(), angular.isDefined(a) ? (r.setSeconds(a), l("s")) : e(void 0, void 0, !0)
        }, d.bind("blur", function (b) {
            !a.invalidSeconds && a.seconds < 10 && a.$apply(function () {
                a.seconds = k(a.seconds)
            })
        })
    }, this.render = function () {
        var b = t.$viewValue;
        isNaN(b) ? (t.$setValidity("time", !1), e.error('Timepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.')) : (b && (r = b), x > r || r > y ? (t.$setValidity("time", !1), a.invalidHours = !0, a.invalidMinutes = !0) : m(), n())
    }, a.showSpinners = angular.isDefined(c.showSpinners) ? a.$parent.$eval(c.showSpinners) : g.showSpinners, a.incrementHours = function () {
        a.noIncrementHours() || o(60 * v * 60)
    }, a.decrementHours = function () {
        a.noDecrementHours() || o(60 * -v * 60)
    }, a.incrementMinutes = function () {
        a.noIncrementMinutes() || o(60 * w)
    }, a.decrementMinutes = function () {
        a.noDecrementMinutes() || o(60 * -w)
    }, a.incrementSeconds = function () {
        a.noIncrementSeconds() || o(A)
    }, a.decrementSeconds = function () {
        a.noDecrementSeconds() || o(-A)
    }, a.toggleMeridian = function () {
        var b = i(), c = h();
        a.noToggleMeridian() || (angular.isDefined(b) && angular.isDefined(c) ? o(720 * (r.getHours() < 12 ? 60 : -60)) : a.meridian = a.meridian === u[0] ? u[1] : u[0])
    }, a.blur = function () {
        t.$setTouched()
    }, a.$on("$destroy", function () {
        for (; s.length;)s.shift()()
    })
}]).directive("uibTimepicker", ["uibTimepickerConfig", function (a) {
    return {
        require: ["uibTimepicker", "?^ngModel"],
        controller: "UibTimepickerController",
        controllerAs: "timepicker",
        replace: !0,
        scope: {},
        templateUrl: function (b, c) {
            return c.templateUrl || a.templateUrl
        },
        link: function (a, b, c, d) {
            var e = d[0], f = d[1];
            f && e.init(f, b.find("input"))
        }
    }
}]), angular.module("ui.bootstrap.typeahead", ["ui.bootstrap.debounce", "ui.bootstrap.position"]).factory("uibTypeaheadParser", ["$parse", function (a) {
    var b = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+([\s\S]+?)$/;
    return {
        parse: function (c) {
            var d = c.match(b);
            if (!d)throw new Error('Expected typeahead specification in form of "_modelValue_ (as _label_)? for _item_ in _collection_" but got "' + c + '".');
            return {itemName: d[3], source: a(d[4]), viewMapper: a(d[2] || d[1]), modelMapper: a(d[1])}
        }
    }
}]).controller("UibTypeaheadController", ["$scope", "$element", "$attrs", "$compile", "$parse", "$q", "$timeout", "$document", "$window", "$rootScope", "$$debounce", "$uibPosition", "uibTypeaheadParser", function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    function n() {
        N.moveInProgress || (N.moveInProgress = !0, N.$digest()), Y()
    }

    function o() {
        N.position = D ? l.offset(b) : l.position(b), N.position.top += b.prop("offsetHeight")
    }

    var p, q, r = [9, 13, 27, 38, 40], s = 200, t = a.$eval(c.typeaheadMinLength);
    t || 0 === t || (t = 1), a.$watch(c.typeaheadMinLength, function (a) {
        t = a || 0 === a ? a : 1
    });
    var u = a.$eval(c.typeaheadWaitMs) || 0, v = a.$eval(c.typeaheadEditable) !== !1;
    a.$watch(c.typeaheadEditable, function (a) {
        v = a !== !1
    });
    var w, x, y = e(c.typeaheadLoading).assign || angular.noop, z = e(c.typeaheadOnSelect), A = angular.isDefined(c.typeaheadSelectOnBlur) ? a.$eval(c.typeaheadSelectOnBlur) : !1, B = e(c.typeaheadNoResults).assign || angular.noop, C = c.typeaheadInputFormatter ? e(c.typeaheadInputFormatter) : void 0, D = c.typeaheadAppendToBody ? a.$eval(c.typeaheadAppendToBody) : !1, E = c.typeaheadAppendTo ? a.$eval(c.typeaheadAppendTo) : null, F = a.$eval(c.typeaheadFocusFirst) !== !1, G = c.typeaheadSelectOnExact ? a.$eval(c.typeaheadSelectOnExact) : !1, H = e(c.typeaheadIsOpen).assign || angular.noop, I = a.$eval(c.typeaheadShowHint) || !1, J = e(c.ngModel), K = e(c.ngModel + "($$$p)"), L = function (b, c) {
        return angular.isFunction(J(a)) && q && q.$options && q.$options.getterSetter ? K(b, {$$$p: c}) : J.assign(b, c)
    }, M = m.parse(c.uibTypeahead), N = a.$new(), O = a.$on("$destroy", function () {
        N.$destroy()
    });
    N.$on("$destroy", O);
    var P = "typeahead-" + N.$id + "-" + Math.floor(1e4 * Math.random());
    b.attr({"aria-autocomplete": "list", "aria-expanded": !1, "aria-owns": P});
    var Q, R;
    I && (Q = angular.element("<div></div>"), Q.css("position", "relative"), b.after(Q), R = b.clone(), R.attr("placeholder", ""), R.attr("tabindex", "-1"), R.val(""), R.css({
        position: "absolute",
        top: "0px",
        left: "0px",
        "border-color": "transparent",
        "box-shadow": "none",
        opacity: 1,
        background: "none 0% 0% / auto repeat scroll padding-box border-box rgb(255, 255, 255)",
        color: "#999"
    }), b.css({
        position: "relative",
        "vertical-align": "top",
        "background-color": "transparent"
    }), Q.append(R), R.after(b));
    var S = angular.element("<div uib-typeahead-popup></div>");
    S.attr({
        id: P,
        matches: "matches",
        active: "activeIdx",
        select: "select(activeIdx, evt)",
        "move-in-progress": "moveInProgress",
        query: "query",
        position: "position",
        "assign-is-open": "assignIsOpen(isOpen)",
        debounce: "debounceUpdate"
    }), angular.isDefined(c.typeaheadTemplateUrl) && S.attr("template-url", c.typeaheadTemplateUrl), angular.isDefined(c.typeaheadPopupTemplateUrl) && S.attr("popup-template-url", c.typeaheadPopupTemplateUrl);
    var T = function () {
        I && R.val("")
    }, U = function () {
        N.matches = [], N.activeIdx = -1, b.attr("aria-expanded", !1), T()
    }, V = function (a) {
        return P + "-option-" + a
    };
    N.$watch("activeIdx", function (a) {
        0 > a ? b.removeAttr("aria-activedescendant") : b.attr("aria-activedescendant", V(a))
    });
    var W = function (a, b) {
        return N.matches.length > b && a ? a.toUpperCase() === N.matches[b].label.toUpperCase() : !1
    }, X = function (c, d) {
        var e = {$viewValue: c};
        y(a, !0), B(a, !1), f.when(M.source(a, e)).then(function (f) {
            var g = c === p.$viewValue;
            if (g && w)if (f && f.length > 0) {
                N.activeIdx = F ? 0 : -1, B(a, !1), N.matches.length = 0;
                for (var h = 0; h < f.length; h++)e[M.itemName] = f[h], N.matches.push({
                    id: V(h),
                    label: M.viewMapper(N, e),
                    model: f[h]
                });
                if (N.query = c, o(), b.attr("aria-expanded", !0), G && 1 === N.matches.length && W(c, 0) && (angular.isNumber(N.debounceUpdate) || angular.isObject(N.debounceUpdate) ? k(function () {
                        N.select(0, d)
                    }, angular.isNumber(N.debounceUpdate) ? N.debounceUpdate : N.debounceUpdate["default"]) : N.select(0, d)), I) {
                    var i = N.matches[0].label;
                    angular.isString(c) && c.length > 0 && i.slice(0, c.length).toUpperCase() === c.toUpperCase() ? R.val(c + i.slice(c.length)) : R.val("")
                }
            } else U(), B(a, !0);
            g && y(a, !1)
        }, function () {
            U(), y(a, !1), B(a, !0)
        })
    };
    D && (angular.element(i).on("resize", n), h.find("body").on("scroll", n));
    var Y = k(function () {
        N.matches.length && o(), N.moveInProgress = !1
    }, s);
    N.moveInProgress = !1, N.query = void 0;
    var Z, $ = function (a) {
        Z = g(function () {
            X(a)
        }, u)
    }, _ = function () {
        Z && g.cancel(Z)
    };
    U(), N.assignIsOpen = function (b) {
        H(a, b)
    }, N.select = function (d, e) {
        var f, h, i = {};
        x = !0, i[M.itemName] = h = N.matches[d].model, f = M.modelMapper(a, i), L(a, f), p.$setValidity("editable", !0), p.$setValidity("parse", !0), z(a, {
            $item: h,
            $model: f,
            $label: M.viewMapper(a, i),
            $event: e
        }), U(), N.$eval(c.typeaheadFocusOnSelect) !== !1 && g(function () {
            b[0].focus()
        }, 0, !1)
    }, b.on("keydown", function (b) {
        if (0 !== N.matches.length && -1 !== r.indexOf(b.which)) {
            if (-1 === N.activeIdx && (9 === b.which || 13 === b.which) || 9 === b.which && b.shiftKey)return U(), void N.$digest();
            b.preventDefault();
            var c;
            switch (b.which) {
                case 9:
                case 13:
                    N.$apply(function () {
                        angular.isNumber(N.debounceUpdate) || angular.isObject(N.debounceUpdate) ? k(function () {
                            N.select(N.activeIdx, b)
                        }, angular.isNumber(N.debounceUpdate) ? N.debounceUpdate : N.debounceUpdate["default"]) : N.select(N.activeIdx, b)
                    });
                    break;
                case 27:
                    b.stopPropagation(), U(), a.$digest();
                    break;
                case 38:
                    N.activeIdx = (N.activeIdx > 0 ? N.activeIdx : N.matches.length) - 1, N.$digest(), c = S.find("li")[N.activeIdx], c.parentNode.scrollTop = c.offsetTop;
                    break;
                case 40:
                    N.activeIdx = (N.activeIdx + 1) % N.matches.length, N.$digest(), c = S.find("li")[N.activeIdx], c.parentNode.scrollTop = c.offsetTop
            }
        }
    }), b.bind("focus", function (a) {
        w = !0, 0 !== t || p.$viewValue || g(function () {
            X(p.$viewValue, a)
        }, 0)
    }), b.bind("blur", function (a) {
        A && N.matches.length && -1 !== N.activeIdx && !x && (x = !0, N.$apply(function () {
            angular.isObject(N.debounceUpdate) && angular.isNumber(N.debounceUpdate.blur) ? k(function () {
                N.select(N.activeIdx, a)
            }, N.debounceUpdate.blur) : N.select(N.activeIdx, a)
        })), !v && p.$error.editable && (p.$viewValue = "", b.val("")), w = !1, x = !1
    });
    var aa = function (c) {
        b[0] !== c.target && 3 !== c.which && 0 !== N.matches.length && (U(), j.$$phase || a.$digest())
    };
    h.on("click", aa), a.$on("$destroy", function () {
        h.off("click", aa), (D || E) && ba.remove(), D && (angular.element(i).off("resize", n), h.find("body").off("scroll", n)), S.remove(), I && Q.remove()
    });
    var ba = d(S)(N);
    D ? h.find("body").append(ba) : E ? angular.element(E).eq(0).append(ba) : b.after(ba), this.init = function (b, c) {
        p = b, q = c, N.debounceUpdate = p.$options && e(p.$options.debounce)(a), p.$parsers.unshift(function (b) {
            return w = !0, 0 === t || b && b.length >= t ? u > 0 ? (_(), $(b)) : X(b) : (y(a, !1), _(), U()), v ? b : b ? void p.$setValidity("editable", !1) : (p.$setValidity("editable", !0), null)
        }), p.$formatters.push(function (b) {
            var c, d, e = {};
            return v || p.$setValidity("editable", !0), C ? (e.$model = b, C(a, e)) : (e[M.itemName] = b, c = M.viewMapper(a, e), e[M.itemName] = void 0, d = M.viewMapper(a, e), c !== d ? c : b)
        })
    }
}]).directive("uibTypeahead", function () {
    return {
        controller: "UibTypeaheadController",
        require: ["ngModel", "^?ngModelOptions", "uibTypeahead"],
        link: function (a, b, c, d) {
            d[2].init(d[0], d[1])
        }
    }
}).directive("uibTypeaheadPopup", ["$$debounce", function (a) {
    return {
        scope: {
            matches: "=",
            query: "=",
            active: "=",
            position: "&",
            moveInProgress: "=",
            select: "&",
            assignIsOpen: "&",
            debounce: "&"
        }, replace: !0, templateUrl: function (a, b) {
            return b.popupTemplateUrl || "uib/template/typeahead/typeahead-popup.html"
        }, link: function (b, c, d) {
            b.templateUrl = d.templateUrl, b.isOpen = function () {
                var a = b.matches.length > 0;
                return b.assignIsOpen({isOpen: a}), a
            }, b.isActive = function (a) {
                return b.active === a
            }, b.selectActive = function (a) {
                b.active = a
            }, b.selectMatch = function (c, d) {
                var e = b.debounce();
                angular.isNumber(e) || angular.isObject(e) ? a(function () {
                    b.select({activeIdx: c, evt: d})
                }, angular.isNumber(e) ? e : e["default"]) : b.select({activeIdx: c, evt: d})
            }
        }
    }
}]).directive("uibTypeaheadMatch", ["$templateRequest", "$compile", "$parse", function (a, b, c) {
    return {
        scope: {index: "=", match: "=", query: "="}, link: function (d, e, f) {
            var g = c(f.templateUrl)(d.$parent) || "uib/template/typeahead/typeahead-match.html";
            a(g).then(function (a) {
                var c = angular.element(a.trim());
                e.replaceWith(c), b(c)(d)
            })
        }
    }
}]).filter("uibTypeaheadHighlight", ["$sce", "$injector", "$log", function (a, b, c) {
    function d(a) {
        return a.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")
    }

    function e(a) {
        return /<.*>/g.test(a)
    }

    var f;
    return f = b.has("$sanitize"), function (b, g) {
        return !f && e(b) && c.warn("Unsafe use of typeahead please use ngSanitize"), b = g ? ("" + b).replace(new RegExp(d(g), "gi"), "<strong>$&</strong>") : b, f || (b = a.trustAsHtml(b)), b
    }
}]), angular.module("uib/template/accordion/accordion-group.html", []).run(["$templateCache", function (a) {
    a.put("uib/template/accordion/accordion-group.html", '<div class="panel" ng-class="panelClass || \'panel-default\'">\n  <div role="tab" id="{{::headingId}}" aria-selected="{{isOpen}}" class="panel-heading" ng-keypress="toggleOpen($event)">\n    <h4 class="panel-title">\n      <a role="button" data-toggle="collapse" href aria-expanded="{{isOpen}}" aria-controls="{{::panelId}}" tabindex="0" class="accordion-toggle" ng-click="toggleOpen()" uib-accordion-transclude="heading"><span uib-accordion-header ng-class="{\'text-muted\': isDisabled}">{{heading}}</span></a>\n    </h4>\n  </div>\n  <div id="{{::panelId}}" aria-labelledby="{{::headingId}}" aria-hidden="{{!isOpen}}" role="tabpanel" class="panel-collapse collapse" uib-collapse="!isOpen">\n    <div class="panel-body" ng-transclude></div>\n  </div>\n</div>\n');
}]), angular.module("uib/template/accordion/accordion.html", []).run(["$templateCache", function (a) {
    a.put("uib/template/accordion/accordion.html", '<div role="tablist" class="panel-group" ng-transclude></div>')
}]), angular.module("uib/template/alert/alert.html", []).run(["$templateCache", function (a) {
    a.put("uib/template/alert/alert.html", '<div class="alert" ng-class="[\'alert-\' + (type || \'warning\'), closeable ? \'alert-dismissible\' : null]" role="alert">\n    <button ng-show="closeable" type="button" class="close" ng-click="close({$event: $event})">\n        <span aria-hidden="true">&times;</span>\n        <span class="sr-only">Close</span>\n    </button>\n    <div ng-transclude></div>\n</div>\n')
}]), angular.module("uib/template/carousel/carousel.html", []).run(["$templateCache", function (a) {
    a.put("uib/template/carousel/carousel.html", '<div ng-mouseenter="pause()" ng-mouseleave="play()" class="carousel" ng-swipe-right="prev()" ng-swipe-left="next()">\n  <div class="carousel-inner" ng-transclude></div>\n  <a role="button" href class="left carousel-control" ng-click="prev()" ng-show="slides.length > 1">\n    <span aria-hidden="true" class="glyphicon glyphicon-chevron-left"></span>\n    <span class="sr-only">previous</span>\n  </a>\n  <a role="button" href class="right carousel-control" ng-click="next()" ng-show="slides.length > 1">\n    <span aria-hidden="true" class="glyphicon glyphicon-chevron-right"></span>\n    <span class="sr-only">next</span>\n  </a>\n  <ol class="carousel-indicators" ng-show="slides.length > 1">\n    <li ng-repeat="slide in slides | orderBy:indexOfSlide track by $index" ng-class="{ active: isActive(slide) }" ng-click="select(slide)">\n      <span class="sr-only">slide {{ $index + 1 }} of {{ slides.length }}<span ng-if="isActive(slide)">, currently active</span></span>\n    </li>\n  </ol>\n</div>\n')
}]), angular.module("uib/template/carousel/slide.html", []).run(["$templateCache", function (a) {
    a.put("uib/template/carousel/slide.html", '<div ng-class="{\n    \'active\': active\n  }" class="item text-center" ng-transclude></div>\n')
}]), angular.module("uib/template/datepicker/datepicker.html", []).run(["$templateCache", function (a) {
    a.put("uib/template/datepicker/datepicker.html", '<div class="uib-datepicker" ng-switch="datepickerMode" role="application" ng-keydown="keydown($event)">\n  <uib-daypicker ng-switch-when="day" tabindex="0"></uib-daypicker>\n  <uib-monthpicker ng-switch-when="month" tabindex="0"></uib-monthpicker>\n  <uib-yearpicker ng-switch-when="year" tabindex="0"></uib-yearpicker>\n</div>\n')
}]), angular.module("uib/template/datepicker/day.html", []).run(["$templateCache", function (a) {
    a.put("uib/template/datepicker/day.html", '<table class="uib-daypicker" role="grid" aria-labelledby="{{::uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left uib-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th colspan="{{::5 + showWeeks}}"><button id="{{::uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm uib-title" ng-click="toggleMode()" ng-disabled="datepickerMode === maxMode" tabindex="-1"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right uib-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n    <tr>\n      <th ng-if="showWeeks" class="text-center"></th>\n      <th ng-repeat="label in ::labels track by $index" class="text-center"><small aria-label="{{::label.full}}">{{::label.abbr}}</small></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr class="uib-weeks" ng-repeat="row in rows track by $index">\n      <td ng-if="showWeeks" class="text-center h6"><em>{{ weekNumbers[$index] }}</em></td>\n      <td ng-repeat="dt in row" class="uib-day text-center" role="gridcell"\n        id="{{::dt.uid}}"\n        ng-class="::dt.customClass">\n        <button type="button" class="btn btn-default btn-sm"\n          uib-is-class="\n            \'btn-info\' for selectedDt,\n            \'active\' for activeDt\n            on dt"\n          ng-click="select(dt.date)"\n          ng-disabled="::dt.disabled"\n          tabindex="-1"><span ng-class="::{\'text-muted\': dt.secondary, \'text-info\': dt.current}">{{::dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')
}]), angular.module("uib/template/datepicker/month.html", []).run(["$templateCache", function (a) {
    a.put("uib/template/datepicker/month.html", '<table class="uib-monthpicker" role="grid" aria-labelledby="{{::uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left uib-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th><button id="{{::uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm uib-title" ng-click="toggleMode()" ng-disabled="datepickerMode === maxMode" tabindex="-1"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right uib-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr class="uib-months" ng-repeat="row in rows track by $index">\n      <td ng-repeat="dt in row" class="uib-month text-center" role="gridcell"\n        id="{{::dt.uid}}"\n        ng-class="::dt.customClass">\n        <button type="button" class="btn btn-default"\n          uib-is-class="\n            \'btn-info\' for selectedDt,\n            \'active\' for activeDt\n            on dt"\n          ng-click="select(dt.date)"\n          ng-disabled="::dt.disabled"\n          tabindex="-1"><span ng-class="::{\'text-info\': dt.current}">{{::dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')
}]), angular.module("uib/template/datepicker/popup.html", []).run(["$templateCache", function (a) {
    a.put("uib/template/datepicker/popup.html", '<div>\n  <ul class="uib-datepicker-popup dropdown-menu uib-position-measure" dropdown-nested ng-if="isOpen" ng-keydown="keydown($event)" ng-click="$event.stopPropagation()">\n    <li ng-transclude></li>\n    <li ng-if="showButtonBar" class="uib-button-bar">\n      <span class="btn-group pull-left">\n        <button type="button" class="btn btn-sm btn-info uib-datepicker-current" ng-click="select(\'today\', $event)" ng-disabled="isDisabled(\'today\')">{{ getText(\'current\') }}</button>\n        <button type="button" class="btn btn-sm btn-danger uib-clear" ng-click="select(null, $event)">{{ getText(\'clear\') }}</button>\n      </span>\n      <button type="button" class="btn btn-sm btn-success pull-right uib-close" ng-click="close($event)">{{ getText(\'close\') }}</button>\n    </li>\n  </ul>\n</div>\n')
}]), angular.module("uib/template/datepicker/year.html", []).run(["$templateCache", function (a) {
    a.put("uib/template/datepicker/year.html", '<table class="uib-yearpicker" role="grid" aria-labelledby="{{::uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left uib-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th colspan="{{::columns - 2}}"><button id="{{::uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm uib-title" ng-click="toggleMode()" ng-disabled="datepickerMode === maxMode" tabindex="-1"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right uib-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr class="uib-years" ng-repeat="row in rows track by $index">\n      <td ng-repeat="dt in row" class="uib-year text-center" role="gridcell"\n        id="{{::dt.uid}}"\n        ng-class="::dt.customClass">\n        <button type="button" class="btn btn-default"\n          uib-is-class="\n            \'btn-info\' for selectedDt,\n            \'active\' for activeDt\n            on dt"\n          ng-click="select(dt.date)"\n          ng-disabled="::dt.disabled"\n          tabindex="-1"><span ng-class="::{\'text-info\': dt.current}">{{::dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')
}]), angular.module("uib/template/modal/backdrop.html", []).run(["$templateCache", function (a) {
    a.put("uib/template/modal/backdrop.html", '<div class="modal-backdrop"\n     uib-modal-animation-class="fade"\n     modal-in-class="in"\n     ng-style="{\'z-index\': 1040 + (index && 1 || 0) + index*10}"\n></div>\n')
}]), angular.module("uib/template/modal/window.html", []).run(["$templateCache", function (a) {
    a.put("uib/template/modal/window.html", '<div modal-render="{{$isRendered}}" tabindex="-1" role="dialog" class="modal"\n    uib-modal-animation-class="fade"\n    modal-in-class="in"\n    ng-style="{\'z-index\': 1050 + index*10, display: \'block\'}">\n    <div class="modal-dialog {{size ? \'modal-\' + size : \'\'}}"><div class="modal-content" uib-modal-transclude></div></div>\n</div>\n')
}]), angular.module("uib/template/pager/pager.html", []).run(["$templateCache", function (a) {
    a.put("uib/template/pager/pager.html", '<ul class="pager">\n  <li ng-class="{disabled: noPrevious()||ngDisabled, previous: align}"><a href ng-click="selectPage(page - 1, $event)">{{::getText(\'previous\')}}</a></li>\n  <li ng-class="{disabled: noNext()||ngDisabled, next: align}"><a href ng-click="selectPage(page + 1, $event)">{{::getText(\'next\')}}</a></li>\n</ul>\n')
}]), angular.module("uib/template/pagination/pager.html", []).run(["$templateCache", function (a) {
    a.put("uib/template/pagination/pager.html", '<ul class="pager">\n  <li ng-class="{disabled: noPrevious()||ngDisabled, previous: align}"><a href ng-click="selectPage(page - 1, $event)">{{::getText(\'previous\')}}</a></li>\n  <li ng-class="{disabled: noNext()||ngDisabled, next: align}"><a href ng-click="selectPage(page + 1, $event)">{{::getText(\'next\')}}</a></li>\n</ul>\n')
}]), angular.module("uib/template/pagination/pagination.html", []).run(["$templateCache", function (a) {
    a.put("uib/template/pagination/pagination.html", '<ul class="pagination">\n  <li ng-if="::boundaryLinks" ng-class="{disabled: noPrevious()||ngDisabled}" class="pagination-first"><a href ng-click="selectPage(1, $event)">{{::getText(\'first\')}}</a></li>\n  <li ng-if="::directionLinks" ng-class="{disabled: noPrevious()||ngDisabled}" class="pagination-prev"><a href ng-click="selectPage(page - 1, $event)">{{::getText(\'previous\')}}</a></li>\n  <li ng-repeat="page in scripts track by $index" ng-class="{active: page.active,disabled: ngDisabled&&!page.active}" class="pagination-page"><a href ng-click="selectPage(page.number, $event)">{{page.text}}</a></li>\n  <li ng-if="::directionLinks" ng-class="{disabled: noNext()||ngDisabled}" class="pagination-next"><a href ng-click="selectPage(page + 1, $event)">{{::getText(\'next\')}}</a></li>\n  <li ng-if="::boundaryLinks" ng-class="{disabled: noNext()||ngDisabled}" class="pagination-last"><a href ng-click="selectPage(totalPages, $event)">{{::getText(\'last\')}}</a></li>\n</ul>\n')
}]), angular.module("uib/template/tooltip/tooltip-html-popup.html", []).run(["$templateCache", function (a) {
    a.put("uib/template/tooltip/tooltip-html-popup.html", '<div class="tooltip"\n  tooltip-animation-class="fade"\n  uib-tooltip-classes\n  ng-class="{ in: isOpen() }">\n  <div class="tooltip-arrow"></div>\n  <div class="tooltip-inner" ng-bind-html="contentExp()"></div>\n</div>\n')
}]), angular.module("uib/template/tooltip/tooltip-popup.html", []).run(["$templateCache", function (a) {
    a.put("uib/template/tooltip/tooltip-popup.html", '<div class="tooltip"\n  tooltip-animation-class="fade"\n  uib-tooltip-classes\n  ng-class="{ in: isOpen() }">\n  <div class="tooltip-arrow"></div>\n  <div class="tooltip-inner" ng-bind="content"></div>\n</div>\n')
}]), angular.module("uib/template/tooltip/tooltip-template-popup.html", []).run(["$templateCache", function (a) {
    a.put("uib/template/tooltip/tooltip-template-popup.html", '<div class="tooltip"\n  tooltip-animation-class="fade"\n  uib-tooltip-classes\n  ng-class="{ in: isOpen() }">\n  <div class="tooltip-arrow"></div>\n  <div class="tooltip-inner"\n    uib-tooltip-template-transclude="contentExp()"\n    tooltip-template-transclude-scope="originScope()"></div>\n</div>\n')
}]), angular.module("uib/template/popover/popover-html.html", []).run(["$templateCache", function (a) {
    a.put("uib/template/popover/popover-html.html", '<div class="popover"\n  tooltip-animation-class="fade"\n  uib-tooltip-classes\n  ng-class="{ in: isOpen() }">\n  <div class="arrow"></div>\n\n  <div class="popover-inner">\n      <h3 class="popover-title" ng-bind="title" ng-if="title"></h3>\n      <div class="popover-content" ng-bind-html="contentExp()"></div>\n  </div>\n</div>\n')
}]), angular.module("uib/template/popover/popover-template.html", []).run(["$templateCache", function (a) {
    a.put("uib/template/popover/popover-template.html", '<div class="popover"\n  tooltip-animation-class="fade"\n  uib-tooltip-classes\n  ng-class="{ in: isOpen() }">\n  <div class="arrow"></div>\n\n  <div class="popover-inner">\n      <h3 class="popover-title" ng-bind="title" ng-if="title"></h3>\n      <div class="popover-content"\n        uib-tooltip-template-transclude="contentExp()"\n        tooltip-template-transclude-scope="originScope()"></div>\n  </div>\n</div>\n')
}]), angular.module("uib/template/popover/popover.html", []).run(["$templateCache", function (a) {
    a.put("uib/template/popover/popover.html", '<div class="popover"\n  tooltip-animation-class="fade"\n  uib-tooltip-classes\n  ng-class="{ in: isOpen() }">\n  <div class="arrow"></div>\n\n  <div class="popover-inner">\n      <h3 class="popover-title" ng-bind="title" ng-if="title"></h3>\n      <div class="popover-content" ng-bind="content"></div>\n  </div>\n</div>\n')
}]), angular.module("uib/template/progressbar/bar.html", []).run(["$templateCache", function (a) {
    a.put("uib/template/progressbar/bar.html", '<div class="progress-bar" ng-class="type && \'progress-bar-\' + type" role="progressbar" aria-valuenow="{{value}}" aria-valuemin="0" aria-valuemax="{{max}}" ng-style="{width: (percent < 100 ? percent : 100) + \'%\'}" aria-valuetext="{{percent | number:0}}%" aria-labelledby="{{::title}}" ng-transclude></div>\n')
}]), angular.module("uib/template/progressbar/progress.html", []).run(["$templateCache", function (a) {
    a.put("uib/template/progressbar/progress.html", '<div class="progress" ng-transclude aria-labelledby="{{::title}}"></div>')
}]), angular.module("uib/template/progressbar/progressbar.html", []).run(["$templateCache", function (a) {
    a.put("uib/template/progressbar/progressbar.html", '<div class="progress">\n  <div class="progress-bar" ng-class="type && \'progress-bar-\' + type" role="progressbar" aria-valuenow="{{value}}" aria-valuemin="0" aria-valuemax="{{max}}" ng-style="{width: (percent < 100 ? percent : 100) + \'%\'}" aria-valuetext="{{percent | number:0}}%" aria-labelledby="{{::title}}" ng-transclude></div>\n</div>\n')
}]), angular.module("uib/template/rating/rating.html", []).run(["$templateCache", function (a) {
    a.put("uib/template/rating/rating.html", '<span ng-mouseleave="reset()" ng-keydown="onKeydown($event)" tabindex="0" role="slider" aria-valuemin="0" aria-valuemax="{{range.length}}" aria-valuenow="{{value}}" aria-valuetext="{{title}}">\n    <span ng-repeat-start="r in range track by $index" class="sr-only">({{ $index < value ? \'*\' : \' \' }})</span>\n    <i ng-repeat-end ng-mouseenter="enter($index + 1)" ng-click="rate($index + 1)" class="glyphicon" ng-class="$index < value && (r.stateOn || \'glyphicon-star\') || (r.stateOff || \'glyphicon-star-empty\')" ng-attr-title="{{r.title}}"></i>\n</span>\n')
}]), angular.module("uib/template/tabs/tab.html", []).run(["$templateCache", function (a) {
    a.put("uib/template/tabs/tab.html", '<li ng-class="[{active: active, disabled: disabled}, classes]" class="uib-tab nav-item">\n  <a href ng-click="select()" class="nav-link" uib-tab-heading-transclude>{{heading}}</a>\n</li>\n')
}]), angular.module("uib/template/tabs/tabset.html", []).run(["$templateCache", function (a) {
    a.put("uib/template/tabs/tabset.html", '<div>\n  <ul class="nav nav-{{tabset.type || \'tabs\'}}" ng-class="{\'nav-stacked\': vertical, \'nav-justified\': justified}" ng-transclude></ul>\n  <div class="tab-content">\n    <div class="tab-pane"\n         ng-repeat="tab in tabset.tabs"\n         ng-class="{active: tabset.active === tab.index}"\n         uib-tab-content-transclude="tab">\n    </div>\n  </div>\n</div>\n')
}]), angular.module("uib/template/timepicker/timepicker.html", []).run(["$templateCache", function (a) {
    a.put("uib/template/timepicker/timepicker.html", '<table class="uib-timepicker">\n  <tbody>\n    <tr class="text-center" ng-show="::showSpinners">\n      <td class="uib-increment hours"><a ng-click="incrementHours()" ng-class="{disabled: noIncrementHours()}" class="btn btn-link" ng-disabled="noIncrementHours()" tabindex="{{::tabindex}}"><span class="glyphicon glyphicon-chevron-up"></span></a></td>\n      <td>&nbsp;</td>\n      <td class="uib-increment minutes"><a ng-click="incrementMinutes()" ng-class="{disabled: noIncrementMinutes()}" class="btn btn-link" ng-disabled="noIncrementMinutes()" tabindex="{{::tabindex}}"><span class="glyphicon glyphicon-chevron-up"></span></a></td>\n      <td ng-show="showSeconds">&nbsp;</td>\n      <td ng-show="showSeconds" class="uib-increment seconds"><a ng-click="incrementSeconds()" ng-class="{disabled: noIncrementSeconds()}" class="btn btn-link" ng-disabled="noIncrementSeconds()" tabindex="{{::tabindex}}"><span class="glyphicon glyphicon-chevron-up"></span></a></td>\n      <td ng-show="showMeridian"></td>\n    </tr>\n    <tr>\n      <td class="form-group uib-time hours" ng-class="{\'has-error\': invalidHours}">\n        <input style="width:50px;" type="text" placeholder="HH" ng-model="hours" ng-change="updateHours()" class="form-control text-center" ng-readonly="::readonlyInput" maxlength="2" tabindex="{{::tabindex}}" ng-disabled="noIncrementHours()" ng-blur="blur()">\n      </td>\n      <td class="uib-separator">:</td>\n      <td class="form-group uib-time minutes" ng-class="{\'has-error\': invalidMinutes}">\n        <input style="width:50px;" type="text" placeholder="MM" ng-model="minutes" ng-change="updateMinutes()" class="form-control text-center" ng-readonly="::readonlyInput" maxlength="2" tabindex="{{::tabindex}}" ng-disabled="noIncrementMinutes()" ng-blur="blur()">\n      </td>\n      <td ng-show="showSeconds" class="uib-separator">:</td>\n      <td class="form-group uib-time seconds" ng-class="{\'has-error\': invalidSeconds}" ng-show="showSeconds">\n        <input style="width:50px;" type="text" placeholder="SS" ng-model="seconds" ng-change="updateSeconds()" class="form-control text-center" ng-readonly="readonlyInput" maxlength="2" tabindex="{{::tabindex}}" ng-disabled="noIncrementSeconds()" ng-blur="blur()">\n      </td>\n      <td ng-show="showMeridian" class="uib-time am-pm"><button type="button" ng-class="{disabled: noToggleMeridian()}" class="btn btn-default text-center" ng-click="toggleMeridian()" ng-disabled="noToggleMeridian()" tabindex="{{::tabindex}}">{{meridian}}</button></td>\n    </tr>\n    <tr class="text-center" ng-show="::showSpinners">\n      <td class="uib-decrement hours"><a ng-click="decrementHours()" ng-class="{disabled: noDecrementHours()}" class="btn btn-link" ng-disabled="noDecrementHours()" tabindex="{{::tabindex}}"><span class="glyphicon glyphicon-chevron-down"></span></a></td>\n      <td>&nbsp;</td>\n      <td class="uib-decrement minutes"><a ng-click="decrementMinutes()" ng-class="{disabled: noDecrementMinutes()}" class="btn btn-link" ng-disabled="noDecrementMinutes()" tabindex="{{::tabindex}}"><span class="glyphicon glyphicon-chevron-down"></span></a></td>\n      <td ng-show="showSeconds">&nbsp;</td>\n      <td ng-show="showSeconds" class="uib-decrement seconds"><a ng-click="decrementSeconds()" ng-class="{disabled: noDecrementSeconds()}" class="btn btn-link" ng-disabled="noDecrementSeconds()" tabindex="{{::tabindex}}"><span class="glyphicon glyphicon-chevron-down"></span></a></td>\n      <td ng-show="showMeridian"></td>\n    </tr>\n  </tbody>\n</table>\n')
}]), angular.module("uib/template/typeahead/typeahead-match.html", []).run(["$templateCache", function (a) {
    a.put("uib/template/typeahead/typeahead-match.html", '<a href\n   tabindex="-1"\n   ng-bind-html="match.label | uibTypeaheadHighlight:query"\n   ng-attr-title="{{match.label}}"></a>\n')
}]), angular.module("uib/template/typeahead/typeahead-popup.html", []).run(["$templateCache", function (a) {
    a.put("uib/template/typeahead/typeahead-popup.html", '<ul class="dropdown-menu" ng-show="isOpen() && !moveInProgress" ng-style="{top: position().top+\'px\', left: position().left+\'px\'}" role="listbox" aria-hidden="{{!isOpen()}}">\n    <li ng-repeat="match in matches track by $index" ng-class="{active: isActive($index) }" ng-mouseenter="selectActive($index)" ng-click="selectMatch($index, $event)" role="option" id="{{::match.id}}">\n        <div uib-typeahead-match index="$index" match="match" query="query" template-url="templateUrl"></div>\n    </li>\n</ul>\n')
}]), angular.module("ui.bootstrap.carousel").run(function () {
    !angular.$$csp().noInlineStyle && !angular.$$uibCarouselCss && angular.element(document).find("head").prepend('<style type="text/css">.ng-animate.item:not(.left):not(.right){-webkit-transition:0s ease-in-out left;transition:0s ease-in-out left}</style>'), angular.$$uibCarouselCss = !0
}), angular.module("ui.bootstrap.position").run(function () {
    !angular.$$csp().noInlineStyle && !angular.$$uibPositionCss && angular.element(document).find("head").prepend('<style type="text/css">.uib-position-measure{display:block !important;visibility:hidden !important;position:absolute !important;top:-9999px !important;left:-9999px !important;}.uib-position-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll;}</style>'), angular.$$uibPositionCss = !0
}), angular.module("ui.bootstrap.datepicker").run(function () {
    !angular.$$csp().noInlineStyle && !angular.$$uibDatepickerCss && angular.element(document).find("head").prepend('<style type="text/css">.uib-datepicker .uib-title{width:100%;}.uib-day button,.uib-month button,.uib-year button{min-width:100%;}.uib-datepicker-popup.dropdown-menu{display:block;float:none;margin:0;}.uib-button-bar{padding:10px 9px 2px;}.uib-left,.uib-right{width:100%}</style>'), angular.$$uibDatepickerCss = !0
}), angular.module("ui.bootstrap.tooltip").run(function () {
    !angular.$$csp().noInlineStyle && !angular.$$uibTooltipCss && angular.element(document).find("head").prepend('<style type="text/css">[uib-tooltip-popup].tooltip.top-left > .tooltip-arrow,[uib-tooltip-popup].tooltip.top-right > .tooltip-arrow,[uib-tooltip-popup].tooltip.bottom-left > .tooltip-arrow,[uib-tooltip-popup].tooltip.bottom-right > .tooltip-arrow,[uib-tooltip-popup].tooltip.left-top > .tooltip-arrow,[uib-tooltip-popup].tooltip.left-bottom > .tooltip-arrow,[uib-tooltip-popup].tooltip.right-top > .tooltip-arrow,[uib-tooltip-popup].tooltip.right-bottom > .tooltip-arrow,[uib-popover-popup].popover.top-left > .arrow,[uib-popover-popup].popover.top-right > .arrow,[uib-popover-popup].popover.bottom-left > .arrow,[uib-popover-popup].popover.bottom-right > .arrow,[uib-popover-popup].popover.left-top > .arrow,[uib-popover-popup].popover.left-bottom > .arrow,[uib-popover-popup].popover.right-top > .arrow,[uib-popover-popup].popover.right-bottom > .arrow{top:auto;bottom:auto;left:auto;right:auto;margin:0;}[uib-popover-popup].popover,[uib-popover-template-popup].popover{display:block !important;}</style>'), angular.$$uibTooltipCss = !0
}), angular.module("ui.bootstrap.timepicker").run(function () {
    !angular.$$csp().noInlineStyle && !angular.$$uibTimepickerCss && angular.element(document).find("head").prepend('<style type="text/css">.uib-time input{width:50px;}</style>'), angular.$$uibTimepickerCss = !0
}), angular.module("ui.bootstrap.typeahead").run(function () {
    !angular.$$csp().noInlineStyle && !angular.$$uibTypeaheadCss && angular.element(document).find("head").prepend('<style type="text/css">[uib-typeahead-popup].dropdown-menu{display:block;}</style>'), angular.$$uibTypeaheadCss = !0
});