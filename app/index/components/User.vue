<template>
	<section class="L-background"  style="overflow-y:auto;">
		<div class="L-center-div">
			<!-- 搜索框 -->
			<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
				<el-form :inline="true">
					<el-input v-model="text" placeholder="请输入电话/姓名/账号" type="text" class="table_search_box" :maxlength="30" icon="search"></el-input>
					<div class="L-2button-width">
						<el-form-item >
							<el-button type="primary" class="L-button-content" v-on:click="getUserSearch">搜索</el-button>
						</el-form-item>
		                <el-form-item>
							<el-button type="primary" class="L-button-content L-float-right" @click="handleAdd">新增</el-button>
						</el-form-item>
					</div>
				</el-form>
			</el-col>

			<!-- Table表格 -->
			<el-table border :data="users" class="table"  @selection-change="handleCurrentChange" :default-sort = "{prop: 'date', order: 'descending'}" >
				<el-table-column type="selection"  align='center'>
	    		</el-table-column>
				<el-table-column prop="key" label="序号" width="70" align='center'>
	    		</el-table-column>
				<el-table-column  prop="userName" label="姓名"  style="width:10%"  align='center'>
			    </el-table-column>
				<el-table-column  prop="userPhone" label="电话"  style="width:10%"  align='center'>
			    </el-table-column>
			    <el-table-column  prop="userId" label="账号" style="width:10%"  align='center'>
			    </el-table-column>
				<el-table-column  prop="roleName" label="角色"  style="width:10%"  align='center'>
			    </el-table-column>
			    <el-table-column prop="createTime" label="创建时间"  width="160" :formatter="formatTime" align='center'>
			    </el-table-column>
			    <el-table-column  label="操作" width="200"  align='center'>
			        <template scope="scope">
						<el-button class="L-button" size="small" @click="handleEdit(scope.$index, scope.row)"><img src="../imgs/edit1.png"></el-button>
				        <el-button class="L-button" size="small" @click="handleDel(scope.$index, scope.row)"><img src="../imgs/del.png"></el-button>
				        <el-button class="L-button" size="small" @click="handlePasswordReset(scope.$index, scope.row)"><img src="../imgs/reset.png"></el-button>
					</template>
			    </el-table-column>
			 </el-table>

			 <!-- 分页 -->
			<el-pagination class="L-pagination"  layout="total, prev, pager, next" @current-change="currentChange"  :current-page="this.page.currentPage" :total="this.page.total" :page-size="this.page.rows">
			</el-pagination>

			 <!--编辑界面-->
	 		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
	 			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
	 				<el-form-item label="姓名" prop="userName">
	 					<el-input v-model="editForm.userName" auto-complete="off" class="L-user-input"></el-input>
	 				</el-form-item>
					<el-form-item label="电话" prop="userPhone">
						<el-input v-model="editForm.userPhone" :span="24" class="L-user-input"></el-input>
					</el-form-item>
					<el-form-item label="账号" prop="userId">
	                    <el-input v-model="editForm.userId" :span="24" :disabled="true" class="L-user-input"></el-input>
	                </el-form-item>
					<el-form-item label="角色" prop="roleId">
						<el-select v-model="editForm.roleId" placeholder="请选择">
						    <el-option v-for="item in options" :label="item.roleName" :value="item.sid" :key="item.roleName">
						    </el-option>·
						 </el-select>
	                </el-form-item>
	 			</el-form>
	 			<div slot="footer" class="dialog-footer">
	 				<el-button class="L-edit-button" @click.native="editFormVisible = false">取消</el-button>
	 				<el-button class="L-edit-button" type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
	 			</div>
	 		</el-dialog>

	        <!--新增界面-->
	        <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
	            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
	                <el-form-item label="姓名" prop="userName">
	                    <el-input v-model="addForm.userName" auto-complete="off" class="L-user-input"></el-input>
	                </el-form-item>
					<el-form-item label="电话" prop="userPhone">
	                    <el-input v-model="addForm.userPhone" :span="24" class="L-user-input"></el-input>
	                </el-form-item>
					<el-form-item label="账号" prop="userId">
	                    <el-input v-model="addForm.userId" :span="24" class="L-user-input"></el-input>
	                </el-form-item>
					<el-form-item label="角色" prop="role">
						<el-select v-model="addForm.roleId" placeholder="请选择" @change="changeRole">
						    <el-option v-for="item in options" :label="item.roleName" :value="item.sid" :key="item.roleName" >
						    </el-option>
						 </el-select>
	                </el-form-item>
	            </el-form>
	            <div slot="footer" class="dialog-footer">
	                <el-button class="L-edit-button" @click.native="addFormVisible = false">取消</el-button>
	                <el-button class="L-edit-button" type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
	            </div>
	        </el-dialog>
		</div>
	</section>
</template>

<script>

import { api } from '../js/api/api';
import { getCookie } from '../js/api/cookie';
import { getDate } from '../js/api/date';

export default {
    mounted() {
        this.getUsers();
		this.getRoleList();
    },
    methods: {
        deleteRow(index, rows) {
            rows.splice(index, 1);

        },
		//时间显示转换
		formatTime: function (row, column) {
			return	getDate(row.createTime)
		},
		handleCurrentChange(val) {
			this.page = val;
			this.getUsers();
		},
		//获取用户列表
		getUsers() {
			let para = {
				rows: this.page.rows,
				page: this.page.currentPage,
				order: "desc"
			};
            this.$http.post(api.getUserList , para)
			.then((res) => {
					if(res.ok === true){
						this.users = res.body.rows;
						this.page.total = res.body.total;
						for(var key in this.users){
		                    this.users[key].key = ((this.page.currentPage - 1) * 15) + (key * 1 + 1);
		                }
					}else{
						this.$message({
							type: 'info',
            				message: res.status
						})
					}
				},
				(err) => {
					console.log(err)
				}
            )
		},
		//获取角色
		getRoleList: function(){
			this.$http.post( api.UserRoleList )
			.then((res) => {
				this.options = res.body.rtData
				// console.log(this.options)
			})
		},
		changeRole:function(event){
			if(event){
				return this.style = true;
			}
		},
		//用户搜索
		getUserSearch: function(){
			let para = {
				queryStr :  this.text
			};
			this.$http.post(api.getUserList , para)
			.then((res) => {
				if(res.ok === true){
					this.users = res.body.rows;
				}else{
					this.$message(res.status)
				}
			})
		},
		//重置密码
		handlePasswordReset: function(index, row) {
			this.$confirm('确认重置密码？', '提示', {
				type: 'warning'
			}).then(() => {
				let para = { sid : row.sid };
				this.$http.post( api.UserPasswordReset, para)
				.then((res) => {
					this.$message({
						type:'success',
					    message:res.body.rtMsg
					})
				})
			})
		},
		//翻页
		currentChange: function(val){
			this.page.currentPage = val;
			this.getUsers();
		},
		//删除
		handleDel: function (index, row) {
			this.$confirm('确认删除该记录吗?', '提示', {
				type: 'warning'
			}).then(() => {
				let para = { sid: row.sid };
				this.$http.post(api.UserDelete, para).then((res) => {
					this.$message({
						title: '成功',
						message: '删除成功',
						type: 'success'
					});
					this.getUsers();
				});
			})
		},
		//显示编辑界面
		handleEdit: function (index, row) {
			this.editFormVisible = true;
			this.editForm = Object.assign({}, row);
		},
        //显示新增界面
        handleAdd: function () {
            this.addFormVisible = true;
            this.addForm = {
                userName: '',
                userPhone: '',
				userId:'',
                roleId: ''
            };
        },
		//编辑
		editSubmit: function () {
			this.$refs.editForm.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {})
					.then(() => {
						let para = {
							userName: this.editForm.userName,
							userPhone: this.editForm.userPhone,
							roleId: this.editForm.roleId,
							userId: this.editForm.userId,
							sid:this.editForm.sid
						}
						this.$http.post( api.UserEditor, para)
						.then((res) => {
							this.$message({
								type: 'success',
								message: '修改成功'
							})
							this.$refs['editForm'].resetFields();
							this.editFormVisible = false;
							this.getUsers();
						})
					})
				}
			});
		},
		//新增
		addSubmit: function () {
			this.$refs.addForm.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {})
					.then(() => {
						let para = Object.assign({}, this.addForm);
						this.$http.post( api.UserAdded, para).then((res) => {
							this.$message({
            					type: 'success',
            					message: '新增成功!'
          					})
							this.$refs['addForm'].resetFields();
							this.addFormVisible = false;
							this.getUsers();
						})
					})
				}
			});
		},
		selsChange: function (sels) {
			this.sels = sels;
		},
		handleSelectionChange(val) {
        	this.multipleSelection = val;
		},
		//批量删除
		batchRemove: function () {
			var ids = this.sels.map(item => item.id).toString();
			this.$confirm('确认删除选中记录吗？', '提示', {
				type: 'warning'
			}).then(() => {
				this.listLoading = true;
				// NProgress.start();
				let para = { ids: ids };
				batchRemoveUser(para).then((res) => {
					this.listLoading = false;
					// NProgress.done();
					this.$meaasge({
						title: '成功',
						message: '删除成功',
						type: 'success'
					});
					this.getUsers();
				});
			}).catch(() => {

			});
		}
    },
    data() {
		let checkrole = (rule, value, callback) => {
			if(!this.style){
				 return callback(new Error('角色不能为空'));
			}else{
				callback();
			}
		}
        return {
			filters: {
				name: '',
				userPhone: '',
				userId:'',
				roleId: ''
			},
			text:'',
			users: [],
			options:[],
			// total: 0,
			// page: 1,
			listLoading: false,
			sels: [],//列表选中列
			editFormVisible: false,//编辑界面确认显示
			editLoading: false,
			editFormRules: {
				userName: [
					{ required: true, message: '请输入姓名', trigger: 'blur' }
				],
				userId:[
					{ required: true, message: '请输入邮箱', trigger: 'blur' }
				],
				role:[
					{ validator: checkrole, trigger: 'blur' }
				],
				userPhone:[
					{ required: true, message: '请输入手机号/座机号', trigger: 'blur' }
				]
			},
			//编辑界面数据
			editForm: {
				userName: '',
				userPhone: '',
				userId:'',
				roleId: ''
			},
			addFormVisible: false,//新增界面确认显示
			addLoading: false,
			addFormRules: {
				userName: [
					{ required: true, message: '请输入姓名', trigger: 'blur' }
				],
				userId:[
					{ required: true, message: '请输入邮箱', trigger: 'blur' },
					{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
				],
				role:[
					{ validator: checkrole, trigger: 'blur'}
				],
				userPhone:[
					{ required: true, message: '请输入手机号/座机号', trigger: 'blur' }
				]
			},
			//新增界面数据
			addForm: {
				userName: '',
				userPhone: '',
				userId:'',
				roleId: ''
			},
			checked: true,
			sid:'',
			page: {
				total: 0,
				currentPage:1,
				rows:15
			},
			style:false
        }
    }

}
</script>

<style>
	.table el-table-column{
		height: 2rem;
	}
	.el-select .el-input {
	   width: 10rem;
	 }
	 .table_search_box{
	 	width:60% !important;
	 }
	 .L-button-content{
	 	width:10rem;
		margin-left: 1.5rem;
	 }
	 .cell .L-button{
	 	padding: 4px 5px;
	 }
	 .L-edit-button{
	 	width: 6rem;
	 }
	 .top_margin{
	 	margin-top: 2rem;
	 }
	 .table_search_box .el-input__icon{
		 left:0 !important;
	 }
	 .table_search_box .el-input__inner{
		 padding: 3px 30px !important;
	 }
	 .L-button span{
	 	display: block;
	 }
	 .L-button img{
	 	width: 1.5rem;
		height:1.5rem;
	 }
	 .L-button img:hover{
	 	src: "../imgs/save.png";
	 }
	 .L-2button-width{
		 width: 40%;float:right;
	 }
	 .L-2button-width .el-form-item__content{
	 	width: 100%;
	 }
	 .L-2button-width .el-form-item{
	 	margin-left: 10px;
		width: 25%;
	 }
	 .L-2button-width .el-form-item:last-child{
		 float: right;
	 }
	 .L-user-input{
	 	width: 94% !important;
	 }
</style>
