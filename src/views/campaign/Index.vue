<template>
  <div class="pt-20 pb-20">
        <div class="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-5/12">

            <div v-if="campaigns.length > 0">
                <div class="grid grid-cols-4 gap-4 mt-5" v-for="campaign in campaigns" :key="campaign.id">
                    <div class="col-span-4">
                        <div class="p-2 bg-white rounded-md shadow-md">
                            <div class="md:flex rounded-xl md:p-0">
                                <img class="object-cover w-full rounded h-34 md:w-56"
                                    :src="campaign.image" width="384" height="512">
                                <div class="w-full p-5 pt-6 space-y-4 text-center md:p-3 md:text-left">
                                    <router-link :to="{name: 'campaign.show', params:{slug: campaign.slug }}">
                                        <p class="text-sm font-semibold">
                                            {{ campaign.title }}
                                        </p>
                                    </router-link>
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

                <div v-for="index in 2" :key="index" class="grid grid-cols-1 p-3 mt-4 mb-4 text-sm bg-white rounded shadow-md">
                    <FacebookLoader class="h-24"/>
                </div>

            </div>

        </div>

        <div class="mt-4 mb-4 text-center" v-show="nextExists">
            <a @click="loadMore"
                class="p-2 px-3 text-white bg-gray-700 rounded-md shadow-md cursor-pointer focus:outline-none focus:bg-gray-900">LIHAT
                SEMUA <i class="fa fa-long-arrow-alt-right"></i></a>
        </div>

  </div>
</template>

<script>

    //hook vue
    import { computed, onMounted } from 'vue'

    //vuex
    import { useStore } from 'vuex'

    //vue content loader
    import { FacebookLoader } from 'vue-content-loader'

    export default {

        name: 'CampaignIndexComponent',

        components: {
            FacebookLoader  // <-- register component FacebooLoader dari Vue Content Loader
        },

        setup() {

            //store vuex
            const store = useStore()

            //onMounted akan menjalankan action "getCampaign" di module "campaign"
            onMounted(() => {
                store.dispatch('campaign/getCampaign')
            })

            //digunakan untuk get data  state "campaigns" di module "campaign" 
            const campaigns = computed(() => {
                return store.state.campaign.campaigns
            })

            //get status NextExists
            const nextExists = computed(() => {
                return store.state.campaign.nextExists
            })

            //get nextPage
            const nextPage = computed(() => {
                return store.state.campaign.nextPage
            })

            //loadMore function
            function loadMore() {
                store.dispatch('campaign/getLoadMore', nextPage.value)
            }    

            return {
                campaigns,      // <-- return campaigns
                nextExists,     // <-- return nextExists,
                nextPage,       // <-- return nextPage
                loadMore,        // <-- return loadMore
            }

        }

    }
</script>

<style>

</style>