<template>
    <el-row type="flex"  class="yMain">

            <el-col :span="4">
                <el-menu :router=true>
                    <el-menu-item v-for="(item,key) in index" :index="item.path" :title="item.listName">{{item.listName}}</el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="20" >
                <router-view></router-view>
            </el-col>

    </el-row>

</template>
<script>
    export default ({
        data () {
            return {
                index:[
                    {
                        "path":"/yonghuguanli",
                        "listName":"人员管理"
                    },
                    {
                        "path":"/jueseguanli",
                        "listName":"角色管理"
                    },
                    {
                        "path":"/xitongrizhi",
                        "listName":"系统日志"
                    },
                    {
                        "path":"/caidanguanli",
                        "listName":"菜单管理"
                    }
                ]
            }
        }
    })
</script>
<style>
    
</style>
