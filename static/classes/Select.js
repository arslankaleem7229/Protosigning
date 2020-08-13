import { SVG } from '@svgdotjs/svg.js'
import rotate_ico from '@/assets/svg/rotate.svg'
import rotate_png from '@/assets/png/rotate.png'

export default class Select {

    constructor(canvas) {
        this.ev = {
            down: false
        }
        this.point = {
            down: { x: 0, y: 0 },
            move: { x: 0, y: 0 },
            pos:  { x: 0, y: 0 },
            size: { x: 0, y: 0 },
            translate: { x: 0, y: 0 },
            scale: { x: 0, y: 0 },
        }
        this.font = {
            size: 0
        }
        this.DOMRect = {
            canvas: null,
            component: null
        }

        this.canvas = canvas
        this.group = null
        this.node = null
        this.type = null
        this.control = null
        this.rotate = 0
        this.breakpoints_group = this.canvas.group()

        $(window).mousedown((e) => this.mousedown(e))
        $(window).mousemove((e) => this.mousemove(e))
        $(window).dblclick((e) => this.dblclick(e))
        $(window).mouseup((e) => this.mouseup(e))
        this.init()
    }
    remove() {
        if(this.group) {
            this.group.remove()
            this.group = null    
        }
    }
    init() {
        this.group = this.canvas.group()
        this.group.attr('data-id', 'transform')

        let cursor = ["nw-resize", "n-resize", "ne-resize", "e-resize", "se-resize", "s-resize", "sw-resize", "w-resize", "move"],
            wrapper = this.canvas.rect(0, 0).fill("none").stroke({ color: "#22C", dasharray: [5,5], width: 2 }).attr({ cursor: 'move', 'data-id': 'wrapper' } ),
            line = this.canvas.line([ [0,0], [0,0] ]).fill("red").stroke({color: "blue"}).attr({'data-id': 'line'} ),
            rotate = this.canvas.image(rotate_ico).move(0, 0).size(0,0).attr({ cursor: `url(${rotate_png}) 10 10, auto`, 'data-id': 'rotate'} ),
            c = null,
            $this = this

        this.group.add(wrapper)
        this.group.add(line)
        this.group.add(rotate)
        rotate.mousedown(function() { $this.control = "rotate" })
        wrapper.mousedown(function() { $this.control = "move" })


        for(let i=0; i<9; i++) {
            c = this.canvas.circle(8).fill("#22C").move(0, 0).attr({cursor: cursor[i] })
            this.group.add(c)
        }
        c.fill("#00ffff").stroke({ color: "#22C", width:2}) 
        this.group.hide()
    }
    path_breakpoint(point) {
        let { i } = $lastIndexOf(point)
        let c = this.canvas.circle(8).fill("#0FF").move( point[i-1]-4, point[i]-4).stroke({ color: "#00F", width: 2 }).attr({ cursor: "move" })
        return c
    }
    path_line(l1, l2) {
        if(l1[3]) {
            l1 = [l1[3], l1[4]]
            l2 = [l2[1], l2[2]]
            let line = this.canvas.line(l1[0], l1[1], l2[0], l2[1]).stroke({ color: "black", width: 1})
            return line
        }
        else 
            return null
    }
    dblclick(e) {        
        this.node = SVG(e.target.parentNode)
        this.select(this.node.node)
        return
        this.node = SVG(e.target)
        this.breakpoints_group.clear()
        if(this.node.type == "path") {
            let points = this.node.array()
            this.breakpoints_group = this.canvas.group()

            while(points.length > 0) {
                for(let i=1; i<points[0].length; i+=2) {
                    let c = this.canvas.circle(8).fill("#0FF").move( points[0][i]-4, points[0][i+1]-4).stroke({ color: "#00F", width: 2 }).attr({ cursor: "move" })
                    this.breakpoints_group.add(c)
                }
                if(points[1]) {
                    let line = this.path_line(points[0], points[1])
                    if(line) {
                        this.breakpoints_group.add(line)
                    }
                }
                points.shift()
            }    
            // // let { i } = $lastIndexOf(point)
            // // let c = this.canvas.circle(8).fill("#0FF").move( point[i-1]-4, point[i]-4).stroke({ color: "#00F", width: 2 }).attr({ cursor: "move" })
    
            // let points = this.node.array()
            // console.log(points, 'my points')
        } else {
        }

        return
        if(e.target.tagName == "path") {
            this.group.remove()
            this.group = this.canvas.group()
            let path = SVG(e.target),
                plots = path.array()

            for(let i=0; i<plots.length; i++) {
                plots[i].shift()
            }
            let merge = [].concat.apply([], plots)
            for(let i=0; i<merge.length; i+=2) {
                let c = this.canvas.circle(8).fill("#0FF").move(merge[i]-4, merge[i+1]-4).stroke({ color: "#00F", width: 2 }).attr({ cursor: "move" })
                c.front()        
                this.group.add(c)                
            }
            for(let i=0; i<merge.length; i+=4) {
                let poly = this.canvas.polyline([merge[i],merge[i+1], merge[i+2], merge[i+3] ]).fill("none").stroke({ color: "black", width: 1})
                console.log(poly.array(), 'poly')
                poly.front()
                this.group.add(poly)
            }
        }
    }
    select(elem) {            
        this.DOMRect.component = elem.getBoundingClientRect()
        this.DOMRect.canvas = $("#svg")[0].getBoundingClientRect()

        !this.group ? this.init() : ''
        this.group.show()
        this.group.front()
        let x = this.DOMRect.component.x - this.DOMRect.canvas.x,
            y = this.DOMRect.component.y - this.DOMRect.canvas.y,
            w = this.DOMRect.component.width,
            h = this.DOMRect.component.height,
            r = 8,
            c = null,
            $this = this,
            gap = 10,
            z = [
                { x: x-gap-r/2, y: y-gap-r/2,},
                { x: (x+ (x+w))/2, y: y-gap-r/2,},
                { x: x+w+gap/2, y: y-gap-r/2,},
                { x: x+w+gap/2, y: (y+ (y+h))/2,},
                { x: x+w+gap/2, y: y+h+gap/2,},
                { x: (x+ (x+w))/2, y: y+h+gap/2,},
                { x: x-gap-r/2, y: y+h+gap/2,},
                { x: x-gap-r/2, y: (y+ (y+h))/2, },
                { x: (x + (x+w))/2, y: y-gap*4, }
            ], i = 0
        // this.more_vert.selector.style.left = (this.DOMRect.component.x + w - gap) + 'px'
        // this.more_vert.selector.style.top = (this.DOMRect.component.y - gap - r*2) + 'px'

        this.node.attr("cursor", "move")          
        this.node.mousedown(() => {
            this.control = "move"
            this.ev.down = true
        })          
        this.group.each(function() {
            switch(this.type) {
                case "rect":
                    this.attr({ x: x-gap, y: y-gap, width: w+2*gap, height:h+2*gap })
                    break
                case "image":
                    this.move(z[5].x-gap/2, z[5].y + gap*2).size(gap*2, gap*2)
                    break
                case "line":
                    this.plot([[z[1].x+r/2,z[1].y], [z[8].x+r/2,z[8].y]])
                    break
                case "circle":
                    this.move(z[i].x, z[i].y)
                    i++
                    break
            }
        })        
    }    
    more_vert() {
        this.DOMRect.component = this.node.node.getBoundingClientRect()        
        return {
            left: this.DOMRect.component.x + this.DOMRect.component.width - 10,
            top: this.DOMRect.component.y - 10 - 2*8
        }
    }
    top_left(e) {
        return {
            left: e.getBoundingClientRect().x + e.getBoundingClientRect().width - 10,
            top: e.getBoundingClientRect().y - 10 - 2*8
        }
    }
    mousedown(e) {
        if($(e.target).attr("id") == "canvas-bg") return
        let parent = $parent(e.target, 'svg')

        this.point.down.x = e.offsetX
        this.point.down.y = e.offsetY

        if($(e.target).parent().attr("data-id") == "transform" ) {
            this.ev.down = true
            this.control = $(e.target).attr('cursor')
        }
        else if(this.type == "select" && parent) {
            if(e.target.tagName == "tspan") {
                e.target = e.target.parentNode
            }
            this.node = SVG(e.target)
            this.rotate = this.node.transform('rotate')
            this.point.pos.x = this.node.x()
            this.point.pos.y = this.node.y()
            this.point.size.x = this.node.width()
            this.point.size.y = this.node.height()
            this.point.translate.x = this.node.transform('translateX')
            this.point.translate.y = this.node.transform('translateY')
            this.point.scale.x = this.node.transform("scaleX")
            this.point.scale.y = this.node.transform("scaleY")
            this.font.size = this.node.type == 'text' ? this.node.font('size') : 0

            // console.log(this.node.transform("translateX"), this.point.translate, 'transformation')
            this.select(this.node.node)
        } else {
            this.remove()
        }
    }
    mousemove(e) {
        this.point.move.x = e.offsetX - this.point.down.x
        this.point.move.y = e.offsetY - this.point.down.y

        if(this.ev.down && this.node && this.type == "select") {
            this.transform(e)
        }
    }
    mouseup() {
        this.ev.down = false         
    }
    transform(e) {
        if(this.node.type == "text") {
            switch(this.control) {
                case "se-resize":
                    this.node.font({
                        size: this.font.size + this.point.move.x*0.25
                    })
                    break
            }
        }
        switch(this.control) {
            case "nw-resize":
                break
            case "n-resize":
                break
            case "ne-resize":
                break
            case "e-resize":
                this.node.width( this.point.size.x + this.point.move.x)
                break
            case "se-resize":
                this.node.width( this.point.size.x + this.point.move.x)
                this.node.height( this.point.size.y + this.point.move.y)                
                break
            case "s-resize":
                this.node.height( this.point.size.y + this.point.move.y)  
                break
            case "sw-resize":
                break
            case "w-resize":
                break
            case "move":
                this.node.x( this.point.pos.x + this.point.move.x)
                this.node.y( this.point.pos.y + this.point.move.y)
                break
            default:
                this.node.transform({
                    rotate: (this.rotate + $angle(e, this.DOMRect.component))
                })
        }    
        this.select(this.node.node)
    }
}