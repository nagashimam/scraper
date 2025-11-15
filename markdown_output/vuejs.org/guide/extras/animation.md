# Animation Techniques [​](#animation-techniques)

Vue provides the [`<Transition>`](/guide/built-ins/transition) and [`<TransitionGroup>`](/guide/built-ins/transition-group) components for handling enter / leave and list transitions. However, there are many other ways of using animations on the web, even in a Vue application. Here we will discuss a few additional techniques.

## Class-based Animations [​](#class-based-animations)

For elements that are not entering / leaving the DOM, we can trigger animations by dynamically adding a CSS class:

js

```
const disabled = ref(false)

function warnDisabled() {
  disabled.value = true
  setTimeout(() => {
    disabled.value = false
  }, 1500)
}
```

js

```
export default {
  data() {
    return {
      disabled: false
    }
  },
  methods: {
    warnDisabled() {
      this.disabled = true
      setTimeout(() => {
        this.disabled = false
      }, 1500)
    }
  }
}
```

template

```
<div :class="{ shake: disabled }">
  <button @click="warnDisabled">Click me</button>
  <span v-if="disabled">This feature is disabled!</span>
</div>
```

css

```
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
```

Click me

## State-driven Animations [​](#state-driven-animations)

Some transition effects can be applied by interpolating values, for instance by binding a style to an element while an interaction occurs. Take this example for instance:

js

```
const x = ref(0)

function onMousemove(e) {
  x.value = e.clientX
}
```

js

```
export default {
  data() {
    return {
      x: 0
    }
  },
  methods: {
    onMousemove(e) {
      this.x = e.clientX
    }
  }
}
```

template

```
<div
  @mousemove="onMousemove"
  :style="{ backgroundColor: `hsl(${x}, 80%, 50%)` }"
  class="movearea"
>
  <p>Move your mouse across this div...</p>
  <p>x: {{ x }}</p>
</div>
```

css

```
.movearea {
  transition: 0.3s background-color ease;
}
```

Move your mouse across this div...

x: 0

In addition to color, you can also use style bindings to animate transform, width, or height. You can even animate SVG paths using spring physics - after all, they are all attribute data bindings:

Drag Me

[Source code](https://play.vuejs.org/#eNqlVmtv2zYU/SsXboE6mC3bSdwVmpM9MAz9sAIdsA8b5gGhRUrWKpEESTl2DP/3HZKSbbkuUKBA4Ij3ce65D15pP/hZ62TTiEE6WNjMlNqRFa7Rj0tZ1loZR3sygmWu3IgRZarWjROcDpQbVdMbeL45WvKdZHWZ2VbXHZP/LGyWMlPSOloLxoV5L8pi7eiBZrdTr6uEo9L+alhRlLKAPGeVFZ2PdQzwD6CyTWk6oh1+6dBpM2g6isNgch4jWPeCHm4u2Xxkbg2QLrvh8IYeHmm/lARg1xhJTx+moyn9fnfr//nf1/tzzMMfr/dZsj1AnCW7Azhe6J+W8jwsfp2Q7qOypSuV/ELsaMt3Xp3saNxL48yA1Vp4DFg+ojA/0i2ldH/GPqAROcOkzZWpU3oKzxVzYui5wnPS4hz09gZsydc3Us4bidqCZWiD79FQ3ERMgagiydZMFoL/qZpsLSziX4r+mf4LRmgn9ZvsTBOEATjZBjDNCvHXSeiTj8K/wadHR8lv5ZLT8MSnhUFVA5PeyHxHw5YZutCyRW2C9alJLc+jya5n8VmXZsm865MP6hEugp61pevIRUOUDjVouX8hoWsXy8uPF5ThBvtRiGKQGXVPX3OdzozdTov0hGu1QdAR8cYwTzil76e4vrkpA/+Ubt+Fe+ydQzljhotJ3ETYQTg4UWs/qDgRLXi5aQtWMWsflgPuU2OrSiwHUfFTrRoruHqW0B5H9qh1fgyC+Ko6ONdqI6CNA9b3vK4KXo0OiLElfS8h+TVdcKsEC5B9bcgW+dpNcUx1BR09l9ytccASwmkdeoDj/C2OrRPctN9oqQ962nAwz8uqguzV3W/z2S9zOCwm3rILNkG07hmFPgaOGDD3/OiDWEygvWbY7jVESq3bVT6ti1UHkPeiqtQJontaTM46jWMAIJspLTgkybHRcaxXLPtUGNVIPs5UpUxKr/I8/yGo1HZs1wwj4N8T93pLs7f4McWKYdv5F4j/S2bzm2AeKpr6ra63QRCLium87yRouskrj7cuORcyCGtmcKfgCCtijVNBqttEUyxfJIN3UhA7sXVjVpUFFBnqIUwQ56jO2JYvuDUzED3JnlsOd9NpEGJQzNgPSwahVDKirpRBY8aG8bKxKb0LCLhByaqIVTqxYSurKrxhIhulUZrwWIkciPH5ZVxKLvw7toWJjccFT9o2XqL2cjy6z2IlGOe4/rFAp8aUL0HYUoeoF6t78/U72nUEXwvnRYqFuxX153VbqYpHYEy1nySM0GA0iF8q45ppfJUoia+eEG/ZKuxykHZbE6vl9AHj5bgHzmmbTiYZl4n9tNMYwYSLzaRn2O2xweF/7cIdbA==)

## Animating with Watchers [​](#animating-with-watchers)

With some creativity, we can use watchers to animate anything based on some numerical state. For example, we can animate the number itself:

js

```
import { ref, reactive, watch } from 'vue'
import gsap from 'gsap'

const number = ref(0)
const tweened = reactive({
  number: 0
})

// Note: For inputs greater than Number.MAX_SAFE_INTEGER (9007199254740991),
// the result may be inaccurate due to limitations in JavaScript number precision.
watch(number, (n) => {
  gsap.to(tweened, { duration: 0.5, number: Number(n) || 0 })
})
```

template

```
Type a number: <input v-model.number="number" />
<p>{{ tweened.number.toFixed(0) }}</p>
```

js

```
import gsap from 'gsap'

export default {
  data() {
    return {
      number: 0,
      tweened: 0
    }
  },
  // Note: For inputs greater than Number.MAX_SAFE_INTEGER (9007199254740991),
  // the result may be inaccurate due to limitations in JavaScript number precision.
  watch: {
    number(n) {
      gsap.to(this, { duration: 0.5, tweened: Number(n) || 0 })
    }
  }
}
```

template

```
Type a number: <input v-model.number="number" />
<p>{{ tweened.toFixed(0) }}</p>
```

Type a number: 

0

[Try it in the Playground](https://play.vuejs.org/#eNpNUstygzAM/BWNLyEzBDKd6YWSdHrpsacefSGgJG7xY7BImhL+vTKv9ILllXYlr+jEm3PJpUWRidyXjXIEHql1e2mUdrYh6KDBY8yfoiR1wRiuBZVn6OHYWA0r5q6W2pMv3ISHkBPSlNZ4AtPqAzawC2LRdj3DdEU0WA34qB910sBUnsFWmp6LpRmaRo9UHMLIrGG3h4EBQ/OEbDRpxjx51TYFKWtYKHmOF9WP4Qzs+x22EDoA9NLwmaejC/x+vhBqVxeEfAPIK3WBsi6830lRobZSDDjA580hFIt8roxrCS4bbSuskxFmzhhIAenEy92id1CnzZzfd91szETmZ72rH6zYOej7PA3rYXrKE3GUp//m5KunWx3C5CE6enS0hjZXVKczZXCwdfWyoF79YgZPqBliJ9iGSUTEYlzuRrO9X94a/lUGNTklvBTZvAMpwhYCIMWZyPksTVvjvk9JaXUacq9sSlujFJPnvej/AElH3FQ=)

[Try it in the Playground](https://play.vuejs.org/#eNpNUctugzAQ/JWVLyESj6hSL5Sm6qXHnnr0xYENuAXbwus8Svj3GlxIJEvendHMvgb2bkx6cshyVtiyl4b2XMnO6J6gtsLAsdcdbKZwwxVXeJmpCo/CtQQDVwCVIBFtQwzQI7leLRmAct0B+xx28YLQGVFh5aGAjNM3zvRZUNnkizhII7V6w9xTSjqiRtoYBqhcL0hq5c3S5/hu/blKbzfYwbh9LMWVf0W2zusTws60gnDK6OtqEMTaeSGVcQSnpNMVtmmAXzkLAWeQzarCQNkKaz1zkHWysPthWNryjX/IC1bRbgvjWGTG64rssbQqLF3bKUzvHmH6o1aUnFHWDeVw0G31sqJW/mIOT9h5KEw2m7CYhUsmnV/at9XKX3n24v+E5WxdNmfTbieAs4bI2DzLnDI/dVrqLpu4Nz+/a5GzZYls/AM3dcFx)

[Edit this page on GitHub](https://github.com/vuejs/docs/edit/main/src/guide/extras/animation.md)