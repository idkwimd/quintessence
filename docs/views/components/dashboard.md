# Dashboard



## Example

```html
<w-dashboard></w-dashboard>
```
<run-code href="/html/dashboard.html"></run-code>


## Attributes
| Name | Value | Description |
|---|---|---|
| screen | | Makes dashboard fullscreen |


## Properties

| Name | Direction | Type | Description |
|---|---|---|---|
| menu | set | [TMenu[]](#TMenu) | Specifying `href` will update URL using history API |


## Events

| Name | Detail | Description |
|---|---|---|
| menuselect | [TMenu](#TMenu) | Fires when a menu is selected |

## Types

### TMenu
```jsdoc
{
    text: string,
    icon?: string,
    href?: string
}
```