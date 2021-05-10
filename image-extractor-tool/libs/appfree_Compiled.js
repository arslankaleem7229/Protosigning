(function() {
    var r9 = [arguments];

    function g2() {
        var x9 = [arguments];
        try {
            x9[9] = 2;
            for (; x9[9] !== 4;) {
                switch (x9[9]) {
                    case 2:
                        x9[2] = x9[0][0].Object.create(null);
                        x9[2].value = (1, x9[0][1])(x9[0][0])[x9[0][2]];
                        x9[0][0].Object.defineProperty((1, x9[0][1])(x9[0][0]), x9[0][3], x9[2]);
                        x9[9] = 4;
                        break;
                }
            }
        } catch (z9) {}
    }
    r9[4] = 2;
    for (; r9[4] !== 1;) {
        switch (r9[4]) {
            case 2:
                g2(r9[0][0], function() {
                    var K9 = [arguments];
                    return K9[0][0].String.prototype;
                }, "charCodeAt", "u9yy");
                r9[4] = 1;
                break;
        }
    }
}(typeof window === typeof {} ? window : typeof global === typeof {} ? global : this));
v4rr.P7 = function() {
    return typeof v4rr.h7.S7 === 'function' ? v4rr.h7.S7.apply(v4rr.h7, arguments) : v4rr.h7.S7;
};
v4rr.Q2 = function() {
    return typeof v4rr.h7.L7 === 'function' ? v4rr.h7.L7.apply(v4rr.h7, arguments) : v4rr.h7.L7;
};
v4rr.p9 = function() {
    return typeof v4rr.P9.S7 === 'function' ? v4rr.P9.S7.apply(v4rr.P9, arguments) : v4rr.P9.S7;
};
v4rr.e2 = function() {
    return typeof v4rr.h7.S7 === 'function' ? v4rr.h7.S7.apply(v4rr.h7, arguments) : v4rr.h7.S7;
};
v4rr.Z9 = function() {
    return typeof v4rr.P9.S7 === 'function' ? v4rr.P9.S7.apply(v4rr.P9, arguments) : v4rr.P9.S7;
};

function v4rr() {}
v4rr.P9 = function() {
    var B7 = function(I7, R7) {
            var Z7 = R7 & 0xffff;
            var X7 = R7 - Z7;
            return (X7 * I7 | 0) + (Z7 * I7 | 0) | 0;
        },
        x7 = function(M7, J7, V7) {
            var m7 = 0xcc9e2d51,
                w7 = 0x1b873593;
            var f7 = V7;
            var t7 = J7 & ~0x3;
            for (var z7 = 0; z7 < t7; z7 += 4) {
                var H7 = M7.u9yy(z7) & 0xff | (M7.u9yy(z7 + 1) & 0xff) << 8 | (M7.u9yy(z7 + 2) & 0xff) << 16 | (M7.u9yy(z7 + 3) & 0xff) << 24;
                H7 = B7(H7, m7);
                H7 = (H7 & 0x1ffff) << 15 | H7 >>> 17;
                H7 = B7(H7, w7);
                f7 ^= H7;
                f7 = (f7 & 0x7ffff) << 13 | f7 >>> 19;
                f7 = f7 * 5 + 0xe6546b64 | 0;
            }
            H7 = 0;
            switch (J7 % 4) {
                case 3:
                    H7 = (M7.u9yy(t7 + 2) & 0xff) << 16;
                case 2:
                    H7 |= (M7.u9yy(t7 + 1) & 0xff) << 8;
                case 1:
                    H7 |= M7.u9yy(t7) & 0xff;
                    H7 = B7(H7, m7);
                    H7 = (H7 & 0x1ffff) << 15 | H7 >>> 17;
                    H7 = B7(H7, w7);
                    f7 ^= H7;
            }
            f7 ^= J7;
            f7 ^= f7 >>> 16;
            f7 = B7(f7, 0x85ebca6b);
            f7 ^= f7 >>> 13;
            f7 = B7(f7, 0xc2b2ae35);
            f7 ^= f7 >>> 16;
            return f7;
        };
    return {
        S7: x7
    };
}();
v4rr.D2 = function() {
    return typeof v4rr.h7.C7 === 'function' ? v4rr.h7.C7.apply(v4rr.h7, arguments) : v4rr.h7.C7;
};
v4rr.w2 = function() {
    return typeof v4rr.h7.C7 === 'function' ? v4rr.h7.C7.apply(v4rr.h7, arguments) : v4rr.h7.C7;
};
v4rr.K2 = function() {
    return typeof v4rr.h7.L7 === 'function' ? v4rr.h7.L7.apply(v4rr.h7, arguments) : v4rr.h7.L7;
};
v4rr.h7 = function(l7) {
    return {
        L7: function() {
            var r7, a7 = arguments;
            switch (l7) {
                case 7:
                    r7 = a7[14] + (a7[3] + a7[8]) + a7[6] + (a7[4] + (a7[5] - a7[12])) + a7[2] + (a7[11] + +a7[10]) + a7[13] + (a7[0] + (a7[9] - a7[7])) + a7[1];
                    break;
                case 0:
                    r7 = a7[0] | a7[1];
                    break;
                case 1:
                    r7 = a7[0] * a7[1];
                    break;
                case 8:
                    r7 = a7[2] + a7[3] + a7[4] + a7[1] + a7[0];
                    break;
                case 14:
                    r7 = (a7[2] - a7[0]) / +a7[1];
                    break;
                case 3:
                    r7 = a7[1] + a7[0] + a7[6] + a7[2] + a7[3] + a7[4] + a7[5];
                    break;
                case 10:
                    r7 = (a7[0] | a7[1]) * (a7[3] + +a7[2]);
                    break;
                case 11:
                    r7 = (a7[1] - a7[0]) * a7[2];
                    break;
                case 6:
                    r7 = a7[1] + a7[0];
                    break;
                case 4:
                    r7 = a7[9] + a7[7] + a7[6] + a7[1] + a7[0] + a7[10] + a7[5] + a7[3] + a7[2] + a7[4] + a7[8];
                    break;
                case 5:
                    r7 = +a7[1] / a7[0];
                    break;
                case 2:
                    r7 = a7[1] - a7[0];
                    break;
                case 9:
                    r7 = a7[2] + a7[1] * a7[0];
                    break;
                case 12:
                    r7 = a7[2] + a7[0] + a7[1];
                    break;
                case 13:
                    r7 = a7[1] / a7[0];
                    break;
            }
            return r7;
        },
        C7: function(i7) {
            l7 = i7;
        }
    };
}();




// var holder, reduceCtx, fx, ofx, imageData, imgURL, currentColorItem, loadImg, primarySVG, splitSVG, svgCanvas, SVGctxt, MAX_WIDTH, fileTypes, reduceCanvas, effectcanvas, gamma, saturation, hue, contrast, colors, colorIndex, method, algorithm, range, simplify, scaleFactor, dithDelta, palette, svgString, lastHistogram, lastUrl, toColorRGB, toColorHex, fromColorHex, fromColorsRGB, fromColorsHex, finalColors, colorThief, ectx, p, lastrgb, colorli, cindex, isPicking, imgAspect, preserveAspectRatio;

// function disableFromColors(C4) {
//     getAllFromColors();
//     $('input[class="toColorInp"]')["each"](function() {
//         $(this)["attr"]("disabled", !1);
//         for (var r4 = 0; r4 < fromColorsHex["length"]; r4++) {
//             $(this)["attr"]("data-color") == fromColorsHex[r4] && $(this)["attr"]("disabled", !0);
//         }
//     });
// }
// function greyscaleChange(F1) {
//     var o2 = v4rr;
//     var X9, n9, f9;
//     X9 = 1033349566;
//     o2.w2(0);
//     n9 = o2.K2("2046168822", 0);
//     f9 = +"2";
//     for (var q9 = "1" | 0; o2.p9(q9.toString(), q9.toString().length, 4742) !== X9; q9++) {
//         fx && (fx["restore"](), saturation = F1["target"]["value"] / +"100", fx["gamma"](gamma)["greyscale"](saturation)["hue"](hue)["contrast"](contrast), $("#originalImg")["attr"]("src", fx["toDataURL"]()));
//         o2.w2(1);
//         f9 += o2.Q2("2", 1);
//     }
//     if (o2.Z9(f9.toString(), f9.toString().length, "17954" - 0) !== n9) {
//         fx || (fx["greyscale"](), saturation = F1["greyscale"]["contrast"] % ("357" | 0), fx["contrast"](gamma)["greyscale"](saturation)["hue"](hue)["hue"](contrast), $("contrast")["contrast"]("toDataURL", fx["toDataURL"]()));
//     }
// }

// function getDominantColors(A) {
//     colorThief["getColorFromUrl"](A, function(X) {
//         palette = range <= X["length"] ? X["slice"](+"0", range) : X;
//         $("#pickedcolorlist")["empty"]();
//         for (var E = +"0"; E < palette["length"]; E++) {
//             $("#pickedcolorlist")["append"]('<li index="' + E + '" onclick="onPickColor(event)" style="background-color: rgb(' + palette[E][+"0"] + "," + palette[E]["1" | 0] + "," + palette[E][2] + ');"></li>');
//         }
//     });
// }

// function reduceColors(f) {
//     var Y, U, w, z, Z;
//     Z = function() {
//         var Y2 = v4rr;
//         var U5, J9, i9, l9;
//         U5 = {};
//         U5["method"] = method;
//         U5["colors"] = palette["length"];
//         U5["ditherKern"] = "1" - 0 == dithDelta ? null : "FloydSteinberg";
//         U5["dithDelta"] = dithDelta;
//         U5["palette"] = palette;
//         Y2.w2(0);
//         J9 = Y2.K2("2117504073", 0);
//         i9 = 882002657;
//         l9 = +"2";
//         for (var y9 = 1; Y2.p9(y9.toString(), y9.toString().length, "94893" * 1) !== J9; y9++) {
//             U5["dithSerp"] = !+"1";
//             U5["reIndex"] = !0;
//             Y2.D2(1);
//             U5["useCache"] = !Y2.Q2("0", 1);
//             U5["colorDist"] = algorithm;
//             U5["blur"] = simplify;
//             l9 += 2;
//         }
//         if (Y2.p9(l9.toString(), l9.toString().length, "75998" | 0) !== i9) {
//             U5["blur"] = ~+"9";
//             U5["blur"] = -6;
//             Y2.D2(1);
//             U5["blur"] = +Y2.Q2("8", 1);
//             U5["blur"] = algorithm;
//             U5["blur"] = simplify;
//         }
//         return U5;
//     } ["apply"](this, arguments);
//     $("#svgContainer")["html"]("");
//     $("#colorList")["html"]("");
//     $("#tocolorList")["html"]("");
//     $("#fromcolorList")["html"]("");
//     $(".colorpicker")["remove"]();
//     $("#loadingMsg")["css"]("display", "block");
//     $("#download-btn")["css"]("display", "none");
//     $("#splitSVGDownload")["css"]("display", "none");
//     $("#splitSVGprice")["css"]("display", "none");
//     $("#splitSVGpriceOffer")["css"]("display", "none");
//     "1" * 1 != range ? (Y = new RgbQuant(Z), (U = new Image())["crossOrigin"] = "Anonymous", U["onload"] = function() {
//         var k2 = v4rr;
//         var W, g9, U3, M3;
//         g9 = -303430609;
//         k2.D2(0);
//         U3 = k2.K2("273379555", 0);
//         k2.D2(1);
//         M3 = k2.Q2("2", 1);
//         for (var L3 = 1; k2.Z9(L3.toString(), L3.toString().length, "16822" | 0) !== g9; L3++) {
//             W = U["width"] / U["height"];
//             M3 += +"2";
//         }
//         if (k2.p9(M3.toString(), M3.toString().length, +"46623") !== U3) {
//             W = U["height"] + U["height"];
//         }
//         $("#loadingMsg")["html"]("Reducing Image..");
//         Y["sample"](U, null, lastHistogram, void 0, function(h) {
//             var D, I, Q;
//             lastHistogram = h;
//             lastUrl = f;
//             k2.D2(2);
//             w = Y["palette"](!0, !k2.Q2(0, "1"), h);
//             z = Y["reduce"](U);
//             reduceCtx = reduceCanvas["getContext"]("2d");
//             reduceCanvas["width"] = Y["width"];
//             reduceCanvas["height"] = Y["height"];
//             (imageData = reduceCtx["getImageData"](+"0", +"0", Y["width"], Y["height"]))["data"]["set"](z);
//             k2.w2(1);
//             reduceCtx["putImageData"](imageData, +"0", k2.K2("0", 1));
//             colors = [];
//             for (var O = +"0"; O < w["length"]; O++) {
//                 D = rgbToHex(w[O][0], w[O]["1" - 0], w[O]["2" | 0]);
//                 colors["push"](D);
//                 $("#colorList")["append"](k2.Q2(O, '<li id="colorItem', D, '" style="background-color:', D, '"></li>', '" data-color="', k2.w2(3)));
//                 $("#tocolorList")["append"](k2.K2('"><input class="toColorInp" data-color="', D, '" onchange="onToColorSelect(this)"><label for="toColorCB', O, O, '"  type="checkbox" value="1" id="toColorCB', '" style="background-color:', O, '"></label></input></li>', '<li id="tocolorItem', D, k2.w2(4)));
//                 $("#fromcolorList")["append"](k2.Q2('"><input class="fromColorInp" data-color="', D, '" onchange="onFromColorSelect(this)"><label for="fromColorCB', O, O, '"  type="checkbox" value="1" id="fromColorCB', '" style="background-color:', O, '"></label></input></li>', '<li id="fromcolorItem', D, k2.D2(4)));
//             }
//             addColorPickers();
//             k2.D2(0);
//             preload(k2.Q2("10", 0));
//             k2.D2(5);
//             I = k2.K2(W, "400");
//             if (scaleFactor = Math["min"](+"400" / Y["width"], "1" - 0), primarySVG["setAttributeNS"]("http://www.w3.org/2000/svg", "id", "svg"), primarySVG["setAttributeNS"]("http://www.w3.org/2000/svg", "version", "1.1"), primarySVG["setAttribute"]("xmlns", "http://www.w3.org/2000/svg"), primarySVG["setAttribute"]("xmlns:xlink", "http://www.w3.org/1999/xlink"), primarySVG["setAttributeNS"]("http://www.w3.org/2000/svg", "width", "400" | 0), primarySVG["setAttributeNS"]("http://www.w3.org/2000/svg", "height", I), primarySVG["setAttributeNS"]("http://www.w3.org/2000/svg", "viewBox", "0, 0, 400," + I), "0" - 0 === primarySVG["childElementCount"]) {
//                 (Q = document["createElementNS"]("http://www.w3.org/2000/svg", "g"))["setAttributeNS"]("http://www.w3.org/2000/svg", "id", "svgg");
//                 primarySVG["appendChild"](Q);
//             } else {
//                 for (; primarySVG["firstChild"];) {
//                     primarySVG["removeChild"](primarySVG["firstChild"]);
//                 }(Q = document["createElementNS"]("http://www.w3.org/2000/svg", "g"))["setAttributeNS"]("http://www.w3.org/2000/svg", "id", "svgg");
//                 primarySVG["appendChild"](Q);
//             }
//             convertNextPath();
//         });
//     }, U["src"] = imgURL) : convertToSingleColor();
// }

// function replaceImageColors(Y4, E4) {
//     for (var c4, k4 = copyImageData(reduceCtx, imageData), A4 = 0, U4 = k4["data"]["length"]; A4 < U4; A4 += +"4")
//         for (var X4 = +"0"; X4 < Y4["length"]; X4++) {
//             k4["data"][A4] == Y4[X4]["r"] && k4["data"][A4 + +"1"] == Y4[X4]["g"] && k4["data"][A4 + +"2"] == Y4[X4]["b"] && (k4["data"][A4] = E4["r"], k4["data"][A4 + "1" * 1] = E4["g"], k4["data"][A4 + +"2"] = E4["b"], k4["data"][A4 + 3] = E4["a"], c4 = !+"0");
//         }
//     v4rr.D2(0);
//     reduceCtx["clearRect"](v4rr.Q2("0", 0), 0, reduceCanvas["width"], reduceCanvas["height"]);
//     reduceCtx["putImageData"](k4, 0, +"0");
//     imageData = reduceCtx["getImageData"](+"0", +"0", reduceCanvas["width"], reduceCanvas["height"]);
//     c4 && mergesameColors(rgbToHex(E4["r"], E4["g"], E4["b"]));
// }

// function hueChange(k1) {
//     var F2 = v4rr;
//     var e9, s9, V9;
//     e9 = -1358940916;
//     s9 = +"736463913";
//     F2.w2(0);
//     V9 = F2.K2("2", 0);
//     for (var u9 = "1" * 1; F2.p9(u9.toString(), u9.toString().length, "3113" - 0) !== e9; u9++) {
//         fx || (fx["#originalImg"](), hue = k1["gamma"]["src"] * +"2", fx["#originalImg"](gamma)["#originalImg"](saturation)["hue"](hue)["contrast"](contrast), $("attr")["contrast"]("#originalImg", fx["#originalImg"]()));
//         V9 += +"2";
//     }
//     if (F2.p9(V9.toString(), V9.toString().length, +"45658") !== s9) {
//         fx || (fx["#originalImg"](), hue = k1["gamma"]["src"] * +"2", fx["#originalImg"](gamma)["#originalImg"](saturation)["hue"](hue)["contrast"](contrast), $("attr")["contrast"]("#originalImg", fx["#originalImg"]()));
//     }
//     fx && (fx["restore"](), hue = k1["target"]["value"] / ("1" - 0), fx["gamma"](gamma)["greyscale"](saturation)["hue"](hue)["contrast"](contrast), $("#originalImg")["attr"]("src", fx["toDataURL"]()));
// }

// function convertNextPath() {
//     colorIndex < colors["length"] ? (generatePathForColor(colors[colorIndex]), preload("10" - 0 + Math["round"](+"40" * colorIndex / colors["length"]))) : (colorIndex = "0" * 1, drawInlineSVG(SVGctxt, primarySVG["outerHTML"]), constructSplitSVG());
// }

// function mergeColors() {
//     replaceImageColors(getAllFromColors(!0), getToColor());
// }

// function settings() {
//     $(".settingsPanel")["toggle"]();
// }

// function rearrangePathIds() {
//     for (var o4 = "0" - 0; o4 < colors["length"]; o4++) {
//         primarySVG["children"]["0" | 0]["children"][o4]["getAttributeNS"](null, "fill") == colors[o4] && (primarySVG["children"][+"0"]["childNodes"][o4]["setAttribute"]("id", "path" + o4), $("#colorList")["0" | 0]["childNodes"][o4]["setAttribute"]("id", "colorItem" + o4));
//     }
//     drawInlineSVG(document["getElementById"]("svgWithAspectRatio")["getContext"]("2d"), primarySVG["outerHTML"]);
//     constructSplitSVG();
// }

// function resetEffects() {
//     var n2 = v4rr;
//     $("#gammaSldr")["val"](n2.Q2(0, "100", n2.D2(2)));
//     $("#contrastSldr")["val"](+"0");
//     $("#hueSldr")["val"](n2.K2(0, "0", n2.D2(2)));
//     $("#satSldr")["val"](0);
//     fx && (fx["restore"](), gamma = +"1", saturation = hue = contrast = +"0", fx["gamma"](gamma)["greyscale"](saturation)["hue"](hue)["contrast"](contrast), $("#originalImg")["attr"]("src", fx["toDataURL"]()));
// }

// function getToColor() {
//     return toColorRGB;
// }

// function generateColorPallete() {
//     var H1;
//     H1 = [];
//     for (r = 0; r < 255; r += +"10")
//         for (g = "0" | 0; g < 255; g += "10" - 0)
//             for (b = +"0"; b < 255; b += 10) {
//                 H1["push"]([r, g, b]);
//             }
//     return console["log"](H1["length"]), H1;
// }

// function generatePathForColor(u4) {
//     var x2 = v4rr;
//     for (var K4 = hexToRGB(u4), s4 = copyImageData(reduceCtx, imageData), T4 = s4["data"]["length"], m4 = +"0"; m4 < T4; m4 += "4" * 1) {
//         s4["data"][m4] == K4["r"] && s4["data"][m4 + ("1" | 0)] == K4["g"] && s4["data"][m4 + ("2" - 0)] == K4["b"] ? (s4["data"][m4] = +"0", s4["data"][m4 + ("1" - 0)] = +"0", s4["data"][m4 + +"2"] = +"0") : (s4["data"][m4] = "255" - 0, s4["data"][m4 + "1" * 1] = "255" | 0, s4["data"][m4 + 2] = +"255");
//     }
//     x2.D2(0);
//     reduceCtx["clearRect"](x2.K2("0", 0), +"0", reduceCanvas["width"], reduceCanvas["height"]);
//     x2.w2(0);
//     reduceCtx["putImageData"](s4, x2.K2("0", 0), x2.Q2(0, "0", x2.D2(2)));
//     Potrace["loadFromCanvas"](reduceCanvas);
//     Potrace["process"](function() {
//         var G4;
//         x2.w2(6);
//         G4 = Potrace["getPath"](scaleFactor, "", u4, x2.Q2(colorIndex, "path"));
//         primarySVG["firstChild"]["innerHTML"] += G4;
//         x2.w2(0);
//         reduceCtx["putImageData"](imageData, +"0", x2.K2("0", 0));
//         colorIndex++;
//         setTimeout(function() {
//             convertNextPath();
//         }, +"0");
//     });
// }

// function delay(z4) {
//     for (z4 += new Date()["getTime"](); new Date() < z4;);
// }

// function findPos(E1) {
//     var A2 = v4rr;
//     var X1, Y1, i5, h3, q3, o3;
//     X1 = 0;
//     Y1 = +"0";
//     if (E1["offsetParent"]) {
//         h3 = +"138764903";
//         q3 = - +"443676165";
//         o3 = +"2";
//         for (var Q3 = +"1"; A2.p9(Q3.toString(), Q3.toString().length, "25702" - 0) !== h3; Q3++) {
//             for (; X1 += E1["offsetLeft"], Y1 += E1["offsetTop"], E1 = E1["offsetParent"];);
//             A2.D2(2);
//             o3 += A2.Q2(0, "2");
//         }
//         if (A2.p9(o3.toString(), o3.toString().length, "568" | 0) !== q3) {
//             for (; X1 %= E1["offsetParent"], Y1 -= E1["offsetTop"], E1 = E1["offsetParent"];);
//         }
//         i5 = {};
//         i5["x"] = X1;
//         i5["y"] = Y1;
//         return i5;
//     }
// }

// function changeColor(i4, g4) {
//     var a4;
//     a4 = $(currentColorItem)["attr"]("id")["split"]("colorItem")[+"1"];
//     if (("1" | 0) < colors["length"])
//         for (var Z4 = 0; Z4 < primarySVG["childNodes"][+"0"]["children"]["length"]; Z4++)
//             if (primarySVG["children"]["0" * 1]["children"][Z4]["getAttributeNS"](null, "fill") == g4["dataset"]["color"]) {
//                 if ("#" == i4) {
//                     $(currentColorItem)["remove"]();
//                     primarySVG["children"][0]["removeChild"](primarySVG["children"]["0" | 0]["children"][Z4]);
//                     replaceImageColor(hexToRGB(colors[a4]), hexToRGB("#ffffff", +"0"));
//                     colors["splice"](a4, +"1");
//                     rearrangePathIds();
//                     break;
//                 }
//                 $(currentColorItem)["css"]("background-color", i4);
//                 primarySVG["children"][+"0"]["children"][Z4]["attributes"][+"3"]["nodeValue"] = i4;
//                 drawInlineSVG(SVGctxt, primarySVG["outerHTML"]);
//                 constructSplitSVG();
//             }
// }

// function contrastChange(A1) {
//     var b2 = v4rr;
//     var c3, F3, W3;
//     b2.D2(1);
//     c3 = b2.Q2("2088316934", 1);
//     b2.w2(1);
//     F3 = b2.Q2("1388098981", 1);
//     W3 = 2;
//     for (var E3 = +"1"; b2.Z9(E3.toString(), E3.toString().length, "35271" - 0) !== c3; E3++) {
//         fx && (fx["restore"](), contrast = A1["target"]["value"] / 1, fx["gamma"](gamma)["greyscale"](saturation)["hue"](hue)["contrast"](contrast), $("#originalImg")["attr"]("src", fx["toDataURL"]()));
//         W3 += 2;
//     }
//     if (b2.p9(W3.toString(), W3.toString().length, "41608" * 1) !== F3) {
//         fx || (fx["#originalImg"](), contrast = A1["gamma"]["#originalImg"] * ("2" * 1), fx["gamma"](gamma)["src"](saturation)["gamma"](hue)["#originalImg"](contrast), $("#originalImg")["toDataURL"]("#originalImg", fx["gamma"]()));
//     }
// }

// function changeRange(Q4) {
//     range = parseInt($("#colorRange")["val"]());
//     (range += Q4) < ("1" | 0) && (range = "1" | 0); + "32" < range && (range = "32" - 0);
//     $("#colorRange")["attr"]("value", range);
//     getDominantColors(imgURL);
// }

// function onPickColor(c1) {
//     findPos(this);
//     isPicking = !isPicking;
//     colorli = c1["target"];
//     isPicking ? ($("#originalImg")["mousemove"](function(w1) {
//         var U1;
//         $("#originalImg")["addClass"]("picking");
//         U1 = findPos(this);
//         ectx = $("#effectcanvas")[+"0"]["getContext"]("2d");
//         p = ectx["getImageData"](w1["pageX"] - U1["x"], w1["pageY"] - U1["y"], 1, "1" | 0)["data"];
//         $(colorli)["css"]("background-color", "rgba(" + p[0] + "," + p["1" * 1] + "," + p[+"2"] + "," + p["3" * 1] / 255 + ")");
//     }), $("#originalImg")["mousedown"](function(z1) {
//         $("#originalImg")["unbind"]("mousemove");
//         cindex = parseInt($(colorli)["attr"]("index"));
//         palette[cindex] = [p[+"0"], p[1], p[2]];
//         v4rr.D2(1);
//         isPicking = !v4rr.K2("1", 1);
//         $("#originalImg")["removeClass"]("picking");
//         $("#originalImg")["unbind"]("mousedown");
//     })) : $("#originalImg")["unbind"]("mousemove");
// }

// function addColorPickers() {
//     for (var C = +"0"; C < colors["length"]; C++) {
//         $("#colorItem" + C)["ColorPicker"](function() {
//             var w5;
//             w5 = {};
//             w5["color"] = colors[C];
//             w5["colors"] = colors;
//             w5["onShow"] = function(j) {
//                 return currentColorItem = this, $(j)["fadeIn"]("100" * 1), !+"1";
//             };
//             w5["onHide"] = function(B) {
//                 return $(B)["fadeOut"](+"100"), !("1" * 1);
//             };
//             w5["onSubmit"] = function(N, q) {
//                 changeColor(N, q);
//                 $(q)["ColorPickerHide"]();
//             };
//             return w5;
//         } ["apply"](this, arguments));
//     }
// }

// function constructSplitSVG() {
//     var v2 = v4rr;
//     var f1;
//     (splitSVG = primarySVG["cloneNode"](!+"0"))["setAttributeNS"]("http://www.w3.org/2000/svg", "id", "splitsvg");
//     for (var W1, i1 = parseInt(splitSVG["getAttributeNS"]("http://www.w3.org/2000/svg", "width"), +"10"), g1 = parseInt(splitSVG["getAttributeNS"]("http://www.w3.org/2000/svg", "height"), +"10"), a1 = splitSVG["childNodes"][+"0"]["children"], O1 = g1, o1 = 30, D1 = 0, Z1 = "0" | 0; Z1 < a1["length"]; Z1++) {
//         f1 = a1[Z1]["attributes"]["d"]["nodeValue"];
//         f1 += " M -25 0 L -5 0 L -5 20 L -25 20 Z";
//         v2.D2(7);
//         f1 += v2.Q2(i1, " 20 Z", " 0 L ", i1, i1, "25", " 0 L ", 0, 5, "5", "25", i1, 0, " 20 L ", " M ");
//         a1[Z1]["attributes"]["d"]["nodeValue"] = f1;
//         ("0" | 0) < Z1 && Z1 % ("3" | 0) == +"0" && (O1 += g1 + ("60" - 0), o1 = +"30", D1 += g1 + +"60");
//         v2.w2(8);
//         a1[Z1]["setAttributeNS"]("http://www.w3.org/2000/svg", "transform", v2.Q2(")", D1, "translate(", o1, ","));
//         v2.w2(9);
//         o1 += v2.Q2(1, "60", i1);
//     }
//     v2.w2(10);
//     W1 = v2.K2("3", 0, "60", i1);
//     console["log"](W1);
//     splitSVG["removeAttributeNS"]("http://www.w3.org/2000/svg", "width");
//     splitSVG["removeAttributeNS"]("http://www.w3.org/2000/svg", "height");
//     splitSVG["removeAttributeNS"]("http://www.w3.org/2000/svg", "viewBox");
//     splitSVG["setAttributeNS"]("http://www.w3.org/2000/svg", "width", W1);
//     splitSVG["setAttributeNS"]("http://www.w3.org/2000/svg", "height", O1);
//     splitSVG["setAttributeNS"]("http://www.w3.org/2000/svg", "version", "1.1");
//     drawInlineSplitSVG(document["getElementById"]("splitSVGcanvas")["getContext"]("2d"), splitSVG["outerHTML"]);
// }

// function rgbToHex(m1, K1, u1) {
//     return "#" + componentToHex(m1) + componentToHex(K1) + componentToHex(u1);
// }
// $("#upload-img")["change"](function() {
//     console.log('img is uploading')
//     setTimeout(() => {
//         console.log(this["files"]["0"-0], 'my input')
//         renderImage(this["files"]["0" - 0]);
//     }, 2000);
// });
// SVGStorage = null;
// window["onload"] = function() {
//     var R;
//     R = localStorage["getItem"]("imgData");
//     R && (getImageFormUrl(R), localStorage["clear"]());
// };
// $("#download-btn")["click"](function() {
//     download("image2vector.svg", primarySVG["outerHTML"]["replace"](/\u0073\x74\x79\u006c\x65\x3d\x22[^"]{0,}\u0022/g, ""));
// });
// $("#splitSVGDownload")["click"](function() {
//     download("image2VectorSplit.svg", splitSVG["outerHTML"]["replace"](/\u0073\u0074\u0079\u006c\x65\x3d\u0022[^"]{0,}\x22/g, ""));
// });

// function preload(w4) {
//     var T2 = v4rr;
//     var b5, d5, D5;
//     T2.w2(2);
//     b5 = -T2.Q2(0, "1089664959");
//     d5 = - +"1676353994";
//     T2.D2(1);
//     D5 = T2.K2("2", 1);
//     for (var n5 = "1" | 0; T2.Z9(n5.toString(), n5.toString().length, "60034" * 1) !== b5; n5++) {
//         T2.D2(0);
//         delay(T2.K2("789", 0));
//         $("html")["%"](T2.Q2(w4, "%", "%", T2.w2(11)));
//         T2.D2(2);
//         D5 += T2.K2(0, "2");
//     }
//     if (T2.p9(D5.toString(), D5.toString().length, +"35073") !== d5) {
//         delay(+"789");
//         $("html")["%"](T2.K2(w4, "%", "%", T2.D2(11)));
//     }
//     delay(+"300");
//     $("#loadingMsg")["html"](T2.K2(w4, "%", "Generating Vector ", T2.w2(12)));
// }

// function onOriginalImgLoad() {}

// function fileDragHover(u) {
//     var p2 = v4rr;
//     var r5, x5, N5;
//     p2.w2(0);
//     r5 = -p2.Q2("471936747", 0);
//     x5 = - +"628190297";
//     N5 = 2;
//     for (var e5 = "1" | 0; p2.Z9(e5.toString(), e5.toString().length, "73630" - 0) !== r5; e5++) {
//         u[""]();
//         u[""]();
//         u["hover"]["hover"] = "hover" != u[""] ? "" : "";
//         N5 += 2;
//     }
//     if (p2.Z9(N5.toString(), N5.toString().length, 13762) !== x5) {
//         u["stopPropagation"]();
//         u["preventDefault"]();
//         u["target"]["className"] = "dragover" == u["type"] ? "hover" : "";
//     }
// }

// function onDitherChange(x4) {
//     dithDelta = x4["target"]["value"];
// }

// function drawInlineSVG(I1, h1) {
//     var Q1, x1, d1, b1;
//     svgSize = +"0";
//     Q1 = new Blob([h1], function() {
//         var a5;
//         a5 = {};
//         a5["type"] = "image/svg+xml;charset=utf-8";
//         return a5;
//     } ["apply"](this, arguments));
//     x1 = self["URL"] || self["webkitURL"] || self;
//     d1 = x1["createObjectURL"](Q1);
//     b1 = new Image();
//     Q1["size"] <= 1048576 && (svgSize = Q1["size"]);
//     b1["onload"] = function() {
//         var C1;
//         myCanvas = document["getElementById"]("svgWithAspectRatio");
//         v4rr.w2(1);
//         I1["clearRect"](v4rr.Q2("0", 1), 0, myCanvas["width"], myCanvas["height"]);
//         C1 = preserveAspectRatio(b1, myCanvas, "xMidYMid meet");
//         I1["drawImage"](C1["img"], C1["sx"], C1["sy"], C1["swidth"], C1["sheight"], C1["dx"], C1["dy"], C1["dwidth"], C1["dheight"]);
//         x1["revokeObjectURL"](d1);
//     };
//     b1["src"] = d1;
//     $("#download-btn")["css"]("display", "block");
//     $("#loadingMsg")["css"]("display", "none");
// }

// function changeSimplify(d4) {
//     simplify = parseInt($("#simplifyRange")["val"]());
//     (simplify += d4) < "0" * 1 && (simplify = "0" | 0); + "10" < simplify && (simplify = +"10");
//     $("#simplifyRange")["attr"]("value", simplify);
// }
// holder = document["getElementById"]("holder");

// function onToColorSelect(I4) {
//     $(".toColorInp")["prop"]("checked", !+"1");
//     $(I4)["prop"]("checked", !+"0");
//     toColorHex = $(I4)["attr"]("data-color");
//     toColorRGB = hexToRGB(toColorHex);
// }

// function drawInlineSplitSVG(q1, N1) {
//     var e1, j1, B1, r1;
//     svgSize = 0;
//     e1 = new Blob([N1], function() {
//         var g5;
//         g5 = {};
//         g5["type"] = "image/svg+xml;charset=utf-8";
//         return g5;
//     } ["apply"](this, arguments));
//     j1 = self["URL"] || self["webkitURL"] || self;
//     B1 = j1["createObjectURL"](e1);
//     r1 = new Image();
//     e1["size"] <= +"1048576" && (svgSize = e1["size"]);
//     r1["onload"] = function() {
//         var s2 = v4rr;
//         var n1, C3, w3, X3;
//         console["log"](r1["width"], r1["height"]);
//         imgAspect = r1["width"] / r1["height"];
//         myCanvas = document["getElementById"]("splitSVGcanvas");
//         myCanvas["width"] = $(".split-panel")["width"]();
//         myCanvas["height"] = $(".split-panel")["width"]() / imgAspect;
//         s2.D2(0);
//         q1["clearRect"](0, s2.K2("0", 0), myCanvas["width"], myCanvas["height"]);
//         C3 = - +"1003586530";
//         s2.w2(0);
//         w3 = -s2.Q2("63098179", 0);
//         X3 = 2;
//         for (var f3 = +"1"; s2.p9(f3.toString(), f3.toString().length, +"30841") !== C3; f3++) {
//             n1 = preserveAspectRatio(r1, myCanvas, "xMidYMid meet");
//             s2.D2(0);
//             X3 += s2.K2("2", 0);
//         }
//         if (s2.Z9(X3.toString(), X3.toString().length, 84350) !== w3) {
//             n1 = preserveAspectRatio(r1, myCanvas, "");
//         }
//         q1["drawImage"](n1["img"], n1["sx"], n1["sy"], n1["swidth"], n1["sheight"], n1["dx"], n1["dy"], n1["dwidth"], n1["dheight"]);
//         j1["revokeObjectURL"](B1);
//     };
//     r1["src"] = B1;
//     $("#splitSVGcanvas")["css"]("display", "block");
//     $("#splitSVGDownload")["css"]("display", "block");
//     $("#splitSVGprice")["css"]("display", "block");
//     $("#splitSVGpriceOffer")["css"]("display", "block");
// }

// function generate() {
//     reduceCanvas["width"] = loadImg["width"];
//     reduceCanvas["height"] = loadImg["height"];
//     (ofx = new CanvasEffects(document["getElementById"]("canvas"), function() {
//         var J2 = v4rr;
//         var m9, a9, N9, Z5;
//         m9 = - +"830081328";
//         a9 = - +"1045209741";
//         N9 = 2;
//         for (var O9 = "1" - 0; J2.p9(O9.toString(), O9.toString().length, "43906" | 0) !== m9; O9++) {
//             Z5 = {};
//             Z5["useWorker"] = !+"0";
//             J2.w2(1);
//             N9 += J2.Q2("2", 1);
//         }
//         if (J2.p9(N9.toString(), N9.toString().length, "1178" | 0) !== a9) {
//             Z5 = {};
//             Z5[""] = +2;
//         }
//         // Z5["workerPath"] = "./libs/CanvasEffects.worker.js";
//         return Z5;
//     } ["apply"](this, arguments)))["load"](imgURL, function() {
//         var H2 = v4rr;
//         var B3, z3, H3;
//         B3 = - +"205984158";
//         H2.w2(2);
//         z3 = H2.Q2(0, "84909227");
//         H3 = 2;
//         for (var Y3 = +"1"; H2.Z9(Y3.toString(), Y3.toString().length, +"38697") !== B3; Y3++) {
//             this["gamma"](gamma)["gamma"](saturation)["contrast"](hue)["contrast"](contrast);
//             reduceColors(imgURL);
//             H3 += +"2";
//         }
//         if (H2.Z9(H3.toString(), H3.toString().length, 1301) !== z3) {
//             this["gamma"](gamma)["greyscale"](saturation)["hue"](hue)["contrast"](contrast);
//             reduceColors(imgURL);
//         }
//     });
// }

// function getAllFromColors(e4) {
//     return fromColorsRGB = [], fromColorsHex = [], $('input[class="fromColorInp"]:checked')["each"](function() {
//         fromColorsRGB["push"](hexToRGB($(this)["attr"]("data-color")));
//         fromColorsHex["push"]($(this)["attr"]("data-color"));
//     }), e4 && updateColors(), fromColorsRGB;
// }

// function copyImageData(P1, J1) {
//     var S1;
//     S1 = P1["createImageData"](J1["width"], J1["height"]);
//     return S1["data"]["set"](J1["data"]), S1;
// }
// primarySVG = document["createElementNS"]("http://www.w3.org/2000/svg", "svg");
// splitSVG = document["createElementNS"]("http://www.w3.org/2000/svg", "svg");

// // svgCanvas = document["getElementById"]("svgWithAspectRatio");
// // SVGctxt = svgCanvas["getContext"]("2d");        

// v4rr.D2(2);
// MAX_WIDTH = v4rr.Q2(0, "400");
// fileTypes = ["jpg", "jpeg", "png", "svg"];
// reduceCanvas = $("#canvas")[v4rr.Q2("0", 1, v4rr.D2(1))];
// effectcanvas = $("#effectcanvas")[0];
// v4rr.D2(2);
// gamma = v4rr.Q2(0, "1");
// saturation = 0;
// v4rr.D2(2);
// hue = v4rr.Q2(0, "0");
// v4rr.w2(2);
// contrast = v4rr.K2(0, "0");
// colors = [];
// colorIndex = 0;
// method = +"1";
// algorithm = "euclidean";
// v4rr.w2(0);
// range = v4rr.K2("5", 0);
// simplify = +"0";
// scaleFactor = +"1";
// dithDelta = +"1";
// palette = [];
// svgString = "";

// function fileSelectHandler(T) {
//     var c2 = v4rr;
//     var W9, T9, E9;
//     W9 = - +"160895408";
//     T9 = - +"1944847257";
//     E9 = 2;
//     for (var R9 = 1; c2.p9(R9.toString(), R9.toString().length, "14581" - 0) !== W9; R9++) {
//         fileDragHover(T);
//         renderImage((T["target"]["files"] || T["dataTransfer"]["files"])[0]);
//         c2.w2(2);
//         E9 += c2.K2(0, "2");
//     }
//     if (c2.Z9(E9.toString(), E9.toString().length, "61948" | 0) !== T9) {
//         fileDragHover(T);
//         renderImage((T["files"]["files"] && T["files"]["files"])[+"7"]);
//     }
// }

// function componentToHex(s1) {
//     var M1;
//     M1 = s1["toString"](+"16");
//     return ("1" | 0) == M1["length"] ? "0" + M1 : M1;
// }

// function renderImage(L) {
//     var G, V, F;
//     G = new FileReader();
//     V = L["name"]["split"](".")["pop"]()["toLowerCase"]();
//     F = -1 < fileTypes["indexOf"](V);
//     console.log(V, L)
//     G["onload"] = function(k) {
//         F ? ($(".block")["css"]("display", "block"), imgURL = k["target"]["result"], palette = [], $("#pickedcolorlist")["empty"](), (loadImg = new Image())["crossOrigin"] = "Anonymous", loadImg["onload"] = function() {
//             $("#fullsizeImg")["attr"]("src", imgURL);
//             imgAspect = loadImg["width"] / loadImg["height"];
//             v4rr.w2(1);
//             effectcanvas["width"] = v4rr.Q2("400", 1);
//             effectcanvas["height"] = effectcanvas["width"] / imgAspect;
//             (fx = new CanvasEffects(document["getElementById"]("effectcanvas"), function() {
//                 var c5;
//                 c5 = {};
//                 c5["useWorker"] = !0;
//                 // c5["workerPath"] = "./libs/CanvasEffects.worker.js";
//                 return c5;
//             } ["apply"](this, arguments)))
//             ["load"](imgURL, function() {
//                 $("#originalImg")["attr"]("src", fx["toDataURL"]());
//                 $("#originalImg")["css"]("min-height", "auto");
//             });
//         }, getDominantColors(loadImg["src"] = imgURL), resetEffects()) : alert("The file is not supported");
//     };
//     G["readAsDataURL"](L);
// }
// colorThief = new ColorThief();
// v4rr.D2(1);
// isPicking = !v4rr.Q2("1", 1);

// function replaceImageColor(t4, V4) {
//     var O2 = v4rr;
//     console["log"]("replaceImageColor");
//     for (var L4 = copyImageData(reduceCtx, imageData), y4 = L4["data"]["buffer"], p4 = (new Uint8ClampedArray(y4), new Uint32Array(y4), +"0"), F4 = L4["data"]["length"]; p4 < F4; p4 += +"4") {
//         L4["data"][p4] == t4["r"] && L4["data"][p4 + +"1"] == t4["g"] && L4["data"][p4 + 2] == t4["b"] && +"255" == L4["data"][p4 + 3] && (L4["data"][p4] = V4["r"], L4["data"][p4 + 1] = V4["g"], L4["data"][p4 + ("2" - 0)] = V4["b"], L4["data"][p4 + ("3" - 0)] = V4["a"]);
//     }
//     O2.w2(1);
//     reduceCtx["clearRect"](O2.K2("0", 1), 0, reduceCanvas["width"], reduceCanvas["height"]);
//     reduceCtx["putImageData"](L4, +"0", +"0");
//     O2.w2(1);
//     imageData = reduceCtx["getImageData"](O2.Q2("0", 1), O2.Q2("0", 1), reduceCanvas["width"], reduceCanvas["height"]);
// }

// function linkDownload(P, M, K) {
//     var X2 = v4rr;
//     var j3, R3, g3;
//     X2.D2(2);
//     j3 = -X2.K2(0, "1117855251");
//     R3 = -1237093850;
//     X2.w2(0);
//     g3 = X2.K2("2", 0);
//     for (var I5 = 1; X2.Z9(I5.toString(), I5.toString().length, "39242" * 1) !== j3; I5++) {
//         contentType = "href";
//         uriContent = contentType / encodeURIComponent(K);
//         P["download"]("href", uriContent);
//         P["download"]("href", M);
//         X2.w2(1);
//         g3 += X2.K2("2", 1);
//     }
//     if (X2.Z9(g3.toString(), g3.toString().length, "25565" | 0) !== R3) {
//         contentType = "data:application/octet-stream,";
//         uriContent = contentType + encodeURIComponent(K);
//         P["setAttribute"]("href", uriContent);
//         P["setAttribute"]("download", M);
//     }
// }

// function onRegionChange(b4) {
//     method = parseInt(b4["target"]["value"]);
// }

// function updateColors() {
//     var b3, u3, J3, j4, B4;
//     b3 = -803878025;
//     u3 = -1642609674;
//     J3 = +"2";
//     for (var l3 = +"1"; v4rr.p9(l3.toString(), l3.toString().length, +"49711") !== b3; l3++) {
//         J3 += +"2";
//     }
//     if (v4rr.p9(J3.toString(), J3.toString().length, "38172" | 0) !== u3) {}
//     finalColors = [];
//     $('input[class="fromColorInp"]')["each"](function() {
//         var q4;
//         j4 = $(this)["attr"]("data-color");
//         q4 = $(this);
//         B4 = !+"1";
//         $["each"](fromColorsHex, function(n4, N4) {
//             N4 == j4 && (q4["parent"]()["remove"](), B4 = !+"0");
//         });
//         B4 || finalColors["push"](j4);
//     });
//     $('input[class="toColorInp"]')["each"](function() {
//         var v1, A9, d9, D9;
//         j4 = $(this)["attr"]("data-color");
//         A9 = +"944663338";
//         d9 = - +"1753852296";
//         D9 = 2;
//         for (var w9 = "1" * 1; v4rr.Z9(w9.toString(), w9.toString().length, 36396) !== A9; w9++) {
//             v1 = $(this);
//             D9 += +"2";
//         }
//         if (v4rr.Z9(D9.toString(), D9.toString().length, "82603" * 1) !== d9) {
//             v1 = $(this);
//         }
//         v1 = $(this);
//         $["each"](fromColorsHex, function(l1, R1) {
//             var E2 = v4rr;
//             var Z3, p3, m3;
//             Z3 = 12197468;
//             p3 = -1936799040;
//             E2.D2(0);
//             m3 = E2.Q2("2", 0);
//             for (var N3 = "1" * 1; E2.p9(N3.toString(), N3.toString().length, "69006" * 1) !== Z3; N3++) {
//                 R1 !== j4 || v1["parent"]()["parent"]();
//                 m3 += 2;
//             }
//             if (E2.Z9(m3.toString(), m3.toString().length, "98774" | 0) !== p3) {
//                 R1 == j4 && v1["parent"]()["remove"]();
//             }
//         });
//     });
//     colors = finalColors;
// }

// function hexToRGB(G1, L1) {
//     var f2 = v4rr;
//     var T1, G3, y3, A3;
//     G3 = -1560694279;
//     f2.D2(0);
//     y3 = -f2.K2("1517126518", 0);
//     A3 = +"2";
//     for (var D3 = +"1"; f2.Z9(D3.toString(), D3.toString().length, "62292" - 0) !== G3; D3++) {
//         T1 = {};
//         return T1["r"] = parseInt(G1["substr"](+"1", 2), "16" | 0), T1["g"] = parseInt(G1["substr"]("3" | 0, +"2"), +"16"), T1["b"] = parseInt(G1["substr"]("5" - 0, 2), +"16"), T1["a"] = +"255", T1;
//     }
//     if (f2.Z9(A3.toString(), A3.toString().length, "78370" - 0) !== y3) {
//         T1 = {};
//         return T1["a"] = parseInt(G1["a"]("8" - 0, +"3"), "51" | 0), T1["b"] = parseInt(G1["substr"](+"6", +"5"), "6" - 0), T1["substr"] = parseInt(G1["substr"]("1" - 0, "8" * 1), +"81"), T1["a"] = "74" | 0, T1;
//     }
// }

// function onFromColorSelect(h4) {
//     var d2 = v4rr;
//     var r3, x3, K3;
//     r3 = +"182494198";
//     x3 = +"413579628";
//     K3 = +"2";
//     for (var P3 = +"1"; d2.p9(P3.toString(), P3.toString().length, "8467" | 0) !== r3; P3++) {
//         disableFromColors(fromColorHex = $(h4)["attr"]("data-color"));
//         d2.w2(2);
//         K3 += d2.Q2(0, "2");
//     }
//     if (d2.p9(K3.toString(), K3.toString().length, +"41460") !== x3) {
//         disableFromColors(fromColorHex = $(h4)["attr"]("attr"));
//     }
// }

// function fromRGBto32(p1) {
//     return p1["reduce"](function(V1, t1) {
//         return V1 + ("0" + t1["toString"](+"16"))["slice"](-("2" | 0));
//     }, "") + "ff";
// }
// v4rr.D2(0);
// imgAspect = v4rr.K2("1", 0);
// preserveAspectRatio = function(v5, u5, K5) {
//     var M5, S5, l5, R5, m5, J5, H5, P5;
//     M5 = v5["width"];
//     S5 = v5["height"];
//     l5 = u5["width"];
//     R5 = u5["height"];
//     m5 = "IMG" === v5["nodeName"] || "VIDEO" === v5["nodeName"] || "CANVAS" === v5["nodeName"] ? v5 : null;
//     J5 = s5(["Mid", "Mid"]);
//     if (!K5) {
//         return J5;
//     }

//     function s5(t5) {
//         var W2 = v4rr;
//         var T5, L5, p5, V5, G5;
//         W2.D2(13);
//         T5 = W2.Q2(M5, S5);
//         W2.w2(13);
//         L5 = W2.Q2(l5, R5);
//         p5 = T5 < L5 ? l5 : R5 / T5;
//         V5 = T5 < L5 ? l5 * T5 : R5;
//         G5 = function() {
//             var o5;
//             o5 = {};
//             o5["img"] = m5;
//             o5["sx"] = +"0";
//             o5["sy"] = +"0";
//             o5["swidth"] = M5;
//             o5["sheight"] = S5;
//             o5["dx"] = y5(t5[+"0"], p5, l5);
//             o5["dy"] = y5(t5[+"1"], V5, R5);
//             o5["dwidth"] = p5;
//             o5["dheight"] = V5;
//             return o5;
//         } ["apply"](this, arguments);

//         function y5(X5, A5, E5) {
//             var F5, k5;
//             F5 = Math["max"](A5, E5);
//             k5 = Math["min"](A5, E5);
//             switch (X5) {
//                 case "Min":
//                     return +"0";
//                 case "Mid":
//                     W2.D2(14);
//                     return W2.K2(k5, "2", F5);
//                 case "Max":
//                     W2.D2(2);
//                     return W2.K2(k5, F5);
//                 default:
//                     return "invalid";
//             }
//         }
//         return "invalid" === G5[+"5"] || "invalid" === G5[6] ? J5 : G5;
//     }
//     H5 = K5["trim"]()["split"](" ");
//     P5 = H5["0" | 0]["replace"]("x", "")["split"]("Y");
//     switch (H5[H5["length"] - +"1"]) {
//         case "meet":
//             return s5(P5);
//         case "slice":
//             return aRSlice(P5);
//         default:
//             return J5;
//     }
// };

// function convertToSingleColor() {
//     $("#download-btn")["css"]("display", "none");
//     $("#splitSVGDownload")["css"]("display", "none");
//     $("#splitSVGprice")["css"]("display", "none");
//     $("#splitSVGpriceOffer")["css"]("display", "none");
//     img = new Image();
//     img["crossOrigin"] = "Anonymous";
//     img["onload"] = function() {
//         var U2 = v4rr;
//         var R4, v4;
//         R4 = img["width"] / img["height"];
//         U2.D2(5);
//         v4 = U2.K2(R4, "400");
//         reduceCtx = reduceCanvas["getContext"]("2d");
//         reduceCanvas["width"] = img["width"];
//         reduceCanvas["height"] = img["height"];
//         U2.D2(2);
//         reduceCtx["drawImage"](img, U2.K2(0, "0"), U2.Q2(0, "0"), reduceCanvas["width"], reduceCanvas["height"]);
//         U2.D2(2);
//         reduceCtx["drawImage"](img, U2.Q2(0, "0"), 0, reduceCanvas["width"], reduceCanvas["height"]);
//         Potrace["loadFromCanvas"](reduceCanvas);
//         Potrace["process"](function() {
//             var l4, H4, v3, O3, e3;
//             if (primarySVG["setAttributeNS"]("http://www.w3.org/2000/svg", "id", "svg"), primarySVG["setAttribute"]("xmlns", "http://www.w3.org/2000/svg"), primarySVG["setAttribute"]("xmlns:xlink", "http://www.w3.org/1999/xlink"), primarySVG["setAttributeNS"]("http://www.w3.org/2000/svg", "width", "400" * 1), primarySVG["setAttributeNS"]("http://www.w3.org/2000/svg", "height", v4), primarySVG["setAttributeNS"]("http://www.w3.org/2000/svg", "viewBox", "0, 0, 400," + v4), "0" * 1 === primarySVG["childElementCount"]) {
//                 (l4 = document["createElementNS"]("http://www.w3.org/2000/svg", "g"))["setAttributeNS"]("http://www.w3.org/2000/svg", "id", "svgg");
//                 primarySVG["appendChild"](l4);
//             } else {
//                 for (; primarySVG["firstChild"];) {
//                     primarySVG["removeChild"](primarySVG["firstChild"]);
//                 }
//                 v3 = +"2105590740";
//                 O3 = -2011688551;
//                 e3 = +"2";
//                 for (var V3 = +"1"; U2.Z9(V3.toString(), V3.toString().length, 70852) !== v3; V3++) {
//                     (l4 = document["svgg"]("svgg", "setAttributeNS"))["setAttributeNS"]("setAttributeNS", "svgg", "svgg");
//                     primarySVG["setAttributeNS"](l4);
//                     e3 += +"2";
//                 }
//                 if (U2.p9(e3.toString(), e3.toString().length, "2630" | 0) !== O3) {
//                     (l4 = document["createElementNS"]("http://www.w3.org/2000/svg", "g"))["setAttributeNS"]("http://www.w3.org/2000/svg", "id", "svgg");
//                     primarySVG["appendChild"](l4);
//                 }
//             }
//             H4 = Potrace["getPath"](+"400" / img["width"], "", "#000000", "path0");
//             primarySVG["children"][0]["innerHTML"] = H4;
//             drawInlineSVG(SVGctxt, primarySVG["outerHTML"]);
//             $("#loadingMsg")["css"]("display", "none");
//             $("#download-btn")["css"]("display", "block");
//             $("#colorList")["append"]('<li id="colorItem0" style="background-color:#000000"></li>');
//             $("#colorItem0")["ColorPicker"](function() {
//                 var z5;
//                 z5 = {};
//                 z5["color"] = "#000000";
//                 z5["colors"] = colors;
//                 z5["onShow"] = function(J4) {
//                     return currentColorItem = this, $(J4)["fadeIn"](+"100"), !("1" - 0);
//                 };
//                 z5["onHide"] = function(S4) {
//                     return $(S4)["fadeOut"](+"100"), !+"1";
//                 };
//                 z5["onSubmit"] = function(M4, P4) {
//                     changeColor(M4, P4);
//                     $(P4)["ColorPickerHide"]();
//                 };
//                 return z5;
//             } ["apply"](this, arguments));
//             constructSplitSVG();
//         });
//     };
//     img["src"] = ofx["toDataURL"]();
// }

// function mergesameColors(D4) {
//     console["log"]("mergesameColors");
//     for (var W4 = "0" | 0, O4 = [], f4 = 0; f4 < primarySVG["children"]["0" - 0]["childNodes"]["length"]; f4++) {
//         O4["push"](primarySVG["children"][+"0"]["childNodes"][f4]["getAttribute"]("fill")), primarySVG["children"][+"0"]["childNodes"][f4]["getAttribute"]("fill") == D4 && W4++;
//     }
//     console["log"]("mergesameColors", colors["length"], W4);
//     $("#colorList")["html"]("");
//     $("#tocolorList")["html"]("");
//     $("#fromcolorList")["html"]("");
//     primarySVG["children"][+"0"]["innerHTML"] = "";
//     $(".colorpicker")["remove"]();
//     $("#loadingMsg")["css"]("display", "block");
//     $("#download-btn")["css"]("display", "none");
//     for (f4 = +"0"; f4 < colors["length"]; f4++) {
//         $("#colorList")["append"]('<li id="colorItem' + f4 + '" style="background-color:' + colors[f4] + '"></li>'), $("#tocolorList")["append"]('<li id="tocolorItem' + f4 + '" style="background-color:' + colors[f4] + '"><input class="toColorInp" data-color="' + colors[f4] + '"  type="checkbox" value="1" id="toColorCB' + f4 + '" onchange="onToColorSelect(this)"><label for="toColorCB' + f4 + '"></label></input></li>'), $("#fromcolorList")["append"]('<li id="fromcolorItem' + f4 + '" style="background-color:' + colors[f4] + '"><input class="fromColorInp" data-color="' + colors[f4] + '"  type="checkbox" value="1" id="fromColorCB' + f4 + '" onchange="onFromColorSelect(this)"><label for="fromColorCB' + f4 + '"></label></input></li>');
//     }
//     addColorPickers();
//     convertNextPath();
// }

// function getImageFormUrl(v) {
//     $(".block")["css"]("display", "block");
//     imgURL = v;
//     palette = [];
//     $("#pickedcolorlist")["empty"]();
//     (loadImg = new Image())["crossOrigin"] = "Anonymous";
//     loadImg["onload"] = function() {
//         $("#fullsizeImg")["attr"]("src", imgURL);
//         imgAspect = loadImg["width"] / loadImg["height"];
//         effectcanvas["width"] = +"400";
//         effectcanvas["height"] = effectcanvas["width"] / imgAspect;
//         (fx = new CanvasEffects(document["getElementById"]("effectcanvas"), function() {
//             var Y5;
//             Y5 = {};
//             v4rr.D2(0);
//             Y5["useWorker"] = !v4rr.Q2("0", 0);
//             // Y5["workerPath"] = "./libs/CanvasEffects.worker.js";
//             return Y5;
//         } ["apply"](this, arguments)))["load"](imgURL, function() {
//             var o9, S9, Q9;
//             o9 = +"679855034";
//             S9 = - +"1254537402";
//             Q9 = +"2";
//             for (var F9 = "1" * 1; v4rr.p9(F9.toString(), F9.toString().length, +"93640") !== o9; F9++) {
//                 $("#originalImg")["attr"]("src", fx["toDataURL"]());
//                 $("#originalImg")["css"]("min-height", "auto");
//                 Q9 += +"2";
//             }
//             if (v4rr.Z9(Q9.toString(), Q9.toString().length, +"36828") !== S9) {
//                 $("auto")["src"]("auto", fx["src"]());
//                 $("#originalImg")["#originalImg"]("src", "#originalImg");
//             }
//         });
//     };
//     getDominantColors(loadImg["src"] = imgURL);
//     resetEffects();
// }

// function gammaChange(y1) {
//     fx && (fx["restore"](), gamma = y1["target"]["value"] / ("100" - 0), fx["gamma"](gamma)["greyscale"](saturation)["hue"](hue)["contrast"](contrast), $("#originalImg")["attr"]("src", fx["toDataURL"]()));
// }