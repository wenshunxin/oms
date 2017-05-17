<template>
    <div style="padding:10px 20px 0 20px;height:100%;overflow-y:auto;">
        <div style="margin-bottom:10px;" class="yGFm">
            <el-input icon="search" placeholder="规范名称/规范类型" style="width:30%;" v-model="input"></el-input>
            <el-button type="primary" @click="sousou">搜索</el-button>
            <el-button type="primary" @click="uplods">上传</el-button>
        </div>
        <div style="border:1px solid #838383;height:0;margin-bottom:15px;"></div>
        <el-table border style="width: 100%;margin-bottom:10px;" stripe :data="tableData" v-loading.body="loading">
            <el-table-column prop="key" label="序号" width="80"></el-table-column>
            <el-table-column prop="standardName" label="规范名称"></el-table-column>
            <el-table-column prop="standardType" label="规范类型"></el-table-column>
            <el-table-column prop="sid" label="操作" inline-template>
                <template>
                    <a :href="row.attachPath" style="margin-right:10px;"><el-button class="L-button" size="small" ><img src="../imgs/xiazai.png"></el-button></a>
                    <el-button class="L-button" size="small" @click="edit(row)"><img src="../imgs/edit1.png"></el-button>
                    <el-button class="L-button" size="small" @click="del(row)"><img src="../imgs/del.png"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
        style="text-align:right;height:5rem;"
         :current-page="currentPage"
         layout="total,prev, pager, next"
         :total="total"
         :page-size="pageSize"
         @current-change="currentChange">
       </el-pagination>
       <!-- 上传 -->
       <el-dialog title="上传" v-model="dialogs">
           <el-form :model="values" :rules="rules" ref="roleForm">
               <el-form-item label="规范类型：" prop="standardType">
                   <el-select v-model="values.standardType" >
                       <el-option v-for="(item,key) in type" :label="item.type" :value="item.type" :key="item.type"></el-option>
                   </el-select>
               </el-form-item>
               <!-- <el-form-item>
                   <el-upload :on-success="succs" :on-error="err" :action="action" list-type="picture" name="standardFiles" :headers="head"  :data="values" :show-file-list="showFileList" accept="application/msword,application/pdf">
                       <div slot="tip" class="el-upload__tip">只能选择.pdf,.doc文件</div>
                       <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                   </el-upload>
               </el-form-item> -->
               <el-form-item>
                   <el-button @click="standardFiles">
                       <input type="file" class="standardFiles" style="display:none" ref="Ffile" @change="Ffile">选择文件
                   </el-button>
                   <span>{{productFilesName}}</span>
               </el-form-item>
               <el-form-item>
                   <el-button @click="guifanuploads('roleForm')">上传</el-button>
               </el-form-item>
           </el-form>
       </el-dialog>
       <!-- 修改 -->
       <el-dialog title="修改" v-model="editDialog">
           <el-form :model="editV" :rules="rules" ref="roleForm">
               <el-form-item label="规范类型：" prop="standardType">
                   <el-select v-model="editV.standardType" >
                       <el-option v-for="(item,key) in type" :label="item.type" :value="item.type" :key="item.type"></el-option>
                   </el-select>
               </el-form-item>
               <!-- <el-form-item>
                   <el-upload :on-success="succ" :on-error="err" :action="updateStandard" list-type="picture" name="standardFiles"
  :headers="head"  :data="editV" accept="application/msword,application/pdf">
                       <div slot="tip" class="el-upload__tip">只能选择.pdf,.doc文件</div>
                       <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                   </el-upload>
               </el-form-item> -->
               <el-form-item>
                   <el-button @click="editstandardFiles">
                       <input type="file" class="editstandardFiles" style="display:none" ref="editFfile" @change="editFfile">选择文件
                   </el-button>
                   <span>{{editproductFilesName}}</span>
               </el-form-item>
               <el-form-item>
                   <el-button @click="guifanedit('roleForm')">修改</el-button>
               </el-form-item>
           </el-form>
       </el-dialog>
    </div>
</template>
<script>
    import {api} from '../js/api/api.js'
    import {getCookie} from '../js/api/cookie.js'
    import $ from 'jquery'
    export default ({
        data () {
            return {
                showFileList:false,
                head:{
                    Token:getCookie('token')
                },
                input:"",
                loading:true,
                action:api.saveStandard,
                updateStandard:api.updateStandard,
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
                ],
                productFilesName:"只能选择.pdf,.doc,.docx格式的文件",
                editproductFilesName:"只能选择.pdf,.doc,.docx格式的文件",
                rules:{
                    standardType:[
                        { required: true, message: '请选择规范类型', trigger: 'change' }
                    ]
                }

            }
        },
        mounted () {
            this.getStandardDatagrid();
        },
        methods:{
            standardFiles () {
                this.$refs.Ffile.click()
            },
            Ffile () {
                if(!$(".standardFiles").prop('files')[0]){
                    this.productFilesName=""
                }else{
                    this.productFilesName=$(".standardFiles").prop('files')[0].name
                }
            },
            editstandardFiles () {
                this.$refs.editFfile.click()
            },
            editFfile () {
                if(!$(".editstandardFiles").prop('files')[0]){
                    this.editproductFilesName=""
                }else{
                    this.editproductFilesName=$(".editstandardFiles").prop('files')[0].name
                }
            },
            guifanuploads (roleForm) {
                if(!$(".standardFiles").prop('files')[0]){
                    this.$alert("规范文件不能为空");
                    return;
                }
                let fileType=$(".standardFiles").prop('files')[0].name.split(".");
                if(fileType[fileType.length-1] != "pdf" && fileType[fileType.length-1] != "docx" && fileType[fileType.length-1] != "doc"){
                    this.$alert("只能选取.pdf,.docx,.doc格式的文件");
                    return;
                }
                let formData= new FormData;
                formData.append("standardType",this.values.standardType);
                formData.append("standardFiles",$(".standardFiles").prop('files')[0]);
                this.loading=!this.loading;
                this.$refs[roleForm].validate((valid)=>{
                    if(valid){
                        this.$http.post(api.saveStandard,formData).then((response)=>{
                            // console.log(response.body);
                            if(response.body.rtState)
                            this.$message({
                                message:response.body.rtMsg,
                                type:"success"
                            });
                            this.getStandardDatagrid();
                            this.dialogs=!this.dialogs
                        })
                    }
                })
            },
            guifanedit (roleForm) {


                if(!$(".editstandardFiles").prop('files')[0]){
                    $(".editstandardFiles").prop('files')[0]=null
                }else{
                    let fileType=$(".editstandardFiles").prop('files')[0].name.split(".");
                    if(fileType[fileType.length-1] != "pdf" && fileType[fileType.length-1] != "docx" && fileType[fileType.length-1] != "doc"){
                        this.$alert("只能选取.pdf,.docx,.doc格式的文件");
                        return;
                    }
                }
                let formData= new FormData;
                formData.append("sid",this.editV.sid);
                formData.append("standardType",this.editV.standardType);
                formData.append("editstandardFiles",$(".editstandardFiles").prop('files')[0]);
                this.loading=!this.loading;
                this.$refs[roleForm].validate((valid)=>{
                    if(valid){
                        this.$http.post(api.updateStandard,formData).then((response)=>{
                            // console.log(response.body);
                            if(response.body.rtState)
                            this.$message({
                                message:response.body.rtMsg,
                                type:"success"
                            });
                            this.getStandardDatagrid();
                            this.editDialog=!this.editDialog
                        })
                    }
                })
            },
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
            uplods () {
                this.values.standardType=null;
                this.dialogs=!this.dialogs
            },

            edit (row){
                // console.log(row)
                this.editV.sid=row.sid;
                this.editDialog=!this.editDialog;
                this.editV.standardType=row.standardType
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
            },
            del (row) {
                // console.log(row)
                this.$confirm("确认删除此项？",{
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    this.loading=!this.loading;
                    this.$http.post(api.deleteStandardById,{"sid":row.sid}).then((response)=>{
                        // console.log(response.body)
                        if(response.body.rtState){
                            this.$message({
                                message:response.body.rtMsg,
                                type:"success"
                            });
                            this.getStandardDatagrid();
                        }
                    })
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
