<template>
  <div id="app">
    <my-header></my-header>
    <my-prompt></my-prompt>
    <router-view/>
  </div>
</template>

<script>
import '@/assets/css/reset.css';
import myHeader from '@/components/myHeader.vue';
import myPrompt from '@/components/myPrompt.vue';

export default {
  name: 'App',
  components:{
    'my-header':myHeader,
    'my-prompt':myPrompt
  }
}
</script>
