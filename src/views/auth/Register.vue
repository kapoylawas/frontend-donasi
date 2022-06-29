<template>
    <div class="pt-20 pb-20">
        <div class="container grid grid-cols-1 p-5 mx-auto sm:w-full md:w-5/12">

            <form @submit.prevent="register">
                <div class="p-5 bg-white rounded-md shadow-md">
                    <div class="text-xl">
                        REGISTER AKUN
                    </div>
                    <div class="mt-3 mb-2 border-2 border-gray-200"></div>


                    <div class="mb-2">
                        <label class="mt-2">Nama Lengkap</label>
                        <input type="text" v-model="user.name"
                            class="w-full p-5 mt-2 placeholder-gray-600 bg-gray-200 border border-gray-200 rounded shadow-sm appearance-none h-7 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600"
                            placeholder="Nama Lengkap">
                    </div>

                    <div class="mb-2">
                        <label class="mt-2">Alamat Email</label>
                        <input type="email" v-model="user.email"
                            class="w-full p-5 mt-2 placeholder-gray-600 bg-gray-200 border border-gray-200 rounded shadow-sm appearance-none h-7 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600"
                            placeholder="Alamat Email">
                    </div>

                    <div class="mb-5 cols-span-1">
                        <label class="mt-2">Password</label>
                        <input type="password" v-model="user.password"
                            class="w-full p-5 mt-2 placeholder-gray-600 bg-gray-200 border border-gray-200 rounded shadow-sm appearance-none h-7 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600"
                            placeholder="Password">
                    </div>

                    <div class="mb-5 cols-span-1">
                        <label class="mt-2">Konfirmasi Password</label>
                        <input type="password" v-model="user.password_confirmation"
                            class="w-full p-5 mt-2 placeholder-gray-600 bg-gray-200 border border-gray-200 rounded shadow-sm appearance-none h-7 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600"
                            placeholder="Konfirmasi Password">
                    </div>

                    <div>
                        <button
                            class="inline-block w-full px-3 py-1 text-xl text-white bg-gray-700 rounded-md shadow-md focus:outline-none focus:bg-gray-900">DAFTAR</button>
                    </div>

                </div>
            </form>

            <div class="mt-5 text-center">
                Sudah punya akun ? <router-link :to="{name: 'login'}" class="text-blue-600 underline">Masuk Disini
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

        name: 'RegisterComponent',

        setup() {

            //user state
            const user = reactive({
                name: '',
                email: '',
                password: '',
                password_confirmation: ''
            })

            //validation state
            const validation = ref([])

            //store vuex
            const store = useStore()

            //route
            const router = useRouter()

            //same interface as this.$toast
            const toast = useToast()

            //function register, fungsi ini di jalankan ketika form di submit
            function register() {

                //define variable 
                let name     = user.name
                let email    = user.email
                let password = user.password
                let password_confirmation = user.password_confirmation

               //panggil actions "register" dari module "auth"
                store.dispatch('auth/register', {
                    name,
                    email,
                    password,
                    password_confirmation
                })
                .then(() => {

                    //redirect ke dashboard
                    router.push({name: 'dashboard'})

                    toast.success("Register Berhasil!")

                }).catch(error => {
                    //show validaation message
                    validation.value = error

                    //show validation name with toast
                    if(validation.value.name) {
                        toast.error(`${validation.value.name[0]}`)
                    }

                    //show validation email with toast
                    if(validation.value.email) {
                        toast.error(`${validation.value.email[0]}`)
                    }

                    //show validation password with toast
                    if(validation.value.password) {
                        toast.error(`${validation.value.password[0]}`)
                    }
                })
            }

            //return a state and function
            return {
                user,           // <-- state user
                validation,     // <-- state validation
                register,       // <-- method register
                toast           // <-- hook toast
            }

        }

    }
</script>

<style>

</style>