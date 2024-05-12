<template>
  <h2 class="text-center text-2xl">Add new transaction</h2>
  <form id="form">
    <div class="form-control">
      <label class="font-bold" for="text">Text</label>
      <input type="text"
       class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
       id="text" 
       placeholder="Enter text..." 
       v-model="name" />
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
        v-model="data"
      />
    </div>
    <div class="text-center ">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-4 " @click.prevent="onSubmit" type="button">Add Data</button>
    </div>
  </form>
</template>
<script setup>
import { ref } from 'vue';
import { socket } from '@/socket';
import { useToast } from 'vue-toastification';

const toast = useToast();

const name = ref('');
const data = ref('');

const onSubmit = () => {

  if(!name.value || !data.value){
    toast.error("Please fill the complete form!");
    return;
  }
  if(isNaN(data.value)){
      toast.error("Data should be a number !");
      return;

    }

  const item = {
    name: name.value,
    data: parseFloat(data.value),
  };
  console.log(item);
  socket.emit('add-item', item);

  // Clear form fields
  text.value = '';
  amount.value = '';
};
</script>