<svelte:options tag={'date-picker'}/>
<script>
    import {createEventDispatcher} from 'svelte';
    import {getDateRows, weekdays, setLocales, monthNames} from "./date-time.js";
    import {iconLeft, iconRight} from "./IconService";

    const dispatch = createEventDispatcher();

    export let selected = new Date();
    $: selected  = (typeof selected === 'string') ? new Date(parseInt(selected)) : selected;

    export let isallowed = (date) => {return date.getTime() <= dateNow()};

    export let locale = 'en-EN';
    $: locale = (locale) => {
        setLocales(locale)
        return locale;
    }

    let date, month, year, showDatePicker;
    $: {
        date = selected.getUTCDate();
        month = selected.getUTCMonth();
        year = selected.getUTCFullYear();
    }

    let dateNow = () => {
        let now = new Date();
        return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())).getTime();
    }

    const onFocus = () => {
        showDatePicker = true;
    };

    const next = () => {
        if (month === 11) {
            month = 0;
            year = year + 1;
            return;
        }
        month = month + 1;
    };

    const prev = () => {
        if (month === 0) {
            month = 11;
            year -= 1;
            return;
        }
        month -= 1;
    };

    const convertSelected = () => {
        const options = {weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit'};

        return selected.toLocaleDateString(locale, options);
    }

    let site = document.getElementsByTagName('html');
    site[0].addEventListener('click', (e) => {
        showDatePicker = false;
    });

    let cells;

    const onChange = date => {
        showDatePicker = false;
        selected = new Date(Date.UTC(year, month, date));
        let selectedDay = selected.getTime()
        dispatch('datechange', {selectedDay})
    };

    const allow = (year, month, date) => {
        if (!date) return true;
        return isallowed(new Date(year, month, date));
    };

    $: cells = getDateRows(month, year).map(c => ({
        value: c,
        allowed: allow(year, month, c)
    }));

</script>

<div id="datepicker" class="relative" on:click={(e) => {e.stopPropagation();}}>
    {#if showDatePicker}
        <div class="box">
            <div class="month-name">
                <div>
                    <button type=text on:click={prev}>{@html iconLeft}</button>
                </div>
                <div class="center">{monthNames[month]} {year}</div>
                <div>
                    <button type=text on:click={next}>{@html iconRight}</button>
                </div>
            </div>
            <!-- Calendar -->
            <div class="container">
                <div class="row">
                    {#each weekdays as day}
                        <div class="cell weekday">{day}</div>
                    {/each}
                </div>

                <div class="row">
                    {#each cells as {allowed, value}}
                        <div
                                on:click={allowed && value ? onChange.bind(this, value) : ()=>{}}
                                class:cell={true}
                                class:highlight={allowed && value}
                                class:disabled={!allowed}
                                class:selected={selected === new Date(year, month, value)}>
                            {value || ''}
                        </div>
                    {/each}
                </div>
            </div>

        </div>
    {/if}
    <input type="text" size="14" on:focus={onFocus} value={convertSelected(selected)}/>
</div>

<style>
    input {
        outline: none;
        border: 1px solid #999999;
        background-color: inherit;
        font-weight: 300;
        cursor: pointer;
    }

    .relative {
        position: relative;
    }

    .box {
        position: fixed;
        border: 1px solid #004666;
        display: inline-block;
        font-weight: 100;
        background-color: #004666;
        color: #ffffff;
        z-index: 10000;
        font-size: inherit;
        padding: 0;
        margin: 0;
    }

    .center {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    button {
        outline: none;
        border: none;
        background-color: white;
        cursor: pointer;
        justify-content: center;
        align-items: center;
        margin: 3px 8px;
        padding: 3px 3px 0;
    }

    button:hover {
        background-color: #4A849F;
        color: white;
    }

    .container {
        background-color: #dedede;
    }

    .row {
        text-align: center;
        display: grid;
        grid-template-columns: auto auto auto auto auto auto auto;
        font-weight: 100;
        padding: 0.3em;
        flex-wrap: wrap;
    }

    .cell {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 3px;
        padding: 3px;
        background-color: #ededed;
    }

    .weekday {
        color: #9a9a9a;
        font-weight: 300;
        background-color: whitesmoke;
    }

    .month-name {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 4px 0;
        font-weight: 200;
    }

    .selected {
        background-color: #4A849F;
        font-weight: 200;
        color: white;
        text-shadow: 0 0 0.5em white;
    }

    .highlight {
        background-color: white;
        color: grey;
    }

    .disabled {
        background-color: #9d9d9d;
        cursor: not-allowed;
    }

    .highlight:hover {
        background-color: #004666;
        color: white;
        cursor: pointer;
    }

    .selected.highlight:hover {
        background: #004666;
    }

</style>
