# Action Image Pack (SVG, high-contrast)
- Format: 512x384 SVG, high-contrast, screen-reader-labeled
- Safe for **Low Sensory Mode** (no motion, no sound).
- Place the whole folder under `public/images/actions/` in your app.

## Example usage in React
```tsx
<img src="/images/actions/communication_hi.svg" alt="Say 'Hi!' and smile" width={256} height={192} />
```

Or import the JSON map:
```ts
import map from "/images/actions/image-map.json";
const src = "/images/actions/" + map.communication.hi;
```

These are intentionally simple, label-forward visuals that pair with your kid-friendly prompts.
