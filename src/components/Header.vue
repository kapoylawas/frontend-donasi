<template>
    <div>
        <!-- header -->
        <header>
            <div class="fixed inset-x-0 top-0 z-10 text-center text-white bg-gray-700">
                <div class="container grid grid-cols-10 p-3 mx-auto sm:w-full md:w-5/12">
                <div class="w-10 h-10 col-span-2 p-1 mr-3 bg-white rounded-full shadow-sm">
                    <router-link :to="{name: 'home'}">
                        <img src="@/assets/images/muslim.png" class="inline-block">
                    </router-link>
                </div>
                <div class="col-span-8">
                    <input type="text" @click="linkToSearch" v-model="search" @keyup="searchQuery" class="w-full p-5 placeholder-white bg-gray-500 rounded-full shadow-md appearance-none h-7 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600"
                    placeholder="Cari yang ingin kamu bantu">
                </div>
                </div>
            </div>
        </header>
    </div>
</template>

<script>
  
//hook vue
  import { ref } from 'vue'
  
  //hook vue router
  import { useRouter } from 'vue-router'
  
  //hook vuex
  import { useStore } from 'vuex'
  
  export default {

    name: 'HeaderComponent',

    setup() {

      //router
      const router = useRouter()

      //store
      const store = useStore()

      //state seacrh
      const search = ref(null)

      //queryString
      function searchQuery() {
        store.dispatch('campaign/searchCampaign', search.value)
      }

      //redirect to route search
      function linkToSearch() {
        router.push({
          name: 'search'
        })
      }

      return {
        search,         // <-- state search
        linkToSearch,   // <-- method linkToSearch
        searchQuery     // <-- method searchQuery
      }
    }

  }
</script>

<style>

</style>