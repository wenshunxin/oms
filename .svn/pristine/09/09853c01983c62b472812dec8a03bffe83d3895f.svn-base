<template>
    <div style="padding:10px 20px 0 20px;">
        <el-tabs type="border-card" v-model="disa">
          <el-tab-pane label="审核中" name="auditComponent" :disabled="auditComponent">
              <audit-component></audit-component>
          </el-tab-pane>
          <el-tab-pane label="待发货" name="deliveryComponent" :disabled="deliveryComponent">
            <delivery-component></delivery-component>
          </el-tab-pane>
          <el-tab-pane label="已发货" name="deliveryOverComponent" :disabled="deliveryOverComponent">
            <delivery-over-component></delivery-over-component>
          </el-tab-pane>
          <el-tab-pane label="安装中" name="installationComponent" :disabled="installationComponent">
            <installation-component></installation-component>
          </el-tab-pane>
          <el-tab-pane label="已完成" name="overComponent" :disabled="overComponent">
              <over-component></over-component>
          </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    import auditComponent from './audit.component.vue';
    import deliveryComponent from './delivery.component.vue';
    import deliveryOverComponent from './deliveryOver.component.vue'
    import installationComponent from './installation.component.vue'
    import overComponent from './over.component.vue'
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
                    }else if(this.$route.params.states=="安装中"){
                        that.name="installationComponent"
                        return that.name
                    }else if(this.$route.params.states=="已完成"){
                        that.name="overComponent"
                        return that.name
                    }
                }
            }
        },
        components:{
            auditComponent:auditComponent,
            deliveryComponent:deliveryComponent,
            deliveryOverComponent:deliveryOverComponent,
            installationComponent:installationComponent,
            overComponent:overComponent
        }
    })
</script>
<style>
    /*.ypaifa{
        padding: 0 20px;
        display: -webkit-box;
        -webkit-box-pack:justify;
    }
    .yTimeAbian{
        display: -webkit-box;
        -webkit-box-pack:justify;
        -webkit-box-align:center;
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
    }
    .yAddressee>div,.yChanpin>div{
        -webkit-box-flex:1;
        width: 0%;
    }
    .yChanpin,.ybj{
        display: -webkit-box;
    }
    .ybj{
        padding: 0 10px;
        -webkit-box-pack:justify;
    }*/
</style>
