<template>
    <div style="padding:10px 20px 0 20px;height:100%;overflow:auto;box-sizing:border-box">
        <!-- 产品列表 -->
        <div v-if="!this.chanpinXQ">
            <div style="margin-bottom:10px;">
                <el-input placeholder="产品名称/类别/型号" icon="search" v-model="input2" style="width:30%;"></el-input>
                <el-button type="primary" @click="sousuo">搜索</el-button>
            </div>
            <div style="border:1px solid #838383;height:0;margin-bottom:15px;"></div>
            <div style="margin-bottom:10px;">
                <el-table :data="tableData" border style="width: 100%" stripe v-loading.body="loading">
                    <el-table-column prop="key" label="序号" width="80"></el-table-column>
                    <el-table-column prop="productName" label="产品名称">
                        <template scope="props">
                            <!-- <div style="cursor:pointer:color:#20a0ff;" @click="info(props.row)"></div> -->
                            <el-button type="text" size="small" @click="info(props.row)">{{props.row.productName}}</el-button>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="product_group" label="组别"></el-table-column> -->
                    <el-table-column prop="productCategory" label="类别"></el-table-column>
                    <el-table-column prop="productGroup" label="型号"></el-table-column>
                    <el-table-column prop="productVersion" label="版本号"></el-table-column>
                    <el-table-column prop="productStatus" label="产品状态" sortable></el-table-column>
                    <el-table-column prop="onlineDate" label="上线时间" sortable></el-table-column>
                    <el-table-column label="宣传文档" inline-template>
                        <template>
                            <div>

                                <el-button type="text" size="small" ><a :href="row.attachPath" style="color:#20a0ff;text-decoration:none">下载</a></el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 分页 -->
            <el-pagination
            style="text-align:right;"
            :current-page="currentPage"
            layout="total,prev, pager, next"
            :total="total"
             @current-change="currentChange">
           </el-pagination>
        </div>
        <!-- 产品详情 -->
        <!-- <div v-if="chanpinXQ">
            <div style="margin-bottom:30px;text-align:right;padding-right:10rem">
                <el-button type="primary" icon="close" @click="fanhui"></el-button>
            </div>
            <el-form :model="chanpinXQmain" label-position="center" label-width="8rem" style="width:50%;margin:0 auto;">
                <el-form-item label="产品名称">
                    <el-input :disabled="true" v-model="chanpinXQmain.productName"></el-input>
                </el-form-item>
                <el-form-item label="类别">
                    <el-input :disabled="true" v-model="chanpinXQmain.productCategory"></el-input>
                </el-form-item>
                <el-form-item label="版本号">
                    <el-input :disabled="true" v-model="chanpinXQmain.productVersion"></el-input>
                </el-form-item>
                <el-form-item label="产品状态">
                    <el-input :disabled="true" v-model="chanpinXQmain.productStatus"></el-input>
                </el-form-item>
                <el-form-item label="上线时间">
                    <el-input :disabled="true" v-model="chanpinXQmain.createTime"></el-input>
                </el-form-item>
                <el-form-item label="型号">
                    <el-input :disabled="true" v-model="chanpinXQmain.productGroup"></el-input>
                </el-form-item>
                <el-form-item label="网关">
                    <el-input :disabled="true" v-model="chanpinXQmain.gatewayName"></el-input>
                </el-form-item>
                <el-form-item label="产品描述">
                    <el-input :disabled="true" v-model="chanpinXQmain.productDescription"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input :disabled="true" v-model="chanpinXQmain.remark"></el-input>
                </el-form-item>
                <el-form-item label="图片/文件">
                    <div class="ycptf">
                        <div>
                            <img :src="photos" alt="" style="width:10rem;height:10rem;">
                            <p style=" word-wrap:break-word; word-break:normal; ">{{productPhotos[0].attachName}}</p>
                        </div>
                        <div>
                            <img :src="photos" alt="" style="width:10rem;height:10rem;">
                            <p style=" word-wrap:break-word; word-break:normal; " >{{productFiles[0].attachName}}</p>
                        </div>
                    </div>
                </el-form-item>
            </el-form>
        </div> -->
    </div>
</template>
<script>
    import {getCookie} from '../js/api/cookie.js'
    import {api} from '../js/api/api.js'

    export default ({
        data () {
            return {
                head:{
                    Token:getCookie('token')
                },
                sid:{
                    sid:""
                },
                types:[],
                productGroups:[],
                downloadT:api.downloadT,
                action:api.updateUpload,
                loading:true,
                dialogs:false,
                dialogss:false,
                dialogForm:{},
                currentPage:1,
                total:6,
                pageSize:10,
                chanpinXQ:false,
                chanpinXQmain:{},
                input2:"",
                tableData:[],
                photos:"",
                files:"",
                productPhotos:[],
                productFiles:[],
                dlo:"",
                rules:{
                    productName:[
                        { required: true, message: '请输入产品名称', trigger: 'blur' }
                    ],
                    productCategory:[
                        { required: true, message: '请选择类别', trigger: 'change' }
                    ],
                    productGroup:[
                        { required: true, message: '请选择型号', trigger: 'change' }
                    ],
                    productStatus:[
                        { required: true, message: '请选择状态', trigger: 'change' }
                    ],
                }
            }
        },
        mounted () {
            this.getProductList();
            this.getSelect();
        },
        methods:{
            getProductList () {
                let param={
                    rows:this.pageSize,
                    page:this.currentPage,
                    "sort":"sid",
                	"order":"desc"
                }
                this.$http.post(api.productList,param).then((response)=>{
                    //  console.log(response)
                    this.total=response.body.total;
                    this.tableData=response.body.rows;
                    // this.tableData.productFiles
                    // this.dlo=((api.downloadT+"&attachPath="+row.productFiles[0].attachPath+""));
                    for(var i=0;i<this.tableData.length;i++){
                        if(this.tableData[i].productStatus==1){
                            this.tableData[i].productStatus="研发"
                        }else if(this.tableData[i].productStatus==2){
                            this.tableData[i].productStatus="试用"
                        }else if(this.tableData[i].productStatus==3){
                            this.tableData[i].productStatus="上线"
                        }else if(this.tableData[i].productStatus==4){
                            this.tableData[i].productStatus="下线"
                        }
                    }
                    for( var indexs in this.tableData){
                        this.tableData[indexs].key=(this.currentPage-1)*10+(indexs*1+1)
                    }
                    this.loading=!this.loading;
                })
            },
            getSelect () {
                this.$http.post(api.getChildCategoryListByParentNo+"&categoryNo=PRODUCT_TYPE").then((response)=>{
                    // console.log(response.body)
                    this.types=response.body.rtData
                })
            },
            typesC (val) {
                // console.log(val);
                this.$http.post(api.getChildCategoryListByParentNo+"&categoryNo=MODEL_"+val).then((response)=>{
                    this.productGroups=response.body.rtData
                })
            },
            qingK (val) {

                if(!val){
                    // console.log(this.dialogForm.productCategory)
                    // console.log(this.productCategoryMR)
                    if(this.productCategoryMR!=this.dialogForm.productCategory){
                        this.dialogForm.productGroup=null;
                    }
                }


            },
            sousuo () {
                let param={
                    rows:this.pageSize,
                    page:this.currentPage,
                    "sort":"sid",
                	"order":"desc",
                    queryStr:this.input2
                }
                this.loading=!this.loading;
                this.$http.post(api.productList,param).then((response)=>{
                    // console.log(response)
                    this.total=response.body.total;
                    this.tableData=response.body.rows;
                    for(var i=0;i<this.tableData.length;i++){
                        if(this.tableData[i].productStatus==1){
                            this.tableData[i].productStatus="研发"
                        }else if(this.tableData[i].productStatus==2){
                            this.tableData[i].productStatus="试用"
                        }else if(this.tableData[i].productStatus==3){
                            this.tableData[i].productStatus="上线"
                        }else if(this.tableData[i].productStatus==4){
                            this.tableData[i].productStatus="下线"
                        }
                    }
                    for( var indexs in this.tableData){
                        this.tableData[indexs].key=(this.currentPage-1)*10+(indexs*1+1)
                    }
                    this.loading=!this.loading;
                })
            },
            info (row){
                this.$router.push({
                    name:"productDetails",
                    params:{
                        id:row.sid
                    }
                })
            },
            fanhui () {
                this.chanpinXQ=!this.chanpinXQ
            },
            currentChange (val) {
                this.currentPage=val;
                this.loading=!this.loading;
                this.getProductList();
            }
        }
    })
</script>
<style>
    .ycptf{
        display: -webkit-box;
    }
    .ycptf>div{
        margin-right: 20px;
        text-align: center;
        width: 0%;
        -webkit-box-flex:1;
    }
</style>
