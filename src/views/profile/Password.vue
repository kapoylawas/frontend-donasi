<template>
    <div class="pt-20 pb-20">
        <div class="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-5/12">

            <form @submit.prevent="updatePassword" method="POST">

                <div class="p-3 bg-white rounded-md shadow-md">
                    <div class="grid grid-cols-1 gap-4">

                        <div class="mb-2">
                            <label class="mt-2">Password Baru</label>
                            <input type="password"
                                class="w-full p-5 mt-2 placeholder-gray-700 bg-gray-200 rounded shadow-sm appearance-none h-7 focus:outline-none focus:placeholder-gray-600 focus:bg-gray-300 focus-within:text-gray-600"
                                placeholder="Password Baru" v-model="user.password">
                        </div>

                        <div class="mb-2">
                            <label class="mt-2">Konfirmasi Password Baru</label>
                            <input type="password"
                                class="w-full p-5 mt-2 placeholder-gray-700 bg-gray-200 rounded shadow-sm appearance-none h-7 focus:outline-none focus:placeholder-gray-600 focus:bg-gray-300 focus-within:text-gray-600"
                                placeholder="Konfirmasi Password Baru" v-model="user.password_confirmation">
                        </div>

                        <div>
                            <button type="submit" class="w-full p-2 mt-3 text-white bg-gray-700 rounded-md shadow-md focus:outline-none">
                                UPDATE PASSWORD
                            </button>
                        </div>

                    </div>
                </div>

            </form>

        </div>
    </div>
</template>

<script>

    //hook vue
    import { reactive, ref } from 'vue'
    
    //hook vuex
    import { useStore } from 'vuex'

    //hook vue router
    import { useRouter } from 'vue-router'
    
    //hook Toast
    import { useToast } from "vue-toastification"

    export default {

        name: 'PasswordComponent',

        setup() {

            //store vuex
            const store = useStore()

            //route
            const router = useRouter()

            //same interface as this.$toast
            const toast = useToast()

            //state user
            const user = reactive({
                password: '',
                password_confirmation: ''
            })

            //validation state
            const validation = ref([])

            //method update password
            function updatePassword() {

                let password = user.password
                let password_confirmation = user.password_confirmation

                //panggil actions "updatePassword" dari module "profile"
                store.dispatch('profile/updatePassword', {
                    password,
                    password_confirmation
                })
                .then(() => {

                    router.push({name: 'dashboard'})

                    toast.success("Password Berhasil Diupdate!")

                }).catch(error => {
                    //assign validaation message
                    validation.value = error

                    //show validation password with toast
                    if(validation.value.password) {
                        toast.error(`${validation.value.password[0]}`)
                    }
                })

            }

            return {
                user,              // <-- state password
                validation,         // <-- state validation
                updatePassword,     // <-- method updateProfile
            }

        }


    }
</script>

<style>

</style>