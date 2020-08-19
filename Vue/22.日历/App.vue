<template>
    <div id="app">
        <data-picker :date = "date" @choose-date="chooseDate"
        ></data-picker>
        <!-- <data-picker v-model="date"
        ></data-picker> -->
    </div>
</template>

<script>
import DataPicker from "./DataPicker";
export default {
    components :{
        DataPicker,
    },
    data(){
        return {
            date : new Date()
        }
    },
    methods :{
        chooseDate(date){
            this.date = new Date(date);
        },
    }
}
</script>

<style scoped>
</style>