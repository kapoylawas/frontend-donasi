<template>
    <div class="pt-20 pb-20">
        <div class="container grid grid-cols-1 p-5 mx-auto sm:w-full md:w-5/12">

            <div v-if="categories.length > 0">
            <div class="grid items-center grid-cols-4 gap-4 text-center md:gap-4">
                <div v-for="category in categories" :key="category.id" class="col-span-2 p-4 text-xs text-center bg-white rounded-md shadow-md md:col-span-2 lg:col-span-2">
                    <router-link :to="{name: 'category.show', params:{slug: category.slug}}">
                        <div>
                            <img :src="category.image" width="40" class="inline-block mb-2">
                        </div>
                        {{ category.name.toUpperCase() }}
                    </router-link>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="grid items-center grid-cols-4 gap-4 mt-5 text-center md:gap-4">
                <div v-for="index in 4" :key="index" class="text-xs text-center bg-white rounded-md shadow-md sm:col-span-2 md:col-span-1 lg:col-span-1">
                    <ContentLoader />
                </div>
            </div>
        </div>

        </div>
    </div>
</template>

<script>
    //hook vue
    import { onMounted, computed } from 'vue'
    
    //hook vuex
    import { useStore } from 'vuex'

    //content loader
    import { ContentLoader } from 'vue-content-loader'

    export default {
        name: 'CategoryIndexComponent',

        components: {
            ContentLoader // <-- register content loader
        },
        setup() {

            //store vuex
            const store = useStore()

            //onMounted akan menjalankan action "getCategory" di module "category"
            onMounted(() => {
                store.dispatch('category/getCategory')
            })

            //digunakan untuk get data state "categories" di module "category" 
            const categories = computed(() => {
                return store.state.category.categories
            })

            return {
                categories      // <-- state categories
            }
        }
    }
</script>

<style>

</style>