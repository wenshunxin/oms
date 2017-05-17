<template>
  <el-table :data="tableValue" stripe style="width: 100%" id="tableClass" class="tableClass" @selection-change="handleSelectionChange"  border row-key="id" @cell-mouse-leave="handleOut" @cell-mouse-enter="handelHover" @row-click="handleIn"  @select="handleSelect" >

   <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column prop="key" label="序号" width="50"> </el-table-column>
    <el-table-column   label="操作" width="200"  align='left'>
        <template scope="scope">
            <el-button class="w-button" size="small" @click="handleEdit(scope.$index, scope.row)"><img src="" title="修改"></el-button>
            <el-button class="w-button" size="small" @click="handleDel(scope.$index, scope.row)"><img src="" title="删除"></el-button>
            <el-button class="w-button" size="small" @click="handleReset(scope.$index, scope.row)"><img src="" title="重置密码"></el-button>
            <el-button v-show="show" class="w-button" size="small" @click="handleForbidden(scope.$index, scope.row)"><img src="" title="1"></el-button>
            <el-button v-show="!show" class="w-button w-button1" size="small" @click="handleForbidden(scope.$index, scope.row)"><img src="" title="2"></el-button>
        </template>
    </el-table-column>
    <el-table-column  prop="date" label=" 'tableValue.name'" width="180"></el-table-column>
    <el-table-column prop="name"  label="商品名"  width="180"></el-table-column>
    <el-table-column prop="name"  label="通用名"></el-table-column>
    <el-table-column prop="name"  label="规格"></el-table-column>
    <el-table-column prop="name"  label="商品药剂"></el-table-column>
    <el-table-column prop="name"  label="品牌名"></el-table-column>
    <el-table-column prop="name"  label="生产厂商"></el-table-column>
    <!--<el-table-column
        v-for='(item, key) in tableData'
        :key='key'
        :prop='item.date'
        :label='item.name'
      >
      </el-table-column>-->
  </el-table>
</template>
<script>
import $ from "jquery";
  export default {
    data() {
      return {
        show:false,
        key:"置顶",
        currentPage:1, 
        tableValue:[],
        cols:{
            name: '王小虎',
            name: '王小虎',
            name: '王小虎',
            name: '王小虎',
            name: '王小虎'
        },  
        tableData: [{  
          id:1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
        id:2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
            id:3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
            id:4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    created:function(){
        this.tableValue=this.tableData;
         for(var key in this.tableValue){
            this.tableValue[key].key = ((this.currentPage - 1) * 15) + (key * 1 + 1);
        }
    },
    methods:{
        handelHover:function(row, column,cell){
            this.show = true;
            console.log(column)
            console.log($(column.id))
           // row.key="置顶+++++++++++"
            sessionStorage.setItem("key",row.key);
        },
        handleOut:function(row, column,cell){
            this.show = false;
        },
        handleSelect:function(selection, row){
            event.target.checked? row.key="置顶" : row.key=sessionStorage.getItem("key");

        },
         show(row) {
            // console.log(row);
        },
        handleIn:function(row, column){
            // console.log(column)
            
        },
        handleSelectionChange:function(selection){
            console.log(selection);
            this.show=true;
        }
    }
  }

//   function handelhover(){
//       alert("1")
//     var length =  $("#tableClass tr");
//     length.each(function(i,item){
        
//     })
//   }
</script>
<style>
    .tableClass .cell{
        padding:0 !important;
    }
    .tableClass th{
        border-right:0 !important;
        background:#f6f6f6 !important;
    }
    .tableClass th .cell{
        background:#f6f6f6 !important;
    }

     /*.el-table--enable-row-hover tr:hover>td{
        background-color:#e0f1ff !important;
    }*/
    .tableClass .el-table--border td, .el-table--border th{
        border-right:1px solid #f6f6f6 !important;
    }
    .tableClass .el-table td, .el-table th.is-leaf{
        border-bottom:1px solid #f6f6f6 !important;
    }
</style>