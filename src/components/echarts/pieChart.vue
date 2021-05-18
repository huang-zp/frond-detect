<template>
    <div :id="id" class="orderArea"></div>
</template>

<script>
	import echarts from 'echarts'
    import echartsTheme from "cps/echarts/theme/westeros.json";
    
    export default {
        data(){
            return {
              myChart:null,
            }
        },
		  props: [
		      'type',
          'id',
          'openServicePart',
          'openPortPart'
      ],
      mounted(){
			this.loadChart();
		},
		beforeDestroy() {
			if (!this.myChart) {
				return
			}
			this.myChart.dispose();
			this.myChart = null;
        },
      methods: {
			 loadChart(){
                this.$nextTick(() => {
                    echarts.registerTheme('westeros', echartsTheme)
                    this.myChart = echarts.init(document.getElementById(this.id),'westeros');
                    this.myChart.setOption(this.initOption(this.type));
                })
            },
        initOption(type){
				let text,legend_data,series_data;
				if(this.type === "porttype"){
					text = "开放端口分布";
					legend_data = this.openPortPart[1];
					series_data = this.openPortPart[0]
				}else{
					text = "开放服务分布";
					legend_data = this.openServicePart[1];
					series_data = this.openServicePart[0]
				}

				let data = {
					  title : {
						text: text,
						x:'center'
					},
					tooltip : {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						left: 'left',
						data: legend_data
					},
					series : [
						{
							name: '百分比',
							type: 'pie',
							radius : '60%',
                            center: ['60%', '60%'],
							data:series_data,
							itemStyle: {
								emphasis: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								}
							}
						}
					]
				}
				return data;
			},
        },
      watch: {
        type:function (n,o){
            this.initOption(n)
        },
        openPortPart: {
          handler(n, o) {
            console.log('service')
            this.loadChart()
          },
          immediate:true,
          deep:true
        },
        openServicePart:{
          handler(n, o) {
            console.log('port')
            this.loadChart()
          },
          immediate:true,
          deep:true
        }

      }
    }
</script>

<style lang="less">

</style>
