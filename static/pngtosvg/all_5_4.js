function stackBlurImage(t, e, r, i) {
    var a = document.getElementById(t),
        n = a.naturalWidth,
        o = a.naturalHeight,
        s = document.getElementById(e);
    s.style.width = n + "px", s.style.height = o + "px", s.width = n, s.height = o;
    var c = s.getContext("2d");
    c.clearRect(0, 0, n, o), c.drawImage(a, 0, 0), isNaN(r) || r < 1 || (i ? stackBlurCanvasRGBA(e, 0, 0, n, o, r) : stackBlurCanvasRGB(e, 0, 0, n, o, r))
}

function stackBlurCanvasRGBA(t, e, r, i, a, n) {
    if (!(isNaN(n) || n < 1)) {
        n |= 0;
        var o, s = t.getContext("2d");
        try {
            try {
                o = s.getImageData(e, r, i, a)
            } catch (t) {
                try {
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead"), o = s.getImageData(e, r, i, a)
                } catch (t) {
                    throw alert("Cannot access local image"), new Error("unable to access local image data: " + t)
                }
            }
        } catch (t) {
            throw alert("Cannot access image"), new Error("unable to access image data: " + t)
        }
        var c, h, u, l, d, f, p, g, x, v, m, y, w, b, k, C, M, I, A, _, R, F, S, D, E = o.data,
            P = n + n + 1,
            q = i - 1,
            B = a - 1,
            G = n + 1,
            U = G * (G + 1) / 2,
            N = new BlurStack,
            O = N;
        for (u = 1; u < P; u++)
            if (O = O.next = new BlurStack, u == G) var L = O;
        O.next = N;
        var H = null,
            z = null;
        p = f = 0;
        var V = mul_table[n],
            X = shg_table[n];
        for (h = 0; h < a; h++) {
            for (C = M = I = A = g = x = v = m = 0, y = G * (_ = E[f]), w = G * (R = E[f + 1]), b = G * (F = E[f + 2]), k = G * (S = E[f + 3]), g += U * _, x += U * R, v += U * F, m += U * S, O = N, u = 0; u < G; u++) O.r = _, O.g = R, O.b = F, O.a = S, O = O.next;
            for (u = 1; u < G; u++) l = f + ((q < u ? q : u) << 2), g += (O.r = _ = E[l]) * (D = G - u), x += (O.g = R = E[l + 1]) * D, v += (O.b = F = E[l + 2]) * D, m += (O.a = S = E[l + 3]) * D, C += _, M += R, I += F, A += S, O = O.next;
            for (H = N, z = L, c = 0; c < i; c++) E[f + 3] = S = m * V >> X, 0 != S ? (S = 255 / S, E[f] = (g * V >> X) * S, E[f + 1] = (x * V >> X) * S, E[f + 2] = (v * V >> X) * S) : E[f] = E[f + 1] = E[f + 2] = 0, g -= y, x -= w, v -= b, m -= k, y -= H.r, w -= H.g, b -= H.b, k -= H.a, l = p + ((l = c + n + 1) < q ? l : q) << 2, g += C += H.r = E[l], x += M += H.g = E[l + 1], v += I += H.b = E[l + 2], m += A += H.a = E[l + 3], H = H.next, y += _ = z.r, w += R = z.g, b += F = z.b, k += S = z.a, C -= _, M -= R, I -= F, A -= S, z = z.next, f += 4;
            p += i
        }
        for (c = 0; c < i; c++) {
            for (M = I = A = C = x = v = m = g = 0, y = G * (_ = E[f = c << 2]), w = G * (R = E[f + 1]), b = G * (F = E[f + 2]), k = G * (S = E[f + 3]), g += U * _, x += U * R, v += U * F, m += U * S, O = N, u = 0; u < G; u++) O.r = _, O.g = R, O.b = F, O.a = S, O = O.next;
            for (d = i, u = 1; u <= n; u++) f = d + c << 2, g += (O.r = _ = E[f]) * (D = G - u), x += (O.g = R = E[f + 1]) * D, v += (O.b = F = E[f + 2]) * D, m += (O.a = S = E[f + 3]) * D, C += _, M += R, I += F, A += S, O = O.next, u < B && (d += i);
            for (f = c, H = N, z = L, h = 0; h < a; h++) E[3 + (l = f << 2)] = S = m * V >> X, S > 0 ? (S = 255 / S, E[l] = (g * V >> X) * S, E[l + 1] = (x * V >> X) * S, E[l + 2] = (v * V >> X) * S) : E[l] = E[l + 1] = E[l + 2] = 0, g -= y, x -= w, v -= b, m -= k, y -= H.r, w -= H.g, b -= H.b, k -= H.a, l = c + ((l = h + G) < B ? l : B) * i << 2, g += C += H.r = E[l], x += M += H.g = E[l + 1], v += I += H.b = E[l + 2], m += A += H.a = E[l + 3], H = H.next, y += _ = z.r, w += R = z.g, b += F = z.b, k += S = z.a, C -= _, M -= R, I -= F, A -= S, z = z.next, f += i
        }
        s.putImageData(o, e, r)
    }
}

function stackBlurCanvasRGB(t, e, r, i, a, n) {
    if (!(isNaN(n) || n < 1)) {
        n |= 0;
        var o, s = document.getElementById(t).getContext("2d");
        try {
            try {
                o = s.getImageData(e, r, i, a)
            } catch (t) {
                try {
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead"), o = s.getImageData(e, r, i, a)
                } catch (t) {
                    throw alert("Cannot access local image"), new Error("unable to access local image data: " + t)
                }
            }
        } catch (t) {
            throw alert("Cannot access image"), new Error("unable to access image data: " + t)
        }
        var c, h, u, l, d, f, p, g, x, v, m, y, w, b, k, C, M, I, A, _, R = o.data,
            F = n + n + 1,
            S = i - 1,
            D = a - 1,
            E = n + 1,
            P = E * (E + 1) / 2,
            q = new BlurStack,
            B = q;
        for (u = 1; u < F; u++)
            if (B = B.next = new BlurStack, u == E) var G = B;
        B.next = q;
        var U = null,
            N = null;
        p = f = 0;
        var O = mul_table[n],
            L = shg_table[n];
        for (h = 0; h < a; h++) {
            for (b = k = C = g = x = v = 0, m = E * (M = R[f]), y = E * (I = R[f + 1]), w = E * (A = R[f + 2]), g += P * M, x += P * I, v += P * A, B = q, u = 0; u < E; u++) B.r = M, B.g = I, B.b = A, B = B.next;
            for (u = 1; u < E; u++) l = f + ((S < u ? S : u) << 2), g += (B.r = M = R[l]) * (_ = E - u), x += (B.g = I = R[l + 1]) * _, v += (B.b = A = R[l + 2]) * _, b += M, k += I, C += A, B = B.next;
            for (U = q, N = G, c = 0; c < i; c++) R[f] = g * O >> L, R[f + 1] = x * O >> L, R[f + 2] = v * O >> L, g -= m, x -= y, v -= w, m -= U.r, y -= U.g, w -= U.b, l = p + ((l = c + n + 1) < S ? l : S) << 2, g += b += U.r = R[l], x += k += U.g = R[l + 1], v += C += U.b = R[l + 2], U = U.next, m += M = N.r, y += I = N.g, w += A = N.b, b -= M, k -= I, C -= A, N = N.next, f += 4;
            p += i
        }
        for (c = 0; c < i; c++) {
            for (k = C = b = x = v = g = 0, m = E * (M = R[f = c << 2]), y = E * (I = R[f + 1]), w = E * (A = R[f + 2]), g += P * M, x += P * I, v += P * A, B = q, u = 0; u < E; u++) B.r = M, B.g = I, B.b = A, B = B.next;
            for (d = i, u = 1; u <= n; u++) f = d + c << 2, g += (B.r = M = R[f]) * (_ = E - u), x += (B.g = I = R[f + 1]) * _, v += (B.b = A = R[f + 2]) * _, b += M, k += I, C += A, B = B.next, u < D && (d += i);
            for (f = c, U = q, N = G, h = 0; h < a; h++) R[l = f << 2] = g * O >> L, R[l + 1] = x * O >> L, R[l + 2] = v * O >> L, g -= m, x -= y, v -= w, m -= U.r, y -= U.g, w -= U.b, l = c + ((l = h + E) < D ? l : D) * i << 2, g += b += U.r = R[l], x += k += U.g = R[l + 1], v += C += U.b = R[l + 2], U = U.next, m += M = N.r, y += I = N.g, w += A = N.b, b -= M, k -= I, C -= A, N = N.next, f += i
        }
        s.putImageData(o, e, r)
    }
}

function BlurStack() {
    this.r = 0, this.g = 0, this.b = 0, this.a = 0, this.next = null
}! function(t) {
    var e, r, i, a, n, o, s, c, h, u, l, d, f, p, g, x, v, m, y, w, b, k, C, M, I, A, _, R, F, S, D, E, P, q, B, G, U, N, O = (e = 65, r = {
        eventName: "click",
        onShow: function() {},
        onBeforeShow: function() {},
        onHide: function() {},
        onChange: function() {},
        onSubmit: function() {},
        color: "ff0000",
        livePreview: !0,
        flat: !1
    }, i = function(e, r) {
        var i = B(e);
        t(r).data("colorpicker").fields.eq(1).val(i.r).end().eq(2).val(i.g).end().eq(3).val(i.b).end()
    }, a = function(e, r) {
        t(r).data("colorpicker").fields.eq(4).val(e.h).end().eq(5).val(e.s).end().eq(6).val(e.b).end()
    }, n = function(e, r) {
        t(r).data("colorpicker").fields.eq(0).val(G(e)).end()
    }, o = function(e, r) {
        t(r).data("colorpicker").selector.css("backgroundColor", "#" + G({
            h: e.h,
            s: 100,
            b: 100
        })), t(r).data("colorpicker").selectorIndic.css({
            left: parseInt(150 * e.s / 100, 10),
            top: parseInt(150 * (100 - e.b) / 100, 10)
        })
    }, s = function(e, r) {
        t(r).data("colorpicker").hue.css("top", parseInt(150 - 150 * e.h / 360, 10))
    }, c = function(e, r) {
        t(r).data("colorpicker").currentColor.css("backgroundColor", "#" + G(e))
    }, h = function(e, r) {
        t(r).data("colorpicker").newColor.css("backgroundColor", "#" + G(e))
    }, u = function(r) {
        var i = r.charCode || r.keyCode || -1;
        if (i > e && i <= 90 || 32 == i) return !1;
        !0 === t(this).parent().parent().data("colorpicker").livePreview && l.apply(this)
    }, l = function(e) {
        var r, c = t(this).parent().parent();
        this.parentNode.className.indexOf("_hex") > 0 ? c.data("colorpicker").color = r = P(E(this.value)) : this.parentNode.className.indexOf("_hsb") > 0 ? c.data("colorpicker").color = r = S({
            h: parseInt(c.data("colorpicker").fields.eq(4).val(), 10),
            s: parseInt(c.data("colorpicker").fields.eq(5).val(), 10),
            b: parseInt(c.data("colorpicker").fields.eq(6).val(), 10)
        }) : c.data("colorpicker").color = r = q(D({
            r: parseInt(c.data("colorpicker").fields.eq(1).val(), 10),
            g: parseInt(c.data("colorpicker").fields.eq(2).val(), 10),
            b: parseInt(c.data("colorpicker").fields.eq(3).val(), 10)
        })), e && (i(r, c.get(0)), n(r, c.get(0)), a(r, c.get(0))), o(r, c.get(0)), s(r, c.get(0)), h(r, c.get(0)), c.data("colorpicker").onChange.apply(c, [r, G(r), B(r)])
    }, d = function(e) {
        t(this).parent().parent().data("colorpicker").fields.parent().removeClass("colorpicker_focus")
    }, f = function() {
        e = this.parentNode.className.indexOf("_hex") > 0 ? 70 : 65, t(this).parent().parent().data("colorpicker").fields.parent().removeClass("colorpicker_focus"), t(this).parent().addClass("colorpicker_focus")
    }, p = function(e) {
        var r = t(this).parent().find("input").focus(),
            i = {
                el: t(this).parent().addClass("colorpicker_slider"),
                max: this.parentNode.className.indexOf("_hsb_h") > 0 ? 360 : this.parentNode.className.indexOf("_hsb") > 0 ? 100 : 255,
                y: e.pageY,
                field: r,
                val: parseInt(r.val(), 10),
                preview: t(this).parent().parent().data("colorpicker").livePreview
            };
        t(document).bind("mouseup", i, x), t(document).bind("mousemove", i, g)
    }, g = function(t) {
        return t.data.field.val(Math.max(0, Math.min(t.data.max, parseInt(t.data.val + t.pageY - t.data.y, 10)))), t.data.preview && l.apply(t.data.field.get(0), [!0]), !1
    }, x = function(e) {
        return l.apply(e.data.field.get(0), [!0]), e.data.el.removeClass("colorpicker_slider").find("input").focus(), t(document).unbind("mouseup", x), t(document).unbind("mousemove", g), !1
    }, v = function(e) {
        var r = {
            cal: t(this).parent(),
            y: t(this).offset().top
        };
        r.preview = r.cal.data("colorpicker").livePreview, t(document).bind("mouseup", r, y), t(document).bind("mousemove", r, m)
    }, m = function(t) {
        return l.apply(t.data.cal.data("colorpicker").fields.eq(4).val(parseInt(360 * (150 - Math.max(0, Math.min(150, t.pageY - t.data.y))) / 150, 10)).get(0), [t.data.preview]), !1
    }, y = function(e) {
        return i(e.data.cal.data("colorpicker").color, e.data.cal.get(0)), n(e.data.cal.data("colorpicker").color, e.data.cal.get(0)), t(document).unbind("mouseup", y), t(document).unbind("mousemove", m), !1
    }, w = function(e) {
        var r = {
            cal: t(this).parent(),
            pos: t(this).offset()
        };
        r.preview = r.cal.data("colorpicker").livePreview, t(document).bind("mouseup", r, k), t(document).bind("mousemove", r, b)
    }, b = function(t) {
        return l.apply(t.data.cal.data("colorpicker").fields.eq(6).val(parseInt(100 * (150 - Math.max(0, Math.min(150, t.pageY - t.data.pos.top))) / 150, 10)).end().eq(5).val(parseInt(100 * Math.max(0, Math.min(150, t.pageX - t.data.pos.left)) / 150, 10)).get(0), [t.data.preview]), !1
    }, k = function(e) {
        return i(e.data.cal.data("colorpicker").color, e.data.cal.get(0)), n(e.data.cal.data("colorpicker").color, e.data.cal.get(0)), t(document).unbind("mouseup", k), t(document).unbind("mousemove", b), !1
    }, C = function(e) {
        t(this).addClass("colorpicker_focus")
    }, M = function(e) {
        t(this).removeClass("colorpicker_focus")
    }, I = function(e) {
        var r = t(this).parent(),
            i = r.data("colorpicker").color;
        r.data("colorpicker").origColor = i, c(i, r.get(0)), r.data("colorpicker").onSubmit("#" + G(i), r.data("colorpicker").el)
    }, A = function(e) {
        var r = t("#" + t(this).data("colorpickerId"));
        r.data("colorpicker").onBeforeShow.apply(this, [r.get(0)]);
        var i = t(this).offset(),
            a = F(),
            n = i.top + this.offsetHeight,
            o = i.left;
        return n + 176 > a.t + a.h && (n -= this.offsetHeight + 176), o + 356 > a.l + a.w && (o -= 356), r.css({
            left: o + "px",
            top: n + "px"
        }), 0 != r.data("colorpicker").onShow.apply(this, [r.get(0)]) && r.show(), t(document).bind("mousedown", {
            cal: r
        }, _), !1
    }, _ = function(e) {
        try {
            R(e.data.cal.get(0), e.target, e.data.cal.get(0)) || (0 != e.data.cal.data("colorpicker").onHide.apply(this, [e.data.cal.get(0)]) && e.data.cal.hide(), t(document).unbind("mousedown", _))
        } catch (t) {}
    }, R = function(t, e, r) {
        if (t == e) return !0;
        if (t.contains) return t.contains(e);
        if (t.compareDocumentPosition) return !!(16 & t.compareDocumentPosition(e));
        for (var i = e.parentNode; i && i != r;) {
            if (i == t) return !0;
            i = i.parentNode
        }
        return !1
    }, F = function() {
        var t = "CSS1Compat" == document.compatMode;
        return {
            l: window.pageXOffset || (t ? document.documentElement.scrollLeft : document.body.scrollLeft),
            t: window.pageYOffset || (t ? document.documentElement.scrollTop : document.body.scrollTop),
            w: window.innerWidth || (t ? document.documentElement.clientWidth : document.body.clientWidth),
            h: window.innerHeight || (t ? document.documentElement.clientHeight : document.body.clientHeight)
        }
    }, S = function(t) {
        return {
            h: Math.min(360, Math.max(0, t.h)),
            s: Math.min(100, Math.max(0, t.s)),
            b: Math.min(100, Math.max(0, t.b))
        }
    }, D = function(t) {
        return {
            r: Math.min(255, Math.max(0, t.r)),
            g: Math.min(255, Math.max(0, t.g)),
            b: Math.min(255, Math.max(0, t.b))
        }
    }, E = function(t) {
        var e = 6 - t.length;
        if (e > 0) {
            for (var r = [], i = 0; i < e; i++) r.push("0");
            r.push(t), t = r.join("")
        }
        return t
    }, P = function(t) {
        return q((e = t, {
            r: (e = parseInt(e.indexOf("#") > -1 ? e.substring(1) : e, 16)) >> 16,
            g: (65280 & e) >> 8,
            b: 255 & e
        }));
        var e
    }, q = function(t) {
        var e = {
                h: 0,
                s: 0,
                b: 0
            },
            r = Math.min(t.r, t.g, t.b),
            i = Math.max(t.r, t.g, t.b),
            a = i - r;
        return e.b = i, e.s = 0 != i ? 255 * a / i : 0, 0 != e.s ? t.r == i ? e.h = (t.g - t.b) / a : t.g == i ? e.h = 2 + (t.b - t.r) / a : e.h = 4 + (t.r - t.g) / a : e.h = -1, e.h *= 60, e.h < 0 && (e.h += 360), e.s *= 100 / 255, e.b *= 100 / 255, e
    }, B = function(t) {
        var e = {},
            r = Math.round(t.h),
            i = Math.round(255 * t.s / 100),
            a = Math.round(255 * t.b / 100);
        if (0 == i) e.r = e.g = e.b = a;
        else {
            var n = a,
                o = (255 - i) * a / 255,
                s = r % 60 * (n - o) / 60;
            360 == r && (r = 0), r < 60 ? (e.r = n, e.b = o, e.g = o + s) : r < 120 ? (e.g = n, e.b = o, e.r = n - s) : r < 180 ? (e.g = n, e.r = o, e.b = o + s) : r < 240 ? (e.b = n, e.r = o, e.g = n - s) : r < 300 ? (e.b = n, e.g = o, e.r = o + s) : r < 360 ? (e.r = n, e.g = o, e.b = n - s) : (e.r = 0, e.g = 0, e.b = 0)
        }
        return {
            r: Math.round(e.r),
            g: Math.round(e.g),
            b: Math.round(e.b)
        }
    }, G = function(e) {
        return r = B(e), i = [r.r.toString(16), r.g.toString(16), r.b.toString(16)], t.each(i, function(t, e) {
            1 == e.length && (i[t] = "0" + e)
        }), i.join("");
        var r, i
    }, U = function() {
        var e = t(this).parent(),
            r = e.data("colorpicker").origColor;
        console.log(r), e.data("colorpicker").color = r, i(r, e.get(0)), n(r, e.get(0)), a(r, e.get(0)), o(r, e.get(0)), s(r, e.get(0)), h(r, e.get(0))
    }, N = function(e) {
        var r = t(this.offsetParent),
            i = t(e.target).attr("data-color");
        r.data("colorpicker").onSubmit(i, r.data("colorpicker").el), t(".colorpicker").hide()
    }, {
        init: function(e) {
            if ("string" == typeof(e = t.extend({}, r, e || {})).color) e.color = P(e.color);
            else if (void 0 != e.color.r && void 0 != e.color.g && void 0 != e.color.b) e.color = q(e.color);
            else {
                if (void 0 == e.color.h || void 0 == e.color.s || void 0 == e.color.b) return this;
                e.color = S(e.color)
            }
            return this.each(function() {
                if (!t(this).data("colorpickerId")) {
                    var r = t.extend({}, e);
                    r.origColor = e.color;
                    var g = "collorpicker_" + parseInt(1e3 * Math.random());
                    t(this).data("colorpickerId", g);
                    var x = t('<div class="colorpicker"><div class="colorpicker_color"><div><div></div></div></div><div class="colorpicker_hue"><div></div></div><div class="colorpicker_new_color"></div><div class="colorpicker_current_color"></div><div class="colorpicker_hex"><input type="text" maxlength="6" size="6" /></div><div class="colorpicker_rgb_r colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_rgb_g colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_rgb_b colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_hsb_h colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_hsb_s colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_hsb_b colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_submit">Submit</div><div class="colorlist"></div></div>').attr("id", g);
                    r.flat ? x.appendTo(this).show() : x.appendTo(document.body), r.fields = x.find("input").bind("keyup", u).bind("change", l).bind("blur", d).bind("focus", f), x.find("span").bind("mousedown", p).end().find(">div.colorpicker_current_color").bind("click", U), r.selector = x.find("div.colorpicker_color").bind("mousedown", w), r.selectorIndic = r.selector.find("div div"), r.el = this, r.hue = x.find("div.colorpicker_hue div"), x.find("div.colorpicker_hue").bind("mousedown", v), r.newColor = x.find("div.colorpicker_new_color"), r.currentColor = x.find("div.colorpicker_current_color"), x.data("colorpicker", r), x.find("div.colorpicker_submit").bind("mouseenter", C).bind("mouseleave", M).bind("click", I), t(x.find("div.colorlist")).html('<ul class="colorlistul"><li class="nocolorli" data-color="#"></li></ul>'), x.find("ul.colorlistul").bind("click", N), i(r.color, x.get(0)), a(r.color, x.get(0)), n(r.color, x.get(0)), s(r.color, x.get(0)), o(r.color, x.get(0)), c(r.color, x.get(0)), h(r.color, x.get(0)), r.flat ? x.css({
                        position: "relative",
                        display: "block"
                    }) : t(this).bind(r.eventName, A)
                }
            })
        },
        showPicker: function() {
            return this.each(function() {
                t(this).data("colorpickerId") && A.apply(this)
            })
        },
        hidePicker: function() {
            return this.each(function() {
                t(this).data("colorpickerId") && t("#" + t(this).data("colorpickerId")).hide()
            })
        },
        setColor: function(e) {
            if ("string" == typeof e) e = P(e);
            else if (void 0 != e.r && void 0 != e.g && void 0 != e.b) e = q(e);
            else {
                if (void 0 == e.h || void 0 == e.s || void 0 == e.b) return this;
                e = S(e)
            }
            return this.each(function() {
                if (t(this).data("colorpickerId")) {
                    var r = t("#" + t(this).data("colorpickerId"));
                    r.data("colorpicker").color = e, r.data("colorpicker").origColor = e, i(e, r.get(0)), a(e, r.get(0)), n(e, r.get(0)), s(e, r.get(0)), o(e, r.get(0)), c(e, r.get(0)), h(e, r.get(0))
                }
            })
        }
    });
    t.fn.extend({
        ColorPicker: O.init,
        ColorPickerHide: O.hidePicker,
        ColorPickerShow: O.showPicker,
        ColorPickerSetColor: O.setColor
    })
}(jQuery),
function() {
    function t(t) {
        if (t = t || {}, this.method = t.method || 2, this.colors = t.colors || 256, this.width = 1e3, this.height = 1e3, this.blur = t.blur || 0, this.initColors = t.initColors || 4096, this.initDist = t.initDist || .02, this.distIncr = t.distIncr || .01, this.hueGroups = t.hueGroups || 1, this.satGroups = t.satGroups || 1, this.lumGroups = t.lumGroups || 1, this.minHueCols = t.minHueCols || 1, this.hueStats = this.minHueCols ? new r(this.hueGroups, this.minHueCols) : null, this.boxSize = t.boxSize || [64, 64], this.boxPxls = t.boxPxls || 1, this.palLocked = !1, this.dithKern = t.ditherKern || null, this.dithSerp = t.dithSerp || !1, this.dithDelta = t.dithDelta || 0, this.histogram = {}, this.idxrgb = t.palette ? t.palette.slice(0) : [], this.idxi32 = [], this.i32idx = {}, this.i32rgb = {}, this.idxhex = [], this.reduceOut32, this.useCache = !1 !== t.useCache, this.cacheFreq = t.cacheFreq || 10, this.reIndex = t.reIndex || 0 == this.idxrgb.length, this.colorDist = "manhattan" == t.colorDist ? a : i, this.averageRGB = {
                r: 255,
                g: 255,
                b: 255
            }, this.idxrgb.length > 0) {
            var n = this;
            this.idxrgb.forEach(function(t, r) {
                var i, a, o, s = (255 << 24 | t[2] << 16 | t[1] << 8 | t[0]) >>> 0;
                n.idxi32[r] = s, n.i32idx[s] = r, n.i32rgb[s] = t, n.idxhex[r] = (i = t[0], a = t[1], o = t[2], e(i) + e(a) + e(o))
            })
        }
    }

    function e(t) {
        var e = t.toString(16);
        return 1 == e.length ? "0" + e : e
    }

    function r(t, e) {
        this.numGroups = t, this.minCols = e, this.stats = {};
        for (var r = -1; r < t; r++) this.stats[r] = {
            num: 0,
            cols: []
        };
        this.groupsFull = 0
    }

    function i(t, e) {
        var r = e[0] - t[0],
            i = e[1] - t[1],
            a = e[2] - t[2],
            n = this.averageRGB.r + this.averageRGB.g + this.averageRGB.b;
        return g || (g = (this.averageRGB.r / n).toFixed(3), x = (this.averageRGB.g / n).toFixed(3), v = (this.averageRGB.b / n).toFixed(3)), p || (p = Math.sqrt(255 * g * 255 + 255 * x * 255 + 255 * v * 255)), Math.sqrt(g * r * r + x * i * i + v * a * a) / p
    }

    function a(t, e) {
        var r = Math.abs(e[0] - t[0]),
            i = Math.abs(e[1] - t[1]),
            a = Math.abs(e[2] - t[2]);
        return (y * r + w * i + b * a) / k
    }

    function n(t, e, r) {
        var i, a, n, o, s, c, h, u, l;
        if (t /= 255, e /= 255, r /= 255, s = ((i = Math.max(t, e, r)) + (a = Math.min(t, e, r))) / 2, i == a) n = o = 0;
        else {
            switch (c = i - a, o = s > .5 ? c / (2 - i - a) : c / (i + a), i) {
                case t:
                    n = (e - r) / c + (e < r ? 6 : 0);
                    break;
                case e:
                    n = (r - t) / c + 2;
                    break;
                case r:
                    n = (t - e) / c + 4
            }
            n /= 6
        }
        return {
            h: n,
            s: o,
            l: (h = t, u = e, l = r, g ? Math.sqrt(g * h * h + x * u * u + v * l * l) : Math.sqrt(y * h * h + w * u * u + b * l * l))
        }
    }

    function o(t, e) {
        var r = 1 / e,
            i = r / 2;
        if (t >= 1 - i || t <= i) return 0;
        for (var a = 1; a < e; a++) {
            var n = a * r;
            if (t >= n - i && t <= n + i) return a
        }
    }

    function s(t) {
        return t
    }

    function c(t) {
        return t
    }

    function h(t) {
        return Object.prototype.toString.call(t).slice(8, -1)
    }

    function u(t, e, r) {
        var i, a, n, o, s, c, u, d;
        switch (r && (d = r.blur), h(t)) {
            case "HTMLImageElement":
                MAX_VALUE = 2400, (i = document.createElement("canvas")).width = t.naturalWidth, i.height = t.naturalHeight;
                var f = i.width / i.height;
                i.width < 1e3 && (i.width = 1e3, i.height = 1e3 / f), i.height < 1e3 && (i.width = 1e3 * f, i.height = 1e3), i.width > MAX_VALUE && (i.width = MAX_VALUE, i.height = MAX_VALUE / f), i.height > MAX_VALUE && (i.width = MAX_VALUE * f, i.height = MAX_VALUE), a = i.getContext("2d"), void 0 != r && (r.width = i.width, r.height = i.height), a.drawImage(t, 0, 0, t.naturalWidth, t.naturalHeight, 0, 0, i.width, i.height), a.filter = "blur(" + d + "px)", l(a.getImageData(0, 0, i.width, i.height)), a.drawImage(t, 0, 0, i.width, i.height), u = l(a.getImageData(0, 0, i.width, i.height));
            case "Canvas":
            case "HTMLCanvasElement":
                i = i || t, a = a || i.getContext("2d");
            case "CanvasRenderingContext2D":
                a = a || t, i = i || a.canvas, n = a.getImageData(0, 0, i.width, i.height);
            case "ImageData":
                e = (n = n || t).width, o = "CanvasPixelArray" == h(n.data) ? new Uint8Array(n.data) : n.data;
            case "Array":
            case "CanvasPixelArray":
                o = o || new Uint8Array(t);
            case "Uint8Array":
            case "Uint8ClampedArray":
                o = o || t, s = new Uint32Array(o.buffer);
            case "Uint32Array":
                s = s || t, o = o || new Uint8Array(s.buffer), e = e || s.length, c = s.length / e
        }
        return {
            can: i,
            ctx: a,
            imgd: n,
            buf8: o,
            buf32: s,
            width: e,
            height: c,
            avgRGB: u
        }
    }

    function l(t) {
        for (var e = 0;
            (e += 4 * A) < t.data.length;) ++M, I.r += t.data[e], I.g += t.data[e + 1], I.b += t.data[e + 2];
        return I.r = ~~(I.r / M), I.g = ~~(I.g / M), I.b = ~~(I.b / M), M = 0, I
    }
    var d, f;
    t.prototype.sample = function(t, e, r, i, a) {
        if (this.palLocked) throw "Cannot sample additional images, palette already assembled.";
        if (d = u(t, e, this), this.averageRGB = d.avgRGB, console.log("sample ", d.buf8.length), i) a(r);
        else switch (this.method) {
            case 1:
                this.colorStats1D(d.buf32, a);
                break;
            case 2:
                this.colorStats2D(d.buf32, d.width)
        }
    }, t.prototype.reduce = function(t, e, r, i) {
        if (console.log("reduce 1"), this.palLocked || this.buildPal(), r = r || this.dithKern, i = void 0 !== i ? i : this.dithSerp, e = e || 1, r) o = this.dither(t, r, i);
        else {
            var a = u(t, null, this).buf32,
                n = a.length,
                o = new Uint32Array(n),
                s = 0;
            ! function t(e) {
                for (; s < n; s++) {
                    var r = a[s];
                    o[s] = e.nearestColor(r), s + 1 < n && s % 8e3 == 0 && setTimeout(t, 0)
                }
            }(this)
        }
        if (console.log("reduce 2"), this.reduceOut32 = o, 1 == e) return new Uint8Array(o.buffer);
        if (2 == e) {
            var c = [];
            for (n = o.length, s = 0; s < n; s++) {
                var h = o[s];
                c[s] = this.i32idx[h]
            }
            return c
        }
    }, t.prototype.replaceColor = function(t, e) {
        for (var r = (255 << 24) + (e.b << 16) + (e.g << 8) + e.r, i = this.reduceOut32[0], a = 0; a < this.reduceOut32.length; a++) this.reduceOut32[a] == i && (this.reduceOut32[a] = r);
        return new Uint8Array(this.reduceOut32.buffer)
    }, t.prototype.dither = function(t, e, r) {
        var i = {
            FloydSteinberg: [
                [7 / 16, 1, 0],
                [3 / 16, -1, 1],
                [5 / 16, 0, 1],
                [1 / 16, 1, 1]
            ],
            FalseFloydSteinberg: [
                [3 / 8, 1, 0],
                [3 / 8, 0, 1],
                [.25, 1, 1]
            ],
            Stucki: [
                [8 / 42, 1, 0],
                [4 / 42, 2, 0],
                [2 / 42, -2, 1],
                [4 / 42, -1, 1],
                [8 / 42, 0, 1],
                [4 / 42, 1, 1],
                [2 / 42, 2, 1],
                [1 / 42, -2, 2],
                [2 / 42, -1, 2],
                [4 / 42, 0, 2],
                [2 / 42, 1, 2],
                [1 / 42, 2, 2]
            ],
            Atkinson: [
                [1 / 8, 1, 0],
                [1 / 8, 2, 0],
                [1 / 8, -1, 1],
                [1 / 8, 0, 1],
                [1 / 8, 1, 1],
                [1 / 8, 0, 2]
            ],
            Jarvis: [
                [7 / 48, 1, 0],
                [5 / 48, 2, 0],
                [3 / 48, -2, 1],
                [5 / 48, -1, 1],
                [7 / 48, 0, 1],
                [5 / 48, 1, 1],
                [3 / 48, 2, 1],
                [1 / 48, -2, 2],
                [3 / 48, -1, 2],
                [5 / 48, 0, 2],
                [3 / 48, 1, 2],
                [1 / 48, 2, 2]
            ],
            Burkes: [
                [.25, 1, 0],
                [.125, 2, 0],
                [2 / 32, -2, 1],
                [.125, -1, 1],
                [.25, 0, 1],
                [.125, 1, 1],
                [2 / 32, 2, 1]
            ],
            Sierra: [
                [5 / 32, 1, 0],
                [3 / 32, 2, 0],
                [2 / 32, -2, 1],
                [.125, -1, 1],
                [5 / 32, 0, 1],
                [.125, 1, 1],
                [2 / 32, 2, 1],
                [2 / 32, -1, 2],
                [3 / 32, 0, 2],
                [2 / 32, 1, 2]
            ],
            TwoSierra: [
                [.25, 1, 0],
                [3 / 16, 2, 0],
                [1 / 16, -2, 1],
                [.125, -1, 1],
                [3 / 16, 0, 1],
                [.125, 1, 1],
                [1 / 16, 2, 1]
            ],
            SierraLite: [
                [.5, 1, 0],
                [.25, -1, 1],
                [.25, 0, 1]
            ]
        };
        if (!e || !i[e]) throw "Unknown dithering kernel: " + e;
        for (var a = i[e], n = u(t, null, this), o = n.buf32, s = n.width, c = n.height, h = (o.length, r ? -1 : 1), l = 0; l < c; l++) {
            r && (h *= -1);
            for (var d = l * s, f = 1 == h ? 0 : s - 1, p = 1 == h ? s : 0; f !== p; f += h) {
                var g = d + f,
                    x = o[g],
                    v = 255 & x,
                    m = (65280 & x) >> 8,
                    y = (16711680 & x) >> 16,
                    w = this.nearestColor(x),
                    b = 255 & w,
                    k = (65280 & w) >> 8,
                    C = (16711680 & w) >> 16;
                if (o[g] = 255 << 24 | C << 16 | k << 8 | b, !(this.dithDelta && this.colorDist([v, m, y], [b, k, C]) < this.dithDelta))
                    for (var M = v - b, I = m - k, A = y - C, _ = 1 == h ? 0 : a.length - 1, R = 1 == h ? a.length : 0; _ !== R; _ += h) {
                        var F = a[_][1] * h,
                            S = a[_][2],
                            D = S * s;
                        if (F + f >= 0 && F + f < s && S + l >= 0 && S + l < c) {
                            var E = a[_][0],
                                P = g + (D + F),
                                q = 255 & o[P],
                                B = (65280 & o[P]) >> 8,
                                G = (16711680 & o[P]) >> 16,
                                U = Math.max(0, Math.min(255, q + M * E)),
                                N = Math.max(0, Math.min(255, B + I * E)),
                                O = Math.max(0, Math.min(255, G + A * E));
                            o[P] = 255 << 24 | O << 16 | N << 8 | U
                        }
                    }
            }
        }
        return o
    }, t.prototype.buildPal = function(t) {
        if (!(this.palLocked || this.idxrgb.length > 0 && this.idxrgb.length <= this.colors)) {
            var e = this.histogram,
                r = function(t, e) {
                    var r = [];
                    for (var i in t) r.push(i);
                    return C.call(r, function(r, i) {
                        return e ? t[i] - t[r] : t[r] - t[i]
                    })
                }(e, !0);
            if (0 == r.length) throw "Nothing has been sampled, palette cannot be built.";
            switch (console.log("buildPal ", r.length), this.method) {
                case 1:
                    for (var i = this.initColors, a = e[r[i - 1]], n = r.slice(0, i), o = i, s = r.length; o < s && e[r[o]] == a;) n.push(r[o++]);
                    this.hueStats && this.hueStats.inject(n);
                    break;
                case 2:
                    n = r
            }
            n = n.map(function(t) {
                return +t
            }), this.reducePal(n), !t && this.reIndex && this.sortPal(), this.useCache && this.cacheHistogram(n), this.palLocked = !0
        }
    }, t.prototype.palette = function(t, e, r) {
        return r && (this.histogram = r), this.buildPal(e), t ? this.idxrgb : new Uint8Array(new Uint32Array(this.idxi32).buffer)
    }, t.prototype.prunePal = function(t) {
        for (var e, r = 0; r < this.idxrgb.length; r++) t[r] || (e = this.idxi32[r], this.idxrgb[r] = null, this.idxi32[r] = null, delete this.i32idx[e]);
        if (this.reIndex) {
            for (var i = [], a = [], n = {}, o = (r = 0, 0); r < this.idxrgb.length; r++) this.idxrgb[r] && (e = this.idxi32[r], i[o] = this.idxrgb[r], n[e] = o, a[o] = e, o++);
            this.idxrgb = i, this.idxi32 = a, this.i32idx = n
        }
    }, t.prototype.reducePal = function(t) {
        if (this.idxrgb.length > this.colors) {
            for (var e, r = t.length, i = {}, a = 0, n = !1, o = 0; o < r; o++) a != this.colors || n || (this.prunePal(i), n = !0), e = this.nearestIndex(t[o]), a < this.colors && !i[e] && (i[e] = !0, a++);
            n || (this.prunePal(i), n = !0)
        } else {
            var s = t.map(function(t) {
                    return [255 & t, (65280 & t) >> 8, (16711680 & t) >> 16]
                }),
                c = r = s.length,
                h = this.initDist;
            if (c > this.colors) {
                for (; c > this.colors;) {
                    var u = [];
                    for (o = 0; o < r; o++) {
                        var l = s[o];
                        if (t[o], l)
                            for (var d = o + 1; d < r; d++) {
                                var f = s[d],
                                    p = t[d];
                                if (f) {
                                    var g = this.colorDist(l, f);
                                    g < h && (u.push([d, f, p, g]), delete s[d], c--)
                                }
                            }
                    }
                    h += c > 3 * this.colors ? this.initDist : this.distIncr
                }
                if (c < this.colors) {
                    C.call(u, function(t, e) {
                        return e[3] - t[3]
                    });
                    for (var x = 0; c < this.colors;) s[u[x][0]] = u[x][1], c++, x++
                }
            }
            for (r = s.length, o = 0; o < r; o++) s[o] && (this.idxrgb.push(s[o]), this.idxi32.push(t[o]), this.i32idx[t[o]] = this.idxi32.length - 1, this.i32rgb[t[o]] = s[o])
        }
    }, t.prototype.colorStats1D = function(t, e) {
        var r = this.histogram,
            i = t.length;
        console.log("colorStats1D ", i), i, (f = new Worker("../../pngtosvg/worker.js")).addEventListener("message", function(t) {
            e(JSON.parse(t.data.histG))
        }, !1), f.postMessage({
            buf32: t,
            col: void 0,
            histG: r
        })
    }, t.prototype.colorStats2D = function(t, e) {
        var r = this.boxSize[0],
            i = this.boxSize[1],
            a = r * i,
            n = function(t, e, r, i) {
                for (var a = t % r, n = e % i, o = t - a, s = e - n, c = [], h = 0; h < e; h += i)
                    for (var u = 0; u < t; u += r) c.push({
                        x: u,
                        y: h,
                        w: u == o ? a : r,
                        h: h == s ? n : i
                    });
                return c
            }(e, t.length / e, r, i),
            o = this.histogram,
            s = this;
        n.forEach(function(r) {
            var i, n = Math.max(Math.round(r.w * r.h / a) * s.boxPxls, 2),
                c = {};
            ! function(t, e, r) {
                var i = t,
                    a = i.y * e + i.x,
                    n = (i.y + i.h - 1) * e + (i.x + i.w - 1),
                    o = 0,
                    s = e - i.w + 1,
                    c = a;
                do {
                    r.call(this, c), c += ++o % i.w == 0 ? s : 1
                } while (c <= n)
            }(r, e, function(e) {
                (4278190080 & (i = t[e])) >> 24 != 0 && (s.hueStats && s.hueStats.check(i), i in o ? o[i]++ : i in c ? ++c[i] >= n && (o[i] = c[i]) : c[i] = 1)
            })
        }), this.hueStats && this.hueStats.inject(o)
    }, t.prototype.sortPal = function() {
        var t = this;
        this.idxi32.sort(function(e, r) {
            var i = t.i32idx[e],
                a = t.i32idx[r],
                h = t.idxrgb[i],
                u = t.idxrgb[a],
                l = n(h[0], h[1], h[2]),
                d = n(u[0], u[1], u[2]),
                f = h[0] == h[1] && h[1] == h[2] ? -1 : o(l.h, t.hueGroups),
                p = (u[0] == u[1] && u[1] == u[2] ? -1 : o(d.h, t.hueGroups)) - f;
            if (p) return -p;
            var g = c(+d.l.toFixed(2)) - c(+l.l.toFixed(2));
            if (g) return -g;
            var x = s(+d.s.toFixed(2)) - s(+l.s.toFixed(2));
            return x ? -x : void 0
        }), this.idxi32.forEach(function(e, r) {
            t.idxrgb[r] = t.i32rgb[e], t.i32idx[e] = r
        })
    }, t.prototype.nearestColor = function(t) {
        var e = this.nearestIndex(t);
        return null === e ? 0 : this.idxi32[e]
    }, t.prototype.nearestIndex = function(t) {
        if ((4278190080 & t) >> 24 == 0) return null;
        if (this.useCache && "" + t in this.i32idx) return this.i32idx[t];
        for (var e, r = 100, i = [255 & t, (65280 & t) >> 8, (16711680 & t) >> 16], a = this.idxrgb.length, n = 0; n < a; n++)
            if (this.idxrgb[n]) {
                var o = this.colorDist(i, this.idxrgb[n]);
                o < r && (r = o, e = n)
            } return e
    }, Array.closest = function() {
        function t(e, r) {
            return e.length && r.length ? t(e.slice(2), r.slice(2)) + Math.abs(parseInt(e.slice(0, 2), 16) - parseInt(r.slice(0, 2), 16)) : 16777215
        }
        return function(e, r) {
            return e.sort(function(e, i) {
                return t(e, r) - t(i, r)
            })
        }
    }(), t.prototype.cacheHistogram = function(t) {
        for (var e = 0, r = t[e]; e < t.length && this.histogram[r] >= this.cacheFreq; r = t[e++]) this.i32idx[r] = this.nearestIndex(r)
    }, r.prototype.check = function(t) {
        this.groupsFull == this.numGroups + 1 && (this.check = function() {});
        var e = 255 & t,
            r = (65280 & t) >> 8,
            i = (16711680 & t) >> 16,
            a = e == r && r == i ? -1 : o(n(e, r, i).h, this.numGroups),
            s = this.stats[a],
            c = this.minCols;
        ++s.num > c || (s.num == c && this.groupsFull++, s.num <= c && this.stats[a].cols.push(t))
    }, r.prototype.inject = function(t) {
        for (var e = -1; e < this.numGroups; e++)
            if (this.stats[e].num <= this.minCols) switch (h(t)) {
                case "Array":
                    this.stats[e].cols.forEach(function(e) {
                        -1 == t.indexOf(e) && t.push(e)
                    });
                    break;
                case "Object":
                    this.stats[e].cols.forEach(function(e) {
                        t[e] ? t[e]++ : t[e] = 1
                    })
            }
    };
    var p, g, x, v, m, y = .299,
        w = .587,
        b = .114,
        k = 255 * y + 255 * w + 255 * b,
        C = "xyzvwtursopqmnklhijfgdeabc" == (m = "abcdefghijklmnopqrstuvwxyz").split("").sort(function(t, e) {
            return ~~(m.indexOf(e) / 2.3) - ~~(m.indexOf(t) / 2.3)
        }).join("") ? Array.prototype.sort : function(t) {
            var e = h(this[0]);
            if ("Number" == e || "String" == e) {
                for (var r, i = {}, a = this.length, n = 0; n < a; n++) r = this[n], i[r] || 0 === i[r] || (i[r] = n);
                return this.sort(function(e, r) {
                    return t(e, r) || i[e] - i[r]
                })
            }
            return i = this.map(function(t) {
                return t
            }), this.sort(function(e, r) {
                return t(e, r) || i.indexOf(e) - i.indexOf(r)
            })
        },
        M = 0,
        I = {
            r: 0,
            g: 0,
            b: 0
        },
        A = 5;
    this.RgbQuant = t, "undefined" != typeof module && module.exports && (module.exports = t)
}.call(this);
var Potrace = function() {
        function t(t, e) {
            this.x = t, this.y = e
        }

        function e(t, e) {
            this.w = t, this.h = e, this.size = t * e, this.arraybuffer = new ArrayBuffer(this.size), this.data = new Int8Array(this.arraybuffer)
        }

        function r() {
            this.area = 0, this.len = 0, this.curve = {}, this.pt = [], this.minX = 1e5, this.minY = 1e5, this.maxX = -1, this.maxY = -1
        }

        function i(t) {
            this.n = t, this.tag = new Array(t), this.c = new Array(3 * t), this.alphaCurve = 0, this.vertex = new Array(t), this.alpha = new Array(t), this.alpha0 = new Array(t), this.beta = new Array(t)
        }

        function a() {
            function e() {
                this.data = [0, 0, 0, 0, 0, 0, 0, 0, 0]
            }

            function r(t, e, r, i, a) {
                this.x = t, this.y = e, this.xy = r, this.x2 = i, this.y2 = a
            }

            function a(t, e) {
                return t >= e ? t % e : t >= 0 ? t : e - 1 - (-1 - t) % e
            }

            function n(t, e) {
                return t.x * e.y - t.y * e.x
            }

            function o(t, e, r) {
                return t <= r ? t <= e && e < r : t <= e || e < r
            }

            function s(t) {
                return t > 0 ? 1 : t < 0 ? -1 : 0
            }

            function c(t, e) {
                var r, i, a, n = new Array(3);
                for (n[0] = e.x, n[1] = e.y, n[2] = 1, a = 0, r = 0; r < 3; r++)
                    for (i = 0; i < 3; i++) a += n[r] * t.at(r, i) * n[i];
                return a
            }

            function h(e, r, i) {
                var a = new t;
                return a.x = r.x + e * (i.x - r.x), a.y = r.y + e * (i.y - r.y), a
            }

            function u(e, r) {
                var i, a, n, o = (i = e, a = r, (n = new t).y = s(a.x - i.x), n.x = -s(a.y - i.y), n);
                return o.y * (r.x - e.x) - o.x * (r.y - e.y)
            }

            function f(t, e, r) {
                var i, a, n;
                return i = e.x - t.x, a = e.y - t.y, n = r.x - t.x, i * (r.y - t.y) - n * a
            }

            function p(t, e, r, i) {
                var a, n, o;
                return a = e.x - t.x, n = e.y - t.y, o = i.x - r.x, a * (i.y - r.y) - o * n
            }

            function g(t, e, r) {
                var i, a;
                return i = e.x - t.x, a = e.y - t.y, i * (r.x - t.x) + a * (r.y - t.y)
            }

            function x(t, e) {
                return Math.sqrt((t.x - e.x) * (t.x - e.x) + (t.y - e.y) * (t.y - e.y))
            }

            function v(e, r, i, a, n) {
                var o = 1 - e,
                    s = new t;
                return s.x = o * o * o * r.x + o * o * e * 3 * i.x + e * e * o * 3 * a.x + e * e * e * n.x, s.y = o * o * o * r.y + o * o * e * 3 * i.y + e * e * o * 3 * a.y + e * e * e * n.y, s
            }

            function m(t, e, r, i, a, n) {
                var o, s, c, h, u, l, d, f, g;
                return o = p(t, e, a, n), s = p(e, r, a, n), c = p(r, i, a, n), l = (u = -2 * o + 2 * s) * u - 4 * (h = o - 2 * s + c) * o, 0 === h || l < 0 ? -1 : (g = (-u - (d = Math.sqrt(l))) / (2 * h), (f = (-u + d) / (2 * h)) >= 0 && f <= 1 ? f : g >= 0 && g <= 1 ? g : -1)
            }
            e.prototype.at = function(t, e) {
                return this.data[3 * t + e]
            };
            for (var y = 0; y < l.length; y++) {
                var w = l[y];
                ! function(t) {
                    var e, i, a;
                    t.x0 = t.pt[0].x, t.y0 = t.pt[0].y, t.sums = [];
                    var n = t.sums;
                    for (n.push(new r(0, 0, 0, 0, 0)), e = 0; e < t.len; e++) i = t.pt[e].x - t.x0, a = t.pt[e].y - t.y0, n.push(new r(n[e].x + i, n[e].y + a, n[e].xy + i * a, n[e].x2 + i * i, n[e].y2 + a * a))
                }(w),
                function(e) {
                    var r = e.len,
                        i = e.pt,
                        c = new Array(r),
                        h = new Array(r),
                        u = new Array(4);
                    e.lon = new Array(r);
                    var l, d, f, p, g, x, v, m, y = [new t, new t],
                        w = new t,
                        b = new t,
                        k = new t,
                        C = 0;
                    for (d = r - 1; d >= 0; d--) i[d].x != i[C].x && i[d].y != i[C].y && (C = d + 1), h[d] = C;
                    for (d = r - 1; d >= 0; d--) {
                        for (u[0] = u[1] = u[2] = u[3] = 0, u[(3 + 3 * (i[a(d + 1, r)].x - i[d].x) + (i[a(d + 1, r)].y - i[d].y)) / 2]++, y[0].x = 0, y[0].y = 0, y[1].x = 0, y[1].y = 0, C = h[d], p = d;;) {
                            if (l = 0, u[(3 + 3 * s(i[C].x - i[p].x) + s(i[C].y - i[p].y)) / 2]++, u[0] && u[1] && u[2] && u[3]) {
                                c[d] = p, l = 1;
                                break
                            }
                            if (w.x = i[C].x - i[d].x, w.y = i[C].y - i[d].y, n(y[0], w) < 0 || n(y[1], w) > 0) break;
                            if (Math.abs(w.x) <= 1 && Math.abs(w.y) <= 1 || (b.x = w.x + (w.y >= 0 && (w.y > 0 || w.x < 0) ? 1 : -1), b.y = w.y + (w.x <= 0 && (w.x < 0 || w.y < 0) ? 1 : -1), n(y[0], b) >= 0 && (y[0].x = b.x, y[0].y = b.y), b.x = w.x + (w.y <= 0 && (w.y < 0 || w.x < 0) ? 1 : -1), b.y = w.y + (w.x >= 0 && (w.x > 0 || w.y < 0) ? 1 : -1), n(y[1], b) <= 0 && (y[1].x = b.x, y[1].y = b.y)), !o(C = h[p = C], d, p)) break
                        }
                        0 === l && (k.x = s(i[C].x - i[p].x), k.y = s(i[C].y - i[p].y), w.x = i[p].x - i[d].x, w.y = i[p].y - i[d].y, g = n(y[0], w), x = n(y[0], k), v = n(y[1], w), m = n(y[1], k), f = 1e7, x < 0 && (f = Math.floor(g / -x)), m > 0 && (f = Math.min(f, Math.floor(-v / m))), c[d] = a(p + f, r))
                    }
                    for (f = c[r - 1], e.lon[r - 1] = f, d = r - 2; d >= 0; d--) o(d + 1, c[d], f) && (f = c[d]), e.lon[d] = f;
                    for (d = r - 1; o(a(d + 1, r), f, e.lon[d]); d--) e.lon[d] = f
                }(w),
                function(t) {
                    var e, r, i, n, o, s, c, h, u, l, d, f, p, g, x, v, m, y, w, b, k, C, M, I, A, _ = t.len,
                        R = new Array(_ + 1),
                        F = new Array(_ + 1),
                        S = new Array(_),
                        D = new Array(_ + 1),
                        E = new Array(_ + 1),
                        P = new Array(_ + 1);
                    for (e = 0; e < _; e++)(c = a(t.lon[a(e - 1, _)] - 1, _)) == e && (c = a(e + 1, _)), S[e] = c < e ? _ : c;
                    for (r = 1, e = 0; e < _; e++)
                        for (; r <= S[e];) D[r] = e, r++;
                    for (e = 0, r = 0; e < _; r++) E[r] = e, e = S[e];
                    for (E[r] = _, e = _, r = i = r; r > 0; r--) P[r] = e, e = D[e];
                    for (P[0] = 0, R[0] = 0, r = 1; r <= i; r++)
                        for (e = P[r]; e <= E[r]; e++) {
                            for (s = -1, n = E[r - 1]; n >= D[e]; n--) h = t, u = n, l = e, d = void 0, f = void 0, p = void 0, g = void 0, x = void 0, v = void 0, m = void 0, y = void 0, w = void 0, b = void 0, k = void 0, void 0, void 0, void 0, A = void 0, C = h.len, M = h.pt, I = h.sums, A = 0, l >= C && (l -= C, A = 1), 0 === A ? (d = I[l + 1].x - I[u].x, f = I[l + 1].y - I[u].y, g = I[l + 1].x2 - I[u].x2, p = I[l + 1].xy - I[u].xy, x = I[l + 1].y2 - I[u].y2, v = l + 1 - u) : (d = I[l + 1].x - I[u].x + I[C].x, f = I[l + 1].y - I[u].y + I[C].y, g = I[l + 1].x2 - I[u].x2 + I[C].x2, p = I[l + 1].xy - I[u].xy + I[C].xy, x = I[l + 1].y2 - I[u].y2 + I[C].y2, v = l + 1 - u + C), y = (M[u].x + M[l].x) / 2 - M[0].x, w = (M[u].y + M[l].y) / 2 - M[0].y, k = M[l].x - M[u].x, m = (b = -(M[l].y - M[u].y)) * b * ((g - 2 * d * y) / v + y * y) + 2 * b * k * ((p - d * w - f * y) / v + y * w) + k * k * ((x - 2 * f * w) / v + w * w), o = Math.sqrt(m) + R[n], (s < 0 || o < s) && (F[e] = n, s = o);
                            R[e] = s
                        }
                    for (t.m = i, t.po = new Array(i), e = _, r = i - 1; e > 0; r--) e = F[e], t.po[r] = e
                }(w),
                function(r) {
                    var n, o, s, h, u, l, d, f, p, g, x, v, m, y, w, b = r.m,
                        k = r.po,
                        C = r.len,
                        M = r.pt,
                        I = r.x0,
                        A = r.y0,
                        _ = new Array(b),
                        R = new Array(b),
                        F = new Array(b),
                        S = new Array(3),
                        D = new t;
                    for (r.curve = new i(b), o = 0; o < b; o++) s = a((s = k[a(o + 1, b)]) - k[o], C) + k[o], _[o] = new t, R[o] = new t,
                        function(t, e, r, i, a) {
                            for (var n, o, s, c, h, u, l, d, f, p, g, x = t.len, v = t.sums, m = 0; r >= x;) r -= x, m += 1;
                            for (; e >= x;) e -= x, m -= 1;
                            for (; r < 0;) r += x, m -= 1;
                            for (; e < 0;) e += x, m += 1;
                            n = v[r + 1].x - v[e].x + m * v[x].x, o = v[r + 1].y - v[e].y + m * v[x].y, s = v[r + 1].x2 - v[e].x2 + m * v[x].x2, c = v[r + 1].xy - v[e].xy + m * v[x].xy, h = v[r + 1].y2 - v[e].y2 + m * v[x].y2, u = r + 1 - e + m * x, i.x = n / u, i.y = o / u, l = (s - n * n / u) / u, d = (c - n * o / u) / u, l -= p = (l + (f = (h - o * o / u) / u) + Math.sqrt((l - f) * (l - f) + 4 * d * d)) / 2, f -= p, Math.abs(l) >= Math.abs(f) ? 0 !== (g = Math.sqrt(l * l + d * d)) && (a.x = -d / g, a.y = l / g) : 0 !== (g = Math.sqrt(f * f + d * d)) && (a.x = -f / g, a.y = d / g), 0 === g && (a.x = a.y = 0)
                        }(r, k[o], s, _[o], R[o]);
                    for (o = 0; o < b; o++)
                        if (F[o] = new e, 0 == (n = R[o].x * R[o].x + R[o].y * R[o].y))
                            for (s = 0; s < 3; s++)
                                for (h = 0; h < 3; h++) F[o].data[3 * s + h] = 0;
                        else
                            for (S[0] = R[o].y, S[1] = -R[o].x, S[2] = -S[1] * _[o].y - S[0] * _[o].x, u = 0; u < 3; u++)
                                for (h = 0; h < 3; h++) F[o].data[3 * u + h] = S[u] * S[h] / n;
                    for (o = 0; o < b; o++) {
                        for (l = new e, d = new t, D.x = M[k[o]].x - I, D.y = M[k[o]].y - A, s = a(o - 1, b), u = 0; u < 3; u++)
                            for (h = 0; h < 3; h++) l.data[3 * u + h] = F[s].at(u, h) + F[o].at(u, h);
                        for (;;) {
                            if (0 != (g = l.at(0, 0) * l.at(1, 1) - l.at(0, 1) * l.at(1, 0))) {
                                d.x = (-l.at(0, 2) * l.at(1, 1) + l.at(1, 2) * l.at(0, 1)) / g, d.y = (l.at(0, 2) * l.at(1, 0) - l.at(1, 2) * l.at(0, 0)) / g;
                                break
                            }
                            for (l.at(0, 0) > l.at(1, 1) ? (S[0] = -l.at(0, 1), S[1] = l.at(0, 0)) : l.at(1, 1) ? (S[0] = -l.at(1, 1), S[1] = l.at(1, 0)) : (S[0] = 1, S[1] = 0), n = S[0] * S[0] + S[1] * S[1], S[2] = -S[1] * D.y - S[0] * D.x, u = 0; u < 3; u++)
                                for (h = 0; h < 3; h++) l.data[3 * u + h] += S[u] * S[h] / n
                        }
                        if (f = Math.abs(d.x - D.x), p = Math.abs(d.y - D.y), f <= .5 && p <= .5) r.curve.vertex[o] = new t(d.x + I, d.y + A);
                        else {
                            if (x = c(l, D), m = D.x, y = D.y, 0 !== l.at(0, 0))
                                for (w = 0; w < 2; w++) d.y = D.y - .5 + w, d.x = -(l.at(0, 1) * d.y + l.at(0, 2)) / l.at(0, 0), f = Math.abs(d.x - D.x), v = c(l, d), f <= .5 && v < x && (x = v, m = d.x, y = d.y);
                            if (0 !== l.at(1, 1))
                                for (w = 0; w < 2; w++) d.x = D.x - .5 + w, d.y = -(l.at(1, 0) * d.x + l.at(1, 2)) / l.at(1, 1), p = Math.abs(d.y - D.y), v = c(l, d), p <= .5 && v < x && (x = v, m = d.x, y = d.y);
                            for (u = 0; u < 2; u++)
                                for (h = 0; h < 2; h++) d.x = D.x - .5 + u, d.y = D.y - .5 + h, (v = c(l, d)) < x && (x = v, m = d.x, y = d.y);
                            r.curve.vertex[o] = new t(m + I, y + A)
                        }
                    }
                }(w), "-" === w.sign && function(t) {
                        var e, r, i, a = w.curve,
                            n = a.n,
                            o = a.vertex;
                        for (e = 0, r = n - 1; e < r; e++, r--) i = o[e], o[e] = o[r], o[r] = i
                    }(),
                    function(t) {
                        var e, r, i, n, o, s, c, l, p, g = t.curve.n,
                            x = t.curve;
                        for (e = 0; e < g; e++) r = a(e + 1, g), i = a(e + 2, g), p = h(.5, x.vertex[i], x.vertex[r]), 0 !== (o = u(x.vertex[e], x.vertex[i])) ? (n = f(x.vertex[e], x.vertex[r], x.vertex[i]) / o, s = (n = Math.abs(n)) > 1 ? 1 - 1 / n : 0, s /= .75) : s = 4 / 3, x.alpha0[r] = s, s >= d.alphamax ? (x.tag[r] = "CORNER", x.c[3 * r + 1] = x.vertex[r], x.c[3 * r + 2] = p) : (s < .55 ? s = .55 : s > 1 && (s = 1), c = h(.5 + .5 * s, x.vertex[e], x.vertex[r]), l = h(.5 + .5 * s, x.vertex[i], x.vertex[r]), x.tag[r] = "CURVE", x.c[3 * r + 0] = c, x.c[3 * r + 1] = l, x.c[3 * r + 2] = p), x.alpha[r] = s, x.beta[r] = .5;
                        x.alphacurve = 1
                    }(w), d.optcurve && function(e) {
                        function r() {
                            this.pen = 0, this.c = [new t, new t], this.t = 0, this.s = 0, this.alpha = 0
                        }
                        var n, o, c, u, l, y, w, b, k, C, M = e.curve,
                            I = M.n,
                            A = M.vertex,
                            _ = new Array(I + 1),
                            R = new Array(I + 1),
                            F = new Array(I + 1),
                            S = new Array(I + 1),
                            D = new r,
                            E = new Array(I),
                            P = new Array(I + 1);
                        for (o = 0; o < I; o++) "CURVE" == M.tag[o] ? E[o] = s(f(A[a(o - 1, I)], A[o], A[a(o + 1, I)])) : E[o] = 0;
                        for (y = 0, P[0] = 0, u = M.vertex[0], o = 0; o < I; o++) l = a(o + 1, I), "CURVE" == M.tag[l] && (y += .3 * (w = M.alpha[l]) * (4 - w) * f(M.c[3 * o + 2], A[l], M.c[3 * l + 2]) / 2, y += f(u, M.c[3 * o + 2], M.c[3 * l + 2]) / 2), P[o + 1] = y;
                        for (_[0] = -1, R[0] = 0, F[0] = 0, c = 1; c <= I; c++)
                            for (_[c] = c - 1, R[c] = R[c - 1], F[c] = F[c - 1] + 1, o = c - 2; o >= 0 && ! function(t, e, r, i, n, o, c) {
                                    var u, l, d, y, w, b, k, C, M, I, A, _, R, F, S, D, E, P, q, B, G, U, N, O, L, H, z, V, X, j = t.curve.n,
                                        T = t.curve,
                                        W = T.vertex;
                                    if (e == r) return 1;
                                    if (u = e, w = a(e + 1, j), 0 === (y = o[l = a(u + 1, j)])) return 1;
                                    for (C = x(W[e], W[w]), u = l; u != r; u = l) {
                                        if (l = a(u + 1, j), d = a(u + 2, j), o[l] != y) return 1;
                                        if (s(p(W[e], W[w], W[l], W[d])) != y) return 1;
                                        if (O = W[e], L = W[w], H = W[l], z = W[d], V = void 0, X = void 0, V = L.x - O.x, X = L.y - O.y, V * (z.x - H.x) + X * (z.y - H.y) < C * x(W[l], W[d]) * -.999847695156) return 1
                                    }
                                    if (A = T.c[3 * a(e, j) + 2].copy(), _ = W[a(e + 1, j)].copy(), R = W[a(r, j)].copy(), F = T.c[3 * a(r, j) + 2].copy(), b = c[r] - c[e], b -= f(W[0], T.c[3 * e + 2], T.c[3 * r + 2]) / 2, e >= r && (b += c[j]), P = f(A, _, R), q = f(A, _, F), G = P + (B = f(A, R, F)) - q, q == P) return 1;
                                    if (U = q / (q - P), 0 == (D = q * (N = B / (B - G)) / 2)) return 1;
                                    for (E = b / D, k = 2 - Math.sqrt(4 - E / .3), i.c[0] = h(N * k, A, _), i.c[1] = h(U * k, F, R), i.alpha = k, i.t = N, i.s = U, _ = i.c[0].copy(), R = i.c[1].copy(), i.pen = 0, u = a(e + 1, j); u != r; u = l) {
                                        if (l = a(u + 1, j), (N = m(A, _, R, F, W[u], W[l])) < -.5) return 1;
                                        if (S = v(N, A, _, R, F), 0 === (C = x(W[u], W[l]))) return 1;
                                        if (M = f(W[u], W[l], S) / C, Math.abs(M) > n) return 1;
                                        if (g(W[u], W[l], S) < 0 || g(W[l], W[u], S) < 0) return 1;
                                        i.pen += M * M
                                    }
                                    for (u = e; u != r; u = l) {
                                        if (l = a(u + 1, j), (N = m(A, _, R, F, T.c[3 * u + 2], T.c[3 * l + 2])) < -.5) return 1;
                                        if (S = v(N, A, _, R, F), 0 === (C = x(T.c[3 * u + 2], T.c[3 * l + 2]))) return 1;
                                        if (M = f(T.c[3 * u + 2], T.c[3 * l + 2], S) / C, I = f(T.c[3 * u + 2], T.c[3 * l + 2], W[l]) / C, (I *= .75 * T.alpha[l]) < 0 && (M = -M, I = -I), M < I - n) return 1;
                                        M < I && (i.pen += (M - I) * (M - I))
                                    }
                                    return 0
                                }(e, o, a(c, I), D, d.opttolerance, E, P); o--)(F[c] > F[o] + 1 || F[c] == F[o] + 1 && R[c] > R[o] + D.pen) && (_[c] = o, R[c] = R[o] + D.pen, F[c] = F[o] + 1, S[c] = D, D = new r);
                        for (b = new i(n = F[I]), k = new Array(n), C = new Array(n), c = I, o = n - 1; o >= 0; o--) _[c] == c - 1 ? (b.tag[o] = M.tag[a(c, I)], b.c[3 * o + 0] = M.c[3 * a(c, I) + 0], b.c[3 * o + 1] = M.c[3 * a(c, I) + 1], b.c[3 * o + 2] = M.c[3 * a(c, I) + 2], b.vertex[o] = M.vertex[a(c, I)], b.alpha[o] = M.alpha[a(c, I)], b.alpha0[o] = M.alpha0[a(c, I)], b.beta[o] = M.beta[a(c, I)], k[o] = C[o] = 1) : (b.tag[o] = "CURVE", b.c[3 * o + 0] = S[c].c[0], b.c[3 * o + 1] = S[c].c[1], b.c[3 * o + 2] = M.c[3 * a(c, I) + 2], b.vertex[o] = h(S[c].s, M.c[3 * a(c, I) + 2], A[a(c, I)]), b.alpha[o] = S[c].alpha, b.alpha0[o] = S[c].alpha, k[o] = S[c].s, C[o] = S[c].t), c = _[c];
                        for (o = 0; o < n; o++) l = a(o + 1, n), b.beta[o] = k[o] / (k[o] + C[l]);
                        b.alphacurve = 1, e.curve = b
                    }(w)
            }
        }

        function n() {
            h = null, l = [], o = null, d.isReady = !1
        }
        t.prototype.copy = function() {
            return new t(this.x, this.y)
        }, e.prototype.at = function(t, e) {
            return t >= 0 && t < this.w && e >= 0 && e < this.h && 1 === this.data[this.w * e + t]
        }, e.prototype.index = function(e) {
            var r = new t;
            return r.y = Math.floor(e / this.w), r.x = e - r.y * this.w, r
        }, e.prototype.flip = function(t, e) {
            this.at(t, e) ? this.data[this.w * e + t] = 0 : this.data[this.w * e + t] = 1
        }, e.prototype.copy = function() {
            var t, r = new e(this.w, this.h);
            for (t = 0; t < this.size; t++) r.data[t] = this.data[t];
            return r
        };
        var o, s = document.createElement("img"),
            c = document.createElement("canvas"),
            h = null,
            u = 800,
            l = [],
            d = {
                isReady: !1,
                turnpolicy: "minority",
                turdsize: 5,
                optcurve: !0,
                alphamax: 1,
                opttolerance: 1
            };
        return s.onload = function() {
            (function() {
                var t = s.width / s.height;
                c.width = s.width, c.height = s.height, c.width > u && (c.width = u, c.height = u / t), c.height > u && (c.height = u, c.width = u * t);
                var e = c.getContext("2d");
                e.fillStyle = "#ffffff", e.fillRect(0, 0, c.width, c.height), e.drawImage(s, 0, 0, c.width, c.height)
            })(),
            function() {
                var t = c.getContext("2d");
                h = new e(c.width, c.height);
                var r, i, a, n = t.getImageData(0, 0, h.w, h.h),
                    o = n.data.length;
                for (r = 0, i = 0; r < o; r += 4, i++) a = .2126 * n.data[r] + .7153 * n.data[r + 1] + .0721 * n.data[r + 2], h.data[i] = a < 128 ? 1 : 0;
                d.isReady = !0
            }()
        }, {
            loadImageFromFile: function(t) {
                d.isReady && n(), s.file = t;
                var e, r = new FileReader;
                r.onload = (e = s, function(t) {
                    e.src = t.target.result
                }), r.readAsDataURL(t)
            },
            loadImageFromUrl: function(t) {
                d.isReady && n(), s.src = t
            },
            setParameter: function(t) {
                var e;
                for (e in t) t.hasOwnProperty(e) && (d[e] = t[e])
            },
            loadFromCanvas: function(t) {
                d.isReady && n(), c.width = t.width, c.height = t.height;
                var r = c.getContext("2d");
                r.clearRect(0, 0, c.width, c.height), r.drawImage(t, 0, 0, c.width, c.height), h = new e(c.width, c.height);
                var i, a, o, s = r.getImageData(0, 0, h.w, h.h),
                    u = s.data.length;
                for (i = 0, a = 0; i < u; i += 4, a++) s.data[i + 3] > 0 && (o = .2126 * s.data[i] + .7153 * s.data[i + 1] + .0721 * s.data[i + 2], h.data[a] = o < 128 ? 1 : 0);
                d.isReady = !0
            },
            process: function e(i) {
                i && (o = i), d.isReady ? (function() {
                    function e(t, e) {
                        var r, i, n;
                        for (r = 2; r < 5; r++) {
                            for (n = 0, i = 1 - r; i <= r - 1; i++) n += a.at(t + i, e + r - 1) ? 1 : -1, n += a.at(t + r - 1, e + i - 1) ? 1 : -1, n += a.at(t + i - 1, e - r) ? 1 : -1, n += a.at(t - r, e + i) ? 1 : -1;
                            if (n > 0) return 1;
                            if (n < 0) return 0
                        }
                        return 0
                    }
                    for (var i, a = h.copy(), n = new t(0, 0); n = function(t) {
                            for (var e = a.w * t.y + t.x; e < a.size && 1 !== a.data[e];) e++;
                            return e < a.size && a.index(e)
                        }(n);)(function(t) {
                        var e, r, i, n, o, s, c = t.pt[0].y,
                            h = t.len;
                        for (o = 1; o < h; o++)
                            if (e = t.pt[o].x, (r = t.pt[o].y) !== c) {
                                for (n = c < r ? c : r, i = t.maxX, s = e; s < i; s++) a.flip(s, n);
                                c = r
                            }
                    })(i = function(i) {
                        var n, o = new r,
                            s = i.x,
                            c = i.y,
                            u = 0,
                            l = 1;
                        for (o.sign = h.at(i.x, i.y) ? "+" : "-"; o.pt.push(new t(s, c)), s > o.maxX && (o.maxX = s), s < o.minX && (o.minX = s), c > o.maxY && (o.maxY = c), c < o.minY && (o.minY = c), o.len++, s += u, c += l, o.area -= s * l, s !== i.x || c !== i.y;) {
                            var f = a.at(s + (u + l - 1) / 2, c + (l - u - 1) / 2),
                                p = a.at(s + (u - l - 1) / 2, c + (l + u - 1) / 2);
                            p && !f ? "right" === d.turnpolicy || "black" === d.turnpolicy && "+" === o.sign || "white" === d.turnpolicy && "-" === o.sign || "majority" === d.turnpolicy && e(s, c) || "minority" === d.turnpolicy && !e(s, c) ? (n = u, u = -l, l = n) : (n = u, u = l, l = -n) : p ? (n = u, u = -l, l = n) : f || (n = u, u = l, l = -n)
                        }
                        return o
                    }(n)), i.area > d.turdsize && l.push(i)
                }(), a(), o(), o = null) : setTimeout(function() {
                    e(i)
                }, 100)
            },
            getSVG: function(t, e, r) {
                var i, a, n, o, s = h.w * t,
                    c = h.h * t,
                    u = l.length,
                    d = '<svg id="svg" version="1.1" width="' + s + '" height="' + c + '" xmlns="http://www.w3.org/2000/svg">';
                for (d += '<path d="', i = 0; i < u; i++) d += function(e) {
                    var r, i, a, n, o = e.n,
                        s = "M" + (e.c[3 * (o - 1) + 2].x * t).toFixed(3) + " " + (e.c[3 * (o - 1) + 2].y * t).toFixed(3) + " ";
                    for (r = 0; r < o; r++) "CURVE" === e.tag[r] ? s += (a = r, n = void 0, n = "C " + (e.c[3 * a + 0].x * t).toFixed(3) + " " + (e.c[3 * a + 0].y * t).toFixed(3) + ",", (n += (e.c[3 * a + 1].x * t).toFixed(3) + " " + (e.c[3 * a + 1].y * t).toFixed(3) + ",") + (e.c[3 * a + 2].x * t).toFixed(3) + " " + (e.c[3 * a + 2].y * t).toFixed(3) + " ") : "CORNER" === e.tag[r] && (s += (i = r, "L " + (e.c[3 * i + 1].x * t).toFixed(3) + " " + (e.c[3 * i + 1].y * t).toFixed(3) + " " + (e.c[3 * i + 2].x * t).toFixed(3) + " " + (e.c[3 * i + 2].y * t).toFixed(3) + " "));
                    return s
                }(l[i].curve);
                return "curve" === e ? (a = "black", n = "none", o = "") : (a = "none", n = r, o = ' fill-rule="evenodd"'), d + '" stroke="' + a + '" fill="' + n + '"' + o + "/></svg>"
            },
            getPath: function(t, e, r, i) {
                h.w, h.h;
                var a, n, o, s, c = l.length,
                    u = "";
                for (u += '<path d="', a = 0; a < c; a++) u += function(e) {
                    var r, i, a, n, o = e.n,
                        s = "M" + (e.c[3 * (o - 1) + 2].x * t).toFixed(3) + " " + (e.c[3 * (o - 1) + 2].y * t).toFixed(3) + " ";
                    for (r = 0; r < o; r++) "CURVE" === e.tag[r] ? s += (a = r, n = void 0, n = "C " + (e.c[3 * a + 0].x * t).toFixed(3) + " " + (e.c[3 * a + 0].y * t).toFixed(3) + ",", (n += (e.c[3 * a + 1].x * t).toFixed(3) + " " + (e.c[3 * a + 1].y * t).toFixed(3) + ",") + (e.c[3 * a + 2].x * t).toFixed(3) + " " + (e.c[3 * a + 2].y * t).toFixed(3) + " ") : "CORNER" === e.tag[r] && (s += (i = r, "L " + (e.c[3 * i + 1].x * t).toFixed(3) + " " + (e.c[3 * i + 1].y * t).toFixed(3) + " " + (e.c[3 * i + 2].x * t).toFixed(3) + " " + (e.c[3 * i + 2].y * t).toFixed(3) + " "));
                    return s
                }(l[a].curve);
                return "curve" === e ? (n = "black", o = "none", s = "") : (n = "none", o = r, s = ' fill-rule="evenodd"'), u += '" stroke="' + n + '" fill="' + o + '"' + s + "/>", i && (u = u.replace("<path d", '<path id="' + i + '" d')), u
            },
            getPathd: function(t, e, r) {
                h.w, h.h;
                var i, a = l.length,
                    n = "";
                for (i = 0; i < a; i++) n += function(e) {
                    var r, i, a, n, o = e.n,
                        s = "M" + (e.c[3 * (o - 1) + 2].x * t).toFixed(3) + " " + (e.c[3 * (o - 1) + 2].y * t).toFixed(3) + " ";
                    for (r = 0; r < o; r++) "CURVE" === e.tag[r] ? s += (a = r, n = void 0, n = "C " + (e.c[3 * a + 0].x * t).toFixed(3) + " " + (e.c[3 * a + 0].y * t).toFixed(3) + ",", (n += (e.c[3 * a + 1].x * t).toFixed(3) + " " + (e.c[3 * a + 1].y * t).toFixed(3) + ",") + (e.c[3 * a + 2].x * t).toFixed(3) + " " + (e.c[3 * a + 2].y * t).toFixed(3) + " ") : "CORNER" === e.tag[r] && (s += (i = r, "L " + (e.c[3 * i + 1].x * t).toFixed(3) + " " + (e.c[3 * i + 1].y * t).toFixed(3) + " " + (e.c[3 * i + 2].x * t).toFixed(3) + " " + (e.c[3 * i + 2].y * t).toFixed(3) + " "));
                    return s
                }(l[i].curve);
                return n
            },
            img: s
        }
    }(),
    mul_table = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259],
    shg_table = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];
! function(t) {
    var e = t.document,
        r = t.Math,
        i = function(t, e) {
            for (var r in e) t[r] = e[r]
        },
        a = function(t, e) {
            if (e = e || "", !t) throw new Error(e)
        },
        n = function(t, r) {
            a("canvas" === t.nodeName.toLowerCase(), "A canvas element is excepted.");
            var n = {
                width: t.width,
                height: t.height,
                useWorker: "function" == typeof Worker,
                workerPath: "../../pngtosvg/CanvasEffects.worker.js"
            };
            i(n, r), this.width = n.width, this.height = n.height;
            var o = e.createElement("canvas");
            if (o.width = this.width, o.height = this.height, this.ctx = t.getContext("2d"), this.tmpCtx = o.getContext("2d"), n.useWorker) {
                var s = this;
                this._queue = [], this.worker = new Worker(n.workerPath), this.worker.onmessage = function(t) {
                    var e = s.createImageData(s.width, s.height);
                    if ("undefined" == typeof Uint8ClampedArray)
                        for (var r = 0; r < t.data.length; r++) e.data[r] = t.data[r];
                    else e.data.set(t.data);
                    for (r = 0; r < s._queue.length; r++) e.data = s._queue[r](e.data);
                    s._queue = [], s.ctx.clearRect(0, 0, s.width, s.height), s.ctx.putImageData(e, 0, 0)
                }, this.worker.postMessage({
                    type: "init",
                    w: this.width,
                    h: this.height
                })
            }
        };
    i(n.prototype, {
        load: function(t, e, r) {
            "function" == typeof e && (r = e, e = !0), e = void 0 === e || e;
            var i = new Image,
                a = this;
            return i.onload = function() {
                e ? (a.ctx.drawImage(this, 0, 0, this.width, this.height, 0, 0, a.width, a.height), a.tmpCtx.drawImage(this, 0, 0, this.width, this.height, 0, 0, a.width, a.height)) : (a.ctx.drawImage(this, 0, 0, this.width, this.height), a.tmpCtx.drawImage(this, 0, 0, this.width, this.height)), r.call(a)
            }, i.crossOrigin = !0, i.src = t, this
        },
        restore: function() {
            return this.ctx.clearRect(0, 0, this.width, this.height), this.ctx.drawImage(this.tmpCtx.canvas, 0, 0, this.width, this.height), this
        },
        save: function() {
            return this.tmpCtx.clearRect(0, 0, this.width, this.height), this.tmpCtx.drawImage(this.ctx.canvas, 0, 0, this.width, this.height), this
        },
        toDataURL: function() {
            return this.ctx.canvas.toDataURL("image/png")
        },
        process: function(t) {
            for (var e = this.ctx.getImageData(0, 0, this.width, this.height), r = 0; r < this.width; r++)
                for (var i = 0; i < this.height; i++) {
                    var a = 4 * (i * this.width + r),
                        n = t(e.data[a], e.data[a + 1], e.data[a + 2], e.data[a + 3], r, i);
                    e.data[a] = n[0], e.data[a + 1] = n[1], e.data[a + 2] = n[2], e.data[a + 3] = n[3]
                }
            return this.ctx.clearRect(0, 0, this.width, this.height), this.ctx.putImageData(e, 0, 0), this
        },
        getContext: function() {
            return this.ctx
        },
        luminance: function(t, e, r) {
            return .2126 * t + .7152 * e + .0722 * r
        },
        createImageData: function(t, e) {
            return this.tmpCtx.createImageData(t, e)
        },
        toHSL: function(t, e, i) {
            t /= 255, e /= 255, i /= 255;
            var a, n, o = r.max(t, e, i),
                s = r.min(t, e, i),
                c = (o + s) / 2;
            if (o === s) a = n = 0;
            else {
                var h = o - s;
                switch (n = c > .5 ? h / (2 - o - s) : h / (o + s), o) {
                    case t:
                        a = (e - i) / h + (e < i ? 6 : 0);
                        break;
                    case e:
                        a = (i - t) / h + 2;
                        break;
                    case i:
                        a = (t - e) / h + 4
                }
            }
            return {
                h: a /= 6,
                s: n,
                l: c
            }
        },
        toRGB: function(t, e, r) {
            var i, a, n;
            if (0 == e) i = a = n = r;
            else {
                function o(t, e, r) {
                    return r < 0 && (r += 1), r > 1 && (r -= 1), r < 1 / 6 ? t + 6 * (e - t) * r : r < .5 ? e : r < 2 / 3 ? t + (e - t) * (2 / 3 - r) * 6 : t
                }
                var s = r < .5 ? r * (1 + e) : r + e - r * e,
                    c = 2 * r - s;
                i = o(c, s, t + 1 / 3), a = o(c, s, t), n = o(c, s, t - 1 / 3)
            }
            return {
                r: 255 * i,
                g: 255 * a,
                b: 255 * n
            }
        },
        colorTempToRGB: function(t) {
            var e, i, a;
            return (t /= 100) <= 66 ? (e = 255, i = r.min(r.max(99.4708025861 * r.log(t) - 161.1195681661, 0), 255)) : (e = r.min(r.max(329.698727446 * r.pow(t - 60, -.1332047592), 0), 255), i = r.min(r.max(288.1221695283 * r.pow(t - 60, -.0755148492), 0), 255)), t >= 66 ? a = 255 : t <= 19 ? a = 0 : (a = t - 10, a = r.min(r.max(138.5177312231 * r.log(a) - 305.0447927307, 0), 255)), {
                r: e,
                g: i,
                b: a
            }
        },
        equalizeHistogram: function(t, e) {
            var r = t.length;
            e || (e = t);
            for (var i = new Float32Array(256), a = 0, n = 0; n < r; ++n) ++i[~~t[n]], ++a;
            var o = i[0];
            for (n = 1; n < 256; ++n) o = i[n] += o;
            var s = 255 / a;
            for (n = 0; n < r; ++n) e[n] = i[~~t[n]] * s;
            return e
        },
        _toWorker: function(t) {
            if (this.worker) return i(t, {
                data: this.ctx.getImageData(0, 0, this.width, this.height).data
            }), this.worker.postMessage(t), this;
            a(!1, "No web worker support!")
        },
        queue: function(t) {
            if (this.worker) this._queue.push(t);
            else {
                var e = this.ctx.getImageData(0, 0, this.width, this.height);
                e.data = t(e.data), this.ctx.putImageData(e, 0, 0)
            }
            return this
        }
    }), i(n.prototype, {
        greyscale: function(t) {
            t = void 0 === t ? 1 : r.min(r.max(t, 0), 1);
            var e = this;
            return this.process(function(r, i, a, n) {
                var o = e.luminance(r, i, a);
                return [o * t + r * (1 - t), o * t + i * (1 - t), o * t + a * (1 - t), n]
            })
        },
        threshold: function(t) {
            t = t || 127;
            var e = this;
            return this.process(function(r, i, a, n) {
                var o = e.luminance(r, i, a) > t ? 255 : 0;
                return [o, o, o, n]
            })
        },
        invert: function(t) {
            return t = void 0 === t ? 1 : r.min(r.max(t, 0), 1), this.process(function(e, r, i, a) {
                return [(255 - e) * t + e * (1 - t), (255 - r) * t + r * (1 - t), (255 - i) * t + i * (1 - t), a]
            })
        },
        sepia: function(t) {
            return t = void 0 === t ? 1 : r.min(r.max(t, 0), 1), this.process(function(e, r, i, a) {
                return [(.393 * e + .769 * r + .189 * i) * t + e * (1 - t), (.349 * e + .686 * r + .168 * i) * t + r * (1 - t), (.272 * e + .534 * r + .131 * i) * t + i * (1 - t), a]
            })
        },
        hdr: function() {
            var t = function(t) {
                return t > 0 && t <= 127 ? t = r.sin(r.PI * (90 - t / 4) / 180) * t : t > 127 && (t = r.sin(r.PI * (90 - (255 - t) / 4) / 180) * t), t
            };
            return this.process(function(e, r, i, a) {
                return [t(e), t(r), t(i), a]
            })
        }
    }), i(n.prototype, {
        noise: function(t, e) {
            return a(t >= 0, "Noise amount must be a positive number."), e = e || !1, this.process(function(i, a, n, o) {
                var s = -t / 2 + r.random() * t * 2;
                return [i + s, a + s, n + s, e ? o + s : o]
            })
        },
        glow: function(t) {
            var e = this;
            return this.blur(t), this.queue(function(t) {
                for (var r = e.ctx.getImageData(0, 0, e.width, e.height), i = 0; i < t.length; i += 4) t[i] = 255 - (255 - t[i]) * (255 - r.data[i]) / 255, t[i + 1] = 255 - (255 - t[i + 1]) * (255 - r.data[i + 1]) / 255, t[i + 2] = 255 - (255 - t[i + 2]) * (255 - r.data[i + 2]) / 255, t[i + 3] = 255 - (255 - t[i + 3]) * (255 - r.data[i + 3]) / 255;
                return t
            })
        },
        colorMatrix: function(t) {
            return this.process(function(e, r, i, a) {
                return [e * t[0] + r * t[1] + i * t[2] + a * t[3] + 255 * t[20], e * t[5] + r * t[6] + i * t[7] + a * t[8] + 255 * t[21], e * t[10] + r * t[11] + i * t[12] + a * t[13] + 255 * t[22], e * t[15] + r * t[16] + i * t[17] + a * t[18] + 255 * t[23]]
            })
        },
        equalize: function() {
            var t = this,
                e = new Uint8ClampedArray(this.width * this.height),
                r = 0;
            return this.process(function(i, a, n, o) {
                return e[r] = t.luminance(i, a, n), r++, [i, a, n, o]
            }), this.equalizeHistogram(e), r = 0, this.process(function(i, a, n, o) {
                var s = t.toHSL(i, a, n);
                s.l = e[r] / 255, r++;
                var c = t.toRGB(s.h, s.s, s.l);
                return [c.r, c.g, c.b, o]
            })
        },
        tv: function() {
            return this.process(function(t, e, i, a, n, o) {
                var s = 80 * r.sin(o);
                return [t - s, e - s, i - s, a]
            }), this.noise(50)
        }
    }), i(n.prototype, {
        hue: function(t, e) {
            a(void 0 !== t, "Hue must be specified.");
            var r = this;
            return e = e || !1, this.process(function(i, a, n, o) {
                var s = r.toHSL(i, a, n);
                s.h = e ? t / 360 : s.h + t / 360;
                var c = r.toRGB(s.h, s.s, s.l);
                return [c.r, c.g, c.b, o]
            })
        },
        saturation: function(t, e) {
            a(void 0 !== t, "Saturation must be specified.");
            var i = this;
            return e = e || !1, this.process(function(a, n, o, s) {
                var c = i.toHSL(a, n, o);
                c.s = e ? r.min(r.max(t, 0), 1) : r.min(r.max(c.s + t, 0), 1);
                var h = i.toRGB(c.h, c.s, c.l);
                return [h.r, h.g, h.b, s]
            })
        },
        brightness: function(t) {
            return a(void 0 !== t, "Brightness must be set"), this.process(function(e, r, i, a) {
                return [e + t, r + t, i + t, a]
            })
        },
        contrast: function(t) {
            a(void 0 !== t, "Contrast level must be set.");
            return t = r.pow((t + 100) / 100, 2), this.process(function(e, r, i, a) {
                return [255 * ((e / 255 - .5) * t + .5), 255 * ((r / 255 - .5) * t + .5), 255 * ((i / 255 - .5) * t + .5), a]
            })
        },
        gamma: function(t) {
            return a(void 0 !== t, "Gamma level must be set."), this.process(function(e, r, i, a) {
                return [e * t, r * t, i * t, a]
            })
        },
        gammaRGB: function(t, e, r) {
            return a(void 0 !== t && void 0 !== e && void 0 !== r, "Gamma level must be set."), this.process(function(i, a, n, o) {
                return [i * t, a * e, n * r, o]
            })
        },
        vibrance: function(t) {
            return a(void 0 !== t, "Vibrance level must be set."), t *= -1, this.process(function(e, i, a, n) {
                var o = r.max(e, i, a),
                    s = (e + i + a) / 3,
                    c = 2 * r.abs(o - s) / 255 * t / 100;
                return e !== o && (e += (o - e) * c), i !== o && (i += (o - i) * c), a !== o && (a += (o - a) * c), [e, i, a, n]
            })
        },
        whiteBalance: function(t) {
            var e = this.colorTempToRGB(t);
            return this.process(function(t, r, i, a) {
                return [t * (255 / e.r), r * (255 / e.g), i * (255 / e.b), a]
            })
        }
    }), i(n.prototype, {
        convolute: function(t, e, i) {
            if (a(void 0 !== t, "Convolution matrix must be set."), a(void 0 !== e, "Offset must be set."), i = i || !0, this.worker) this._toWorker({
                type: "convolute",
                matrix: t,
                offset: e,
                opaque: i
            });
            else {
                for (var n = this.ctx.getImageData(0, 0, this.width, this.height), o = r.round(r.sqrt(t.length)), s = r.floor(o / 2), c = n.data, h = n.width, u = n.height, l = h, d = u, f = this.createImageData(l, d), p = f.data, g = i ? 1 : 0, x = 0; x < d; x++)
                    for (var v = 0; v < l; v++) {
                        for (var m = x, y = v, w = 4 * (x * l + v), b = 0, k = 0, C = 0, M = 0, I = 0; I < o; I++)
                            for (var A = 0; A < o; A++) {
                                var _ = m + I - s,
                                    R = y + A - s;
                                if (_ >= 0 && _ < u && R >= 0 && R < h) {
                                    var F = 4 * (_ * h + R),
                                        S = t[I * o + A];
                                    b += c[F] * S, k += c[F + 1] * S, C += c[F + 2] * S, M += c[F + 3] * S
                                }
                            }
                        p[w] = e + b, p[w + 1] = e + k, p[w + 2] = e + C, p[w + 3] = M + g * (255 - M)
                    }
                this.ctx.clearRect(0, 0, this.width, this.height), this.ctx.putImageData(f, 0, 0)
            }
            return this
        },
        blur: function(t) {
            a(void 0 !== t, "Blur radius must be set.");
            var e = t * t,
                r = 1 / e,
                i = [];
            if (e < 4) return this;
            for (; e--;) i.push(r);
            return this.convolute(i, 0, !1)
        },
        sharpen: function() {
            return this.convolute([0, -1, 0, -1, 5, -1, 0, -1, 0], 0, !1)
        },
        emboss: function() {
            return this.convolute([2, 0, 0, 0, -1, 0, 0, 0, -1], 127, !1)
        },
        findEdges: function() {
            return this.convolute([-1, 0, 1, -2, 0, 2, -1, 0, 1], 0, !1)
        }
    }), t.CanvasEffects = n
}(window);