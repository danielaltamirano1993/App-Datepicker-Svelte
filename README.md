# svelteDatepicker

- Web-component: `<date-picker></date-picker>`

- or Svelte-component: `import DatePicker from 'svelte-generic-datepicker'`

## Install

`npm install svelte-generic-datepicker`

# Usage

Import the component.

```
    import DatePicker from 'svelte-generic-datepicker'
```

Use the component.

```
    <DatePicker on:datechange={onDateChange}
                selected={dateNow}
                isAllowed={date => date.getTime() <= dateNow()}/>
```

The datepicker offers the parameter:

```
    export let isAllowed = () => true;
    export let selected = new Date();
```

### Web-Component

```
<custom-element-demo>
<template>
<head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width,initial-scale=1'>
    <title>Generic Crud Table</title>
    <link rel='icon' type='image/png' href='favicon.png'>
    <link rel='stylesheet' href='https://ivosdc.github.io/svelte-datepicker/build/date-picker.css'>
    <script defer src='https://ivosdc.github.io/svelte-datepicker/build/date-picker.js'></script>
</head>

<body>
<hr>
<div class="nolinebreak">
    <span class="datepicker">Select date:</span>
    <date-picker></date-picker>
</div>
</body>
</template>
</custom-element-demo>
```

```html
<date-picker></date-picker>
```

### Svelte-Component:

```
<script>
    import DatePicker from 'svelte-datepicker'

    // Datepicker
    const onDateChange = d => {
        currentDate = d.detail;
        let utcTimestamp = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate())).getTime();
        console.log(utcTimestamp)
        // fetchNewData()
    };

    let dateNow = () => {
        let now = new Date();
        return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())).getTime();
    }

    let currentDate = new Date(parseInt(time));
</script>

<main>
    <hr>
        <span>Select date:</span>
        <DatePicker
                on:datechange={onDateChange}
                selected={currentDate}
                isAllowed={date => date.getTime() <= dateNow()}/>
</main>

```
