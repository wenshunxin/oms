<template lang="html">
    <section class="L-background" style="overflow-y:auto;">
        <div class="L-center-div">
            <!-- 搜索框 -->
            <el-col :span="24" class="toolbar" style="margin: 10px 0;">
                <el-form :inline="true">
                    <el-input placeholder="请输入设备名称/设备ID" type="text" class="table_search_box L-bindmessage-search"
                    :maxlength="30" icon="search" v-model="page.queryStr"></el-input>
                    <el-form-item style="width:11%;float:right" class="L-bindmessage-item">
                        <el-button type="primary" class="L-button-content L-bindmessage-button" @click.native="search">搜索</el-button>
                    </el-form-item>
                </el-form>
            </el-col>

            <!-- 表格 -->
            <el-table :data="messageData" border style="width: 100%">
                <el-table-column prop="key" label="序号" width="80">
                </el-table-column>
                <el-table-column prop="equipmentName" label="设备名称" style="width:15%;">
                </el-table-column>
                <el-table-column prop="equipmentId" label="设备ID" style="width:10%;">
                </el-table-column>
                <el-table-column prop="bindStatus" label="状态" style="width:10%;">
                </el-table-column>
                <el-table-column prop="bindStatus" label="操作">
                    <template scope="scope">
                        <el-button size="small" @click="handleEdit(scope.row.sid)" :plain="true" :disabled="scope.row.bindStatus !== '已绑定'">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页 -->
            <el-pagination class="L-pagination" layout="total, prev, pager, next" @current-change="currentChange" :current-page="this.page.page"
            :total="this.page.total" :page-size="this.page.rows">
    		</el-pagination>
        </div>
    </section>
</template>

<script>
import { api } from '../js/api/api';
export default {
    data(){
        return{
            messageData:[],
            page:{
                page:1,
                total:0,
                rows:15,
                queryStr:""
            },
            states:""
        }
    },
    mounted(){
        this.getEquipmentInfoList();
    },
    watch:{
        "$route":"id"
    },
    methods:{
        getEquipmentInfoList:function(){
            let para = Object.assign({},this.page);
            this.$http.post( api.getEquipmentInfoList, para).then((res) => {
                this.messageData = res.body.rows
                this.page.total = res.body.total
                for(var key in this.messageData){
                    this.messageData[key].key = ((this.page.page - 1) * 15) + (key * 1 + 1);
                }
            })
        },
        handleEdit:function(sid){
            this.$router.push({
                name:'bindDetails',
                params:{
                    id:sid
                }
            })
        },
        currentChange:function(val){
            this.page.page = val;
            this.getEquipmentInfoList();
        },
        search:function(){
            let para = Object.assign({},this.page);
            this.$http.post( api.getEquipmentInfoList, para).then((res) => {
                this.messageData = res.body.rows
                this.page.total = res.body.total
            })
        },
    }
}
</script>

<style lang="css">
    .L-bindmessage-search{
        width: 88% !important;
    }
    .L-button-content{
        /*margin: 0 0 0 5px !important;*/
    }
    .L-header-div .el-form-item__content ,.L-button-content{
        width:100%;
    }
    .L-center-div ..el-form-item__content{
        width: 100%;
    }
    .L-center-div .toolbar{
        position: relative;
        margin: 1rem 0;
    }
    .L-center-div .toolbar .el-form::before{
        content: "";
        position: absolute;
        left: 0;
        bottom:0;
        width: 100%;
        height:0;
        border: 1px solid #797979;
    }
    .L-center-div .el-table{
        margin-top: 1rem !important;
    }
    .L-bindmessage-item .el-form-item__content{
        width: 100%;
    }
</style>
