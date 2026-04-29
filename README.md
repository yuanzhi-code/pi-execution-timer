# pi-execution-timer

A [Pi](https://pi.dev) extension that displays AI execution timing.

## Features

- **During execution**: Shows `Working... 3s` (updates every second)
- **After completion**: Displays timing summary in a widget above the editor
  - `Started: 14:30:00 | Finished: 14:30:03 | Duration: 3s`
- Automatically clears previous results when new execution starts

## Installation

```bash
npm install pi-execution-timer
```

## Usage

Add to your Pi settings or use with the `-e` flag:

```bash
pi -e pi-execution-timer
```

Or add to your `~/.pi/settings.json`:

```json
{
  "packages": ["pi-execution-timer"]
}
```

## License

MIT
