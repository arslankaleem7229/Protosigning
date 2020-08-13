function $get_window_based_height(top_elem) {
    return ($(window).height() - top_elem.outerHeight())
}
function $gcd(a, b) {
    return (b == 0) ? a : gcd (b, a%b);
}
async function $aspect_ratio({width, height}) {
    let r = await $gcd(width, height)
    return {
        x: width/r,
        y: height/r
    }
}
function $neg_w_h({ w, h, x, y}) {
    if(w < 0) {
        x += w
        w *= -1
    }
    if(h < 0) {
        y += h
        h *= -1
    }
    return { w, h, x, y}
}
function $lastIndexOf(arr) {
    return {
        i: arr.length - 1,
        val: arr[arr.length - 1]
    }
}
function $indexOf(arr, index) {
    return {
        i: index,
        val: arr[index]
    }
}
function $remove_last_index(arr) {
    arr.splice(arr.length-1, 1)
}
function $distance(a1, a2) {
    let x = { x1: a1[1], x2: a1[2] },
        y = { y1: a2[1], y2: a2[2] }
    return Math.sqrt(Math.pow(x.x1 - y.y1, 2) + Math.pow(x.x2 - y.y2, 2) )
}
function $get_index(arr, index) {
    return {
        index,
        value: arr[index]
    }
}

function $radToDeg(radians)
{
  var pi = Math.PI;
  return radians * (180/pi);
}
function $angle(e, box) {
    var boxCenter=[box.x + box.width/2, box.y + box.height/2];
    var angle = Math.atan2(e.pageX - boxCenter[0], - (e.pageY - boxCenter[1]) )*(180/Math.PI) + 180
    return Math.round(angle)
}
function $hasParentId(elem, id) {
    try {
        if ($(elem).attr("id") == id) return true;
        return elem.parentNode && this.$hasParentId(elem.parentNode, id);
    }
    catch(err) {
        return false
    }
}
function $hasParentTag(elem, tag) {
    try {
        if (elem.tagName == tag) return elem;
        return elem.parentNode && this.$hasParentTag(elem.parentNode, tag);
    }
    catch(err) {
        return false
    }    
}
function $parent(elem, tag) {
    try {
        if (elem.tagName == tag) return elem;
        return elem.parentNode && this.$parent(elem.parentNode, tag);
    }
    catch(err) {
        return false
    }    

}
function $children({ child, parent_tag }) {
    try {
        if (child.tagName == parent_tag) return $(child).find("*");
        return child.parentNode && this.$children({ child: child.parentNode, parent_tag } );
    }
    catch(err) {
        return false
    }    

}
function $datetime() {
    // For todays date;
    Date.prototype.today = function () { 
        return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
    }
    // For the time now
    Date.prototype.timeNow = function () {
        return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
    }        
    var datetime = new Date().today() + " @ " + new Date().timeNow();
    return datetime
    
}
async function $readFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    await rawFile.open("GET",file,false);
    rawFile.onreadystatechange = function() {
        if(rawFile.readyState === 4) {
            if(rawFile.status === 200 || rawFile.status === 0)
            {
                callback(rawFile.responseText)
            }
        }
    }
    rawFile.send(null);                
}
function $lineTo(ref, { x, y }) {
    let points = ref.array(),
        A = points[0],
        B = [points[0][0] + x, points[0][1] + y]
    ref.plot([A, B])
}
function $pencilDrawing(ref, array, {x, y}) {
    let { val } = $lastIndexOf(array)
    let p1 = val,
        p2 = ["L", x, y]
    if($distance(p1, p2) > 5) {
        array.push(p2)
        ref.plot(array)
    }
}
function $polyTo(ref, array, { x, y }) {
    let { i } = $lastIndexOf(array)
    array[i] = [x, y]
    ref.plot(array)    
}

function $pathStretchness(SVG, array) {
    let g = SVG.group(),
        line = SVG.line([ [array[0],array[1]], [array[4],array[5]] ]).stroke({ color: "black", width: 1}),
        j = 0,
        colors = [
        { fill: "#EEE", stroke: "#55F"},
        { fill: "#0FF", stroke: "#0FF"},
        { fill: "#0FF", stroke: "#00F"},
    ]
    g.add(line)
    for(let i=0; i<array.length; i+=2) {
        let c = SVG.circle(8).fill(colors[j].fill).move(array[i]-4, array[i+1]-4)
        c.stroke({
            color: colors[j++].stroke,
        })
        g.add(c)
    }
    return g
}
function $pathTo(SVG, array, start) {
    let { x, y } = start
    let d = SVG.path().fill("none").stroke({color: "black", width: 1})
    d.plot([ ["M",x,y], array ] )
    return d
}
function $pathEndpoint(SVG, array) {
    let { i } = $lastIndexOf(array)
    let c = SVG.circle(8).fill("#0FF")
    .move( array[i-1]-4, array[i]-4)
    .stroke({ color: "#00F", width: 2 })
    .attr({ cursor: "move" })
    return c
}
function $polygonEndpoint(SVG, array) {
    let c = SVG.circle(8).fill("#0FF")
    .move( array[0]-4, array[1]-4)
    .stroke({ color: "#00F", width: 2 })
    .attr({ cursor: "move" })
    return c
}

function $textResize(direction, { node, mouseX, fontsize, canvas }) {
    let DOMRect = {
        elem: node.getBoundingClientRect(),
        canvas: canvas.getBoundingClientRect()
    },
        width = DOMRect.elem.width,
        cursor = (mouseX - (DOMRect.elem.x - DOMRect.canvas.x)),
        d = width - cursor,
        c = 0
    while(d<-5 || d>5) {
        if(c > 500) break
        d>5 ? fontsize-- : d<5 ? fontsize++ : ""

        width = DOMRect.elem.width
        cursor = (mouseX - (DOMRect.elem.x - DOMRect.canvas.x))
        d = width - cursor
        node.font({ size: fontsize})     
        c++
    }                 
}

function $uploadFile(callback) {
    let input = $("<input>")
    input.attr("type", "file")
    $(document.body).append(input)
    input.addClass("display-none")
    input.click()
    input.change(function(e) {
        if (this.files && this.files[0]) {
            var reader = new FileReader();        
            reader.onload = function(e) {
                input.remove()
                callback(e.target.result)
            }                
            reader.readAsDataURL(this.files[0]);
        }        
    })
}
// from data url
function $img_wh(src, callback) {
    let img = new Image();
    img.src = src;
    img.onload = () =>
    {
        callback({
            width: img.width,
            height: img.height
        })
    }
}
function $validateSVG(svg, id) {
    svg = $("<svg " + svg.split("<svg ")[1])
    svg.attr('template-id', id)
    svg.removeAttr("id x y width height")
    // svg.wrapInner("<g></g>")
    return svg[0]
}
function dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);
  
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  
    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
  
    // create a view into the buffer
    var ia = new Uint8Array(ab);
  
    // set the bytes of the buffer to the correct values
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
  
    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([ab], {type: mimeString});
    return blob;
  
  }
  
function colorPalette() {
    let input = $('<input>')
    input.attr('type', 'color')
    input.css({
        display: 'none'
    })
    $(document.body).append(input)
    input.trigger('click')
    return input
}


// import { EventBus } from '@/globals/event-bus.js'
let $backgrounds = [
    {   list: [
        { css: { background: "radial-gradient(circle at 16% 83%, rgba(148, 148, 148,0.06) 0%, rgba(148, 148, 148,0.06) 50%,rgba(63, 63, 63,0.06) 50%, rgba(63, 63, 63,0.06) 100%),radial-gradient(circle at 68% 87%, rgba(66, 66, 66,0.06) 0%, rgba(66, 66, 66,0.06) 50%,rgba(105, 105, 105,0.06) 50%, rgba(105, 105, 105,0.06) 100%),radial-gradient(circle at 38% 50%, rgba(123, 123, 123,0.06) 0%, rgba(123, 123, 123,0.06) 50%,rgba(172, 172, 172,0.06) 50%, rgba(172, 172, 172,0.06) 100%),linear-gradient(90deg, hsl(18,0%,1%),hsl(18,0%,1%))"}},
        { css: { background: "repeating-linear-gradient(90deg, hsla(240,0%,35%,0.05) 0px, hsla(240,0%,35%,0.05) 1px,transparent 1px, transparent 91px),repeating-linear-gradient(45deg, hsla(240,0%,35%,0.05) 0px, hsla(240,0%,35%,0.05) 1px,transparent 1px, transparent 91px),repeating-linear-gradient(0deg, hsla(240,0%,35%,0.05) 0px, hsla(240,0%,35%,0.05) 1px,transparent 1px, transparent 61px),repeating-linear-gradient(90deg, hsla(240,0%,35%,0.05) 0px, hsla(240,0%,35%,0.05) 1px,transparent 1px, transparent 61px),repeating-linear-gradient(90deg, hsla(240,0%,35%,0.05) 0px, hsla(240,0%,35%,0.05) 1px,transparent 1px, transparent 16px),repeating-linear-gradient(0deg, hsla(240,0%,35%,0.05) 0px, hsla(240,0%,35%,0.05) 1px,transparent 1px, transparent 16px),linear-gradient(90deg, hsl(83,8%,8%),hsl(83,8%,8%))"}},
        { css: { background: "linear-gradient(45deg, rgba(86, 86, 86,0.04) 0%, rgba(86, 86, 86,0.04) 50%,rgba(169, 169, 169,0.04) 50%, rgba(169, 169, 169,0.04) 71%,rgba(251, 251, 251,0.04) 71%, rgba(251, 251, 251,0.04) 100%),linear-gradient(45deg, rgba(86, 86, 86,0.04) 0%, rgba(86, 86, 86,0.04) 56%,rgba(169, 169, 169,0.04) 56%, rgba(169, 169, 169,0.04) 67%,rgba(251, 251, 251,0.04) 67%, rgba(251, 251, 251,0.04) 100%),linear-gradient(135deg, rgba(86, 86, 86,0.04) 0%, rgba(86, 86, 86,0.04) 4%,rgba(169, 169, 169,0.04) 4%, rgba(169, 169, 169,0.04) 75%,rgba(251, 251, 251,0.04) 75%, rgba(251, 251, 251,0.04) 100%),linear-gradient(90deg, rgb(0,0,0),rgb(0,0,0))"}},
        { css: { background: "repeating-linear-gradient(135deg, rgba(145, 145, 145, 0.02) 0px, rgba(145, 145, 145, 0.02) 39px,rgba(140, 140, 140, 0.02) 39px, rgba(140, 140, 140, 0.02) 57px,rgba(9, 9, 9, 0.02) 57px, rgba(9, 9, 9, 0.02) 91px,rgba(217, 217, 217, 0.02) 91px, rgba(217, 217, 217, 0.02) 119px,rgba(45, 45, 45, 0.02) 119px, rgba(45, 45, 45, 0.02) 141px,rgba(227, 227, 227, 0.02) 141px, rgba(227, 227, 227, 0.02) 184px,rgba(236, 236, 236, 0.02) 184px, rgba(236, 236, 236, 0.02) 227px,rgba(124, 124, 124, 0.02) 227px, rgba(124, 124, 124, 0.02) 244px),repeating-linear-gradient(135deg, rgba(39, 39, 39, 0.02) 0px, rgba(39, 39, 39, 0.02) 23px,rgba(2, 2, 2, 0.02) 23px, rgba(2, 2, 2, 0.02) 55px,rgba(13, 13, 13, 0.02) 55px, rgba(13, 13, 13, 0.02) 71px,rgba(44, 44, 44, 0.02) 71px, rgba(44, 44, 44, 0.02) 98px,rgba(240, 240, 240, 0.02) 98px, rgba(240, 240, 240, 0.02) 134px,rgba(182, 182, 182, 0.02) 134px, rgba(182, 182, 182, 0.02) 159px,rgba(246, 246, 246, 0.02) 159px, rgba(246, 246, 246, 0.02) 174px,rgba(157, 157, 157, 0.02) 174px, rgba(157, 157, 157, 0.02) 190px),repeating-linear-gradient(135deg, rgba(145, 145, 145, 0.02) 0px, rgba(145, 145, 145, 0.02) 35px,rgba(217, 217, 217, 0.02) 35px, rgba(217, 217, 217, 0.02) 53px,rgba(199, 199, 199, 0.02) 53px, rgba(199, 199, 199, 0.02) 70px,rgba(196, 196, 196, 0.02) 70px, rgba(196, 196, 196, 0.02) 114px,rgba(137, 137, 137, 0.02) 114px, rgba(137, 137, 137, 0.02) 143px,rgba(249, 249, 249, 0.02) 143px, rgba(249, 249, 249, 0.02) 191px,rgba(247, 247, 247, 0.02) 191px, rgba(247, 247, 247, 0.02) 239px,rgba(38, 38, 38, 0.02) 239px, rgba(38, 38, 38, 0.02) 273px),linear-gradient(90deg, rgb(69, 69, 69),rgb(3, 3, 3))"}},
        { css: { background: "repeating-linear-gradient(0deg, hsla(347,0%,33%,0.05) 0px, hsla(347,0%,33%,0.05) 50px,transparent 50px, transparent 100px),repeating-linear-gradient(90deg, hsla(347,0%,33%,0.05) 0px, hsla(347,0%,33%,0.05) 50px,transparent 50px, transparent 100px),linear-gradient(90deg, hsl(139,0%,18%),hsl(139,0%,18%))"}},
        ],
        name: "Dark Background", css: { background: "linear-gradient(323deg, rgba(255, 255, 255, 0.01) 0%, rgba(255, 255, 255, 0.01) 16.667%, rgba(46, 46, 46, 0.01) 16.667%, rgba(46, 46, 46, 0.01) 33.334%, rgba(226, 226, 226, 0.01) 33.334%, rgba(226, 226, 226, 0.01) 50.001%, rgba(159, 159, 159, 0.01) 50.001%, rgba(159, 159, 159, 0.01) 66.668%, rgba(149, 149, 149, 0.01) 66.668%, rgba(149, 149, 149, 0.01) 83.335%, rgba(43, 43, 43, 0.01) 83.335%, rgba(43, 43, 43, 0.01) 100.002%), linear-gradient(346deg, rgba(166, 166, 166, 0.03) 0%, rgba(166, 166, 166, 0.03) 25%, rgba(240, 240, 240, 0.03) 25%, rgba(240, 240, 240, 0.03) 50%, rgba(121, 121, 121, 0.03) 50%, rgba(121, 121, 121, 0.03) 75%, rgba(40, 40, 40, 0.03) 75%, rgba(40, 40, 40, 0.03) 100%), linear-gradient(347deg, rgba(209, 209, 209, 0.01) 0%, rgba(209, 209, 209, 0.01) 25%, rgba(22, 22, 22, 0.01) 25%, rgba(22, 22, 22, 0.01) 50%, rgba(125, 125, 125, 0.01) 50%, rgba(125, 125, 125, 0.01) 75%, rgba(205, 205, 205, 0.01) 75%, rgba(205, 205, 205, 0.01) 100%), linear-gradient(84deg, rgba(195, 195, 195, 0.01) 0%, rgba(195, 195, 195, 0.01) 14.286%, rgba(64, 64, 64, 0.01) 14.286%, rgba(64, 64, 64, 0.01) 28.572%, rgba(67, 67, 67, 0.01) 28.572%, rgba(67, 67, 67, 0.01) 42.858%, rgba(214, 214, 214, 0.01) 42.858%, rgba(214, 214, 214, 0.01) 57.144%, rgba(45, 45, 45, 0.01) 57.144%, rgba(45, 45, 45, 0.01) 71.43%, rgba(47, 47, 47, 0.01) 71.43%, rgba(47, 47, 47, 0.01) 85.716%, rgba(172, 172, 172, 0.01) 85.716%, rgba(172, 172, 172, 0.01) 100.002%), linear-gradient(73deg, rgba(111, 111, 111, 0.03) 0%, rgba(111, 111, 111, 0.03) 16.667%, rgba(202, 202, 202, 0.03) 16.667%, rgba(202, 202, 202, 0.03) 33.334%, rgba(57, 57, 57, 0.03) 33.334%, rgba(57, 57, 57, 0.03) 50.001%, rgba(197, 197, 197, 0.03) 50.001%, rgba(197, 197, 197, 0.03) 66.668%, rgba(97, 97, 97, 0.03) 66.668%, rgba(97, 97, 97, 0.03) 83.335%, rgba(56, 56, 56, 0.03) 83.335%, rgba(56, 56, 56, 0.03) 100.002%), linear-gradient(132deg, rgba(88, 88, 88, 0.03) 0%, rgba(88, 88, 88, 0.03) 20%, rgba(249, 249, 249, 0.03) 20%, rgba(249, 249, 249, 0.03) 40%, rgba(2, 2, 2, 0.03) 40%, rgba(2, 2, 2, 0.03) 60%, rgba(185, 185, 185, 0.03) 60%, rgba(185, 185, 185, 0.03) 80%, rgba(196, 196, 196, 0.03) 80%, rgba(196, 196, 196, 0.03) 100%), linear-gradient(142deg, rgba(160, 160, 160, 0.03) 0%, rgba(160, 160, 160, 0.03) 12.5%, rgba(204, 204, 204, 0.03) 12.5%, rgba(204, 204, 204, 0.03) 25%, rgba(108, 108, 108, 0.03) 25%, rgba(108, 108, 108, 0.03) 37.5%, rgba(191, 191, 191, 0.03) 37.5%, rgba(191, 191, 191, 0.03) 50%, rgba(231, 231, 231, 0.03) 50%, rgba(231, 231, 231, 0.03) 62.5%, rgba(70, 70, 70, 0.03) 62.5%, rgba(70, 70, 70, 0.03) 75%, rgba(166, 166, 166, 0.03) 75%, rgba(166, 166, 166, 0.03) 87.5%, rgba(199, 199, 199, 0.03) 87.5%, rgba(199, 199, 199, 0.03) 100%), linear-gradient(238deg, rgba(116, 116, 116, 0.02) 0%, rgba(116, 116, 116, 0.02) 20%, rgba(141, 141, 141, 0.02) 20%, rgba(141, 141, 141, 0.02) 40%, rgba(152, 152, 152, 0.02) 40%, rgba(152, 152, 152, 0.02) 60%, rgba(61, 61, 61, 0.02) 60%, rgba(61, 61, 61, 0.02) 80%, rgba(139, 139, 139, 0.02) 80%, rgba(139, 139, 139, 0.02) 100%), linear-gradient(188deg, rgba(227, 227, 227, 0.01) 0%, rgba(227, 227, 227, 0.01) 20%, rgba(105, 105, 105, 0.01) 20%, rgba(105, 105, 105, 0.01) 40%, rgba(72, 72, 72, 0.01) 40%, rgba(72, 72, 72, 0.01) 60%, rgba(33, 33, 33, 0.01) 60%, rgba(33, 33, 33, 0.01) 80%, rgba(57, 57, 57, 0.01) 80%, rgba(57, 57, 57, 0.01) 100%), linear-gradient(90deg, rgb(33, 33, 33), rgb(33, 33, 33))" }
    }, 

    {
        list: [
            { css: { background: "repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.11) 0px, rgba(0, 0, 0, 0.11) 12px, rgba(1, 1, 1, 0.16) 12px, rgba(1, 1, 1, 0.16) 24px, rgba(0, 0, 0, 0.14) 24px, rgba(0, 0, 0, 0.14) 36px, rgba(0, 0, 0, 0.23) 36px, rgba(0, 0, 0, 0.23) 48px, rgba(0, 0, 0, 0.12) 48px, rgba(0, 0, 0, 0.12) 60px, rgba(1, 1, 1, 0.07) 60px, rgba(1, 1, 1, 0.07) 72px, rgba(0, 0, 0, 0.21) 72px, rgba(0, 0, 0, 0.21) 84px, rgba(0, 0, 0, 0.24) 84px, rgba(0, 0, 0, 0.24) 96px, rgba(1, 1, 1, 0.23) 96px, rgba(1, 1, 1, 0.23) 108px, rgba(1, 1, 1, 0.07) 108px, rgba(1, 1, 1, 0.07) 120px, rgba(0, 0, 0, 0.01) 120px, rgba(0, 0, 0, 0.01) 132px, rgba(1, 1, 1, 0.22) 132px, rgba(1, 1, 1, 0.22) 144px, rgba(1, 1, 1, 0.24) 144px, rgba(1, 1, 1, 0.24) 156px, rgba(0, 0, 0, 0) 156px, rgba(0, 0, 0, 0) 168px, rgba(0, 0, 0, 0.12) 168px, rgba(0, 0, 0, 0.12) 180px), repeating-linear-gradient(90deg, rgba(1, 1, 1, 0.01) 0px, rgba(1, 1, 1, 0.01) 12px, rgba(1, 1, 1, 0.15) 12px, rgba(1, 1, 1, 0.15) 24px, rgba(0, 0, 0, 0.09) 24px, rgba(0, 0, 0, 0.09) 36px, rgba(0, 0, 0, 0.02) 36px, rgba(0, 0, 0, 0.02) 48px, rgba(0, 0, 0, 0.1) 48px, rgba(0, 0, 0, 0.1) 60px, rgba(1, 1, 1, 0.07) 60px, rgba(1, 1, 1, 0.07) 72px, rgba(1, 1, 1, 0.15) 72px, rgba(1, 1, 1, 0.15) 84px, rgba(0, 0, 0, 0.18) 84px, rgba(0, 0, 0, 0.18) 96px, rgba(1, 1, 1, 0.15) 96px, rgba(1, 1, 1, 0.15) 108px, rgba(1, 1, 1, 0.09) 108px, rgba(1, 1, 1, 0.09) 120px, rgba(1, 1, 1, 0.07) 120px, rgba(1, 1, 1, 0.07) 132px, rgba(1, 1, 1, 0.05) 132px, rgba(1, 1, 1, 0.05) 144px, rgba(0, 0, 0, 0.1) 144px, rgba(0, 0, 0, 0.1) 156px, rgba(1, 1, 1, 0.18) 156px, rgba(1, 1, 1, 0.18) 168px), repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.24) 0px, rgba(0, 0, 0, 0.24) 16px, rgba(1, 1, 1, 0.06) 16px, rgba(1, 1, 1, 0.06) 32px, rgba(0, 0, 0, 0.16) 32px, rgba(0, 0, 0, 0.16) 48px, rgba(1, 1, 1, 0) 48px, rgba(1, 1, 1, 0) 64px, rgba(1, 1, 1, 0.12) 64px, rgba(1, 1, 1, 0.12) 80px, rgba(1, 1, 1, 0.22) 80px, rgba(1, 1, 1, 0.22) 96px, rgba(0, 0, 0, 0.24) 96px, rgba(0, 0, 0, 0.24) 112px, rgba(0, 0, 0, 0.25) 112px, rgba(0, 0, 0, 0.25) 128px, rgba(1, 1, 1, 0.12) 128px, rgba(1, 1, 1, 0.12) 144px, rgba(0, 0, 0, 0.18) 144px, rgba(0, 0, 0, 0.18) 160px, rgba(1, 1, 1, 0.03) 160px, rgba(1, 1, 1, 0.03) 176px, rgba(1, 1, 1, 0.1) 176px, rgba(1, 1, 1, 0.1) 192px), repeating-linear-gradient(135deg, rgba(1, 1, 1, 0.18) 0px, rgba(1, 1, 1, 0.18) 3px, rgba(0, 0, 0, 0.09) 3px, rgba(0, 0, 0, 0.09) 6px, rgba(0, 0, 0, 0.08) 6px, rgba(0, 0, 0, 0.08) 9px, rgba(1, 1, 1, 0.05) 9px, rgba(1, 1, 1, 0.05) 12px, rgba(0, 0, 0, 0.01) 12px, rgba(0, 0, 0, 0.01) 15px, rgba(1, 1, 1, 0.12) 15px, rgba(1, 1, 1, 0.12) 18px, rgba(0, 0, 0, 0.05) 18px, rgba(0, 0, 0, 0.05) 21px, rgba(1, 1, 1, 0.16) 21px, rgba(1, 1, 1, 0.16) 24px, rgba(1, 1, 1, 0.07) 24px, rgba(1, 1, 1, 0.07) 27px, rgba(1, 1, 1, 0.23) 27px, rgba(1, 1, 1, 0.23) 30px, rgba(0, 0, 0, 0.2) 30px, rgba(0, 0, 0, 0.2) 33px, rgba(0, 0, 0, 0.18) 33px, rgba(0, 0, 0, 0.18) 36px, rgba(1, 1, 1, 0.12) 36px, rgba(1, 1, 1, 0.12) 39px, rgba(1, 1, 1, 0.13) 39px, rgba(1, 1, 1, 0.13) 42px, rgba(1, 1, 1, 0.2) 42px, rgba(1, 1, 1, 0.2) 45px, rgba(1, 1, 1, 0.18) 45px, rgba(1, 1, 1, 0.18) 48px, rgba(0, 0, 0, 0.2) 48px, rgba(0, 0, 0, 0.2) 51px, rgba(1, 1, 1, 0) 51px, rgba(1, 1, 1, 0) 54px, rgba(0, 0, 0, 0.03) 54px, rgba(0, 0, 0, 0.03) 57px, rgba(1, 1, 1, 0.06) 57px, rgba(1, 1, 1, 0.06) 60px, rgba(1, 1, 1, 0) 60px, rgba(1, 1, 1, 0) 63px, rgba(0, 0, 0, 0.1) 63px, rgba(0, 0, 0, 0.1) 66px, rgba(1, 1, 1, 0.19) 66px, rgba(1, 1, 1, 0.19) 69px), linear-gradient(90deg, rgb(239, 53, 115), rgb(79, 2, 93))"}},
            { css: { background: "linear-gradient(135deg, rgb(59, 72, 175) 0%, rgb(59, 72, 175) 31%,rgb(55, 66, 150) 31%, rgb(55, 66, 150) 46%,rgb(51, 60, 126) 46%, rgb(51, 60, 126) 56%,rgb(48, 54, 101) 56%, rgb(48, 54, 101) 83%,rgb(44, 48, 77) 83%, rgb(44, 48, 77) 93%,rgb(40, 42, 52) 93%, rgb(40, 42, 52) 100%)"}},
            { css: { background: "linear-gradient(45deg, rgb(64, 140, 190) 0%, rgb(64, 140, 190) 7%,rgb(62, 107, 145) 7%, rgb(62, 107, 145) 9%,rgb(49, 99, 131) 9%, rgb(49, 99, 131) 11%,rgb(116, 172, 211) 11%, rgb(116, 172, 211) 26%,rgb(125, 182, 214) 26%, rgb(125, 182, 214) 34%,rgb(40, 90, 136) 34%, rgb(40, 90, 136) 41%,rgb(39, 123, 190) 41%, rgb(39, 123, 190) 100%)"}}
            ],
        name: "Popular Gradient", css: { background: "repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.11) 0px, rgba(0, 0, 0, 0.11) 12px, rgba(1, 1, 1, 0.16) 12px, rgba(1, 1, 1, 0.16) 24px, rgba(0, 0, 0, 0.14) 24px, rgba(0, 0, 0, 0.14) 36px, rgba(0, 0, 0, 0.23) 36px, rgba(0, 0, 0, 0.23) 48px, rgba(0, 0, 0, 0.12) 48px, rgba(0, 0, 0, 0.12) 60px, rgba(1, 1, 1, 0.07) 60px, rgba(1, 1, 1, 0.07) 72px, rgba(0, 0, 0, 0.21) 72px, rgba(0, 0, 0, 0.21) 84px, rgba(0, 0, 0, 0.24) 84px, rgba(0, 0, 0, 0.24) 96px, rgba(1, 1, 1, 0.23) 96px, rgba(1, 1, 1, 0.23) 108px, rgba(1, 1, 1, 0.07) 108px, rgba(1, 1, 1, 0.07) 120px, rgba(0, 0, 0, 0.01) 120px, rgba(0, 0, 0, 0.01) 132px, rgba(1, 1, 1, 0.22) 132px, rgba(1, 1, 1, 0.22) 144px, rgba(1, 1, 1, 0.24) 144px, rgba(1, 1, 1, 0.24) 156px, rgba(0, 0, 0, 0) 156px, rgba(0, 0, 0, 0) 168px, rgba(0, 0, 0, 0.12) 168px, rgba(0, 0, 0, 0.12) 180px), repeating-linear-gradient(90deg, rgba(1, 1, 1, 0.01) 0px, rgba(1, 1, 1, 0.01) 12px, rgba(1, 1, 1, 0.15) 12px, rgba(1, 1, 1, 0.15) 24px, rgba(0, 0, 0, 0.09) 24px, rgba(0, 0, 0, 0.09) 36px, rgba(0, 0, 0, 0.02) 36px, rgba(0, 0, 0, 0.02) 48px, rgba(0, 0, 0, 0.1) 48px, rgba(0, 0, 0, 0.1) 60px, rgba(1, 1, 1, 0.07) 60px, rgba(1, 1, 1, 0.07) 72px, rgba(1, 1, 1, 0.15) 72px, rgba(1, 1, 1, 0.15) 84px, rgba(0, 0, 0, 0.18) 84px, rgba(0, 0, 0, 0.18) 96px, rgba(1, 1, 1, 0.15) 96px, rgba(1, 1, 1, 0.15) 108px, rgba(1, 1, 1, 0.09) 108px, rgba(1, 1, 1, 0.09) 120px, rgba(1, 1, 1, 0.07) 120px, rgba(1, 1, 1, 0.07) 132px, rgba(1, 1, 1, 0.05) 132px, rgba(1, 1, 1, 0.05) 144px, rgba(0, 0, 0, 0.1) 144px, rgba(0, 0, 0, 0.1) 156px, rgba(1, 1, 1, 0.18) 156px, rgba(1, 1, 1, 0.18) 168px), repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.24) 0px, rgba(0, 0, 0, 0.24) 16px, rgba(1, 1, 1, 0.06) 16px, rgba(1, 1, 1, 0.06) 32px, rgba(0, 0, 0, 0.16) 32px, rgba(0, 0, 0, 0.16) 48px, rgba(1, 1, 1, 0) 48px, rgba(1, 1, 1, 0) 64px, rgba(1, 1, 1, 0.12) 64px, rgba(1, 1, 1, 0.12) 80px, rgba(1, 1, 1, 0.22) 80px, rgba(1, 1, 1, 0.22) 96px, rgba(0, 0, 0, 0.24) 96px, rgba(0, 0, 0, 0.24) 112px, rgba(0, 0, 0, 0.25) 112px, rgba(0, 0, 0, 0.25) 128px, rgba(1, 1, 1, 0.12) 128px, rgba(1, 1, 1, 0.12) 144px, rgba(0, 0, 0, 0.18) 144px, rgba(0, 0, 0, 0.18) 160px, rgba(1, 1, 1, 0.03) 160px, rgba(1, 1, 1, 0.03) 176px, rgba(1, 1, 1, 0.1) 176px, rgba(1, 1, 1, 0.1) 192px), repeating-linear-gradient(135deg, rgba(1, 1, 1, 0.18) 0px, rgba(1, 1, 1, 0.18) 3px, rgba(0, 0, 0, 0.09) 3px, rgba(0, 0, 0, 0.09) 6px, rgba(0, 0, 0, 0.08) 6px, rgba(0, 0, 0, 0.08) 9px, rgba(1, 1, 1, 0.05) 9px, rgba(1, 1, 1, 0.05) 12px, rgba(0, 0, 0, 0.01) 12px, rgba(0, 0, 0, 0.01) 15px, rgba(1, 1, 1, 0.12) 15px, rgba(1, 1, 1, 0.12) 18px, rgba(0, 0, 0, 0.05) 18px, rgba(0, 0, 0, 0.05) 21px, rgba(1, 1, 1, 0.16) 21px, rgba(1, 1, 1, 0.16) 24px, rgba(1, 1, 1, 0.07) 24px, rgba(1, 1, 1, 0.07) 27px, rgba(1, 1, 1, 0.23) 27px, rgba(1, 1, 1, 0.23) 30px, rgba(0, 0, 0, 0.2) 30px, rgba(0, 0, 0, 0.2) 33px, rgba(0, 0, 0, 0.18) 33px, rgba(0, 0, 0, 0.18) 36px, rgba(1, 1, 1, 0.12) 36px, rgba(1, 1, 1, 0.12) 39px, rgba(1, 1, 1, 0.13) 39px, rgba(1, 1, 1, 0.13) 42px, rgba(1, 1, 1, 0.2) 42px, rgba(1, 1, 1, 0.2) 45px, rgba(1, 1, 1, 0.18) 45px, rgba(1, 1, 1, 0.18) 48px, rgba(0, 0, 0, 0.2) 48px, rgba(0, 0, 0, 0.2) 51px, rgba(1, 1, 1, 0) 51px, rgba(1, 1, 1, 0) 54px, rgba(0, 0, 0, 0.03) 54px, rgba(0, 0, 0, 0.03) 57px, rgba(1, 1, 1, 0.06) 57px, rgba(1, 1, 1, 0.06) 60px, rgba(1, 1, 1, 0) 60px, rgba(1, 1, 1, 0) 63px, rgba(0, 0, 0, 0.1) 63px, rgba(0, 0, 0, 0.1) 66px, rgba(1, 1, 1, 0.19) 66px, rgba(1, 1, 1, 0.19) 69px), linear-gradient(90deg, rgb(239, 53, 115), rgb(79, 2, 93))"} 
    }, 
    {
        list: [
            { css: { background: "radial-gradient(circle at 72% 83%, rgba(12, 12, 12,0.04) 0%, rgba(12, 12, 12,0.04) 50%,rgba(172, 172, 172,0.04) 50%, rgba(172, 172, 172,0.04) 100%),radial-gradient(circle at 57% 65%, rgba(11, 11, 11,0.04) 0%, rgba(11, 11, 11,0.04) 50%,rgba(222, 222, 222,0.04) 50%, rgba(222, 222, 222,0.04) 100%),radial-gradient(circle at 64% 31%, rgba(11, 11, 11,0.04) 0%, rgba(11, 11, 11,0.04) 50%,rgba(191, 191, 191,0.04) 50%, rgba(191, 191, 191,0.04) 100%),linear-gradient(130deg, rgb(5, 235, 123),rgb(47, 52, 6))"}},
            { css: { background: "radial-gradient(circle at 1% 52%, rgba(139, 139, 139,0.05) 0%, rgba(139, 139, 139,0.05) 50%,rgba(21, 21, 21,0.05) 50%, rgba(21, 21, 21,0.05) 100%),radial-gradient(circle at 41% 28%, rgba(81, 81, 81,0.05) 0%, rgba(81, 81, 81,0.05) 50%,rgba(7, 7, 7,0.05) 50%, rgba(7, 7, 7,0.05) 100%),radial-gradient(circle at 48% 1%, rgba(93, 93, 93,0.05) 0%, rgba(93, 93, 93,0.05) 50%,rgba(7, 7, 7,0.05) 50%, rgba(7, 7, 7,0.05) 100%),linear-gradient(255deg, rgb(156, 41, 132),rgb(47, 14, 122))"}},
            { css: { background: "radial-gradient(circle at 90% 66%, rgba(25, 25, 25,0.06) 0%, rgba(25, 25, 25,0.06) 25%,rgba(23, 23, 23,0.06) 25%, rgba(23, 23, 23,0.06) 50%,rgba(20, 20, 20,0.06) 50%, rgba(20, 20, 20,0.06) 75%,rgba(18, 18, 18,0.06) 75%, rgba(18, 18, 18,0.06) 100%),radial-gradient(circle at 62% 23%, rgba(154, 154, 154,0.06) 0%, rgba(154, 154, 154,0.06) 25%,rgba(111, 111, 111,0.06) 25%, rgba(111, 111, 111,0.06) 50%,rgba(68, 68, 68,0.06) 50%, rgba(68, 68, 68,0.06) 75%,rgba(25, 25, 25,0.06) 75%, rgba(25, 25, 25,0.06) 100%),radial-gradient(circle at 47% 85%, rgba(97, 97, 97,0.06) 0%, rgba(97, 97, 97,0.06) 25%,rgba(130, 130, 130,0.06) 25%, rgba(130, 130, 130,0.06) 50%,rgba(162, 162, 162,0.06) 50%, rgba(162, 162, 162,0.06) 75%,rgba(195, 195, 195,0.06) 75%, rgba(195, 195, 195,0.06) 100%),radial-gradient(circle at 72% 0%, rgba(214, 214, 214,0.06) 0%, rgba(214, 214, 214,0.06) 25%,rgba(223, 223, 223,0.06) 25%, rgba(223, 223, 223,0.06) 50%,rgba(231, 231, 231,0.06) 50%, rgba(231, 231, 231,0.06) 75%,rgba(240, 240, 240,0.06) 75%, rgba(240, 240, 240,0.06) 100%),linear-gradient(90deg, rgb(181, 12, 26),rgb(206, 132, 31))"}},
            { css: { background: "radial-gradient(circle at 88% 18%, rgba(136, 136, 136,0.05) 0%, rgba(136, 136, 136,0.05) 50%,rgba(172, 172, 172,0.05) 50%, rgba(172, 172, 172,0.05) 100%),radial-gradient(circle at 34% 9%, rgba(149, 149, 149,0.05) 0%, rgba(149, 149, 149,0.05) 50%,rgba(55, 55, 55,0.05) 50%, rgba(55, 55, 55,0.05) 100%),radial-gradient(circle at 37% 56%, rgba(97, 97, 97,0.05) 0%, rgba(97, 97, 97,0.05) 50%,rgba(160, 160, 160,0.05) 50%, rgba(160, 160, 160,0.05) 100%),linear-gradient(69deg, rgb(10, 68, 151),rgb(72, 211, 165))"}},
        ],
        name: "Simple Circle", css: { background: "radial-gradient(circle at 17% 77%, rgba(17, 17, 17, 0.04) 0%, rgba(17, 17, 17, 0.04) 50%, rgba(197, 197, 197, 0.04) 50%, rgba(197, 197, 197, 0.04) 100%), radial-gradient(circle at 26% 17%, rgba(64, 64, 64, 0.04) 0%, rgba(64, 64, 64, 0.04) 50%, rgba(244, 244, 244, 0.04) 50%, rgba(244, 244, 244, 0.04) 100%), radial-gradient(circle at 44% 60%, rgba(177, 177, 177, 0.04) 0%, rgba(177, 177, 177, 0.04) 50%, rgba(187, 187, 187, 0.04) 50%, rgba(187, 187, 187, 0.04) 100%), linear-gradient(19deg, rgb(28, 117, 250), rgb(34, 2, 159))"} }, 
    {
        list: [
            { css: { background: "linear-gradient(305deg, rgba(161, 161, 161, 0.04) 0%, rgba(161, 161, 161, 0.04) 45%,rgba(31, 31, 31, 0.04) 45%, rgba(31, 31, 31, 0.04) 100%),linear-gradient(173deg, rgba(190, 190, 190, 0.04) 0%, rgba(190, 190, 190, 0.04) 59%,rgba(10, 10, 10, 0.04) 59%, rgba(10, 10, 10, 0.04) 100%),linear-gradient(229deg, rgba(168, 168, 168, 0.04) 0%, rgba(168, 168, 168, 0.04) 29%,rgba(86, 86, 86, 0.04) 29%, rgba(86, 86, 86, 0.04) 100%),linear-gradient(306deg, rgba(51, 51, 51, 0.04) 0%, rgba(51, 51, 51, 0.04) 17%,rgba(64, 64, 64, 0.04) 17%, rgba(64, 64, 64, 0.04) 100%),linear-gradient(90deg, rgb(255, 169, 89),rgb(97, 30, 1))"}},
            { css: { background: "linear-gradient(32deg, rgba(49, 49, 49, 0.04) 0%, rgba(49, 49, 49, 0.04) 75%,rgba(225, 225, 225, 0.04) 75%, rgba(225, 225, 225, 0.04) 100%),linear-gradient(131deg, rgba(241, 241, 241, 0.04) 0%, rgba(241, 241, 241, 0.04) 73%,rgba(224, 224, 224, 0.04) 73%, rgba(224, 224, 224, 0.04) 100%),linear-gradient(274deg, rgba(106, 106, 106, 0.04) 0%, rgba(106, 106, 106, 0.04) 63%,rgba(250, 250, 250, 0.04) 63%, rgba(250, 250, 250, 0.04) 100%),linear-gradient(121deg, rgba(127, 127, 127, 0.04) 0%, rgba(127, 127, 127, 0.04) 43%,rgba(228, 228, 228, 0.04) 43%, rgba(228, 228, 228, 0.04) 100%),linear-gradient(90deg, rgb(228, 46, 24),rgb(242, 171, 153))"}},
            { css: { background: "linear-gradient(78deg, rgba(96, 96, 96, 0.04) 0%, rgba(96, 96, 96, 0.04) 35%,rgba(220, 220, 220, 0.04) 35%, rgba(220, 220, 220, 0.04) 100%),linear-gradient(150deg, rgba(83, 83, 83, 0.04) 0%, rgba(83, 83, 83, 0.04) 71%,rgba(6, 6, 6, 0.04) 71%, rgba(6, 6, 6, 0.04) 100%),linear-gradient(311deg, rgba(203, 203, 203, 0.04) 0%, rgba(203, 203, 203, 0.04) 58%,rgba(3, 3, 3, 0.04) 58%, rgba(3, 3, 3, 0.04) 100%),linear-gradient(137deg, rgba(110, 110, 110, 0.04) 0%, rgba(110, 110, 110, 0.04) 11%,rgba(226, 226, 226, 0.04) 11%, rgba(226, 226, 226, 0.04) 100%),linear-gradient(90deg, rgb(215, 19, 84),rgb(234, 119, 123))"}},
            { css: { background: "linear-gradient(239deg, rgba(71, 71, 71, 0.05) 0%, rgba(71, 71, 71, 0.05) 27%,rgba(209, 209, 209, 0.05) 27%, rgba(209, 209, 209, 0.05) 100%),linear-gradient(294deg, rgba(63, 63, 63, 0.05) 0%, rgba(63, 63, 63, 0.05) 43%,rgba(138, 138, 138, 0.05) 43%, rgba(138, 138, 138, 0.05) 100%),linear-gradient(323deg, rgba(58, 58, 58, 0.05) 0%, rgba(58, 58, 58, 0.05) 24%,rgba(100, 100, 100, 0.05) 24%, rgba(100, 100, 100, 0.05) 100%),linear-gradient(236deg, rgba(47, 47, 47, 0.05) 0%, rgba(47, 47, 47, 0.05) 45%,rgba(208, 208, 208, 0.05) 45%, rgba(208, 208, 208, 0.05) 100%),linear-gradient(90deg, rgb(209, 54, 202),rgb(180, 22, 95))"}},
            { css: { background: "linear-gradient(135deg, rgba(76, 76, 76, 0.04) 0%, rgba(76, 76, 76, 0.04) 10%,rgba(149, 149, 149, 0.04) 10%, rgba(149, 149, 149, 0.04) 100%),linear-gradient(90deg, rgba(196, 196, 196, 0.04) 0%, rgba(196, 196, 196, 0.04) 59%,rgba(68, 68, 68, 0.04) 59%, rgba(68, 68, 68, 0.04) 100%),linear-gradient(45deg, rgba(39, 39, 39, 0.01) 0%, rgba(39, 39, 39, 0.01) 9%,rgba(218, 218, 218, 0.01) 9%, rgba(218, 218, 218, 0.01) 100%),linear-gradient(0deg, rgba(26, 26, 26, 0.04) 0%, rgba(26, 26, 26, 0.04) 33%,rgba(90, 90, 90, 0.04) 33%, rgba(90, 90, 90, 0.04) 100%),linear-gradient(135deg, rgba(37, 37, 37, 0.07) 0%, rgba(37, 37, 37, 0.07) 46%,rgba(50, 50, 50, 0.07) 46%, rgba(50, 50, 50, 0.07) 100%),linear-gradient(90deg, rgb(8, 28, 65),rgb(16, 173, 226))"}},
        ],
        name: "Simple Angular", css: {  background: "linear-gradient(108deg, rgba(62, 62, 62, 0.09) 0%, rgba(62, 62, 62, 0.09) 30%, rgba(234, 234, 234, 0.09) 30%, rgba(234, 234, 234, 0.09) 100%), linear-gradient(116deg, rgba(101, 101, 101, 0.06) 0%, rgba(101, 101, 101, 0.06) 51%, rgba(231, 231, 231, 0.06) 51%, rgba(231, 231, 231, 0.06) 100%), linear-gradient(258deg, rgba(103, 103, 103, 0.07) 0%, rgba(103, 103, 103, 0.07) 1%, rgba(209, 209, 209, 0.07) 1%, rgba(209, 209, 209, 0.07) 100%), linear-gradient(43deg, rgba(17, 17, 17, 0.09) 0%, rgba(17, 17, 17, 0.09) 7%, rgba(159, 159, 159, 0.09) 7%, rgba(159, 159, 159, 0.09) 100%), linear-gradient(63deg, rgba(211, 211, 211, 0.1) 0%, rgba(211, 211, 211, 0.1) 94%, rgba(233, 233, 233, 0.1) 94%, rgba(233, 233, 233, 0.1) 100%), linear-gradient(207deg, rgba(179, 179, 179, 0.1) 0%, rgba(179, 179, 179, 0.1) 57%, rgba(11, 11, 11, 0.1) 57%, rgba(11, 11, 11, 0.1) 100%), linear-gradient(25deg, rgba(118, 118, 118, 0.07) 0%, rgba(118, 118, 118, 0.07) 98%, rgba(248, 248, 248, 0.07) 98%, rgba(248, 248, 248, 0.07) 100%), linear-gradient(90deg, rgb(237, 12, 99), rgb(237, 12, 99))"} },
    {
        list: [
            { css: { background: "linear-gradient(45deg, rgb(163, 12, 6) 0%, rgb(163, 12, 6) 22%,rgb(182, 55, 32) 22%, rgb(182, 55, 32) 29%,rgb(200, 97, 58) 29%, rgb(200, 97, 58) 39%,rgb(219, 140, 83) 39%, rgb(219, 140, 83) 45%,rgb(237, 182, 109) 45%, rgb(237, 182, 109) 100%)"}},
            { css: { background: "linear-gradient(45deg, rgb(254, 101, 156) 0%, rgb(254, 101, 156) 10%,rgb(204, 87, 133) 10%, rgb(204, 87, 133) 45%,rgb(155, 73, 110) 45%, rgb(155, 73, 110) 70%,rgb(105, 59, 88) 70%, rgb(105, 59, 88) 81%,rgb(56, 45, 65) 81%, rgb(56, 45, 65) 88%,rgb(6, 31, 42) 88%, rgb(6, 31, 42) 100%)"}},
            { css: { background: "linear-gradient(135deg, rgb(103, 35, 67) 0%, rgb(103, 35, 67) 23%,rgb(246, 122, 20) 23%, rgb(246, 122, 20) 38%,rgb(160, 70, 48) 38%, rgb(160, 70, 48) 49%,rgb(132, 52, 58) 49%, rgb(132, 52, 58) 52%,rgb(217, 105, 29) 52%, rgb(217, 105, 29) 71%,rgb(189, 87, 39) 71%, rgb(189, 87, 39) 100%)"}},
            { css: { background: "linear-gradient(90deg, rgb(49, 90, 210) 0%, rgb(49, 90, 210) 10%,rgb(53, 98, 218) 10%, rgb(53, 98, 218) 20%,rgb(57, 107, 225) 20%, rgb(57, 107, 225) 32%,rgb(62, 115, 233) 32%, rgb(62, 115, 233) 43%,rgb(66, 123, 240) 43%, rgb(66, 123, 240) 47%,rgb(70, 132, 248) 47%, rgb(70, 132, 248) 49%,rgb(74, 140, 255) 49%, rgb(74, 140, 255) 100%)"}},
            { css: { background: "linear-gradient(135deg, rgb(203, 17, 17) 0%, rgb(203, 17, 17) 23%,rgb(209, 42, 24) 23%, rgb(209, 42, 24) 37%,rgb(215, 67, 30) 37%, rgb(215, 67, 30) 40%,rgb(239, 168, 57) 40%, rgb(239, 168, 57) 41%,rgb(233, 143, 51) 41%, rgb(233, 143, 51) 44%,rgb(221, 92, 37) 44%, rgb(221, 92, 37) 54%,rgb(245, 193, 64) 54%, rgb(245, 193, 64) 66%,rgb(227, 118, 44) 66%, rgb(227, 118, 44) 100%)"}},
            { css: { background: "linear-gradient(45deg, rgba(96, 131, 193, 0.45) 0%, rgba(96, 131, 193, 0.45) 5%,rgba(90, 78, 185, 0.45) 5%, rgba(90, 78, 185, 0.45) 46%,rgba(102, 184, 202, 0.45) 46%, rgba(102, 184, 202, 0.45) 49%,rgba(93, 104, 189, 0.45) 49%, rgba(93, 104, 189, 0.45) 50%,rgba(99, 157, 198, 0.45) 50%, rgba(99, 157, 198, 0.45) 84%,rgba(105, 210, 206, 0.45) 84%, rgba(105, 210, 206, 0.45) 100%),linear-gradient(135deg, rgb(111, 76, 50),rgb(28, 158, 244))"}},            
        ],
        name: "Uneven Stripes (Retro)", css: {  background: "linear-gradient(135deg, rgb(243, 107, 55) 0%, rgb(243, 107, 55) 23%, rgb(244, 133, 60) 23%, rgb(244, 133, 60) 27%, rgb(245, 159, 64) 27%, rgb(245, 159, 64) 73%, rgb(245, 186, 69) 73%, rgb(245, 186, 69) 74%, rgb(246, 212, 73) 74%, rgb(246, 212, 73) 78%, rgb(247, 238, 78) 78%, rgb(247, 238, 78) 100%)"} },
    {
        list: [
            { css: { background: "linear-gradient(45deg, rgba(20, 136, 221, 0.5) 0%, rgba(20, 136, 221, 0.5) 12.5%,rgba(27, 145, 222, 0.5) 12.5%, rgba(27, 145, 222, 0.5) 25%,rgba(33, 154, 222, 0.5) 25%, rgba(33, 154, 222, 0.5) 37.5%,rgba(40, 163, 223, 0.5) 37.5%, rgba(40, 163, 223, 0.5) 50%,rgba(46, 173, 224, 0.5) 50%, rgba(46, 173, 224, 0.5) 62.5%,rgba(53, 182, 225, 0.5) 62.5%, rgba(53, 182, 225, 0.5) 75%,rgba(59, 191, 225, 0.5) 75%, rgba(59, 191, 225, 0.5) 87.5%,rgba(66, 200, 226, 0.5) 87.5%, rgba(66, 200, 226, 0.5) 100%),linear-gradient(135deg, rgb(34, 87, 254) 0%, rgb(34, 87, 254) 12.5%,rgb(42, 82, 249) 12.5%, rgb(42, 82, 249) 25%,rgb(50, 77, 243) 25%, rgb(50, 77, 243) 37.5%,rgb(58, 72, 238) 37.5%, rgb(58, 72, 238) 50%,rgb(67, 67, 233) 50%, rgb(67, 67, 233) 62.5%,rgb(75, 62, 228) 62.5%, rgb(75, 62, 228) 75%,rgb(83, 57, 222) 75%, rgb(83, 57, 222) 87.5%,rgb(91, 52, 217) 87.5%, rgb(91, 52, 217) 100%)"}},
            { css: { background: "linear-gradient(135deg, rgba(246, 64, 125, 0.28) 0%, rgba(246, 64, 125, 0.28) 20%,rgba(246, 107, 143, 0.28) 20%, rgba(246, 107, 143, 0.28) 40%,rgba(245, 151, 162, 0.28) 40%, rgba(245, 151, 162, 0.28) 60%,rgba(245, 194, 180, 0.28) 60%, rgba(245, 194, 180, 0.28) 80%,rgba(244, 237, 198, 0.28) 80%, rgba(244, 237, 198, 0.28) 100%),linear-gradient(45deg, rgba(202, 0, 12, 0.28) 0%, rgba(202, 0, 12, 0.28) 20%,rgba(174, 41, 23, 0.28) 20%, rgba(174, 41, 23, 0.28) 40%,rgba(145, 82, 35, 0.28) 40%, rgba(145, 82, 35, 0.28) 60%,rgba(117, 122, 46, 0.28) 60%, rgba(117, 122, 46, 0.28) 80%,rgba(88, 163, 57, 0.28) 80%, rgba(88, 163, 57, 0.28) 100%),linear-gradient(280deg, rgb(142, 218, 154),rgb(210, 215, 135))"}},
            { css: { background: "linear-gradient(45deg, rgba(177, 251, 187, 0.45) 0%, rgba(177, 251, 187, 0.45) 25%,rgba(137, 190, 137, 0.45) 25%, rgba(137, 190, 137, 0.45) 50%,rgba(97, 129, 88, 0.45) 50%, rgba(97, 129, 88, 0.45) 75%,rgba(57, 68, 38, 0.45) 75%, rgba(57, 68, 38, 0.45) 100%),linear-gradient(135deg, rgb(11, 88, 21) 0%, rgb(11, 88, 21) 25%,rgb(27, 138, 47) 25%, rgb(27, 138, 47) 50%,rgb(44, 188, 74) 50%, rgb(44, 188, 74) 75%,rgb(60, 238, 100) 75%, rgb(60, 238, 100) 100%)"}},
        ],
        name: "Diamonds", css: {  background: "linear-gradient(45deg, rgba(0, 84, 162, 0.45) 0%, rgba(0, 84, 162, 0.45) 25%, rgba(77, 60, 170, 0.45) 25%, rgba(77, 60, 170, 0.45) 50%, rgba(153, 37, 179, 0.45) 50%, rgba(153, 37, 179, 0.45) 75%, rgba(230, 13, 187, 0.45) 75%, rgba(230, 13, 187, 0.45) 100%), linear-gradient(135deg, rgb(149, 18, 122) 0%, rgb(149, 18, 122) 25%, rgb(182, 13, 98) 25%, rgb(182, 13, 98) 50%, rgb(214, 8, 74) 50%, rgb(214, 8, 74) 75%, rgb(247, 3, 50) 75%, rgb(247, 3, 50) 100%)"} },
    {
        list: [
            { css: { background: "linear-gradient(37deg, rgb(32, 218, 233),rgb(40, 21, 236))"}},
            { css: { background: "linear-gradient(90deg, rgb(160, 222, 219),rgb(3, 165, 209))"}},
            { css: { background: "linear-gradient(90deg, rgb(237, 228, 100),rgb(252, 152, 51))"}},
            { css: { background: "linear-gradient(90deg, rgb(43, 77, 130),rgb(40, 144, 172))"}},
            { css: { background: "linear-gradient(90deg, rgb(68, 144, 190),rgb(251, 254, 241))"}},
            { css: { background: "linear-gradient(45deg, rgba(130, 89, 219, 0.2),rgba(44, 192, 226, 0.2),rgba(182, 103, 181, 0.2)),linear-gradient(135deg, rgb(39, 20, 149),rgb(65, 82, 185),rgb(91, 144, 220))"}},
            { css: { background: "linear-gradient(90deg, rgb(116, 216, 252),rgb(156, 153, 254))"}},
            { css: { background: "linear-gradient(0deg, rgb(85, 217, 233),rgb(86, 73, 252))"}},
            { css: { background: "linear-gradient(135deg, rgb(182, 244, 85),rgb(63, 128, 87))"}},
        ],
        name: "Standard", css: {  background: "linear-gradient(0deg, rgb(113, 136, 223), rgb(17, 213, 207))"} },
    {
        list: [
            { css: { background: "linear-gradient(41deg, rgba(107, 107, 107, 0.04) 0%, rgba(107, 107, 107, 0.04) 8%,rgba(31, 31, 31, 0.04) 8%, rgba(31, 31, 31, 0.04) 100%),linear-gradient(9deg, rgba(228, 228, 228, 0.04) 0%, rgba(228, 228, 228, 0.04) 62%,rgba(54, 54, 54, 0.04) 62%, rgba(54, 54, 54, 0.04) 100%),linear-gradient(124deg, rgba(18, 18, 18, 0.04) 0%, rgba(18, 18, 18, 0.04) 37%,rgba(233, 233, 233, 0.04) 37%, rgba(233, 233, 233, 0.04) 100%),linear-gradient(253deg, rgba(201, 201, 201, 0.04) 0%, rgba(201, 201, 201, 0.04) 55%,rgba(47, 47, 47, 0.04) 55%, rgba(47, 47, 47, 0.04) 100%),linear-gradient(270deg, rgba(172, 172, 172, 0.04) 0%, rgba(172, 172, 172, 0.04) 33%,rgba(26, 26, 26, 0.04) 33%, rgba(26, 26, 26, 0.04) 100%),linear-gradient(64deg, rgba(11, 11, 11, 0.04) 0%, rgba(11, 11, 11, 0.04) 38%,rgba(87, 87, 87, 0.04) 38%, rgba(87, 87, 87, 0.04) 100%),linear-gradient(347deg, rgba(199, 199, 199, 0.04) 0%, rgba(199, 199, 199, 0.04) 69%,rgba(4, 4, 4, 0.04) 69%, rgba(4, 4, 4, 0.04) 100%),linear-gradient(313deg, rgba(36, 36, 36, 0.04) 0%, rgba(36, 36, 36, 0.04) 20%,rgba(91, 91, 91, 0.04) 20%, rgba(91, 91, 91, 0.04) 100%),linear-gradient(90deg, rgb(10, 17, 72),rgb(35, 148, 228))"}},
            { css: { background: "linear-gradient(45deg, rgba(56, 239, 63, 0.2) 0%, rgba(56, 239, 63, 0.2) 4%,rgba(47, 192, 98, 0.2) 4%, rgba(47, 192, 98, 0.2) 13%,rgba(38, 144, 133, 0.2) 13%, rgba(38, 144, 133, 0.2) 50%,rgba(29, 97, 168, 0.2) 50%, rgba(29, 97, 168, 0.2) 66%,rgba(20, 49, 203, 0.2) 66%, rgba(20, 49, 203, 0.2) 82%,rgba(11, 2, 238, 0.2) 82%, rgba(11, 2, 238, 0.2) 100%),linear-gradient(135deg, rgba(22, 202, 190, 0.2) 0%, rgba(22, 202, 190, 0.2) 14%,rgba(20, 208, 199, 0.2) 14%, rgba(20, 208, 199, 0.2) 28%,rgba(19, 214, 209, 0.2) 28%, rgba(19, 214, 209, 0.2) 35%,rgba(17, 221, 218, 0.2) 35%, rgba(17, 221, 218, 0.2) 68%,rgba(16, 227, 228, 0.2) 68%, rgba(16, 227, 228, 0.2) 95%,rgba(14, 233, 237, 0.2) 95%, rgba(14, 233, 237, 0.2) 100%),linear-gradient(90deg, rgb(89, 66, 7) 0%, rgb(89, 66, 7) 5%,rgb(79, 87, 10) 5%, rgb(79, 87, 10) 32%,rgb(68, 108, 14) 32%, rgb(68, 108, 14) 43%,rgb(58, 128, 17) 43%, rgb(58, 128, 17) 48%,rgb(47, 149, 21) 48%, rgb(47, 149, 21) 65%,rgb(37, 170, 24) 65%, rgb(37, 170, 24) 100%)"}},
            { css: { background: "linear-gradient(74deg, rgba(246, 246, 246, 0.03) 0%, rgba(246, 246, 246, 0.03) 4%,rgba(152, 152, 152, 0.03) 4%, rgba(152, 152, 152, 0.03) 32%,rgba(123, 123, 123, 0.03) 32%, rgba(123, 123, 123, 0.03) 41%,rgba(189, 189, 189, 0.03) 41%, rgba(189, 189, 189, 0.03) 45%,rgba(151, 151, 151, 0.03) 45%, rgba(151, 151, 151, 0.03) 47%,rgba(61, 61, 61, 0.03) 47%, rgba(61, 61, 61, 0.03) 77%,rgba(34, 34, 34, 0.03) 77%, rgba(34, 34, 34, 0.03) 100%),linear-gradient(117deg, rgba(222, 222, 222, 0.03) 0%, rgba(222, 222, 222, 0.03) 7%,rgba(67, 67, 67, 0.03) 7%, rgba(67, 67, 67, 0.03) 18%,rgba(61, 61, 61, 0.03) 18%, rgba(61, 61, 61, 0.03) 26%,rgba(32, 32, 32, 0.03) 26%, rgba(32, 32, 32, 0.03) 52%,rgba(119, 119, 119, 0.03) 52%, rgba(119, 119, 119, 0.03) 60%,rgba(252, 252, 252, 0.03) 60%, rgba(252, 252, 252, 0.03) 68%,rgba(9, 9, 9, 0.03) 68%, rgba(9, 9, 9, 0.03) 100%),linear-gradient(313deg, rgba(193, 193, 193, 0.03) 0%, rgba(193, 193, 193, 0.03) 12%,rgba(184, 184, 184, 0.03) 12%, rgba(184, 184, 184, 0.03) 24%,rgba(194, 194, 194, 0.03) 24%, rgba(194, 194, 194, 0.03) 43%,rgba(128, 128, 128, 0.03) 43%, rgba(128, 128, 128, 0.03) 54%,rgba(87, 87, 87, 0.03) 54%, rgba(87, 87, 87, 0.03) 71%,rgba(169, 169, 169, 0.03) 71%, rgba(169, 169, 169, 0.03) 93%,rgba(83, 83, 83, 0.03) 93%, rgba(83, 83, 83, 0.03) 100%),linear-gradient(19deg, rgba(186, 186, 186, 0.03) 0%, rgba(186, 186, 186, 0.03) 9%,rgba(77, 77, 77, 0.03) 9%, rgba(77, 77, 77, 0.03) 19%,rgba(38, 38, 38, 0.03) 19%, rgba(38, 38, 38, 0.03) 27%,rgba(203, 203, 203, 0.03) 27%, rgba(203, 203, 203, 0.03) 39%,rgba(130, 130, 130, 0.03) 39%, rgba(130, 130, 130, 0.03) 43%,rgba(184, 184, 184, 0.03) 43%, rgba(184, 184, 184, 0.03) 81%,rgba(108, 108, 108, 0.03) 81%, rgba(108, 108, 108, 0.03) 100%),linear-gradient(90deg, rgb(107, 4, 15),rgb(240, 4, 35))"}},
            { css: { background: "linear-gradient(194deg, rgba(231, 231, 231, 0.03) 0%, rgba(231, 231, 231, 0.03) 17%,rgba(29, 29, 29, 0.03) 17%, rgba(29, 29, 29, 0.03) 19%,rgba(234, 234, 234, 0.03) 19%, rgba(234, 234, 234, 0.03) 37%,rgba(240, 240, 240, 0.03) 37%, rgba(240, 240, 240, 0.03) 79%,rgba(91, 91, 91, 0.03) 79%, rgba(91, 91, 91, 0.03) 84%,rgba(73, 73, 73, 0.03) 84%, rgba(73, 73, 73, 0.03) 98%,rgba(21, 21, 21, 0.03) 98%, rgba(21, 21, 21, 0.03) 100%),linear-gradient(59deg, rgba(160, 160, 160, 0.03) 0%, rgba(160, 160, 160, 0.03) 3%,rgba(224, 224, 224, 0.03) 3%, rgba(224, 224, 224, 0.03) 6%,rgba(137, 137, 137, 0.03) 6%, rgba(137, 137, 137, 0.03) 23%,rgba(226, 226, 226, 0.03) 23%, rgba(226, 226, 226, 0.03) 30%,rgba(96, 96, 96, 0.03) 30%, rgba(96, 96, 96, 0.03) 44%,rgba(210, 210, 210, 0.03) 44%, rgba(210, 210, 210, 0.03) 74%,rgba(61, 61, 61, 0.03) 74%, rgba(61, 61, 61, 0.03) 100%),linear-gradient(22deg, rgba(201, 201, 201, 0.03) 0%, rgba(201, 201, 201, 0.03) 5%,rgba(89, 89, 89, 0.03) 5%, rgba(89, 89, 89, 0.03) 6%,rgba(100, 100, 100, 0.03) 6%, rgba(100, 100, 100, 0.03) 18%,rgba(172, 172, 172, 0.03) 18%, rgba(172, 172, 172, 0.03) 52%,rgba(128, 128, 128, 0.03) 52%, rgba(128, 128, 128, 0.03) 85%,rgba(240, 240, 240, 0.03) 85%, rgba(240, 240, 240, 0.03) 89%,rgba(51, 51, 51, 0.03) 89%, rgba(51, 51, 51, 0.03) 100%),linear-gradient(283deg, rgba(123, 123, 123, 0.03) 0%, rgba(123, 123, 123, 0.03) 10%,rgba(194, 194, 194, 0.03) 10%, rgba(194, 194, 194, 0.03) 34%,rgba(22, 22, 22, 0.03) 34%, rgba(22, 22, 22, 0.03) 36%,rgba(177, 177, 177, 0.03) 36%, rgba(177, 177, 177, 0.03) 46%,rgba(180, 180, 180, 0.03) 46%, rgba(180, 180, 180, 0.03) 59%,rgba(89, 89, 89, 0.03) 59%, rgba(89, 89, 89, 0.03) 80%,rgba(217, 217, 217, 0.03) 80%, rgba(217, 217, 217, 0.03) 100%),linear-gradient(342deg, rgba(171, 171, 171, 0.03) 0%, rgba(171, 171, 171, 0.03) 22%,rgba(238, 238, 238, 0.03) 22%, rgba(238, 238, 238, 0.03) 37%,rgba(186, 186, 186, 0.03) 37%, rgba(186, 186, 186, 0.03) 65%,rgba(80, 80, 80, 0.03) 65%, rgba(80, 80, 80, 0.03) 68%,rgba(49, 49, 49, 0.03) 68%, rgba(49, 49, 49, 0.03) 71%,rgba(137, 137, 137, 0.03) 71%, rgba(137, 137, 137, 0.03) 88%,rgba(224, 224, 224, 0.03) 88%, rgba(224, 224, 224, 0.03) 100%),linear-gradient(90deg, rgb(230, 215, 236),rgb(149, 28, 118))"}},
            { css: { background: "linear-gradient(45deg, rgba(114, 244, 149, 0.27) 0%, rgba(114, 244, 149, 0.27) 37%,rgba(126, 221, 156, 0.27) 37%, rgba(126, 221, 156, 0.27) 48%,rgba(137, 197, 162, 0.27) 48%, rgba(137, 197, 162, 0.27) 49%,rgba(149, 174, 169, 0.27) 49%, rgba(149, 174, 169, 0.27) 59%,rgba(160, 151, 175, 0.27) 59%, rgba(160, 151, 175, 0.27) 60%,rgba(172, 128, 182, 0.27) 60%, rgba(172, 128, 182, 0.27) 86%,rgba(183, 104, 188, 0.27) 86%, rgba(183, 104, 188, 0.27) 95%,rgba(195, 81, 195, 0.27) 95%, rgba(195, 81, 195, 0.27) 100%),linear-gradient(135deg, rgba(100, 114, 232, 0.27) 0%, rgba(100, 114, 232, 0.27) 18%,rgba(126, 135, 203, 0.27) 18%, rgba(126, 135, 203, 0.27) 23%,rgba(153, 156, 173, 0.27) 23%, rgba(153, 156, 173, 0.27) 44%,rgba(179, 178, 144, 0.27) 44%, rgba(179, 178, 144, 0.27) 62%,rgba(206, 199, 114, 0.27) 62%, rgba(206, 199, 114, 0.27) 98%,rgba(232, 220, 85, 0.27) 98%, rgba(232, 220, 85, 0.27) 100%),linear-gradient(0deg, rgb(47, 132, 199) 0%, rgb(47, 132, 199) 2%,rgb(47, 130, 208) 2%, rgb(47, 130, 208) 44%,rgb(47, 127, 218) 44%, rgb(47, 127, 218) 48%,rgb(47, 125, 227) 48%, rgb(47, 125, 227) 77%,rgb(47, 122, 237) 77%, rgb(47, 122, 237) 78%,rgb(47, 120, 246) 78%, rgb(47, 120, 246) 100%)"}},
        ],
        name: "Complex Angular", css: {  background: "linear-gradient(135deg, rgba(19, 176, 223, 0.26) 0%, rgba(19, 176, 223, 0.26) 23%, rgba(16, 160, 197, 0.26) 23%, rgba(16, 160, 197, 0.26) 65%, rgba(13, 144, 172, 0.26) 65%, rgba(13, 144, 172, 0.26) 70%, rgba(9, 129, 146, 0.26) 70%, rgba(9, 129, 146, 0.26) 74%, rgba(6, 113, 121, 0.26) 74%, rgba(6, 113, 121, 0.26) 90%, rgba(3, 97, 95, 0.26) 90%, rgba(3, 97, 95, 0.26) 100%), linear-gradient(45deg, rgba(65, 234, 230, 0.26) 0%, rgba(65, 234, 230, 0.26) 28%, rgba(88, 192, 215, 0.26) 28%, rgba(88, 192, 215, 0.26) 55%, rgba(110, 150, 201, 0.26) 55%, rgba(110, 150, 201, 0.26) 66%, rgba(133, 107, 186, 0.26) 66%, rgba(133, 107, 186, 0.26) 80%, rgba(155, 65, 172, 0.26) 80%, rgba(155, 65, 172, 0.26) 85%, rgba(178, 23, 157, 0.26) 85%, rgba(178, 23, 157, 0.26) 100%), linear-gradient(90deg, rgb(27, 194, 246) 0%, rgb(27, 194, 246) 6%, rgb(39, 174, 237) 6%, rgb(39, 174, 237) 32%, rgb(50, 155, 229) 32%, rgb(50, 155, 229) 40%, rgb(62, 135, 220) 40%, rgb(62, 135, 220) 66%, rgb(74, 116, 211) 66%, rgb(74, 116, 211) 72%, rgb(86, 96, 202) 72%, rgb(86, 96, 202) 86%, rgb(97, 77, 194) 86%, rgb(97, 77, 194) 96%, rgb(109, 57, 185) 96%, rgb(109, 57, 185) 100%)"} },
    {
        list: [
            { css: { background: "linear-gradient(45deg, rgba(13, 155, 205, 0.26) 0%, rgba(13, 155, 205, 0.26) 15%,rgba(17, 150, 214, 0.26) 15%, rgba(17, 150, 214, 0.26) 48%,rgba(20, 145, 223, 0.26) 48%, rgba(20, 145, 223, 0.26) 56%,rgba(24, 140, 232, 0.26) 56%, rgba(24, 140, 232, 0.26) 71%,rgba(27, 135, 241, 0.26) 71%, rgba(27, 135, 241, 0.26) 77%,rgba(31, 130, 250, 0.26) 77%, rgba(31, 130, 250, 0.26) 100%),linear-gradient(0deg, rgba(123, 60, 148, 0.26) 0%, rgba(123, 60, 148, 0.26) 27%,rgba(128, 86, 151, 0.26) 27%, rgba(128, 86, 151, 0.26) 30%,rgba(133, 112, 154, 0.26) 30%, rgba(133, 112, 154, 0.26) 31%,rgba(137, 139, 157, 0.26) 31%, rgba(137, 139, 157, 0.26) 40%,rgba(142, 165, 160, 0.26) 40%, rgba(142, 165, 160, 0.26) 65%,rgba(147, 191, 163, 0.26) 65%, rgba(147, 191, 163, 0.26) 100%),linear-gradient(90deg, rgb(14, 90, 138) 0%, rgb(14, 90, 138) 2%,rgb(12, 104, 141) 2%, rgb(12, 104, 141) 7%,rgb(11, 118, 145) 7%, rgb(11, 118, 145) 11%,rgb(9, 132, 148) 11%, rgb(9, 132, 148) 16%,rgb(8, 147, 152) 16%, rgb(8, 147, 152) 84%,rgb(6, 161, 155) 84%, rgb(6, 161, 155) 85%,rgb(5, 175, 159) 85%, rgb(5, 175, 159) 99%,rgb(3, 189, 162) 99%, rgb(3, 189, 162) 100%)"}},
            { css: { background: "linear-gradient(0, rgba(15, 100, 236, 0.5) 0%, rgba(15, 100, 236, 0.5) 17%,rgba(34, 112, 230, 0.5) 17%, rgba(34, 112, 230, 0.5) 31%,rgba(53, 124, 224, 0.5) 31%, rgba(53, 124, 224, 0.5) 56%,rgba(72, 136, 218, 0.5) 56%, rgba(72, 136, 218, 0.5) 57%,rgba(92, 149, 213, 0.5) 57%, rgba(92, 149, 213, 0.5) 71%,rgba(111, 161, 207, 0.5) 71%, rgba(111, 161, 207, 0.5) 79%,rgba(130, 173, 201, 0.5) 79%, rgba(130, 173, 201, 0.5) 90%,rgba(149, 185, 195, 0.5) 90%, rgba(149, 185, 195, 0.5) 100%),linear-gradient(90deg, rgb(213, 240, 122) 0%, rgb(213, 240, 122) 7%,rgb(184, 222, 123) 7%, rgb(184, 222, 123) 17%,rgb(155, 204, 125) 17%, rgb(155, 204, 125) 21%,rgb(126, 186, 126) 21%, rgb(126, 186, 126) 22%,rgb(96, 168, 127) 22%, rgb(96, 168, 127) 23%,rgb(67, 150, 128) 23%, rgb(67, 150, 128) 34%,rgb(38, 132, 130) 34%, rgb(38, 132, 130) 65%,rgb(9, 114, 131) 65%, rgb(9, 114, 131) 100%)"}},                
            { css: { background: "linear-gradient(0, rgba(99, 99, 62, 0.5) 0%, rgba(99, 99, 62, 0.5) 25%,rgba(83, 145, 76, 0.5) 25%, rgba(83, 145, 76, 0.5) 50%,rgba(68, 191, 91, 0.5) 50%, rgba(68, 191, 91, 0.5) 75%,rgba(52, 237, 105, 0.5) 75%, rgba(52, 237, 105, 0.5) 100%),linear-gradient(90deg, rgb(52, 141, 97) 0%, rgb(52, 141, 97) 25%,rgb(56, 101, 96) 25%, rgb(56, 101, 96) 50%,rgb(60, 61, 94) 50%, rgb(60, 61, 94) 75%,rgb(64, 21, 93) 75%, rgb(64, 21, 93) 100%)"}},
            { css: { background: "linear-gradient(0deg, rgba(189, 205, 225, 0.5) 0%, rgba(189, 205, 225, 0.5) 3%, rgba(163, 183, 210, 0.5) 3%, rgba(163, 183, 210, 0.5) 23%, rgba(137, 162, 196, 0.5) 23%, rgba(137, 162, 196, 0.5) 28%, rgba(111, 140, 181, 0.5) 28%, rgba(111, 140, 181, 0.5) 54%, rgba(85, 119, 167, 0.5) 54%, rgba(85, 119, 167, 0.5) 73%, rgba(59, 97, 152, 0.5) 73%, rgba(59, 97, 152, 0.5) 80%, rgba(33, 76, 138, 0.5) 80%, rgba(33, 76, 138, 0.5) 85%, rgba(7, 54, 123, 0.5) 85%, rgba(7, 54, 123, 0.5) 100%), linear-gradient(90deg, rgb(38, 57, 138) 0%, rgb(38, 57, 138) 11%, rgb(54, 81, 152) 11%, rgb(54, 81, 152) 14%, rgb(71, 105, 166) 14%, rgb(71, 105, 166) 27%, rgb(87, 129, 180) 27%, rgb(87, 129, 180) 32%, rgb(103, 152, 193) 32%, rgb(103, 152, 193) 49%, rgb(119, 176, 207) 49%, rgb(119, 176, 207) 51%, rgb(136, 200, 221) 51%, rgb(136, 200, 221) 89%, rgb(152, 224, 235) 89%, rgb(152, 224, 235) 100%)"}},
        ],
        name: "Square", css: {  background: "linear-gradient(0deg, rgba(117, 80, 126, 0.55) 0%, rgba(117, 80, 126, 0.55) 25%, rgba(101, 138, 130, 0.55) 25%, rgba(101, 138, 130, 0.55) 50%, rgba(86, 195, 134, 0.55) 50%, rgba(86, 195, 134, 0.55) 75%, rgba(70, 253, 138, 0.55) 75%, rgba(70, 253, 138, 0.55) 100%), linear-gradient(90deg, rgb(50, 93, 60) 0%, rgb(50, 93, 60) 20%, rgb(44, 126, 100) 20%, rgb(44, 126, 100) 40%, rgb(37, 159, 139) 40%, rgb(37, 159, 139) 60%, rgb(31, 192, 179) 60%, rgb(31, 192, 179) 80%, rgb(24, 225, 218) 80%, rgb(24, 225, 218) 100%)"} },
    {
        list: [
            { css: { background: "linear-gradient(44deg, rgba(84, 153, 197, 0.04) 0%, rgba(84, 153, 197, 0.04) 50%,rgba(43, 252, 236, 0.04) 50%, rgba(43, 252, 236, 0.04) 100%),linear-gradient(264deg, rgba(197, 57, 189, 0.04) 0%, rgba(197, 57, 189, 0.04) 50%,rgba(167, 106, 179, 0.04) 50%, rgba(167, 106, 179, 0.04) 100%),linear-gradient(323deg, rgba(76, 28, 237, 0.04) 0%, rgba(76, 28, 237, 0.04) 50%,rgba(115, 208, 165, 0.04) 50%, rgba(115, 208, 165, 0.04) 100%),linear-gradient(236deg, rgba(241, 1, 111, 0.04) 0%, rgba(241, 1, 111, 0.04) 50%,rgba(7, 173, 72, 0.04) 50%, rgba(7, 173, 72, 0.04) 100%),linear-gradient(296deg, rgba(124, 241, 241, 0.04) 0%, rgba(124, 241, 241, 0.04) 50%,rgba(26, 63, 229, 0.04) 50%, rgba(26, 63, 229, 0.04) 100%),linear-gradient(96deg, rgba(87, 80, 82, 0.04) 0%, rgba(87, 80, 82, 0.04) 50%,rgba(104, 13, 102, 0.04) 50%, rgba(104, 13, 102, 0.04) 100%),linear-gradient(254deg, rgba(127, 190, 93, 0.04) 0%, rgba(127, 190, 93, 0.04) 50%,rgba(120, 35, 199, 0.04) 50%, rgba(120, 35, 199, 0.04) 100%),linear-gradient(353deg, rgba(227, 212, 206, 0.04) 0%, rgba(227, 212, 206, 0.04) 50%,rgba(55, 215, 100, 0.04) 50%, rgba(55, 215, 100, 0.04) 100%),linear-gradient(218deg, rgba(32, 99, 251, 0.04) 0%, rgba(32, 99, 251, 0.04) 50%,rgba(230, 154, 131, 0.04) 50%, rgba(230, 154, 131, 0.04) 100%),linear-gradient(266deg, rgb(101, 254, 171),rgb(119, 206, 247))"}},
            { css: { background: "linear-gradient(238deg, rgba(70, 70, 70, 0.09) 0%, rgba(70, 70, 70, 0.09) 50%,rgba(214, 214, 214, 0.09) 50%, rgba(214, 214, 214, 0.09) 100%),linear-gradient(126deg, rgba(223, 223, 223, 0.05) 0%, rgba(223, 223, 223, 0.05) 50%,rgba(217, 217, 217, 0.05) 50%, rgba(217, 217, 217, 0.05) 100%),linear-gradient(152deg, rgba(116, 116, 116, 0.08) 0%, rgba(116, 116, 116, 0.08) 50%,rgba(248, 248, 248, 0.08) 50%, rgba(248, 248, 248, 0.08) 100%),linear-gradient(225deg, rgba(1, 1, 1, 0.07) 0%, rgba(1, 1, 1, 0.07) 50%,rgba(5, 5, 5, 0.07) 50%, rgba(5, 5, 5, 0.07) 100%),linear-gradient(194deg, rgba(14, 14, 14, 0.09) 0%, rgba(14, 14, 14, 0.09) 50%,rgba(206, 206, 206, 0.09) 50%, rgba(206, 206, 206, 0.09) 100%),linear-gradient(100deg, rgba(220, 220, 220, 0.07) 0%, rgba(220, 220, 220, 0.07) 50%,rgba(65, 65, 65, 0.07) 50%, rgba(65, 65, 65, 0.07) 100%),linear-gradient(190deg, rgba(194, 194, 194, 0.03) 0%, rgba(194, 194, 194, 0.03) 50%,rgba(206, 206, 206, 0.03) 50%, rgba(206, 206, 206, 0.03) 100%),linear-gradient(320deg, rgba(10, 10, 10, 0.08) 0%, rgba(10, 10, 10, 0.08) 50%,rgba(231, 231, 231, 0.08) 50%, rgba(231, 231, 231, 0.08) 100%),linear-gradient(90deg, rgb(10, 147, 39),rgb(235, 252, 123))"}},
        ],
        name: "Burst", css: {  background: "linear-gradient(201deg, rgba(148, 148, 148, 0.07) 0%, rgba(148, 148, 148, 0.07) 50%, rgba(83, 83, 83, 0.07) 50%, rgba(83, 83, 83, 0.07) 100%), linear-gradient(192deg, rgba(176, 176, 176, 0.08) 0%, rgba(176, 176, 176, 0.08) 50%, rgba(180, 180, 180, 0.08) 50%, rgba(180, 180, 180, 0.08) 100%), linear-gradient(48deg, rgba(185, 185, 185, 0.1) 0%, rgba(185, 185, 185, 0.1) 50%, rgba(243, 243, 243, 0.1) 50%, rgba(243, 243, 243, 0.1) 100%), linear-gradient(65deg, rgba(172, 172, 172, 0.09) 0%, rgba(172, 172, 172, 0.09) 50%, rgba(209, 209, 209, 0.09) 50%, rgba(209, 209, 209, 0.09) 100%), linear-gradient(4deg, rgba(224, 224, 224, 0.03) 0%, rgba(224, 224, 224, 0.03) 50%, rgba(49, 49, 49, 0.03) 50%, rgba(49, 49, 49, 0.03) 100%), linear-gradient(228deg, rgba(152, 152, 152, 0.03) 0%, rgba(152, 152, 152, 0.03) 50%, rgba(130, 130, 130, 0.03) 50%, rgba(130, 130, 130, 0.03) 100%), linear-gradient(163deg, rgba(170, 170, 170, 0.08) 0%, rgba(170, 170, 170, 0.08) 50%, rgba(232, 232, 232, 0.08) 50%, rgba(232, 232, 232, 0.08) 100%), linear-gradient(152deg, rgba(12, 12, 12, 0.05) 0%, rgba(12, 12, 12, 0.05) 50%, rgba(161, 161, 161, 0.05) 50%, rgba(161, 161, 161, 0.05) 100%), linear-gradient(302deg, rgba(48, 48, 48, 0.1) 0%, rgba(48, 48, 48, 0.1) 50%, rgba(195, 195, 195, 0.1) 50%, rgba(195, 195, 195, 0.1) 100%), linear-gradient(90deg, rgb(144, 14, 253), rgb(74, 115, 255))"} },
    {
        list: [
            { css: { background: "linear-gradient(45deg, rgb(8, 38, 17) 0%, rgb(8, 38, 17) 14.286%,rgb(13, 64, 27) 14.286%, rgb(13, 64, 27) 28.572%,rgb(17, 91, 36) 28.572%, rgb(17, 91, 36) 42.858%,rgb(22, 117, 46) 42.858%, rgb(22, 117, 46) 57.144%,rgb(26, 143, 56) 57.144%, rgb(26, 143, 56) 71.43%,rgb(31, 170, 65) 71.43%, rgb(31, 170, 65) 85.716%,rgb(35, 196, 75) 85.716%, rgb(35, 196, 75) 100.002%)"}},
            { css: { background: "linear-gradient(45deg, rgb(2, 6, 1) 0%, rgb(2, 6, 1) 14.286%,rgb(8, 29, 31) 14.286%, rgb(8, 29, 31) 28.572%,rgb(13, 52, 61) 28.572%, rgb(13, 52, 61) 42.858%,rgb(19, 75, 92) 42.858%, rgb(19, 75, 92) 57.144%,rgb(25, 98, 122) 57.144%, rgb(25, 98, 122) 71.43%,rgb(30, 121, 152) 71.43%, rgb(30, 121, 152) 85.716%,rgb(36, 144, 182) 85.716%, rgb(36, 144, 182) 100.002%)"}},
        ],
        name: "Even Stripes", css: {  background: "linear-gradient(45deg, rgba(171, 212, 83, 0.7) 0%, rgba(171, 212, 83, 0.7) 12.5%, rgba(218, 229, 42, 0.7) 12.5%, rgba(218, 229, 42, 0.7) 25%, rgba(125, 195, 123, 0.7) 25%, rgba(125, 195, 123, 0.7) 37.5%, rgba(194, 221, 63, 0.7) 37.5%, rgba(194, 221, 63, 0.7) 50%, rgba(78, 178, 164, 0.7) 50%, rgba(78, 178, 164, 0.7) 62.5%, rgba(148, 204, 103, 0.7) 62.5%, rgba(148, 204, 103, 0.7) 75%, rgba(241, 238, 22, 0.7) 75%, rgba(241, 238, 22, 0.7) 87.5%, rgba(101, 187, 144, 0.7) 87.5%, rgba(101, 187, 144, 0.7) 100%), linear-gradient(0deg, rgb(73, 182, 19), rgb(231, 253, 15))"} },
    {
        list: [
            { css: { background: ""}},
            { css: { background: ""}},
        ],
        name: "Gingham (Traditional)", css: {  background: "repeating-linear-gradient(90deg, rgba(248, 86, 84, 0.5) 0px, rgba(248, 86, 84, 0.5) 20px, transparent 20px, transparent 40px), repeating-linear-gradient(0deg, rgba(248, 86, 84, 0.5) 0px, rgba(248, 86, 84, 0.5) 20px, transparent 20px, transparent 40px), linear-gradient(90deg, rgb(255, 255, 255), rgb(255, 255, 255))"} },
    {
        list: [
            { css: { background: ""}},
            { css: { background: ""}},
        ],
        name: "Gingham (Colored)", css: {  background: "repeating-linear-gradient(90deg, rgba(195, 246, 54, 0.5) 0px, rgba(195, 246, 54, 0.5) 30px, transparent 30px, transparent 60px), repeating-linear-gradient(0deg, rgba(195, 246, 54, 0.5) 0px, rgba(195, 246, 54, 0.5) 30px, transparent 30px, transparent 60px), linear-gradient(90deg, rgb(56, 159, 59), rgb(56, 159, 59))"} },
    {
        list: [
            { css: { background: ""}},
            { css: { background: ""}},
        ],
        name: "Basic Grid", css: {  background: "repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.15) 0px, rgba(255, 255, 255, 0.15) 1px, transparent 1px, transparent 36px), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.15) 0px, rgba(255, 255, 255, 0.15) 1px, transparent 1px, transparent 36px), linear-gradient(90deg, rgb(10, 89, 174), rgb(10, 89, 174))"} },
    {
        list: [{
            css: { background: ""},
            css: { background: ""},
        }],
        name: "Complex Shapes", css: {  background: "linear-gradient(45deg, rgba(87, 119, 152, 0.2) 0%, rgba(87, 119, 152, 0.2) 16.667%, rgba(16, 33, 135, 0.2) 16.667%, rgba(16, 33, 135, 0.2) 33.334%, rgba(52, 76, 143, 0.2) 33.334%, rgba(52, 76, 143, 0.2) 50.001%, rgba(194, 248, 177, 0.2) 50.001%, rgba(194, 248, 177, 0.2) 66.668%, rgba(158, 205, 169, 0.2) 66.668%, rgba(158, 205, 169, 0.2) 83.335%, rgba(123, 162, 160, 0.2) 83.335%, rgba(123, 162, 160, 0.2) 100.002%), linear-gradient(135deg, rgba(87, 119, 152, 0.2) 0%, rgba(87, 119, 152, 0.2) 16.667%, rgba(16, 33, 135, 0.2) 16.667%, rgba(16, 33, 135, 0.2) 33.334%, rgba(52, 76, 143, 0.2) 33.334%, rgba(52, 76, 143, 0.2) 50.001%, rgba(194, 248, 177, 0.2) 50.001%, rgba(194, 248, 177, 0.2) 66.668%, rgba(158, 205, 169, 0.2) 66.668%, rgba(158, 205, 169, 0.2) 83.335%, rgba(123, 162, 160, 0.2) 83.335%, rgba(123, 162, 160, 0.2) 100.002%), linear-gradient(0deg, rgba(87, 119, 152, 0.2) 0%, rgba(87, 119, 152, 0.2) 16.667%, rgba(16, 33, 135, 0.2) 16.667%, rgba(16, 33, 135, 0.2) 33.334%, rgba(52, 76, 143, 0.2) 33.334%, rgba(52, 76, 143, 0.2) 50.001%, rgba(194, 248, 177, 0.2) 50.001%, rgba(194, 248, 177, 0.2) 66.668%, rgba(158, 205, 169, 0.2) 66.668%, rgba(158, 205, 169, 0.2) 83.335%, rgba(123, 162, 160, 0.2) 83.335%, rgba(123, 162, 160, 0.2) 100.002%), linear-gradient(90deg, rgb(213, 156, 226), rgb(132, 69, 189))"} },
    {
        list: [{
            css: { background: ""},
            css: { background: ""},
        }],
        name: "Complex Repeating Stripes", css: {  background: "repeating-linear-gradient(45deg, rgba(208, 208, 208, 0.13) 0px, rgba(208, 208, 208, 0.13) 43px, rgba(195, 195, 195, 0.13) 43px, rgba(195, 195, 195, 0.13) 85px, rgba(41, 41, 41, 0.13) 85px, rgba(41, 41, 41, 0.13) 109px, rgba(88, 88, 88, 0.13) 109px, rgba(88, 88, 88, 0.13) 129px, rgba(24, 24, 24, 0.13) 129px, rgba(24, 24, 24, 0.13) 139px, rgba(92, 92, 92, 0.13) 139px, rgba(92, 92, 92, 0.13) 179px, rgba(37, 37, 37, 0.13) 179px, rgba(37, 37, 37, 0.13) 219px), repeating-linear-gradient(45deg, rgba(18, 18, 18, 0.13) 0px, rgba(18, 18, 18, 0.13) 13px, rgba(48, 48, 48, 0.13) 13px, rgba(48, 48, 48, 0.13) 61px, rgba(130, 130, 130, 0.13) 61px, rgba(130, 130, 130, 0.13) 84px, rgba(233, 233, 233, 0.13) 84px, rgba(233, 233, 233, 0.13) 109px, rgba(8, 8, 8, 0.13) 109px, rgba(8, 8, 8, 0.13) 143px, rgba(248, 248, 248, 0.13) 143px, rgba(248, 248, 248, 0.13) 173px, rgba(37, 37, 37, 0.13) 173px, rgba(37, 37, 37, 0.13) 188px), repeating-linear-gradient(45deg, rgba(3, 3, 3, 0.1) 0px, rgba(3, 3, 3, 0.1) 134px, rgba(82, 82, 82, 0.1) 134px, rgba(82, 82, 82, 0.1) 282px, rgba(220, 220, 220, 0.1) 282px, rgba(220, 220, 220, 0.1) 389px, rgba(173, 173, 173, 0.1) 389px, rgba(173, 173, 173, 0.1) 458px, rgba(109, 109, 109, 0.1) 458px, rgba(109, 109, 109, 0.1) 516px, rgba(240, 240, 240, 0.1) 516px, rgba(240, 240, 240, 0.1) 656px, rgba(205, 205, 205, 0.1) 656px, rgba(205, 205, 205, 0.1) 722px), linear-gradient(90deg, rgb(21, 145, 22), rgb(39, 248, 84))"} },
    {
        list: [{
            css: { background: ""},
            css: { background: ""},
        }],
        name: "Futeristic Stripes", css: {  background: "linear-gradient(90deg, rgba(6, 6, 6, 0.01) 0%, rgba(6, 6, 6, 0.01) 1%, rgba(131, 131, 131, 0.01) 1%, rgba(131, 131, 131, 0.01) 14%, rgba(250, 250, 250, 0.01) 14%, rgba(250, 250, 250, 0.01) 26%, rgba(30, 30, 30, 0.01) 26%, rgba(30, 30, 30, 0.01) 62%, rgba(117, 117, 117, 0.01) 62%, rgba(117, 117, 117, 0.01) 66%, rgba(248, 248, 248, 0.01) 66%, rgba(248, 248, 248, 0.01) 76%, rgba(39, 39, 39, 0.01) 76%, rgba(39, 39, 39, 0.01) 100%), linear-gradient(90deg, rgba(57, 57, 57, 0.06) 0%, rgba(57, 57, 57, 0.06) 4%, rgba(227, 227, 227, 0.06) 4%, rgba(227, 227, 227, 0.06) 26%, rgba(67, 67, 67, 0.06) 26%, rgba(67, 67, 67, 0.06) 27%, rgba(126, 126, 126, 0.06) 27%, rgba(126, 126, 126, 0.06) 39%, rgba(103, 103, 103, 0.06) 39%, rgba(103, 103, 103, 0.06) 72%, rgba(16, 16, 16, 0.06) 72%, rgba(16, 16, 16, 0.06) 76%, rgba(21, 21, 21, 0.06) 76%, rgba(21, 21, 21, 0.06) 88%, rgba(69, 69, 69, 0.06) 88%, rgba(69, 69, 69, 0.06) 100%), linear-gradient(90deg, rgba(156, 156, 156, 0.05) 0%, rgba(156, 156, 156, 0.05) 12%, rgba(54, 54, 54, 0.05) 12%, rgba(54, 54, 54, 0.05) 48%, rgba(169, 169, 169, 0.05) 48%, rgba(169, 169, 169, 0.05) 59%, rgba(104, 104, 104, 0.05) 59%, rgba(104, 104, 104, 0.05) 62%, rgba(165, 165, 165, 0.05) 62%, rgba(165, 165, 165, 0.05) 68%, rgba(124, 124, 124, 0.05) 68%, rgba(124, 124, 124, 0.05) 77%, rgba(189, 189, 189, 0.05) 77%, rgba(189, 189, 189, 0.05) 85%, rgba(173, 173, 173, 0.05) 85%, rgba(173, 173, 173, 0.05) 100%), linear-gradient(90deg, rgba(182, 182, 182, 0.07) 0%, rgba(182, 182, 182, 0.07) 22%, rgba(122, 122, 122, 0.07) 22%, rgba(122, 122, 122, 0.07) 28%, rgba(62, 62, 62, 0.07) 28%, rgba(62, 62, 62, 0.07) 44%, rgba(89, 89, 89, 0.07) 44%, rgba(89, 89, 89, 0.07) 61%, rgba(110, 110, 110, 0.07) 61%, rgba(110, 110, 110, 0.07) 83%, rgba(185, 185, 185, 0.07) 83%, rgba(185, 185, 185, 0.07) 86%, rgba(192, 192, 192, 0.07) 86%, rgba(192, 192, 192, 0.07) 100%), linear-gradient(90deg, rgba(8, 8, 8, 0.06) 0%, rgba(8, 8, 8, 0.06) 54%, rgba(48, 48, 48, 0.06) 54%, rgba(48, 48, 48, 0.06) 57%, rgba(245, 245, 245, 0.06) 57%, rgba(245, 245, 245, 0.06) 86%, rgba(12, 12, 12, 0.06) 86%, rgba(12, 12, 12, 0.06) 94%, rgba(225, 225, 225, 0.06) 94%, rgba(225, 225, 225, 0.06) 100%), linear-gradient(90deg, rgb(53, 169, 225) 0%, rgb(1, 145, 219) 80%, rgb(26, 221, 247) 100%)"} },
    {
        list: [{
            css: { background: ""},
            css: { background: ""},
        }],
        name: "Uneven Diamonds", css: {  background: "linear-gradient(134deg, rgba(110, 49, 41, 0.5) 0%, rgba(110, 49, 41, 0.5) 14.286%, rgba(134, 48, 65, 0.5) 14.286%, rgba(134, 48, 65, 0.5) 28.572%, rgba(157, 46, 89, 0.5) 28.572%, rgba(157, 46, 89, 0.5) 42.858%, rgba(181, 45, 113, 0.5) 42.858%, rgba(181, 45, 113, 0.5) 57.144%, rgba(204, 43, 136, 0.5) 57.144%, rgba(204, 43, 136, 0.5) 71.43%, rgba(228, 42, 160, 0.5) 71.43%, rgba(228, 42, 160, 0.5) 85.716%, rgba(251, 40, 184, 0.5) 85.716%, rgba(251, 40, 184, 0.5) 100.002%), linear-gradient(122deg, rgb(223, 89, 139) 0%, rgb(223, 89, 139) 14.286%, rgb(195, 88, 127) 14.286%, rgb(195, 88, 127) 28.572%, rgb(167, 87, 116) 28.572%, rgb(167, 87, 116) 42.858%, rgb(140, 87, 104) 42.858%, rgb(140, 87, 104) 57.144%, rgb(112, 86, 92) 57.144%, rgb(112, 86, 92) 71.43%, rgb(84, 85, 81) 71.43%, rgb(84, 85, 81) 85.716%, rgb(56, 84, 69) 85.716%, rgb(56, 84, 69) 100.002%)"} },
    {
        list: [{
            css: { background: ""},
            css: { background: ""},
        }],
        name: "Light Background", css: {  background: "linear-gradient(22.5deg, rgba(67, 67, 67, 0.02) 0%, rgba(67, 67, 67, 0.02) 29%, rgba(47, 47, 47, 0.02) 29%, rgba(47, 47, 47, 0.02) 37%, rgba(23, 23, 23, 0.02) 37%, rgba(23, 23, 23, 0.02) 55%, rgba(182, 182, 182, 0.02) 55%, rgba(182, 182, 182, 0.02) 69%, rgba(27, 27, 27, 0.02) 69%, rgba(27, 27, 27, 0.02) 71%, rgba(250, 250, 250, 0.02) 71%, rgba(250, 250, 250, 0.02) 100%), linear-gradient(67.5deg, rgba(117, 117, 117, 0.02) 0%, rgba(117, 117, 117, 0.02) 14%, rgba(199, 199, 199, 0.02) 14%, rgba(199, 199, 199, 0.02) 40%, rgba(33, 33, 33, 0.02) 40%, rgba(33, 33, 33, 0.02) 48%, rgba(135, 135, 135, 0.02) 48%, rgba(135, 135, 135, 0.02) 60%, rgba(148, 148, 148, 0.02) 60%, rgba(148, 148, 148, 0.02) 95%, rgba(53, 53, 53, 0.02) 95%, rgba(53, 53, 53, 0.02) 100%), linear-gradient(135deg, rgba(190, 190, 190, 0.02) 0%, rgba(190, 190, 190, 0.02) 6%, rgba(251, 251, 251, 0.02) 6%, rgba(251, 251, 251, 0.02) 18%, rgba(2, 2, 2, 0.02) 18%, rgba(2, 2, 2, 0.02) 27%, rgba(253, 253, 253, 0.02) 27%, rgba(253, 253, 253, 0.02) 49%, rgba(128, 128, 128, 0.02) 49%, rgba(128, 128, 128, 0.02) 76%, rgba(150, 150, 150, 0.02) 76%, rgba(150, 150, 150, 0.02) 100%), linear-gradient(90deg, rgb(255, 255, 255), rgb(255, 255, 255))"} },
    {
        list: [{
            css: { background: ""},
            css: { background: ""},
        }],
        name: "Standard-Rainbow", css: {  background: "linear-gradient(90deg, rgb(98, 229, 249), rgb(98, 115, 249), rgb(194, 98, 249), rgb(249, 98, 191), rgb(249, 118, 98), rgb(249, 232, 98), rgb(153, 249, 98), rgb(98, 249, 156))"} },
    {
        list: [{
            css: { background: ""},
            css: { background: ""},
        }],
        name: "Repeating Stripes", css: {  background: "repeating-linear-gradient(90deg, rgb(95, 152, 225) 0px, rgb(95, 152, 225) 10px, rgb(115, 164, 229) 10px, rgb(115, 164, 229) 20px, rgb(135, 175, 233) 20px, rgb(135, 175, 233) 30px, rgb(214, 222, 250) 30px, rgb(214, 222, 250) 40px, rgb(174, 199, 242) 40px, rgb(174, 199, 242) 50px, rgb(155, 187, 238) 50px, rgb(155, 187, 238) 60px, rgb(194, 210, 246) 60px, rgb(194, 210, 246) 70px)"} },
    {
        list: [{
            css: { background: ""},
            css: { background: ""},
        }],
        name: "Fracture", css: {  background: "linear-gradient(52deg, rgba(163, 163, 163, 0.09) 0%, rgba(163, 163, 163, 0.09) 33.3%, rgba(100, 100, 100, 0.09) 33.3%, rgba(100, 100, 100, 0.09) 66.6%, rgba(162, 162, 162, 0.09) 66.6%, rgba(162, 162, 162, 0.09) 99%), linear-gradient(258deg, rgba(193, 193, 193, 0.06) 0%, rgba(193, 193, 193, 0.06) 33.3%, rgba(169, 169, 169, 0.06) 33.3%, rgba(169, 169, 169, 0.06) 66.6%, rgba(92, 92, 92, 0.06) 66.6%, rgba(92, 92, 92, 0.06) 99%), linear-gradient(129deg, rgba(45, 45, 45, 0.03) 0%, rgba(45, 45, 45, 0.03) 33.3%, rgba(223, 223, 223, 0.03) 33.3%, rgba(223, 223, 223, 0.03) 66.6%, rgba(173, 173, 173, 0.03) 66.6%, rgba(173, 173, 173, 0.03) 99%), linear-gradient(280deg, rgba(226, 226, 226, 0.06) 0%, rgba(226, 226, 226, 0.06) 33.3%, rgba(81, 81, 81, 0.06) 33.3%, rgba(81, 81, 81, 0.06) 66.6%, rgba(186, 186, 186, 0.06) 66.6%, rgba(186, 186, 186, 0.06) 99%), linear-gradient(85deg, rgba(225, 225, 225, 0.04) 0%, rgba(225, 225, 225, 0.04) 33.3%, rgba(95, 95, 95, 0.04) 33.3%, rgba(95, 95, 95, 0.04) 66.6%, rgba(39, 39, 39, 0.04) 66.6%, rgba(39, 39, 39, 0.04) 99%), linear-gradient(128deg, rgba(184, 184, 184, 0.06) 0%, rgba(184, 184, 184, 0.06) 33.3%, rgba(0, 0, 0, 0.06) 33.3%, rgba(0, 0, 0, 0.06) 66.6%, rgba(140, 140, 140, 0.06) 66.6%, rgba(140, 140, 140, 0.06) 99.9%), linear-gradient(323deg, rgba(40, 40, 40, 0.07) 0%, rgba(40, 40, 40, 0.07) 33.3%, rgba(214, 214, 214, 0.07) 33.3%, rgba(214, 214, 214, 0.07) 66.6%, rgba(190, 190, 190, 0.07) 66.6%, rgba(190, 190, 190, 0.07) 99.9%), linear-gradient(61deg, rgba(230, 230, 230, 0) 0%, rgba(230, 230, 230, 0) 33.3%, rgba(241, 241, 241, 0) 33.3%, rgba(241, 241, 241, 0) 66.6%, rgba(55, 55, 55, 0) 66.6%, rgba(55, 55, 55, 0) 99%), linear-gradient(0deg, rgb(38, 37, 227), rgb(11, 186, 239))"} },
    {
        list: [{
            css: { background: ""},
            css: { background: ""},
        }],
        name: "Complex Grid", css: {  background: "repeating-linear-gradient(67.5deg, rgba(252, 252, 252, 0.05) 0px, rgba(252, 252, 252, 0.05) 1px, transparent 1px, transparent 54px), repeating-linear-gradient(157.5deg, rgba(252, 252, 252, 0.05) 0px, rgba(252, 252, 252, 0.05) 1px, transparent 1px, transparent 54px), repeating-linear-gradient(67.5deg, rgba(252, 252, 252, 0.05) 0px, rgba(252, 252, 252, 0.05) 1px, transparent 1px, transparent 25px), repeating-linear-gradient(0deg, rgba(252, 252, 252, 0.05) 0px, rgba(252, 252, 252, 0.05) 1px, transparent 1px, transparent 25px), repeating-linear-gradient(67.5deg, rgba(252, 252, 252, 0.05) 0px, rgba(252, 252, 252, 0.05) 1px, transparent 1px, transparent 12px), repeating-linear-gradient(157.5deg, rgba(252, 252, 252, 0.05) 0px, rgba(252, 252, 252, 0.05) 1px, transparent 1px, transparent 12px), linear-gradient(90deg, rgb(86, 53, 156), rgb(86, 53, 156))"} },
    {
        list: [{
            css: { background: ""},
            css: { background: ""},
        }],
        name: "Standard Circles", css: {  background: "radial-gradient(circle at center top, rgb(244, 234, 104), rgb(234, 179, 103), rgb(224, 125, 103), rgb(214, 70, 102), rgb(204, 15, 101))"} },
]
let $customizations = {
    btn: {
        type: false,
        container: null
    },
    nav: {
        type: false,
        container: null
    },
    list: {
        container: false,
        type: false,
    },
    container: {
        $: null,
        bg: false,
        add_component: false
    },
    img: {
        container: false
    },
    _container: null,
    _list: false,
    _list1: false,
    _list2: false
}
let $handle = {
    $: null,
    mousedown: false,
    initialX: null, initialY: null,
    currentX: null, currentY: null,
    xOffset: null, yOffset: 0

}
let $event = {
    mouseenter: {
        target: null,
        relatedTarget: null
    }
}
let $workspace_active_page = 0
function $hasParentClass(elem, classname) {
    try {
        if (elem.className.split(' ').indexOf(classname)>=0) return true;
        return elem.parentNode && this.$hasParentClass(elem.parentNode, classname);
    }
    catch(err) {
        return false
    }
}
function $hasTag(elem, tag) {
    try {
        if (elem.tagName === tag) return true;
        return elem.parentNode && this.$hasTag(elem.parentNode, tag);
    }
    catch(err) {
        return false
    }

}
function $getAttrList(target) {
    let obj = {
        name: [],
        value: []
    }
    $(target).each(function() {
        $.each(this.attributes, function() {
            if(this.specified) {
                obj.name.push(this.name)
                obj.value.push(this.value)
            }
        });
        });                        
    return obj
}
function $getGlobalClass(target, start_with) {
    let c_list = target.attr('class').split(" ")
    for(let i=0; i<c_list.length; i++) {
        if(c_list[i].startsWith(start_with)) {
            return c_list[i]
        }
    }
    return start_with

}
function $getColClass(target) {
    let c_list = target.attr('class').split(" ")
    for(let i=0; i<c_list.length; i++) {
        if(c_list[i].includes('col-md')) {
            return c_list[i]
        }
    }
    return -1
}
function $createColorPalette() {
    let input = $('<input>')
    input.attr('type', 'color')
    input.css({
        display: 'none'
    })
    $(document.body).append(input)
    input.trigger('click')
    return input
}
function $readImgURL(input, src = null, isBG) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();        
        reader.onload = function(e) {
            if(src) {
                if(!isBG) {
                    if(src.target) {
                        $(src.target).attr('src', e.target.result)
                    } else {
                        $(src).attr("src", e.target.result)
                    }    
                } else if(isBG.setAsBG) {
                    $(src.target).css("background", 'url('+ e.target.result+') no-repeat center')
                    $(src.target).css("backgroundSize", '100%')
                }    
            }
            console.log('hello there', e.target.result)
            return e.target.result
        }                
        reader.readAsDataURL(input.files[0]);
    }
}
function $readImgURLSVG(input, callback) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();        
        reader.onload = function(e) {
            callback(e.target.result)
        }                
        reader.readAsDataURL(input.files[0]);
    }
}
function $uploadImgFile(ev = null, isBG) {
    let input = $("<input>")
    input.attr("type", "file")
    $(document.body).append(input)
    input.addClass("display-none")
    input.click()
    input.change(function(e) {
        $readImgURL(this, ev, isBG)
        $(this).remove()
    })
    return input
}
function $FS_img_preview(img) {
    let container = $("<div>")
    container.css({
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.75)"
    })
    container.addClass("container-fluid d-flex justify-content-center")
    let prev_img = $(img).clone()
    prev_img.css({
        width: '1020px',
    })
    prev_img.addClass("align-self-center")
    container.append(prev_img)
    $(document.body).append(container)
    container.click(() => {
        container.remove()
    })
}
function $uploadImgSVG(callback) {
    let input = $("<input>")
    input.attr("type", "file")
    $(document.body).append(input)
    input.addClass("display-none")
    input.click()
    input.change(function(e) {
        $readImgURLSVG(this, callback)
        $(this).remove()
    })
}
function $draggableHandle(e) {
    let offset = $(e.target).offset(),
        width = $(e.target).outerWidth(),
        height = $(e.target).outerHeight()
    if($handle.$) {
        $handle.$.remove()
    }
    let btn = $("<button>")
    btn.css({
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        background: "rgb(0, 134, 230)",
        border: "2px solid white",
        position: "absolute",
        top: (offset.top + (height/2) - 15) + 'px',
        left: (offset.left + width - 12) + 'px',
        display: "block"
    })
    $(document.body).append(btn)
    btn.mousedown((ev) => {
        $handle.mousedown = true
        let width = $(e.target).width()
        $handle.xOffset = width
        $handle.initialX = ev.clientX - $handle.xOffset
        $handle.initialY = ev.clientY - $handle.yOffset
    })
    btn.mousemove((ev) => {
        if($handle.mousedown) {
            $handle.currentX = ev.clientX - $handle.initialX
            $handle.currentY = ev.clientY - $handle.initialY
            $handle.xOffset = $handle.currentX
            $handle.yOffset = $handle.currentY
            $(e.target).css("max-width", $handle.currentX)
            $(e.target).css("width", $handle.currentX)
            offset = $(e.target).offset(),
            width = $(e.target).outerWidth()
            btn.css("left", (offset.left + width - 12))
        }
    })
    btn.mouseup(() => {
        $handle.mousedown = false
        $handle.initialX = null
        $handle.xOffset = null,
        $handle.currentX = null
    })
    $(document.body).mouseup(() => {
        $handle.mousedown = false
    })    
    $(e.target).mouseleave(() => {
        setInterval(() => {
        if(!$handle.mousedown)
            btn.remove()
        }, 50);
    })
    $handle.$ = btn
    return btn
}
function $customizations_setup_container(e) {
    e = e.target
    let parent_div = $("<div>"),
        child_div = $("<div>")
    
    parent_div.append(child_div)
    $(document.body).append(parent_div)
    parent_div.addClass('proto-container-1')
    child_div.addClass('proto-container-child-1')
    let offset = $(e).offset(), height = $(e).outerHeight(), width = $(parent_div).width()

    if(offset.left + $(parent_div).width() > $(window).width()) {
        offset.left = $(window).width() - $(parent_div).width() - 50
    }
    if($(e).attr("container-type") === "header-container") {
        parent_div.css("top", (offset.top + height - $(parent_div).outerHeight() - 50) + 'px')
        .css("left", (offset.left)   + 'px')
    } else {
        parent_div.css({
            top: (offset.top + height - 10) + 'px',
            left: (offset.left + ($(e).outerWidth()/2) - 10)   + 'px'
        })    
    }
    $autoHide(e, parent_div)
    $customizations._container = parent_div

    return {
        child: child_div, 
        parent: parent_div
    }
}
function $textCustomizations(e) {
    if($customizations._container) {
        $customizations._container.remove()
    }
    if(!($(e.target).attr("component-type") === "text" || $(e.target).attr("component-type") === "text-container")) return
    $customizations._list = false
    let container = $customizations_setup_container(e)
    let text_types_arr = [
        {name: "Normal Text", css: { fontSize: "20px", fontWeight: "500"} }, 
        {name: "Title", css: { fontSize: "40px", fontWeight: "bold"} }, 
        {name: "Heading", css: {fontSize: "30px"} }, 
        {name: "Small", css: { fontSize: "12px", fontWeight: "lighter"} },
    ]
    let add_text = null,
        add_img = null,
        align_left = null,
        align_right = null,
        align_center = null,
        font_bold = null,
        font_italic = null,
        font_underline = null
    $addColors(e.target, container.child)
    let text_type_btn = $addTxtBtn(container.child, {text: "Title", dropdown: true }, { left: true, right: true})
    $(e.target).attr("component-type") === "text-container" ? add_text = $addIcoBtn(e, container.child, 'icon-type') : ""
    $(e.target).attr("component-type") === "text-container" ? add_img = $addIcoBtn(e, container.child, 'icon-image') : ""
    $(e.target).attr("component-type") === "text" ? font_bold = $addIcoBtn(e, container.child, 'icon-format-bold') : ""
    $(e.target).attr("component-type") === "text" ? font_italic = $addIcoBtn(e, container.child, 'icon-format-italic') : ""
    $(e.target).attr("component-type") === "text" ? font_underline = $addIcoBtn(e, container.child, 'icon-format-underline', { right: true }) : ""
    $(e.target).attr("component-type") === "text" ? align_left = $addIcoBtn(e, container.child, 'icon-align-left' ) : ""
    $(e.target).attr("component-type") === "text" ? align_center = $addIcoBtn(e, container.child, 'icon-align-center') : ""
    $(e.target).attr("component-type") === "text" ? align_right = $addIcoBtn(e, container.child, 'icon-align-right', { right: true }) : ""

    let delete_btn = $addIcoBtn(e, container.child, 'icon-delete')


    text_type_btn.click((ev) => {
        $customizations._list = true
        let list_btns = $generateList(ev, text_types_arr)
        for(let i=0; i<list_btns.length; i++) {
            list_btns[i].click(() => {
                if($(e.target).attr("component-type") === "text-container") {
                    $(e.target).find("[component-type='text']").css(text_types_arr[i].css)
                } else {
                    $(e.target).css(text_types_arr[i].css)
                }
                text_type_btn.find("span").html(text_types_arr[i].name)

            })

        }
    })
    if(add_text) {
        add_text.click((ev) => {
            let clone_text = $(e.target).find("[component-type='text']").clone()
            $(e.target).append(clone_text[0])
        })
    }
    if(add_img) {
        add_img.click(() => {
            add_img.attr("insert-component", "img")
            add_img.attr("insert-to", $(e.target).attr("component-id"))
        })
    }
    delete_btn.click(() => {
        $(e.target).remove()
    })
    container.parent.mouseleave(() => { if(!$customizations._list) container.parent.remove() })
}
function $headerCustomizations(e) {
    if($customizations._container) {
        $customizations._container.remove()
    }
    $customizations._list1 = false
    $customizations._list2 = false
    let backgrounds = [
        {   list: [
            { css: { background: "radial-gradient(circle at 16% 83%, rgba(148, 148, 148,0.06) 0%, rgba(148, 148, 148,0.06) 50%,rgba(63, 63, 63,0.06) 50%, rgba(63, 63, 63,0.06) 100%),radial-gradient(circle at 68% 87%, rgba(66, 66, 66,0.06) 0%, rgba(66, 66, 66,0.06) 50%,rgba(105, 105, 105,0.06) 50%, rgba(105, 105, 105,0.06) 100%),radial-gradient(circle at 38% 50%, rgba(123, 123, 123,0.06) 0%, rgba(123, 123, 123,0.06) 50%,rgba(172, 172, 172,0.06) 50%, rgba(172, 172, 172,0.06) 100%),linear-gradient(90deg, hsl(18,0%,1%),hsl(18,0%,1%))"}},
            { css: { background: "repeating-linear-gradient(90deg, hsla(240,0%,35%,0.05) 0px, hsla(240,0%,35%,0.05) 1px,transparent 1px, transparent 91px),repeating-linear-gradient(45deg, hsla(240,0%,35%,0.05) 0px, hsla(240,0%,35%,0.05) 1px,transparent 1px, transparent 91px),repeating-linear-gradient(0deg, hsla(240,0%,35%,0.05) 0px, hsla(240,0%,35%,0.05) 1px,transparent 1px, transparent 61px),repeating-linear-gradient(90deg, hsla(240,0%,35%,0.05) 0px, hsla(240,0%,35%,0.05) 1px,transparent 1px, transparent 61px),repeating-linear-gradient(90deg, hsla(240,0%,35%,0.05) 0px, hsla(240,0%,35%,0.05) 1px,transparent 1px, transparent 16px),repeating-linear-gradient(0deg, hsla(240,0%,35%,0.05) 0px, hsla(240,0%,35%,0.05) 1px,transparent 1px, transparent 16px),linear-gradient(90deg, hsl(83,8%,8%),hsl(83,8%,8%))"}},
            { css: { background: "linear-gradient(45deg, rgba(86, 86, 86,0.04) 0%, rgba(86, 86, 86,0.04) 50%,rgba(169, 169, 169,0.04) 50%, rgba(169, 169, 169,0.04) 71%,rgba(251, 251, 251,0.04) 71%, rgba(251, 251, 251,0.04) 100%),linear-gradient(45deg, rgba(86, 86, 86,0.04) 0%, rgba(86, 86, 86,0.04) 56%,rgba(169, 169, 169,0.04) 56%, rgba(169, 169, 169,0.04) 67%,rgba(251, 251, 251,0.04) 67%, rgba(251, 251, 251,0.04) 100%),linear-gradient(135deg, rgba(86, 86, 86,0.04) 0%, rgba(86, 86, 86,0.04) 4%,rgba(169, 169, 169,0.04) 4%, rgba(169, 169, 169,0.04) 75%,rgba(251, 251, 251,0.04) 75%, rgba(251, 251, 251,0.04) 100%),linear-gradient(90deg, rgb(0,0,0),rgb(0,0,0))"}},
            { css: { background: "repeating-linear-gradient(135deg, rgba(145, 145, 145, 0.02) 0px, rgba(145, 145, 145, 0.02) 39px,rgba(140, 140, 140, 0.02) 39px, rgba(140, 140, 140, 0.02) 57px,rgba(9, 9, 9, 0.02) 57px, rgba(9, 9, 9, 0.02) 91px,rgba(217, 217, 217, 0.02) 91px, rgba(217, 217, 217, 0.02) 119px,rgba(45, 45, 45, 0.02) 119px, rgba(45, 45, 45, 0.02) 141px,rgba(227, 227, 227, 0.02) 141px, rgba(227, 227, 227, 0.02) 184px,rgba(236, 236, 236, 0.02) 184px, rgba(236, 236, 236, 0.02) 227px,rgba(124, 124, 124, 0.02) 227px, rgba(124, 124, 124, 0.02) 244px),repeating-linear-gradient(135deg, rgba(39, 39, 39, 0.02) 0px, rgba(39, 39, 39, 0.02) 23px,rgba(2, 2, 2, 0.02) 23px, rgba(2, 2, 2, 0.02) 55px,rgba(13, 13, 13, 0.02) 55px, rgba(13, 13, 13, 0.02) 71px,rgba(44, 44, 44, 0.02) 71px, rgba(44, 44, 44, 0.02) 98px,rgba(240, 240, 240, 0.02) 98px, rgba(240, 240, 240, 0.02) 134px,rgba(182, 182, 182, 0.02) 134px, rgba(182, 182, 182, 0.02) 159px,rgba(246, 246, 246, 0.02) 159px, rgba(246, 246, 246, 0.02) 174px,rgba(157, 157, 157, 0.02) 174px, rgba(157, 157, 157, 0.02) 190px),repeating-linear-gradient(135deg, rgba(145, 145, 145, 0.02) 0px, rgba(145, 145, 145, 0.02) 35px,rgba(217, 217, 217, 0.02) 35px, rgba(217, 217, 217, 0.02) 53px,rgba(199, 199, 199, 0.02) 53px, rgba(199, 199, 199, 0.02) 70px,rgba(196, 196, 196, 0.02) 70px, rgba(196, 196, 196, 0.02) 114px,rgba(137, 137, 137, 0.02) 114px, rgba(137, 137, 137, 0.02) 143px,rgba(249, 249, 249, 0.02) 143px, rgba(249, 249, 249, 0.02) 191px,rgba(247, 247, 247, 0.02) 191px, rgba(247, 247, 247, 0.02) 239px,rgba(38, 38, 38, 0.02) 239px, rgba(38, 38, 38, 0.02) 273px),linear-gradient(90deg, rgb(69, 69, 69),rgb(3, 3, 3))"}},
            { css: { background: "repeating-linear-gradient(0deg, hsla(347,0%,33%,0.05) 0px, hsla(347,0%,33%,0.05) 50px,transparent 50px, transparent 100px),repeating-linear-gradient(90deg, hsla(347,0%,33%,0.05) 0px, hsla(347,0%,33%,0.05) 50px,transparent 50px, transparent 100px),linear-gradient(90deg, hsl(139,0%,18%),hsl(139,0%,18%))"}},
            ],
            name: "Dark Background", css: { background: "linear-gradient(323deg, rgba(255, 255, 255, 0.01) 0%, rgba(255, 255, 255, 0.01) 16.667%, rgba(46, 46, 46, 0.01) 16.667%, rgba(46, 46, 46, 0.01) 33.334%, rgba(226, 226, 226, 0.01) 33.334%, rgba(226, 226, 226, 0.01) 50.001%, rgba(159, 159, 159, 0.01) 50.001%, rgba(159, 159, 159, 0.01) 66.668%, rgba(149, 149, 149, 0.01) 66.668%, rgba(149, 149, 149, 0.01) 83.335%, rgba(43, 43, 43, 0.01) 83.335%, rgba(43, 43, 43, 0.01) 100.002%), linear-gradient(346deg, rgba(166, 166, 166, 0.03) 0%, rgba(166, 166, 166, 0.03) 25%, rgba(240, 240, 240, 0.03) 25%, rgba(240, 240, 240, 0.03) 50%, rgba(121, 121, 121, 0.03) 50%, rgba(121, 121, 121, 0.03) 75%, rgba(40, 40, 40, 0.03) 75%, rgba(40, 40, 40, 0.03) 100%), linear-gradient(347deg, rgba(209, 209, 209, 0.01) 0%, rgba(209, 209, 209, 0.01) 25%, rgba(22, 22, 22, 0.01) 25%, rgba(22, 22, 22, 0.01) 50%, rgba(125, 125, 125, 0.01) 50%, rgba(125, 125, 125, 0.01) 75%, rgba(205, 205, 205, 0.01) 75%, rgba(205, 205, 205, 0.01) 100%), linear-gradient(84deg, rgba(195, 195, 195, 0.01) 0%, rgba(195, 195, 195, 0.01) 14.286%, rgba(64, 64, 64, 0.01) 14.286%, rgba(64, 64, 64, 0.01) 28.572%, rgba(67, 67, 67, 0.01) 28.572%, rgba(67, 67, 67, 0.01) 42.858%, rgba(214, 214, 214, 0.01) 42.858%, rgba(214, 214, 214, 0.01) 57.144%, rgba(45, 45, 45, 0.01) 57.144%, rgba(45, 45, 45, 0.01) 71.43%, rgba(47, 47, 47, 0.01) 71.43%, rgba(47, 47, 47, 0.01) 85.716%, rgba(172, 172, 172, 0.01) 85.716%, rgba(172, 172, 172, 0.01) 100.002%), linear-gradient(73deg, rgba(111, 111, 111, 0.03) 0%, rgba(111, 111, 111, 0.03) 16.667%, rgba(202, 202, 202, 0.03) 16.667%, rgba(202, 202, 202, 0.03) 33.334%, rgba(57, 57, 57, 0.03) 33.334%, rgba(57, 57, 57, 0.03) 50.001%, rgba(197, 197, 197, 0.03) 50.001%, rgba(197, 197, 197, 0.03) 66.668%, rgba(97, 97, 97, 0.03) 66.668%, rgba(97, 97, 97, 0.03) 83.335%, rgba(56, 56, 56, 0.03) 83.335%, rgba(56, 56, 56, 0.03) 100.002%), linear-gradient(132deg, rgba(88, 88, 88, 0.03) 0%, rgba(88, 88, 88, 0.03) 20%, rgba(249, 249, 249, 0.03) 20%, rgba(249, 249, 249, 0.03) 40%, rgba(2, 2, 2, 0.03) 40%, rgba(2, 2, 2, 0.03) 60%, rgba(185, 185, 185, 0.03) 60%, rgba(185, 185, 185, 0.03) 80%, rgba(196, 196, 196, 0.03) 80%, rgba(196, 196, 196, 0.03) 100%), linear-gradient(142deg, rgba(160, 160, 160, 0.03) 0%, rgba(160, 160, 160, 0.03) 12.5%, rgba(204, 204, 204, 0.03) 12.5%, rgba(204, 204, 204, 0.03) 25%, rgba(108, 108, 108, 0.03) 25%, rgba(108, 108, 108, 0.03) 37.5%, rgba(191, 191, 191, 0.03) 37.5%, rgba(191, 191, 191, 0.03) 50%, rgba(231, 231, 231, 0.03) 50%, rgba(231, 231, 231, 0.03) 62.5%, rgba(70, 70, 70, 0.03) 62.5%, rgba(70, 70, 70, 0.03) 75%, rgba(166, 166, 166, 0.03) 75%, rgba(166, 166, 166, 0.03) 87.5%, rgba(199, 199, 199, 0.03) 87.5%, rgba(199, 199, 199, 0.03) 100%), linear-gradient(238deg, rgba(116, 116, 116, 0.02) 0%, rgba(116, 116, 116, 0.02) 20%, rgba(141, 141, 141, 0.02) 20%, rgba(141, 141, 141, 0.02) 40%, rgba(152, 152, 152, 0.02) 40%, rgba(152, 152, 152, 0.02) 60%, rgba(61, 61, 61, 0.02) 60%, rgba(61, 61, 61, 0.02) 80%, rgba(139, 139, 139, 0.02) 80%, rgba(139, 139, 139, 0.02) 100%), linear-gradient(188deg, rgba(227, 227, 227, 0.01) 0%, rgba(227, 227, 227, 0.01) 20%, rgba(105, 105, 105, 0.01) 20%, rgba(105, 105, 105, 0.01) 40%, rgba(72, 72, 72, 0.01) 40%, rgba(72, 72, 72, 0.01) 60%, rgba(33, 33, 33, 0.01) 60%, rgba(33, 33, 33, 0.01) 80%, rgba(57, 57, 57, 0.01) 80%, rgba(57, 57, 57, 0.01) 100%), linear-gradient(90deg, rgb(33, 33, 33), rgb(33, 33, 33))" }
        }, 

        {
            list: [
                { css: { background: "repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.11) 0px, rgba(0, 0, 0, 0.11) 12px, rgba(1, 1, 1, 0.16) 12px, rgba(1, 1, 1, 0.16) 24px, rgba(0, 0, 0, 0.14) 24px, rgba(0, 0, 0, 0.14) 36px, rgba(0, 0, 0, 0.23) 36px, rgba(0, 0, 0, 0.23) 48px, rgba(0, 0, 0, 0.12) 48px, rgba(0, 0, 0, 0.12) 60px, rgba(1, 1, 1, 0.07) 60px, rgba(1, 1, 1, 0.07) 72px, rgba(0, 0, 0, 0.21) 72px, rgba(0, 0, 0, 0.21) 84px, rgba(0, 0, 0, 0.24) 84px, rgba(0, 0, 0, 0.24) 96px, rgba(1, 1, 1, 0.23) 96px, rgba(1, 1, 1, 0.23) 108px, rgba(1, 1, 1, 0.07) 108px, rgba(1, 1, 1, 0.07) 120px, rgba(0, 0, 0, 0.01) 120px, rgba(0, 0, 0, 0.01) 132px, rgba(1, 1, 1, 0.22) 132px, rgba(1, 1, 1, 0.22) 144px, rgba(1, 1, 1, 0.24) 144px, rgba(1, 1, 1, 0.24) 156px, rgba(0, 0, 0, 0) 156px, rgba(0, 0, 0, 0) 168px, rgba(0, 0, 0, 0.12) 168px, rgba(0, 0, 0, 0.12) 180px), repeating-linear-gradient(90deg, rgba(1, 1, 1, 0.01) 0px, rgba(1, 1, 1, 0.01) 12px, rgba(1, 1, 1, 0.15) 12px, rgba(1, 1, 1, 0.15) 24px, rgba(0, 0, 0, 0.09) 24px, rgba(0, 0, 0, 0.09) 36px, rgba(0, 0, 0, 0.02) 36px, rgba(0, 0, 0, 0.02) 48px, rgba(0, 0, 0, 0.1) 48px, rgba(0, 0, 0, 0.1) 60px, rgba(1, 1, 1, 0.07) 60px, rgba(1, 1, 1, 0.07) 72px, rgba(1, 1, 1, 0.15) 72px, rgba(1, 1, 1, 0.15) 84px, rgba(0, 0, 0, 0.18) 84px, rgba(0, 0, 0, 0.18) 96px, rgba(1, 1, 1, 0.15) 96px, rgba(1, 1, 1, 0.15) 108px, rgba(1, 1, 1, 0.09) 108px, rgba(1, 1, 1, 0.09) 120px, rgba(1, 1, 1, 0.07) 120px, rgba(1, 1, 1, 0.07) 132px, rgba(1, 1, 1, 0.05) 132px, rgba(1, 1, 1, 0.05) 144px, rgba(0, 0, 0, 0.1) 144px, rgba(0, 0, 0, 0.1) 156px, rgba(1, 1, 1, 0.18) 156px, rgba(1, 1, 1, 0.18) 168px), repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.24) 0px, rgba(0, 0, 0, 0.24) 16px, rgba(1, 1, 1, 0.06) 16px, rgba(1, 1, 1, 0.06) 32px, rgba(0, 0, 0, 0.16) 32px, rgba(0, 0, 0, 0.16) 48px, rgba(1, 1, 1, 0) 48px, rgba(1, 1, 1, 0) 64px, rgba(1, 1, 1, 0.12) 64px, rgba(1, 1, 1, 0.12) 80px, rgba(1, 1, 1, 0.22) 80px, rgba(1, 1, 1, 0.22) 96px, rgba(0, 0, 0, 0.24) 96px, rgba(0, 0, 0, 0.24) 112px, rgba(0, 0, 0, 0.25) 112px, rgba(0, 0, 0, 0.25) 128px, rgba(1, 1, 1, 0.12) 128px, rgba(1, 1, 1, 0.12) 144px, rgba(0, 0, 0, 0.18) 144px, rgba(0, 0, 0, 0.18) 160px, rgba(1, 1, 1, 0.03) 160px, rgba(1, 1, 1, 0.03) 176px, rgba(1, 1, 1, 0.1) 176px, rgba(1, 1, 1, 0.1) 192px), repeating-linear-gradient(135deg, rgba(1, 1, 1, 0.18) 0px, rgba(1, 1, 1, 0.18) 3px, rgba(0, 0, 0, 0.09) 3px, rgba(0, 0, 0, 0.09) 6px, rgba(0, 0, 0, 0.08) 6px, rgba(0, 0, 0, 0.08) 9px, rgba(1, 1, 1, 0.05) 9px, rgba(1, 1, 1, 0.05) 12px, rgba(0, 0, 0, 0.01) 12px, rgba(0, 0, 0, 0.01) 15px, rgba(1, 1, 1, 0.12) 15px, rgba(1, 1, 1, 0.12) 18px, rgba(0, 0, 0, 0.05) 18px, rgba(0, 0, 0, 0.05) 21px, rgba(1, 1, 1, 0.16) 21px, rgba(1, 1, 1, 0.16) 24px, rgba(1, 1, 1, 0.07) 24px, rgba(1, 1, 1, 0.07) 27px, rgba(1, 1, 1, 0.23) 27px, rgba(1, 1, 1, 0.23) 30px, rgba(0, 0, 0, 0.2) 30px, rgba(0, 0, 0, 0.2) 33px, rgba(0, 0, 0, 0.18) 33px, rgba(0, 0, 0, 0.18) 36px, rgba(1, 1, 1, 0.12) 36px, rgba(1, 1, 1, 0.12) 39px, rgba(1, 1, 1, 0.13) 39px, rgba(1, 1, 1, 0.13) 42px, rgba(1, 1, 1, 0.2) 42px, rgba(1, 1, 1, 0.2) 45px, rgba(1, 1, 1, 0.18) 45px, rgba(1, 1, 1, 0.18) 48px, rgba(0, 0, 0, 0.2) 48px, rgba(0, 0, 0, 0.2) 51px, rgba(1, 1, 1, 0) 51px, rgba(1, 1, 1, 0) 54px, rgba(0, 0, 0, 0.03) 54px, rgba(0, 0, 0, 0.03) 57px, rgba(1, 1, 1, 0.06) 57px, rgba(1, 1, 1, 0.06) 60px, rgba(1, 1, 1, 0) 60px, rgba(1, 1, 1, 0) 63px, rgba(0, 0, 0, 0.1) 63px, rgba(0, 0, 0, 0.1) 66px, rgba(1, 1, 1, 0.19) 66px, rgba(1, 1, 1, 0.19) 69px), linear-gradient(90deg, rgb(239, 53, 115), rgb(79, 2, 93))"}},
                { css: { background: "linear-gradient(135deg, rgb(59, 72, 175) 0%, rgb(59, 72, 175) 31%,rgb(55, 66, 150) 31%, rgb(55, 66, 150) 46%,rgb(51, 60, 126) 46%, rgb(51, 60, 126) 56%,rgb(48, 54, 101) 56%, rgb(48, 54, 101) 83%,rgb(44, 48, 77) 83%, rgb(44, 48, 77) 93%,rgb(40, 42, 52) 93%, rgb(40, 42, 52) 100%)"}},
                { css: { background: "linear-gradient(45deg, rgb(64, 140, 190) 0%, rgb(64, 140, 190) 7%,rgb(62, 107, 145) 7%, rgb(62, 107, 145) 9%,rgb(49, 99, 131) 9%, rgb(49, 99, 131) 11%,rgb(116, 172, 211) 11%, rgb(116, 172, 211) 26%,rgb(125, 182, 214) 26%, rgb(125, 182, 214) 34%,rgb(40, 90, 136) 34%, rgb(40, 90, 136) 41%,rgb(39, 123, 190) 41%, rgb(39, 123, 190) 100%)"}}
                ],
            name: "Popular Gradient", css: { background: "repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.11) 0px, rgba(0, 0, 0, 0.11) 12px, rgba(1, 1, 1, 0.16) 12px, rgba(1, 1, 1, 0.16) 24px, rgba(0, 0, 0, 0.14) 24px, rgba(0, 0, 0, 0.14) 36px, rgba(0, 0, 0, 0.23) 36px, rgba(0, 0, 0, 0.23) 48px, rgba(0, 0, 0, 0.12) 48px, rgba(0, 0, 0, 0.12) 60px, rgba(1, 1, 1, 0.07) 60px, rgba(1, 1, 1, 0.07) 72px, rgba(0, 0, 0, 0.21) 72px, rgba(0, 0, 0, 0.21) 84px, rgba(0, 0, 0, 0.24) 84px, rgba(0, 0, 0, 0.24) 96px, rgba(1, 1, 1, 0.23) 96px, rgba(1, 1, 1, 0.23) 108px, rgba(1, 1, 1, 0.07) 108px, rgba(1, 1, 1, 0.07) 120px, rgba(0, 0, 0, 0.01) 120px, rgba(0, 0, 0, 0.01) 132px, rgba(1, 1, 1, 0.22) 132px, rgba(1, 1, 1, 0.22) 144px, rgba(1, 1, 1, 0.24) 144px, rgba(1, 1, 1, 0.24) 156px, rgba(0, 0, 0, 0) 156px, rgba(0, 0, 0, 0) 168px, rgba(0, 0, 0, 0.12) 168px, rgba(0, 0, 0, 0.12) 180px), repeating-linear-gradient(90deg, rgba(1, 1, 1, 0.01) 0px, rgba(1, 1, 1, 0.01) 12px, rgba(1, 1, 1, 0.15) 12px, rgba(1, 1, 1, 0.15) 24px, rgba(0, 0, 0, 0.09) 24px, rgba(0, 0, 0, 0.09) 36px, rgba(0, 0, 0, 0.02) 36px, rgba(0, 0, 0, 0.02) 48px, rgba(0, 0, 0, 0.1) 48px, rgba(0, 0, 0, 0.1) 60px, rgba(1, 1, 1, 0.07) 60px, rgba(1, 1, 1, 0.07) 72px, rgba(1, 1, 1, 0.15) 72px, rgba(1, 1, 1, 0.15) 84px, rgba(0, 0, 0, 0.18) 84px, rgba(0, 0, 0, 0.18) 96px, rgba(1, 1, 1, 0.15) 96px, rgba(1, 1, 1, 0.15) 108px, rgba(1, 1, 1, 0.09) 108px, rgba(1, 1, 1, 0.09) 120px, rgba(1, 1, 1, 0.07) 120px, rgba(1, 1, 1, 0.07) 132px, rgba(1, 1, 1, 0.05) 132px, rgba(1, 1, 1, 0.05) 144px, rgba(0, 0, 0, 0.1) 144px, rgba(0, 0, 0, 0.1) 156px, rgba(1, 1, 1, 0.18) 156px, rgba(1, 1, 1, 0.18) 168px), repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.24) 0px, rgba(0, 0, 0, 0.24) 16px, rgba(1, 1, 1, 0.06) 16px, rgba(1, 1, 1, 0.06) 32px, rgba(0, 0, 0, 0.16) 32px, rgba(0, 0, 0, 0.16) 48px, rgba(1, 1, 1, 0) 48px, rgba(1, 1, 1, 0) 64px, rgba(1, 1, 1, 0.12) 64px, rgba(1, 1, 1, 0.12) 80px, rgba(1, 1, 1, 0.22) 80px, rgba(1, 1, 1, 0.22) 96px, rgba(0, 0, 0, 0.24) 96px, rgba(0, 0, 0, 0.24) 112px, rgba(0, 0, 0, 0.25) 112px, rgba(0, 0, 0, 0.25) 128px, rgba(1, 1, 1, 0.12) 128px, rgba(1, 1, 1, 0.12) 144px, rgba(0, 0, 0, 0.18) 144px, rgba(0, 0, 0, 0.18) 160px, rgba(1, 1, 1, 0.03) 160px, rgba(1, 1, 1, 0.03) 176px, rgba(1, 1, 1, 0.1) 176px, rgba(1, 1, 1, 0.1) 192px), repeating-linear-gradient(135deg, rgba(1, 1, 1, 0.18) 0px, rgba(1, 1, 1, 0.18) 3px, rgba(0, 0, 0, 0.09) 3px, rgba(0, 0, 0, 0.09) 6px, rgba(0, 0, 0, 0.08) 6px, rgba(0, 0, 0, 0.08) 9px, rgba(1, 1, 1, 0.05) 9px, rgba(1, 1, 1, 0.05) 12px, rgba(0, 0, 0, 0.01) 12px, rgba(0, 0, 0, 0.01) 15px, rgba(1, 1, 1, 0.12) 15px, rgba(1, 1, 1, 0.12) 18px, rgba(0, 0, 0, 0.05) 18px, rgba(0, 0, 0, 0.05) 21px, rgba(1, 1, 1, 0.16) 21px, rgba(1, 1, 1, 0.16) 24px, rgba(1, 1, 1, 0.07) 24px, rgba(1, 1, 1, 0.07) 27px, rgba(1, 1, 1, 0.23) 27px, rgba(1, 1, 1, 0.23) 30px, rgba(0, 0, 0, 0.2) 30px, rgba(0, 0, 0, 0.2) 33px, rgba(0, 0, 0, 0.18) 33px, rgba(0, 0, 0, 0.18) 36px, rgba(1, 1, 1, 0.12) 36px, rgba(1, 1, 1, 0.12) 39px, rgba(1, 1, 1, 0.13) 39px, rgba(1, 1, 1, 0.13) 42px, rgba(1, 1, 1, 0.2) 42px, rgba(1, 1, 1, 0.2) 45px, rgba(1, 1, 1, 0.18) 45px, rgba(1, 1, 1, 0.18) 48px, rgba(0, 0, 0, 0.2) 48px, rgba(0, 0, 0, 0.2) 51px, rgba(1, 1, 1, 0) 51px, rgba(1, 1, 1, 0) 54px, rgba(0, 0, 0, 0.03) 54px, rgba(0, 0, 0, 0.03) 57px, rgba(1, 1, 1, 0.06) 57px, rgba(1, 1, 1, 0.06) 60px, rgba(1, 1, 1, 0) 60px, rgba(1, 1, 1, 0) 63px, rgba(0, 0, 0, 0.1) 63px, rgba(0, 0, 0, 0.1) 66px, rgba(1, 1, 1, 0.19) 66px, rgba(1, 1, 1, 0.19) 69px), linear-gradient(90deg, rgb(239, 53, 115), rgb(79, 2, 93))"} 
        }, 
        {
            list: [
                { css: { background: "radial-gradient(circle at 72% 83%, rgba(12, 12, 12,0.04) 0%, rgba(12, 12, 12,0.04) 50%,rgba(172, 172, 172,0.04) 50%, rgba(172, 172, 172,0.04) 100%),radial-gradient(circle at 57% 65%, rgba(11, 11, 11,0.04) 0%, rgba(11, 11, 11,0.04) 50%,rgba(222, 222, 222,0.04) 50%, rgba(222, 222, 222,0.04) 100%),radial-gradient(circle at 64% 31%, rgba(11, 11, 11,0.04) 0%, rgba(11, 11, 11,0.04) 50%,rgba(191, 191, 191,0.04) 50%, rgba(191, 191, 191,0.04) 100%),linear-gradient(130deg, rgb(5, 235, 123),rgb(47, 52, 6))"}},
                { css: { background: "radial-gradient(circle at 1% 52%, rgba(139, 139, 139,0.05) 0%, rgba(139, 139, 139,0.05) 50%,rgba(21, 21, 21,0.05) 50%, rgba(21, 21, 21,0.05) 100%),radial-gradient(circle at 41% 28%, rgba(81, 81, 81,0.05) 0%, rgba(81, 81, 81,0.05) 50%,rgba(7, 7, 7,0.05) 50%, rgba(7, 7, 7,0.05) 100%),radial-gradient(circle at 48% 1%, rgba(93, 93, 93,0.05) 0%, rgba(93, 93, 93,0.05) 50%,rgba(7, 7, 7,0.05) 50%, rgba(7, 7, 7,0.05) 100%),linear-gradient(255deg, rgb(156, 41, 132),rgb(47, 14, 122))"}},
                { css: { background: "radial-gradient(circle at 90% 66%, rgba(25, 25, 25,0.06) 0%, rgba(25, 25, 25,0.06) 25%,rgba(23, 23, 23,0.06) 25%, rgba(23, 23, 23,0.06) 50%,rgba(20, 20, 20,0.06) 50%, rgba(20, 20, 20,0.06) 75%,rgba(18, 18, 18,0.06) 75%, rgba(18, 18, 18,0.06) 100%),radial-gradient(circle at 62% 23%, rgba(154, 154, 154,0.06) 0%, rgba(154, 154, 154,0.06) 25%,rgba(111, 111, 111,0.06) 25%, rgba(111, 111, 111,0.06) 50%,rgba(68, 68, 68,0.06) 50%, rgba(68, 68, 68,0.06) 75%,rgba(25, 25, 25,0.06) 75%, rgba(25, 25, 25,0.06) 100%),radial-gradient(circle at 47% 85%, rgba(97, 97, 97,0.06) 0%, rgba(97, 97, 97,0.06) 25%,rgba(130, 130, 130,0.06) 25%, rgba(130, 130, 130,0.06) 50%,rgba(162, 162, 162,0.06) 50%, rgba(162, 162, 162,0.06) 75%,rgba(195, 195, 195,0.06) 75%, rgba(195, 195, 195,0.06) 100%),radial-gradient(circle at 72% 0%, rgba(214, 214, 214,0.06) 0%, rgba(214, 214, 214,0.06) 25%,rgba(223, 223, 223,0.06) 25%, rgba(223, 223, 223,0.06) 50%,rgba(231, 231, 231,0.06) 50%, rgba(231, 231, 231,0.06) 75%,rgba(240, 240, 240,0.06) 75%, rgba(240, 240, 240,0.06) 100%),linear-gradient(90deg, rgb(181, 12, 26),rgb(206, 132, 31))"}},
                { css: { background: "radial-gradient(circle at 88% 18%, rgba(136, 136, 136,0.05) 0%, rgba(136, 136, 136,0.05) 50%,rgba(172, 172, 172,0.05) 50%, rgba(172, 172, 172,0.05) 100%),radial-gradient(circle at 34% 9%, rgba(149, 149, 149,0.05) 0%, rgba(149, 149, 149,0.05) 50%,rgba(55, 55, 55,0.05) 50%, rgba(55, 55, 55,0.05) 100%),radial-gradient(circle at 37% 56%, rgba(97, 97, 97,0.05) 0%, rgba(97, 97, 97,0.05) 50%,rgba(160, 160, 160,0.05) 50%, rgba(160, 160, 160,0.05) 100%),linear-gradient(69deg, rgb(10, 68, 151),rgb(72, 211, 165))"}},
            ],
            name: "Simple Circle", css: { background: "radial-gradient(circle at 17% 77%, rgba(17, 17, 17, 0.04) 0%, rgba(17, 17, 17, 0.04) 50%, rgba(197, 197, 197, 0.04) 50%, rgba(197, 197, 197, 0.04) 100%), radial-gradient(circle at 26% 17%, rgba(64, 64, 64, 0.04) 0%, rgba(64, 64, 64, 0.04) 50%, rgba(244, 244, 244, 0.04) 50%, rgba(244, 244, 244, 0.04) 100%), radial-gradient(circle at 44% 60%, rgba(177, 177, 177, 0.04) 0%, rgba(177, 177, 177, 0.04) 50%, rgba(187, 187, 187, 0.04) 50%, rgba(187, 187, 187, 0.04) 100%), linear-gradient(19deg, rgb(28, 117, 250), rgb(34, 2, 159))"} }, 
        {
            list: [
                { css: { background: "linear-gradient(305deg, rgba(161, 161, 161, 0.04) 0%, rgba(161, 161, 161, 0.04) 45%,rgba(31, 31, 31, 0.04) 45%, rgba(31, 31, 31, 0.04) 100%),linear-gradient(173deg, rgba(190, 190, 190, 0.04) 0%, rgba(190, 190, 190, 0.04) 59%,rgba(10, 10, 10, 0.04) 59%, rgba(10, 10, 10, 0.04) 100%),linear-gradient(229deg, rgba(168, 168, 168, 0.04) 0%, rgba(168, 168, 168, 0.04) 29%,rgba(86, 86, 86, 0.04) 29%, rgba(86, 86, 86, 0.04) 100%),linear-gradient(306deg, rgba(51, 51, 51, 0.04) 0%, rgba(51, 51, 51, 0.04) 17%,rgba(64, 64, 64, 0.04) 17%, rgba(64, 64, 64, 0.04) 100%),linear-gradient(90deg, rgb(255, 169, 89),rgb(97, 30, 1))"}},
                { css: { background: "linear-gradient(32deg, rgba(49, 49, 49, 0.04) 0%, rgba(49, 49, 49, 0.04) 75%,rgba(225, 225, 225, 0.04) 75%, rgba(225, 225, 225, 0.04) 100%),linear-gradient(131deg, rgba(241, 241, 241, 0.04) 0%, rgba(241, 241, 241, 0.04) 73%,rgba(224, 224, 224, 0.04) 73%, rgba(224, 224, 224, 0.04) 100%),linear-gradient(274deg, rgba(106, 106, 106, 0.04) 0%, rgba(106, 106, 106, 0.04) 63%,rgba(250, 250, 250, 0.04) 63%, rgba(250, 250, 250, 0.04) 100%),linear-gradient(121deg, rgba(127, 127, 127, 0.04) 0%, rgba(127, 127, 127, 0.04) 43%,rgba(228, 228, 228, 0.04) 43%, rgba(228, 228, 228, 0.04) 100%),linear-gradient(90deg, rgb(228, 46, 24),rgb(242, 171, 153))"}},
                { css: { background: "linear-gradient(78deg, rgba(96, 96, 96, 0.04) 0%, rgba(96, 96, 96, 0.04) 35%,rgba(220, 220, 220, 0.04) 35%, rgba(220, 220, 220, 0.04) 100%),linear-gradient(150deg, rgba(83, 83, 83, 0.04) 0%, rgba(83, 83, 83, 0.04) 71%,rgba(6, 6, 6, 0.04) 71%, rgba(6, 6, 6, 0.04) 100%),linear-gradient(311deg, rgba(203, 203, 203, 0.04) 0%, rgba(203, 203, 203, 0.04) 58%,rgba(3, 3, 3, 0.04) 58%, rgba(3, 3, 3, 0.04) 100%),linear-gradient(137deg, rgba(110, 110, 110, 0.04) 0%, rgba(110, 110, 110, 0.04) 11%,rgba(226, 226, 226, 0.04) 11%, rgba(226, 226, 226, 0.04) 100%),linear-gradient(90deg, rgb(215, 19, 84),rgb(234, 119, 123))"}},
                { css: { background: "linear-gradient(239deg, rgba(71, 71, 71, 0.05) 0%, rgba(71, 71, 71, 0.05) 27%,rgba(209, 209, 209, 0.05) 27%, rgba(209, 209, 209, 0.05) 100%),linear-gradient(294deg, rgba(63, 63, 63, 0.05) 0%, rgba(63, 63, 63, 0.05) 43%,rgba(138, 138, 138, 0.05) 43%, rgba(138, 138, 138, 0.05) 100%),linear-gradient(323deg, rgba(58, 58, 58, 0.05) 0%, rgba(58, 58, 58, 0.05) 24%,rgba(100, 100, 100, 0.05) 24%, rgba(100, 100, 100, 0.05) 100%),linear-gradient(236deg, rgba(47, 47, 47, 0.05) 0%, rgba(47, 47, 47, 0.05) 45%,rgba(208, 208, 208, 0.05) 45%, rgba(208, 208, 208, 0.05) 100%),linear-gradient(90deg, rgb(209, 54, 202),rgb(180, 22, 95))"}},
                { css: { background: "linear-gradient(135deg, rgba(76, 76, 76, 0.04) 0%, rgba(76, 76, 76, 0.04) 10%,rgba(149, 149, 149, 0.04) 10%, rgba(149, 149, 149, 0.04) 100%),linear-gradient(90deg, rgba(196, 196, 196, 0.04) 0%, rgba(196, 196, 196, 0.04) 59%,rgba(68, 68, 68, 0.04) 59%, rgba(68, 68, 68, 0.04) 100%),linear-gradient(45deg, rgba(39, 39, 39, 0.01) 0%, rgba(39, 39, 39, 0.01) 9%,rgba(218, 218, 218, 0.01) 9%, rgba(218, 218, 218, 0.01) 100%),linear-gradient(0deg, rgba(26, 26, 26, 0.04) 0%, rgba(26, 26, 26, 0.04) 33%,rgba(90, 90, 90, 0.04) 33%, rgba(90, 90, 90, 0.04) 100%),linear-gradient(135deg, rgba(37, 37, 37, 0.07) 0%, rgba(37, 37, 37, 0.07) 46%,rgba(50, 50, 50, 0.07) 46%, rgba(50, 50, 50, 0.07) 100%),linear-gradient(90deg, rgb(8, 28, 65),rgb(16, 173, 226))"}},
            ],
            name: "Simple Angular", css: {  background: "linear-gradient(108deg, rgba(62, 62, 62, 0.09) 0%, rgba(62, 62, 62, 0.09) 30%, rgba(234, 234, 234, 0.09) 30%, rgba(234, 234, 234, 0.09) 100%), linear-gradient(116deg, rgba(101, 101, 101, 0.06) 0%, rgba(101, 101, 101, 0.06) 51%, rgba(231, 231, 231, 0.06) 51%, rgba(231, 231, 231, 0.06) 100%), linear-gradient(258deg, rgba(103, 103, 103, 0.07) 0%, rgba(103, 103, 103, 0.07) 1%, rgba(209, 209, 209, 0.07) 1%, rgba(209, 209, 209, 0.07) 100%), linear-gradient(43deg, rgba(17, 17, 17, 0.09) 0%, rgba(17, 17, 17, 0.09) 7%, rgba(159, 159, 159, 0.09) 7%, rgba(159, 159, 159, 0.09) 100%), linear-gradient(63deg, rgba(211, 211, 211, 0.1) 0%, rgba(211, 211, 211, 0.1) 94%, rgba(233, 233, 233, 0.1) 94%, rgba(233, 233, 233, 0.1) 100%), linear-gradient(207deg, rgba(179, 179, 179, 0.1) 0%, rgba(179, 179, 179, 0.1) 57%, rgba(11, 11, 11, 0.1) 57%, rgba(11, 11, 11, 0.1) 100%), linear-gradient(25deg, rgba(118, 118, 118, 0.07) 0%, rgba(118, 118, 118, 0.07) 98%, rgba(248, 248, 248, 0.07) 98%, rgba(248, 248, 248, 0.07) 100%), linear-gradient(90deg, rgb(237, 12, 99), rgb(237, 12, 99))"} },
        {
            list: [
                { css: { background: "linear-gradient(45deg, rgb(163, 12, 6) 0%, rgb(163, 12, 6) 22%,rgb(182, 55, 32) 22%, rgb(182, 55, 32) 29%,rgb(200, 97, 58) 29%, rgb(200, 97, 58) 39%,rgb(219, 140, 83) 39%, rgb(219, 140, 83) 45%,rgb(237, 182, 109) 45%, rgb(237, 182, 109) 100%)"}},
                { css: { background: "linear-gradient(45deg, rgb(254, 101, 156) 0%, rgb(254, 101, 156) 10%,rgb(204, 87, 133) 10%, rgb(204, 87, 133) 45%,rgb(155, 73, 110) 45%, rgb(155, 73, 110) 70%,rgb(105, 59, 88) 70%, rgb(105, 59, 88) 81%,rgb(56, 45, 65) 81%, rgb(56, 45, 65) 88%,rgb(6, 31, 42) 88%, rgb(6, 31, 42) 100%)"}},
                { css: { background: "linear-gradient(135deg, rgb(103, 35, 67) 0%, rgb(103, 35, 67) 23%,rgb(246, 122, 20) 23%, rgb(246, 122, 20) 38%,rgb(160, 70, 48) 38%, rgb(160, 70, 48) 49%,rgb(132, 52, 58) 49%, rgb(132, 52, 58) 52%,rgb(217, 105, 29) 52%, rgb(217, 105, 29) 71%,rgb(189, 87, 39) 71%, rgb(189, 87, 39) 100%)"}},
                { css: { background: "linear-gradient(90deg, rgb(49, 90, 210) 0%, rgb(49, 90, 210) 10%,rgb(53, 98, 218) 10%, rgb(53, 98, 218) 20%,rgb(57, 107, 225) 20%, rgb(57, 107, 225) 32%,rgb(62, 115, 233) 32%, rgb(62, 115, 233) 43%,rgb(66, 123, 240) 43%, rgb(66, 123, 240) 47%,rgb(70, 132, 248) 47%, rgb(70, 132, 248) 49%,rgb(74, 140, 255) 49%, rgb(74, 140, 255) 100%)"}},
                { css: { background: "linear-gradient(135deg, rgb(203, 17, 17) 0%, rgb(203, 17, 17) 23%,rgb(209, 42, 24) 23%, rgb(209, 42, 24) 37%,rgb(215, 67, 30) 37%, rgb(215, 67, 30) 40%,rgb(239, 168, 57) 40%, rgb(239, 168, 57) 41%,rgb(233, 143, 51) 41%, rgb(233, 143, 51) 44%,rgb(221, 92, 37) 44%, rgb(221, 92, 37) 54%,rgb(245, 193, 64) 54%, rgb(245, 193, 64) 66%,rgb(227, 118, 44) 66%, rgb(227, 118, 44) 100%)"}},
                { css: { background: "linear-gradient(45deg, rgba(96, 131, 193, 0.45) 0%, rgba(96, 131, 193, 0.45) 5%,rgba(90, 78, 185, 0.45) 5%, rgba(90, 78, 185, 0.45) 46%,rgba(102, 184, 202, 0.45) 46%, rgba(102, 184, 202, 0.45) 49%,rgba(93, 104, 189, 0.45) 49%, rgba(93, 104, 189, 0.45) 50%,rgba(99, 157, 198, 0.45) 50%, rgba(99, 157, 198, 0.45) 84%,rgba(105, 210, 206, 0.45) 84%, rgba(105, 210, 206, 0.45) 100%),linear-gradient(135deg, rgb(111, 76, 50),rgb(28, 158, 244))"}},            
            ],
            name: "Uneven Stripes (Retro)", css: {  background: "linear-gradient(135deg, rgb(243, 107, 55) 0%, rgb(243, 107, 55) 23%, rgb(244, 133, 60) 23%, rgb(244, 133, 60) 27%, rgb(245, 159, 64) 27%, rgb(245, 159, 64) 73%, rgb(245, 186, 69) 73%, rgb(245, 186, 69) 74%, rgb(246, 212, 73) 74%, rgb(246, 212, 73) 78%, rgb(247, 238, 78) 78%, rgb(247, 238, 78) 100%)"} },
        {
            list: [
                { css: { background: "linear-gradient(45deg, rgba(20, 136, 221, 0.5) 0%, rgba(20, 136, 221, 0.5) 12.5%,rgba(27, 145, 222, 0.5) 12.5%, rgba(27, 145, 222, 0.5) 25%,rgba(33, 154, 222, 0.5) 25%, rgba(33, 154, 222, 0.5) 37.5%,rgba(40, 163, 223, 0.5) 37.5%, rgba(40, 163, 223, 0.5) 50%,rgba(46, 173, 224, 0.5) 50%, rgba(46, 173, 224, 0.5) 62.5%,rgba(53, 182, 225, 0.5) 62.5%, rgba(53, 182, 225, 0.5) 75%,rgba(59, 191, 225, 0.5) 75%, rgba(59, 191, 225, 0.5) 87.5%,rgba(66, 200, 226, 0.5) 87.5%, rgba(66, 200, 226, 0.5) 100%),linear-gradient(135deg, rgb(34, 87, 254) 0%, rgb(34, 87, 254) 12.5%,rgb(42, 82, 249) 12.5%, rgb(42, 82, 249) 25%,rgb(50, 77, 243) 25%, rgb(50, 77, 243) 37.5%,rgb(58, 72, 238) 37.5%, rgb(58, 72, 238) 50%,rgb(67, 67, 233) 50%, rgb(67, 67, 233) 62.5%,rgb(75, 62, 228) 62.5%, rgb(75, 62, 228) 75%,rgb(83, 57, 222) 75%, rgb(83, 57, 222) 87.5%,rgb(91, 52, 217) 87.5%, rgb(91, 52, 217) 100%)"}},
                { css: { background: "linear-gradient(135deg, rgba(246, 64, 125, 0.28) 0%, rgba(246, 64, 125, 0.28) 20%,rgba(246, 107, 143, 0.28) 20%, rgba(246, 107, 143, 0.28) 40%,rgba(245, 151, 162, 0.28) 40%, rgba(245, 151, 162, 0.28) 60%,rgba(245, 194, 180, 0.28) 60%, rgba(245, 194, 180, 0.28) 80%,rgba(244, 237, 198, 0.28) 80%, rgba(244, 237, 198, 0.28) 100%),linear-gradient(45deg, rgba(202, 0, 12, 0.28) 0%, rgba(202, 0, 12, 0.28) 20%,rgba(174, 41, 23, 0.28) 20%, rgba(174, 41, 23, 0.28) 40%,rgba(145, 82, 35, 0.28) 40%, rgba(145, 82, 35, 0.28) 60%,rgba(117, 122, 46, 0.28) 60%, rgba(117, 122, 46, 0.28) 80%,rgba(88, 163, 57, 0.28) 80%, rgba(88, 163, 57, 0.28) 100%),linear-gradient(280deg, rgb(142, 218, 154),rgb(210, 215, 135))"}},
                { css: { background: "linear-gradient(45deg, rgba(177, 251, 187, 0.45) 0%, rgba(177, 251, 187, 0.45) 25%,rgba(137, 190, 137, 0.45) 25%, rgba(137, 190, 137, 0.45) 50%,rgba(97, 129, 88, 0.45) 50%, rgba(97, 129, 88, 0.45) 75%,rgba(57, 68, 38, 0.45) 75%, rgba(57, 68, 38, 0.45) 100%),linear-gradient(135deg, rgb(11, 88, 21) 0%, rgb(11, 88, 21) 25%,rgb(27, 138, 47) 25%, rgb(27, 138, 47) 50%,rgb(44, 188, 74) 50%, rgb(44, 188, 74) 75%,rgb(60, 238, 100) 75%, rgb(60, 238, 100) 100%)"}},
            ],
            name: "Diamonds", css: {  background: "linear-gradient(45deg, rgba(0, 84, 162, 0.45) 0%, rgba(0, 84, 162, 0.45) 25%, rgba(77, 60, 170, 0.45) 25%, rgba(77, 60, 170, 0.45) 50%, rgba(153, 37, 179, 0.45) 50%, rgba(153, 37, 179, 0.45) 75%, rgba(230, 13, 187, 0.45) 75%, rgba(230, 13, 187, 0.45) 100%), linear-gradient(135deg, rgb(149, 18, 122) 0%, rgb(149, 18, 122) 25%, rgb(182, 13, 98) 25%, rgb(182, 13, 98) 50%, rgb(214, 8, 74) 50%, rgb(214, 8, 74) 75%, rgb(247, 3, 50) 75%, rgb(247, 3, 50) 100%)"} },
        {
            list: [
                { css: { background: "linear-gradient(37deg, rgb(32, 218, 233),rgb(40, 21, 236))"}},
                { css: { background: "linear-gradient(90deg, rgb(160, 222, 219),rgb(3, 165, 209))"}},
                { css: { background: "linear-gradient(90deg, rgb(237, 228, 100),rgb(252, 152, 51))"}},
                { css: { background: "linear-gradient(90deg, rgb(43, 77, 130),rgb(40, 144, 172))"}},
                { css: { background: "linear-gradient(90deg, rgb(68, 144, 190),rgb(251, 254, 241))"}},
                { css: { background: "linear-gradient(45deg, rgba(130, 89, 219, 0.2),rgba(44, 192, 226, 0.2),rgba(182, 103, 181, 0.2)),linear-gradient(135deg, rgb(39, 20, 149),rgb(65, 82, 185),rgb(91, 144, 220))"}},
                { css: { background: "linear-gradient(90deg, rgb(116, 216, 252),rgb(156, 153, 254))"}},
                { css: { background: "linear-gradient(0deg, rgb(85, 217, 233),rgb(86, 73, 252))"}},
                { css: { background: "linear-gradient(135deg, rgb(182, 244, 85),rgb(63, 128, 87))"}},
            ],
            name: "Standard", css: {  background: "linear-gradient(0deg, rgb(113, 136, 223), rgb(17, 213, 207))"} },
        {
            list: [
                { css: { background: "linear-gradient(41deg, rgba(107, 107, 107, 0.04) 0%, rgba(107, 107, 107, 0.04) 8%,rgba(31, 31, 31, 0.04) 8%, rgba(31, 31, 31, 0.04) 100%),linear-gradient(9deg, rgba(228, 228, 228, 0.04) 0%, rgba(228, 228, 228, 0.04) 62%,rgba(54, 54, 54, 0.04) 62%, rgba(54, 54, 54, 0.04) 100%),linear-gradient(124deg, rgba(18, 18, 18, 0.04) 0%, rgba(18, 18, 18, 0.04) 37%,rgba(233, 233, 233, 0.04) 37%, rgba(233, 233, 233, 0.04) 100%),linear-gradient(253deg, rgba(201, 201, 201, 0.04) 0%, rgba(201, 201, 201, 0.04) 55%,rgba(47, 47, 47, 0.04) 55%, rgba(47, 47, 47, 0.04) 100%),linear-gradient(270deg, rgba(172, 172, 172, 0.04) 0%, rgba(172, 172, 172, 0.04) 33%,rgba(26, 26, 26, 0.04) 33%, rgba(26, 26, 26, 0.04) 100%),linear-gradient(64deg, rgba(11, 11, 11, 0.04) 0%, rgba(11, 11, 11, 0.04) 38%,rgba(87, 87, 87, 0.04) 38%, rgba(87, 87, 87, 0.04) 100%),linear-gradient(347deg, rgba(199, 199, 199, 0.04) 0%, rgba(199, 199, 199, 0.04) 69%,rgba(4, 4, 4, 0.04) 69%, rgba(4, 4, 4, 0.04) 100%),linear-gradient(313deg, rgba(36, 36, 36, 0.04) 0%, rgba(36, 36, 36, 0.04) 20%,rgba(91, 91, 91, 0.04) 20%, rgba(91, 91, 91, 0.04) 100%),linear-gradient(90deg, rgb(10, 17, 72),rgb(35, 148, 228))"}},
                { css: { background: "linear-gradient(45deg, rgba(56, 239, 63, 0.2) 0%, rgba(56, 239, 63, 0.2) 4%,rgba(47, 192, 98, 0.2) 4%, rgba(47, 192, 98, 0.2) 13%,rgba(38, 144, 133, 0.2) 13%, rgba(38, 144, 133, 0.2) 50%,rgba(29, 97, 168, 0.2) 50%, rgba(29, 97, 168, 0.2) 66%,rgba(20, 49, 203, 0.2) 66%, rgba(20, 49, 203, 0.2) 82%,rgba(11, 2, 238, 0.2) 82%, rgba(11, 2, 238, 0.2) 100%),linear-gradient(135deg, rgba(22, 202, 190, 0.2) 0%, rgba(22, 202, 190, 0.2) 14%,rgba(20, 208, 199, 0.2) 14%, rgba(20, 208, 199, 0.2) 28%,rgba(19, 214, 209, 0.2) 28%, rgba(19, 214, 209, 0.2) 35%,rgba(17, 221, 218, 0.2) 35%, rgba(17, 221, 218, 0.2) 68%,rgba(16, 227, 228, 0.2) 68%, rgba(16, 227, 228, 0.2) 95%,rgba(14, 233, 237, 0.2) 95%, rgba(14, 233, 237, 0.2) 100%),linear-gradient(90deg, rgb(89, 66, 7) 0%, rgb(89, 66, 7) 5%,rgb(79, 87, 10) 5%, rgb(79, 87, 10) 32%,rgb(68, 108, 14) 32%, rgb(68, 108, 14) 43%,rgb(58, 128, 17) 43%, rgb(58, 128, 17) 48%,rgb(47, 149, 21) 48%, rgb(47, 149, 21) 65%,rgb(37, 170, 24) 65%, rgb(37, 170, 24) 100%)"}},
                { css: { background: "linear-gradient(74deg, rgba(246, 246, 246, 0.03) 0%, rgba(246, 246, 246, 0.03) 4%,rgba(152, 152, 152, 0.03) 4%, rgba(152, 152, 152, 0.03) 32%,rgba(123, 123, 123, 0.03) 32%, rgba(123, 123, 123, 0.03) 41%,rgba(189, 189, 189, 0.03) 41%, rgba(189, 189, 189, 0.03) 45%,rgba(151, 151, 151, 0.03) 45%, rgba(151, 151, 151, 0.03) 47%,rgba(61, 61, 61, 0.03) 47%, rgba(61, 61, 61, 0.03) 77%,rgba(34, 34, 34, 0.03) 77%, rgba(34, 34, 34, 0.03) 100%),linear-gradient(117deg, rgba(222, 222, 222, 0.03) 0%, rgba(222, 222, 222, 0.03) 7%,rgba(67, 67, 67, 0.03) 7%, rgba(67, 67, 67, 0.03) 18%,rgba(61, 61, 61, 0.03) 18%, rgba(61, 61, 61, 0.03) 26%,rgba(32, 32, 32, 0.03) 26%, rgba(32, 32, 32, 0.03) 52%,rgba(119, 119, 119, 0.03) 52%, rgba(119, 119, 119, 0.03) 60%,rgba(252, 252, 252, 0.03) 60%, rgba(252, 252, 252, 0.03) 68%,rgba(9, 9, 9, 0.03) 68%, rgba(9, 9, 9, 0.03) 100%),linear-gradient(313deg, rgba(193, 193, 193, 0.03) 0%, rgba(193, 193, 193, 0.03) 12%,rgba(184, 184, 184, 0.03) 12%, rgba(184, 184, 184, 0.03) 24%,rgba(194, 194, 194, 0.03) 24%, rgba(194, 194, 194, 0.03) 43%,rgba(128, 128, 128, 0.03) 43%, rgba(128, 128, 128, 0.03) 54%,rgba(87, 87, 87, 0.03) 54%, rgba(87, 87, 87, 0.03) 71%,rgba(169, 169, 169, 0.03) 71%, rgba(169, 169, 169, 0.03) 93%,rgba(83, 83, 83, 0.03) 93%, rgba(83, 83, 83, 0.03) 100%),linear-gradient(19deg, rgba(186, 186, 186, 0.03) 0%, rgba(186, 186, 186, 0.03) 9%,rgba(77, 77, 77, 0.03) 9%, rgba(77, 77, 77, 0.03) 19%,rgba(38, 38, 38, 0.03) 19%, rgba(38, 38, 38, 0.03) 27%,rgba(203, 203, 203, 0.03) 27%, rgba(203, 203, 203, 0.03) 39%,rgba(130, 130, 130, 0.03) 39%, rgba(130, 130, 130, 0.03) 43%,rgba(184, 184, 184, 0.03) 43%, rgba(184, 184, 184, 0.03) 81%,rgba(108, 108, 108, 0.03) 81%, rgba(108, 108, 108, 0.03) 100%),linear-gradient(90deg, rgb(107, 4, 15),rgb(240, 4, 35))"}},
                { css: { background: "linear-gradient(194deg, rgba(231, 231, 231, 0.03) 0%, rgba(231, 231, 231, 0.03) 17%,rgba(29, 29, 29, 0.03) 17%, rgba(29, 29, 29, 0.03) 19%,rgba(234, 234, 234, 0.03) 19%, rgba(234, 234, 234, 0.03) 37%,rgba(240, 240, 240, 0.03) 37%, rgba(240, 240, 240, 0.03) 79%,rgba(91, 91, 91, 0.03) 79%, rgba(91, 91, 91, 0.03) 84%,rgba(73, 73, 73, 0.03) 84%, rgba(73, 73, 73, 0.03) 98%,rgba(21, 21, 21, 0.03) 98%, rgba(21, 21, 21, 0.03) 100%),linear-gradient(59deg, rgba(160, 160, 160, 0.03) 0%, rgba(160, 160, 160, 0.03) 3%,rgba(224, 224, 224, 0.03) 3%, rgba(224, 224, 224, 0.03) 6%,rgba(137, 137, 137, 0.03) 6%, rgba(137, 137, 137, 0.03) 23%,rgba(226, 226, 226, 0.03) 23%, rgba(226, 226, 226, 0.03) 30%,rgba(96, 96, 96, 0.03) 30%, rgba(96, 96, 96, 0.03) 44%,rgba(210, 210, 210, 0.03) 44%, rgba(210, 210, 210, 0.03) 74%,rgba(61, 61, 61, 0.03) 74%, rgba(61, 61, 61, 0.03) 100%),linear-gradient(22deg, rgba(201, 201, 201, 0.03) 0%, rgba(201, 201, 201, 0.03) 5%,rgba(89, 89, 89, 0.03) 5%, rgba(89, 89, 89, 0.03) 6%,rgba(100, 100, 100, 0.03) 6%, rgba(100, 100, 100, 0.03) 18%,rgba(172, 172, 172, 0.03) 18%, rgba(172, 172, 172, 0.03) 52%,rgba(128, 128, 128, 0.03) 52%, rgba(128, 128, 128, 0.03) 85%,rgba(240, 240, 240, 0.03) 85%, rgba(240, 240, 240, 0.03) 89%,rgba(51, 51, 51, 0.03) 89%, rgba(51, 51, 51, 0.03) 100%),linear-gradient(283deg, rgba(123, 123, 123, 0.03) 0%, rgba(123, 123, 123, 0.03) 10%,rgba(194, 194, 194, 0.03) 10%, rgba(194, 194, 194, 0.03) 34%,rgba(22, 22, 22, 0.03) 34%, rgba(22, 22, 22, 0.03) 36%,rgba(177, 177, 177, 0.03) 36%, rgba(177, 177, 177, 0.03) 46%,rgba(180, 180, 180, 0.03) 46%, rgba(180, 180, 180, 0.03) 59%,rgba(89, 89, 89, 0.03) 59%, rgba(89, 89, 89, 0.03) 80%,rgba(217, 217, 217, 0.03) 80%, rgba(217, 217, 217, 0.03) 100%),linear-gradient(342deg, rgba(171, 171, 171, 0.03) 0%, rgba(171, 171, 171, 0.03) 22%,rgba(238, 238, 238, 0.03) 22%, rgba(238, 238, 238, 0.03) 37%,rgba(186, 186, 186, 0.03) 37%, rgba(186, 186, 186, 0.03) 65%,rgba(80, 80, 80, 0.03) 65%, rgba(80, 80, 80, 0.03) 68%,rgba(49, 49, 49, 0.03) 68%, rgba(49, 49, 49, 0.03) 71%,rgba(137, 137, 137, 0.03) 71%, rgba(137, 137, 137, 0.03) 88%,rgba(224, 224, 224, 0.03) 88%, rgba(224, 224, 224, 0.03) 100%),linear-gradient(90deg, rgb(230, 215, 236),rgb(149, 28, 118))"}},
                { css: { background: "linear-gradient(45deg, rgba(114, 244, 149, 0.27) 0%, rgba(114, 244, 149, 0.27) 37%,rgba(126, 221, 156, 0.27) 37%, rgba(126, 221, 156, 0.27) 48%,rgba(137, 197, 162, 0.27) 48%, rgba(137, 197, 162, 0.27) 49%,rgba(149, 174, 169, 0.27) 49%, rgba(149, 174, 169, 0.27) 59%,rgba(160, 151, 175, 0.27) 59%, rgba(160, 151, 175, 0.27) 60%,rgba(172, 128, 182, 0.27) 60%, rgba(172, 128, 182, 0.27) 86%,rgba(183, 104, 188, 0.27) 86%, rgba(183, 104, 188, 0.27) 95%,rgba(195, 81, 195, 0.27) 95%, rgba(195, 81, 195, 0.27) 100%),linear-gradient(135deg, rgba(100, 114, 232, 0.27) 0%, rgba(100, 114, 232, 0.27) 18%,rgba(126, 135, 203, 0.27) 18%, rgba(126, 135, 203, 0.27) 23%,rgba(153, 156, 173, 0.27) 23%, rgba(153, 156, 173, 0.27) 44%,rgba(179, 178, 144, 0.27) 44%, rgba(179, 178, 144, 0.27) 62%,rgba(206, 199, 114, 0.27) 62%, rgba(206, 199, 114, 0.27) 98%,rgba(232, 220, 85, 0.27) 98%, rgba(232, 220, 85, 0.27) 100%),linear-gradient(0deg, rgb(47, 132, 199) 0%, rgb(47, 132, 199) 2%,rgb(47, 130, 208) 2%, rgb(47, 130, 208) 44%,rgb(47, 127, 218) 44%, rgb(47, 127, 218) 48%,rgb(47, 125, 227) 48%, rgb(47, 125, 227) 77%,rgb(47, 122, 237) 77%, rgb(47, 122, 237) 78%,rgb(47, 120, 246) 78%, rgb(47, 120, 246) 100%)"}},
            ],
            name: "Complex Angular", css: {  background: "linear-gradient(135deg, rgba(19, 176, 223, 0.26) 0%, rgba(19, 176, 223, 0.26) 23%, rgba(16, 160, 197, 0.26) 23%, rgba(16, 160, 197, 0.26) 65%, rgba(13, 144, 172, 0.26) 65%, rgba(13, 144, 172, 0.26) 70%, rgba(9, 129, 146, 0.26) 70%, rgba(9, 129, 146, 0.26) 74%, rgba(6, 113, 121, 0.26) 74%, rgba(6, 113, 121, 0.26) 90%, rgba(3, 97, 95, 0.26) 90%, rgba(3, 97, 95, 0.26) 100%), linear-gradient(45deg, rgba(65, 234, 230, 0.26) 0%, rgba(65, 234, 230, 0.26) 28%, rgba(88, 192, 215, 0.26) 28%, rgba(88, 192, 215, 0.26) 55%, rgba(110, 150, 201, 0.26) 55%, rgba(110, 150, 201, 0.26) 66%, rgba(133, 107, 186, 0.26) 66%, rgba(133, 107, 186, 0.26) 80%, rgba(155, 65, 172, 0.26) 80%, rgba(155, 65, 172, 0.26) 85%, rgba(178, 23, 157, 0.26) 85%, rgba(178, 23, 157, 0.26) 100%), linear-gradient(90deg, rgb(27, 194, 246) 0%, rgb(27, 194, 246) 6%, rgb(39, 174, 237) 6%, rgb(39, 174, 237) 32%, rgb(50, 155, 229) 32%, rgb(50, 155, 229) 40%, rgb(62, 135, 220) 40%, rgb(62, 135, 220) 66%, rgb(74, 116, 211) 66%, rgb(74, 116, 211) 72%, rgb(86, 96, 202) 72%, rgb(86, 96, 202) 86%, rgb(97, 77, 194) 86%, rgb(97, 77, 194) 96%, rgb(109, 57, 185) 96%, rgb(109, 57, 185) 100%)"} },
        {
            list: [
                { css: { background: "linear-gradient(45deg, rgba(13, 155, 205, 0.26) 0%, rgba(13, 155, 205, 0.26) 15%,rgba(17, 150, 214, 0.26) 15%, rgba(17, 150, 214, 0.26) 48%,rgba(20, 145, 223, 0.26) 48%, rgba(20, 145, 223, 0.26) 56%,rgba(24, 140, 232, 0.26) 56%, rgba(24, 140, 232, 0.26) 71%,rgba(27, 135, 241, 0.26) 71%, rgba(27, 135, 241, 0.26) 77%,rgba(31, 130, 250, 0.26) 77%, rgba(31, 130, 250, 0.26) 100%),linear-gradient(0deg, rgba(123, 60, 148, 0.26) 0%, rgba(123, 60, 148, 0.26) 27%,rgba(128, 86, 151, 0.26) 27%, rgba(128, 86, 151, 0.26) 30%,rgba(133, 112, 154, 0.26) 30%, rgba(133, 112, 154, 0.26) 31%,rgba(137, 139, 157, 0.26) 31%, rgba(137, 139, 157, 0.26) 40%,rgba(142, 165, 160, 0.26) 40%, rgba(142, 165, 160, 0.26) 65%,rgba(147, 191, 163, 0.26) 65%, rgba(147, 191, 163, 0.26) 100%),linear-gradient(90deg, rgb(14, 90, 138) 0%, rgb(14, 90, 138) 2%,rgb(12, 104, 141) 2%, rgb(12, 104, 141) 7%,rgb(11, 118, 145) 7%, rgb(11, 118, 145) 11%,rgb(9, 132, 148) 11%, rgb(9, 132, 148) 16%,rgb(8, 147, 152) 16%, rgb(8, 147, 152) 84%,rgb(6, 161, 155) 84%, rgb(6, 161, 155) 85%,rgb(5, 175, 159) 85%, rgb(5, 175, 159) 99%,rgb(3, 189, 162) 99%, rgb(3, 189, 162) 100%)"}},
                { css: { background: "linear-gradient(0, rgba(15, 100, 236, 0.5) 0%, rgba(15, 100, 236, 0.5) 17%,rgba(34, 112, 230, 0.5) 17%, rgba(34, 112, 230, 0.5) 31%,rgba(53, 124, 224, 0.5) 31%, rgba(53, 124, 224, 0.5) 56%,rgba(72, 136, 218, 0.5) 56%, rgba(72, 136, 218, 0.5) 57%,rgba(92, 149, 213, 0.5) 57%, rgba(92, 149, 213, 0.5) 71%,rgba(111, 161, 207, 0.5) 71%, rgba(111, 161, 207, 0.5) 79%,rgba(130, 173, 201, 0.5) 79%, rgba(130, 173, 201, 0.5) 90%,rgba(149, 185, 195, 0.5) 90%, rgba(149, 185, 195, 0.5) 100%),linear-gradient(90deg, rgb(213, 240, 122) 0%, rgb(213, 240, 122) 7%,rgb(184, 222, 123) 7%, rgb(184, 222, 123) 17%,rgb(155, 204, 125) 17%, rgb(155, 204, 125) 21%,rgb(126, 186, 126) 21%, rgb(126, 186, 126) 22%,rgb(96, 168, 127) 22%, rgb(96, 168, 127) 23%,rgb(67, 150, 128) 23%, rgb(67, 150, 128) 34%,rgb(38, 132, 130) 34%, rgb(38, 132, 130) 65%,rgb(9, 114, 131) 65%, rgb(9, 114, 131) 100%)"}},                
                { css: { background: "linear-gradient(0, rgba(99, 99, 62, 0.5) 0%, rgba(99, 99, 62, 0.5) 25%,rgba(83, 145, 76, 0.5) 25%, rgba(83, 145, 76, 0.5) 50%,rgba(68, 191, 91, 0.5) 50%, rgba(68, 191, 91, 0.5) 75%,rgba(52, 237, 105, 0.5) 75%, rgba(52, 237, 105, 0.5) 100%),linear-gradient(90deg, rgb(52, 141, 97) 0%, rgb(52, 141, 97) 25%,rgb(56, 101, 96) 25%, rgb(56, 101, 96) 50%,rgb(60, 61, 94) 50%, rgb(60, 61, 94) 75%,rgb(64, 21, 93) 75%, rgb(64, 21, 93) 100%)"}},
                { css: { background: "linear-gradient(0deg, rgba(189, 205, 225, 0.5) 0%, rgba(189, 205, 225, 0.5) 3%, rgba(163, 183, 210, 0.5) 3%, rgba(163, 183, 210, 0.5) 23%, rgba(137, 162, 196, 0.5) 23%, rgba(137, 162, 196, 0.5) 28%, rgba(111, 140, 181, 0.5) 28%, rgba(111, 140, 181, 0.5) 54%, rgba(85, 119, 167, 0.5) 54%, rgba(85, 119, 167, 0.5) 73%, rgba(59, 97, 152, 0.5) 73%, rgba(59, 97, 152, 0.5) 80%, rgba(33, 76, 138, 0.5) 80%, rgba(33, 76, 138, 0.5) 85%, rgba(7, 54, 123, 0.5) 85%, rgba(7, 54, 123, 0.5) 100%), linear-gradient(90deg, rgb(38, 57, 138) 0%, rgb(38, 57, 138) 11%, rgb(54, 81, 152) 11%, rgb(54, 81, 152) 14%, rgb(71, 105, 166) 14%, rgb(71, 105, 166) 27%, rgb(87, 129, 180) 27%, rgb(87, 129, 180) 32%, rgb(103, 152, 193) 32%, rgb(103, 152, 193) 49%, rgb(119, 176, 207) 49%, rgb(119, 176, 207) 51%, rgb(136, 200, 221) 51%, rgb(136, 200, 221) 89%, rgb(152, 224, 235) 89%, rgb(152, 224, 235) 100%)"}},
            ],
            name: "Square", css: {  background: "linear-gradient(0deg, rgba(117, 80, 126, 0.55) 0%, rgba(117, 80, 126, 0.55) 25%, rgba(101, 138, 130, 0.55) 25%, rgba(101, 138, 130, 0.55) 50%, rgba(86, 195, 134, 0.55) 50%, rgba(86, 195, 134, 0.55) 75%, rgba(70, 253, 138, 0.55) 75%, rgba(70, 253, 138, 0.55) 100%), linear-gradient(90deg, rgb(50, 93, 60) 0%, rgb(50, 93, 60) 20%, rgb(44, 126, 100) 20%, rgb(44, 126, 100) 40%, rgb(37, 159, 139) 40%, rgb(37, 159, 139) 60%, rgb(31, 192, 179) 60%, rgb(31, 192, 179) 80%, rgb(24, 225, 218) 80%, rgb(24, 225, 218) 100%)"} },
        {
            list: [
                { css: { background: "linear-gradient(44deg, rgba(84, 153, 197, 0.04) 0%, rgba(84, 153, 197, 0.04) 50%,rgba(43, 252, 236, 0.04) 50%, rgba(43, 252, 236, 0.04) 100%),linear-gradient(264deg, rgba(197, 57, 189, 0.04) 0%, rgba(197, 57, 189, 0.04) 50%,rgba(167, 106, 179, 0.04) 50%, rgba(167, 106, 179, 0.04) 100%),linear-gradient(323deg, rgba(76, 28, 237, 0.04) 0%, rgba(76, 28, 237, 0.04) 50%,rgba(115, 208, 165, 0.04) 50%, rgba(115, 208, 165, 0.04) 100%),linear-gradient(236deg, rgba(241, 1, 111, 0.04) 0%, rgba(241, 1, 111, 0.04) 50%,rgba(7, 173, 72, 0.04) 50%, rgba(7, 173, 72, 0.04) 100%),linear-gradient(296deg, rgba(124, 241, 241, 0.04) 0%, rgba(124, 241, 241, 0.04) 50%,rgba(26, 63, 229, 0.04) 50%, rgba(26, 63, 229, 0.04) 100%),linear-gradient(96deg, rgba(87, 80, 82, 0.04) 0%, rgba(87, 80, 82, 0.04) 50%,rgba(104, 13, 102, 0.04) 50%, rgba(104, 13, 102, 0.04) 100%),linear-gradient(254deg, rgba(127, 190, 93, 0.04) 0%, rgba(127, 190, 93, 0.04) 50%,rgba(120, 35, 199, 0.04) 50%, rgba(120, 35, 199, 0.04) 100%),linear-gradient(353deg, rgba(227, 212, 206, 0.04) 0%, rgba(227, 212, 206, 0.04) 50%,rgba(55, 215, 100, 0.04) 50%, rgba(55, 215, 100, 0.04) 100%),linear-gradient(218deg, rgba(32, 99, 251, 0.04) 0%, rgba(32, 99, 251, 0.04) 50%,rgba(230, 154, 131, 0.04) 50%, rgba(230, 154, 131, 0.04) 100%),linear-gradient(266deg, rgb(101, 254, 171),rgb(119, 206, 247))"}},
                { css: { background: "linear-gradient(238deg, rgba(70, 70, 70, 0.09) 0%, rgba(70, 70, 70, 0.09) 50%,rgba(214, 214, 214, 0.09) 50%, rgba(214, 214, 214, 0.09) 100%),linear-gradient(126deg, rgba(223, 223, 223, 0.05) 0%, rgba(223, 223, 223, 0.05) 50%,rgba(217, 217, 217, 0.05) 50%, rgba(217, 217, 217, 0.05) 100%),linear-gradient(152deg, rgba(116, 116, 116, 0.08) 0%, rgba(116, 116, 116, 0.08) 50%,rgba(248, 248, 248, 0.08) 50%, rgba(248, 248, 248, 0.08) 100%),linear-gradient(225deg, rgba(1, 1, 1, 0.07) 0%, rgba(1, 1, 1, 0.07) 50%,rgba(5, 5, 5, 0.07) 50%, rgba(5, 5, 5, 0.07) 100%),linear-gradient(194deg, rgba(14, 14, 14, 0.09) 0%, rgba(14, 14, 14, 0.09) 50%,rgba(206, 206, 206, 0.09) 50%, rgba(206, 206, 206, 0.09) 100%),linear-gradient(100deg, rgba(220, 220, 220, 0.07) 0%, rgba(220, 220, 220, 0.07) 50%,rgba(65, 65, 65, 0.07) 50%, rgba(65, 65, 65, 0.07) 100%),linear-gradient(190deg, rgba(194, 194, 194, 0.03) 0%, rgba(194, 194, 194, 0.03) 50%,rgba(206, 206, 206, 0.03) 50%, rgba(206, 206, 206, 0.03) 100%),linear-gradient(320deg, rgba(10, 10, 10, 0.08) 0%, rgba(10, 10, 10, 0.08) 50%,rgba(231, 231, 231, 0.08) 50%, rgba(231, 231, 231, 0.08) 100%),linear-gradient(90deg, rgb(10, 147, 39),rgb(235, 252, 123))"}},
            ],
            name: "Burst", css: {  background: "linear-gradient(201deg, rgba(148, 148, 148, 0.07) 0%, rgba(148, 148, 148, 0.07) 50%, rgba(83, 83, 83, 0.07) 50%, rgba(83, 83, 83, 0.07) 100%), linear-gradient(192deg, rgba(176, 176, 176, 0.08) 0%, rgba(176, 176, 176, 0.08) 50%, rgba(180, 180, 180, 0.08) 50%, rgba(180, 180, 180, 0.08) 100%), linear-gradient(48deg, rgba(185, 185, 185, 0.1) 0%, rgba(185, 185, 185, 0.1) 50%, rgba(243, 243, 243, 0.1) 50%, rgba(243, 243, 243, 0.1) 100%), linear-gradient(65deg, rgba(172, 172, 172, 0.09) 0%, rgba(172, 172, 172, 0.09) 50%, rgba(209, 209, 209, 0.09) 50%, rgba(209, 209, 209, 0.09) 100%), linear-gradient(4deg, rgba(224, 224, 224, 0.03) 0%, rgba(224, 224, 224, 0.03) 50%, rgba(49, 49, 49, 0.03) 50%, rgba(49, 49, 49, 0.03) 100%), linear-gradient(228deg, rgba(152, 152, 152, 0.03) 0%, rgba(152, 152, 152, 0.03) 50%, rgba(130, 130, 130, 0.03) 50%, rgba(130, 130, 130, 0.03) 100%), linear-gradient(163deg, rgba(170, 170, 170, 0.08) 0%, rgba(170, 170, 170, 0.08) 50%, rgba(232, 232, 232, 0.08) 50%, rgba(232, 232, 232, 0.08) 100%), linear-gradient(152deg, rgba(12, 12, 12, 0.05) 0%, rgba(12, 12, 12, 0.05) 50%, rgba(161, 161, 161, 0.05) 50%, rgba(161, 161, 161, 0.05) 100%), linear-gradient(302deg, rgba(48, 48, 48, 0.1) 0%, rgba(48, 48, 48, 0.1) 50%, rgba(195, 195, 195, 0.1) 50%, rgba(195, 195, 195, 0.1) 100%), linear-gradient(90deg, rgb(144, 14, 253), rgb(74, 115, 255))"} },
        {
            list: [
                { css: { background: "linear-gradient(45deg, rgb(8, 38, 17) 0%, rgb(8, 38, 17) 14.286%,rgb(13, 64, 27) 14.286%, rgb(13, 64, 27) 28.572%,rgb(17, 91, 36) 28.572%, rgb(17, 91, 36) 42.858%,rgb(22, 117, 46) 42.858%, rgb(22, 117, 46) 57.144%,rgb(26, 143, 56) 57.144%, rgb(26, 143, 56) 71.43%,rgb(31, 170, 65) 71.43%, rgb(31, 170, 65) 85.716%,rgb(35, 196, 75) 85.716%, rgb(35, 196, 75) 100.002%)"}},
                { css: { background: "linear-gradient(45deg, rgb(2, 6, 1) 0%, rgb(2, 6, 1) 14.286%,rgb(8, 29, 31) 14.286%, rgb(8, 29, 31) 28.572%,rgb(13, 52, 61) 28.572%, rgb(13, 52, 61) 42.858%,rgb(19, 75, 92) 42.858%, rgb(19, 75, 92) 57.144%,rgb(25, 98, 122) 57.144%, rgb(25, 98, 122) 71.43%,rgb(30, 121, 152) 71.43%, rgb(30, 121, 152) 85.716%,rgb(36, 144, 182) 85.716%, rgb(36, 144, 182) 100.002%)"}},
            ],
            name: "Even Stripes", css: {  background: "linear-gradient(45deg, rgba(171, 212, 83, 0.7) 0%, rgba(171, 212, 83, 0.7) 12.5%, rgba(218, 229, 42, 0.7) 12.5%, rgba(218, 229, 42, 0.7) 25%, rgba(125, 195, 123, 0.7) 25%, rgba(125, 195, 123, 0.7) 37.5%, rgba(194, 221, 63, 0.7) 37.5%, rgba(194, 221, 63, 0.7) 50%, rgba(78, 178, 164, 0.7) 50%, rgba(78, 178, 164, 0.7) 62.5%, rgba(148, 204, 103, 0.7) 62.5%, rgba(148, 204, 103, 0.7) 75%, rgba(241, 238, 22, 0.7) 75%, rgba(241, 238, 22, 0.7) 87.5%, rgba(101, 187, 144, 0.7) 87.5%, rgba(101, 187, 144, 0.7) 100%), linear-gradient(0deg, rgb(73, 182, 19), rgb(231, 253, 15))"} },
        {
            list: [
                { css: { background: ""}},
                { css: { background: ""}},
            ],
            name: "Gingham (Traditional)", css: {  background: "repeating-linear-gradient(90deg, rgba(248, 86, 84, 0.5) 0px, rgba(248, 86, 84, 0.5) 20px, transparent 20px, transparent 40px), repeating-linear-gradient(0deg, rgba(248, 86, 84, 0.5) 0px, rgba(248, 86, 84, 0.5) 20px, transparent 20px, transparent 40px), linear-gradient(90deg, rgb(255, 255, 255), rgb(255, 255, 255))"} },
        {
            list: [
                { css: { background: ""}},
                { css: { background: ""}},
            ],
            name: "Gingham (Colored)", css: {  background: "repeating-linear-gradient(90deg, rgba(195, 246, 54, 0.5) 0px, rgba(195, 246, 54, 0.5) 30px, transparent 30px, transparent 60px), repeating-linear-gradient(0deg, rgba(195, 246, 54, 0.5) 0px, rgba(195, 246, 54, 0.5) 30px, transparent 30px, transparent 60px), linear-gradient(90deg, rgb(56, 159, 59), rgb(56, 159, 59))"} },
        {
            list: [
                { css: { background: ""}},
                { css: { background: ""}},
            ],
            name: "Basic Grid", css: {  background: "repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.15) 0px, rgba(255, 255, 255, 0.15) 1px, transparent 1px, transparent 36px), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.15) 0px, rgba(255, 255, 255, 0.15) 1px, transparent 1px, transparent 36px), linear-gradient(90deg, rgb(10, 89, 174), rgb(10, 89, 174))"} },
        {
            list: [{
                css: { background: ""},
                css: { background: ""},
            }],
            name: "Complex Shapes", css: {  background: "linear-gradient(45deg, rgba(87, 119, 152, 0.2) 0%, rgba(87, 119, 152, 0.2) 16.667%, rgba(16, 33, 135, 0.2) 16.667%, rgba(16, 33, 135, 0.2) 33.334%, rgba(52, 76, 143, 0.2) 33.334%, rgba(52, 76, 143, 0.2) 50.001%, rgba(194, 248, 177, 0.2) 50.001%, rgba(194, 248, 177, 0.2) 66.668%, rgba(158, 205, 169, 0.2) 66.668%, rgba(158, 205, 169, 0.2) 83.335%, rgba(123, 162, 160, 0.2) 83.335%, rgba(123, 162, 160, 0.2) 100.002%), linear-gradient(135deg, rgba(87, 119, 152, 0.2) 0%, rgba(87, 119, 152, 0.2) 16.667%, rgba(16, 33, 135, 0.2) 16.667%, rgba(16, 33, 135, 0.2) 33.334%, rgba(52, 76, 143, 0.2) 33.334%, rgba(52, 76, 143, 0.2) 50.001%, rgba(194, 248, 177, 0.2) 50.001%, rgba(194, 248, 177, 0.2) 66.668%, rgba(158, 205, 169, 0.2) 66.668%, rgba(158, 205, 169, 0.2) 83.335%, rgba(123, 162, 160, 0.2) 83.335%, rgba(123, 162, 160, 0.2) 100.002%), linear-gradient(0deg, rgba(87, 119, 152, 0.2) 0%, rgba(87, 119, 152, 0.2) 16.667%, rgba(16, 33, 135, 0.2) 16.667%, rgba(16, 33, 135, 0.2) 33.334%, rgba(52, 76, 143, 0.2) 33.334%, rgba(52, 76, 143, 0.2) 50.001%, rgba(194, 248, 177, 0.2) 50.001%, rgba(194, 248, 177, 0.2) 66.668%, rgba(158, 205, 169, 0.2) 66.668%, rgba(158, 205, 169, 0.2) 83.335%, rgba(123, 162, 160, 0.2) 83.335%, rgba(123, 162, 160, 0.2) 100.002%), linear-gradient(90deg, rgb(213, 156, 226), rgb(132, 69, 189))"} },
        {
            list: [{
                css: { background: ""},
                css: { background: ""},
            }],
            name: "Complex Repeating Stripes", css: {  background: "repeating-linear-gradient(45deg, rgba(208, 208, 208, 0.13) 0px, rgba(208, 208, 208, 0.13) 43px, rgba(195, 195, 195, 0.13) 43px, rgba(195, 195, 195, 0.13) 85px, rgba(41, 41, 41, 0.13) 85px, rgba(41, 41, 41, 0.13) 109px, rgba(88, 88, 88, 0.13) 109px, rgba(88, 88, 88, 0.13) 129px, rgba(24, 24, 24, 0.13) 129px, rgba(24, 24, 24, 0.13) 139px, rgba(92, 92, 92, 0.13) 139px, rgba(92, 92, 92, 0.13) 179px, rgba(37, 37, 37, 0.13) 179px, rgba(37, 37, 37, 0.13) 219px), repeating-linear-gradient(45deg, rgba(18, 18, 18, 0.13) 0px, rgba(18, 18, 18, 0.13) 13px, rgba(48, 48, 48, 0.13) 13px, rgba(48, 48, 48, 0.13) 61px, rgba(130, 130, 130, 0.13) 61px, rgba(130, 130, 130, 0.13) 84px, rgba(233, 233, 233, 0.13) 84px, rgba(233, 233, 233, 0.13) 109px, rgba(8, 8, 8, 0.13) 109px, rgba(8, 8, 8, 0.13) 143px, rgba(248, 248, 248, 0.13) 143px, rgba(248, 248, 248, 0.13) 173px, rgba(37, 37, 37, 0.13) 173px, rgba(37, 37, 37, 0.13) 188px), repeating-linear-gradient(45deg, rgba(3, 3, 3, 0.1) 0px, rgba(3, 3, 3, 0.1) 134px, rgba(82, 82, 82, 0.1) 134px, rgba(82, 82, 82, 0.1) 282px, rgba(220, 220, 220, 0.1) 282px, rgba(220, 220, 220, 0.1) 389px, rgba(173, 173, 173, 0.1) 389px, rgba(173, 173, 173, 0.1) 458px, rgba(109, 109, 109, 0.1) 458px, rgba(109, 109, 109, 0.1) 516px, rgba(240, 240, 240, 0.1) 516px, rgba(240, 240, 240, 0.1) 656px, rgba(205, 205, 205, 0.1) 656px, rgba(205, 205, 205, 0.1) 722px), linear-gradient(90deg, rgb(21, 145, 22), rgb(39, 248, 84))"} },
        {
            list: [{
                css: { background: ""},
                css: { background: ""},
            }],
            name: "Futeristic Stripes", css: {  background: "linear-gradient(90deg, rgba(6, 6, 6, 0.01) 0%, rgba(6, 6, 6, 0.01) 1%, rgba(131, 131, 131, 0.01) 1%, rgba(131, 131, 131, 0.01) 14%, rgba(250, 250, 250, 0.01) 14%, rgba(250, 250, 250, 0.01) 26%, rgba(30, 30, 30, 0.01) 26%, rgba(30, 30, 30, 0.01) 62%, rgba(117, 117, 117, 0.01) 62%, rgba(117, 117, 117, 0.01) 66%, rgba(248, 248, 248, 0.01) 66%, rgba(248, 248, 248, 0.01) 76%, rgba(39, 39, 39, 0.01) 76%, rgba(39, 39, 39, 0.01) 100%), linear-gradient(90deg, rgba(57, 57, 57, 0.06) 0%, rgba(57, 57, 57, 0.06) 4%, rgba(227, 227, 227, 0.06) 4%, rgba(227, 227, 227, 0.06) 26%, rgba(67, 67, 67, 0.06) 26%, rgba(67, 67, 67, 0.06) 27%, rgba(126, 126, 126, 0.06) 27%, rgba(126, 126, 126, 0.06) 39%, rgba(103, 103, 103, 0.06) 39%, rgba(103, 103, 103, 0.06) 72%, rgba(16, 16, 16, 0.06) 72%, rgba(16, 16, 16, 0.06) 76%, rgba(21, 21, 21, 0.06) 76%, rgba(21, 21, 21, 0.06) 88%, rgba(69, 69, 69, 0.06) 88%, rgba(69, 69, 69, 0.06) 100%), linear-gradient(90deg, rgba(156, 156, 156, 0.05) 0%, rgba(156, 156, 156, 0.05) 12%, rgba(54, 54, 54, 0.05) 12%, rgba(54, 54, 54, 0.05) 48%, rgba(169, 169, 169, 0.05) 48%, rgba(169, 169, 169, 0.05) 59%, rgba(104, 104, 104, 0.05) 59%, rgba(104, 104, 104, 0.05) 62%, rgba(165, 165, 165, 0.05) 62%, rgba(165, 165, 165, 0.05) 68%, rgba(124, 124, 124, 0.05) 68%, rgba(124, 124, 124, 0.05) 77%, rgba(189, 189, 189, 0.05) 77%, rgba(189, 189, 189, 0.05) 85%, rgba(173, 173, 173, 0.05) 85%, rgba(173, 173, 173, 0.05) 100%), linear-gradient(90deg, rgba(182, 182, 182, 0.07) 0%, rgba(182, 182, 182, 0.07) 22%, rgba(122, 122, 122, 0.07) 22%, rgba(122, 122, 122, 0.07) 28%, rgba(62, 62, 62, 0.07) 28%, rgba(62, 62, 62, 0.07) 44%, rgba(89, 89, 89, 0.07) 44%, rgba(89, 89, 89, 0.07) 61%, rgba(110, 110, 110, 0.07) 61%, rgba(110, 110, 110, 0.07) 83%, rgba(185, 185, 185, 0.07) 83%, rgba(185, 185, 185, 0.07) 86%, rgba(192, 192, 192, 0.07) 86%, rgba(192, 192, 192, 0.07) 100%), linear-gradient(90deg, rgba(8, 8, 8, 0.06) 0%, rgba(8, 8, 8, 0.06) 54%, rgba(48, 48, 48, 0.06) 54%, rgba(48, 48, 48, 0.06) 57%, rgba(245, 245, 245, 0.06) 57%, rgba(245, 245, 245, 0.06) 86%, rgba(12, 12, 12, 0.06) 86%, rgba(12, 12, 12, 0.06) 94%, rgba(225, 225, 225, 0.06) 94%, rgba(225, 225, 225, 0.06) 100%), linear-gradient(90deg, rgb(53, 169, 225) 0%, rgb(1, 145, 219) 80%, rgb(26, 221, 247) 100%)"} },
        {
            list: [{
                css: { background: ""},
                css: { background: ""},
            }],
            name: "Uneven Diamonds", css: {  background: "linear-gradient(134deg, rgba(110, 49, 41, 0.5) 0%, rgba(110, 49, 41, 0.5) 14.286%, rgba(134, 48, 65, 0.5) 14.286%, rgba(134, 48, 65, 0.5) 28.572%, rgba(157, 46, 89, 0.5) 28.572%, rgba(157, 46, 89, 0.5) 42.858%, rgba(181, 45, 113, 0.5) 42.858%, rgba(181, 45, 113, 0.5) 57.144%, rgba(204, 43, 136, 0.5) 57.144%, rgba(204, 43, 136, 0.5) 71.43%, rgba(228, 42, 160, 0.5) 71.43%, rgba(228, 42, 160, 0.5) 85.716%, rgba(251, 40, 184, 0.5) 85.716%, rgba(251, 40, 184, 0.5) 100.002%), linear-gradient(122deg, rgb(223, 89, 139) 0%, rgb(223, 89, 139) 14.286%, rgb(195, 88, 127) 14.286%, rgb(195, 88, 127) 28.572%, rgb(167, 87, 116) 28.572%, rgb(167, 87, 116) 42.858%, rgb(140, 87, 104) 42.858%, rgb(140, 87, 104) 57.144%, rgb(112, 86, 92) 57.144%, rgb(112, 86, 92) 71.43%, rgb(84, 85, 81) 71.43%, rgb(84, 85, 81) 85.716%, rgb(56, 84, 69) 85.716%, rgb(56, 84, 69) 100.002%)"} },
        {
            list: [{
                css: { background: ""},
                css: { background: ""},
            }],
            name: "Light Background", css: {  background: "linear-gradient(22.5deg, rgba(67, 67, 67, 0.02) 0%, rgba(67, 67, 67, 0.02) 29%, rgba(47, 47, 47, 0.02) 29%, rgba(47, 47, 47, 0.02) 37%, rgba(23, 23, 23, 0.02) 37%, rgba(23, 23, 23, 0.02) 55%, rgba(182, 182, 182, 0.02) 55%, rgba(182, 182, 182, 0.02) 69%, rgba(27, 27, 27, 0.02) 69%, rgba(27, 27, 27, 0.02) 71%, rgba(250, 250, 250, 0.02) 71%, rgba(250, 250, 250, 0.02) 100%), linear-gradient(67.5deg, rgba(117, 117, 117, 0.02) 0%, rgba(117, 117, 117, 0.02) 14%, rgba(199, 199, 199, 0.02) 14%, rgba(199, 199, 199, 0.02) 40%, rgba(33, 33, 33, 0.02) 40%, rgba(33, 33, 33, 0.02) 48%, rgba(135, 135, 135, 0.02) 48%, rgba(135, 135, 135, 0.02) 60%, rgba(148, 148, 148, 0.02) 60%, rgba(148, 148, 148, 0.02) 95%, rgba(53, 53, 53, 0.02) 95%, rgba(53, 53, 53, 0.02) 100%), linear-gradient(135deg, rgba(190, 190, 190, 0.02) 0%, rgba(190, 190, 190, 0.02) 6%, rgba(251, 251, 251, 0.02) 6%, rgba(251, 251, 251, 0.02) 18%, rgba(2, 2, 2, 0.02) 18%, rgba(2, 2, 2, 0.02) 27%, rgba(253, 253, 253, 0.02) 27%, rgba(253, 253, 253, 0.02) 49%, rgba(128, 128, 128, 0.02) 49%, rgba(128, 128, 128, 0.02) 76%, rgba(150, 150, 150, 0.02) 76%, rgba(150, 150, 150, 0.02) 100%), linear-gradient(90deg, rgb(255, 255, 255), rgb(255, 255, 255))"} },
        {
            list: [{
                css: { background: ""},
                css: { background: ""},
            }],
            name: "Standard-Rainbow", css: {  background: "linear-gradient(90deg, rgb(98, 229, 249), rgb(98, 115, 249), rgb(194, 98, 249), rgb(249, 98, 191), rgb(249, 118, 98), rgb(249, 232, 98), rgb(153, 249, 98), rgb(98, 249, 156))"} },
        {
            list: [{
                css: { background: ""},
                css: { background: ""},
            }],
            name: "Repeating Stripes", css: {  background: "repeating-linear-gradient(90deg, rgb(95, 152, 225) 0px, rgb(95, 152, 225) 10px, rgb(115, 164, 229) 10px, rgb(115, 164, 229) 20px, rgb(135, 175, 233) 20px, rgb(135, 175, 233) 30px, rgb(214, 222, 250) 30px, rgb(214, 222, 250) 40px, rgb(174, 199, 242) 40px, rgb(174, 199, 242) 50px, rgb(155, 187, 238) 50px, rgb(155, 187, 238) 60px, rgb(194, 210, 246) 60px, rgb(194, 210, 246) 70px)"} },
        {
            list: [{
                css: { background: ""},
                css: { background: ""},
            }],
            name: "Fracture", css: {  background: "linear-gradient(52deg, rgba(163, 163, 163, 0.09) 0%, rgba(163, 163, 163, 0.09) 33.3%, rgba(100, 100, 100, 0.09) 33.3%, rgba(100, 100, 100, 0.09) 66.6%, rgba(162, 162, 162, 0.09) 66.6%, rgba(162, 162, 162, 0.09) 99%), linear-gradient(258deg, rgba(193, 193, 193, 0.06) 0%, rgba(193, 193, 193, 0.06) 33.3%, rgba(169, 169, 169, 0.06) 33.3%, rgba(169, 169, 169, 0.06) 66.6%, rgba(92, 92, 92, 0.06) 66.6%, rgba(92, 92, 92, 0.06) 99%), linear-gradient(129deg, rgba(45, 45, 45, 0.03) 0%, rgba(45, 45, 45, 0.03) 33.3%, rgba(223, 223, 223, 0.03) 33.3%, rgba(223, 223, 223, 0.03) 66.6%, rgba(173, 173, 173, 0.03) 66.6%, rgba(173, 173, 173, 0.03) 99%), linear-gradient(280deg, rgba(226, 226, 226, 0.06) 0%, rgba(226, 226, 226, 0.06) 33.3%, rgba(81, 81, 81, 0.06) 33.3%, rgba(81, 81, 81, 0.06) 66.6%, rgba(186, 186, 186, 0.06) 66.6%, rgba(186, 186, 186, 0.06) 99%), linear-gradient(85deg, rgba(225, 225, 225, 0.04) 0%, rgba(225, 225, 225, 0.04) 33.3%, rgba(95, 95, 95, 0.04) 33.3%, rgba(95, 95, 95, 0.04) 66.6%, rgba(39, 39, 39, 0.04) 66.6%, rgba(39, 39, 39, 0.04) 99%), linear-gradient(128deg, rgba(184, 184, 184, 0.06) 0%, rgba(184, 184, 184, 0.06) 33.3%, rgba(0, 0, 0, 0.06) 33.3%, rgba(0, 0, 0, 0.06) 66.6%, rgba(140, 140, 140, 0.06) 66.6%, rgba(140, 140, 140, 0.06) 99.9%), linear-gradient(323deg, rgba(40, 40, 40, 0.07) 0%, rgba(40, 40, 40, 0.07) 33.3%, rgba(214, 214, 214, 0.07) 33.3%, rgba(214, 214, 214, 0.07) 66.6%, rgba(190, 190, 190, 0.07) 66.6%, rgba(190, 190, 190, 0.07) 99.9%), linear-gradient(61deg, rgba(230, 230, 230, 0) 0%, rgba(230, 230, 230, 0) 33.3%, rgba(241, 241, 241, 0) 33.3%, rgba(241, 241, 241, 0) 66.6%, rgba(55, 55, 55, 0) 66.6%, rgba(55, 55, 55, 0) 99%), linear-gradient(0deg, rgb(38, 37, 227), rgb(11, 186, 239))"} },
        {
            list: [{
                css: { background: ""},
                css: { background: ""},
            }],
            name: "Complex Grid", css: {  background: "repeating-linear-gradient(67.5deg, rgba(252, 252, 252, 0.05) 0px, rgba(252, 252, 252, 0.05) 1px, transparent 1px, transparent 54px), repeating-linear-gradient(157.5deg, rgba(252, 252, 252, 0.05) 0px, rgba(252, 252, 252, 0.05) 1px, transparent 1px, transparent 54px), repeating-linear-gradient(67.5deg, rgba(252, 252, 252, 0.05) 0px, rgba(252, 252, 252, 0.05) 1px, transparent 1px, transparent 25px), repeating-linear-gradient(0deg, rgba(252, 252, 252, 0.05) 0px, rgba(252, 252, 252, 0.05) 1px, transparent 1px, transparent 25px), repeating-linear-gradient(67.5deg, rgba(252, 252, 252, 0.05) 0px, rgba(252, 252, 252, 0.05) 1px, transparent 1px, transparent 12px), repeating-linear-gradient(157.5deg, rgba(252, 252, 252, 0.05) 0px, rgba(252, 252, 252, 0.05) 1px, transparent 1px, transparent 12px), linear-gradient(90deg, rgb(86, 53, 156), rgb(86, 53, 156))"} },
        {
            list: [{
                css: { background: ""},
                css: { background: ""},
            }],
            name: "Standard Circles", css: {  background: "radial-gradient(circle at center top, rgb(244, 234, 104), rgb(234, 179, 103), rgb(224, 125, 103), rgb(214, 70, 102), rgb(204, 15, 101))"} },
    ]
    let headers = [
        { name: "Header 1", value: "header_1", css: { fontSize: "18px", fontWeight:"lighter" }},
        { name: "Header 2", value: "header_2", css: { fontSize: "18px", fontWeight:"lighter" }},
    ]
    let add_img = null,
        delete_btn,
        bg_btn = null,
        header_types = null

    let container = $customizations_setup_container(e)
    $addColors(e.target, container.child)
    bg_btn = $addTxtBtn(container.child, {text: "Dark Background", dropdown: true }, { left: true, right: true})
    header_types = $addTxtBtn(container.child, {text: "Header 1", dropdown: true }, { left: false, right: true})
    add_img = $addIcoBtn(e, container.child, 'icon-image')
    delete_btn = $addIcoBtn(e, container.child, 'icon-delete')
  
    add_img.click((ev) => $uploadImgFile(e, { setAsBG: true }))
    bg_btn.click((ev) => {
        $customizations._list1 = true
        let list_btns = $generateList(ev, backgrounds, { cardList: true })
        for(let i=0; i<list_btns.length; i++) {
            list_btns[i].click(() => {
                backgrounds[i].list["name"] = backgrounds[i].name
                let list_sub_btns = $generateList(ev, backgrounds[i].list, {cardList: true, subCards: true})
                for(let j=0; j<list_sub_btns.length; j++) {
                    list_sub_btns[j].click(() => {
                        $(e.target).css(backgrounds[i].list[j].css)
                        bg_btn.find("span").html(backgrounds[i].name)
                    })
                }
            })
        }
    })
    header_types.click((ev) => {
        $customizations._list1 = true
        let list_btns = $generateList(ev, headers)
        for(let i=0; i<list_btns.length; i++) {
            list_btns[i].attr("add-component", "add_" + headers[i].value)
            list_btns[i].click(() => {
                header_types.find("span").html(headers[i].name)
                // $(e.target).remove()
            })
        }
    })
    container.parent.mouseleave(() => { if(!$customizations._list1 && !$customizations._list2) container.parent.remove() })
}
function $generateList(e, list, type) {
    e = e.target
    let parent = $("<div>"),
        child = $("<div>"),
        offset = $(e).offset(), height = $(e).outerHeight(), width = $(parent).width(),
        list_item = []
    parent.append(child)
    $(document.body).append(parent)
    parent.addClass('proto-container-1')
    child.addClass('proto-container-child-1')
    if(!type) {
        child.css("flexDirection", "column")
    } else if(type.cardList) {
        child.css({
            maxWidth: "620px",
            width: "auto",
            maxHeight: "300px",
            overflow: "auto",
            padding: "10px",
            flexWrap: "wrap"
        })
    }
    parent.mouseleave(() => {
        $customizations._list = false
        if(!$customizations._list2)
            parent.remove()
    })
    
    if(offset.left + $(parent).width() > $(window).width()) {
        offset.left = $(window).width() - $(parent).width() - 50
    }
    if(!type) {
        parent.css({
            top: (offset.top + height - 10) + 'px',
            left: (offset.left + ($(e).outerWidth()/2) - 10)   + 'px'
        })    
    } else if(type.cardList) {
        parent.css("top", (offset.top - 10) + 'px'),
        parent.css("left", (offset.left + ($(e).outerWidth()/2) - 10)   + 'px')

    }
    if(type) {
        if(type.subCards) {
            let h1 = $("<h1>")
            h1.html(list.name + "<br> <span font-size: '12px'>" + list.length + " Gradients </span>")
            h1.css({
                "fontSize": "20px",
                width: "100%",
                fontWeight: "bold",
                marginLeft: "10px",
                borderBottom: "1px solid rgba(0,0,0,0.225)"
            })
            child.append(h1)    
        }
    }

    for(let i=0; i<list.length; i++) {
        list_item[i] = $("<button>")
        if(!type)  list_item[i].html(list[i].name)
        list_item[i].css({
            width: "100%",
            textAlign: "left",
            padding: "5px 20px"
        })
        if(list[i].css) {
            list_item[i].css(list[i].css)
            list_item[i].attr("css", list[i].css)
        }
        if(type) {
            if(type.cardList) {
                list_item[i].css({
                    padding: "0px",
                    width: "200px",
                    padding: "50px"
                })    
            }
        } 
        child.append(list_item[i]) 
    }
    return list_item
}
function $btnCustomizations(e) {
    if($customizations.btn.container) {
        $customizations.btn.container.remove()
    }
    $customizations.btn.type = false
    e = e.target
    let parent_div = $('<div>'),
        child_div = $('<div>'),
        btn_type_attr = $(e).attr('type') || 'Filled',
        btn_type_list = ['Text', 'Filled', 'Bordered']



    $addColors(e, child_div)
    let list_btn = $addList(e, child_div, btn_type_attr)
    $addIcoBtn(e, child_div, 'icon-link')
    $addIcoBtn(e, child_div, 'icon-edit-pencil')
    $addIcoBtn(e, child_div, 'icon-content_copy')
    $addIcoBtn(e, child_div, 'icon-delete', null , 'DELETE')



    let offset = $(e).offset(), height = $(e).outerHeight(), width = $(parent_div).width()
    parent_div.addClass('proto-container-1')
    child_div.addClass('proto-container-child-1')

    parent_div.append(child_div)
    $(document.body).append(parent_div)
    
    if(offset.left + $(parent_div).width() > $(window).width()) {
        offset.left = $(window).width() - $(parent_div).width() - 50
    }
    parent_div.css({
        top: (offset.top + height) + 'px',
        left: offset.left + 'px'
    })
    $customizations.btn.container = parent_div
    $autoHide(e, parent_div)

    // events...
    parent_div.mouseleave(() => { if(!$customizations.btn.type)   parent_div.remove() })
    list_btn.click(function(ev) {
        $customizations.btn.type = true
        $customizationsListItems(ev.target, btn_type_list, e)
    })
}
function $customizationsListItems(e, list, clickedItem) {
    let offset = $(e).offset(), height = $(e).height()
    let parent_div = $('<div>'),
        child_div = $('<div>')

    for(let i=0; i<list.length; i++) {
        let item = $("<button>")
        item.html(list[i])
        item.css({
            textAlign: 'left',
            fontSize: '14px',
            fontWeight: 'lighter',
            padding: '10px 20px',
            width: '100%'
        })
        item.click(function() {
            $(e).find('span').html(list[i])
            let component_type = $(clickedItem).attr('component-type')
            if(component_type === 'button') {
                switch(list[i]) {
                    case "Filled":
                        $(clickedItem)
                        .css("background", "rgba(0,105,191,1.0000000000)")
                        .css("color", "white")
                        break
                    case "Text":
                        $(clickedItem)
                        .css("background", "transparent")
                        .css("border", "transparent")
                        .css("color", "white")
                        break
                    case "Bordered":
                        $(clickedItem)
                        .css("background", "transparent")
                        .css("border", "1px solid rgba(0,105,191,1.0000000000)")
                        break
                }                
            } 
            else if(component_type === 'container') {
                let items = null
                switch(list[i]) {
                    case "Button":
                        item.attr("insert-component", "button")
                        item.attr("insert-into", $(clickedItem).attr("component-id"))
                        console.log(clickedItem, ' the clicked item')
                        break;
                    case 'Emphasis 1':
                        $(clickedItem).css("background", "rgba(0,0,0,0.0555)")
                        items = $(clickedItem).find('span')
                        for(let i=0; i<items.length; i++) {
                            if($(items[i]).css("backgroundColor") == 'rgb(255, 255, 255)') {
                                $(items[i])
                                .css("backgroundColor", 'rgb(0, 134, 230)')
                                .css("color", "white")
                            }
                        }
                        break;
                    case 'Emphasis 2': 
                        $(clickedItem).css('background', 'rgb(0, 134, 230)')
                        items = $(clickedItem).find('span')
                        for(let i=0; i<items.length; i++) {
                            if( $(items[i]).css("backgroundColor") == 'rgb(0, 134, 230)') {
                                $(items[i])
                                .css("backgroundColor", 'white')
                                .css("color", "black")
                            }
                        }
                        break;
                    case 'Regular':
                        $(clickedItem).css("background", "white")
                        items = $(clickedItem).find('span')
                        for(let i=0; i<items.length; i++) {
                            if( $(items[i]).css("backgroundColor") == 'rgb(255, 255, 255)') {
                                $(items[i])
                                .css("backgroundColor", 'rgb(0, 134, 230)')
                                .css("color", "white")
                            }
                        }
                        break;
                }
            }
        })
        child_div.append(item)
        item.addClass('proto-btn-1')
    }
    child_div.css({
        display: 'block',
        textAlign: 'left',
        width: 'auto',
        maxWidth: '200px'
    })
    parent_div.append(child_div)
    $(document.body).append(parent_div)

    parent_div.addClass('proto-container-1')
    child_div.addClass('proto-container-child-1')

    if(offset.left + $(parent_div).width() > $(window).width()) {
        offset.left = $(window).width() - $(parent_div).width() - 50
    }
    parent_div.css({
        top: (offset.top + height) + 'px',
        left: offset.left + 'px'
    })

    parent_div.mouseleave(() => parent_div.remove())
}
function $navCustomizations(e) {
    if($customizations.nav.container) {
        $customizations.nav.container.remove()
    }
    $customizations.nav.type = false
    let offset = $(e).offset(),
        width = $(e).width(),
        height = $(e).height()
    
    let parent_div = $('<div>'),
        child_div = $('<div>'),
        navList = ['Top Navigation', 'Left Navigation']

    
    $addColors(e, child_div)
    let list_btn = $addList(e, child_div, navList[0])
    $addIcoBtn(e, child_div, 'icon-delete')


    parent_div.addClass('proto-container-1')
    child_div.addClass('proto-container-child-1')
    
    parent_div.append(child_div)
    $(document.body).append(parent_div)

    parent_div.css({
        top: offset.top - parent_div.outerHeight(),
        left: offset.left
    })
    $customizations.nav.container = parent_div
    $autoHide(e, parent_div)

    // events...
    parent_div.mouseleave(()=> { if(!$customizations.nav.type) parent_div.remove() })
    list_btn.click(function(ev) {
        $customizations.nav.type = true
        $customizationsListItems(ev.target, navList, e)
    })
}
function $containerCustomization(e) {
    if($customizations.container.$) {
        $customizations.container.$.remove()
    }
    $customizations.container.bg = false
    $customizations.container.add_component = false
    let offset = $(e).offset(),
        parent_div = $('<div>'),
        child_div = $('<div>'),
        width = $(e).width(),
        container_style_list = ['Regular', 'Emphasis 1', 'Emphasis 2'],
        component_list = ['Button','List', 'Table', 'Upload Image']
    
    $addColors(e, child_div)
    let container_theme_btn = $addIcoBtn(e, child_div, 'icon-art-palette', { left: true, right: false })
    $addIcoBtn(e, child_div, 'icon-delete', null, 'DELETE')
    let add_component_btn = $addIcoBtn(e, child_div, 'icon-plus1')
    
    parent_div.addClass('proto-container-1')
    child_div.addClass('proto-container-child-1')
    parent_div.append(child_div)
    $(document.body).append(parent_div)
    parent_div.css({
        top: offset.top - parent_div.outerHeight(),
        left: offset.left + width - parent_div.width()
    })
    $customizations.container.$ = parent_div
    $autoHide(e, parent_div)
    parent_div.mouseleave(()=> { if(!$customizations.container.bg && !$customizations.container.add_component) parent_div.remove() })
    
    container_theme_btn.click(function(ev) {
        $customizations.container.bg = true
        $customizationsListItems(ev.target, container_style_list, e)
    })
    add_component_btn.click(function(ev) {
        $customizations.container.add_component = true
        $customizationsListItems(ev.target, component_list, e)

    })    
}
function $listCustomizations(e) {
    e = e.target
    if($customizations.list.container) {
        $customizations.list.container.remove()
    }
    $customizations.list.type = false
    let offset = $(e).offset(),
        parent_div = $('<div>'),
        child_div = $('<div>'),
        height = $(e).outerHeight()


    $addColors(e, child_div)
    $addIcoBtn(e, child_div, 'icon-list-numbered', { left: true, right: false }, 'LIST-STYLE-DECIMAL')
    $addIcoBtn(e, child_div, 'icon-list', null, 'LIST-STYLE-SQUARE')
    $addIcoBtn(e, child_div, 'icon-list2', { left: false, right: false }, 'LIST-STYLE-DISC')
    $addIcoBtn(e, child_div, 'icon-list-add', { left: false, right: true }, 'NEW-LIST-ITEM')
    $addIcoBtn(e, child_div, 'icon-content_copy', null)
    $addIcoBtn(e, child_div, 'icon-delete', null, 'DELETE')
    let close_customization_btn = $addIcoBtn(e, child_div, 'icon-cross-cancel', { left: true, right: false})
    

    parent_div.addClass('proto-container-1')
    child_div.addClass('proto-container-child-1')
    parent_div.append(child_div)
    $(document.body).append(parent_div)
    if(offset.left+parent_div.width()+$(e).outerWidth() > $(window).width()) {
        offset.left = $(window).width() - $(parent_div).width() - 50 - $(e).outerWidth()
    }
    parent_div.css({
        top: (offset.top + height - 10) + 'px',
        left: (offset.left + $(e).outerWidth() - 10)  + 'px'
    })
    $customizations.list.container = parent_div
    $autoHide(e, parent_div)
    close_customization_btn.click(() => parent_div.remove())
}
function $imgCustomization(e) {
    e = e.target
    if($customizations.img.container) {
        $customizations.img.container.remove()
    }
    $customizations.img.filters = false
    let offset = $(e).offset(),
        parent_div = $('<div>'),
        child_div = $('<div>'),
        height = $(e).outerHeight()

    
    let upload_btn = $addIcoBtn(e, child_div, 'icon-upload', null, null)
    let filter_btn = $addIcoBtn(e, child_div, 'icon-filter')
    $addIcoBtn(e, child_div, 'icon-content_copy', null, null)
    $addIcoBtn(e, child_div, 'icon-delete', null, null)

    parent_div.addClass('proto-container-1')
    child_div.addClass('proto-container-child-1')
    parent_div.append(child_div)
    $(document.body).append(parent_div)

    if(offset.left+parent_div.width()+$(e).outerWidth() > $(window).width()) {
        offset.left = $(window).width() - $(parent_div).width() - 50 - $(e).outerWidth()
    }
    parent_div.css({
        top: (offset.top + height - 20) + 'px',
        left: (offset.left + $(e).outerWidth() - 20)  + 'px'
    })
    $customizations.list.container = parent_div
    $autoHide(e, parent_div)
    parent_div.mouseleave(()=> { if(!$customizations.img.filters) parent_div.remove() })

    filter_btn.click(function(ev) {
        $customizations.img.filters = true
        $customizationsFiltersList(ev.target, e)
    })
    upload_btn.click((ev) => $uploadImgFile(e))
}
function $customizationsFiltersList(e, clicked) {
    let offset = $(e).offset(),
        parent_div = $('<div>'),
        child_div = $('<div>'),
        height = $(e).outerHeight(),
        filter_list = ["original", "blur", "brightness", "contrast", "grayscale", "huerotate", "invert", "opacity", "saturate", "sepia", "shadow"],
        filters = ["none", "blur(4px)", "brightness(0.30)", "contrast(180%)", "grayscale(100%)", "hue-rotate(180deg)", "invert(100%)", "opacity(50%)", "saturate(7)", "sepia(100%)", "drop-shadow(8px 8px 10px green)"]

    for(let i=0; i<filter_list.length; i++) {
        let list_item = $("<img>")
        list_item.attr("src", $(clicked).attr("src"))
        list_item.css("width", "200px")
        list_item.css("filter", filters[i])
        list_item.css("margin", "0px")
        list_item.css("padding", "0px")
        child_div.append(list_item)

        list_item.click(function() {
            $(clicked).css({
                filter: filters[i]
            })
        })
    }

    parent_div.addClass('proto-container-1')
    child_div.addClass('proto-container-child-1')
    child_div.css({
        width: "800px",
        overflow: "hidden",
        flexWrap: 'wrap',
    })
    parent_div.append(child_div)
    $(document.body).append(parent_div)
    if(offset.left+parent_div.width()+$(e).outerWidth() > $(window).width()) {
        offset.left = $(window).width() - $(parent_div).width() - 50 - $(e).outerWidth()
    }
    parent_div.css({
        top: (offset.top + height - 10) + 'px',
        left: (offset.left + $(e).outerWidth() - 10)  + 'px'
    })
    parent_div.mouseleave(()=> { parent_div.remove() })

    

}
function $autoHide(e, parent_div) {
    $(e).mouseleave(function(ee) {
        if(ee.relatedTarget == parent_div.get(0)) {
            return
        } else {
            parent_div.remove()
        }
    })
}
function $addColors(e, child_div = null) {
    if(!child_div) {
        child_div = $("<div>")
    }
    let bg_btn = $('<button>'),
    fg_btn = $('<button>'),
    border_btn = $('<button>')

    bg_btn.addClass('round-color')
    fg_btn.addClass('round-color')
    border_btn.addClass('round-color')

    bg_btn.css('background', $(e).css('backgroundColor'))
    fg_btn.css('background', $(e).css('color'))
    border_btn.css('background', $(e).css('border-left-color'))

    child_div.append(bg_btn)
    child_div.append(fg_btn)
    child_div.append(border_btn)

    $(bg_btn).click(function() {
        let palette = $createColorPalette()   
        palette.change(function() {
            $(bg_btn).css("background",palette.val())
            $(e).css("background", palette.val())
            palette.remove()
        })
    })
    $(fg_btn).click(function() {
        let palette = $createColorPalette()   
        palette.change(function() {
            $(fg_btn).css("background", palette.val())
            $(e).css("color",palette.val())
            $(e).find("*").css("color", palette.val())
            palette.remove()
        })
    })
    $(border_btn).click(function() {
        let palette = $createColorPalette()   
        palette.change(function() {
            $(border_btn).css("background", palette.val())
            $(e).css("border", '1px solid ' + palette.val())
            palette.remove()
        })
    })
    console.log(child_div, 'my child div')

    return child_div
}
function $addTxtBtn(child, text, border = null) {
    let btn = $("<button>")
    text.dropdown ? btn.html("<span>" + text.text + "</span> &nbsp; &nbsp; &#9662;") :  btn.html(text.text)
    btn.find("span").css({
        fontSize: "18px",
        padding: "10px"
    })
    child.append(btn)

    if(border) {
        if(border.left) {
            btn.css("borderLeft", "1px solid rgba(0,0,0,0.125)")
        } if(border.right) {
            btn.css("borderRight", "1px solid rgba(0,0,0,0.125)")
        }
        btn.addClass('no-radius')
    }
    return btn
}
function $addIcoBtn(e, child_div, btn_html, border = null, btn_type) {

    let btn = $('<button>')
    btn.html("<span class="+btn_html+"></span>")
    child_div.append(btn)
    if(border) {
        if(border.left) {
            btn.css("borderLeft", "1px solid rgba(0,0,0,0.125)")
        } if(border.right) {
            btn.css("borderRight", "1px solid rgba(0,0,0,0.125)")
        }
        btn.addClass('no-radius')
    }
    if(btn_type) {
        if(btn_type === "DELETE") {
            if($(e).attr('component-type') === "container") {
                btn.click(() => {
                    $(e).remove()
                })
            } else if($(e).parent().attr('component-type') === 'button-container') {
                btn.click(() => {
                    $(e).parent().remove()
                })                
            } else if($(e).attr('component-type') === 'list-container') {
                btn.click(() => {
                    $(e).remove()
                })
            } else if($(e).attr('component-type') === 'list-item') {
                btn.click(() => $(e).remove())
            }
        } else if(btn_type === 'LIST-STYLE-DECIMAL') {
            btn.click(() => {
                if($(e).css("list-style-type") === "decimal") 
                    $(e).css("list-style-type", "none")
                else
                    $(e).css("list-style-type", "decimal")
            })
        } else if(btn_type === 'LIST-STYLE-DISC') {
            btn.click(() => {
                if($(e).css("list-style-type") === "disc") 
                    $(e).css("list-style-type", "none")
                else 
                    $(e).css("list-style-type", 'disc')
            })
        } else if(btn_type === 'LIST-STYLE-SQUARE') {
            btn.click(() => {
                if($(e).css("list-style-type") === "square") 
                    $(e).css("list-style-type", "none")
                else 
                    $(e).css('list-style-type', 'square')
            })            
        } else if(btn_type === "NEW-LIST-ITEM") {
            btn.click(() => {
                if($(e).parent().attr('component-type') === 'list-container' ||
                $(e).attr('component-type') === 'list-container') {
                    let ev = $(e)
                    let list_item = $("<li>")
                    list_item.html("new List Item")
                    list_item.attr("component-type", "list-item")
                    list_item.attr('contenteditable', 'true')
                    list_item.resizable()
                    list_item.click(() => {
                        list_item.focus()
                    })
                    if(ev.attr('component-type') === 'list-item') {
                        list_item.insertAfter(ev)
                    } else {
                        ev.append(list_item)
                    }
                } 
            })
        }
    }
    return btn
}
function $addList(e, child_div, selected) {
    let btn = $("<button>")
    btn.html('<span>'+selected+'</span>  &nbsp; &#9207;')
    btn.css({
        fontSize: '14px',
        borderRight: '1px solid rgba(0,0,0,0.125)',
        borderLeft: '1px solid rgba(0,0,0,0.125)',
        padding: '5px 20px',
        fontWeight: '500'
    })
    btn.addClass('no-radius')

    child_div.append(btn)
    return btn
}
function $showHoveredBorder(e) {
    if($event.mouseenter.target) {
        $($event.mouseenter.target).css({
            border: 'transparent'
        })
    }
    if(e.type === 'mouseenter') {
        $(e.target).css("border", "2px solid #4285f4")
    }
    $event.mouseenter.target = e.target
}


function $createList(ev, obj) {
    if(obj.open) return
    let { list } = obj
    list.open = true
    let $this = this
    let parent = $('<div class="customizations-parent-container"></div>')
    let child = $('<div class="customizations-child-container"></div>')
    let offset = $(ev.target).offset(),
        height = $(ev.target).outerHeight()
    let list_buttons = []
    for(let i=0; i< list.length; i++) {
        let button = $("<button>")
        button.html(list[i])
        button.addClass('customization-inline-list')
        child.append(button)
        list_buttons.push(button)
    }
    parent.append(child)
    $(document.body).append(parent)

    parent.css({
        left: offset.left + 'px',
        top: (offset.top + height) + 'px'
    })
    parent.mouseleave(() => {
        parent.remove()
        obj.open = false
    })
    return list_buttons
}


function $simple_dropdown(e, arr, horizontal = null) {
    let offset = $(e.target).offset()
    let container = $('<div>')
    let list_group = $('<div>')
    let heading = $("<h6>")
    let btn_arr = []
    container.addClass('position-absolute z-index-1000')
    list_group.addClass('list-group bg-white box-shadow')
    horizontal ? list_group.addClass("list-group-horizontal") : ""
    list_group.css({
        maxHeight: "450px",
        overflowY: "auto",
        overflowX: "hidden",
        borderRadius: "3px"
    })
    heading.addClass('p-3 pl-3 bg-light text-dark')
    // heading.html(type + "'s Types")
    // list_group.append(heading)

    for(let i=0; i<arr.length; i++) {
        let btn = $("<button>")
        btn.addClass('list-group-item btn pt-2 pb-2 pl-3 pr-3 border-0 text-left m-0 hover-effect')
        btn.html(arr[i].title)
        arr[i].no_btn ? list_group.append(arr[i].title) : list_group.append(btn)
        btn_arr.push(btn)
    }

    container.append(list_group)
    this.container ? this.container.remove() : ""
    $(document.body).append(container)
    this.container = container
    

    container.outerHeight() + offset.top > $(window).height() ? offset.top = $(window).height() -  container.outerHeight() - 20 : ""
    container.outerWidth() + offset.left > $(window).width() ? offset.left = $(window).width() -  container.outerWidth() - 50 : "" 

    container.css({
        top: offset.top,
        left: offset.left + $(e.target).width(),
        // maxWidth: '220px'
    })
    container.mouseleave(() => container.remove())

    return {
        items: btn_arr
    }
}
function $get_children(parent) {
    let children = parent.find("*")
    let nodes = []
    for(let i=0; i< children.length; i++) {
        let child = $(children[i])
        nodes.push({
            tag: child.prop('tagName').toLowerCase(),
            class: child.attr("class") || "",
            id: child.attr("id") || "",
            text: child.text(),
            ref: child
        })
    }
    return nodes
}
function $get_date() {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var today  = new Date();
    return today.toLocaleDateString("en-US", options)
}