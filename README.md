# pi-execution-timer

A [Pi](https://pi.dev) extension that displays AI execution timing with TPS (tokens per second).

## Features

- **During execution**: Shows `Working... 3s` (updates every second)
- **After completion**: Displays timing summary in a widget above the editor
  - `Started: 14:30:00 | Finished: 14:30:03 | Duration: 3s | TPS: 42.5`
- Calculates tokens per second from LLM usage data
- Automatically clears previous results when new execution starts

## Installation

```bash
pi install git:github.com/yuanzhi-code/pi-execution-timer
```

Or use the raw URL:

```bash
pi install https://github.com/yuanzhi-code/pi-execution-timer
```

To try without installing:

```bash
pi -e git:github.com/yuanzhi-code/pi-execution-timer
```

## Uninstallation

```bash
pi remove git:github.com/yuanzhi-code/pi-execution-timer
```

## License

MIT
