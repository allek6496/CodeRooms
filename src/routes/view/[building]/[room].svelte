<script>
    import { page } from '$app/stores'
    import { base } from '$app/paths'
    
    const { building, room } = $page.params
    
    async function getData() {
        const response = await fetch(`${base}/api/get-${building}-${room}`)
        
        const json = await response.json()
        
        return json
    }
</script>

<style lang="less">
    .material-symbols-outlined {
        font-size: 16px;
        font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 48
    }
    
    table {
        margin-left: auto;
        margin-right: auto;
    }
    
    th {
        padding-bottom: 1em;
        border-bottom: 1px solid rgb(202, 202, 202);
    }
    
    td {
        padding-top: 4px;
        padding-bottom: 4px;
    }
    
    th, td {
        padding-left: 1em;
        padding-right: 1em;
    }
</style>

<h2>{building} {room}</h2>

{#await getData()}
    <p>loading...</p>
{:then data}
    <table>
        <tr>
            <th>Time</th>
            <th>Name</th>
            <th>Repo</th>
        </tr>
        {#each Object.entries(data).map(([t, o]) => [Number(t), o]).sort(([a, x], [b, y]) => a - b) as [timestamp, { name, url }]}
            <tr>
                <td>{new Date(timestamp).toDateString()}</td>
                <td>{name}</td>
                <td class="link"><a href={url}>
                    {url.split('/')[4]}
                    <span class="material-symbols-outlined">open_in_new</span>
                </a></td>
            </tr>
        {/each}
    </table>
{/await}
