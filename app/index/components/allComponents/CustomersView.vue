<template>
    <div style="height:100%;overflow:auto; background:#f2f2f2;padding:10px 20px 0 20px;" >
            <el-col :span="24" class="toolbar">
                <el-form :inline="true" >
                        <el-input icon="search" style="width:40%;"  v-model="text"   placeholder="请输入客户信息" type="text" class="tablesearch_box" :maxlength="30"></el-input>
                    <el-form-item>
                        <el-button type="primary" class="w-search-button"  @click="searchList">搜索</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <!--渲染表格数据-->
            <el-table  :data="customersList" border  style="width: 100%;" class="w-nopadding" row-key="sid" @selection-change="handleSelectionChange">
                <el-table-column type="selection"  :reserve-selection="true">
                </el-table-column>
                <el-table-column  prop="key" label="序号"  width='50' ></el-table-column>
                <el-table-column  prop="customerName" label="姓名"  width="80">
                </el-table-column>
                <el-table-column  prop="customerTel" label="电话">
                </el-table-column>
                <el-table-column  prop="customerEmail" label="邮箱" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="companyName"  label="公司" width="300"  show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="customerLevel" label="用户级别" width="120"  sortable >
                </el-table-column>
                <el-table-column prop="registerTime" label="注册时间" :formatter="formatTime" width="120"  sortable align='left'>
                </el-table-column>
                <el-table-column prop="remark" label="备注"     align='left'>
                </el-table-column>
                <el-table-column  label="订单"  width="80">
                    <template scope="scope">
                        <el-button type="text" size="small" @click="handleLook(scope.$index, scope.row)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页-->
            <el-col :span="24" class="w-toolbar" style="height:5rem;">
                <el-pagination  style="text-align:right;"  :current-page="currentPage"  layout= " total ,prev, pager, next" :total="total"  @current-change="currentChange" :page-size="pageSize"></el-pagination>
            </el-col>
            <!--编辑弹框-->
            <el-dialog title="编辑" v-model="editFormVisible"  :close-on-click-modal="false" >
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="姓名" prop="customerName">
                        <el-input v-model="ruleForm.customerName" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" prop="customerTel">
                        <el-input v-model="ruleForm.customerTel" :maxlength="12"  auto-complete="off"></el-input>
                    </el-form-item>
                     <el-form-item label="邮箱" prop="customerEmail">
                        <el-input v-model="ruleForm.customerEmail" disabled  auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="公司" prop="companyName">
                        <el-input v-model="ruleForm.companyName" :maxlength="50" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="用户级别" prop="customerLevel">
                     <el-select v-model="ruleForm.customerLevel" placeholder="无" name="parentId">
                        <el-option label="试用" value="试用"></el-option>
                        <el-option label="普通" value="普通"></el-option>
                        <el-option label="VIP" value="VIP"></el-option>
                    </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button  @click.native="editFormVisible = false">取消</el-button>
                    <el-button  type="primary" @click.native="editSubmit">提交</el-button>
                </div>
            </el-dialog>
    </div>
</template>
<script>
import {api} from "../../js/api/api.js";
import { setCookie } from "../../js/api/cookie.js";
   export default {
        data(){
            return {
                //编辑内容
                ruleForm:{
                    customerName:'',
                    customerTel:'',
                    companyName:'',
                    customerLevel:'',
                    customerEmail:""
                },
                //搜索内容
                text:"",
                //分页内容
                currentPage:1,
                total:0,
                pageSize:15,
                //编辑页面内容
                editFormVisible: false,//编辑界面确认显示
                rules: {
                    customerName: [
                        { required:true, message:'请输入姓名', trigger: 'blur' }
                    ],
                    customerTel: [
                        { required:true, message:'请输入电话', trigger: 'blur' }
                    ],
                    companyName: [
                        { required:true, message:'请输入公司名称', trigger: 'blur' }
                    ],
                    customerEmail: [
                        { required:true, message:'请输入邮箱', trigger: 'blur' }
                    ],
                    customerLevel: [
                        { required:true, message:'请选择级别', trigger: 'change' }
                    ]
                },
                //列表内
                 customersList:[]
            }
        },
        mounted(){
            this.handleCustomer();
        },
        methods:{
            formatTime: function (row, column) {
                Date.prototype.format = function(format) {
                    var date = {
                        "M+": this.getMonth() + 1,
                        "d+": this.getDate(),
                        "h+": this.getHours(),
                        "m+": this.getMinutes(),
                        "s+": this.getSeconds(),
                        "q+": Math.floor((this.getMonth() + 3) / 3),
                        "S+": this.getMilliseconds()
                    };
                    if (/(y+)/i.test(format)) {
                        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
                    }
                    for (var k in date) {
                        if (new RegExp("(" + k + ")").test(format)) {
                            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
                        }
                    }
                    return format;
                };
                return new Date(row.registerTime).format('yyyy-MM-dd');
            },
            //搜索框
            searchList:function(){
               this.handleCustomer();
            },
            //渲染客户列表
            handleCustomer:function(){
                let para={
                    "rows":this.pageSize,
                    "page":this.currentPage,
                    "sort":"sid",
                    "order":"desc",
                    "queryStr": this.text
                };
                this.$http.post(api.customerList,para).then((res) =>{
                    this.customersList=res.data.rows;
                    // console.log(res.data.rows)
                    this.total=res.data.total;
                    // console.log(this.customersList)
                    for(var key in this.customersList){
                        this.customersList[key].key = ((this.currentPage - 1) * 15) + (key * 1 + 1);
                    }
                })
            },
            //编辑弹框显示
            handleEdit:function(index, row){
                this.editFormVisible = true;
			    this.ruleForm = Object.assign({}, row);
                // console.log(this.editForm);
            },
            //修改提条数据
            editSubmit:function() {
                this.$refs.ruleForm.validate((valid) => {
                    // console.log(valid)
					if (valid) {
                        this.$confirm("确认修改信息","提示",{}).then(()=>{
                            var para  = Object.assign({}, this.ruleForm);
                            // console.log(para)
                            this.$http.post(api.customerEdite,para).then((res) =>{
                                if(res.data.rtState){
                                    this.editFormVisible = false;
                                    this.handleCustomer();
                                    this.$message({
                                        type:"success",
                                        message:res.data.rtMsg
                                    })
                                }
                            })
                        }).catch(()=>{
                            // this.$message({
                            //     type:"info",
                            //     message:"已取消"
                            // })
                        })
                    }
                })
            },
            //删除数据
            handleDel:function(index, row){
                this.$confirm('确认删除该客户?', '提示', {
					type: 'warning'
				}).then(() => {
                        this.$http.post(api.customerDel+"&sid="+row.sid).then(function(data){
                            var json = data.body;
                            if(json.rtState){
                                this.$message({
                                    message:json.rtMsg,
                                    type:"success"
                                });
                                 this.handleCustomer();
                            }
                        })
				}).catch(() => {
					//点击取消按钮
				});
            },
            //重置密码
            handleReset:function(index,row){
                this.$confirm("确认重置该客户密码？",'提示',{
                    type:"warning"
                }).then(()=>{
                    this.$http.post(api.customerReset+"&sid="+row.sid).then((res)=>{
                        var json = res.body;
                        if(json.rtState){
                            this.$message({
                                message:json.rtMsg,
                                type:"success"
                            });
                                this.handleCustomer();
                        }
                    })
                }).catch(()=>{
                    // this.$message({
                    //     type:"info",
                    //     message:"已取消"
                    // })
                })
            },
            //禁用
            handleForbidden:function(index,row){
                this.$confirm("确认禁用？","提示",{
                    type:"warning"
                }).then(()=>{
                    this.$http.post(api.customerForbidden+"&sid="+row.sid).then((res)=>{
                        if(res.data.rtState){
                            this.$message({
                                type:"success",
                                message:res.data.rtMsg
                            })
                            this.handleCustomer();
                        }else{
                            this.$message({
                                type:"error",
                                message:res.data.rtMsg
                            })
                        }
                    })
                }).catch(()=>{
                    // this.$message({
                    //     type:"info",
                    //     message:"已取消"
                    // })
                })
            },
            //查看
            handleLook:function(index,row){
                // this.$router.push("/lookOrder")
                this.$router.push({
                    name:"OrderView",
                    params:{
                        "sid":row.sid
                    }
                });
                // this.isShow=true;
                // this.show=false;
            },
            //分页函数
            currentChange (val) {
                this.currentPage=val;
                this.handleCustomer();
            },
            //跨页选择
            handleSelectionChange:function(selection){
                var arr =[] ;
                for(var i =0 ;i<selection.length;i++){
                    var obj = selection[i].sid;
                    arr.push(obj);
                }
                // console.log(arr);
            }

        }
    }
</script>
<style>
    .w-toolbar .el-pagination{
        padding:0;
    }
    .w-button{
        padding:3px !important;
    }
    .w-button img{
        width:1.5rem;
        height:1.5rem;
    }
    .w-nopadding .cell{
        padding:0 5px !important;
    }
</style>
