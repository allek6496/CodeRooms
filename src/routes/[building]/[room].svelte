<script lang='ts'>
    import { base } from '$app/paths'
    import { page } from '$app/stores'
    
    const { building, room } = $page.params
    
    let username = '';
    let is_error = false;
    
    async function onClick() {
        console.log("USERNAME", username)
        
        const response = await fetch(`${base}/api/verify-${username}-${Date.now()}`)
        const { verified } = await response.json()
        
        if (verified) {
            // console.log('good username!')
            await fetch(`${base}/api/${building}-${room}-${username}`)
            window.location.href = `../view/${building}/${room}`
        } else {
            is_error = true
        }
    }
</script>

<style lang="less">
    .btn, a {
        background-color: #33b3fd;
        border: none;
        padding: 5px 14px;
        
        color: black;
        text-decoration: none;
    }
    
    .txt {
        background-color: #ddd;
        border: none;
        padding: 5px;
        
        &:focus {
            // outline-color: red;
        }
    }
    
    .input {
        width: 100%;
        padding: 4px 1.5em;
    }
    
    .spacer {
        padding-top: 1em;
    }
</style>

<div class="spacer"></div>

<p>
    <a href={`../view/${building}/${room}`}>View commits from this room</a>
</p>

<div class="spacer"></div>

<p>Checkout your GitHub username here:</p>

<div class="input">
    <input type="text" class="txt" bind:value={username}>
    <input type="button" class="btn" on:click={onClick} value="Checkout">
</div>

{#if is_error}
    <p>The GitHub username is invalid or no recent commits were found.</p>
{/if}
