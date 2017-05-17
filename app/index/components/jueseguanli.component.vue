<template>
    <div style="padding:10px 20px 0 20px;">
        <!-- 新增按钮 -->
        <div style="text-align:right;">
            <el-button type="primary" @click="add=!add" style="margin-bottom:10px;">新增角色</el-button>
        </div>
        <!-- 表格 -->
        <el-table :data="cuestableData" style="width:100%;margin-bottom:10px;" stripe border v-loading.body="loading">
            <el-table-column type="index" label="序号" width="80"></el-table-column>
            <el-table-column prop="roleName" label="角色名称"></el-table-column>
            <el-table-column prop="remark" label="职责描述"></el-table-column>
            <el-table-column label="操作" inline-template>
                <el-button @click="shezhi(row)">权限管理</el-button>
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
        <!-- 新建角色 -->
        <el-dialog title="新建角色" v-model="add" >
            <el-form :model="addUser" :rules="rules" ref="roleForm">
                <el-form-item label="角色名称" prop="names">
                    <el-input v-model="addUser.roleName"></el-input>
                </el-form-item>
                <el-form-item label="职责描述">
                    <el-input v-model="addUser.remark" type="textarea"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addJs('roleForm')">确认</el-button>
                    <el-button @click="add=!add">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 权限设置 -->
        <el-dialog title="权限设置" v-model="setQx">
            <el-tree :data="setQxData" :props="defaultProps" node-key="sid" show-checkbox :default-checked-keys="selected" ref="tree" accordion v-loading.body="loadingQ"></el-tree>
            <el-button @click="getCheckedKeys">确认</el-button>
            <el-button @click="setQx=!setQx">取消</el-button>
        </el-dialog>
    </div>
</template>
<script>
    import {api} from '../js/api/api.js'
    export default {
        data() {
            return {
                loading:true,
                loadingQ:true,
                sid:"",
                add: false,
                addUser: {
                    "roleName": "",
                    "remark": ""
                },
                setQx: false,
                selected:[],
                setQxData: [],
                defaultProps: {
                    children: 'childMenu',
                    label: 'menuName'
                },
                cuestableData: [],
                currentPage:1,
                total:6,
                pageSize:10,
                rules:{
                    names:[
                        { required: true, message: '请输入名称', trigger: 'blur' }
                    ]
                }
            }
        },
        mounted () {
            this.getCharacterList();
        },
        methods: {
            getCharacterList () {
                var that=this;
                let param={
                    "rows":that.pageSize,
                    "page":that.currentPage,
                    "sort":"sid",
                	"order":"asc"
                }
                this.$http.post(api.characterList,param).then((response)=>{
                    let data=response.body;
                    that.cuestableData=data.rows;
                    // console.log(that.cuestableData)
                    that.total=data.total
                    this.loading=false

                })
            },
            shezhi: function(row) {
                var that=this;
                this.sid=row.sid
                this.setQx = !this.setQx;
                this.$http.post(api.UserJurisdiction,{"sid":row.sid}).then((response)=>{
                    // console.log(response.body)
                    if(response.body.rtData.menuIds){
                        this.loadingQ=false
                        this.selected=(response.body.rtData.menuIds.split(","));
                        this.$http.post(api.allJurisdiction).then((response)=>{
                            // console.log(response.body)
                            this.setQxData=response.body.rtData;
                        })
                    }else{
                        this.loadingQ=false
                        this.selected=[];
                        this.$http.post(api.allJurisdiction).then((response)=>{
                            // console.log(response.body)
                            this.setQxData=response.body.rtData;
                        })
                    }
                })

            },
            getCheckedKeys () {
                // console.log(this.$refs.tree.getCheckedKeys().join(","));
                var param={
                    "sid":this.sid,
                    "menuIds":this.$refs.tree.getCheckedKeys().join(",")
                }
                // console.log(param)
                this.$http.post(api.saveUserJurisdiction,param).then((response)=>{
                    // console.log(response);
                    if(response.body.rtState){
                        this.setQx=!this.setQx;
                        this.$message({
                            message:response.body.rtMsg,
                            type:"success"
                        })
                    }
                })
            },
            addJs (roleForm) {
                this.$refs[roleForm].validate((valid)=>{
                    if(valid){
                        this.$http.post(api.addUser,this.addUser).then((response)=>{
                            if(response.body.rtState){
                                this.$message({
                                    message:response.body.rtMsg,
                                    type:"success"
                                })
                                this.add=!this.add;
                                this.addUser.roleName="";
                                this.addUser.remark="";
                                this.loading=true
                                this.getCharacterList();
                            }
                            // console.log(response.body)
                        })
                    }
                })
            },
            currentChange (val) {
                this.currentPage=val;
                this.loading=true;
                this.getCharacterList();
            }
        }
    }
</script>
<style>
    .cell{
        text-align: center !important;
    }
</style>
