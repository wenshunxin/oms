<template>
    <div style="height:100%;overflow:auto;background:#f2f2f2;padding:20px;">
		<!--工具条-->
       <div style="text-align: right;">
            <el-button type="primary" @click="handleAdd" style="margin-bottom: 10px;">新增菜单</el-button>
       </div>
		<!--新增界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm" style="width:100%;">
				<el-form-item label="菜单名称" prop="">
					<el-input v-model="addForm.menuName" auto-complete="off" name="menuName"></el-input>
				</el-form-item>
				<el-form-item label="父级菜单" prop="parentId">
                    <el-select v-model="addForm.parentId" placeholder="无" name="parentId">
                        <el-option v-for="item in options" :label="item.menuName" :value="item.sid" :key="item.menuName"></el-option>
                    </el-select>
				</el-form-item>
				<el-form-item label="菜单路径" prop="">
					<el-input v-model="addForm.menuUrl" auto-complete="off" name="menuUrl"></el-input>
				</el-form-item>
                <el-form-item label="菜单图标" prop="">
					<el-input v-model="addForm.menuIcon" auto-complete="off" name="menuIcon"></el-input>
				</el-form-item>
                <!--<el-form-item label="菜单图标" prop="">
					<el-input v-model="addForm.menuIcon" auto-complete="off" name="menuIcon"></el-input>
				</el-form-item>-->
				<el-form-item label="备注">
					<el-input type="textarea" v-model="addForm.remark" name="remark"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit">提交</el-button>
			</div>
		</el-dialog>


        <!--初始化显示列表-->
        <el-table :data="tableData3" style="margin-bottom: 50px;"  border class="showBorder" >
                <el-table-column type="expand">
                    <template scope="props">
                        <el-table :data="props.row.childMenu"   :show-header="false" center class="hideBorder" >
                            <el-table-column label="菜单名称" prop="menuName" center ></el-table-column>
                            <el-table-column label="菜单链接"  prop="menuUrl" center></el-table-column>
                            <el-table-column label="操作" prop="desc">
                                <template scope="scope">
                                    <el-button @click="handleEdit(scope.$index, scope.row)" type="text" size="small">修改</el-button>
                                    <el-button type="text" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-table-column>
                <el-table-column label="菜单名称" prop="menuName" center ></el-table-column>
                <el-table-column label="菜单链接"  prop="menuUrl" center></el-table-column>
                <el-table-column label="操作" prop="desc">
                    <template scope="scope">
                        <el-button @click="handleEdit(scope.$index, scope.row)" type="text" size="small">修改</el-button>
                        <el-button type="text" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
        </el-table>

        <!--修改-->
        <el-dialog title="修改" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="100px" :rules="addFormRules"  ref="editForm" style="width:100%;">
				<el-form-item label="菜单名称" prop='menuName'>
					<el-input v-model="editForm.menuName" auto-complete="off" name ="menuName"></el-input>
				</el-form-item>
				<el-form-item label="父级菜单" prop="">
                    <el-select v-model="editForm.parentId" placeholder="无" name="parentId" :disabled="change" >
                        <el-option v-for="item in changeOptions" :label="item.menuName" :value="item.sid" :key="item.menuName"></el-option>
                    </el-select>
				</el-form-item>
				<el-form-item label="菜单路径" prop="menuUrl">
					<el-input v-model="editForm.menuUrl" auto-complete="off" name ="menuUrl"></el-input>
				</el-form-item>
                <el-form-item label="菜单图标" prop="">
					<el-input v-model="editForm.menuIcon" auto-complete="off" name ="menuIcon"></el-input>
				</el-form-item>
				<el-form-item label="备注">
					<el-input type="textarea" v-model="editForm.remark" name ="remark"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit">提交</el-button>
			</div>
		</el-dialog>
    </div>
</template>
<script>
import { api } from '../js/api/api';
	export default {
		data() {
			return {
                options: [],
                changeOptions: [],
				addFormVisible: false,//新增界面确认显示
				addFormRules: {
					menuName: [
						{ required: true, message: '请输入菜单名称' }
					],
                    menuUrl: [
						{ required: true, message: '请输入菜单路径' }
					]
				},
				//新增界面数据
				addForm: {
					menuName: '',
                    parentId:[],
				    menuUrl:"",
					menuIcon:'',
					remark: ''
				},
                //修改页面
                editForm:{
                    menuName: '',
                    parentId:"",
					menuUrl:"",
					menuIcon:'',
					remark: ''
                },
                editFormVisible: false,//编辑界面确认显示
                tableData3: [],
                change:false
            }
        },
        created:function(){
            this.fetchSelect();
            this.fetchList();
        },
		methods: {
            //渲染下拉列表
            fetchSelect:function(){
                this.$http.post(api.MenuSelect).then(function(data){
                    var  json = data.body;
                    // console.log(json);
                    if(json.rtState){
                        this.options=json.rtData;
                        this.changeOptions=json.rtData;
                    }
                })
            },
            //点击修改显示
            handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
                // console.log(this.editForm);
                if(this.editForm.parentId==0){
                    this.editForm.parentId="无";
                    this.change=true;
                }else{
                     this.change=false;
                }
			},
            //修改页面提交
            editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        let para = Object.assign({}, this.editForm);
                            if(para['childMenu']){
                                delete para['childMenu'];
                            };
                            if(para.parentId=="无"){
                                para.parentId=0;
                            };
                            this.editFormVisible = false;
                            this.$http.post(api.MenuEditor,para).then(function(data){
                                var json = data.body;
                                // console.log(json);
                                if(json.rtState){
                                    this.$message({
                                        message:"修改成功",
                                        type:'success'
                                    });
                                    this.fetchList();
                                }
                            })
                        });
					}
				});
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					menuName: '',
                    parentId:"",
					menuUrl:"",
					menuIcon:'',
					remark: ''
				};
			},
            //新建菜单保存
            addSubmit:function(){
                this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							let para = Object.assign({}, this.addForm);
                            this.addFormVisible = false;
                            this.$http.post(api.MenuAdded, para).then(function(data){
                                var json = data.body;
                                if(json.rtState){
                                    this.fetchList();
                                    this.$message({
                                        message:"新建成功",
                                        type:'success'
                                    });
                                }
                            })
						});
					}
				});
            },
            //渲染列表
            fetchList:function(){
                this.$http.post(api.MenuList).then(function(data){
                    var json=data.body;
                    if(json.rtState){
                        var obj =json.rtData;
                        this.tableData3=obj;
                    }
                });
            },
            //删除
            handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					let para = { sid: row.sid };
                        this.$http.post(api.MenuDel,para).then(function(data){
                            var json = data.body;
                            // console.log(para);
                            if(json.rtState){
                                this.fetchList();
                                this.$message({
                                    message:"删除成功",
                                    type:"success"
                                });
                            }
                        })
				}).catch(() => {
					//点击取消按钮
				});
			}
        }
	};
</script>
<style>
    .el-dialog__wrapper .el-dialog--small{
        width:35% ;
    }
    /*.demo-table-expand {
        font-size: 0;
    }*/
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    /*.demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }*/
    .showBorder .el-table__body .el-table__expanded-cell{
        padding:0 0 0 47.6px;
    }
    .hideBorder{
        border:0 !important;
        overflow:hidden;
    }
    .showBorder .el-table__expanded-cell td{
        border:0;
        border-top:1px solid #dfe6ec;
        border-left:1px solid #dfe6ec;
    }
     .el-table::before{
        height:0 !important;
    }
    .showBorder .el-table__expand-column{
        width:47px !important;
        border-right:0 !important
    }
    .showBorder .el-table__expand-column .cell{
        width:47px !important;
    }
</style>

