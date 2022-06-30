<template>
    <div class="pt-20 pb-20">
        <div class="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-5/12">

            <form @submit.prevent="updateProfile" method="POST" enctype="multipart/form-data">

                <div class="p-5 mb-5 bg-white rounded-md shadow-md">
                    <div class="relative flex flex-col items-center justify-center">
                        <div>
                            <img :src="profile.avatar" class="object-cover rounded-full w-28 h-28">
                        </div>
                        <div class="mt-4">
                            <input type="file" class="w-full p-2 bg-gray-300 rounded shadow-sm">
                        </div>
                    </div>
                </div>

                <div class="p-3 bg-white rounded-md shadow-md">
                    <div class="grid grid-cols-1 gap-4">

                        <div class="mb-2">
                            <label class="mt-2">Nama Lengkap</label>
                            <input type="text"
                                class="w-full p-5 mt-2 placeholder-gray-700 bg-gray-200 rounded shadow-sm appearance-none h-7 focus:outline-none focus:placeholder-gray-600 focus:bg-gray-300 focus-within:text-gray-600"
                                placeholder="Nama Lengkap" v-model="profile.name">
                        </div>

                        <div class="mb-2">
                            <label class="mt-2">Alamat Email</label>
                            <input type="email"
                                class="w-full p-5 mt-2 placeholder-gray-600 bg-gray-200 rounded shadow-sm appearance-none opacity-70 h-7 focus:outline-none focus:placeholder-gray-600 focus:bg-gray-300 focus-within:text-gray-600"
                            v-model="profile.email" placeholder="Alamat Email" disabled>
                        </div>

                        <div>
                            <button type="submit" class="w-full p-2 mt-3 text-white bg-gray-700 rounded-md shadow-md focus:outline-none">
                                UPDATE PROFILE
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
    import { computed, onMounted, ref } from 'vue'
    
    //hook vuex
    import { useStore } from 'vuex'

    //hook vue router
    import { useRouter } from 'vue-router'
    
    //hook Toast
    import { useToast } from "vue-toastification"

    export default {

        name: 'ProfileComponent',

        setup() {

            //store vuex
            const store = useStore()

            //route
            const router = useRouter()

            //same interface as this.$toast
            const toast = useToast()

            //onMounted akan menjalankan action getProfile di module profile
            onMounted(() => {
                store.dispatch('profile/getProfile')
            })

            //profile
            const profile = computed(() => {
                return store.state.profile.profile      
            })

            //state for image avatar
            const imageAvatar = ref(null)

            //validation state
            const validation = ref([])

            //get file avatar onChange
            function onFileChange(e){
                
                //get image
                imageAvatar.value = e.target.files[0]

                //check fileType
                if (!imageAvatar.value.type.match('image.*')) {

                    //if fileType not allowed, then clear value and set null
                    e.target.value = ''
                    imageAvatar.value = null

                    //show toastr error
                    toast.error("Extensi File Tidak Diizinkan!")

                }

            }

            //method update profile
            function updateProfile() {

                //formdata
                let formData = new FormData();

                formData.append('avatar', imageAvatar.value)
                formData.append('name', profile.value.name)

                //panggil actions "updateProfile" dari module "profile"
                store.dispatch('profile/updateProfile', formData)
                .then(() => {

                    router.push({name: 'dashboard'})

                    toast.success("Profile Berhasil Diupdate!")

                    //set imageAvatar to null
                    imageAvatar.value = null

                }).catch(error => {
                    //assign validaation message
                    validation.value = error

                    //show validation name with toast
                    if(validation.value.name) {
                        toast.error(`${validation.value.name[0]}`)
                    }
                })

            }

            return {
                profile,            // <-- state profile
                toast,              // <-- hook Toast
                validation,         // <-- state validation
                onFileChange,       // <-- method onFileChange
                updateProfile,      // <-- method updateProfile
            }

        }


    }
</script>

<style>

</style>

<style>

</style>