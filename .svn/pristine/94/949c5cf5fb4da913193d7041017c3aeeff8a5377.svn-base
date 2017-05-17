<template>
    <el-row>
        <el-col :span="24">
            <el-col :span="4">
                <el-menu :router=true>
                    <el-menu-item v-for="(item,key) in index" :index="item.path" :title="item.listName" align="center">{{item.listName}}</el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="20">
                <router-view></router-view>
            </el-col>
        </el-col>
    </el-row>

</template>
<script>
    export default ({
        data () {
            return {
                index:[
                    {
                        "path":"/New",
                        "listName":"新消息"
                    },
                    {
                        "path":"/History",
                        "listName":"历史消息"
                    }
                ]
            }
        }
    })
</script>

<style lang="css">
</style>
