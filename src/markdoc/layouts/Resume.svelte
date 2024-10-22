<script>
    import "../styles/resume.css";
    import { env } from "$env/dynamic/public";
    export let name;
    export let role;

    let title = `${name} | ${role}`;

    let printPdf = (env.PUBLIC_PRINT_PDF == 'false') ? false : true;
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content="A summary of {name}'s career so far." />
</svelte:head>

<main>
    <section id="title">
        <h1>{title}</h1>
        <hr>
    </section>
    <slot />
</main>

{#if printPdf == false }
<section id="download">
    <a href="/resume.pdf">
        Download
        <span class="icon-download"></span>
    </a>
</section>
{/if}

<style>
    #download {
        width: 100%;
        height: 2rem;
        flex-direction: row;
        text-align: center;
        position: absolute;
    }

    #download > a {
        background-color: white;
        border-radius: 2px;
        color: black;
        padding: 0.5rem 1rem;
        text-decoration: none;
    }

    #download > a:hover {
        background-color: #f0f0f0;
    }

    main {
        width: fit-content;
        padding: 1.5rem 2.5rem;
        margin: 2rem auto;
        justify-content: center;
        align-items: center;
        background-color: white;
    }

    #title {
        text-align: center;
    }
</style>