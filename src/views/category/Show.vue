<template>
    <div class="pt-20 pb-20">
        <div class="container grid grid-cols-1 p-5 mx-auto sm:w-full md:w-5/12">

            <div v-if="campaignCategory.length > 0">

                <h3> <i class="fa fa-list-ul"></i> KATEGORI <strong>{{ category.name.toUpperCase() }}</strong></h3>

                <div class="grid grid-cols-4 gap-4 mt-5" v-for="campaign in campaignCategory" :key="campaign.id">
                    <div class="col-span-4">
                        <div class="p-2 bg-white rounded-md shadow-md">
                            <div class="md:flex rounded-xl md:p-0">
                                <img class="object-cover w-full rounded h-34 md:w-56"
                                    :src="campaign.image" width="384" height="512">
                                <div class="p-5 pt-6 space-y-4 text-center md:p-3 md:text-left">
                                    <a href="#">
                                        <p class="text-sm font-semibold">
                                            {{ campaign.title }}
                                        </p>
                                    </a>
                                    <div class="font-medium">
                                        <div class="mt-3 text-xs text-gray-500">
                                            {{ campaign.user.name }}
                                        </div>
                                        <div v-if="campaign.sum_donation.length > 0">
                                            <div v-for="donation in campaign.sum_donation" :key="donation">

                                                <div class="relative pt-1">
                                                    <div class="flex h-2 mb-4 overflow-hidden text-xs bg-blue-200 rounded">
                                                        <div :style="{width: percentage(donation.total, campaign.target_donation) + '%'}" class="flex flex-col justify-center text-center text-white bg-blue-500 shadow-none whitespace-nowrap"></div>
                                                    </div>
                                                </div>

                                                <p class="text-xs text-gray-500">
                                                    <span class="font-bold text-blue-400">Rp. {{ formatPrice(donation.total) }} </span> terkumpul dari
                                                    <span class="font-bold">Rp. {{ formatPrice(campaign.target_donation) }}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div v-else>

                                            <div class="relative pt-1">
                                                <div class="flex h-2 mb-4 overflow-hidden text-xs bg-blue-200 rounded">
                                                    <div :style="{width: percentage(0, campaign.target_donation) + '%'}" class="flex flex-col justify-center text-center text-white bg-blue-500 shadow-none whitespace-nowrap"></div>
                                                </div>
                                            </div>

                                            <p class="text-xs text-gray-500">
                                                <span class="font-bold text-blue-400">Rp. 0 </span> terkumpul dari
                                                <span class="font-bold">Rp. {{ formatPrice(campaign.target_donation) }}</span>
                                            </p>
                                        </div>
                                        <div class="mt-3 text-xs">
                                            <strong>{{ countDay(campaign.max_date) }}</strong> hari lagi
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>

                <div class="p-4 mb-3 text-white bg-red-500 rounded-md">
                    Data Campaign Berdasarkan Kategori <strong>{{ category.name }}</strong> Belum Tersedia!
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

    //hook vue router
    import { useRoute } from 'vue-router'

    export default {

        name: 'CategoryShowComponent',

        setup() {

            //store vuex
            const store = useStore()

            //const route
            const route = useRoute()

            //onMounted akan menjalankan action "getDetailCategory" di module "category"
            onMounted(() => {
                store.dispatch('category/getDetailCategory', route.params.slug)
            })

            //digunakan untuk get data state "category" di module "category" 
            const category = computed(() => {
                return store.state.category.category
            })

            //digunakan untuk get data campaign di satate "campaignCategory" di module "category" 
            const campaignCategory = computed(() => {
                return store.state.category.campaignCategory
            })

            return {
                category,           // <-- state category
                campaignCategory    // <-- state campaignCategory   
            }
        }

    }
</script>

<style>

</style>