(function(q) {
    "undefined" === typeof Uint8ClampedArray && (Uint8ClampedArray = Uint8Array);
    var g, r, f = {
        convolute: function(a, f, s, d) {
            d = d || !0;
            var h = Math.round(Math.sqrt(f.length)),
                w = Math.floor(h / 2),
                x = g,
                q = r,
                e = new Uint8ClampedArray(a.length);
            d = d ? 1 : 0;
            for (var j = 0; j < r; j++)
                for (var k = 0; k < g; k++) {
                    for (var y = j, z = k, l = 4 * (j * g + k), t = 0, u = 0, v = 0, m = 0, n = 0; n < h; n++)
                        for (var p = 0; p < h; p++) {
                            var b = y + n - w,
                                c = z + p - w;
                            0 <= b && (b < q && 0 <= c && c < x) && (b = 4 * (b * x + c), c = f[n * h + p], t += a[b] * c, u += a[b + 1] * c, v += a[b + 2] * c, m += a[b + 3] * c)
                        }
                    e[l] = s + t;
                    e[l + 1] = s + u;
                    e[l + 2] = s + v;
                    e[l + 3] = m + d * (255 - m)
                }
            return e
        }
    };
    q.onmessage = function(a) {
        a = a.data;
        switch (a.type) {
            case "init":
                g = a.w;
                r = a.h;
                break;
            case "convolute":
                this.postMessage(f.convolute(a.data, a.matrix, a.offset, a.opaque));
        }
    }
})(this);