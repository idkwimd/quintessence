# Better Select

<script>
        bs.options = [
            { text: 'Option #1', value: 1 },
            { text: 'Option #2', value: 2 }
        ]
        bsMulti.options = [
            { text: 'Option #1', value: 1 },
            { text: 'Option #2', value: 2 },
            { text: 'Option #3', value: 3 },
            { text: 'Option #4', value: 4 }
        ]
        bsSearch.options = [
            { text: 'India', value: 'in' },
            { text: 'Australia', value: 'au' },
            { text: 'Mongolia', value: 'mn' },
            { text: 'Russia', value: 'ru' },
            { text: 'China', value: 'cn' }
        ]
</script>


## Example

### Default

```html
<w-better-select id="bs"></w-better-select>
```

```javascript
bs.options = [
    { text: 'Option #1', value: 1 },
    { text: 'Option #2', value: 2 }
]
```

<w-better-select id="bs"></w-better-select>


### Multi-select

```html
<w-better-select multiselect id="bsMulti"></w-better-select>
```

```javascript
bsMulti.options = [
    { text: 'Option #1', value: 1 },
    { text: 'Option #2', value: 2 },
    { text: 'Option #3', value: 3 },
    { text: 'Option #4', value: 4 }
]
```

<w-better-select multiselect id="bsMulti"></w-better-select>


### Search

```html
<w-better-select multiselect search id="bsSearch"></w-better-select>
```

```javascript
bsSearch.options = [
    { text: 'Option #1', value: 1 },
    { text: 'Option #2', value: 2 },
    { text: 'Option #3', value: 3 },
    { text: 'Option #4', value: 4 }
]
```

<w-better-select multiselect search id="bsSearch"></w-better-select>


## Attributes
| Name | Value | Description |
|---|---|---|
| multiselect | | |
| search | | |
| name | `string` | |


## Properties
| Name | Value | Description |
|---|---|---|
| value | `string \| number \| undefined` | |


## Events

| Name | Value | Description |
|---|---|---|
| select | `CustomEvent` ||