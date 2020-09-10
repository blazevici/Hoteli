<template>
    <div class="card">
        <slot name="header"></slot>
        <slot name="body">
            <div class="card-body">
                <slot name="default">
                </slot>
            </div>
        </slot>
        <slot name="footer"></slot>
    </div>
</template>

<script>
export default {
}
</script>

<style>

</style>