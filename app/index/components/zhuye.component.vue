<template>
    <div style="width:100%;height:100%;">
        <head-component></head-component>
    </div>
</template>
<script>
    import headComponent from './allComponents/header.component.vue';
    import { api } from '../js/api/api';
    export default ({
        data () {
            return {

            }
        },
       
        components:{
            headComponent:headComponent
            // leftComponent:kehuguanliComponent       
        }
    })
    // history.go(0);
</script>
