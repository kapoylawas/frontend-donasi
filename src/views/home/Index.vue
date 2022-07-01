<template>
    <div class="pt-20 pb-20">
        <div class="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-5/12">

            <!-- slider -->
            <div class="grid grid-cols-1 p-1 text-sm bg-white rounded shadow-md">
                <Slider/>
            </div>

            <!-- categoryHome -->
            <CategoryHome/>
            <!-- campaign -->

        </div>

    </div>
</template>

<script>
//component slider
    import Slider from '@/components/Slider.vue'

    //component categoryHome
    import CategoryHome from '@/components/CategoryHome.vue'

    export default {
        name: 'HomeComponent',

        components: {
            Slider,
            CategoryHome,
        }
        
    }
</script>