<script lang="ts">
import { signupError } from '$lib/functions/client/getErrorMessage';
                                      
    import { usernameNotTaken } from '$lib/functions/client/usernameNotTaken';

    export let hash: string

    import { afterUpdate, onMount } from 'svelte';
    import { field, form as createForm } from 'svelte-forms'
    import { max, min, required } from 'svelte-forms/validators';

    const username = field('username', '', [
        required(),
        min(6),
        max(30),
        usernameNotTaken
    ])
    const purpose = field('purpose', 'N/A', [
        required()
    ])

    let checked = false
    let form = createForm(username, purpose)
</script>

<form method="POST" action="/signup" autocomplete="off" on:input={() => checked = false}>
    <div class="field text">
        <label for="username-input">Username</label>
        <input id="username-input" type="text" name="username" bind:value={$username.value} />
    </div>
    <div class="field radio" id="radio">
        <h2>Why have you decided to use FlashChem?</h2>
        <input type="hidden" name="hash" value={hash} />
        <input type="radio" name="purpose" value="N/A" bind:group={$purpose.value} style="display: none;" checked />
        <label for="high-school-class-input">
            <input id="high-school-class-input" type="radio" name="purpose" value="high-school" bind:group={$purpose.value} />
            <span />
            To study for a High School level class
        </label>
        <label for="college-level-class-input">
            <input id="college-level-class-input" type="radio" name="purpose" value="college" bind:group={$purpose.value} />
            <span />
            To study for a College level class
        </label>
        <label for="competition-input">
            <input id="competition-input" type="radio" name="purpose" value="competition" bind:group={$purpose.value} />
            <span />
            To study for a competition like USNCO
        </label>
        <label for="personal-input">
            <input id="personal-input" type="radio" name="purpose" value="personal" bind:group={$purpose.value} />
            <span />
            To study for myself or for another purpose
        </label>
    </div>
    {#if $form.errors[0]}
        <p class="error">{signupError($form.errors[0])}</p>
    {/if}
    <div class="button">
        <button disabled={!!$form.errors[0]}>
            Create Account
        </button>
    </div>
</form>

<style lang="scss">
    .text {
        label {
            display: block;
            font-size: 18px;
            font-weight: 300;
            margin-left: 1.5em;
            margin-bottom: 0.25em;
        }

        input {
            background: var(--background-1);
            border-radius: 7px;
            color: var(--text-light);
            border: none;
            outline: none;
            padding: 0.3em 0.5em;
            font-size: 24px;
            margin-left: 0.3em;
        }
    }

    #radio {
        h2 {
            font-size: 18px;
            font-weight: 300;
            margin-left: 1.5em;
            margin-bottom: 0.25em;
        }

        label {
            cursor: pointer;
            padding-top: 0.5em;
            padding-bottom: 0.5em;
            display: block;
            font-size: 24px;
            line-height: 1;

            input {
                visibility: hidden;
                width: 0;
                height: 0;

                &:checked ~ span::after {
                    display: inline-block;
                }
            }

            span {
                width: 1em;
                height: 1em;
                border-radius: 50%;
                display: inline-block;
                position: relative;
                background: var(--background-1);
                vertical-align: 0px;
                margin-right: 0.3em;

                &::after {
                    content: '';
                    position: absolute;
                    display: none;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 0.6em;
                    height: 0.6em;
                    border-radius: 50%;
                    background: var(--emph);
                }
            }
        }
    }

    .error {
        margin-top: 1em;
        color: var(--background-2);
    }

    .button {
        width: 100%;
        text-align: right;
    }

    button {
        font-size: 24px;
        font-weight: 600;
        color: var(--text-dark);
        background: var(--button-1);
        border-radius: 10px;
        border: none;
        outline: none;
        padding: 0.5em;
        display: inline-block;
        transition: background-color ease-in-out 0.15s;
        cursor: pointer;

        &:hover {
            background-color: var(--button-1-hover);
        }

        &:disabled {
            cursor: default;

            &:hover {
                background-color: var(--button-1);
            }
        }
    }
</style>