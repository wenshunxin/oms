<template lang="html">
    <section class="L-background"  style="overflow-y:auto;">
        <div class="L-center-div">
            <!-- 顶部 -->
            <el-col :span="24" class="toolbar L-warn-head" style="margin: 10px 0;">
                <el-form :inline="true">
                    <el-breadcrumb separator=">">
                        <el-breadcrumb-item :to="{ path: '/bindMessage' }" class="L-bind-color">绑定列表</el-breadcrumb-item>
                        <el-breadcrumb-item>绑定详情</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-form>
            </el-col>

            <!-- 表格 -->
            <table class="L-bind-table">
                <thead class="L-bind-thead">
                    <td v-for="(item,index) in menu" :width="item.width">{{item.name}}</td>
                </thead>
                <div class="L-warn-table-div"></div>
                <tbody style="background:#fff;border:1px solid #afb1b2" v-if="this.list.length != 0">
                    <tr style="background:#c4e4f4;border-bottom:1px solid #b8b8b8">
                        <td>{{name}}</td>
                        <td>{{id}}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr v-for="(item ,index) in list">
                        <td>
                            <label>{{index+1}}</label>
                            <p>{{item.equipmentName}}</p>
                        </td>
                        <td>{{item.equipmentId}}</td>
                        <td>{{item.equipmentStatus}}</td>
                        <td>
                            <el-button @click="handleClick(index)" type="text" size="small" :id="item.sid" ref="solBind">解绑</el-button>
                        </td>
                    </tr>
                </tbody>
                <tbody style="background:#fff;" v-else="this.list.length != 0">
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
        this.getBindEquipmentList()
    },
    watch:{
        "$route":"id"
    },
    methods:{
        getBindEquipmentList:function(){
            this.$http.post(api.getBindEquipmentList,{equipmentSid:this.$route.params.id}).then((res) => {
                if(res.ok && res.body.rtData.bindList.length != 0){
                    this.list = res.body.rtData.bindList
                    this.name = res.body.rtData.equipmentInfo.equipmentName
                    this.id = res.body.rtData.equipmentInfo.equipmentId
                }
            })
        },
        handleClick:function(index){
            this.$confirm('确认解除绑定？', '提示', {
				type: 'warning'
			}).then(() => {
                this.$http.post( api.disBindEquipment ,{equipmentSid:this.$refs.solBind[index].$el.id}).then((res) => {
                    if(res.ok){
                        this.$message({
                            type: 'success',
                            message: res.body.rtMsg
                        })
                        this.getBindEquipmentList()
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.body.rtMsg
                        })
                    }
                })
            })
        }
    },
    data(){
        return{
            warnStyle:[],
            list:[],
            menu:[
                {  name:"设备名称",width:"10%" },
                {  name:"设备ID",width:"10%"  },
                {  name:"状态",width:"10%"},
                {  name:"操作",width:"10%"}
            ],
            name:'',
            id:''
        }
    }
}
</script>

<style lang="css">
    .L-bind-color .el-breadcrumb__item__inner{
        color: #28A9FF !important;
    }
    .L-bind-head{
        height: 3rem;
    }
    .L-center-div .el-breadcrumb{
        line-height: 3 !important;
    }
    .L-bind-table{
        width: 100%;
    }
    .L-bind-table label{
        position: absolute;
        left:16%;
    }
    .L-bind-table td:first-child{
        position: relative;
    }
    .L-bind-table .L-bind-thead{
        border: 1px solid #DFE6EC;
        width: 100%;
        background: #EEF1F6;
    }
    .L-bind-table-div{
        height: 10px;
    }
</style>
