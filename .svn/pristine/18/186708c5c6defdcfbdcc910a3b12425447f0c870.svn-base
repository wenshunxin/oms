<template lang="html">
    <section class="L-background" style="overflow-y:auto;height:100%;">
        <div class="L-center-div">
            <!-- 搜索框 -->
            <el-col :span="24" class="toolbar" style="margin: 10px 0;">
                <el-form :inline="true">
                    <el-input v-model="page.queryStr" placeholder="请输入设备名称/设备ID" type="text" class="table_search_box L-bindmessage-search" :maxlength="30" icon="search"></el-input>
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
                <el-table-column prop="warningStatus" label="状态" style="width:10%;">
                </el-table-column>
                <el-table-column prop="bindStatus" label="操作">
                    <template scope="scope">
                        <el-button size="small" @click.native="handleEdit(scope.row.sid,1)" :plain="true">查看</el-button>
                        <el-button size="small" @click.native="handleEdit(scope.row.sid,2)" :plain="true" v-if="sid == 1 || 2">设置</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页 -->
            <el-pagination class="L-pagination" layout="total, prev, pager, next" @current-change="currentChange"  :current-page="this.page.page" :total="this.page.total" :page-size="this.page.rows">
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
            states:"",
            sid:"",

        }
    },
    mounted(){
        this.getEquipmentInfoList();
        this.getAdmin();
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
        getAdmin: function(){
            this.$http.post( api.getUser).then((res) => {
                this.sid = res.body.rtData.user.sid;
            })
        },
        handleEdit:function(sid,state){
            this.$router.push({
                name: "detailwarning",
                params: {
                    id : sid,
                    state:state
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
        statusfilter: function (value) {
            if(value == "已绑定"){
                return true
            }else{
                return false
            }
        }
    }
}
</script>

<style lang="css">
</style>
