<template>
    <div>
        <!-- <div>{{$route.params.id}}</div> -->
        <div class="ypaifa" style="margin-bottom:10px;">
            <div class="yTimeAbian">
                <div class="ypaifaM">{{keeper.createTime}}</div>
                <div class="ypaifaM">订单编号：{{keeper.orderNumber}}</div>
            </div>
            <div>
                <el-button type="primary" @click="edit">修改</el-button>
            </div>
        </div>
        <div class="ydingdanmain">
          <div style="border-bottom:1px solid #d1d1d1;">
              <div><b>收获地址：</b><span><el-input style="width:80%;" v-model="keeper.receiveUserAddress" :disabled="shouhuoxinxi"></el-input></span></div>
              <div class="yAddressee">
                  <div><b>收件人：</b><span><el-input style="width:30%;" v-model="keeper.receiveUserName" :disabled="shouhuoxinxi"></el-input></span></div>
                  <div><b>联系电话：</b><span><el-input style="width:30%;" v-model="keeper.receiveUserPhone" :disabled="shouhuoxinxi"></el-input></span></div>
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
                 <span v-for="(item,key) in keeper.implementUserList">{{item.userName}}&nbsp;</span>
              </div>
              <div>
                  <b>联系电话：</b>
                  <span v-for="(item,key) in keeper.implementUserList">{{item.userPhone}}&nbsp;</span>
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
                            <el-input v-model="item.productNums" style="width:50%;" :disabled="dingdanxinxi"></el-input>
                        </div>
                  </div>
                  <div style="border-bottom:1px solid #d1d1d1;" >

                  </div>
              </div>
          </div>
        </div>
    </div>
</template>
<script>
    import {api} from '../js/api/api.js';
    import {getCheckdate,trasSecond} from '../js/api/getNowDate.js';
    export default ({
        data () {
            return {
                dingdanxinxi:true,
                shouhuoxinxi:true,
                shebeixinxi:true,
                shigongxinxi:true,
                value:"",
                value1:"",
                keeper:[],
                productNums:[]
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
                this.$http.post(api.getCustomerOrderById,{"sid":id}).then((response)=>{
                    // console.log(response.body)
                    this.keeper=response.body.rtData
                    // this.keeper.createTime=trasSecond(this.keeper.createTime);
                    for(var i=0;i<this.keeper.orderItemList.length;i++){
                        this.keeper.orderItemList[i].productPhotos[0].attachPath=encodeURI(encodeURI(api.getAttach+"&attachPath="+this.keeper.orderItemList[i].productPhotos[0].attachPath+""));
                    }
                })
            },
            edit () {
                if(this.$route.params.button==1){
                    for(var i=0;i<this.keeper.orderItemList.length;i++){
                        let params={
                            orderId:this.keeper.sid,
                            sid:this.keeper.orderItemList[i].sid,
                            productNums:this.keeper.orderItemList[i].productNums
                        }
                        this.$http.post(api.updateOrderItem,params).then((response)=>{
                            // console.log(response.body);
                            if(response.body.rtState){
                                this.$message({
                                    message:response.body.rtMsg,
                                    type:"success"
                                });
                                this.$router.push("/OrderManagement");
                            }

                        })
                    }
                }
                if(this.$route.params.button==2){
                    let params={
                        sid:this.$route.params.id,
                        receiveUserAddress:this.keeper.receiveUserAddress,
                        receiveUserName:this.keeper.receiveUserName,
                        receiveUserPhone:this.keeper.receiveUserPhone
                    }
                    this.$http.post(api.updateCustomerOrder,params).then((response)=>{
                        // console.log(response);
                        if(response.body.rtState){
                            this.$message({
                                message:response.body.rtMsg,
                                type:"success"
                            });
                            this.$router.push("/OrderManagement");
                        }
                    })
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
    }*/
</style>
