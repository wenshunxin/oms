<template>
    <div style="padding:10px 20px 0 20px;">
        <el-tabs type="border-card" v-model="disa">
          <el-tab-pane label="审核中" name="auditComponent" :disabled="auditComponent">
              <xiugaidingdanone-component></xiugaidingdanone-component>
          </el-tab-pane>
          <el-tab-pane label="待发货" name="deliveryComponent" :disabled="deliveryComponent">
            <xiugaidingdantwo-component></xiugaidingdantwo-component>
          </el-tab-pane>
          <el-tab-pane label="已发货" name="deliveryOverComponent" :disabled="deliveryOverComponent">
            <xiugaidingdanthree-component></xiugaidingdanthree-component>
          </el-tab-pane>
          <el-tab-pane label="安装中" name="installationComponent" :disabled="installationComponent">

          </el-tab-pane>
          <el-tab-pane label="已完成" name="overComponent" :disabled="overComponent">

          </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    import xiugaidingdanoneComponent from './xiugaidingdanone.component.vue';
    import xiugaidingdantwoComponent from './xiugaidingdantwo.component.vue';
    import xiugaidingdanthreeComponent from './xiugaidingdanthree.component.vue'

    export default ({
        data () {
            return {
                auditComponent:true,
                deliveryComponent:true,
                deliveryOverComponent:true,
                installationComponent:true,
                overComponent:true,
                name:""
            }
        },
        computed:  {
            disa:{
                get () {
                    let that=this;
                    if(this.$route.params.states=="审核中"){
                        that.name="auditComponent"
                        return that.name
                    }else if(this.$route.params.states=="待发货"){
                        that.name="deliveryComponent"
                        return that.name
                    }else if(this.$route.params.states=="已发货"){
                        that.name="deliveryOverComponent"
                        return that.name
                    }
                }
            }
        },
        components:{
            xiugaidingdanoneComponent:xiugaidingdanoneComponent,
            xiugaidingdantwoComponent:xiugaidingdantwoComponent,
            xiugaidingdanthreeComponent:xiugaidingdanthreeComponent
        }
    })
</script>
<style>
    .ypaifa{
        padding: 0 20px;
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        -ms-flex-pack:justify;
        -moz-box-pack:justify;
        -webkit-box-pack:justify;
    }
    .yTimeAbian{
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        -ms-flex-pack:justify;
        -moz-box-pack:justify;
        -webkit-box-pack:justify;
        -webkit-box-align:center;
        -moz-box-align:center;
        -ms-flex-align:center;
    }
    .ypaifaM{
        margin-right: 10px;
    }
    .ydingdanmain{
        padding: 20px;
        border:1px solid #8fd3f0;
        line-height: 50px;
    }
    .ydingdanmain b{
        color:#333;
    }
    .yAddressee{
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
    }
    .yAddressee>div,.yChanpin>div{
        -webkit-box-flex:1;
        -ms-flex:1;
        -moz-box-felx:1;
        width: 0%;
    }
    .yChanpin,.ybj{
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
    }
    .ybj{
        padding: 0 10px;
        -ms-flex-pack:justify;
        -moz-box-pack:justify;
        -webkit-box-pack:justify;
    }
</style>
