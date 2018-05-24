<template>
    <div class="wrapper" ref="container">
        <text>启动页开始！！！</text>
    </div>
</template>

<script>
    import {getImagePath} from '../config/IconConfig'
    import {Utils} from 'weex-ui'
    const animation = weex.requireModule('animation');
    const modal = weex.requireModule('modal');

    export default {
        components: {},
        data() {
            return {
            }
        },
        methods: {},
        created: function () {
            setTimeout(() => {
                this.$store.dispatch('initUserInfo', (res) => {
                        let containerEl = this.$refs[`container`];
                    animation.transition(containerEl, {
                        styles: {
                            transform: `translateY(0px)`
                        },
                        duration: 1000,
                        'cubic-bezier': (0.25, 0.46, 0.45, 0.94),
                        delay: 0
                    }, () => {
                        if (res && res.result) {
                            //代表已经存在数据 进入home
                            this.reset("/main")
                        } else {
                            this.reset("/login")
                        }
                    });
                })
            }, 1000)
        },
    }
</script>