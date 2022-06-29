<template>
    <div class="pt-20 pb-20">
        <div class="container grid grid-cols-1 p-5 mx-auto sm:w-full md:w-5/12">
            <form @submit.prevent="login">
                <div class="p-5 bg-white rounded-md shadow-md">
                    <div class="text-xl">
                        MASUK AKUN
                    </div>
                    <div class="mt-3 mb-2 border-2 border-gray-200"></div>

                    <div class="mb-5">
                        <label class="mt-2">Alamat Email</label>
                        <input type="email" v-model="user.email"
                            class="w-full p-5 mt-2 placeholder-gray-600 bg-gray-200 border border-gray-200 rounded shadow-sm appearance-none h-7 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600"
                            placeholder="Alamat Email">
                    </div>

                    <div class="mb-5">
                        <label class="mt-2">Password</label>
                        <input type="password" v-model="user.password"
                            class="w-full p-5 mt-2 placeholder-gray-600 bg-gray-200 border border-gray-200 rounded shadow-sm appearance-none h-7 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600"
                            placeholder="Password">
                    </div>

                    <div>
                        <button
                            class="inline-block w-full px-3 py-1 text-xl text-white bg-gray-700 rounded-md shadow-md focus:outline-none focus:bg-gray-900">MASUK</button>
                    </div>

                </div>
            </form>
            <div class="mt-5 text-center">
                Belum punya akun ? <router-link :to="{name: 'register'}" class="text-blue-600 underline">Daftar Sekarang
                    !</router-link>
            </div>

        </div>
    </div>
</template>

<script>

    //hook vue
    import { ref, reactive } from 'vue'
    
    //hook vuex
    import { useStore } from 'vuex'
    
    //hook vue router
    import { useRouter } from 'vue-router'
    
    //hook Toast
    import { useToast } from "vue-toastification"

    export default {

        name: 'LoginComponent',

        setup() {

            //user state
            const user = reactive({
                email: '',
                password: ''
            })

            //validation state
            const validation = ref([])

            //store vuex
            const store = useStore()

            //route
            const router = useRouter()

            // Same interface as this.$toast
            const toast = useToast()

            //method login
            function login() {

                //define variable 
                let email    = user.email
                let password = user.password            
               
               //panggil actions "login" dari module "auth" Vuex
                store.dispatch('auth/login', {
                    email,
                    password
                })
                .then(() => {

                    //redirect ke dashboard
                    router.push({name: 'dashboard'})

                    toast.success("Login Berhasil!")

                }).catch(error => {
                    //assign validaation message
                    validation.value = error

                    //show validation email with toast
                    if(validation.value.email) {
                        toast.error(`${validation.value.email[0]}`)
                    }

                    //show validation password with toast
                    if(validation.value.password) {
                        toast.error(`${validation.value.password[0]}`)
                    }

                    //show login failed
                    if(validation.value.message) {
                        toast.error(`${validation.value.message}`)
                    }
                })
            }

            //return object
            return {
                user,           // <-- state user
                validation,     // <-- state validation
                login,          // <-- method login
            }

        }

    }
</script>

<style>

</style>