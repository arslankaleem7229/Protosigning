export default class Drawing {
    constructor(canvas) {
        this.ev = {
            down: false
        }
        this.point = {
            down: { x:0, y:0 },
            move: { x:0, y:0 }
        }
        this.init = {
            draw: false,
            plot: false
        }
        this.textarea = {node: null, resize: null, fontsize: 50, x: 0, y:0, w:100,h:100, visible: false},

        this.count = {}
        this.plot = []
        this.canvas = canvas
        this.draw = null
        this.type = null
        this.C = null
        this.breakpoints_group = this.canvas.group()
        this.pathstretch_group = this.canvas.group()
        this.pathto_group = this.canvas.group()

        $(window).mousedown((e) => this.mousedown(e))
        $(window).dblclick((e) => this.dblclick(e))
        $(window).mousemove((e) => this.mousemove(e))
        $(window).mouseup((e) => this.mouseup(e))
        $(window).keyup(e => this.keyup(e))
    }
    keyup(e) {
        switch(e.keyCode) {
            case 27:
                this.init.plot = false
                this.type = ""
                this.breakpoints_group.remove()
                this.pathstretch_group.remove()
                this.pathto_group.remove()
                break
        }
        // console.log(e.keyCode)
    }
    dblclick(e) {
        this.init.plot = false
    }
    mousedown(e) {
        let parent = $parent(e.target, 'svg')
        if(parent) {
            this.ev.down = true
            this.point.down.x = e.offsetX
            this.point.down.y = e.offsetY
            let {x,y} = this.point.down
            switch(this.type) {
                case "rectangle":
                case "square":
                    this.rect(x,y)
                    break
                case "circle":
                    this.circle(x,y)
                    break
                case "ellipse":
                    this.ellipse(x,y)
                    break
                case "draw-line":
                    this.line(x,y)
                    break
                case "pencil":
                    this.pencil(x,y)
                    break
                case "polyline":
                case "polygon":
                    this.polyfill(x,y, this.type)
                    break
                case "path":
                    this.path(x,y)
                    break
                case "image":
                    $uploadFile((img) => {
                        this.draw = this.canvas.image(img).size(360, 360)
                    })
                    break
                case "text":
                    this.text(e, { x, y})
                    break
            }    
        }
    }
    text(e, { x,y }) {
        if(!this.textarea.visible) {
            x -= this.textarea.fontsize/2
            y -= this.textarea.fontsize/2
            this.textarea.node = $("<textarea></textarea>")
            this.textarea.node.addClass("p-absolute transition-3")
            this.textarea.node.css({
                left: e.clientX-(this.textarea.fontsize/2), 
                top: e.clientY-(this.textarea.fontsize/2),
                width: this.textarea.w,
                height: this.textarea.h,
                fontSize: this.textarea.fontsize,
                resize: "none",
                textAlign:"center"
            })
            $(document.body).append(this.textarea.node)
            setTimeout(() => this.textarea.node.focus() , 100)
    
            this.textarea.node.keyup(() => {
                this.draw ? this.draw.remove() : ""
                this.draw = this.canvas.text(this.textarea.node.val()).move(x, y).font({ size: this.textarea.fontsize}).opacity(0)
                let DOMRect = this.draw.node.getBoundingClientRect()
                this.textarea.node.css({
                    width: DOMRect.width + this.textarea.w,
                    height: DOMRect.height + this.textarea.h
                })
            })
            this.textarea.visible = true
        } else {
            this.textarea.node.remove()
            this.draw.opacity(1)    
            this.textarea.visible = false
            this.draw = null
        }
    }
    mousemove(e) {
        this.point.move.x = e.offsetX - this.point.down.x
        this.point.move.y = e.offsetY - this.point.down.y
        let {x,y} = this.point.move     
        switch(this.type) {
            case "rectangle":
                this.rect(x,y)
                break
            case "square":
                this.square(x,y)
                break
            case "circle":
                this.circle(x,y)
                break
            case "ellipse":
                this.ellipse(x,y)
                break
            case "draw-line":
                this.line(x,y)
                break
            case "pencil":
                this.pencil(e.offsetX,e.offsetY)
                break
            case "polyline":
            case "polygon":
                this.polyfill(e.offsetX,e.offsetY, this.type)
                break
            case "path":
                this.path_({
                    x: this.point.down.x,
                    y: this.point.down.y,
                    x_: this.point.move.x,
                    y_: this.point.move.y,
                    X: e.offsetX,
                    Y: e.offsetY 
                })
        }
    }
    mouseup() {
        this.ev.down = false
        this.init.draw = false
    }
    // CONTROLS    
    polyfill_breakpoint(point) {
        let c = this.canvas.circle(8).fill("#0FF").move(point[0]-4, point[1]-4).stroke({ color: "#00F", width: 2 }).attr({ cursor: "move" })
        c.front()
        return c
    }
    path_breakpoint(point) {
        let { i } = $lastIndexOf(point)
        let c = this.canvas.circle(8).fill("#0FF").move( point[i-1]-4, point[i]-4).stroke({ color: "#00F", width: 2 }).attr({ cursor: "move" })
        return c
    }
    path_stretch(point) {
        this.pathstretch_group.clear()
        let line = this.canvas.line([ [point[0],point[1]], [point[4],point[5]] ]).stroke({ color: "black", width: 1}),
            j = 0,
            colors = [
            { fill: "#EEE", stroke: "#55F"},
            { fill: "#0FF", stroke: "#0FF"},
            { fill: "#0FF", stroke: "#00F"},
        ]
        this.pathstretch_group.add(line)
        for(let i=0; i<point.length; i+=2) {
            let c = this.canvas.circle(8).fill(colors[j].fill).move(point[i]-4, point[i+1]-4)
            c.stroke({
                color: colors[j++].stroke,
            })
            this.pathstretch_group.add(c)
            this.pathstretch_group.front()
        }
    }
    path_to(point, start) {
        let { x, y } = start,
            d = this.canvas.path().fill("none").stroke({color: "black", width: 1})
        d.plot([ ["M",x,y], point ])
        this.pathto_group.clear()
        this.pathto_group.add(d)
        this.pathto_group.front()
    }
    // CONTROLS

    path_({x,y, x_, y_, X, Y}) {
        let array = this.plot,
        last = $lastIndexOf(array),
        x_pos = x+x_, y_pos = y+y_,
        x_neg = x-x_, y_neg = y-y_,
        point = null
        if(this.ev.down) {
            this.C = ["C", x_pos, y_pos, x_neg,y_neg, X, Y]
            if(last.val[0] == "C") {
                array[last.i][3] = x_neg
                array[last.i][4] = y_neg
                this.draw.plot(array)
            }
            point = [x_pos,y_pos, x,y, x_neg,y_neg]
            this.path_stretch(point)
        } else {
            this.C = this.C ? ["C", this.C[1],this.C[2], X,Y, X,Y] : ["C", x,y, X,Y, X,Y]
            let start = { x, y }
            this.path_to(this.C, start)
        }
    }
    path(x,y) {
        if(!this.init.plot) {
            this.draw = this.canvas.path('M 0,0').move(x, y).fill("red").stroke({ color: "black", width: 5})
            this.draw.attr('c-id', this.ID(this.draw))
            this.plot = this.draw.array()
            this.init.plot = true                      
            this.C = null
            this.breakpoints_group = this.canvas.group()
            this.pathstretch_group = this.canvas.group()
            this.pathto_group = this.canvas.group()
            this.breakpoints_group.add(this.path_breakpoint($lastIndexOf(this.plot).val))
        }
        else if(this.ev.down && this.init.plot) {
            this.plot.push(this.C)
            this.draw.plot(this.plot)
            this.C = ["C", x,y, x,y, x,y]
            this.breakpoints_group.add(this.path_breakpoint($lastIndexOf(this.plot).val))
        }
        this.breakpoints_group.front()
    }
    polyfill(x,y, type) {
        if(!this.init.plot) {
            this.draw = type == "polygon" ? this.canvas.polygon() : this.canvas.polyline()
            this.draw.plot([[0,0], [5,5]]).move(x,y).fill("red").stroke({ color: "black", width: 5})
            this.plot = this.draw.array()
            this.init.plot = true
            this.breakpoints_group = this.canvas.group()
            this.pathstretch_group = this.canvas.group()
            this.pathto_group = this.canvas.group()
            this.breakpoints_group.add(this.polyfill_breakpoint( $lastIndexOf(this.plot).val ))           
        } 
        else if(this.ev.down && this.init.plot) {
            this.plot.push([x,y])
            this.draw.plot(this.plot)
            this.breakpoints_group.add(this.polyfill_breakpoint( $lastIndexOf(this.plot).val ))           
        } 
        else {
            let { i } = $lastIndexOf(this.plot)
            this.plot[i] = [x, y]
            this.draw.plot(this.plot)    
        }
        this.breakpoints_group.front()
    }
    pencil(x,y) {
        if(this.ev.down) {
            if(!this.init.draw) {
                this.init.draw = true
                this.draw = this.canvas.path('M0 0 L 1 1').move(x, y).fill("none").stroke({ color: "black", width: 5})
                this.plot = this.draw.array()
            } else {
                let { val } = $lastIndexOf(this.plot)
                let p1 = val,
                    p2 = ["L", x, y]
                if($distance(p1, p2) > 5) {
                    this.plot.push(p2)
                    this.draw.plot(this.plot)
                }                                                               
            }
        }
    }
    line(x,y) {
        if(this.ev.down) {
            if(!this.init.draw) {
                this.init.draw = true
                this.draw = this.canvas.line([ [0,0], [0,0] ]).move(x, y).stroke({ color: "black", width: 5})
            } else {                
                let points = this.draw.array(),
                    A = points[0],
                    B = [points[0][0] + x, points[0][1] + y]
                this.draw.plot([A, B])        
            }
        }
    }
    rect(x,y) {
        if(this.ev.down) {
            if(!this.init.draw) {
                this.init.draw = true
                this.draw = this.canvas.rect(5, 5).move(x, y).fill("none").stroke({ color: "black", width: 5})
            } else {
                this.draw.size(x, y)            
            }    
        }
    }
    square(x,y) {
        if(this.ev.down) {
            x = x>y ? x : y
            this.draw.size(x, x)
        }
    }
    circle(x,y) {
        if(this.ev.down) {
            if(!this.init.draw) {
                this.init.draw = true
                this.draw = this.canvas.circle(5).move(x, y).fill("red").stroke({ color: "black", width: 5})
            } else {
                x = x>y ? x : y
                this.draw.radius(x)        
            }    
        }        
    }
    ellipse(x,y) {
        if(this.ev.down) {
            if(!this.init.draw) {
                this.init.draw = true
                this.draw = this.canvas.ellipse(5, 5).move(x, y).fill("red").stroke({ color: "black", width: 5})
            } else {
                this.draw.size(x*2, y*2)        
            }    
        }
    }
    ID(c) {
       return c.type +"-"+ (this.count[c.type] ? this.count[c.type] +=1 : this.count[c.type] = 1)
    }
}