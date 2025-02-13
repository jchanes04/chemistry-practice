<script lang="ts">
    import practiceOptions from "$lib/stores/practiceOptions";
    import practiceStats from "$lib/stores/practiceStats";
    import { createEventDispatcher } from "svelte";
    import LastQuestion from "./LastQuestion.svelte";

    export let lastQuestion = null    
    const dispatch = createEventDispatcher()
    
</script>

<div class="practice-results">
    <h1>Results</h1>
    <div class="scores-wrapper">
        <div class="scores">
            <div>
                <p class="score">{$practiceStats.numberCorrect}</p>
                <p class="units">correct</p>
            </div>
            {#each $practiceStats.statistics as s}
                <div>
                    <p class="score">{s.figure}</p>
                    <p class="units">{s.units}</p>
                </div>
            {/each}
            <div>
                <p class="score">--</p>
                <p class="units">percentile</p>
            </div>
        </div>
    </div>
    {#if lastQuestion}
        <LastQuestion {lastQuestion} />
    {/if}
    {#if $practiceOptions.postScore}
        <p>Your score of {$practiceStats.score.toFixed(1)} has been posted to the scoreboards</p>
    {/if}
    <div class="buttons">
        <button class="primary" on:click={() => dispatch("playAgain")}>Play Again</button>
        <button class="primary" on:click={() => dispatch("backToOptions")}>Back to Options</button>
    </div>
</div>

<style lang="scss">
    .practice-results {
        background: var(--background-3);
        border-radius: 15px;
        padding: 2.5em;
        color: var(--text-light);
        width: min(700px, 80vw);
        text-align: center;
        max-height: 70vh;
        overflow-y: auto;
        overflow-x: hidden;
        box-sizing: border-box;
    }

    h1 {
        font-size: 48px;
        text-decoration: underline;
    }

    .scores-wrapper {
        overflow: hidden;
        margin-top: 3em;
    }

    .scores {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: stretch;
        margin-right: -2px;
        margin-bottom: -2px;

        > * {
            min-width: 200px;
            flex-grow: 1;
            flex-basis: 1px;
            border-right: 1px solid var(--text-light);
            border-bottom: 1px solid var(--text-light);
            padding: 13px;
        }
    }

    .score {
        font-size: 80px;
        font-weight: 600;
        margin-bottom: 0;
        margin-top: 0.2em;
    }

    .units {
        font-size: 20px;
        margin-top: 0.25em;
        margin-bottom: 1.5em;
    }
    
    .buttons {
        margin-top: 2em;
    }

    button {
        border-radius: 10px;
        font-size: 24px;
        font-weight: 600;
        border: none;
        margin: 0.5em 0.5em;
        padding: 0.5em 1em;
        color: var(--text-dark);
        cursor: pointer;
        width: 20ch;
    }

    .primary {
        background-color: var(--button-1);

        &:hover {
            background-color: var(--button-1-hover);
        }
    }

    @media (max-width: 650px) {
        .practice-results {
            width: 90vw;
        }

        h1 {
            margin-top: 0;
        }

        .scores > * {
            min-width: 125px;
        }

        .score {
            font-size: 56px;
        }

        .units {
            font-size: 16px;
        }

        button {
            width: min(100%, 20ch);
            margin-left: 0;
            margin-right: 0;
        }
    }
</style>