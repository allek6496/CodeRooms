<script lang="ts">
    import { base } from '$app/paths'
    
    async function getMostPop() {
        const res = await fetch(`${base}/api/get-a-getMostPopular`);
        const json = await res.json()
        return json
    }
</script>

<h1>Welcome to CodeRooms!</h1>
<!-- <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p> -->

<p>The most popular room is currently
    {#await getMostPop()}
    being calaulated...
    {:then room}
        {room.data}.
    {/await}
</p>

