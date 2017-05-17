<template>
    <div style="padding:10px 20px 0 20px;height:100%;overflow:auto;box-sizing:border-box">
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
                        <p style=" word-wrap:break-word; word-break:normal; " v-text="photosName"></p>
                    </div>
                    <div>
                        <img src="../imgs/text.png" alt="" style="width:10rem;height:10rem;">
                        <p style=" word-wrap:break-word; word-break:normal; "  v-text="filesName"></p>
                    </div>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import {api} from '../js/api/api.js';
    export default ({
        data () {
            return {
                chanpinXQmain:{},
                productPhotos:[],
                productFiles:[],
                photos:"",
                files:"",
                photosName:"",
                filesName:""
            }
        },
        mounted () {
            this.getInfo();
        },
        methods:{
            getInfo () {
                this.$http.post(api.productInfo,{sid:this.$route.params.id}).then((response)=>{
                    //  console.log(response.body.rtData)
                    this.productPhotos=response.body.rtData.productPhotos;
                    this.productFiles=response.body.rtData.productFiles;
                    if(response.body.rtData.product.productStatus==1){
                        response.body.rtData.product.productStatus="研发"
                    }else if(response.body.rtData.product.productStatus==2){
                        response.body.rtData.product.productStatus="试用"
                    }else if(response.body.rtData.product.productStatus==3){
                        response.body.rtData.product.productStatus="上线"
                    }else if(response.body.rtData.product.productStatus==4){
                        response.body.rtData.product.productStatus="下线"
                    }
                    this.chanpinXQmain=response.body.rtData.product;
                    if(this.productPhotos.length!=0){
                        this.photos=encodeURI(encodeURI(api.getAttach+"&attachPath="+this.productPhotos[0].attachPath+""));
                        this.photosName=this.productPhotos[0].attachName
                    }
                    if(this.productFiles.length!=0){
                        this.files=encodeURI(encodeURI(api.getAttach+"&attachPath="+this.productFiles[0].attachPath+""));
                        this.filesName=this.productFiles[0].attachName
                    }
                })
            }
        }
    })
</script>
