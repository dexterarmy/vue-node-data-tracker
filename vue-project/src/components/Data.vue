<template>
    <ul>
      <DataItem v-for="item in items" :key="item.id" :item="item"></DataItem>
    </ul>
  </template>
  
  <script setup>
   defineProps({
    items: Object,
  });

  import DataItem from './DataItem.vue';
 
  </script>