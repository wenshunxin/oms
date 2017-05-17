<template>
    <div>
        <!-- <div>{{$route.params.id}}</div> -->
        <div class="ypaifa" style="margin-bottom:10px;">
            <div class="yTimeAbian">
                <div class="ypaifaM">{{keeper.createTime}}</div>
                <div class="ypaifaM">订单编号：{{keeper.orderNumber}}</div>
            </div>
            <div>
                <el-button type="primary" @click="edit4">派发</el-button>
            </div>
        </div>
        <div class="ydingdanmain">
          <div style="border-bottom:1px solid #d1d1d1;">
              <div><b>收获地址：</b><span>{{keeper.receiveUserAddress}}</span></div>
              <div class="yAddressee">
                  <div><b>收件人：</b><span>{{keeper.receiveUserName}}</span></div>
                  <div><b>联系电话：</b><span>{{keeper.receiveUserPhone}}</span></div>
              </div>
          </div>
          <div  style="border-bottom:1px solid #d1d1d1;" class="yAddressee">
              <div>
                  <b>仓库管理员：</b><span>{{keeper.libKeeperName}}</span>
              </div>
              <div>
                  <b>联系电话：</b>
                 <span>{{keeper.libKeeperPhone}}</span>
              </div>
          </div>
          <div  style="border-bottom:1px solid #d1d1d1;margin-bottom:10px;" class="yAddressee">
              <div>
                  <b>施工人员：</b>
                  <el-select v-model="value1" placeholder="请选择" clearable multiple>
                      <el-option v-for="(item,key) in allSSpeople" :label="item.userName" :value="item.sid" :key="item.userName"></el-option>
                  </el-select>
              </div>
              <div>
                  <b>联系电话：</b>
                  <el-select v-model="selected1" placeholder="请选择" clearable disabled multiple  style="width:250px;">
                  </el-select>
              </div>
          </div>
          <div style="border:1px solid #d1d1d1;">
              <div class="yChanpin" v-for="(item,key) in keeper.orderItemList">
                  <div style="border-right:1px solid #d1d1d1;border-bottom:1px solid #d1d1d1;" class="ychanPinN">
                        <div class="ychanPinNAi">
                                <img :src="item.productPhotos[0].attachPath" alt="" style="width:3rem;height:3rem;display:block;">
                            <div>
                                <span>{{item.productName}}</span>
                            </div>
                        </div>
                        <div style="text-align:center;">
                            <span>{{item.productNums}}</span>
                        </div>
                  </div>
                  <div style="border-bottom:1px solid #d1d1d1;" class="ybj">
                        <div class="yshebeiSN1"><span v-for="(equipmentId,key) in item.equipmentInfoList" >{{equipmentId.equipmentId}}/</span></div>
                        <div>
                            <el-button class="L-button" size="small" @click="shebei(item.orderId,item.productId,item.productNums,item.equipmentInfoList)" ><img src="../imgs/edit.png"></el-button>
                        </div>
                  </div>
              </div>
          </div>
        </div>
        <el-dialog title="设备信息" v-model="shebeiInfo">
            <!-- <el-form  ref="ruleForm" :model="formLl" >
                <template v-for="(item,key) in formL">
                    <el-form-item :label="key+1+''" prop="equipmentId'"
                        :rules="[
                            { required: true, message: '设备SN号不能为空'}
                        ]"
                    >
                        <el-input v-model="item.equipmentId"     style="width:80%"   style="margin-bottom:10px;"></el-input>&nbsp;<el-button class="L-button" size="small" @click="del(key)" v-if="aa"><img src="../imgs/del.png"></el-button>
                    </el-form-item>
                </template>
                    <el-button @click="nice('ruleForm')">确认</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form> -->



             <form >
                <template v-for="(item,key) in formL">
                    <div>
                        <span>{{key+1}}</span>
                        <input v-model="item.equipmentId"  required class="yinp"    ></input>&nbsp;<el-button class="L-button" size="small" @click="del(key)" v-if="aa"><img src="../imgs/del.png"></el-button>
                    </div>
                </template>
                <div style="margin-top:10px;">
                    <el-button @click="nicetwo()">确认</el-button>
                    <el-button @click="shebeiInfo=!shebeiInfo">取消</el-button>
                </div>
            </form>
        </el-dialog>
    </div>
</template>
<script>
    import $ from 'jquery'
    import {api} from '../js/api/api.js';
    import {getCheckdate,trasSecond} from '../js/api/getNowDate.js';
    export default ({
        data () {
            return {
                foa:{
                    aa:"1234"
                },
                value:"",
                value1:[],
                keeper:[],
                productNums:[],
                shebeiInfo:false,
                formL:[],
                formL:{
                    equipmentId:""
                },
                productNumL:"",
                orderId:"",
                productCategory:"",
                productGroup:"",
                aa:false,
                allSSpeople:[]

            }
        },
        computed:{
            selected1:{
                get () {
                    let that=this;
                    let selects=[];
                    for(var j=0;j<that.value1.length;j++){
                        for(var i=0;i<that.allSSpeople.length;i++){
                            if(that.value1[j]==that.allSSpeople[i].sid){
                                selects.push(that.allSSpeople[i].userPhone)
                            }
                        }
                    }
                    return selects
                }
            }
        },
        mounted () {
            this.getInfo();
        },
        methods:{
            getInfo () {
                if(this.$route.params.button==1){
                    this.dingdanxinxi=false
                }else if(this.$route.params.button==2){
                    this.shouhuoxinxi=false
                }else if(this.$route.params.button==3){
                    this.shebeixinxi=false
                }else if(this.$route.params.button==4){
                    this.shigongxinxi=false
                }
                let id=this.$route.params.id
                this.value1=[];
                this.$http.post(api.getCustomerOrderById,{"sid":id}).then((response)=>{
                    // console.log(response.body)
                    this.keeper=response.body.rtData
                    // this.keeper.createTime=trasSecond(this.keeper.createTime);
                    for(var i=0;i<this.keeper.orderItemList.length;i++){
                        this.keeper.orderItemList[i].productPhotos[0].attachPath=encodeURI(encodeURI(api.getAttach+"&attachPath="+this.keeper.orderItemList[i].productPhotos[0].attachPath+""));
                    }
                    for(var j=0;j<this.keeper.implementUserList.length;j++){
                        this.value1.push(this.keeper.implementUserList[j].sid);
                    }
                })
                // 施工人员
                this.$http.post(api.allSSpeople,{"roleId":5}).then((response)=>{
                    // console.log(response.body);
                    this.allSSpeople=response.body.rows
                })
            },
            edit4 () {
                if(this.value1.length==0){
                    this.$alert("施工人员不能为空");
                    return;
                }else{
                    for(var i=0;i<$(".yshebeiSN1").length;i++){
                        if($(".yshebeiSN1").eq(i).text()==""){
                            this.$alert("SN号不能为空");
                             return;
                        }
                    }
                    var bb=[]
                    for(var i=0;i<$(".yshebeiSN1").length;i++){
                        console.log($(".yshebeiSN1").eq(i).text())
                        bb.push($(".yshebeiSN1").eq(i).text())
                    }
                    // console.log(bb)
                    for(var i=0;i<bb.length;i++){
                        // console.log(this.keeper.orderItemList[i])
                        if(this.keeper.orderItemList[i].productNums != bb[i].split("/").length-1){
                            this.$alert("SN号数量与订单数量不符！！");
                            return;
                        }
                    }
                    let params={
                        sid:this.$route.params.id,
                        implementUserId:this.value1.join(","),
                        orderStatus:"安装中"
                    }
                    this.$http.post(api.updateCustomerOrder,params).then((response)=>{
                        // console.log(response.body);
                        this.$message({
                            message:response.body.rtMsg,
                            type:"success"
                        });
                        this.$router.push("/OrderDistribution")
                    })
                }
            },
            shebei (orderId,productId,productNums,equipmentInfoList) {

                this.productNumL=productNums
                this.orderId=orderId
                this.productId=productId
                this.formL=[];
                if(equipmentInfoList.length>=productNums){
                    for(var i=0;i<equipmentInfoList.length;i++){
                        var obj={};
                        var b="";
                        b=equipmentInfoList[i].equipmentId
                        obj.equipmentId=b
                        this.formL.push(obj)
                        // console.log(this.formL)
                    }
                }else{
                    for(var i=0;i<productNums;i++){
                        var obj={};
                        var b="";
                        if(equipmentInfoList[i]){
                            b=equipmentInfoList[i].equipmentId
                        }
                        obj.equipmentId=b
                        this.formL.push(obj)
                        // console.log(this.formL)
                    }
                }
                this.shebeiInfo=!this.shebeiInfo
            },
            nicetwo () {
                if(this.productNumL == this.formL.length){
                    for (var i=0;i<$(".yinp").length;i++){
                        if(!$(".yinp").eq(i).val().trim()){
                            this.$alert("SN号不能为空");
                            return
                        }
                    }
                    var list=[];
                    for(var i=0;i<$(".yinp").length;i++){
                        var obj={};
                        obj.equipmentId=$(".yinp").eq(i).val();
                        list.push(obj)
                    }
                    // console.log(list);
                    let params={
                        orderId:this.orderId,
                        productId:this.productId,
                        equipmentIds:list
                    }
                    this.$http.post(api.saveEquipmentInfos,params).then((response)=>{
                        console.log(response.body)
                        if(response.body.rtState){
                            this.$message({
                                message:response.body.rtMsg,
                                type:"success"
                            });
                            // this.getInfo();
                            for(var i=0;i<this.keeper.orderItemList.length;i++){
                                if(this.keeper.orderItemList[i].productId==this.productId){
                                    this.keeper.orderItemList[i].equipmentInfoList=list
                                }
                            }
                            this.shebeiInfo=!this.shebeiInfo
                        }
                    })
                }else{
                    this.aa=true
                    // alert()
                }
            },
            del (aa) {
                if(this.productNumL == this.formL.length){
                    this.aa=false
                }else{
                    this.formL.splice(aa,1)
                }
            }
        }
    })
</script>
<style>
    /*.ychanPinNAi{
        padding-left: 10px;
        display: -webkit-box;
        -webkit-box-align:center;
        text-align: center;
    }
    .ychanPinNAi>div:last-child{
        -webkit-box-flex:1;
        width:0%;
    }
    .ybj>div:first-child{
        width:0%;
        -webkit-box-flex:1;
    }*/
</style>
