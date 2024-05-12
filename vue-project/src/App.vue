<template>
  <div id="app">

    <div class="relative w-1/2 m-auto mt-20 p-20 border-solid border-black border-2 rounded-lg">
      <div class="absolute top-0 right-0 flex justify-around items-center mt-3">
      <button class="shadow p-2 bg-cyan-300 " @click="toggleSortOrder">Sort</button>
      <input type="text" 
      class="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      placeholder="Filter by Name..."
      v-model="filterText"
      >

    </div>
      <Header/>
      <Data :items="sortedItems" />
      <AddData/>
    </div>
  </div>
</template>

<script setup>
import Data from './components/Data.vue'
import Header from './components/Header.vue'
import AddData from './components/AddData.vue'
import { socket } from './socket';
import { ref, onMounted,computed } from 'vue';

const items = ref([]);
const filterText = ref('');

onMounted(() => {
  socket.on('connect', () => {
    
    console.log('Connected to socket server');
  });

  socket.on('initial', (data) => {
    console.log(data);
    items.value = data; // Parse the received JSON data
  });
});

const sortOrder = ref('asc'); // Default sort order

const toggleSortOrder = () => {
sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
};

const sortedItems = computed(() => {
  console.log([...items.value])
return [...items.value].sort((a, b) => {
  const comparison = a.data - b.data; // Numeric comparison based on ID
  return comparison * (sortOrder.value === 'asc' ? 1 : -1); // Adjust order based on sortOrder
}).filter((data) => {
  if(!filterText.value){
    return data;
  }else if(data.name.toLowerCase().includes(filterText.value.toLowerCase())){
    return data;
    
  }

});
});
</script>