<template lang="html">
    <section class="L-background"  style="overflow-y:auto;">
        <div class="L-center-div">
            <!-- 顶部 -->
            <el-col :span="24" class="toolbar L-ins-head" style="margin: 10px 0;">
                <el-form :inline="true">
                    <el-breadcrumb separator=">">
                        <el-breadcrumb-item :to="{ path: '/setInstructionList' }" class="L-bind-color">指令列表</el-breadcrumb-item>
                        <el-breadcrumb-item>指令设置</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-form>
            </el-col>

            <!-- 表格 -->
            <table class="L-setIns-table">
                <thead class="L-thead">
                    <td v-for="(item,index) in menu" :width="item.width" :key="item.name">{{ item.name }}</td>
                </thead>
                <tbody style="background:#fff;" v-if="showTable">
                    <tr>
                        <td :rowspan="this.length">{{ this.name }}</td>
                        <td :rowspan="this.length">{{ this.id }}</td>
                    </tr>
                    <tr v-for="(item,index) in options">
                        <td>{{ item.serviceName }}</td>
                        <td>{{ item.serviceContent }}</td>
                    </tr>
                </tbody>
                <tbody style="background:#fff;" v-else="showTable">
                    <tr  style="width100%;text-align:center">
                        <td :colspan="4">
                            暂无数据
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<script>
import { api } from '../js/api/api';
export default {
    mounted(){
        this.getEquipmentInstruction()
    },
    methods:{
        getEquipmentInstruction:function(){
            this.$http.post( api.getEquipmentInstruction, {equipmentSid : this.$route.params.id}).then((res) => {
                if(res.body.rtData.instructionList && res.body.rtData.instructionList.length != 0){
                    this.showTable = true;
                    this.id = res.body.rtData.equipmentInfo.equipmentId;
                    this.name = res.body.rtData.equipmentInfo.equipmentName;
                    this.options = res.body.rtData.instructionList;
                    this.length = this.options.length + 1;
                }else{
                    this.showTable = false;
                }
            })
        }
    },
    watch:{
        '$route':'id'
    },
    data(){
        return{
            name:"",
            id:"",
            showTable:"",
            length:0,
            options:[],
            menu:[
                {  name:"设备名称",width:"10%" },
                {  name:"设备ID",width:"10%"  },
                {  name:"服务项",width:"10%"},
                {  name:"服务内容",width:"10%"}
            ]
        }
    }
}
</script>

<style lang="css">
    .L-setIns-table{
        width: 100%;
    }
</style>
