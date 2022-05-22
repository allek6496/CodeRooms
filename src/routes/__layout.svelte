<style lang="less">
    :global(body) {
        background-color: #333b44;
        color: #23b623;
        padding: 0;
    }
    
    :global(h1) {
        text-align: center;
    }
    
    :global(h1, h2, h3, input, p) {
        padding-top: 0.8em;
        padding-bottom: 0.8em;
        font-family: 'Roboto Mono', monospace;
    }
    
    :global(table) {
        font-family: 'Roboto', sans-serif;
    }
    
    :global(p) {
        padding: 4px 1.5em;
    }
    
    :global(h2) {
        padding: 0.5em 1.5em;
        font-size: 28px;
    }
    
    :global(a) {
        color: #33b3fd;
        
        &:visited {
            color: #3f66e6;
        }
    }
    
    :global(p) {
        color: #23b623;
    }
</style>

<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Roboto&family=Roboto+Mono&display=swap" rel="stylesheet">

<main>
    <slot/>
</main>
