export default {
    beforeCreate () {
        if (this.$options.logDisabled === true) {
            console.warn('Skipping HOOK [ beforeCreate ]');
            return;
        }

        console.log('HOOK [ beforeCreate ]: '+this.$options.name);
    },
    created () {
        if (this.$options.logDisabled === true) {
            console.warn('Skipping HOOK [ created ]');
            return;
        }

        console.log('HOOK [ created ]: '+this.$options.name);
    },
    beforeMount () {
        if (this.$options.logDisabled === true) {
            console.warn('Skipping HOOK [ beforeMount ]');
            return;
        }

        console.log('HOOK [ beforeMount ]: '+this.$options.name);
    },
    mounted () {
        if (this.$options.logDisabled === true) {
            console.warn('Skipping HOOK [ mounted ]');
            return;
        }

        console.log('HOOK [ mounted ]: '+this.$options.name);
    },
    beforeUpdate () {
        if (this.$options.logDisabled === true) {
            console.warn('Skipping HOOK [ beforeUpdate ]');
            return;
        }

        console.log('HOOK [ beforeUpdate ]: '+this.$options.name);
    },
    updated () {
        if (this.$options.logDisabled === true) {
            console.warn('Skipping HOOK [ updated ]');
            return;
        }

        console.log('HOOK [ updated ]: '+this.$options.name);
    },
    beforeDestroy () {
        if (this.$options.logDisabled === true) {
            console.warn('Skipping HOOK [ beforeDestroy ]');
            return;
        }

        console.log('HOOK [ beforeDestroy ]: '+this.$options.name);
    },
    destroyed () {
        if (this.$options.logDisabled === true) {
            console.warn('Skipping HOOK [ destroyed ]');
            return;
        }

        console.log('HOOK [ destroyed ]: '+this.$options.name);
    }
}