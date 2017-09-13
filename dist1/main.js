(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! jQuery UI - v1.12.1 - 2017-09-10
* http://jqueryui.com
* Includes: widget.js, position.js, data.js, disable-selection.js, focusable.js, form-reset-mixin.js, jquery-1-7.js, keycode.js, labels.js, scroll-parent.js, tabbable.js, unique-id.js, widgets/draggable.js, widgets/droppable.js, widgets/resizable.js, widgets/selectable.js, widgets/sortable.js, widgets/accordion.js, widgets/autocomplete.js, widgets/button.js, widgets/checkboxradio.js, widgets/controlgroup.js, widgets/datepicker.js, widgets/dialog.js, widgets/menu.js, widgets/mouse.js, widgets/progressbar.js, widgets/selectmenu.js, widgets/slider.js, widgets/spinner.js, widgets/tabs.js, widgets/tooltip.js, effect.js, effects/effect-blind.js, effects/effect-bounce.js, effects/effect-clip.js, effects/effect-drop.js, effects/effect-explode.js, effects/effect-fade.js, effects/effect-fold.js, effects/effect-highlight.js, effects/effect-puff.js, effects/effect-pulsate.js, effects/effect-scale.js, effects/effect-shake.js, effects/effect-size.js, effects/effect-slide.js, effects/effect-transfer.js
* Copyright jQuery Foundation and other contributors; Licensed MIT */

(function (t) {
  "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery);
})(function (t) {
  function e(t) {
    for (var e = t.css("visibility"); "inherit" === e;) {
      t = t.parent(), e = t.css("visibility");
    }return "hidden" !== e;
  }function i(t) {
    for (var e, i; t.length && t[0] !== document;) {
      if (e = t.css("position"), ("absolute" === e || "relative" === e || "fixed" === e) && (i = parseInt(t.css("zIndex"), 10), !isNaN(i) && 0 !== i)) return i;t = t.parent();
    }return 0;
  }function s() {
    this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = { closeText: "Done", prevText: "Prev", nextText: "Next", currentText: "Today", monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], weekHeader: "Wk", dateFormat: "mm/dd/yy", firstDay: 0, isRTL: !1, showMonthAfterYear: !1, yearSuffix: "" }, this._defaults = { showOn: "focus", showAnim: "fadeIn", showOptions: {}, defaultDate: null, appendText: "", buttonText: "...", buttonImage: "", buttonImageOnly: !1, hideIfNoPrevNext: !1, navigationAsDateFormat: !1, gotoCurrent: !1, changeMonth: !1, changeYear: !1, yearRange: "c-10:c+10", showOtherMonths: !1, selectOtherMonths: !1, showWeek: !1, calculateWeek: this.iso8601Week, shortYearCutoff: "+10", minDate: null, maxDate: null, duration: "fast", beforeShowDay: null, beforeShow: null, onSelect: null, onChangeMonthYear: null, onClose: null, numberOfMonths: 1, showCurrentAtPos: 0, stepMonths: 1, stepBigMonths: 12, altField: "", altFormat: "", constrainInput: !0, showButtonPanel: !1, autoSize: !1, disabled: !1 }, t.extend(this._defaults, this.regional[""]), this.regional.en = t.extend(!0, {}, this.regional[""]), this.regional["en-US"] = t.extend(!0, {}, this.regional.en), this.dpDiv = n(t("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"));
  }function n(e) {
    var i = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";return e.on("mouseout", i, function () {
      t(this).removeClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && t(this).removeClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && t(this).removeClass("ui-datepicker-next-hover");
    }).on("mouseover", i, o);
  }function o() {
    t.datepicker._isDisabledDatepicker(p.inline ? p.dpDiv.parent()[0] : p.input[0]) || (t(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), t(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && t(this).addClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && t(this).addClass("ui-datepicker-next-hover"));
  }function a(e, i) {
    t.extend(e, i);for (var s in i) {
      null == i[s] && (e[s] = i[s]);
    }return e;
  }function r(t) {
    return function () {
      var e = this.element.val();t.apply(this, arguments), this._refresh(), e !== this.element.val() && this._trigger("change");
    };
  }t.ui = t.ui || {}, t.ui.version = "1.12.1";var h = 0,
      l = Array.prototype.slice;t.cleanData = function (e) {
    return function (i) {
      var s, n, o;for (o = 0; null != (n = i[o]); o++) {
        try {
          s = t._data(n, "events"), s && s.remove && t(n).triggerHandler("remove");
        } catch (a) {}
      }e(i);
    };
  }(t.cleanData), t.widget = function (e, i, s) {
    var n,
        o,
        a,
        r = {},
        h = e.split(".")[0];e = e.split(".")[1];var l = h + "-" + e;return s || (s = i, i = t.Widget), t.isArray(s) && (s = t.extend.apply(null, [{}].concat(s))), t.expr[":"][l.toLowerCase()] = function (e) {
      return !!t.data(e, l);
    }, t[h] = t[h] || {}, n = t[h][e], o = t[h][e] = function (t, e) {
      return this._createWidget ? (arguments.length && this._createWidget(t, e), void 0) : new o(t, e);
    }, t.extend(o, n, { version: s.version, _proto: t.extend({}, s), _childConstructors: [] }), a = new i(), a.options = t.widget.extend({}, a.options), t.each(s, function (e, s) {
      return t.isFunction(s) ? (r[e] = function () {
        function t() {
          return i.prototype[e].apply(this, arguments);
        }function n(t) {
          return i.prototype[e].apply(this, t);
        }return function () {
          var e,
              i = this._super,
              o = this._superApply;return this._super = t, this._superApply = n, e = s.apply(this, arguments), this._super = i, this._superApply = o, e;
        };
      }(), void 0) : (r[e] = s, void 0);
    }), o.prototype = t.widget.extend(a, { widgetEventPrefix: n ? a.widgetEventPrefix || e : e }, r, { constructor: o, namespace: h, widgetName: e, widgetFullName: l }), n ? (t.each(n._childConstructors, function (e, i) {
      var s = i.prototype;t.widget(s.namespace + "." + s.widgetName, o, i._proto);
    }), delete n._childConstructors) : i._childConstructors.push(o), t.widget.bridge(e, o), o;
  }, t.widget.extend = function (e) {
    for (var i, s, n = l.call(arguments, 1), o = 0, a = n.length; a > o; o++) {
      for (i in n[o]) {
        s = n[o][i], n[o].hasOwnProperty(i) && void 0 !== s && (e[i] = t.isPlainObject(s) ? t.isPlainObject(e[i]) ? t.widget.extend({}, e[i], s) : t.widget.extend({}, s) : s);
      }
    }return e;
  }, t.widget.bridge = function (e, i) {
    var s = i.prototype.widgetFullName || e;t.fn[e] = function (n) {
      var o = "string" == typeof n,
          a = l.call(arguments, 1),
          r = this;return o ? this.length || "instance" !== n ? this.each(function () {
        var i,
            o = t.data(this, s);return "instance" === n ? (r = o, !1) : o ? t.isFunction(o[n]) && "_" !== n.charAt(0) ? (i = o[n].apply(o, a), i !== o && void 0 !== i ? (r = i && i.jquery ? r.pushStack(i.get()) : i, !1) : void 0) : t.error("no such method '" + n + "' for " + e + " widget instance") : t.error("cannot call methods on " + e + " prior to initialization; " + "attempted to call method '" + n + "'");
      }) : r = void 0 : (a.length && (n = t.widget.extend.apply(null, [n].concat(a))), this.each(function () {
        var e = t.data(this, s);e ? (e.option(n || {}), e._init && e._init()) : t.data(this, s, new i(n, this));
      })), r;
    };
  }, t.Widget = function () {}, t.Widget._childConstructors = [], t.Widget.prototype = { widgetName: "widget", widgetEventPrefix: "", defaultElement: "<div>", options: { classes: {}, disabled: !1, create: null }, _createWidget: function _createWidget(e, i) {
      i = t(i || this.defaultElement || this)[0], this.element = t(i), this.uuid = h++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = t(), this.hoverable = t(), this.focusable = t(), this.classesElementLookup = {}, i !== this && (t.data(i, this.widgetFullName, this), this._on(!0, this.element, { remove: function remove(t) {
          t.target === i && this.destroy();
        } }), this.document = t(i.style ? i.ownerDocument : i.document || i), this.window = t(this.document[0].defaultView || this.document[0].parentWindow)), this.options = t.widget.extend({}, this.options, this._getCreateOptions(), e), this._create(), this.options.disabled && this._setOptionDisabled(this.options.disabled), this._trigger("create", null, this._getCreateEventData()), this._init();
    }, _getCreateOptions: function _getCreateOptions() {
      return {};
    }, _getCreateEventData: t.noop, _create: t.noop, _init: t.noop, destroy: function destroy() {
      var e = this;this._destroy(), t.each(this.classesElementLookup, function (t, i) {
        e._removeClass(i, t);
      }), this.element.off(this.eventNamespace).removeData(this.widgetFullName), this.widget().off(this.eventNamespace).removeAttr("aria-disabled"), this.bindings.off(this.eventNamespace);
    }, _destroy: t.noop, widget: function widget() {
      return this.element;
    }, option: function option(e, i) {
      var s,
          n,
          o,
          a = e;if (0 === arguments.length) return t.widget.extend({}, this.options);if ("string" == typeof e) if (a = {}, s = e.split("."), e = s.shift(), s.length) {
        for (n = a[e] = t.widget.extend({}, this.options[e]), o = 0; s.length - 1 > o; o++) {
          n[s[o]] = n[s[o]] || {}, n = n[s[o]];
        }if (e = s.pop(), 1 === arguments.length) return void 0 === n[e] ? null : n[e];n[e] = i;
      } else {
        if (1 === arguments.length) return void 0 === this.options[e] ? null : this.options[e];a[e] = i;
      }return this._setOptions(a), this;
    }, _setOptions: function _setOptions(t) {
      var e;for (e in t) {
        this._setOption(e, t[e]);
      }return this;
    }, _setOption: function _setOption(t, e) {
      return "classes" === t && this._setOptionClasses(e), this.options[t] = e, "disabled" === t && this._setOptionDisabled(e), this;
    }, _setOptionClasses: function _setOptionClasses(e) {
      var i, s, n;for (i in e) {
        n = this.classesElementLookup[i], e[i] !== this.options.classes[i] && n && n.length && (s = t(n.get()), this._removeClass(n, i), s.addClass(this._classes({ element: s, keys: i, classes: e, add: !0 })));
      }
    }, _setOptionDisabled: function _setOptionDisabled(t) {
      this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !!t), t && (this._removeClass(this.hoverable, null, "ui-state-hover"), this._removeClass(this.focusable, null, "ui-state-focus"));
    }, enable: function enable() {
      return this._setOptions({ disabled: !1 });
    }, disable: function disable() {
      return this._setOptions({ disabled: !0 });
    }, _classes: function _classes(e) {
      function i(i, o) {
        var a, r;for (r = 0; i.length > r; r++) {
          a = n.classesElementLookup[i[r]] || t(), a = e.add ? t(t.unique(a.get().concat(e.element.get()))) : t(a.not(e.element).get()), n.classesElementLookup[i[r]] = a, s.push(i[r]), o && e.classes[i[r]] && s.push(e.classes[i[r]]);
        }
      }var s = [],
          n = this;return e = t.extend({ element: this.element, classes: this.options.classes || {} }, e), this._on(e.element, { remove: "_untrackClassesElement" }), e.keys && i(e.keys.match(/\S+/g) || [], !0), e.extra && i(e.extra.match(/\S+/g) || []), s.join(" ");
    }, _untrackClassesElement: function _untrackClassesElement(e) {
      var i = this;t.each(i.classesElementLookup, function (s, n) {
        -1 !== t.inArray(e.target, n) && (i.classesElementLookup[s] = t(n.not(e.target).get()));
      });
    }, _removeClass: function _removeClass(t, e, i) {
      return this._toggleClass(t, e, i, !1);
    }, _addClass: function _addClass(t, e, i) {
      return this._toggleClass(t, e, i, !0);
    }, _toggleClass: function _toggleClass(t, e, i, s) {
      s = "boolean" == typeof s ? s : i;var n = "string" == typeof t || null === t,
          o = { extra: n ? e : i, keys: n ? t : e, element: n ? this.element : t, add: s };return o.element.toggleClass(this._classes(o), s), this;
    }, _on: function _on(e, i, s) {
      var n,
          o = this;"boolean" != typeof e && (s = i, i = e, e = !1), s ? (i = n = t(i), this.bindings = this.bindings.add(i)) : (s = i, i = this.element, n = this.widget()), t.each(s, function (s, a) {
        function r() {
          return e || o.options.disabled !== !0 && !t(this).hasClass("ui-state-disabled") ? ("string" == typeof a ? o[a] : a).apply(o, arguments) : void 0;
        }"string" != typeof a && (r.guid = a.guid = a.guid || r.guid || t.guid++);var h = s.match(/^([\w:-]*)\s*(.*)$/),
            l = h[1] + o.eventNamespace,
            c = h[2];c ? n.on(l, c, r) : i.on(l, r);
      });
    }, _off: function _off(e, i) {
      i = (i || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, e.off(i).off(i), this.bindings = t(this.bindings.not(e).get()), this.focusable = t(this.focusable.not(e).get()), this.hoverable = t(this.hoverable.not(e).get());
    }, _delay: function _delay(t, e) {
      function i() {
        return ("string" == typeof t ? s[t] : t).apply(s, arguments);
      }var s = this;return setTimeout(i, e || 0);
    }, _hoverable: function _hoverable(e) {
      this.hoverable = this.hoverable.add(e), this._on(e, { mouseenter: function mouseenter(e) {
          this._addClass(t(e.currentTarget), null, "ui-state-hover");
        }, mouseleave: function mouseleave(e) {
          this._removeClass(t(e.currentTarget), null, "ui-state-hover");
        } });
    }, _focusable: function _focusable(e) {
      this.focusable = this.focusable.add(e), this._on(e, { focusin: function focusin(e) {
          this._addClass(t(e.currentTarget), null, "ui-state-focus");
        }, focusout: function focusout(e) {
          this._removeClass(t(e.currentTarget), null, "ui-state-focus");
        } });
    }, _trigger: function _trigger(e, i, s) {
      var n,
          o,
          a = this.options[e];if (s = s || {}, i = t.Event(i), i.type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(), i.target = this.element[0], o = i.originalEvent) for (n in o) {
        n in i || (i[n] = o[n]);
      }return this.element.trigger(i, s), !(t.isFunction(a) && a.apply(this.element[0], [i].concat(s)) === !1 || i.isDefaultPrevented());
    } }, t.each({ show: "fadeIn", hide: "fadeOut" }, function (e, i) {
    t.Widget.prototype["_" + e] = function (s, n, o) {
      "string" == typeof n && (n = { effect: n });var a,
          r = n ? n === !0 || "number" == typeof n ? i : n.effect || i : e;n = n || {}, "number" == typeof n && (n = { duration: n }), a = !t.isEmptyObject(n), n.complete = o, n.delay && s.delay(n.delay), a && t.effects && t.effects.effect[r] ? s[e](n) : r !== e && s[r] ? s[r](n.duration, n.easing, o) : s.queue(function (i) {
        t(this)[e](), o && o.call(s[0]), i();
      });
    };
  }), t.widget, function () {
    function e(t, e, i) {
      return [parseFloat(t[0]) * (u.test(t[0]) ? e / 100 : 1), parseFloat(t[1]) * (u.test(t[1]) ? i / 100 : 1)];
    }function i(e, i) {
      return parseInt(t.css(e, i), 10) || 0;
    }function s(e) {
      var i = e[0];return 9 === i.nodeType ? { width: e.width(), height: e.height(), offset: { top: 0, left: 0 } } : t.isWindow(i) ? { width: e.width(), height: e.height(), offset: { top: e.scrollTop(), left: e.scrollLeft() } } : i.preventDefault ? { width: 0, height: 0, offset: { top: i.pageY, left: i.pageX } } : { width: e.outerWidth(), height: e.outerHeight(), offset: e.offset() };
    }var n,
        o = Math.max,
        a = Math.abs,
        r = /left|center|right/,
        h = /top|center|bottom/,
        l = /[\+\-]\d+(\.[\d]+)?%?/,
        c = /^\w+/,
        u = /%$/,
        d = t.fn.position;t.position = { scrollbarWidth: function scrollbarWidth() {
        if (void 0 !== n) return n;var e,
            i,
            s = t("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
            o = s.children()[0];return t("body").append(s), e = o.offsetWidth, s.css("overflow", "scroll"), i = o.offsetWidth, e === i && (i = s[0].clientWidth), s.remove(), n = e - i;
      }, getScrollInfo: function getScrollInfo(e) {
        var i = e.isWindow || e.isDocument ? "" : e.element.css("overflow-x"),
            s = e.isWindow || e.isDocument ? "" : e.element.css("overflow-y"),
            n = "scroll" === i || "auto" === i && e.width < e.element[0].scrollWidth,
            o = "scroll" === s || "auto" === s && e.height < e.element[0].scrollHeight;return { width: o ? t.position.scrollbarWidth() : 0, height: n ? t.position.scrollbarWidth() : 0 };
      }, getWithinInfo: function getWithinInfo(e) {
        var i = t(e || window),
            s = t.isWindow(i[0]),
            n = !!i[0] && 9 === i[0].nodeType,
            o = !s && !n;return { element: i, isWindow: s, isDocument: n, offset: o ? t(e).offset() : { left: 0, top: 0 }, scrollLeft: i.scrollLeft(), scrollTop: i.scrollTop(), width: i.outerWidth(), height: i.outerHeight() };
      } }, t.fn.position = function (n) {
      if (!n || !n.of) return d.apply(this, arguments);n = t.extend({}, n);var u,
          p,
          f,
          g,
          m,
          _,
          v = t(n.of),
          b = t.position.getWithinInfo(n.within),
          y = t.position.getScrollInfo(b),
          w = (n.collision || "flip").split(" "),
          k = {};return _ = s(v), v[0].preventDefault && (n.at = "left top"), p = _.width, f = _.height, g = _.offset, m = t.extend({}, g), t.each(["my", "at"], function () {
        var t,
            e,
            i = (n[this] || "").split(" ");1 === i.length && (i = r.test(i[0]) ? i.concat(["center"]) : h.test(i[0]) ? ["center"].concat(i) : ["center", "center"]), i[0] = r.test(i[0]) ? i[0] : "center", i[1] = h.test(i[1]) ? i[1] : "center", t = l.exec(i[0]), e = l.exec(i[1]), k[this] = [t ? t[0] : 0, e ? e[0] : 0], n[this] = [c.exec(i[0])[0], c.exec(i[1])[0]];
      }), 1 === w.length && (w[1] = w[0]), "right" === n.at[0] ? m.left += p : "center" === n.at[0] && (m.left += p / 2), "bottom" === n.at[1] ? m.top += f : "center" === n.at[1] && (m.top += f / 2), u = e(k.at, p, f), m.left += u[0], m.top += u[1], this.each(function () {
        var s,
            r,
            h = t(this),
            l = h.outerWidth(),
            c = h.outerHeight(),
            d = i(this, "marginLeft"),
            _ = i(this, "marginTop"),
            x = l + d + i(this, "marginRight") + y.width,
            C = c + _ + i(this, "marginBottom") + y.height,
            D = t.extend({}, m),
            I = e(k.my, h.outerWidth(), h.outerHeight());"right" === n.my[0] ? D.left -= l : "center" === n.my[0] && (D.left -= l / 2), "bottom" === n.my[1] ? D.top -= c : "center" === n.my[1] && (D.top -= c / 2), D.left += I[0], D.top += I[1], s = { marginLeft: d, marginTop: _ }, t.each(["left", "top"], function (e, i) {
          t.ui.position[w[e]] && t.ui.position[w[e]][i](D, { targetWidth: p, targetHeight: f, elemWidth: l, elemHeight: c, collisionPosition: s, collisionWidth: x, collisionHeight: C, offset: [u[0] + I[0], u[1] + I[1]], my: n.my, at: n.at, within: b, elem: h });
        }), n.using && (r = function r(t) {
          var e = g.left - D.left,
              i = e + p - l,
              s = g.top - D.top,
              r = s + f - c,
              u = { target: { element: v, left: g.left, top: g.top, width: p, height: f }, element: { element: h, left: D.left, top: D.top, width: l, height: c }, horizontal: 0 > i ? "left" : e > 0 ? "right" : "center", vertical: 0 > r ? "top" : s > 0 ? "bottom" : "middle" };l > p && p > a(e + i) && (u.horizontal = "center"), c > f && f > a(s + r) && (u.vertical = "middle"), u.important = o(a(e), a(i)) > o(a(s), a(r)) ? "horizontal" : "vertical", n.using.call(this, t, u);
        }), h.offset(t.extend(D, { using: r }));
      });
    }, t.ui.position = { fit: { left: function left(t, e) {
          var i,
              s = e.within,
              n = s.isWindow ? s.scrollLeft : s.offset.left,
              a = s.width,
              r = t.left - e.collisionPosition.marginLeft,
              h = n - r,
              l = r + e.collisionWidth - a - n;e.collisionWidth > a ? h > 0 && 0 >= l ? (i = t.left + h + e.collisionWidth - a - n, t.left += h - i) : t.left = l > 0 && 0 >= h ? n : h > l ? n + a - e.collisionWidth : n : h > 0 ? t.left += h : l > 0 ? t.left -= l : t.left = o(t.left - r, t.left);
        }, top: function top(t, e) {
          var i,
              s = e.within,
              n = s.isWindow ? s.scrollTop : s.offset.top,
              a = e.within.height,
              r = t.top - e.collisionPosition.marginTop,
              h = n - r,
              l = r + e.collisionHeight - a - n;e.collisionHeight > a ? h > 0 && 0 >= l ? (i = t.top + h + e.collisionHeight - a - n, t.top += h - i) : t.top = l > 0 && 0 >= h ? n : h > l ? n + a - e.collisionHeight : n : h > 0 ? t.top += h : l > 0 ? t.top -= l : t.top = o(t.top - r, t.top);
        } }, flip: { left: function left(t, e) {
          var i,
              s,
              n = e.within,
              o = n.offset.left + n.scrollLeft,
              r = n.width,
              h = n.isWindow ? n.scrollLeft : n.offset.left,
              l = t.left - e.collisionPosition.marginLeft,
              c = l - h,
              u = l + e.collisionWidth - r - h,
              d = "left" === e.my[0] ? -e.elemWidth : "right" === e.my[0] ? e.elemWidth : 0,
              p = "left" === e.at[0] ? e.targetWidth : "right" === e.at[0] ? -e.targetWidth : 0,
              f = -2 * e.offset[0];0 > c ? (i = t.left + d + p + f + e.collisionWidth - r - o, (0 > i || a(c) > i) && (t.left += d + p + f)) : u > 0 && (s = t.left - e.collisionPosition.marginLeft + d + p + f - h, (s > 0 || u > a(s)) && (t.left += d + p + f));
        }, top: function top(t, e) {
          var i,
              s,
              n = e.within,
              o = n.offset.top + n.scrollTop,
              r = n.height,
              h = n.isWindow ? n.scrollTop : n.offset.top,
              l = t.top - e.collisionPosition.marginTop,
              c = l - h,
              u = l + e.collisionHeight - r - h,
              d = "top" === e.my[1],
              p = d ? -e.elemHeight : "bottom" === e.my[1] ? e.elemHeight : 0,
              f = "top" === e.at[1] ? e.targetHeight : "bottom" === e.at[1] ? -e.targetHeight : 0,
              g = -2 * e.offset[1];0 > c ? (s = t.top + p + f + g + e.collisionHeight - r - o, (0 > s || a(c) > s) && (t.top += p + f + g)) : u > 0 && (i = t.top - e.collisionPosition.marginTop + p + f + g - h, (i > 0 || u > a(i)) && (t.top += p + f + g));
        } }, flipfit: { left: function left() {
          t.ui.position.flip.left.apply(this, arguments), t.ui.position.fit.left.apply(this, arguments);
        }, top: function top() {
          t.ui.position.flip.top.apply(this, arguments), t.ui.position.fit.top.apply(this, arguments);
        } } };
  }(), t.ui.position, t.extend(t.expr[":"], { data: t.expr.createPseudo ? t.expr.createPseudo(function (e) {
      return function (i) {
        return !!t.data(i, e);
      };
    }) : function (e, i, s) {
      return !!t.data(e, s[3]);
    } }), t.fn.extend({ disableSelection: function () {
      var t = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";return function () {
        return this.on(t + ".ui-disableSelection", function (t) {
          t.preventDefault();
        });
      };
    }(), enableSelection: function enableSelection() {
      return this.off(".ui-disableSelection");
    } }), t.ui.focusable = function (i, s) {
    var n,
        o,
        a,
        r,
        h,
        l = i.nodeName.toLowerCase();return "area" === l ? (n = i.parentNode, o = n.name, i.href && o && "map" === n.nodeName.toLowerCase() ? (a = t("img[usemap='#" + o + "']"), a.length > 0 && a.is(":visible")) : !1) : (/^(input|select|textarea|button|object)$/.test(l) ? (r = !i.disabled, r && (h = t(i).closest("fieldset")[0], h && (r = !h.disabled))) : r = "a" === l ? i.href || s : s, r && t(i).is(":visible") && e(t(i)));
  }, t.extend(t.expr[":"], { focusable: function focusable(e) {
      return t.ui.focusable(e, null != t.attr(e, "tabindex"));
    } }), t.ui.focusable, t.fn.form = function () {
    return "string" == typeof this[0].form ? this.closest("form") : t(this[0].form);
  }, t.ui.formResetMixin = { _formResetHandler: function _formResetHandler() {
      var e = t(this);setTimeout(function () {
        var i = e.data("ui-form-reset-instances");t.each(i, function () {
          this.refresh();
        });
      });
    }, _bindFormResetHandler: function _bindFormResetHandler() {
      if (this.form = this.element.form(), this.form.length) {
        var t = this.form.data("ui-form-reset-instances") || [];t.length || this.form.on("reset.ui-form-reset", this._formResetHandler), t.push(this), this.form.data("ui-form-reset-instances", t);
      }
    }, _unbindFormResetHandler: function _unbindFormResetHandler() {
      if (this.form.length) {
        var e = this.form.data("ui-form-reset-instances");e.splice(t.inArray(this, e), 1), e.length ? this.form.data("ui-form-reset-instances", e) : this.form.removeData("ui-form-reset-instances").off("reset.ui-form-reset");
      }
    } }, "1.7" === t.fn.jquery.substring(0, 3) && (t.each(["Width", "Height"], function (e, i) {
    function s(e, i, s, o) {
      return t.each(n, function () {
        i -= parseFloat(t.css(e, "padding" + this)) || 0, s && (i -= parseFloat(t.css(e, "border" + this + "Width")) || 0), o && (i -= parseFloat(t.css(e, "margin" + this)) || 0);
      }), i;
    }var n = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"],
        o = i.toLowerCase(),
        a = { innerWidth: t.fn.innerWidth, innerHeight: t.fn.innerHeight, outerWidth: t.fn.outerWidth, outerHeight: t.fn.outerHeight };t.fn["inner" + i] = function (e) {
      return void 0 === e ? a["inner" + i].call(this) : this.each(function () {
        t(this).css(o, s(this, e) + "px");
      });
    }, t.fn["outer" + i] = function (e, n) {
      return "number" != typeof e ? a["outer" + i].call(this, e) : this.each(function () {
        t(this).css(o, s(this, e, !0, n) + "px");
      });
    };
  }), t.fn.addBack = function (t) {
    return this.add(null == t ? this.prevObject : this.prevObject.filter(t));
  }), t.ui.keyCode = { BACKSPACE: 8, COMMA: 188, DELETE: 46, DOWN: 40, END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, LEFT: 37, PAGE_DOWN: 34, PAGE_UP: 33, PERIOD: 190, RIGHT: 39, SPACE: 32, TAB: 9, UP: 38 }, t.ui.escapeSelector = function () {
    var t = /([!"#$%&'()*+,./:;<=>?@[\]^`{|}~])/g;return function (e) {
      return e.replace(t, "\\$1");
    };
  }(), t.fn.labels = function () {
    var e, i, s, n, o;return this[0].labels && this[0].labels.length ? this.pushStack(this[0].labels) : (n = this.eq(0).parents("label"), s = this.attr("id"), s && (e = this.eq(0).parents().last(), o = e.add(e.length ? e.siblings() : this.siblings()), i = "label[for='" + t.ui.escapeSelector(s) + "']", n = n.add(o.find(i).addBack(i))), this.pushStack(n));
  }, t.fn.scrollParent = function (e) {
    var i = this.css("position"),
        s = "absolute" === i,
        n = e ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
        o = this.parents().filter(function () {
      var e = t(this);return s && "static" === e.css("position") ? !1 : n.test(e.css("overflow") + e.css("overflow-y") + e.css("overflow-x"));
    }).eq(0);return "fixed" !== i && o.length ? o : t(this[0].ownerDocument || document);
  }, t.extend(t.expr[":"], { tabbable: function tabbable(e) {
      var i = t.attr(e, "tabindex"),
          s = null != i;return (!s || i >= 0) && t.ui.focusable(e, s);
    } }), t.fn.extend({ uniqueId: function () {
      var t = 0;return function () {
        return this.each(function () {
          this.id || (this.id = "ui-id-" + ++t);
        });
      };
    }(), removeUniqueId: function removeUniqueId() {
      return this.each(function () {
        /^ui-id-\d+$/.test(this.id) && t(this).removeAttr("id");
      });
    } }), t.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());var c = !1;t(document).on("mouseup", function () {
    c = !1;
  }), t.widget("ui.mouse", { version: "1.12.1", options: { cancel: "input, textarea, button, select, option", distance: 1, delay: 0 }, _mouseInit: function _mouseInit() {
      var e = this;this.element.on("mousedown." + this.widgetName, function (t) {
        return e._mouseDown(t);
      }).on("click." + this.widgetName, function (i) {
        return !0 === t.data(i.target, e.widgetName + ".preventClickEvent") ? (t.removeData(i.target, e.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1) : void 0;
      }), this.started = !1;
    }, _mouseDestroy: function _mouseDestroy() {
      this.element.off("." + this.widgetName), this._mouseMoveDelegate && this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate);
    }, _mouseDown: function _mouseDown(e) {
      if (!c) {
        this._mouseMoved = !1, this._mouseStarted && this._mouseUp(e), this._mouseDownEvent = e;var i = this,
            s = 1 === e.which,
            n = "string" == typeof this.options.cancel && e.target.nodeName ? t(e.target).closest(this.options.cancel).length : !1;return s && !n && this._mouseCapture(e) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () {
          i.mouseDelayMet = !0;
        }, this.options.delay)), this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(e) !== !1, !this._mouseStarted) ? (e.preventDefault(), !0) : (!0 === t.data(e.target, this.widgetName + ".preventClickEvent") && t.removeData(e.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function (t) {
          return i._mouseMove(t);
        }, this._mouseUpDelegate = function (t) {
          return i._mouseUp(t);
        }, this.document.on("mousemove." + this.widgetName, this._mouseMoveDelegate).on("mouseup." + this.widgetName, this._mouseUpDelegate), e.preventDefault(), c = !0, !0)) : !0;
      }
    }, _mouseMove: function _mouseMove(e) {
      if (this._mouseMoved) {
        if (t.ui.ie && (!document.documentMode || 9 > document.documentMode) && !e.button) return this._mouseUp(e);if (!e.which) if (e.originalEvent.altKey || e.originalEvent.ctrlKey || e.originalEvent.metaKey || e.originalEvent.shiftKey) this.ignoreMissingWhich = !0;else if (!this.ignoreMissingWhich) return this._mouseUp(e);
      }return (e.which || e.button) && (this._mouseMoved = !0), this._mouseStarted ? (this._mouseDrag(e), e.preventDefault()) : (this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, e) !== !1, this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)), !this._mouseStarted);
    }, _mouseUp: function _mouseUp(e) {
      this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, e.target === this._mouseDownEvent.target && t.data(e.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(e)), this._mouseDelayTimer && (clearTimeout(this._mouseDelayTimer), delete this._mouseDelayTimer), this.ignoreMissingWhich = !1, c = !1, e.preventDefault();
    }, _mouseDistanceMet: function _mouseDistanceMet(t) {
      return Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance;
    }, _mouseDelayMet: function _mouseDelayMet() {
      return this.mouseDelayMet;
    }, _mouseStart: function _mouseStart() {}, _mouseDrag: function _mouseDrag() {}, _mouseStop: function _mouseStop() {}, _mouseCapture: function _mouseCapture() {
      return !0;
    } }), t.ui.plugin = { add: function add(e, i, s) {
      var n,
          o = t.ui[e].prototype;for (n in s) {
        o.plugins[n] = o.plugins[n] || [], o.plugins[n].push([i, s[n]]);
      }
    }, call: function call(t, e, i, s) {
      var n,
          o = t.plugins[e];if (o && (s || t.element[0].parentNode && 11 !== t.element[0].parentNode.nodeType)) for (n = 0; o.length > n; n++) {
        t.options[o[n][0]] && o[n][1].apply(t.element, i);
      }
    } }, t.ui.safeActiveElement = function (t) {
    var e;try {
      e = t.activeElement;
    } catch (i) {
      e = t.body;
    }return e || (e = t.body), e.nodeName || (e = t.body), e;
  }, t.ui.safeBlur = function (e) {
    e && "body" !== e.nodeName.toLowerCase() && t(e).trigger("blur");
  }, t.widget("ui.draggable", t.ui.mouse, { version: "1.12.1", widgetEventPrefix: "drag", options: { addClasses: !0, appendTo: "parent", axis: !1, connectToSortable: !1, containment: !1, cursor: "auto", cursorAt: !1, grid: !1, handle: !1, helper: "original", iframeFix: !1, opacity: !1, refreshPositions: !1, revert: !1, revertDuration: 500, scope: "default", scroll: !0, scrollSensitivity: 20, scrollSpeed: 20, snap: !1, snapMode: "both", snapTolerance: 20, stack: !1, zIndex: !1, drag: null, start: null, stop: null }, _create: function _create() {
      "original" === this.options.helper && this._setPositionRelative(), this.options.addClasses && this._addClass("ui-draggable"), this._setHandleClassName(), this._mouseInit();
    }, _setOption: function _setOption(t, e) {
      this._super(t, e), "handle" === t && (this._removeHandleClassName(), this._setHandleClassName());
    }, _destroy: function _destroy() {
      return (this.helper || this.element).is(".ui-draggable-dragging") ? (this.destroyOnClear = !0, void 0) : (this._removeHandleClassName(), this._mouseDestroy(), void 0);
    }, _mouseCapture: function _mouseCapture(e) {
      var i = this.options;return this.helper || i.disabled || t(e.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(e), this.handle ? (this._blurActiveElement(e), this._blockFrames(i.iframeFix === !0 ? "iframe" : i.iframeFix), !0) : !1);
    }, _blockFrames: function _blockFrames(e) {
      this.iframeBlocks = this.document.find(e).map(function () {
        var e = t(this);return t("<div>").css("position", "absolute").appendTo(e.parent()).outerWidth(e.outerWidth()).outerHeight(e.outerHeight()).offset(e.offset())[0];
      });
    }, _unblockFrames: function _unblockFrames() {
      this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks);
    }, _blurActiveElement: function _blurActiveElement(e) {
      var i = t.ui.safeActiveElement(this.document[0]),
          s = t(e.target);s.closest(i).length || t.ui.safeBlur(i);
    }, _mouseStart: function _mouseStart(e) {
      var i = this.options;return this.helper = this._createHelper(e), this._addClass(this.helper, "ui-draggable-dragging"), this._cacheHelperProportions(), t.ui.ddmanager && (t.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(!0), this.offsetParent = this.helper.offsetParent(), this.hasFixedAncestor = this.helper.parents().filter(function () {
        return "fixed" === t(this).css("position");
      }).length > 0, this.positionAbs = this.element.offset(), this._refreshOffsets(e), this.originalPosition = this.position = this._generatePosition(e, !1), this.originalPageX = e.pageX, this.originalPageY = e.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), this._setContainment(), this._trigger("start", e) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), t.ui.ddmanager && !i.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this._mouseDrag(e, !0), t.ui.ddmanager && t.ui.ddmanager.dragStart(this, e), !0);
    }, _refreshOffsets: function _refreshOffsets(t) {
      this.offset = { top: this.positionAbs.top - this.margins.top, left: this.positionAbs.left - this.margins.left, scroll: !1, parent: this._getParentOffset(), relative: this._getRelativeOffset() }, this.offset.click = { left: t.pageX - this.offset.left, top: t.pageY - this.offset.top };
    }, _mouseDrag: function _mouseDrag(e, i) {
      if (this.hasFixedAncestor && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(e, !0), this.positionAbs = this._convertPositionTo("absolute"), !i) {
        var s = this._uiHash();if (this._trigger("drag", e, s) === !1) return this._mouseUp(new t.Event("mouseup", e)), !1;this.position = s.position;
      }return this.helper[0].style.left = this.position.left + "px", this.helper[0].style.top = this.position.top + "px", t.ui.ddmanager && t.ui.ddmanager.drag(this, e), !1;
    }, _mouseStop: function _mouseStop(e) {
      var i = this,
          s = !1;return t.ui.ddmanager && !this.options.dropBehaviour && (s = t.ui.ddmanager.drop(this, e)), this.dropped && (s = this.dropped, this.dropped = !1), "invalid" === this.options.revert && !s || "valid" === this.options.revert && s || this.options.revert === !0 || t.isFunction(this.options.revert) && this.options.revert.call(this.element, s) ? t(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
        i._trigger("stop", e) !== !1 && i._clear();
      }) : this._trigger("stop", e) !== !1 && this._clear(), !1;
    }, _mouseUp: function _mouseUp(e) {
      return this._unblockFrames(), t.ui.ddmanager && t.ui.ddmanager.dragStop(this, e), this.handleElement.is(e.target) && this.element.trigger("focus"), t.ui.mouse.prototype._mouseUp.call(this, e);
    }, cancel: function cancel() {
      return this.helper.is(".ui-draggable-dragging") ? this._mouseUp(new t.Event("mouseup", { target: this.element[0] })) : this._clear(), this;
    }, _getHandle: function _getHandle(e) {
      return this.options.handle ? !!t(e.target).closest(this.element.find(this.options.handle)).length : !0;
    }, _setHandleClassName: function _setHandleClassName() {
      this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element, this._addClass(this.handleElement, "ui-draggable-handle");
    }, _removeHandleClassName: function _removeHandleClassName() {
      this._removeClass(this.handleElement, "ui-draggable-handle");
    }, _createHelper: function _createHelper(e) {
      var i = this.options,
          s = t.isFunction(i.helper),
          n = s ? t(i.helper.apply(this.element[0], [e])) : "clone" === i.helper ? this.element.clone().removeAttr("id") : this.element;return n.parents("body").length || n.appendTo("parent" === i.appendTo ? this.element[0].parentNode : i.appendTo), s && n[0] === this.element[0] && this._setPositionRelative(), n[0] === this.element[0] || /(fixed|absolute)/.test(n.css("position")) || n.css("position", "absolute"), n;
    }, _setPositionRelative: function _setPositionRelative() {
      /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative");
    }, _adjustOffsetFromHelper: function _adjustOffsetFromHelper(e) {
      "string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = { left: +e[0], top: +e[1] || 0 }), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top);
    }, _isRootNode: function _isRootNode(t) {
      return (/(html|body)/i.test(t.tagName) || t === this.document[0]
      );
    }, _getParentOffset: function _getParentOffset() {
      var e = this.offsetParent.offset(),
          i = this.document[0];return "absolute" === this.cssPosition && this.scrollParent[0] !== i && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), this._isRootNode(this.offsetParent[0]) && (e = { top: 0, left: 0 }), { top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0), left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0) };
    }, _getRelativeOffset: function _getRelativeOffset() {
      if ("relative" !== this.cssPosition) return { top: 0, left: 0 };var t = this.element.position(),
          e = this._isRootNode(this.scrollParent[0]);return { top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + (e ? 0 : this.scrollParent.scrollTop()), left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + (e ? 0 : this.scrollParent.scrollLeft()) };
    }, _cacheMargins: function _cacheMargins() {
      this.margins = { left: parseInt(this.element.css("marginLeft"), 10) || 0, top: parseInt(this.element.css("marginTop"), 10) || 0, right: parseInt(this.element.css("marginRight"), 10) || 0, bottom: parseInt(this.element.css("marginBottom"), 10) || 0 };
    }, _cacheHelperProportions: function _cacheHelperProportions() {
      this.helperProportions = { width: this.helper.outerWidth(), height: this.helper.outerHeight() };
    }, _setContainment: function _setContainment() {
      var e,
          i,
          s,
          n = this.options,
          o = this.document[0];return this.relativeContainer = null, n.containment ? "window" === n.containment ? (this.containment = [t(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, t(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, t(window).scrollLeft() + t(window).width() - this.helperProportions.width - this.margins.left, t(window).scrollTop() + (t(window).height() || o.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], void 0) : "document" === n.containment ? (this.containment = [0, 0, t(o).width() - this.helperProportions.width - this.margins.left, (t(o).height() || o.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], void 0) : n.containment.constructor === Array ? (this.containment = n.containment, void 0) : ("parent" === n.containment && (n.containment = this.helper[0].parentNode), i = t(n.containment), s = i[0], s && (e = /(scroll|auto)/.test(i.css("overflow")), this.containment = [(parseInt(i.css("borderLeftWidth"), 10) || 0) + (parseInt(i.css("paddingLeft"), 10) || 0), (parseInt(i.css("borderTopWidth"), 10) || 0) + (parseInt(i.css("paddingTop"), 10) || 0), (e ? Math.max(s.scrollWidth, s.offsetWidth) : s.offsetWidth) - (parseInt(i.css("borderRightWidth"), 10) || 0) - (parseInt(i.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (e ? Math.max(s.scrollHeight, s.offsetHeight) : s.offsetHeight) - (parseInt(i.css("borderBottomWidth"), 10) || 0) - (parseInt(i.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relativeContainer = i), void 0) : (this.containment = null, void 0);
    }, _convertPositionTo: function _convertPositionTo(t, e) {
      e || (e = this.position);var i = "absolute" === t ? 1 : -1,
          s = this._isRootNode(this.scrollParent[0]);return { top: e.top + this.offset.relative.top * i + this.offset.parent.top * i - ("fixed" === this.cssPosition ? -this.offset.scroll.top : s ? 0 : this.offset.scroll.top) * i, left: e.left + this.offset.relative.left * i + this.offset.parent.left * i - ("fixed" === this.cssPosition ? -this.offset.scroll.left : s ? 0 : this.offset.scroll.left) * i };
    }, _generatePosition: function _generatePosition(t, e) {
      var i,
          s,
          n,
          o,
          a = this.options,
          r = this._isRootNode(this.scrollParent[0]),
          h = t.pageX,
          l = t.pageY;return r && this.offset.scroll || (this.offset.scroll = { top: this.scrollParent.scrollTop(), left: this.scrollParent.scrollLeft() }), e && (this.containment && (this.relativeContainer ? (s = this.relativeContainer.offset(), i = [this.containment[0] + s.left, this.containment[1] + s.top, this.containment[2] + s.left, this.containment[3] + s.top]) : i = this.containment, t.pageX - this.offset.click.left < i[0] && (h = i[0] + this.offset.click.left), t.pageY - this.offset.click.top < i[1] && (l = i[1] + this.offset.click.top), t.pageX - this.offset.click.left > i[2] && (h = i[2] + this.offset.click.left), t.pageY - this.offset.click.top > i[3] && (l = i[3] + this.offset.click.top)), a.grid && (n = a.grid[1] ? this.originalPageY + Math.round((l - this.originalPageY) / a.grid[1]) * a.grid[1] : this.originalPageY, l = i ? n - this.offset.click.top >= i[1] || n - this.offset.click.top > i[3] ? n : n - this.offset.click.top >= i[1] ? n - a.grid[1] : n + a.grid[1] : n, o = a.grid[0] ? this.originalPageX + Math.round((h - this.originalPageX) / a.grid[0]) * a.grid[0] : this.originalPageX, h = i ? o - this.offset.click.left >= i[0] || o - this.offset.click.left > i[2] ? o : o - this.offset.click.left >= i[0] ? o - a.grid[0] : o + a.grid[0] : o), "y" === a.axis && (h = this.originalPageX), "x" === a.axis && (l = this.originalPageY)), { top: l - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.offset.scroll.top : r ? 0 : this.offset.scroll.top), left: h - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.offset.scroll.left : r ? 0 : this.offset.scroll.left) };
    }, _clear: function _clear() {
      this._removeClass(this.helper, "ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1, this.destroyOnClear && this.destroy();
    }, _trigger: function _trigger(e, i, s) {
      return s = s || this._uiHash(), t.ui.plugin.call(this, e, [i, s, this], !0), /^(drag|start|stop)/.test(e) && (this.positionAbs = this._convertPositionTo("absolute"), s.offset = this.positionAbs), t.Widget.prototype._trigger.call(this, e, i, s);
    }, plugins: {}, _uiHash: function _uiHash() {
      return { helper: this.helper, position: this.position, originalPosition: this.originalPosition, offset: this.positionAbs };
    } }), t.ui.plugin.add("draggable", "connectToSortable", { start: function start(e, i, s) {
      var n = t.extend({}, i, { item: s.element });s.sortables = [], t(s.options.connectToSortable).each(function () {
        var i = t(this).sortable("instance");i && !i.options.disabled && (s.sortables.push(i), i.refreshPositions(), i._trigger("activate", e, n));
      });
    }, stop: function stop(e, i, s) {
      var n = t.extend({}, i, { item: s.element });s.cancelHelperRemoval = !1, t.each(s.sortables, function () {
        var t = this;t.isOver ? (t.isOver = 0, s.cancelHelperRemoval = !0, t.cancelHelperRemoval = !1, t._storedCSS = { position: t.placeholder.css("position"), top: t.placeholder.css("top"), left: t.placeholder.css("left") }, t._mouseStop(e), t.options.helper = t.options._helper) : (t.cancelHelperRemoval = !0, t._trigger("deactivate", e, n));
      });
    }, drag: function drag(e, i, s) {
      t.each(s.sortables, function () {
        var n = !1,
            o = this;o.positionAbs = s.positionAbs, o.helperProportions = s.helperProportions, o.offset.click = s.offset.click, o._intersectsWith(o.containerCache) && (n = !0, t.each(s.sortables, function () {
          return this.positionAbs = s.positionAbs, this.helperProportions = s.helperProportions, this.offset.click = s.offset.click, this !== o && this._intersectsWith(this.containerCache) && t.contains(o.element[0], this.element[0]) && (n = !1), n;
        })), n ? (o.isOver || (o.isOver = 1, s._parent = i.helper.parent(), o.currentItem = i.helper.appendTo(o.element).data("ui-sortable-item", !0), o.options._helper = o.options.helper, o.options.helper = function () {
          return i.helper[0];
        }, e.target = o.currentItem[0], o._mouseCapture(e, !0), o._mouseStart(e, !0, !0), o.offset.click.top = s.offset.click.top, o.offset.click.left = s.offset.click.left, o.offset.parent.left -= s.offset.parent.left - o.offset.parent.left, o.offset.parent.top -= s.offset.parent.top - o.offset.parent.top, s._trigger("toSortable", e), s.dropped = o.element, t.each(s.sortables, function () {
          this.refreshPositions();
        }), s.currentItem = s.element, o.fromOutside = s), o.currentItem && (o._mouseDrag(e), i.position = o.position)) : o.isOver && (o.isOver = 0, o.cancelHelperRemoval = !0, o.options._revert = o.options.revert, o.options.revert = !1, o._trigger("out", e, o._uiHash(o)), o._mouseStop(e, !0), o.options.revert = o.options._revert, o.options.helper = o.options._helper, o.placeholder && o.placeholder.remove(), i.helper.appendTo(s._parent), s._refreshOffsets(e), i.position = s._generatePosition(e, !0), s._trigger("fromSortable", e), s.dropped = !1, t.each(s.sortables, function () {
          this.refreshPositions();
        }));
      });
    } }), t.ui.plugin.add("draggable", "cursor", { start: function start(e, i, s) {
      var n = t("body"),
          o = s.options;n.css("cursor") && (o._cursor = n.css("cursor")), n.css("cursor", o.cursor);
    }, stop: function stop(e, i, s) {
      var n = s.options;n._cursor && t("body").css("cursor", n._cursor);
    } }), t.ui.plugin.add("draggable", "opacity", { start: function start(e, i, s) {
      var n = t(i.helper),
          o = s.options;n.css("opacity") && (o._opacity = n.css("opacity")), n.css("opacity", o.opacity);
    }, stop: function stop(e, i, s) {
      var n = s.options;n._opacity && t(i.helper).css("opacity", n._opacity);
    } }), t.ui.plugin.add("draggable", "scroll", { start: function start(t, e, i) {
      i.scrollParentNotHidden || (i.scrollParentNotHidden = i.helper.scrollParent(!1)), i.scrollParentNotHidden[0] !== i.document[0] && "HTML" !== i.scrollParentNotHidden[0].tagName && (i.overflowOffset = i.scrollParentNotHidden.offset());
    }, drag: function drag(e, i, s) {
      var n = s.options,
          o = !1,
          a = s.scrollParentNotHidden[0],
          r = s.document[0];a !== r && "HTML" !== a.tagName ? (n.axis && "x" === n.axis || (s.overflowOffset.top + a.offsetHeight - e.pageY < n.scrollSensitivity ? a.scrollTop = o = a.scrollTop + n.scrollSpeed : e.pageY - s.overflowOffset.top < n.scrollSensitivity && (a.scrollTop = o = a.scrollTop - n.scrollSpeed)), n.axis && "y" === n.axis || (s.overflowOffset.left + a.offsetWidth - e.pageX < n.scrollSensitivity ? a.scrollLeft = o = a.scrollLeft + n.scrollSpeed : e.pageX - s.overflowOffset.left < n.scrollSensitivity && (a.scrollLeft = o = a.scrollLeft - n.scrollSpeed))) : (n.axis && "x" === n.axis || (e.pageY - t(r).scrollTop() < n.scrollSensitivity ? o = t(r).scrollTop(t(r).scrollTop() - n.scrollSpeed) : t(window).height() - (e.pageY - t(r).scrollTop()) < n.scrollSensitivity && (o = t(r).scrollTop(t(r).scrollTop() + n.scrollSpeed))), n.axis && "y" === n.axis || (e.pageX - t(r).scrollLeft() < n.scrollSensitivity ? o = t(r).scrollLeft(t(r).scrollLeft() - n.scrollSpeed) : t(window).width() - (e.pageX - t(r).scrollLeft()) < n.scrollSensitivity && (o = t(r).scrollLeft(t(r).scrollLeft() + n.scrollSpeed)))), o !== !1 && t.ui.ddmanager && !n.dropBehaviour && t.ui.ddmanager.prepareOffsets(s, e);
    } }), t.ui.plugin.add("draggable", "snap", { start: function start(e, i, s) {
      var n = s.options;s.snapElements = [], t(n.snap.constructor !== String ? n.snap.items || ":data(ui-draggable)" : n.snap).each(function () {
        var e = t(this),
            i = e.offset();this !== s.element[0] && s.snapElements.push({ item: this, width: e.outerWidth(), height: e.outerHeight(), top: i.top, left: i.left });
      });
    }, drag: function drag(e, i, s) {
      var n,
          o,
          a,
          r,
          h,
          l,
          c,
          u,
          d,
          p,
          f = s.options,
          g = f.snapTolerance,
          m = i.offset.left,
          _ = m + s.helperProportions.width,
          v = i.offset.top,
          b = v + s.helperProportions.height;for (d = s.snapElements.length - 1; d >= 0; d--) {
        h = s.snapElements[d].left - s.margins.left, l = h + s.snapElements[d].width, c = s.snapElements[d].top - s.margins.top, u = c + s.snapElements[d].height, h - g > _ || m > l + g || c - g > b || v > u + g || !t.contains(s.snapElements[d].item.ownerDocument, s.snapElements[d].item) ? (s.snapElements[d].snapping && s.options.snap.release && s.options.snap.release.call(s.element, e, t.extend(s._uiHash(), { snapItem: s.snapElements[d].item })), s.snapElements[d].snapping = !1) : ("inner" !== f.snapMode && (n = g >= Math.abs(c - b), o = g >= Math.abs(u - v), a = g >= Math.abs(h - _), r = g >= Math.abs(l - m), n && (i.position.top = s._convertPositionTo("relative", { top: c - s.helperProportions.height, left: 0 }).top), o && (i.position.top = s._convertPositionTo("relative", { top: u, left: 0 }).top), a && (i.position.left = s._convertPositionTo("relative", { top: 0, left: h - s.helperProportions.width }).left), r && (i.position.left = s._convertPositionTo("relative", { top: 0, left: l }).left)), p = n || o || a || r, "outer" !== f.snapMode && (n = g >= Math.abs(c - v), o = g >= Math.abs(u - b), a = g >= Math.abs(h - m), r = g >= Math.abs(l - _), n && (i.position.top = s._convertPositionTo("relative", { top: c, left: 0 }).top), o && (i.position.top = s._convertPositionTo("relative", { top: u - s.helperProportions.height, left: 0 }).top), a && (i.position.left = s._convertPositionTo("relative", { top: 0, left: h }).left), r && (i.position.left = s._convertPositionTo("relative", { top: 0, left: l - s.helperProportions.width }).left)), !s.snapElements[d].snapping && (n || o || a || r || p) && s.options.snap.snap && s.options.snap.snap.call(s.element, e, t.extend(s._uiHash(), { snapItem: s.snapElements[d].item })), s.snapElements[d].snapping = n || o || a || r || p);
      }
    } }), t.ui.plugin.add("draggable", "stack", { start: function start(e, i, s) {
      var n,
          o = s.options,
          a = t.makeArray(t(o.stack)).sort(function (e, i) {
        return (parseInt(t(e).css("zIndex"), 10) || 0) - (parseInt(t(i).css("zIndex"), 10) || 0);
      });a.length && (n = parseInt(t(a[0]).css("zIndex"), 10) || 0, t(a).each(function (e) {
        t(this).css("zIndex", n + e);
      }), this.css("zIndex", n + a.length));
    } }), t.ui.plugin.add("draggable", "zIndex", { start: function start(e, i, s) {
      var n = t(i.helper),
          o = s.options;n.css("zIndex") && (o._zIndex = n.css("zIndex")), n.css("zIndex", o.zIndex);
    }, stop: function stop(e, i, s) {
      var n = s.options;n._zIndex && t(i.helper).css("zIndex", n._zIndex);
    } }), t.ui.draggable, t.widget("ui.droppable", { version: "1.12.1", widgetEventPrefix: "drop", options: { accept: "*", addClasses: !0, greedy: !1, scope: "default", tolerance: "intersect", activate: null, deactivate: null, drop: null, out: null, over: null }, _create: function _create() {
      var e,
          i = this.options,
          s = i.accept;this.isover = !1, this.isout = !0, this.accept = t.isFunction(s) ? s : function (t) {
        return t.is(s);
      }, this.proportions = function () {
        return arguments.length ? (e = arguments[0], void 0) : e ? e : e = { width: this.element[0].offsetWidth, height: this.element[0].offsetHeight };
      }, this._addToManager(i.scope), i.addClasses && this._addClass("ui-droppable");
    }, _addToManager: function _addToManager(e) {
      t.ui.ddmanager.droppables[e] = t.ui.ddmanager.droppables[e] || [], t.ui.ddmanager.droppables[e].push(this);
    }, _splice: function _splice(t) {
      for (var e = 0; t.length > e; e++) {
        t[e] === this && t.splice(e, 1);
      }
    }, _destroy: function _destroy() {
      var e = t.ui.ddmanager.droppables[this.options.scope];this._splice(e);
    }, _setOption: function _setOption(e, i) {
      if ("accept" === e) this.accept = t.isFunction(i) ? i : function (t) {
        return t.is(i);
      };else if ("scope" === e) {
        var s = t.ui.ddmanager.droppables[this.options.scope];this._splice(s), this._addToManager(i);
      }this._super(e, i);
    }, _activate: function _activate(e) {
      var i = t.ui.ddmanager.current;this._addActiveClass(), i && this._trigger("activate", e, this.ui(i));
    }, _deactivate: function _deactivate(e) {
      var i = t.ui.ddmanager.current;this._removeActiveClass(), i && this._trigger("deactivate", e, this.ui(i));
    }, _over: function _over(e) {
      var i = t.ui.ddmanager.current;i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this._addHoverClass(), this._trigger("over", e, this.ui(i)));
    }, _out: function _out(e) {
      var i = t.ui.ddmanager.current;i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this._removeHoverClass(), this._trigger("out", e, this.ui(i)));
    }, _drop: function _drop(e, i) {
      var s = i || t.ui.ddmanager.current,
          n = !1;return s && (s.currentItem || s.element)[0] !== this.element[0] ? (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function () {
        var i = t(this).droppable("instance");return i.options.greedy && !i.options.disabled && i.options.scope === s.options.scope && i.accept.call(i.element[0], s.currentItem || s.element) && u(s, t.extend(i, { offset: i.element.offset() }), i.options.tolerance, e) ? (n = !0, !1) : void 0;
      }), n ? !1 : this.accept.call(this.element[0], s.currentItem || s.element) ? (this._removeActiveClass(), this._removeHoverClass(), this._trigger("drop", e, this.ui(s)), this.element) : !1) : !1;
    }, ui: function ui(t) {
      return { draggable: t.currentItem || t.element, helper: t.helper, position: t.position, offset: t.positionAbs };
    }, _addHoverClass: function _addHoverClass() {
      this._addClass("ui-droppable-hover");
    }, _removeHoverClass: function _removeHoverClass() {
      this._removeClass("ui-droppable-hover");
    }, _addActiveClass: function _addActiveClass() {
      this._addClass("ui-droppable-active");
    }, _removeActiveClass: function _removeActiveClass() {
      this._removeClass("ui-droppable-active");
    } });var u = t.ui.intersect = function () {
    function t(t, e, i) {
      return t >= e && e + i > t;
    }return function (e, i, s, n) {
      if (!i.offset) return !1;var o = (e.positionAbs || e.position.absolute).left + e.margins.left,
          a = (e.positionAbs || e.position.absolute).top + e.margins.top,
          r = o + e.helperProportions.width,
          h = a + e.helperProportions.height,
          l = i.offset.left,
          c = i.offset.top,
          u = l + i.proportions().width,
          d = c + i.proportions().height;switch (s) {case "fit":
          return o >= l && u >= r && a >= c && d >= h;case "intersect":
          return o + e.helperProportions.width / 2 > l && u > r - e.helperProportions.width / 2 && a + e.helperProportions.height / 2 > c && d > h - e.helperProportions.height / 2;case "pointer":
          return t(n.pageY, c, i.proportions().height) && t(n.pageX, l, i.proportions().width);case "touch":
          return (a >= c && d >= a || h >= c && d >= h || c > a && h > d) && (o >= l && u >= o || r >= l && u >= r || l > o && r > u);default:
          return !1;}
    };
  }();t.ui.ddmanager = { current: null, droppables: { "default": [] }, prepareOffsets: function prepareOffsets(e, i) {
      var s,
          n,
          o = t.ui.ddmanager.droppables[e.options.scope] || [],
          a = i ? i.type : null,
          r = (e.currentItem || e.element).find(":data(ui-droppable)").addBack();t: for (s = 0; o.length > s; s++) {
        if (!(o[s].options.disabled || e && !o[s].accept.call(o[s].element[0], e.currentItem || e.element))) {
          for (n = 0; r.length > n; n++) {
            if (r[n] === o[s].element[0]) {
              o[s].proportions().height = 0;continue t;
            }
          }o[s].visible = "none" !== o[s].element.css("display"), o[s].visible && ("mousedown" === a && o[s]._activate.call(o[s], i), o[s].offset = o[s].element.offset(), o[s].proportions({ width: o[s].element[0].offsetWidth, height: o[s].element[0].offsetHeight }));
        }
      }
    }, drop: function drop(e, i) {
      var s = !1;return t.each((t.ui.ddmanager.droppables[e.options.scope] || []).slice(), function () {
        this.options && (!this.options.disabled && this.visible && u(e, this, this.options.tolerance, i) && (s = this._drop.call(this, i) || s), !this.options.disabled && this.visible && this.accept.call(this.element[0], e.currentItem || e.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, i)));
      }), s;
    }, dragStart: function dragStart(e, i) {
      e.element.parentsUntil("body").on("scroll.droppable", function () {
        e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i);
      });
    }, drag: function drag(e, i) {
      e.options.refreshPositions && t.ui.ddmanager.prepareOffsets(e, i), t.each(t.ui.ddmanager.droppables[e.options.scope] || [], function () {
        if (!this.options.disabled && !this.greedyChild && this.visible) {
          var s,
              n,
              o,
              a = u(e, this, this.options.tolerance, i),
              r = !a && this.isover ? "isout" : a && !this.isover ? "isover" : null;r && (this.options.greedy && (n = this.options.scope, o = this.element.parents(":data(ui-droppable)").filter(function () {
            return t(this).droppable("instance").options.scope === n;
          }), o.length && (s = t(o[0]).droppable("instance"), s.greedyChild = "isover" === r)), s && "isover" === r && (s.isover = !1, s.isout = !0, s._out.call(s, i)), this[r] = !0, this["isout" === r ? "isover" : "isout"] = !1, this["isover" === r ? "_over" : "_out"].call(this, i), s && "isout" === r && (s.isout = !1, s.isover = !0, s._over.call(s, i)));
        }
      });
    }, dragStop: function dragStop(e, i) {
      e.element.parentsUntil("body").off("scroll.droppable"), e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i);
    } }, t.uiBackCompat !== !1 && t.widget("ui.droppable", t.ui.droppable, { options: { hoverClass: !1, activeClass: !1 }, _addActiveClass: function _addActiveClass() {
      this._super(), this.options.activeClass && this.element.addClass(this.options.activeClass);
    }, _removeActiveClass: function _removeActiveClass() {
      this._super(), this.options.activeClass && this.element.removeClass(this.options.activeClass);
    }, _addHoverClass: function _addHoverClass() {
      this._super(), this.options.hoverClass && this.element.addClass(this.options.hoverClass);
    }, _removeHoverClass: function _removeHoverClass() {
      this._super(), this.options.hoverClass && this.element.removeClass(this.options.hoverClass);
    } }), t.ui.droppable, t.widget("ui.resizable", t.ui.mouse, { version: "1.12.1", widgetEventPrefix: "resize", options: { alsoResize: !1, animate: !1, animateDuration: "slow", animateEasing: "swing", aspectRatio: !1, autoHide: !1, classes: { "ui-resizable-se": "ui-icon ui-icon-gripsmall-diagonal-se" }, containment: !1, ghost: !1, grid: !1, handles: "e,s,se", helper: !1, maxHeight: null, maxWidth: null, minHeight: 10, minWidth: 10, zIndex: 90, resize: null, start: null, stop: null }, _num: function _num(t) {
      return parseFloat(t) || 0;
    }, _isNumber: function _isNumber(t) {
      return !isNaN(parseFloat(t));
    }, _hasScroll: function _hasScroll(e, i) {
      if ("hidden" === t(e).css("overflow")) return !1;var s = i && "left" === i ? "scrollLeft" : "scrollTop",
          n = !1;return e[s] > 0 ? !0 : (e[s] = 1, n = e[s] > 0, e[s] = 0, n);
    }, _create: function _create() {
      var e,
          i = this.options,
          s = this;this._addClass("ui-resizable"), t.extend(this, { _aspectRatio: !!i.aspectRatio, aspectRatio: i.aspectRatio, originalElement: this.element, _proportionallyResizeElements: [], _helper: i.helper || i.ghost || i.animate ? i.helper || "ui-resizable-helper" : null }), this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i) && (this.element.wrap(t("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({ position: this.element.css("position"), width: this.element.outerWidth(), height: this.element.outerHeight(), top: this.element.css("top"), left: this.element.css("left") })), this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance")), this.elementIsWrapper = !0, e = { marginTop: this.originalElement.css("marginTop"), marginRight: this.originalElement.css("marginRight"), marginBottom: this.originalElement.css("marginBottom"), marginLeft: this.originalElement.css("marginLeft") }, this.element.css(e), this.originalElement.css("margin", 0), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({ position: "static", zoom: 1, display: "block" })), this.originalElement.css(e), this._proportionallyResize()), this._setupHandles(), i.autoHide && t(this.element).on("mouseenter", function () {
        i.disabled || (s._removeClass("ui-resizable-autohide"), s._handles.show());
      }).on("mouseleave", function () {
        i.disabled || s.resizing || (s._addClass("ui-resizable-autohide"), s._handles.hide());
      }), this._mouseInit();
    }, _destroy: function _destroy() {
      this._mouseDestroy();var e,
          i = function i(e) {
        t(e).removeData("resizable").removeData("ui-resizable").off(".resizable").find(".ui-resizable-handle").remove();
      };return this.elementIsWrapper && (i(this.element), e = this.element, this.originalElement.css({ position: e.css("position"), width: e.outerWidth(), height: e.outerHeight(), top: e.css("top"), left: e.css("left") }).insertAfter(e), e.remove()), this.originalElement.css("resize", this.originalResizeStyle), i(this.originalElement), this;
    }, _setOption: function _setOption(t, e) {
      switch (this._super(t, e), t) {case "handles":
          this._removeHandles(), this._setupHandles();break;default:}
    }, _setupHandles: function _setupHandles() {
      var e,
          i,
          s,
          n,
          o,
          a = this.options,
          r = this;if (this.handles = a.handles || (t(".ui-resizable-handle", this.element).length ? { n: ".ui-resizable-n", e: ".ui-resizable-e", s: ".ui-resizable-s", w: ".ui-resizable-w", se: ".ui-resizable-se", sw: ".ui-resizable-sw", ne: ".ui-resizable-ne", nw: ".ui-resizable-nw" } : "e,s,se"), this._handles = t(), this.handles.constructor === String) for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), s = this.handles.split(","), this.handles = {}, i = 0; s.length > i; i++) {
        e = t.trim(s[i]), n = "ui-resizable-" + e, o = t("<div>"), this._addClass(o, "ui-resizable-handle " + n), o.css({ zIndex: a.zIndex }), this.handles[e] = ".ui-resizable-" + e, this.element.append(o);
      }this._renderAxis = function (e) {
        var i, s, n, o;e = e || this.element;for (i in this.handles) {
          this.handles[i].constructor === String ? this.handles[i] = this.element.children(this.handles[i]).first().show() : (this.handles[i].jquery || this.handles[i].nodeType) && (this.handles[i] = t(this.handles[i]), this._on(this.handles[i], { mousedown: r._mouseDown })), this.elementIsWrapper && this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i) && (s = t(this.handles[i], this.element), o = /sw|ne|nw|se|n|s/.test(i) ? s.outerHeight() : s.outerWidth(), n = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join(""), e.css(n, o), this._proportionallyResize()), this._handles = this._handles.add(this.handles[i]);
        }
      }, this._renderAxis(this.element), this._handles = this._handles.add(this.element.find(".ui-resizable-handle")), this._handles.disableSelection(), this._handles.on("mouseover", function () {
        r.resizing || (this.className && (o = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), r.axis = o && o[1] ? o[1] : "se");
      }), a.autoHide && (this._handles.hide(), this._addClass("ui-resizable-autohide"));
    }, _removeHandles: function _removeHandles() {
      this._handles.remove();
    }, _mouseCapture: function _mouseCapture(e) {
      var i,
          s,
          n = !1;for (i in this.handles) {
        s = t(this.handles[i])[0], (s === e.target || t.contains(s, e.target)) && (n = !0);
      }return !this.options.disabled && n;
    }, _mouseStart: function _mouseStart(e) {
      var i,
          s,
          n,
          o = this.options,
          a = this.element;return this.resizing = !0, this._renderProxy(), i = this._num(this.helper.css("left")), s = this._num(this.helper.css("top")), o.containment && (i += t(o.containment).scrollLeft() || 0, s += t(o.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = { left: i, top: s }, this.size = this._helper ? { width: this.helper.width(), height: this.helper.height() } : { width: a.width(), height: a.height() }, this.originalSize = this._helper ? { width: a.outerWidth(), height: a.outerHeight() } : { width: a.width(), height: a.height() }, this.sizeDiff = { width: a.outerWidth() - a.width(), height: a.outerHeight() - a.height() }, this.originalPosition = { left: i, top: s }, this.originalMousePosition = { left: e.pageX, top: e.pageY }, this.aspectRatio = "number" == typeof o.aspectRatio ? o.aspectRatio : this.originalSize.width / this.originalSize.height || 1, n = t(".ui-resizable-" + this.axis).css("cursor"), t("body").css("cursor", "auto" === n ? this.axis + "-resize" : n), this._addClass("ui-resizable-resizing"), this._propagate("start", e), !0;
    }, _mouseDrag: function _mouseDrag(e) {
      var i,
          s,
          n = this.originalMousePosition,
          o = this.axis,
          a = e.pageX - n.left || 0,
          r = e.pageY - n.top || 0,
          h = this._change[o];return this._updatePrevProperties(), h ? (i = h.apply(this, [e, a, r]), this._updateVirtualBoundaries(e.shiftKey), (this._aspectRatio || e.shiftKey) && (i = this._updateRatio(i, e)), i = this._respectSize(i, e), this._updateCache(i), this._propagate("resize", e), s = this._applyChanges(), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), t.isEmptyObject(s) || (this._updatePrevProperties(), this._trigger("resize", e, this.ui()), this._applyChanges()), !1) : !1;
    }, _mouseStop: function _mouseStop(e) {
      this.resizing = !1;var i,
          s,
          n,
          o,
          a,
          r,
          h,
          l = this.options,
          c = this;return this._helper && (i = this._proportionallyResizeElements, s = i.length && /textarea/i.test(i[0].nodeName), n = s && this._hasScroll(i[0], "left") ? 0 : c.sizeDiff.height, o = s ? 0 : c.sizeDiff.width, a = { width: c.helper.width() - o, height: c.helper.height() - n }, r = parseFloat(c.element.css("left")) + (c.position.left - c.originalPosition.left) || null, h = parseFloat(c.element.css("top")) + (c.position.top - c.originalPosition.top) || null, l.animate || this.element.css(t.extend(a, { top: h, left: r })), c.helper.height(c.size.height), c.helper.width(c.size.width), this._helper && !l.animate && this._proportionallyResize()), t("body").css("cursor", "auto"), this._removeClass("ui-resizable-resizing"), this._propagate("stop", e), this._helper && this.helper.remove(), !1;
    }, _updatePrevProperties: function _updatePrevProperties() {
      this.prevPosition = { top: this.position.top, left: this.position.left }, this.prevSize = { width: this.size.width, height: this.size.height };
    }, _applyChanges: function _applyChanges() {
      var t = {};return this.position.top !== this.prevPosition.top && (t.top = this.position.top + "px"), this.position.left !== this.prevPosition.left && (t.left = this.position.left + "px"), this.size.width !== this.prevSize.width && (t.width = this.size.width + "px"), this.size.height !== this.prevSize.height && (t.height = this.size.height + "px"), this.helper.css(t), t;
    }, _updateVirtualBoundaries: function _updateVirtualBoundaries(t) {
      var e,
          i,
          s,
          n,
          o,
          a = this.options;o = { minWidth: this._isNumber(a.minWidth) ? a.minWidth : 0, maxWidth: this._isNumber(a.maxWidth) ? a.maxWidth : 1 / 0, minHeight: this._isNumber(a.minHeight) ? a.minHeight : 0, maxHeight: this._isNumber(a.maxHeight) ? a.maxHeight : 1 / 0 }, (this._aspectRatio || t) && (e = o.minHeight * this.aspectRatio, s = o.minWidth / this.aspectRatio, i = o.maxHeight * this.aspectRatio, n = o.maxWidth / this.aspectRatio, e > o.minWidth && (o.minWidth = e), s > o.minHeight && (o.minHeight = s), o.maxWidth > i && (o.maxWidth = i), o.maxHeight > n && (o.maxHeight = n)), this._vBoundaries = o;
    }, _updateCache: function _updateCache(t) {
      this.offset = this.helper.offset(), this._isNumber(t.left) && (this.position.left = t.left), this._isNumber(t.top) && (this.position.top = t.top), this._isNumber(t.height) && (this.size.height = t.height), this._isNumber(t.width) && (this.size.width = t.width);
    }, _updateRatio: function _updateRatio(t) {
      var e = this.position,
          i = this.size,
          s = this.axis;return this._isNumber(t.height) ? t.width = t.height * this.aspectRatio : this._isNumber(t.width) && (t.height = t.width / this.aspectRatio), "sw" === s && (t.left = e.left + (i.width - t.width), t.top = null), "nw" === s && (t.top = e.top + (i.height - t.height), t.left = e.left + (i.width - t.width)), t;
    }, _respectSize: function _respectSize(t) {
      var e = this._vBoundaries,
          i = this.axis,
          s = this._isNumber(t.width) && e.maxWidth && e.maxWidth < t.width,
          n = this._isNumber(t.height) && e.maxHeight && e.maxHeight < t.height,
          o = this._isNumber(t.width) && e.minWidth && e.minWidth > t.width,
          a = this._isNumber(t.height) && e.minHeight && e.minHeight > t.height,
          r = this.originalPosition.left + this.originalSize.width,
          h = this.originalPosition.top + this.originalSize.height,
          l = /sw|nw|w/.test(i),
          c = /nw|ne|n/.test(i);return o && (t.width = e.minWidth), a && (t.height = e.minHeight), s && (t.width = e.maxWidth), n && (t.height = e.maxHeight), o && l && (t.left = r - e.minWidth), s && l && (t.left = r - e.maxWidth), a && c && (t.top = h - e.minHeight), n && c && (t.top = h - e.maxHeight), t.width || t.height || t.left || !t.top ? t.width || t.height || t.top || !t.left || (t.left = null) : t.top = null, t;
    }, _getPaddingPlusBorderDimensions: function _getPaddingPlusBorderDimensions(t) {
      for (var e = 0, i = [], s = [t.css("borderTopWidth"), t.css("borderRightWidth"), t.css("borderBottomWidth"), t.css("borderLeftWidth")], n = [t.css("paddingTop"), t.css("paddingRight"), t.css("paddingBottom"), t.css("paddingLeft")]; 4 > e; e++) {
        i[e] = parseFloat(s[e]) || 0, i[e] += parseFloat(n[e]) || 0;
      }return { height: i[0] + i[2], width: i[1] + i[3] };
    }, _proportionallyResize: function _proportionallyResize() {
      if (this._proportionallyResizeElements.length) for (var t, e = 0, i = this.helper || this.element; this._proportionallyResizeElements.length > e; e++) {
        t = this._proportionallyResizeElements[e], this.outerDimensions || (this.outerDimensions = this._getPaddingPlusBorderDimensions(t)), t.css({ height: i.height() - this.outerDimensions.height || 0, width: i.width() - this.outerDimensions.width || 0 });
      }
    }, _renderProxy: function _renderProxy() {
      var e = this.element,
          i = this.options;this.elementOffset = e.offset(), this._helper ? (this.helper = this.helper || t("<div style='overflow:hidden;'></div>"), this._addClass(this.helper, this._helper), this.helper.css({ width: this.element.outerWidth(), height: this.element.outerHeight(), position: "absolute", left: this.elementOffset.left + "px", top: this.elementOffset.top + "px", zIndex: ++i.zIndex }), this.helper.appendTo("body").disableSelection()) : this.helper = this.element;
    }, _change: { e: function e(t, _e) {
        return { width: this.originalSize.width + _e };
      }, w: function w(t, e) {
        var i = this.originalSize,
            s = this.originalPosition;return { left: s.left + e, width: i.width - e };
      }, n: function n(t, e, i) {
        var s = this.originalSize,
            n = this.originalPosition;return { top: n.top + i, height: s.height - i };
      }, s: function s(t, e, i) {
        return { height: this.originalSize.height + i };
      }, se: function se(e, i, s) {
        return t.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [e, i, s]));
      }, sw: function sw(e, i, s) {
        return t.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [e, i, s]));
      }, ne: function ne(e, i, s) {
        return t.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [e, i, s]));
      }, nw: function nw(e, i, s) {
        return t.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [e, i, s]));
      } }, _propagate: function _propagate(e, i) {
      t.ui.plugin.call(this, e, [i, this.ui()]), "resize" !== e && this._trigger(e, i, this.ui());
    }, plugins: {}, ui: function ui() {
      return { originalElement: this.originalElement, element: this.element, helper: this.helper, position: this.position, size: this.size, originalSize: this.originalSize, originalPosition: this.originalPosition };
    } }), t.ui.plugin.add("resizable", "animate", { stop: function stop(e) {
      var i = t(this).resizable("instance"),
          s = i.options,
          n = i._proportionallyResizeElements,
          o = n.length && /textarea/i.test(n[0].nodeName),
          a = o && i._hasScroll(n[0], "left") ? 0 : i.sizeDiff.height,
          r = o ? 0 : i.sizeDiff.width,
          h = { width: i.size.width - r, height: i.size.height - a },
          l = parseFloat(i.element.css("left")) + (i.position.left - i.originalPosition.left) || null,
          c = parseFloat(i.element.css("top")) + (i.position.top - i.originalPosition.top) || null;i.element.animate(t.extend(h, c && l ? { top: c, left: l } : {}), { duration: s.animateDuration, easing: s.animateEasing, step: function step() {
          var s = { width: parseFloat(i.element.css("width")), height: parseFloat(i.element.css("height")), top: parseFloat(i.element.css("top")), left: parseFloat(i.element.css("left")) };n && n.length && t(n[0]).css({ width: s.width, height: s.height }), i._updateCache(s), i._propagate("resize", e);
        } });
    } }), t.ui.plugin.add("resizable", "containment", { start: function start() {
      var e,
          i,
          s,
          n,
          o,
          a,
          r,
          h = t(this).resizable("instance"),
          l = h.options,
          c = h.element,
          u = l.containment,
          d = u instanceof t ? u.get(0) : /parent/.test(u) ? c.parent().get(0) : u;d && (h.containerElement = t(d), /document/.test(u) || u === document ? (h.containerOffset = { left: 0, top: 0 }, h.containerPosition = { left: 0, top: 0 }, h.parentData = { element: t(document), left: 0, top: 0, width: t(document).width(), height: t(document).height() || document.body.parentNode.scrollHeight }) : (e = t(d), i = [], t(["Top", "Right", "Left", "Bottom"]).each(function (t, s) {
        i[t] = h._num(e.css("padding" + s));
      }), h.containerOffset = e.offset(), h.containerPosition = e.position(), h.containerSize = { height: e.innerHeight() - i[3], width: e.innerWidth() - i[1] }, s = h.containerOffset, n = h.containerSize.height, o = h.containerSize.width, a = h._hasScroll(d, "left") ? d.scrollWidth : o, r = h._hasScroll(d) ? d.scrollHeight : n, h.parentData = { element: d, left: s.left, top: s.top, width: a, height: r }));
    }, resize: function resize(e) {
      var i,
          s,
          n,
          o,
          a = t(this).resizable("instance"),
          r = a.options,
          h = a.containerOffset,
          l = a.position,
          c = a._aspectRatio || e.shiftKey,
          u = { top: 0, left: 0 },
          d = a.containerElement,
          p = !0;d[0] !== document && /static/.test(d.css("position")) && (u = h), l.left < (a._helper ? h.left : 0) && (a.size.width = a.size.width + (a._helper ? a.position.left - h.left : a.position.left - u.left), c && (a.size.height = a.size.width / a.aspectRatio, p = !1), a.position.left = r.helper ? h.left : 0), l.top < (a._helper ? h.top : 0) && (a.size.height = a.size.height + (a._helper ? a.position.top - h.top : a.position.top), c && (a.size.width = a.size.height * a.aspectRatio, p = !1), a.position.top = a._helper ? h.top : 0), n = a.containerElement.get(0) === a.element.parent().get(0), o = /relative|absolute/.test(a.containerElement.css("position")), n && o ? (a.offset.left = a.parentData.left + a.position.left, a.offset.top = a.parentData.top + a.position.top) : (a.offset.left = a.element.offset().left, a.offset.top = a.element.offset().top), i = Math.abs(a.sizeDiff.width + (a._helper ? a.offset.left - u.left : a.offset.left - h.left)), s = Math.abs(a.sizeDiff.height + (a._helper ? a.offset.top - u.top : a.offset.top - h.top)), i + a.size.width >= a.parentData.width && (a.size.width = a.parentData.width - i, c && (a.size.height = a.size.width / a.aspectRatio, p = !1)), s + a.size.height >= a.parentData.height && (a.size.height = a.parentData.height - s, c && (a.size.width = a.size.height * a.aspectRatio, p = !1)), p || (a.position.left = a.prevPosition.left, a.position.top = a.prevPosition.top, a.size.width = a.prevSize.width, a.size.height = a.prevSize.height);
    }, stop: function stop() {
      var e = t(this).resizable("instance"),
          i = e.options,
          s = e.containerOffset,
          n = e.containerPosition,
          o = e.containerElement,
          a = t(e.helper),
          r = a.offset(),
          h = a.outerWidth() - e.sizeDiff.width,
          l = a.outerHeight() - e.sizeDiff.height;e._helper && !i.animate && /relative/.test(o.css("position")) && t(this).css({ left: r.left - n.left - s.left, width: h, height: l }), e._helper && !i.animate && /static/.test(o.css("position")) && t(this).css({ left: r.left - n.left - s.left, width: h, height: l });
    } }), t.ui.plugin.add("resizable", "alsoResize", { start: function start() {
      var e = t(this).resizable("instance"),
          i = e.options;t(i.alsoResize).each(function () {
        var e = t(this);e.data("ui-resizable-alsoresize", { width: parseFloat(e.width()), height: parseFloat(e.height()), left: parseFloat(e.css("left")), top: parseFloat(e.css("top")) });
      });
    }, resize: function resize(e, i) {
      var s = t(this).resizable("instance"),
          n = s.options,
          o = s.originalSize,
          a = s.originalPosition,
          r = { height: s.size.height - o.height || 0, width: s.size.width - o.width || 0, top: s.position.top - a.top || 0, left: s.position.left - a.left || 0 };
      t(n.alsoResize).each(function () {
        var e = t(this),
            s = t(this).data("ui-resizable-alsoresize"),
            n = {},
            o = e.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];t.each(o, function (t, e) {
          var i = (s[e] || 0) + (r[e] || 0);i && i >= 0 && (n[e] = i || null);
        }), e.css(n);
      });
    }, stop: function stop() {
      t(this).removeData("ui-resizable-alsoresize");
    } }), t.ui.plugin.add("resizable", "ghost", { start: function start() {
      var e = t(this).resizable("instance"),
          i = e.size;e.ghost = e.originalElement.clone(), e.ghost.css({ opacity: .25, display: "block", position: "relative", height: i.height, width: i.width, margin: 0, left: 0, top: 0 }), e._addClass(e.ghost, "ui-resizable-ghost"), t.uiBackCompat !== !1 && "string" == typeof e.options.ghost && e.ghost.addClass(this.options.ghost), e.ghost.appendTo(e.helper);
    }, resize: function resize() {
      var e = t(this).resizable("instance");e.ghost && e.ghost.css({ position: "relative", height: e.size.height, width: e.size.width });
    }, stop: function stop() {
      var e = t(this).resizable("instance");e.ghost && e.helper && e.helper.get(0).removeChild(e.ghost.get(0));
    } }), t.ui.plugin.add("resizable", "grid", { resize: function resize() {
      var e,
          i = t(this).resizable("instance"),
          s = i.options,
          n = i.size,
          o = i.originalSize,
          a = i.originalPosition,
          r = i.axis,
          h = "number" == typeof s.grid ? [s.grid, s.grid] : s.grid,
          l = h[0] || 1,
          c = h[1] || 1,
          u = Math.round((n.width - o.width) / l) * l,
          d = Math.round((n.height - o.height) / c) * c,
          p = o.width + u,
          f = o.height + d,
          g = s.maxWidth && p > s.maxWidth,
          m = s.maxHeight && f > s.maxHeight,
          _ = s.minWidth && s.minWidth > p,
          v = s.minHeight && s.minHeight > f;s.grid = h, _ && (p += l), v && (f += c), g && (p -= l), m && (f -= c), /^(se|s|e)$/.test(r) ? (i.size.width = p, i.size.height = f) : /^(ne)$/.test(r) ? (i.size.width = p, i.size.height = f, i.position.top = a.top - d) : /^(sw)$/.test(r) ? (i.size.width = p, i.size.height = f, i.position.left = a.left - u) : ((0 >= f - c || 0 >= p - l) && (e = i._getPaddingPlusBorderDimensions(this)), f - c > 0 ? (i.size.height = f, i.position.top = a.top - d) : (f = c - e.height, i.size.height = f, i.position.top = a.top + o.height - f), p - l > 0 ? (i.size.width = p, i.position.left = a.left - u) : (p = l - e.width, i.size.width = p, i.position.left = a.left + o.width - p));
    } }), t.ui.resizable, t.widget("ui.selectable", t.ui.mouse, { version: "1.12.1", options: { appendTo: "body", autoRefresh: !0, distance: 0, filter: "*", tolerance: "touch", selected: null, selecting: null, start: null, stop: null, unselected: null, unselecting: null }, _create: function _create() {
      var e = this;this._addClass("ui-selectable"), this.dragged = !1, this.refresh = function () {
        e.elementPos = t(e.element[0]).offset(), e.selectees = t(e.options.filter, e.element[0]), e._addClass(e.selectees, "ui-selectee"), e.selectees.each(function () {
          var i = t(this),
              s = i.offset(),
              n = { left: s.left - e.elementPos.left, top: s.top - e.elementPos.top };t.data(this, "selectable-item", { element: this, $element: i, left: n.left, top: n.top, right: n.left + i.outerWidth(), bottom: n.top + i.outerHeight(), startselected: !1, selected: i.hasClass("ui-selected"), selecting: i.hasClass("ui-selecting"), unselecting: i.hasClass("ui-unselecting") });
        });
      }, this.refresh(), this._mouseInit(), this.helper = t("<div>"), this._addClass(this.helper, "ui-selectable-helper");
    }, _destroy: function _destroy() {
      this.selectees.removeData("selectable-item"), this._mouseDestroy();
    }, _mouseStart: function _mouseStart(e) {
      var i = this,
          s = this.options;this.opos = [e.pageX, e.pageY], this.elementPos = t(this.element[0]).offset(), this.options.disabled || (this.selectees = t(s.filter, this.element[0]), this._trigger("start", e), t(s.appendTo).append(this.helper), this.helper.css({ left: e.pageX, top: e.pageY, width: 0, height: 0 }), s.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function () {
        var s = t.data(this, "selectable-item");s.startselected = !0, e.metaKey || e.ctrlKey || (i._removeClass(s.$element, "ui-selected"), s.selected = !1, i._addClass(s.$element, "ui-unselecting"), s.unselecting = !0, i._trigger("unselecting", e, { unselecting: s.element }));
      }), t(e.target).parents().addBack().each(function () {
        var s,
            n = t.data(this, "selectable-item");return n ? (s = !e.metaKey && !e.ctrlKey || !n.$element.hasClass("ui-selected"), i._removeClass(n.$element, s ? "ui-unselecting" : "ui-selected")._addClass(n.$element, s ? "ui-selecting" : "ui-unselecting"), n.unselecting = !s, n.selecting = s, n.selected = s, s ? i._trigger("selecting", e, { selecting: n.element }) : i._trigger("unselecting", e, { unselecting: n.element }), !1) : void 0;
      }));
    }, _mouseDrag: function _mouseDrag(e) {
      if (this.dragged = !0, !this.options.disabled) {
        var i,
            s = this,
            n = this.options,
            o = this.opos[0],
            a = this.opos[1],
            r = e.pageX,
            h = e.pageY;return o > r && (i = r, r = o, o = i), a > h && (i = h, h = a, a = i), this.helper.css({ left: o, top: a, width: r - o, height: h - a }), this.selectees.each(function () {
          var i = t.data(this, "selectable-item"),
              l = !1,
              c = {};i && i.element !== s.element[0] && (c.left = i.left + s.elementPos.left, c.right = i.right + s.elementPos.left, c.top = i.top + s.elementPos.top, c.bottom = i.bottom + s.elementPos.top, "touch" === n.tolerance ? l = !(c.left > r || o > c.right || c.top > h || a > c.bottom) : "fit" === n.tolerance && (l = c.left > o && r > c.right && c.top > a && h > c.bottom), l ? (i.selected && (s._removeClass(i.$element, "ui-selected"), i.selected = !1), i.unselecting && (s._removeClass(i.$element, "ui-unselecting"), i.unselecting = !1), i.selecting || (s._addClass(i.$element, "ui-selecting"), i.selecting = !0, s._trigger("selecting", e, { selecting: i.element }))) : (i.selecting && ((e.metaKey || e.ctrlKey) && i.startselected ? (s._removeClass(i.$element, "ui-selecting"), i.selecting = !1, s._addClass(i.$element, "ui-selected"), i.selected = !0) : (s._removeClass(i.$element, "ui-selecting"), i.selecting = !1, i.startselected && (s._addClass(i.$element, "ui-unselecting"), i.unselecting = !0), s._trigger("unselecting", e, { unselecting: i.element }))), i.selected && (e.metaKey || e.ctrlKey || i.startselected || (s._removeClass(i.$element, "ui-selected"), i.selected = !1, s._addClass(i.$element, "ui-unselecting"), i.unselecting = !0, s._trigger("unselecting", e, { unselecting: i.element })))));
        }), !1;
      }
    }, _mouseStop: function _mouseStop(e) {
      var i = this;return this.dragged = !1, t(".ui-unselecting", this.element[0]).each(function () {
        var s = t.data(this, "selectable-item");i._removeClass(s.$element, "ui-unselecting"), s.unselecting = !1, s.startselected = !1, i._trigger("unselected", e, { unselected: s.element });
      }), t(".ui-selecting", this.element[0]).each(function () {
        var s = t.data(this, "selectable-item");i._removeClass(s.$element, "ui-selecting")._addClass(s.$element, "ui-selected"), s.selecting = !1, s.selected = !0, s.startselected = !0, i._trigger("selected", e, { selected: s.element });
      }), this._trigger("stop", e), this.helper.remove(), !1;
    } }), t.widget("ui.sortable", t.ui.mouse, { version: "1.12.1", widgetEventPrefix: "sort", ready: !1, options: { appendTo: "parent", axis: !1, connectWith: !1, containment: !1, cursor: "auto", cursorAt: !1, dropOnEmpty: !0, forcePlaceholderSize: !1, forceHelperSize: !1, grid: !1, handle: !1, helper: "original", items: "> *", opacity: !1, placeholder: !1, revert: !1, scroll: !0, scrollSensitivity: 20, scrollSpeed: 20, scope: "default", tolerance: "intersect", zIndex: 1e3, activate: null, beforeStop: null, change: null, deactivate: null, out: null, over: null, receive: null, remove: null, sort: null, start: null, stop: null, update: null }, _isOverAxis: function _isOverAxis(t, e, i) {
      return t >= e && e + i > t;
    }, _isFloating: function _isFloating(t) {
      return (/left|right/.test(t.css("float")) || /inline|table-cell/.test(t.css("display"))
      );
    }, _create: function _create() {
      this.containerCache = {}, this._addClass("ui-sortable"), this.refresh(), this.offset = this.element.offset(), this._mouseInit(), this._setHandleClassName(), this.ready = !0;
    }, _setOption: function _setOption(t, e) {
      this._super(t, e), "handle" === t && this._setHandleClassName();
    }, _setHandleClassName: function _setHandleClassName() {
      var e = this;this._removeClass(this.element.find(".ui-sortable-handle"), "ui-sortable-handle"), t.each(this.items, function () {
        e._addClass(this.instance.options.handle ? this.item.find(this.instance.options.handle) : this.item, "ui-sortable-handle");
      });
    }, _destroy: function _destroy() {
      this._mouseDestroy();for (var t = this.items.length - 1; t >= 0; t--) {
        this.items[t].item.removeData(this.widgetName + "-item");
      }return this;
    }, _mouseCapture: function _mouseCapture(e, i) {
      var s = null,
          n = !1,
          o = this;return this.reverting ? !1 : this.options.disabled || "static" === this.options.type ? !1 : (this._refreshItems(e), t(e.target).parents().each(function () {
        return t.data(this, o.widgetName + "-item") === o ? (s = t(this), !1) : void 0;
      }), t.data(e.target, o.widgetName + "-item") === o && (s = t(e.target)), s ? !this.options.handle || i || (t(this.options.handle, s).find("*").addBack().each(function () {
        this === e.target && (n = !0);
      }), n) ? (this.currentItem = s, this._removeCurrentsFromItems(), !0) : !1 : !1);
    }, _mouseStart: function _mouseStart(e, i, s) {
      var n,
          o,
          a = this.options;if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(e), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = { top: this.offset.top - this.margins.top, left: this.offset.left - this.margins.left }, t.extend(this.offset, { click: { left: e.pageX - this.offset.left, top: e.pageY - this.offset.top }, parent: this._getParentOffset(), relative: this._getRelativeOffset() }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(e), this.originalPageX = e.pageX, this.originalPageY = e.pageY, a.cursorAt && this._adjustOffsetFromHelper(a.cursorAt), this.domPosition = { prev: this.currentItem.prev()[0], parent: this.currentItem.parent()[0] }, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), a.containment && this._setContainment(), a.cursor && "auto" !== a.cursor && (o = this.document.find("body"), this.storedCursor = o.css("cursor"), o.css("cursor", a.cursor), this.storedStylesheet = t("<style>*{ cursor: " + a.cursor + " !important; }</style>").appendTo(o)), a.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", a.opacity)), a.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", a.zIndex)), this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", e, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !s) for (n = this.containers.length - 1; n >= 0; n--) {
        this.containers[n]._trigger("activate", e, this._uiHash(this));
      }return t.ui.ddmanager && (t.ui.ddmanager.current = this), t.ui.ddmanager && !a.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this.dragging = !0, this._addClass(this.helper, "ui-sortable-helper"), this._mouseDrag(e), !0;
    }, _mouseDrag: function _mouseDrag(e) {
      var i,
          s,
          n,
          o,
          a = this.options,
          r = !1;for (this.position = this._generatePosition(e), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - e.pageY < a.scrollSensitivity ? this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop + a.scrollSpeed : e.pageY - this.overflowOffset.top < a.scrollSensitivity && (this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop - a.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - e.pageX < a.scrollSensitivity ? this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft + a.scrollSpeed : e.pageX - this.overflowOffset.left < a.scrollSensitivity && (this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft - a.scrollSpeed)) : (e.pageY - this.document.scrollTop() < a.scrollSensitivity ? r = this.document.scrollTop(this.document.scrollTop() - a.scrollSpeed) : this.window.height() - (e.pageY - this.document.scrollTop()) < a.scrollSensitivity && (r = this.document.scrollTop(this.document.scrollTop() + a.scrollSpeed)), e.pageX - this.document.scrollLeft() < a.scrollSensitivity ? r = this.document.scrollLeft(this.document.scrollLeft() - a.scrollSpeed) : this.window.width() - (e.pageX - this.document.scrollLeft()) < a.scrollSensitivity && (r = this.document.scrollLeft(this.document.scrollLeft() + a.scrollSpeed))), r !== !1 && t.ui.ddmanager && !a.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e)), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), i = this.items.length - 1; i >= 0; i--) {
        if (s = this.items[i], n = s.item[0], o = this._intersectsWithPointer(s), o && s.instance === this.currentContainer && n !== this.currentItem[0] && this.placeholder[1 === o ? "next" : "prev"]()[0] !== n && !t.contains(this.placeholder[0], n) && ("semi-dynamic" === this.options.type ? !t.contains(this.element[0], n) : !0)) {
          if (this.direction = 1 === o ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(s)) break;this._rearrange(e, s), this._trigger("change", e, this._uiHash());break;
        }
      }return this._contactContainers(e), t.ui.ddmanager && t.ui.ddmanager.drag(this, e), this._trigger("sort", e, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1;
    }, _mouseStop: function _mouseStop(e, i) {
      if (e) {
        if (t.ui.ddmanager && !this.options.dropBehaviour && t.ui.ddmanager.drop(this, e), this.options.revert) {
          var s = this,
              n = this.placeholder.offset(),
              o = this.options.axis,
              a = {};o && "x" !== o || (a.left = n.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollLeft)), o && "y" !== o || (a.top = n.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollTop)), this.reverting = !0, t(this.helper).animate(a, parseInt(this.options.revert, 10) || 500, function () {
            s._clear(e);
          });
        } else this._clear(e, i);return !1;
      }
    }, cancel: function cancel() {
      if (this.dragging) {
        this._mouseUp(new t.Event("mouseup", { target: null })), "original" === this.options.helper ? (this.currentItem.css(this._storedCSS), this._removeClass(this.currentItem, "ui-sortable-helper")) : this.currentItem.show();for (var e = this.containers.length - 1; e >= 0; e--) {
          this.containers[e]._trigger("deactivate", null, this._uiHash(this)), this.containers[e].containerCache.over && (this.containers[e]._trigger("out", null, this._uiHash(this)), this.containers[e].containerCache.over = 0);
        }
      }return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), t.extend(this, { helper: null, dragging: !1, reverting: !1, _noFinalSort: null }), this.domPosition.prev ? t(this.domPosition.prev).after(this.currentItem) : t(this.domPosition.parent).prepend(this.currentItem)), this;
    }, serialize: function serialize(e) {
      var i = this._getItemsAsjQuery(e && e.connected),
          s = [];return e = e || {}, t(i).each(function () {
        var i = (t(e.item || this).attr(e.attribute || "id") || "").match(e.expression || /(.+)[\-=_](.+)/);i && s.push((e.key || i[1] + "[]") + "=" + (e.key && e.expression ? i[1] : i[2]));
      }), !s.length && e.key && s.push(e.key + "="), s.join("&");
    }, toArray: function toArray(e) {
      var i = this._getItemsAsjQuery(e && e.connected),
          s = [];return e = e || {}, i.each(function () {
        s.push(t(e.item || this).attr(e.attribute || "id") || "");
      }), s;
    }, _intersectsWith: function _intersectsWith(t) {
      var e = this.positionAbs.left,
          i = e + this.helperProportions.width,
          s = this.positionAbs.top,
          n = s + this.helperProportions.height,
          o = t.left,
          a = o + t.width,
          r = t.top,
          h = r + t.height,
          l = this.offset.click.top,
          c = this.offset.click.left,
          u = "x" === this.options.axis || s + l > r && h > s + l,
          d = "y" === this.options.axis || e + c > o && a > e + c,
          p = u && d;return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > t[this.floating ? "width" : "height"] ? p : e + this.helperProportions.width / 2 > o && a > i - this.helperProportions.width / 2 && s + this.helperProportions.height / 2 > r && h > n - this.helperProportions.height / 2;
    }, _intersectsWithPointer: function _intersectsWithPointer(t) {
      var e,
          i,
          s = "x" === this.options.axis || this._isOverAxis(this.positionAbs.top + this.offset.click.top, t.top, t.height),
          n = "y" === this.options.axis || this._isOverAxis(this.positionAbs.left + this.offset.click.left, t.left, t.width),
          o = s && n;return o ? (e = this._getDragVerticalDirection(), i = this._getDragHorizontalDirection(), this.floating ? "right" === i || "down" === e ? 2 : 1 : e && ("down" === e ? 2 : 1)) : !1;
    }, _intersectsWithSides: function _intersectsWithSides(t) {
      var e = this._isOverAxis(this.positionAbs.top + this.offset.click.top, t.top + t.height / 2, t.height),
          i = this._isOverAxis(this.positionAbs.left + this.offset.click.left, t.left + t.width / 2, t.width),
          s = this._getDragVerticalDirection(),
          n = this._getDragHorizontalDirection();return this.floating && n ? "right" === n && i || "left" === n && !i : s && ("down" === s && e || "up" === s && !e);
    }, _getDragVerticalDirection: function _getDragVerticalDirection() {
      var t = this.positionAbs.top - this.lastPositionAbs.top;return 0 !== t && (t > 0 ? "down" : "up");
    }, _getDragHorizontalDirection: function _getDragHorizontalDirection() {
      var t = this.positionAbs.left - this.lastPositionAbs.left;return 0 !== t && (t > 0 ? "right" : "left");
    }, refresh: function refresh(t) {
      return this._refreshItems(t), this._setHandleClassName(), this.refreshPositions(), this;
    }, _connectWith: function _connectWith() {
      var t = this.options;return t.connectWith.constructor === String ? [t.connectWith] : t.connectWith;
    }, _getItemsAsjQuery: function _getItemsAsjQuery(e) {
      function i() {
        r.push(this);
      }var s,
          n,
          o,
          a,
          r = [],
          h = [],
          l = this._connectWith();if (l && e) for (s = l.length - 1; s >= 0; s--) {
        for (o = t(l[s], this.document[0]), n = o.length - 1; n >= 0; n--) {
          a = t.data(o[n], this.widgetFullName), a && a !== this && !a.options.disabled && h.push([t.isFunction(a.options.items) ? a.options.items.call(a.element) : t(a.options.items, a.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), a]);
        }
      }for (h.push([t.isFunction(this.options.items) ? this.options.items.call(this.element, null, { options: this.options, item: this.currentItem }) : t(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), s = h.length - 1; s >= 0; s--) {
        h[s][0].each(i);
      }return t(r);
    }, _removeCurrentsFromItems: function _removeCurrentsFromItems() {
      var e = this.currentItem.find(":data(" + this.widgetName + "-item)");this.items = t.grep(this.items, function (t) {
        for (var i = 0; e.length > i; i++) {
          if (e[i] === t.item[0]) return !1;
        }return !0;
      });
    }, _refreshItems: function _refreshItems(e) {
      this.items = [], this.containers = [this];var i,
          s,
          n,
          o,
          a,
          r,
          h,
          l,
          c = this.items,
          u = [[t.isFunction(this.options.items) ? this.options.items.call(this.element[0], e, { item: this.currentItem }) : t(this.options.items, this.element), this]],
          d = this._connectWith();if (d && this.ready) for (i = d.length - 1; i >= 0; i--) {
        for (n = t(d[i], this.document[0]), s = n.length - 1; s >= 0; s--) {
          o = t.data(n[s], this.widgetFullName), o && o !== this && !o.options.disabled && (u.push([t.isFunction(o.options.items) ? o.options.items.call(o.element[0], e, { item: this.currentItem }) : t(o.options.items, o.element), o]), this.containers.push(o));
        }
      }for (i = u.length - 1; i >= 0; i--) {
        for (a = u[i][1], r = u[i][0], s = 0, l = r.length; l > s; s++) {
          h = t(r[s]), h.data(this.widgetName + "-item", a), c.push({ item: h, instance: a, width: 0, height: 0, left: 0, top: 0 });
        }
      }
    }, refreshPositions: function refreshPositions(e) {
      this.floating = this.items.length ? "x" === this.options.axis || this._isFloating(this.items[0].item) : !1, this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());var i, s, n, o;for (i = this.items.length - 1; i >= 0; i--) {
        s = this.items[i], s.instance !== this.currentContainer && this.currentContainer && s.item[0] !== this.currentItem[0] || (n = this.options.toleranceElement ? t(this.options.toleranceElement, s.item) : s.item, e || (s.width = n.outerWidth(), s.height = n.outerHeight()), o = n.offset(), s.left = o.left, s.top = o.top);
      }if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);else for (i = this.containers.length - 1; i >= 0; i--) {
        o = this.containers[i].element.offset(), this.containers[i].containerCache.left = o.left, this.containers[i].containerCache.top = o.top, this.containers[i].containerCache.width = this.containers[i].element.outerWidth(), this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
      }return this;
    }, _createPlaceholder: function _createPlaceholder(e) {
      e = e || this;var i,
          s = e.options;s.placeholder && s.placeholder.constructor !== String || (i = s.placeholder, s.placeholder = { element: function element() {
          var s = e.currentItem[0].nodeName.toLowerCase(),
              n = t("<" + s + ">", e.document[0]);return e._addClass(n, "ui-sortable-placeholder", i || e.currentItem[0].className)._removeClass(n, "ui-sortable-helper"), "tbody" === s ? e._createTrPlaceholder(e.currentItem.find("tr").eq(0), t("<tr>", e.document[0]).appendTo(n)) : "tr" === s ? e._createTrPlaceholder(e.currentItem, n) : "img" === s && n.attr("src", e.currentItem.attr("src")), i || n.css("visibility", "hidden"), n;
        }, update: function update(t, n) {
          (!i || s.forcePlaceholderSize) && (n.height() || n.height(e.currentItem.innerHeight() - parseInt(e.currentItem.css("paddingTop") || 0, 10) - parseInt(e.currentItem.css("paddingBottom") || 0, 10)), n.width() || n.width(e.currentItem.innerWidth() - parseInt(e.currentItem.css("paddingLeft") || 0, 10) - parseInt(e.currentItem.css("paddingRight") || 0, 10)));
        } }), e.placeholder = t(s.placeholder.element.call(e.element, e.currentItem)), e.currentItem.after(e.placeholder), s.placeholder.update(e, e.placeholder);
    }, _createTrPlaceholder: function _createTrPlaceholder(e, i) {
      var s = this;e.children().each(function () {
        t("<td>&#160;</td>", s.document[0]).attr("colspan", t(this).attr("colspan") || 1).appendTo(i);
      });
    }, _contactContainers: function _contactContainers(e) {
      var i,
          s,
          n,
          o,
          a,
          r,
          h,
          l,
          c,
          u,
          d = null,
          p = null;for (i = this.containers.length - 1; i >= 0; i--) {
        if (!t.contains(this.currentItem[0], this.containers[i].element[0])) if (this._intersectsWith(this.containers[i].containerCache)) {
          if (d && t.contains(this.containers[i].element[0], d.element[0])) continue;d = this.containers[i], p = i;
        } else this.containers[i].containerCache.over && (this.containers[i]._trigger("out", e, this._uiHash(this)), this.containers[i].containerCache.over = 0);
      }if (d) if (1 === this.containers.length) this.containers[p].containerCache.over || (this.containers[p]._trigger("over", e, this._uiHash(this)), this.containers[p].containerCache.over = 1);else {
        for (n = 1e4, o = null, c = d.floating || this._isFloating(this.currentItem), a = c ? "left" : "top", r = c ? "width" : "height", u = c ? "pageX" : "pageY", s = this.items.length - 1; s >= 0; s--) {
          t.contains(this.containers[p].element[0], this.items[s].item[0]) && this.items[s].item[0] !== this.currentItem[0] && (h = this.items[s].item.offset()[a], l = !1, e[u] - h > this.items[s][r] / 2 && (l = !0), n > Math.abs(e[u] - h) && (n = Math.abs(e[u] - h), o = this.items[s], this.direction = l ? "up" : "down"));
        }if (!o && !this.options.dropOnEmpty) return;if (this.currentContainer === this.containers[p]) return this.currentContainer.containerCache.over || (this.containers[p]._trigger("over", e, this._uiHash()), this.currentContainer.containerCache.over = 1), void 0;o ? this._rearrange(e, o, null, !0) : this._rearrange(e, null, this.containers[p].element, !0), this._trigger("change", e, this._uiHash()), this.containers[p]._trigger("change", e, this._uiHash(this)), this.currentContainer = this.containers[p], this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[p]._trigger("over", e, this._uiHash(this)), this.containers[p].containerCache.over = 1;
      }
    }, _createHelper: function _createHelper(e) {
      var i = this.options,
          s = t.isFunction(i.helper) ? t(i.helper.apply(this.element[0], [e, this.currentItem])) : "clone" === i.helper ? this.currentItem.clone() : this.currentItem;return s.parents("body").length || t("parent" !== i.appendTo ? i.appendTo : this.currentItem[0].parentNode)[0].appendChild(s[0]), s[0] === this.currentItem[0] && (this._storedCSS = { width: this.currentItem[0].style.width, height: this.currentItem[0].style.height, position: this.currentItem.css("position"), top: this.currentItem.css("top"), left: this.currentItem.css("left") }), (!s[0].style.width || i.forceHelperSize) && s.width(this.currentItem.width()), (!s[0].style.height || i.forceHelperSize) && s.height(this.currentItem.height()), s;
    }, _adjustOffsetFromHelper: function _adjustOffsetFromHelper(e) {
      "string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = { left: +e[0], top: +e[1] || 0 }), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top);
    }, _getParentOffset: function _getParentOffset() {
      this.offsetParent = this.helper.offsetParent();var e = this.offsetParent.offset();return "absolute" === this.cssPosition && this.scrollParent[0] !== this.document[0] && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === this.document[0].body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && t.ui.ie) && (e = { top: 0, left: 0 }), { top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0), left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0) };
    }, _getRelativeOffset: function _getRelativeOffset() {
      if ("relative" === this.cssPosition) {
        var t = this.currentItem.position();return { top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(), left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft() };
      }return { top: 0, left: 0 };
    }, _cacheMargins: function _cacheMargins() {
      this.margins = { left: parseInt(this.currentItem.css("marginLeft"), 10) || 0, top: parseInt(this.currentItem.css("marginTop"), 10) || 0 };
    }, _cacheHelperProportions: function _cacheHelperProportions() {
      this.helperProportions = { width: this.helper.outerWidth(), height: this.helper.outerHeight() };
    }, _setContainment: function _setContainment() {
      var e,
          i,
          s,
          n = this.options;"parent" === n.containment && (n.containment = this.helper[0].parentNode), ("document" === n.containment || "window" === n.containment) && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, "document" === n.containment ? this.document.width() : this.window.width() - this.helperProportions.width - this.margins.left, ("document" === n.containment ? this.document.height() || document.body.parentNode.scrollHeight : this.window.height() || this.document[0].body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(n.containment) || (e = t(n.containment)[0], i = t(n.containment).offset(), s = "hidden" !== t(e).css("overflow"), this.containment = [i.left + (parseInt(t(e).css("borderLeftWidth"), 10) || 0) + (parseInt(t(e).css("paddingLeft"), 10) || 0) - this.margins.left, i.top + (parseInt(t(e).css("borderTopWidth"), 10) || 0) + (parseInt(t(e).css("paddingTop"), 10) || 0) - this.margins.top, i.left + (s ? Math.max(e.scrollWidth, e.offsetWidth) : e.offsetWidth) - (parseInt(t(e).css("borderLeftWidth"), 10) || 0) - (parseInt(t(e).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, i.top + (s ? Math.max(e.scrollHeight, e.offsetHeight) : e.offsetHeight) - (parseInt(t(e).css("borderTopWidth"), 10) || 0) - (parseInt(t(e).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]);
    }, _convertPositionTo: function _convertPositionTo(e, i) {
      i || (i = this.position);var s = "absolute" === e ? 1 : -1,
          n = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
          o = /(html|body)/i.test(n[0].tagName);return { top: i.top + this.offset.relative.top * s + this.offset.parent.top * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : o ? 0 : n.scrollTop()) * s, left: i.left + this.offset.relative.left * s + this.offset.parent.left * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : o ? 0 : n.scrollLeft()) * s };
    }, _generatePosition: function _generatePosition(e) {
      var i,
          s,
          n = this.options,
          o = e.pageX,
          a = e.pageY,
          r = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
          h = /(html|body)/i.test(r[0].tagName);return "relative" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (e.pageX - this.offset.click.left < this.containment[0] && (o = this.containment[0] + this.offset.click.left), e.pageY - this.offset.click.top < this.containment[1] && (a = this.containment[1] + this.offset.click.top), e.pageX - this.offset.click.left > this.containment[2] && (o = this.containment[2] + this.offset.click.left), e.pageY - this.offset.click.top > this.containment[3] && (a = this.containment[3] + this.offset.click.top)), n.grid && (i = this.originalPageY + Math.round((a - this.originalPageY) / n.grid[1]) * n.grid[1], a = this.containment ? i - this.offset.click.top >= this.containment[1] && i - this.offset.click.top <= this.containment[3] ? i : i - this.offset.click.top >= this.containment[1] ? i - n.grid[1] : i + n.grid[1] : i, s = this.originalPageX + Math.round((o - this.originalPageX) / n.grid[0]) * n.grid[0], o = this.containment ? s - this.offset.click.left >= this.containment[0] && s - this.offset.click.left <= this.containment[2] ? s : s - this.offset.click.left >= this.containment[0] ? s - n.grid[0] : s + n.grid[0] : s)), { top: a - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : h ? 0 : r.scrollTop()), left: o - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : h ? 0 : r.scrollLeft()) };
    }, _rearrange: function _rearrange(t, e, i, s) {
      i ? i[0].appendChild(this.placeholder[0]) : e.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? e.item[0] : e.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;var n = this.counter;this._delay(function () {
        n === this.counter && this.refreshPositions(!s);
      });
    }, _clear: function _clear(t, e) {
      function i(t, e, i) {
        return function (s) {
          i._trigger(t, s, e._uiHash(e));
        };
      }this.reverting = !1;var s,
          n = [];if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
        for (s in this._storedCSS) {
          ("auto" === this._storedCSS[s] || "static" === this._storedCSS[s]) && (this._storedCSS[s] = "");
        }this.currentItem.css(this._storedCSS), this._removeClass(this.currentItem, "ui-sortable-helper");
      } else this.currentItem.show();for (this.fromOutside && !e && n.push(function (t) {
        this._trigger("receive", t, this._uiHash(this.fromOutside));
      }), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || e || n.push(function (t) {
        this._trigger("update", t, this._uiHash());
      }), this !== this.currentContainer && (e || (n.push(function (t) {
        this._trigger("remove", t, this._uiHash());
      }), n.push(function (t) {
        return function (e) {
          t._trigger("receive", e, this._uiHash(this));
        };
      }.call(this, this.currentContainer)), n.push(function (t) {
        return function (e) {
          t._trigger("update", e, this._uiHash(this));
        };
      }.call(this, this.currentContainer)))), s = this.containers.length - 1; s >= 0; s--) {
        e || n.push(i("deactivate", this, this.containers[s])), this.containers[s].containerCache.over && (n.push(i("out", this, this.containers[s])), this.containers[s].containerCache.over = 0);
      }if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, e || this._trigger("beforeStop", t, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.cancelHelperRemoval || (this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null), !e) {
        for (s = 0; n.length > s; s++) {
          n[s].call(this, t);
        }this._trigger("stop", t, this._uiHash());
      }return this.fromOutside = !1, !this.cancelHelperRemoval;
    }, _trigger: function _trigger() {
      t.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel();
    }, _uiHash: function _uiHash(e) {
      var i = e || this;return { helper: i.helper, placeholder: i.placeholder || t([]), position: i.position, originalPosition: i.originalPosition, offset: i.positionAbs, item: i.currentItem, sender: e ? e.element : null };
    } }), t.widget("ui.accordion", { version: "1.12.1", options: { active: 0, animate: {}, classes: { "ui-accordion-header": "ui-corner-top", "ui-accordion-header-collapsed": "ui-corner-all", "ui-accordion-content": "ui-corner-bottom" }, collapsible: !1, event: "click", header: "> li > :first-child, > :not(li):even", heightStyle: "auto", icons: { activeHeader: "ui-icon-triangle-1-s", header: "ui-icon-triangle-1-e" }, activate: null, beforeActivate: null }, hideProps: { borderTopWidth: "hide", borderBottomWidth: "hide", paddingTop: "hide", paddingBottom: "hide", height: "hide" }, showProps: { borderTopWidth: "show", borderBottomWidth: "show", paddingTop: "show", paddingBottom: "show", height: "show" }, _create: function _create() {
      var e = this.options;this.prevShow = this.prevHide = t(), this._addClass("ui-accordion", "ui-widget ui-helper-reset"), this.element.attr("role", "tablist"), e.collapsible || e.active !== !1 && null != e.active || (e.active = 0), this._processPanels(), 0 > e.active && (e.active += this.headers.length), this._refresh();
    }, _getCreateEventData: function _getCreateEventData() {
      return { header: this.active, panel: this.active.length ? this.active.next() : t() };
    }, _createIcons: function _createIcons() {
      var e,
          i,
          s = this.options.icons;s && (e = t("<span>"), this._addClass(e, "ui-accordion-header-icon", "ui-icon " + s.header), e.prependTo(this.headers), i = this.active.children(".ui-accordion-header-icon"), this._removeClass(i, s.header)._addClass(i, null, s.activeHeader)._addClass(this.headers, "ui-accordion-icons"));
    }, _destroyIcons: function _destroyIcons() {
      this._removeClass(this.headers, "ui-accordion-icons"), this.headers.children(".ui-accordion-header-icon").remove();
    }, _destroy: function _destroy() {
      var t;this.element.removeAttr("role"), this.headers.removeAttr("role aria-expanded aria-selected aria-controls tabIndex").removeUniqueId(), this._destroyIcons(), t = this.headers.next().css("display", "").removeAttr("role aria-hidden aria-labelledby").removeUniqueId(), "content" !== this.options.heightStyle && t.css("height", "");
    }, _setOption: function _setOption(t, e) {
      return "active" === t ? (this._activate(e), void 0) : ("event" === t && (this.options.event && this._off(this.headers, this.options.event), this._setupEvents(e)), this._super(t, e), "collapsible" !== t || e || this.options.active !== !1 || this._activate(0), "icons" === t && (this._destroyIcons(), e && this._createIcons()), void 0);
    }, _setOptionDisabled: function _setOptionDisabled(t) {
      this._super(t), this.element.attr("aria-disabled", t), this._toggleClass(null, "ui-state-disabled", !!t), this._toggleClass(this.headers.add(this.headers.next()), null, "ui-state-disabled", !!t);
    }, _keydown: function _keydown(e) {
      if (!e.altKey && !e.ctrlKey) {
        var i = t.ui.keyCode,
            s = this.headers.length,
            n = this.headers.index(e.target),
            o = !1;switch (e.keyCode) {case i.RIGHT:case i.DOWN:
            o = this.headers[(n + 1) % s];break;case i.LEFT:case i.UP:
            o = this.headers[(n - 1 + s) % s];break;case i.SPACE:case i.ENTER:
            this._eventHandler(e);break;case i.HOME:
            o = this.headers[0];break;case i.END:
            o = this.headers[s - 1];}o && (t(e.target).attr("tabIndex", -1), t(o).attr("tabIndex", 0), t(o).trigger("focus"), e.preventDefault());
      }
    }, _panelKeyDown: function _panelKeyDown(e) {
      e.keyCode === t.ui.keyCode.UP && e.ctrlKey && t(e.currentTarget).prev().trigger("focus");
    }, refresh: function refresh() {
      var e = this.options;this._processPanels(), e.active === !1 && e.collapsible === !0 || !this.headers.length ? (e.active = !1, this.active = t()) : e.active === !1 ? this._activate(0) : this.active.length && !t.contains(this.element[0], this.active[0]) ? this.headers.length === this.headers.find(".ui-state-disabled").length ? (e.active = !1, this.active = t()) : this._activate(Math.max(0, e.active - 1)) : e.active = this.headers.index(this.active), this._destroyIcons(), this._refresh();
    }, _processPanels: function _processPanels() {
      var t = this.headers,
          e = this.panels;this.headers = this.element.find(this.options.header), this._addClass(this.headers, "ui-accordion-header ui-accordion-header-collapsed", "ui-state-default"), this.panels = this.headers.next().filter(":not(.ui-accordion-content-active)").hide(), this._addClass(this.panels, "ui-accordion-content", "ui-helper-reset ui-widget-content"), e && (this._off(t.not(this.headers)), this._off(e.not(this.panels)));
    }, _refresh: function _refresh() {
      var e,
          i = this.options,
          s = i.heightStyle,
          n = this.element.parent();this.active = this._findActive(i.active), this._addClass(this.active, "ui-accordion-header-active", "ui-state-active")._removeClass(this.active, "ui-accordion-header-collapsed"), this._addClass(this.active.next(), "ui-accordion-content-active"), this.active.next().show(), this.headers.attr("role", "tab").each(function () {
        var e = t(this),
            i = e.uniqueId().attr("id"),
            s = e.next(),
            n = s.uniqueId().attr("id");e.attr("aria-controls", n), s.attr("aria-labelledby", i);
      }).next().attr("role", "tabpanel"), this.headers.not(this.active).attr({ "aria-selected": "false", "aria-expanded": "false", tabIndex: -1 }).next().attr({ "aria-hidden": "true" }).hide(), this.active.length ? this.active.attr({ "aria-selected": "true", "aria-expanded": "true", tabIndex: 0 }).next().attr({ "aria-hidden": "false" }) : this.headers.eq(0).attr("tabIndex", 0), this._createIcons(), this._setupEvents(i.event), "fill" === s ? (e = n.height(), this.element.siblings(":visible").each(function () {
        var i = t(this),
            s = i.css("position");"absolute" !== s && "fixed" !== s && (e -= i.outerHeight(!0));
      }), this.headers.each(function () {
        e -= t(this).outerHeight(!0);
      }), this.headers.next().each(function () {
        t(this).height(Math.max(0, e - t(this).innerHeight() + t(this).height()));
      }).css("overflow", "auto")) : "auto" === s && (e = 0, this.headers.next().each(function () {
        var i = t(this).is(":visible");i || t(this).show(), e = Math.max(e, t(this).css("height", "").height()), i || t(this).hide();
      }).height(e));
    }, _activate: function _activate(e) {
      var i = this._findActive(e)[0];i !== this.active[0] && (i = i || this.active[0], this._eventHandler({ target: i, currentTarget: i, preventDefault: t.noop }));
    }, _findActive: function _findActive(e) {
      return "number" == typeof e ? this.headers.eq(e) : t();
    }, _setupEvents: function _setupEvents(e) {
      var i = { keydown: "_keydown" };e && t.each(e.split(" "), function (t, e) {
        i[e] = "_eventHandler";
      }), this._off(this.headers.add(this.headers.next())), this._on(this.headers, i), this._on(this.headers.next(), { keydown: "_panelKeyDown" }), this._hoverable(this.headers), this._focusable(this.headers);
    }, _eventHandler: function _eventHandler(e) {
      var i,
          s,
          n = this.options,
          o = this.active,
          a = t(e.currentTarget),
          r = a[0] === o[0],
          h = r && n.collapsible,
          l = h ? t() : a.next(),
          c = o.next(),
          u = { oldHeader: o, oldPanel: c, newHeader: h ? t() : a, newPanel: l };e.preventDefault(), r && !n.collapsible || this._trigger("beforeActivate", e, u) === !1 || (n.active = h ? !1 : this.headers.index(a), this.active = r ? t() : a, this._toggle(u), this._removeClass(o, "ui-accordion-header-active", "ui-state-active"), n.icons && (i = o.children(".ui-accordion-header-icon"), this._removeClass(i, null, n.icons.activeHeader)._addClass(i, null, n.icons.header)), r || (this._removeClass(a, "ui-accordion-header-collapsed")._addClass(a, "ui-accordion-header-active", "ui-state-active"), n.icons && (s = a.children(".ui-accordion-header-icon"), this._removeClass(s, null, n.icons.header)._addClass(s, null, n.icons.activeHeader)), this._addClass(a.next(), "ui-accordion-content-active")));
    }, _toggle: function _toggle(e) {
      var i = e.newPanel,
          s = this.prevShow.length ? this.prevShow : e.oldPanel;this.prevShow.add(this.prevHide).stop(!0, !0), this.prevShow = i, this.prevHide = s, this.options.animate ? this._animate(i, s, e) : (s.hide(), i.show(), this._toggleComplete(e)), s.attr({ "aria-hidden": "true" }), s.prev().attr({ "aria-selected": "false", "aria-expanded": "false" }), i.length && s.length ? s.prev().attr({ tabIndex: -1, "aria-expanded": "false" }) : i.length && this.headers.filter(function () {
        return 0 === parseInt(t(this).attr("tabIndex"), 10);
      }).attr("tabIndex", -1), i.attr("aria-hidden", "false").prev().attr({ "aria-selected": "true", "aria-expanded": "true", tabIndex: 0 });
    }, _animate: function _animate(t, e, i) {
      var s,
          n,
          o,
          a = this,
          r = 0,
          h = t.css("box-sizing"),
          l = t.length && (!e.length || t.index() < e.index()),
          c = this.options.animate || {},
          u = l && c.down || c,
          d = function d() {
        a._toggleComplete(i);
      };return "number" == typeof u && (o = u), "string" == typeof u && (n = u), n = n || u.easing || c.easing, o = o || u.duration || c.duration, e.length ? t.length ? (s = t.show().outerHeight(), e.animate(this.hideProps, { duration: o, easing: n, step: function step(t, e) {
          e.now = Math.round(t);
        } }), t.hide().animate(this.showProps, { duration: o, easing: n, complete: d, step: function step(t, i) {
          i.now = Math.round(t), "height" !== i.prop ? "content-box" === h && (r += i.now) : "content" !== a.options.heightStyle && (i.now = Math.round(s - e.outerHeight() - r), r = 0);
        } }), void 0) : e.animate(this.hideProps, o, n, d) : t.animate(this.showProps, o, n, d);
    }, _toggleComplete: function _toggleComplete(t) {
      var e = t.oldPanel,
          i = e.prev();this._removeClass(e, "ui-accordion-content-active"), this._removeClass(i, "ui-accordion-header-active")._addClass(i, "ui-accordion-header-collapsed"), e.length && (e.parent()[0].className = e.parent()[0].className), this._trigger("activate", null, t);
    } }), t.widget("ui.menu", { version: "1.12.1", defaultElement: "<ul>", delay: 300, options: { icons: { submenu: "ui-icon-caret-1-e" }, items: "> *", menus: "ul", position: { my: "left top", at: "right top" }, role: "menu", blur: null, focus: null, select: null }, _create: function _create() {
      this.activeMenu = this.element, this.mouseHandled = !1, this.element.uniqueId().attr({ role: this.options.role, tabIndex: 0 }), this._addClass("ui-menu", "ui-widget ui-widget-content"), this._on({ "mousedown .ui-menu-item": function mousedownUiMenuItem(t) {
          t.preventDefault();
        }, "click .ui-menu-item": function clickUiMenuItem(e) {
          var i = t(e.target),
              s = t(t.ui.safeActiveElement(this.document[0]));!this.mouseHandled && i.not(".ui-state-disabled").length && (this.select(e), e.isPropagationStopped() || (this.mouseHandled = !0), i.has(".ui-menu").length ? this.expand(e) : !this.element.is(":focus") && s.closest(".ui-menu").length && (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)));
        }, "mouseenter .ui-menu-item": function mouseenterUiMenuItem(e) {
          if (!this.previousFilter) {
            var i = t(e.target).closest(".ui-menu-item"),
                s = t(e.currentTarget);i[0] === s[0] && (this._removeClass(s.siblings().children(".ui-state-active"), null, "ui-state-active"), this.focus(e, s));
          }
        }, mouseleave: "collapseAll", "mouseleave .ui-menu": "collapseAll", focus: function focus(t, e) {
          var i = this.active || this.element.find(this.options.items).eq(0);e || this.focus(t, i);
        }, blur: function blur(e) {
          this._delay(function () {
            var i = !t.contains(this.element[0], t.ui.safeActiveElement(this.document[0]));i && this.collapseAll(e);
          });
        }, keydown: "_keydown" }), this.refresh(), this._on(this.document, { click: function click(t) {
          this._closeOnDocumentClick(t) && this.collapseAll(t), this.mouseHandled = !1;
        } });
    }, _destroy: function _destroy() {
      var e = this.element.find(".ui-menu-item").removeAttr("role aria-disabled"),
          i = e.children(".ui-menu-item-wrapper").removeUniqueId().removeAttr("tabIndex role aria-haspopup");this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeAttr("role aria-labelledby aria-expanded aria-hidden aria-disabled tabIndex").removeUniqueId().show(), i.children().each(function () {
        var e = t(this);e.data("ui-menu-submenu-caret") && e.remove();
      });
    }, _keydown: function _keydown(e) {
      var i,
          s,
          n,
          o,
          a = !0;switch (e.keyCode) {case t.ui.keyCode.PAGE_UP:
          this.previousPage(e);break;case t.ui.keyCode.PAGE_DOWN:
          this.nextPage(e);break;case t.ui.keyCode.HOME:
          this._move("first", "first", e);break;case t.ui.keyCode.END:
          this._move("last", "last", e);break;case t.ui.keyCode.UP:
          this.previous(e);break;case t.ui.keyCode.DOWN:
          this.next(e);break;case t.ui.keyCode.LEFT:
          this.collapse(e);break;case t.ui.keyCode.RIGHT:
          this.active && !this.active.is(".ui-state-disabled") && this.expand(e);break;case t.ui.keyCode.ENTER:case t.ui.keyCode.SPACE:
          this._activate(e);break;case t.ui.keyCode.ESCAPE:
          this.collapse(e);break;default:
          a = !1, s = this.previousFilter || "", o = !1, n = e.keyCode >= 96 && 105 >= e.keyCode ? "" + (e.keyCode - 96) : String.fromCharCode(e.keyCode), clearTimeout(this.filterTimer), n === s ? o = !0 : n = s + n, i = this._filterMenuItems(n), i = o && -1 !== i.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : i, i.length || (n = String.fromCharCode(e.keyCode), i = this._filterMenuItems(n)), i.length ? (this.focus(e, i), this.previousFilter = n, this.filterTimer = this._delay(function () {
            delete this.previousFilter;
          }, 1e3)) : delete this.previousFilter;}a && e.preventDefault();
    }, _activate: function _activate(t) {
      this.active && !this.active.is(".ui-state-disabled") && (this.active.children("[aria-haspopup='true']").length ? this.expand(t) : this.select(t));
    }, refresh: function refresh() {
      var e,
          i,
          s,
          n,
          o,
          a = this,
          r = this.options.icons.submenu,
          h = this.element.find(this.options.menus);this._toggleClass("ui-menu-icons", null, !!this.element.find(".ui-icon").length), s = h.filter(":not(.ui-menu)").hide().attr({ role: this.options.role, "aria-hidden": "true", "aria-expanded": "false" }).each(function () {
        var e = t(this),
            i = e.prev(),
            s = t("<span>").data("ui-menu-submenu-caret", !0);a._addClass(s, "ui-menu-icon", "ui-icon " + r), i.attr("aria-haspopup", "true").prepend(s), e.attr("aria-labelledby", i.attr("id"));
      }), this._addClass(s, "ui-menu", "ui-widget ui-widget-content ui-front"), e = h.add(this.element), i = e.find(this.options.items), i.not(".ui-menu-item").each(function () {
        var e = t(this);a._isDivider(e) && a._addClass(e, "ui-menu-divider", "ui-widget-content");
      }), n = i.not(".ui-menu-item, .ui-menu-divider"), o = n.children().not(".ui-menu").uniqueId().attr({ tabIndex: -1, role: this._itemRole() }), this._addClass(n, "ui-menu-item")._addClass(o, "ui-menu-item-wrapper"), i.filter(".ui-state-disabled").attr("aria-disabled", "true"), this.active && !t.contains(this.element[0], this.active[0]) && this.blur();
    }, _itemRole: function _itemRole() {
      return { menu: "menuitem", listbox: "option" }[this.options.role];
    }, _setOption: function _setOption(t, e) {
      if ("icons" === t) {
        var i = this.element.find(".ui-menu-icon");this._removeClass(i, null, this.options.icons.submenu)._addClass(i, null, e.submenu);
      }this._super(t, e);
    }, _setOptionDisabled: function _setOptionDisabled(t) {
      this._super(t), this.element.attr("aria-disabled", t + ""), this._toggleClass(null, "ui-state-disabled", !!t);
    }, focus: function focus(t, e) {
      var i, s, n;this.blur(t, t && "focus" === t.type), this._scrollIntoView(e), this.active = e.first(), s = this.active.children(".ui-menu-item-wrapper"), this._addClass(s, null, "ui-state-active"), this.options.role && this.element.attr("aria-activedescendant", s.attr("id")), n = this.active.parent().closest(".ui-menu-item").children(".ui-menu-item-wrapper"), this._addClass(n, null, "ui-state-active"), t && "keydown" === t.type ? this._close() : this.timer = this._delay(function () {
        this._close();
      }, this.delay), i = e.children(".ui-menu"), i.length && t && /^mouse/.test(t.type) && this._startOpening(i), this.activeMenu = e.parent(), this._trigger("focus", t, { item: e });
    }, _scrollIntoView: function _scrollIntoView(e) {
      var i, s, n, o, a, r;this._hasScroll() && (i = parseFloat(t.css(this.activeMenu[0], "borderTopWidth")) || 0, s = parseFloat(t.css(this.activeMenu[0], "paddingTop")) || 0, n = e.offset().top - this.activeMenu.offset().top - i - s, o = this.activeMenu.scrollTop(), a = this.activeMenu.height(), r = e.outerHeight(), 0 > n ? this.activeMenu.scrollTop(o + n) : n + r > a && this.activeMenu.scrollTop(o + n - a + r));
    }, blur: function blur(t, e) {
      e || clearTimeout(this.timer), this.active && (this._removeClass(this.active.children(".ui-menu-item-wrapper"), null, "ui-state-active"), this._trigger("blur", t, { item: this.active }), this.active = null);
    }, _startOpening: function _startOpening(t) {
      clearTimeout(this.timer), "true" === t.attr("aria-hidden") && (this.timer = this._delay(function () {
        this._close(), this._open(t);
      }, this.delay));
    }, _open: function _open(e) {
      var i = t.extend({ of: this.active }, this.options.position);clearTimeout(this.timer), this.element.find(".ui-menu").not(e.parents(".ui-menu")).hide().attr("aria-hidden", "true"), e.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(i);
    }, collapseAll: function collapseAll(e, i) {
      clearTimeout(this.timer), this.timer = this._delay(function () {
        var s = i ? this.element : t(e && e.target).closest(this.element.find(".ui-menu"));s.length || (s = this.element), this._close(s), this.blur(e), this._removeClass(s.find(".ui-state-active"), null, "ui-state-active"), this.activeMenu = s;
      }, this.delay);
    }, _close: function _close(t) {
      t || (t = this.active ? this.active.parent() : this.element), t.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false");
    }, _closeOnDocumentClick: function _closeOnDocumentClick(e) {
      return !t(e.target).closest(".ui-menu").length;
    }, _isDivider: function _isDivider(t) {
      return !/[^\-\u2014\u2013\s]/.test(t.text());
    }, collapse: function collapse(t) {
      var e = this.active && this.active.parent().closest(".ui-menu-item", this.element);e && e.length && (this._close(), this.focus(t, e));
    }, expand: function expand(t) {
      var e = this.active && this.active.children(".ui-menu ").find(this.options.items).first();e && e.length && (this._open(e.parent()), this._delay(function () {
        this.focus(t, e);
      }));
    }, next: function next(t) {
      this._move("next", "first", t);
    }, previous: function previous(t) {
      this._move("prev", "last", t);
    }, isFirstItem: function isFirstItem() {
      return this.active && !this.active.prevAll(".ui-menu-item").length;
    }, isLastItem: function isLastItem() {
      return this.active && !this.active.nextAll(".ui-menu-item").length;
    }, _move: function _move(t, e, i) {
      var s;this.active && (s = "first" === t || "last" === t ? this.active["first" === t ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[t + "All"](".ui-menu-item").eq(0)), s && s.length && this.active || (s = this.activeMenu.find(this.options.items)[e]()), this.focus(i, s);
    }, nextPage: function nextPage(e) {
      var i, s, n;return this.active ? (this.isLastItem() || (this._hasScroll() ? (s = this.active.offset().top, n = this.element.height(), this.active.nextAll(".ui-menu-item").each(function () {
        return i = t(this), 0 > i.offset().top - s - n;
      }), this.focus(e, i)) : this.focus(e, this.activeMenu.find(this.options.items)[this.active ? "last" : "first"]())), void 0) : (this.next(e), void 0);
    }, previousPage: function previousPage(e) {
      var i, s, n;return this.active ? (this.isFirstItem() || (this._hasScroll() ? (s = this.active.offset().top, n = this.element.height(), this.active.prevAll(".ui-menu-item").each(function () {
        return i = t(this), i.offset().top - s + n > 0;
      }), this.focus(e, i)) : this.focus(e, this.activeMenu.find(this.options.items).first())), void 0) : (this.next(e), void 0);
    }, _hasScroll: function _hasScroll() {
      return this.element.outerHeight() < this.element.prop("scrollHeight");
    }, select: function select(e) {
      this.active = this.active || t(e.target).closest(".ui-menu-item");var i = { item: this.active };this.active.has(".ui-menu").length || this.collapseAll(e, !0), this._trigger("select", e, i);
    }, _filterMenuItems: function _filterMenuItems(e) {
      var i = e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"),
          s = RegExp("^" + i, "i");return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function () {
        return s.test(t.trim(t(this).children(".ui-menu-item-wrapper").text()));
      });
    } }), t.widget("ui.autocomplete", { version: "1.12.1", defaultElement: "<input>", options: { appendTo: null, autoFocus: !1, delay: 300, minLength: 1, position: { my: "left top", at: "left bottom", collision: "none" }, source: null, change: null, close: null, focus: null, open: null, response: null, search: null, select: null }, requestIndex: 0, pending: 0, _create: function _create() {
      var e,
          i,
          s,
          n = this.element[0].nodeName.toLowerCase(),
          o = "textarea" === n,
          a = "input" === n;this.isMultiLine = o || !a && this._isContentEditable(this.element), this.valueMethod = this.element[o || a ? "val" : "text"], this.isNewMenu = !0, this._addClass("ui-autocomplete-input"), this.element.attr("autocomplete", "off"), this._on(this.element, { keydown: function keydown(n) {
          if (this.element.prop("readOnly")) return e = !0, s = !0, i = !0, void 0;e = !1, s = !1, i = !1;var o = t.ui.keyCode;switch (n.keyCode) {case o.PAGE_UP:
              e = !0, this._move("previousPage", n);break;case o.PAGE_DOWN:
              e = !0, this._move("nextPage", n);break;case o.UP:
              e = !0, this._keyEvent("previous", n);break;case o.DOWN:
              e = !0, this._keyEvent("next", n);break;case o.ENTER:
              this.menu.active && (e = !0, n.preventDefault(), this.menu.select(n));break;case o.TAB:
              this.menu.active && this.menu.select(n);break;case o.ESCAPE:
              this.menu.element.is(":visible") && (this.isMultiLine || this._value(this.term), this.close(n), n.preventDefault());break;default:
              i = !0, this._searchTimeout(n);}
        }, keypress: function keypress(s) {
          if (e) return e = !1, (!this.isMultiLine || this.menu.element.is(":visible")) && s.preventDefault(), void 0;if (!i) {
            var n = t.ui.keyCode;switch (s.keyCode) {case n.PAGE_UP:
                this._move("previousPage", s);break;case n.PAGE_DOWN:
                this._move("nextPage", s);break;case n.UP:
                this._keyEvent("previous", s);break;case n.DOWN:
                this._keyEvent("next", s);}
          }
        }, input: function input(t) {
          return s ? (s = !1, t.preventDefault(), void 0) : (this._searchTimeout(t), void 0);
        }, focus: function focus() {
          this.selectedItem = null, this.previous = this._value();
        }, blur: function blur(t) {
          return this.cancelBlur ? (delete this.cancelBlur, void 0) : (clearTimeout(this.searching), this.close(t), this._change(t), void 0);
        } }), this._initSource(), this.menu = t("<ul>").appendTo(this._appendTo()).menu({ role: null }).hide().menu("instance"), this._addClass(this.menu.element, "ui-autocomplete", "ui-front"), this._on(this.menu.element, { mousedown: function mousedown(e) {
          e.preventDefault(), this.cancelBlur = !0, this._delay(function () {
            delete this.cancelBlur, this.element[0] !== t.ui.safeActiveElement(this.document[0]) && this.element.trigger("focus");
          });
        }, menufocus: function menufocus(e, i) {
          var s, n;return this.isNewMenu && (this.isNewMenu = !1, e.originalEvent && /^mouse/.test(e.originalEvent.type)) ? (this.menu.blur(), this.document.one("mousemove", function () {
            t(e.target).trigger(e.originalEvent);
          }), void 0) : (n = i.item.data("ui-autocomplete-item"), !1 !== this._trigger("focus", e, { item: n }) && e.originalEvent && /^key/.test(e.originalEvent.type) && this._value(n.value), s = i.item.attr("aria-label") || n.value, s && t.trim(s).length && (this.liveRegion.children().hide(), t("<div>").text(s).appendTo(this.liveRegion)), void 0);
        }, menuselect: function menuselect(e, i) {
          var s = i.item.data("ui-autocomplete-item"),
              n = this.previous;this.element[0] !== t.ui.safeActiveElement(this.document[0]) && (this.element.trigger("focus"), this.previous = n, this._delay(function () {
            this.previous = n, this.selectedItem = s;
          })), !1 !== this._trigger("select", e, { item: s }) && this._value(s.value), this.term = this._value(), this.close(e), this.selectedItem = s;
        } }), this.liveRegion = t("<div>", { role: "status", "aria-live": "assertive", "aria-relevant": "additions" }).appendTo(this.document[0].body), this._addClass(this.liveRegion, null, "ui-helper-hidden-accessible"), this._on(this.window, { beforeunload: function beforeunload() {
          this.element.removeAttr("autocomplete");
        } });
    }, _destroy: function _destroy() {
      clearTimeout(this.searching), this.element.removeAttr("autocomplete"), this.menu.element.remove(), this.liveRegion.remove();
    }, _setOption: function _setOption(t, e) {
      this._super(t, e), "source" === t && this._initSource(), "appendTo" === t && this.menu.element.appendTo(this._appendTo()), "disabled" === t && e && this.xhr && this.xhr.abort();
    }, _isEventTargetInWidget: function _isEventTargetInWidget(e) {
      var i = this.menu.element[0];return e.target === this.element[0] || e.target === i || t.contains(i, e.target);
    }, _closeOnClickOutside: function _closeOnClickOutside(t) {
      this._isEventTargetInWidget(t) || this.close();
    }, _appendTo: function _appendTo() {
      var e = this.options.appendTo;return e && (e = e.jquery || e.nodeType ? t(e) : this.document.find(e).eq(0)), e && e[0] || (e = this.element.closest(".ui-front, dialog")), e.length || (e = this.document[0].body), e;
    }, _initSource: function _initSource() {
      var e,
          i,
          s = this;t.isArray(this.options.source) ? (e = this.options.source, this.source = function (i, s) {
        s(t.ui.autocomplete.filter(e, i.term));
      }) : "string" == typeof this.options.source ? (i = this.options.source, this.source = function (e, n) {
        s.xhr && s.xhr.abort(), s.xhr = t.ajax({ url: i, data: e, dataType: "json", success: function success(t) {
            n(t);
          }, error: function error() {
            n([]);
          } });
      }) : this.source = this.options.source;
    }, _searchTimeout: function _searchTimeout(t) {
      clearTimeout(this.searching), this.searching = this._delay(function () {
        var e = this.term === this._value(),
            i = this.menu.element.is(":visible"),
            s = t.altKey || t.ctrlKey || t.metaKey || t.shiftKey;(!e || e && !i && !s) && (this.selectedItem = null, this.search(null, t));
      }, this.options.delay);
    }, search: function search(t, e) {
      return t = null != t ? t : this._value(), this.term = this._value(), t.length < this.options.minLength ? this.close(e) : this._trigger("search", e) !== !1 ? this._search(t) : void 0;
    }, _search: function _search(t) {
      this.pending++, this._addClass("ui-autocomplete-loading"), this.cancelSearch = !1, this.source({ term: t }, this._response());
    }, _response: function _response() {
      var e = ++this.requestIndex;return t.proxy(function (t) {
        e === this.requestIndex && this.__response(t), this.pending--, this.pending || this._removeClass("ui-autocomplete-loading");
      }, this);
    }, __response: function __response(t) {
      t && (t = this._normalize(t)), this._trigger("response", null, { content: t }), !this.options.disabled && t && t.length && !this.cancelSearch ? (this._suggest(t), this._trigger("open")) : this._close();
    }, close: function close(t) {
      this.cancelSearch = !0, this._close(t);
    }, _close: function _close(t) {
      this._off(this.document, "mousedown"), this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", t));
    }, _change: function _change(t) {
      this.previous !== this._value() && this._trigger("change", t, { item: this.selectedItem });
    }, _normalize: function _normalize(e) {
      return e.length && e[0].label && e[0].value ? e : t.map(e, function (e) {
        return "string" == typeof e ? { label: e, value: e } : t.extend({}, e, { label: e.label || e.value, value: e.value || e.label });
      });
    }, _suggest: function _suggest(e) {
      var i = this.menu.element.empty();this._renderMenu(i, e), this.isNewMenu = !0, this.menu.refresh(), i.show(), this._resizeMenu(), i.position(t.extend({ of: this.element }, this.options.position)), this.options.autoFocus && this.menu.next(), this._on(this.document, { mousedown: "_closeOnClickOutside" });
    }, _resizeMenu: function _resizeMenu() {
      var t = this.menu.element;t.outerWidth(Math.max(t.width("").outerWidth() + 1, this.element.outerWidth()));
    }, _renderMenu: function _renderMenu(e, i) {
      var s = this;t.each(i, function (t, i) {
        s._renderItemData(e, i);
      });
    }, _renderItemData: function _renderItemData(t, e) {
      return this._renderItem(t, e).data("ui-autocomplete-item", e);
    }, _renderItem: function _renderItem(e, i) {
      return t("<li>").append(t("<div>").text(i.label)).appendTo(e);
    }, _move: function _move(t, e) {
      return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(t) || this.menu.isLastItem() && /^next/.test(t) ? (this.isMultiLine || this._value(this.term), this.menu.blur(), void 0) : (this.menu[t](e), void 0) : (this.search(null, e), void 0);
    }, widget: function widget() {
      return this.menu.element;
    }, _value: function _value() {
      return this.valueMethod.apply(this.element, arguments);
    }, _keyEvent: function _keyEvent(t, e) {
      (!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(t, e), e.preventDefault());
    }, _isContentEditable: function _isContentEditable(t) {
      if (!t.length) return !1;var e = t.prop("contentEditable");return "inherit" === e ? this._isContentEditable(t.parent()) : "true" === e;
    } }), t.extend(t.ui.autocomplete, { escapeRegex: function escapeRegex(t) {
      return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
    }, filter: function filter(e, i) {
      var s = RegExp(t.ui.autocomplete.escapeRegex(i), "i");return t.grep(e, function (t) {
        return s.test(t.label || t.value || t);
      });
    } }), t.widget("ui.autocomplete", t.ui.autocomplete, { options: { messages: { noResults: "No search results.", results: function results(t) {
          return t + (t > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate.";
        } } }, __response: function __response(e) {
      var i;this._superApply(arguments), this.options.disabled || this.cancelSearch || (i = e && e.length ? this.options.messages.results(e.length) : this.options.messages.noResults, this.liveRegion.children().hide(), t("<div>").text(i).appendTo(this.liveRegion));
    } }), t.ui.autocomplete;var d = /ui-corner-([a-z]){2,6}/g;t.widget("ui.controlgroup", { version: "1.12.1", defaultElement: "<div>", options: { direction: "horizontal", disabled: null, onlyVisible: !0, items: { button: "input[type=button], input[type=submit], input[type=reset], button, a", controlgroupLabel: ".ui-controlgroup-label", checkboxradio: "input[type='checkbox'], input[type='radio']", selectmenu: "select", spinner: ".ui-spinner-input" } }, _create: function _create() {
      this._enhance();
    }, _enhance: function _enhance() {
      this.element.attr("role", "toolbar"), this.refresh();
    }, _destroy: function _destroy() {
      this._callChildMethod("destroy"), this.childWidgets.removeData("ui-controlgroup-data"), this.element.removeAttr("role"), this.options.items.controlgroupLabel && this.element.find(this.options.items.controlgroupLabel).find(".ui-controlgroup-label-contents").contents().unwrap();
    }, _initWidgets: function _initWidgets() {
      var e = this,
          i = [];t.each(this.options.items, function (s, n) {
        var o,
            a = {};return n ? "controlgroupLabel" === s ? (o = e.element.find(n), o.each(function () {
          var e = t(this);e.children(".ui-controlgroup-label-contents").length || e.contents().wrapAll("<span class='ui-controlgroup-label-contents'></span>");
        }), e._addClass(o, null, "ui-widget ui-widget-content ui-state-default"), i = i.concat(o.get()), void 0) : (t.fn[s] && (a = e["_" + s + "Options"] ? e["_" + s + "Options"]("middle") : { classes: {} }, e.element.find(n).each(function () {
          var n = t(this),
              o = n[s]("instance"),
              r = t.widget.extend({}, a);if ("button" !== s || !n.parent(".ui-spinner").length) {
            o || (o = n[s]()[s]("instance")), o && (r.classes = e._resolveClassesValues(r.classes, o)), n[s](r);var h = n[s]("widget");t.data(h[0], "ui-controlgroup-data", o ? o : n[s]("instance")), i.push(h[0]);
          }
        })), void 0) : void 0;
      }), this.childWidgets = t(t.unique(i)), this._addClass(this.childWidgets, "ui-controlgroup-item");
    }, _callChildMethod: function _callChildMethod(e) {
      this.childWidgets.each(function () {
        var i = t(this),
            s = i.data("ui-controlgroup-data");s && s[e] && s[e]();
      });
    }, _updateCornerClass: function _updateCornerClass(t, e) {
      var i = "ui-corner-top ui-corner-bottom ui-corner-left ui-corner-right ui-corner-all",
          s = this._buildSimpleOptions(e, "label").classes.label;this._removeClass(t, null, i), this._addClass(t, null, s);
    }, _buildSimpleOptions: function _buildSimpleOptions(t, e) {
      var i = "vertical" === this.options.direction,
          s = { classes: {} };return s.classes[e] = { middle: "", first: "ui-corner-" + (i ? "top" : "left"), last: "ui-corner-" + (i ? "bottom" : "right"), only: "ui-corner-all" }[t], s;
    }, _spinnerOptions: function _spinnerOptions(t) {
      var e = this._buildSimpleOptions(t, "ui-spinner");return e.classes["ui-spinner-up"] = "", e.classes["ui-spinner-down"] = "", e;
    }, _buttonOptions: function _buttonOptions(t) {
      return this._buildSimpleOptions(t, "ui-button");
    }, _checkboxradioOptions: function _checkboxradioOptions(t) {
      return this._buildSimpleOptions(t, "ui-checkboxradio-label");
    }, _selectmenuOptions: function _selectmenuOptions(t) {
      var e = "vertical" === this.options.direction;return { width: e ? "auto" : !1, classes: { middle: { "ui-selectmenu-button-open": "", "ui-selectmenu-button-closed": "" }, first: { "ui-selectmenu-button-open": "ui-corner-" + (e ? "top" : "tl"), "ui-selectmenu-button-closed": "ui-corner-" + (e ? "top" : "left") }, last: { "ui-selectmenu-button-open": e ? "" : "ui-corner-tr", "ui-selectmenu-button-closed": "ui-corner-" + (e ? "bottom" : "right") }, only: { "ui-selectmenu-button-open": "ui-corner-top", "ui-selectmenu-button-closed": "ui-corner-all" } }[t] };
    }, _resolveClassesValues: function _resolveClassesValues(e, i) {
      var s = {};return t.each(e, function (n) {
        var o = i.options.classes[n] || "";o = t.trim(o.replace(d, "")), s[n] = (o + " " + e[n]).replace(/\s+/g, " ");
      }), s;
    }, _setOption: function _setOption(t, e) {
      return "direction" === t && this._removeClass("ui-controlgroup-" + this.options.direction), this._super(t, e), "disabled" === t ? (this._callChildMethod(e ? "disable" : "enable"), void 0) : (this.refresh(), void 0);
    }, refresh: function refresh() {
      var e,
          i = this;this._addClass("ui-controlgroup ui-controlgroup-" + this.options.direction), "horizontal" === this.options.direction && this._addClass(null, "ui-helper-clearfix"), this._initWidgets(), e = this.childWidgets, this.options.onlyVisible && (e = e.filter(":visible")), e.length && (t.each(["first", "last"], function (t, s) {
        var n = e[s]().data("ui-controlgroup-data");if (n && i["_" + n.widgetName + "Options"]) {
          var o = i["_" + n.widgetName + "Options"](1 === e.length ? "only" : s);o.classes = i._resolveClassesValues(o.classes, n), n.element[n.widgetName](o);
        } else i._updateCornerClass(e[s](), s);
      }), this._callChildMethod("refresh"));
    } }), t.widget("ui.checkboxradio", [t.ui.formResetMixin, { version: "1.12.1", options: { disabled: null, label: null, icon: !0, classes: { "ui-checkboxradio-label": "ui-corner-all", "ui-checkboxradio-icon": "ui-corner-all" } }, _getCreateOptions: function _getCreateOptions() {
      var e,
          i,
          s = this,
          n = this._super() || {};return this._readType(), i = this.element.labels(), this.label = t(i[i.length - 1]), this.label.length || t.error("No label found for checkboxradio widget"), this.originalLabel = "", this.label.contents().not(this.element[0]).each(function () {
        s.originalLabel += 3 === this.nodeType ? t(this).text() : this.outerHTML;
      }), this.originalLabel && (n.label = this.originalLabel), e = this.element[0].disabled, null != e && (n.disabled = e), n;
    }, _create: function _create() {
      var t = this.element[0].checked;this._bindFormResetHandler(), null == this.options.disabled && (this.options.disabled = this.element[0].disabled), this._setOption("disabled", this.options.disabled), this._addClass("ui-checkboxradio", "ui-helper-hidden-accessible"), this._addClass(this.label, "ui-checkboxradio-label", "ui-button ui-widget"), "radio" === this.type && this._addClass(this.label, "ui-checkboxradio-radio-label"), this.options.label && this.options.label !== this.originalLabel ? this._updateLabel() : this.originalLabel && (this.options.label = this.originalLabel), this._enhance(), t && (this._addClass(this.label, "ui-checkboxradio-checked", "ui-state-active"), this.icon && this._addClass(this.icon, null, "ui-state-hover")), this._on({ change: "_toggleClasses", focus: function focus() {
          this._addClass(this.label, null, "ui-state-focus ui-visual-focus");
        }, blur: function blur() {
          this._removeClass(this.label, null, "ui-state-focus ui-visual-focus");
        } });
    }, _readType: function _readType() {
      var e = this.element[0].nodeName.toLowerCase();this.type = this.element[0].type, "input" === e && /radio|checkbox/.test(this.type) || t.error("Can't create checkboxradio on element.nodeName=" + e + " and element.type=" + this.type);
    }, _enhance: function _enhance() {
      this._updateIcon(this.element[0].checked);
    }, widget: function widget() {
      return this.label;
    }, _getRadioGroup: function _getRadioGroup() {
      var e,
          i = this.element[0].name,
          s = "input[name='" + t.ui.escapeSelector(i) + "']";return i ? (e = this.form.length ? t(this.form[0].elements).filter(s) : t(s).filter(function () {
        return 0 === t(this).form().length;
      }), e.not(this.element)) : t([]);
    }, _toggleClasses: function _toggleClasses() {
      var e = this.element[0].checked;this._toggleClass(this.label, "ui-checkboxradio-checked", "ui-state-active", e), this.options.icon && "checkbox" === this.type && this._toggleClass(this.icon, null, "ui-icon-check ui-state-checked", e)._toggleClass(this.icon, null, "ui-icon-blank", !e), "radio" === this.type && this._getRadioGroup().each(function () {
        var e = t(this).checkboxradio("instance");e && e._removeClass(e.label, "ui-checkboxradio-checked", "ui-state-active");
      });
    }, _destroy: function _destroy() {
      this._unbindFormResetHandler(), this.icon && (this.icon.remove(), this.iconSpace.remove());
    }, _setOption: function _setOption(t, e) {
      return "label" !== t || e ? (this._super(t, e), "disabled" === t ? (this._toggleClass(this.label, null, "ui-state-disabled", e), this.element[0].disabled = e, void 0) : (this.refresh(), void 0)) : void 0;
    }, _updateIcon: function _updateIcon(e) {
      var i = "ui-icon ui-icon-background ";this.options.icon ? (this.icon || (this.icon = t("<span>"), this.iconSpace = t("<span> </span>"), this._addClass(this.iconSpace, "ui-checkboxradio-icon-space")), "checkbox" === this.type ? (i += e ? "ui-icon-check ui-state-checked" : "ui-icon-blank", this._removeClass(this.icon, null, e ? "ui-icon-blank" : "ui-icon-check")) : i += "ui-icon-blank", this._addClass(this.icon, "ui-checkboxradio-icon", i), e || this._removeClass(this.icon, null, "ui-icon-check ui-state-checked"), this.icon.prependTo(this.label).after(this.iconSpace)) : void 0 !== this.icon && (this.icon.remove(), this.iconSpace.remove(), delete this.icon);
    }, _updateLabel: function _updateLabel() {
      var t = this.label.contents().not(this.element[0]);this.icon && (t = t.not(this.icon[0])), this.iconSpace && (t = t.not(this.iconSpace[0])), t.remove(), this.label.append(this.options.label);
    }, refresh: function refresh() {
      var t = this.element[0].checked,
          e = this.element[0].disabled;this._updateIcon(t), this._toggleClass(this.label, "ui-checkboxradio-checked", "ui-state-active", t), null !== this.options.label && this._updateLabel(), e !== this.options.disabled && this._setOptions({ disabled: e });
    } }]), t.ui.checkboxradio, t.widget("ui.button", { version: "1.12.1", defaultElement: "<button>", options: { classes: { "ui-button": "ui-corner-all" }, disabled: null, icon: null, iconPosition: "beginning", label: null, showLabel: !0 }, _getCreateOptions: function _getCreateOptions() {
      var t,
          e = this._super() || {};return this.isInput = this.element.is("input"), t = this.element[0].disabled, null != t && (e.disabled = t), this.originalLabel = this.isInput ? this.element.val() : this.element.html(), this.originalLabel && (e.label = this.originalLabel), e;
    }, _create: function _create() {
      !this.option.showLabel & !this.options.icon && (this.options.showLabel = !0), null == this.options.disabled && (this.options.disabled = this.element[0].disabled || !1), this.hasTitle = !!this.element.attr("title"), this.options.label && this.options.label !== this.originalLabel && (this.isInput ? this.element.val(this.options.label) : this.element.html(this.options.label)), this._addClass("ui-button", "ui-widget"), this._setOption("disabled", this.options.disabled), this._enhance(), this.element.is("a") && this._on({ keyup: function keyup(e) {
          e.keyCode === t.ui.keyCode.SPACE && (e.preventDefault(), this.element[0].click ? this.element[0].click() : this.element.trigger("click"));
        } });
    }, _enhance: function _enhance() {
      this.element.is("button") || this.element.attr("role", "button"), this.options.icon && (this._updateIcon("icon", this.options.icon), this._updateTooltip());
    }, _updateTooltip: function _updateTooltip() {
      this.title = this.element.attr("title"), this.options.showLabel || this.title || this.element.attr("title", this.options.label);
    }, _updateIcon: function _updateIcon(e, i) {
      var s = "iconPosition" !== e,
          n = s ? this.options.iconPosition : i,
          o = "top" === n || "bottom" === n;this.icon ? s && this._removeClass(this.icon, null, this.options.icon) : (this.icon = t("<span>"), this._addClass(this.icon, "ui-button-icon", "ui-icon"), this.options.showLabel || this._addClass("ui-button-icon-only")), s && this._addClass(this.icon, null, i), this._attachIcon(n), o ? (this._addClass(this.icon, null, "ui-widget-icon-block"), this.iconSpace && this.iconSpace.remove()) : (this.iconSpace || (this.iconSpace = t("<span> </span>"), this._addClass(this.iconSpace, "ui-button-icon-space")), this._removeClass(this.icon, null, "ui-wiget-icon-block"), this._attachIconSpace(n));
    }, _destroy: function _destroy() {
      this.element.removeAttr("role"), this.icon && this.icon.remove(), this.iconSpace && this.iconSpace.remove(), this.hasTitle || this.element.removeAttr("title");
    }, _attachIconSpace: function _attachIconSpace(t) {
      this.icon[/^(?:end|bottom)/.test(t) ? "before" : "after"](this.iconSpace);
    }, _attachIcon: function _attachIcon(t) {
      this.element[/^(?:end|bottom)/.test(t) ? "append" : "prepend"](this.icon);
    }, _setOptions: function _setOptions(t) {
      var e = void 0 === t.showLabel ? this.options.showLabel : t.showLabel,
          i = void 0 === t.icon ? this.options.icon : t.icon;e || i || (t.showLabel = !0), this._super(t);
    }, _setOption: function _setOption(t, e) {
      "icon" === t && (e ? this._updateIcon(t, e) : this.icon && (this.icon.remove(), this.iconSpace && this.iconSpace.remove())), "iconPosition" === t && this._updateIcon(t, e), "showLabel" === t && (this._toggleClass("ui-button-icon-only", null, !e), this._updateTooltip()), "label" === t && (this.isInput ? this.element.val(e) : (this.element.html(e), this.icon && (this._attachIcon(this.options.iconPosition), this._attachIconSpace(this.options.iconPosition)))), this._super(t, e), "disabled" === t && (this._toggleClass(null, "ui-state-disabled", e), this.element[0].disabled = e, e && this.element.blur());
    }, refresh: function refresh() {
      var t = this.element.is("input, button") ? this.element[0].disabled : this.element.hasClass("ui-button-disabled");t !== this.options.disabled && this._setOptions({ disabled: t }), this._updateTooltip();
    } }), t.uiBackCompat !== !1 && (t.widget("ui.button", t.ui.button, { options: { text: !0, icons: { primary: null, secondary: null } }, _create: function _create() {
      this.options.showLabel && !this.options.text && (this.options.showLabel = this.options.text), !this.options.showLabel && this.options.text && (this.options.text = this.options.showLabel), this.options.icon || !this.options.icons.primary && !this.options.icons.secondary ? this.options.icon && (this.options.icons.primary = this.options.icon) : this.options.icons.primary ? this.options.icon = this.options.icons.primary : (this.options.icon = this.options.icons.secondary, this.options.iconPosition = "end"), this._super();
    }, _setOption: function _setOption(t, e) {
      return "text" === t ? (this._super("showLabel", e), void 0) : ("showLabel" === t && (this.options.text = e), "icon" === t && (this.options.icons.primary = e), "icons" === t && (e.primary ? (this._super("icon", e.primary), this._super("iconPosition", "beginning")) : e.secondary && (this._super("icon", e.secondary), this._super("iconPosition", "end"))), this._superApply(arguments), void 0);
    } }), t.fn.button = function (e) {
    return function () {
      return !this.length || this.length && "INPUT" !== this[0].tagName || this.length && "INPUT" === this[0].tagName && "checkbox" !== this.attr("type") && "radio" !== this.attr("type") ? e.apply(this, arguments) : (t.ui.checkboxradio || t.error("Checkboxradio widget missing"), 0 === arguments.length ? this.checkboxradio({ icon: !1 }) : this.checkboxradio.apply(this, arguments));
    };
  }(t.fn.button), t.fn.buttonset = function () {
    return t.ui.controlgroup || t.error("Controlgroup widget missing"), "option" === arguments[0] && "items" === arguments[1] && arguments[2] ? this.controlgroup.apply(this, [arguments[0], "items.button", arguments[2]]) : "option" === arguments[0] && "items" === arguments[1] ? this.controlgroup.apply(this, [arguments[0], "items.button"]) : ("object" == _typeof(arguments[0]) && arguments[0].items && (arguments[0].items = { button: arguments[0].items }), this.controlgroup.apply(this, arguments));
  }), t.ui.button, t.extend(t.ui, { datepicker: { version: "1.12.1" } });var p;t.extend(s.prototype, { markerClassName: "hasDatepicker", maxRows: 4, _widgetDatepicker: function _widgetDatepicker() {
      return this.dpDiv;
    }, setDefaults: function setDefaults(t) {
      return a(this._defaults, t || {}), this;
    }, _attachDatepicker: function _attachDatepicker(e, i) {
      var s, n, o;s = e.nodeName.toLowerCase(), n = "div" === s || "span" === s, e.id || (this.uuid += 1, e.id = "dp" + this.uuid), o = this._newInst(t(e), n), o.settings = t.extend({}, i || {}), "input" === s ? this._connectDatepicker(e, o) : n && this._inlineDatepicker(e, o);
    }, _newInst: function _newInst(e, i) {
      var s = e[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");return { id: s, input: e, selectedDay: 0, selectedMonth: 0, selectedYear: 0, drawMonth: 0, drawYear: 0, inline: i, dpDiv: i ? n(t("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv };
    }, _connectDatepicker: function _connectDatepicker(e, i) {
      var s = t(e);i.append = t([]), i.trigger = t([]), s.hasClass(this.markerClassName) || (this._attachments(s, i), s.addClass(this.markerClassName).on("keydown", this._doKeyDown).on("keypress", this._doKeyPress).on("keyup", this._doKeyUp), this._autoSize(i), t.data(e, "datepicker", i), i.settings.disabled && this._disableDatepicker(e));
    }, _attachments: function _attachments(e, i) {
      var s,
          n,
          o,
          a = this._get(i, "appendText"),
          r = this._get(i, "isRTL");i.append && i.append.remove(), a && (i.append = t("<span class='" + this._appendClass + "'>" + a + "</span>"), e[r ? "before" : "after"](i.append)), e.off("focus", this._showDatepicker), i.trigger && i.trigger.remove(), s = this._get(i, "showOn"), ("focus" === s || "both" === s) && e.on("focus", this._showDatepicker), ("button" === s || "both" === s) && (n = this._get(i, "buttonText"), o = this._get(i, "buttonImage"), i.trigger = t(this._get(i, "buttonImageOnly") ? t("<img/>").addClass(this._triggerClass).attr({ src: o, alt: n, title: n }) : t("<button type='button'></button>").addClass(this._triggerClass).html(o ? t("<img/>").attr({ src: o, alt: n, title: n }) : n)), e[r ? "before" : "after"](i.trigger), i.trigger.on("click", function () {
        return t.datepicker._datepickerShowing && t.datepicker._lastInput === e[0] ? t.datepicker._hideDatepicker() : t.datepicker._datepickerShowing && t.datepicker._lastInput !== e[0] ? (t.datepicker._hideDatepicker(), t.datepicker._showDatepicker(e[0])) : t.datepicker._showDatepicker(e[0]), !1;
      }));
    }, _autoSize: function _autoSize(t) {
      if (this._get(t, "autoSize") && !t.inline) {
        var e,
            i,
            s,
            n,
            o = new Date(2009, 11, 20),
            a = this._get(t, "dateFormat");a.match(/[DM]/) && (e = function e(t) {
          for (i = 0, s = 0, n = 0; t.length > n; n++) {
            t[n].length > i && (i = t[n].length, s = n);
          }return s;
        }, o.setMonth(e(this._get(t, a.match(/MM/) ? "monthNames" : "monthNamesShort"))), o.setDate(e(this._get(t, a.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - o.getDay())), t.input.attr("size", this._formatDate(t, o).length);
      }
    }, _inlineDatepicker: function _inlineDatepicker(e, i) {
      var s = t(e);s.hasClass(this.markerClassName) || (s.addClass(this.markerClassName).append(i.dpDiv), t.data(e, "datepicker", i), this._setDate(i, this._getDefaultDate(i), !0), this._updateDatepicker(i), this._updateAlternate(i), i.settings.disabled && this._disableDatepicker(e), i.dpDiv.css("display", "block"));
    }, _dialogDatepicker: function _dialogDatepicker(e, i, s, n, o) {
      var r,
          h,
          l,
          c,
          u,
          d = this._dialogInst;return d || (this.uuid += 1, r = "dp" + this.uuid, this._dialogInput = t("<input type='text' id='" + r + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.on("keydown", this._doKeyDown), t("body").append(this._dialogInput), d = this._dialogInst = this._newInst(this._dialogInput, !1), d.settings = {}, t.data(this._dialogInput[0], "datepicker", d)), a(d.settings, n || {}), i = i && i.constructor === Date ? this._formatDate(d, i) : i, this._dialogInput.val(i), this._pos = o ? o.length ? o : [o.pageX, o.pageY] : null, this._pos || (h = document.documentElement.clientWidth, l = document.documentElement.clientHeight, c = document.documentElement.scrollLeft || document.body.scrollLeft, u = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [h / 2 - 100 + c, l / 2 - 150 + u]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), d.settings.onSelect = s, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), t.blockUI && t.blockUI(this.dpDiv), t.data(this._dialogInput[0], "datepicker", d), this;
    }, _destroyDatepicker: function _destroyDatepicker(e) {
      var i,
          s = t(e),
          n = t.data(e, "datepicker");s.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), t.removeData(e, "datepicker"), "input" === i ? (n.append.remove(), n.trigger.remove(), s.removeClass(this.markerClassName).off("focus", this._showDatepicker).off("keydown", this._doKeyDown).off("keypress", this._doKeyPress).off("keyup", this._doKeyUp)) : ("div" === i || "span" === i) && s.removeClass(this.markerClassName).empty(), p === n && (p = null));
    }, _enableDatepicker: function _enableDatepicker(e) {
      var i,
          s,
          n = t(e),
          o = t.data(e, "datepicker");n.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), "input" === i ? (e.disabled = !1, o.trigger.filter("button").each(function () {
        this.disabled = !1;
      }).end().filter("img").css({ opacity: "1.0", cursor: "" })) : ("div" === i || "span" === i) && (s = n.children("." + this._inlineClass), s.children().removeClass("ui-state-disabled"), s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = t.map(this._disabledInputs, function (t) {
        return t === e ? null : t;
      }));
    }, _disableDatepicker: function _disableDatepicker(e) {
      var i,
          s,
          n = t(e),
          o = t.data(e, "datepicker");n.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), "input" === i ? (e.disabled = !0, o.trigger.filter("button").each(function () {
        this.disabled = !0;
      }).end().filter("img").css({ opacity: "0.5", cursor: "default" })) : ("div" === i || "span" === i) && (s = n.children("." + this._inlineClass), s.children().addClass("ui-state-disabled"), s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = t.map(this._disabledInputs, function (t) {
        return t === e ? null : t;
      }), this._disabledInputs[this._disabledInputs.length] = e);
    }, _isDisabledDatepicker: function _isDisabledDatepicker(t) {
      if (!t) return !1;for (var e = 0; this._disabledInputs.length > e; e++) {
        if (this._disabledInputs[e] === t) return !0;
      }return !1;
    }, _getInst: function _getInst(e) {
      try {
        return t.data(e, "datepicker");
      } catch (i) {
        throw "Missing instance data for this datepicker";
      }
    }, _optionDatepicker: function _optionDatepicker(e, i, s) {
      var n,
          o,
          r,
          h,
          l = this._getInst(e);return 2 === arguments.length && "string" == typeof i ? "defaults" === i ? t.extend({}, t.datepicker._defaults) : l ? "all" === i ? t.extend({}, l.settings) : this._get(l, i) : null : (n = i || {}, "string" == typeof i && (n = {}, n[i] = s), l && (this._curInst === l && this._hideDatepicker(), o = this._getDateDatepicker(e, !0), r = this._getMinMaxDate(l, "min"), h = this._getMinMaxDate(l, "max"), a(l.settings, n), null !== r && void 0 !== n.dateFormat && void 0 === n.minDate && (l.settings.minDate = this._formatDate(l, r)), null !== h && void 0 !== n.dateFormat && void 0 === n.maxDate && (l.settings.maxDate = this._formatDate(l, h)), "disabled" in n && (n.disabled ? this._disableDatepicker(e) : this._enableDatepicker(e)), this._attachments(t(e), l), this._autoSize(l), this._setDate(l, o), this._updateAlternate(l), this._updateDatepicker(l)), void 0);
    }, _changeDatepicker: function _changeDatepicker(t, e, i) {
      this._optionDatepicker(t, e, i);
    }, _refreshDatepicker: function _refreshDatepicker(t) {
      var e = this._getInst(t);e && this._updateDatepicker(e);
    }, _setDateDatepicker: function _setDateDatepicker(t, e) {
      var i = this._getInst(t);i && (this._setDate(i, e), this._updateDatepicker(i), this._updateAlternate(i));
    }, _getDateDatepicker: function _getDateDatepicker(t, e) {
      var i = this._getInst(t);return i && !i.inline && this._setDateFromField(i, e), i ? this._getDate(i) : null;
    }, _doKeyDown: function _doKeyDown(e) {
      var i,
          s,
          n,
          o = t.datepicker._getInst(e.target),
          a = !0,
          r = o.dpDiv.is(".ui-datepicker-rtl");if (o._keyEvent = !0, t.datepicker._datepickerShowing) switch (e.keyCode) {case 9:
          t.datepicker._hideDatepicker(), a = !1;break;case 13:
          return n = t("td." + t.datepicker._dayOverClass + ":not(." + t.datepicker._currentClass + ")", o.dpDiv), n[0] && t.datepicker._selectDay(e.target, o.selectedMonth, o.selectedYear, n[0]), i = t.datepicker._get(o, "onSelect"), i ? (s = t.datepicker._formatDate(o), i.apply(o.input ? o.input[0] : null, [s, o])) : t.datepicker._hideDatepicker(), !1;case 27:
          t.datepicker._hideDatepicker();break;case 33:
          t.datepicker._adjustDate(e.target, e.ctrlKey ? -t.datepicker._get(o, "stepBigMonths") : -t.datepicker._get(o, "stepMonths"), "M");break;case 34:
          t.datepicker._adjustDate(e.target, e.ctrlKey ? +t.datepicker._get(o, "stepBigMonths") : +t.datepicker._get(o, "stepMonths"), "M");break;case 35:
          (e.ctrlKey || e.metaKey) && t.datepicker._clearDate(e.target), a = e.ctrlKey || e.metaKey;break;case 36:
          (e.ctrlKey || e.metaKey) && t.datepicker._gotoToday(e.target), a = e.ctrlKey || e.metaKey;break;case 37:
          (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, r ? 1 : -1, "D"), a = e.ctrlKey || e.metaKey, e.originalEvent.altKey && t.datepicker._adjustDate(e.target, e.ctrlKey ? -t.datepicker._get(o, "stepBigMonths") : -t.datepicker._get(o, "stepMonths"), "M");break;case 38:
          (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, -7, "D"), a = e.ctrlKey || e.metaKey;break;case 39:
          (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, r ? -1 : 1, "D"), a = e.ctrlKey || e.metaKey, e.originalEvent.altKey && t.datepicker._adjustDate(e.target, e.ctrlKey ? +t.datepicker._get(o, "stepBigMonths") : +t.datepicker._get(o, "stepMonths"), "M");break;case 40:
          (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, 7, "D"), a = e.ctrlKey || e.metaKey;break;default:
          a = !1;} else 36 === e.keyCode && e.ctrlKey ? t.datepicker._showDatepicker(this) : a = !1;a && (e.preventDefault(), e.stopPropagation());
    }, _doKeyPress: function _doKeyPress(e) {
      var i,
          s,
          n = t.datepicker._getInst(e.target);return t.datepicker._get(n, "constrainInput") ? (i = t.datepicker._possibleChars(t.datepicker._get(n, "dateFormat")), s = String.fromCharCode(null == e.charCode ? e.keyCode : e.charCode), e.ctrlKey || e.metaKey || " " > s || !i || i.indexOf(s) > -1) : void 0;
    }, _doKeyUp: function _doKeyUp(e) {
      var i,
          s = t.datepicker._getInst(e.target);if (s.input.val() !== s.lastVal) try {
        i = t.datepicker.parseDate(t.datepicker._get(s, "dateFormat"), s.input ? s.input.val() : null, t.datepicker._getFormatConfig(s)), i && (t.datepicker._setDateFromField(s), t.datepicker._updateAlternate(s), t.datepicker._updateDatepicker(s));
      } catch (n) {}return !0;
    }, _showDatepicker: function _showDatepicker(e) {
      if (e = e.target || e, "input" !== e.nodeName.toLowerCase() && (e = t("input", e.parentNode)[0]), !t.datepicker._isDisabledDatepicker(e) && t.datepicker._lastInput !== e) {
        var s, n, o, r, h, l, c;s = t.datepicker._getInst(e), t.datepicker._curInst && t.datepicker._curInst !== s && (t.datepicker._curInst.dpDiv.stop(!0, !0), s && t.datepicker._datepickerShowing && t.datepicker._hideDatepicker(t.datepicker._curInst.input[0])), n = t.datepicker._get(s, "beforeShow"), o = n ? n.apply(e, [e, s]) : {}, o !== !1 && (a(s.settings, o), s.lastVal = null, t.datepicker._lastInput = e, t.datepicker._setDateFromField(s), t.datepicker._inDialog && (e.value = ""), t.datepicker._pos || (t.datepicker._pos = t.datepicker._findPos(e), t.datepicker._pos[1] += e.offsetHeight), r = !1, t(e).parents().each(function () {
          return r |= "fixed" === t(this).css("position"), !r;
        }), h = { left: t.datepicker._pos[0], top: t.datepicker._pos[1] }, t.datepicker._pos = null, s.dpDiv.empty(), s.dpDiv.css({ position: "absolute", display: "block", top: "-1000px" }), t.datepicker._updateDatepicker(s), h = t.datepicker._checkOffset(s, h, r), s.dpDiv.css({ position: t.datepicker._inDialog && t.blockUI ? "static" : r ? "fixed" : "absolute", display: "none", left: h.left + "px", top: h.top + "px" }), s.inline || (l = t.datepicker._get(s, "showAnim"), c = t.datepicker._get(s, "duration"), s.dpDiv.css("z-index", i(t(e)) + 1), t.datepicker._datepickerShowing = !0, t.effects && t.effects.effect[l] ? s.dpDiv.show(l, t.datepicker._get(s, "showOptions"), c) : s.dpDiv[l || "show"](l ? c : null), t.datepicker._shouldFocusInput(s) && s.input.trigger("focus"), t.datepicker._curInst = s));
      }
    }, _updateDatepicker: function _updateDatepicker(e) {
      this.maxRows = 4, p = e, e.dpDiv.empty().append(this._generateHTML(e)), this._attachHandlers(e);var i,
          s = this._getNumberOfMonths(e),
          n = s[1],
          a = 17,
          r = e.dpDiv.find("." + this._dayOverClass + " a");r.length > 0 && o.apply(r.get(0)), e.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), n > 1 && e.dpDiv.addClass("ui-datepicker-multi-" + n).css("width", a * n + "em"), e.dpDiv[(1 !== s[0] || 1 !== s[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), e.dpDiv[(this._get(e, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), e === t.datepicker._curInst && t.datepicker._datepickerShowing && t.datepicker._shouldFocusInput(e) && e.input.trigger("focus"), e.yearshtml && (i = e.yearshtml, setTimeout(function () {
        i === e.yearshtml && e.yearshtml && e.dpDiv.find("select.ui-datepicker-year:first").replaceWith(e.yearshtml), i = e.yearshtml = null;
      }, 0));
    }, _shouldFocusInput: function _shouldFocusInput(t) {
      return t.input && t.input.is(":visible") && !t.input.is(":disabled") && !t.input.is(":focus");
    }, _checkOffset: function _checkOffset(e, i, s) {
      var n = e.dpDiv.outerWidth(),
          o = e.dpDiv.outerHeight(),
          a = e.input ? e.input.outerWidth() : 0,
          r = e.input ? e.input.outerHeight() : 0,
          h = document.documentElement.clientWidth + (s ? 0 : t(document).scrollLeft()),
          l = document.documentElement.clientHeight + (s ? 0 : t(document).scrollTop());return i.left -= this._get(e, "isRTL") ? n - a : 0, i.left -= s && i.left === e.input.offset().left ? t(document).scrollLeft() : 0, i.top -= s && i.top === e.input.offset().top + r ? t(document).scrollTop() : 0, i.left -= Math.min(i.left, i.left + n > h && h > n ? Math.abs(i.left + n - h) : 0), i.top -= Math.min(i.top, i.top + o > l && l > o ? Math.abs(o + r) : 0), i;
    }, _findPos: function _findPos(e) {
      for (var i, s = this._getInst(e), n = this._get(s, "isRTL"); e && ("hidden" === e.type || 1 !== e.nodeType || t.expr.filters.hidden(e));) {
        e = e[n ? "previousSibling" : "nextSibling"];
      }return i = t(e).offset(), [i.left, i.top];
    }, _hideDatepicker: function _hideDatepicker(e) {
      var i,
          s,
          n,
          o,
          a = this._curInst;!a || e && a !== t.data(e, "datepicker") || this._datepickerShowing && (i = this._get(a, "showAnim"), s = this._get(a, "duration"), n = function n() {
        t.datepicker._tidyDialog(a);
      }, t.effects && (t.effects.effect[i] || t.effects[i]) ? a.dpDiv.hide(i, t.datepicker._get(a, "showOptions"), s, n) : a.dpDiv["slideDown" === i ? "slideUp" : "fadeIn" === i ? "fadeOut" : "hide"](i ? s : null, n), i || n(), this._datepickerShowing = !1, o = this._get(a, "onClose"), o && o.apply(a.input ? a.input[0] : null, [a.input ? a.input.val() : "", a]), this._lastInput = null, this._inDialog && (this._dialogInput.css({ position: "absolute", left: "0", top: "-100px" }), t.blockUI && (t.unblockUI(), t("body").append(this.dpDiv))), this._inDialog = !1);
    }, _tidyDialog: function _tidyDialog(t) {
      t.dpDiv.removeClass(this._dialogClass).off(".ui-datepicker-calendar");
    }, _checkExternalClick: function _checkExternalClick(e) {
      if (t.datepicker._curInst) {
        var i = t(e.target),
            s = t.datepicker._getInst(i[0]);(i[0].id !== t.datepicker._mainDivId && 0 === i.parents("#" + t.datepicker._mainDivId).length && !i.hasClass(t.datepicker.markerClassName) && !i.closest("." + t.datepicker._triggerClass).length && t.datepicker._datepickerShowing && (!t.datepicker._inDialog || !t.blockUI) || i.hasClass(t.datepicker.markerClassName) && t.datepicker._curInst !== s) && t.datepicker._hideDatepicker();
      }
    }, _adjustDate: function _adjustDate(e, i, s) {
      var n = t(e),
          o = this._getInst(n[0]);this._isDisabledDatepicker(n[0]) || (this._adjustInstDate(o, i + ("M" === s ? this._get(o, "showCurrentAtPos") : 0), s), this._updateDatepicker(o));
    }, _gotoToday: function _gotoToday(e) {
      var i,
          s = t(e),
          n = this._getInst(s[0]);this._get(n, "gotoCurrent") && n.currentDay ? (n.selectedDay = n.currentDay, n.drawMonth = n.selectedMonth = n.currentMonth, n.drawYear = n.selectedYear = n.currentYear) : (i = new Date(), n.selectedDay = i.getDate(), n.drawMonth = n.selectedMonth = i.getMonth(), n.drawYear = n.selectedYear = i.getFullYear()), this._notifyChange(n), this._adjustDate(s);
    }, _selectMonthYear: function _selectMonthYear(e, i, s) {
      var n = t(e),
          o = this._getInst(n[0]);o["selected" + ("M" === s ? "Month" : "Year")] = o["draw" + ("M" === s ? "Month" : "Year")] = parseInt(i.options[i.selectedIndex].value, 10), this._notifyChange(o), this._adjustDate(n);
    }, _selectDay: function _selectDay(e, i, s, n) {
      var o,
          a = t(e);t(n).hasClass(this._unselectableClass) || this._isDisabledDatepicker(a[0]) || (o = this._getInst(a[0]), o.selectedDay = o.currentDay = t("a", n).html(), o.selectedMonth = o.currentMonth = i, o.selectedYear = o.currentYear = s, this._selectDate(e, this._formatDate(o, o.currentDay, o.currentMonth, o.currentYear)));
    }, _clearDate: function _clearDate(e) {
      var i = t(e);this._selectDate(i, "");
    }, _selectDate: function _selectDate(e, i) {
      var s,
          n = t(e),
          o = this._getInst(n[0]);i = null != i ? i : this._formatDate(o), o.input && o.input.val(i), this._updateAlternate(o), s = this._get(o, "onSelect"), s ? s.apply(o.input ? o.input[0] : null, [i, o]) : o.input && o.input.trigger("change"), o.inline ? this._updateDatepicker(o) : (this._hideDatepicker(), this._lastInput = o.input[0], "object" != _typeof(o.input[0]) && o.input.trigger("focus"), this._lastInput = null);
    }, _updateAlternate: function _updateAlternate(e) {
      var i,
          s,
          n,
          o = this._get(e, "altField");o && (i = this._get(e, "altFormat") || this._get(e, "dateFormat"), s = this._getDate(e), n = this.formatDate(i, s, this._getFormatConfig(e)), t(o).val(n));
    }, noWeekends: function noWeekends(t) {
      var e = t.getDay();return [e > 0 && 6 > e, ""];
    }, iso8601Week: function iso8601Week(t) {
      var e,
          i = new Date(t.getTime());return i.setDate(i.getDate() + 4 - (i.getDay() || 7)), e = i.getTime(), i.setMonth(0), i.setDate(1), Math.floor(Math.round((e - i) / 864e5) / 7) + 1;
    }, parseDate: function parseDate(e, i, s) {
      if (null == e || null == i) throw "Invalid arguments";if (i = "object" == (typeof i === "undefined" ? "undefined" : _typeof(i)) ? "" + i : i + "", "" === i) return null;var n,
          o,
          a,
          r,
          h = 0,
          l = (s ? s.shortYearCutoff : null) || this._defaults.shortYearCutoff,
          c = "string" != typeof l ? l : new Date().getFullYear() % 100 + parseInt(l, 10),
          u = (s ? s.dayNamesShort : null) || this._defaults.dayNamesShort,
          d = (s ? s.dayNames : null) || this._defaults.dayNames,
          p = (s ? s.monthNamesShort : null) || this._defaults.monthNamesShort,
          f = (s ? s.monthNames : null) || this._defaults.monthNames,
          g = -1,
          m = -1,
          _ = -1,
          v = -1,
          b = !1,
          y = function y(t) {
        var i = e.length > n + 1 && e.charAt(n + 1) === t;return i && n++, i;
      },
          w = function w(t) {
        var e = y(t),
            s = "@" === t ? 14 : "!" === t ? 20 : "y" === t && e ? 4 : "o" === t ? 3 : 2,
            n = "y" === t ? s : 1,
            o = RegExp("^\\d{" + n + "," + s + "}"),
            a = i.substring(h).match(o);if (!a) throw "Missing number at position " + h;return h += a[0].length, parseInt(a[0], 10);
      },
          k = function k(e, s, n) {
        var o = -1,
            a = t.map(y(e) ? n : s, function (t, e) {
          return [[e, t]];
        }).sort(function (t, e) {
          return -(t[1].length - e[1].length);
        });if (t.each(a, function (t, e) {
          var s = e[1];return i.substr(h, s.length).toLowerCase() === s.toLowerCase() ? (o = e[0], h += s.length, !1) : void 0;
        }), -1 !== o) return o + 1;throw "Unknown name at position " + h;
      },
          x = function x() {
        if (i.charAt(h) !== e.charAt(n)) throw "Unexpected literal at position " + h;h++;
      };for (n = 0; e.length > n; n++) {
        if (b) "'" !== e.charAt(n) || y("'") ? x() : b = !1;else switch (e.charAt(n)) {case "d":
            _ = w("d");break;case "D":
            k("D", u, d);break;case "o":
            v = w("o");break;case "m":
            m = w("m");break;case "M":
            m = k("M", p, f);break;case "y":
            g = w("y");break;case "@":
            r = new Date(w("@")), g = r.getFullYear(), m = r.getMonth() + 1, _ = r.getDate();break;case "!":
            r = new Date((w("!") - this._ticksTo1970) / 1e4), g = r.getFullYear(), m = r.getMonth() + 1, _ = r.getDate();break;case "'":
            y("'") ? x() : b = !0;break;default:
            x();}
      }if (i.length > h && (a = i.substr(h), !/^\s+/.test(a))) throw "Extra/unparsed characters found in date: " + a;if (-1 === g ? g = new Date().getFullYear() : 100 > g && (g += new Date().getFullYear() - new Date().getFullYear() % 100 + (c >= g ? 0 : -100)), v > -1) for (m = 1, _ = v;;) {
        if (o = this._getDaysInMonth(g, m - 1), o >= _) break;m++, _ -= o;
      }if (r = this._daylightSavingAdjust(new Date(g, m - 1, _)), r.getFullYear() !== g || r.getMonth() + 1 !== m || r.getDate() !== _) throw "Invalid date";return r;
    }, ATOM: "yy-mm-dd", COOKIE: "D, dd M yy", ISO_8601: "yy-mm-dd", RFC_822: "D, d M y", RFC_850: "DD, dd-M-y", RFC_1036: "D, d M y", RFC_1123: "D, d M yy", RFC_2822: "D, d M yy", RSS: "D, d M y", TICKS: "!", TIMESTAMP: "@", W3C: "yy-mm-dd", _ticksTo1970: 1e7 * 60 * 60 * 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)), formatDate: function formatDate(t, e, i) {
      if (!e) return "";var s,
          n = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort,
          o = (i ? i.dayNames : null) || this._defaults.dayNames,
          a = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort,
          r = (i ? i.monthNames : null) || this._defaults.monthNames,
          h = function h(e) {
        var i = t.length > s + 1 && t.charAt(s + 1) === e;return i && s++, i;
      },
          l = function l(t, e, i) {
        var s = "" + e;if (h(t)) for (; i > s.length;) {
          s = "0" + s;
        }return s;
      },
          c = function c(t, e, i, s) {
        return h(t) ? s[e] : i[e];
      },
          u = "",
          d = !1;if (e) for (s = 0; t.length > s; s++) {
        if (d) "'" !== t.charAt(s) || h("'") ? u += t.charAt(s) : d = !1;else switch (t.charAt(s)) {case "d":
            u += l("d", e.getDate(), 2);break;case "D":
            u += c("D", e.getDay(), n, o);break;case "o":
            u += l("o", Math.round((new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime() - new Date(e.getFullYear(), 0, 0).getTime()) / 864e5), 3);break;case "m":
            u += l("m", e.getMonth() + 1, 2);break;case "M":
            u += c("M", e.getMonth(), a, r);break;case "y":
            u += h("y") ? e.getFullYear() : (10 > e.getFullYear() % 100 ? "0" : "") + e.getFullYear() % 100;break;case "@":
            u += e.getTime();break;case "!":
            u += 1e4 * e.getTime() + this._ticksTo1970;break;case "'":
            h("'") ? u += "'" : d = !0;break;default:
            u += t.charAt(s);}
      }return u;
    }, _possibleChars: function _possibleChars(t) {
      var e,
          i = "",
          s = !1,
          n = function n(i) {
        var s = t.length > e + 1 && t.charAt(e + 1) === i;return s && e++, s;
      };for (e = 0; t.length > e; e++) {
        if (s) "'" !== t.charAt(e) || n("'") ? i += t.charAt(e) : s = !1;else switch (t.charAt(e)) {case "d":case "m":case "y":case "@":
            i += "0123456789";break;case "D":case "M":
            return null;case "'":
            n("'") ? i += "'" : s = !0;break;default:
            i += t.charAt(e);}
      }return i;
    }, _get: function _get(t, e) {
      return void 0 !== t.settings[e] ? t.settings[e] : this._defaults[e];
    }, _setDateFromField: function _setDateFromField(t, e) {
      if (t.input.val() !== t.lastVal) {
        var i = this._get(t, "dateFormat"),
            s = t.lastVal = t.input ? t.input.val() : null,
            n = this._getDefaultDate(t),
            o = n,
            a = this._getFormatConfig(t);try {
          o = this.parseDate(i, s, a) || n;
        } catch (r) {
          s = e ? "" : s;
        }t.selectedDay = o.getDate(), t.drawMonth = t.selectedMonth = o.getMonth(), t.drawYear = t.selectedYear = o.getFullYear(), t.currentDay = s ? o.getDate() : 0, t.currentMonth = s ? o.getMonth() : 0, t.currentYear = s ? o.getFullYear() : 0, this._adjustInstDate(t);
      }
    }, _getDefaultDate: function _getDefaultDate(t) {
      return this._restrictMinMax(t, this._determineDate(t, this._get(t, "defaultDate"), new Date()));
    }, _determineDate: function _determineDate(e, i, s) {
      var n = function n(t) {
        var e = new Date();return e.setDate(e.getDate() + t), e;
      },
          o = function o(i) {
        try {
          return t.datepicker.parseDate(t.datepicker._get(e, "dateFormat"), i, t.datepicker._getFormatConfig(e));
        } catch (s) {}for (var n = (i.toLowerCase().match(/^c/) ? t.datepicker._getDate(e) : null) || new Date(), o = n.getFullYear(), a = n.getMonth(), r = n.getDate(), h = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, l = h.exec(i); l;) {
          switch (l[2] || "d") {case "d":case "D":
              r += parseInt(l[1], 10);break;case "w":case "W":
              r += 7 * parseInt(l[1], 10);break;case "m":case "M":
              a += parseInt(l[1], 10), r = Math.min(r, t.datepicker._getDaysInMonth(o, a));break;case "y":case "Y":
              o += parseInt(l[1], 10), r = Math.min(r, t.datepicker._getDaysInMonth(o, a));}l = h.exec(i);
        }return new Date(o, a, r);
      },
          a = null == i || "" === i ? s : "string" == typeof i ? o(i) : "number" == typeof i ? isNaN(i) ? s : n(i) : new Date(i.getTime());return a = a && "Invalid Date" == "" + a ? s : a, a && (a.setHours(0), a.setMinutes(0), a.setSeconds(0), a.setMilliseconds(0)), this._daylightSavingAdjust(a);
    }, _daylightSavingAdjust: function _daylightSavingAdjust(t) {
      return t ? (t.setHours(t.getHours() > 12 ? t.getHours() + 2 : 0), t) : null;
    }, _setDate: function _setDate(t, e, i) {
      var s = !e,
          n = t.selectedMonth,
          o = t.selectedYear,
          a = this._restrictMinMax(t, this._determineDate(t, e, new Date()));t.selectedDay = t.currentDay = a.getDate(), t.drawMonth = t.selectedMonth = t.currentMonth = a.getMonth(), t.drawYear = t.selectedYear = t.currentYear = a.getFullYear(), n === t.selectedMonth && o === t.selectedYear || i || this._notifyChange(t), this._adjustInstDate(t), t.input && t.input.val(s ? "" : this._formatDate(t));
    }, _getDate: function _getDate(t) {
      var e = !t.currentYear || t.input && "" === t.input.val() ? null : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));return e;
    }, _attachHandlers: function _attachHandlers(e) {
      var i = this._get(e, "stepMonths"),
          s = "#" + e.id.replace(/\\\\/g, "\\");e.dpDiv.find("[data-handler]").map(function () {
        var e = { prev: function prev() {
            t.datepicker._adjustDate(s, -i, "M");
          }, next: function next() {
            t.datepicker._adjustDate(s, +i, "M");
          }, hide: function hide() {
            t.datepicker._hideDatepicker();
          }, today: function today() {
            t.datepicker._gotoToday(s);
          }, selectDay: function selectDay() {
            return t.datepicker._selectDay(s, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1;
          }, selectMonth: function selectMonth() {
            return t.datepicker._selectMonthYear(s, this, "M"), !1;
          }, selectYear: function selectYear() {
            return t.datepicker._selectMonthYear(s, this, "Y"), !1;
          } };t(this).on(this.getAttribute("data-event"), e[this.getAttribute("data-handler")]);
      });
    }, _generateHTML: function _generateHTML(t) {
      var e,
          i,
          s,
          n,
          o,
          a,
          r,
          h,
          l,
          c,
          u,
          d,
          p,
          f,
          g,
          m,
          _,
          v,
          b,
          y,
          w,
          k,
          x,
          C,
          D,
          I,
          T,
          P,
          M,
          S,
          H,
          z,
          O,
          A,
          N,
          W,
          E,
          F,
          L,
          R = new Date(),
          B = this._daylightSavingAdjust(new Date(R.getFullYear(), R.getMonth(), R.getDate())),
          Y = this._get(t, "isRTL"),
          j = this._get(t, "showButtonPanel"),
          q = this._get(t, "hideIfNoPrevNext"),
          K = this._get(t, "navigationAsDateFormat"),
          U = this._getNumberOfMonths(t),
          V = this._get(t, "showCurrentAtPos"),
          $ = this._get(t, "stepMonths"),
          X = 1 !== U[0] || 1 !== U[1],
          G = this._daylightSavingAdjust(t.currentDay ? new Date(t.currentYear, t.currentMonth, t.currentDay) : new Date(9999, 9, 9)),
          Q = this._getMinMaxDate(t, "min"),
          J = this._getMinMaxDate(t, "max"),
          Z = t.drawMonth - V,
          te = t.drawYear;if (0 > Z && (Z += 12, te--), J) for (e = this._daylightSavingAdjust(new Date(J.getFullYear(), J.getMonth() - U[0] * U[1] + 1, J.getDate())), e = Q && Q > e ? Q : e; this._daylightSavingAdjust(new Date(te, Z, 1)) > e;) {
        Z--, 0 > Z && (Z = 11, te--);
      }for (t.drawMonth = Z, t.drawYear = te, i = this._get(t, "prevText"), i = K ? this.formatDate(i, this._daylightSavingAdjust(new Date(te, Z - $, 1)), this._getFormatConfig(t)) : i, s = this._canAdjustMonth(t, -1, te, Z) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "e" : "w") + "'>" + i + "</span></a>" : q ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "e" : "w") + "'>" + i + "</span></a>", n = this._get(t, "nextText"), n = K ? this.formatDate(n, this._daylightSavingAdjust(new Date(te, Z + $, 1)), this._getFormatConfig(t)) : n, o = this._canAdjustMonth(t, 1, te, Z) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + n + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "w" : "e") + "'>" + n + "</span></a>" : q ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + n + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "w" : "e") + "'>" + n + "</span></a>", a = this._get(t, "currentText"), r = this._get(t, "gotoCurrent") && t.currentDay ? G : B, a = K ? this.formatDate(a, r, this._getFormatConfig(t)) : a, h = t.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(t, "closeText") + "</button>", l = j ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (Y ? h : "") + (this._isInRange(t, r) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + a + "</button>" : "") + (Y ? "" : h) + "</div>" : "", c = parseInt(this._get(t, "firstDay"), 10), c = isNaN(c) ? 0 : c, u = this._get(t, "showWeek"), d = this._get(t, "dayNames"), p = this._get(t, "dayNamesMin"), f = this._get(t, "monthNames"), g = this._get(t, "monthNamesShort"), m = this._get(t, "beforeShowDay"), _ = this._get(t, "showOtherMonths"), v = this._get(t, "selectOtherMonths"), b = this._getDefaultDate(t), y = "", k = 0; U[0] > k; k++) {
        for (x = "", this.maxRows = 4, C = 0; U[1] > C; C++) {
          if (D = this._daylightSavingAdjust(new Date(te, Z, t.selectedDay)), I = " ui-corner-all", T = "", X) {
            if (T += "<div class='ui-datepicker-group", U[1] > 1) switch (C) {case 0:
                T += " ui-datepicker-group-first", I = " ui-corner-" + (Y ? "right" : "left");
                break;case U[1] - 1:
                T += " ui-datepicker-group-last", I = " ui-corner-" + (Y ? "left" : "right");break;default:
                T += " ui-datepicker-group-middle", I = "";}T += "'>";
          }for (T += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + I + "'>" + (/all|left/.test(I) && 0 === k ? Y ? o : s : "") + (/all|right/.test(I) && 0 === k ? Y ? s : o : "") + this._generateMonthYearHeader(t, Z, te, Q, J, k > 0 || C > 0, f, g) + "</div><table class='ui-datepicker-calendar'><thead>" + "<tr>", P = u ? "<th class='ui-datepicker-week-col'>" + this._get(t, "weekHeader") + "</th>" : "", w = 0; 7 > w; w++) {
            M = (w + c) % 7, P += "<th scope='col'" + ((w + c + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + ">" + "<span title='" + d[M] + "'>" + p[M] + "</span></th>";
          }for (T += P + "</tr></thead><tbody>", S = this._getDaysInMonth(te, Z), te === t.selectedYear && Z === t.selectedMonth && (t.selectedDay = Math.min(t.selectedDay, S)), H = (this._getFirstDayOfMonth(te, Z) - c + 7) % 7, z = Math.ceil((H + S) / 7), O = X ? this.maxRows > z ? this.maxRows : z : z, this.maxRows = O, A = this._daylightSavingAdjust(new Date(te, Z, 1 - H)), N = 0; O > N; N++) {
            for (T += "<tr>", W = u ? "<td class='ui-datepicker-week-col'>" + this._get(t, "calculateWeek")(A) + "</td>" : "", w = 0; 7 > w; w++) {
              E = m ? m.apply(t.input ? t.input[0] : null, [A]) : [!0, ""], F = A.getMonth() !== Z, L = F && !v || !E[0] || Q && Q > A || J && A > J, W += "<td class='" + ((w + c + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (F ? " ui-datepicker-other-month" : "") + (A.getTime() === D.getTime() && Z === t.selectedMonth && t._keyEvent || b.getTime() === A.getTime() && b.getTime() === D.getTime() ? " " + this._dayOverClass : "") + (L ? " " + this._unselectableClass + " ui-state-disabled" : "") + (F && !_ ? "" : " " + E[1] + (A.getTime() === G.getTime() ? " " + this._currentClass : "") + (A.getTime() === B.getTime() ? " ui-datepicker-today" : "")) + "'" + (F && !_ || !E[2] ? "" : " title='" + E[2].replace(/'/g, "&#39;") + "'") + (L ? "" : " data-handler='selectDay' data-event='click' data-month='" + A.getMonth() + "' data-year='" + A.getFullYear() + "'") + ">" + (F && !_ ? "&#xa0;" : L ? "<span class='ui-state-default'>" + A.getDate() + "</span>" : "<a class='ui-state-default" + (A.getTime() === B.getTime() ? " ui-state-highlight" : "") + (A.getTime() === G.getTime() ? " ui-state-active" : "") + (F ? " ui-priority-secondary" : "") + "' href='#'>" + A.getDate() + "</a>") + "</td>", A.setDate(A.getDate() + 1), A = this._daylightSavingAdjust(A);
            }T += W + "</tr>";
          }Z++, Z > 11 && (Z = 0, te++), T += "</tbody></table>" + (X ? "</div>" + (U[0] > 0 && C === U[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""), x += T;
        }y += x;
      }return y += l, t._keyEvent = !1, y;
    }, _generateMonthYearHeader: function _generateMonthYearHeader(t, e, i, s, n, o, a, r) {
      var h,
          l,
          c,
          u,
          d,
          p,
          f,
          g,
          m = this._get(t, "changeMonth"),
          _ = this._get(t, "changeYear"),
          v = this._get(t, "showMonthAfterYear"),
          b = "<div class='ui-datepicker-title'>",
          y = "";if (o || !m) y += "<span class='ui-datepicker-month'>" + a[e] + "</span>";else {
        for (h = s && s.getFullYear() === i, l = n && n.getFullYear() === i, y += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", c = 0; 12 > c; c++) {
          (!h || c >= s.getMonth()) && (!l || n.getMonth() >= c) && (y += "<option value='" + c + "'" + (c === e ? " selected='selected'" : "") + ">" + r[c] + "</option>");
        }y += "</select>";
      }if (v || (b += y + (!o && m && _ ? "" : "&#xa0;")), !t.yearshtml) if (t.yearshtml = "", o || !_) b += "<span class='ui-datepicker-year'>" + i + "</span>";else {
        for (u = this._get(t, "yearRange").split(":"), d = new Date().getFullYear(), p = function p(t) {
          var e = t.match(/c[+\-].*/) ? i + parseInt(t.substring(1), 10) : t.match(/[+\-].*/) ? d + parseInt(t, 10) : parseInt(t, 10);return isNaN(e) ? d : e;
        }, f = p(u[0]), g = Math.max(f, p(u[1] || "")), f = s ? Math.max(f, s.getFullYear()) : f, g = n ? Math.min(g, n.getFullYear()) : g, t.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; g >= f; f++) {
          t.yearshtml += "<option value='" + f + "'" + (f === i ? " selected='selected'" : "") + ">" + f + "</option>";
        }t.yearshtml += "</select>", b += t.yearshtml, t.yearshtml = null;
      }return b += this._get(t, "yearSuffix"), v && (b += (!o && m && _ ? "" : "&#xa0;") + y), b += "</div>";
    }, _adjustInstDate: function _adjustInstDate(t, e, i) {
      var s = t.selectedYear + ("Y" === i ? e : 0),
          n = t.selectedMonth + ("M" === i ? e : 0),
          o = Math.min(t.selectedDay, this._getDaysInMonth(s, n)) + ("D" === i ? e : 0),
          a = this._restrictMinMax(t, this._daylightSavingAdjust(new Date(s, n, o)));t.selectedDay = a.getDate(), t.drawMonth = t.selectedMonth = a.getMonth(), t.drawYear = t.selectedYear = a.getFullYear(), ("M" === i || "Y" === i) && this._notifyChange(t);
    }, _restrictMinMax: function _restrictMinMax(t, e) {
      var i = this._getMinMaxDate(t, "min"),
          s = this._getMinMaxDate(t, "max"),
          n = i && i > e ? i : e;return s && n > s ? s : n;
    }, _notifyChange: function _notifyChange(t) {
      var e = this._get(t, "onChangeMonthYear");e && e.apply(t.input ? t.input[0] : null, [t.selectedYear, t.selectedMonth + 1, t]);
    }, _getNumberOfMonths: function _getNumberOfMonths(t) {
      var e = this._get(t, "numberOfMonths");return null == e ? [1, 1] : "number" == typeof e ? [1, e] : e;
    }, _getMinMaxDate: function _getMinMaxDate(t, e) {
      return this._determineDate(t, this._get(t, e + "Date"), null);
    }, _getDaysInMonth: function _getDaysInMonth(t, e) {
      return 32 - this._daylightSavingAdjust(new Date(t, e, 32)).getDate();
    }, _getFirstDayOfMonth: function _getFirstDayOfMonth(t, e) {
      return new Date(t, e, 1).getDay();
    }, _canAdjustMonth: function _canAdjustMonth(t, e, i, s) {
      var n = this._getNumberOfMonths(t),
          o = this._daylightSavingAdjust(new Date(i, s + (0 > e ? e : n[0] * n[1]), 1));return 0 > e && o.setDate(this._getDaysInMonth(o.getFullYear(), o.getMonth())), this._isInRange(t, o);
    }, _isInRange: function _isInRange(t, e) {
      var i,
          s,
          n = this._getMinMaxDate(t, "min"),
          o = this._getMinMaxDate(t, "max"),
          a = null,
          r = null,
          h = this._get(t, "yearRange");return h && (i = h.split(":"), s = new Date().getFullYear(), a = parseInt(i[0], 10), r = parseInt(i[1], 10), i[0].match(/[+\-].*/) && (a += s), i[1].match(/[+\-].*/) && (r += s)), (!n || e.getTime() >= n.getTime()) && (!o || e.getTime() <= o.getTime()) && (!a || e.getFullYear() >= a) && (!r || r >= e.getFullYear());
    }, _getFormatConfig: function _getFormatConfig(t) {
      var e = this._get(t, "shortYearCutoff");return e = "string" != typeof e ? e : new Date().getFullYear() % 100 + parseInt(e, 10), { shortYearCutoff: e, dayNamesShort: this._get(t, "dayNamesShort"), dayNames: this._get(t, "dayNames"), monthNamesShort: this._get(t, "monthNamesShort"), monthNames: this._get(t, "monthNames") };
    }, _formatDate: function _formatDate(t, e, i, s) {
      e || (t.currentDay = t.selectedDay, t.currentMonth = t.selectedMonth, t.currentYear = t.selectedYear);var n = e ? "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) ? e : this._daylightSavingAdjust(new Date(s, i, e)) : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));return this.formatDate(this._get(t, "dateFormat"), n, this._getFormatConfig(t));
    } }), t.fn.datepicker = function (e) {
    if (!this.length) return this;t.datepicker.initialized || (t(document).on("mousedown", t.datepicker._checkExternalClick), t.datepicker.initialized = !0), 0 === t("#" + t.datepicker._mainDivId).length && t("body").append(t.datepicker.dpDiv);var i = Array.prototype.slice.call(arguments, 1);return "string" != typeof e || "isDisabled" !== e && "getDate" !== e && "widget" !== e ? "option" === e && 2 === arguments.length && "string" == typeof arguments[1] ? t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this[0]].concat(i)) : this.each(function () {
      "string" == typeof e ? t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this].concat(i)) : t.datepicker._attachDatepicker(this, e);
    }) : t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this[0]].concat(i));
  }, t.datepicker = new s(), t.datepicker.initialized = !1, t.datepicker.uuid = new Date().getTime(), t.datepicker.version = "1.12.1", t.datepicker, t.widget("ui.dialog", { version: "1.12.1", options: { appendTo: "body", autoOpen: !0, buttons: [], classes: { "ui-dialog": "ui-corner-all", "ui-dialog-titlebar": "ui-corner-all" }, closeOnEscape: !0, closeText: "Close", draggable: !0, hide: null, height: "auto", maxHeight: null, maxWidth: null, minHeight: 150, minWidth: 150, modal: !1, position: { my: "center", at: "center", of: window, collision: "fit", using: function using(e) {
          var i = t(this).css(e).offset().top;0 > i && t(this).css("top", e.top - i);
        } }, resizable: !0, show: null, title: null, width: 300, beforeClose: null, close: null, drag: null, dragStart: null, dragStop: null, focus: null, open: null, resize: null, resizeStart: null, resizeStop: null }, sizeRelatedOptions: { buttons: !0, height: !0, maxHeight: !0, maxWidth: !0, minHeight: !0, minWidth: !0, width: !0 }, resizableRelatedOptions: { maxHeight: !0, maxWidth: !0, minHeight: !0, minWidth: !0 }, _create: function _create() {
      this.originalCss = { display: this.element[0].style.display, width: this.element[0].style.width, minHeight: this.element[0].style.minHeight, maxHeight: this.element[0].style.maxHeight, height: this.element[0].style.height }, this.originalPosition = { parent: this.element.parent(), index: this.element.parent().children().index(this.element) }, this.originalTitle = this.element.attr("title"), null == this.options.title && null != this.originalTitle && (this.options.title = this.originalTitle), this.options.disabled && (this.options.disabled = !1), this._createWrapper(), this.element.show().removeAttr("title").appendTo(this.uiDialog), this._addClass("ui-dialog-content", "ui-widget-content"), this._createTitlebar(), this._createButtonPane(), this.options.draggable && t.fn.draggable && this._makeDraggable(), this.options.resizable && t.fn.resizable && this._makeResizable(), this._isOpen = !1, this._trackFocus();
    }, _init: function _init() {
      this.options.autoOpen && this.open();
    }, _appendTo: function _appendTo() {
      var e = this.options.appendTo;return e && (e.jquery || e.nodeType) ? t(e) : this.document.find(e || "body").eq(0);
    }, _destroy: function _destroy() {
      var t,
          e = this.originalPosition;this._untrackInstance(), this._destroyOverlay(), this.element.removeUniqueId().css(this.originalCss).detach(), this.uiDialog.remove(), this.originalTitle && this.element.attr("title", this.originalTitle), t = e.parent.children().eq(e.index), t.length && t[0] !== this.element[0] ? t.before(this.element) : e.parent.append(this.element);
    }, widget: function widget() {
      return this.uiDialog;
    }, disable: t.noop, enable: t.noop, close: function close(e) {
      var i = this;this._isOpen && this._trigger("beforeClose", e) !== !1 && (this._isOpen = !1, this._focusedElement = null, this._destroyOverlay(), this._untrackInstance(), this.opener.filter(":focusable").trigger("focus").length || t.ui.safeBlur(t.ui.safeActiveElement(this.document[0])), this._hide(this.uiDialog, this.options.hide, function () {
        i._trigger("close", e);
      }));
    }, isOpen: function isOpen() {
      return this._isOpen;
    }, moveToTop: function moveToTop() {
      this._moveToTop();
    }, _moveToTop: function _moveToTop(e, i) {
      var s = !1,
          n = this.uiDialog.siblings(".ui-front:visible").map(function () {
        return +t(this).css("z-index");
      }).get(),
          o = Math.max.apply(null, n);return o >= +this.uiDialog.css("z-index") && (this.uiDialog.css("z-index", o + 1), s = !0), s && !i && this._trigger("focus", e), s;
    }, open: function open() {
      var e = this;return this._isOpen ? (this._moveToTop() && this._focusTabbable(), void 0) : (this._isOpen = !0, this.opener = t(t.ui.safeActiveElement(this.document[0])), this._size(), this._position(), this._createOverlay(), this._moveToTop(null, !0), this.overlay && this.overlay.css("z-index", this.uiDialog.css("z-index") - 1), this._show(this.uiDialog, this.options.show, function () {
        e._focusTabbable(), e._trigger("focus");
      }), this._makeFocusTarget(), this._trigger("open"), void 0);
    }, _focusTabbable: function _focusTabbable() {
      var t = this._focusedElement;t || (t = this.element.find("[autofocus]")), t.length || (t = this.element.find(":tabbable")), t.length || (t = this.uiDialogButtonPane.find(":tabbable")), t.length || (t = this.uiDialogTitlebarClose.filter(":tabbable")), t.length || (t = this.uiDialog), t.eq(0).trigger("focus");
    }, _keepFocus: function _keepFocus(e) {
      function i() {
        var e = t.ui.safeActiveElement(this.document[0]),
            i = this.uiDialog[0] === e || t.contains(this.uiDialog[0], e);i || this._focusTabbable();
      }e.preventDefault(), i.call(this), this._delay(i);
    }, _createWrapper: function _createWrapper() {
      this.uiDialog = t("<div>").hide().attr({ tabIndex: -1, role: "dialog" }).appendTo(this._appendTo()), this._addClass(this.uiDialog, "ui-dialog", "ui-widget ui-widget-content ui-front"), this._on(this.uiDialog, { keydown: function keydown(e) {
          if (this.options.closeOnEscape && !e.isDefaultPrevented() && e.keyCode && e.keyCode === t.ui.keyCode.ESCAPE) return e.preventDefault(), this.close(e), void 0;if (e.keyCode === t.ui.keyCode.TAB && !e.isDefaultPrevented()) {
            var i = this.uiDialog.find(":tabbable"),
                s = i.filter(":first"),
                n = i.filter(":last");e.target !== n[0] && e.target !== this.uiDialog[0] || e.shiftKey ? e.target !== s[0] && e.target !== this.uiDialog[0] || !e.shiftKey || (this._delay(function () {
              n.trigger("focus");
            }), e.preventDefault()) : (this._delay(function () {
              s.trigger("focus");
            }), e.preventDefault());
          }
        }, mousedown: function mousedown(t) {
          this._moveToTop(t) && this._focusTabbable();
        } }), this.element.find("[aria-describedby]").length || this.uiDialog.attr({ "aria-describedby": this.element.uniqueId().attr("id") });
    }, _createTitlebar: function _createTitlebar() {
      var e;this.uiDialogTitlebar = t("<div>"), this._addClass(this.uiDialogTitlebar, "ui-dialog-titlebar", "ui-widget-header ui-helper-clearfix"), this._on(this.uiDialogTitlebar, { mousedown: function mousedown(e) {
          t(e.target).closest(".ui-dialog-titlebar-close") || this.uiDialog.trigger("focus");
        } }), this.uiDialogTitlebarClose = t("<button type='button'></button>").button({ label: t("<a>").text(this.options.closeText).html(), icon: "ui-icon-closethick", showLabel: !1 }).appendTo(this.uiDialogTitlebar), this._addClass(this.uiDialogTitlebarClose, "ui-dialog-titlebar-close"), this._on(this.uiDialogTitlebarClose, { click: function click(t) {
          t.preventDefault(), this.close(t);
        } }), e = t("<span>").uniqueId().prependTo(this.uiDialogTitlebar), this._addClass(e, "ui-dialog-title"), this._title(e), this.uiDialogTitlebar.prependTo(this.uiDialog), this.uiDialog.attr({ "aria-labelledby": e.attr("id") });
    }, _title: function _title(t) {
      this.options.title ? t.text(this.options.title) : t.html("&#160;");
    }, _createButtonPane: function _createButtonPane() {
      this.uiDialogButtonPane = t("<div>"), this._addClass(this.uiDialogButtonPane, "ui-dialog-buttonpane", "ui-widget-content ui-helper-clearfix"), this.uiButtonSet = t("<div>").appendTo(this.uiDialogButtonPane), this._addClass(this.uiButtonSet, "ui-dialog-buttonset"), this._createButtons();
    }, _createButtons: function _createButtons() {
      var e = this,
          i = this.options.buttons;return this.uiDialogButtonPane.remove(), this.uiButtonSet.empty(), t.isEmptyObject(i) || t.isArray(i) && !i.length ? (this._removeClass(this.uiDialog, "ui-dialog-buttons"), void 0) : (t.each(i, function (i, s) {
        var n, o;s = t.isFunction(s) ? { click: s, text: i } : s, s = t.extend({ type: "button" }, s), n = s.click, o = { icon: s.icon, iconPosition: s.iconPosition, showLabel: s.showLabel, icons: s.icons, text: s.text }, delete s.click, delete s.icon, delete s.iconPosition, delete s.showLabel, delete s.icons, "boolean" == typeof s.text && delete s.text, t("<button></button>", s).button(o).appendTo(e.uiButtonSet).on("click", function () {
          n.apply(e.element[0], arguments);
        });
      }), this._addClass(this.uiDialog, "ui-dialog-buttons"), this.uiDialogButtonPane.appendTo(this.uiDialog), void 0);
    }, _makeDraggable: function _makeDraggable() {
      function e(t) {
        return { position: t.position, offset: t.offset };
      }var i = this,
          s = this.options;this.uiDialog.draggable({ cancel: ".ui-dialog-content, .ui-dialog-titlebar-close", handle: ".ui-dialog-titlebar", containment: "document", start: function start(s, n) {
          i._addClass(t(this), "ui-dialog-dragging"), i._blockFrames(), i._trigger("dragStart", s, e(n));
        }, drag: function drag(t, s) {
          i._trigger("drag", t, e(s));
        }, stop: function stop(n, o) {
          var a = o.offset.left - i.document.scrollLeft(),
              r = o.offset.top - i.document.scrollTop();s.position = { my: "left top", at: "left" + (a >= 0 ? "+" : "") + a + " " + "top" + (r >= 0 ? "+" : "") + r, of: i.window }, i._removeClass(t(this), "ui-dialog-dragging"), i._unblockFrames(), i._trigger("dragStop", n, e(o));
        } });
    }, _makeResizable: function _makeResizable() {
      function e(t) {
        return { originalPosition: t.originalPosition, originalSize: t.originalSize, position: t.position, size: t.size };
      }var i = this,
          s = this.options,
          n = s.resizable,
          o = this.uiDialog.css("position"),
          a = "string" == typeof n ? n : "n,e,s,w,se,sw,ne,nw";this.uiDialog.resizable({ cancel: ".ui-dialog-content", containment: "document", alsoResize: this.element, maxWidth: s.maxWidth, maxHeight: s.maxHeight, minWidth: s.minWidth, minHeight: this._minHeight(), handles: a, start: function start(s, n) {
          i._addClass(t(this), "ui-dialog-resizing"), i._blockFrames(), i._trigger("resizeStart", s, e(n));
        }, resize: function resize(t, s) {
          i._trigger("resize", t, e(s));
        }, stop: function stop(n, o) {
          var a = i.uiDialog.offset(),
              r = a.left - i.document.scrollLeft(),
              h = a.top - i.document.scrollTop();s.height = i.uiDialog.height(), s.width = i.uiDialog.width(), s.position = { my: "left top", at: "left" + (r >= 0 ? "+" : "") + r + " " + "top" + (h >= 0 ? "+" : "") + h, of: i.window }, i._removeClass(t(this), "ui-dialog-resizing"), i._unblockFrames(), i._trigger("resizeStop", n, e(o));
        } }).css("position", o);
    }, _trackFocus: function _trackFocus() {
      this._on(this.widget(), { focusin: function focusin(e) {
          this._makeFocusTarget(), this._focusedElement = t(e.target);
        } });
    }, _makeFocusTarget: function _makeFocusTarget() {
      this._untrackInstance(), this._trackingInstances().unshift(this);
    }, _untrackInstance: function _untrackInstance() {
      var e = this._trackingInstances(),
          i = t.inArray(this, e);-1 !== i && e.splice(i, 1);
    }, _trackingInstances: function _trackingInstances() {
      var t = this.document.data("ui-dialog-instances");return t || (t = [], this.document.data("ui-dialog-instances", t)), t;
    }, _minHeight: function _minHeight() {
      var t = this.options;return "auto" === t.height ? t.minHeight : Math.min(t.minHeight, t.height);
    }, _position: function _position() {
      var t = this.uiDialog.is(":visible");t || this.uiDialog.show(), this.uiDialog.position(this.options.position), t || this.uiDialog.hide();
    }, _setOptions: function _setOptions(e) {
      var i = this,
          s = !1,
          n = {};t.each(e, function (t, e) {
        i._setOption(t, e), t in i.sizeRelatedOptions && (s = !0), t in i.resizableRelatedOptions && (n[t] = e);
      }), s && (this._size(), this._position()), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", n);
    }, _setOption: function _setOption(e, i) {
      var s,
          n,
          o = this.uiDialog;"disabled" !== e && (this._super(e, i), "appendTo" === e && this.uiDialog.appendTo(this._appendTo()), "buttons" === e && this._createButtons(), "closeText" === e && this.uiDialogTitlebarClose.button({ label: t("<a>").text("" + this.options.closeText).html() }), "draggable" === e && (s = o.is(":data(ui-draggable)"), s && !i && o.draggable("destroy"), !s && i && this._makeDraggable()), "position" === e && this._position(), "resizable" === e && (n = o.is(":data(ui-resizable)"), n && !i && o.resizable("destroy"), n && "string" == typeof i && o.resizable("option", "handles", i), n || i === !1 || this._makeResizable()), "title" === e && this._title(this.uiDialogTitlebar.find(".ui-dialog-title")));
    }, _size: function _size() {
      var t,
          e,
          i,
          s = this.options;this.element.show().css({ width: "auto", minHeight: 0, maxHeight: "none", height: 0 }), s.minWidth > s.width && (s.width = s.minWidth), t = this.uiDialog.css({ height: "auto", width: s.width }).outerHeight(), e = Math.max(0, s.minHeight - t), i = "number" == typeof s.maxHeight ? Math.max(0, s.maxHeight - t) : "none", "auto" === s.height ? this.element.css({ minHeight: e, maxHeight: i, height: "auto" }) : this.element.height(Math.max(0, s.height - t)), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight());
    }, _blockFrames: function _blockFrames() {
      this.iframeBlocks = this.document.find("iframe").map(function () {
        var e = t(this);return t("<div>").css({ position: "absolute", width: e.outerWidth(), height: e.outerHeight() }).appendTo(e.parent()).offset(e.offset())[0];
      });
    }, _unblockFrames: function _unblockFrames() {
      this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks);
    }, _allowInteraction: function _allowInteraction(e) {
      return t(e.target).closest(".ui-dialog").length ? !0 : !!t(e.target).closest(".ui-datepicker").length;
    }, _createOverlay: function _createOverlay() {
      if (this.options.modal) {
        var e = !0;this._delay(function () {
          e = !1;
        }), this.document.data("ui-dialog-overlays") || this._on(this.document, { focusin: function focusin(t) {
            e || this._allowInteraction(t) || (t.preventDefault(), this._trackingInstances()[0]._focusTabbable());
          } }), this.overlay = t("<div>").appendTo(this._appendTo()), this._addClass(this.overlay, null, "ui-widget-overlay ui-front"), this._on(this.overlay, { mousedown: "_keepFocus" }), this.document.data("ui-dialog-overlays", (this.document.data("ui-dialog-overlays") || 0) + 1);
      }
    }, _destroyOverlay: function _destroyOverlay() {
      if (this.options.modal && this.overlay) {
        var t = this.document.data("ui-dialog-overlays") - 1;t ? this.document.data("ui-dialog-overlays", t) : (this._off(this.document, "focusin"), this.document.removeData("ui-dialog-overlays")), this.overlay.remove(), this.overlay = null;
      }
    } }), t.uiBackCompat !== !1 && t.widget("ui.dialog", t.ui.dialog, { options: { dialogClass: "" }, _createWrapper: function _createWrapper() {
      this._super(), this.uiDialog.addClass(this.options.dialogClass);
    }, _setOption: function _setOption(t, e) {
      "dialogClass" === t && this.uiDialog.removeClass(this.options.dialogClass).addClass(e), this._superApply(arguments);
    } }), t.ui.dialog, t.widget("ui.progressbar", { version: "1.12.1", options: { classes: { "ui-progressbar": "ui-corner-all", "ui-progressbar-value": "ui-corner-left", "ui-progressbar-complete": "ui-corner-right" }, max: 100, value: 0, change: null, complete: null }, min: 0, _create: function _create() {
      this.oldValue = this.options.value = this._constrainedValue(), this.element.attr({ role: "progressbar", "aria-valuemin": this.min }), this._addClass("ui-progressbar", "ui-widget ui-widget-content"), this.valueDiv = t("<div>").appendTo(this.element), this._addClass(this.valueDiv, "ui-progressbar-value", "ui-widget-header"), this._refreshValue();
    }, _destroy: function _destroy() {
      this.element.removeAttr("role aria-valuemin aria-valuemax aria-valuenow"), this.valueDiv.remove();
    }, value: function value(t) {
      return void 0 === t ? this.options.value : (this.options.value = this._constrainedValue(t), this._refreshValue(), void 0);
    }, _constrainedValue: function _constrainedValue(t) {
      return void 0 === t && (t = this.options.value), this.indeterminate = t === !1, "number" != typeof t && (t = 0), this.indeterminate ? !1 : Math.min(this.options.max, Math.max(this.min, t));
    }, _setOptions: function _setOptions(t) {
      var e = t.value;delete t.value, this._super(t), this.options.value = this._constrainedValue(e), this._refreshValue();
    }, _setOption: function _setOption(t, e) {
      "max" === t && (e = Math.max(this.min, e)), this._super(t, e);
    }, _setOptionDisabled: function _setOptionDisabled(t) {
      this._super(t), this.element.attr("aria-disabled", t), this._toggleClass(null, "ui-state-disabled", !!t);
    }, _percentage: function _percentage() {
      return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min);
    }, _refreshValue: function _refreshValue() {
      var e = this.options.value,
          i = this._percentage();this.valueDiv.toggle(this.indeterminate || e > this.min).width(i.toFixed(0) + "%"), this._toggleClass(this.valueDiv, "ui-progressbar-complete", null, e === this.options.max)._toggleClass("ui-progressbar-indeterminate", null, this.indeterminate), this.indeterminate ? (this.element.removeAttr("aria-valuenow"), this.overlayDiv || (this.overlayDiv = t("<div>").appendTo(this.valueDiv), this._addClass(this.overlayDiv, "ui-progressbar-overlay"))) : (this.element.attr({ "aria-valuemax": this.options.max, "aria-valuenow": e }), this.overlayDiv && (this.overlayDiv.remove(), this.overlayDiv = null)), this.oldValue !== e && (this.oldValue = e, this._trigger("change")), e === this.options.max && this._trigger("complete");
    } }), t.widget("ui.selectmenu", [t.ui.formResetMixin, { version: "1.12.1", defaultElement: "<select>", options: { appendTo: null, classes: { "ui-selectmenu-button-open": "ui-corner-top", "ui-selectmenu-button-closed": "ui-corner-all" }, disabled: null, icons: { button: "ui-icon-triangle-1-s" }, position: { my: "left top", at: "left bottom", collision: "none" }, width: !1, change: null, close: null, focus: null, open: null, select: null }, _create: function _create() {
      var e = this.element.uniqueId().attr("id");this.ids = { element: e, button: e + "-button", menu: e + "-menu" }, this._drawButton(), this._drawMenu(), this._bindFormResetHandler(), this._rendered = !1, this.menuItems = t();
    }, _drawButton: function _drawButton() {
      var e,
          i = this,
          s = this._parseOption(this.element.find("option:selected"), this.element[0].selectedIndex);this.labels = this.element.labels().attr("for", this.ids.button), this._on(this.labels, { click: function click(t) {
          this.button.focus(), t.preventDefault();
        } }), this.element.hide(), this.button = t("<span>", { tabindex: this.options.disabled ? -1 : 0, id: this.ids.button, role: "combobox", "aria-expanded": "false", "aria-autocomplete": "list", "aria-owns": this.ids.menu, "aria-haspopup": "true", title: this.element.attr("title") }).insertAfter(this.element), this._addClass(this.button, "ui-selectmenu-button ui-selectmenu-button-closed", "ui-button ui-widget"), e = t("<span>").appendTo(this.button), this._addClass(e, "ui-selectmenu-icon", "ui-icon " + this.options.icons.button), this.buttonItem = this._renderButtonItem(s).appendTo(this.button), this.options.width !== !1 && this._resizeButton(), this._on(this.button, this._buttonEvents), this.button.one("focusin", function () {
        i._rendered || i._refreshMenu();
      });
    }, _drawMenu: function _drawMenu() {
      var e = this;this.menu = t("<ul>", { "aria-hidden": "true", "aria-labelledby": this.ids.button, id: this.ids.menu }), this.menuWrap = t("<div>").append(this.menu), this._addClass(this.menuWrap, "ui-selectmenu-menu", "ui-front"), this.menuWrap.appendTo(this._appendTo()), this.menuInstance = this.menu.menu({ classes: { "ui-menu": "ui-corner-bottom" }, role: "listbox", select: function select(t, i) {
          t.preventDefault(), e._setSelection(), e._select(i.item.data("ui-selectmenu-item"), t);
        }, focus: function focus(t, i) {
          var s = i.item.data("ui-selectmenu-item");null != e.focusIndex && s.index !== e.focusIndex && (e._trigger("focus", t, { item: s }), e.isOpen || e._select(s, t)), e.focusIndex = s.index, e.button.attr("aria-activedescendant", e.menuItems.eq(s.index).attr("id"));
        } }).menu("instance"), this.menuInstance._off(this.menu, "mouseleave"), this.menuInstance._closeOnDocumentClick = function () {
        return !1;
      }, this.menuInstance._isDivider = function () {
        return !1;
      };
    }, refresh: function refresh() {
      this._refreshMenu(), this.buttonItem.replaceWith(this.buttonItem = this._renderButtonItem(this._getSelectedItem().data("ui-selectmenu-item") || {})), null === this.options.width && this._resizeButton();
    }, _refreshMenu: function _refreshMenu() {
      var t,
          e = this.element.find("option");this.menu.empty(), this._parseOptions(e), this._renderMenu(this.menu, this.items), this.menuInstance.refresh(), this.menuItems = this.menu.find("li").not(".ui-selectmenu-optgroup").find(".ui-menu-item-wrapper"), this._rendered = !0, e.length && (t = this._getSelectedItem(), this.menuInstance.focus(null, t), this._setAria(t.data("ui-selectmenu-item")), this._setOption("disabled", this.element.prop("disabled")));
    }, open: function open(t) {
      this.options.disabled || (this._rendered ? (this._removeClass(this.menu.find(".ui-state-active"), null, "ui-state-active"), this.menuInstance.focus(null, this._getSelectedItem())) : this._refreshMenu(), this.menuItems.length && (this.isOpen = !0, this._toggleAttr(), this._resizeMenu(), this._position(), this._on(this.document, this._documentClick), this._trigger("open", t)));
    }, _position: function _position() {
      this.menuWrap.position(t.extend({ of: this.button }, this.options.position));
    }, close: function close(t) {
      this.isOpen && (this.isOpen = !1, this._toggleAttr(), this.range = null, this._off(this.document), this._trigger("close", t));
    }, widget: function widget() {
      return this.button;
    }, menuWidget: function menuWidget() {
      return this.menu;
    }, _renderButtonItem: function _renderButtonItem(e) {
      var i = t("<span>");return this._setText(i, e.label), this._addClass(i, "ui-selectmenu-text"), i;
    }, _renderMenu: function _renderMenu(e, i) {
      var s = this,
          n = "";t.each(i, function (i, o) {
        var a;o.optgroup !== n && (a = t("<li>", { text: o.optgroup }), s._addClass(a, "ui-selectmenu-optgroup", "ui-menu-divider" + (o.element.parent("optgroup").prop("disabled") ? " ui-state-disabled" : "")), a.appendTo(e), n = o.optgroup), s._renderItemData(e, o);
      });
    }, _renderItemData: function _renderItemData(t, e) {
      return this._renderItem(t, e).data("ui-selectmenu-item", e);
    }, _renderItem: function _renderItem(e, i) {
      var s = t("<li>"),
          n = t("<div>", { title: i.element.attr("title") });return i.disabled && this._addClass(s, null, "ui-state-disabled"), this._setText(n, i.label), s.append(n).appendTo(e);
    }, _setText: function _setText(t, e) {
      e ? t.text(e) : t.html("&#160;");
    }, _move: function _move(t, e) {
      var i,
          s,
          n = ".ui-menu-item";this.isOpen ? i = this.menuItems.eq(this.focusIndex).parent("li") : (i = this.menuItems.eq(this.element[0].selectedIndex).parent("li"), n += ":not(.ui-state-disabled)"), s = "first" === t || "last" === t ? i["first" === t ? "prevAll" : "nextAll"](n).eq(-1) : i[t + "All"](n).eq(0), s.length && this.menuInstance.focus(e, s);
    }, _getSelectedItem: function _getSelectedItem() {
      return this.menuItems.eq(this.element[0].selectedIndex).parent("li");
    }, _toggle: function _toggle(t) {
      this[this.isOpen ? "close" : "open"](t);
    }, _setSelection: function _setSelection() {
      var t;this.range && (window.getSelection ? (t = window.getSelection(), t.removeAllRanges(), t.addRange(this.range)) : this.range.select(), this.button.focus());
    }, _documentClick: { mousedown: function mousedown(e) {
        this.isOpen && (t(e.target).closest(".ui-selectmenu-menu, #" + t.ui.escapeSelector(this.ids.button)).length || this.close(e));
      } }, _buttonEvents: { mousedown: function mousedown() {
        var t;window.getSelection ? (t = window.getSelection(), t.rangeCount && (this.range = t.getRangeAt(0))) : this.range = document.selection.createRange();
      }, click: function click(t) {
        this._setSelection(), this._toggle(t);
      }, keydown: function keydown(e) {
        var i = !0;switch (e.keyCode) {case t.ui.keyCode.TAB:case t.ui.keyCode.ESCAPE:
            this.close(e), i = !1;break;case t.ui.keyCode.ENTER:
            this.isOpen && this._selectFocusedItem(e);break;case t.ui.keyCode.UP:
            e.altKey ? this._toggle(e) : this._move("prev", e);break;case t.ui.keyCode.DOWN:
            e.altKey ? this._toggle(e) : this._move("next", e);break;case t.ui.keyCode.SPACE:
            this.isOpen ? this._selectFocusedItem(e) : this._toggle(e);break;case t.ui.keyCode.LEFT:
            this._move("prev", e);break;case t.ui.keyCode.RIGHT:
            this._move("next", e);break;case t.ui.keyCode.HOME:case t.ui.keyCode.PAGE_UP:
            this._move("first", e);break;case t.ui.keyCode.END:case t.ui.keyCode.PAGE_DOWN:
            this._move("last", e);break;default:
            this.menu.trigger(e), i = !1;}i && e.preventDefault();
      } }, _selectFocusedItem: function _selectFocusedItem(t) {
      var e = this.menuItems.eq(this.focusIndex).parent("li");e.hasClass("ui-state-disabled") || this._select(e.data("ui-selectmenu-item"), t);
    }, _select: function _select(t, e) {
      var i = this.element[0].selectedIndex;this.element[0].selectedIndex = t.index, this.buttonItem.replaceWith(this.buttonItem = this._renderButtonItem(t)), this._setAria(t), this._trigger("select", e, { item: t }), t.index !== i && this._trigger("change", e, { item: t }), this.close(e);
    }, _setAria: function _setAria(t) {
      var e = this.menuItems.eq(t.index).attr("id");this.button.attr({ "aria-labelledby": e, "aria-activedescendant": e }), this.menu.attr("aria-activedescendant", e);
    }, _setOption: function _setOption(t, e) {
      if ("icons" === t) {
        var i = this.button.find("span.ui-icon");this._removeClass(i, null, this.options.icons.button)._addClass(i, null, e.button);
      }this._super(t, e), "appendTo" === t && this.menuWrap.appendTo(this._appendTo()), "width" === t && this._resizeButton();
    }, _setOptionDisabled: function _setOptionDisabled(t) {
      this._super(t), this.menuInstance.option("disabled", t), this.button.attr("aria-disabled", t), this._toggleClass(this.button, null, "ui-state-disabled", t), this.element.prop("disabled", t), t ? (this.button.attr("tabindex", -1), this.close()) : this.button.attr("tabindex", 0);
    }, _appendTo: function _appendTo() {
      var e = this.options.appendTo;return e && (e = e.jquery || e.nodeType ? t(e) : this.document.find(e).eq(0)), e && e[0] || (e = this.element.closest(".ui-front, dialog")), e.length || (e = this.document[0].body), e;
    }, _toggleAttr: function _toggleAttr() {
      this.button.attr("aria-expanded", this.isOpen), this._removeClass(this.button, "ui-selectmenu-button-" + (this.isOpen ? "closed" : "open"))._addClass(this.button, "ui-selectmenu-button-" + (this.isOpen ? "open" : "closed"))._toggleClass(this.menuWrap, "ui-selectmenu-open", null, this.isOpen), this.menu.attr("aria-hidden", !this.isOpen);
    }, _resizeButton: function _resizeButton() {
      var t = this.options.width;return t === !1 ? (this.button.css("width", ""), void 0) : (null === t && (t = this.element.show().outerWidth(), this.element.hide()), this.button.outerWidth(t), void 0);
    }, _resizeMenu: function _resizeMenu() {
      this.menu.outerWidth(Math.max(this.button.outerWidth(), this.menu.width("").outerWidth() + 1));
    }, _getCreateOptions: function _getCreateOptions() {
      var t = this._super();return t.disabled = this.element.prop("disabled"), t;
    }, _parseOptions: function _parseOptions(e) {
      var i = this,
          s = [];e.each(function (e, n) {
        s.push(i._parseOption(t(n), e));
      }), this.items = s;
    }, _parseOption: function _parseOption(t, e) {
      var i = t.parent("optgroup");return { element: t, index: e, value: t.val(), label: t.text(), optgroup: i.attr("label") || "", disabled: i.prop("disabled") || t.prop("disabled") };
    }, _destroy: function _destroy() {
      this._unbindFormResetHandler(), this.menuWrap.remove(), this.button.remove(), this.element.show(), this.element.removeUniqueId(), this.labels.attr("for", this.ids.element);
    } }]), t.widget("ui.slider", t.ui.mouse, { version: "1.12.1", widgetEventPrefix: "slide", options: { animate: !1, classes: { "ui-slider": "ui-corner-all", "ui-slider-handle": "ui-corner-all", "ui-slider-range": "ui-corner-all ui-widget-header" }, distance: 0, max: 100, min: 0, orientation: "horizontal", range: !1, step: 1, value: 0, values: null, change: null, slide: null, start: null, stop: null }, numPages: 5, _create: function _create() {
      this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this._calculateNewMax(), this._addClass("ui-slider ui-slider-" + this.orientation, "ui-widget ui-widget-content"), this._refresh(), this._animateOff = !1;
    }, _refresh: function _refresh() {
      this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue();
    }, _createHandles: function _createHandles() {
      var e,
          i,
          s = this.options,
          n = this.element.find(".ui-slider-handle"),
          o = "<span tabindex='0'></span>",
          a = [];for (i = s.values && s.values.length || 1, n.length > i && (n.slice(i).remove(), n = n.slice(0, i)), e = n.length; i > e; e++) {
        a.push(o);
      }this.handles = n.add(t(a.join("")).appendTo(this.element)), this._addClass(this.handles, "ui-slider-handle", "ui-state-default"), this.handle = this.handles.eq(0), this.handles.each(function (e) {
        t(this).data("ui-slider-handle-index", e).attr("tabIndex", 0);
      });
    }, _createRange: function _createRange() {
      var e = this.options;e.range ? (e.range === !0 && (e.values ? e.values.length && 2 !== e.values.length ? e.values = [e.values[0], e.values[0]] : t.isArray(e.values) && (e.values = e.values.slice(0)) : e.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? (this._removeClass(this.range, "ui-slider-range-min ui-slider-range-max"), this.range.css({ left: "", bottom: "" })) : (this.range = t("<div>").appendTo(this.element), this._addClass(this.range, "ui-slider-range")), ("min" === e.range || "max" === e.range) && this._addClass(this.range, "ui-slider-range-" + e.range)) : (this.range && this.range.remove(), this.range = null);
    }, _setupEvents: function _setupEvents() {
      this._off(this.handles), this._on(this.handles, this._handleEvents), this._hoverable(this.handles), this._focusable(this.handles);
    }, _destroy: function _destroy() {
      this.handles.remove(), this.range && this.range.remove(), this._mouseDestroy();
    }, _mouseCapture: function _mouseCapture(e) {
      var i,
          s,
          n,
          o,
          a,
          r,
          h,
          l,
          c = this,
          u = this.options;return u.disabled ? !1 : (this.elementSize = { width: this.element.outerWidth(), height: this.element.outerHeight() }, this.elementOffset = this.element.offset(), i = { x: e.pageX, y: e.pageY }, s = this._normValueFromMouse(i), n = this._valueMax() - this._valueMin() + 1, this.handles.each(function (e) {
        var i = Math.abs(s - c.values(e));(n > i || n === i && (e === c._lastChangedValue || c.values(e) === u.min)) && (n = i, o = t(this), a = e);
      }), r = this._start(e, a), r === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = a, this._addClass(o, null, "ui-state-active"), o.trigger("focus"), h = o.offset(), l = !t(e.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = l ? { left: 0, top: 0 } : { left: e.pageX - h.left - o.width() / 2, top: e.pageY - h.top - o.height() / 2 - (parseInt(o.css("borderTopWidth"), 10) || 0) - (parseInt(o.css("borderBottomWidth"), 10) || 0) + (parseInt(o.css("marginTop"), 10) || 0) }, this.handles.hasClass("ui-state-hover") || this._slide(e, a, s), this._animateOff = !0, !0));
    }, _mouseStart: function _mouseStart() {
      return !0;
    }, _mouseDrag: function _mouseDrag(t) {
      var e = { x: t.pageX, y: t.pageY },
          i = this._normValueFromMouse(e);return this._slide(t, this._handleIndex, i), !1;
    }, _mouseStop: function _mouseStop(t) {
      return this._removeClass(this.handles, null, "ui-state-active"), this._mouseSliding = !1, this._stop(t, this._handleIndex), this._change(t, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1;
    }, _detectOrientation: function _detectOrientation() {
      this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal";
    }, _normValueFromMouse: function _normValueFromMouse(t) {
      var e, i, s, n, o;return "horizontal" === this.orientation ? (e = this.elementSize.width, i = t.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (e = this.elementSize.height, i = t.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), s = i / e, s > 1 && (s = 1), 0 > s && (s = 0), "vertical" === this.orientation && (s = 1 - s), n = this._valueMax() - this._valueMin(), o = this._valueMin() + s * n, this._trimAlignValue(o);
    }, _uiHash: function _uiHash(t, e, i) {
      var s = { handle: this.handles[t], handleIndex: t, value: void 0 !== e ? e : this.value() };return this._hasMultipleValues() && (s.value = void 0 !== e ? e : this.values(t), s.values = i || this.values()), s;
    }, _hasMultipleValues: function _hasMultipleValues() {
      return this.options.values && this.options.values.length;
    }, _start: function _start(t, e) {
      return this._trigger("start", t, this._uiHash(e));
    }, _slide: function _slide(t, e, i) {
      var s,
          n,
          o = this.value(),
          a = this.values();this._hasMultipleValues() && (n = this.values(e ? 0 : 1), o = this.values(e), 2 === this.options.values.length && this.options.range === !0 && (i = 0 === e ? Math.min(n, i) : Math.max(n, i)), a[e] = i), i !== o && (s = this._trigger("slide", t, this._uiHash(e, i, a)), s !== !1 && (this._hasMultipleValues() ? this.values(e, i) : this.value(i)));
    }, _stop: function _stop(t, e) {
      this._trigger("stop", t, this._uiHash(e));
    }, _change: function _change(t, e) {
      this._keySliding || this._mouseSliding || (this._lastChangedValue = e, this._trigger("change", t, this._uiHash(e)));
    }, value: function value(t) {
      return arguments.length ? (this.options.value = this._trimAlignValue(t), this._refreshValue(), this._change(null, 0), void 0) : this._value();
    }, values: function values(e, i) {
      var s, n, o;if (arguments.length > 1) return this.options.values[e] = this._trimAlignValue(i), this._refreshValue(), this._change(null, e), void 0;if (!arguments.length) return this._values();if (!t.isArray(arguments[0])) return this._hasMultipleValues() ? this._values(e) : this.value();for (s = this.options.values, n = arguments[0], o = 0; s.length > o; o += 1) {
        s[o] = this._trimAlignValue(n[o]), this._change(null, o);
      }this._refreshValue();
    }, _setOption: function _setOption(e, i) {
      var s,
          n = 0;switch ("range" === e && this.options.range === !0 && ("min" === i ? (this.options.value = this._values(0), this.options.values = null) : "max" === i && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), t.isArray(this.options.values) && (n = this.options.values.length), this._super(e, i), e) {case "orientation":
          this._detectOrientation(), this._removeClass("ui-slider-horizontal ui-slider-vertical")._addClass("ui-slider-" + this.orientation), this._refreshValue(), this.options.range && this._refreshRange(i), this.handles.css("horizontal" === i ? "bottom" : "left", "");break;case "value":
          this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;break;case "values":
          for (this._animateOff = !0, this._refreshValue(), s = n - 1; s >= 0; s--) {
            this._change(null, s);
          }this._animateOff = !1;break;case "step":case "min":case "max":
          this._animateOff = !0, this._calculateNewMax(), this._refreshValue(), this._animateOff = !1;break;case "range":
          this._animateOff = !0, this._refresh(), this._animateOff = !1;}
    }, _setOptionDisabled: function _setOptionDisabled(t) {
      this._super(t), this._toggleClass(null, "ui-state-disabled", !!t);
    }, _value: function _value() {
      var t = this.options.value;return t = this._trimAlignValue(t);
    }, _values: function _values(t) {
      var e, i, s;if (arguments.length) return e = this.options.values[t], e = this._trimAlignValue(e);if (this._hasMultipleValues()) {
        for (i = this.options.values.slice(), s = 0; i.length > s; s += 1) {
          i[s] = this._trimAlignValue(i[s]);
        }return i;
      }return [];
    }, _trimAlignValue: function _trimAlignValue(t) {
      if (this._valueMin() >= t) return this._valueMin();if (t >= this._valueMax()) return this._valueMax();var e = this.options.step > 0 ? this.options.step : 1,
          i = (t - this._valueMin()) % e,
          s = t - i;return 2 * Math.abs(i) >= e && (s += i > 0 ? e : -e), parseFloat(s.toFixed(5));
    }, _calculateNewMax: function _calculateNewMax() {
      var t = this.options.max,
          e = this._valueMin(),
          i = this.options.step,
          s = Math.round((t - e) / i) * i;t = s + e, t > this.options.max && (t -= i), this.max = parseFloat(t.toFixed(this._precision()));
    }, _precision: function _precision() {
      var t = this._precisionOf(this.options.step);return null !== this.options.min && (t = Math.max(t, this._precisionOf(this.options.min))), t;
    }, _precisionOf: function _precisionOf(t) {
      var e = "" + t,
          i = e.indexOf(".");return -1 === i ? 0 : e.length - i - 1;
    }, _valueMin: function _valueMin() {
      return this.options.min;
    }, _valueMax: function _valueMax() {
      return this.max;
    }, _refreshRange: function _refreshRange(t) {
      "vertical" === t && this.range.css({ width: "", left: "" }), "horizontal" === t && this.range.css({ height: "", bottom: "" });
    }, _refreshValue: function _refreshValue() {
      var e,
          i,
          s,
          n,
          o,
          a = this.options.range,
          r = this.options,
          h = this,
          l = this._animateOff ? !1 : r.animate,
          c = {};this._hasMultipleValues() ? this.handles.each(function (s) {
        i = 100 * ((h.values(s) - h._valueMin()) / (h._valueMax() - h._valueMin())), c["horizontal" === h.orientation ? "left" : "bottom"] = i + "%", t(this).stop(1, 1)[l ? "animate" : "css"](c, r.animate), h.options.range === !0 && ("horizontal" === h.orientation ? (0 === s && h.range.stop(1, 1)[l ? "animate" : "css"]({ left: i + "%" }, r.animate), 1 === s && h.range[l ? "animate" : "css"]({ width: i - e + "%" }, { queue: !1, duration: r.animate })) : (0 === s && h.range.stop(1, 1)[l ? "animate" : "css"]({ bottom: i + "%" }, r.animate), 1 === s && h.range[l ? "animate" : "css"]({ height: i - e + "%" }, { queue: !1, duration: r.animate }))), e = i;
      }) : (s = this.value(), n = this._valueMin(), o = this._valueMax(), i = o !== n ? 100 * ((s - n) / (o - n)) : 0, c["horizontal" === this.orientation ? "left" : "bottom"] = i + "%", this.handle.stop(1, 1)[l ? "animate" : "css"](c, r.animate), "min" === a && "horizontal" === this.orientation && this.range.stop(1, 1)[l ? "animate" : "css"]({ width: i + "%" }, r.animate), "max" === a && "horizontal" === this.orientation && this.range.stop(1, 1)[l ? "animate" : "css"]({ width: 100 - i + "%" }, r.animate), "min" === a && "vertical" === this.orientation && this.range.stop(1, 1)[l ? "animate" : "css"]({ height: i + "%" }, r.animate), "max" === a && "vertical" === this.orientation && this.range.stop(1, 1)[l ? "animate" : "css"]({ height: 100 - i + "%" }, r.animate));
    }, _handleEvents: { keydown: function keydown(e) {
        var i,
            s,
            n,
            o,
            a = t(e.target).data("ui-slider-handle-index");switch (e.keyCode) {case t.ui.keyCode.HOME:case t.ui.keyCode.END:case t.ui.keyCode.PAGE_UP:case t.ui.keyCode.PAGE_DOWN:case t.ui.keyCode.UP:case t.ui.keyCode.RIGHT:case t.ui.keyCode.DOWN:case t.ui.keyCode.LEFT:
            if (e.preventDefault(), !this._keySliding && (this._keySliding = !0, this._addClass(t(e.target), null, "ui-state-active"), i = this._start(e, a), i === !1)) return;}switch (o = this.options.step, s = n = this._hasMultipleValues() ? this.values(a) : this.value(), e.keyCode) {case t.ui.keyCode.HOME:
            n = this._valueMin();break;case t.ui.keyCode.END:
            n = this._valueMax();break;case t.ui.keyCode.PAGE_UP:
            n = this._trimAlignValue(s + (this._valueMax() - this._valueMin()) / this.numPages);break;case t.ui.keyCode.PAGE_DOWN:
            n = this._trimAlignValue(s - (this._valueMax() - this._valueMin()) / this.numPages);break;case t.ui.keyCode.UP:case t.ui.keyCode.RIGHT:
            if (s === this._valueMax()) return;n = this._trimAlignValue(s + o);break;case t.ui.keyCode.DOWN:case t.ui.keyCode.LEFT:
            if (s === this._valueMin()) return;n = this._trimAlignValue(s - o);}this._slide(e, a, n);
      }, keyup: function keyup(e) {
        var i = t(e.target).data("ui-slider-handle-index");this._keySliding && (this._keySliding = !1, this._stop(e, i), this._change(e, i), this._removeClass(t(e.target), null, "ui-state-active"));
      } } }), t.widget("ui.spinner", { version: "1.12.1", defaultElement: "<input>", widgetEventPrefix: "spin", options: { classes: { "ui-spinner": "ui-corner-all", "ui-spinner-down": "ui-corner-br", "ui-spinner-up": "ui-corner-tr" }, culture: null, icons: { down: "ui-icon-triangle-1-s", up: "ui-icon-triangle-1-n" }, incremental: !0, max: null, min: null, numberFormat: null, page: 10, step: 1, change: null, spin: null, start: null, stop: null }, _create: function _create() {
      this._setOption("max", this.options.max), this._setOption("min", this.options.min), this._setOption("step", this.options.step), "" !== this.value() && this._value(this.element.val(), !0), this._draw(), this._on(this._events), this._refresh(), this._on(this.window, { beforeunload: function beforeunload() {
          this.element.removeAttr("autocomplete");
        } });
    }, _getCreateOptions: function _getCreateOptions() {
      var e = this._super(),
          i = this.element;return t.each(["min", "max", "step"], function (t, s) {
        var n = i.attr(s);null != n && n.length && (e[s] = n);
      }), e;
    }, _events: { keydown: function keydown(t) {
        this._start(t) && this._keydown(t) && t.preventDefault();
      }, keyup: "_stop", focus: function focus() {
        this.previous = this.element.val();
      }, blur: function blur(t) {
        return this.cancelBlur ? (delete this.cancelBlur, void 0) : (this._stop(), this._refresh(), this.previous !== this.element.val() && this._trigger("change", t), void 0);
      }, mousewheel: function mousewheel(t, e) {
        if (e) {
          if (!this.spinning && !this._start(t)) return !1;this._spin((e > 0 ? 1 : -1) * this.options.step, t), clearTimeout(this.mousewheelTimer), this.mousewheelTimer = this._delay(function () {
            this.spinning && this._stop(t);
          }, 100), t.preventDefault();
        }
      }, "mousedown .ui-spinner-button": function mousedownUiSpinnerButton(e) {
        function i() {
          var e = this.element[0] === t.ui.safeActiveElement(this.document[0]);e || (this.element.trigger("focus"), this.previous = s, this._delay(function () {
            this.previous = s;
          }));
        }var s;s = this.element[0] === t.ui.safeActiveElement(this.document[0]) ? this.previous : this.element.val(), e.preventDefault(), i.call(this), this.cancelBlur = !0, this._delay(function () {
          delete this.cancelBlur, i.call(this);
        }), this._start(e) !== !1 && this._repeat(null, t(e.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, e);
      }, "mouseup .ui-spinner-button": "_stop", "mouseenter .ui-spinner-button": function mouseenterUiSpinnerButton(e) {
        return t(e.currentTarget).hasClass("ui-state-active") ? this._start(e) === !1 ? !1 : (this._repeat(null, t(e.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, e), void 0) : void 0;
      }, "mouseleave .ui-spinner-button": "_stop" }, _enhance: function _enhance() {
      this.uiSpinner = this.element.attr("autocomplete", "off").wrap("<span>").parent().append("<a></a><a></a>");
    }, _draw: function _draw() {
      this._enhance(), this._addClass(this.uiSpinner, "ui-spinner", "ui-widget ui-widget-content"), this._addClass("ui-spinner-input"), this.element.attr("role", "spinbutton"), this.buttons = this.uiSpinner.children("a").attr("tabIndex", -1).attr("aria-hidden", !0).button({ classes: { "ui-button": "" } }), this._removeClass(this.buttons, "ui-corner-all"), this._addClass(this.buttons.first(), "ui-spinner-button ui-spinner-up"), this._addClass(this.buttons.last(), "ui-spinner-button ui-spinner-down"), this.buttons.first().button({ icon: this.options.icons.up, showLabel: !1 }), this.buttons.last().button({ icon: this.options.icons.down, showLabel: !1 }), this.buttons.height() > Math.ceil(.5 * this.uiSpinner.height()) && this.uiSpinner.height() > 0 && this.uiSpinner.height(this.uiSpinner.height());
    }, _keydown: function _keydown(e) {
      var i = this.options,
          s = t.ui.keyCode;switch (e.keyCode) {case s.UP:
          return this._repeat(null, 1, e), !0;case s.DOWN:
          return this._repeat(null, -1, e), !0;case s.PAGE_UP:
          return this._repeat(null, i.page, e), !0;case s.PAGE_DOWN:
          return this._repeat(null, -i.page, e), !0;}return !1;
    }, _start: function _start(t) {
      return this.spinning || this._trigger("start", t) !== !1 ? (this.counter || (this.counter = 1), this.spinning = !0, !0) : !1;
    }, _repeat: function _repeat(t, e, i) {
      t = t || 500, clearTimeout(this.timer), this.timer = this._delay(function () {
        this._repeat(40, e, i);
      }, t), this._spin(e * this.options.step, i);
    }, _spin: function _spin(t, e) {
      var i = this.value() || 0;this.counter || (this.counter = 1), i = this._adjustValue(i + t * this._increment(this.counter)), this.spinning && this._trigger("spin", e, { value: i }) === !1 || (this._value(i), this.counter++);
    }, _increment: function _increment(e) {
      var i = this.options.incremental;return i ? t.isFunction(i) ? i(e) : Math.floor(e * e * e / 5e4 - e * e / 500 + 17 * e / 200 + 1) : 1;
    }, _precision: function _precision() {
      var t = this._precisionOf(this.options.step);return null !== this.options.min && (t = Math.max(t, this._precisionOf(this.options.min))), t;
    }, _precisionOf: function _precisionOf(t) {
      var e = "" + t,
          i = e.indexOf(".");return -1 === i ? 0 : e.length - i - 1;
    }, _adjustValue: function _adjustValue(t) {
      var e,
          i,
          s = this.options;return e = null !== s.min ? s.min : 0, i = t - e, i = Math.round(i / s.step) * s.step, t = e + i, t = parseFloat(t.toFixed(this._precision())), null !== s.max && t > s.max ? s.max : null !== s.min && s.min > t ? s.min : t;
    }, _stop: function _stop(t) {
      this.spinning && (clearTimeout(this.timer), clearTimeout(this.mousewheelTimer), this.counter = 0, this.spinning = !1, this._trigger("stop", t));
    }, _setOption: function _setOption(t, e) {
      var i, s, n;return "culture" === t || "numberFormat" === t ? (i = this._parse(this.element.val()), this.options[t] = e, this.element.val(this._format(i)), void 0) : (("max" === t || "min" === t || "step" === t) && "string" == typeof e && (e = this._parse(e)), "icons" === t && (s = this.buttons.first().find(".ui-icon"), this._removeClass(s, null, this.options.icons.up), this._addClass(s, null, e.up), n = this.buttons.last().find(".ui-icon"), this._removeClass(n, null, this.options.icons.down), this._addClass(n, null, e.down)), this._super(t, e), void 0);
    }, _setOptionDisabled: function _setOptionDisabled(t) {
      this._super(t), this._toggleClass(this.uiSpinner, null, "ui-state-disabled", !!t), this.element.prop("disabled", !!t), this.buttons.button(t ? "disable" : "enable");
    }, _setOptions: r(function (t) {
      this._super(t);
    }), _parse: function _parse(t) {
      return "string" == typeof t && "" !== t && (t = window.Globalize && this.options.numberFormat ? Globalize.parseFloat(t, 10, this.options.culture) : +t), "" === t || isNaN(t) ? null : t;
    }, _format: function _format(t) {
      return "" === t ? "" : window.Globalize && this.options.numberFormat ? Globalize.format(t, this.options.numberFormat, this.options.culture) : t;
    }, _refresh: function _refresh() {
      this.element.attr({ "aria-valuemin": this.options.min, "aria-valuemax": this.options.max, "aria-valuenow": this._parse(this.element.val()) });
    }, isValid: function isValid() {
      var t = this.value();return null === t ? !1 : t === this._adjustValue(t);
    }, _value: function _value(t, e) {
      var i;"" !== t && (i = this._parse(t), null !== i && (e || (i = this._adjustValue(i)), t = this._format(i))), this.element.val(t), this._refresh();
    }, _destroy: function _destroy() {
      this.element.prop("disabled", !1).removeAttr("autocomplete role aria-valuemin aria-valuemax aria-valuenow"), this.uiSpinner.replaceWith(this.element);
    }, stepUp: r(function (t) {
      this._stepUp(t);
    }), _stepUp: function _stepUp(t) {
      this._start() && (this._spin((t || 1) * this.options.step), this._stop());
    }, stepDown: r(function (t) {
      this._stepDown(t);
    }), _stepDown: function _stepDown(t) {
      this._start() && (this._spin((t || 1) * -this.options.step), this._stop());
    }, pageUp: r(function (t) {
      this._stepUp((t || 1) * this.options.page);
    }), pageDown: r(function (t) {
      this._stepDown((t || 1) * this.options.page);
    }), value: function value(t) {
      return arguments.length ? (r(this._value).call(this, t), void 0) : this._parse(this.element.val());
    }, widget: function widget() {
      return this.uiSpinner;
    } }), t.uiBackCompat !== !1 && t.widget("ui.spinner", t.ui.spinner, { _enhance: function _enhance() {
      this.uiSpinner = this.element.attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());
    }, _uiSpinnerHtml: function _uiSpinnerHtml() {
      return "<span>";
    }, _buttonHtml: function _buttonHtml() {
      return "<a></a><a></a>";
    } }), t.ui.spinner, t.widget("ui.tabs", { version: "1.12.1", delay: 300, options: { active: null, classes: { "ui-tabs": "ui-corner-all", "ui-tabs-nav": "ui-corner-all", "ui-tabs-panel": "ui-corner-bottom", "ui-tabs-tab": "ui-corner-top" }, collapsible: !1, event: "click", heightStyle: "content", hide: null, show: null, activate: null, beforeActivate: null, beforeLoad: null, load: null }, _isLocal: function () {
      var t = /#.*$/;return function (e) {
        var i, s;i = e.href.replace(t, ""), s = location.href.replace(t, "");try {
          i = decodeURIComponent(i);
        } catch (n) {}try {
          s = decodeURIComponent(s);
        } catch (n) {}return e.hash.length > 1 && i === s;
      };
    }(), _create: function _create() {
      var e = this,
          i = this.options;this.running = !1, this._addClass("ui-tabs", "ui-widget ui-widget-content"), this._toggleClass("ui-tabs-collapsible", null, i.collapsible), this._processTabs(), i.active = this._initialActive(), t.isArray(i.disabled) && (i.disabled = t.unique(i.disabled.concat(t.map(this.tabs.filter(".ui-state-disabled"), function (t) {
        return e.tabs.index(t);
      }))).sort()), this.active = this.options.active !== !1 && this.anchors.length ? this._findActive(i.active) : t(), this._refresh(), this.active.length && this.load(i.active);
    }, _initialActive: function _initialActive() {
      var e = this.options.active,
          i = this.options.collapsible,
          s = location.hash.substring(1);return null === e && (s && this.tabs.each(function (i, n) {
        return t(n).attr("aria-controls") === s ? (e = i, !1) : void 0;
      }), null === e && (e = this.tabs.index(this.tabs.filter(".ui-tabs-active"))), (null === e || -1 === e) && (e = this.tabs.length ? 0 : !1)), e !== !1 && (e = this.tabs.index(this.tabs.eq(e)), -1 === e && (e = i ? !1 : 0)), !i && e === !1 && this.anchors.length && (e = 0), e;
    }, _getCreateEventData: function _getCreateEventData() {
      return { tab: this.active, panel: this.active.length ? this._getPanelForTab(this.active) : t() };
    }, _tabKeydown: function _tabKeydown(e) {
      var i = t(t.ui.safeActiveElement(this.document[0])).closest("li"),
          s = this.tabs.index(i),
          n = !0;if (!this._handlePageNav(e)) {
        switch (e.keyCode) {case t.ui.keyCode.RIGHT:case t.ui.keyCode.DOWN:
            s++;break;case t.ui.keyCode.UP:case t.ui.keyCode.LEFT:
            n = !1, s--;break;case t.ui.keyCode.END:
            s = this.anchors.length - 1;break;case t.ui.keyCode.HOME:
            s = 0;break;case t.ui.keyCode.SPACE:
            return e.preventDefault(), clearTimeout(this.activating), this._activate(s), void 0;case t.ui.keyCode.ENTER:
            return e.preventDefault(), clearTimeout(this.activating), this._activate(s === this.options.active ? !1 : s), void 0;default:
            return;}e.preventDefault(), clearTimeout(this.activating), s = this._focusNextTab(s, n), e.ctrlKey || e.metaKey || (i.attr("aria-selected", "false"), this.tabs.eq(s).attr("aria-selected", "true"), this.activating = this._delay(function () {
          this.option("active", s);
        }, this.delay));
      }
    }, _panelKeydown: function _panelKeydown(e) {
      this._handlePageNav(e) || e.ctrlKey && e.keyCode === t.ui.keyCode.UP && (e.preventDefault(), this.active.trigger("focus"));
    }, _handlePageNav: function _handlePageNav(e) {
      return e.altKey && e.keyCode === t.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)), !0) : e.altKey && e.keyCode === t.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)), !0) : void 0;
    }, _findNextTab: function _findNextTab(e, i) {
      function s() {
        return e > n && (e = 0), 0 > e && (e = n), e;
      }for (var n = this.tabs.length - 1; -1 !== t.inArray(s(), this.options.disabled);) {
        e = i ? e + 1 : e - 1;
      }return e;
    }, _focusNextTab: function _focusNextTab(t, e) {
      return t = this._findNextTab(t, e), this.tabs.eq(t).trigger("focus"), t;
    }, _setOption: function _setOption(t, e) {
      return "active" === t ? (this._activate(e), void 0) : (this._super(t, e), "collapsible" === t && (this._toggleClass("ui-tabs-collapsible", null, e), e || this.options.active !== !1 || this._activate(0)), "event" === t && this._setupEvents(e), "heightStyle" === t && this._setupHeightStyle(e), void 0);
    }, _sanitizeSelector: function _sanitizeSelector(t) {
      return t ? t.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : "";
    }, refresh: function refresh() {
      var e = this.options,
          i = this.tablist.children(":has(a[href])");e.disabled = t.map(i.filter(".ui-state-disabled"), function (t) {
        return i.index(t);
      }), this._processTabs(), e.active !== !1 && this.anchors.length ? this.active.length && !t.contains(this.tablist[0], this.active[0]) ? this.tabs.length === e.disabled.length ? (e.active = !1, this.active = t()) : this._activate(this._findNextTab(Math.max(0, e.active - 1), !1)) : e.active = this.tabs.index(this.active) : (e.active = !1, this.active = t()), this._refresh();
    }, _refresh: function _refresh() {
      this._setOptionDisabled(this.options.disabled), this._setupEvents(this.options.event), this._setupHeightStyle(this.options.heightStyle), this.tabs.not(this.active).attr({ "aria-selected": "false", "aria-expanded": "false", tabIndex: -1 }), this.panels.not(this._getPanelForTab(this.active)).hide().attr({ "aria-hidden": "true" }), this.active.length ? (this.active.attr({ "aria-selected": "true", "aria-expanded": "true", tabIndex: 0 }), this._addClass(this.active, "ui-tabs-active", "ui-state-active"), this._getPanelForTab(this.active).show().attr({ "aria-hidden": "false" })) : this.tabs.eq(0).attr("tabIndex", 0);
    }, _processTabs: function _processTabs() {
      var e = this,
          i = this.tabs,
          s = this.anchors,
          n = this.panels;this.tablist = this._getList().attr("role", "tablist"), this._addClass(this.tablist, "ui-tabs-nav", "ui-helper-reset ui-helper-clearfix ui-widget-header"), this.tablist.on("mousedown" + this.eventNamespace, "> li", function (e) {
        t(this).is(".ui-state-disabled") && e.preventDefault();
      }).on("focus" + this.eventNamespace, ".ui-tabs-anchor", function () {
        t(this).closest("li").is(".ui-state-disabled") && this.blur();
      }), this.tabs = this.tablist.find("> li:has(a[href])").attr({ role: "tab", tabIndex: -1 }), this._addClass(this.tabs, "ui-tabs-tab", "ui-state-default"), this.anchors = this.tabs.map(function () {
        return t("a", this)[0];
      }).attr({ role: "presentation", tabIndex: -1 }), this._addClass(this.anchors, "ui-tabs-anchor"), this.panels = t(), this.anchors.each(function (i, s) {
        var n,
            o,
            a,
            r = t(s).uniqueId().attr("id"),
            h = t(s).closest("li"),
            l = h.attr("aria-controls");e._isLocal(s) ? (n = s.hash, a = n.substring(1), o = e.element.find(e._sanitizeSelector(n))) : (a = h.attr("aria-controls") || t({}).uniqueId()[0].id, n = "#" + a, o = e.element.find(n), o.length || (o = e._createPanel(a), o.insertAfter(e.panels[i - 1] || e.tablist)), o.attr("aria-live", "polite")), o.length && (e.panels = e.panels.add(o)), l && h.data("ui-tabs-aria-controls", l), h.attr({ "aria-controls": a, "aria-labelledby": r }), o.attr("aria-labelledby", r);
      }), this.panels.attr("role", "tabpanel"), this._addClass(this.panels, "ui-tabs-panel", "ui-widget-content"), i && (this._off(i.not(this.tabs)), this._off(s.not(this.anchors)), this._off(n.not(this.panels)));
    }, _getList: function _getList() {
      return this.tablist || this.element.find("ol, ul").eq(0);
    }, _createPanel: function _createPanel(e) {
      return t("<div>").attr("id", e).data("ui-tabs-destroy", !0);
    }, _setOptionDisabled: function _setOptionDisabled(e) {
      var i, s, n;for (t.isArray(e) && (e.length ? e.length === this.anchors.length && (e = !0) : e = !1), n = 0; s = this.tabs[n]; n++) {
        i = t(s), e === !0 || -1 !== t.inArray(n, e) ? (i.attr("aria-disabled", "true"), this._addClass(i, null, "ui-state-disabled")) : (i.removeAttr("aria-disabled"), this._removeClass(i, null, "ui-state-disabled"));
      }this.options.disabled = e, this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, e === !0);
    }, _setupEvents: function _setupEvents(e) {
      var i = {};e && t.each(e.split(" "), function (t, e) {
        i[e] = "_eventHandler";
      }), this._off(this.anchors.add(this.tabs).add(this.panels)), this._on(!0, this.anchors, { click: function click(t) {
          t.preventDefault();
        } }), this._on(this.anchors, i), this._on(this.tabs, { keydown: "_tabKeydown" }), this._on(this.panels, { keydown: "_panelKeydown" }), this._focusable(this.tabs), this._hoverable(this.tabs);
    }, _setupHeightStyle: function _setupHeightStyle(e) {
      var i,
          s = this.element.parent();"fill" === e ? (i = s.height(), i -= this.element.outerHeight() - this.element.height(), this.element.siblings(":visible").each(function () {
        var e = t(this),
            s = e.css("position");"absolute" !== s && "fixed" !== s && (i -= e.outerHeight(!0));
      }), this.element.children().not(this.panels).each(function () {
        i -= t(this).outerHeight(!0);
      }), this.panels.each(function () {
        t(this).height(Math.max(0, i - t(this).innerHeight() + t(this).height()));
      }).css("overflow", "auto")) : "auto" === e && (i = 0, this.panels.each(function () {
        i = Math.max(i, t(this).height("").height());
      }).height(i));
    }, _eventHandler: function _eventHandler(e) {
      var i = this.options,
          s = this.active,
          n = t(e.currentTarget),
          o = n.closest("li"),
          a = o[0] === s[0],
          r = a && i.collapsible,
          h = r ? t() : this._getPanelForTab(o),
          l = s.length ? this._getPanelForTab(s) : t(),
          c = { oldTab: s, oldPanel: l, newTab: r ? t() : o, newPanel: h };e.preventDefault(), o.hasClass("ui-state-disabled") || o.hasClass("ui-tabs-loading") || this.running || a && !i.collapsible || this._trigger("beforeActivate", e, c) === !1 || (i.active = r ? !1 : this.tabs.index(o), this.active = a ? t() : o, this.xhr && this.xhr.abort(), l.length || h.length || t.error("jQuery UI Tabs: Mismatching fragment identifier."), h.length && this.load(this.tabs.index(o), e), this._toggle(e, c));
    }, _toggle: function _toggle(e, i) {
      function s() {
        o.running = !1, o._trigger("activate", e, i);
      }function n() {
        o._addClass(i.newTab.closest("li"), "ui-tabs-active", "ui-state-active"), a.length && o.options.show ? o._show(a, o.options.show, s) : (a.show(), s());
      }var o = this,
          a = i.newPanel,
          r = i.oldPanel;this.running = !0, r.length && this.options.hide ? this._hide(r, this.options.hide, function () {
        o._removeClass(i.oldTab.closest("li"), "ui-tabs-active", "ui-state-active"), n();
      }) : (this._removeClass(i.oldTab.closest("li"), "ui-tabs-active", "ui-state-active"), r.hide(), n()), r.attr("aria-hidden", "true"), i.oldTab.attr({ "aria-selected": "false", "aria-expanded": "false" }), a.length && r.length ? i.oldTab.attr("tabIndex", -1) : a.length && this.tabs.filter(function () {
        return 0 === t(this).attr("tabIndex");
      }).attr("tabIndex", -1), a.attr("aria-hidden", "false"), i.newTab.attr({ "aria-selected": "true", "aria-expanded": "true", tabIndex: 0 });
    }, _activate: function _activate(e) {
      var i,
          s = this._findActive(e);s[0] !== this.active[0] && (s.length || (s = this.active), i = s.find(".ui-tabs-anchor")[0], this._eventHandler({ target: i, currentTarget: i, preventDefault: t.noop }));
    }, _findActive: function _findActive(e) {
      return e === !1 ? t() : this.tabs.eq(e);
    }, _getIndex: function _getIndex(e) {
      return "string" == typeof e && (e = this.anchors.index(this.anchors.filter("[href$='" + t.ui.escapeSelector(e) + "']"))), e;
    }, _destroy: function _destroy() {
      this.xhr && this.xhr.abort(), this.tablist.removeAttr("role").off(this.eventNamespace), this.anchors.removeAttr("role tabIndex").removeUniqueId(), this.tabs.add(this.panels).each(function () {
        t.data(this, "ui-tabs-destroy") ? t(this).remove() : t(this).removeAttr("role tabIndex aria-live aria-busy aria-selected aria-labelledby aria-hidden aria-expanded");
      }), this.tabs.each(function () {
        var e = t(this),
            i = e.data("ui-tabs-aria-controls");i ? e.attr("aria-controls", i).removeData("ui-tabs-aria-controls") : e.removeAttr("aria-controls");
      }), this.panels.show(), "content" !== this.options.heightStyle && this.panels.css("height", "");
    }, enable: function enable(e) {
      var i = this.options.disabled;i !== !1 && (void 0 === e ? i = !1 : (e = this._getIndex(e), i = t.isArray(i) ? t.map(i, function (t) {
        return t !== e ? t : null;
      }) : t.map(this.tabs, function (t, i) {
        return i !== e ? i : null;
      })), this._setOptionDisabled(i));
    }, disable: function disable(e) {
      var i = this.options.disabled;if (i !== !0) {
        if (void 0 === e) i = !0;else {
          if (e = this._getIndex(e), -1 !== t.inArray(e, i)) return;i = t.isArray(i) ? t.merge([e], i).sort() : [e];
        }this._setOptionDisabled(i);
      }
    }, load: function load(e, i) {
      e = this._getIndex(e);var s = this,
          n = this.tabs.eq(e),
          o = n.find(".ui-tabs-anchor"),
          a = this._getPanelForTab(n),
          r = { tab: n, panel: a },
          h = function h(t, e) {
        "abort" === e && s.panels.stop(!1, !0), s._removeClass(n, "ui-tabs-loading"), a.removeAttr("aria-busy"), t === s.xhr && delete s.xhr;
      };this._isLocal(o[0]) || (this.xhr = t.ajax(this._ajaxSettings(o, i, r)), this.xhr && "canceled" !== this.xhr.statusText && (this._addClass(n, "ui-tabs-loading"), a.attr("aria-busy", "true"), this.xhr.done(function (t, e, n) {
        setTimeout(function () {
          a.html(t), s._trigger("load", i, r), h(n, e);
        }, 1);
      }).fail(function (t, e) {
        setTimeout(function () {
          h(t, e);
        }, 1);
      })));
    }, _ajaxSettings: function _ajaxSettings(e, i, s) {
      var n = this;return { url: e.attr("href").replace(/#.*$/, ""), beforeSend: function beforeSend(e, o) {
          return n._trigger("beforeLoad", i, t.extend({ jqXHR: e, ajaxSettings: o }, s));
        } };
    }, _getPanelForTab: function _getPanelForTab(e) {
      var i = t(e).attr("aria-controls");return this.element.find(this._sanitizeSelector("#" + i));
    } }), t.uiBackCompat !== !1 && t.widget("ui.tabs", t.ui.tabs, { _processTabs: function _processTabs() {
      this._superApply(arguments), this._addClass(this.tabs, "ui-tab");
    } }), t.ui.tabs, t.widget("ui.tooltip", { version: "1.12.1", options: { classes: { "ui-tooltip": "ui-corner-all ui-widget-shadow" }, content: function content() {
        var e = t(this).attr("title") || "";return t("<a>").text(e).html();
      }, hide: !0, items: "[title]:not([disabled])", position: { my: "left top+15", at: "left bottom", collision: "flipfit flip" }, show: !0, track: !1, close: null, open: null }, _addDescribedBy: function _addDescribedBy(e, i) {
      var s = (e.attr("aria-describedby") || "").split(/\s+/);s.push(i), e.data("ui-tooltip-id", i).attr("aria-describedby", t.trim(s.join(" ")));
    }, _removeDescribedBy: function _removeDescribedBy(e) {
      var i = e.data("ui-tooltip-id"),
          s = (e.attr("aria-describedby") || "").split(/\s+/),
          n = t.inArray(i, s);-1 !== n && s.splice(n, 1), e.removeData("ui-tooltip-id"), s = t.trim(s.join(" ")), s ? e.attr("aria-describedby", s) : e.removeAttr("aria-describedby");
    }, _create: function _create() {
      this._on({ mouseover: "open", focusin: "open" }), this.tooltips = {}, this.parents = {}, this.liveRegion = t("<div>").attr({ role: "log", "aria-live": "assertive", "aria-relevant": "additions" }).appendTo(this.document[0].body), this._addClass(this.liveRegion, null, "ui-helper-hidden-accessible"), this.disabledTitles = t([]);
    }, _setOption: function _setOption(e, i) {
      var s = this;this._super(e, i), "content" === e && t.each(this.tooltips, function (t, e) {
        s._updateContent(e.element);
      });
    }, _setOptionDisabled: function _setOptionDisabled(t) {
      this[t ? "_disable" : "_enable"]();
    }, _disable: function _disable() {
      var e = this;t.each(this.tooltips, function (i, s) {
        var n = t.Event("blur");n.target = n.currentTarget = s.element[0], e.close(n, !0);
      }), this.disabledTitles = this.disabledTitles.add(this.element.find(this.options.items).addBack().filter(function () {
        var e = t(this);return e.is("[title]") ? e.data("ui-tooltip-title", e.attr("title")).removeAttr("title") : void 0;
      }));
    }, _enable: function _enable() {
      this.disabledTitles.each(function () {
        var e = t(this);e.data("ui-tooltip-title") && e.attr("title", e.data("ui-tooltip-title"));
      }), this.disabledTitles = t([]);
    }, open: function open(e) {
      var i = this,
          s = t(e ? e.target : this.element).closest(this.options.items);s.length && !s.data("ui-tooltip-id") && (s.attr("title") && s.data("ui-tooltip-title", s.attr("title")), s.data("ui-tooltip-open", !0), e && "mouseover" === e.type && s.parents().each(function () {
        var e,
            s = t(this);s.data("ui-tooltip-open") && (e = t.Event("blur"), e.target = e.currentTarget = this, i.close(e, !0)), s.attr("title") && (s.uniqueId(), i.parents[this.id] = { element: this, title: s.attr("title") }, s.attr("title", ""));
      }), this._registerCloseHandlers(e, s), this._updateContent(s, e));
    }, _updateContent: function _updateContent(t, e) {
      var i,
          s = this.options.content,
          n = this,
          o = e ? e.type : null;return "string" == typeof s || s.nodeType || s.jquery ? this._open(e, t, s) : (i = s.call(t[0], function (i) {
        n._delay(function () {
          t.data("ui-tooltip-open") && (e && (e.type = o), this._open(e, t, i));
        });
      }), i && this._open(e, t, i), void 0);
    }, _open: function _open(e, i, s) {
      function n(t) {
        l.of = t, a.is(":hidden") || a.position(l);
      }var o,
          a,
          r,
          h,
          l = t.extend({}, this.options.position);if (s) {
        if (o = this._find(i)) return o.tooltip.find(".ui-tooltip-content").html(s), void 0;i.is("[title]") && (e && "mouseover" === e.type ? i.attr("title", "") : i.removeAttr("title")), o = this._tooltip(i), a = o.tooltip, this._addDescribedBy(i, a.attr("id")), a.find(".ui-tooltip-content").html(s), this.liveRegion.children().hide(), h = t("<div>").html(a.find(".ui-tooltip-content").html()), h.removeAttr("name").find("[name]").removeAttr("name"), h.removeAttr("id").find("[id]").removeAttr("id"), h.appendTo(this.liveRegion), this.options.track && e && /^mouse/.test(e.type) ? (this._on(this.document, { mousemove: n }), n(e)) : a.position(t.extend({ of: i }, this.options.position)), a.hide(), this._show(a, this.options.show), this.options.track && this.options.show && this.options.show.delay && (r = this.delayedShow = setInterval(function () {
          a.is(":visible") && (n(l.of), clearInterval(r));
        }, t.fx.interval)), this._trigger("open", e, { tooltip: a });
      }
    }, _registerCloseHandlers: function _registerCloseHandlers(e, i) {
      var s = { keyup: function keyup(e) {
          if (e.keyCode === t.ui.keyCode.ESCAPE) {
            var s = t.Event(e);s.currentTarget = i[0], this.close(s, !0);
          }
        } };i[0] !== this.element[0] && (s.remove = function () {
        this._removeTooltip(this._find(i).tooltip);
      }), e && "mouseover" !== e.type || (s.mouseleave = "close"), e && "focusin" !== e.type || (s.focusout = "close"), this._on(!0, i, s);
    }, close: function close(e) {
      var i,
          s = this,
          n = t(e ? e.currentTarget : this.element),
          o = this._find(n);return o ? (i = o.tooltip, o.closing || (clearInterval(this.delayedShow), n.data("ui-tooltip-title") && !n.attr("title") && n.attr("title", n.data("ui-tooltip-title")), this._removeDescribedBy(n), o.hiding = !0, i.stop(!0), this._hide(i, this.options.hide, function () {
        s._removeTooltip(t(this));
      }), n.removeData("ui-tooltip-open"), this._off(n, "mouseleave focusout keyup"), n[0] !== this.element[0] && this._off(n, "remove"), this._off(this.document, "mousemove"), e && "mouseleave" === e.type && t.each(this.parents, function (e, i) {
        t(i.element).attr("title", i.title), delete s.parents[e];
      }), o.closing = !0, this._trigger("close", e, { tooltip: i }), o.hiding || (o.closing = !1)), void 0) : (n.removeData("ui-tooltip-open"), void 0);
    }, _tooltip: function _tooltip(e) {
      var i = t("<div>").attr("role", "tooltip"),
          s = t("<div>").appendTo(i),
          n = i.uniqueId().attr("id");return this._addClass(s, "ui-tooltip-content"), this._addClass(i, "ui-tooltip", "ui-widget ui-widget-content"), i.appendTo(this._appendTo(e)), this.tooltips[n] = { element: e, tooltip: i };
    }, _find: function _find(t) {
      var e = t.data("ui-tooltip-id");return e ? this.tooltips[e] : null;
    }, _removeTooltip: function _removeTooltip(t) {
      t.remove(), delete this.tooltips[t.attr("id")];
    }, _appendTo: function _appendTo(t) {
      var e = t.closest(".ui-front, dialog");return e.length || (e = this.document[0].body), e;
    }, _destroy: function _destroy() {
      var e = this;t.each(this.tooltips, function (i, s) {
        var n = t.Event("blur"),
            o = s.element;n.target = n.currentTarget = o[0], e.close(n, !0), t("#" + i).remove(), o.data("ui-tooltip-title") && (o.attr("title") || o.attr("title", o.data("ui-tooltip-title")), o.removeData("ui-tooltip-title"));
      }), this.liveRegion.remove();
    } }), t.uiBackCompat !== !1 && t.widget("ui.tooltip", t.ui.tooltip, { options: { tooltipClass: null }, _tooltip: function _tooltip() {
      var t = this._superApply(arguments);return this.options.tooltipClass && t.tooltip.addClass(this.options.tooltipClass), t;
    } }), t.ui.tooltip;var f = "ui-effects-",
      g = "ui-effects-style",
      m = "ui-effects-animated",
      _ = t;t.effects = { effect: {} }, function (t, e) {
    function i(t, e, i) {
      var s = u[e.type] || {};return null == t ? i || !e.def ? null : e.def : (t = s.floor ? ~~t : parseFloat(t), isNaN(t) ? e.def : s.mod ? (t + s.mod) % s.mod : 0 > t ? 0 : t > s.max ? s.max : t);
    }function s(i) {
      var s = l(),
          n = s._rgba = [];return i = i.toLowerCase(), f(h, function (t, o) {
        var a,
            r = o.re.exec(i),
            h = r && o.parse(r),
            l = o.space || "rgba";return h ? (a = s[l](h), s[c[l].cache] = a[c[l].cache], n = s._rgba = a._rgba, !1) : e;
      }), n.length ? ("0,0,0,0" === n.join() && t.extend(n, o.transparent), s) : o[i];
    }function n(t, e, i) {
      return i = (i + 1) % 1, 1 > 6 * i ? t + 6 * (e - t) * i : 1 > 2 * i ? e : 2 > 3 * i ? t + 6 * (e - t) * (2 / 3 - i) : t;
    }var o,
        a = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
        r = /^([\-+])=\s*(\d+\.?\d*)/,
        h = [{ re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/, parse: function parse(t) {
        return [t[1], t[2], t[3], t[4]];
      } }, { re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/, parse: function parse(t) {
        return [2.55 * t[1], 2.55 * t[2], 2.55 * t[3], t[4]];
      } }, { re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/, parse: function parse(t) {
        return [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)];
      } }, { re: /#([a-f0-9])([a-f0-9])([a-f0-9])/, parse: function parse(t) {
        return [parseInt(t[1] + t[1], 16), parseInt(t[2] + t[2], 16), parseInt(t[3] + t[3], 16)];
      } }, { re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/, space: "hsla", parse: function parse(t) {
        return [t[1], t[2] / 100, t[3] / 100, t[4]];
      } }],
        l = t.Color = function (e, i, s, n) {
      return new t.Color.fn.parse(e, i, s, n);
    },
        c = { rgba: { props: { red: { idx: 0, type: "byte" }, green: { idx: 1, type: "byte" }, blue: { idx: 2, type: "byte" } } }, hsla: { props: { hue: { idx: 0, type: "degrees" }, saturation: { idx: 1, type: "percent" }, lightness: { idx: 2, type: "percent" } } } },
        u = { "byte": { floor: !0, max: 255 }, percent: { max: 1 }, degrees: { mod: 360, floor: !0 } },
        d = l.support = {},
        p = t("<p>")[0],
        f = t.each;p.style.cssText = "background-color:rgba(1,1,1,.5)", d.rgba = p.style.backgroundColor.indexOf("rgba") > -1, f(c, function (t, e) {
      e.cache = "_" + t, e.props.alpha = { idx: 3, type: "percent", def: 1 };
    }), l.fn = t.extend(l.prototype, { parse: function parse(n, a, r, h) {
        if (n === e) return this._rgba = [null, null, null, null], this;(n.jquery || n.nodeType) && (n = t(n).css(a), a = e);var u = this,
            d = t.type(n),
            p = this._rgba = [];return a !== e && (n = [n, a, r, h], d = "array"), "string" === d ? this.parse(s(n) || o._default) : "array" === d ? (f(c.rgba.props, function (t, e) {
          p[e.idx] = i(n[e.idx], e);
        }), this) : "object" === d ? (n instanceof l ? f(c, function (t, e) {
          n[e.cache] && (u[e.cache] = n[e.cache].slice());
        }) : f(c, function (e, s) {
          var o = s.cache;f(s.props, function (t, e) {
            if (!u[o] && s.to) {
              if ("alpha" === t || null == n[t]) return;u[o] = s.to(u._rgba);
            }u[o][e.idx] = i(n[t], e, !0);
          }), u[o] && 0 > t.inArray(null, u[o].slice(0, 3)) && (u[o][3] = 1, s.from && (u._rgba = s.from(u[o])));
        }), this) : e;
      }, is: function is(t) {
        var i = l(t),
            s = !0,
            n = this;return f(c, function (t, o) {
          var a,
              r = i[o.cache];return r && (a = n[o.cache] || o.to && o.to(n._rgba) || [], f(o.props, function (t, i) {
            return null != r[i.idx] ? s = r[i.idx] === a[i.idx] : e;
          })), s;
        }), s;
      }, _space: function _space() {
        var t = [],
            e = this;return f(c, function (i, s) {
          e[s.cache] && t.push(i);
        }), t.pop();
      }, transition: function transition(t, e) {
        var s = l(t),
            n = s._space(),
            o = c[n],
            a = 0 === this.alpha() ? l("transparent") : this,
            r = a[o.cache] || o.to(a._rgba),
            h = r.slice();return s = s[o.cache], f(o.props, function (t, n) {
          var o = n.idx,
              a = r[o],
              l = s[o],
              c = u[n.type] || {};null !== l && (null === a ? h[o] = l : (c.mod && (l - a > c.mod / 2 ? a += c.mod : a - l > c.mod / 2 && (a -= c.mod)), h[o] = i((l - a) * e + a, n)));
        }), this[n](h);
      }, blend: function blend(e) {
        if (1 === this._rgba[3]) return this;var i = this._rgba.slice(),
            s = i.pop(),
            n = l(e)._rgba;return l(t.map(i, function (t, e) {
          return (1 - s) * n[e] + s * t;
        }));
      }, toRgbaString: function toRgbaString() {
        var e = "rgba(",
            i = t.map(this._rgba, function (t, e) {
          return null == t ? e > 2 ? 1 : 0 : t;
        });return 1 === i[3] && (i.pop(), e = "rgb("), e + i.join() + ")";
      }, toHslaString: function toHslaString() {
        var e = "hsla(",
            i = t.map(this.hsla(), function (t, e) {
          return null == t && (t = e > 2 ? 1 : 0), e && 3 > e && (t = Math.round(100 * t) + "%"), t;
        });return 1 === i[3] && (i.pop(), e = "hsl("), e + i.join() + ")";
      }, toHexString: function toHexString(e) {
        var i = this._rgba.slice(),
            s = i.pop();return e && i.push(~~(255 * s)), "#" + t.map(i, function (t) {
          return t = (t || 0).toString(16), 1 === t.length ? "0" + t : t;
        }).join("");
      }, toString: function toString() {
        return 0 === this._rgba[3] ? "transparent" : this.toRgbaString();
      } }), l.fn.parse.prototype = l.fn, c.hsla.to = function (t) {
      if (null == t[0] || null == t[1] || null == t[2]) return [null, null, null, t[3]];var e,
          i,
          s = t[0] / 255,
          n = t[1] / 255,
          o = t[2] / 255,
          a = t[3],
          r = Math.max(s, n, o),
          h = Math.min(s, n, o),
          l = r - h,
          c = r + h,
          u = .5 * c;return e = h === r ? 0 : s === r ? 60 * (n - o) / l + 360 : n === r ? 60 * (o - s) / l + 120 : 60 * (s - n) / l + 240, i = 0 === l ? 0 : .5 >= u ? l / c : l / (2 - c), [Math.round(e) % 360, i, u, null == a ? 1 : a];
    }, c.hsla.from = function (t) {
      if (null == t[0] || null == t[1] || null == t[2]) return [null, null, null, t[3]];var e = t[0] / 360,
          i = t[1],
          s = t[2],
          o = t[3],
          a = .5 >= s ? s * (1 + i) : s + i - s * i,
          r = 2 * s - a;return [Math.round(255 * n(r, a, e + 1 / 3)), Math.round(255 * n(r, a, e)), Math.round(255 * n(r, a, e - 1 / 3)), o];
    }, f(c, function (s, n) {
      var o = n.props,
          a = n.cache,
          h = n.to,
          c = n.from;l.fn[s] = function (s) {
        if (h && !this[a] && (this[a] = h(this._rgba)), s === e) return this[a].slice();var n,
            r = t.type(s),
            u = "array" === r || "object" === r ? s : arguments,
            d = this[a].slice();return f(o, function (t, e) {
          var s = u["object" === r ? t : e.idx];null == s && (s = d[e.idx]), d[e.idx] = i(s, e);
        }), c ? (n = l(c(d)), n[a] = d, n) : l(d);
      }, f(o, function (e, i) {
        l.fn[e] || (l.fn[e] = function (n) {
          var o,
              a = t.type(n),
              h = "alpha" === e ? this._hsla ? "hsla" : "rgba" : s,
              l = this[h](),
              c = l[i.idx];return "undefined" === a ? c : ("function" === a && (n = n.call(this, c), a = t.type(n)), null == n && i.empty ? this : ("string" === a && (o = r.exec(n), o && (n = c + parseFloat(o[2]) * ("+" === o[1] ? 1 : -1))), l[i.idx] = n, this[h](l)));
        });
      });
    }), l.hook = function (e) {
      var i = e.split(" ");f(i, function (e, i) {
        t.cssHooks[i] = { set: function set(e, n) {
            var o,
                a,
                r = "";if ("transparent" !== n && ("string" !== t.type(n) || (o = s(n)))) {
              if (n = l(o || n), !d.rgba && 1 !== n._rgba[3]) {
                for (a = "backgroundColor" === i ? e.parentNode : e; ("" === r || "transparent" === r) && a && a.style;) {
                  try {
                    r = t.css(a, "backgroundColor"), a = a.parentNode;
                  } catch (h) {}
                }n = n.blend(r && "transparent" !== r ? r : "_default");
              }n = n.toRgbaString();
            }try {
              e.style[i] = n;
            } catch (h) {}
          } }, t.fx.step[i] = function (e) {
          e.colorInit || (e.start = l(e.elem, i), e.end = l(e.end), e.colorInit = !0), t.cssHooks[i].set(e.elem, e.start.transition(e.end, e.pos));
        };
      });
    }, l.hook(a), t.cssHooks.borderColor = { expand: function expand(t) {
        var e = {};return f(["Top", "Right", "Bottom", "Left"], function (i, s) {
          e["border" + s + "Color"] = t;
        }), e;
      } }, o = t.Color.names = { aqua: "#00ffff", black: "#000000", blue: "#0000ff", fuchsia: "#ff00ff", gray: "#808080", green: "#008000", lime: "#00ff00", maroon: "#800000", navy: "#000080", olive: "#808000", purple: "#800080", red: "#ff0000", silver: "#c0c0c0", teal: "#008080", white: "#ffffff", yellow: "#ffff00", transparent: [null, null, null, 0], _default: "#ffffff" };
  }(_), function () {
    function e(e) {
      var i,
          s,
          n = e.ownerDocument.defaultView ? e.ownerDocument.defaultView.getComputedStyle(e, null) : e.currentStyle,
          o = {};if (n && n.length && n[0] && n[n[0]]) for (s = n.length; s--;) {
        i = n[s], "string" == typeof n[i] && (o[t.camelCase(i)] = n[i]);
      } else for (i in n) {
        "string" == typeof n[i] && (o[i] = n[i]);
      }return o;
    }function i(e, i) {
      var s,
          o,
          a = {};for (s in i) {
        o = i[s], e[s] !== o && (n[s] || (t.fx.step[s] || !isNaN(parseFloat(o))) && (a[s] = o));
      }return a;
    }var s = ["add", "remove", "toggle"],
        n = { border: 1, borderBottom: 1, borderColor: 1, borderLeft: 1, borderRight: 1, borderTop: 1, borderWidth: 1, margin: 1, padding: 1 };t.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function (e, i) {
      t.fx.step[i] = function (t) {
        ("none" !== t.end && !t.setAttr || 1 === t.pos && !t.setAttr) && (_.style(t.elem, i, t.end), t.setAttr = !0);
      };
    }), t.fn.addBack || (t.fn.addBack = function (t) {
      return this.add(null == t ? this.prevObject : this.prevObject.filter(t));
    }), t.effects.animateClass = function (n, o, a, r) {
      var h = t.speed(o, a, r);return this.queue(function () {
        var o,
            a = t(this),
            r = a.attr("class") || "",
            l = h.children ? a.find("*").addBack() : a;l = l.map(function () {
          var i = t(this);return { el: i, start: e(this) };
        }), o = function o() {
          t.each(s, function (t, e) {
            n[e] && a[e + "Class"](n[e]);
          });
        }, o(), l = l.map(function () {
          return this.end = e(this.el[0]), this.diff = i(this.start, this.end), this;
        }), a.attr("class", r), l = l.map(function () {
          var e = this,
              i = t.Deferred(),
              s = t.extend({}, h, { queue: !1, complete: function complete() {
              i.resolve(e);
            } });return this.el.animate(this.diff, s), i.promise();
        }), t.when.apply(t, l.get()).done(function () {
          o(), t.each(arguments, function () {
            var e = this.el;t.each(this.diff, function (t) {
              e.css(t, "");
            });
          }), h.complete.call(a[0]);
        });
      });
    }, t.fn.extend({ addClass: function (e) {
        return function (i, s, n, o) {
          return s ? t.effects.animateClass.call(this, { add: i }, s, n, o) : e.apply(this, arguments);
        };
      }(t.fn.addClass), removeClass: function (e) {
        return function (i, s, n, o) {
          return arguments.length > 1 ? t.effects.animateClass.call(this, { remove: i }, s, n, o) : e.apply(this, arguments);
        };
      }(t.fn.removeClass), toggleClass: function (e) {
        return function (i, s, n, o, a) {
          return "boolean" == typeof s || void 0 === s ? n ? t.effects.animateClass.call(this, s ? { add: i } : { remove: i }, n, o, a) : e.apply(this, arguments) : t.effects.animateClass.call(this, { toggle: i }, s, n, o);
        };
      }(t.fn.toggleClass), switchClass: function switchClass(e, i, s, n, o) {
        return t.effects.animateClass.call(this, { add: i, remove: e }, s, n, o);
      } });
  }(), function () {
    function e(e, i, s, n) {
      return t.isPlainObject(e) && (i = e, e = e.effect), e = { effect: e }, null == i && (i = {}), t.isFunction(i) && (n = i, s = null, i = {}), ("number" == typeof i || t.fx.speeds[i]) && (n = s, s = i, i = {}), t.isFunction(s) && (n = s, s = null), i && t.extend(e, i), s = s || i.duration, e.duration = t.fx.off ? 0 : "number" == typeof s ? s : s in t.fx.speeds ? t.fx.speeds[s] : t.fx.speeds._default, e.complete = n || i.complete, e;
    }function i(e) {
      return !e || "number" == typeof e || t.fx.speeds[e] ? !0 : "string" != typeof e || t.effects.effect[e] ? t.isFunction(e) ? !0 : "object" != (typeof e === "undefined" ? "undefined" : _typeof(e)) || e.effect ? !1 : !0 : !0;
    }function s(t, e) {
      var i = e.outerWidth(),
          s = e.outerHeight(),
          n = /^rect\((-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto)\)$/,
          o = n.exec(t) || ["", 0, i, s, 0];return { top: parseFloat(o[1]) || 0, right: "auto" === o[2] ? i : parseFloat(o[2]), bottom: "auto" === o[3] ? s : parseFloat(o[3]), left: parseFloat(o[4]) || 0 };
    }t.expr && t.expr.filters && t.expr.filters.animated && (t.expr.filters.animated = function (e) {
      return function (i) {
        return !!t(i).data(m) || e(i);
      };
    }(t.expr.filters.animated)), t.uiBackCompat !== !1 && t.extend(t.effects, { save: function save(t, e) {
        for (var i = 0, s = e.length; s > i; i++) {
          null !== e[i] && t.data(f + e[i], t[0].style[e[i]]);
        }
      }, restore: function restore(t, e) {
        for (var i, s = 0, n = e.length; n > s; s++) {
          null !== e[s] && (i = t.data(f + e[s]), t.css(e[s], i));
        }
      }, setMode: function setMode(t, e) {
        return "toggle" === e && (e = t.is(":hidden") ? "show" : "hide"), e;
      }, createWrapper: function createWrapper(e) {
        if (e.parent().is(".ui-effects-wrapper")) return e.parent();var i = { width: e.outerWidth(!0), height: e.outerHeight(!0), "float": e.css("float") },
            s = t("<div></div>").addClass("ui-effects-wrapper").css({ fontSize: "100%", background: "transparent", border: "none", margin: 0, padding: 0 }),
            n = { width: e.width(), height: e.height() },
            o = document.activeElement;try {
          o.id;
        } catch (a) {
          o = document.body;
        }return e.wrap(s), (e[0] === o || t.contains(e[0], o)) && t(o).trigger("focus"), s = e.parent(), "static" === e.css("position") ? (s.css({ position: "relative" }), e.css({ position: "relative" })) : (t.extend(i, { position: e.css("position"), zIndex: e.css("z-index") }), t.each(["top", "left", "bottom", "right"], function (t, s) {
          i[s] = e.css(s), isNaN(parseInt(i[s], 10)) && (i[s] = "auto");
        }), e.css({ position: "relative", top: 0, left: 0, right: "auto", bottom: "auto" })), e.css(n), s.css(i).show();
      }, removeWrapper: function removeWrapper(e) {
        var i = document.activeElement;return e.parent().is(".ui-effects-wrapper") && (e.parent().replaceWith(e), (e[0] === i || t.contains(e[0], i)) && t(i).trigger("focus")), e;
      } }), t.extend(t.effects, { version: "1.12.1", define: function define(e, i, s) {
        return s || (s = i, i = "effect"), t.effects.effect[e] = s, t.effects.effect[e].mode = i, s;
      }, scaledDimensions: function scaledDimensions(t, e, i) {
        if (0 === e) return { height: 0, width: 0, outerHeight: 0, outerWidth: 0 };var s = "horizontal" !== i ? (e || 100) / 100 : 1,
            n = "vertical" !== i ? (e || 100) / 100 : 1;return { height: t.height() * n, width: t.width() * s, outerHeight: t.outerHeight() * n, outerWidth: t.outerWidth() * s };
      }, clipToBox: function clipToBox(t) {
        return { width: t.clip.right - t.clip.left, height: t.clip.bottom - t.clip.top, left: t.clip.left, top: t.clip.top };
      }, unshift: function unshift(t, e, i) {
        var s = t.queue();e > 1 && s.splice.apply(s, [1, 0].concat(s.splice(e, i))), t.dequeue();
      }, saveStyle: function saveStyle(t) {
        t.data(g, t[0].style.cssText);
      }, restoreStyle: function restoreStyle(t) {
        t[0].style.cssText = t.data(g) || "", t.removeData(g);
      }, mode: function mode(t, e) {
        var i = t.is(":hidden");return "toggle" === e && (e = i ? "show" : "hide"), (i ? "hide" === e : "show" === e) && (e = "none"), e;
      }, getBaseline: function getBaseline(t, e) {
        var i, s;switch (t[0]) {case "top":
            i = 0;break;case "middle":
            i = .5;break;case "bottom":
            i = 1;break;default:
            i = t[0] / e.height;}switch (t[1]) {case "left":
            s = 0;break;case "center":
            s = .5;break;case "right":
            s = 1;break;default:
            s = t[1] / e.width;}return { x: s, y: i };
      }, createPlaceholder: function createPlaceholder(e) {
        var i,
            s = e.css("position"),
            n = e.position();return e.css({ marginTop: e.css("marginTop"), marginBottom: e.css("marginBottom"), marginLeft: e.css("marginLeft"), marginRight: e.css("marginRight") }).outerWidth(e.outerWidth()).outerHeight(e.outerHeight()), /^(static|relative)/.test(s) && (s = "absolute", i = t("<" + e[0].nodeName + ">").insertAfter(e).css({ display: /^(inline|ruby)/.test(e.css("display")) ? "inline-block" : "block", visibility: "hidden", marginTop: e.css("marginTop"), marginBottom: e.css("marginBottom"), marginLeft: e.css("marginLeft"), marginRight: e.css("marginRight"), "float": e.css("float") }).outerWidth(e.outerWidth()).outerHeight(e.outerHeight()).addClass("ui-effects-placeholder"), e.data(f + "placeholder", i)), e.css({ position: s, left: n.left, top: n.top }), i;
      }, removePlaceholder: function removePlaceholder(t) {
        var e = f + "placeholder",
            i = t.data(e);i && (i.remove(), t.removeData(e));
      }, cleanUp: function cleanUp(e) {
        t.effects.restoreStyle(e), t.effects.removePlaceholder(e);
      }, setTransition: function setTransition(e, i, s, n) {
        return n = n || {}, t.each(i, function (t, i) {
          var o = e.cssUnit(i);o[0] > 0 && (n[i] = o[0] * s + o[1]);
        }), n;
      } }), t.fn.extend({ effect: function effect() {
        function i(e) {
          function i() {
            r.removeData(m), t.effects.cleanUp(r), "hide" === s.mode && r.hide(), a();
          }function a() {
            t.isFunction(h) && h.call(r[0]), t.isFunction(e) && e();
          }var r = t(this);s.mode = c.shift(), t.uiBackCompat === !1 || o ? "none" === s.mode ? (r[l](), a()) : n.call(r[0], s, i) : (r.is(":hidden") ? "hide" === l : "show" === l) ? (r[l](), a()) : n.call(r[0], s, a);
        }var s = e.apply(this, arguments),
            n = t.effects.effect[s.effect],
            o = n.mode,
            a = s.queue,
            r = a || "fx",
            h = s.complete,
            l = s.mode,
            c = [],
            u = function u(e) {
          var i = t(this),
              s = t.effects.mode(i, l) || o;i.data(m, !0), c.push(s), o && ("show" === s || s === o && "hide" === s) && i.show(), o && "none" === s || t.effects.saveStyle(i), t.isFunction(e) && e();
        };return t.fx.off || !n ? l ? this[l](s.duration, h) : this.each(function () {
          h && h.call(this);
        }) : a === !1 ? this.each(u).each(i) : this.queue(r, u).queue(r, i);
      }, show: function (t) {
        return function (s) {
          if (i(s)) return t.apply(this, arguments);var n = e.apply(this, arguments);return n.mode = "show", this.effect.call(this, n);
        };
      }(t.fn.show), hide: function (t) {
        return function (s) {
          if (i(s)) return t.apply(this, arguments);var n = e.apply(this, arguments);return n.mode = "hide", this.effect.call(this, n);
        };
      }(t.fn.hide), toggle: function (t) {
        return function (s) {
          if (i(s) || "boolean" == typeof s) return t.apply(this, arguments);var n = e.apply(this, arguments);return n.mode = "toggle", this.effect.call(this, n);
        };
      }(t.fn.toggle), cssUnit: function cssUnit(e) {
        var i = this.css(e),
            s = [];return t.each(["em", "px", "%", "pt"], function (t, e) {
          i.indexOf(e) > 0 && (s = [parseFloat(i), e]);
        }), s;
      }, cssClip: function cssClip(t) {
        return t ? this.css("clip", "rect(" + t.top + "px " + t.right + "px " + t.bottom + "px " + t.left + "px)") : s(this.css("clip"), this);
      }, transfer: function transfer(e, i) {
        var s = t(this),
            n = t(e.to),
            o = "fixed" === n.css("position"),
            a = t("body"),
            r = o ? a.scrollTop() : 0,
            h = o ? a.scrollLeft() : 0,
            l = n.offset(),
            c = { top: l.top - r, left: l.left - h, height: n.innerHeight(), width: n.innerWidth() },
            u = s.offset(),
            d = t("<div class='ui-effects-transfer'></div>").appendTo("body").addClass(e.className).css({ top: u.top - r, left: u.left - h, height: s.innerHeight(), width: s.innerWidth(), position: o ? "fixed" : "absolute" }).animate(c, e.duration, e.easing, function () {
          d.remove(), t.isFunction(i) && i();
        });
      } }), t.fx.step.clip = function (e) {
      e.clipInit || (e.start = t(e.elem).cssClip(), "string" == typeof e.end && (e.end = s(e.end, e.elem)), e.clipInit = !0), t(e.elem).cssClip({ top: e.pos * (e.end.top - e.start.top) + e.start.top, right: e.pos * (e.end.right - e.start.right) + e.start.right, bottom: e.pos * (e.end.bottom - e.start.bottom) + e.start.bottom, left: e.pos * (e.end.left - e.start.left) + e.start.left });
    };
  }(), function () {
    var e = {};t.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function (t, i) {
      e[i] = function (e) {
        return Math.pow(e, t + 2);
      };
    }), t.extend(e, { Sine: function Sine(t) {
        return 1 - Math.cos(t * Math.PI / 2);
      }, Circ: function Circ(t) {
        return 1 - Math.sqrt(1 - t * t);
      }, Elastic: function Elastic(t) {
        return 0 === t || 1 === t ? t : -Math.pow(2, 8 * (t - 1)) * Math.sin((80 * (t - 1) - 7.5) * Math.PI / 15);
      }, Back: function Back(t) {
        return t * t * (3 * t - 2);
      }, Bounce: function Bounce(t) {
        for (var e, i = 4; ((e = Math.pow(2, --i)) - 1) / 11 > t;) {}return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((3 * e - 2) / 22 - t, 2);
      } }), t.each(e, function (e, i) {
      t.easing["easeIn" + e] = i, t.easing["easeOut" + e] = function (t) {
        return 1 - i(1 - t);
      }, t.easing["easeInOut" + e] = function (t) {
        return .5 > t ? i(2 * t) / 2 : 1 - i(-2 * t + 2) / 2;
      };
    });
  }();var v = t.effects;t.effects.define("blind", "hide", function (e, i) {
    var s = { up: ["bottom", "top"], vertical: ["bottom", "top"], down: ["top", "bottom"], left: ["right", "left"], horizontal: ["right", "left"], right: ["left", "right"] },
        n = t(this),
        o = e.direction || "up",
        a = n.cssClip(),
        r = { clip: t.extend({}, a) },
        h = t.effects.createPlaceholder(n);r.clip[s[o][0]] = r.clip[s[o][1]], "show" === e.mode && (n.cssClip(r.clip), h && h.css(t.effects.clipToBox(r)), r.clip = a), h && h.animate(t.effects.clipToBox(r), e.duration, e.easing), n.animate(r, { queue: !1, duration: e.duration, easing: e.easing, complete: i });
  }), t.effects.define("bounce", function (e, i) {
    var s,
        n,
        o,
        a = t(this),
        r = e.mode,
        h = "hide" === r,
        l = "show" === r,
        c = e.direction || "up",
        u = e.distance,
        d = e.times || 5,
        p = 2 * d + (l || h ? 1 : 0),
        f = e.duration / p,
        g = e.easing,
        m = "up" === c || "down" === c ? "top" : "left",
        _ = "up" === c || "left" === c,
        v = 0,
        b = a.queue().length;for (t.effects.createPlaceholder(a), o = a.css(m), u || (u = a["top" === m ? "outerHeight" : "outerWidth"]() / 3), l && (n = { opacity: 1 }, n[m] = o, a.css("opacity", 0).css(m, _ ? 2 * -u : 2 * u).animate(n, f, g)), h && (u /= Math.pow(2, d - 1)), n = {}, n[m] = o; d > v; v++) {
      s = {}, s[m] = (_ ? "-=" : "+=") + u, a.animate(s, f, g).animate(n, f, g), u = h ? 2 * u : u / 2;
    }h && (s = { opacity: 0 }, s[m] = (_ ? "-=" : "+=") + u, a.animate(s, f, g)), a.queue(i), t.effects.unshift(a, b, p + 1);
  }), t.effects.define("clip", "hide", function (e, i) {
    var s,
        n = {},
        o = t(this),
        a = e.direction || "vertical",
        r = "both" === a,
        h = r || "horizontal" === a,
        l = r || "vertical" === a;s = o.cssClip(), n.clip = { top: l ? (s.bottom - s.top) / 2 : s.top, right: h ? (s.right - s.left) / 2 : s.right, bottom: l ? (s.bottom - s.top) / 2 : s.bottom, left: h ? (s.right - s.left) / 2 : s.left }, t.effects.createPlaceholder(o), "show" === e.mode && (o.cssClip(n.clip), n.clip = s), o.animate(n, { queue: !1, duration: e.duration, easing: e.easing, complete: i });
  }), t.effects.define("drop", "hide", function (e, i) {
    var s,
        n = t(this),
        o = e.mode,
        a = "show" === o,
        r = e.direction || "left",
        h = "up" === r || "down" === r ? "top" : "left",
        l = "up" === r || "left" === r ? "-=" : "+=",
        c = "+=" === l ? "-=" : "+=",
        u = { opacity: 0 };t.effects.createPlaceholder(n), s = e.distance || n["top" === h ? "outerHeight" : "outerWidth"](!0) / 2, u[h] = l + s, a && (n.css(u), u[h] = c + s, u.opacity = 1), n.animate(u, { queue: !1, duration: e.duration, easing: e.easing, complete: i });
  }), t.effects.define("explode", "hide", function (e, i) {
    function s() {
      b.push(this), b.length === u * d && n();
    }function n() {
      p.css({ visibility: "visible" }), t(b).remove(), i();
    }var o,
        a,
        r,
        h,
        l,
        c,
        u = e.pieces ? Math.round(Math.sqrt(e.pieces)) : 3,
        d = u,
        p = t(this),
        f = e.mode,
        g = "show" === f,
        m = p.show().css("visibility", "hidden").offset(),
        _ = Math.ceil(p.outerWidth() / d),
        v = Math.ceil(p.outerHeight() / u),
        b = [];for (o = 0; u > o; o++) {
      for (h = m.top + o * v, c = o - (u - 1) / 2, a = 0; d > a; a++) {
        r = m.left + a * _, l = a - (d - 1) / 2, p.clone().appendTo("body").wrap("<div></div>").css({ position: "absolute", visibility: "visible", left: -a * _, top: -o * v }).parent().addClass("ui-effects-explode").css({ position: "absolute", overflow: "hidden", width: _, height: v, left: r + (g ? l * _ : 0), top: h + (g ? c * v : 0), opacity: g ? 0 : 1 }).animate({ left: r + (g ? 0 : l * _), top: h + (g ? 0 : c * v), opacity: g ? 1 : 0 }, e.duration || 500, e.easing, s);
      }
    }
  }), t.effects.define("fade", "toggle", function (e, i) {
    var s = "show" === e.mode;t(this).css("opacity", s ? 0 : 1).animate({ opacity: s ? 1 : 0 }, { queue: !1, duration: e.duration, easing: e.easing, complete: i });
  }), t.effects.define("fold", "hide", function (e, i) {
    var s = t(this),
        n = e.mode,
        o = "show" === n,
        a = "hide" === n,
        r = e.size || 15,
        h = /([0-9]+)%/.exec(r),
        l = !!e.horizFirst,
        c = l ? ["right", "bottom"] : ["bottom", "right"],
        u = e.duration / 2,
        d = t.effects.createPlaceholder(s),
        p = s.cssClip(),
        f = { clip: t.extend({}, p) },
        g = { clip: t.extend({}, p) },
        m = [p[c[0]], p[c[1]]],
        _ = s.queue().length;h && (r = parseInt(h[1], 10) / 100 * m[a ? 0 : 1]), f.clip[c[0]] = r, g.clip[c[0]] = r, g.clip[c[1]] = 0, o && (s.cssClip(g.clip), d && d.css(t.effects.clipToBox(g)), g.clip = p), s.queue(function (i) {
      d && d.animate(t.effects.clipToBox(f), u, e.easing).animate(t.effects.clipToBox(g), u, e.easing), i();
    }).animate(f, u, e.easing).animate(g, u, e.easing).queue(i), t.effects.unshift(s, _, 4);
  }), t.effects.define("highlight", "show", function (e, i) {
    var s = t(this),
        n = { backgroundColor: s.css("backgroundColor") };"hide" === e.mode && (n.opacity = 0), t.effects.saveStyle(s), s.css({ backgroundImage: "none", backgroundColor: e.color || "#ffff99" }).animate(n, { queue: !1, duration: e.duration, easing: e.easing, complete: i });
  }), t.effects.define("size", function (e, i) {
    var s,
        n,
        o,
        a = t(this),
        r = ["fontSize"],
        h = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
        l = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
        c = e.mode,
        u = "effect" !== c,
        d = e.scale || "both",
        p = e.origin || ["middle", "center"],
        f = a.css("position"),
        g = a.position(),
        m = t.effects.scaledDimensions(a),
        _ = e.from || m,
        v = e.to || t.effects.scaledDimensions(a, 0);t.effects.createPlaceholder(a), "show" === c && (o = _, _ = v, v = o), n = { from: { y: _.height / m.height, x: _.width / m.width }, to: { y: v.height / m.height, x: v.width / m.width } }, ("box" === d || "both" === d) && (n.from.y !== n.to.y && (_ = t.effects.setTransition(a, h, n.from.y, _), v = t.effects.setTransition(a, h, n.to.y, v)), n.from.x !== n.to.x && (_ = t.effects.setTransition(a, l, n.from.x, _), v = t.effects.setTransition(a, l, n.to.x, v))), ("content" === d || "both" === d) && n.from.y !== n.to.y && (_ = t.effects.setTransition(a, r, n.from.y, _), v = t.effects.setTransition(a, r, n.to.y, v)), p && (s = t.effects.getBaseline(p, m), _.top = (m.outerHeight - _.outerHeight) * s.y + g.top, _.left = (m.outerWidth - _.outerWidth) * s.x + g.left, v.top = (m.outerHeight - v.outerHeight) * s.y + g.top, v.left = (m.outerWidth - v.outerWidth) * s.x + g.left), a.css(_), ("content" === d || "both" === d) && (h = h.concat(["marginTop", "marginBottom"]).concat(r), l = l.concat(["marginLeft", "marginRight"]), a.find("*[width]").each(function () {
      var i = t(this),
          s = t.effects.scaledDimensions(i),
          o = { height: s.height * n.from.y, width: s.width * n.from.x, outerHeight: s.outerHeight * n.from.y, outerWidth: s.outerWidth * n.from.x },
          a = { height: s.height * n.to.y, width: s.width * n.to.x, outerHeight: s.height * n.to.y, outerWidth: s.width * n.to.x };n.from.y !== n.to.y && (o = t.effects.setTransition(i, h, n.from.y, o), a = t.effects.setTransition(i, h, n.to.y, a)), n.from.x !== n.to.x && (o = t.effects.setTransition(i, l, n.from.x, o), a = t.effects.setTransition(i, l, n.to.x, a)), u && t.effects.saveStyle(i), i.css(o), i.animate(a, e.duration, e.easing, function () {
        u && t.effects.restoreStyle(i);
      });
    })), a.animate(v, { queue: !1, duration: e.duration, easing: e.easing, complete: function complete() {
        var e = a.offset();0 === v.opacity && a.css("opacity", _.opacity), u || (a.css("position", "static" === f ? "relative" : f).offset(e), t.effects.saveStyle(a)), i();
      } });
  }), t.effects.define("scale", function (e, i) {
    var s = t(this),
        n = e.mode,
        o = parseInt(e.percent, 10) || (0 === parseInt(e.percent, 10) ? 0 : "effect" !== n ? 0 : 100),
        a = t.extend(!0, { from: t.effects.scaledDimensions(s), to: t.effects.scaledDimensions(s, o, e.direction || "both"), origin: e.origin || ["middle", "center"] }, e);e.fade && (a.from.opacity = 1, a.to.opacity = 0), t.effects.effect.size.call(this, a, i);
  }), t.effects.define("puff", "hide", function (e, i) {
    var s = t.extend(!0, {}, e, { fade: !0, percent: parseInt(e.percent, 10) || 150 });t.effects.effect.scale.call(this, s, i);
  }), t.effects.define("pulsate", "show", function (e, i) {
    var s = t(this),
        n = e.mode,
        o = "show" === n,
        a = "hide" === n,
        r = o || a,
        h = 2 * (e.times || 5) + (r ? 1 : 0),
        l = e.duration / h,
        c = 0,
        u = 1,
        d = s.queue().length;for ((o || !s.is(":visible")) && (s.css("opacity", 0).show(), c = 1); h > u; u++) {
      s.animate({ opacity: c }, l, e.easing), c = 1 - c;
    }s.animate({ opacity: c }, l, e.easing), s.queue(i), t.effects.unshift(s, d, h + 1);
  }), t.effects.define("shake", function (e, i) {
    var s = 1,
        n = t(this),
        o = e.direction || "left",
        a = e.distance || 20,
        r = e.times || 3,
        h = 2 * r + 1,
        l = Math.round(e.duration / h),
        c = "up" === o || "down" === o ? "top" : "left",
        u = "up" === o || "left" === o,
        d = {},
        p = {},
        f = {},
        g = n.queue().length;for (t.effects.createPlaceholder(n), d[c] = (u ? "-=" : "+=") + a, p[c] = (u ? "+=" : "-=") + 2 * a, f[c] = (u ? "-=" : "+=") + 2 * a, n.animate(d, l, e.easing); r > s; s++) {
      n.animate(p, l, e.easing).animate(f, l, e.easing);
    }n.animate(p, l, e.easing).animate(d, l / 2, e.easing).queue(i), t.effects.unshift(n, g, h + 1);
  }), t.effects.define("slide", "show", function (e, i) {
    var s,
        n,
        o = t(this),
        a = { up: ["bottom", "top"], down: ["top", "bottom"], left: ["right", "left"], right: ["left", "right"] },
        r = e.mode,
        h = e.direction || "left",
        l = "up" === h || "down" === h ? "top" : "left",
        c = "up" === h || "left" === h,
        u = e.distance || o["top" === l ? "outerHeight" : "outerWidth"](!0),
        d = {};t.effects.createPlaceholder(o), s = o.cssClip(), n = o.position()[l], d[l] = (c ? -1 : 1) * u + n, d.clip = o.cssClip(), d.clip[a[h][1]] = d.clip[a[h][0]], "show" === r && (o.cssClip(d.clip), o.css(l, d[l]), d.clip = s, d[l] = n), o.animate(d, { queue: !1, duration: e.duration, easing: e.easing, complete: i });
  });var v;t.uiBackCompat !== !1 && (v = t.effects.define("transfer", function (e, i) {
    t(this).transfer(e, i);
  }));
});
},{}],2:[function(require,module,exports){
module.exports = require('./lib/bloodhound');

},{"./lib/bloodhound":4}],3:[function(require,module,exports){
var Promise = require('es6-promise').Promise;
var request = require('superagent');

module.exports = function(o) {
  return new Promise(function(resolve, reject) {
    request.get(o.url).end(function(err, res) {
      if(err) return reject(err);
      resolve(res.body);
    });
  });
};

},{"es6-promise":16,"superagent":26}],4:[function(require,module,exports){
var _ = require('./utils');
var Promise = require('es6-promise').Promise;
var Remote = require('./remote');
var Prefetch = require('./prefetch');
var tokenizers = require('./tokenizers');
var oParser = require('./options_parser');
var SearchIndex = require('./search_index');
var Transport = require('./transport');

function Bloodhound(o) {
  o = oParser(o);

  this.sorter = o.sorter;
  this.identify = o.identify;
  this.sufficient = o.sufficient;

  this.local = o.local;
  this.remote = o.remote ? new Remote(o.remote) : null;
  this.prefetch = o.prefetch ? new Prefetch(o.prefetch) : null;

  // the backing data structure used for fast pattern matching
  this.index = new SearchIndex({
    identify: this.identify,
    datumTokenizer: o.datumTokenizer,
    queryTokenizer: o.queryTokenizer
  });

  // hold off on intialization if the intialize option was explicitly false
  o.initialize !== false && this.initialize();
}

Bloodhound.tokenizers = tokenizers;

_.mixin(Bloodhound.prototype, {

  // ### super secret stuff used for integration with jquery plugin

  __ttAdapter: function ttAdapter() {
    var that = this;

    return this.remote ? withAsync : withoutAsync;

    function withAsync(query, sync, async) {
      return that.search(query, sync, async);
    }

    function withoutAsync(query, sync) {
      return that.search(query, sync);
    }
  },

  _loadPrefetch: function loadPrefetch() {
    var that = this, promise, serialized;

    if (!this.prefetch) {
      return new Promise(function(resolve, reject) {
        resolve();
      });
    }

    else if (serialized = this.prefetch.fromCache()) {
      this.index.bootstrap(serialized);
      return new Promise(function(resolve, reject) {
        resolve();
      });
    }

    else {
      // this.prefetch.fromNetwork(done);
      return new Promise(function(resolve, reject) {

        // todo: promise
        that.prefetch.fromNetwork(function(err, data) {
          if (err) return reject(err);

          try {
            that.add(data);
            that.prefetch.store(that.index.serialize());
            resolve();
          } catch(e) {
            reject(e);
          }
        });
      });
    }
  },

  _initialize: function() {
    var that = this, deferred;

    // in case this is a reinitialization, clear previous data
    this.clear();

    (this.initPromise = this._loadPrefetch())
    .then(addLocalToIndex); // local must be added to index after prefetch

    return this.initPromise;

    function addLocalToIndex() { that.add(that.local); }
  },

  // ### public

  initialize: function(force) {
    return !this.initPromise || force ? this._initialize() : this.initPromise;
  },

  // TODO: before initialize what happens?
  add: function(data) {
    this.index.add(data);
    return this;
  },

  get: function(ids) {
    ids = _.isArray(ids) ? ids : [].slice.call(arguments);
    return this.index.get(ids);
  },

  search: function(query, sync, async) {
    var that = this, local;

    local = this.sorter(this.index.search(query));

    // return a copy to guarantee no changes within this scope
    // as this array will get used when processing the remote results
    sync(this.remote ? local.slice() : local);

    if (this.remote && local.length < this.sufficient) {
      this.remote.get(query, processRemote);
    }

    else if (this.remote) {
      // #149: prevents outdated rate-limited requests from being sent
      this.remote.cancelLastRequest();
    }

    return this;

    function processRemote(remote) {
      var nonDuplicates = [];

      // exclude duplicates
      _.each(remote, function(r) {
         !_.some(local, function(l) {
          return that.identify(r) === that.identify(l);
        }) && nonDuplicates.push(r);
      });

      async && async(nonDuplicates);
    }
  },

  all: function() {
    return this.index.all();
  },

  clear: function() {
    this.index.reset();
    return this;
  },

  clearPrefetchCache: function() {
    this.prefetch && this.prefetch.clear();
    return this;
  },

  clearRemoteCache: function() {
    Transport.resetCache();
    return this;
  },

  // DEPRECATED: will be removed in v1
  ttAdapter: function() {
    return this.__ttAdapter();
  }
});

module.exports = Bloodhound;

},{"./options_parser":6,"./prefetch":8,"./remote":9,"./search_index":10,"./tokenizers":11,"./transport":12,"./utils":13,"es6-promise":16}],5:[function(require,module,exports){
/*
 * typeahead.js
 * https://github.com/twitter/typeahead.js
 * Copyright 2013-2014 Twitter, Inc. and other contributors; Licensed MIT
 */

// inspired by https://github.com/jharding/lru-cache

var _ = require('./utils');

function LruCache(maxSize) {
  this.maxSize = _.isNumber(maxSize) ? maxSize : 100;
  this.reset();

  // if max size is less than 0, provide a noop cache
  if (this.maxSize <= 0) {
    this.set = this.get = _.noop;
  }
}

_.mixin(LruCache.prototype, {
  set: function set(key, val) {
    var tailItem = this.list.tail, node;

    // at capacity
    if (this.size >= this.maxSize) {
      this.list.remove(tailItem);
      delete this.hash[tailItem.key];

      this.size--;
    }

    // writing over existing key
    if (node = this.hash[key]) {
      node.val = val;
      this.list.moveToFront(node);
    }

    // new key
    else {
      node = new Node(key, val);

      this.list.add(node);
      this.hash[key] = node;

      this.size++;
    }
  },

  get: function get(key) {
    var node = this.hash[key];

    if (node) {
      this.list.moveToFront(node);
      return node.val;
    }
  },

  reset: function reset() {
    this.size = 0;
    this.hash = {};
    this.list = new List();
  }
});

function List() {
  this.head = this.tail = null;
}

_.mixin(List.prototype, {
  add: function add(node) {
    if (this.head) {
      node.next = this.head;
      this.head.prev = node;
    }

    this.head = node;
    this.tail = this.tail || node;
  },

  remove: function remove(node) {
    node.prev ? node.prev.next = node.next : this.head = node.next;
    node.next ? node.next.prev = node.prev : this.tail = node.prev;
  },

  moveToFront: function(node) {
    this.remove(node);
    this.add(node);
  }
});

function Node(key, val) {
  this.key = key;
  this.val = val;
  this.prev = this.next = null;
}

module.exports = LruCache;

},{"./utils":13}],6:[function(require,module,exports){
var _ = require('./utils');
var ajax = require('./ajax');
var VERSION = require('./version');

module.exports = function(o) {
  var defaults, sorter;

  defaults = {
    initialize: true,
    identify: _.stringify,
    datumTokenizer: null,
    queryTokenizer: null,
    sufficient: 5,
    sorter: null,
    local: [],
    prefetch: null,
    remote: null
  };

  o = _.mixin(defaults, o || {});

  // throw error if required options are not set
  !o.datumTokenizer && _.error('datumTokenizer is required');
  !o.queryTokenizer && _.error('queryTokenizer is required');

  sorter = o.sorter;
  o.sorter = sorter ? function(x) { return x.sort(sorter); } : _.identity;

  o.local = _.isFunction(o.local) ? o.local() : o.local;
  o.prefetch = parsePrefetch(o.prefetch);
  o.remote = parseRemote(o.remote);

  return o;
};

function parsePrefetch(o) {
  var defaults;

  if (!o) { return null; }

  defaults = {
    url: null,
    ttl: 24 * 60 * 60 * 1000, // 1 day
    cache: true,
    cacheKey: null,
    thumbprint: '',
    prepare: _.identity,
    transform: _.identity,
    transport: null
  };

  // support basic (url) and advanced configuration
  o = _.isString(o) ? { url: o } : o;
  o = _.mixin(defaults, o);

  // throw error if required options are not set
  !o.url && _.error('prefetch requires url to be set');

  // DEPRECATED: filter will be dropped in v1
  o.transform = o.filter || o.transform;

  o.cacheKey = o.cacheKey || o.url;
  o.thumbprint = VERSION + o.thumbprint;
  o.transport = o.transport ? callbackToDeferred(o.transport) : ajax;

  return o;
}

function parseRemote(o) {
  var defaults;

  if (!o) { return; }

  defaults = {
    url: null,
    cache: true, // leave undocumented
    prepare: null,
    replace: null,
    wildcard: null,
    limiter: null,
    rateLimitBy: 'debounce',
    rateLimitWait: 300,
    transform: _.identity,
    transport: null
  };

  // support basic (url) and advanced configuration
  o = _.isString(o) ? { url: o } : o;
  o = _.mixin(defaults, o);

  // throw error if required options are not set
  !o.url && _.error('remote requires url to be set');

  // DEPRECATED: filter will be dropped in v1
  o.transform = o.filter || o.transform;

  o.prepare = toRemotePrepare(o);
  o.limiter = toLimiter(o);
  o.transport = o.transport ? callbackToDeferred(o.transport) : ajax;

  delete o.replace;
  delete o.wildcard;
  delete o.rateLimitBy;
  delete o.rateLimitWait;

  return o;
}

function toRemotePrepare(o) {
  var prepare, replace, wildcard;

  prepare = o.prepare;
  replace = o.replace;
  wildcard = o.wildcard;

  if (prepare) { return prepare; }

  if (replace) {
    prepare = prepareByReplace;
  }

  else if (o.wildcard) {
    prepare = prepareByWildcard;
  }

  else {
    prepare = idenityPrepare;
  }

  return prepare;

  function prepareByReplace(query, settings) {
    settings.url = replace(settings.url, query);
    return settings;
  }

  function prepareByWildcard(query, settings) {
    settings.url = settings.url.replace(wildcard, encodeURIComponent(query));
    return settings;
  }

  function idenityPrepare(query, settings) {
    return settings;
  }
}

function toLimiter(o) {
  var limiter, method, wait;

  limiter = o.limiter;
  method = o.rateLimitBy;
  wait = o.rateLimitWait;

  if (!limiter) {
    limiter = /^throttle$/i.test(method) ? throttle(wait) : debounce(wait);
  }

  return limiter;

  function debounce(wait) {
    return function(fn) {
      return _.debounce(fn, wait);
    };
  }

  function throttle(wait) {
    return function (fn) {
      return _.throttle(fn, wait);
    };
  }
}

function callbackToDeferred(fn) {
  return function(o) {
    // var deferred = $.Deferred();

    // fn(o, onSuccess, onError);

    // return deferred;

    // function onSuccess(resp) {
    //   // defer in case fn is synchronous, otherwise done
    //   // and always handlers will be attached after the resolution
    //   _.defer(function() { deferred.resolve(resp); });
    // }

    // function onError(err) {
    //   // defer in case fn is synchronous, otherwise done
    //   // and always handlers will be attached after the resolution
    //   _.defer(function() { deferred.reject(err); });
    // }
  };
}

},{"./ajax":3,"./utils":13,"./version":14}],7:[function(require,module,exports){
var storage2 = require('storage2');
var _ = require('./utils');

var LOCAL_STORAGE;

try {
  LOCAL_STORAGE = storage2.localStorage;

  // while in private browsing mode, some browsers make
  // localStorage available, but throw an error when used
  LOCAL_STORAGE.setItem('~~~', '!');
  LOCAL_STORAGE.removeItem('~~~');
} catch (err) {
  LOCAL_STORAGE = null;
}

// constructor
// -----------

function PersistentStorage(namespace, override) {
  this.prefix = ['__', namespace, '__'].join('');
  this.ttlKey = '__ttl__';
  this.keyMatcher = new RegExp('^' + _.escapeRegExChars(this.prefix));

  // for testing purpose
  this.ls = override || LOCAL_STORAGE;

  // if local storage isn't available, everything becomes a noop
  !this.ls && this._noop();
}

// instance methods
// ----------------

_.mixin(PersistentStorage.prototype, {
  // ### private

  _prefix: function(key) {
    return this.prefix + key;
  },

  _ttlKey: function(key) {
    return this._prefix(key) + this.ttlKey;
  },

  _noop: function() {
    this.get =
    this.set =
    this.remove =
    this.clear =
    this.isExpired = _.noop;
  },

  _safeSet: function(key, val) {
    try {
      this.ls.setItem(key, val);
    } catch (err) {
      // hit the localstorage limit so clean up and better luck next time
      if (err.name === 'QuotaExceededError') {
        this.clear();
        this._noop();
      }
    }
  },

  // ### public

  get: function(key) {
    if (this.isExpired(key)) {
      this.remove(key);
    }

    return decode(this.ls.getItem(this._prefix(key)));
  },

  set: function(key, val, ttl) {
    if (_.isNumber(ttl)) {
      this._safeSet(this._ttlKey(key), encode(now() + ttl));
    }

    else {
      this.ls.removeItem(this._ttlKey(key));
    }

    return this._safeSet(this._prefix(key), encode(val));
  },

  remove: function(key) {
    this.ls.removeItem(this._ttlKey(key));
    this.ls.removeItem(this._prefix(key));

    return this;
  },

  clear: function() {
    var i, keys = gatherMatchingKeys(this.keyMatcher);

    for (i = keys.length; i--;) {
      this.remove(keys[i]);
    }

    return this;
  },

  isExpired: function(key) {
    var ttl = decode(this.ls.getItem(this._ttlKey(key)));

    return _.isNumber(ttl) && now() > ttl ? true : false;
  }
});


// helper functions
// ----------------

function now() {
  return new Date().getTime();
}

function encode(val) {
  // convert undefined to null to avoid issues with JSON.parse
  return JSON.stringify(_.isUndefined(val) ? null : val);
}

function decode(val) {
  return JSON.parse(val);
  // return $.parseJSON(val);
}

function gatherMatchingKeys(keyMatcher) {
  var i, key, keys = [], len = LOCAL_STORAGE.length;

  for (i = 0; i < len; i++) {
    if ((key = LOCAL_STORAGE.key(i)).match(keyMatcher)) {
      keys.push(key.replace(keyMatcher, ''));
    }
  }

  return keys;
}

module.exports = PersistentStorage;

},{"./utils":13,"storage2":22}],8:[function(require,module,exports){
var PersistentStorage = require('./persistent_storage');
var _ = require('./utils');

var keys = { data: 'data', protocol: 'protocol', thumbprint: 'thumbprint' };
var location = null;


if(typeof window !== 'undefined') {
  location = window.location;
} else {
  location = {
    protocol: 'https:'
  };
}


// constructor
// -----------

// defaults for options are handled in options_parser
function Prefetch(o) {
  this.url = o.url;
  this.ttl = o.ttl;
  this.cache = o.cache;
  this.prepare = o.prepare;
  this.transform = o.transform;
  this.transport = o.transport;
  this.thumbprint = o.thumbprint;

  this.storage = new PersistentStorage(o.cacheKey);
}

_.mixin(Prefetch.prototype, {

  _settings: function() {
    return { url: this.url, type: 'GET', dataType: 'json' };
  },

  store: function(data) {
    if (!this.cache) { return; }

    this.storage.set(keys.data, data, this.ttl);
    this.storage.set(keys.protocol, location.protocol, this.ttl);
    this.storage.set(keys.thumbprint, this.thumbprint, this.ttl);
  },

  fromCache: function() {
    var stored = {}, isExpired;

    if (!this.cache) { return null; }

    stored.data = this.storage.get(keys.data);
    stored.protocol = this.storage.get(keys.protocol);
    stored.thumbprint = this.storage.get(keys.thumbprint);

    // the stored data is considered expired if the thumbprints
    // don't match or if the protocol it was originally stored under
    // has changed
    isExpired =
      stored.thumbprint !== this.thumbprint ||
      stored.protocol !== location.protocol;

    // TODO: if expired, remove from local storage

    return stored.data && !isExpired ? stored.data : null;
  },

  fromNetwork: function(cb) {
    var that = this, settings;

    if (!cb) { return; }

    settings = this.prepare(this._settings());

    // this.transport(settings).fail(onError).done(onResponse);
    this.transport(settings).then(onResponse, onError);

    function onError() { cb(true); }
    function onResponse(resp) { cb(null, that.transform(resp)); }
  },

  clear: function() {
    this.storage.clear();
    return this;
  }
});

module.exports = Prefetch;

},{"./persistent_storage":7,"./utils":13}],9:[function(require,module,exports){
/*
 * typeahead.js
 * https://github.com/twitter/typeahead.js
 * Copyright 2013-2014 Twitter, Inc. and other contributors; Licensed MIT
 */

var _ = require('./utils');
var Transport = require('./transport');

function Remote(o) {
  this.url = o.url;
  this.prepare = o.prepare;
  this.transform = o.transform;

  this.transport = new Transport({
    cache: o.cache,
    limiter: o.limiter,
    transport: o.transport
  });
}

_.mixin(Remote.prototype, {
  // ### private

  _settings: function settings() {
    return {
      url: this.url,
      type: 'GET',
      dataType: 'json'
    };
  },

  get: function get(query, cb) {
    var that = this, settings;

    if (!cb) { return; }

    query = query || '';
    settings = this.prepare(query, this._settings());

    return this.transport.get(settings, onResponse);

    function onResponse(err, resp) {
      err ? cb([]) : cb(that.transform(resp));
    }
  },

  cancelLastRequest: function cancelLastRequest() {
    this.transport.cancel();
  }
});

module.exports = Remote;
},{"./transport":12,"./utils":13}],10:[function(require,module,exports){
var _ = require('./utils');

var CHILDREN = 'c';
var IDS = 'i';

function SearchIndex(o) {
  o = o || {};

  if (!o.datumTokenizer || !o.queryTokenizer) {
    throw new Error('datumTokenizer and queryTokenizer are both required');
  }

  this.identify = o.identify || _.stringify;
  this.datumTokenizer = o.datumTokenizer;
  this.queryTokenizer = o.queryTokenizer;

  this.reset();
}

_.mixin(SearchIndex.prototype, {

  bootstrap: function(o) {
    this.datums = o.datums;
    this.trie = o.trie;
  },

  add: function(data) {
    var that = this;

    data = _.isArray(data) ? data : [data];

    _.each(data, function(datum) {
      var id, tokens;

      that.datums[id = that.identify(datum)] = datum;
      tokens = normalizeTokens(that.datumTokenizer(datum));

      _.each(tokens, function(token) {
        var node, chars, ch;

        node = that.trie;
        chars = token.split('');

        while (ch = chars.shift()) {
          node = node[CHILDREN][ch] || (node[CHILDREN][ch] = newNode());
          node[IDS].push(id);
        }
      });
    });
  },

  get: function(ids) {
    var that = this;

    return _.map(ids, function(id) { return that.datums[id]; });
  },

  search: function(query) {
    var that = this, tokens, matches;

    tokens = normalizeTokens(this.queryTokenizer(query));

    _.each(tokens, function(token) {
      var node, chars, ch, ids;

      // previous tokens didn't share any matches
      if (matches && matches.length === 0) {
        return false;
      }

      node = that.trie;
      chars = token.split('');

      while (node && (ch = chars.shift())) {
        node = node[CHILDREN][ch];
      }

      if (node && chars.length === 0) {
        ids = node[IDS].slice(0);
        matches = matches ? getIntersection(matches, ids) : ids;
      }

      // break early if we find out there are no possible matches
      else {
        matches = [];
        return false;
      }
    });

    return matches ?
      _.map(unique(matches), function(id) { return that.datums[id]; }) : [];
  },

  all: function() {
    var values = [];

    for (var key in this.datums) {
      values.push(this.datums[key]);
    }

    return values;
  },

  reset: function() {
    this.datums = {};
    this.trie = newNode();
  },

  serialize: function serialize() {
    return { datums: this.datums, trie: this.trie };
  }
});


function normalizeTokens(tokens) {
 // filter out falsy tokens
  tokens = _.filter(tokens, function(token) { return !!token; });

  // normalize tokens
  tokens = _.map(tokens, function(token) { return token.toLowerCase(); });

  return tokens;
}

function newNode() {
  var node = {};

  node[IDS] = [];
  node[CHILDREN] = {};

  return node;
}

function unique(array) {
  var seen = {}, uniques = [];

  for (var i = 0, len = array.length; i < len; i++) {
    if (!seen[array[i]]) {
      seen[array[i]] = true;
      uniques.push(array[i]);
    }
  }

  return uniques;
}

function getIntersection(arrayA, arrayB) {
  var ai = 0, bi = 0, intersection = [];

  arrayA = arrayA.sort();
  arrayB = arrayB.sort();

  var lenArrayA = arrayA.length, lenArrayB = arrayB.length;

  while (ai < lenArrayA && bi < lenArrayB) {
    if (arrayA[ai] < arrayB[bi]) {
      ai++;
    }

    else if (arrayA[ai] > arrayB[bi]) {
      bi++;
    }

    else {
      intersection.push(arrayA[ai]);
      ai++;
      bi++;
    }
  }

  return intersection;
}

module.exports = SearchIndex;

},{"./utils":13}],11:[function(require,module,exports){
/*
 * typeahead.js
 * https://github.com/twitter/typeahead.js
 * Copyright 2013-2014 Twitter, Inc. and other contributors; Licensed MIT
 */

var _ = require('./utils');

function whitespace(str) {
  str = _.toStr(str);
  return str ? str.split(/\s+/) : [];
}

function nonword(str) {
  str = _.toStr(str);
  return str ? str.split(/\W+/) : [];
}

function getObjTokenizer(tokenizer) {
  return function setKey(keys) {
    keys = _.isArray(keys) ? keys : [].slice.call(arguments, 0);

    return function tokenize(o) {
      var tokens = [];

      _.each(keys, function(k) {
        tokens = tokens.concat(tokenizer(_.toStr(o[k])));
      });

      return tokens;
    };
  };
}

module.exports = {
  nonword: nonword,
  whitespace: whitespace,
  obj: {
    nonword: getObjTokenizer(nonword),
    whitespace: getObjTokenizer(whitespace)
  }
};

},{"./utils":13}],12:[function(require,module,exports){
var LruCache = require('./lru_cache');
var _ = require('./utils');

var pendingRequestsCount = 0;
var pendingRequests = {};
var maxPendingRequests = 6;
var sharedCache = new LruCache(10);

function Transport(o) {
  o = o || {};

  this.cancelled = false;
  this.lastReq = null;

  this._send = o.transport;
  this._get = o.limiter ? o.limiter(this._get) : this._get;

  this._cache = o.cache === false ? new LruCache(0) : sharedCache;
}

Transport.setMaxPendingRequests = function setMaxPendingRequests(num) {
  maxPendingRequests = num;
};

Transport.resetCache = function resetCache() {
  sharedCache.reset();
};

_.mixin(Transport.prototype, {

  _fingerprint: function(o) {
    o = o || {};
    return o.url + o.type + JSON.stringify(o.data || {}); 
  },

  _get: function(o, cb) {
    var that = this, fingerprint, jqXhr;

    fingerprint = this._fingerprint(o);

    // #149: don't make a network request if there has been a cancellation
    // or if the url doesn't match the last url Transport#get was invoked with
    if (this.cancelled || fingerprint !== this.lastReq) { return; }

    // a request is already in progress, piggyback off of it
    if (jqXhr = pendingRequests[fingerprint]) {
      // jqXhr.done(done).fail(fail);
      jqXhr.then(done, fail);
    }

    // under the pending request threshold, so fire off a request
    else if (pendingRequestsCount < maxPendingRequests) {
      pendingRequestsCount++;
      pendingRequests[fingerprint] =
        // this._send(o).done(done).fail(fail).always(always);
        this._send(o).then(function(resp) {
          done(resp);
          always();
        }, function() {
          fail();
          always();
        });
    }

    // at the pending request threshold, so hang out in the on deck circle
    else {
      this.onDeckRequestArgs = [].slice.call(arguments, 0);
    }

    function done(resp) {
      cb(null, resp);
      that._cache.set(fingerprint, resp);
    }

    function fail() {
      cb(true);
    }

    function always() {
      pendingRequestsCount--;
      delete pendingRequests[fingerprint];

      // ensures request is always made for the last query
      if (that.onDeckRequestArgs) {
        that._get.apply(that, that.onDeckRequestArgs);
        that.onDeckRequestArgs = null;
      }
    }
  },

  get: function(o, cb) {
    var resp, fingerprint;

    cb = cb || _.noop;
    o = _.isString(o) ? { url: o } : (o || {});

    fingerprint = this._fingerprint(o);

    this.cancelled = false;
    this.lastReq = fingerprint;

    // in-memory cache hit
    if (resp = this._cache.get(fingerprint)) {
      cb(null, resp);
    }

    // go to network
    else {
      this._get(o, cb);
    }
  },

  cancel: function() {
    this.cancelled = true;
  }
});

module.exports = Transport;

},{"./lru_cache":5,"./utils":13}],13:[function(require,module,exports){
/*
 * typeahead.js
 * https://github.com/twitter/typeahead.js
 * Copyright 2013-2014 Twitter, Inc. and other contributors; Licensed MIT
 */

var assign = require('object-assign');

var _ = {
  isMsie: function() {
    // from https://github.com/ded/bowser/blob/master/bowser.js
    return (/(msie|trident)/i).test(navigator.userAgent) ?
      navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2] : false;
  },

  isBlankString: function(str) { return !str || /^\s*$/.test(str); },

  // http://stackoverflow.com/a/6969486
  escapeRegExChars: function(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
  },

  isString: function(obj) { return typeof obj === 'string'; },

  isNumber: function(obj) { return typeof obj === 'number'; },

  isArray: Array.isArray,

  isFunction: function(obj) {
		return typeof obj === 'function';
	},

  isObject: function(obj) {
    return typeof obj === 'object';
  },

  isUndefined: function(obj) { return typeof obj === 'undefined'; },

  isElement: function(obj) { return !!(obj && obj.nodeType === 1); },

  isJQuery: function(obj) { return obj instanceof $; },

  toStr: function toStr(s) {
    return (_.isUndefined(s) || s === null) ? '' : s + '';
  },

  bind: function(fn, context) {
    return fn.bind(context);
  },

  each: function(collection, cb) {
    collection.forEach(cb);
  },

  map: function(array, fn) {
    return array.map(fn);
  },

  filter: function(array, fn) {
    return array.filter(fn);
  },

  every: function(obj, test) {
    var result = true;

    if (!obj) { return result; }

    // $.each(obj, function(key, val) {
    //   if (!(result = test.call(null, val, key, obj))) {
    //     return false;
    //   }
    // });

    for(var key in obj) {
      if(obj.hasOwnProperty(key)) {
        var val = obj[key];
        if (!(result = test.call(null, val, key, obj))) {
          return false;
        }
      }
    }

    return !!result;
  },

  some: function(obj, test) {
    var result = false;

    if (!obj) { return result; }

    // $.each(obj, function(key, val) {
    //   if (result = test.call(null, val, key, obj)) {
    //     return false;
    //   }
    // });

    for(var key in obj) {
      if(obj.hasOwnProperty(key)) {
        var val = obj[key];
        if (result = test.call(null, val, key, obj)) {
          return false;
        }
      }
    }

    return !!result;
  },

  mixin: require('object-assign'),

  identity: function(x) { return x; },

  clone: function(obj) { return assign({}, obj); },

  getIdGenerator: function() {
    var counter = 0;
    return function() { return counter++; };
  },

  templatify: function templatify(obj) {
    return _.isFunction(obj) ? obj : template;

    function template() { return String(obj); }
  },

  defer: function(fn) { setTimeout(fn, 0); },

  debounce: function(func, wait, immediate) {
    var timeout, result;

    return function() {
      var context = this, args = arguments, later, callNow;

      later = function() {
        timeout = null;
        if (!immediate) { result = func.apply(context, args); }
      };

      callNow = immediate && !timeout;

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);

      if (callNow) { result = func.apply(context, args); }

      return result;
    };
  },

  throttle: function(func, wait) {
    var context, args, timeout, result, previous, later;

    previous = 0;
    later = function() {
      previous = new Date();
      timeout = null;
      result = func.apply(context, args);
    };

    return function() {
      var now = new Date(),
          remaining = wait - (now - previous);

      context = this;
      args = arguments;

      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      }

      else if (!timeout) {
        timeout = setTimeout(later, remaining);
      }

      return result;
    };
  },

  stringify: function(val) {
    return _.isString(val) ? val : JSON.stringify(val);
  },

  noop: function() {},

  error: function(msg) {
    throw new Error(msg);
  }
};

module.exports = _;

},{"object-assign":20}],14:[function(require,module,exports){
/*
 * typeahead.js
 * https://github.com/twitter/typeahead.js
 * Copyright 2013-2014 Twitter, Inc. and other contributors; Licensed MIT
 */

module.exports = '1.0.0';

},{}],15:[function(require,module,exports){
/* =============================================================
 * bootstrap3-typeahead.js v4.0.2
 * https://github.com/bassjobsen/Bootstrap-3-Typeahead
 * =============================================================
 * Original written by @mdo and @fat
 * =============================================================
 * Copyright 2014 Bass Jobsen @bassjobsen
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


(function (root, factory) {

  'use strict';

  // CommonJS module is defined
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory(require('jquery'));
  }
  // AMD module is defined
  else if (typeof define === 'function' && define.amd) {
    define(['jquery'], function ($) {
      return factory ($);
    });
  } else {
    factory(root.jQuery);
  }

}(this, function ($) {

  'use strict';
  // jshint laxcomma: true


 /* TYPEAHEAD PUBLIC CLASS DEFINITION
  * ================================= */

  var Typeahead = function (element, options) {
    this.$element = $(element);
    this.options = $.extend({}, $.fn.typeahead.defaults, options);
    this.matcher = this.options.matcher || this.matcher;
    this.sorter = this.options.sorter || this.sorter;
    this.select = this.options.select || this.select;
    this.autoSelect = typeof this.options.autoSelect == 'boolean' ? this.options.autoSelect : true;
    this.highlighter = this.options.highlighter || this.highlighter;
    this.render = this.options.render || this.render;
    this.updater = this.options.updater || this.updater;
    this.displayText = this.options.displayText || this.displayText;
    this.source = this.options.source;
    this.delay = this.options.delay;
    this.$menu = $(this.options.menu);
    this.$appendTo = this.options.appendTo ? $(this.options.appendTo) : null;
    this.fitToElement = typeof this.options.fitToElement == 'boolean' ? this.options.fitToElement : false;
    this.shown = false;
    this.listen();
    this.showHintOnFocus = typeof this.options.showHintOnFocus == 'boolean' || this.options.showHintOnFocus === "all" ? this.options.showHintOnFocus : false;
    this.afterSelect = this.options.afterSelect;
    this.addItem = false;
    this.value = this.$element.val() || this.$element.text();
  };

  Typeahead.prototype = {

    constructor: Typeahead,

    select: function () {
      var val = this.$menu.find('.active').data('value');
      this.$element.data('active', val);
      if (this.autoSelect || val) {
        var newVal = this.updater(val);
        // Updater can be set to any random functions via "options" parameter in constructor above.
        // Add null check for cases when updater returns void or undefined.
        if (!newVal) {
          newVal = '';
        }
        this.$element
          .val(this.displayText(newVal) || newVal)
          .text(this.displayText(newVal) || newVal)
          .change();
        this.afterSelect(newVal);
      }
      return this.hide();
    },

    updater: function (item) {
      return item;
    },

    setSource: function (source) {
      this.source = source;
    },

    show: function () {
      var pos = $.extend({}, this.$element.position(), {
        height: this.$element[0].offsetHeight
      });

      var scrollHeight = typeof this.options.scrollHeight == 'function' ?
          this.options.scrollHeight.call() :
          this.options.scrollHeight;

      var element;
      if (this.shown) {
        element = this.$menu;
      } else if (this.$appendTo) {
        element = this.$menu.appendTo(this.$appendTo);
        this.hasSameParent = this.$appendTo.is(this.$element.parent());
      } else {
        element = this.$menu.insertAfter(this.$element);
        this.hasSameParent = true;
      }      
      
      if (!this.hasSameParent) {
          // We cannot rely on the element position, need to position relative to the window
          element.css("position", "fixed");
          var offset = this.$element.offset();
          pos.top =  offset.top;
          pos.left = offset.left;
      }
      // The rules for bootstrap are: 'dropup' in the parent and 'dropdown-menu-right' in the element.
      // Note that to get right alignment, you'll need to specify `menu` in the options to be:
      // '<ul class="typeahead dropdown-menu" role="listbox"></ul>'
      var dropup = $(element).parent().hasClass('dropup');
      var newTop = dropup ? 'auto' : (pos.top + pos.height + scrollHeight);
      var right = $(element).hasClass('dropdown-menu-right');
      var newLeft = right ? 'auto' : pos.left;
      // it seems like setting the css is a bad idea (just let Bootstrap do it), but I'll keep the old
      // logic in place except for the dropup/right-align cases.
      element.css({ top: newTop, left: newLeft }).show();

      if (this.options.fitToElement === true) {
          element.css("width", this.$element.outerWidth() + "px");
      }
    
      this.shown = true;
      return this;
    },

    hide: function () {
      this.$menu.hide();
      this.shown = false;
      return this;
    },

    lookup: function (query) {
      var items;
      if (typeof(query) != 'undefined' && query !== null) {
        this.query = query;
      } else {
        this.query = this.$element.val() || this.$element.text() || '';
      }

      if (this.query.length < this.options.minLength && !this.options.showHintOnFocus) {
        return this.shown ? this.hide() : this;
      }

      var worker = $.proxy(function () {

        if ($.isFunction(this.source)) {
          this.source(this.query, $.proxy(this.process, this));
        } else if (this.source) {
          this.process(this.source);
        }
      }, this);

      clearTimeout(this.lookupWorker);
      this.lookupWorker = setTimeout(worker, this.delay);
    },

    process: function (items) {
      var that = this;

      items = $.grep(items, function (item) {
        return that.matcher(item);
      });

      items = this.sorter(items);

      if (!items.length && !this.options.addItem) {
        return this.shown ? this.hide() : this;
      }

      if (items.length > 0) {
        this.$element.data('active', items[0]);
      } else {
        this.$element.data('active', null);
      }

      // Add item
      if (this.options.addItem){
        items.push(this.options.addItem);
      }

      if (this.options.items == 'all') {
        return this.render(items).show();
      } else {
        return this.render(items.slice(0, this.options.items)).show();
      }
    },

    matcher: function (item) {
      var it = this.displayText(item);
      return ~it.toLowerCase().indexOf(this.query.toLowerCase());
    },

    sorter: function (items) {
      var beginswith = [];
      var caseSensitive = [];
      var caseInsensitive = [];
      var item;

      while ((item = items.shift())) {
        var it = this.displayText(item);
        if (!it.toLowerCase().indexOf(this.query.toLowerCase())) beginswith.push(item);
        else if (~it.indexOf(this.query)) caseSensitive.push(item);
        else caseInsensitive.push(item);
      }

      return beginswith.concat(caseSensitive, caseInsensitive);
    },

    highlighter: function (item) {
      var html = $('<div></div>');
      var query = this.query;
      var i = item.toLowerCase().indexOf(query.toLowerCase());
      var len = query.length;
      var leftPart;
      var middlePart;
      var rightPart;
      var strong;
      if (len === 0) {
        return html.text(item).html();
      }
      while (i > -1) {
        leftPart = item.substr(0, i);
        middlePart = item.substr(i, len);
        rightPart = item.substr(i + len);
        strong = $('<strong></strong>').text(middlePart);
        html
          .append(document.createTextNode(leftPart))
          .append(strong);
        item = rightPart;
        i = item.toLowerCase().indexOf(query.toLowerCase());
      }
      return html.append(document.createTextNode(item)).html();
    },

    render: function (items) {
      var that = this;
      var self = this;
      var activeFound = false;
      var data = [];
      var _category = that.options.separator;

      $.each(items, function (key,value) {
        // inject separator
        if (key > 0 && value[_category] !== items[key - 1][_category]){
          data.push({
            __type: 'divider'
          });
        }

        // inject category header
        if (value[_category] && (key === 0 || value[_category] !== items[key - 1][_category])){
          data.push({
            __type: 'category',
            name: value[_category]
          });
        }
        data.push(value);
      });

      items = $(data).map(function (i, item) {
        if ((item.__type || false) == 'category'){
          return $(that.options.headerHtml).text(item.name)[0];
        }

        if ((item.__type || false) == 'divider'){
          return $(that.options.headerDivider)[0];
        }

        var text = self.displayText(item);
        i = $(that.options.item).data('value', item);
        i.find('a').html(that.highlighter(text, item));
        if (text == self.$element.val()) {
          i.addClass('active');
          self.$element.data('active', item);
          activeFound = true;
        }
        return i[0];
      });

      if (this.autoSelect && !activeFound) {
        items.filter(':not(.dropdown-header)').first().addClass('active');
        this.$element.data('active', items.first().data('value'));
      }
      this.$menu.html(items);
      return this;
    },

    displayText: function (item) {
      return typeof item !== 'undefined' && typeof item.name != 'undefined' && item.name || item;
    },

    next: function (event) {
      var active = this.$menu.find('.active').removeClass('active');
      var next = active.next();

      if (!next.length) {
        next = $(this.$menu.find('li')[0]);
      }

      next.addClass('active');
    },

    prev: function (event) {
      var active = this.$menu.find('.active').removeClass('active');
      var prev = active.prev();

      if (!prev.length) {
        prev = this.$menu.find('li').last();
      }

      prev.addClass('active');
    },

    listen: function () {
      this.$element
        .on('focus',    $.proxy(this.focus, this))
        .on('blur',     $.proxy(this.blur, this))
        .on('keypress', $.proxy(this.keypress, this))
        .on('input',    $.proxy(this.input, this))
        .on('keyup',    $.proxy(this.keyup, this));

      if (this.eventSupported('keydown')) {
        this.$element.on('keydown', $.proxy(this.keydown, this));
      }

      this.$menu
        .on('click', $.proxy(this.click, this))
        .on('mouseenter', 'li', $.proxy(this.mouseenter, this))
        .on('mouseleave', 'li', $.proxy(this.mouseleave, this))
        .on('mousedown', $.proxy(this.mousedown,this));
    },

    destroy : function () {
      this.$element.data('typeahead',null);
      this.$element.data('active',null);
      this.$element
        .off('focus')
        .off('blur')
        .off('keypress')
        .off('input')
        .off('keyup');

      if (this.eventSupported('keydown')) {
        this.$element.off('keydown');
      }

      this.$menu.remove();
      this.destroyed = true;
    },

    eventSupported: function (eventName) {
      var isSupported = eventName in this.$element;
      if (!isSupported) {
        this.$element.setAttribute(eventName, 'return;');
        isSupported = typeof this.$element[eventName] === 'function';
      }
      return isSupported;
    },

    move: function (e) {
      if (!this.shown) return;

      switch (e.keyCode) {
        case 9: // tab
        case 13: // enter
        case 27: // escape
          e.preventDefault();
          break;

        case 38: // up arrow
          // with the shiftKey (this is actually the left parenthesis)
          if (e.shiftKey) return;
          e.preventDefault();
          this.prev();
          break;

        case 40: // down arrow
          // with the shiftKey (this is actually the right parenthesis)
          if (e.shiftKey) return;
          e.preventDefault();
          this.next();
          break;
      }
    },

    keydown: function (e) {
      this.suppressKeyPressRepeat = ~$.inArray(e.keyCode, [40,38,9,13,27]);
      if (!this.shown && e.keyCode == 40) {
        this.lookup();
      } else {
        this.move(e);
      }
    },

    keypress: function (e) {
      if (this.suppressKeyPressRepeat) return;
      this.move(e);
    },

    input: function (e) {
      // This is a fixed for IE10/11 that fires the input event when a placehoder is changed
      // (https://connect.microsoft.com/IE/feedback/details/810538/ie-11-fires-input-event-on-focus)
      var currentValue = this.$element.val() || this.$element.text();
      if (this.value !== currentValue) {
        this.value = currentValue;
        this.lookup();
      }
    },

    keyup: function (e) {
      if (this.destroyed) {
        return;
      }
      switch (e.keyCode) {
        case 40: // down arrow
        case 38: // up arrow
        case 16: // shift
        case 17: // ctrl
        case 18: // alt
          break;

        case 9: // tab
        case 13: // enter
          if (!this.shown) return;
          this.select();
          break;

        case 27: // escape
          if (!this.shown) return;
          this.hide();
          break;
      }


    },

    focus: function (e) {
      if (!this.focused) {
        this.focused = true;
        if (this.options.showHintOnFocus && this.skipShowHintOnFocus !== true) {
          if(this.options.showHintOnFocus === "all") {
            this.lookup(""); 
          } else {
            this.lookup();
          }
        }
      }
      if (this.skipShowHintOnFocus) {
        this.skipShowHintOnFocus = false;
      }
    },

    blur: function (e) {
      if (!this.mousedover && !this.mouseddown && this.shown) {
        this.hide();
        this.focused = false;
      } else if (this.mouseddown) {
        // This is for IE that blurs the input when user clicks on scroll.
        // We set the focus back on the input and prevent the lookup to occur again
        this.skipShowHintOnFocus = true;
        this.$element.focus();
        this.mouseddown = false;
      } 
    },

    click: function (e) {
      e.preventDefault();
      this.skipShowHintOnFocus = true;
      this.select();
      this.$element.focus();
      this.hide();
    },

    mouseenter: function (e) {
      this.mousedover = true;
      this.$menu.find('.active').removeClass('active');
      $(e.currentTarget).addClass('active');
    },

    mouseleave: function (e) {
      this.mousedover = false;
      if (!this.focused && this.shown) this.hide();
    },

   /**
     * We track the mousedown for IE. When clicking on the menu scrollbar, IE makes the input blur thus hiding the menu.
     */
    mousedown: function (e) {
      this.mouseddown = true;
      this.$menu.one("mouseup", function(e){
        // IE won't fire this, but FF and Chrome will so we reset our flag for them here
        this.mouseddown = false;
      }.bind(this));
    },

  };


  /* TYPEAHEAD PLUGIN DEFINITION
   * =========================== */

  var old = $.fn.typeahead;

  $.fn.typeahead = function (option) {
    var arg = arguments;
    if (typeof option == 'string' && option == 'getActive') {
      return this.data('active');
    }
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('typeahead');
      var options = typeof option == 'object' && option;
      if (!data) $this.data('typeahead', (data = new Typeahead(this, options)));
      if (typeof option == 'string' && data[option]) {
        if (arg.length > 1) {
          data[option].apply(data, Array.prototype.slice.call(arg, 1));
        } else {
          data[option]();
        }
      }
    });
  };

  $.fn.typeahead.defaults = {
    source: [],
    items: 8,
    menu: '<ul class="typeahead dropdown-menu" role="listbox"></ul>',
    item: '<li><a class="dropdown-item" href="#" role="option"></a></li>',
    minLength: 1,
    scrollHeight: 0,
    autoSelect: true,
    afterSelect: $.noop,
    addItem: false,
    delay: 0,
    separator: 'category',
    headerHtml: '<li class="dropdown-header"></li>',
    headerDivider: '<li class="divider" role="separator"></li>'
  };

  $.fn.typeahead.Constructor = Typeahead;

 /* TYPEAHEAD NO CONFLICT
  * =================== */

  $.fn.typeahead.noConflict = function () {
    $.fn.typeahead = old;
    return this;
  };


 /* TYPEAHEAD DATA-API
  * ================== */

  $(document).on('focus.typeahead.data-api', '[data-provide="typeahead"]', function (e) {
    var $this = $(this);
    if ($this.data('typeahead')) return;
    $this.typeahead($this.data());
  });

}));

},{"jquery":19}],16:[function(require,module,exports){
(function (process,global){
/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   3.3.1
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.ES6Promise = factory());
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  return typeof x === 'function' || typeof x === 'object' && x !== null;
}

function isFunction(x) {
  return typeof x === 'function';
}

var _isArray = undefined;
if (!Array.isArray) {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
} else {
  _isArray = Array.isArray;
}

var isArray = _isArray;

var len = 0;
var vertxNext = undefined;
var customSchedulerFn = undefined;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  return function () {
    vertxNext(flush);
  };
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var r = require;
    var vertx = r('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = undefined;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && typeof require === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var _arguments = arguments;

  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;

  if (_state) {
    (function () {
      var callback = _arguments[_state - 1];
      asap(function () {
        return invokeCallback(_state, child, callback, parent._result);
      });
    })();
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  _resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(16);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var GET_THEN_ERROR = new ErrorObject();

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    GET_THEN_ERROR.error = error;
    return GET_THEN_ERROR;
  }
}

function tryThen(then, value, fulfillmentHandler, rejectionHandler) {
  try {
    then.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        _resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      _reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      _reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    _reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return _resolve(promise, value);
    }, function (reason) {
      return _reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$) {
  if (maybeThenable.constructor === promise.constructor && then$$ === then && maybeThenable.constructor.resolve === resolve) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$ === GET_THEN_ERROR) {
      _reject(promise, GET_THEN_ERROR.error);
    } else if (then$$ === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$)) {
      handleForeignThenable(promise, maybeThenable, then$$);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function _resolve(promise, value) {
  if (promise === value) {
    _reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function _reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;

  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = undefined,
      callback = undefined,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function ErrorObject() {
  this.error = null;
}

var TRY_CATCH_ERROR = new ErrorObject();

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = undefined,
      error = undefined,
      succeeded = undefined,
      failed = undefined;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      _reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
      _resolve(promise, value);
    } else if (failed) {
      _reject(promise, error);
    } else if (settled === FULFILLED) {
      fulfill(promise, value);
    } else if (settled === REJECTED) {
      _reject(promise, value);
    }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      _resolve(promise, value);
    }, function rejectPromise(reason) {
      _reject(promise, reason);
    });
  } catch (e) {
    _reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function Enumerator(Constructor, input) {
  this._instanceConstructor = Constructor;
  this.promise = new Constructor(noop);

  if (!this.promise[PROMISE_ID]) {
    makePromise(this.promise);
  }

  if (isArray(input)) {
    this._input = input;
    this.length = input.length;
    this._remaining = input.length;

    this._result = new Array(this.length);

    if (this.length === 0) {
      fulfill(this.promise, this._result);
    } else {
      this.length = this.length || 0;
      this._enumerate();
      if (this._remaining === 0) {
        fulfill(this.promise, this._result);
      }
    }
  } else {
    _reject(this.promise, validationError());
  }
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
};

Enumerator.prototype._enumerate = function () {
  var length = this.length;
  var _input = this._input;

  for (var i = 0; this._state === PENDING && i < length; i++) {
    this._eachEntry(_input[i], i);
  }
};

Enumerator.prototype._eachEntry = function (entry, i) {
  var c = this._instanceConstructor;
  var resolve$$ = c.resolve;

  if (resolve$$ === resolve) {
    var _then = getThen(entry);

    if (_then === then && entry._state !== PENDING) {
      this._settledAt(entry._state, i, entry._result);
    } else if (typeof _then !== 'function') {
      this._remaining--;
      this._result[i] = entry;
    } else if (c === Promise) {
      var promise = new c(noop);
      handleMaybeThenable(promise, entry, _then);
      this._willSettleAt(promise, i);
    } else {
      this._willSettleAt(new c(function (resolve$$) {
        return resolve$$(entry);
      }), i);
    }
  } else {
    this._willSettleAt(resolve$$(entry), i);
  }
};

Enumerator.prototype._settledAt = function (state, i, value) {
  var promise = this.promise;

  if (promise._state === PENDING) {
    this._remaining--;

    if (state === REJECTED) {
      _reject(promise, value);
    } else {
      this._result[i] = value;
    }
  }

  if (this._remaining === 0) {
    fulfill(promise, this._result);
  }
};

Enumerator.prototype._willSettleAt = function (promise, i) {
  var enumerator = this;

  subscribe(promise, undefined, function (value) {
    return enumerator._settledAt(FULFILLED, i, value);
  }, function (reason) {
    return enumerator._settledAt(REJECTED, i, reason);
  });
};

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  _reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {function} resolver
  Useful for tooling.
  @constructor
*/
function Promise(resolver) {
  this[PROMISE_ID] = nextId();
  this._result = this._state = undefined;
  this._subscribers = [];

  if (noop !== resolver) {
    typeof resolver !== 'function' && needsResolver();
    this instanceof Promise ? initializePromise(this, resolver) : needsNew();
  }
}

Promise.all = all;
Promise.race = race;
Promise.resolve = resolve;
Promise.reject = reject;
Promise._setScheduler = setScheduler;
Promise._setAsap = setAsap;
Promise._asap = asap;

Promise.prototype = {
  constructor: Promise,

  /**
    The primary way of interacting with a promise is through its `then` method,
    which registers callbacks to receive either a promise's eventual value or the
    reason why the promise cannot be fulfilled.
  
    ```js
    findUser().then(function(user){
      // user is available
    }, function(reason){
      // user is unavailable, and you are given the reason why
    });
    ```
  
    Chaining
    --------
  
    The return value of `then` is itself a promise.  This second, 'downstream'
    promise is resolved with the return value of the first promise's fulfillment
    or rejection handler, or rejected if the handler throws an exception.
  
    ```js
    findUser().then(function (user) {
      return user.name;
    }, function (reason) {
      return 'default name';
    }).then(function (userName) {
      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
      // will be `'default name'`
    });
  
    findUser().then(function (user) {
      throw new Error('Found user, but still unhappy');
    }, function (reason) {
      throw new Error('`findUser` rejected and we're unhappy');
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
      // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
    });
    ```
    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
  
    ```js
    findUser().then(function (user) {
      throw new PedagogicalException('Upstream error');
    }).then(function (value) {
      // never reached
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // The `PedgagocialException` is propagated all the way down to here
    });
    ```
  
    Assimilation
    ------------
  
    Sometimes the value you want to propagate to a downstream promise can only be
    retrieved asynchronously. This can be achieved by returning a promise in the
    fulfillment or rejection handler. The downstream promise will then be pending
    until the returned promise is settled. This is called *assimilation*.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // The user's comments are now available
    });
    ```
  
    If the assimliated promise rejects, then the downstream promise will also reject.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // If `findCommentsByAuthor` fulfills, we'll have the value here
    }, function (reason) {
      // If `findCommentsByAuthor` rejects, we'll have the reason here
    });
    ```
  
    Simple Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let result;
  
    try {
      result = findResult();
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
    findResult(function(result, err){
      if (err) {
        // failure
      } else {
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findResult().then(function(result){
      // success
    }, function(reason){
      // failure
    });
    ```
  
    Advanced Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let author, books;
  
    try {
      author = findAuthor();
      books  = findBooksByAuthor(author);
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
  
    function foundBooks(books) {
  
    }
  
    function failure(reason) {
  
    }
  
    findAuthor(function(author, err){
      if (err) {
        failure(err);
        // failure
      } else {
        try {
          findBoooksByAuthor(author, function(books, err) {
            if (err) {
              failure(err);
            } else {
              try {
                foundBooks(books);
              } catch(reason) {
                failure(reason);
              }
            }
          });
        } catch(error) {
          failure(err);
        }
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findAuthor().
      then(findBooksByAuthor).
      then(function(books){
        // found books
    }).catch(function(reason){
      // something went wrong
    });
    ```
  
    @method then
    @param {Function} onFulfilled
    @param {Function} onRejected
    Useful for tooling.
    @return {Promise}
  */
  then: then,

  /**
    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
    as the catch block of a try/catch statement.
  
    ```js
    function findAuthor(){
      throw new Error('couldn't find that author');
    }
  
    // synchronous
    try {
      findAuthor();
    } catch(reason) {
      // something went wrong
    }
  
    // async with promises
    findAuthor().catch(function(reason){
      // something went wrong
    });
    ```
  
    @method catch
    @param {Function} onRejection
    Useful for tooling.
    @return {Promise}
  */
  'catch': function _catch(onRejection) {
    return this.then(null, onRejection);
  }
};

function polyfill() {
    var local = undefined;

    if (typeof global !== 'undefined') {
        local = global;
    } else if (typeof self !== 'undefined') {
        local = self;
    } else {
        try {
            local = Function('return this')();
        } catch (e) {
            throw new Error('polyfill failed because global object is unavailable in this environment');
        }
    }

    var P = local.Promise;

    if (P) {
        var promiseToString = null;
        try {
            promiseToString = Object.prototype.toString.call(P.resolve());
        } catch (e) {
            // silently ignored
        }

        if (promiseToString === '[object Promise]' && !P.cast) {
            return;
        }
    }

    local.Promise = Promise;
}

polyfill();
// Strange compat..
Promise.polyfill = polyfill;
Promise.Promise = Promise;

return Promise;

})));
//# sourceMappingURL=es6-promise.map
}).call(this,require("7YKIPe"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"7YKIPe":17}],17:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],18:[function(require,module,exports){
(function(factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    factory(require('jquery'));
  } else if (typeof define === 'function' && define.amd) {
      // AMD. Register as an anonymous module.
        define([], factory(window.jQuery));
    } else {
    factory(window.jQuery);
  }
}(function($) {
  'use strict';

  var $doc = $(document);
  var $win = $(window);

  var pluginName = 'selectric';
  var classList = 'Input Items Open Disabled TempShow HideSelect Wrapper Focus Hover Responsive Above Scroll Group GroupLabel';
  var bindSufix = '.sl';

  var chars = ['a', 'e', 'i', 'o', 'u', 'n', 'c', 'y'];
  var diacritics = [
    /[\xE0-\xE5]/g, // a
    /[\xE8-\xEB]/g, // e
    /[\xEC-\xEF]/g, // i
    /[\xF2-\xF6]/g, // o
    /[\xF9-\xFC]/g, // u
    /[\xF1]/g,      // n
    /[\xE7]/g,      // c
    /[\xFD-\xFF]/g  // y
  ];

  /**
   * Create an instance of Selectric
   *
   * @constructor
   * @param {Node} element - The &lt;select&gt; element
   * @param {object}  opts - Options
   */
  var Selectric = function(element, opts) {
    var _this = this;

    _this.element = element;
    _this.$element = $(element);

    _this.state = {
      enabled     : false,
      opened      : false,
      currValue   : -1,
      selectedIdx : -1
    };

    _this.eventTriggers = {
      open    : _this.open,
      close   : _this.close,
      destroy : _this.destroy,
      refresh : _this.refresh,
      init    : _this.init
    };

    _this.init(opts);
  };

  Selectric.prototype = {
    utils: {
      /**
       * Detect mobile browser
       *
       * @return {boolean}
       */
      isMobile: function() {
        return /android|ip(hone|od|ad)/i.test(navigator.userAgent);
      },

      /**
       * Escape especial characters in string (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
       *
       * @param  {string} str - The string to be escaped
       * @return {string}       The string with the special characters escaped
       */
      escapeRegExp: function(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
      },

      /**
       * Replace diacritics
       *
       * @param  {string} str - The string to replace the diacritics
       * @return {string}       The string with diacritics replaced with ascii characters
       */
      replaceDiacritics: function(str) {
        var k = diacritics.length;

        while (k--) {
          str = str.toLowerCase().replace(diacritics[k], chars[k]);
        }

        return str;
      },

      /**
       * Format string
       * https://gist.github.com/atesgoral/984375
       *
       * @param  {string} f - String to be formated
       * @return {string}     String formated
       */
      format: function (f) {
        var a = arguments; // store outer arguments
        return ('' + f) // force format specifier to String
          .replace( // replace tokens in format specifier
            /\{(?:(\d+)|(\w+))\}/g, // match {token} references
            function (
              s, // the matched string (ignored)
              i, // an argument index
              p // a property name
            ) {
              return p && a[1] // if property name and first argument exist
                ? a[1][p] // return property from first argument
                : a[i]; // assume argument index and return i-th argument
            });
      },

      /**
       * Get the next enabled item in the options list.
       *
       * @param  {object} selectItems - The options object.
       * @param  {number}    selected - Index of the currently selected option.
       * @return {object}               The next enabled item.
       */
      nextEnabledItem: function(selectItems, selected) {
        while ( selectItems[ selected = (selected + 1) % selectItems.length ].disabled ) {
          // empty
        }
        return selected;
      },

      /**
       * Get the previous enabled item in the options list.
       *
       * @param  {object} selectItems - The options object.
       * @param  {number}    selected - Index of the currently selected option.
       * @return {object}               The previous enabled item.
       */
      previousEnabledItem: function(selectItems, selected) {
        while ( selectItems[ selected = (selected > 0 ? selected : selectItems.length) - 1 ].disabled ) {
          // empty
        }
        return selected;
      },

      /**
       * Transform camelCase string to dash-case.
       *
       * @param  {string} str - The camelCased string.
       * @return {string}       The string transformed to dash-case.
       */
      toDash: function(str) {
        return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      },

      /**
       * Calls the events and hooks registered with function name.
       *
       * @param {string}    fn - The name of the function.
       * @param {number} scope - Scope that should be set on the function.
       */
      triggerCallback: function(fn, scope) {
        var elm = scope.element;
        var func = scope.options['on' + fn];

        if ( $.isFunction(func) ) {
          func.call(elm, elm, scope);
        }

        if ( $.fn[pluginName].hooks[fn] ) {
          $.each($.fn[pluginName].hooks[fn], function() {
            this.call(elm, elm, scope);
          });
        }

        $(elm).trigger(pluginName + '-' + this.toDash(fn), scope);
      }
    },

    /** Initializes */
    init: function(opts) {
      var _this = this;

      // Set options
      _this.options = $.extend(true, {}, $.fn[pluginName].defaults, _this.options, opts);

      _this.utils.triggerCallback('BeforeInit', _this);

      // Preserve data
      _this.destroy(true);

      // Disable on mobile browsers
      if ( _this.options.disableOnMobile && _this.utils.isMobile() ) {
        _this.disableOnMobile = true;
        return;
      }

      // Get classes
      _this.classes = _this.getClassNames();

      // Create elements
      var input        = $('<input/>', { 'class': _this.classes.input, 'readonly': _this.utils.isMobile() });
      var items        = $('<div/>',   { 'class': _this.classes.items, 'tabindex': -1 });
      var itemsScroll  = $('<div/>',   { 'class': _this.classes.scroll });
      var wrapper      = $('<div/>',   { 'class': _this.classes.prefix, 'html': _this.options.arrowButtonMarkup });
      var label        = $('<span/>',  { 'class': 'label' });
      var outerWrapper = _this.$element.wrap('<div/>').parent().append(wrapper.prepend(label), items, input);

      _this.elements = {
        input        : input,
        items        : items,
        itemsScroll  : itemsScroll,
        wrapper      : wrapper,
        label        : label,
        outerWrapper : outerWrapper
      };

      _this.$element
        .on(_this.eventTriggers)
        .wrap('<div class="' + _this.classes.hideselect + '"/>');

      _this.originalTabindex = _this.$element.prop('tabindex');
      _this.$element.prop('tabindex', false);

      _this.populate();
      _this.activate();

      _this.utils.triggerCallback('Init', _this);
    },

    /** Activates the plugin */
    activate: function() {
      var _this = this;
      var originalWidth = _this.$element.width();

      _this.utils.triggerCallback('BeforeActivate', _this);

      _this.elements.outerWrapper.prop('class', [
        _this.classes.wrapper,
        _this.$element.prop('class').replace(/\S+/g, _this.classes.prefix + '-$&'),
        _this.options.responsive ? _this.classes.responsive : ''
      ].join(' '));

      if ( _this.options.inheritOriginalWidth && originalWidth > 0 ) {
        _this.elements.outerWrapper.width(originalWidth);
      }

      if ( !_this.$element.prop('disabled') ) {
        _this.state.enabled = true;

        // Not disabled, so... Removing disabled class
        _this.elements.outerWrapper.removeClass(_this.classes.disabled);

        // Remove styles from items box
        // Fix incorrect height when refreshed is triggered with fewer options
        _this.$li = _this.elements.items.removeAttr('style').find('li');

        _this.bindEvents();
      } else {
        _this.elements.outerWrapper.addClass(_this.classes.disabled);
        _this.elements.input.prop('disabled', true);
      }

      _this.utils.triggerCallback('Activate', _this);
    },

    /**
     * Generate classNames for elements
     *
     * @return {object} Classes object
     */
    getClassNames: function() {
      var _this = this;
      var customClass = _this.options.customClass;
      var classesObj  = {};

      $.each(classList.split(' '), function(i, currClass) {
        var c = customClass.prefix + currClass;
        classesObj[currClass.toLowerCase()] = customClass.camelCase ? c : _this.utils.toDash(c);
      });

      classesObj.prefix = customClass.prefix;

      return classesObj;
    },

    /** Set the label text */
    setLabel: function() {
      var _this = this;
      var labelBuilder = _this.options.labelBuilder;
      var currItem = _this.lookupItems[_this.state.currValue];

      _this.elements.label.html(
        $.isFunction(labelBuilder)
          ? labelBuilder(currItem)
          : _this.utils.format(labelBuilder, currItem)
      );
    },

    /** Get and save the available options */
    populate: function() {
      var _this = this;
      var $options = _this.$element.children();
      var $justOptions = _this.$element.find('option');
      var selectedIndex = $justOptions.index($justOptions.filter(':selected'));
      var currIndex = 0;

      _this.state.currValue = (_this.state.selected = ~selectedIndex ? selectedIndex : 0);
      _this.state.selectedIdx = _this.state.currValue;
      _this.items = [];
      _this.lookupItems = [];

      if ( $options.length ) {
        // Build options markup
        $options.each(function(i) {
          var $elm = $(this);

          if ( $elm.is('optgroup') ) {

            var optionsGroup = {
              element       : $elm,
              label         : $elm.prop('label'),
              groupDisabled : $elm.prop('disabled'),
              items         : []
            };

            $elm.children().each(function(i) {
              var $elm = $(this);
              var optionText = $elm.html();

              optionsGroup.items[i] = {
                index    : currIndex,
                element  : $elm,
                value    : $elm.val(),
                text     : optionText,
                slug     : _this.utils.replaceDiacritics(optionText),
                disabled : optionsGroup.groupDisabled
              };

              _this.lookupItems[currIndex] = optionsGroup.items[i];

              currIndex++;
            });

            _this.items[i] = optionsGroup;

          } else {

            var optionText = $elm.html();

            _this.items[i] = {
              index    : currIndex,
              element  : $elm,
              value    : $elm.val(),
              text     : optionText,
              slug     : _this.utils.replaceDiacritics(optionText),
              disabled : $elm.prop('disabled')
            };

            _this.lookupItems[currIndex] = _this.items[i];

            currIndex++;

          }
        });

        _this.setLabel();
        _this.elements.items.append( _this.elements.itemsScroll.html( _this.getItemsMarkup(_this.items) ) );
      }
    },

    /**
     * Generate options markup
     *
     * @param  {object} items - Object containing all available options
     * @return {string}         HTML for the options box
     */
    getItemsMarkup: function(items) {
      var _this = this;
      var markup = '<ul>';

      $.each(items, function(i, elm) {
        if ( elm.label !== undefined ) {

          markup += _this.utils.format('<ul class="{1}"><li class="{2}">{3}</li>',
            $.trim([_this.classes.group, elm.groupDisabled ? 'disabled' : '', elm.element.prop('class')].join(' ')),
            _this.classes.grouplabel,
            elm.element.prop('label')
          );

          $.each(elm.items, function(i, elm) {
            markup += _this.getItemMarkup(elm.index, elm);
          });

          markup += '</ul>';

        } else {

          markup += _this.getItemMarkup(elm.index, elm);

        }
      });

      return markup + '</ul>';
    },

    /**
     * Generate every option markup
     *
     * @param  {number} i   - Index of current item
     * @param  {object} elm - Current item
     * @return {string}       HTML for the option
     */
    getItemMarkup: function(i, elm) {
      var _this = this;
      var itemBuilder = _this.options.optionsItemBuilder;

      return _this.utils.format('<li data-index="{1}" class="{2}">{3}</li>',
        i,
        $.trim([
          i === _this.state.currValue  ? 'selected' : '',
          i === _this.items.length - 1 ? 'last'     : '',
          elm.disabled                 ? 'disabled' : ''
        ].join(' ')),
        $.isFunction(itemBuilder) ? itemBuilder(elm, elm.element, i) : _this.utils.format(itemBuilder, elm)
      );
    },

    /** Bind events on the elements */
    bindEvents: function() {
      var _this = this;

      _this.elements.wrapper
        .add(_this.$element)
        .add(_this.elements.outerWrapper)
        .add(_this.elements.input)
        .off(bindSufix);

      _this.elements.outerWrapper.on('mouseenter' + bindSufix + ' mouseleave' + bindSufix, function(e) {
        $(this).toggleClass(_this.classes.hover, e.type === 'mouseenter');

        // Delay close effect when openOnHover is true
        if ( _this.options.openOnHover ) {
          clearTimeout(_this.closeTimer);

          if ( e.type === 'mouseleave' ) {
            _this.closeTimer = setTimeout($.proxy(_this.close, _this), _this.options.hoverIntentTimeout);
          } else {
            _this.open();
          }
        }
      });

      // Toggle open/close
      _this.elements.wrapper.on('click' + bindSufix, function(e) {
        _this.state.opened ? _this.close() : _this.open(e);
      });

      _this.elements.input
        .prop({ tabindex: _this.originalTabindex, disabled: false })
        .on('keydown' + bindSufix, $.proxy(_this.handleKeys, _this))
        .on('focusin' + bindSufix, function(e) {
          _this.elements.outerWrapper.addClass(_this.classes.focus);

          // Prevent the flicker when focusing out and back again in the browser window
          _this.elements.input.one('blur', function() {
            _this.elements.input.blur();
          });

          if ( _this.options.openOnFocus && !_this.state.opened ) {
            _this.open(e);
          }
        })
        .on('focusout' + bindSufix, function() {
          _this.elements.outerWrapper.removeClass(_this.classes.focus);
        })
        .on('input propertychange', function() {
          var val = _this.elements.input.val();

          // Clear search
          clearTimeout(_this.resetStr);
          _this.resetStr = setTimeout(function() {
            _this.elements.input.val('');
          }, _this.options.keySearchTimeout);

          if ( val.length ) {
            // Search in select options
            $.each(_this.items, function(i, elm) {
              if ( RegExp('^' + _this.utils.escapeRegExp(val), 'i').test(elm.slug) && !elm.disabled ) {
                _this.select(i);
                return false;
              }
            });
          }
        });

      _this.$li.on({
        // Prevent <input> blur on Chrome
        mousedown: function(e) {
          e.preventDefault();
          e.stopPropagation();
        },
        click: function() {
          // The second parameter is to close the box after click
          _this.select($(this).data('index'), true);

          // Chrome doesn't close options box if select is wrapped with a label
          // We need to 'return false' to avoid that
          return false;
        }
      });
    },

    /**
     * Behavior when keyboard keys is pressed
     *
     * @param {object} e - Event object
     */
    handleKeys: function(e) {
      var _this = this;
      var key = e.keyCode || e.which;
      var keys = _this.options.keys;

      var isPrev = $.inArray(key, keys.previous) > -1;
      var isNext = $.inArray(key, keys.next) > -1;
      var isSelect = $.inArray(key, keys.select) > -1;
      var isOpen = $.inArray(key, keys.open) > -1;
      var idx = _this.state.selectedIdx;
      var isFirstOrLastItem = (isPrev && idx === 0) || (isNext && (idx + 1) === _this.items.length);
      var goToItem = 0;

      // Enter / Space
      if ( key === 13 || key === 32 ) {
        e.preventDefault();
      }

      // If it's a directional key
      if ( isPrev || isNext ) {
        if ( !_this.options.allowWrap && isFirstOrLastItem ) {
          return;
        }

        if ( isPrev ) {
          goToItem = _this.utils.previousEnabledItem(_this.items, idx);
        }

        if ( isNext ) {
          goToItem = _this.utils.nextEnabledItem(_this.items, idx);
        }

        _this.select(goToItem);
      }

      // Tab / Enter / ESC
      if ( isSelect && _this.state.opened ) {
        _this.select(idx, true);
        return;
      }

      // Space / Enter / Left / Up / Right / Down
      if ( isOpen && !_this.state.opened ) {
        _this.open();
      }
    },

    /** Update the items object */
    refresh: function() {
      var _this = this;

      _this.populate();
      _this.activate();
      _this.utils.triggerCallback('Refresh', _this);
    },

    /** Set options box width/height */
    setOptionsDimensions: function() {
      var _this = this;

      // Calculate options box height
      // Set a temporary class on the hidden parent of the element
      var hiddenChildren = _this.elements.items.closest(':visible').children(':hidden').addClass(_this.classes.tempshow);
      var maxHeight = _this.options.maxHeight;
      var itemsWidth = _this.elements.items.outerWidth();
      var wrapperWidth = _this.elements.wrapper.outerWidth() - (itemsWidth - _this.elements.items.width());

      // Set the dimensions, minimum is wrapper width, expand for long items if option is true
      if ( !_this.options.expandToItemText || wrapperWidth > itemsWidth ) {
        _this.finalWidth = wrapperWidth;
      } else {
        // Make sure the scrollbar width is included
        _this.elements.items.css('overflow', 'scroll');

        // Set a really long width for _this.elements.outerWrapper
        _this.elements.outerWrapper.width(9e4);
        _this.finalWidth = _this.elements.items.width();
        // Set scroll bar to auto
        _this.elements.items.css('overflow', '');
        _this.elements.outerWrapper.width('');
      }

      _this.elements.items.width(_this.finalWidth).height() > maxHeight && _this.elements.items.height(maxHeight);

      // Remove the temporary class
      hiddenChildren.removeClass(_this.classes.tempshow);
    },

    /** Detect if the options box is inside the window */
    isInViewport: function() {
      var _this = this;
      var scrollTop = $win.scrollTop();
      var winHeight = $win.height();
      var uiPosX = _this.elements.outerWrapper.offset().top;
      var uiHeight = _this.elements.outerWrapper.outerHeight();

      var fitsDown = (uiPosX + uiHeight + _this.itemsHeight) <= (scrollTop + winHeight);
      var fitsAbove = (uiPosX - _this.itemsHeight) > scrollTop;

      // If it does not fit below, only render it
      // above it fit's there.
      // It's acceptable that the user needs to
      // scroll the viewport to see the cut off UI
      var renderAbove = !fitsDown && fitsAbove;

      _this.elements.outerWrapper.toggleClass(_this.classes.above, renderAbove);
    },

    /**
     * Detect if currently selected option is visible and scroll the options box to show it
     *
     * @param {number} index - Index of the selected items
     */
    detectItemVisibility: function(index) {
      var _this = this;
      var liHeight = _this.$li.eq(index).outerHeight();
      var liTop = _this.$li[index].offsetTop;
      var itemsScrollTop = _this.elements.itemsScroll.scrollTop();
      var scrollT = liTop + liHeight * 2;

      _this.elements.itemsScroll.scrollTop(
        scrollT > itemsScrollTop + _this.itemsHeight ? scrollT - _this.itemsHeight :
          liTop - liHeight < itemsScrollTop ? liTop - liHeight :
            itemsScrollTop
      );
    },

    /**
     * Open the select options box
     *
     * @param {event} e - Event
     */
    open: function(e) {
      var _this = this;

      _this.utils.triggerCallback('BeforeOpen', _this);

      if ( e ) {
        e.preventDefault();
        e.stopPropagation();
      }

      if ( _this.state.enabled ) {
        _this.setOptionsDimensions();

        // Find any other opened instances of select and close it
        $('.' + _this.classes.hideselect, '.' + _this.classes.open).children()[pluginName]('close');

        _this.state.opened = true;
        _this.itemsHeight = _this.elements.items.outerHeight();
        _this.itemsInnerHeight = _this.elements.items.height();

        // Toggle options box visibility
        _this.elements.outerWrapper.addClass(_this.classes.open);

        // Give dummy input focus
        _this.elements.input.val('');
        if ( e && e.type !== 'focusin' ) {
          _this.elements.input.focus();
        }

        $doc
          .on('click' + bindSufix, $.proxy(_this.close, _this))
          .on('scroll' + bindSufix, $.proxy(_this.isInViewport, _this));
        _this.isInViewport();

        // Prevent window scroll when using mouse wheel inside items box
        if ( _this.options.preventWindowScroll ) {
          /* istanbul ignore next */
          $doc.on('mousewheel' + bindSufix + ' DOMMouseScroll' + bindSufix, '.' + _this.classes.scroll, function(e) {
            var orgEvent = e.originalEvent;
            var scrollTop = $(this).scrollTop();
            var deltaY = 0;

            if ( 'detail'      in orgEvent ) { deltaY = orgEvent.detail * -1; }
            if ( 'wheelDelta'  in orgEvent ) { deltaY = orgEvent.wheelDelta;  }
            if ( 'wheelDeltaY' in orgEvent ) { deltaY = orgEvent.wheelDeltaY; }
            if ( 'deltaY'      in orgEvent ) { deltaY = orgEvent.deltaY * -1; }

            if ( scrollTop === (this.scrollHeight - _this.itemsInnerHeight) && deltaY < 0 || scrollTop === 0 && deltaY > 0 ) {
              e.preventDefault();
            }
          });
        }

        _this.detectItemVisibility(_this.state.selectedIdx);

        _this.utils.triggerCallback('Open', _this);
      }
    },

    /** Close the select options box */
    close: function() {
      var _this = this;

      _this.utils.triggerCallback('BeforeClose', _this);

      _this.change();

      // Remove custom events on document
      $doc.off(bindSufix);

      // Remove visible class to hide options box
      _this.elements.outerWrapper.removeClass(_this.classes.open);

      _this.state.opened = false;

      _this.utils.triggerCallback('Close', _this);
    },

    /** Select current option and change the label */
    change: function() {
      var _this = this;

      _this.utils.triggerCallback('BeforeChange', _this);

      if ( _this.state.currValue !== _this.state.selectedIdx ) {
        // Apply changed value to original select
        _this.$element
          .prop('selectedIndex', _this.state.currValue = _this.state.selectedIdx)
          .data('value', _this.lookupItems[_this.state.selectedIdx].text);

        // Change label text
        _this.setLabel();
      }

      _this.utils.triggerCallback('Change', _this);
    },

    /**
     * Select option
     *
     * @param {number}  index - Index of the option that will be selected
     * @param {boolean} close - Close the options box after selecting
     */
    select: function(index, close) {
      var _this = this;

      // Parameter index is required
      if ( index === undefined ) {
        return;
      }

      // If element is disabled, can't select it
      if ( !_this.lookupItems[index].disabled ) {
        _this.$li.filter('[data-index]')
          .removeClass('selected')
          .eq(_this.state.selectedIdx = index)
          .addClass('selected');

        _this.detectItemVisibility(index);

        // If 'close' is false (default), the options box won't close after
        // each selected item, this is necessary for keyboard navigation
        if ( close ) {
          _this.close();
        }
      }
    },

    /**
     * Unbind and remove
     *
     * @param {boolean} preserveData - Check if the data on the element should be removed too
     */
    destroy: function(preserveData) {
      var _this = this;

      if ( _this.state && _this.state.enabled ) {
        _this.elements.items.add(_this.elements.wrapper).add(_this.elements.input).remove();

        if ( !preserveData ) {
          _this.$element.removeData(pluginName).removeData('value');
        }

        _this.$element.prop('tabindex', _this.originalTabindex).off(bindSufix).off(_this.eventTriggers).unwrap().unwrap();

        _this.state.enabled = false;
      }
    }
  };

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function(args) {
    return this.each(function() {
      var data = $.data(this, pluginName);

      if ( data && !data.disableOnMobile ) {
        (typeof args === 'string' && data[args]) ? data[args]() : data.init(args);
      } else {
        $.data(this, pluginName, new Selectric(this, args));
      }
    });
  };

  /**
   * Hooks for the callbacks
   *
   * @type {object}
   */
  $.fn[pluginName].hooks = {
    /**
     * @param {string} callbackName - The callback name.
     * @param {string}     hookName - The name of the hook to be attached.
     * @param {function}         fn - Callback function.
     */
    add: function(callbackName, hookName, fn) {
      if ( !this[callbackName] ) {
        this[callbackName] = {};
      }

      this[callbackName][hookName] = fn;
    },

    /**
     * @param {string} callbackName - The callback name.
     * @param {string}     hookName - The name of the hook that will be removed.
     */
    remove: function(callbackName, hookName) {
      delete this[callbackName][hookName];
    }
  };

  /**
   * Default plugin options
   *
   * @type {object}
   */
  $.fn[pluginName].defaults = {
    onChange             : function(elm) { $(elm).change(); },
    maxHeight            : 300,
    keySearchTimeout     : 500,
    arrowButtonMarkup    : '<b class="button">&#x25be;</b>',
    disableOnMobile      : true,
    openOnFocus          : true,
    openOnHover          : false,
    hoverIntentTimeout   : 500,
    expandToItemText     : false,
    responsive           : false,
    preventWindowScroll  : true,
    inheritOriginalWidth : false,
    allowWrap            : true,
    optionsItemBuilder   : '{text}', // function(itemData, element, index)
    labelBuilder         : '{text}', // function(currItem)
    keys                 : {
      previous : [37, 38],                 // Left / Up
      next     : [39, 40],                 // Right / Down
      select   : [9, 13, 27],              // Tab / Enter / Escape
      open     : [13, 32, 37, 38, 39, 40], // Enter / Space / Left / Up / Right / Down
      close    : [9, 27]                   // Tab / Escape
    },
    customClass          : {
      prefix: pluginName,
      camelCase: false
    }
  };
}));
},{"jquery":19}],19:[function(require,module,exports){
/*!
 * jQuery JavaScript Library v3.2.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2017-03-20T18:59Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};



	function DOMEval( code, doc ) {
		doc = doc || document;

		var script = doc.createElement( "script" );

		script.text = code;
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.2.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
		var type = jQuery.type( obj );
		return ( type === "number" || type === "string" ) &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN( obj - parseFloat( obj ) );
	},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android <=2.3 only (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE <=9 - 11, Edge 12 - 13
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Simple selector that can be filtered directly, removing non-Elements
	if ( risSimple.test( qualifier ) ) {
		return jQuery.filter( qualifier, elements, not );
	}

	// Complex selector, compare the two sets, removing non-Elements
	qualifier = jQuery.filter( qualifier, elements );
	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && jQuery.isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( jQuery.isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				jQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ jQuery.camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ jQuery.camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( jQuery.camelCase );
			} else {
				key = jQuery.camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: jQuery.isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( ">tbody", elem )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		div.style.cssText =
			"box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	jQuery.extend( support, {
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {
			computeStyleTests();
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i,
		val = 0;

	// If we already have the right measurement, avoid augmentation
	if ( extra === ( isBorderBox ? "border" : "content" ) ) {
		i = 4;

	// Otherwise initialize for horizontal or vertical properties
	} else {
		i = name === "width" ? 1 : 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with computed style
	var valueIsBorderBox,
		styles = getStyles( elem ),
		val = curCSS( elem, name, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Computed unit is not pixels. Stop here and return.
	if ( rnumnonpx.test( val ) ) {
		return val;
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = isBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ name ] );

	// Fall back to offsetWidth/Height when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	if ( val === "auto" ) {
		val = elem[ "offset" + name[ 0 ].toUpperCase() + name.slice( 1 ) ];
	}

	// Normalize "", auto, and prepare for extra
	val = parseFloat( val ) || 0;

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 13
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnothtmlwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = jQuery.isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 13
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( jQuery.isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var doc, docElem, rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		rect = elem.getBoundingClientRect();

		doc = elem.ownerDocument;
		docElem = doc.documentElement;
		win = doc.defaultView;

		return {
			top: rect.top + win.pageYOffset - docElem.clientTop,
			left: rect.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset = {
				top: parentOffset.top + jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ),
				left: parentOffset.left + jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true )
			};
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( jQuery.isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );

},{}],20:[function(require,module,exports){
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

'use strict';
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

},{}],21:[function(require,module,exports){

/**
 * Reduce `arr` with `fn`.
 *
 * @param {Array} arr
 * @param {Function} fn
 * @param {Mixed} initial
 *
 * TODO: combatible error handling?
 */

module.exports = function(arr, fn, initial){  
  var idx = 0;
  var len = arr.length;
  var curr = arguments.length == 3
    ? initial
    : arr[idx++];

  while (idx < len) {
    curr = fn.call(null, curr, arr[idx], ++idx, arr);
  }
  
  return curr;
};
},{}],22:[function(require,module,exports){
var Storage = require('./storage');
var cookie = require('./cookie');

var _storage_support = true;

try {
  window.localStorage.setItem('test', '42');
  window.sessionStorage.setItem('test', '42');
} catch (e) {
  _storage_support = false;
}

if (_storage_support) {
  module.exports = {
    localStorage: window.localStorage,
    sessionStorage: window.sessionStorage
  };
} else {
  var lsCookie = cookie.read('localStorage');

  var ls = new Storage(
    lsCookie ? JSON.parse(lsCookie) : {}, // init
    function(data) {
      // set
      cookie.create('localStorage', JSON.stringify(data), 365);
    },
    function() {
      // clear
      cookie.create('localStorage', '', 365);
    }
  );

  var ss = new Storage();

  module.exports = {
    localStorage: ls,
    sessionStorage: ss
  };
}

},{"./cookie":23,"./storage":25}],23:[function(require,module,exports){
function createCookie(name, value, days) {
  var date, expires;

  if (days) {
    date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toGMTString();
  } else {
    expires = '';
  }
  document.cookie = name + '=' + value + expires + '; path=/';
}

function readCookie(name) {
  var nameEQ = name + '=',
    ca = document.cookie.split(';'),
    i,
    c;

  for (i = 0; i < ca.length; i++) {
    c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1, c.length);
    }

    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
}

module.exports = {
  create: createCookie,
  read: readCookie
};

},{}],24:[function(require,module,exports){
module.exports = function(obj) {
  var n = 0;
  for (var k in obj) {
    if (obj.hasOwnProperty(k)) {
      n += 1;
    }
  }

  return n;
};

},{}],25:[function(require,module,exports){
var numKeys = require('./num-keys');

function Storage(obj, set, clear) {
  this._obj = obj || {};
  this._set = set;
  this._clear = clear;

  this.length = 0;
}

var proto = Storage.prototype;

// html5 storage api

proto.setItem = function(k, v) {
  k = encodeURIComponent(k);
  this._obj[k] = v;

  this._updateLength();
  if (this._set) this._set(this._obj);
};

proto.getItem = function(k) {
  k = encodeURIComponent(k);
  return this._obj[k] === undefined ? null : this._obj[k];
};

proto.removeItem = function(k) {
  k = encodeURIComponent(k);
  delete this._obj[k];

  this._updateLength();
  if (this._set) this._set(this._obj);
};

proto.key = function(i) {
  var ctr = 0;
  for (var k in this._obj) {
    if (ctr === i) return decodeURIComponent(k);
    else ctr++;
  }

  return null;
};

proto.clear = function() {
  delete this['_obj'];

  if (this._clear) this._clear();
};

// private
proto._updateLength = function() {
  this.length = numKeys(this._obj);
};

module.exports = Storage;

},{"./num-keys":24}],26:[function(require,module,exports){
/**
 * Module dependencies.
 */

var Emitter = require('emitter');
var reduce = require('reduce');
var requestBase = require('./request-base');
var isObject = require('./is-object');

/**
 * Root reference for iframes.
 */

var root;
if (typeof window !== 'undefined') { // Browser window
  root = window;
} else if (typeof self !== 'undefined') { // Web Worker
  root = self;
} else { // Other environments
  root = this;
}

/**
 * Noop.
 */

function noop(){};

/**
 * Check if `obj` is a host object,
 * we don't want to serialize these :)
 *
 * TODO: future proof, move to compoent land
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isHost(obj) {
  var str = {}.toString.call(obj);

  switch (str) {
    case '[object File]':
    case '[object Blob]':
    case '[object FormData]':
      return true;
    default:
      return false;
  }
}

/**
 * Expose `request`.
 */

var request = module.exports = require('./request').bind(null, Request);

/**
 * Determine XHR.
 */

request.getXHR = function () {
  if (root.XMLHttpRequest
      && (!root.location || 'file:' != root.location.protocol
          || !root.ActiveXObject)) {
    return new XMLHttpRequest;
  } else {
    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
  }
  return false;
};

/**
 * Removes leading and trailing whitespace, added to support IE.
 *
 * @param {String} s
 * @return {String}
 * @api private
 */

var trim = ''.trim
  ? function(s) { return s.trim(); }
  : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };

/**
 * Serialize the given `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api private
 */

function serialize(obj) {
  if (!isObject(obj)) return obj;
  var pairs = [];
  for (var key in obj) {
    if (null != obj[key]) {
      pushEncodedKeyValuePair(pairs, key, obj[key]);
        }
      }
  return pairs.join('&');
}

/**
 * Helps 'serialize' with serializing arrays.
 * Mutates the pairs array.
 *
 * @param {Array} pairs
 * @param {String} key
 * @param {Mixed} val
 */

function pushEncodedKeyValuePair(pairs, key, val) {
  if (Array.isArray(val)) {
    return val.forEach(function(v) {
      pushEncodedKeyValuePair(pairs, key, v);
    });
  }
  pairs.push(encodeURIComponent(key)
    + '=' + encodeURIComponent(val));
}

/**
 * Expose serialization method.
 */

 request.serializeObject = serialize;

 /**
  * Parse the given x-www-form-urlencoded `str`.
  *
  * @param {String} str
  * @return {Object}
  * @api private
  */

function parseString(str) {
  var obj = {};
  var pairs = str.split('&');
  var parts;
  var pair;

  for (var i = 0, len = pairs.length; i < len; ++i) {
    pair = pairs[i];
    parts = pair.split('=');
    obj[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
  }

  return obj;
}

/**
 * Expose parser.
 */

request.parseString = parseString;

/**
 * Default MIME type map.
 *
 *     superagent.types.xml = 'application/xml';
 *
 */

request.types = {
  html: 'text/html',
  json: 'application/json',
  xml: 'application/xml',
  urlencoded: 'application/x-www-form-urlencoded',
  'form': 'application/x-www-form-urlencoded',
  'form-data': 'application/x-www-form-urlencoded'
};

/**
 * Default serialization map.
 *
 *     superagent.serialize['application/xml'] = function(obj){
 *       return 'generated xml here';
 *     };
 *
 */

 request.serialize = {
   'application/x-www-form-urlencoded': serialize,
   'application/json': JSON.stringify
 };

 /**
  * Default parsers.
  *
  *     superagent.parse['application/xml'] = function(str){
  *       return { object parsed from str };
  *     };
  *
  */

request.parse = {
  'application/x-www-form-urlencoded': parseString,
  'application/json': JSON.parse
};

/**
 * Parse the given header `str` into
 * an object containing the mapped fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parseHeader(str) {
  var lines = str.split(/\r?\n/);
  var fields = {};
  var index;
  var line;
  var field;
  var val;

  lines.pop(); // trailing CRLF

  for (var i = 0, len = lines.length; i < len; ++i) {
    line = lines[i];
    index = line.indexOf(':');
    field = line.slice(0, index).toLowerCase();
    val = trim(line.slice(index + 1));
    fields[field] = val;
  }

  return fields;
}

/**
 * Check if `mime` is json or has +json structured syntax suffix.
 *
 * @param {String} mime
 * @return {Boolean}
 * @api private
 */

function isJSON(mime) {
  return /[\/+]json\b/.test(mime);
}

/**
 * Return the mime type for the given `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

function type(str){
  return str.split(/ *; */).shift();
};

/**
 * Return header field parameters.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function params(str){
  return reduce(str.split(/ *; */), function(obj, str){
    var parts = str.split(/ *= */)
      , key = parts.shift()
      , val = parts.shift();

    if (key && val) obj[key] = val;
    return obj;
  }, {});
};

/**
 * Initialize a new `Response` with the given `xhr`.
 *
 *  - set flags (.ok, .error, etc)
 *  - parse header
 *
 * Examples:
 *
 *  Aliasing `superagent` as `request` is nice:
 *
 *      request = superagent;
 *
 *  We can use the promise-like API, or pass callbacks:
 *
 *      request.get('/').end(function(res){});
 *      request.get('/', function(res){});
 *
 *  Sending data can be chained:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' })
 *        .end(function(res){});
 *
 *  Or passed to `.send()`:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' }, function(res){});
 *
 *  Or passed to `.post()`:
 *
 *      request
 *        .post('/user', { name: 'tj' })
 *        .end(function(res){});
 *
 * Or further reduced to a single call for simple cases:
 *
 *      request
 *        .post('/user', { name: 'tj' }, function(res){});
 *
 * @param {XMLHTTPRequest} xhr
 * @param {Object} options
 * @api private
 */

function Response(req, options) {
  options = options || {};
  this.req = req;
  this.xhr = this.req.xhr;
  // responseText is accessible only if responseType is '' or 'text' and on older browsers
  this.text = ((this.req.method !='HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text')) || typeof this.xhr.responseType === 'undefined')
     ? this.xhr.responseText
     : null;
  this.statusText = this.req.xhr.statusText;
  this.setStatusProperties(this.xhr.status);
  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
  // getResponseHeader still works. so we get content-type even if getting
  // other headers fails.
  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
  this.setHeaderProperties(this.header);
  this.body = this.req.method != 'HEAD'
    ? this.parseBody(this.text ? this.text : this.xhr.response)
    : null;
}

/**
 * Get case-insensitive `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

Response.prototype.get = function(field){
  return this.header[field.toLowerCase()];
};

/**
 * Set header related properties:
 *
 *   - `.type` the content type without params
 *
 * A response of "Content-Type: text/plain; charset=utf-8"
 * will provide you with a `.type` of "text/plain".
 *
 * @param {Object} header
 * @api private
 */

Response.prototype.setHeaderProperties = function(header){
  // content-type
  var ct = this.header['content-type'] || '';
  this.type = type(ct);

  // params
  var obj = params(ct);
  for (var key in obj) this[key] = obj[key];
};

/**
 * Parse the given body `str`.
 *
 * Used for auto-parsing of bodies. Parsers
 * are defined on the `superagent.parse` object.
 *
 * @param {String} str
 * @return {Mixed}
 * @api private
 */

Response.prototype.parseBody = function(str){
  var parse = request.parse[this.type];
  if (!parse && isJSON(this.type)) {
    parse = request.parse['application/json'];
  }
  return parse && str && (str.length || str instanceof Object)
    ? parse(str)
    : null;
};

/**
 * Set flags such as `.ok` based on `status`.
 *
 * For example a 2xx response will give you a `.ok` of __true__
 * whereas 5xx will be __false__ and `.error` will be __true__. The
 * `.clientError` and `.serverError` are also available to be more
 * specific, and `.statusType` is the class of error ranging from 1..5
 * sometimes useful for mapping respond colors etc.
 *
 * "sugar" properties are also defined for common cases. Currently providing:
 *
 *   - .noContent
 *   - .badRequest
 *   - .unauthorized
 *   - .notAcceptable
 *   - .notFound
 *
 * @param {Number} status
 * @api private
 */

Response.prototype.setStatusProperties = function(status){
  // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
  if (status === 1223) {
    status = 204;
  }

  var type = status / 100 | 0;

  // status / class
  this.status = this.statusCode = status;
  this.statusType = type;

  // basics
  this.info = 1 == type;
  this.ok = 2 == type;
  this.clientError = 4 == type;
  this.serverError = 5 == type;
  this.error = (4 == type || 5 == type)
    ? this.toError()
    : false;

  // sugar
  this.accepted = 202 == status;
  this.noContent = 204 == status;
  this.badRequest = 400 == status;
  this.unauthorized = 401 == status;
  this.notAcceptable = 406 == status;
  this.notFound = 404 == status;
  this.forbidden = 403 == status;
};

/**
 * Return an `Error` representative of this response.
 *
 * @return {Error}
 * @api public
 */

Response.prototype.toError = function(){
  var req = this.req;
  var method = req.method;
  var url = req.url;

  var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
  var err = new Error(msg);
  err.status = this.status;
  err.method = method;
  err.url = url;

  return err;
};

/**
 * Expose `Response`.
 */

request.Response = Response;

/**
 * Initialize a new `Request` with the given `method` and `url`.
 *
 * @param {String} method
 * @param {String} url
 * @api public
 */

function Request(method, url) {
  var self = this;
  this._query = this._query || [];
  this.method = method;
  this.url = url;
  this.header = {}; // preserves header name case
  this._header = {}; // coerces header names to lowercase
  this.on('end', function(){
    var err = null;
    var res = null;

    try {
      res = new Response(self);
    } catch(e) {
      err = new Error('Parser is unable to parse the response');
      err.parse = true;
      err.original = e;
      // issue #675: return the raw response if the response parsing fails
      err.rawResponse = self.xhr && self.xhr.responseText ? self.xhr.responseText : null;
      // issue #876: return the http status code if the response parsing fails
      err.statusCode = self.xhr && self.xhr.status ? self.xhr.status : null;
      return self.callback(err);
    }

    self.emit('response', res);

    if (err) {
      return self.callback(err, res);
    }

    if (res.status >= 200 && res.status < 300) {
      return self.callback(err, res);
    }

    var new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
    new_err.original = err;
    new_err.response = res;
    new_err.status = res.status;

    self.callback(new_err, res);
  });
}

/**
 * Mixin `Emitter` and `requestBase`.
 */

Emitter(Request.prototype);
for (var key in requestBase) {
  Request.prototype[key] = requestBase[key];
}

/**
 * Abort the request, and clear potential timeout.
 *
 * @return {Request}
 * @api public
 */

Request.prototype.abort = function(){
  if (this.aborted) return;
  this.aborted = true;
  this.xhr && this.xhr.abort();
  this.clearTimeout();
  this.emit('abort');
  return this;
};

/**
 * Set Content-Type to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.xml = 'application/xml';
 *
 *      request.post('/')
 *        .type('xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 *      request.post('/')
 *        .type('application/xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 * @param {String} type
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.type = function(type){
  this.set('Content-Type', request.types[type] || type);
  return this;
};

/**
 * Set responseType to `val`. Presently valid responseTypes are 'blob' and 
 * 'arraybuffer'.
 *
 * Examples:
 *
 *      req.get('/')
 *        .responseType('blob')
 *        .end(callback);
 *
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.responseType = function(val){
  this._responseType = val;
  return this;
};

/**
 * Set Accept to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.json = 'application/json';
 *
 *      request.get('/agent')
 *        .accept('json')
 *        .end(callback);
 *
 *      request.get('/agent')
 *        .accept('application/json')
 *        .end(callback);
 *
 * @param {String} accept
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.accept = function(type){
  this.set('Accept', request.types[type] || type);
  return this;
};

/**
 * Set Authorization field value with `user` and `pass`.
 *
 * @param {String} user
 * @param {String} pass
 * @param {Object} options with 'type' property 'auto' or 'basic' (default 'basic')
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.auth = function(user, pass, options){
  if (!options) {
    options = {
      type: 'basic'
    }
  }

  switch (options.type) {
    case 'basic':
      var str = btoa(user + ':' + pass);
      this.set('Authorization', 'Basic ' + str);
    break;

    case 'auto':
      this.username = user;
      this.password = pass;
    break;
  }
  return this;
};

/**
* Add query-string `val`.
*
* Examples:
*
*   request.get('/shoes')
*     .query('size=10')
*     .query({ color: 'blue' })
*
* @param {Object|String} val
* @return {Request} for chaining
* @api public
*/

Request.prototype.query = function(val){
  if ('string' != typeof val) val = serialize(val);
  if (val) this._query.push(val);
  return this;
};

/**
 * Queue the given `file` as an attachment to the specified `field`,
 * with optional `filename`.
 *
 * ``` js
 * request.post('/upload')
 *   .attach(new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
 *   .end(callback);
 * ```
 *
 * @param {String} field
 * @param {Blob|File} file
 * @param {String} filename
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.attach = function(field, file, filename){
  this._getFormData().append(field, file, filename || file.name);
  return this;
};

Request.prototype._getFormData = function(){
  if (!this._formData) {
    this._formData = new root.FormData();
  }
  return this._formData;
};

/**
 * Send `data` as the request body, defaulting the `.type()` to "json" when
 * an object is given.
 *
 * Examples:
 *
 *       // manual json
 *       request.post('/user')
 *         .type('json')
 *         .send('{"name":"tj"}')
 *         .end(callback)
 *
 *       // auto json
 *       request.post('/user')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // manual x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send('name=tj')
 *         .end(callback)
 *
 *       // auto x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // defaults to x-www-form-urlencoded
  *      request.post('/user')
  *        .send('name=tobi')
  *        .send('species=ferret')
  *        .end(callback)
 *
 * @param {String|Object} data
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.send = function(data){
  var obj = isObject(data);
  var type = this._header['content-type'];

  // merge
  if (obj && isObject(this._data)) {
    for (var key in data) {
      this._data[key] = data[key];
    }
  } else if ('string' == typeof data) {
    if (!type) this.type('form');
    type = this._header['content-type'];
    if ('application/x-www-form-urlencoded' == type) {
      this._data = this._data
        ? this._data + '&' + data
        : data;
    } else {
      this._data = (this._data || '') + data;
    }
  } else {
    this._data = data;
  }

  if (!obj || isHost(data)) return this;
  if (!type) this.type('json');
  return this;
};

/**
 * @deprecated
 */
Response.prototype.parse = function serialize(fn){
  if (root.console) {
    console.warn("Client-side parse() method has been renamed to serialize(). This method is not compatible with superagent v2.0");
  }
  this.serialize(fn);
  return this;
};

Response.prototype.serialize = function serialize(fn){
  this._parser = fn;
  return this;
};

/**
 * Invoke the callback with `err` and `res`
 * and handle arity check.
 *
 * @param {Error} err
 * @param {Response} res
 * @api private
 */

Request.prototype.callback = function(err, res){
  var fn = this._callback;
  this.clearTimeout();
  fn(err, res);
};

/**
 * Invoke callback with x-domain error.
 *
 * @api private
 */

Request.prototype.crossDomainError = function(){
  var err = new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');
  err.crossDomain = true;

  err.status = this.status;
  err.method = this.method;
  err.url = this.url;

  this.callback(err);
};

/**
 * Invoke callback with timeout error.
 *
 * @api private
 */

Request.prototype.timeoutError = function(){
  var timeout = this._timeout;
  var err = new Error('timeout of ' + timeout + 'ms exceeded');
  err.timeout = timeout;
  this.callback(err);
};

/**
 * Enable transmission of cookies with x-domain requests.
 *
 * Note that for this to work the origin must not be
 * using "Access-Control-Allow-Origin" with a wildcard,
 * and also must set "Access-Control-Allow-Credentials"
 * to "true".
 *
 * @api public
 */

Request.prototype.withCredentials = function(){
  this._withCredentials = true;
  return this;
};

/**
 * Initiate request, invoking callback `fn(res)`
 * with an instanceof `Response`.
 *
 * @param {Function} fn
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.end = function(fn){
  var self = this;
  var xhr = this.xhr = request.getXHR();
  var query = this._query.join('&');
  var timeout = this._timeout;
  var data = this._formData || this._data;

  // store callback
  this._callback = fn || noop;

  // state change
  xhr.onreadystatechange = function(){
    if (4 != xhr.readyState) return;

    // In IE9, reads to any property (e.g. status) off of an aborted XHR will
    // result in the error "Could not complete the operation due to error c00c023f"
    var status;
    try { status = xhr.status } catch(e) { status = 0; }

    if (0 == status) {
      if (self.timedout) return self.timeoutError();
      if (self.aborted) return;
      return self.crossDomainError();
    }
    self.emit('end');
  };

  // progress
  var handleProgress = function(e){
    if (e.total > 0) {
      e.percent = e.loaded / e.total * 100;
    }
    e.direction = 'download';
    self.emit('progress', e);
  };
  if (this.hasListeners('progress')) {
    xhr.onprogress = handleProgress;
  }
  try {
    if (xhr.upload && this.hasListeners('progress')) {
      xhr.upload.onprogress = handleProgress;
    }
  } catch(e) {
    // Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
    // Reported here:
    // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
  }

  // timeout
  if (timeout && !this._timer) {
    this._timer = setTimeout(function(){
      self.timedout = true;
      self.abort();
    }, timeout);
  }

  // querystring
  if (query) {
    query = request.serializeObject(query);
    this.url += ~this.url.indexOf('?')
      ? '&' + query
      : '?' + query;
  }

  // initiate request
  if (this.username && this.password) {
    xhr.open(this.method, this.url, true, this.username, this.password);
  } else {
    xhr.open(this.method, this.url, true);
  }

  // CORS
  if (this._withCredentials) xhr.withCredentials = true;

  // body
  if ('GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !isHost(data)) {
    // serialize stuff
    var contentType = this._header['content-type'];
    var serialize = this._parser || request.serialize[contentType ? contentType.split(';')[0] : ''];
    if (!serialize && isJSON(contentType)) serialize = request.serialize['application/json'];
    if (serialize) data = serialize(data);
  }

  // set header fields
  for (var field in this.header) {
    if (null == this.header[field]) continue;
    xhr.setRequestHeader(field, this.header[field]);
  }

  if (this._responseType) {
    xhr.responseType = this._responseType;
  }

  // send stuff
  this.emit('request', this);

  // IE11 xhr.send(undefined) sends 'undefined' string as POST payload (instead of nothing)
  // We need null here if data is undefined
  xhr.send(typeof data !== 'undefined' ? data : null);
  return this;
};


/**
 * Expose `Request`.
 */

request.Request = Request;

/**
 * GET `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.get = function(url, data, fn){
  var req = request('GET', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * HEAD `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.head = function(url, data, fn){
  var req = request('HEAD', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * DELETE `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

function del(url, fn){
  var req = request('DELETE', url);
  if (fn) req.end(fn);
  return req;
};

request['del'] = del;
request['delete'] = del;

/**
 * PATCH `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} data
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.patch = function(url, data, fn){
  var req = request('PATCH', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * POST `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} data
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.post = function(url, data, fn){
  var req = request('POST', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * PUT `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.put = function(url, data, fn){
  var req = request('PUT', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

},{"./is-object":27,"./request":29,"./request-base":28,"emitter":30,"reduce":21}],27:[function(require,module,exports){
/**
 * Check if `obj` is an object.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isObject(obj) {
  return null != obj && 'object' == typeof obj;
}

module.exports = isObject;

},{}],28:[function(require,module,exports){
/**
 * Module of mixed-in functions shared between node and client code
 */
var isObject = require('./is-object');

/**
 * Clear previous timeout.
 *
 * @return {Request} for chaining
 * @api public
 */

exports.clearTimeout = function _clearTimeout(){
  this._timeout = 0;
  clearTimeout(this._timer);
  return this;
};

/**
 * Force given parser
 *
 * Sets the body parser no matter type.
 *
 * @param {Function}
 * @api public
 */

exports.parse = function parse(fn){
  this._parser = fn;
  return this;
};

/**
 * Set timeout to `ms`.
 *
 * @param {Number} ms
 * @return {Request} for chaining
 * @api public
 */

exports.timeout = function timeout(ms){
  this._timeout = ms;
  return this;
};

/**
 * Faux promise support
 *
 * @param {Function} fulfill
 * @param {Function} reject
 * @return {Request}
 */

exports.then = function then(fulfill, reject) {
  return this.end(function(err, res) {
    err ? reject(err) : fulfill(res);
  });
}

/**
 * Allow for extension
 */

exports.use = function use(fn) {
  fn(this);
  return this;
}


/**
 * Get request header `field`.
 * Case-insensitive.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

exports.get = function(field){
  return this._header[field.toLowerCase()];
};

/**
 * Get case-insensitive header `field` value.
 * This is a deprecated internal API. Use `.get(field)` instead.
 *
 * (getHeader is no longer used internally by the superagent code base)
 *
 * @param {String} field
 * @return {String}
 * @api private
 * @deprecated
 */

exports.getHeader = exports.get;

/**
 * Set header `field` to `val`, or multiple fields with one object.
 * Case-insensitive.
 *
 * Examples:
 *
 *      req.get('/')
 *        .set('Accept', 'application/json')
 *        .set('X-API-Key', 'foobar')
 *        .end(callback);
 *
 *      req.get('/')
 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
 *        .end(callback);
 *
 * @param {String|Object} field
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

exports.set = function(field, val){
  if (isObject(field)) {
    for (var key in field) {
      this.set(key, field[key]);
    }
    return this;
  }
  this._header[field.toLowerCase()] = val;
  this.header[field] = val;
  return this;
};

/**
 * Remove header `field`.
 * Case-insensitive.
 *
 * Example:
 *
 *      req.get('/')
 *        .unset('User-Agent')
 *        .end(callback);
 *
 * @param {String} field
 */
exports.unset = function(field){
  delete this._header[field.toLowerCase()];
  delete this.header[field];
  return this;
};

/**
 * Write the field `name` and `val` for "multipart/form-data"
 * request bodies.
 *
 * ``` js
 * request.post('/upload')
 *   .field('foo', 'bar')
 *   .end(callback);
 * ```
 *
 * @param {String} name
 * @param {String|Blob|File|Buffer|fs.ReadStream} val
 * @return {Request} for chaining
 * @api public
 */
exports.field = function(name, val) {
  this._getFormData().append(name, val);
  return this;
};

},{"./is-object":27}],29:[function(require,module,exports){
// The node and browser modules expose versions of this with the
// appropriate constructor function bound as first argument
/**
 * Issue a request:
 *
 * Examples:
 *
 *    request('GET', '/users').end(callback)
 *    request('/users').end(callback)
 *    request('/users', callback)
 *
 * @param {String} method
 * @param {String|Function} url or callback
 * @return {Request}
 * @api public
 */

function request(RequestConstructor, method, url) {
  // callback
  if ('function' == typeof url) {
    return new RequestConstructor('GET', method).end(url);
  }

  // url first
  if (2 == arguments.length) {
    return new RequestConstructor('GET', method);
  }

  return new RequestConstructor(method, url);
}

module.exports = request;

},{}],30:[function(require,module,exports){

/**
 * Expose `Emitter`.
 */

if (typeof module !== 'undefined') {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

},{}],31:[function(require,module,exports){
"use strict";

var $ = require('jquery');
window.jQuery = window.$ = $;

var settings = {};
var abanalytics = {};

settings.apiURL = "https://ampid.ampush.io";
settings.defaultUtmToken = "amp_kOOYb-7M_lKzAES5TyStJA";
settings.defaultCamId = "111111222222";
settings.defaultSource = "ampush";
settings.defaultMedium = "prospecting";
settings.allowedParams = ["utm_source", "utm_medium", "utm_campaign", "utm_creative", "utm_content", "utm_site"];
settings.ignoreDomain = ['stitchfix.com'];
settings.exUrlClass = "a.trackClass, a.site-nav__link, a.button, .sub-table a, .wrapper .cf a, .site-nav--mobile a";
settings.apiAccessToken = "b182f027115663f7a5a790b609f61447";
settings.client = "hubble";
settings.allowedSource = ["ampush", "insiderenvy"];
settings.allowedMedium = ["prospecting", "retargeting", "insiderenvy", "test", "taboolaoutbrain", "TaboolaOutbrain", "other", "Other"];
settings.specialParams = '7fh285_';
settings.hcExpURL = 'https://experimenter.ampush.io/experimenter';
settings.hcExpClass = '.subscribe-page';
settings.fullstoryfs = 'fullstory_integration';
var site_q = window.location.search;
var utmToken = settings.defaultUtmToken;
var FSstart = false;
var getCookie = function getCookie(t) {
    for (var n = t + "=", r = document.cookie.split(";"), e = 0; e < r.length; e++) {
        for (var i = r[e]; " " == i.charAt(0);) {
            i = i.substring(1);
        }if (0 == i.indexOf(n)) return i.substring(n.length, i.length);
    }
    return "";
};

function getQueryParams(e) {
    var r = e.split("?"),
        t = "";
    if (2 == r.length && (t = r[1], t = t.split("&")), "" == t) return {};
    for (var n = {}, i = 0; i < t.length; ++i) {
        var a = t[i].split("=");
        2 == a.length && (n[a[0]] = decodeURIComponent(a[1].replace(/\+/g, " ")));
    }
    return n;
}

abanalytics.addQueryToAnchors = function (m_params) {
    $(settings.exUrlClass).each(function () {
        var tUrl = $(this).attr("href");
        if (tUrl != "javascript:void(0);" && typeof tUrl != "undefined") {
            tUrl = tUrl.split("?")[0];
            var offset = "";
            if (tUrl.search("#") >= 0) {
                var tUrls = tUrl.split("#");
                tUrl = tUrls[0];
                offset = tUrls.length > 1 ? "#" + tUrls[1] : '#';
            }
            var q = site_q;

            var q_params = getQueryParams(site_q);
            if (typeof m_params != 'undefined' && m_params) {
                var ck_params = m_params;
            } else {
                var ck_params = getCookie("utm_params");
            }
            ck_params = ck_params != "" ? JSON.parse(ck_params) : {};
            var q_params = ck_params;
            if (!("utm_campaign" in q_params) || q_params["utm_campaign"] == "") {
                q_params["utm_campaign"] = ck_params["utm_campaign"] || settings.defaultCamId;
            }
            if (!("utm_medium" in q_params) || q_params["utm_medium"] == "") {
                q_params["utm_medium"] = ck_params["utm_medium"] || settings.defaultMedium;
            }
            if (!("utm_source" in q_params) || q_params["utm_source"] == "") {
                q_params["utm_source"] = ck_params["utm_source"] || settings.defaultSource;
            }
            var allowedParams = settings.allowedParams;
            if (tUrl != '' && tUrl.search('http') != -1 && tUrl.search('https://hello.hubblecontacts.com') != 0) {
                for (var x in q_params) {
                    if ($.inArray(x, allowedParams) < 0) {
                        delete q_params[x];
                    }
                }
            } else {
                for (var x in q_params) {
                    if ($.inArray(x, allowedParams) < 0) {
                        if (x != '' && x.search(settings.specialParams) != 0) {
                            delete q_params[x];
                        }
                    }
                }
            }
            q = "?" + $.param(q_params);
            tUrl = tUrl + q + offset;
            $(this).attr("href", tUrl);
        }
    });
};
abanalytics.setUtmParams = function (getReturn, utmToken) {
    var queryParams = getQueryParams(site_q);
    var c_params = getCookie("utm_params");
    c_params = c_params != "" ? JSON.parse(c_params) : {};
    var utm_campaign = "";
    if (typeof utmToken != 'undefined' && utmToken) {
        utm_campaign = utmToken;
    } else if ("utm_campaign" in queryParams) {
        utm_campaign = queryParams['utm_campaign'] || c_params["utm_campaign"] || settings.defaultUtmToken;
    } else {
        if ("utm_campaign" in c_params) {
            utm_campaign = c_params["utm_campaign"];
        } else {
            utm_campaign = settings.defaultUtmToken;
        }
    }
    for (var x in c_params) {
        if (!(x in queryParams)) {
            queryParams[x] = c_params[x];
        }
    }
    queryParams["utm_campaign"] = utm_campaign;
    var allowedParams = settings.allowedParams;
    for (var x in queryParams) {
        if ($.inArray(x, allowedParams) < 0) {
            if (x != '' && x.search(settings.specialParams) != 0) {
                delete queryParams[x];
            }
        }
    }
    var allowedSource = settings.allowedSource;
    if ($.inArray(queryParams['utm_source'], allowedSource) < 0) {
        if (typeof c_params['utm_source'] != 'undefined' && c_params['utm_source']) {
            if ($.inArray(c_params['utm_source'], allowedSource) < 0) {
                queryParams['utm_source'] = settings.defaultSource;
            } else {
                queryParams['utm_source'] = c_params['utm_source'];
            }
        } else {
            queryParams['utm_source'] = settings.defaultSource;
        }
    }

    var allowedMedium = settings.allowedMedium;
    if ($.inArray(queryParams['utm_medium'], allowedMedium) < 0) {
        if (typeof c_params['utm_medium'] != 'undefined' && c_params['utm_medium']) {
            if ($.inArray(c_params['utm_medium'], allowedMedium) < 0) {
                queryParams['utm_medium'] = settings.defaultMedium;
            } else {
                queryParams['utm_medium'] = c_params['utm_medium'];
            }
        } else {
            queryParams['utm_medium'] = settings.defaultMedium;
        }
    }

    if (typeof queryParams['utm_creative'] != 'undefined' && queryParams['utm_creative'].trim() == '') {
        if (typeof c_params['utm_creative'] != 'undefined' && c_params['utm_creative']) {
            if (c_params['utm_creative'].trim() == '') {
                delete queryParams['utm_creative'];
            } else {
                queryParams['utm_creative'] = c_params['utm_creative'];
            }
        } else {
            delete queryParams['utm_creative'];
        }
    }
    if (typeof queryParams['utm_site'] != 'undefined' && queryParams['utm_site'].trim() == '') {
        if (typeof c_params['utm_site'] != 'undefined' && c_params['utm_site']) {
            if (c_params['utm_site'].trim() == '') {
                delete queryParams['utm_site'];
            } else {
                queryParams['utm_site'] = c_params['utm_site'];
            }
        } else {
            delete queryParams['utm_site'];
        }
    }
    if (typeof queryParams['utm_content'] != 'undefined' && queryParams['utm_content'].trim() == '') {
        if (typeof c_params['utm_content'] != 'undefined' && c_params['utm_content']) {
            if (c_params['utm_content'].trim() == '') {
                delete queryParams['utm_content'];
            } else {
                queryParams['utm_content'] = c_params['utm_content'];
            }
        } else {
            delete queryParams['utm_content'];
        }
    }

    if (typeof getReturn != "undefined" && getReturn == "returnParams") {
        for (var x in queryParams) {
            if ($.inArray(x, allowedParams) < 0) {
                delete queryParams[x];
            }
        }
        return "?" + $.param(queryParams);
    } else if (typeof getReturn != "undefined" && getReturn == "returnBrowserParams") {
        return "?" + $.param(queryParams);
    } else if (typeof getReturn != "undefined" && getReturn == "tracker") {
        return queryParams;
    } else {
        var m_params = $.extend(true, {}, queryParams);
        abanalytics.addQueryToAnchors(JSON.stringify(m_params));
        if (typeof callHcExp != 'undefined' && callHcExp && typeof getReturn != "undefined" && getReturn == "ampResponse") {
            abanalytics.hcExperimenter(JSON.stringify(m_params));
        }
        for (var x in queryParams) {
            if ($.inArray(x, allowedParams) < 0) {
                delete queryParams[x];
            }
        }
        var c_params = $.extend(true, {}, queryParams);
        document.cookie = "utm_params=" + JSON.stringify(c_params) + ";path=/";
    }
};
abanalytics.generateToken = function () {
    var queryStr = abanalytics.setUtmParams('tracker', '');
    var utm_campaign = queryStr['utm_campaign'];

    if (utm_campaign == settings.defaultUtmToken) {
        utm_campaign = settings.defaultCamId;
    }
    //var targetURL = settings.apiURL + "/utmparams/generate" + queryStr + "&client="+settings.client+"&access_token="+settings.apiAccessToken;
    var targetURL = settings.apiURL + '/translate';
    //var targetURL = "http://ab.ampush.design/utmparams/generate";
    abanalytics.setUtmParams('', settings.defaultUtmToken);
    $.ajax({
        url: targetURL,
        "method": "post",
        data: { id: utm_campaign },
        success: function success(result) {
            utmToken = result.amp_id;
            abanalytics.setUtmParams('ampResponse', utmToken);
        },
        error: function error(xhr, ajaxOptions, thrownError) {
            abanalytics.setUtmParams('ampResponse', utmToken);
        },
        complete: function complete(xhr, status) {
            setBrowserBar(utmToken);
        },
        timeout: 5000
    });
};

function setBrowserBar(utmToken) {
    var paths = window.location.pathname;
    var filename = paths.split("/").pop();
    var updatedpath = "";
    // if (filename.indexOf("index-") > -1 && filename != 'index-D.html' && filename != 'index-C.html')
    //     var updatedpath = "/";    
    if (typeof replaceState != "undefined" && replaceState == true) var updatedpath = "/";
    var ParamsAppended = abanalytics.setUtmParams('returnBrowserParams', utmToken);
    history.replaceState({}, document.title, updatedpath + ParamsAppended);
    //=remove event fired
    //track.fireCustomPixel(utmToken);
    if (typeof fireOutbrain !== 'undefined' && $.isFunction(fireOutbrain)) {
        fireOutbrain(100);
    }
}

$(document).ready(function () {
    if (getCookie('fullstory_funnel')) {
        if (getCookie('fullstory_funnel') == 'yes') abanalytics.fullstory_init();else console.log("Full Story.X");
    } else if (typeof ExpPage != "undefined" && ExpPage == true) {
        abanalytics.fullstoryintegration();
    }
    abanalytics.generateToken();
});

abanalytics.hcExperimenter = function (m_params) {
    if (typeof funnel_step_req_page == "undefined" || funnel_step_req_page == "") var funnel_step_req = 'subscribe_page';else var funnel_step_req = funnel_step_req_page;
    $.ajax({
        url: settings.hcExpURL,
        data: { partner_id: 'hubble', funnel_step: funnel_step_req },
        success: function success(result) {
            if (typeof result.variant_url != 'undefined' && result.variant_url) {
                $(settings.hcExpClass).attr('href', result.variant_url);
                abanalytics.addQueryToAnchors(m_params);
            }
        },
        error: function error(xhr, ajaxOptions, thrownError) {
            console.log('hcExperimenter error');
        },
        complete: function complete(xhr, status) {
            console.log('hcExperimenter success');
        },
        timeout: 5000
    });
};

abanalytics.fullstoryintegration = function () {
    $.ajax({
        url: settings.hcExpURL,
        data: { partner_id: 'hubble', funnel_step: settings.fullstoryfs },
        success: function success(result) {
            //result.variant_url = "true";
            if (typeof result.variant_url != 'undefined' && result.variant_url == "true") {
                FSstart = true;
                abanalytics.fullstory_init();
                document.cookie = "fullstory_funnel=yes;path=/";
                console.log('fullstory true');
            } else {
                document.cookie = "fullstory_funnel=no;path=/";
            }
        },
        error: function error(xhr, ajaxOptions, thrownError) {
            document.cookie = "fullstory_funnel=; expires=Thu, 18 Dec 2013 12:00:00 UTC;path=/";
            console.log('fullstory error');
        },
        timeout: 5000
    });
};

abanalytics.fullstory_init = function () {
    window['_fs_debug'] = false;
    window['_fs_host'] = 'fullstory.com';
    window['_fs_org'] = '70A6J';
    window['_fs_namespace'] = 'FS';
    (function (m, n, e, t, l, o, g, y) {
        if (e in m) {
            if (m.console && m.console.log) {
                m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].');
            }return;
        }
        g = m[e] = function (a, b) {
            g.q ? g.q.push([a, b]) : g._api(a, b);
        };g.q = [];
        o = n.createElement(t);o.async = 1;o.src = 'https://' + _fs_host + '/s/fs.js';
        y = n.getElementsByTagName(t)[0];y.parentNode.insertBefore(o, y);
        g.identify = function (i, v) {
            g(l, { uid: i });if (v) g(l, v);
        };g.setUserVars = function (v) {
            g(l, v);
        };
        g.identifyAccount = function (i, v) {
            o = 'account';v = v || {};v.acctId = i;g(o, v);
        };
        g.clearUserCookie = function (c, d, i) {
            if (!c || document.cookie.match('fs_uid=[`;`]*`[`;`]*`[`;`]*`')) {
                d = n.domain;while (1) {
                    n.cookie = 'fs_uid=;domain=' + d + ';path=/;expires=' + new Date(0).toUTCString();i = d.indexOf('.');if (i < 0) break;d = d.slice(i + 1);
                }
            }
        };
    })(window, document, window['_fs_namespace'], 'script', 'user');
};

module.exports = {
    abanalytics: abanalytics,
    getCookie: getCookie,
    utmToken: settings.defaultUtmToken
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFiYW5hbHl0aWNzLmpzIl0sIm5hbWVzIjpbIiQiLCJyZXF1aXJlIiwid2luZG93IiwialF1ZXJ5Iiwic2V0dGluZ3MiLCJhYmFuYWx5dGljcyIsImFwaVVSTCIsImRlZmF1bHRVdG1Ub2tlbiIsImRlZmF1bHRDYW1JZCIsImRlZmF1bHRTb3VyY2UiLCJkZWZhdWx0TWVkaXVtIiwiYWxsb3dlZFBhcmFtcyIsImlnbm9yZURvbWFpbiIsImV4VXJsQ2xhc3MiLCJhcGlBY2Nlc3NUb2tlbiIsImNsaWVudCIsImFsbG93ZWRTb3VyY2UiLCJhbGxvd2VkTWVkaXVtIiwic3BlY2lhbFBhcmFtcyIsImhjRXhwVVJMIiwiaGNFeHBDbGFzcyIsImZ1bGxzdG9yeWZzIiwic2l0ZV9xIiwibG9jYXRpb24iLCJzZWFyY2giLCJ1dG1Ub2tlbiIsIkZTc3RhcnQiLCJnZXRDb29raWUiLCJ0IiwibiIsInIiLCJkb2N1bWVudCIsImNvb2tpZSIsInNwbGl0IiwiZSIsImxlbmd0aCIsImkiLCJjaGFyQXQiLCJzdWJzdHJpbmciLCJpbmRleE9mIiwiZ2V0UXVlcnlQYXJhbXMiLCJhIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwicmVwbGFjZSIsImFkZFF1ZXJ5VG9BbmNob3JzIiwibV9wYXJhbXMiLCJlYWNoIiwidFVybCIsImF0dHIiLCJvZmZzZXQiLCJ0VXJscyIsInEiLCJxX3BhcmFtcyIsImNrX3BhcmFtcyIsIkpTT04iLCJwYXJzZSIsIngiLCJpbkFycmF5IiwicGFyYW0iLCJzZXRVdG1QYXJhbXMiLCJnZXRSZXR1cm4iLCJxdWVyeVBhcmFtcyIsImNfcGFyYW1zIiwidXRtX2NhbXBhaWduIiwidHJpbSIsImV4dGVuZCIsInN0cmluZ2lmeSIsImNhbGxIY0V4cCIsImhjRXhwZXJpbWVudGVyIiwiZ2VuZXJhdGVUb2tlbiIsInF1ZXJ5U3RyIiwidGFyZ2V0VVJMIiwiYWpheCIsInVybCIsImRhdGEiLCJpZCIsInN1Y2Nlc3MiLCJyZXN1bHQiLCJhbXBfaWQiLCJlcnJvciIsInhociIsImFqYXhPcHRpb25zIiwidGhyb3duRXJyb3IiLCJjb21wbGV0ZSIsInN0YXR1cyIsInNldEJyb3dzZXJCYXIiLCJ0aW1lb3V0IiwicGF0aHMiLCJwYXRobmFtZSIsImZpbGVuYW1lIiwicG9wIiwidXBkYXRlZHBhdGgiLCJyZXBsYWNlU3RhdGUiLCJQYXJhbXNBcHBlbmRlZCIsImhpc3RvcnkiLCJ0aXRsZSIsImZpcmVPdXRicmFpbiIsImlzRnVuY3Rpb24iLCJyZWFkeSIsImZ1bGxzdG9yeV9pbml0IiwiY29uc29sZSIsImxvZyIsIkV4cFBhZ2UiLCJmdWxsc3RvcnlpbnRlZ3JhdGlvbiIsImZ1bm5lbF9zdGVwX3JlcV9wYWdlIiwiZnVubmVsX3N0ZXBfcmVxIiwicGFydG5lcl9pZCIsImZ1bm5lbF9zdGVwIiwidmFyaWFudF91cmwiLCJtIiwibCIsIm8iLCJnIiwieSIsImIiLCJwdXNoIiwiX2FwaSIsImNyZWF0ZUVsZW1lbnQiLCJhc3luYyIsInNyYyIsIl9mc19ob3N0IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJwYXJlbnROb2RlIiwiaW5zZXJ0QmVmb3JlIiwiaWRlbnRpZnkiLCJ2IiwidWlkIiwic2V0VXNlclZhcnMiLCJpZGVudGlmeUFjY291bnQiLCJhY2N0SWQiLCJjbGVhclVzZXJDb29raWUiLCJjIiwiZCIsIm1hdGNoIiwiZG9tYWluIiwiRGF0ZSIsInRvVVRDU3RyaW5nIiwic2xpY2UiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLElBQUlDLFFBQVEsUUFBUixDQUFSO0FBQ0FDLE9BQU9DLE1BQVAsR0FBZ0JELE9BQU9GLENBQVAsR0FBV0EsQ0FBM0I7O0FBRUEsSUFBSUksV0FBVyxFQUFmO0FBQ0EsSUFBSUMsY0FBYyxFQUFsQjs7QUFFQUQsU0FBU0UsTUFBVCxHQUFrQix5QkFBbEI7QUFDQUYsU0FBU0csZUFBVCxHQUEyQiw0QkFBM0I7QUFDQUgsU0FBU0ksWUFBVCxHQUF3QixjQUF4QjtBQUNBSixTQUFTSyxhQUFULEdBQXlCLFFBQXpC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Q1YsSUFBSUcsSUFBSixDQUFTLENBQVQsRUFBWUMsV0FBWixFQURDLENBQ3lCcEcsSUFBRWdHLEVBQUU3RixPQUFGLENBQVUsR0FBVixDQUFGLENBQWlCLElBQUdILElBQUUsQ0FBTCxFQUFPLE1BQU1nRyxJQUFFQSxFQUFFSyxLQUFGLENBQVFyRyxJQUFFLENBQVYsQ0FBRjtBQUFlO0FBQUM7QUFBQyxTQUY1RjtBQUdILEtBVkQsRUFVR2xDLE1BVkgsRUFVVTZCLFFBVlYsRUFVbUI3QixPQUFPLGVBQVAsQ0FWbkIsRUFVMkMsUUFWM0MsRUFVb0QsTUFWcEQ7QUFXSCxDQWhCRDs7QUFrQkF3SSxPQUFPQyxPQUFQLEdBQWlCO0FBQ2J0SSxpQkFBY0EsV0FERDtBQUVic0IsZUFBWUEsU0FGQztBQUdiRixjQUFXckIsU0FBU0c7QUFIUCxDQUFqQiIsImZpbGUiOiJhYmFuYWx5dGljcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XG53aW5kb3cualF1ZXJ5ID0gd2luZG93LiQgPSAkO1xuXG52YXIgc2V0dGluZ3MgPSB7fTtcbnZhciBhYmFuYWx5dGljcyA9IHt9O1xuXG5zZXR0aW5ncy5hcGlVUkwgPSBcImh0dHBzOi8vYW1waWQuYW1wdXNoLmlvXCI7XG5zZXR0aW5ncy5kZWZhdWx0VXRtVG9rZW4gPSBcImFtcF9rT09ZYi03TV9sS3pBRVM1VHlTdEpBXCI7XG5zZXR0aW5ncy5kZWZhdWx0Q2FtSWQgPSBcIjExMTExMTIyMjIyMlwiO1xuc2V0dGluZ3MuZGVmYXVsdFNvdXJjZSA9IFwiYW1wdXNoXCI7XG5zZXR0aW5ncy5kZWZhdWx0TWVkaXVtID0gXCJwcm9zcGVjdGluZ1wiO1xuc2V0dGluZ3MuYWxsb3dlZFBhcmFtcyA9IFtcInV0bV9zb3VyY2VcIiwgXCJ1dG1fbWVkaXVtXCIsIFwidXRtX2NhbXBhaWduXCIsIFwidXRtX2NyZWF0aXZlXCIsIFwidXRtX2NvbnRlbnRcIiwgXCJ1dG1fc2l0ZVwiXTtcbnNldHRpbmdzLmlnbm9yZURvbWFpbiA9IFsnc3RpdGNoZml4LmNvbSddO1xuc2V0dGluZ3MuZXhVcmxDbGFzcyA9IFwiYS50cmFja0NsYXNzLCBhLnNpdGUtbmF2X19saW5rLCBhLmJ1dHRvbiwgLnN1Yi10YWJsZSBhLCAud3JhcHBlciAuY2YgYSwgLnNpdGUtbmF2LS1tb2JpbGUgYVwiO1xuc2V0dGluZ3MuYXBpQWNjZXNzVG9rZW4gPSBcImIxODJmMDI3MTE1NjYzZjdhNWE3OTBiNjA5ZjYxNDQ3XCI7XG5zZXR0aW5ncy5jbGllbnQgPSBcImh1YmJsZVwiO1xuc2V0dGluZ3MuYWxsb3dlZFNvdXJjZSA9IFtcImFtcHVzaFwiLCBcImluc2lkZXJlbnZ5XCJdO1xuc2V0dGluZ3MuYWxsb3dlZE1lZGl1bSA9IFtcInByb3NwZWN0aW5nXCIsIFwicmV0YXJnZXRpbmdcIiwgXCJpbnNpZGVyZW52eVwiLCBcInRlc3RcIiwgXCJ0YWJvb2xhb3V0YnJhaW5cIiwgXCJUYWJvb2xhT3V0YnJhaW5cIixcIm90aGVyXCIsXCJPdGhlclwiXTtcbnNldHRpbmdzLnNwZWNpYWxQYXJhbXMgPSAnN2ZoMjg1Xyc7XG5zZXR0aW5ncy5oY0V4cFVSTCA9ICdodHRwczovL2V4cGVyaW1lbnRlci5hbXB1c2guaW8vZXhwZXJpbWVudGVyJztcbnNldHRpbmdzLmhjRXhwQ2xhc3MgPSAnLnN1YnNjcmliZS1wYWdlJztcbnNldHRpbmdzLmZ1bGxzdG9yeWZzID0gJ2Z1bGxzdG9yeV9pbnRlZ3JhdGlvbic7XG52YXIgc2l0ZV9xID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcbnZhciB1dG1Ub2tlbiA9IHNldHRpbmdzLmRlZmF1bHRVdG1Ub2tlbjtcbnZhciBGU3N0YXJ0ID0gZmFsc2U7XG52YXIgZ2V0Q29va2llID0gZnVuY3Rpb24gZ2V0Q29va2llKHQpIHtcbiAgICBmb3IgKHZhciBuID0gdCArIFwiPVwiLCByID0gZG9jdW1lbnQuY29va2llLnNwbGl0KFwiO1wiKSwgZSA9IDA7IGUgPCByLmxlbmd0aDsgZSsrKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSByW2VdO1xuICAgICAgICAgICAgXCIgXCIgPT0gaS5jaGFyQXQoMCk7KVxuICAgICAgICAgICAgaSA9IGkuc3Vic3RyaW5nKDEpO1xuICAgICAgICBpZiAoMCA9PSBpLmluZGV4T2YobikpXG4gICAgICAgICAgICByZXR1cm4gaS5zdWJzdHJpbmcobi5sZW5ndGgsIGkubGVuZ3RoKVxuICAgIH1cbiAgICByZXR1cm4gXCJcIlxufVxuXG5mdW5jdGlvbiBnZXRRdWVyeVBhcmFtcyhlKSB7XG4gICAgdmFyIHIgPSBlLnNwbGl0KFwiP1wiKSxcbiAgICAgICAgdCA9IFwiXCI7XG4gICAgaWYgKDIgPT0gci5sZW5ndGggJiYgKHQgPSByWzFdLCB0ID0gdC5zcGxpdChcIiZcIikpLCBcIlwiID09IHQpXG4gICAgICAgIHJldHVybiB7fTtcbiAgICBmb3IgKHZhciBuID0ge30sIGkgPSAwOyBpIDwgdC5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgYSA9IHRbaV0uc3BsaXQoXCI9XCIpO1xuICAgICAgICAyID09IGEubGVuZ3RoICYmIChuW2FbMF1dID0gZGVjb2RlVVJJQ29tcG9uZW50KGFbMV0ucmVwbGFjZSgvXFwrL2csIFwiIFwiKSkpXG4gICAgfVxuICAgIHJldHVybiBuXG59XG5cblxuYWJhbmFseXRpY3MuYWRkUXVlcnlUb0FuY2hvcnMgPSBmdW5jdGlvbihtX3BhcmFtcykge1xuICAgICQoc2V0dGluZ3MuZXhVcmxDbGFzcykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHRVcmwgPSAkKHRoaXMpLmF0dHIoXCJocmVmXCIpO1xuICAgICAgICBpZiAodFVybCAhPSBcImphdmFzY3JpcHQ6dm9pZCgwKTtcIiAmJiB0eXBlb2YgdFVybCAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICB0VXJsID0gdFVybC5zcGxpdChcIj9cIilbMF07XG4gICAgICAgICAgICB2YXIgb2Zmc2V0ID0gXCJcIjtcbiAgICAgICAgICAgIGlmICh0VXJsLnNlYXJjaChcIiNcIikgPj0gMCkge1xuICAgICAgICAgICAgICAgIHZhciB0VXJscyA9IHRVcmwuc3BsaXQoXCIjXCIpO1xuICAgICAgICAgICAgICAgIHRVcmwgPSB0VXJsc1swXTtcbiAgICAgICAgICAgICAgICBvZmZzZXQgPSB0VXJscy5sZW5ndGggPiAxID8gXCIjXCIgKyB0VXJsc1sxXSA6ICcjJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBxID0gc2l0ZV9xO1xuXG4gICAgICAgICAgICB2YXIgcV9wYXJhbXMgPSBnZXRRdWVyeVBhcmFtcyhzaXRlX3EpO1xuICAgICAgICAgICAgaWYodHlwZW9mIG1fcGFyYW1zICE9ICd1bmRlZmluZWQnICYmIG1fcGFyYW1zKXtcbiAgICAgICAgICAgICAgICB2YXIgY2tfcGFyYW1zID0gbV9wYXJhbXM7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB2YXIgY2tfcGFyYW1zID0gZ2V0Q29va2llKFwidXRtX3BhcmFtc1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNrX3BhcmFtcyA9IGNrX3BhcmFtcyAhPSBcIlwiID8gSlNPTi5wYXJzZShja19wYXJhbXMpIDoge307XG4gICAgICAgICAgICB2YXIgcV9wYXJhbXMgPSBja19wYXJhbXM7XG4gICAgICAgICAgICBpZiAoIShcInV0bV9jYW1wYWlnblwiIGluIHFfcGFyYW1zKSB8fCBxX3BhcmFtc1tcInV0bV9jYW1wYWlnblwiXSA9PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgcV9wYXJhbXNbXCJ1dG1fY2FtcGFpZ25cIl0gPSBja19wYXJhbXNbXCJ1dG1fY2FtcGFpZ25cIl0gfHwgc2V0dGluZ3MuZGVmYXVsdENhbUlkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCEoXCJ1dG1fbWVkaXVtXCIgaW4gcV9wYXJhbXMpIHx8IHFfcGFyYW1zW1widXRtX21lZGl1bVwiXSA9PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgcV9wYXJhbXNbXCJ1dG1fbWVkaXVtXCJdID0gY2tfcGFyYW1zW1widXRtX21lZGl1bVwiXSB8fCBzZXR0aW5ncy5kZWZhdWx0TWVkaXVtO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCEoXCJ1dG1fc291cmNlXCIgaW4gcV9wYXJhbXMpIHx8IHFfcGFyYW1zW1widXRtX3NvdXJjZVwiXSA9PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgcV9wYXJhbXNbXCJ1dG1fc291cmNlXCJdID0gY2tfcGFyYW1zW1widXRtX3NvdXJjZVwiXSB8fCBzZXR0aW5ncy5kZWZhdWx0U291cmNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGFsbG93ZWRQYXJhbXMgPSBzZXR0aW5ncy5hbGxvd2VkUGFyYW1zO1xuICAgICAgICAgICAgaWYodFVybCAhPScnICYmIHRVcmwuc2VhcmNoKCdodHRwJykgIT0gLTEgJiYgdFVybC5zZWFyY2goJ2h0dHBzOi8vaGVsbG8uaHViYmxlY29udGFjdHMuY29tJykgIT0gMCl7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgeCBpbiBxX3BhcmFtcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoJC5pbkFycmF5KHgsIGFsbG93ZWRQYXJhbXMpIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHFfcGFyYW1zW3hdOyAgIFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgeCBpbiBxX3BhcmFtcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoJC5pbkFycmF5KHgsIGFsbG93ZWRQYXJhbXMpIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoeCAhPScnICYmIHguc2VhcmNoKHNldHRpbmdzLnNwZWNpYWxQYXJhbXMpICE9IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBxX3BhcmFtc1t4XTsgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHEgPSBcIj9cIiArICQucGFyYW0ocV9wYXJhbXMpO1xuICAgICAgICAgICAgdFVybCA9IHRVcmwgKyBxICsgb2Zmc2V0O1xuICAgICAgICAgICAgJCh0aGlzKS5hdHRyKFwiaHJlZlwiLCB0VXJsKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuYWJhbmFseXRpY3Muc2V0VXRtUGFyYW1zID0gZnVuY3Rpb24oZ2V0UmV0dXJuLCB1dG1Ub2tlbikge1xuICAgIHZhciBxdWVyeVBhcmFtcyA9IGdldFF1ZXJ5UGFyYW1zKHNpdGVfcSk7XG4gICAgdmFyIGNfcGFyYW1zID0gZ2V0Q29va2llKFwidXRtX3BhcmFtc1wiKTtcbiAgICBjX3BhcmFtcyA9IGNfcGFyYW1zICE9IFwiXCIgPyBKU09OLnBhcnNlKGNfcGFyYW1zKSA6IHt9O1xuICAgIHZhciB1dG1fY2FtcGFpZ24gPSBcIlwiO1xuICAgIGlmICh0eXBlb2YgdXRtVG9rZW4gIT0gJ3VuZGVmaW5lZCcgJiYgdXRtVG9rZW4pIHtcbiAgICAgICAgdXRtX2NhbXBhaWduID0gdXRtVG9rZW47XG4gICAgfSBlbHNlIGlmIChcInV0bV9jYW1wYWlnblwiIGluIHF1ZXJ5UGFyYW1zKSB7XG4gICAgICAgIHV0bV9jYW1wYWlnbiA9IHF1ZXJ5UGFyYW1zWyd1dG1fY2FtcGFpZ24nXSB8fCBjX3BhcmFtc1tcInV0bV9jYW1wYWlnblwiXSB8fCBzZXR0aW5ncy5kZWZhdWx0VXRtVG9rZW47XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKFwidXRtX2NhbXBhaWduXCIgaW4gY19wYXJhbXMpIHtcbiAgICAgICAgICAgIHV0bV9jYW1wYWlnbiA9IGNfcGFyYW1zW1widXRtX2NhbXBhaWduXCJdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdXRtX2NhbXBhaWduID0gc2V0dGluZ3MuZGVmYXVsdFV0bVRva2VuO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIHggaW4gY19wYXJhbXMpIHtcbiAgICAgICAgaWYgKCEoeCBpbiBxdWVyeVBhcmFtcykpIHtcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zW3hdID0gY19wYXJhbXNbeF07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVlcnlQYXJhbXNbXCJ1dG1fY2FtcGFpZ25cIl0gPSB1dG1fY2FtcGFpZ247XG4gICAgdmFyIGFsbG93ZWRQYXJhbXMgPSBzZXR0aW5ncy5hbGxvd2VkUGFyYW1zO1xuICAgIGZvciAodmFyIHggaW4gcXVlcnlQYXJhbXMpIHtcbiAgICAgICAgaWYgKCQuaW5BcnJheSh4LCBhbGxvd2VkUGFyYW1zKSA8IDApIHtcbiAgICAgICAgICAgIGlmKHggIT0nJyAmJiB4LnNlYXJjaChzZXR0aW5ncy5zcGVjaWFsUGFyYW1zKSAhPSAwKXtcbiAgICAgICAgICAgICAgICBkZWxldGUgcXVlcnlQYXJhbXNbeF07ICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyIGFsbG93ZWRTb3VyY2UgPSBzZXR0aW5ncy5hbGxvd2VkU291cmNlO1xuICAgIGlmICgkLmluQXJyYXkocXVlcnlQYXJhbXNbJ3V0bV9zb3VyY2UnXSwgYWxsb3dlZFNvdXJjZSkgPCAwKSB7XG4gICAgICAgIGlmICh0eXBlb2YgY19wYXJhbXNbJ3V0bV9zb3VyY2UnXSAhPSAndW5kZWZpbmVkJyAmJiBjX3BhcmFtc1sndXRtX3NvdXJjZSddKSB7XG4gICAgICAgICAgICBpZiAoJC5pbkFycmF5KGNfcGFyYW1zWyd1dG1fc291cmNlJ10sIGFsbG93ZWRTb3VyY2UpIDwgMCkge1xuICAgICAgICAgICAgICAgIHF1ZXJ5UGFyYW1zWyd1dG1fc291cmNlJ10gPSBzZXR0aW5ncy5kZWZhdWx0U291cmNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBxdWVyeVBhcmFtc1sndXRtX3NvdXJjZSddID0gY19wYXJhbXNbJ3V0bV9zb3VyY2UnXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zWyd1dG1fc291cmNlJ10gPSBzZXR0aW5ncy5kZWZhdWx0U291cmNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGFsbG93ZWRNZWRpdW0gPSBzZXR0aW5ncy5hbGxvd2VkTWVkaXVtO1xuICAgIGlmICgkLmluQXJyYXkocXVlcnlQYXJhbXNbJ3V0bV9tZWRpdW0nXSwgYWxsb3dlZE1lZGl1bSkgPCAwKSB7XG4gICAgICAgIGlmICh0eXBlb2YgY19wYXJhbXNbJ3V0bV9tZWRpdW0nXSAhPSAndW5kZWZpbmVkJyAmJiBjX3BhcmFtc1sndXRtX21lZGl1bSddKSB7XG4gICAgICAgICAgICBpZiAoJC5pbkFycmF5KGNfcGFyYW1zWyd1dG1fbWVkaXVtJ10sIGFsbG93ZWRNZWRpdW0pIDwgMCkge1xuICAgICAgICAgICAgICAgIHF1ZXJ5UGFyYW1zWyd1dG1fbWVkaXVtJ10gPSBzZXR0aW5ncy5kZWZhdWx0TWVkaXVtO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBxdWVyeVBhcmFtc1sndXRtX21lZGl1bSddID0gY19wYXJhbXNbJ3V0bV9tZWRpdW0nXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zWyd1dG1fbWVkaXVtJ10gPSBzZXR0aW5ncy5kZWZhdWx0TWVkaXVtO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBxdWVyeVBhcmFtc1sndXRtX2NyZWF0aXZlJ10gIT0ndW5kZWZpbmVkJyAmJiBxdWVyeVBhcmFtc1sndXRtX2NyZWF0aXZlJ10udHJpbSgpID09ICcnKSB7XG4gICAgICAgIGlmICh0eXBlb2YgY19wYXJhbXNbJ3V0bV9jcmVhdGl2ZSddICE9ICd1bmRlZmluZWQnICYmIGNfcGFyYW1zWyd1dG1fY3JlYXRpdmUnXSkge1xuICAgICAgICAgICAgaWYgKGNfcGFyYW1zWyd1dG1fY3JlYXRpdmUnXS50cmltKCkgPT0gJycpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgcXVlcnlQYXJhbXNbJ3V0bV9jcmVhdGl2ZSddO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBxdWVyeVBhcmFtc1sndXRtX2NyZWF0aXZlJ10gPSBjX3BhcmFtc1sndXRtX2NyZWF0aXZlJ107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWxldGUgcXVlcnlQYXJhbXNbJ3V0bV9jcmVhdGl2ZSddO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmICh0eXBlb2YgcXVlcnlQYXJhbXNbJ3V0bV9zaXRlJ10gIT0ndW5kZWZpbmVkJyAmJiBxdWVyeVBhcmFtc1sndXRtX3NpdGUnXS50cmltKCkgPT0gJycpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjX3BhcmFtc1sndXRtX3NpdGUnXSAhPSAndW5kZWZpbmVkJyAmJiBjX3BhcmFtc1sndXRtX3NpdGUnXSkge1xuICAgICAgICAgICAgaWYgKGNfcGFyYW1zWyd1dG1fc2l0ZSddLnRyaW0oKSA9PSAnJykge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBxdWVyeVBhcmFtc1sndXRtX3NpdGUnXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcXVlcnlQYXJhbXNbJ3V0bV9zaXRlJ10gPSBjX3BhcmFtc1sndXRtX3NpdGUnXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlbGV0ZSBxdWVyeVBhcmFtc1sndXRtX3NpdGUnXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAodHlwZW9mIHF1ZXJ5UGFyYW1zWyd1dG1fY29udGVudCddICE9J3VuZGVmaW5lZCcgJiYgcXVlcnlQYXJhbXNbJ3V0bV9jb250ZW50J10udHJpbSgpID09ICcnKSB7XG4gICAgICAgIGlmICh0eXBlb2YgY19wYXJhbXNbJ3V0bV9jb250ZW50J10gIT0gJ3VuZGVmaW5lZCcgJiYgY19wYXJhbXNbJ3V0bV9jb250ZW50J10pIHtcbiAgICAgICAgICAgIGlmIChjX3BhcmFtc1sndXRtX2NvbnRlbnQnXS50cmltKCkgPT0gJycpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgcXVlcnlQYXJhbXNbJ3V0bV9jb250ZW50J107XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHF1ZXJ5UGFyYW1zWyd1dG1fY29udGVudCddID0gY19wYXJhbXNbJ3V0bV9jb250ZW50J107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWxldGUgcXVlcnlQYXJhbXNbJ3V0bV9jb250ZW50J107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGdldFJldHVybiAhPSBcInVuZGVmaW5lZFwiICYmIGdldFJldHVybiA9PSBcInJldHVyblBhcmFtc1wiKSB7XG4gICAgICAgZm9yICh2YXIgeCBpbiBxdWVyeVBhcmFtcykge1xuICAgICAgICAgICAgaWYgKCQuaW5BcnJheSh4LCBhbGxvd2VkUGFyYW1zKSA8IDApIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgcXVlcnlQYXJhbXNbeF07ICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICByZXR1cm4gXCI/XCIgKyAkLnBhcmFtKHF1ZXJ5UGFyYW1zKTtcbiAgICB9ZWxzZSBpZih0eXBlb2YgZ2V0UmV0dXJuICE9IFwidW5kZWZpbmVkXCIgJiYgZ2V0UmV0dXJuID09IFwicmV0dXJuQnJvd3NlclBhcmFtc1wiKXtcbiAgICAgICAgcmV0dXJuIFwiP1wiICsgJC5wYXJhbShxdWVyeVBhcmFtcyk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZ2V0UmV0dXJuICE9IFwidW5kZWZpbmVkXCIgJiYgZ2V0UmV0dXJuID09IFwidHJhY2tlclwiKSB7XG4gICAgICAgIHJldHVybiBxdWVyeVBhcmFtcztcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgbV9wYXJhbXMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgcXVlcnlQYXJhbXMpO1xuICAgICAgICBhYmFuYWx5dGljcy5hZGRRdWVyeVRvQW5jaG9ycyhKU09OLnN0cmluZ2lmeShtX3BhcmFtcykpO1xuICAgICAgICBpZih0eXBlb2YgY2FsbEhjRXhwICE9ICd1bmRlZmluZWQnICYmIGNhbGxIY0V4cCAmJiB0eXBlb2YgZ2V0UmV0dXJuICE9IFwidW5kZWZpbmVkXCIgJiYgZ2V0UmV0dXJuID09IFwiYW1wUmVzcG9uc2VcIil7XG4gICAgICAgICAgICBhYmFuYWx5dGljcy5oY0V4cGVyaW1lbnRlcihKU09OLnN0cmluZ2lmeShtX3BhcmFtcykpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIHggaW4gcXVlcnlQYXJhbXMpIHtcbiAgICAgICAgICAgIGlmICgkLmluQXJyYXkoeCwgYWxsb3dlZFBhcmFtcykgPCAwKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHF1ZXJ5UGFyYW1zW3hdOyAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBjX3BhcmFtcyA9ICQuZXh0ZW5kKHRydWUsIHt9LCBxdWVyeVBhcmFtcyk7XG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IFwidXRtX3BhcmFtcz1cIiArIEpTT04uc3RyaW5naWZ5KGNfcGFyYW1zKSArIFwiO3BhdGg9L1wiO1xuICAgIH1cbn1cbmFiYW5hbHl0aWNzLmdlbmVyYXRlVG9rZW4gPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcXVlcnlTdHIgPSBhYmFuYWx5dGljcy5zZXRVdG1QYXJhbXMoJ3RyYWNrZXInLCAnJyk7XG4gICAgdmFyIHV0bV9jYW1wYWlnbiA9IHF1ZXJ5U3RyWyd1dG1fY2FtcGFpZ24nXTtcblxuICAgIGlmICh1dG1fY2FtcGFpZ24gPT0gc2V0dGluZ3MuZGVmYXVsdFV0bVRva2VuKSB7XG4gICAgICAgIHV0bV9jYW1wYWlnbiA9IHNldHRpbmdzLmRlZmF1bHRDYW1JZDtcbiAgICB9XG4gICAgLy92YXIgdGFyZ2V0VVJMID0gc2V0dGluZ3MuYXBpVVJMICsgXCIvdXRtcGFyYW1zL2dlbmVyYXRlXCIgKyBxdWVyeVN0ciArIFwiJmNsaWVudD1cIitzZXR0aW5ncy5jbGllbnQrXCImYWNjZXNzX3Rva2VuPVwiK3NldHRpbmdzLmFwaUFjY2Vzc1Rva2VuO1xuICAgIHZhciB0YXJnZXRVUkwgPSBzZXR0aW5ncy5hcGlVUkwgKyAnL3RyYW5zbGF0ZSc7XG4gICAgLy92YXIgdGFyZ2V0VVJMID0gXCJodHRwOi8vYWIuYW1wdXNoLmRlc2lnbi91dG1wYXJhbXMvZ2VuZXJhdGVcIjtcbiAgICBhYmFuYWx5dGljcy5zZXRVdG1QYXJhbXMoJycsIHNldHRpbmdzLmRlZmF1bHRVdG1Ub2tlbik7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiB0YXJnZXRVUkwsXG4gICAgICAgIFwibWV0aG9kXCI6IFwicG9zdFwiLFxuICAgICAgICBkYXRhOiB7IGlkOiB1dG1fY2FtcGFpZ24gfSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICB1dG1Ub2tlbiA9IHJlc3VsdC5hbXBfaWQ7XG4gICAgICAgICAgICBhYmFuYWx5dGljcy5zZXRVdG1QYXJhbXMoJ2FtcFJlc3BvbnNlJywgdXRtVG9rZW4pO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oeGhyLCBhamF4T3B0aW9ucywgdGhyb3duRXJyb3IpIHtcbiAgICAgICAgICAgIGFiYW5hbHl0aWNzLnNldFV0bVBhcmFtcygnYW1wUmVzcG9uc2UnLCB1dG1Ub2tlbik7XG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbih4aHIsIHN0YXR1cykge1xuICAgICAgICAgICAgc2V0QnJvd3NlckJhcih1dG1Ub2tlbik7XG4gICAgICAgIH0sXG4gICAgICAgIHRpbWVvdXQ6IDUwMDBcbiAgICB9KTtcblxufVxuXG5cbmZ1bmN0aW9uIHNldEJyb3dzZXJCYXIodXRtVG9rZW4pIHtcbiAgICB2YXIgcGF0aHMgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgdmFyIGZpbGVuYW1lID0gcGF0aHMuc3BsaXQoXCIvXCIpLnBvcCgpO1xuICAgIHZhciB1cGRhdGVkcGF0aCA9IFwiXCI7XG4gICAgLy8gaWYgKGZpbGVuYW1lLmluZGV4T2YoXCJpbmRleC1cIikgPiAtMSAmJiBmaWxlbmFtZSAhPSAnaW5kZXgtRC5odG1sJyAmJiBmaWxlbmFtZSAhPSAnaW5kZXgtQy5odG1sJylcbiAgICAvLyAgICAgdmFyIHVwZGF0ZWRwYXRoID0gXCIvXCI7ICAgIFxuICAgIGlmICh0eXBlb2YgcmVwbGFjZVN0YXRlIT1cInVuZGVmaW5lZFwiICYmIHJlcGxhY2VTdGF0ZSA9PSB0cnVlKVxuICAgICAgICB2YXIgdXBkYXRlZHBhdGggPSBcIi9cIjsgICAgXG4gICAgdmFyIFBhcmFtc0FwcGVuZGVkID0gYWJhbmFseXRpY3Muc2V0VXRtUGFyYW1zKCdyZXR1cm5Ccm93c2VyUGFyYW1zJywgdXRtVG9rZW4pO1xuICAgIGhpc3RvcnkucmVwbGFjZVN0YXRlKHt9LCBkb2N1bWVudC50aXRsZSwgdXBkYXRlZHBhdGggKyBQYXJhbXNBcHBlbmRlZCk7XG4gICAgLy89cmVtb3ZlIGV2ZW50IGZpcmVkXG4gICAgLy90cmFjay5maXJlQ3VzdG9tUGl4ZWwodXRtVG9rZW4pO1xuICAgIGlmICh0eXBlb2YgZmlyZU91dGJyYWluICE9PSAndW5kZWZpbmVkJyAmJiAkLmlzRnVuY3Rpb24oZmlyZU91dGJyYWluKSkge1xuICAgICAgICBmaXJlT3V0YnJhaW4oMTAwKTsgXG4gICAgfVxufVxuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICBpZihnZXRDb29raWUoJ2Z1bGxzdG9yeV9mdW5uZWwnKSl7XG4gICAgICAgIGlmKGdldENvb2tpZSgnZnVsbHN0b3J5X2Z1bm5lbCcpID09ICd5ZXMnKVxuICAgICAgICAgICAgYWJhbmFseXRpY3MuZnVsbHN0b3J5X2luaXQoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJGdWxsIFN0b3J5LlhcIilcbiAgICB9ZWxzZSBpZih0eXBlb2YgRXhwUGFnZSE9XCJ1bmRlZmluZWRcIiAmJiBFeHBQYWdlID09IHRydWUpe1xuICAgICAgICBhYmFuYWx5dGljcy5mdWxsc3RvcnlpbnRlZ3JhdGlvbigpO1xuICAgIH1cbiAgICBhYmFuYWx5dGljcy5nZW5lcmF0ZVRva2VuKCk7XG59KTtcblxuXG5hYmFuYWx5dGljcy5oY0V4cGVyaW1lbnRlciA9IGZ1bmN0aW9uKG1fcGFyYW1zKSB7XG4gICAgaWYodHlwZW9mIGZ1bm5lbF9zdGVwX3JlcV9wYWdlID09IFwidW5kZWZpbmVkXCIgfHwgZnVubmVsX3N0ZXBfcmVxX3BhZ2UgPT0gXCJcIilcbiAgICAgICAgdmFyIGZ1bm5lbF9zdGVwX3JlcSA9ICdzdWJzY3JpYmVfcGFnZSc7XG4gICAgZWxzZVxuICAgICAgICB2YXIgZnVubmVsX3N0ZXBfcmVxID0gZnVubmVsX3N0ZXBfcmVxX3BhZ2U7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBzZXR0aW5ncy5oY0V4cFVSTCxcbiAgICAgICAgZGF0YTogeyBwYXJ0bmVyX2lkOiAnaHViYmxlJywgZnVubmVsX3N0ZXA6IGZ1bm5lbF9zdGVwX3JlcSB9LFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgIGlmKHR5cGVvZiByZXN1bHQudmFyaWFudF91cmwgIT0gJ3VuZGVmaW5lZCcgJiYgcmVzdWx0LnZhcmlhbnRfdXJsKXtcbiAgICAgICAgICAgICAgICAkKHNldHRpbmdzLmhjRXhwQ2xhc3MpLmF0dHIoJ2hyZWYnLHJlc3VsdC52YXJpYW50X3VybCk7XG4gICAgICAgICAgICAgICAgYWJhbmFseXRpY3MuYWRkUXVlcnlUb0FuY2hvcnMobV9wYXJhbXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oeGhyLCBhamF4T3B0aW9ucywgdGhyb3duRXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdoY0V4cGVyaW1lbnRlciBlcnJvcicpOyAgXG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbih4aHIsIHN0YXR1cykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2hjRXhwZXJpbWVudGVyIHN1Y2Nlc3MnKTsgXG4gICAgICAgIH0sXG4gICAgICAgIHRpbWVvdXQ6IDUwMDBcbiAgICB9KTtcbn1cblxuYWJhbmFseXRpY3MuZnVsbHN0b3J5aW50ZWdyYXRpb24gPSBmdW5jdGlvbigpe1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogc2V0dGluZ3MuaGNFeHBVUkwsXG4gICAgICAgIGRhdGE6IHsgcGFydG5lcl9pZDogJ2h1YmJsZScsIGZ1bm5lbF9zdGVwOiBzZXR0aW5ncy5mdWxsc3RvcnlmcyB9LFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgIC8vcmVzdWx0LnZhcmlhbnRfdXJsID0gXCJ0cnVlXCI7XG4gICAgICAgICAgICBpZih0eXBlb2YgcmVzdWx0LnZhcmlhbnRfdXJsICE9ICd1bmRlZmluZWQnICYmIHJlc3VsdC52YXJpYW50X3VybD09XCJ0cnVlXCIpe1xuICAgICAgICAgICAgICAgIEZTc3RhcnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGFiYW5hbHl0aWNzLmZ1bGxzdG9yeV9pbml0KCk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuY29va2llID0gXCJmdWxsc3RvcnlfZnVubmVsPXllcztwYXRoPS9cIjtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZnVsbHN0b3J5IHRydWUnKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IFwiZnVsbHN0b3J5X2Z1bm5lbD1ubztwYXRoPS9cIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKHhociwgYWpheE9wdGlvbnMsIHRocm93bkVycm9yKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5jb29raWUgPSBcImZ1bGxzdG9yeV9mdW5uZWw9OyBleHBpcmVzPVRodSwgMTggRGVjIDIwMTMgMTI6MDA6MDAgVVRDO3BhdGg9L1wiO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Z1bGxzdG9yeSBlcnJvcicpOyAgXG4gICAgICAgIH0sXG4gICAgICAgIHRpbWVvdXQ6IDUwMDBcbiAgICB9KTtcbn1cblxuXG5hYmFuYWx5dGljcy5mdWxsc3RvcnlfaW5pdCA9IGZ1bmN0aW9uKCl7XG4gICAgd2luZG93WydfZnNfZGVidWcnXSA9IGZhbHNlO1xuICAgIHdpbmRvd1snX2ZzX2hvc3QnXSA9ICdmdWxsc3RvcnkuY29tJztcbiAgICB3aW5kb3dbJ19mc19vcmcnXSA9ICc3MEE2Sic7XG4gICAgd2luZG93WydfZnNfbmFtZXNwYWNlJ10gPSAnRlMnO1xuICAgIChmdW5jdGlvbihtLG4sZSx0LGwsbyxnLHkpe1xuICAgICAgICBpZiAoZSBpbiBtKSB7aWYobS5jb25zb2xlICYmIG0uY29uc29sZS5sb2cpIHsgbS5jb25zb2xlLmxvZygnRnVsbFN0b3J5IG5hbWVzcGFjZSBjb25mbGljdC4gUGxlYXNlIHNldCB3aW5kb3dbXCJfZnNfbmFtZXNwYWNlXCJdLicpO30gcmV0dXJuO31cbiAgICAgICAgZz1tW2VdPWZ1bmN0aW9uKGEsYil7Zy5xP2cucS5wdXNoKFthLGJdKTpnLl9hcGkoYSxiKTt9O2cucT1bXTtcbiAgICAgICAgbz1uLmNyZWF0ZUVsZW1lbnQodCk7by5hc3luYz0xO28uc3JjPSdodHRwczovLycrX2ZzX2hvc3QrJy9zL2ZzLmpzJztcbiAgICAgICAgeT1uLmdldEVsZW1lbnRzQnlUYWdOYW1lKHQpWzBdO3kucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobyx5KTtcbiAgICAgICAgZy5pZGVudGlmeT1mdW5jdGlvbihpLHYpe2cobCx7dWlkOml9KTtpZih2KWcobCx2KX07Zy5zZXRVc2VyVmFycz1mdW5jdGlvbih2KXtnKGwsdil9O1xuICAgICAgICBnLmlkZW50aWZ5QWNjb3VudD1mdW5jdGlvbihpLHYpe289J2FjY291bnQnO3Y9dnx8e307di5hY2N0SWQ9aTtnKG8sdil9O1xuICAgICAgICBnLmNsZWFyVXNlckNvb2tpZT1mdW5jdGlvbihjLGQsaSl7aWYoIWMgfHwgZG9jdW1lbnQuY29va2llLm1hdGNoKCdmc191aWQ9W2A7YF0qYFtgO2BdKmBbYDtgXSpgJykpe1xuICAgICAgICBkPW4uZG9tYWluO3doaWxlKDEpe24uY29va2llPSdmc191aWQ9O2RvbWFpbj0nK2QrXG4gICAgICAgICc7cGF0aD0vO2V4cGlyZXM9JytuZXcgRGF0ZSgwKS50b1VUQ1N0cmluZygpO2k9ZC5pbmRleE9mKCcuJyk7aWYoaTwwKWJyZWFrO2Q9ZC5zbGljZShpKzEpfX19O1xuICAgIH0pKHdpbmRvdyxkb2N1bWVudCx3aW5kb3dbJ19mc19uYW1lc3BhY2UnXSwnc2NyaXB0JywndXNlcicpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBhYmFuYWx5dGljcyA6IGFiYW5hbHl0aWNzLFxuICAgIGdldENvb2tpZSA6IGdldENvb2tpZSxcbiAgICB1dG1Ub2tlbiA6IHNldHRpbmdzLmRlZmF1bHRVdG1Ub2tlblxufVxuXG4iXX0=
},{"jquery":19}],32:[function(require,module,exports){
'use strict';

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _jquerySelectric = require('jquery-selectric');

var _jquerySelectric2 = _interopRequireDefault(_jquerySelectric);

var _abanalytics = require('./abanalytics.js');

var _abanalytics2 = _interopRequireDefault(_abanalytics);

var _track = require('./track.js');

var _track2 = _interopRequireDefault(_track);

var _bloodhoundJs = require('bloodhound-js');

var _bloodhoundJs2 = _interopRequireDefault(_bloodhoundJs);

var _bootstrap3Typeahead = require('bootstrap-3-typeahead');

var _bootstrap3Typeahead2 = _interopRequireDefault(_bootstrap3Typeahead);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.jQuery = window.$ = _jquery2.default;

require('./../js/jquery-ui.min.js');

var getCookie = _abanalytics2.default.getCookie;


var objectForValidations = {};
var eventFiredStepOne = { leftEye: false, rightEye: false };
var eventFiredStepTwo = { homeState: false };
var cookieValues = { leftEye: "", rightEye: "", homeStateId: "", homeState: "", docList: "", currentState: 0, finalSearchValue: "" };
var leftEye = cookieValues.leftEye,
    rightEye = cookieValues.rightEye;

// console.log(site_q)
// var emailValues = { leftEye: "", rightEye: "", homeStateId: "", homeState: "", currentState: 0};
// var querystring = getQueryParams(site_q);

//=================code to check upper string
// if (getCookie("cookieValuesDetailed") != "") {
//     var getFilledDetail = JSON.parse(getCookie("cookieValuesDetailed"));
//     for(tmp in getFilledDetail){
//         if(querystring.hasOwnProperty(tmp))
//             getFilledDetail[tmp] = querystring[tmp]
//     }
//     console.log(getFilledDetail)
//     document.cookie = "cookieValuesDetailed=" + JSON.stringify(getFilledDetail) + ";  path=/";
// }else{
//     for(tmp in emailValues){
//         if(querystring.hasOwnProperty(tmp))
//             cookieValues[tmp] = querystring[tmp]
//     }
//     document.cookie = "cookieValuesDetailed=" + JSON.stringify(cookieValues) + ";  path=/";
// }
//============================

var mIndexState = {};
//=array for doctor
var doctors = new Array();
var selectedList = "";
(0, _jquery2.default)(function () {
    (0, _jquery2.default)("#step1").hide();

    (0, _jquery2.default)("#tabs").tabs({
        create: function create(event, ui) {}
    });

    (0, _jquery2.default)('select').selectric({
        maxHeight: 300
    });

    //=maintaining data index for this
    var mIndex = {};
    var xyz = (0, _jquery2.default)(".selectric-scroll ul")[0];
    (0, _jquery2.default)((0, _jquery2.default)(xyz).find("li")).each(function () {
        (0, _jquery2.default)(this).attr("data-index");
        mIndex[(0, _jquery2.default)(this).text()] = (0, _jquery2.default)(this).attr("data-index");
    });

    setTimeout(function () {
        var xyzState = (0, _jquery2.default)(".selectric-scroll ul")[2];

        (0, _jquery2.default)((0, _jquery2.default)(xyzState).find("li")).each(function () {
            (0, _jquery2.default)(this).attr("data-index");
            mIndexState[(0, _jquery2.default)(this).text()] = (0, _jquery2.default)(this).attr("data-index");
        });
    }, 0);

    //=======disable all the tabs initially other than 0
    (0, _jquery2.default)("#tabs").tabs("option", "disabled", [1, 2]);

    //===========
    (0, _jquery2.default)('#leftEye, #rightEye').selectric().on('change', function () {
        (0, _jquery2.default)(this).attr("id") == "leftEye" && eventFiredStepOne.leftEye == false ? (_track2.default.customEventFire("LeftEyePrescription"), eventFiredStepOne.leftEye = true) : "";
        (0, _jquery2.default)(this).attr("id") == "rightEye" && eventFiredStepOne.rightEye == false ? (_track2.default.customEventFire("RightEyePrescription"), eventFiredStepOne.rightEye = true) : "";
        //=====handling cookie
        if ((0, _jquery2.default)(this).attr("id") == "leftEye") {
            var value = (0, _jquery2.default)(this).val();
            if ((0, _jquery2.default)(this).val() > 0) value = '+' + (0, _jquery2.default)(this).val();

            cookieValues.leftEye = mIndex[value];
            document.cookie = 'cookieValuesDetailed=' + JSON.stringify(cookieValues) + ';  path=/';
        }
        if ((0, _jquery2.default)(this).attr("id") == "rightEye") {
            var value = (0, _jquery2.default)(this).val();
            if ((0, _jquery2.default)(this).val() > 0) value = '+' + (0, _jquery2.default)(this).val();
            cookieValues.rightEye = mIndex[value];
            document.cookie = 'cookieValuesDetailed=' + JSON.stringify(cookieValues) + ';  path=/';
        }

        (0, _jquery2.default)("#leftSelected").text((0, _jquery2.default)("#leftEye").val());
        (0, _jquery2.default)("#rightSelected").text((0, _jquery2.default)("#rightEye").val());
        objectForValidations.formOneValidation();
    });

    (0, _jquery2.default)("#tabs").tabs({
        show: { effect: "fade", duration: 200 },
        activate: function activate(event, ui) {
            _track2.default.customEventFire("firePageView");
            var checkIndex = getIndex();
            cookieValues.currentState = checkIndex;
            document.cookie = 'cookieValuesDetailed=' + JSON.stringify(cookieValues) + ';  path=/';
            if (checkIndex == 0) {
                eventFiredStepOne = { leftEye: false, rightEye: false };
            }
            if (checkIndex == 1) eventFiredStepTwo = { homeState: false };
            if (checkIndex == 2) {
                document.getElementById("leftSelected").innerHTML = (0, _jquery2.default)("#leftEye").val() > 0 ? '+' + (0, _jquery2.default)("#leftEye").val() : (0, _jquery2.default)("#leftEye").val();
                document.getElementById("rightSelected").innerHTML = (0, _jquery2.default)("#rightEye").val() > 0 ? '+' + (0, _jquery2.default)("#rightEye").val() : (0, _jquery2.default)("#rightEye").val();
                // $("#leftSelected").text($("#leftEye").val())
                // $("#rightSelected").text($("#rightEye").val())
            }
        }
    });

    (0, _jquery2.default)("#step1").animate({ opacity: 1 }, 1500);

    if (getCookie("cookieValuesDetailed") != "") {
        var getFilledDetail = JSON.parse(getCookie("cookieValuesDetailed"));
        fillTheDetailandCheck(getFilledDetail);
    }
});

function enablityTabOption(whichone) {
    //function enablityTabOption(...whichone){
    // for(let tmp of whichone){
    //     console.log(whichone[tmp])
    //     $(".steps").find("a[href='#step"+whichone[tmp]+"'] div").addClass("done");
    //     $("#tabs").tabs("enable", whichone[tmp]);
    // }
    for (var tmp in whichone) {
        (0, _jquery2.default)(".steps").find('a[href=\'#step' + whichone[tmp] + '\'] div').addClass("done");
        (0, _jquery2.default)("#tabs").tabs("enable", whichone[tmp]);
    }
}

function selectingCookieSelectedList() {
    var selectedListCookie = getCookie("selectedList");
    var removeEx = new RegExp("'<div", 'g');
    selectedListCookie = selectedListCookie.replace(removeEx, '<div');
    var removeEx = new RegExp("/div>'", 'g');
    selectedListCookie = selectedListCookie.replace(removeEx, '/div>');
    return selectedListCookie;
}

function fillTheDetailandCheck(getFilledDetail) {
    if (getFilledDetail.currentState == 2) {
        enablityTabOption([1, 2]);
    } else if (getFilledDetail.currentState == 1) {
        enablityTabOption([1]);
    }
    if (getCookie("selectedList") != "") {
        if (getFilledDetail.currentState > 0) enablityTabOption([1]);
        var selectedListCookie = selectingCookieSelectedList();
        // var removeEx = new RegExp("'<div", 'g');
        // selectedListCookie = selectedListCookie.replace(removeEx, '<div');
        // var removeEx = new RegExp("/div>'", 'g');
        // selectedListCookie = selectedListCookie.replace(removeEx, '/div>');
        (0, _jquery2.default)(".reviews .desc").last().html(selectedListCookie);
        selectedList = getCookie("selectedList");
    }

    //====activating current state for the tab
    (0, _jquery2.default)("#tabs").tabs({
        active: getFilledDetail.currentState
    });

    if (getFilledDetail.leftEye != "") {
        (0, _jquery2.default)('#leftEye').prop('selectedIndex', getFilledDetail.leftEye).selectric('refresh');
        cookieValues.leftEye = getFilledDetail.leftEye;
    }
    if (getFilledDetail.rightEye != "") {
        (0, _jquery2.default)('#rightEye').prop('selectedIndex', getFilledDetail.rightEye).selectric('refresh');
        cookieValues.rightEye = getFilledDetail.rightEye;
    }
    if (getFilledDetail.homeStateId != "") {
        (0, _jquery2.default)('#searchDoctor').prop('selectedIndex', getFilledDetail.homeStateId).selectric('refresh');
        cookieValues.homeStateId = getFilledDetail.homeStateId;
        cookieValues.homeState = getFilledDetail.homeState;
        getDoctorList(getFilledDetail.homeState);
        if (typeof docListthValue == "undefined") (0, _jquery2.default)(".findDoctor").removeClass("loader");
    }
    if (getFilledDetail.docList != "") {
        var selectedListCookie = selectingCookieSelectedList();
        (0, _jquery2.default)("#findyourdoctor").removeClass("disableThis");
        //$("#docListth").val("arc")
        (0, _jquery2.default)("#SearchDoc").removeClass("disableThis");
        (0, _jquery2.default)("#SearchDoc ul li").html(selectedListCookie);
        (0, _jquery2.default)("#SearchDoc ul li").append('<div class="deleteSearch"><img src="images/delete_icon.png" alt="" /></div>');
        (0, _jquery2.default)("#docListHidden").val(getFilledDetail.docList);
        (0, _jquery2.default)(".nextStepButton[data-CrStepNo='1']").removeClass("disableThis");
        //$(".findDoctor").addClass("optionSelected");
        if (getFilledDetail.currentState == 2) {
            (0, _jquery2.default)("#leftSelected").text((0, _jquery2.default)("#leftEye").val());
            (0, _jquery2.default)("#rightSelected").text((0, _jquery2.default)("#rightEye").val());
        }
        if (typeof docListthValue != "undefined" && docListthValue) (0, _jquery2.default)('.findDoctor').removeClass('loader');
        cookieValues.docList = getFilledDetail.docList;
        cookieValues.finalSearchValue = getFilledDetail.finalSearchValue;
    }
    document.cookie = 'cookieValuesDetailed=' + JSON.stringify(cookieValues) + ';  path=/';
}

//===return the index of active tab
function getIndex() {
    return (0, _jquery2.default)("ul li.ui-state-active").index();
}

//=bold the selected string as per regular expression
function boldString(str, find) {
    var re = new RegExp(find, 'g');
    var rei = new RegExp(find, 'i');
    if (str.match(rei) != null && str.match(rei).length) return str.replace(rei, '<b>' + str.match(rei)[0] + '</b>');
    return str.replace(re, '<b>' + find + '</b>');
}

function responsive_typeahead(data, term) {
    //console.log(data)
    var address = data.address[0] + ', ' + data.address[1] + ' ' + data.address[2];
    var name = data.name;
    var clinic_name = data.clinic_name;
    addressHidden = address;
    address = address;
    var docId = data.id;

    return '<li class="doclistSelect1"><div class="searchName">' + name + '</div><div class="searchHos">' + clinic_name + '</div><div class="searchCity" >' + address + '</div><div class="disableThis"><div class="searchNameHidden">' + data.name + '</div><div class="searchHosHidden">' + data.clinic_name + '</div><div class="searchCityHidden">' + addressHidden + '</div><div class="searchId" style="display:none">' + docId + '</div></div></li>';
}

function bloodhound() {

    var results = new _bloodhoundJs2.default({
        datumTokenizer: function datumTokenizer(data) {

            return _bloodhoundJs2.default.tokenizers.whitespace(data.name).concat(_bloodhoundJs2.default.tokenizers.whitespace(data.clinic_name)).concat(_bloodhoundJs2.default.tokenizers.whitespace(data.city)).concat(_bloodhoundJs2.default.tokenizers.whitespace(data.state)).concat(_bloodhoundJs2.default.tokenizers.whitespace(data.postcode));
        },

        queryTokenizer: _bloodhoundJs2.default.tokenizers.whitespace,
        local: doctors

    });

    results.initialize();

    return results;
}

function typeaheadcheck() {
    var $doctor_searches = (0, _jquery2.default)("#docListth");
    $doctor_searches.val("");
    if (!$doctor_searches.length) return;

    $doctor_searches.each(function (index, doctor_search) {

        var $doctor_search = (0, _jquery2.default)(doctor_search);

        $doctor_search.typeahead('destroy');

        $doctor_search.typeahead({
            classNames: {
                menu: 'tt-menu1'
            },
            hint: true,
            highlight: true,
            minLength: 2

        }, {
            name: 'results',
            displayKey: 'results',
            source: bloodhound().ttAdapter(),
            limit: 100,
            templates: {
                suggestion: function suggestion(data) {
                    return '<ul class="doclistSelect">' + responsive_typeahead(data) + '</ul>';
                },

                empty: [''].join('\n')

            }

        }).on('typeahead:select', function (e, data) {
            cookieValues.finalSearchValue = (0, _jquery2.default)('#docListth').typeahead('val');
        }).on('typeahead:change', function (e, data) {
            cookieValues.finalSearchValue = (0, _jquery2.default)('#docListth').typeahead('val');
        });
    });
}

function extend(obj, src) {
    for (var key in src) {
        if (src.hasOwnProperty(key)) obj[key] = src[key];
    }
    return obj;
}

function getDoctorList(state) {
    (0, _jquery2.default)("#docList1").on("keyup", function () {
        if ((0, _jquery2.default)(this).val().length > 1) {
            (0, _jquery2.default)("#docList").val((0, _jquery2.default)(this).val());
            //var abc = $(this).val().split(" ");

            (0, _jquery2.default)("#docList").customcomplete("search", (0, _jquery2.default)(this).val().trim());
        } else {
            removeDocList();
        }
    });
    if (typeof docListthValue != "undefined" && docListthValue) (0, _jquery2.default)(".listLink").addClass("disableThis");
    (0, _jquery2.default)(".findDoctor").addClass("loader");
    _jquery2.default.ajax({
        type: "get",
        url: "https://api.hubblecontacts.com/v1/docs/search.js",
        data: { state: state },
        contentType: 'application/json; charset=utf-8',
        dataType: 'JSONP',
        success: function success(res) {
            if (typeof docListthValue == "undefined") (0, _jquery2.default)("#findyourdoctor, .listLink").removeClass("disableThis");else {
                (0, _jquery2.default)("#findyourdoctor").removeClass("disableThis");
            }
            (0, _jquery2.default)(".findDoctor").removeClass("loader");
            console.log("success");
            doctors = res.data.docs;
            _jquery2.default.each(doctors, function (index, value) {
                doctors[index].label = ' ' + doctors[index].name + ' ' + doctors[index].clinic_name + ' ' + doctors[index].address_1 + ' ' + doctors[index].city + ' ' + doctors[index].phone + ' ' + doctors[index].postcode;
                if (doctors[index].name == undefined) {
                    doctors[index].name = '';
                }
                if (doctors[index].clinic_name == undefined || doctors[index].clinic_name == '') {
                    doctors[index].clinic_name = doctors[index].address_1;
                }

                if (doctors[index].city == undefined) {
                    doctors[index].city = '';
                }

                if (doctors[index].state == undefined) {
                    doctors[index].state = '';
                }

                if (doctors[index].postcode == undefined) {
                    doctors[index].postcode = '';
                }

                if (doctors[index].phone == undefined) {
                    doctors[index].phone = '';
                }

                doctors[index].address = [doctors[index].city, doctors[index].state, doctors[index].postcode];
            });
            bloodhound();

            typeaheadcheck();
            if (typeof docListthValue != "undefined" && docListthValue) {
                (0, _jquery2.default)("#docListth").focus();
            }
        },

        timeout: 15000,
        error: function error(res) {
            console.log(res);
        }
    });
}

//=object strrt for validations
objectForValidations.formOneValidation = function () {
    (0, _jquery2.default)('.left_eye').removeClass('error');
    (0, _jquery2.default)('.right_eye').removeClass('error');
    if ((0, _jquery2.default)("#leftEye").val() != null && (0, _jquery2.default)("#leftEye").val() != "" && (0, _jquery2.default)("#rightEye").val() != null && (0, _jquery2.default)("#rightEye").val() != "") {
        (0, _jquery2.default)(".nextStepButton[data-CrStepNo='0']").removeClass("disableNext");
        (0, _jquery2.default)('.form_error_msg').addClass('hide');
        return true;
    }
    setTimeout(function () {
        if (!(0, _jquery2.default)(".form_error_msg").hasClass("hide")) {
            if ((0, _jquery2.default)("#leftEye").val() == null || (0, _jquery2.default)("#leftEye").val() == "") {
                (0, _jquery2.default)('.left_eye').addClass('error');
            }
            if ((0, _jquery2.default)("#rightEye").val() == null || (0, _jquery2.default)("#rightEye").val() == "") {
                (0, _jquery2.default)('.right_eye').addClass('error');
            }
        }
    }, 10);
    return false;
};

objectForValidations.formTwoValidation = function () {
    if ((0, _jquery2.default)("#docListHidden").val() != "") {
        (0, _jquery2.default)(".steps").find("a[href='#step2'] div").addClass("done");
        var selectedListCookie = selectingCookieSelectedList();
        (0, _jquery2.default)(".reviews .desc").last().html(selectedListCookie);
        (0, _jquery2.default)("#leftSelected").text((0, _jquery2.default)("#leftEye").val());
        (0, _jquery2.default)("#rightSelected").text((0, _jquery2.default)("#rightEye").val());
        return true;
    }
    return false;
};

function removeDocList() {
    var $ulforSearch = (0, _jquery2.default)(".tt-menu1 ul");
    (0, _jquery2.default)(".tt-menu1").addClass("disableThis");
    $ulforSearch.each(function () {
        (0, _jquery2.default)(this).html("");
    });

    if ((0, _jquery2.default)("#docListHidden").val() != "") (0, _jquery2.default)(".nextStepButton[data-CrStepNo='1']").removeClass("disableThis");
}

(0, _jquery2.default)(document).on('keyup', '#docListth', function (ev) {
    (0, _jquery2.default)(".tt-menu1").removeClass("disableThis");
    if ((0, _jquery2.default)(this).val().trim().length > 0 && typeof docListthValue != "undefined" && docListthValue) (0, _jquery2.default)(".listLink").removeClass("disableThis");else if (typeof docListthValue != "undefined" && docListthValue) (0, _jquery2.default)(".listLink").addClass("disableThis");
});

//========clicking of next button
(0, _jquery2.default)(document).on("click", ".nextStepButton", function (e) {
    console.log(e);
    var currentIndex = getIndex();
    if (currentIndex == 0) {
        var formValidation = objectForValidations.formOneValidation();
        if (formValidation) {
            (0, _jquery2.default)(".steps").find("a[href='#step1'] div").addClass("done");
            //==================tracking events

            _track2.default.customEventFire("SubscribeRxToSubscribeDoctor,SubscribeDoctorPageVisit");

            //}
        } else {
            (0, _jquery2.default)('.form_error_msg').removeClass('hide');
        }
    } else if (currentIndex == 1) {
        var formValidation = objectForValidations.formTwoValidation();
        _track2.default.customEventFire("SubscribeDoctorToSubscribeReview,SubscribeReviewPageVisit");
    }
    var activateStepNo = parseInt((0, _jquery2.default)(this).attr("data-EnStepNo"));
    //var disableStepNo = $(this).attr("data-DisStepNo")
    if (currentIndex < 2 && formValidation == true) {
        //var rel = $(this).attr('rel');
        //track.customEventFire(rel);
        (0, _jquery2.default)("#tabs").tabs("enable", activateStepNo);
        (0, _jquery2.default)("#tabs").tabs({
            active: activateStepNo
        });
        (0, _jquery2.default)('html, body').animate({
            scrollTop: (0, _jquery2.default)("header").offset().top
        }, 1000);
    }
});

var dragging = false;
//=======on click of li on step 2
(0, _jquery2.default)(document).on("click touchend", ".doclistSelect", function (e) {

    e.stopPropagation();
    e.preventDefault();
    if (dragging == false) {
        cookieValues.finalSearchValue = (0, _jquery2.default)('#docListth').typeahead('val');
        var htmlSelected = (0, _jquery2.default)(this).find(".disableThis").html();
        selectedList = htmlSelected;

        var rStrong = new RegExp('<strong class="tt-highlight">|</strong>', "g");
        selectedList = selectedList.replace(rStrong, "");

        var rAmp = new RegExp('&amp;', "g");
        selectedList = selectedList.replace(rAmp, "&");

        document.cookie = 'selectedList=\'' + selectedList + '\'; path=/';
        var Docid = (0, _jquery2.default)((0, _jquery2.default)(htmlSelected)[3]).text();
        console.log(Docid + ' hiddenId');
        (0, _jquery2.default)("#docListHidden").val(Docid);
        cookieValues.docList = Docid;
        document.cookie = 'cookieValuesDetailed=' + JSON.stringify(cookieValues) + ';  path=/';
        //htmlSelected = $(htmlSelected).append('<div class="deleteSearch"><img src="images/delete_icon.png" alt="" /></div>')
        (0, _jquery2.default)("#SearchDoc").removeClass("disableThis");
        (0, _jquery2.default)("#SearchDoc ul li").html("");
        (0, _jquery2.default)("#SearchDoc ul li").html(selectedList);
        //removeDocList();
        (0, _jquery2.default)(".tt-menu1").addClass("disableThis");
        (0, _jquery2.default)(".tt-menu1").css("display", "none");

        (0, _jquery2.default)("#docListth").blur();
        //=adding delete button
        (0, _jquery2.default)("#SearchDoc ul li").append('<div class="deleteSearch"><img src="images/delete_icon.png" alt="" /></div>');
        (0, _jquery2.default)(".findDoctor").addClass("optionSelected");
        if ((0, _jquery2.default)("#docListHidden").val() != "") {

            (0, _jquery2.default)(".nextStepButton[data-CrStepNo='1']").removeClass("disableThis");
        }
        if (typeof docListthValue != "undefined" && docListthValue) (0, _jquery2.default)(".listLink").addClass("disableThis");
        _track2.default.customEventFire("DoctorSelected");
    }
});

//===========drag and drop handling for mobile
(0, _jquery2.default)(document).on("touchmove", ".doclistSelect", function (e) {
    dragging = true;
});

(0, _jquery2.default)(document).on("touchend", ".doclistSelect", function (e) {
    if (dragging) return;
});

(0, _jquery2.default)(document).on("touchstart", ".doclistSelect", function (e) {
    dragging = false;
});

//===========drag and drop handling for mobile


(0, _jquery2.default)(document).on("click", ".deleteSearch", function () {
    (0, _jquery2.default)("#SearchDoc").addClass("disableThis");
    (0, _jquery2.default)("#SearchDoc ul li").html("");
    (0, _jquery2.default)("#docListHidden").val("");
    (0, _jquery2.default)(".nextStepButton[data-CrStepNo='1']").addClass("disableThis");
    if ((0, _jquery2.default)(".steps").find("a[href='#step2'] div").hasClass("done")) {
        (0, _jquery2.default)(".steps").find("a[href='#step2'] div").removeClass("done");
        (0, _jquery2.default)("#tabs").tabs("option", "disabled", [2]);
    }
    cookieValues.docList = "";
    document.cookie = 'cookieValuesDetailed=' + JSON.stringify(cookieValues) + ';  path=/';
    document.cookie = "selectedList=; expires=Thu, 18 Dec 2013 12:00:00 UTC";
    //removeDocList();
    if ((0, _jquery2.default)(".tt-menu1 .tt-dataset-results ul").length > 0) {
        (0, _jquery2.default)(".tt-menu1").removeClass("disableThis");
        (0, _jquery2.default)(".tt-menu1").css("display", "block");
    } else (0, _jquery2.default)('#docListth').typeahead('val', cookieValues.finalSearchValue).focus();
    (0, _jquery2.default)(".findDoctor").removeClass("optionSelected");

    if (typeof docListthValue != "undefined" && docListthValue && (0, _jquery2.default)("#docListth").val().trim().length > 0) {
        (0, _jquery2.default)(".listLink").removeClass("disableThis");
    } else if (typeof docListthValue != "undefined" && docListthValue && (0, _jquery2.default)("#docListth").val().trim().length == 0) {
        (0, _jquery2.default)(".listLink").addClass("disableThis");
    }
});

//========clicking of edit button
(0, _jquery2.default)(document).on("click", ".edit", function () {
    (0, _jquery2.default)("#tabs").tabs("option", "disabled", []);
    (0, _jquery2.default)('.' + (0, _jquery2.default)(this).attr('rel')).click();
});

//========clicking to checkout button
(0, _jquery2.default)(document).on("click", ".goToCheckout", function () {
    var bridgeUrl = bridgeUrlSelector;
    var doctor_id = (0, _jquery2.default)("#docListHidden").val();
    var right_eye = (0, _jquery2.default)("#leftEye").val();
    var left_eye = (0, _jquery2.default)("#rightEye").val();
    var attributeValues = '&doctor_id=' + doctor_id + '&right_power=' + right_eye + '&left_power=' + left_eye;
    var utm_parms = _abanalytics2.default.setUtmParams("returnParams", utmToken);
    checkoutURL = bridgeUrl + utm_parms + attributeValues;
    document.location.href = checkoutURL;
});

(0, _jquery2.default)(document).on("change", "#searchDoctor", function () {
    eventFiredStepTwo.homeState == false ? (_track2.default.customEventFire("DoctorStateSelected"), eventFiredStepTwo.homeState = true) : "";
    var SelectedState = (0, _jquery2.default)("#searchDoctor").val();
    //var cookieValues = {leftEye:"", rightEye: "", homeStateId: "", homeState : "", docList: "", currentState : 0};
    cookieValues.homeStateId = mIndexState[SelectedState];
    cookieValues.homeState = SelectedState;
    document.cookie = 'cookieValuesDetailed=' + JSON.stringify(cookieValues) + ';  path=/';
    (0, _jquery2.default)(".deleteSearch").click();
    getDoctorList(SelectedState);
});

(0, _jquery2.default)(document).on("click", "#doctorIsnt", function () {
    _track2.default.customEventFire("DoctorNotListed");
    (0, _jquery2.default)("#doctorModal").fadeIn();
});

(0, _jquery2.default)(document).on("click", ".closeDialog", function () {
    (0, _jquery2.default)(".modalForm").removeClass("error");
    (0, _jquery2.default)("#modalError").addClass("hide");
    (0, _jquery2.default)("#modalErrorOne").addClass("hide");
    (0, _jquery2.default)("#doctorModal").fadeOut();
});

(0, _jquery2.default)(document).on("click", "body", function (e) {
    if ((0, _jquery2.default)("#doctorModal").css("display") == "block" && (0, _jquery2.default)(e.target).attr("class") == "overlayBg") {
        (0, _jquery2.default)(".modalForm").removeClass("error");
        (0, _jquery2.default)("#modalError").addClass("hide");
        (0, _jquery2.default)("#modalErrorOne").addClass("hide");
        (0, _jquery2.default)("#doctorModal").fadeOut();
    }
});

objectForValidations.formThreeModalValidation = function (docName, ClinicName, docCity, BdocName, BClinicName, BdocCity, checkall) {
    //===========docname handling
    if (docName != "" && docName.length >= minLengthReq[0]) {
        BdocName = 1;
        (0, _jquery2.default)("input[name='doctorName']").removeClass("error");
    } else if (checkall == 1) (0, _jquery2.default)("input[name='doctorName']").addClass("error");

    //===========ClinicName handling
    if (ClinicName != "" && ClinicName.length >= minLengthReq[1]) {
        BClinicName = 1;
        (0, _jquery2.default)("input[name='clinicName']").removeClass("error");
    } else if (checkall == 1) (0, _jquery2.default)("input[name='clinicName']").addClass("error");

    //===========docCity handling
    if (docCity != "" && docCity.length >= minLengthReq[2]) {
        BdocCity = 1;
        (0, _jquery2.default)("input[name='docCity']").removeClass("error");
    } else if (checkall == 1) (0, _jquery2.default)("input[name='docCity']").addClass("error");

    var myValues = '' + BdocName + BClinicName + BdocCity;
    return myValues;
};

var minLengthReq = new Array(5, 5, 3);
var validCombination = new Array("110", "011", "101", "111");

(0, _jquery2.default)(document).on("click", "#submitDoc", function () {
    var docName = (0, _jquery2.default)("input[name='doctorName']").val().trim();
    var ClinicName = (0, _jquery2.default)("input[name='clinicName']").val().trim();
    var docCity = (0, _jquery2.default)("input[name='docCity']").val().trim();
    var BdocName = 0;
    var BClinicName = 0;
    var BdocCity = 0;
    var myValues = objectForValidations.formThreeModalValidation(docName, ClinicName, docCity, BdocName, BClinicName, BdocCity, 1);

    //myValues = parseInt(myValues);

    if (_jquery2.default.inArray(myValues, validCombination) > -1) {
        _track2.default.customEventFire("DoctorAddedAndSelected");
        _track2.default.customEventFire("DoctorSelected");
        var newCreatedId = getNewlyCreatedDocId(docName, ClinicName, docCity);
    } else {
        var errorDisplay = "";
        (0, _jquery2.default)(".modalForm").each(function () {

            errorDisplay += (0, _jquery2.default)(this).val().trim().length;
        });
        //=-=========check which error  msg to show
        var abc = new RegExp("0", "g");
        if (errorDisplay.match(abc) != null && errorDisplay.match(abc).length >= 2) {
            (0, _jquery2.default)("#modalErrorOne").addClass("hide");
            (0, _jquery2.default)("#modalError").removeClass("hide");
        } else {
            (0, _jquery2.default)("#modalError").addClass("hide");
            (0, _jquery2.default)("#modalErrorOne").removeClass("hide");
        }
    }
});

(0, _jquery2.default)(document).on("keyup", ".modalForm", function () {
    var $name = (0, _jquery2.default)(this).attr("name");
    var InputName = (0, _jquery2.default)('input[name=\'' + $name + '\']').val().trim();
    var BdocName = 0;
    var BClinicName = 0;
    var BdocCity = 0;
    if ($name == "doctorName") var myValues = objectForValidations.formThreeModalValidation(InputName, "", "", BdocName, "", "", 0);else if ($name == "clinicName") var myValues = objectForValidations.formThreeModalValidation("", InputName, "", "", BClinicName, "", 0);else if ($name == "docCity") var myValues = objectForValidations.formThreeModalValidation("", "", InputName, "", "", BdocCity, 0);

    if (myValues == 1 && (0, _jquery2.default)('input[name=\'' + $name + '\']').hasClass("error")) {
        (0, _jquery2.default)('input[name=\'' + $name + '\']').removeClass("error");
    }

    //====enable disable button
    var docName = (0, _jquery2.default)("input[name='doctorName']").val().trim();
    var ClinicName = (0, _jquery2.default)("input[name='clinicName']").val().trim();
    var docCity = (0, _jquery2.default)("input[name='docCity']").val().trim();
    var BdocName = 0;
    var BClinicName = 0;
    var BdocCity = 0;
    var myValues = objectForValidations.formThreeModalValidation(docName, ClinicName, docCity, BdocName, BClinicName, BdocCity, 0);

    if (_jquery2.default.inArray(myValues, validCombination) > -1) {
        (0, _jquery2.default)("#submitDoc").removeClass("disableNext");
        (0, _jquery2.default)("#modalError").addClass("hide");
        (0, _jquery2.default)("#modalErrorOne").addClass("hide");
        (0, _jquery2.default)(".modalForm").removeClass("error");
    } else (0, _jquery2.default)("#submitDoc").addClass("disableNext");
});

function getNewlyCreatedDocId(docName, ClinicName, docCity) {
    var s = {
        name: docName,
        clinic_name: ClinicName,
        city: docCity,
        state: (0, _jquery2.default)("#searchDoctor").val()
        //state: "MD"
    };
    _jquery2.default.ajax({
        type: "post",
        url: "https://api.hubblecontacts.com/v1/docs/create.js",
        dataType: "JSONP",
        data: s,
        success: function success(res) {
            if (res.status == "success") {
                var docId = res.data.doc.id;
                (0, _jquery2.default)("#docListHidden").val(docId);
                var ElementAdded = '<div class ="searchNameHidden">' + docName + '</div>';
                ElementAdded += '<div class = "searchHosHidden">' + ClinicName + '</div>';
                ElementAdded += '<div class = "searchCityHidden" >' + docCity + '</div>';
                ElementAdded += '<div class = "searchId" style="display:none">' + docId + '</div >';
                selectedList = ElementAdded;
                document.cookie = 'selectedList=' + ElementAdded + '; path=/';
                ElementAdded += '<div class = "deleteSearch" ><img src = "images/delete_icon.png" alt = "" /></div>';
                (0, _jquery2.default)("#SearchDoc").removeClass("disableThis");
                (0, _jquery2.default)("#SearchDoc ul li").html("");
                (0, _jquery2.default)("#SearchDoc ul li").html(ElementAdded);
                cookieValues.docList = docId;
                cookieValues.finalSearchValue = "";
                document.cookie = 'cookieValuesDetailed=' + JSON.stringify(cookieValues) + ';  path=/';

                //removeDocList();
                (0, _jquery2.default)(".tt-menu1").addClass("disableThis");
                (0, _jquery2.default)(".tt-menu1").css("display", "none");
                if ((0, _jquery2.default)("#docListHidden").val() != "") (0, _jquery2.default)(".nextStepButton[data-CrStepNo='1']").removeClass("disableThis");
                (0, _jquery2.default)("#doctorModal").fadeOut();
                (0, _jquery2.default)(".modalForm").removeClass("error");
                (0, _jquery2.default)(".modalForm").each(function () {
                    (0, _jquery2.default)(this).val("");
                });
                (0, _jquery2.default)("#submitDoc").addClass("disableNext");
                if (typeof docListthValue != "undefined" && docListthValue) (0, _jquery2.default)(".listLink").addClass("disableThis");
            }
        },
        error: function error(t) {
            console.log("error"), console.log(t);
        }
    });
}

// $(document).on("click", "#archit", function(){
//     var email_params = $.extend(true, {}, cookieValues);
//     delete email_params["finalSearchValue"]
//     for(tmp in email_params){
//         if(email_params[tmp] == "")
//             delete email_params[tmp]
//     }
//     var xyz = window.location.href + "&" + $.param(email_params)
//     console.log(xyz)
// })
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImN1c3RvbS1zdWJzY3JpYmUtZm9ybS5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJqUXVlcnkiLCIkIiwicmVxdWlyZSIsImdldENvb2tpZSIsIm9iamVjdEZvclZhbGlkYXRpb25zIiwiZXZlbnRGaXJlZFN0ZXBPbmUiLCJsZWZ0RXllIiwicmlnaHRFeWUiLCJldmVudEZpcmVkU3RlcFR3byIsImhvbWVTdGF0ZSIsImNvb2tpZVZhbHVlcyIsImhvbWVTdGF0ZUlkIiwiZG9jTGlzdCIsImN1cnJlbnRTdGF0ZSIsImZpbmFsU2VhcmNoVmFsdWUiLCJtSW5kZXhTdGF0ZSIsImRvY3RvcnMiLCJBcnJheSIsInNlbGVjdGVkTGlzdCIsImhpZGUiLCJ0YWJzIiwiY3JlYXRlIiwiZXZlbnQiLCJ1aSIsInNlbGVjdHJpYyIsIm1heEhlaWdodCIsIm1JbmRleCIsInh5eiIsImZpbmQiLCJlYWNoIiwiYXR0ciIsInRleHQiLCJzZXRUaW1lb3V0IiwieHl6U3RhdGUiLCJvbiIsImN1c3RvbUV2ZW50RmlyZSIsInZhbHVlIiwidmFsIiwiZG9jdW1lbnQiLCJjb29raWUiLCJKU09OIiwic3RyaW5naWZ5IiwiZm9ybU9uZVZhbGlkYXRpb24iLCJzaG93IiwiZWZmZWN0IiwiZHVyYXRpb24iLCJhY3RpdmF0ZSIsImNoZWNrSW5kZXgiLCJnZXRJbmRleCIsImdldEVsZW1lbnRCeUlkIiwiaW5uZXJIVE1MIiwiYW5pbWF0ZSIsIm9wYWNpdHkiLCJnZXRGaWxsZWREZXRhaWwiLCJwYXJzZSIsImZpbGxUaGVEZXRhaWxhbmRDaGVjayIsImVuYWJsaXR5VGFiT3B0aW9uIiwid2hpY2hvbmUiLCJ0bXAiLCJhZGRDbGFzcyIsInNlbGVjdGluZ0Nvb2tpZVNlbGVjdGVkTGlzdCIsInNlbGVjdGVkTGlzdENvb2tpZSIsInJlbW92ZUV4IiwiUmVnRXhwIiwicmVwbGFjZSIsImxhc3QiLCJodG1sIiwiYWN0aXZlIiwicHJvcCIsImdldERvY3Rvckxpc3QiLCJkb2NMaXN0dGhWYWx1ZSIsInJlbW92ZUNsYXNzIiwiYXBwZW5kIiwiaW5kZXgiLCJib2xkU3RyaW5nIiwic3RyIiwicmUiLCJyZWkiLCJtYXRjaCIsImxlbmd0aCIsInJlc3BvbnNpdmVfdHlwZWFoZWFkIiwiZGF0YSIsInRlcm0iLCJhZGRyZXNzIiwibmFtZSIsImNsaW5pY19uYW1lIiwiYWRkcmVzc0hpZGRlbiIsImRvY0lkIiwiaWQiLCJibG9vZGhvdW5kIiwicmVzdWx0cyIsImRhdHVtVG9rZW5pemVyIiwidG9rZW5pemVycyIsIndoaXRlc3BhY2UiLCJjb25jYXQiLCJjaXR5Iiwic3RhdGUiLCJwb3N0Y29kZSIsInF1ZXJ5VG9rZW5pemVyIiwibG9jYWwiLCJpbml0aWFsaXplIiwidHlwZWFoZWFkY2hlY2siLCIkZG9jdG9yX3NlYXJjaGVzIiwiZG9jdG9yX3NlYXJjaCIsIiRkb2N0b3Jfc2VhcmNoIiwidHlwZWFoZWFkIiwiY2xhc3NOYW1lcyIsIm1lbnUiLCJoaW50IiwiaGlnaGxpZ2h0IiwibWluTGVuZ3RoIiwiZGlzcGxheUtleSIsInNvdXJjZSIsInR0QWRhcHRlciIsImxpbWl0IiwidGVtcGxhdGVzIiwic3VnZ2VzdGlvbiIsImVtcHR5Iiwiam9pbiIsImUiLCJleHRlbmQiLCJvYmoiLCJzcmMiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsImN1c3RvbWNvbXBsZXRlIiwidHJpbSIsInJlbW92ZURvY0xpc3QiLCJhamF4IiwidHlwZSIsInVybCIsImNvbnRlbnRUeXBlIiwiZGF0YVR5cGUiLCJzdWNjZXNzIiwicmVzIiwiY29uc29sZSIsImxvZyIsImRvY3MiLCJsYWJlbCIsImFkZHJlc3NfMSIsInBob25lIiwidW5kZWZpbmVkIiwiZm9jdXMiLCJ0aW1lb3V0IiwiZXJyb3IiLCJoYXNDbGFzcyIsImZvcm1Ud29WYWxpZGF0aW9uIiwiJHVsZm9yU2VhcmNoIiwiZXYiLCJjdXJyZW50SW5kZXgiLCJmb3JtVmFsaWRhdGlvbiIsImFjdGl2YXRlU3RlcE5vIiwicGFyc2VJbnQiLCJzY3JvbGxUb3AiLCJvZmZzZXQiLCJ0b3AiLCJkcmFnZ2luZyIsInN0b3BQcm9wYWdhdGlvbiIsInByZXZlbnREZWZhdWx0IiwiaHRtbFNlbGVjdGVkIiwiclN0cm9uZyIsInJBbXAiLCJEb2NpZCIsImNzcyIsImJsdXIiLCJjbGljayIsImJyaWRnZVVybCIsImJyaWRnZVVybFNlbGVjdG9yIiwiZG9jdG9yX2lkIiwicmlnaHRfZXllIiwibGVmdF9leWUiLCJhdHRyaWJ1dGVWYWx1ZXMiLCJ1dG1fcGFybXMiLCJzZXRVdG1QYXJhbXMiLCJ1dG1Ub2tlbiIsImNoZWNrb3V0VVJMIiwibG9jYXRpb24iLCJocmVmIiwiU2VsZWN0ZWRTdGF0ZSIsImZhZGVJbiIsImZhZGVPdXQiLCJ0YXJnZXQiLCJmb3JtVGhyZWVNb2RhbFZhbGlkYXRpb24iLCJkb2NOYW1lIiwiQ2xpbmljTmFtZSIsImRvY0NpdHkiLCJCZG9jTmFtZSIsIkJDbGluaWNOYW1lIiwiQmRvY0NpdHkiLCJjaGVja2FsbCIsIm1pbkxlbmd0aFJlcSIsIm15VmFsdWVzIiwidmFsaWRDb21iaW5hdGlvbiIsImluQXJyYXkiLCJuZXdDcmVhdGVkSWQiLCJnZXROZXdseUNyZWF0ZWREb2NJZCIsImVycm9yRGlzcGxheSIsImFiYyIsIiRuYW1lIiwiSW5wdXROYW1lIiwicyIsInN0YXR1cyIsImRvYyIsIkVsZW1lbnRBZGRlZCIsInQiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFFQTs7OztBQUVBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFQQUEsT0FBT0MsTUFBUCxHQUFnQkQsT0FBT0UsQ0FBUCxtQkFBaEI7O0FBRUFDLFFBQVEsMEJBQVI7O0FBRUEsSUFBTUMsWUFBWSxzQkFBWUEsU0FBOUI7OztBQUtBLElBQUlDLHVCQUF1QixFQUEzQjtBQUNBLElBQUlDLG9CQUFvQixFQUFFQyxTQUFTLEtBQVgsRUFBa0JDLFVBQVUsS0FBNUIsRUFBeEI7QUFDQSxJQUFJQyxvQkFBb0IsRUFBRUMsV0FBVyxLQUFiLEVBQXhCO0FBQ0EsSUFBSUMsZUFBZSxFQUFFSixTQUFTLEVBQVgsRUFB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dG9tLXN1YnNjcmliZS1mb3JtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbndpbmRvdy5qUXVlcnkgPSB3aW5kb3cuJCA9ICQ7XG5pbXBvcnQgc2VsZWN0cmljIGZyb20gJ2pxdWVyeS1zZWxlY3RyaWMnO1xucmVxdWlyZSgnLi8uLi9qcy9qcXVlcnktdWkubWluLmpzJyk7XG5pbXBvcnQgYWJhbmFseXRpY3MgZnJvbSAnLi9hYmFuYWx5dGljcy5qcyc7XG5jb25zdCBnZXRDb29raWUgPSBhYmFuYWx5dGljcy5nZXRDb29raWU7XG5pbXBvcnQgdHJhY2sgZnJvbSAnLi90cmFjay5qcyc7XG5pbXBvcnQgQmxvb2Rob3VuZCBmcm9tICdibG9vZGhvdW5kLWpzJztcbmltcG9ydCB0eXBlYWhlYWQgZnJvbSAnYm9vdHN0cmFwLTMtdHlwZWFoZWFkJztcblxubGV0IG9iamVjdEZvclZhbGlkYXRpb25zID0ge31cbmxldCBldmVudEZpcmVkU3RlcE9uZSA9IHsgbGVmdEV5ZTogZmFsc2UsIHJpZ2h0RXllOiBmYWxzZSB9O1xubGV0IGV2ZW50RmlyZWRTdGVwVHdvID0geyBob21lU3RhdGU6IGZhbHNlIH07XG5sZXQgY29va2llVmFsdWVzID0geyBsZWZ0RXllOiBcIlwiLCByaWdodEV5ZTogXCJcIiwgaG9tZVN0YXRlSWQ6IFwiXCIsIGhvbWVTdGF0ZTogXCJcIiwgZG9jTGlzdDogXCJcIiwgY3VycmVudFN0YXRlOiAwLCBmaW5hbFNlYXJjaFZhbHVlIDogXCJcIn07XG5sZXQge2xlZnRFeWUsIHJpZ2h0RXllfSA9IGNvb2tpZVZhbHVlcztcblxuXG4vLyBjb25zb2xlLmxvZyhzaXRlX3EpXG4vLyB2YXIgZW1haWxWYWx1ZXMgPSB7IGxlZnRFeWU6IFwiXCIsIHJpZ2h0RXllOiBcIlwiLCBob21lU3RhdGVJZDogXCJcIiwgaG9tZVN0YXRlOiBcIlwiLCBjdXJyZW50U3RhdGU6IDB9O1xuLy8gdmFyIHF1ZXJ5c3RyaW5nID0gZ2V0UXVlcnlQYXJhbXMoc2l0ZV9xKTtcblxuLy89PT09PT09PT09PT09PT09PWNvZGUgdG8gY2hlY2sgdXBwZXIgc3RyaW5nXG4vLyBpZiAoZ2V0Q29va2llKFwiY29va2llVmFsdWVzRGV0YWlsZWRcIikgIT0gXCJcIikge1xuLy8gICAgIHZhciBnZXRGaWxsZWREZXRhaWwgPSBKU09OLnBhcnNlKGdldENvb2tpZShcImNvb2tpZVZhbHVlc0RldGFpbGVkXCIpKTtcbi8vICAgICBmb3IodG1wIGluIGdldEZpbGxlZERldGFpbCl7XG4vLyAgICAgICAgIGlmKHF1ZXJ5c3RyaW5nLmhhc093blByb3BlcnR5KHRtcCkpXG4vLyAgICAgICAgICAgICBnZXRGaWxsZWREZXRhaWxbdG1wXSA9IHF1ZXJ5c3RyaW5nW3RtcF1cbi8vICAgICB9XG4vLyAgICAgY29uc29sZS5sb2coZ2V0RmlsbGVkRGV0YWlsKVxuLy8gICAgIGRvY3VtZW50LmNvb2tpZSA9IFwiY29va2llVmFsdWVzRGV0YWlsZWQ9XCIgKyBKU09OLnN0cmluZ2lmeShnZXRGaWxsZWREZXRhaWwpICsgXCI7ICBwYXRoPS9cIjtcbi8vIH1lbHNle1xuLy8gICAgIGZvcih0bXAgaW4gZW1haWxWYWx1ZXMpe1xuLy8gICAgICAgICBpZihxdWVyeXN0cmluZy5oYXNPd25Qcm9wZXJ0eSh0bXApKVxuLy8gICAgICAgICAgICAgY29va2llVmFsdWVzW3RtcF0gPSBxdWVyeXN0cmluZ1t0bXBdXG4vLyAgICAgfVxuLy8gICAgIGRvY3VtZW50LmNvb2tpZSA9IFwiY29va2llVmFsdWVzRGV0YWlsZWQ9XCIgKyBKU09OLnN0cmluZ2lmeShjb29raWVWYWx1ZXMpICsgXCI7ICBwYXRoPS9cIjtcbi8vIH1cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5jb25zdCBtSW5kZXhTdGF0ZSA9IHt9O1xuLy89YXJyYXkgZm9yIGRvY3RvclxubGV0IGRvY3RvcnMgPSBuZXcgQXJyYXkoKTtcbmxldCBzZWxlY3RlZExpc3QgPSBcIlwiO1xuJCgoKSA9PiB7XG4gICAgJChcIiNzdGVwMVwiKS5oaWRlKClcbiAgICAgICAgXG4gICAgJChcIiN0YWJzXCIpLnRhYnMoe1xuICAgICAgICBjcmVhdGUoZXZlbnQsIHVpKSB7fVxuICAgIH0pO1xuXG4gICAgJCgnc2VsZWN0Jykuc2VsZWN0cmljKHtcbiAgICAgICAgbWF4SGVpZ2h0OiAzMDAsXG4gICAgfSk7XG5cbiAgICAvLz1tYWludGFpbmluZyBkYXRhIGluZGV4IGZvciB0aGlzXG4gICAgY29uc3QgbUluZGV4ID0ge307XG4gICAgY29uc3QgeHl6ID0gJChcIi5zZWxlY3RyaWMtc2Nyb2xsIHVsXCIpWzBdO1xuICAgICQoJCh4eXopLmZpbmQoXCJsaVwiKSkuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS5hdHRyKFwiZGF0YS1pbmRleFwiKVxuICAgICAgICBtSW5kZXhbJCh0aGlzKS50ZXh0KCldID0gJCh0aGlzKS5hdHRyKFwiZGF0YS1pbmRleFwiKTtcbiAgICB9KVxuXG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY29uc3QgeHl6U3RhdGUgPSAkKFwiLnNlbGVjdHJpYy1zY3JvbGwgdWxcIilbMl07XG4gICAgICAgICAgICBcbiAgICAgICAgJCgkKHh5elN0YXRlKS5maW5kKFwibGlcIikpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkKHRoaXMpLmF0dHIoXCJkYXRhLWluZGV4XCIpXG4gICAgICAgICAgICBtSW5kZXhTdGF0ZVskKHRoaXMpLnRleHQoKV0gPSAkKHRoaXMpLmF0dHIoXCJkYXRhLWluZGV4XCIpO1xuICAgICAgICB9KVxuXG5cbiAgICB9LCAwKVxuXG5cbiAgICAvLz09PT09PT1kaXNhYmxlIGFsbCB0aGUgdGFicyBpbml0aWFsbHkgb3RoZXIgdGhhbiAwXG4gICAgJChcIiN0YWJzXCIpLnRhYnMoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBbMSwgMl0pO1xuXG4gICAgLy89PT09PT09PT09PVxuICAgICQoJyNsZWZ0RXllLCAjcmlnaHRFeWUnKS5zZWxlY3RyaWMoKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICgkKHRoaXMpLmF0dHIoXCJpZFwiKSA9PSBcImxlZnRFeWVcIiAmJiBldmVudEZpcmVkU3RlcE9uZS5sZWZ0RXllID09IGZhbHNlKSA/ICh0cmFjay5jdXN0b21FdmVudEZpcmUoXCJMZWZ0RXllUHJlc2NyaXB0aW9uXCIpLCBldmVudEZpcmVkU3RlcE9uZS5sZWZ0RXllID0gdHJ1ZSkgOiBcIlwiO1xuICAgICAgICAoJCh0aGlzKS5hdHRyKFwiaWRcIikgPT0gXCJyaWdodEV5ZVwiICYmIGV2ZW50RmlyZWRTdGVwT25lLnJpZ2h0RXllID09IGZhbHNlKSA/ICh0cmFjay5jdXN0b21FdmVudEZpcmUoXCJSaWdodEV5ZVByZXNjcmlwdGlvblwiKSwgZXZlbnRGaXJlZFN0ZXBPbmUucmlnaHRFeWUgPSB0cnVlKSA6IFwiXCI7XG4gICAgICAgIC8vPT09PT1oYW5kbGluZyBjb29raWVcbiAgICAgICAgaWYgKCQodGhpcykuYXR0cihcImlkXCIpID09IFwibGVmdEV5ZVwiKSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgaWYoJCh0aGlzKS52YWwoKSA+IDApXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBgKyR7JCh0aGlzKS52YWwoKX1gO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb29raWVWYWx1ZXMubGVmdEV5ZSA9IG1JbmRleFt2YWx1ZV1cbiAgICAgICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGBjb29raWVWYWx1ZXNEZXRhaWxlZD0ke0pTT04uc3RyaW5naWZ5KGNvb2tpZVZhbHVlcyl9OyAgcGF0aD0vYDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoJCh0aGlzKS5hdHRyKFwiaWRcIikgPT0gXCJyaWdodEV5ZVwiKSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgaWYoJCh0aGlzKS52YWwoKSA+IDApXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBgKyR7JCh0aGlzKS52YWwoKX1gO1xuICAgICAgICAgICAgY29va2llVmFsdWVzLnJpZ2h0RXllID0gbUluZGV4W3ZhbHVlXVxuICAgICAgICAgICAgZG9jdW1lbnQuY29va2llID0gYGNvb2tpZVZhbHVlc0RldGFpbGVkPSR7SlNPTi5zdHJpbmdpZnkoY29va2llVmFsdWVzKX07ICBwYXRoPS9gO1xuICAgICAgICB9XG5cbiAgICAgICAgJChcIiNsZWZ0U2VsZWN0ZWRcIikudGV4dCgkKFwiI2xlZnRFeWVcIikudmFsKCkpXG4gICAgICAgICQoXCIjcmlnaHRTZWxlY3RlZFwiKS50ZXh0KCQoXCIjcmlnaHRFeWVcIikudmFsKCkpXG4gICAgICAgIG9iamVjdEZvclZhbGlkYXRpb25zLmZvcm1PbmVWYWxpZGF0aW9uKCk7XG4gICAgfSk7XG5cbiAgICAkKFwiI3RhYnNcIikudGFicyh7XG4gICAgICAgIHNob3c6IHsgZWZmZWN0OiBcImZhZGVcIiwgZHVyYXRpb246IDIwMCB9LFxuICAgICAgICBhY3RpdmF0ZShldmVudCwgdWkpIHtcbiAgICAgICAgICAgIHRyYWNrLmN1c3RvbUV2ZW50RmlyZShcImZpcmVQYWdlVmlld1wiKTtcbiAgICAgICAgICAgIGNvbnN0IGNoZWNrSW5kZXggPSBnZXRJbmRleCgpO1xuICAgICAgICAgICAgY29va2llVmFsdWVzLmN1cnJlbnRTdGF0ZSA9IGNoZWNrSW5kZXg7XG4gICAgICAgICAgICBkb2N1bWVudC5jb29raWUgPSBgY29va2llVmFsdWVzRGV0YWlsZWQ9JHtKU09OLnN0cmluZ2lmeShjb29raWVWYWx1ZXMpfTsgIHBhdGg9L2A7XG4gICAgICAgICAgICBpZiAoY2hlY2tJbmRleCA9PSAwKXtcbiAgICAgICAgICAgICAgICBldmVudEZpcmVkU3RlcE9uZSA9IHsgbGVmdEV5ZTogZmFsc2UsIHJpZ2h0RXllOiBmYWxzZSB9O1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2hlY2tJbmRleCA9PSAxKVxuICAgICAgICAgICAgICAgIGV2ZW50RmlyZWRTdGVwVHdvID0geyBob21lU3RhdGU6IGZhbHNlIH07XG4gICAgICAgICAgICBpZiAoY2hlY2tJbmRleCA9PSAyKXtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxlZnRTZWxlY3RlZFwiKS5pbm5lckhUTUwgPSAoJChcIiNsZWZ0RXllXCIpLnZhbCgpID4gMCkgPyBgKyR7JChcIiNsZWZ0RXllXCIpLnZhbCgpfWA6ICQoXCIjbGVmdEV5ZVwiKS52YWwoKTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJpZ2h0U2VsZWN0ZWRcIikuaW5uZXJIVE1MID0gKCQoXCIjcmlnaHRFeWVcIikudmFsKCkgPiAwKSA/IGArJHskKFwiI3JpZ2h0RXllXCIpLnZhbCgpfWA6ICQoXCIjcmlnaHRFeWVcIikudmFsKCk7XG4gICAgICAgICAgICAgICAgLy8gJChcIiNsZWZ0U2VsZWN0ZWRcIikudGV4dCgkKFwiI2xlZnRFeWVcIikudmFsKCkpXG4gICAgICAgICAgICAgICAgLy8gJChcIiNyaWdodFNlbGVjdGVkXCIpLnRleHQoJChcIiNyaWdodEV5ZVwiKS52YWwoKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG5cbiAgICAkKFwiI3N0ZXAxXCIpLmFuaW1hdGUoeyBvcGFjaXR5OiAxIH0sIDE1MDApXG5cbiAgICBpZiAoZ2V0Q29va2llKFwiY29va2llVmFsdWVzRGV0YWlsZWRcIikgIT0gXCJcIikge1xuICAgICAgICBjb25zdCBnZXRGaWxsZWREZXRhaWwgPSBKU09OLnBhcnNlKGdldENvb2tpZShcImNvb2tpZVZhbHVlc0RldGFpbGVkXCIpKTtcbiAgICAgICAgZmlsbFRoZURldGFpbGFuZENoZWNrKGdldEZpbGxlZERldGFpbCk7XG4gICAgfVxuXG5cblxufSk7XG5cbmZ1bmN0aW9uIGVuYWJsaXR5VGFiT3B0aW9uKHdoaWNob25lKXtcbi8vZnVuY3Rpb24gZW5hYmxpdHlUYWJPcHRpb24oLi4ud2hpY2hvbmUpe1xuICAgIC8vIGZvcihsZXQgdG1wIG9mIHdoaWNob25lKXtcbiAgICAvLyAgICAgY29uc29sZS5sb2cod2hpY2hvbmVbdG1wXSlcbiAgICAvLyAgICAgJChcIi5zdGVwc1wiKS5maW5kKFwiYVtocmVmPScjc3RlcFwiK3doaWNob25lW3RtcF0rXCInXSBkaXZcIikuYWRkQ2xhc3MoXCJkb25lXCIpO1xuICAgIC8vICAgICAkKFwiI3RhYnNcIikudGFicyhcImVuYWJsZVwiLCB3aGljaG9uZVt0bXBdKTtcbiAgICAvLyB9XG4gICAgZm9yKHZhciB0bXAgaW4gd2hpY2hvbmUpe1xuICAgICAgICAkKFwiLnN0ZXBzXCIpLmZpbmQoYGFbaHJlZj0nI3N0ZXAke3doaWNob25lW3RtcF19J10gZGl2YCkuYWRkQ2xhc3MoXCJkb25lXCIpO1xuICAgICAgICAkKFwiI3RhYnNcIikudGFicyhcImVuYWJsZVwiLCB3aGljaG9uZVt0bXBdKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNlbGVjdGluZ0Nvb2tpZVNlbGVjdGVkTGlzdCgpe1xuICBsZXQgc2VsZWN0ZWRMaXN0Q29va2llID0gZ2V0Q29va2llKFwic2VsZWN0ZWRMaXN0XCIpO1xuICB2YXIgcmVtb3ZlRXggPSBuZXcgUmVnRXhwKFwiJzxkaXZcIiwgJ2cnKTtcbiAgc2VsZWN0ZWRMaXN0Q29va2llID0gc2VsZWN0ZWRMaXN0Q29va2llLnJlcGxhY2UocmVtb3ZlRXgsICc8ZGl2Jyk7XG4gIHZhciByZW1vdmVFeCA9IG5ldyBSZWdFeHAoXCIvZGl2PidcIiwgJ2cnKTtcbiAgc2VsZWN0ZWRMaXN0Q29va2llID0gc2VsZWN0ZWRMaXN0Q29va2llLnJlcGxhY2UocmVtb3ZlRXgsICcvZGl2PicpO1xuICByZXR1cm4gc2VsZWN0ZWRMaXN0Q29va2llO1xufVxuXG5mdW5jdGlvbiBmaWxsVGhlRGV0YWlsYW5kQ2hlY2soZ2V0RmlsbGVkRGV0YWlsKSB7XG4gICAgaWYgKGdldEZpbGxlZERldGFpbC5jdXJyZW50U3RhdGUgPT0gMikge1xuICAgICAgICBlbmFibGl0eVRhYk9wdGlvbihbMSwyXSk7XG5cbiAgICB9IGVsc2UgaWYgKGdldEZpbGxlZERldGFpbC5jdXJyZW50U3RhdGUgPT0gMSkge1xuICAgICAgICBlbmFibGl0eVRhYk9wdGlvbihbMV0pXG4gICAgfVxuICAgIGlmIChnZXRDb29raWUoXCJzZWxlY3RlZExpc3RcIikgIT0gXCJcIikge1xuICAgICAgICBpZihnZXRGaWxsZWREZXRhaWwuY3VycmVudFN0YXRlID4gMClcbiAgICAgICAgICAgIGVuYWJsaXR5VGFiT3B0aW9uKFsxXSk7XG4gICAgICAgIHZhciBzZWxlY3RlZExpc3RDb29raWUgPSBzZWxlY3RpbmdDb29raWVTZWxlY3RlZExpc3QoKTtcbiAgICAgICAgLy8gdmFyIHJlbW92ZUV4ID0gbmV3IFJlZ0V4cChcIic8ZGl2XCIsICdnJyk7XG4gICAgICAgIC8vIHNlbGVjdGVkTGlzdENvb2tpZSA9IHNlbGVjdGVkTGlzdENvb2tpZS5yZXBsYWNlKHJlbW92ZUV4LCAnPGRpdicpO1xuICAgICAgICAvLyB2YXIgcmVtb3ZlRXggPSBuZXcgUmVnRXhwKFwiL2Rpdj4nXCIsICdnJyk7XG4gICAgICAgIC8vIHNlbGVjdGVkTGlzdENvb2tpZSA9IHNlbGVjdGVkTGlzdENvb2tpZS5yZXBsYWNlKHJlbW92ZUV4LCAnL2Rpdj4nKTtcbiAgICAgICAgJChcIi5yZXZpZXdzIC5kZXNjXCIpLmxhc3QoKS5odG1sKHNlbGVjdGVkTGlzdENvb2tpZSk7XG4gICAgICAgIHNlbGVjdGVkTGlzdCA9IGdldENvb2tpZShcInNlbGVjdGVkTGlzdFwiKTtcbiAgICB9XG5cbiAgICAvLz09PT1hY3RpdmF0aW5nIGN1cnJlbnQgc3RhdGUgZm9yIHRoZSB0YWJcbiAgICAkKFwiI3RhYnNcIikudGFicyh7XG4gICAgICAgIGFjdGl2ZTogZ2V0RmlsbGVkRGV0YWlsLmN1cnJlbnRTdGF0ZVxuICAgIH0pO1xuXG4gICAgaWYgKGdldEZpbGxlZERldGFpbC5sZWZ0RXllICE9IFwiXCIpIHtcbiAgICAgICAgJCgnI2xlZnRFeWUnKS5wcm9wKCdzZWxlY3RlZEluZGV4JywgZ2V0RmlsbGVkRGV0YWlsLmxlZnRFeWUpLnNlbGVjdHJpYygncmVmcmVzaCcpO1xuICAgICAgICBjb29raWVWYWx1ZXMubGVmdEV5ZSA9IGdldEZpbGxlZERldGFpbC5sZWZ0RXllO1xuICAgIH1cbiAgICBpZiAoZ2V0RmlsbGVkRGV0YWlsLnJpZ2h0RXllICE9IFwiXCIpIHtcbiAgICAgICAgJCgnI3JpZ2h0RXllJykucHJvcCgnc2VsZWN0ZWRJbmRleCcsIGdldEZpbGxlZERldGFpbC5yaWdodEV5ZSkuc2VsZWN0cmljKCdyZWZyZXNoJyk7XG4gICAgICAgIGNvb2tpZVZhbHVlcy5yaWdodEV5ZSA9IGdldEZpbGxlZERldGFpbC5yaWdodEV5ZTtcbiAgICB9XG4gICAgaWYgKGdldEZpbGxlZERldGFpbC5ob21lU3RhdGVJZCAhPSBcIlwiKSB7XG4gICAgICAgICQoJyNzZWFyY2hEb2N0b3InKS5wcm9wKCdzZWxlY3RlZEluZGV4JywgZ2V0RmlsbGVkRGV0YWlsLmhvbWVTdGF0ZUlkKS5zZWxlY3RyaWMoJ3JlZnJlc2gnKTtcbiAgICAgICAgY29va2llVmFsdWVzLmhvbWVTdGF0ZUlkID0gZ2V0RmlsbGVkRGV0YWlsLmhvbWVTdGF0ZUlkO1xuICAgICAgICBjb29raWVWYWx1ZXMuaG9tZVN0YXRlID0gZ2V0RmlsbGVkRGV0YWlsLmhvbWVTdGF0ZTtcbiAgICAgICAgZ2V0RG9jdG9yTGlzdChnZXRGaWxsZWREZXRhaWwuaG9tZVN0YXRlKTtcbiAgICAgICAgaWYodHlwZW9mIGRvY0xpc3R0aFZhbHVlID09IFwidW5kZWZpbmVkXCIpXG4gICAgICAgICAgICAkKFwiLmZpbmREb2N0b3JcIikucmVtb3ZlQ2xhc3MoXCJsb2FkZXJcIik7XG4gICAgfVxuICAgIGlmIChnZXRGaWxsZWREZXRhaWwuZG9jTGlzdCAhPSBcIlwiKSB7XG4gICAgICAgIHZhciBzZWxlY3RlZExpc3RDb29raWUgPSBzZWxlY3RpbmdDb29raWVTZWxlY3RlZExpc3QoKTtcbiAgICAgICAgJChcIiNmaW5keW91cmRvY3RvclwiKS5yZW1vdmVDbGFzcyhcImRpc2FibGVUaGlzXCIpO1xuICAgICAgICAvLyQoXCIjZG9jTGlzdHRoXCIpLnZhbChcImFyY1wiKVxuICAgICAgICAkKFwiI1NlYXJjaERvY1wiKS5yZW1vdmVDbGFzcyhcImRpc2FibGVUaGlzXCIpXG4gICAgICAgICQoXCIjU2VhcmNoRG9jIHVsIGxpXCIpLmh0bWwoc2VsZWN0ZWRMaXN0Q29va2llKTtcbiAgICAgICAgJChcIiNTZWFyY2hEb2MgdWwgbGlcIikuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiZGVsZXRlU2VhcmNoXCI+PGltZyBzcmM9XCJpbWFnZXMvZGVsZXRlX2ljb24ucG5nXCIgYWx0PVwiXCIgLz48L2Rpdj4nKTtcbiAgICAgICAgJChcIiNkb2NMaXN0SGlkZGVuXCIpLnZhbChnZXRGaWxsZWREZXRhaWwuZG9jTGlzdCk7XG4gICAgICAgICQoXCIubmV4dFN0ZXBCdXR0b25bZGF0YS1DclN0ZXBObz0nMSddXCIpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZVRoaXNcIik7XG4gICAgICAgIC8vJChcIi5maW5kRG9jdG9yXCIpLmFkZENsYXNzKFwib3B0aW9uU2VsZWN0ZWRcIik7XG4gICAgICAgIGlmIChnZXRGaWxsZWREZXRhaWwuY3VycmVudFN0YXRlID09IDIpIHtcbiAgICAgICAgICAgICQoXCIjbGVmdFNlbGVjdGVkXCIpLnRleHQoJChcIiNsZWZ0RXllXCIpLnZhbCgpKVxuICAgICAgICAgICAgJChcIiNyaWdodFNlbGVjdGVkXCIpLnRleHQoJChcIiNyaWdodEV5ZVwiKS52YWwoKSlcbiAgICAgICAgfVxuICAgICAgICBpZih0eXBlb2YgZG9jTGlzdHRoVmFsdWUgIT0gXCJ1bmRlZmluZWRcIiAmJiBkb2NMaXN0dGhWYWx1ZSlcbiAgICAgICAgICAgICQoJy5maW5kRG9jdG9yJykucmVtb3ZlQ2xhc3MoJ2xvYWRlcicpO1xuICAgICAgICBjb29raWVWYWx1ZXMuZG9jTGlzdCA9IGdldEZpbGxlZERldGFpbC5kb2NMaXN0O1xuICAgICAgICBjb29raWVWYWx1ZXMuZmluYWxTZWFyY2hWYWx1ZSA9IGdldEZpbGxlZERldGFpbC5maW5hbFNlYXJjaFZhbHVlO1xuXG4gICAgICAgIFxuICAgIH1cbiAgICBkb2N1bWVudC5jb29raWUgPSBgY29va2llVmFsdWVzRGV0YWlsZWQ9JHtKU09OLnN0cmluZ2lmeShjb29raWVWYWx1ZXMpfTsgIHBhdGg9L2A7XG59XG5cblxuLy89PT1yZXR1cm4gdGhlIGluZGV4IG9mIGFjdGl2ZSB0YWJcbmZ1bmN0aW9uIGdldEluZGV4KCkge1xuICAgIHJldHVybiAkKFwidWwgbGkudWktc3RhdGUtYWN0aXZlXCIpLmluZGV4KCk7XG59XG5cbi8vPWJvbGQgdGhlIHNlbGVjdGVkIHN0cmluZyBhcyBwZXIgcmVndWxhciBleHByZXNzaW9uXG5mdW5jdGlvbiBib2xkU3RyaW5nKHN0ciwgZmluZCkge1xuICAgIGNvbnN0IHJlID0gbmV3IFJlZ0V4cChmaW5kLCAnZycpO1xuICAgIGNvbnN0IHJlaSA9IG5ldyBSZWdFeHAoZmluZCwgJ2knKTtcbiAgICBpZiAoc3RyLm1hdGNoKHJlaSkgIT0gbnVsbCAmJiBzdHIubWF0Y2gocmVpKS5sZW5ndGgpXG4gICAgICAgIHJldHVybiBzdHIucmVwbGFjZShyZWksIGA8Yj4ke3N0ci5tYXRjaChyZWkpWzBdfTwvYj5gKTtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UocmUsIGA8Yj4ke2ZpbmR9PC9iPmApO1xufVxuXG5mdW5jdGlvbiByZXNwb25zaXZlX3R5cGVhaGVhZChkYXRhLCB0ZXJtKSB7XG4gICAgLy9jb25zb2xlLmxvZyhkYXRhKVxuICAgIGxldCBhZGRyZXNzID0gYCR7ZGF0YS5hZGRyZXNzWzBdfSwgJHtkYXRhLmFkZHJlc3NbMV19ICR7ZGF0YS5hZGRyZXNzWzJdfWA7XG4gICAgY29uc3QgbmFtZSA9IGRhdGEubmFtZTtcbiAgICBjb25zdCBjbGluaWNfbmFtZSA9IGRhdGEuY2xpbmljX25hbWU7XG4gICAgYWRkcmVzc0hpZGRlbiA9IGFkZHJlc3M7XG4gICAgYWRkcmVzcyA9IGFkZHJlc3M7XG4gICAgY29uc3QgZG9jSWQgPSBkYXRhLmlkO1xuXG4gICAgcmV0dXJuIChgPGxpIGNsYXNzPVwiZG9jbGlzdFNlbGVjdDFcIj48ZGl2IGNsYXNzPVwic2VhcmNoTmFtZVwiPiR7bmFtZX08L2Rpdj48ZGl2IGNsYXNzPVwic2VhcmNoSG9zXCI+JHtjbGluaWNfbmFtZX08L2Rpdj48ZGl2IGNsYXNzPVwic2VhcmNoQ2l0eVwiID4ke2FkZHJlc3N9PC9kaXY+PGRpdiBjbGFzcz1cImRpc2FibGVUaGlzXCI+PGRpdiBjbGFzcz1cInNlYXJjaE5hbWVIaWRkZW5cIj4ke2RhdGEubmFtZX08L2Rpdj48ZGl2IGNsYXNzPVwic2VhcmNoSG9zSGlkZGVuXCI+JHtkYXRhLmNsaW5pY19uYW1lfTwvZGl2PjxkaXYgY2xhc3M9XCJzZWFyY2hDaXR5SGlkZGVuXCI+JHthZGRyZXNzSGlkZGVufTwvZGl2PjxkaXYgY2xhc3M9XCJzZWFyY2hJZFwiIHN0eWxlPVwiZGlzcGxheTpub25lXCI+JHtkb2NJZH08L2Rpdj48L2Rpdj48L2xpPmApO1xufVxuXG5cblxuZnVuY3Rpb24gYmxvb2Rob3VuZCgpIHtcblxuICAgIGNvbnN0IHJlc3VsdHMgPSBuZXcgQmxvb2Rob3VuZCh7XG4gICAgICAgIGRhdHVtVG9rZW5pemVyKGRhdGEpIHtcblxuICAgICAgICAgICAgcmV0dXJuIEJsb29kaG91bmQudG9rZW5pemVycy53aGl0ZXNwYWNlKGRhdGEubmFtZSlcblxuICAgICAgICAgICAgLmNvbmNhdChCbG9vZGhvdW5kLnRva2VuaXplcnMud2hpdGVzcGFjZShkYXRhLmNsaW5pY19uYW1lKSlcblxuICAgICAgICAgICAgLmNvbmNhdChCbG9vZGhvdW5kLnRva2VuaXplcnMud2hpdGVzcGFjZShkYXRhLmNpdHkpKVxuXG4gICAgICAgICAgICAuY29uY2F0KEJsb29kaG91bmQudG9rZW5pemVycy53aGl0ZXNwYWNlKGRhdGEuc3RhdGUpKVxuXG4gICAgICAgICAgICAuY29uY2F0KEJsb29kaG91bmQudG9rZW5pemVycy53aGl0ZXNwYWNlKGRhdGEucG9zdGNvZGUpKVxuXG4gICAgICAgICAgICA7XG5cbiAgICAgICAgfSxcbiAgICAgICAgcXVlcnlUb2tlbml6ZXI6IEJsb29kaG91bmQudG9rZW5pemVycy53aGl0ZXNwYWNlLFxuICAgICAgICBsb2NhbDogZG9jdG9yc1xuXG4gICAgfSk7XG5cbiAgICByZXN1bHRzLmluaXRpYWxpemUoKTtcblxuICAgIHJldHVybiByZXN1bHRzO1xuXG59XG5cbmZ1bmN0aW9uIHR5cGVhaGVhZGNoZWNrKCkge1xuICAgIHZhciAkZG9jdG9yX3NlYXJjaGVzID0gJChcIiNkb2NMaXN0dGhcIilcbiAgICAkZG9jdG9yX3NlYXJjaGVzLnZhbChcIlwiKVxuICAgIGlmICghJGRvY3Rvcl9zZWFyY2hlcy5sZW5ndGgpXG4gICAgICAgIHJldHVybjtcblxuICAgICRkb2N0b3Jfc2VhcmNoZXMuZWFjaCgoaW5kZXgsIGRvY3Rvcl9zZWFyY2gpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0ICRkb2N0b3Jfc2VhcmNoID0gJChkb2N0b3Jfc2VhcmNoKTtcbiAgICAgICAgXG4gICAgICAgICRkb2N0b3Jfc2VhcmNoLnR5cGVhaGVhZCgnZGVzdHJveScpO1xuXG4gICAgICAgICRkb2N0b3Jfc2VhcmNoLnR5cGVhaGVhZCh7XG4gICAgICAgICAgICBjbGFzc05hbWVzOiB7XG4gICAgICAgICAgICAgICAgbWVudTogJ3R0LW1lbnUxJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhpbnQ6IHRydWUsXG4gICAgICAgICAgICBoaWdobGlnaHQ6IHRydWUsXG4gICAgICAgICAgICBtaW5MZW5ndGg6IDJcblxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBuYW1lOiAncmVzdWx0cycsXG4gICAgICAgICAgICBkaXNwbGF5S2V5OiAncmVzdWx0cycsXG4gICAgICAgICAgICBzb3VyY2U6IGJsb29kaG91bmQoKS50dEFkYXB0ZXIoKSxcbiAgICAgICAgICAgIGxpbWl0OiAxMDAsXG4gICAgICAgICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgICAgICAgICBzdWdnZXN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGA8dWwgY2xhc3M9XCJkb2NsaXN0U2VsZWN0XCI+JHtyZXNwb25zaXZlX3R5cGVhaGVhZChkYXRhKX08L3VsPmA7XG5cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVtcHR5OiBbXG4gICAgICAgICAgICAgICAgICAgICcnXG4gICAgICAgICAgICAgICAgXS5qb2luKCdcXG4nKVxuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXG5cbiAgICAgICAgfSkub24oJ3R5cGVhaGVhZDpzZWxlY3QnLCAoZSwgZGF0YSkgPT4ge1xuICAgICAgICAgICAgY29va2llVmFsdWVzLmZpbmFsU2VhcmNoVmFsdWUgPSAkKCcjZG9jTGlzdHRoJykudHlwZWFoZWFkKCd2YWwnKTtcbiAgICAgICAgfSkub24oJ3R5cGVhaGVhZDpjaGFuZ2UnLCAoZSwgZGF0YSkgPT4ge1xuICAgICAgICAgICAgY29va2llVmFsdWVzLmZpbmFsU2VhcmNoVmFsdWUgPSAkKCcjZG9jTGlzdHRoJykudHlwZWFoZWFkKCd2YWwnKTtcbiAgICAgICAgfSlcbiAgICAgICAgXG5cbiAgICB9KTtcblxufVxuXG5mdW5jdGlvbiBleHRlbmQob2JqLCBzcmMpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBzcmMpIHtcbiAgICAgICAgaWYgKHNyYy5oYXNPd25Qcm9wZXJ0eShrZXkpKSBvYmpba2V5XSA9IHNyY1trZXldO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xufVxuXG5cbmZ1bmN0aW9uIGdldERvY3Rvckxpc3Qoc3RhdGUpIHtcbiAgICAkKFwiI2RvY0xpc3QxXCIpLm9uKFwia2V5dXBcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICgkKHRoaXMpLnZhbCgpLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICQoXCIjZG9jTGlzdFwiKS52YWwoJCh0aGlzKS52YWwoKSk7XG4gICAgICAgICAgICAvL3ZhciBhYmMgPSAkKHRoaXMpLnZhbCgpLnNwbGl0KFwiIFwiKTtcblxuICAgICAgICAgICAgJChcIiNkb2NMaXN0XCIpLmN1c3RvbWNvbXBsZXRlKFwic2VhcmNoXCIsICQodGhpcykudmFsKCkudHJpbSgpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlbW92ZURvY0xpc3QoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGlmKHR5cGVvZiBkb2NMaXN0dGhWYWx1ZSAhPSBcInVuZGVmaW5lZFwiICYmIGRvY0xpc3R0aFZhbHVlKVxuICAgICAgICAkKFwiLmxpc3RMaW5rXCIpLmFkZENsYXNzKFwiZGlzYWJsZVRoaXNcIik7XG4gICAgJChcIi5maW5kRG9jdG9yXCIpLmFkZENsYXNzKFwibG9hZGVyXCIpXG4gICAgJC5hamF4KHtcbiAgICAgICAgdHlwZTogXCJnZXRcIixcbiAgICAgICAgdXJsOiBcImh0dHBzOi8vYXBpLmh1YmJsZWNvbnRhY3RzLmNvbS92MS9kb2NzL3NlYXJjaC5qc1wiLFxuICAgICAgICBkYXRhOiB7IHN0YXRlIH0sXG4gICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXG4gICAgICAgIGRhdGFUeXBlOiAnSlNPTlAnLFxuICAgICAgICBzdWNjZXNzKHJlcykge1xuICAgICAgICAgICAgaWYodHlwZW9mIGRvY0xpc3R0aFZhbHVlID09IFwidW5kZWZpbmVkXCIpXG4gICAgICAgICAgICAgICAgJChcIiNmaW5keW91cmRvY3RvciwgLmxpc3RMaW5rXCIpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZVRoaXNcIik7XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICQoXCIjZmluZHlvdXJkb2N0b3JcIikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlVGhpc1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICQoXCIuZmluZERvY3RvclwiKS5yZW1vdmVDbGFzcyhcImxvYWRlclwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3VjY2Vzc1wiKTtcbiAgICAgICAgICAgIGRvY3RvcnMgPSByZXMuZGF0YS5kb2NzO1xuICAgICAgICAgICAgJC5lYWNoKGRvY3RvcnMsIChpbmRleCwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICBkb2N0b3JzW2luZGV4XS5sYWJlbCA9IGAgJHtkb2N0b3JzW2luZGV4XS5uYW1lfSAke2RvY3RvcnNbaW5kZXhdLmNsaW5pY19uYW1lfSAke2RvY3RvcnNbaW5kZXhdLmFkZHJlc3NfMX0gJHtkb2N0b3JzW2luZGV4XS5jaXR5fSAke2RvY3RvcnNbaW5kZXhdLnBob25lfSAke2RvY3RvcnNbaW5kZXhdLnBvc3Rjb2RlfWA7XG4gICAgICAgICAgICAgICAgaWYgKGRvY3RvcnNbaW5kZXhdLm5hbWUgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvY3RvcnNbaW5kZXhdLm5hbWUgPSAnJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGRvY3RvcnNbaW5kZXhdLmNsaW5pY19uYW1lID09IHVuZGVmaW5lZCB8fCBkb2N0b3JzW2luZGV4XS5jbGluaWNfbmFtZSA9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICBkb2N0b3JzW2luZGV4XS5jbGluaWNfbmFtZSA9IGRvY3RvcnNbaW5kZXhdLmFkZHJlc3NfMTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoZG9jdG9yc1tpbmRleF0uY2l0eSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZG9jdG9yc1tpbmRleF0uY2l0eSA9ICcnO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChkb2N0b3JzW2luZGV4XS5zdGF0ZSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZG9jdG9yc1tpbmRleF0uc3RhdGUgPSAnJztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoZG9jdG9yc1tpbmRleF0ucG9zdGNvZGUgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvY3RvcnNbaW5kZXhdLnBvc3Rjb2RlID0gJyc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGRvY3RvcnNbaW5kZXhdLnBob25lID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBkb2N0b3JzW2luZGV4XS5waG9uZSA9ICcnO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGRvY3RvcnNbaW5kZXhdLmFkZHJlc3MgPSBbXG4gICAgICAgICAgICAgICAgICAgIGRvY3RvcnNbaW5kZXhdLmNpdHksXG4gICAgICAgICAgICAgICAgICAgIGRvY3RvcnNbaW5kZXhdLnN0YXRlLFxuICAgICAgICAgICAgICAgICAgICBkb2N0b3JzW2luZGV4XS5wb3N0Y29kZVxuXG4gICAgICAgICAgICAgICAgXVxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGJsb29kaG91bmQoKTtcblxuICAgICAgICAgICAgdHlwZWFoZWFkY2hlY2soKTtcbiAgICAgICAgICAgIGlmKHR5cGVvZiBkb2NMaXN0dGhWYWx1ZSAhPSBcInVuZGVmaW5lZFwiICYmIGRvY0xpc3R0aFZhbHVlKXtcbiAgICAgICAgICAgICAgICAkKFwiI2RvY0xpc3R0aFwiKS5mb2N1cygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG4gICAgICAgIHRpbWVvdXQ6IDE1MDAwLFxuICAgICAgICBlcnJvcihyZXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgfVxuXG4gICAgfSk7XG59XG5cbi8vPW9iamVjdCBzdHJydCBmb3IgdmFsaWRhdGlvbnNcbm9iamVjdEZvclZhbGlkYXRpb25zLmZvcm1PbmVWYWxpZGF0aW9uID0gKCkgPT4ge1xuICAgICQoJy5sZWZ0X2V5ZScpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xuICAgICQoJy5yaWdodF9leWUnKS5yZW1vdmVDbGFzcygnZXJyb3InKTtcbiAgICBpZiAoKCQoXCIjbGVmdEV5ZVwiKS52YWwoKSAhPSBudWxsICYmICQoXCIjbGVmdEV5ZVwiKS52YWwoKSAhPSBcIlwiKSAmJiAoJChcIiNyaWdodEV5ZVwiKS52YWwoKSAhPSBudWxsICYmICQoXCIjcmlnaHRFeWVcIikudmFsKCkgIT0gXCJcIikpIHtcbiAgICAgICAgJChcIi5uZXh0U3RlcEJ1dHRvbltkYXRhLUNyU3RlcE5vPScwJ11cIikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlTmV4dFwiKTtcbiAgICAgICAgJCgnLmZvcm1fZXJyb3JfbXNnJykuYWRkQ2xhc3MoJ2hpZGUnKTtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmICghJChcIi5mb3JtX2Vycm9yX21zZ1wiKS5oYXNDbGFzcyhcImhpZGVcIikpIHtcbiAgICAgICAgICAgIGlmICgoJChcIiNsZWZ0RXllXCIpLnZhbCgpID09IG51bGwgfHwgJChcIiNsZWZ0RXllXCIpLnZhbCgpID09IFwiXCIpKSB7XG4gICAgICAgICAgICAgICAgJCgnLmxlZnRfZXllJykuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKCQoXCIjcmlnaHRFeWVcIikudmFsKCkgPT0gbnVsbCB8fCAkKFwiI3JpZ2h0RXllXCIpLnZhbCgpID09IFwiXCIpKSB7XG4gICAgICAgICAgICAgICAgJCgnLnJpZ2h0X2V5ZScpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSwgMTApO1xuICAgIHJldHVybiBmYWxzZTtcbn1cblxub2JqZWN0Rm9yVmFsaWRhdGlvbnMuZm9ybVR3b1ZhbGlkYXRpb24gPSAoKSA9PiB7XG4gICAgaWYgKCQoXCIjZG9jTGlzdEhpZGRlblwiKS52YWwoKSAhPSBcIlwiKSB7XG4gICAgICAgICQoXCIuc3RlcHNcIikuZmluZChcImFbaHJlZj0nI3N0ZXAyJ10gZGl2XCIpLmFkZENsYXNzKFwiZG9uZVwiKTtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRMaXN0Q29va2llID0gc2VsZWN0aW5nQ29va2llU2VsZWN0ZWRMaXN0KCk7XG4gICAgICAgICQoXCIucmV2aWV3cyAuZGVzY1wiKS5sYXN0KCkuaHRtbChzZWxlY3RlZExpc3RDb29raWUpO1xuICAgICAgICAkKFwiI2xlZnRTZWxlY3RlZFwiKS50ZXh0KCQoXCIjbGVmdEV5ZVwiKS52YWwoKSlcbiAgICAgICAgJChcIiNyaWdodFNlbGVjdGVkXCIpLnRleHQoJChcIiNyaWdodEV5ZVwiKS52YWwoKSlcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuXG5mdW5jdGlvbiByZW1vdmVEb2NMaXN0KCkge1xuICAgIGNvbnN0ICR1bGZvclNlYXJjaCA9ICQoXCIudHQtbWVudTEgdWxcIik7XG4gICAgJChcIi50dC1tZW51MVwiKS5hZGRDbGFzcyhcImRpc2FibGVUaGlzXCIpO1xuICAgICR1bGZvclNlYXJjaC5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLmh0bWwoXCJcIilcbiAgICB9KVxuXG5cbiAgICBpZiAoJChcIiNkb2NMaXN0SGlkZGVuXCIpLnZhbCgpICE9IFwiXCIpXG4gICAgICAgICQoXCIubmV4dFN0ZXBCdXR0b25bZGF0YS1DclN0ZXBObz0nMSddXCIpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZVRoaXNcIik7XG59XG5cbiQoZG9jdW1lbnQpLm9uKCdrZXl1cCcsICcjZG9jTGlzdHRoJywgZnVuY3Rpb24oZXYpIHtcbiAgICAkKFwiLnR0LW1lbnUxXCIpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZVRoaXNcIik7XG4gICAgaWYoJCh0aGlzKS52YWwoKS50cmltKCkubGVuZ3RoID4gMCAmJiB0eXBlb2YgZG9jTGlzdHRoVmFsdWUgIT0gXCJ1bmRlZmluZWRcIiAmJiBkb2NMaXN0dGhWYWx1ZSlcbiAgICAgICAgJChcIi5saXN0TGlua1wiKS5yZW1vdmVDbGFzcyhcImRpc2FibGVUaGlzXCIpO1xuICAgIGVsc2UgaWYodHlwZW9mIGRvY0xpc3R0aFZhbHVlICE9IFwidW5kZWZpbmVkXCIgJiYgZG9jTGlzdHRoVmFsdWUpXG4gICAgICAgICQoXCIubGlzdExpbmtcIikuYWRkQ2xhc3MoXCJkaXNhYmxlVGhpc1wiKTtcbn0pO1xuXG5cblxuLy89PT09PT09PWNsaWNraW5nIG9mIG5leHQgYnV0dG9uXG4kKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLm5leHRTdGVwQnV0dG9uXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICBjb25zb2xlLmxvZyhlKVxuICAgIGNvbnN0IGN1cnJlbnRJbmRleCA9IGdldEluZGV4KCk7XG4gICAgaWYgKGN1cnJlbnRJbmRleCA9PSAwKSB7XG4gICAgICAgIHZhciBmb3JtVmFsaWRhdGlvbiA9IG9iamVjdEZvclZhbGlkYXRpb25zLmZvcm1PbmVWYWxpZGF0aW9uKCk7XG4gICAgICAgIGlmIChmb3JtVmFsaWRhdGlvbikge1xuICAgICAgICAgICAgJChcIi5zdGVwc1wiKS5maW5kKFwiYVtocmVmPScjc3RlcDEnXSBkaXZcIikuYWRkQ2xhc3MoXCJkb25lXCIpO1xuICAgICAgICAgICAgLy89PT09PT09PT09PT09PT09PT10cmFja2luZyBldmVudHNcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdHJhY2suY3VzdG9tRXZlbnRGaXJlKFwiU3Vic2NyaWJlUnhUb1N1YnNjcmliZURvY3RvcixTdWJzY3JpYmVEb2N0b3JQYWdlVmlzaXRcIik7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnLmZvcm1fZXJyb3JfbXNnJykucmVtb3ZlQ2xhc3MoJ2hpZGUnKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAoY3VycmVudEluZGV4ID09IDEpIHtcbiAgICAgICAgdmFyIGZvcm1WYWxpZGF0aW9uID0gb2JqZWN0Rm9yVmFsaWRhdGlvbnMuZm9ybVR3b1ZhbGlkYXRpb24oKTtcbiAgICAgICAgdHJhY2suY3VzdG9tRXZlbnRGaXJlKFwiU3Vic2NyaWJlRG9jdG9yVG9TdWJzY3JpYmVSZXZpZXcsU3Vic2NyaWJlUmV2aWV3UGFnZVZpc2l0XCIpO1xuICAgIH1cbiAgICBjb25zdCBhY3RpdmF0ZVN0ZXBObyA9IHBhcnNlSW50KCQodGhpcykuYXR0cihcImRhdGEtRW5TdGVwTm9cIikpO1xuICAgICAgICAvL3ZhciBkaXNhYmxlU3RlcE5vID0gJCh0aGlzKS5hdHRyKFwiZGF0YS1EaXNTdGVwTm9cIilcbiAgICBpZiAoY3VycmVudEluZGV4IDwgMiAmJiBmb3JtVmFsaWRhdGlvbiA9PSB0cnVlKSB7XG4gICAgICAgIC8vdmFyIHJlbCA9ICQodGhpcykuYXR0cigncmVsJyk7XG4gICAgICAgIC8vdHJhY2suY3VzdG9tRXZlbnRGaXJlKHJlbCk7XG4gICAgICAgICQoXCIjdGFic1wiKS50YWJzKFwiZW5hYmxlXCIsIGFjdGl2YXRlU3RlcE5vKTtcbiAgICAgICAgJChcIiN0YWJzXCIpLnRhYnMoe1xuICAgICAgICAgICAgYWN0aXZlOiBhY3RpdmF0ZVN0ZXBOb1xuICAgICAgICB9KTtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgc2Nyb2xsVG9wOiAkKFwiaGVhZGVyXCIpLm9mZnNldCgpLnRvcFxuICAgICAgICB9LCAxMDAwKTtcbiAgICB9XG59KVxuXG5sZXQgZHJhZ2dpbmcgPSBmYWxzZTtcbi8vPT09PT09PW9uIGNsaWNrIG9mIGxpIG9uIHN0ZXAgMlxuJChkb2N1bWVudCkub24oXCJjbGljayB0b3VjaGVuZFwiLCBcIi5kb2NsaXN0U2VsZWN0XCIsIGZ1bmN0aW9uKGUpIHtcblxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmIChkcmFnZ2luZyA9PSBmYWxzZSkge1xuICAgICAgICBjb29raWVWYWx1ZXMuZmluYWxTZWFyY2hWYWx1ZSA9ICQoJyNkb2NMaXN0dGgnKS50eXBlYWhlYWQoJ3ZhbCcpO1xuICAgICAgICBjb25zdCBodG1sU2VsZWN0ZWQgPSAkKHRoaXMpLmZpbmQoXCIuZGlzYWJsZVRoaXNcIikuaHRtbCgpO1xuICAgICAgICBzZWxlY3RlZExpc3QgPSBodG1sU2VsZWN0ZWQ7XG5cbiAgICAgICAgY29uc3QgclN0cm9uZyA9IG5ldyBSZWdFeHAoJzxzdHJvbmcgY2xhc3M9XCJ0dC1oaWdobGlnaHRcIj58PC9zdHJvbmc+JywgXCJnXCIpO1xuICAgICAgICBzZWxlY3RlZExpc3QgPSBzZWxlY3RlZExpc3QucmVwbGFjZShyU3Ryb25nLCBcIlwiKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHJBbXAgPSBuZXcgUmVnRXhwKCcmYW1wOycsIFwiZ1wiKTtcbiAgICAgICAgc2VsZWN0ZWRMaXN0ID0gc2VsZWN0ZWRMaXN0LnJlcGxhY2UockFtcCwgXCImXCIpO1xuICAgICAgICBcbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gYHNlbGVjdGVkTGlzdD0nJHtzZWxlY3RlZExpc3R9JzsgcGF0aD0vYDtcbiAgICAgICAgY29uc3QgRG9jaWQgPSAkKCQoaHRtbFNlbGVjdGVkKVszXSkudGV4dCgpO1xuICAgICAgICBjb25zb2xlLmxvZyhgJHtEb2NpZH0gaGlkZGVuSWRgKVxuICAgICAgICAkKFwiI2RvY0xpc3RIaWRkZW5cIikudmFsKERvY2lkKTtcbiAgICAgICAgY29va2llVmFsdWVzLmRvY0xpc3QgPSBEb2NpZFxuICAgICAgICBkb2N1bWVudC5jb29raWUgPSBgY29va2llVmFsdWVzRGV0YWlsZWQ9JHtKU09OLnN0cmluZ2lmeShjb29raWVWYWx1ZXMpfTsgIHBhdGg9L2A7XG4gICAgICAgIC8vaHRtbFNlbGVjdGVkID0gJChodG1sU2VsZWN0ZWQpLmFwcGVuZCgnPGRpdiBjbGFzcz1cImRlbGV0ZVNlYXJjaFwiPjxpbWcgc3JjPVwiaW1hZ2VzL2RlbGV0ZV9pY29uLnBuZ1wiIGFsdD1cIlwiIC8+PC9kaXY+JylcbiAgICAgICAgJChcIiNTZWFyY2hEb2NcIikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlVGhpc1wiKVxuICAgICAgICAkKFwiI1NlYXJjaERvYyB1bCBsaVwiKS5odG1sKFwiXCIpO1xuICAgICAgICAkKFwiI1NlYXJjaERvYyB1bCBsaVwiKS5odG1sKHNlbGVjdGVkTGlzdClcbiAgICAgICAgICAgIC8vcmVtb3ZlRG9jTGlzdCgpO1xuICAgICAgICAkKFwiLnR0LW1lbnUxXCIpLmFkZENsYXNzKFwiZGlzYWJsZVRoaXNcIik7XG4gICAgICAgICQoXCIudHQtbWVudTFcIikuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIilcblxuICAgICAgICBcbiAgICAgICAgJChcIiNkb2NMaXN0dGhcIikuYmx1cigpO1xuICAgICAgICAvLz1hZGRpbmcgZGVsZXRlIGJ1dHRvblxuICAgICAgICAkKFwiI1NlYXJjaERvYyB1bCBsaVwiKS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJkZWxldGVTZWFyY2hcIj48aW1nIHNyYz1cImltYWdlcy9kZWxldGVfaWNvbi5wbmdcIiBhbHQ9XCJcIiAvPjwvZGl2PicpO1xuICAgICAgICAkKFwiLmZpbmREb2N0b3JcIikuYWRkQ2xhc3MoXCJvcHRpb25TZWxlY3RlZFwiKTtcbiAgICAgICAgaWYgKCQoXCIjZG9jTGlzdEhpZGRlblwiKS52YWwoKSAhPSBcIlwiKXtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgJChcIi5uZXh0U3RlcEJ1dHRvbltkYXRhLUNyU3RlcE5vPScxJ11cIikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlVGhpc1wiKTsgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBpZih0eXBlb2YgZG9jTGlzdHRoVmFsdWUgIT0gXCJ1bmRlZmluZWRcIiAmJiBkb2NMaXN0dGhWYWx1ZSlcbiAgICAgICAgICAgICQoXCIubGlzdExpbmtcIikuYWRkQ2xhc3MoXCJkaXNhYmxlVGhpc1wiKTtcbiAgICAgICAgdHJhY2suY3VzdG9tRXZlbnRGaXJlKFwiRG9jdG9yU2VsZWN0ZWRcIik7XG5cbiAgICB9XG59KVxuXG5cbi8vPT09PT09PT09PT1kcmFnIGFuZCBkcm9wIGhhbmRsaW5nIGZvciBtb2JpbGVcbiQoZG9jdW1lbnQpLm9uKFwidG91Y2htb3ZlXCIsIFwiLmRvY2xpc3RTZWxlY3RcIiwgZSA9PiB7XG4gICAgZHJhZ2dpbmcgPSB0cnVlO1xufSk7XG5cbiQoZG9jdW1lbnQpLm9uKFwidG91Y2hlbmRcIiwgXCIuZG9jbGlzdFNlbGVjdFwiLCBlID0+IHtcbiAgICBpZiAoZHJhZ2dpbmcpXG4gICAgICAgIHJldHVybjtcbn0pO1xuXG4kKGRvY3VtZW50KS5vbihcInRvdWNoc3RhcnRcIiwgXCIuZG9jbGlzdFNlbGVjdFwiLCBlID0+IHtcbiAgICBkcmFnZ2luZyA9IGZhbHNlO1xufSk7XG5cbi8vPT09PT09PT09PT1kcmFnIGFuZCBkcm9wIGhhbmRsaW5nIGZvciBtb2JpbGVcblxuXG4kKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLmRlbGV0ZVNlYXJjaFwiLCAoKSA9PiB7XG4gICAgJChcIiNTZWFyY2hEb2NcIikuYWRkQ2xhc3MoXCJkaXNhYmxlVGhpc1wiKVxuICAgICQoXCIjU2VhcmNoRG9jIHVsIGxpXCIpLmh0bWwoXCJcIik7XG4gICAgJChcIiNkb2NMaXN0SGlkZGVuXCIpLnZhbChcIlwiKVxuICAgICQoXCIubmV4dFN0ZXBCdXR0b25bZGF0YS1DclN0ZXBObz0nMSddXCIpLmFkZENsYXNzKFwiZGlzYWJsZVRoaXNcIik7XG4gICAgaWYgKCQoXCIuc3RlcHNcIikuZmluZChcImFbaHJlZj0nI3N0ZXAyJ10gZGl2XCIpLmhhc0NsYXNzKFwiZG9uZVwiKSkge1xuICAgICAgICAkKFwiLnN0ZXBzXCIpLmZpbmQoXCJhW2hyZWY9JyNzdGVwMiddIGRpdlwiKS5yZW1vdmVDbGFzcyhcImRvbmVcIik7XG4gICAgICAgICQoXCIjdGFic1wiKS50YWJzKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgWzJdKTtcbiAgICB9XG4gICAgY29va2llVmFsdWVzLmRvY0xpc3QgPSBcIlwiO1xuICAgIGRvY3VtZW50LmNvb2tpZSA9IGBjb29raWVWYWx1ZXNEZXRhaWxlZD0ke0pTT04uc3RyaW5naWZ5KGNvb2tpZVZhbHVlcyl9OyAgcGF0aD0vYDtcbiAgICBkb2N1bWVudC5jb29raWUgPSBcInNlbGVjdGVkTGlzdD07IGV4cGlyZXM9VGh1LCAxOCBEZWMgMjAxMyAxMjowMDowMCBVVENcIjtcbiAgICAvL3JlbW92ZURvY0xpc3QoKTtcbiAgICBpZigkKFwiLnR0LW1lbnUxIC50dC1kYXRhc2V0LXJlc3VsdHMgdWxcIikubGVuZ3RoID4gMCl7XG4gICAgICAgICQoXCIudHQtbWVudTFcIikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlVGhpc1wiKTtcbiAgICAgICAgJChcIi50dC1tZW51MVwiKS5jc3MoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XG4gICAgfWVsc2VcbiAgICAgICAgJCgnI2RvY0xpc3R0aCcpLnR5cGVhaGVhZCgndmFsJywgY29va2llVmFsdWVzLmZpbmFsU2VhcmNoVmFsdWUpLmZvY3VzKCk7XG4gICAgJChcIi5maW5kRG9jdG9yXCIpLnJlbW92ZUNsYXNzKFwib3B0aW9uU2VsZWN0ZWRcIik7XG5cbiAgICBpZih0eXBlb2YgZG9jTGlzdHRoVmFsdWUgIT0gXCJ1bmRlZmluZWRcIiAmJiBkb2NMaXN0dGhWYWx1ZSAmJiAkKFwiI2RvY0xpc3R0aFwiKS52YWwoKS50cmltKCkubGVuZ3RoID4gMCl7XG4gICAgICAgICQoXCIubGlzdExpbmtcIikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlVGhpc1wiKTtcbiAgICB9ZWxzZSBpZih0eXBlb2YgZG9jTGlzdHRoVmFsdWUgIT0gXCJ1bmRlZmluZWRcIiAmJiBkb2NMaXN0dGhWYWx1ZSAmJiAkKFwiI2RvY0xpc3R0aFwiKS52YWwoKS50cmltKCkubGVuZ3RoID09IDApe1xuICAgICAgICAkKFwiLmxpc3RMaW5rXCIpLmFkZENsYXNzKFwiZGlzYWJsZVRoaXNcIik7XG4gICAgfVxuXG59KVxuXG4vLz09PT09PT09Y2xpY2tpbmcgb2YgZWRpdCBidXR0b25cbiQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIuZWRpdFwiLCBmdW5jdGlvbigpIHtcbiAgICAkKFwiI3RhYnNcIikudGFicyhcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIFtdKTtcbiAgICAkKGAuJHskKHRoaXMpLmF0dHIoJ3JlbCcpfWApLmNsaWNrKCk7XG59KVxuXG4vLz09PT09PT09Y2xpY2tpbmcgdG8gY2hlY2tvdXQgYnV0dG9uXG4kKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLmdvVG9DaGVja291dFwiLCAoKSA9PiB7XG4gICAgY29uc3QgYnJpZGdlVXJsID0gYnJpZGdlVXJsU2VsZWN0b3I7XG4gICAgY29uc3QgZG9jdG9yX2lkID0gJChcIiNkb2NMaXN0SGlkZGVuXCIpLnZhbCgpO1xuICAgIGNvbnN0IHJpZ2h0X2V5ZSA9ICQoXCIjbGVmdEV5ZVwiKS52YWwoKTtcbiAgICBjb25zdCBsZWZ0X2V5ZSA9ICQoXCIjcmlnaHRFeWVcIikudmFsKCk7XG4gICAgY29uc3QgYXR0cmlidXRlVmFsdWVzID0gYCZkb2N0b3JfaWQ9JHtkb2N0b3JfaWR9JnJpZ2h0X3Bvd2VyPSR7cmlnaHRfZXllfSZsZWZ0X3Bvd2VyPSR7bGVmdF9leWV9YDtcbiAgICBjb25zdCB1dG1fcGFybXMgPSBhYmFuYWx5dGljcy5zZXRVdG1QYXJhbXMoXCJyZXR1cm5QYXJhbXNcIiwgdXRtVG9rZW4pO1xuICAgIGNoZWNrb3V0VVJMID0gYnJpZGdlVXJsICsgdXRtX3Bhcm1zICsgYXR0cmlidXRlVmFsdWVzO1xuICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSBjaGVja291dFVSTDtcbn0pXG5cbiQoZG9jdW1lbnQpLm9uKFwiY2hhbmdlXCIsIFwiI3NlYXJjaERvY3RvclwiLCAoKSA9PiB7XG4gICAgKGV2ZW50RmlyZWRTdGVwVHdvLmhvbWVTdGF0ZSA9PSBmYWxzZSkgPyAodHJhY2suY3VzdG9tRXZlbnRGaXJlKFwiRG9jdG9yU3RhdGVTZWxlY3RlZFwiKSwgZXZlbnRGaXJlZFN0ZXBUd28uaG9tZVN0YXRlID0gdHJ1ZSkgOiBcIlwiO1xuICAgIGNvbnN0IFNlbGVjdGVkU3RhdGUgPSAkKFwiI3NlYXJjaERvY3RvclwiKS52YWwoKTtcbiAgICAvL3ZhciBjb29raWVWYWx1ZXMgPSB7bGVmdEV5ZTpcIlwiLCByaWdodEV5ZTogXCJcIiwgaG9tZVN0YXRlSWQ6IFwiXCIsIGhvbWVTdGF0ZSA6IFwiXCIsIGRvY0xpc3Q6IFwiXCIsIGN1cnJlbnRTdGF0ZSA6IDB9O1xuICAgIGNvb2tpZVZhbHVlcy5ob21lU3RhdGVJZCA9IG1JbmRleFN0YXRlW1NlbGVjdGVkU3RhdGVdXG4gICAgY29va2llVmFsdWVzLmhvbWVTdGF0ZSA9IFNlbGVjdGVkU3RhdGU7XG4gICAgZG9jdW1lbnQuY29va2llID0gYGNvb2tpZVZhbHVlc0RldGFpbGVkPSR7SlNPTi5zdHJpbmdpZnkoY29va2llVmFsdWVzKX07ICBwYXRoPS9gO1xuICAgICQoXCIuZGVsZXRlU2VhcmNoXCIpLmNsaWNrKCk7XG4gICAgZ2V0RG9jdG9yTGlzdChTZWxlY3RlZFN0YXRlKTtcbn0pO1xuXG4kKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiI2RvY3RvcklzbnRcIiwgKCkgPT4ge1xuICAgIHRyYWNrLmN1c3RvbUV2ZW50RmlyZShcIkRvY3Rvck5vdExpc3RlZFwiKTtcbiAgICAkKFwiI2RvY3Rvck1vZGFsXCIpLmZhZGVJbigpO1xufSk7XG5cbiQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIuY2xvc2VEaWFsb2dcIiwgKCkgPT4ge1xuICAgICQoXCIubW9kYWxGb3JtXCIpLnJlbW92ZUNsYXNzKFwiZXJyb3JcIilcbiAgICAkKFwiI21vZGFsRXJyb3JcIikuYWRkQ2xhc3MoXCJoaWRlXCIpO1xuICAgICQoXCIjbW9kYWxFcnJvck9uZVwiKS5hZGRDbGFzcyhcImhpZGVcIik7XG4gICAgJChcIiNkb2N0b3JNb2RhbFwiKS5mYWRlT3V0KCk7XG59KVxuXG4kKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiYm9keVwiLCBlID0+IHtcbiAgICBpZiAoJChcIiNkb2N0b3JNb2RhbFwiKS5jc3MoXCJkaXNwbGF5XCIpID09IFwiYmxvY2tcIiAmJiAkKGUudGFyZ2V0KS5hdHRyKFwiY2xhc3NcIikgPT0gXCJvdmVybGF5QmdcIikge1xuICAgICAgICAkKFwiLm1vZGFsRm9ybVwiKS5yZW1vdmVDbGFzcyhcImVycm9yXCIpXG4gICAgICAgICQoXCIjbW9kYWxFcnJvclwiKS5hZGRDbGFzcyhcImhpZGVcIik7XG4gICAgICAgICQoXCIjbW9kYWxFcnJvck9uZVwiKS5hZGRDbGFzcyhcImhpZGVcIik7XG4gICAgICAgICQoXCIjZG9jdG9yTW9kYWxcIikuZmFkZU91dCgpO1xuICAgIH1cbn0pXG5cbm9iamVjdEZvclZhbGlkYXRpb25zLmZvcm1UaHJlZU1vZGFsVmFsaWRhdGlvbiA9IChkb2NOYW1lLCBDbGluaWNOYW1lLCBkb2NDaXR5LCBCZG9jTmFtZSwgQkNsaW5pY05hbWUsIEJkb2NDaXR5LCBjaGVja2FsbCkgPT4ge1xuICAgIC8vPT09PT09PT09PT1kb2NuYW1lIGhhbmRsaW5nXG4gICAgaWYgKGRvY05hbWUgIT0gXCJcIiAmJiBkb2NOYW1lLmxlbmd0aCA+PSBtaW5MZW5ndGhSZXFbMF0pIHtcbiAgICAgICAgQmRvY05hbWUgPSAxO1xuICAgICAgICAkKFwiaW5wdXRbbmFtZT0nZG9jdG9yTmFtZSddXCIpLnJlbW92ZUNsYXNzKFwiZXJyb3JcIilcbiAgICB9IGVsc2UgaWYgKGNoZWNrYWxsID09IDEpXG4gICAgICAgICQoXCJpbnB1dFtuYW1lPSdkb2N0b3JOYW1lJ11cIikuYWRkQ2xhc3MoXCJlcnJvclwiKVxuXG4gICAgLy89PT09PT09PT09PUNsaW5pY05hbWUgaGFuZGxpbmdcbiAgICBpZiAoQ2xpbmljTmFtZSAhPSBcIlwiICYmIENsaW5pY05hbWUubGVuZ3RoID49IG1pbkxlbmd0aFJlcVsxXSkge1xuICAgICAgICBCQ2xpbmljTmFtZSA9IDE7XG4gICAgICAgICQoXCJpbnB1dFtuYW1lPSdjbGluaWNOYW1lJ11cIikucmVtb3ZlQ2xhc3MoXCJlcnJvclwiKVxuICAgIH0gZWxzZSBpZiAoY2hlY2thbGwgPT0gMSlcbiAgICAgICAgJChcImlucHV0W25hbWU9J2NsaW5pY05hbWUnXVwiKS5hZGRDbGFzcyhcImVycm9yXCIpXG5cbiAgICAvLz09PT09PT09PT09ZG9jQ2l0eSBoYW5kbGluZ1xuICAgIGlmIChkb2NDaXR5ICE9IFwiXCIgJiYgZG9jQ2l0eS5sZW5ndGggPj0gbWluTGVuZ3RoUmVxWzJdKSB7XG4gICAgICAgIEJkb2NDaXR5ID0gMTtcbiAgICAgICAgJChcImlucHV0W25hbWU9J2RvY0NpdHknXVwiKS5yZW1vdmVDbGFzcyhcImVycm9yXCIpXG4gICAgfSBlbHNlIGlmIChjaGVja2FsbCA9PSAxKVxuICAgICAgICAkKFwiaW5wdXRbbmFtZT0nZG9jQ2l0eSddXCIpLmFkZENsYXNzKFwiZXJyb3JcIilcblxuICAgIGNvbnN0IG15VmFsdWVzID0gYCR7QmRvY05hbWV9JHtCQ2xpbmljTmFtZX0ke0Jkb2NDaXR5fWA7XG4gICAgcmV0dXJuIG15VmFsdWVzO1xufVxuXG52YXIgbWluTGVuZ3RoUmVxID0gbmV3IEFycmF5KDUsIDUsIDMpO1xuY29uc3QgdmFsaWRDb21iaW5hdGlvbiA9IG5ldyBBcnJheShcIjExMFwiLCBcIjAxMVwiLCBcIjEwMVwiLCBcIjExMVwiKTtcblxuJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIiNzdWJtaXREb2NcIiwgKCkgPT4ge1xuICAgIGNvbnN0IGRvY05hbWUgPSAkKFwiaW5wdXRbbmFtZT0nZG9jdG9yTmFtZSddXCIpLnZhbCgpLnRyaW0oKTtcbiAgICBjb25zdCBDbGluaWNOYW1lID0gJChcImlucHV0W25hbWU9J2NsaW5pY05hbWUnXVwiKS52YWwoKS50cmltKCk7XG4gICAgY29uc3QgZG9jQ2l0eSA9ICQoXCJpbnB1dFtuYW1lPSdkb2NDaXR5J11cIikudmFsKCkudHJpbSgpO1xuICAgIGNvbnN0IEJkb2NOYW1lID0gMDtcbiAgICBjb25zdCBCQ2xpbmljTmFtZSA9IDA7XG4gICAgY29uc3QgQmRvY0NpdHkgPSAwO1xuICAgIGNvbnN0IG15VmFsdWVzID0gb2JqZWN0Rm9yVmFsaWRhdGlvbnMuZm9ybVRocmVlTW9kYWxWYWxpZGF0aW9uKGRvY05hbWUsIENsaW5pY05hbWUsIGRvY0NpdHksIEJkb2NOYW1lLCBCQ2xpbmljTmFtZSwgQmRvY0NpdHksIDEpO1xuXG4gICAgLy9teVZhbHVlcyA9IHBhcnNlSW50KG15VmFsdWVzKTtcblxuICAgIGlmICgkLmluQXJyYXkobXlWYWx1ZXMsIHZhbGlkQ29tYmluYXRpb24pID4gLTEpe1xuICAgICAgICB0cmFjay5jdXN0b21FdmVudEZpcmUoXCJEb2N0b3JBZGRlZEFuZFNlbGVjdGVkXCIpO1xuICAgICAgICB0cmFjay5jdXN0b21FdmVudEZpcmUoXCJEb2N0b3JTZWxlY3RlZFwiKTtcbiAgICAgICAgY29uc3QgbmV3Q3JlYXRlZElkID0gZ2V0TmV3bHlDcmVhdGVkRG9jSWQoZG9jTmFtZSwgQ2xpbmljTmFtZSwgZG9jQ2l0eSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBsZXQgZXJyb3JEaXNwbGF5ID0gXCJcIjtcbiAgICAgICAgJChcIi5tb2RhbEZvcm1cIikuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZXJyb3JEaXNwbGF5ICs9ICQodGhpcykudmFsKCkudHJpbSgpLmxlbmd0aDtcbiAgICAgICAgICAgIFxuICAgICAgICB9KTtcbiAgICAgICAgLy89LT09PT09PT09PWNoZWNrIHdoaWNoIGVycm9yICBtc2cgdG8gc2hvd1xuICAgICAgICBjb25zdCBhYmMgPSBuZXcgUmVnRXhwKFwiMFwiLCBcImdcIik7XG4gICAgICAgIGlmIChlcnJvckRpc3BsYXkubWF0Y2goYWJjKSAhPSBudWxsICYmIGVycm9yRGlzcGxheS5tYXRjaChhYmMpLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgICAgICAkKFwiI21vZGFsRXJyb3JPbmVcIikuYWRkQ2xhc3MoXCJoaWRlXCIpO1xuICAgICAgICAgICAgJChcIiNtb2RhbEVycm9yXCIpLnJlbW92ZUNsYXNzKFwiaGlkZVwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoXCIjbW9kYWxFcnJvclwiKS5hZGRDbGFzcyhcImhpZGVcIik7XG4gICAgICAgICAgICAkKFwiI21vZGFsRXJyb3JPbmVcIikucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbiQoZG9jdW1lbnQpLm9uKFwia2V5dXBcIiwgXCIubW9kYWxGb3JtXCIsIGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0ICRuYW1lID0gJCh0aGlzKS5hdHRyKFwibmFtZVwiKTtcbiAgICBjb25zdCBJbnB1dE5hbWUgPSAkKGBpbnB1dFtuYW1lPSckeyRuYW1lfSddYCkudmFsKCkudHJpbSgpO1xuICAgIHZhciBCZG9jTmFtZSA9IDA7XG4gICAgdmFyIEJDbGluaWNOYW1lID0gMDtcbiAgICB2YXIgQmRvY0NpdHkgPSAwO1xuICAgIGlmICgkbmFtZSA9PSBcImRvY3Rvck5hbWVcIilcbiAgICAgICAgdmFyIG15VmFsdWVzID0gb2JqZWN0Rm9yVmFsaWRhdGlvbnMuZm9ybVRocmVlTW9kYWxWYWxpZGF0aW9uKElucHV0TmFtZSwgXCJcIiwgXCJcIiwgQmRvY05hbWUsIFwiXCIsIFwiXCIsIDApO1xuICAgIGVsc2UgaWYgKCRuYW1lID09IFwiY2xpbmljTmFtZVwiKVxuICAgICAgICB2YXIgbXlWYWx1ZXMgPSBvYmplY3RGb3JWYWxpZGF0aW9ucy5mb3JtVGhyZWVNb2RhbFZhbGlkYXRpb24oXCJcIiwgSW5wdXROYW1lLCBcIlwiLCBcIlwiLCBCQ2xpbmljTmFtZSwgXCJcIiwgMCk7XG4gICAgZWxzZSBpZiAoJG5hbWUgPT0gXCJkb2NDaXR5XCIpXG4gICAgICAgIHZhciBteVZhbHVlcyA9IG9iamVjdEZvclZhbGlkYXRpb25zLmZvcm1UaHJlZU1vZGFsVmFsaWRhdGlvbihcIlwiLCBcIlwiLCBJbnB1dE5hbWUsIFwiXCIsIFwiXCIsIEJkb2NDaXR5LCAwKTtcblxuICAgIGlmIChteVZhbHVlcyA9PSAxICYmICQoYGlucHV0W25hbWU9JyR7JG5hbWV9J11gKS5oYXNDbGFzcyhcImVycm9yXCIpKSB7XG4gICAgICAgICQoYGlucHV0W25hbWU9JyR7JG5hbWV9J11gKS5yZW1vdmVDbGFzcyhcImVycm9yXCIpXG4gICAgfVxuXG4gICAgLy89PT09ZW5hYmxlIGRpc2FibGUgYnV0dG9uXG4gICAgY29uc3QgZG9jTmFtZSA9ICQoXCJpbnB1dFtuYW1lPSdkb2N0b3JOYW1lJ11cIikudmFsKCkudHJpbSgpO1xuICAgIGNvbnN0IENsaW5pY05hbWUgPSAkKFwiaW5wdXRbbmFtZT0nY2xpbmljTmFtZSddXCIpLnZhbCgpLnRyaW0oKTtcbiAgICBjb25zdCBkb2NDaXR5ID0gJChcImlucHV0W25hbWU9J2RvY0NpdHknXVwiKS52YWwoKS50cmltKCk7XG4gICAgdmFyIEJkb2NOYW1lID0gMDtcbiAgICB2YXIgQkNsaW5pY05hbWUgPSAwO1xuICAgIHZhciBCZG9jQ2l0eSA9IDA7XG4gICAgdmFyIG15VmFsdWVzID0gb2JqZWN0Rm9yVmFsaWRhdGlvbnMuZm9ybVRocmVlTW9kYWxWYWxpZGF0aW9uKGRvY05hbWUsIENsaW5pY05hbWUsIGRvY0NpdHksIEJkb2NOYW1lLCBCQ2xpbmljTmFtZSwgQmRvY0NpdHksIDApO1xuXG4gICAgaWYgKCQuaW5BcnJheShteVZhbHVlcywgdmFsaWRDb21iaW5hdGlvbikgPiAtMSkge1xuICAgICAgICAkKFwiI3N1Ym1pdERvY1wiKS5yZW1vdmVDbGFzcyhcImRpc2FibGVOZXh0XCIpO1xuICAgICAgICAkKFwiI21vZGFsRXJyb3JcIikuYWRkQ2xhc3MoXCJoaWRlXCIpO1xuICAgICAgICAkKFwiI21vZGFsRXJyb3JPbmVcIikuYWRkQ2xhc3MoXCJoaWRlXCIpO1xuICAgICAgICAkKFwiLm1vZGFsRm9ybVwiKS5yZW1vdmVDbGFzcyhcImVycm9yXCIpO1xuICAgIH0gZWxzZVxuICAgICAgICAkKFwiI3N1Ym1pdERvY1wiKS5hZGRDbGFzcyhcImRpc2FibGVOZXh0XCIpO1xufSk7XG5cbmZ1bmN0aW9uIGdldE5ld2x5Q3JlYXRlZERvY0lkKGRvY05hbWUsIENsaW5pY05hbWUsIGRvY0NpdHkpIHtcbiAgICBjb25zdCBzID0ge1xuICAgICAgICBuYW1lOiBkb2NOYW1lLFxuICAgICAgICBjbGluaWNfbmFtZTogQ2xpbmljTmFtZSxcbiAgICAgICAgY2l0eTogZG9jQ2l0eSxcbiAgICAgICAgc3RhdGU6ICQoXCIjc2VhcmNoRG9jdG9yXCIpLnZhbCgpXG4gICAgICAgICAgICAvL3N0YXRlOiBcIk1EXCJcbiAgICB9O1xuICAgICQuYWpheCh7XG4gICAgICAgIHR5cGU6IFwicG9zdFwiLFxuICAgICAgICB1cmw6IFwiaHR0cHM6Ly9hcGkuaHViYmxlY29udGFjdHMuY29tL3YxL2RvY3MvY3JlYXRlLmpzXCIsXG4gICAgICAgIGRhdGFUeXBlOiBcIkpTT05QXCIsXG4gICAgICAgIGRhdGE6IHMsXG4gICAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgICAgICBpZiAocmVzLnN0YXR1cyA9PSBcInN1Y2Nlc3NcIikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRvY0lkID0gcmVzLmRhdGEuZG9jLmlkO1xuICAgICAgICAgICAgICAgICQoXCIjZG9jTGlzdEhpZGRlblwiKS52YWwoZG9jSWQpO1xuICAgICAgICAgICAgICAgIGxldCBFbGVtZW50QWRkZWQgPSBgPGRpdiBjbGFzcyA9XCJzZWFyY2hOYW1lSGlkZGVuXCI+JHtkb2NOYW1lfTwvZGl2PmA7XG4gICAgICAgICAgICAgICAgRWxlbWVudEFkZGVkICs9IGA8ZGl2IGNsYXNzID0gXCJzZWFyY2hIb3NIaWRkZW5cIj4ke0NsaW5pY05hbWV9PC9kaXY+YDtcbiAgICAgICAgICAgICAgICBFbGVtZW50QWRkZWQgKz0gYDxkaXYgY2xhc3MgPSBcInNlYXJjaENpdHlIaWRkZW5cIiA+JHtkb2NDaXR5fTwvZGl2PmA7XG4gICAgICAgICAgICAgICAgRWxlbWVudEFkZGVkICs9IGA8ZGl2IGNsYXNzID0gXCJzZWFyY2hJZFwiIHN0eWxlPVwiZGlzcGxheTpub25lXCI+JHtkb2NJZH08L2RpdiA+YDtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZExpc3QgPSBFbGVtZW50QWRkZWQ7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuY29va2llID0gYHNlbGVjdGVkTGlzdD0ke0VsZW1lbnRBZGRlZH07IHBhdGg9L2A7XG4gICAgICAgICAgICAgICAgRWxlbWVudEFkZGVkICs9ICc8ZGl2IGNsYXNzID0gXCJkZWxldGVTZWFyY2hcIiA+PGltZyBzcmMgPSBcImltYWdlcy9kZWxldGVfaWNvbi5wbmdcIiBhbHQgPSBcIlwiIC8+PC9kaXY+JztcbiAgICAgICAgICAgICAgICAkKFwiI1NlYXJjaERvY1wiKS5yZW1vdmVDbGFzcyhcImRpc2FibGVUaGlzXCIpXG4gICAgICAgICAgICAgICAgJChcIiNTZWFyY2hEb2MgdWwgbGlcIikuaHRtbChcIlwiKTtcbiAgICAgICAgICAgICAgICAkKFwiI1NlYXJjaERvYyB1bCBsaVwiKS5odG1sKEVsZW1lbnRBZGRlZCk7XG4gICAgICAgICAgICAgICAgY29va2llVmFsdWVzLmRvY0xpc3QgPSBkb2NJZFxuICAgICAgICAgICAgICAgIGNvb2tpZVZhbHVlcy5maW5hbFNlYXJjaFZhbHVlID0gXCJcIjtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5jb29raWUgPSBgY29va2llVmFsdWVzRGV0YWlsZWQ9JHtKU09OLnN0cmluZ2lmeShjb29raWVWYWx1ZXMpfTsgIHBhdGg9L2A7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy9yZW1vdmVEb2NMaXN0KCk7XG4gICAgICAgICAgICAgICAgJChcIi50dC1tZW51MVwiKS5hZGRDbGFzcyhcImRpc2FibGVUaGlzXCIpO1xuICAgICAgICAgICAgICAgICQoXCIudHQtbWVudTFcIikuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgICAgICBpZiAoJChcIiNkb2NMaXN0SGlkZGVuXCIpLnZhbCgpICE9IFwiXCIpXG4gICAgICAgICAgICAgICAgICAgICQoXCIubmV4dFN0ZXBCdXR0b25bZGF0YS1DclN0ZXBObz0nMSddXCIpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZVRoaXNcIik7XG4gICAgICAgICAgICAgICAgJChcIiNkb2N0b3JNb2RhbFwiKS5mYWRlT3V0KCk7XG4gICAgICAgICAgICAgICAgJChcIi5tb2RhbEZvcm1cIikucmVtb3ZlQ2xhc3MoXCJlcnJvclwiKVxuICAgICAgICAgICAgICAgICQoXCIubW9kYWxGb3JtXCIpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykudmFsKFwiXCIpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAkKFwiI3N1Ym1pdERvY1wiKS5hZGRDbGFzcyhcImRpc2FibGVOZXh0XCIpO1xuICAgICAgICAgICAgICAgIGlmKHR5cGVvZiBkb2NMaXN0dGhWYWx1ZSAhPSBcInVuZGVmaW5lZFwiICYmIGRvY0xpc3R0aFZhbHVlKVxuICAgICAgICAgICAgICAgICAgICAkKFwiLmxpc3RMaW5rXCIpLmFkZENsYXNzKFwiZGlzYWJsZVRoaXNcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yKHQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3JcIiksIGNvbnNvbGUubG9nKHQpXG4gICAgICAgIH1cbiAgICB9KVxufVxuXG4vLyAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiI2FyY2hpdFwiLCBmdW5jdGlvbigpe1xuLy8gICAgIHZhciBlbWFpbF9wYXJhbXMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgY29va2llVmFsdWVzKTtcbi8vICAgICBkZWxldGUgZW1haWxfcGFyYW1zW1wiZmluYWxTZWFyY2hWYWx1ZVwiXVxuLy8gICAgIGZvcih0bXAgaW4gZW1haWxfcGFyYW1zKXtcbi8vICAgICAgICAgaWYoZW1haWxfcGFyYW1zW3RtcF0gPT0gXCJcIilcbi8vICAgICAgICAgICAgIGRlbGV0ZSBlbWFpbF9wYXJhbXNbdG1wXVxuLy8gICAgIH1cbi8vICAgICB2YXIgeHl6ID0gd2luZG93LmxvY2F0aW9uLmhyZWYgKyBcIiZcIiArICQucGFyYW0oZW1haWxfcGFyYW1zKVxuLy8gICAgIGNvbnNvbGUubG9nKHh5eilcbi8vIH0pXG4iXX0=
},{"./../js/jquery-ui.min.js":1,"./abanalytics.js":31,"./track.js":34,"bloodhound-js":2,"bootstrap-3-typeahead":15,"jquery":19,"jquery-selectric":18}],33:[function(require,module,exports){
// class User{
// 	register(){
// 		console.log("User Registered...");
// 	}
// }
//=use of classes
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = require('jquery');

var _abanalytics = require('./abanalytics.js');

require('./custom-subscribe-form.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//===================video tutorials
var User = function () {
	function User(username, email, password) {
		_classCallCheck(this, User);

		this.username = username;
		this.email = email;
		this.password = password;
	}

	_createClass(User, [{
		key: 'register',
		value: function register() {
			console.log(this.username + " is now Registered...");
		}
	}], [{
		key: 'countUsers',
		value: function countUsers() {
			console.log("There are 50 Users.");
		}
	}]);

	return User;
}();

//====method to call a function of a class


var bob = new User("bob", "bob@gmail.com", "dugar12345");
bob.register();

//====static method calling process
//User.countUsers();

// class Member extends User{
// 	constructor(username, email, password, memberPackage){
// 		super(username, email, password);
// 		this.package = memberPackage;
// 	}

// 	getPackage(){
// 		console.log(this.username + " is subscribed to the package " + this.package);
// 	}
// }


//===member class
//let mike = new Member("mike", "mike@gmail.com", "dugar12345", "standard");
//mike.getPackage();
//==============


//=templating

// let name = 'john';
// function makeUpperCase(word){
// 	return word.toUpperCase();
// }

// let template = 
// `<h3>${makeUpperCase("Hello")}, ${name}</h3>
// <p>This is a simple template in JS</p>`;

// document.getElementById('template').innerHTML = template;

//=================================================================

//=======================new string and number method
//let theString = "Hello, this is to test please take care.";

//=starts with
//console.log(theString.startsWith("Hello"));

//===ends with 
//console.log(theString.endsWith("care"));

//===includes
//console.log(theString.includes("test archit"));

//====number method
//-hexa
//console.log(0xFF);

///-----binary
//console.log(0b101011)
//console.log(Number.isInteger(4))
//=====================================================

//==================default params and spread method

// function greet($greeting = "Hello"){
// 	console.log($greeting);
// }

// greet();

// let args1 = [1,2,3];
// let args2 = [1,2,3];
// function test(){
// 	console.log(args);
// }

// //test.apply(null, args);

// test(...args);

//===================================================

//========new data structures
// let myArray = [11,22,34,65,71];
// let mySet = new Set(myArray);
// mySet.add(100);
// mySet.add({a : 1, b : 2})
// mySet.delete(22);
// //mySet.clear();

// console.log(mySet.size)

// mySet.forEach(function(val){
// 	console.log(val)
// })


// let carWeakSet = new WeakSet();
// let car1 = {
// 	'make' : 'honda',
// 	'model' : 'civic'
// };
// carWeakSet.add(car1);
// console.log(carWeakSet)

//===========================


//===========arrow function

// function prefixer(prefix){
// 	this.prefix = prefix;
// }

// prefixer.prototype.prefixArray = function(arr){
// 	return arr.map((x) => {
// 		console.log(this.prefix + x)
// 	})
// }

// let pre = new prefixer("hello ");
// pre.prefixArray(["brad", "jeff"])


// let add = (a,b) => {
// 	let sum = a + b;
// 	console.log(sum);
// 	return false;
// }

// add(2,4);
//=========================

//========================Promise=========
//=immediately resolved promise

//var myPromise = Promise.resolve('Foo');
//myPromise.then((res) => console.log(res));
// var myPromise = new Promise(function(resolve, reject){
// 	setTimeout(() => resolve(4),2000)
// });


// myPromise.then((res) => {
// 	res += 3;
// 	console.log(res);
// })


// function getData(method, url){
// 	return new Promise(function(resolve, reject){
// 		var xhr = new XMLHttpRequest();
// 		xhr.open(method, url);
// 		xhr.onload = function(){
// 			if(this.status >= 200 && this.status <= 300){
// 				resolve(this.response);
// 			}else{
// 				reject({
// 					status : this.status,
// 					statusText : this.statusText
// 				})
// 			}
// 		};

// 		xhr.onerror = function(){
// 			reject({
// 				status : this.status,
// 				statusText : this.statusText
// 			})
// 		}
// 		xhr.send();
// 	});
// }

// getData("GET", "https://jsonplaceholder.typicode.com/todos").then((res) => {
// 	console.log(res)
// 	let todos = JSON.parse(res);
// 	let output = '';
// 	for(let todo of todos){
// 		output += `
// 			<div><h3>${todo.title}</h3></div>
// 		`;
// 	}
// 	document.getElementById("template").innerHTML = output
// });
//=========================================

//========generators
// let regeneratorRuntime =  require("babel-polyfill");
// function *g1(){
// 	console.log("hello");
// 	yield 'Yield 1 ran...';
// 	console.log("world");
// 	yield 'Yield 1 ran...';
// }

// var g = g1();

// console.log(g.next())

//==================
//===================end video tutorials
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfZjRjYjg5ODguanMiXSwibmFtZXMiOlsiVXNlciIsInVzZXJuYW1lIiwiZW1haWwiLCJwYXNzd29yZCIsImNvbnNvbGUiLCJsb2ciLCJib2IiLCJyZWdpc3RlciJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFFQTs7QUFDQTs7QUFDQTs7OztBQUdBO0lBQ01BLEk7QUFDTCxlQUFZQyxRQUFaLEVBQXNCQyxLQUF0QixFQUE2QkMsUUFBN0IsRUFBc0M7QUFBQTs7QUFDckMsT0FBS0YsUUFBTCxHQUFrQkEsUUFBbEI7QUFDQSxPQUFLQyxLQUFMLEdBQWtCQSxLQUFsQjtBQUNBLE9BQUtDLFFBQUwsR0FBa0JBLFFBQWxCO0FBQ0E7Ozs7NkJBTVM7QUFDVEMsV0FBUUMsR0FBUixDQUFZLEtBQUtKLFFBQUwsR0FBZ0IsdUJBQTVCO0FBQ0E7OzsrQkFOa0I7QUFDbEJHLFdBQVFDLEdBQVIsQ0FBWSxxQkFBWjtBQUNBOzs7Ozs7QUFRRjs7O0FBQ0EsSUFBSUMsTUFBTSxJQUFJTixJQUFKLENBQVMsS0FBVCxFQUFnQixlQUFoQixFQUFpQyxZQUFqQyxDQUFWO0FBQ0FNLElBQUlDLFFBQUo7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFJQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUQ7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBIiwiZmlsZSI6ImZha2VfZjRjYjg5ODguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBjbGFzcyBVc2Vye1xuLy8gXHRyZWdpc3Rlcigpe1xuLy8gXHRcdGNvbnNvbGUubG9nKFwiVXNlciBSZWdpc3RlcmVkLi4uXCIpO1xuLy8gXHR9XG4vLyB9XG4vLz11c2Ugb2YgY2xhc3Nlc1xuXCJ1c2Ugc3RyaWN0XCJcblxuaW1wb3J0IHskLGpRdWVyeX0gZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB7YWJhbmFseXRpY3N9IGZyb20gJy4vYWJhbmFseXRpY3MuanMnO1xuaW1wb3J0ICcuL2N1c3RvbS1zdWJzY3JpYmUtZm9ybS5qcyc7XG5cblxuLy89PT09PT09PT09PT09PT09PT09dmlkZW8gdHV0b3JpYWxzXG5jbGFzcyBVc2Vye1xuXHRjb25zdHJ1Y3Rvcih1c2VybmFtZSwgZW1haWwsIHBhc3N3b3JkKXtcblx0XHR0aGlzLnVzZXJuYW1lICAgPSB1c2VybmFtZTtcblx0XHR0aGlzLmVtYWlsICAgICAgPSBlbWFpbDtcblx0XHR0aGlzLnBhc3N3b3JkICAgPSBwYXNzd29yZDtcblx0fVxuXG5cdHN0YXRpYyBjb3VudFVzZXJzKCl7XG5cdFx0Y29uc29sZS5sb2coXCJUaGVyZSBhcmUgNTAgVXNlcnMuXCIpO1xuXHR9XG5cblx0cmVnaXN0ZXIoKXtcblx0XHRjb25zb2xlLmxvZyh0aGlzLnVzZXJuYW1lICsgXCIgaXMgbm93IFJlZ2lzdGVyZWQuLi5cIik7XG5cdH1cbn1cblxuXG4vLz09PT1tZXRob2QgdG8gY2FsbCBhIGZ1bmN0aW9uIG9mIGEgY2xhc3NcbmxldCBib2IgPSBuZXcgVXNlcihcImJvYlwiLCBcImJvYkBnbWFpbC5jb21cIiwgXCJkdWdhcjEyMzQ1XCIpO1xuYm9iLnJlZ2lzdGVyKCk7XG5cbi8vPT09PXN0YXRpYyBtZXRob2QgY2FsbGluZyBwcm9jZXNzXG4vL1VzZXIuY291bnRVc2VycygpO1xuXG4vLyBjbGFzcyBNZW1iZXIgZXh0ZW5kcyBVc2Vye1xuLy8gXHRjb25zdHJ1Y3Rvcih1c2VybmFtZSwgZW1haWwsIHBhc3N3b3JkLCBtZW1iZXJQYWNrYWdlKXtcbi8vIFx0XHRzdXBlcih1c2VybmFtZSwgZW1haWwsIHBhc3N3b3JkKTtcbi8vIFx0XHR0aGlzLnBhY2thZ2UgPSBtZW1iZXJQYWNrYWdlO1xuLy8gXHR9XG5cbi8vIFx0Z2V0UGFja2FnZSgpe1xuLy8gXHRcdGNvbnNvbGUubG9nKHRoaXMudXNlcm5hbWUgKyBcIiBpcyBzdWJzY3JpYmVkIHRvIHRoZSBwYWNrYWdlIFwiICsgdGhpcy5wYWNrYWdlKTtcbi8vIFx0fVxuLy8gfVxuXG5cblxuLy89PT1tZW1iZXIgY2xhc3Ncbi8vbGV0IG1pa2UgPSBuZXcgTWVtYmVyKFwibWlrZVwiLCBcIm1pa2VAZ21haWwuY29tXCIsIFwiZHVnYXIxMjM0NVwiLCBcInN0YW5kYXJkXCIpO1xuLy9taWtlLmdldFBhY2thZ2UoKTtcbi8vPT09PT09PT09PT09PT1cblxuXG4vLz10ZW1wbGF0aW5nXG5cbi8vIGxldCBuYW1lID0gJ2pvaG4nO1xuLy8gZnVuY3Rpb24gbWFrZVVwcGVyQ2FzZSh3b3JkKXtcbi8vIFx0cmV0dXJuIHdvcmQudG9VcHBlckNhc2UoKTtcbi8vIH1cblxuLy8gbGV0IHRlbXBsYXRlID0gXG4vLyBgPGgzPiR7bWFrZVVwcGVyQ2FzZShcIkhlbGxvXCIpfSwgJHtuYW1lfTwvaDM+XG4vLyA8cD5UaGlzIGlzIGEgc2ltcGxlIHRlbXBsYXRlIGluIEpTPC9wPmA7XG5cbi8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZW1wbGF0ZScpLmlubmVySFRNTCA9IHRlbXBsYXRlO1xuXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8vPT09PT09PT09PT09PT09PT09PT09PT1uZXcgc3RyaW5nIGFuZCBudW1iZXIgbWV0aG9kXG4vL2xldCB0aGVTdHJpbmcgPSBcIkhlbGxvLCB0aGlzIGlzIHRvIHRlc3QgcGxlYXNlIHRha2UgY2FyZS5cIjtcblxuLy89c3RhcnRzIHdpdGhcbi8vY29uc29sZS5sb2codGhlU3RyaW5nLnN0YXJ0c1dpdGgoXCJIZWxsb1wiKSk7XG5cbi8vPT09ZW5kcyB3aXRoIFxuLy9jb25zb2xlLmxvZyh0aGVTdHJpbmcuZW5kc1dpdGgoXCJjYXJlXCIpKTtcblxuLy89PT1pbmNsdWRlc1xuLy9jb25zb2xlLmxvZyh0aGVTdHJpbmcuaW5jbHVkZXMoXCJ0ZXN0IGFyY2hpdFwiKSk7XG5cbi8vPT09PW51bWJlciBtZXRob2Rcbi8vLWhleGFcbi8vY29uc29sZS5sb2coMHhGRik7XG5cbi8vLy0tLS0tYmluYXJ5XG4vL2NvbnNvbGUubG9nKDBiMTAxMDExKVxuLy9jb25zb2xlLmxvZyhOdW1iZXIuaXNJbnRlZ2VyKDQpKVxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vLz09PT09PT09PT09PT09PT09PWRlZmF1bHQgcGFyYW1zIGFuZCBzcHJlYWQgbWV0aG9kXG5cbi8vIGZ1bmN0aW9uIGdyZWV0KCRncmVldGluZyA9IFwiSGVsbG9cIil7XG4vLyBcdGNvbnNvbGUubG9nKCRncmVldGluZyk7XG4vLyB9XG5cbi8vIGdyZWV0KCk7XG5cbi8vIGxldCBhcmdzMSA9IFsxLDIsM107XG4vLyBsZXQgYXJnczIgPSBbMSwyLDNdO1xuLy8gZnVuY3Rpb24gdGVzdCgpe1xuLy8gXHRjb25zb2xlLmxvZyhhcmdzKTtcbi8vIH1cblxuLy8gLy90ZXN0LmFwcGx5KG51bGwsIGFyZ3MpO1xuXG4vLyB0ZXN0KC4uLmFyZ3MpO1xuXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vLz09PT09PT09bmV3IGRhdGEgc3RydWN0dXJlc1xuXHQvLyBsZXQgbXlBcnJheSA9IFsxMSwyMiwzNCw2NSw3MV07XG5cdC8vIGxldCBteVNldCA9IG5ldyBTZXQobXlBcnJheSk7XG5cdC8vIG15U2V0LmFkZCgxMDApO1xuXHQvLyBteVNldC5hZGQoe2EgOiAxLCBiIDogMn0pXG5cdC8vIG15U2V0LmRlbGV0ZSgyMik7XG5cdC8vIC8vbXlTZXQuY2xlYXIoKTtcblxuXHQvLyBjb25zb2xlLmxvZyhteVNldC5zaXplKVxuXG5cdC8vIG15U2V0LmZvckVhY2goZnVuY3Rpb24odmFsKXtcblx0Ly8gXHRjb25zb2xlLmxvZyh2YWwpXG5cdC8vIH0pXG5cblxuXHQvLyBsZXQgY2FyV2Vha1NldCA9IG5ldyBXZWFrU2V0KCk7XG5cdC8vIGxldCBjYXIxID0ge1xuXHQvLyBcdCdtYWtlJyA6ICdob25kYScsXG5cdC8vIFx0J21vZGVsJyA6ICdjaXZpYydcblx0Ly8gfTtcblx0Ly8gY2FyV2Vha1NldC5hZGQoY2FyMSk7XG5cdC8vIGNvbnNvbGUubG9nKGNhcldlYWtTZXQpXG5cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuLy89PT09PT09PT09PWFycm93IGZ1bmN0aW9uXG5cbi8vIGZ1bmN0aW9uIHByZWZpeGVyKHByZWZpeCl7XG4vLyBcdHRoaXMucHJlZml4ID0gcHJlZml4O1xuLy8gfVxuXG4vLyBwcmVmaXhlci5wcm90b3R5cGUucHJlZml4QXJyYXkgPSBmdW5jdGlvbihhcnIpe1xuLy8gXHRyZXR1cm4gYXJyLm1hcCgoeCkgPT4ge1xuLy8gXHRcdGNvbnNvbGUubG9nKHRoaXMucHJlZml4ICsgeClcbi8vIFx0fSlcbi8vIH1cblxuLy8gbGV0IHByZSA9IG5ldyBwcmVmaXhlcihcImhlbGxvIFwiKTtcbi8vIHByZS5wcmVmaXhBcnJheShbXCJicmFkXCIsIFwiamVmZlwiXSlcblxuXG4vLyBsZXQgYWRkID0gKGEsYikgPT4ge1xuLy8gXHRsZXQgc3VtID0gYSArIGI7XG4vLyBcdGNvbnNvbGUubG9nKHN1bSk7XG4vLyBcdHJldHVybiBmYWxzZTtcbi8vIH1cblxuLy8gYWRkKDIsNCk7XG4vLz09PT09PT09PT09PT09PT09PT09PT09PT1cblxuLy89PT09PT09PT09PT09PT09PT09PT09PT1Qcm9taXNlPT09PT09PT09XG4vLz1pbW1lZGlhdGVseSByZXNvbHZlZCBwcm9taXNlXG5cbi8vdmFyIG15UHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgnRm9vJyk7XG4vL215UHJvbWlzZS50aGVuKChyZXMpID0+IGNvbnNvbGUubG9nKHJlcykpO1xuLy8gdmFyIG15UHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XG4vLyBcdHNldFRpbWVvdXQoKCkgPT4gcmVzb2x2ZSg0KSwyMDAwKVxuLy8gfSk7XG5cblxuLy8gbXlQcm9taXNlLnRoZW4oKHJlcykgPT4ge1xuLy8gXHRyZXMgKz0gMztcbi8vIFx0Y29uc29sZS5sb2cocmVzKTtcbi8vIH0pXG5cblxuLy8gZnVuY3Rpb24gZ2V0RGF0YShtZXRob2QsIHVybCl7XG4vLyBcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuLy8gXHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbi8vIFx0XHR4aHIub3BlbihtZXRob2QsIHVybCk7XG4vLyBcdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCl7XG4vLyBcdFx0XHRpZih0aGlzLnN0YXR1cyA+PSAyMDAgJiYgdGhpcy5zdGF0dXMgPD0gMzAwKXtcbi8vIFx0XHRcdFx0cmVzb2x2ZSh0aGlzLnJlc3BvbnNlKTtcbi8vIFx0XHRcdH1lbHNle1xuLy8gXHRcdFx0XHRyZWplY3Qoe1xuLy8gXHRcdFx0XHRcdHN0YXR1cyA6IHRoaXMuc3RhdHVzLFxuLy8gXHRcdFx0XHRcdHN0YXR1c1RleHQgOiB0aGlzLnN0YXR1c1RleHRcbi8vIFx0XHRcdFx0fSlcbi8vIFx0XHRcdH1cbi8vIFx0XHR9O1xuXG4vLyBcdFx0eGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpe1xuLy8gXHRcdFx0cmVqZWN0KHtcbi8vIFx0XHRcdFx0c3RhdHVzIDogdGhpcy5zdGF0dXMsXG4vLyBcdFx0XHRcdHN0YXR1c1RleHQgOiB0aGlzLnN0YXR1c1RleHRcbi8vIFx0XHRcdH0pXG4vLyBcdFx0fVxuLy8gXHRcdHhoci5zZW5kKCk7XG4vLyBcdH0pO1xuLy8gfVxuXG4vLyBnZXREYXRhKFwiR0VUXCIsIFwiaHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3RvZG9zXCIpLnRoZW4oKHJlcykgPT4ge1xuLy8gXHRjb25zb2xlLmxvZyhyZXMpXG4vLyBcdGxldCB0b2RvcyA9IEpTT04ucGFyc2UocmVzKTtcbi8vIFx0bGV0IG91dHB1dCA9ICcnO1xuLy8gXHRmb3IobGV0IHRvZG8gb2YgdG9kb3Mpe1xuLy8gXHRcdG91dHB1dCArPSBgXG4vLyBcdFx0XHQ8ZGl2PjxoMz4ke3RvZG8udGl0bGV9PC9oMz48L2Rpdj5cbi8vIFx0XHRgO1xuLy8gXHR9XG4vLyBcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGVtcGxhdGVcIikuaW5uZXJIVE1MID0gb3V0cHV0XG4vLyB9KTtcbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuLy89PT09PT09PWdlbmVyYXRvcnNcbi8vIGxldCByZWdlbmVyYXRvclJ1bnRpbWUgPSAgcmVxdWlyZShcImJhYmVsLXBvbHlmaWxsXCIpO1xuLy8gZnVuY3Rpb24gKmcxKCl7XG4vLyBcdGNvbnNvbGUubG9nKFwiaGVsbG9cIik7XG4vLyBcdHlpZWxkICdZaWVsZCAxIHJhbi4uLic7XG4vLyBcdGNvbnNvbGUubG9nKFwid29ybGRcIik7XG4vLyBcdHlpZWxkICdZaWVsZCAxIHJhbi4uLic7XG4vLyB9XG5cbi8vIHZhciBnID0gZzEoKTtcblxuLy8gY29uc29sZS5sb2coZy5uZXh0KCkpXG5cbi8vPT09PT09PT09PT09PT09PT09XG4vLz09PT09PT09PT09PT09PT09PT1lbmQgdmlkZW8gdHV0b3JpYWxzXG5cblxuXG5cbiJdfQ==
},{"./abanalytics.js":31,"./custom-subscribe-form.js":32,"jquery":19}],34:[function(require,module,exports){
'use strict';

var _abanalytics = require('./abanalytics.js');

var track = {};

track.fireCustomPixel = function (utmToken) {
    /* google pixel */
    (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments);
        }, i[r].l = 1 * new Date();a = s.createElement(o), m = s.getElementsByTagName(o)[0];a.async = 1;a.src = g;m.parentNode.insertBefore(a, m);
    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
    ga('create', 'UA-97162165-1', 'auto');
    var GACustomDimesions = {
        "LandingPage": "dimension1",
        "SubscribePage": "dimension2",
        "BlogPage": "dimension3",
        "trackerId": "dimension4",
        "auid": "dimension5"
        //====defining dimensions on basis of pageType
    };if (typeof pageType != "undefined" && pageType != "") {
        ga('set', GACustomDimesions[pageType], track.getVariant());
    }
    //==============================================

    //====creating dimesions on basis of GA auid
    var CreateObjectQueryParams = getQueryParams(window.location.search);
    var checkUid = settings.specialParams + 'auid' in CreateObjectQueryParams;
    if (checkUid) ga('set', GACustomDimesions["auid"], CreateObjectQueryParams[settings.specialParams + "auid"]);
    //===========================================


    /* facebook pixel */
    !function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
            n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '177398499339719'); // Insert your pixel ID here.
    fbq('track', 'PageView');
    fbq('init', '1762965547348977'); // Insert your pixel ID here.
    fbq('track', 'PageView');
    if (typeof $('.customEvent').val() != "undefined" && $('.customEvent').val()) {
        custom_event = $('.customEvent').val();
        fbq('trackCustom', custom_event);
    }
    if (typeof $('.customEventB').val() != "undefined" && $('.customEventB').val()) {
        custom_event = $('.customEventB').val();
        fbq('trackCustom', custom_event);
    }

    /** -- Ampush tracking call --**/
    /*-- Ampush Pixel Code --*/
    var t = document.createElement("script");
    t.setAttribute("type", "text/javascript");
    t.setAttribute("src", "//files.ampush.io/js/tracker.js?" + new Date().valueOf());
    "undefined" != typeof t && document.getElementsByTagName("head")[0].appendChild(t);
    /*-- Ampush Pixel Code --*/
    t.onload = function () {
        ampt.init("hubble", "e2f228d4-3be5-4f38-ad04-872a233186d5");
        var trackUtmPrams = _abanalytics.abanalytics.setUtmParams('tracker', utmToken);
        var variantName = track.getVariant();
        trackUtmPrams["utm_variant"] = variantName;
        ampt.pageview(trackUtmPrams);
        if (typeof $('.customEvent').val() != "undefined" && $('.customEvent').val()) {
            custom_event = $('.customEvent').val();
            ampt.track(custom_event, trackUtmPrams);
        }
        if (typeof $('.customEventB').val() != "undefined" && $('.customEventB').val()) {
            custom_event = $('.customEventB').val();
            ampt.track(custom_event, trackUtmPrams);
        }

        if (getCookie("amptuid") && getCookie("amptuid") != "") ga('set', GACustomDimesions["trackerId"], getCookie("amptuid"));

        var checkFS = setInterval(function () {
            if (typeof FS != "undefined" && FSstart == true) {
                FSstart = false;
                console.log("variant saved to FS");

                clearInterval(checkFS);
                console.log(getCookie("amptuid"), variantName);
                FS.setUserVars({
                    "displayName": getCookie("amptuid"),
                    "variant_str": variantName,
                    "tracker_str": getCookie("amptuid")
                });
            }
        }, 1000);
        setTimeout(function () {
            clearInterval(checkFS);
        }, 5000);

        sendGaEvents();
    };
    t.onerror = function () {
        sendGaEvents();
    };

    //Ampush LiveIntent Remarketing Pixel Code 
    !function () {
        var t = document.createElement("script");t.setAttribute("type", "text/javascript");
        t.setAttribute("src", "//b-code.liadm.com/a-00re.min.js");t.setAttribute("async", "true");t.setAttribute("charset", "utf-8");
        "undefined" != typeof t && document.getElementsByTagName("head")[0].appendChild(t);
    }();
    //End Ampush LiveIntent Remarketing Pixel Code 
};

track.getVariant = function () {
    var paths = window.location.pathname;
    var filename = paths.split("/").pop();
    var pageName = filename.replace(".html", "");
    //===variant name to be added on every page
    //var variantName = "hubble-replica-b";
    var variantName = typeof variantNameNew == "undefined" ? "hubble-replica-b" : variantNameNew;
    if (pageName != "" && typeof variantNameNew == "undefined") variantName = "hubble-replica-" + pageName + "-b";
    //alert(variantName)
    return variantName;
};

/*-- Click events --*/
//$('.eventTrack').on('click', function () {
$(document).on('click', '.eventTrack', function () {
    var rel = $(this).attr('rel');
    if (typeof rel != 'undefined' && rel) {
        var rel = rel.split(",");
    }
    var target = $(this).attr('href');
    if (typeof rel != 'undefined' && rel.length > 0) {
        var x;
        var variantName = track.getVariant();
        var trackUtmPrams = {};
        trackUtmPrams["utm_variant"] = variantName;
        for (x in rel) {

            if (typeof fbq != 'undefined' && fbq) {
                fbq('trackCustom', rel[x].trim());
            }
            if (typeof ampt != 'undefined' && ampt) {
                ampt.track(rel[x].trim(), trackUtmPrams);
            }
            if (typeof ga != 'undefined' && ga) {
                try {
                    if (typeof target == 'undefined' || target == '' || target == 'javascript:void(0);') {
                        target = rel[x].trim();
                    }
                    ga('send', 'event', {
                        eventCategory: rel[x].trim(),
                        eventAction: 'click',
                        eventLabel: target
                    });
                } catch (e) {
                    console.log(e);
                }
            }
        }
    }
});

/*-- Click events --*/
//==taboola pixel
window._tfa = window._tfa || [];
_tfa.push({ notify: 'mark', name: 'site_visitor' });
!function () {
    var t = document.createElement("script");t.setAttribute("type", "text/javascript");
    t.setAttribute("src", "//cdn.taboola.com/libtrc/ampush-hubblecontacts-sc/tfa.js");
    "undefined" != typeof t && document.getElementsByTagName("head")[0].appendChild(t);
}();

track.customEventFire = function (events) {

    var rel = events;
    var rel = rel.split(",");
    if (rel != 'undefined' && rel.length > 0) {
        var x;
        var variantName = track.getVariant();
        var trackUtmPrams = {};
        trackUtmPrams["utm_variant"] = variantName;
        for (x in rel) {

            if (rel[x].trim() != "firePageView") {
                if (typeof fbq != 'undefined' && fbq) {
                    fbq('trackCustom', rel[x].trim());
                }
                if (typeof ampt != 'undefined' && ampt) {
                    ampt.track(rel[x].trim(), trackUtmPrams);
                }
                if (typeof ga != 'undefined' && ga) {
                    if (rel[x].trim() == 'SubscribeDoctorPageVisit' || rel[x].trim() == 'SubscribeReviewPageVisit' || rel[x].trim() == 'SubscribeRxPageVisit') {
                        ga('send', 'event', {
                            eventCategory: rel[x].trim(),
                            eventAction: 'pageload',
                            eventLabel: rel[x].trim()
                        });
                    } else {
                        ga('send', 'event', {
                            eventCategory: rel[x].trim(),
                            eventAction: 'click',
                            eventLabel: rel[x].trim()
                        });
                    }
                }
            } else {
                var trackUtmPrams = _abanalytics.abanalytics.setUtmParams('tracker', _abanalytics.utmToken);
                trackUtmPrams["utm_variant"] = variantName;
                if (typeof ampt != 'undefined' && ampt) {
                    ampt.pageview(trackUtmPrams);
                }
                if (typeof fbq != 'undefined' && fbq) {
                    fbq('track', 'PageView');
                }
                if (typeof ga != 'undefined' && ga) {
                    ga('send', 'pageview');
                }
            }
        }
    }
};

function sendGaEvents() {
    ga('send', 'pageview');
    if (typeof $('.customEvent').val() != "undefined" && $('.customEvent').val()) {
        custom_event = $('.customEvent').val();
        ga('send', 'event', {
            eventCategory: custom_event,
            eventAction: 'pageload',
            eventLabel: window.location.href
        });
    }
    if (typeof $('.customEventB').val() != "undefined" && $('.customEventB').val()) {
        custom_event = $('.customEventB').val();
        ga('send', 'event', {
            eventCategory: custom_event,
            eventAction: 'pageload',
            eventLabel: window.location.href
        });
    }
}

module.exports = track;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRyYWNrLmpzIl0sIm5hbWVzIjpbInRyYWNrIiwiZmlyZUN1c3RvbVBpeGVsIiwidXRtVG9rZW4iLCJpIiwicyIsIm8iLCJnIiwiciIsImEiLCJtIiwicSIsInB1c2giLCJhcmd1bWVudHMiLCJsIiwiRGF0ZSIsImNyZWF0ZUVsZW1lbnQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImFzeW5jIiwic3JjIiwicGFyZW50Tm9kZSIsImluc2VydEJlZm9yZSIsIndpbmRvdyIsImRvY3VtZW50IiwiZ2EiLCJHQUN1c3RvbURpbWVzaW9ucyIsInBhZ2VUeXBlIiwiZ2V0VmFyaWFudCIsIkNyZWF0ZU9iamVjdFF1ZXJ5UGFyYW1zIiwiZ2V0UXVlcnlQYXJhbXMiLCJsb2NhdGlvbiIsInNlYXJjaCIsImNoZWNrVWlkIiwic2V0dGluZ3MiLCJzcGVjaWFsUGFyYW1zIiwiZiIsImIiLCJlIiwidiIsIm4iLCJ0IiwiZmJxIiwiY2FsbE1ldGhvZCIsImFwcGx5IiwicXVldWUiLCJfZmJxIiwibG9hZGVkIiwidmVyc2lvbiIsIiQiLCJ2YWwiLCJjdXN0b21fZXZlbnQiLCJzZXRBdHRyaWJ1dGUiLCJ2YWx1ZU9mIiwiYXBwZW5kQ2hpbGQiLCJvbmxvYWQiLCJhbXB0IiwiaW5pdCIsInRyYWNrVXRtUHJhbXMiLCJzZXRVdG1QYXJhbXMiLCJ2YXJpYW50TmFtZSIsInBhZ2V2aWV3IiwiZ2V0Q29va2llIiwiY2hlY2tGUyIsInNldEludGVydmFsIiwiRlMiLCJGU3N0YXJ0IiwiY29uc29sZSIsImxvZyIsImNsZWFySW50ZXJ2YWwiLCJzZXRVc2VyVmFycyIsInNldFRpbWVvdXQiLCJzZW5kR2FFdmVudHMiLCJvbmVycm9yIiwicGF0aHMiLCJwYXRobmFtZSIsImZpbGVuYW1lIiwic3BsaXQiLCJwb3AiLCJwYWdlTmFtZSIsInJlcGxhY2UiLCJ2YXJpYW50TmFtZU5ldyIsIm9uIiwicmVsIiwiYXR0ciIsInRhcmdldCIsImxlbmd0aCIsIngiLCJ0cmltIiwiZXZlbnRDYXRlZ29yeSIsImV2ZW50QWN0aW9uIiwiZXZlbnRMYWJlbCIsIl90ZmEiLCJub3RpZnkiLCJuYW1lIiwiY3VzdG9tRXZlbnRGaXJlIiwiZXZlbnRzIiwiaHJlZiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBQ0EsSUFBSUEsUUFBUSxFQUFaOztBQUVBQSxNQUFNQyxlQUFOLEdBQXdCLFVBQVVDLFFBQVYsRUFBb0I7QUFDeEM7QUFDQSxLQUFDLFVBQVNDLENBQVQsRUFBV0MsQ0FBWCxFQUFhQyxDQUFiLEVBQWVDLENBQWYsRUFBaUJDLENBQWpCLEVBQW1CQyxDQUFuQixFQUFxQkMsQ0FBckIsRUFBdUI7QUFBQ04sVUFBRSx1QkFBRixJQUEyQkksQ0FBM0IsQ0FBNkJKLEVBQUVJLENBQUYsSUFBS0osRUFBRUksQ0FBRixLQUFNLFlBQVU7QUFDMUUsYUFBQ0osRUFBRUksQ0FBRixFQUFLRyxDQUFMLEdBQU9QLEVBQUVJLENBQUYsRUFBS0csQ0FBTCxJQUFRLEVBQWhCLEVBQW9CQyxJQUFwQixDQUF5QkMsU0FBekI7QUFBb0MsU0FEaUIsRUFDaEJULEVBQUVJLENBQUYsRUFBS00sQ0FBTCxHQUFPLElBQUUsSUFBSUMsSUFBSixFQURPLENBQ0lOLElBQUVKLEVBQUVXLGFBQUYsQ0FBZ0JWLENBQWhCLENBQUYsRUFDekRJLElBQUVMLEVBQUVZLG9CQUFGLENBQXVCWCxDQUF2QixFQUEwQixDQUExQixDQUR1RCxDQUMxQkcsRUFBRVMsS0FBRixHQUFRLENBQVIsQ0FBVVQsRUFBRVUsR0FBRixHQUFNWixDQUFOLENBQVFHLEVBQUVVLFVBQUYsQ0FBYUMsWUFBYixDQUEwQlosQ0FBMUIsRUFBNEJDLENBQTVCO0FBQ2hELEtBSEYsRUFHSVksTUFISixFQUdXQyxRQUhYLEVBR29CLFFBSHBCLEVBRzZCLCtDQUg3QixFQUc2RSxJQUg3RTtBQUlDQyxPQUFHLFFBQUgsRUFBYSxlQUFiLEVBQThCLE1BQTlCO0FBQ0EsUUFBSUMsb0JBQW9CO0FBQ3JCLHVCQUFrQixZQURHO0FBRXJCLHlCQUFrQixZ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O0FBS0Y7QUFDRCxRQUFJLE9BQU9oRCxFQUFFLGVBQUYsRUFBbUJDLEdBQW5CLEVBQVAsSUFBbUMsV0FBbkMsSUFBa0RELEVBQUUsZUFBRixFQUFtQkMsR0FBbkIsRUFBdEQsRUFBZ0Y7QUFDN0VDLHVCQUFlRixFQUFFLGVBQUYsRUFBbUJDLEdBQW5CLEVBQWY7QUFDQXpCLFdBQUcsTUFBSCxFQUFXLE9BQVgsRUFBb0I7QUFDaEJnRSwyQkFBZXRDLFlBREM7QUFFaEJ1Qyx5QkFBYSxVQUZHO0FBR2hCQyx3QkFBWXBFLE9BQU9RLFFBQVAsQ0FBZ0JrRTtBQUhaLFNBQXBCO0FBS0Y7QUFDTDs7QUFFREMsT0FBT0MsT0FBUCxHQUFpQmpHLEtBQWpCIiwiZmlsZSI6InRyYWNrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHt1dG1Ub2tlbixhYmFuYWx5dGljc30gZnJvbSAnLi9hYmFuYWx5dGljcy5qcyc7XG52YXIgdHJhY2sgPSB7fTtcblxudHJhY2suZmlyZUN1c3RvbVBpeGVsID0gZnVuY3Rpb24gKHV0bVRva2VuKSB7XG4gICAgLyogZ29vZ2xlIHBpeGVsICovXG4gICAgKGZ1bmN0aW9uKGkscyxvLGcscixhLG0pe2lbJ0dvb2dsZUFuYWx5dGljc09iamVjdCddPXI7aVtyXT1pW3JdfHxmdW5jdGlvbigpe1xuICAgICAoaVtyXS5xPWlbcl0ucXx8W10pLnB1c2goYXJndW1lbnRzKX0saVtyXS5sPTEqbmV3IERhdGUoKTthPXMuY3JlYXRlRWxlbWVudChvKSxcbiAgICAgbT1zLmdldEVsZW1lbnRzQnlUYWdOYW1lKG8pWzBdO2EuYXN5bmM9MTthLnNyYz1nO20ucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoYSxtKVxuICAgICB9KSh3aW5kb3csZG9jdW1lbnQsJ3NjcmlwdCcsJ2h0dHBzOi8vd3d3Lmdvb2dsZS1hbmFseXRpY3MuY29tL2FuYWx5dGljcy5qcycsJ2dhJyk7XG4gICAgIGdhKCdjcmVhdGUnLCAnVUEtOTcxNjIxNjUtMScsICdhdXRvJyk7XG4gICAgIHZhciBHQUN1c3RvbURpbWVzaW9ucyA9IHtcbiAgICAgICAgXCJMYW5kaW5nUGFnZVwiICAgOiBcImRpbWVuc2lvbjFcIixcbiAgICAgICAgXCJTdWJzY3JpYmVQYWdlXCIgOiBcImRpbWVuc2lvbjJcIixcbiAgICAgICAgXCJCbG9nUGFnZVwiICAgICAgOiBcImRpbWVuc2lvbjNcIixcbiAgICAgICAgXCJ0cmFja2VySWRcIiAgICAgOiBcImRpbWVuc2lvbjRcIixcbiAgICAgICAgXCJhdWlkXCIgICAgICAgICAgOiBcImRpbWVuc2lvbjVcIixcbiAgICAgfVxuICAgICAvLz09PT1kZWZpbmluZyBkaW1lbnNpb25zIG9uIGJhc2lzIG9mIHBhZ2VUeXBlXG4gICAgIGlmKHR5cGVvZiBwYWdlVHlwZSAhPSBcInVuZGVmaW5lZFwiICYmIHBhZ2VUeXBlICE9IFwiXCIpe1xuICAgICAgICBnYSgnc2V0JywgR0FDdXN0b21EaW1lc2lvbnNbcGFnZVR5cGVdLCB0cmFjay5nZXRWYXJpYW50KCkpO1xuICAgICB9XG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgIFxuICAgICAvLz09PT1jcmVhdGluZyBkaW1lc2lvbnMgb24gYmFzaXMgb2YgR0EgYXVpZFxuICAgICB2YXIgQ3JlYXRlT2JqZWN0UXVlcnlQYXJhbXMgPSBnZXRRdWVyeVBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcbiAgICAgdmFyIGNoZWNrVWlkID0gc2V0dGluZ3Muc3BlY2lhbFBhcmFtcysnYXVpZCcgaW4gQ3JlYXRlT2JqZWN0UXVlcnlQYXJhbXM7XG4gICAgIGlmKGNoZWNrVWlkKVxuICAgICAgICBnYSgnc2V0JywgR0FDdXN0b21EaW1lc2lvbnNbXCJhdWlkXCJdLCBDcmVhdGVPYmplY3RRdWVyeVBhcmFtc1tzZXR0aW5ncy5zcGVjaWFsUGFyYW1zK1wiYXVpZFwiXSk7XG4gICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgIFxuICAgIC8qIGZhY2Vib29rIHBpeGVsICovXG4gICAgIWZ1bmN0aW9uIChmLCBiLCBlLCB2LCBuLCB0LCBzKSB7XG4gICAgICAgIGlmIChmLmZicSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgbiA9IGYuZmJxID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbi5jYWxsTWV0aG9kID9cbiAgICAgICAgICAgICAgICAgICAgbi5jYWxsTWV0aG9kLmFwcGx5KG4sIGFyZ3VtZW50cykgOiBuLnF1ZXVlLnB1c2goYXJndW1lbnRzKVxuICAgICAgICB9O1xuICAgICAgICBpZiAoIWYuX2ZicSlcbiAgICAgICAgICAgIGYuX2ZicSA9IG47XG4gICAgICAgIG4ucHVzaCA9IG47XG4gICAgICAgIG4ubG9hZGVkID0gITA7XG4gICAgICAgIG4udmVyc2lvbiA9ICcyLjAnO1xuICAgICAgICBuLnF1ZXVlID0gW107XG4gICAgICAgIHQgPSBiLmNyZWF0ZUVsZW1lbnQoZSk7XG4gICAgICAgIHQuYXN5bmMgPSAhMDtcbiAgICAgICAgdC5zcmMgPSB2O1xuICAgICAgICBzID0gYi5nZXRFbGVtZW50c0J5VGFnTmFtZShlKVswXTtcbiAgICAgICAgcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0LCBzKVxuICAgIH0od2luZG93LFxuICAgICAgICAgICAgZG9jdW1lbnQsICdzY3JpcHQnLCAnaHR0cHM6Ly9jb25uZWN0LmZhY2Vib29rLm5ldC9lbl9VUy9mYmV2ZW50cy5qcycpO1xuICAgIGZicSgnaW5pdCcsICcxNzczOTg0OTkzMzk3MTknKTsgLy8gSW5zZXJ0IHlvdXIgcGl4ZWwgSUQgaGVyZS5cbiAgICBmYnEoJ3RyYWNrJywgJ1BhZ2VWaWV3Jyk7XG4gICAgZmJxKCdpbml0JywgJzE3NjI5NjU1NDczNDg5NzcnKTsgLy8gSW5zZXJ0IHlvdXIgcGl4ZWwgSUQgaGVyZS5cbiAgICBmYnEoJ3RyYWNrJywgJ1BhZ2VWaWV3Jyk7XG4gICAgaWYgKHR5cGVvZiAkKCcuY3VzdG9tRXZlbnQnKS52YWwoKSAhPSBcInVuZGVmaW5lZFwiICYmICQoJy5jdXN0b21FdmVudCcpLnZhbCgpKSB7XG4gICAgICAgIGN1c3RvbV9ldmVudCA9ICQoJy5jdXN0b21FdmVudCcpLnZhbCgpO1xuICAgICAgICBmYnEoJ3RyYWNrQ3VzdG9tJywgY3VzdG9tX2V2ZW50KTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiAkKCcuY3VzdG9tRXZlbnRCJykudmFsKCkgIT0gXCJ1bmRlZmluZWRcIiAmJiAkKCcuY3VzdG9tRXZlbnRCJykudmFsKCkpIHtcbiAgICAgICAgY3VzdG9tX2V2ZW50ID0gJCgnLmN1c3RvbUV2ZW50QicpLnZhbCgpO1xuICAgICAgICBmYnEoJ3RyYWNrQ3VzdG9tJywgY3VzdG9tX2V2ZW50KTtcbiAgICB9XG5cbiAgICAvKiogLS0gQW1wdXNoIHRyYWNraW5nIGNhbGwgLS0qKi9cbiAgICAvKi0tIEFtcHVzaCBQaXhlbCBDb2RlIC0tKi9cbiAgICB2YXIgdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAgdC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwidGV4dC9qYXZhc2NyaXB0XCIpO1xuICAgIHQuc2V0QXR0cmlidXRlKFwic3JjXCIsIFwiLy9maWxlcy5hbXB1c2guaW8vanMvdHJhY2tlci5qcz9cIiArIChuZXcgRGF0ZSkudmFsdWVPZigpKTtcbiAgICBcInVuZGVmaW5lZFwiICE9IHR5cGVvZiB0ICYmIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5hcHBlbmRDaGlsZCh0KTtcbiAgICAvKi0tIEFtcHVzaCBQaXhlbCBDb2RlIC0tKi9cbiAgICB0Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYW1wdC5pbml0KFwiaHViYmxlXCIsIFwiZTJmMjI4ZDQtM2JlNS00ZjM4LWFkMDQtODcyYTIzMzE4NmQ1XCIpO1xuICAgICAgICB2YXIgdHJhY2tVdG1QcmFtcyA9IGFiYW5hbHl0aWNzLnNldFV0bVBhcmFtcygndHJhY2tlcicsIHV0bVRva2VuKTtcbiAgICAgICAgdmFyIHZhcmlhbnROYW1lID0gdHJhY2suZ2V0VmFyaWFudCgpO1xuICAgICAgICB0cmFja1V0bVByYW1zW1widXRtX3ZhcmlhbnRcIl0gPSB2YXJpYW50TmFtZTtcbiAgICAgICAgYW1wdC5wYWdldmlldyh0cmFja1V0bVByYW1zKTtcbiAgICAgICAgaWYgKHR5cGVvZiAkKCcuY3VzdG9tRXZlbnQnKS52YWwoKSAhPSBcInVuZGVmaW5lZFwiICYmICQoJy5jdXN0b21FdmVudCcpLnZhbCgpKSB7XG4gICAgICAgICAgICBjdXN0b21fZXZlbnQgPSAkKCcuY3VzdG9tRXZlbnQnKS52YWwoKTtcbiAgICAgICAgICAgIGFtcHQudHJhY2soY3VzdG9tX2V2ZW50LCB0cmFja1V0bVByYW1zKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mICQoJy5jdXN0b21FdmVudEInKS52YWwoKSAhPSBcInVuZGVmaW5lZFwiICYmICQoJy5jdXN0b21FdmVudEInKS52YWwoKSkge1xuICAgICAgICAgICAgY3VzdG9tX2V2ZW50ID0gJCgnLmN1c3RvbUV2ZW50QicpLnZhbCgpO1xuICAgICAgICAgICAgYW1wdC50cmFjayhjdXN0b21fZXZlbnQsIHRyYWNrVXRtUHJhbXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoZ2V0Q29va2llKFwiYW1wdHVpZFwiKSAmJiBnZXRDb29raWUoXCJhbXB0dWlkXCIpIT1cIlwiKVxuICAgICAgICAgICAgZ2EoJ3NldCcsIEdBQ3VzdG9tRGltZXNpb25zW1widHJhY2tlcklkXCJdLCBnZXRDb29raWUoXCJhbXB0dWlkXCIpKTsgICAgXG4gICAgICAgIFxuICAgICAgICB2YXIgY2hlY2tGUyA9IHNldEludGVydmFsKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpZih0eXBlb2YgRlMhPVwidW5kZWZpbmVkXCIgJiYgRlNzdGFydCA9PSB0cnVlKXtcbiAgICAgICAgICAgICAgICBGU3N0YXJ0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ2YXJpYW50IHNhdmVkIHRvIEZTXCIpXG5cbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGNoZWNrRlMpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGdldENvb2tpZShcImFtcHR1aWRcIiksIHZhcmlhbnROYW1lKTtcbiAgICAgICAgICAgICAgICBGUy5zZXRVc2VyVmFycyh7XG4gICAgICAgICAgICAgICAgICAgIFwiZGlzcGxheU5hbWVcIiA6IGdldENvb2tpZShcImFtcHR1aWRcIiksXG4gICAgICAgICAgICAgICAgICAgIFwidmFyaWFudF9zdHJcIiAgIDogdmFyaWFudE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIFwidHJhY2tlcl9zdHJcIiA6IGdldENvb2tpZShcImFtcHR1aWRcIilcbiAgICAgICAgICAgICAgICB9KTsgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sMTAwMClcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoY2hlY2tGUyk7XG4gICAgICAgIH0sNTAwMCk7XG5cbiAgICAgICAgc2VuZEdhRXZlbnRzKCk7XG4gICAgfVxuICAgIHQub25lcnJvciA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHNlbmRHYUV2ZW50cygpO1xuICAgIH1cblxuICAgIC8vQW1wdXNoIExpdmVJbnRlbnQgUmVtYXJrZXRpbmcgUGl4ZWwgQ29kZSBcbiAgICAhZnVuY3Rpb24oKXt2YXIgdD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO3Quc2V0QXR0cmlidXRlKFwidHlwZVwiLFwidGV4dC9qYXZhc2NyaXB0XCIpO1xuICAgIHQuc2V0QXR0cmlidXRlKFwic3JjXCIsXCIvL2ItY29kZS5saWFkbS5jb20vYS0wMHJlLm1pbi5qc1wiKTt0LnNldEF0dHJpYnV0ZShcImFzeW5jXCIsXCJ0cnVlXCIpO3Quc2V0QXR0cmlidXRlKFwiY2hhcnNldFwiLFwidXRmLThcIik7XG4gICAgXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHQmJmRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5hcHBlbmRDaGlsZCh0KTt9KClcbiAgICAvL0VuZCBBbXB1c2ggTGl2ZUludGVudCBSZW1hcmtldGluZyBQaXhlbCBDb2RlIFxufVxuXG50cmFjay5nZXRWYXJpYW50ID0gZnVuY3Rpb24oKXtcbiAgICB2YXIgcGF0aHMgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgdmFyIGZpbGVuYW1lID0gcGF0aHMuc3BsaXQoXCIvXCIpLnBvcCgpO1xuICAgIHZhciBwYWdlTmFtZSA9IGZpbGVuYW1lLnJlcGxhY2UoXCIuaHRtbFwiLCBcIlwiKTtcbiAgICAvLz09PXZhcmlhbnQgbmFtZSB0byBiZSBhZGRlZCBvbiBldmVyeSBwYWdlXG4gICAgLy92YXIgdmFyaWFudE5hbWUgPSBcImh1YmJsZS1yZXBsaWNhLWJcIjtcbiAgICB2YXIgdmFyaWFudE5hbWUgPSAodHlwZW9mIHZhcmlhbnROYW1lTmV3ID09IFwidW5kZWZpbmVkXCIpID8gXCJodWJibGUtcmVwbGljYS1iXCI6IHZhcmlhbnROYW1lTmV3O1xuICAgIGlmKHBhZ2VOYW1lICE9IFwiXCIgJiYgdHlwZW9mIHZhcmlhbnROYW1lTmV3ID09IFwidW5kZWZpbmVkXCIpXG4gICAgICAgIHZhcmlhbnROYW1lID0gXCJodWJibGUtcmVwbGljYS1cIitwYWdlTmFtZStcIi1iXCI7XG4gICAgLy9hbGVydCh2YXJpYW50TmFtZSlcbiAgICByZXR1cm4gdmFyaWFudE5hbWU7XG59XG5cbi8qLS0gQ2xpY2sgZXZlbnRzIC0tKi9cbi8vJCgnLmV2ZW50VHJhY2snKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4kKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmV2ZW50VHJhY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHJlbCA9ICQodGhpcykuYXR0cigncmVsJyk7XG4gICAgaWYodHlwZW9mIHJlbCAhPSAndW5kZWZpbmVkJyAmJiByZWwpe1xuICAgICAgICB2YXIgcmVsID0gcmVsLnNwbGl0KFwiLFwiKTtcbiAgICB9XG4gICAgdmFyIHRhcmdldCA9ICQodGhpcykuYXR0cignaHJlZicpO1xuICAgIGlmICh0eXBlb2YgcmVsICE9ICd1bmRlZmluZWQnICYmIHJlbC5sZW5ndGg+MCkge1xuICAgICAgICB2YXIgeDtcbiAgICAgICAgdmFyIHZhcmlhbnROYW1lID0gdHJhY2suZ2V0VmFyaWFudCgpO1xuICAgICAgICB2YXIgdHJhY2tVdG1QcmFtcyA9IHt9O1xuICAgICAgICB0cmFja1V0bVByYW1zW1widXRtX3ZhcmlhbnRcIl0gPSB2YXJpYW50TmFtZTtcbiAgICAgICAgZm9yICh4IGluIHJlbCkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAodHlwZW9mIGZicSAhPSAndW5kZWZpbmVkJyAmJiBmYnEpIHtcbiAgICAgICAgICAgICAgICBmYnEoJ3RyYWNrQ3VzdG9tJywgcmVsW3hdLnRyaW0oKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIGFtcHQgIT0gJ3VuZGVmaW5lZCcgJiYgYW1wdCkge1xuICAgICAgICAgICAgICAgIGFtcHQudHJhY2socmVsW3hdLnRyaW0oKSx0cmFja1V0bVByYW1zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgZ2EgIT0gJ3VuZGVmaW5lZCcgJiYgZ2EpIHtcbiAgICAgICAgICAgICAgICB0cnl7XG4gICAgICAgICAgICAgICAgICAgIGlmKHR5cGVvZiB0YXJnZXQgPT0gJ3VuZGVmaW5lZCcgfHwgdGFyZ2V0PT0nJyB8fCB0YXJnZXQ9PSdqYXZhc2NyaXB0OnZvaWQoMCk7Jyl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQgPSByZWxbeF0udHJpbSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGdhKCdzZW5kJywgJ2V2ZW50Jywge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRDYXRlZ29yeTogcmVsW3hdLnRyaW0oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50QWN0aW9uOiAnY2xpY2snLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRMYWJlbDogdGFyZ2V0XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1jYXRjaChlKXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICB9XG59KVxuXG4vKi0tIENsaWNrIGV2ZW50cyAtLSovXG4vLz09dGFib29sYSBwaXhlbFxud2luZG93Ll90ZmEgPSB3aW5kb3cuX3RmYSB8fCBbXTtcbl90ZmEucHVzaCh7IG5vdGlmeTogJ21hcmsnLG5hbWU6ICdzaXRlX3Zpc2l0b3InIH0pXG4hZnVuY3Rpb24oKXt2YXIgdD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO3Quc2V0QXR0cmlidXRlKFwidHlwZVwiLFwidGV4dC9qYXZhc2NyaXB0XCIpO1xudC5zZXRBdHRyaWJ1dGUoXCJzcmNcIixcIi8vY2RuLnRhYm9vbGEuY29tL2xpYnRyYy9hbXB1c2gtaHViYmxlY29udGFjdHMtc2MvdGZhLmpzXCIpO1xuXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHQmJmRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5hcHBlbmRDaGlsZCh0KTt9KClcblxuXG50cmFjay5jdXN0b21FdmVudEZpcmUgPSBmdW5jdGlvbihldmVudHMpe1xuICAgIFxuICAgIFxuICAgIHZhciByZWwgPSBldmVudHM7XG4gICAgdmFyIHJlbCA9IHJlbC5zcGxpdChcIixcIik7XG4gICAgaWYgKHJlbCAhPSAndW5kZWZpbmVkJyAmJiByZWwubGVuZ3RoPjApIHtcbiAgICAgICAgdmFyIHg7XG4gICAgICAgIHZhciB2YXJpYW50TmFtZSA9IHRyYWNrLmdldFZhcmlhbnQoKTtcbiAgICAgICAgdmFyIHRyYWNrVXRtUHJhbXMgPSB7fTtcbiAgICAgICAgdHJhY2tVdG1QcmFtc1tcInV0bV92YXJpYW50XCJdID0gdmFyaWFudE5hbWU7XG4gICAgICAgIGZvciAoeCBpbiByZWwpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYocmVsW3hdLnRyaW0oKSE9XCJmaXJlUGFnZVZpZXdcIil7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBmYnEgIT0gJ3VuZGVmaW5lZCcgJiYgZmJxKSB7XG4gICAgICAgICAgICAgICAgICAgIGZicSgndHJhY2tDdXN0b20nLCByZWxbeF0udHJpbSgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhbXB0ICE9ICd1bmRlZmluZWQnICYmIGFtcHQpIHtcbiAgICAgICAgICAgICAgICAgICAgYW1wdC50cmFjayhyZWxbeF0udHJpbSgpLHRyYWNrVXRtUHJhbXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGdhICE9ICd1bmRlZmluZWQnICYmIGdhKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHJlbFt4XS50cmltKCkgPT0gJ1N1YnNjcmliZURvY3RvclBhZ2VWaXNpdCcgfHwgcmVsW3hdLnRyaW0oKSA9PSAnU3Vic2NyaWJlUmV2aWV3UGFnZVZpc2l0JyB8fCByZWxbeF0udHJpbSgpID09ICdTdWJzY3JpYmVSeFBhZ2VWaXNpdCcpe1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRDYXRlZ29yeTogcmVsW3hdLnRyaW0oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudEFjdGlvbjogJ3BhZ2Vsb2FkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudExhYmVsOiByZWxbeF0udHJpbSgpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBnYSgnc2VuZCcsICdldmVudCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudENhdGVnb3J5OiByZWxbeF0udHJpbSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50QWN0aW9uOiAnY2xpY2snLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50TGFiZWw6IHJlbFt4XS50cmltKClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHZhciB0cmFja1V0bVByYW1zID0gYWJhbmFseXRpY3Muc2V0VXRtUGFyYW1zKCd0cmFja2VyJywgdXRtVG9rZW4pO1xuICAgICAgICAgICAgICAgIHRyYWNrVXRtUHJhbXNbXCJ1dG1fdmFyaWFudFwiXSA9IHZhcmlhbnROYW1lO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYW1wdCAhPSAndW5kZWZpbmVkJyAmJiBhbXB0KSB7XG4gICAgICAgICAgICAgICAgICAgIGFtcHQucGFnZXZpZXcodHJhY2tVdG1QcmFtcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZmJxICE9ICd1bmRlZmluZWQnICYmIGZicSkge1xuICAgICAgICAgICAgICAgICAgICBmYnEoJ3RyYWNrJywgJ1BhZ2VWaWV3Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZ2EgIT0gJ3VuZGVmaW5lZCcgJiYgZ2EpIHtcbiAgICAgICAgICAgICAgICAgICAgZ2EoJ3NlbmQnLCAncGFnZXZpZXcnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNlbmRHYUV2ZW50cygpe1xuICAgICBnYSgnc2VuZCcsICdwYWdldmlldycpO1xuICAgICBpZiAodHlwZW9mICQoJy5jdXN0b21FdmVudCcpLnZhbCgpICE9IFwidW5kZWZpbmVkXCIgJiYgJCgnLmN1c3RvbUV2ZW50JykudmFsKCkpIHtcbiAgICAgICAgY3VzdG9tX2V2ZW50ID0gJCgnLmN1c3RvbUV2ZW50JykudmFsKCk7XG4gICAgICAgIGdhKCdzZW5kJywgJ2V2ZW50Jywge1xuICAgICAgICAgICAgZXZlbnRDYXRlZ29yeTogY3VzdG9tX2V2ZW50LFxuICAgICAgICAgICAgZXZlbnRBY3Rpb246ICdwYWdlbG9hZCcsXG4gICAgICAgICAgICBldmVudExhYmVsOiB3aW5kb3cubG9jYXRpb24uaHJlZlxuICAgICAgICB9KTtcbiAgICAgfVxuICAgICBpZiAodHlwZW9mICQoJy5jdXN0b21FdmVudEInKS52YWwoKSAhPSBcInVuZGVmaW5lZFwiICYmICQoJy5jdXN0b21FdmVudEInKS52YWwoKSkge1xuICAgICAgICBjdXN0b21fZXZlbnQgPSAkKCcuY3VzdG9tRXZlbnRCJykudmFsKCk7XG4gICAgICAgIGdhKCdzZW5kJywgJ2V2ZW50Jywge1xuICAgICAgICAgICAgZXZlbnRDYXRlZ29yeTogY3VzdG9tX2V2ZW50LFxuICAgICAgICAgICAgZXZlbnRBY3Rpb246ICdwYWdlbG9hZCcsXG4gICAgICAgICAgICBldmVudExhYmVsOiB3aW5kb3cubG9jYXRpb24uaHJlZlxuICAgICAgICB9KTtcbiAgICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRyYWNrOyJdfQ==
},{"./abanalytics.js":31}]},{},[33])
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGNsYXNzIFVzZXJ7XG4vLyBcdHJlZ2lzdGVyKCl7XG4vLyBcdFx0Y29uc29sZS5sb2coXCJVc2VyIFJlZ2lzdGVyZWQuLi5cIik7XG4vLyBcdH1cbi8vIH1cbi8vPXVzZSBvZiBjbGFzc2VzXG5cInVzZSBzdHJpY3RcIlxuXG5pbXBvcnQgeyQsalF1ZXJ5fSBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHthYmFuYWx5dGljc30gZnJvbSAnLi9hYmFuYWx5dGljcy5qcyc7XG5pbXBvcnQgJy4vY3VzdG9tLXN1YnNjcmliZS1mb3JtLmpzJztcblxuXG4vLz09PT09PT09PT09PT09PT09PT12aWRlbyB0dXRvcmlhbHNcbmNsYXNzIFVzZXJ7XG5cdGNvbnN0cnVjdG9yKHVzZXJuYW1lLCBlbWFpbCwgcGFzc3dvcmQpe1xuXHRcdHRoaXMudXNlcm5hbWUgICA9IHVzZXJuYW1lO1xuXHRcdHRoaXMuZW1haWwgICAgICA9IGVtYWlsO1xuXHRcdHRoaXMucGFzc3dvcmQgICA9IHBhc3N3b3JkO1xuXHR9XG5cblx0c3RhdGljIGNvdW50VXNlcnMoKXtcblx0XHRjb25zb2xlLmxvZyhcIlRoZXJlIGFyZSA1MCBVc2Vycy5cIik7XG5cdH1cblxuXHRyZWdpc3Rlcigpe1xuXHRcdGNvbnNvbGUubG9nKHRoaXMudXNlcm5hbWUgKyBcIiBpcyBub3cgUmVnaXN0ZXJlZC4uLlwiKTtcblx0fVxufVxuXG5cbi8vPT09PW1ldGhvZCB0byBjYWxsIGEgZnVuY3Rpb24gb2YgYSBjbGFzc1xubGV0IGJvYiA9IG5ldyBVc2VyKFwiYm9iXCIsIFwiYm9iQGdtYWlsLmNvbVwiLCBcImR1Z2FyMTIzNDVcIik7XG5ib2IucmVnaXN0ZXIoKTtcblxuLy89PT09c3RhdGljIG1ldGhvZCBjYWxsaW5nIHByb2Nlc3Ncbi8vVXNlci5jb3VudFVzZXJzKCk7XG5cbi8vIGNsYXNzIE1lbWJlciBleHRlbmRzIFVzZXJ7XG4vLyBcdGNvbnN0cnVjdG9yKHVzZXJuYW1lLCBlbWFpbCwgcGFzc3dvcmQsIG1lbWJlclBhY2thZ2Upe1xuLy8gXHRcdHN1cGVyKHVzZXJuYW1lLCBlbWFpbCwgcGFzc3dvcmQpO1xuLy8gXHRcdHRoaXMucGFja2FnZSA9IG1lbWJlclBhY2thZ2U7XG4vLyBcdH1cblxuLy8gXHRnZXRQYWNrYWdlKCl7XG4vLyBcdFx0Y29uc29sZS5sb2codGhpcy51c2VybmFtZSArIFwiIGlzIHN1YnNjcmliZWQgdG8gdGhlIHBhY2thZ2UgXCIgKyB0aGlzLnBhY2thZ2UpO1xuLy8gXHR9XG4vLyB9XG5cblxuXG4vLz09PW1lbWJlciBjbGFzc1xuLy9sZXQgbWlrZSA9IG5ldyBNZW1iZXIoXCJtaWtlXCIsIFwibWlrZUBnbWFpbC5jb21cIiwgXCJkdWdhcjEyMzQ1XCIsIFwic3RhbmRhcmRcIik7XG4vL21pa2UuZ2V0UGFja2FnZSgpO1xuLy89PT09PT09PT09PT09PVxuXG5cbi8vPXRlbXBsYXRpbmdcblxuLy8gbGV0IG5hbWUgPSAnam9obic7XG4vLyBmdW5jdGlvbiBtYWtlVXBwZXJDYXNlKHdvcmQpe1xuLy8gXHRyZXR1cm4gd29yZC50b1VwcGVyQ2FzZSgpO1xuLy8gfVxuXG4vLyBsZXQgdGVtcGxhdGUgPSBcbi8vIGA8aDM+JHttYWtlVXBwZXJDYXNlKFwiSGVsbG9cIil9LCAke25hbWV9PC9oMz5cbi8vIDxwPlRoaXMgaXMgYSBzaW1wbGUgdGVtcGxhdGUgaW4gSlM8L3A+YDtcblxuLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RlbXBsYXRlJykuaW5uZXJIVE1MID0gdGVtcGxhdGU7XG5cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuLy89PT09PT09PT09PT09PT09PT09PT09PW5ldyBzdHJpbmcgYW5kIG51bWJlciBtZXRob2Rcbi8vbGV0IHRoZVN0cmluZyA9IFwiSGVsbG8sIHRoaXMgaXMgdG8gdGVzdCBwbGVhc2UgdGFrZSBjYXJlLlwiO1xuXG4vLz1zdGFydHMgd2l0aFxuLy9jb25zb2xlLmxvZyh0aGVTdHJpbmcuc3RhcnRzV2l0aChcIkhlbGxvXCIpKTtcblxuLy89PT1lbmRzIHdpdGggXG4vL2NvbnNvbGUubG9nKHRoZVN0cmluZy5lbmRzV2l0aChcImNhcmVcIikpO1xuXG4vLz09PWluY2x1ZGVzXG4vL2NvbnNvbGUubG9nKHRoZVN0cmluZy5pbmNsdWRlcyhcInRlc3QgYXJjaGl0XCIpKTtcblxuLy89PT09bnVtYmVyIG1ldGhvZFxuLy8taGV4YVxuLy9jb25zb2xlLmxvZygweEZGKTtcblxuLy8vLS0tLS1iaW5hcnlcbi8vY29uc29sZS5sb2coMGIxMDEwMTEpXG4vL2NvbnNvbGUubG9nKE51bWJlci5pc0ludGVnZXIoNCkpXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8vPT09PT09PT09PT09PT09PT09ZGVmYXVsdCBwYXJhbXMgYW5kIHNwcmVhZCBtZXRob2RcblxuLy8gZnVuY3Rpb24gZ3JlZXQoJGdyZWV0aW5nID0gXCJIZWxsb1wiKXtcbi8vIFx0Y29uc29sZS5sb2coJGdyZWV0aW5nKTtcbi8vIH1cblxuLy8gZ3JlZXQoKTtcblxuLy8gbGV0IGFyZ3MxID0gWzEsMiwzXTtcbi8vIGxldCBhcmdzMiA9IFsxLDIsM107XG4vLyBmdW5jdGlvbiB0ZXN0KCl7XG4vLyBcdGNvbnNvbGUubG9nKGFyZ3MpO1xuLy8gfVxuXG4vLyAvL3Rlc3QuYXBwbHkobnVsbCwgYXJncyk7XG5cbi8vIHRlc3QoLi4uYXJncyk7XG5cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8vPT09PT09PT1uZXcgZGF0YSBzdHJ1Y3R1cmVzXG5cdC8vIGxldCBteUFycmF5ID0gWzExLDIyLDM0LDY1LDcxXTtcblx0Ly8gbGV0IG15U2V0ID0gbmV3IFNldChteUFycmF5KTtcblx0Ly8gbXlTZXQuYWRkKDEwMCk7XG5cdC8vIG15U2V0LmFkZCh7YSA6IDEsIGIgOiAyfSlcblx0Ly8gbXlTZXQuZGVsZXRlKDIyKTtcblx0Ly8gLy9teVNldC5jbGVhcigpO1xuXG5cdC8vIGNvbnNvbGUubG9nKG15U2V0LnNpemUpXG5cblx0Ly8gbXlTZXQuZm9yRWFjaChmdW5jdGlvbih2YWwpe1xuXHQvLyBcdGNvbnNvbGUubG9nKHZhbClcblx0Ly8gfSlcblxuXG5cdC8vIGxldCBjYXJXZWFrU2V0ID0gbmV3IFdlYWtTZXQoKTtcblx0Ly8gbGV0IGNhcjEgPSB7XG5cdC8vIFx0J21ha2UnIDogJ2hvbmRhJyxcblx0Ly8gXHQnbW9kZWwnIDogJ2NpdmljJ1xuXHQvLyB9O1xuXHQvLyBjYXJXZWFrU2V0LmFkZChjYXIxKTtcblx0Ly8gY29uc29sZS5sb2coY2FyV2Vha1NldClcblxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXG4vLz09PT09PT09PT09YXJyb3cgZnVuY3Rpb25cblxuLy8gZnVuY3Rpb24gcHJlZml4ZXIocHJlZml4KXtcbi8vIFx0dGhpcy5wcmVmaXggPSBwcmVmaXg7XG4vLyB9XG5cbi8vIHByZWZpeGVyLnByb3RvdHlwZS5wcmVmaXhBcnJheSA9IGZ1bmN0aW9uKGFycil7XG4vLyBcdHJldHVybiBhcnIubWFwKCh4KSA9PiB7XG4vLyBcdFx0Y29uc29sZS5sb2codGhpcy5wcmVmaXggKyB4KVxuLy8gXHR9KVxuLy8gfVxuXG4vLyBsZXQgcHJlID0gbmV3IHByZWZpeGVyKFwiaGVsbG8gXCIpO1xuLy8gcHJlLnByZWZpeEFycmF5KFtcImJyYWRcIiwgXCJqZWZmXCJdKVxuXG5cbi8vIGxldCBhZGQgPSAoYSxiKSA9PiB7XG4vLyBcdGxldCBzdW0gPSBhICsgYjtcbi8vIFx0Y29uc29sZS5sb2coc3VtKTtcbi8vIFx0cmV0dXJuIGZhbHNlO1xuLy8gfVxuXG4vLyBhZGQoMiw0KTtcbi8vPT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vLz09PT09PT09PT09PT09PT09PT09PT09PVByb21pc2U9PT09PT09PT1cbi8vPWltbWVkaWF0ZWx5IHJlc29sdmVkIHByb21pc2VcblxuLy92YXIgbXlQcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCdGb28nKTtcbi8vbXlQcm9taXNlLnRoZW4oKHJlcykgPT4gY29uc29sZS5sb2cocmVzKSk7XG4vLyB2YXIgbXlQcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbi8vIFx0c2V0VGltZW91dCgoKSA9PiByZXNvbHZlKDQpLDIwMDApXG4vLyB9KTtcblxuXG4vLyBteVByb21pc2UudGhlbigocmVzKSA9PiB7XG4vLyBcdHJlcyArPSAzO1xuLy8gXHRjb25zb2xlLmxvZyhyZXMpO1xuLy8gfSlcblxuXG4vLyBmdW5jdGlvbiBnZXREYXRhKG1ldGhvZCwgdXJsKXtcbi8vIFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XG4vLyBcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuLy8gXHRcdHhoci5vcGVuKG1ldGhvZCwgdXJsKTtcbi8vIFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKXtcbi8vIFx0XHRcdGlmKHRoaXMuc3RhdHVzID49IDIwMCAmJiB0aGlzLnN0YXR1cyA8PSAzMDApe1xuLy8gXHRcdFx0XHRyZXNvbHZlKHRoaXMucmVzcG9uc2UpO1xuLy8gXHRcdFx0fWVsc2V7XG4vLyBcdFx0XHRcdHJlamVjdCh7XG4vLyBcdFx0XHRcdFx0c3RhdHVzIDogdGhpcy5zdGF0dXMsXG4vLyBcdFx0XHRcdFx0c3RhdHVzVGV4dCA6IHRoaXMuc3RhdHVzVGV4dFxuLy8gXHRcdFx0XHR9KVxuLy8gXHRcdFx0fVxuLy8gXHRcdH07XG5cbi8vIFx0XHR4aHIub25lcnJvciA9IGZ1bmN0aW9uKCl7XG4vLyBcdFx0XHRyZWplY3Qoe1xuLy8gXHRcdFx0XHRzdGF0dXMgOiB0aGlzLnN0YXR1cyxcbi8vIFx0XHRcdFx0c3RhdHVzVGV4dCA6IHRoaXMuc3RhdHVzVGV4dFxuLy8gXHRcdFx0fSlcbi8vIFx0XHR9XG4vLyBcdFx0eGhyLnNlbmQoKTtcbi8vIFx0fSk7XG4vLyB9XG5cbi8vIGdldERhdGEoXCJHRVRcIiwgXCJodHRwczovL2pzb25wbGFjZWhvbGRlci50eXBpY29kZS5jb20vdG9kb3NcIikudGhlbigocmVzKSA9PiB7XG4vLyBcdGNvbnNvbGUubG9nKHJlcylcbi8vIFx0bGV0IHRvZG9zID0gSlNPTi5wYXJzZShyZXMpO1xuLy8gXHRsZXQgb3V0cHV0ID0gJyc7XG4vLyBcdGZvcihsZXQgdG9kbyBvZiB0b2Rvcyl7XG4vLyBcdFx0b3V0cHV0ICs9IGBcbi8vIFx0XHRcdDxkaXY+PGgzPiR7dG9kby50aXRsZX08L2gzPjwvZGl2PlxuLy8gXHRcdGA7XG4vLyBcdH1cbi8vIFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0ZW1wbGF0ZVwiKS5pbm5lckhUTUwgPSBvdXRwdXRcbi8vIH0pO1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vLz09PT09PT09Z2VuZXJhdG9yc1xuLy8gbGV0IHJlZ2VuZXJhdG9yUnVudGltZSA9ICByZXF1aXJlKFwiYmFiZWwtcG9seWZpbGxcIik7XG4vLyBmdW5jdGlvbiAqZzEoKXtcbi8vIFx0Y29uc29sZS5sb2coXCJoZWxsb1wiKTtcbi8vIFx0eWllbGQgJ1lpZWxkIDEgcmFuLi4uJztcbi8vIFx0Y29uc29sZS5sb2coXCJ3b3JsZFwiKTtcbi8vIFx0eWllbGQgJ1lpZWxkIDEgcmFuLi4uJztcbi8vIH1cblxuLy8gdmFyIGcgPSBnMSgpO1xuXG4vLyBjb25zb2xlLmxvZyhnLm5leHQoKSlcblxuLy89PT09PT09PT09PT09PT09PT1cbi8vPT09PT09PT09PT09PT09PT09PWVuZCB2aWRlbyB0dXRvcmlhbHNcblxuXG5cblxuIl0sImZpbGUiOiJtYWluLmpzIn0=