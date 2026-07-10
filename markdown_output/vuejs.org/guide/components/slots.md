Are you an LLM? You can read better optimized documentation at /guide/components/slots.md for this page in Markdown format

# Slots [​](#slots)

> This page assumes you've already read the [Components Basics](/guide/essentials/component-basics). Read that first if you are new to components.

[Watch a free video lesson on Vue School](https://vueschool.io/lessons/vue-3-component-slots?friend=vuejs "Free Vue.js Slots Lesson")

## Slot Content and Outlet [​](#slot-content-and-outlet)

We have learned that components can accept props, which can be JavaScript values of any type. But how about template content? In some cases, we may want to pass a template fragment to a child component, and let the child component render the fragment within its own template.

For example, we may have a `<FancyButton>` component that supports usage like this:

template

```
<FancyButton>
  Click me! <!-- slot content -->
</FancyButton>
```

The template of `<FancyButton>` looks like this:

template

```
<button class="fancy-btn">
  <slot></slot> <!-- slot outlet -->
</button>
```

The `<slot>` element is a **slot outlet** that indicates where the parent-provided **slot content** should be rendered.

![Diagram showing slot content from the parent being injected into the slot outlet in the child component](/assets/slots.CKcE8XYd.png)

And the final rendered DOM:

html

```
<button class="fancy-btn">Click me!</button>
```

[Try it in the Playground](https://play.vuejs.org/#eNpdUdlqAyEU/ZVbQ0kLMdNsXabTQFvoV8yLcRkkjopLSQj596oTwqRvnuM9y9UT+rR2/hs5qlHjqZM2gOch2m2rZW+NC/BDND1+xRCMBuFMD9N5NeKyeNrqphrUSZdA4L1VJPCEAJrRdCEAvpWke+g5NHcYg1cmADU6cB0A4zzThmYckqimupqiGfpXILe/zdwNhaki3n+0SOR5vAu6ReU++efUajtqYGJQ/FIg5w8Wt9FlOx+OKh/nV1c4ZVNqlHE1TIQQ7xnvCN13zkTNalBSc+Jw5wiTac2H1WLDeDeDyXrJVm9LWG7uE3hev3AhHge1cYwnO200L4QljEnd1bCxB1g82UNhe+I6qQs5kuGcE30NrxeaRudzOWtkemeXuHP5tLIKOv8BN+mw3w==)

[Try it in the Playground](https://play.vuejs.org/#eNpdUdtOwzAM/RUThAbSurIbl1ImARJf0ZesSapoqROlKdo07d9x0jF1SHmIT+xzcY7sw7nZTy9Zwcqu9tqFTYW6ddYH+OZYHz77ECyC8raFySwfYXFsUiFAhXKfBoRUvDcBjhGtLbGgxNAVcLziOlVIp8wvelQE2TrDg6QKoBx1JwDgy+h6B62E8ibLoDM2kAAGoocsiz1VKMfmCCrzCymbsn/GY95rze1grja8694rpmJ/tg1YsfRO/FE134wc2D4YeTYQ9QeKa+mUrgsHE6+zC+vfjoz1Bdwqpd5iveX1rvG2R1GA0Si5zxrPhaaY98v5WshmCrerhVi+LmCxvqPiafUslXoYpq0XkuiQ1p4Ax4XQ2BSwdnuYP7p9QlvuG40JHI1lUaenv3o5w3Xvu2jOWU179oQNn5aisNMvLBvDOg==)

With slots, the `<FancyButton>` is responsible for rendering the outer `<button>` (and its fancy styling), while the inner content is provided by the parent component.

Another way to understand slots is by comparing them to JavaScript functions:

js

```
// parent component passing slot content
FancyButton('Click me!')

// FancyButton renders slot content in its own template
function FancyButton(slotContent) {
  return `<button class="fancy-btn">
      ${slotContent}
    </button>`
}
```

Slot content is not just limited to text. It can be any valid template content. For example, we can pass in multiple elements, or even other components:

template

```
<FancyButton>
  <span style="color:red">Click me!</span>
  <AwesomeIcon name="plus" />
</FancyButton>
```

[Try it in the Playground](https://play.vuejs.org/#eNp1UmtOwkAQvspQYtCEgrx81EqCJibeoX+W7bRZaHc3+1AI4QyewH8ewvN4Aa/gbgtNIfFf5+vMfI/ZXbCQcvBmMYiCWFPFpAGNxsp5wlkphTLwQjjdPlljBIdMiRJ6g2EL88O9pnnxjlqU+EpbzS3s0BwPaypH4gqDpSyIQVcBxK3VFQDwXDC6hhJdlZi4zf3fRKwl4aDNtsDHJKCiECqiW8KTYH5c1gEnwnUdJ9rCh/XeM6Z42AgN+sFZAj6+Ux/LOjFaEK2diMz3h0vjNfj/zokuhPFU3lTdfcpShVOZcJ+DZgHs/HxtCrpZlj34eknoOlfC8jSCgnEkKswVSRlyczkZzVLM+9CdjtPJ/RjGswtX3ExvMcuu6mmhUnTruOBYAZKkKeN5BDO5gdG13FRoSVTOeAW2xkLPY3UEdweYWqW9OCkYN6gctq9uXllx2Z09CJ9dJwzBascI7nBYihWDldUGMqEgdTVIq6TQqCEMfUpNSD+fX7/fH+3b7P8AdGP6wA==)

[Try it in the Playground](https://play.vuejs.org/#eNptUltu2zAQvMpGQZEWsOzGiftQ1QBpgQK9g35oaikwkUiCj9aGkTPkBPnLIXKeXCBXyJKKBdoIoA/tYGd3doa74tqY+b+ARVXUjltp/FWj5GC09fCHKb79FbzXCoTVA5zNFxkWaWdT8/V/dHrAvzxrzrC3ZoBG4SYRWhQs9B52EeWapihU3lWwyxfPDgbfNYq+ejEppcLjYHrmkSqAOqMmAOB3L/ktDEhV4+v8gMR/l1M7wxQ4v+3xZ1Nw3Wtb8S1TTXG1H3cCJIO69oxc5mLUcrSrXkxSi1lxZGT0//CS9Wg875lzJELE/nLto4bko69dr31cFc8auw+3JHvSEfQ7nwbsHY9HwakQ4kes14zfdlYH1VbQS4XMlp1lraRMPl6cr1rsZnB6uWwvvi9hufpAxZfLryjEp5GtbYs0TlGICTCsbaXqKliZDZx/NpuEDsx2UiUwo5VxT6Dkv73BPFgXxRktlUdL2Jh6OoW8O3pX0buTsoTgaCNQcDjoGwk3wXkQ2tJLGzSYYI126KAso0uTSc8Pjy9P93k2d6+NyRKa)

By using slots, our `<FancyButton>` is more flexible and reusable. We can now use it in different places with different inner content, but all with the same fancy styling.

Vue components' slot mechanism is inspired by the [native Web Component `<slot>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot), but with additional capabilities that we will see later.

## Render Scope [​](#render-scope)

Slot content has access to the data scope of the parent component, because it is defined in the parent. For example:

template

```
<span>{{ message }}</span>
<FancyButton>{{ message }}</FancyButton>
```

Here both `{{ message }}` interpolations will render the same content.

Slot content does **not** have access to the child component's data. Expressions in Vue templates can only access the scope it is defined in, consistent with JavaScript's lexical scoping. In other words:

> Expressions in the parent template only have access to the parent scope; expressions in the child template only have access to the child scope.

## Fallback Content [​](#fallback-content)

There are cases when it's useful to specify fallback (i.e. default) content for a slot, to be rendered only when no content is provided. For example, in a `<SubmitButton>` component:

template

```
<button type="submit">
  <slot></slot>
</button>
```

We might want the text "Submit" to be rendered inside the `<button>` if the parent didn't provide any slot content. To make "Submit" the fallback content, we can place it in between the `<slot>` tags:

template

```
<button type="submit">
  <slot>
    Submit <!-- fallback content -->
  </slot>
</button>
```

Now when we use `<SubmitButton>` in a parent component, providing no content for the slot:

template

```
<SubmitButton />
```

This will render the fallback content, "Submit":

html

```
<button type="submit">Submit</button>
```

But if we provide content:

template

```
<SubmitButton>Save</SubmitButton>
```

Then the provided content will be rendered instead:

html

```
<button type="submit">Save</button>
```

[Try it in the Playground](https://play.vuejs.org/#eNp1kMsKwjAQRX9lzMaNbfcSC/oL3WbT1ikU8yKZFEX8d5MGgi2YVeZxZ86dN7taWy8B2ZlxP7rZEnikYFuhZ2WNI+jCoGa6BSKjYXJGwbFufpNJfhSaN1kflTEgVFb2hDEC4IeqguARpl7KoR8fQPgkqKpc3Wxo1lxRWWeW+Y4wBk9x9V9d2/UL8g1XbOJN4WAntodOnrecQ2agl8WLYH7tFyw5olj10iR3EJ+gPCxDFluj0YS6EAqKR8mi9M3Td1ifLxWShcU=)

[Try it in the Playground](https://play.vuejs.org/#eNp1UEEOwiAQ/MrKxYu1d4Mm+gWvXChuk0YKpCyNxvh3lxIb28SEA8zuDDPzEucQ9mNCcRAymqELdFKu64MfCK6p6Tu6JCLvoB18D9t9/Qtm4lY5AOXwMVFu2OpkCV4ZNZ51HDqKhwLAQjIjb+X4yHr+mh+EfbCakF8AclNVkCJCq61ttLkD4YOgqsp0YbGesJkVBj92NwSTIrH3v7zTVY8oF8F4SdazD7ET69S5rqXPpnigZ8CjEnHaVyInIp5G63O6XIGiIlZMzrGMd8RVfR0q4lIKKV+L+srW+wNTTZq3)

## Named Slots [​](#named-slots)

There are times when it's useful to have multiple slot outlets in a single component. For example, in a `<BaseLayout>` component with the following template:

template

```
<div class="container">
  <header>
    <!-- We want header content here -->
  </header>
  <main>
    <!-- We want main content here -->
  </main>
  <footer>
    <!-- We want footer content here -->
  </footer>
</div>
```

For these cases, the `<slot>` element has a special attribute, `name`, which can be used to assign a unique ID to different slots so you can determine where content should be rendered:

template

```
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

A `<slot>` outlet without `name` implicitly has the name "default".

In a parent component using `<BaseLayout>`, we need a way to pass multiple slot content fragments, each targeting a different slot outlet. This is where **named slots** come in.

To pass a named slot, we need to use a `<template>` element with the `v-slot` directive, and then pass the name of the slot as an argument to `v-slot`:

template

```
<BaseLayout>
  <template v-slot:header>
    <!-- content for the header slot -->
  </template>
</BaseLayout>
```

`v-slot` has a dedicated shorthand `#`, so `<template v-slot:header>` can be shortened to just `<template #header>`. Think of it as "render this template fragment in the child component's 'header' slot".

![Diagram showing multiple named slots in a layout component, with content from the parent being directed to the corresponding header, main, and footer slots](/assets/named-slots.CCIb9Mo_.png)

Here's the code passing content for all three slots to `<BaseLayout>` using the shorthand syntax:

template

```
<BaseLayout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <template #default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</BaseLayout>
```

When a component accepts both a default slot and named slots, all top-level non-`<template>` nodes are implicitly treated as content for the default slot. So the above can also be written as:

template

```
<BaseLayout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <!-- implicit default slot -->
  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</BaseLayout>
```

Now everything inside the `<template>` elements will be passed to the corresponding slots. The final rendered HTML will be:

html

```
<div class="container">
  <header>
    <h1>Here might be a page title</h1>
  </header>
  <main>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </main>
  <footer>
    <p>Here's some contact info</p>
  </footer>
</div>
```

[Try it in the Playground](https://play.vuejs.org/#eNp9UsFuwjAM/RWrHLgMOi5o6jIkdtphn9BLSF0aKU2ixEVjiH+fm8JoQdvRfu/5xS8+ZVvvl4cOsyITUQXtCSJS5zel1a13geBdRvyUR9cR1MG1MF/mt1YvnZdW5IOWVVwQtt5IQq4AxI2cau5ccZg1KCsMlz4jzWrzgQGh1fuGYIcgwcs9AmkyKHKGLyPykcfD1Apr2ZmrHUN+s+U5Qe6D9A3ULgA1bCK1BeUsoaWlyPuVb3xbgbSOaQGcxRH8v3XtHI0X8mmfeYToWkxmUhFoW7s/JvblJLERmj1l0+T7T5tqK30AZWSMb2WW3LTFUGZXp/u8o3EEVrbI9AFjLn8mt38fN9GIPrSp/p4/Yoj7OMZ+A/boN9KInPeZZpAOLNLRDAsPZDgN4p0L/NQFOV/Ayn9x6EZXMFNKvQ4E5YwLBczW6/WlU3NIi6i/sYDn5Qu2qX1OF51MsvMPkrIEHg==)

[Try it in the Playground](https://play.vuejs.org/#eNp9UkFuwjAQ/MoqHLiUpFxQlaZI9NRDn5CLSTbEkmNb9oKgiL934wRwQK3ky87O7njGPicba9PDHpM8KXzlpKV1qWVnjSP4FB6/xcnsCRpnOpin2R3qh+alBig1HgO9xkbsFcG5RyvDOzRq8vkAQLSury+l5lNkN1EuCDurBCFXAMWdH2pGrn2YtShqdCPOnXa5/kKH0MldS7BFEGDFDoEkKSwybo8rskjjaevo4L7Wrje8x4mdE7aFxjiglkWE1GxQE9tLi8xO+LoGoQ3THLD/qP2/dGMMxYZs8DP34E2HQUxUBFI35o+NfTlJLOomL8n04frXns7W8gCVEt5/lElQkxpdmVyVHvP2yhBo0SHThx5z+TEZvl1uMlP0oU3nH/kRo3iMI9Ybes960UyRsZ9pBuGDeTqpwfBAvn7NrXF81QUZm8PSHjl0JWuYVVX1PhAqo4zLYbZarUak4ZAWXv5gDq/pG3YBHn50EEkuv5irGBk=)

Again, it may help you understand named slots better using the JavaScript function analogy:

js

```
// passing multiple slot fragments with different names
BaseLayout({
  header: `...`,
  default: `...`,
  footer: `...`
})

// <BaseLayout> renders them in different places
function BaseLayout(slots) {
  return `<div class="container">
      <header>${slots.header}</header>
      <main>${slots.default}</main>
      <footer>${slots.footer}</footer>
    </div>`
}
```

## Conditional Slots [​](#conditional-slots)

Sometimes you want to render something based on whether or not content has been passed to a slot.

You can use the [$slots](/api/component-instance#slots) property in combination with a [v-if](/guide/essentials/conditional#v-if) to achieve this.

In the example below we define a Card component with three conditional slots: `header`, `footer` and the `default` one. When content for the header / footer / default is present, we want to wrap it to provide additional styling:

template

```
<template>
  <div class="card">
    <div v-if="$slots.header" class="card-header">
      <slot name="header" />
    </div>
    
    <div v-if="$slots.default" class="card-content">
      <slot />
    </div>
    
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>
```

[Try it in the Playground](https://play.vuejs.org/#eNqVVMtu2zAQ/BWCLZBLIjVoTq4aoA1yaA9t0eaoCy2tJcYUSZCUKyPwv2dJioplOw4C+EDuzM4+ONYT/aZ1tumBLmhhK8O1IxZcr29LyTutjCN3zNRkZVRHLrLcXzz9opRFHvnIxIuDTgvmAG+EFJ4WTnhOCPnQAqvBjHFE2uvbh5Zbgj/XAolwkWN4TM33VI/UalixXvjyo5yeqVVKOpCuyP0ob6utlHL7vUE3U4twkWP4hJq/jiPP4vSSOouNrHiTPVolcclPnl3SSnWaCzC/teNK2pIuSEA8xoRQ/3+GmDM9XKZ41UK1PhF/tIOPlfSPAQtmAyWdMMdMAy7C9/9+wYDnCexU3QtknwH/glWi9z1G2vde1tj2Hi90+yNYhcvmwd4PuHabhvKNeuYu8EuK1rk7M/pLu5+zm5BXyh1uMdnOu3S+95pvSCWYtV9xQcgqaXogj2yu+AqBj1YoZ7NosJLOEq5S9OXtPZtI1gFSppx8engUHs+vVhq9eVhq9ORRrXdpRyseSqfo6SmmnONK6XTw9yis24q448wXSG+0VAb3sSDXeiBoDV6TpWDV+ktENatrdMGCfAoBfL1JYNzzpINJjVFoJ9yKUKho19ul6OFQ6UYPx1rjIpPYeXIc/vXCgjetawzbni0dPnhhJ3T3DMVSruI=)

## Dynamic Slot Names [​](#dynamic-slot-names)

[Dynamic directive arguments](/guide/essentials/template-syntax#dynamic-arguments) also work on `v-slot`, allowing the definition of dynamic slot names:

template

```
<base-layout>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>

  <!-- with shorthand -->
  <template #[dynamicSlotName]>
    ...
  </template>
</base-layout>
```

Do note the expression is subject to the [syntax constraints](/guide/essentials/template-syntax#dynamic-argument-syntax-constraints) of dynamic directive arguments.

## Scoped Slots [​](#scoped-slots)

As discussed in [Render Scope](#render-scope), slot content does not have access to state in the child component.

However, there are cases where it could be useful if a slot's content can make use of data from both the parent scope and the child scope. To achieve that, we need a way for the child to pass data to a slot when rendering it.

In fact, we can do exactly that - we can pass attributes to a slot outlet just like passing props to a component. The parent template receives slot props with `v-slot`, while the child template passes props to the slot outlet when rendering:

template

```
<!-- Parent template (usage) -->
<ChildComponent v-slot="receivedProps">
  {{ receivedProps.text }} {{ receivedProps.count }}
</ChildComponent>
```

template

```
<!-- Child template (slot definition) -->
<!-- render with props! -->
<slot
  text="hello"
  :count="1"
/>
```

Receiving the slot props is a bit different when using a single default slot vs. using named slots. The example above receives props using a single default slot, by using `v-slot` directly on the `ChildComponent` tag.

![Diagram showing a scoped slot where the child component passes data back to the parent-provided slot content](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjc4IiBoZWlnaHQ9IjQyNSIgdmlld0JveD0iMCAwIDY3OCA0MjUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnM+CiAgICA8bWFya2VyIGlkPSJhcnJvdyIgbWFya2VyV2lkdGg9IjgiIG1hcmtlckhlaWdodD0iOCIgcmVmWD0iNyIgcmVmWT0iNCIgb3JpZW50PSJhdXRvIiBtYXJrZXJVbml0cz0ic3Ryb2tlV2lkdGgiPgogICAgICA8cGF0aCBkPSJNMSAxTDcgNEwxIDdaIiBmaWxsPSIjNEI3RUZGIi8+CiAgICA8L21hcmtlcj4KICAgIDxzdHlsZT4KICAgICAgLmxhYmVsIHsKICAgICAgICBmb250OiA2MDAgMThweCAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsICJTZWdvZSBVSSIsIHNhbnMtc2VyaWY7CiAgICAgICAgZmlsbDogIzhFNjdDRDsKICAgICAgfQoKICAgICAgLmxlZ2VuZCB7CiAgICAgICAgZm9udDogNjAwIDE2cHggLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCAiU2Vnb2UgVUkiLCBzYW5zLXNlcmlmOwogICAgICB9CgogICAgICAuY29kZSB7CiAgICAgICAgY29sb3I6ICM0MkI4ODM7CiAgICAgICAgZm9udDogNjAwIDE2cHggdWktbW9ub3NwYWNlLCBTRk1vbm8tUmVndWxhciwgTWVubG8sIE1vbmFjbywgQ29uc29sYXMsIG1vbm9zcGFjZTsKICAgICAgICBsaW5lLWhlaWdodDogMjdweDsKICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwOwogICAgICB9CgogICAgICAuaW5kZW50IHsKICAgICAgICBwYWRkaW5nLWxlZnQ6IDIycHg7CiAgICAgIH0KCiAgICAgIC5yZWNlaXZlZCB7CiAgICAgICAgYm9yZGVyOiAycHggc29saWQgIzRCN0VGRjsKICAgICAgICBib3JkZXItcmFkaXVzOiA0cHg7CiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDsKICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7CiAgICAgICAgbGluZS1oZWlnaHQ6IDI1cHg7CiAgICAgICAgcGFkZGluZzogMCA4cHg7CiAgICAgIH0KCiAgICAgIC5jb250ZW50LAogICAgICAucHJvcHMgewogICAgICAgIGJvcmRlci1yYWRpdXM6IDRweDsKICAgICAgICBjb2xvcjogI0ZGRkZGRjsKICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7CiAgICAgICAgbGluZS1oZWlnaHQ6IDI1cHg7CiAgICAgICAgcGFkZGluZzogMCA4cHg7CiAgICAgIH0KCiAgICAgIC5jb250ZW50IHsKICAgICAgICBiYWNrZ3JvdW5kOiAjRkY2NDY0OwogICAgICB9CgogICAgICAucHJvcHMgewogICAgICAgIGJhY2tncm91bmQ6ICM0QjdFRkY7CiAgICAgIH0KICAgIDwvc3R5bGU+CiAgPC9kZWZzPgoKICA8dGV4dCB4PSI1MiIgeT0iMzQiIGNsYXNzPSJsYWJlbCI+UGFyZW50IHRlbXBsYXRlICh1c2FnZSk8L3RleHQ+CiAgPHJlY3QgeD0iNTIiIHk9IjUyIiB3aWR0aD0iNTc0IiBoZWlnaHQ9IjE0NCIgcng9IjQiIHN0cm9rZT0iIzhFNjdDRCIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtZGFzaGFycmF5PSI0IDQiLz4KICA8Zm9yZWlnbk9iamVjdCB4PSI3OCIgeT0iNjgiIHdpZHRoPSI1MjAiIGhlaWdodD0iMTEyIj4KICAgIDxkaXYgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwiIGNsYXNzPSJjb2RlIj4KICAgICAgPGRpdj4mbHQ7Q2hpbGRDb21wb25lbnQgdi1zbG90PSI8c3BhbiBjbGFzcz0icmVjZWl2ZWQiPnJlY2VpdmVkUHJvcHM8L3NwYW4+IiZndDs8L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0iaW5kZW50Ij48c3BhbiBjbGFzcz0iY29udGVudCI+e3sgcmVjZWl2ZWRQcm9wcy50ZXh0IH19PC9zcGFuPjwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJpbmRlbnQiPjxzcGFuIGNsYXNzPSJjb250ZW50Ij57eyByZWNlaXZlZFByb3BzLmNvdW50IH19PC9zcGFuPjwvZGl2PgogICAgICA8ZGl2PiZsdDsvQ2hpbGRDb21wb25lbnQmZ3Q7PC9kaXY+CiAgICA8L2Rpdj4KICA8L2ZvcmVpZ25PYmplY3Q+CgogIDx0ZXh0IHg9IjUyIiB5PSIyMjgiIGNsYXNzPSJsYWJlbCI+Q2hpbGQgdGVtcGxhdGUgKHNsb3QgZGVmaW5pdGlvbik8L3RleHQ+CiAgPHJlY3QgeD0iNTIiIHk9IjI0NiIgd2lkdGg9IjU3NCIgaGVpZ2h0PSIxNDAiIHJ4PSI0IiBzdHJva2U9IiM4RTY3Q0QiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWRhc2hhcnJheT0iNCA0Ii8+CiAgPGZvcmVpZ25PYmplY3QgeD0iNzgiIHk9IjI2MCIgd2lkdGg9IjUyMCIgaGVpZ2h0PSIxMTIiPgogICAgPGRpdiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCIgY2xhc3M9ImNvZGUiPgogICAgICA8ZGl2PiZsdDtzbG90PC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9ImluZGVudCI+PHNwYW4gY2xhc3M9InByb3BzIj50ZXh0PSJoZWxsbyI8L3NwYW4+PC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9ImluZGVudCI+PHNwYW4gY2xhc3M9InByb3BzIj46Y291bnQ9IjEiPC9zcGFuPjwvZGl2PgogICAgICA8ZGl2Pi8mZ3Q7PC9kaXY+CiAgICA8L2Rpdj4KICA8L2ZvcmVpZ25PYmplY3Q+CgogIDxwYXRoIGQ9Ik0yNDQgMzE2SDM5NFYxMDIiIHN0cm9rZT0iIzRCN0VGRiIgc3Ryb2tlLXdpZHRoPSIyLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgZmlsbD0ibm9uZSIgbWFya2VyLWVuZD0idXJsKCNhcnJvdykiLz4KCiAgPGNpcmNsZSBjeD0iNzAiIGN5PSI0MDUiIHI9IjkiIGZpbGw9IiNGRjY0NjQiLz4KICA8dGV4dCB4PSI5MCIgeT0iNDExIiBjbGFzcz0ibGVnZW5kIiBmaWxsPSIjRkY2NDY0Ij5zY29wZWQgc2xvdCBjb250ZW50PC90ZXh0PgogIDxjaXJjbGUgY3g9IjQwNSIgY3k9IjQwNSIgcj0iOSIgZmlsbD0iIzRCN0VGRiIvPgogIDx0ZXh0IHg9IjQyNSIgeT0iNDExIiBjbGFzcz0ibGVnZW5kIiBmaWxsPSIjNEI3RUZGIj5zY29wZWQgc2xvdCBvdXRsZXQ8L3RleHQ+Cjwvc3ZnPgo=)

[Try it in the Playground](https://play.vuejs.org/#eJxlj00Kg0AMha8SsnHTKt2KDhQv0ANkUzTFgfljJkpBvHsZhYK6fS+878uCzxDKeWKssUl91EEgsUxBkdM2+CjQjdoMnbfBO3YCn+gtFGV1jPNEQa6p9g1FjlwjbIN5CytyAM1pZ74n46UljNyznnl4RR8S4XYMsCxwKErhr8C6XoveTy43G+SkpbLSXwNveLXOjx9Fs9cukZkt4cjGeMI9qzdeS/jYk+rEWH9AQHet)

[Try it in the Playground](https://play.vuejs.org/#eJxlkMEKgzAMhl8l5LLLpuwqKoy9wB4gl6GRCTUtNYogffdRywbq9f+Tfl+64sO5bJ4YCyzHxvdOa5J+cNYrPD+9aZ92cFZYFDpvB7hk+T6OyxcSEl62pZa792QUVhKA5jc1FimAw6MxCySBpMz/eJJSeXDmrVzHgfIgMt9GY7Ui9NxwP3P78taNhHUirCvsikx5UQjhXDR2kthskMNddVT6a+AVz2fHP9uLRq8kEZkV4YeNsYQpKzZeRXhPSX5ghC8NDY0G)

The props passed to the slot by the child are available as the value of the corresponding `v-slot` directive, which can be accessed by expressions inside the slot.

You can think of a scoped slot as a function being passed into the child component. The child component then calls it, passing props as arguments:

js

```
ChildComponent({
  // passing the default slot, but as a function
  default: (receivedProps) => {
    return `${receivedProps.text} ${receivedProps.count}`
  }
})

function ChildComponent(slots) {
  // call the slot function with props!
  return slots.default({ text: 'hello', count: 1 })
}
```

In fact, this is very close to how scoped slots are compiled, and how you would use scoped slots in manual [render functions](/guide/extras/render-function).

Notice how `v-slot="receivedProps"` matches the slot function signature. Just like with function arguments, we can use destructuring in `v-slot`:

template

```
<ChildComponent v-slot="{ text, count }">
  {{ text }} {{ count }}
</ChildComponent>
```

### Named Scoped Slots [​](#named-scoped-slots)

Named scoped slots work similarly - slot props are accessible as the value of the `v-slot` directive: `v-slot:name="receivedProps"`. When using the shorthand, it looks like this:

template

```
<MyComponent>
  <template #header="headerProps">
    {{ headerProps }}
  </template>

  <template #default="defaultProps">
    {{ defaultProps }}
  </template>

  <template #footer="footerProps">
    {{ footerProps }}
  </template>
</MyComponent>
```

Passing props to a named slot:

template

```
<slot name="header" message="hello" />
```

Note the `name` of a slot won't be included in the props because it is reserved - so the resulting `headerProps` would be `{ message: 'hello' }`.

If you are mixing named slots with the default scoped slot, you need to use an explicit `<template>` tag for the default slot. Attempting to place the `v-slot` directive directly on the component will result in a compilation error. This is to avoid any ambiguity about the scope of the props of the default slot. For example:

template

```
<!-- <MyComponent> template -->
<div>
  <slot message="hello" />
  <slot name="footer" />
</div>
```

template

```
<!-- This template won't compile -->
<MyComponent v-slot="{ message }">
  <p>{{ message }}</p>
  <template #footer>
    <!-- message belongs to the default slot, and is not available here -->
    <p>{{ message }}</p>
  </template>
</MyComponent>
```

Using an explicit `<template>` tag for the default slot helps to make it clear that the `message` prop is not available inside the other slot:

template

```
<MyComponent>
  <!-- Use explicit default slot -->
  <template #default="{ message }">
    <p>{{ message }}</p>
  </template>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</MyComponent>
```

### Fancy List Example [​](#fancy-list-example)

You may be wondering what would be a good use case for scoped slots. Here's an example: imagine a `<FancyList>` component that renders a list of items - it may encapsulate the logic for loading remote data, using the data to display a list, or even advanced features like pagination or infinite scrolling. However, we want it to be flexible with how each item looks and leave the styling of each item to the parent component consuming it. So the desired usage may look like this:

template

```
<FancyList :api-url="url" :per-page="10">
  <template #item="{ body, username, likes }">
    <div class="item">
      <p>{{ body }}</p>
      <p>by {{ username }} | {{ likes }} likes</p>
    </div>
  </template>
</FancyList>
```

Inside `<FancyList>`, we can render the same `<slot>` multiple times with different item data (notice we are using `v-bind` to pass an object as slot props):

template

```
<ul>
  <li v-for="item in items">
    <slot name="item" v-bind="item" />
  </li>
</ul>
```

[Try it in the Playground](https://play.vuejs.org/#eNqFU2Fv0zAQ/StHJtROapNuZTBCNwnQQKBpTGxCQss+uMml8+bYlu2UlZL/zjlp0lQa40sU3/nd3Xv3vA7eax0uSwziYGZTw7UDi67Up4nkhVbGwScm09U5tw5yowoYhFEX8cBBImdRgyQMHRwWWjCHdAKYbdFM83FpxEkS0DcJINZoxpotkCIHkySo7xOixcMep19KrmGustUISotGsgJHIPgDWqg6DKEyvoRUMGsJ4HG9HGX16bqpAlU1izy5baqDFegYweYroMttMwLAHx/Y9Kyan36RWUTN2+mjXfpbrei8k6SjdSuBYFOlMaNI6AeAtcflSrqx5b8xhkl4jMU7H0yVUCaGvVeH8+PjKYWqWnpf5DQYBTtb+fc612Awh2qzzGaBiUyVpBVpo7SFE8gw5xIv/Wl4M9gsbjCCQbuywe3+FuXl9iiqO7xpElEEhUofKFQo2mTGiFiOLr3jcpFImuiaF6hKNxzuw8lpw7kuEy6ZKJGK3TR6NluLYXBVqwRXQjkLn0ueIc3TLonyZ0sm4acqKVovKIbDCVQjGsb1qvyg2telU4Yzz6eHv6ARBWdwjVqUNCbbFjqgQn6aW1J8RKfJhDg+5/lStG4QHJZjnpO5XjT0BMqFu+uZ81yxjEQJw7A1kOA76FyZjaWBy0akvu8tCQKeQ+d7wsy5zLpz1FlzU3kW1QP+x40ApWgWAySEJTv6/NitNMkllcTakwCaZZ5ADEf6cROas/RhYVQps5igEpkZLwzRROmG04OjDBcj7+Js+vYQDo9e0uH1qzeY5/s1vtaaqG969+vTTrsmBTMLLv12nuy7l+d5W673SBzxkzlfhPdWSXokdZMkSFWhuUDzTTtOnk6CuG2fBEwI9etrHXOmRLJUE0/vMH14In5vH30sCS4Nkr+WmARdztHQ6Jr02dUFPtJ/lyxUVgq6/UzyO1olSj9jc+0DcaWxe/fqab/UT51Uu7Znjw6lbUn5QWtR6vtJQM//4zPUt+NOw+lGzCqo/gLm1QS8)

[Try it in the Playground](https://play.vuejs.org/#eNqNVNtq20AQ/ZWpQnECujhO0qaqY+hD25fQl4RCifKwllbKktXushcT1/W/d1bSSnYJNCCEZmbPmcuZ1S76olS6cTTKo6UpNVN2VQjWKqktfCOi3N4yY6HWsoVZmo0eD5kVAqAQ9KU7XNGaOG5h572lRAZBhTV574CJzJv7QuCzzMaMaFjaKk4sRQtgOeUmiiVO85siwncRQa6oThRpKHrO50XUnUdEwMMJw08M7mAtq20MzlAtSEtj4OyZGkweMIiq2AZKToxBgMcdxDCqVrueBfb7ZaaOQiOspZYgbL0FPBySIQD+eMeQc99/HJIsM0weqs+O258mjfZREE1jt5yCKaWiFXpSX0A/5loKmxj2m+YwT69p+7kXg0udw8nlYn19fYGufvSeZBXF0ZGmR2vwmrJKS4WiPswGWWYxzIIgs8fYH6mIJadnQXdNrdMiWAB+yJ7gsXdgLfjqcK10wtJqgmYZ+spnpGgl6up5oaa2fGKi6U8Yau9ZS6Wzpwi7WU1p7BMzaZcLbuBh0q2XM4fZXTc+uOPSGvjuWEWxlaAexr9uiIBf0qG3Uy6HxXwo9B+mn47CvbNSM+LHccDxAyvmjMA9Vdxh1WQiO0eywBVGEaN3Pj972wVxPKwOZ7BJWI2b+K5rOOVUNPbpYJNvJalwZmmahm3j7AhdSz3sPzDRS3R4SQwOCXxP4yVBzJqJarSzcY8H5mXWFfif1QVwPGjGcQWTLp7YrcLxCfyDdAuMW0cq30AOV+plcK1J+dxoXJkqR6igRCeNxjbxp3N6cX5V0Sb2K19dfFrA4uo9Gh8uP9K6Puvw3eyx9SH3IT/qPCZpiW6Y8Gq9mvekrutAN96o/V99ALPj)

### Renderless Components [​](#renderless-components)

The `<FancyList>` use case we discussed above encapsulates both reusable logic (data fetching, pagination etc.) and visual output, while delegating part of the visual output to the consumer component via scoped slots.

If we push this concept a bit further, we can come up with components that only encapsulate logic and do not render anything by themselves - visual output is fully delegated to the consumer component with scoped slots. We call this type of component a **Renderless Component**.

An example renderless component could be one that encapsulates the logic of tracking the current mouse position:

template

```
<MouseTracker v-slot="{ x, y }">
  Mouse is at: {{ x }}, {{ y }}
</MouseTracker>
```

[Try it in the Playground](https://play.vuejs.org/#eNqNUcFqhDAQ/ZUhF12w2rO4Cz301t5aaCEX0dki1SQko6uI/96J7i4qLPQQmHmZ9+Y9ZhQvxsRdiyIVmStsZQgcUmtOUlWN0ZbgXbcOP2xe/KKFs9UNBHGyBj09kCpLFj4zuSFsTJ0T+o6yjUb35GpNRylG6CMYYJKCpwAkzWNQOcgphZG/YZoiX/DQNAttFjMrS+6LRCT2rh6HGsHiOQKtmKIIS19+qmZpYLrmXIKxM1Vo5Yj9HD0vfD7ckGGF3LDWlOyHP/idYPQCfdzldTtjscl/8MuDww78lsqHVHdTYXjwCpdKlfoS52X52qGit8oRKrRhwHYdNrrDILouPbCNVZCtgJ1n/6Xx8JYAmT8epD3fr5cC0oGLQYpkd4zpD27R0vA=)

[Try it in the Playground](https://play.vuejs.org/#eNqVUU1rwzAM/SvCl7SQJTuHdLDDbttthw18MbW6hjW2seU0oeS/T0lounQfUDBGepaenvxO4tG5rIkoClGGra8cPUhT1c56ghcbA756tf1EDztva0iy/Ds4NCbSAEiD7diicafigeA0oFvLPAYNhWICYEE5IL00fMp8Hs0JYe0OinDIqFyIaO7CwdJGihO0KXTcLriK59NYBlUARTyMn6Hv0yHgIp7ARAvl3FXm8yCRiuu1Fv/x23JakVqtz3t5pOjNOQNoC7hPz0nHyRSzEr7Ghxppb/XlZ6JjRlzhTAlA+ypkLWwAM6c+8G2BdzP+/pPbRkOoL/KOldH2mCmtnxr247kKhAb9KuHKgLVtMEkn2knG+sIVzV9sfmy8hfB/swHKwV0oWja4lQKKjoNOivzKrf4L/JPqaQ==)

While an interesting pattern, most of what can be achieved with Renderless Components can be achieved in a more efficient fashion with Composition API, without incurring the overhead of extra component nesting. Later, we will see how we can implement the same mouse tracking functionality as a [Composable](/guide/reusability/composables).

That said, scoped slots are still useful in cases where we need to both encapsulate logic **and** compose visual output, like in the `<FancyList>` example.

[Edit this page on GitHub](https://github.com/vuejs/docs/edit/main/src/guide/components/slots.md)