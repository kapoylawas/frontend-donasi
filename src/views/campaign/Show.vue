<template>
    <div class="pt-20 pb-20">
        <div class="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-5/12">

            <div class="p-3 bg-white rounded-md shadow-md">
                <img class="w-full rounded-md" :src="campaign.image">

                <div class="mt-5">
                    <p class="text-lg font-semibold">
                        {{ campaign.title }}
                    </p>
                </div>

                <div v-if="sumDonation.length > 0">
                    <div v-for="donation in sumDonation" :key="donation">

                        <p class="mt-4 text-base text-gray-500">
                            <span class="font-bold text-blue-400">Rp. {{ formatPrice(donation.total) }} </span>
                            terkumpul dari
                            <span class="font-bold">Rp. {{ formatPrice(campaign.target_donation) }}</span>
                        </p>

                        <div class="relative pt-1 mt-2">
                            <div class="flex h-2 mb-4 overflow-hidden text-base bg-blue-200 rounded">
                                <div :style="{width: percentage(donation.total, campaign.target_donation) + '%'}"
                                    class="flex flex-col justify-center text-center text-white bg-blue-500 shadow-none whitespace-nowrap">
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div v-else>

                    <p class="mt-4 text-base text-gray-500">
                        <span class="font-bold text-blue-400">Rp. 0 </span> terkumpul dari
                        <span class="font-bold">Rp. {{ formatPrice(campaign.target_donation) }}</span>
                    </p>

                    <div class="relative pt-1 mt-2">
                        <div class="flex h-2 mb-4 overflow-hidden text-xs bg-blue-200 rounded">
                            <div :style="{width: percentage(0, campaign.target_donation) + '%'}"
                                class="flex flex-col justify-center text-center text-white bg-blue-500 shadow-none whitespace-nowrap">
                            </div>
                        </div>
                    </div>

                </div>

                <div class="mt-3">
                    <span class="font-bold">{{ donations.length }}</span> Donasi
                    <span class="float-right"> <strong>{{ countDay(campaign.max_date) }}</strong> hari lagi</span>
                </div>

                <div v-if="maxDate(campaign.max_date) == true">
                    <div class="mt-5">
                        <button
                            class="w-full py-3 text-xl font-bold uppercase bg-yellow-500 rounded-md shadow-md opacity-50 cursor-not-allowed focus:outline-none">Donasi Ditutup!</button>
                    </div>
                </div>
                <div v-else>
                    <div class="mt-5">
                        
                        <router-link :to="{name: 'donation.create', params:{slug: route.params.slug }}">
                            <button
                                class="w-full py-3 text-xl font-bold uppercase bg-yellow-500 rounded-md shadow-md focus:outline-none focus:bg-yellow-600">Donasi
                                Sekarang!</button>
                       </router-link>

                    </div>
                </div>

            </div>

        </div>

        <div class="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-5/12">

            <div class="p-3 bg-white rounded-md shadow-md">
                <div class="text-lg font-semibold">
                    Penggalang Dana
                </div>
                <div class="mt-3 mb-2 border-2 border-gray-200"></div>

                <div class="p-3 mb-3 bg-gray-200 rounded shadow-md">

                    <div class="grid grid-cols-10 gap-4">
                        <div class="col-span-2">
                            <img :src="user.avatar" class="rounded-full shadow w-15 h-15">
                        </div>
                        <div class="col-span-8 mt-6 text-lg font-bold">
                            {{ user.name }}
                        </div>
                    </div>
                </div>

            </div>

        </div>

        <div class="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-5/12">

            <div class="p-3 bg-white rounded-md shadow-md">
                <div class="text-lg font-semibold">
                    Cerita
                </div>
                <div class="mt-3 mb-2 border-2 border-gray-200"></div>
                <div v-html="campaign.description"></div>
            </div>

        </div>

        <div class="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-5/12">

            <div class="p-3 bg-white rounded-md shadow-md">
                <div class="text-lg font-semibold">
                    Donasi ({{ donations.length }})
                </div>
                <div class="mt-3 mb-2 border-2 border-gray-200"></div>

                <div v-for="donation in donations" :key="donation.id" class="p-3 mb-3 bg-gray-200 rounded shadow-md">

                    <div class="grid grid-cols-10 gap-4">

                        <div class="col-span-1">
                            <img :src="donation.donatur.avatar" class="rounded-full w-15 h-15">
                        </div>
                        <div class="col-span-9 mt-1">
                            <div class="text-base font-bold">
                                {{ donation.donatur.name }}
                            </div>
                            <div class="mt-2 text-sm text-gray-500">
                                Berdonasi sebesar <span class="font-bold">Rp. {{ formatPrice(donation.amount) }}</span>
                            </div>
                        </div>

                    </div>

                    <div class="grid grid-cols-1 gap-4 mt-3">
                        <div class="text-sm text-gray-600">
                            {{ donation.pray }}
                        </div>
                        <div class="text-sm italic text-right text-gray-500">
                            {{ donation.created_at }}
                        </div>
                    </div>

                </div>

            </div>

        </div>

    </div>
</template>

<script>

    //hook vue
    import { computed, onMounted } from 'vue' // computed dan onMounted
    
    //hook vuex
    import { useStore } from 'vuex' 

    //hook vue router
    import { useRoute } from 'vue-router'

    export default {
        name: 'CampaignShowComponent',

        setup() {

            //vue route
            const route = useRoute()

            //store vuex
            const store = useStore()

            //onMounted akan menjalankan action "getDetailCampaign" di module "campaign"
            onMounted(() => {
                store.dispatch('campaign/getDetailCampaign', route.params.slug)
            })

            //digunakan untuk mendapatkan data detail campaign dari state "campaign" di module "campaign" Vuex
            const campaign = computed(() => {
                return store.state.campaign.campaign
            })

            //digunakan untuk mendapatkan data detail user dari state "user" di module "campaign" Vuex
            const user = computed(() => {
                return store.state.campaign.user
            })

            //digunakan untuk mendapatkan data jumlah donasi state "sumDonation" di module "campaign" Vuex
            const sumDonation = computed(() => {
                return store.state.campaign.sumDonation
            })

            //digunakan untuk mendapatkan data donation dari state "donations" di module "campaign" Vuex
            const donations = computed(() => {
                return store.state.campaign.donations
            })

            return {
                campaign,       // <-- campaign 
                user,           // <-- user
                sumDonation,    // <-- sumDonation
                donations,      // <-- donations
                route,
            }
        }

    }
</script>

<style>

</style>