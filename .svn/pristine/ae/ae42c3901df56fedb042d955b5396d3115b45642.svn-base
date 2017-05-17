<template lang="html">
    <section class="L-background"  style="overflow-y:auto;">
        <div class="L-center-div">
            <!-- 顶部 -->
            <el-col :span="24" class="toolbar L-ins-head" style="margin: 10px 0;">
                <el-form :inline="true">
                    <el-breadcrumb separator=">">
                        <el-breadcrumb-item :to="{ path: '/setInstructionList' }" class="L-bind-color">指令列表</el-breadcrumb-item>
                        <el-breadcrumb-item>指令设置</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-form>
            </el-col>

            <!-- 保存按钮 -->
            <div class="L-warn-button">
                <el-col :span="24">
                    <el-form :inline="true">
                        <el-form-item style="width:11%;float:right">
                            <el-button type="primary" class="L-button-content L-bindmessage-button" @click.native="editor" ref="State" :disabled=" this.sels.length === 0 ">保存</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </div>

            <!-- 表格 -->
            <table class="L-setIns-table">
                <thead class="L-thead" >
                    <td v-for="(item,index) in menu" :width="item.width" :key="item.name">{{ item.name }}</td>
                </thead>
                <tbody style="background:#fff;">
                    <tr>
                        <td :rowspan="9">{{ this.$route.params.name }}</td>
                        <td :rowspan="9">{{ this.$route.params.sn }}</td>
                    </tr>
                    <tr>
                        <td>
                            <el-checkbox @change="changes">传输间隔设置</el-checkbox>
                        </td>
                        <td>
                            <el-select v-model="value" placeholder="请选择" :disabled="this.state1" @change="change1">
                                <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.label">
                                </el-option>
                            </el-select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <el-checkbox @change="changes1">采集间隔设置</el-checkbox>
                        </td>
                        <td>
                            <el-select v-model="value1" placeholder="请选择" :disabled="this.state2" @change="change2">
                                <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.label">
                                </el-option>
                            </el-select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <el-checkbox @change="changes2">时间校验设置</el-checkbox>
                        </td>
                        <td>校准时间</td>
                    </tr>
                    <tr>
                        <td>
                            <el-checkbox @change="changes3">连接模式设置</el-checkbox>
                        </td>
                        <td>
                            <el-select v-model="value2" placeholder="请选择" :disabled="this.state3" @change="change3">
                                <el-option v-for="item in options1" :label="item.label" :value="item.value" :key="item.label">
                                </el-option>
                            </el-select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <el-checkbox @change="changes4">修改设备ID</el-checkbox>
                        </td>
                        <td>
                            <div style="margin-left: 15px;">
                                <el-input placeholder="设备ID" style="width:51%" v-model="value3" :disabled="this.state4">
                                </el-input>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <el-checkbox @change="changes5">设备工作模式设置</el-checkbox>
                        </td>
                        <td>
                            <el-select v-model="value4" placeholder="请选择" :disabled="this.state5" @change="change4">
                                <el-option v-for="item in options2" :label="item.label" :value="item.value" :key="item.label">
                                </el-option>
                            </el-select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <el-checkbox @change="changes6">升级设置</el-checkbox>
                        </td>
                        <td>升级</td>
                    </tr>
                    <tr>
                        <td>
                            <el-checkbox @change="changes7">网关设置</el-checkbox>
                        </td>
                        <td>
                            <el-select v-model="value5" placeholder="请选择" :disabled="this.state6" @change="change5">
                                <el-option v-for="item in options3" :label="item.gatewayName" :value="item.ip" :key="item.gatewayName">
                                </el-option>
                            </el-select>
                        </td>
                    </tr>
                </tbody>
                <!-- <tbody style="background:#fff;">
                    <tr  style="width100%;text-align:center">
                        <td :colspan="4">
                            没有数据
                        </td>
                    </tr>
                </tbody> -->
            </table>
        </div>
    </section>
</template>

<script>
import { api } from '../js/api/api';
export default {
    mounted(){
        this.getAllGateway()
        this.getEquipmentInstruction()
    },
    methods:{
        editor:function(){
            if(this.editorState && this.sels.length != 0){
                let para = {
                    equipmentSid : this.$route.params.id,
                    instructionList :this.sels
                }
                this.$http.post( api.saveInstruction, para).then((res) => {
                    this.$message({
                        // type: 'success',
                        message: res.body.rtMsg
                    })
                },
                (err) => {
                    console.log(err)
                })
            }
        },
        getAllGateway: function(){
            this.$http.post( api.getAllGateway ).then((res) => {
                this.options3 = res.body.rtData;
            })
        },
        getEquipmentInstruction:function(){
            this.$http.post( api.getEquipmentInstruction, {equipmentSid : this.$route.params.id}).then((res) => {
                // console.log(res.body.rtData.equipmentInfo.equipmentName)
                // console.log(res.body.rtData.equipmentInfo.equipmentId)
                if(res.ok && res.body.rtData.instructionList.length !== 0){
                    this.list = res.body.rtData.instructionList
                    for(var key in this.list){
                        if(this.list[key].serviceItem === "a268"){
                            this.value = this.list[key].serviceContent
                        }else if(this.list[key].serviceItem === "a269"){
                            this.value1 = this.list[key].serviceContent
                        }else if(this.list[key].serviceItem === "a267"){
                            this.value2 = this.list[key].serviceContent
                        }else if(this.list[key].serviceItem === "a264"){
                            this.value3 = this.list[key].serviceContent
                        }else if(this.list[key].serviceItem === "a26a"){
                            this.value4 = this.list[key].serviceContent
                        }else if(this.list[key].serviceItem === "a265"){
                            this.value5 = this.list[key].serviceContent
                        }
                    }
                    this.showTable = true;
                }else{
                    this.showTable = false;
                }
            })
        },
        changes:function(e){
            this.state1 = !this.state1;
            if(e.target.checked){
                 this.save(this.value,"19979","a268")
            }else{
                this.delete("a268")
            }
        },
        changes1:function(e){
            this.state2 = !this.state2;
            if(e.target.checked){
                this.save(this.value1,"19979","a269")
            }else{
                this.delete("a269")
            }
        },
        changes2:function(e){
            if(e.target.checked){
                this.save("","19985","0004")
            }else {
                this.delete("0004")
            }
        },
        changes3:function(e){
            this.state3 = !this.state3;
            if(e.target.checked){
                this.save(this.value2,"19977","a267")
            }else {
                this.delete("a267")
            }
        },
        changes4:function(e){
            this.state4 = !this.state4;
            if(e.target.checked){
                this.save(this.value3,"19977","a264")
            }else {
                this.delete("a264")
            }
        },
        changes5:function(e){
            this.state5 = !this.state5;
            if(e.target.checked){
                this.save(this.value4,"19979","a26a")
            }else{
                this.delete("a26a")
            }
        },
        changes6:function(e){
            if(e.target.checked){
                this.save("","19988","")
            }else {
                this.delete("")
            }
        },
        changes7:function(e){
            this.state6= !this.state6;
            if(e.target.checked){
                this.save(this.value5,"19977","a265")
            }else {
                this.delete("a265")
            }
        },
        save:function(value,fun,type){
            let Instructions = {};
                Instructions.jobValue = value
                Instructions.function = fun
                Instructions.instructionType = type
                this.sels.push(Instructions)
        },
        delete:function(type){
            for(var key in this.sels){
                if(this.sels[key].instructionType == type){
                    this.sels.splice(key,1)
                }
            }
        },
        change1:function(){
            this.delete("a268")
            if(!this.state1){
                this.save(this.value,"19977","a268")
            }
        },
        change2:function(){
            this.delete("a269")
            if(!this.state2){
                this.save(this.value1,"19977","a269")
            }
        },
        change3:function(){
            this.delete("a267")
            if(!this.state3){
                this.save(this.value2,"19977","a267")
            }
        },
        change4:function(){
            this.delete("a26a")
            if(!this.state5){
                this.save(this.value4,"19977","a26a")
            }
        },
        change5:function(){
            this.delete("a265")
            if(!this.state6){
                this.save(this.value5,"19977","a265")
            }
        }
    },
    watch:{
        '$route':'id'
    },
    data(){
        return{
            warnStyle:[],
            options:[{
                label:"1min",
                value:"60"
            },{
                label:"5min",
                value:"300"
            },{
                label:"10min",
                value:"600"
            },{
                label:"0.5h",
                value:"1800"
            },{
                label:"1h",
                value:"3600"
            },{
                label:"2h",
                value:"7200"
            },{
                label:"3h",
                value:"10800"
            },{
                label:"6h",
                value:"21600"
            },{
                label:"12h",
                value:"43200"
            },{
                label:"24h",
                value:"84600"
            }],
            options1:[{
                label:"TCP",
                value:"TCP"
            },{
                label:"UDP",
                value:"UDP"
            }],
            options2:[{
                label:"常在线",
                value:"常在线"
            },{
                label:"定是唤醒",
                value:"定是唤醒"
            }],
            options3:[],
            value:"",
            value1:"",
            value2:"",
            value3:this.$route.params.sn,
            value4:"",
            value5:"",
            menu:[
                {  name:"设备名称",width:"10%" },
                {  name:"设备ID",width:"10%"  },
                {  name:"服务项",width:"10%"},
                {  name:"服务内容",width:"10%"}
            ],
            rowLength:0,
            name:"",
            id:"",
            editorState:true,
            showTable:'',
            sels:[],
            sels1:[],
            list:[],
            state1:true,
            state2:true,
            state3:true,
            state4:true,
            state5:true,
            state6:true
        }
    }
}
</script>

<style lang="css">
    .L-setIns-table .el-select{
        width: 48%;
        margin-left: 1.8rem;
    }
    .L-setIns-table td div{
        border:0 !important;
    }
    .L-setIns-table td div button{
        padding:0 !important;
    }
</style>
