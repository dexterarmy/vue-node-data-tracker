<template>
    <li class="shadow m-5 bg-white">
      <div class="flex justify-between ">
        <div class="m-5 p-3 bg-gray-200">
        {{ item.name }}
        </div>
         <div class="m-5 p-3 bg-gray-200">
        {{ item.data }}
        </div>
      </div>
      
      <div class="button-container">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-4
        " @click="deleteItem(item.id)">Delete</button>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-4"
        @click="toggleEditing(item)"> {{ editingItemId === item.id ? 'Close' : 'Edit' }}</button>
      </div>

      <form id="form" v-if="editingItemId === item.id">
        <div class="form-control">
          <label class="font-bold" for="text">Text</label>
          <input type="text"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          id="text" 
          placeholder="Enter text..." 
          v-model="editingItem.name" />
        </div>
        <div class="form-control">
          <label class="font-bold" for="amount"
            >Data <br />
            </label
          >
          <input
            type="text"
            id="amount"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter amount..."
            v-model="editingItem.data"
          />
        </div>
        <div class="text-center ">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-4 " @click="editData(editingItem)" type="button">Edit Data</button>
        </div>
      </form>
  </li>
</template>
  
<script setup>
  import { socket } from '@/socket';
  import { ref } from 'vue';
  import { useToast } from 'vue-toastification';

  const toast = useToast();
  let editingItemId = ref(null); 
  let editingItem = ref(null);

  const toggleEditing = (item) => {

  editingItemId.value = editingItemId.value === item.id ? null : item.id;
  editingItem.value = { ...item };

};

  const deleteItem = (id) => {

    socket.emit('delete-item', id);

  }

  const editData = (item) => {

    if(!item.name || !item.data){
      toast.error("Please fill the complete form !");
      return;
    }
       
    if(isNaN(item.data)){
      toast.error("Data should be a number !");
      return;

    }

      socket.emit('update-item', item);
      editingItemId.value = null;
  }

  defineProps({
    item: Object,
  });
  </script>