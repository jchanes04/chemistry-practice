<script lang="ts">
    import type { SetInfo } from "$lib/client";
    import numberToTime from "$lib/functions/client/numberToTime";
    import uppercaseWords from "$lib/functions/client/uppercaseWords";
    import { createEventDispatcher } from "svelte";
    import ExitIcon from '$lib/assets/ExitIcon.svelte'

    export let time: number = 0
    export let setInfo: SetInfo

    const dispatch = createEventDispatcher()

    function exitPractice() {
        console.log('x')
        dispatch('exitPractice', { time })
    }
</script>

<div class="practice-toolbar">
    <div class="left"><span>{setInfo.name}</span></div>
    <div class="time">{numberToTime(time)}</div>
    <div class="right" style="">
        <span>{uppercaseWords(setInfo.difficulty)}</span>
        <span class="vertical-line">|</span>
        <span>{uppercaseWords(setInfo.type)}</span>
        <span class="vertical-line">|</span>
        <span>{uppercaseWords(setInfo.topic)}</span>
        <span class="icon" on:click={exitPractice}><ExitIcon /></span>
    </div>
</div>

<style lang="scss">
    .practice-toolbar {
        position: fixed;
        bottom: 0;
        width: calc(100% - 10vw);
        left: 5vw;
        background-color: var(--background-3);
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        color: var(--text-light);
        padding: 1em 2em;
        box-sizing: border-box;

        > * {
            display: flex;
            flex-direction: row;
            align-items: center;
        }
    }

    .left {
        font-size: 24px;
        min-width: 0;

        span {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            display: inline-block;
        }
    }

    .time {
        font-size: 48px;
        margin: 0 0.5em;
    }

    .right {
        font-size: 20px;
        justify-content: right;
        gap: 1em;

        .vertical-line {
            transform: scaleY(1.5);
        }
    }

    .icon {
        width: 2em;
        height: 2em;
        vertical-align: middle;
        cursor: pointer;

        :global(svg) {
            height: 100%;
        }
    }

    @media (max-width: 950px) {
        .left {
            font-size: 18px;
        }

        .time {
            font-size: 36px;
        }

        .right {
            font-size: 14px;
            gap: 0.5em;
            
            > * {
                white-space: nowrap;
            }
        }
    }

    @media (max-width: 650px) {
        .practice-toolbar {
            width: calc(100% - 5vw);
            left: 2.5vw;
            grid-template-columns: 1fr auto 1fr;
            border-top-left-radius: 15px;
            border-top-right-radius: 15px;
            color: var(--text-light);
            padding: 0.5em 1em;
            box-sizing: border-box;
        }

        .right :not(.icon) {
            display: none;
        }

        .left span {
            display: none;
        }
    }
</style>