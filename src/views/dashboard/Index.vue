<template>
    <div class="pt-20 pb-20">
        <div class="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-5/12">

            <div class="p-5 mb-5 bg-white rounded-md shadow-md">

                <div class="grid items-center grid-cols-1 gap-4 md:grid-cols-12">
                    <div class="col-span-1 md:col-span-2">
                        <img :src="user.avatar" class="rounded-full w-30 h-30">
                    </div>
                    <div class="col-span-1 md:col-span-6">
                        <div class="text-base font-bold">
                            {{ user.name }}
                        </div>
                        <div class="mt-3">
                            <a href="#"
                                class="px-3 py-1 text-white uppercase bg-gray-700 rounded shadow-md">Edit Profile</a>
                        </div>
                    </div>
                </div>
                <div class="mt-3 mb-2 border-2 border-gray-200"></div>

                <router-link :to="{name: 'donation.index'}">
                    <div class="grid grid-cols-5 gap-4 p-3 mb-3 bg-gray-300 rounded-md shadow-sm">
                        <div class="col-span-5">
                        <i class="fa fa-heart" aria-hidden="true"></i> Donasi Saya
                        </div>
                    </div>
                </router-link>

                <router-link :to="{name: 'profile'}">
                    <div class="grid grid-cols-5 gap-4 p-3 mb-3 bg-gray-300 rounded-md shadow-sm">
                        <div class="col-span-5"> <i class="fa fa-user-circle" aria-hidden="true"></i> Profile Saya
                        </div>
                    </div>
                </router-link>

                <router-link :to="{name: 'profile.password'}">
                    <div class="grid grid-cols-5 gap-4 p-3 mb-3 bg-gray-300 rounded-md shadow-sm">
                        <div class="col-span-5">
                            <i class="fa fa-key" aria-hidden="true"></i> Ubah Password
                        </div>
                    </div>
                </router-link>

                <a @click="logout" style="cursor:pointer">
                    <div class="grid grid-cols-5 gap-4 p-3 mb-3 bg-gray-300 rounded-md shadow-sm">
                        <div class="col-span-5">
                            <i class="fa fa-sign-out-alt" aria-hidden="true"></i> Logout
                        </div>
                    </div>
                </a>

            </div>

        </div>
    </div>
</template>

<script>

    //hook vuex
    import { useStore } from 'vuex'

    //hook vue router
    import { useRouter } from 'vue-router'
    
    //hook vue
    import { computed, onMounted } from 'vue'

    //hook Toast
    import { useToast } from "vue-toastification"

    export default {

        name: 'DashboardComponent',

        setup() {

            //store vuex
            const store = useStore()

            //vue router
            const router = useRouter()

            // Same interface as this.$toast
            const toast = useToast()

            //mounted
            onMounted(() => {
                //panggil action "getUser" dari module "auth" vuex
                store.dispatch('auth/getUser')

            })

            //data user login
            const user = computed(() => {
                return store.state.auth.user
            })

            //method logout
            function logout() {

                //panggil action "logout" di dalam module "auth"
                store.dispatch('auth/logout')
                .then(() => {

                    //jika berhasil, akan di arahkan ke route login
                    router.push({
                        name: 'login'
                    })

                    toast.success("Logout Berhasil!")

                })

            }

            //return a state and function
            return {
                logout,     // <-- method logout
                user,       // <-- state user
            }

        }
    }
</script>

<style>

</style>