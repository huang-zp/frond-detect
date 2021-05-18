<template>
	 <div class='footer'>
        <p class="intro rflex">
            <span>网络资产探测</span>
            <a target="_blank">
               <icon-svg icon-class="icon-zongti" />
            </a>
            <span>    建立多维信息台账</span>
        </p>
        <p class="beian"></p>
    </div>
</template>


<script>
    import { github } from "@/utils/env";

export default {
    name: "footerNav",
	data(){
		return {
            github:github
		}
	},
	methods:{

	}
}
</script>

<style lang="less">
	.footer{
        width: 100%;
        padding: 10px 0;
        font-size:12px;
        text-align: center;
        background: #fff;
        p{
            line-height: 30px;
        }
        .intro{
            width: 220px;
            margin: 0 auto;
            justify-content: space-between;
            align-items: center;
        }
    }
</style>


