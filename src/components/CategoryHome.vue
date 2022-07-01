<template>
    <div>
        <div v-if="categories.length > 0">
            <div class="grid items-center grid-cols-4 gap-4 mt-5 text-center md:gap-4">
                <div v-for="category in categories" :key="category.id" class="col-span-2 p-4 text-xs text-center bg-white rounded-md shadow-md md:col-span-2 lg:col-span-1">
                    <a href="#">
                        <div>
                            <img :src="category.image" width="40" class="inline-block mb-2">
                        </div>
                        {{ category.name.toUpperCase() }}
                    </a>
                </div>
                <div class="col-span-2 p-4 text-xs text-center bg-white rounded-md shadow-md md:col-span-1 lg:col-span-1">
                    <a href="#">
                        <div>
                            <img src="@/assets/images/menu.png" width="40" class="inline-block mb-2">
                        </div>
                        LAINNYA
                    </a>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="grid items-center grid-cols-4 gap-4 mt-5 text-center md:gap-4">
                <div v-for="index in 4" :key="index" class="text-xs text-center bg-white rounded-md shadow-md sm:col-span-2 md:col-span-2 lg:col-span-2">
                    <ContentLoader />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    //hook vue
    import { computed, onMounted  } from 'vue'
    
    //vuex
    import { useStore } from 'vuex'
    
    //vue content loader
    import { ContentLoader } from 'vue-content-loader'

    export default {

        name: 'CategoryHomeComponent',

        components: {
            ContentLoader   // <-- register content loader
        },

        setup() {

            //store vuex
            const store = useStore()

            //onMounted akan menjalankan action "getCategoryHome" di module "category"
            onMounted(() => {
                store.dispatch('category/getCategoryHome')
            })

            //digunakan untuk get data state "categories" di module "category" 
            const categories = computed(() => {
                return store.state.category.categories
            })

            return {
                categories  // <-- categories
            }

        }

    }
</script>


<style>

</style>