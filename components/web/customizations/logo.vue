<template>
  <div class="logo-customization-p" ref='parent'>
      <div class="logo-customization-c" ref='child'>
          <h1 class="title">Logo</h1>
          <p>Upload a logo image to add to your global navigation bar.</p>
          <button class="blue-colored-btn" @click="upload_logo()">Upload</button>
          <br><br>
          <div class="default-border flex align-center">
              <img :src='source' width="120px" alt="" class="logo-img-preview" @load="img_url_changed($event)">
          </div>
          <br>
          <div class="logo-color-container" v-if="loading">
              <p><b>Loading...</b></p>
          </div>
          <div class="logo-color-container" v-else-if="!loading">
              <p>&nbsp;<b>Select a color to use for theme</b></p>
              <button class="round-color"
              v-for="(i, j) in colors"
              :key="j"
              :style="{background: 'rgb('+i.R+','+i.G+','+i.B+')'}">
              </button>
          </div>
          <div class="flex flex-end">
              <button class="blue-colored-btn" @click="upload_logo_done()">Done</button>
          </div>
      </div>
  </div>
</template>

<script>
import { EventBus } from '@/globals/event-bus.js'

export default {
    props: {
        e: {
            required: true
        }
    },
    data() {
        return {
            container: null,
            child_container: null,
            colors: null,
            source: null,
            colors: null,
            loading: true
        }
    },
    methods: {
        img_url_changed(e) {
            let $this = this
            let SOURCE = $(e.target).attr('src')
            $this.loading = true
            __P._IMAGE_LOAD(SOURCE, (DATA) => 
            {   
                let EXTRACTED = $this._IMAGE_EXTRACT(DATA)
                $this.colors = EXTRACTED.CLUSTER_COLORS
                $(this.e.target).attr('src', SOURCE)
            });
        },
        upload_logo_done() {
            $(this.$refs['parent']).remove()
        },
        upload_logo() {
            let img_preview = $('.logo-img-preview')
            $uploadImgFile(img_preview.get(0))
        },
        _IMAGE_EXTRACT(ODATA)
        {
            let DATA = __P._DUPLICATE(ODATA);
            // DATA = __F._GUSSIAN_BLUR_RGB2(DATA);
            let DATA02 = __P._DUPLICATE(DATA);
            let DATA003 = __P._DUPLICATE(DATA);

            // __P._APPEND_CANVAS(DATA);

            let CLUSTER = [];
            // let LAB_DATA = [];
            let EXIST;
            for(let i=0; i<DATA.data.length; i+=4)
            {
                let LAB = __P._RGB2LAB([DATA.data[i], DATA.data[i+1], DATA.data[i+2]]);
                // LAB_DATA.push(LAB);
                EXIST = false;
                for(let j=0; j<CLUSTER.length; j++)
                {
                    CLUSTER[j].LAB = {
                        L: CLUSTER[j].L/CLUSTER[j].C,
                        A: CLUSTER[j].A/CLUSTER[j].C,
                        B: CLUSTER[j].B/CLUSTER[j].C
                    }
                    if((__P._ECQUALIDIAN_DISTANCE(CLUSTER[j].LAB, LAB) <= 35))
                    {
                        CLUSTER[j].C += 1;
                        CLUSTER[j].i.push(i/4);
                        CLUSTER[j].L += LAB.L;
                        CLUSTER[j].A += LAB.A;
                        CLUSTER[j].B += LAB.B;
                        EXIST = true;
                        break;
                    }
                }
                if(CLUSTER.length == 0 || !EXIST)
                {
                    CLUSTER.push(
                        {
                            LAB: LAB,
                            L: LAB.L, A: LAB.A, B: LAB.B,
                            C: 1,
                            i: [i/4]
                        } 
                    )
                    // console.log((i/DATA.data.length)*100 + '% completed');
                }
            }
            let CLEAR_DATA = __P._DUPLICATE(DATA);
            for(let y=0; y<DATA.height; y++)
            {
                for(let x=0; x<DATA.width; x++)
                {
                    __P._SET_ALL_PIX_RGB(CLEAR_DATA, x, y, 0, 0, 0);
                }
            }
            let CLUSTER_DATA = [];
            let CLUSTER_COLORS = []
            for(let i=0; i<CLUSTER.length; i++)
            {
                DATA = __P._DUPLICATE(CLEAR_DATA);
                let RGB = __P._lab2rgb(CLUSTER[i].LAB)
                for(let j=0; j<CLUSTER[i].i.length; j++)
                {
                    __P._SET_PIX_INDEX_RGB(DATA, CLUSTER[i].i[j], RGB);
                    __P._SET_PIX_INDEX_RGB(ODATA, CLUSTER[i].i[j], RGB)
                }
                // __P._APPEND_COLOR(RGB);
                CLUSTER_DATA.push(DATA);
                CLUSTER_COLORS.push(RGB)
                // __P._APPEND_CANVAS(DATA);
            }
            this.loading = false
            return {
                CLUSTER_DATA,
                CLUSTER_COLORS
            }
        }
    },
    mounted() {
        let $this = this,
            offset = $($this.e.target).offset(),
            height = $($this.e.target).outerHeight()

        const __P = new IMG_FUNCTIONS();
        const __HTML = new HtmlRender();
        const __F = new Filter();
        const EDGE = new EDGE_DETECTOR();
        let SOURCE = $(this.e.target).attr('src')
         __P._IMAGE_LOAD(SOURCE, (DATA) => 
        {   
            $this.loading = true
            let EXTRACTED = $this._IMAGE_EXTRACT(DATA)
            $this.colors = EXTRACTED.CLUSTER_COLORS
        });
        this.$nextTick(function() {
            $this.container = $($this.$refs['parent'])
            $this.source = $($this.e.target).attr('src')
            $this.child_container = $($this.$refs['child'])
            $this.container.css({
                left: offset.left + 'px',
                top: (offset.top + height) + 'px'
            })

        })
    }
}
</script>

<style>
.logo-customization-p {
    position: absolute;
    padding: 10px;
    border: 1px solid rgba(0,0,0,0.0555);
}
.logo-customization-c {
    padding: 10px;
    border-radius: 5px;
    background: white;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
}
.logo-customization-c h1 {
    font-size: 16px;
    padding-left: 5px;
    font-weight: bold;
}
.logo-customization-c p {
    padding-left: 0px;
}
.logo-color-container button {
    margin-right: 0px;
    background: black;
}
</style>