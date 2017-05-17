<template>
    <div style="padding:10px 20px 0 20px;">
        <el-tabs type="border-card" v-model="disa">
          <el-tab-pane label="审核中" name="auditComponent" :disabled="auditComponent">
              <dingdaninfos-component></dingdaninfos-component>
          </el-tab-pane>
          <el-tab-pane label="待发货" name="deliveryComponent" :disabled="deliveryComponent">
            <dingdaninfos-component></dingdaninfos-component>
          </el-tab-pane>
          <el-tab-pane label="已发货" name="deliveryOverComponent" :disabled="deliveryOverComponent">
            <dingdaninfos-component></dingdaninfos-component>
          </el-tab-pane>
          <el-tab-pane label="安装中" name="installationComponent" :disabled="installationComponent">
            <dingdaninfos-component></dingdaninfos-component>
          </el-tab-pane>
          <el-tab-pane label="已完成" name="overComponent" :disabled="overComponent">
              <dingdaninfos-component></dingdaninfos-component>
          </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    import dingdaninfosComponent from './dingdaninfos.component.vue';
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
            dingdaninfosComponent:dingdaninfosComponent
        }
    })
</script>
