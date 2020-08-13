<template>
<div class="border">
    <div v-if="palette.original.length > 0">
        <p>Original Colors</p>
        <button style="width:20px;height:20px;border:transparent;margin:2px" :style="`background-color:rgb(${item.R}, ${item.G}, ${item.B})`" v-for="(item, i) in palette.original" :key="i"></button>
    </div>

  
    <p>Upload image</p>
    <img id="originalImg" @load="$onOriginalImgLoad()">
    <input type="file" name="" id="upload-img" @change="$upload_img($event)">
    <button class="btn-primary inline-block align-top" @click="$generate();">Generate</button>

    <div id="loadingMsg">Generating Vector 50%</div>
    <p>canvas</p>
    <canvas id="canvas"></canvas>
    <p>effectcanvas</p>
    <canvas id="effectcanvas"></canvas>
    <p>png canvas</p>
    <canvas id="pngcanvas"></canvas>
    <button id="download-btn" type="button" class="btn btn-primary" style="display: block;">DownloadSVG</button>


    <div id="ConvertedSVGContainer">
        <p>svgWithAspectRatio</p>
        <canvas id="svgWithAspectRatio" width="400" height="400" class="border"></canvas>
    </div>

    <div id="svgContainer" style="display:block;border:1px solid red"></div>
    
    <p>color list</p>
    <ul id="colorList" class="colors"></ul>    
    <div class="colors-panel">
        <div class="merge-colors">From Colors
            <ul id="fromcolorList" class="colors"></ul>
        </div>
        <div class="merge-colors">To Colors
            <ul id="tocolorList" class="colors"></ul>
        </div>
    </div>

<div class="split-panel">
<span>For Cricut and Silhouette Cutting Machines (With
registration marks)</span>
<div id="splitSVGContCanvas" class="row">
<canvas id="splitSVGcanvas" width="1070" height="400"
style="display:none;"></canvas>
<button id="splitSVGDownload" type="button"
class="btn btn-primary">Download
Cut SVG</button>
</div>
</div>



</div>
</template>

<script>
var $holder, 
$reduceCtx, 
$fx, 
$ofx, 
$imageData, 
$imgURL,
$currentColorItem,
$loadImg,
$primarySVG,
$splitSVG,
$svgCanvas,
$SVGctxt,
$MAX_WIDTH,
$fileTypes,
$reduceCanvas,
$effectcanvas,
$gamma,
$saturation,
$hue,
$contrast,
$colors,
$colorIndex,
$method,
$algorithm,
$range,
$simplify,
$scaleFactor,
$dithDelta,
$palette,
$svgString,
$lastHistogram,
$lastUrl,
$toColorRGB,
$toColorHex,
$fromColorHex,
$fromColorsRGB,
$fromColorsHex,
$finalColors,
$colorThief,
$ectx,
$p,
$lastrgb,
$colorli,
$cindex,
$isPicking,
$imgAspect,
$svgSize,
$myCanvas,
$preserveAspectRatio = null
export default {
    props: {
        img: { required: true }
    },
    data() {
        return {
            palette: { original: []}   
        }
    },
        methods: {
        $init() {
            $reduceCanvas = $("#canvas")[v4rr.Q2("0", 1, v4rr.D2(1))];
            $effectcanvas = $("#effectcanvas")[0];
            $colorThief = new ColorThief();
            v4rr.D2(0);
            $imgAspect = v4rr.K2("1", 0);
            
            $primarySVG = document["createElementNS"]("http://www.w3.org/2000/svg", "svg");
            $splitSVG = document["createElementNS"]("http://www.w3.org/2000/svg", "svg");
            $svgCanvas = document["getElementById"]("svgWithAspectRatio");
            $SVGctxt = $svgCanvas["getContext"]("2d");
            v4rr.D2(2);
            $MAX_WIDTH = v4rr.Q2(0, "400");
            $fileTypes = ["jpg", "jpeg", "png", "svg"];
            $reduceCanvas = $("#canvas")[v4rr.Q2("0", 1, v4rr.D2(1))];
            $effectcanvas = $("#effectcanvas")[0];
            v4rr.D2(2);
            $gamma = v4rr.Q2(0, "1");
            $saturation = 0;
            v4rr.D2(2);
            $hue = v4rr.Q2(0, "0");
            v4rr.w2(2);
            $contrast = v4rr.K2(0, "0");
            $colors = [];
            $colorIndex = 0;
            $method = +"1";
            $algorithm = "euclidean";
            v4rr.w2(0);
            $range = v4rr.K2("5", 0);
            $simplify = +"0";
            $scaleFactor = +"1";
            $dithDelta = +"1";
            $palette = [];
            $svgString = "";

            $preserveAspectRatio = function(v5, u5, K5) {
                var M5, S5, l5, R5, m5, J5, H5, P5;
                M5 = v5["width"];
                S5 = v5["height"];
                l5 = u5["width"];
                R5 = u5["height"];
                m5 = "IMG" === v5["nodeName"] || "VIDEO" === v5["nodeName"] || "CANVAS" === v5["nodeName"] ? v5 : null;
                J5 = s5(["Mid", "Mid"]);
                if (!K5) {
                    return J5;
                }

                function s5(t5) {
                    var W2 = v4rr;
                    var T5, L5, p5, V5, G5;
                    W2.D2(13);
                    T5 = W2.Q2(M5, S5);
                    W2.w2(13);
                    L5 = W2.Q2(l5, R5);
                    p5 = T5 < L5 ? l5 : R5 / T5;
                    V5 = T5 < L5 ? l5 * T5 : R5;
                    G5 = function() {
                        var o5;
                        o5 = {};
                        o5["img"] = m5;
                        o5["sx"] = +"0";
                        o5["sy"] = +"0";
                        o5["swidth"] = M5;
                        o5["sheight"] = S5;
                        o5["dx"] = y5(t5[+"0"], p5, l5);
                        o5["dy"] = y5(t5[+"1"], V5, R5);
                        o5["dwidth"] = p5;
                        o5["dheight"] = V5;
                        return o5;
                    } ["apply"](this, arguments);

                    function y5(X5, A5, E5) {
                        var F5, k5;
                        F5 = Math["max"](A5, E5);
                        k5 = Math["min"](A5, E5);
                        switch (X5) {
                            case "Min":
                                return +"0";
                            case "Mid":
                                W2.D2(14);
                                return W2.K2(k5, "2", F5);
                            case "Max":
                                W2.D2(2);
                                return W2.K2(k5, F5);
                            default:
                                return "invalid";
                        }
                    }
                    return "invalid" === G5[+"5"] || "invalid" === G5[6] ? J5 : G5;
                }
                H5 = K5["trim"]()["split"](" ");
                P5 = H5["0" | 0]["replace"]("x", "")["split"]("Y");
                switch (H5[H5["length"] - +"1"]) {
                    case "meet":
                        return s5(P5);
                    case "slice":
                        return aRSlice(P5);
                    default:
                        return J5;
                }
            };            
            this.$upload_img()
        },
        $upload_img(e) {
            setTimeout(() => {
                console.log('Step 1 Done.')
                this.$renderImage2(this.img)
            }, 2000);
        },
        $onOriginalImgLoad() {

        },
        $renderImage2(img) {
            let $this = this
            $palette = []
            $imgURL = img.dataURL
            $loadImg = new Image()
            $loadImg.src = img.dataURL
            $loadImg.onload = function() {
                $imgAspect = $loadImg.width / $loadImg.height
                v4rr.w2(1);
                $effectcanvas["width"] = v4rr.Q2("400", 1);
                $effectcanvas["height"] = $effectcanvas["width"] / $imgAspect;
                // ($fx = new CanvasEffects(document["getElementById"]("effectcanvas"), function() {
                //     var c5;
                //     c5 = {};
                //     c5["useWorker"] = !0;
                //     return c5;
                // } ["apply"](this, arguments)))["load"]($imgURL, function() {
                //     $("#originalImg")["attr"]("src", $fx["toDataURL"]());
                //     $("#originalImg")["css"]("min-height", "auto");
                // });
            }
            $this.getDominantColors($loadImg["src"] = $imgURL)

        },
        // DONE
        $generate() {
            let $this = this
            $reduceCanvas["width"] = $loadImg["width"];
            $reduceCanvas["height"] = $loadImg["height"];
            ($ofx = new CanvasEffects(document["getElementById"]("canvas"), function() {
                var J2 = v4rr;
                var m9, a9, N9, Z5;
                m9 = - +"830081328";
                a9 = - +"1045209741";
                N9 = 2;
                for (var O9 = "1" - 0; J2.p9(O9.toString(), O9.toString().length, "43906" | 0) !== m9; O9++) {
                    Z5 = {};
                    Z5["useWorker"] = !+"0";
                    J2.w2(1);
                    N9 += J2.Q2("2", 1);
                }
                if (J2.p9(N9.toString(), N9.toString().length, "1178" | 0) !== a9) {
                    Z5 = {};
                    Z5[""] = +2;
                }
                return Z5;
            } ["apply"](this, arguments)))["load"]($imgURL, function() {
                var H2 = v4rr;
                var B3, z3, H3;
                B3 = - +"205984158";
                H2.w2(2);
                z3 = H2.Q2(0, "84909227");
                H3 = 2;
                for (var Y3 = +"1"; H2.Z9(Y3.toString(), Y3.toString().length, +"38697") !== B3; Y3++) {
                    this["gamma"]($gamma)["gamma"]($saturation)["contrast"]($hue)["contrast"]($contrast);
                    $this.reduceColors($imgURL);
                    H3 += +"2";
                }
                if (H2.Z9(H3.toString(), H3.toString().length, 1301) !== z3) {
                    this["gamma"]($gamma)["greyscale"]($saturation)["hue"]($hue)["contrast"]($contrast);
                    $this.reduceColors($imgURL);
                }
            });
        },
        reduceColors(f) {
            let $this = this
            var Y, U, w, z, Z;
            Z = function() {
                var Y2 = v4rr;
                var U5, J9, i9, l9;
                U5 = {};
                U5["method"] = $method;
                U5["colors"] = $palette["length"];
                U5["ditherKern"] = "1" - 0 == $dithDelta ? null : "FloydSteinberg";
                U5["dithDelta"] = $dithDelta;
                U5["palette"] = $palette;
                Y2.w2(0);
                J9 = Y2.K2("2117504073", 0);
                i9 = 882002657;
                l9 = +"2";
                for (var y9 = 1; Y2.p9(y9.toString(), y9.toString().length, "94893" * 1) !== J9; y9++) {
                    U5["dithSerp"] = !+"1";
                    U5["reIndex"] = !0;
                    Y2.D2(1);
                    U5["useCache"] = !Y2.Q2("0", 1);
                    U5["colorDist"] = $algorithm;
                    U5["blur"] = $simplify;
                    l9 += 2;
                }
                if (Y2.p9(l9.toString(), l9.toString().length, "75998" | 0) !== i9) {
                    U5["blur"] = ~+"9";
                    U5["blur"] = -6;
                    Y2.D2(1);
                    U5["blur"] = +Y2.Q2("8", 1);
                    U5["blur"] = $algorithm;
                    U5["blur"] = $simplify;
                }
                return U5;
            }["apply"](this, arguments);
            $("#svgContainer")["html"]("");
            "1" * 1 != $range ? (Y = new RgbQuant(Z), (U = new Image())["crossOrigin"] = "Anonymous", U["onload"] = function() {
                var k2 = v4rr;
                var W, g9, U3, M3;
                g9 = -303430609;
                k2.D2(0);
                U3 = k2.K2("273379555", 0);
                k2.D2(1);
                M3 = k2.Q2("2", 1);
                for (var L3 = 1; k2.Z9(L3.toString(), L3.toString().length, "16822" | 0) !== g9; L3++) {
                    W = U["width"] / U["height"];
                    M3 += +"2";
                }
                if (k2.p9(M3.toString(), M3.toString().length, +"46623") !== U3) {
                    W = U["height"] + U["height"];
                }
                $("#loadingMsg")["html"]("Reducing Image..");
                Y["sample"](U, null, $lastHistogram, void 0, function(h) {
                    var D, I, Q;
                    $lastHistogram = h;
                    $lastUrl = f;
                    k2.D2(2);
                    w = Y["palette"](!0, !k2.Q2(0, "1"), h);
                    z = Y["reduce"](U);
                    $reduceCtx = $reduceCanvas["getContext"]("2d");
                    $reduceCanvas["width"] = Y["width"];
                    $reduceCanvas["height"] = Y["height"];
                    ($imageData = $reduceCtx["getImageData"](+"0", +"0", Y["width"], Y["height"]))["data"]["set"](z);
                    k2.w2(1);
                    $reduceCtx["putImageData"]($imageData, +"0", k2.K2("0", 1));
                    $colors = [];
                    for (var O = +"0"; O < w["length"]; O++) {
                        D = $this.rgbToHex(w[O][0], w[O]["1" - 0], w[O]["2" | 0]);
                        $colors["push"](D);
                    }
                    k2.D2(0);
                    $this.preload(k2.Q2("10", 0));
                    k2.D2(5);
                    I = k2.K2(W, "400");
                    if ($scaleFactor = Math["min"](+"400" / Y["width"], "1" - 0), $primarySVG["setAttributeNS"]("http://www.w3.org/2000/svg", "data-id", "svg"), $primarySVG["setAttributeNS"]("http://www.w3.org/2000/svg", "version", "1.1"), $primarySVG["setAttribute"]("xmlns", "http://www.w3.org/2000/svg"), $primarySVG["setAttribute"]("xmlns:xlink", "http://www.w3.org/1999/xlink"), $primarySVG["setAttributeNS"]("http://www.w3.org/2000/svg", "width", "400" | 0), $primarySVG["setAttributeNS"]("http://www.w3.org/2000/svg", "height", I), $primarySVG["setAttributeNS"]("http://www.w3.org/2000/svg", "viewBox", "0, 0, 400," + I), "0" - 0 === $primarySVG["childElementCount"]) {
                        (Q = document["createElementNS"]("http://www.w3.org/2000/svg", "g"))["setAttributeNS"]("http://www.w3.org/2000/svg", "id", "svgg");
                        $primarySVG["appendChild"](Q);
                    } else {
                        for (; $primarySVG["firstChild"];) {
                            $primarySVG["removeChild"]($primarySVG["firstChild"]);
                        }(Q = document["createElementNS"]("http://www.w3.org/2000/svg", "g"))["setAttributeNS"]("http://www.w3.org/2000/svg", "id", "svgg");
                        $primarySVG["appendChild"](Q);
                    }
                    $this.convertNextPath();
                });
            }, U["src"] = $imgURL) : console.log('convert to single color, this function is missing....');
        },
        
        convertNextPath() {
            $colorIndex < $colors["length"] ? (this.generatePathForColor($colors[$colorIndex]), this.preload("10" - 0 + Math["round"](+"40" * $colorIndex / $colors["length"]))) : ($colorIndex = "0" * 1, this.drawInlineSVG($SVGctxt, $primarySVG["outerHTML"]), this.constructSplitSVG());
        },

        // DONE
        preload(w4) {
            var T2 = v4rr;
            var b5, d5, D5;
            T2.w2(2);
            b5 = -T2.Q2(0, "1089664959");
            d5 = - +"1676353994";
            T2.D2(1);
            D5 = T2.K2("2", 1);
            for (var n5 = "1" | 0; T2.Z9(n5.toString(), n5.toString().length, "60034" * 1) !== b5; n5++) {
                T2.D2(0);
                this.delay(T2.K2("789", 0));
                $("html")["%"](T2.Q2(w4, "%", "%", T2.w2(11)));
                T2.D2(2);
                D5 += T2.K2(0, "2");
            }
            if (T2.p9(D5.toString(), D5.toString().length, +"35073") !== d5) {
                this.delay(+"789");
                $("html")["%"](T2.K2(w4, "%", "%", T2.D2(11)));
            }
            this.delay(+"300");
            $("#loadingMsg").html(w4 + " %")
        },       
        // DONE
        delay(z4) {
            for (z4 += new Date()["getTime"](); new Date() < z4;);
        },    
        // DONE
        generatePathForColor(u4) {
            var x2 = v4rr, $this = this;
            for (var K4 = this.hexToRGB(u4), s4 = this.copyImageData($reduceCtx, $imageData), T4 = s4["data"]["length"], m4 = +"0"; m4 < T4; m4 += "4" * 1) {
                s4["data"][m4] == K4["r"] && s4["data"][m4 + ("1" | 0)] == K4["g"] && s4["data"][m4 + ("2" - 0)] == K4["b"] ? (s4["data"][m4] = +"0", s4["data"][m4 + ("1" - 0)] = +"0", s4["data"][m4 + +"2"] = +"0") : (s4["data"][m4] = "255" - 0, s4["data"][m4 + "1" * 1] = "255" | 0, s4["data"][m4 + 2] = +"255");
            }
            x2.D2(0);
            $reduceCtx["clearRect"](x2.K2("0", 0), +"0", $reduceCanvas["width"], $reduceCanvas["height"]);
            x2.w2(0);
            $reduceCtx["putImageData"](s4, x2.K2("0", 0), x2.Q2(0, "0", x2.D2(2)));
            Potrace["loadFromCanvas"]($reduceCanvas);
            Potrace["process"](function() {
                var G4;
                x2.w2(6);
                G4 = Potrace["getPath"]($scaleFactor, "", u4, x2.Q2($colorIndex, "path"));
                $primarySVG["firstChild"]["innerHTML"] += G4;
                x2.w2(0);
                $reduceCtx["putImageData"]($imageData, +"0", x2.K2("0", 0));
                $colorIndex++;
                setTimeout(function() {
                    $this.convertNextPath();
                }, +"0");
            });
        },     
        // DONE   
        getDominantColors(A) {
            let $this = this
            $colorThief["getColorFromUrl"](A, function(X) {
                $palette = $range <= X["length"] ? X["slice"](+"0", $range) : X;
                for (var E = +"0"; E < $palette["length"]; E++) {
                    $this.palette.original.push({
                        R: $palette[E][+"0"], 
                        G: $palette[E]["1" | 0],
                        B: $palette[E][2]
                    })
                }
            })
            this.$emit('$colors', this.palette.original)
            this.$generate()
        },
        // DONE
        rgbToHex(m1, K1, u1) {
            return "#" + this.componentToHex(m1) + this.componentToHex(K1) + this.componentToHex(u1);
        },
        // DONE
        hexToRGB(G1, L1) {
            var f2 = v4rr;
            var T1, G3, y3, A3;
            G3 = -1560694279;
            f2.D2(0);
            y3 = -f2.K2("1517126518", 0);
            A3 = +"2";
            for (var D3 = +"1"; f2.Z9(D3.toString(), D3.toString().length, "62292" - 0) !== G3; D3++) {
                T1 = {};
                return T1["r"] = parseInt(G1["substr"](+"1", 2), "16" | 0), T1["g"] = parseInt(G1["substr"]("3" | 0, +"2"), +"16"), T1["b"] = parseInt(G1["substr"]("5" - 0, 2), +"16"), T1["a"] = +"255", T1;
            }
            if (f2.Z9(A3.toString(), A3.toString().length, "78370" - 0) !== y3) {
                T1 = {};
                return T1["a"] = parseInt(G1["a"]("8" - 0, +"3"), "51" | 0), T1["b"] = parseInt(G1["substr"](+"6", +"5"), "6" - 0), T1["substr"] = parseInt(G1["substr"]("1" - 0, "8" * 1), +"81"), T1["a"] = "74" | 0, T1;
            }
        },
        // DONE
        componentToHex(s1) {
            var M1;
            M1 = s1["toString"](+"16");
            return ("1" | 0) == M1["length"] ? "0" + M1 : M1;
        },
        // DONE
        constructSplitSVG() {
            var v2 = v4rr;
            var f1;
            ($splitSVG = $primarySVG["cloneNode"](!+"0"))["setAttributeNS"]("http://www.w3.org/2000/svg", "id", "splitsvg");
            for (var W1, i1 = parseInt($splitSVG["getAttributeNS"]("http://www.w3.org/2000/svg", "width"), +"10"), g1 = parseInt($splitSVG["getAttributeNS"]("http://www.w3.org/2000/svg", "height"), +"10"), a1 = $splitSVG["childNodes"][+"0"]["children"], O1 = g1, o1 = 30, D1 = 0, Z1 = "0" | 0; Z1 < a1["length"]; Z1++) {
                f1 = a1[Z1]["attributes"]["d"]["nodeValue"];
                f1 += " M -25 0 L -5 0 L -5 20 L -25 20 Z";
                v2.D2(7);
                f1 += v2.Q2(i1, " 20 Z", " 0 L ", i1, i1, "25", " 0 L ", 0, 5, "5", "25", i1, 0, " 20 L ", " M ");
                a1[Z1]["attributes"]["d"]["nodeValue"] = f1;
                ("0" | 0) < Z1 && Z1 % ("3" | 0) == +"0" && (O1 += g1 + ("60" - 0), o1 = +"30", D1 += g1 + +"60");
                v2.w2(8);
                a1[Z1]["setAttributeNS"]("http://www.w3.org/2000/svg", "transform", v2.Q2(")", D1, "translate(", o1, ","));
                v2.w2(9);
                o1 += v2.Q2(1, "60", i1);
            }
            v2.w2(10);
            W1 = v2.K2("3", 0, "60", i1);
            $splitSVG["removeAttributeNS"]("http://www.w3.org/2000/svg", "width");
            $splitSVG["removeAttributeNS"]("http://www.w3.org/2000/svg", "height");
            $splitSVG["removeAttributeNS"]("http://www.w3.org/2000/svg", "viewBox");
            $splitSVG["setAttributeNS"]("http://www.w3.org/2000/svg", "width", W1);
            $splitSVG["setAttributeNS"]("http://www.w3.org/2000/svg", "height", O1);
            $splitSVG["setAttributeNS"]("http://www.w3.org/2000/svg", "version", "1.1");
            this.drawInlineSplitSVG(document["getElementById"]("splitSVGcanvas")["getContext"]("2d"), $splitSVG["outerHTML"]);
        },

        // DONE
        drawInlineSplitSVG(q1, N1) {
            var e1, j1, B1, r1;
            $svgSize = 0;
            e1 = new Blob([N1], function() {
                var g5;
                g5 = {};
                g5["type"] = "image/svg+xml;charset=utf-8";
                return g5;
            } ["apply"](this, arguments));
            j1 = self["URL"] || self["webkitURL"] || self;
            B1 = j1["createObjectURL"](e1);
            r1 = new Image();
            e1["size"] <= +"1048576" && ($svgSize = e1["size"]);
            r1["onload"] = function() {
                var s2 = v4rr;
                var n1, C3, w3, X3;
                console["log"](r1["width"], r1["height"]);
                $imgAspect = r1["width"] / r1["height"];
                $myCanvas = document["getElementById"]("splitSVGcanvas");
                $myCanvas["width"] = $(".split-panel")["width"]();
                $myCanvas["height"] = $(".split-panel")["width"]() / $imgAspect;
                s2.D2(0);
                q1["clearRect"](0, s2.K2("0", 0), $myCanvas["width"], $myCanvas["height"]);
                C3 = - +"1003586530";
                s2.w2(0);
                w3 = -s2.Q2("63098179", 0);
                X3 = 2;
                for (var f3 = +"1"; s2.p9(f3.toString(), f3.toString().length, +"30841") !== C3; f3++) {
                    n1 = $preserveAspectRatio(r1, $myCanvas, "xMidYMid meet");
                    s2.D2(0);
                    X3 += s2.K2("2", 0);
                }
                if (s2.Z9(X3.toString(), X3.toString().length, 84350) !== w3) {
                    n1 = $preserveAspectRatio(r1, $myCanvas, "");
                }
                q1["drawImage"](n1["img"], n1["sx"], n1["sy"], n1["swidth"], n1["sheight"], n1["dx"], n1["dy"], n1["dwidth"], n1["dheight"]);
                j1["revokeObjectURL"](B1);
            };
            r1["src"] = B1;
            this.$emit('$split-svg', N1)
        }, 
        // DONE   
        changeColor(i4, g4) {
            var a4;
            let $this = this
            a4 = $($currentColorItem)["attr"]("id")["split"]("colorItem")[+"1"];
            if (("1" | 0) < $colors["length"])
                for (var Z4 = 0; Z4 < $primarySVG["childNodes"][+"0"]["children"]["length"]; Z4++)
                    if ($primarySVG["children"]["0" * 1]["children"][Z4]["getAttributeNS"](null, "fill") == g4["dataset"]["color"]) {
                        if ("#" == i4) {
                            $($currentColorItem)["remove"]();
                            $primarySVG["children"][0]["removeChild"]($primarySVG["children"]["0" | 0]["children"][Z4]);
                            $this.replaceImageColor($this.hexToRGB($colors[a4]), $this.hexToRGB("#ffffff", +"0"));
                            $colors["splice"](a4, +"1");
                            $this.rearrangePathIds();
                            break;
                        }
                        $($currentColorItem)["css"]("background-color", i4);
                        $primarySVG["children"][+"0"]["children"][Z4]["attributes"][+"3"]["nodeValue"] = i4;
                        $this.drawInlineSVG($SVGctxt, $primarySVG["outerHTML"]);
                        $this.constructSplitSVG();
                    }
        },
        // DONE
        rearrangePathIds() {
            for (var o4 = "0" - 0; o4 < $colors["length"]; o4++) {
                $primarySVG["children"]["0" | 0]["children"][o4]["getAttributeNS"](null, "fill") == $colors[o4] && ($primarySVG["children"][+"0"]["childNodes"][o4]["setAttribute"]("id", "path" + o4), $("#colorList")["0" | 0]["childNodes"][o4]["setAttribute"]("id", "colorItem" + o4));
            }
            this.drawInlineSVG(document["getElementById"]("svgWithAspectRatio")["getContext"]("2d"), $primarySVG["outerHTML"]);
            this.constructSplitSVG();
        },
        drawInlineSVG(I1, h1) {
            var Q1, x1, d1, b1;
            $svgSize = +"0";
            Q1 = new Blob([h1], function() {
                var a5;
                a5 = {};
                a5["type"] = "image/svg+xml;charset=utf-8";
                return a5;
            } ["apply"](this, arguments));
            x1 = self["URL"] || self["webkitURL"] || self;
            d1 = x1["createObjectURL"](Q1);
            b1 = new Image();
            Q1["size"] <= 1048576 && ($svgSize = Q1["size"]);
            b1["onload"] = function() {
                var C1;
                $myCanvas = document["getElementById"]("svgWithAspectRatio");
                v4rr.w2(1);
                I1["clearRect"](v4rr.Q2("0", 1), 0, $myCanvas["width"], $myCanvas["height"]);
                C1 = $preserveAspectRatio(b1, $myCanvas, "xMidYMid meet");
                I1["drawImage"](C1["img"], C1["sx"], C1["sy"], C1["swidth"], C1["sheight"], C1["dx"], C1["dy"], C1["dwidth"], C1["dheight"]);
                x1["revokeObjectURL"](d1);
            };
            b1["src"] = d1;

            // SPLIT SVG CREATED
            this.$emit('$primary-svg', h1)
        },        
        replaceImageColor(t4, V4) {
            var O2 = v4rr;
            console["log"]("replaceImageColor");
            for (var L4 = this.copyImageData($reduceCtx, $imageData), y4 = L4["data"]["buffer"], p4 = (new Uint8ClampedArray(y4), new Uint32Array(y4), +"0"), F4 = L4["data"]["length"]; p4 < F4; p4 += +"4") {
                L4["data"][p4] == t4["r"] && L4["data"][p4 + +"1"] == t4["g"] && L4["data"][p4 + 2] == t4["b"] && +"255" == L4["data"][p4 + 3] && (L4["data"][p4] = V4["r"], L4["data"][p4 + 1] = V4["g"], L4["data"][p4 + ("2" - 0)] = V4["b"], L4["data"][p4 + ("3" - 0)] = V4["a"]);
            }
            O2.w2(1);
            $reduceCtx["clearRect"](O2.K2("0", 1), 0, $reduceCanvas["width"], $reduceCanvas["height"]);
            $reduceCtx["putImageData"](L4, +"0", +"0");
            O2.w2(1);
            $imageData = $reduceCtx["getImageData"](O2.Q2("0", 1), O2.Q2("0", 1), $reduceCanvas["width"], $reduceCanvas["height"]);
        },
        copyImageData(P1, J1) {
            var S1;
            S1 = P1["createImageData"](J1["width"], J1["height"]);
            return S1["data"]["set"](J1["data"]), S1;
        },
        // DONE
        download(J, S) {
            console.log(S, 'download')
            var H;
            H = document["createElement"]("a");
            this.linkDownload(H, J, S);
            document["body"]["appendChild"](H);
            H["click"]();
            setTimeout(function() {
                document["body"]["removeChild"](H);
            }, "500" | 0);            
        },        
        linkDownload(P, M, K) {
            var X2 = v4rr;
            var j3, R3, g3;
            var contentType, uriContent;
            X2.D2(2);
            j3 = -X2.K2(0, "1117855251");
            R3 = -1237093850;
            X2.w2(0);
            g3 = X2.K2("2", 0);
            for (var I5 = 1; X2.Z9(I5.toString(), I5.toString().length, "39242" * 1) !== j3; I5++) {
                contentType = "href";
                uriContent = contentType / encodeURIComponent(K);
                P["download"]("href", uriContent);
                P["download"]("href", M);
                X2.w2(1);
                g3 += X2.K2("2", 1);
            }
            if (X2.Z9(g3.toString(), g3.toString().length, "25565" | 0) !== R3) {
                contentType = "data:application/octet-stream,";
                uriContent = contentType + encodeURIComponent(K);
                P["setAttribute"]("href", uriContent);
                P["setAttribute"]("download", M);
            }
        }
    },
    mounted() {
        // this.$init()  
        let $this = this    
        this.$nextTick(() => {
            setTimeout(() => {
                this.$init()
            }, 500);
            $("#splitSVGDownload")["click"](function() {
                $this.download("image2VectorSplit.svg", $splitSVG["outerHTML"]["replace"](/\u0073\u0074\u0079\u006c\x65\x3d\u0022[^"]{0,}\x22/g, ""));
            });
            $("#download-btn")["click"](function() {
                $this.download("image2vector.svg", $primarySVG["outerHTML"]["replace"](/\u0073\x74\x79\u006c\x65\x3d\x22[^"]{0,}\u0022/g, ""));
            });        
        })  
    }
}
</script>

<style>

</style>