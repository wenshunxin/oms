<template>
    <div style=";height:100%;overflow: auto;background:#f2f2f2;padding: 10px 20px 0;">
		<!--面包屑-->
		<el-col :span="24" style="height:30px;line-height:30px;border-bottom:2px solid #999;margin-bottom:10px;">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/ServiceManagement' }">服务列表</el-breadcrumb-item>
				<el-breadcrumb-item>服务处理</el-breadcrumb-item>
			</el-breadcrumb>
		</el-col>
		<!--该订单的详情-->
        <el-col :span="24" style="margin-bottom:15px;padding-left:20px;">
			<span>{{row.createTime}}</span>
			<span style="margin-left:40px;">订单编号:{{row.orderNumber}}</span>
            <!--<el-button type="primary" style="float:right;">完成</el-button>-->
		</el-col>

		<!--渲染表格数据-->
		<table border cellspaning="0" cellpaddding="0" class="tableFirst" >
			<thead class="tableThead">
				<th style="width:5%;">序号</th>
				<th style="width:15%;">设备名称</th>
				<th style="width:10%;">设备ID</th>
				<th style="width:20%;">服务项</th>
				<th style="width:20%;">设备内容</th>
				<th>操作</th>
			</thead>
			<tbody>
				<tr v-for ="(item,index) in tableData" style="background:#fff;">
					<td style="width:5%;border-bottom:2px solid #DFE6EC;">{{index+1}}</td>
					<td style="width:15%;border-bottom:2px solid #DFE6EC;">{{item.equipmentName}}</td>
					<td style="width:10%;border-bottom:2px solid #DFE6EC;">{{item.sn}}</td>
					<td colspan="3" style="width:60%;">
						<table border="0" cellpaddding="0" cellspaning="0" style="width:100%;">
							<tr v-for = "itemList in item.serviceList" style="border-bottom:1px solid #DFE6EC;width:100%;">
								<td style="width:33.3%;border-right:1px solid #DFE6EC;">{{itemList.serviceItemName}}</td>
								<td style="width:16.735%;border-right:1px solid #DFE6EC;">{{itemList.oldServiceContent}}</td>
								<td style="width:16.73%;border-right:1px solid #DFE6EC;">{{itemList.newServiceContent}}</td>
								<td>
									<el-button type="text" v-if="itemList.auditStatus==0" size="small" @click="handleApprove(itemList,index)">批准</el-button>
                        			<el-button type="text" v-if="itemList.auditStatus==0" size="small" @click="handleReject(itemList,index)">驳回</el-button>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</tbody>
		</table>
		<div v-if="isShow" class="isShow">
			暂无数据
		</div>
		<!--分页代码-->
		<el-col :span="24" class="w-toolbar"  style="height:5rem;">
             <el-pagination  style="text-align:right;"  :current-page="currentPage"  :page-size="pageSize"  layout= " total ,prev, pager, next" :total="total"  @current-change="currentChange"></el-pagination>
        </el-col>
    </div>
</template>
<script>
import { api } from "../../js/api/api.js";
import  { getCheckdate } from '../../js/api/getNowDate.js';
import { getCookie } from "../../js/api/cookie.js";
	export default {
		data(){
			return {
				//分页内容
                currentPage:1,//当前页数
                total:0,  //总条数
                pageSize:10, //每页显示的条数,
				tableData:[],
				row:[],
				isShow:false
			}
		},
		created:function(){
			this.handleList();
		},
		methods:{
			currentChange:function(val){
				this.currentPage=val;
			},
			handleList:function(){
				var row=this.$route.params.row;
				var auditStatus =this.$route.params.auditStatus
				var value = JSON.parse(row);
				 this.row=value;
				var para ={
					"orderId":value.orderId,
					"rows":this.pageSize,
					"page":this.currentPage,
					"auditStatus":Number(auditStatus)

				}
				this.$http.post(api.handleService,para).then((res)=>{
					var json = res.data;
					this.total = json.total;
					this.tableData=json.rows;
					if(this.tableData.length==0){
						this.isShow=true;
					}else{
						this.isShow=false;
					}
					//  console.log(json);
				})
			},
			handleApprove:function(row,index){
				this.$confirm('确认批准此项服务申请?', '提示', {
					type: 'warning'
				}).then(() => {
				// serviceAudit
					var para={
						"sid":row.sid,
						"auditStatus":1
					}
					this.$http.post(api.serviceAudit,para).then((res)=>{
						var json = res.data;
						// console.log(json)
						if(json.rtState){
							this.$message({
								type:'success',
								message:json.rtMsg
							})
							this.handleList();
						}else{
							this.$message({
								type:'error',
								message:json.rtMsg
							})
						}
					})
				})
			},
			handleReject:function(row,index){
				this.$confirm('确认驳回此项服务申请?', '提示', {

					type: 'warning'
				}).then(() => {
					this.$prompt('请输入驳回意见', '提示', {
						confirmButtonText: '确认',
						cancelButtonText: '取消',
						inputPattern: /\S/,
						inputErrorMessage: '请输入驳回意见'
						}).then(( value ) => {
							var para={
								"sid":row.sid,
								"auditStatus":2,
								"auditContent":value.value
							}
							this.$http.post(api.serviceAudit,para).then((res)=>{
								var json = res.data;
								// console.log(json)
								if(json.rtState){
									this.$message({
										type:'success',
										message:json.rtMsg
									})
									this.handleList();
								}else{
									this.$message({
										type:'error',
										message:json.rtMsg
									})
								}
							})
						}).catch(() => {
							// this.$message({
							// 	type: 'info',
							// 	message: '取消输入'
							// });
						});

				})
			}
		}
	}
</script>
<style>
    .tableFirst{
		width:100%;
		border:1px solid #DFE6EC;
	}
	.tableThead{
		height:4rem;
		line-height: 4rem;
		background:#EEF1F6;
	}
	.tableThead th{
		text-align: center;
		font-family:"Microsoft Yahei"
	}
	.isShow{
		height:4rem;
		width:99.8%;
		line-height: 4rem;
		text-align: center;
		background:#fff;
		border:1px solid #DFE6EC;
		border-top:0;
	}
	.w-toolbar .el-pagination{
        padding:0;
    }
</style>
