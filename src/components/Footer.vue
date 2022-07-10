<template>
  <div>

        <div class="fixed inset-x-0 bottom-0 z-10 text-center bg-white">
            <div class="container grid grid-cols-4 gap-4 p-2 mx-auto sm:w-full md:w-5/12">

                <div>
                    <router-link :to="{name: 'home'}"
                    class="justify-center inline-block w-full text-center focus:text-teal-500 hover:text-teal-500">
                        <img class="inline-block mb-1" width="25" height="25"
                            src="@/assets/images/home.png">
                        <span class="block text-xs">Beranda</span>
                    </router-link>
                </div>

                <div>
                    <router-link :to="{name: 'donation.index'}"
                        class="justify-center inline-block w-full text-center focus:text-teal-500 hover:text-teal-500">
                        <img width="25" height="25" class="inline-block mb-1"
                            src="@/assets/images/heart.png">
                        <span class="block text-xs">Donasi Saya</span>
                    </router-link>
                </div>

                <div>
                     <router-link :to="{name: 'campaign.index'}"
                        class="justify-center inline-block w-full text-center focus:text-teal-500 hover:text-teal-500">
                        <img width="25" height="25" class="inline-block mb-1"
                            src="@/assets/images/flag.png">
                        <span class="block text-xs tab tab-kategori">Campaign</span>
                    </router-link>
                </div>

                <div>
                   <router-link :to="{name: 'login'}"
                    class="justify-center inline-block w-full text-center focus:text-teal-500 hover:text-teal-500">
                    <img width="25" height="25" class="inline-block mb-1"
                            src="@/assets/images/user.png">
                    <span class="block text-xs">Akun</span>
                    </router-link>
                </div>
                
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'FooterComponent'
}
</script>

<style>

</style>