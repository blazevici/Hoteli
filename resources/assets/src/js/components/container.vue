<template>
    <div :class="containerClass">
        <div class="row">
            <div class="col-md-4 offset-md-2">
                <slot name="default"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        containerClass () {
            return {
                'container': !this.$attrs.fluid,
                'container-fluid': !!this.$attrs.fluid,
            }
        }
    }
}
</script>

<style>

</style>