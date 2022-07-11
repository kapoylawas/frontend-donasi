<template>
    <div class="pt-20 pb-20">
        <div class="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-5/12">

            <div class="p-5 bg-white rounded-md shadow-md">
                <div class="text-xl">
                    MASUKKAN NOMINAL DONASI
                </div>
                <div class="mt-3 mb-2 border-2 border-gray-200"></div>

                <div class="mb-2">
                    <label class="mt-2 text-lg font-bold">Rp.</label>
                    <input type="number"
                        class="w-full p-2 mt-2 text-xl text-right placeholder-gray-600 bg-gray-200 border border-gray-200 rounded shadow-sm appearance-none h-15 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600"
                        placeholder="0" v-model="donation.amount">
                </div>

                <div class="mb-2">
                    <label class="mt-2 text-lg font-bold">Do'a</label>
                    <textarea rows="3" v-model="donation.pray"
                        class="w-full p-5 mt-2 placeholder-gray-600 bg-gray-200 border border-gray-200 rounded shadow-sm appearance-none focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600" placeholder="Tulis Do'a/Ucapan">
                    </textarea>
                </div>

                <button @click="storeDonation" class="w-full py-2 mt-4 text-base font-bold uppercase bg-yellow-500 rounded-md shadow-md focus:outline-none focus:bg-yellow-600">LANJUT PEMBAYARAN</button>

            </div>

        </div>
    </div>
</template>

<script>

    //hook vue
    import { reactive } from 'vue'
    
    //hook vuex
    import { useStore } from 'vuex'
    
    //hook vue router
    import { useRoute, useRouter } from 'vue-router'
    
    //hook Toast
    import { useToast } from "vue-toastification"

    export default {

        name: 'DonationCreateComponent',

        setup() {

            //store vuex
            const store = useStore()

            //route
            const route = useRoute()

            //router
            const router = useRouter()

            //toast
            const toast = useToast()

            //state donation
            const donation = reactive({
                amount: 0,                      // <-- data nilai donasi
                pray: '',                       // <-- data kata-kata/doa
                campaignSlug: route.params.slug // <-- data "slug" dari campaign
            })

            //method store donation
            function storeDonation() {

                //check minimal donasi
                if(donation.amount < 10000) {
                    toast.error('Donasi Minimal Rp. 10.000')
                    return false
                }

                store.dispatch('donation/storeDonation', donation)
                .then(() => {

                    toast.success('Transaksi Berhasil Dibuat!')

                    //redirect ke dashboard
                    router.push({name: 'donation.index'})

                })
                .catch(error => {
                    console.log(error)
                })
            }

            return {
                donation,       // <-- state donation
                storeDonation   // <-- method storeDonation
            }

        }

    }
</script>

<style>

</style>