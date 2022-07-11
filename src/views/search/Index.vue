<template>
    <div class="pt-20 pb-20">
        <div class="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-5/12">

            <div v-if="campaigns.length > 0">

                <div class="grid grid-cols-4 gap-4 mt-5" v-for="campaign in campaigns" :key="campaign.id">
                    <div class="col-span-4">
                        <div class="p-2 bg-white rounded-md shadow-md">
                            <div class="md:flex rounded-xl md:p-0">
                                <img class="object-cover w-full rounded h-34 md:w-56" :src="campaign.image" width="384"
                                    height="512">
                                <div class="p-5 pt-6 space-y-4 text-center md:p-3 md:text-left">
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
                                                        <div :style="{width: percentage(donation.total, campaign.target_donation) + '%'}"
                                                            class="flex flex-col justify-center text-center text-white bg-blue-500 shadow-none whitespace-nowrap">
                                                        </div>
                                                    </div>
                                                </div>

                                                <p class="text-xs text-gray-500">
                                                    <span class="font-bold text-blue-400">Rp.
                                                        {{ formatPrice(donation.total) }} </span> terkumpul dari
                                                    <span class="font-bold">Rp.
                                                        {{ formatPrice(campaign.target_donation) }}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div v-else>

                                            <div class="relative pt-1">
                                                <div class="flex h-2 mb-4 overflow-hidden text-xs bg-blue-200 rounded">
                                                    <div :style="{width: percentage(0, campaign.target_donation) + '%'}"
                                                        class="flex flex-col justify-center text-center text-white bg-blue-500 shadow-none whitespace-nowrap">
                                                    </div>
                                                </div>
                                            </div>

                                            <p class="text-xs text-gray-500">
                                                <span class="font-bold text-blue-400">Rp. 0 </span> terkumpul dari
                                                <span class="font-bold">Rp.
                                                    {{ formatPrice(campaign.target_donation) }}</span>
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
                    Data Campaign Tidak Ditemukan!
                </div>
            </div>

        </div>
    </div>
</template>


<script>
    //hook vue
    import { computed } from 'vue'

    //hook vuex
    import { useStore } from 'vuex'

    export default{
        name: 'SearchComponent',

        setup() {

            //vuex
            const store = useStore()

            //digunakan untuk get data  state "campaigns" di module "campaign" 
            const campaigns = computed(() => {
                return store.state.campaign.campaigns
            })

            return {
                campaigns,      // <-- state campaigns
            }

        }
    }
</script>

<style>

</style>