<template>
    <div style="width:100%;height:100%;">
    <transition name="fade">
        <router-view></router-view>
       </transition>
    </div>
</template>
<style>
    html {
        font-size: 12px;
        min-width: 1200px;
    }
    html,
    body {
        width: 100%;
        height:100%;
        overflow: hidden;
    }
    .fade-enter-active, .fade-leave-active {
    transition: opacity 1.5s
    }
    .fade-enter, .fade-leave-active {
    opacity: 0
    }
</style>
