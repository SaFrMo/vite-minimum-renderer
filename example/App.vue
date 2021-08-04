<template>
    <h1>Test Elements</h1>
    <p>
        No element on this page has the <code>custom-renderer</code> class in
        the source. That class is added in the custom renderer.
    </p>
    <OutsideComponent />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import OutsideComponent from './OutsideComponent.vue'

export default defineComponent({
    components: { OutsideComponent },
})
</script>
