<div class="container-fluid bg-dark pt-5 pb-5 box-shadow mt-5" id="footer">
    <div class="container">
        <div class="d-flex align-items-center">
            <a href="./home.php" class="btn text-center">
                <span class="text-white text-xl ls-1 font-weight-bold">PROTO</span><br>
                <span class="text-lg ls-2 text-white">SIGNING</span>
            </a>
            <p class="small ml-4 mt-4 w-50 text-white">
                {{description}} 
            </p>
        </div>
    
        <div class="w-100 mt-4 mb-4 pt-4">
            <a  :href="'./'+link.href" class="btn text-sm text-primary" v-for="(link, i) in links" :key="'C'+i">{{link.title}}</a>
        </div>
        <p class="small ml-2 text-white">Copyright &copy; {{year}} <a href="./home.php">protosigning.com</a>. All Rights Reserved.</p>
    </div>
</div>

<script>
var v_footer = new Vue({
    el: "#footer",
    data: {
        year: null,
        links: [
            { title: "About us", href: "about-us.php"},
            { title: "Contact us", href: "contact-us.php"},
            { title: "Terms and Conditions", href: "terms-and-conditions.php"},
            { title: "Privacy Policy", href: "privacy-policy.php"},
        ],
        description: "At long last we present to you the All update software latest, Satellite receiver 2020, Dish All-in-one information, software updates, Dish network TP, PowerVU keys, Biss Keys, Channels TP, All Receiver Brands Like Startrack, echolink, neosat, china & other receivers. "
    },
    methods: {
    },
    mounted() {
        this.year = new Date().getFullYear()
    },
})
</script>
