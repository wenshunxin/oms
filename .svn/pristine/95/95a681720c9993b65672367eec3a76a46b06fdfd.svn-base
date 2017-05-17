<template>
    <div style="padding:10px 20px 0 20px;height:100%;overflow-y:auto;">
        <div style="margin-bottom:10px;" >
            <el-input icon="search" placeholder="规范名称/规范类型" style="width:30%;" v-model="input"></el-input>
            <el-button type="primary" @click="sousou">搜索</el-button>
        </div>
        <div style="border:1px solid #838383;height:0;margin-bottom:15px;"></div>
        <el-table border style="width: 100%;margin-bottom:10px;" stripe :data="tableData" v-loading.body="loading">
            <el-table-column prop="key" label="序号" width="80"></el-table-column>
            <el-table-column prop="standardName" label="规范名称"></el-table-column>
            <el-table-column prop="standardType" label="规范类型"></el-table-column>
            <el-table-column prop="sid" label="操作" inline-template>
                <template>
                    <a :href="row.attachPath"><el-button class="L-button" size="small" ><img src="../imgs/xiazai.png"></el-button></a>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
        style="text-align:right;"
         :current-page="currentPage"
         layout="total,prev, pager, next"
         :total="total"
         :page-size="pageSize"
         @current-change="currentChange">
       </el-pagination>
    </div>
</template>
<script>
    import {api} from '../js/api/api.js'
    import {getCookie} from '../js/api/cookie.js'
    export default ({
        data () {
            return {
                showFileList:false,
                head:{
                    Token:getCookie('token')
                },
                input:"",
                loading:true,
                dialogs:false,
                editDialog:false,
                currentPage:1,
                total:6,
                pageSize:10,
                values:{
                    standardType:""
                },
                editV:{
                    sid:"",
                    standardType:""
                },
                tableData:[
                    {
                        sid:1,
                        name:"小文",
                        type:"dov"
                    }
                ],
                type:[
                    {
                        type:"产品定义规范"
                    },
                    {
                        type:"生命周期管理"
                    },
                    {
                        type:"版本定义"
                    },
                    {
                        type:"发布流程"
                    }
                ]
            }
        },
        mounted () {
            this.getStandardDatagrid();
        },
        methods:{
            getStandardDatagrid () {
                let params={
                    	"rows":this.pageSize,
                    	"page":this.currentPage,
                    	"sort":"sid",
                    	"order":"desc"
                    }
                this.$http.post(api.getStandardDatagrid,params).then((response)=>{
                    // console.log(response.body.rows);
                    this.loading=!this.loading;
                    this.tableData=response.body.rows;
                    for(var key in this.tableData){
                        this.tableData[key].key=(this.currentPage-1)*10+(key*1+1)
                    }
                    this.total=response.body.total;

                })
            },
            currentChange(val){
                this.currentPage=val;
                this.loading=!this.loading;
                this.getStandardDatagrid();
            },
            sousou () {
                let params={
                    	"rows":this.pageSize,
                    	"page":this.currentPage,
                    	"sort":"sid",
                    	"order":"desc",
                        "queryStr":this.input
                    }
                    this.loading=!this.loading;
                this.$http.post(api.getStandardDatagrid,params).then((response)=>{
                    // console.log(response.body.rows);
                    this.loading=!this.loading;
                    this.tableData=response.body.rows
                    for(var key in this.tableData){
                        this.tableData[key].key=(this.currentPage-1)*10+(key*1+1)
                    }
                })
            }
        }
    })
</script>
<style>
    .yGFm>button:last-of-type{
        float:right;
    }
</style>
